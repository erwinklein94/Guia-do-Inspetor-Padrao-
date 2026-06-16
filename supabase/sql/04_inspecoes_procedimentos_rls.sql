-- =========================================================
-- GUIA DO INSPETOR PADRÃO - INSPEÇÕES + PROCEDIMENTOS
-- Cria:
--   1) tabela public.procedimentos  (consulta de normas -> Supabase)
--   2) tabela public.inspecoes       (laudos de campo -> Auditoria)
--   3) bucket de Storage "evidencias" (fotos carimbadas)
--   4) RLS por perfil + trava de imutabilidade do laudo do fiscal
--
-- Pré-requisito: rode ANTES o 01_schema_auth_rls.sql (usa as funções
-- public.current_profile_role(), public.is_admin(), public.can_read_content()
-- e public.can_edit_content() criadas lá).
--
-- Perfis:
--   admin    -> vê Auditoria (todos os laudos/fotos), gerencia tudo
--   editor   -> gerencia conteúdo (procedimentos/flashcards); NÃO emite laudo
--   fiscal   -> emite laudo e anexa foto; vê só os PRÓPRIOS laudos
--   consulta -> só consulta e compara medidas; NÃO emite laudo nem foto
-- Reexecutável (idempotente).
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- 1) PROCEDIMENTOS (banco de normas para consulta no app)
-- ---------------------------------------------------------
create table if not exists public.procedimentos (
  id          uuid primary key default gen_random_uuid(),
  area_key    text not null,          -- 'amv','brita','concreto','madeira','sub',...
  area_nome   text not null,          -- rótulo da área
  area_icone  text,                   -- emoji/ícone da área
  item_key    text not null,          -- chave do item dentro da área
  titulo      text not null,
  codigo      text,                   -- código da norma (ETM, PO-SPE, etc.)
  descricao   text not null,
  ordem       integer not null default 0,
  ativo       boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (area_key, item_key)
);

drop trigger if exists set_procedimentos_updated_at on public.procedimentos;
create trigger set_procedimentos_updated_at
before update on public.procedimentos
for each row execute function public.set_updated_at();

create index if not exists idx_procedimentos_area on public.procedimentos(area_key, ordem);

comment on table public.procedimentos is
  'Banco de procedimentos / normas técnicas para consulta no app. Gerenciado por editor/admin.';

-- ---------------------------------------------------------
-- 2) INSPECOES (laudos de campo do fiscal -> Auditoria)
-- ---------------------------------------------------------
create table if not exists public.inspecoes (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  fiscal_nome  text not null,
  fiscal_email text,
  categoria    text not null,         -- AMV, Brita, Dormente de Concreto, ...
  item         text,                  -- componente/defeito inspecionado
  status       text not null check (status in ('aceitavel','reparar','refugo')),
  veredito     text,                  -- linha-resumo do laudo (CONFORME / REFUGO...)
  local        text,                  -- pátio / trecho / km
  lote         text,                  -- lote / NF / AMV nº
  observacao   text,
  fonte        text,                  -- fonte normativa
  laudo_texto  text not null,         -- laudo completo gerado pelo app
  medidas      jsonb,                 -- medições brutas (opcional)
  foto_path    text,                  -- caminho da foto no bucket evidencias
  origem       text not null default 'campo',
  created_at   timestamptz not null default now()
);

create index if not exists idx_inspecoes_user      on public.inspecoes(user_id);
create index if not exists idx_inspecoes_created    on public.inspecoes(created_at desc);
create index if not exists idx_inspecoes_categoria  on public.inspecoes(categoria);
create index if not exists idx_inspecoes_status     on public.inspecoes(status);

comment on table public.inspecoes is
  'Laudos/relatórios de inspeção de campo. Admin vê todos (Auditoria); fiscal vê os próprios.';

