# Rumo | Academia da Qualidade — Flashcards

Site estático para GitHub Pages com conteúdo inicial de Dormente de Concreto, Brita para Lastro e Dormente de Madeira:

- cadastro inicial do fiscal;
- seleção de área para estudo ou todas as áreas disponíveis;
- flashcards com clique para virar;
- botões de próximo e voltar;
- simulado final com 10 perguntas e 4 alternativas;
- parecer final com nome, área de atuação, área do teste, pontuação, data e correção comentada;
- botão para imprimir/salvar o comprovante em PDF pelo navegador;
- tema escuro/claro e aparência inspirada no padrão visual do outro site de qualidade de via.

## Como publicar no GitHub Pages

1. Crie um repositório novo no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. Vá em **Settings > Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/root`.
6. Salve. O GitHub Pages publicará o site sem precisar de build.

## Como adicionar novos procedimentos / áreas

Abra o arquivo `dados.js` e copie o modelo do objeto atual:

```js
{
  id: 'nome-curto-da-area',
  area: 'Nome da área',
  shortName: 'Nome curto',
  document: 'Código do procedimento',
  sourceLabel: 'Título do procedimento',
  flashcards: [
    { category: 'Tema', front: 'Pergunta ou situação problema', back: 'Resposta correta' }
  ],
  quiz: [
    {
      question: 'Pergunta do teste',
      options: ['A', 'B', 'C', 'D'],
      answer: 0,
      explanation: 'Comentário da resposta correta'
    }
  ]
}
```

O campo `answer` começa em zero: `0` é a primeira alternativa, `1` é a segunda, `2` é a terceira e `3` é a quarta.

## Arquivos principais

- `index.html`: estrutura do site.
- `styles.css`: aparência visual.
- `dados.js`: banco de flashcards e perguntas. Nesta versão há áreas de Dormente de Concreto, Brita para Lastro e Dormente de Madeira.
- `app.js`: lógica de cadastro, flashcards, simulado e parecer.
- `.nojekyll`: evita processamento do GitHub Pages.


## Atualização

Incluída a área AMV - Aparelho de Mudança de Via.


## Atualização - Subcomponentes de fixação

Inclui flashcards e simulado para isoladores, capas, palmilhas, grampos, ombreiras e USP.
