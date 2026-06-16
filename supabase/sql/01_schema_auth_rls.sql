-- =========================================================
-- GUIA DO INSPETOR PADRÃO - SUPABASE
-- Estrutura inicial com Auth + RLS
-- Rode este arquivo no SQL Editor do Supabase.
-- =========================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------
-- Função de atualização automática de updated_at
-- ---------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------
-- Perfis de usuários vinculados ao Supabase Auth
-- ---------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  email text,
  perfil text not null default 'consulta'
    check (perfil in ('admin', 'editor', 'fiscal', 'consulta')),
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

comment on table public.profiles is 'Perfil público/operacional de cada usuário do Supabase Auth.';

-- Cria automaticamente um profile quando o usuário nasce no Auth.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, nome, email, perfil, ativo)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1)),
    new.email,
    'consulta',
    true
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------------------------------------------------------
-- Áreas do mini curso / guia de treinamento
-- ---------------------------------------------------------
create table if not exists public.areas (
  id text primary key,
  nome text not null,
  nome_curto text,
  documento text,
  source_label text,
  ordem integer not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_areas_updated_at
before update on public.areas
for each row execute function public.set_updated_at();

comment on table public.areas is 'Áreas de conteúdo do Guia do Inspetor e do mini curso.';

-- ---------------------------------------------------------
-- Flashcards
-- ---------------------------------------------------------
create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  area_id text not null references public.areas(id) on delete cascade,
  categoria text not null,
  frente text not null,
  verso text not null,
  ordem integer not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (area_id, ordem)
);

create index if not exists idx_flashcards_area_id on public.flashcards(area_id);
create index if not exists idx_flashcards_ativo on public.flashcards(ativo);

create trigger set_flashcards_updated_at
before update on public.flashcards
for each row execute function public.set_updated_at();

comment on table public.flashcards is 'Perguntas e respostas dos flashcards do mini curso.';

-- ---------------------------------------------------------
-- Questões do simulado
-- ---------------------------------------------------------
create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  area_id text not null references public.areas(id) on delete cascade,
  pergunta text not null,
  opcoes jsonb not null,
  resposta_correta integer not null,
  explicacao text,
  ordem integer not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (area_id, ordem),
  check (jsonb_typeof(opcoes) = 'array'),
  check (resposta_correta >= 0)
);

create index if not exists idx_quiz_questions_area_id on public.quiz_questions(area_id);
create index if not exists idx_quiz_questions_ativo on public.quiz_questions(ativo);

create trigger set_quiz_questions_updated_at
before update on public.quiz_questions
for each row execute function public.set_updated_at();

comment on table public.quiz_questions is 'Questões do simulado final do mini curso.';

-- ---------------------------------------------------------
-- Tentativas / resultados dos simulados
-- ---------------------------------------------------------
create table if not exists public.course_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  fiscal_nome text not null,
  student_area text not null,
  training_area text not null,
  score integer not null,
  total integer not null,
  percentage integer not null,
  status text,
  respostas jsonb,
  created_at timestamptz not null default now(),
  check (score >= 0),
  check (total > 0),
  check (percentage >= 0 and percentage <= 100)
);

create index if not exists idx_course_attempts_user_id on public.course_attempts(user_id);
create index if not exists idx_course_attempts_created_at on public.course_attempts(created_at desc);

comment on table public.course_attempts is 'Histórico de resultados dos usuários no simulado.';

-- ---------------------------------------------------------
-- Funções auxiliares para RLS
-- ---------------------------------------------------------
create or replace function public.current_profile_role()
returns text
language sql
security definer
set search_path = public
stable
as $$
  select p.perfil
  from public.profiles p
  where p.id = auth.uid()
    and p.ativo = true
  limit 1;
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_profile_role() = 'admin', false);
$$;

create or replace function public.can_edit_content()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_profile_role() in ('admin', 'editor'), false);
$$;

create or replace function public.can_read_content()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(public.current_profile_role() in ('admin', 'editor', 'fiscal', 'consulta'), false);
$$;

-- ---------------------------------------------------------
-- RLS
-- ---------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.areas enable row level security;
alter table public.flashcards enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.course_attempts enable row level security;

-- Limpeza para permitir reexecutar o script sem duplicar policies.
drop policy if exists "profiles_select_own_or_admin" on public.profiles;
drop policy if exists "profiles_update_own_limited" on public.profiles;
drop policy if exists "profiles_admin_all" on public.profiles;
drop policy if exists "areas_select_authenticated_active" on public.areas;
drop policy if exists "areas_manage_editor_admin" on public.areas;
drop policy if exists "flashcards_select_authenticated_active" on public.flashcards;
drop policy if exists "flashcards_manage_editor_admin" on public.flashcards;
drop policy if exists "quiz_select_authenticated_active" on public.quiz_questions;
drop policy if exists "quiz_manage_editor_admin" on public.quiz_questions;
drop policy if exists "attempts_select_own_or_editor" on public.course_attempts;
drop policy if exists "attempts_insert_own" on public.course_attempts;
drop policy if exists "attempts_delete_admin" on public.course_attempts;

-- Profiles
create policy "profiles_select_own_or_admin"
on public.profiles
for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy "profiles_admin_all"
on public.profiles
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Conteúdo: usuários autenticados e ativos leem conteúdos ativos; editor/admin enxergam tudo e gerenciam.
create policy "areas_select_authenticated_active"
on public.areas
for select
to authenticated
using ((ativo = true and public.can_read_content()) or public.can_edit_content());

create policy "areas_manage_editor_admin"
on public.areas
for all
to authenticated
using (public.can_edit_content())
with check (public.can_edit_content());

create policy "flashcards_select_authenticated_active"
on public.flashcards
for select
to authenticated
using ((ativo = true and public.can_read_content()) or public.can_edit_content());

create policy "flashcards_manage_editor_admin"
on public.flashcards
for all
to authenticated
using (public.can_edit_content())
with check (public.can_edit_content());

create policy "quiz_select_authenticated_active"
on public.quiz_questions
for select
to authenticated
using ((ativo = true and public.can_read_content()) or public.can_edit_content());

create policy "quiz_manage_editor_admin"
on public.quiz_questions
for all
to authenticated
using (public.can_edit_content())
with check (public.can_edit_content());

-- Resultados dos simulados
create policy "attempts_select_own_or_editor"
on public.course_attempts
for select
to authenticated
using (user_id = auth.uid() or public.can_edit_content());

create policy "attempts_insert_own"
on public.course_attempts
for insert
to authenticated
with check (user_id = auth.uid() and public.can_read_content());

create policy "attempts_delete_admin"
on public.course_attempts
for delete
to authenticated
using (public.is_admin());

-- ---------------------------------------------------------
-- GRANTS para Data API
-- ---------------------------------------------------------
revoke all on table public.profiles from anon;
revoke all on table public.areas from anon;
revoke all on table public.flashcards from anon;
revoke all on table public.quiz_questions from anon;
revoke all on table public.course_attempts from anon;

grant usage on schema public to authenticated;
grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.areas to authenticated;
grant select, insert, update, delete on table public.flashcards to authenticated;
grant select, insert, update, delete on table public.quiz_questions to authenticated;
grant select, insert, delete on table public.course_attempts to authenticated;

grant usage, select on all sequences in schema public to authenticated;