-- Trava de imutabilidade: fiscal só pode anexar/alterar a FOTO do próprio laudo,
-- nunca o conteúdo. Admin pode tudo.
create or replace function public.inspecoes_guard_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() then
    return new;
  end if;
  if (new.user_id    is distinct from old.user_id)
   or (new.fiscal_nome  is distinct from old.fiscal_nome)
   or (new.fiscal_email is distinct from old.fiscal_email)
   or (new.categoria    is distinct from old.categoria)
   or (new.item         is distinct from old.item)
   or (new.status       is distinct from old.status)
   or (new.veredito     is distinct from old.veredito)
   or (new.local        is distinct from old.local)
   or (new.lote         is distinct from old.lote)
   or (new.observacao   is distinct from old.observacao)
   or (new.fonte        is distinct from old.fonte)
   or (new.laudo_texto  is distinct from old.laudo_texto)
   or (new.medidas      is distinct from old.medidas)
   or (new.created_at   is distinct from old.created_at)
  then
    raise exception 'Laudo imutável: o fiscal só pode anexar/alterar a foto.';
  end if;
  return new;
end;
$$;

drop trigger if exists trg_inspecoes_guard_update on public.inspecoes;
create trigger trg_inspecoes_guard_update
before update on public.inspecoes
for each row execute function public.inspecoes_guard_update();

-- ---------------------------------------------------------
-- 3) RLS das tabelas
-- ---------------------------------------------------------
alter table public.procedimentos enable row level security;
alter table public.inspecoes      enable row level security;

drop policy if exists "procedimentos_select_ativos"        on public.procedimentos;
drop policy if exists "procedimentos_manage_editor_admin"  on public.procedimentos;
drop policy if exists "inspecoes_insert_fiscal"            on public.inspecoes;
drop policy if exists "inspecoes_select_own_or_admin"      on public.inspecoes;
drop policy if exists "inspecoes_update_own_or_admin"      on public.inspecoes;
drop policy if exists "inspecoes_delete_admin"             on public.inspecoes;

-- Procedimentos: qualquer perfil ativo lê os ativos; editor/admin gerenciam.
create policy "procedimentos_select_ativos" on public.procedimentos
  for select to authenticated
  using ((ativo = true and public.can_read_content()) or public.can_edit_content());

create policy "procedimentos_manage_editor_admin" on public.procedimentos
  for all to authenticated
  using (public.can_edit_content())
  with check (public.can_edit_content());

-- Inspeções:
-- INSERT só do próprio usuário E perfil que emite laudo (admin/fiscal).
create policy "inspecoes_insert_fiscal" on public.inspecoes
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and coalesce(public.current_profile_role() in ('admin','fiscal'), false)
  );

-- SELECT: fiscal vê os próprios; admin vê todos (Auditoria).
create policy "inspecoes_select_own_or_admin" on public.inspecoes
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- UPDATE: próprio (só foto, garantido pelo trigger) ou admin.
create policy "inspecoes_update_own_or_admin" on public.inspecoes
  for update to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- DELETE: só admin.
create policy "inspecoes_delete_admin" on public.inspecoes
  for delete to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------
-- 4) Storage: bucket privado "evidencias" + RLS
--    Caminho padrão dos arquivos: <user_id>/<arquivo>.jpg
--    (Se preferir, crie o bucket pela UI: Storage > New bucket,
--     nome "evidencias", Public = OFF, e rode só as policies abaixo.)
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('evidencias', 'evidencias', false)
on conflict (id) do nothing;

drop policy if exists "evid_insert_fiscal"        on storage.objects;
drop policy if exists "evid_select_own_or_admin"  on storage.objects;
drop policy if exists "evid_update_own_or_admin"  on storage.objects;
drop policy if exists "evid_delete_admin"         on storage.objects;

-- Enviar foto: admin/fiscal, somente na própria pasta (<user_id>/...).
create policy "evid_insert_fiscal" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'evidencias'
    and coalesce(public.current_profile_role() in ('admin','fiscal'), false)
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Ler foto: dono do arquivo ou admin (Auditoria).
create policy "evid_select_own_or_admin" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'evidencias'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

-- Atualizar (re-upload) a própria foto, ou admin.
create policy "evid_update_own_or_admin" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'evidencias'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

-- Apagar foto: só admin.
create policy "evid_delete_admin" on storage.objects
  for delete to authenticated
  using (bucket_id = 'evidencias' and public.is_admin());

-- ---------------------------------------------------------
-- Conferência rápida (opcional)
-- ---------------------------------------------------------
-- select count(*) as total_procedimentos from public.procedimentos;
-- select count(*) as total_inspecoes     from public.inspecoes;
