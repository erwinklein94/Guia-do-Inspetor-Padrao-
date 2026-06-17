// =========================================================
// Edge Function: criar-usuario
// Cria um usuário no Auth e já define o perfil escolhido.
// Só funciona se QUEM CHAMA for admin (verificado pelo JWT).
// Usa a service_role (injetada automaticamente pela plataforma),
// que NUNCA fica no navegador — por isso é o caminho seguro.
//
// Deploy (uma das opções):
//   A) Dashboard: Edge Functions > Deploy a new function > nome "criar-usuario"
//      > cole este arquivo > Deploy.
//   B) CLI: supabase functions deploy criar-usuario
//
// No frontend (guia-supabase.js) troque:  var CRIAR_USUARIO_VIA = 'funcao';
// =========================================================
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return json({ error: 'Método não permitido.' }, 405);

  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // 1) Identifica quem está chamando (pelo token enviado pelo app).
    const authHeader = req.headers.get('Authorization') || '';
    const callerClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: userData, error: userErr } = await callerClient.auth.getUser();
    if (userErr || !userData?.user) return json({ error: 'Não autenticado.' }, 401);

    // 2) Confirma que quem chama é admin (cliente com service_role ignora RLS).
    const admin = createClient(url, service, { auth: { autoRefreshToken: false, persistSession: false } });
    const { data: perfilCaller, error: perfilErr } = await admin
      .from('profiles').select('perfil, ativo').eq('id', userData.user.id).single();
    if (perfilErr) return json({ error: 'Perfil do solicitante não encontrado.' }, 403);
    if (!perfilCaller?.ativo || perfilCaller.perfil !== 'admin') return json({ error: 'Apenas administradores podem criar usuários.' }, 403);

    // 3) Valida a entrada.
    const { nome, email, password, perfil } = await req.json().catch(() => ({}));
    const perfisValidos = ['admin', 'fiscal', 'consulta', 'editor'];
    if (!nome || !email || !password) return json({ error: 'Informe nome, e-mail e senha.' }, 400);
    if (String(password).length < 6) return json({ error: 'A senha precisa ter ao menos 6 caracteres.' }, 400);
    if (!perfisValidos.includes(perfil)) return json({ error: 'Perfil inválido.' }, 400);

    // 4) Cria o usuário já confirmado (entra na hora).
    const { data: novo, error: createErr } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { nome },
    });
    if (createErr || !novo?.user) return json({ error: createErr?.message || 'Falha ao criar usuário.' }, 400);

    // 5) Define o perfil escolhido (o trigger cria como 'consulta').
    const { error: upErr } = await admin.from('profiles')
      .upsert({ id: novo.user.id, nome, email, perfil, ativo: true }, { onConflict: 'id' });
    if (upErr) return json({ error: 'Usuário criado, mas falhou ao definir o perfil: ' + upErr.message }, 500);

    return json({ ok: true, id: novo.user.id, perfil });
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});
