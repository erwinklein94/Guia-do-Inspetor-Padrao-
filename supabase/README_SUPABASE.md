# Guia do Inspetor Padrão — Supabase (Auth + RLS + Auditoria)

## Ordem de execução no SQL Editor

1. `sql/01_schema_auth_rls.sql`  — perfis, áreas, flashcards, simulado.
2. `sql/02_seed_flashcards.sql`  — conteúdo do treinamento.
3. `sql/04_inspecoes_procedimentos_rls.sql`  — **novo**: tabelas `procedimentos` e `inspecoes`, bucket `evidencias` e RLS por perfil.
4. `sql/05_seed_procedimentos.sql`  — **novo**: migra os 44 procedimentos do app para o Supabase.
5. Em **Authentication > Users**, crie o usuário do administrador.
6. `sql/03_promover_usuario_admin.sql` — troque o e-mail e rode para tornar esse usuário **admin**.
7. Copie **Project URL** e **Publishable key** e cole em `/supabase-config.js`.
8. Publique o site.

> O bucket `evidencias` é criado pelo passo 3. Se o seu projeto exigir, crie-o pela
> interface (Storage > New bucket, nome `evidencias`, **Public = OFF**) e rode só as
> *policies* do mesmo arquivo.

## Perfis e o que cada um vê

| Perfil     | Consulta/compara medidas | Emite laudo | Tira/anexa foto | Histórico próprio | Página de Auditoria | Edita conteúdo |
|------------|:---:|:---:|:---:|:---:|:---:|:---:|
| `admin`    | ✅ | ✅ | ✅ | ✅ | ✅ (todos os laudos/fotos) | ✅ |
| `fiscal`   | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `consulta` | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `editor`   | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ (procedimentos/flashcards) |

- **admin** → único perfil com a aba **🛡️ Auditoria**, que recebe automaticamente todos os laudos e fotos enviados pelos fiscais.
- **fiscal** (fiscalização) → faz a inspeção, gera o laudo, tira a foto carimbada; tudo isso sobe para a Auditoria do admin. Não vê a Auditoria.
- **consulta** → coloca as medidas de campo e compara com os procedimentos, igual ao fiscal, mas **não gera relatório nem foto**.
- O laudo do fiscal é **imutável**: nem o próprio fiscal pode alterá-lo depois (só pode anexar a foto). Apagar/editar só o admin.

## Como definir o perfil de um usuário

Crie o usuário em **Authentication > Users** (ele nasce como `consulta`). Depois, no SQL Editor:

```sql
-- Tornar fiscal (fiscalização):
update public.profiles set perfil = 'fiscal',   ativo = true where email = 'fiscal@empresa.com';

-- Manter como consulta (já é o padrão) ou voltar para consulta:
update public.profiles set perfil = 'consulta', ativo = true where email = 'consulta@empresa.com';

-- Editor de conteúdo:
update public.profiles set perfil = 'editor',   ativo = true where email = 'editor@empresa.com';

-- Desativar um acesso sem apagar:
update public.profiles set ativo = false where email = 'desligado@empresa.com';
```

## Atualizar os procedimentos depois (sem mexer no código)

Os procedimentos agora ficam na tabela `public.procedimentos`. Para adicionar novas leituras,
basta inserir linhas (como `admin` ou `editor`):

```sql
insert into public.procedimentos
  (area_key, area_nome, area_icone, item_key, titulo, codigo, descricao, ordem)
values
  ('amv', 'AMV & Componentes', '⚙️', 'novo_item',
   'Título do novo procedimento', 'CÓDIGO-DA-NORMA',
   'Texto da norma / tolerâncias / ação.', 90);
```

O app lê essa tabela ao abrir; se estiver offline, usa a cópia embutida como reserva.

## Atenção

Nunca coloque `service_role`, `secret key` ou senha do banco no HTML/JS/GitHub.
Use somente a **Publishable key** (ou anon/public, se o painel for legado).

---

## Páginas de Perfil e de Usuários (no app)

- **👤 Meu Perfil** (todos os perfis): mostra nome, e-mail, **perfil atual**, status e ID da conta, lendo direto do Supabase. Tem o botão **🔄 Atualizar do servidor** — use-o depois de mudar um perfil para confirmar a alteração sem precisar deslogar.
- **👥 Usuários** (só admin): lista todos os cadastros, permite **trocar o perfil** e **ativar/desativar** cada usuário, e **cadastrar novos usuários** já com o perfil escolhido.

### Trocar perfil / ativar-desativar
Funciona direto pelo navegador (a policy `profiles_admin_all` deixa o admin gerenciar). Escolha o perfil no seletor, marque/desmarque “Ativo” e clique em **Salvar**.

### Cadastrar novo usuário — dois caminhos

O frontend tem um seletor no topo do `guia-supabase.js`:
```js
var CRIAR_USUARIO_VIA = 'funcao'; // já vem assim (seguro); alternativa: 'signup'
```

**1) `funcao` (padrão deste projeto — recomendado):** usa a Edge Function `criar-usuario` (em `supabase/functions/criar-usuario/index.ts`).
- Não precisa habilitar cadastro público e o novo usuário **já entra ativo**, sem confirmar e-mail.
- **Para o botão “Criar usuário” funcionar, faça o deploy da Function:** **Edge Functions → Deploy a new function**, nome `criar-usuario`, cole o arquivo e publique (ou `supabase functions deploy criar-usuario`).
- A função usa a `service_role` que o Supabase injeta sozinho nas Functions — **não** coloque essa chave no site.
- Enquanto a Function não for publicada, criar usuário dá erro (mas **Meu Perfil**, listar, trocar perfil e ativar/desativar continuam funcionando normalmente).

**2) `signup` (alternativa — sem deploy):** cria pelo próprio navegador, sem deslogar o admin. Troque o seletor para `'signup'` se preferir não usar a Function.
- Exige **cadastro habilitado** no projeto: Authentication → Sign In / Providers → Email → *Allow new users to sign up* (atenção: isso permite que qualquer pessoa se cadastre como `consulta`).
- Se a opção **Confirm email** estiver ligada, o novo usuário precisa confirmar o e-mail antes do primeiro acesso (o app avisa).

> Em ambos os casos, só **admin** consegue abrir a página e criar usuários (verificado na tela e nas policies/Function).
