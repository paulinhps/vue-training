# Projeto 1 - Playground Vue

Playground unico do treinamento Vue 3. O projeto reune exemplos isolados dos
modulos iniciais e fluxos integrados de Router, Pinia, formularios, API fake,
recursos avancados, arquitetura e testes.

## Stack

- Vue 3, Composition API e `<script setup>`
- TypeScript e Vite
- Vue Router e Pinia
- VeeValidate e Zod
- json-server
- Vitest e Vue Test Utils

## Execucao

```bash
npm install
npm run dev:full
```

O script inicia o Vite e a API fake em paralelo:

- aplicacao: `http://localhost:5174`
- API fake: `http://localhost:3001`
- exemplos iniciais: `http://localhost:5174/examples`

## Comandos

```bash
npm run dev
npm run api
npm run test:unit -- --run
npm run type-check
npm run build-only
```

## Organizacao

- `src/features/examples`: exemplos isolados dos modulos iniciais.
- `src/features`: features e rotas do playground integrado.
- `src/shared`: UI, HTTP e router genericos.
- `src/plugins`: infraestrutura instalada globalmente.
- `db.json`: dados da API fake.

O guia associado fica em [`../guia-vue`](../guia-vue/README.md).
