-- =========================================================
-- GUIA DO INSPETOR PADRÃO - PROMOVER USUÁRIO PARA ADMIN
-- Rode depois de criar o usuário em Authentication > Users.
-- Troque o e-mail abaixo pelo seu e-mail de login.
-- =========================================================

update public.profiles
set perfil = 'admin', ativo = true, updated_at = now()
where email = 'SEU_EMAIL_AQUI@exemplo.com';

-- Conferir resultado:
select id, nome, email, perfil, ativo, created_at
from public.profiles
order by created_at desc;
