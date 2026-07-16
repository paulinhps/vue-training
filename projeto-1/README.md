# Projeto 1 - Playground Vue

Playground unico do treinamento Vue 3. O projeto reune exemplos isolados dos
modulos iniciais e fluxos integrados de Router, Pinia, formularios, API fake,
recursos avancados, arquitetura e testes.

## Stack

- Vue 3, Composition API e `<script setup>`
- TypeScript e Vite
- Vue Router e Pinia
- VeeValidate e Zod
- MSW com persistencia em localStorage
- Vitest e Vue Test Utils

## Execucao

```bash
npm install
npm run dev
```

O Vite inicia a aplicacao e o MSW intercepta as requisicoes da API no navegador:

- aplicacao: `http://localhost:5174`
- exemplos iniciais: `http://localhost:5174/examples`

O arquivo `db.json` fornece o seed inicial. Na primeira execucao, o banco simulado
e salvo no localStorage com a chave `projeto-1:mock-database:v1`. As operacoes de
criacao, edicao e exclusao atualizam essa copia persistida. Para restaurar o seed,
remova essa chave no DevTools e recarregue a pagina.

## Comandos

```bash
npm run dev
npm run test:unit -- --run
npm run type-check
npm run build-only
```

## Organizacao

- `src/features/examples`: exemplos isolados dos modulos iniciais.
- `src/features`: features e rotas do playground integrado.
- `src/shared`: UI, HTTP e router genericos.
- `src/plugins`: infraestrutura instalada globalmente.
- `db.json`: seed da API fake.
- `src/mocks`: handlers do MSW e persistencia do banco simulado.

O guia associado fica em [`../guia-vue`](../guia-vue/README.md).
