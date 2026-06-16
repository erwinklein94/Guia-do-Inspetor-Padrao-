# Guia do Inspetor Padrão — Supabase Auth + RLS

## Ordem correta

1. Abra o projeto correto no Supabase.
2. Vá em **SQL Editor**.
3. Rode `sql/01_schema_auth_rls.sql`.
4. Rode `sql/02_seed_flashcards.sql`.
5. Vá em **Authentication > Users** e crie seu usuário.
6. Rode `sql/03_promover_usuario_admin.sql`, trocando o e-mail pelo e-mail criado.
7. Copie o **Project URL** e a **Publishable key** do Supabase.
8. Cole os valores no arquivo `/supabase-config.js`.
9. Publique o site.

## O que foi migrado nesta etapa

- 5 áreas de treinamento.
- 440 flashcards.
- 50 questões de simulado.
- Histórico de tentativas do simulado em `course_attempts`.
- Login por Supabase Auth no site principal e na página `/flash-cards`.
- RLS nas tabelas.

## Perfis

- `admin`: gerencia tudo.
- `editor`: pode editar conteúdo.
- `fiscal`: pode consultar conteúdo e registrar tentativa.
- `consulta`: pode consultar conteúdo e registrar tentativa.

## Atenção

Não coloque `service_role`, `secret key` ou senha do banco no HTML, JS ou GitHub.
Use somente a Publishable key ou, se seu painel ainda for legado, a anon/public key.
