# Workspace de Treinamento Vue 3

Este repositorio registra um treinamento completo de Vue 3, o playground usado nas
aulas e o desenvolvimento do **TechEventHub**, projeto final atualmente em
implementacao.

O material foi produzido para um desenvolvedor com experiencia em TypeScript,
React, Angular e .NET. O guia enfatiza modelo mental, diferencas entre frameworks,
armadilhas e praticas profissionais.

## Documentacao

- [Guia complementar de Vue](./guia-vue/README.md): consolidacao dos 14 modulos,
  duvidas discutidas e exemplos do playground.
- [PRODUCT.md](./PRODUCT.md): visao do produto, personas, escopo e modelo inicial.
- [ROADMAP.md](./ROADMAP.md): etapas de implementacao e estado atual.
- [DECISIONS.md](./DECISIONS.md): decisoes de produto e arquitetura ja tomadas.
- [ARCHITECTURE.md](./ARCHITECTURE.md): estrutura inicial do frontend,
  responsabilidades dos diretorios e regras de crescimento.
- [USE_CASES.md](./USE_CASES.md): casos de uso e criterios de aceite.
- [NAVIGATION.md](./NAVIGATION.md): layouts, rotas e regras de acesso.
- [DOMAIN.md](./DOMAIN.md): entidades, relacionamentos e regras de negocio.
- [MVP_ACCEPTANCE.md](./MVP_ACCEPTANCE.md): criterios para considerar o MVP pronto.
- [AI_CONTEXT.md](./AI_CONTEXT.md): contexto curto para continuar o trabalho em
  outro chat com uma IA.

## Conteudo do Repositorio

- `guia-vue/`: guia complementar dos 14 modulos e SSR/Nuxt.
- `projeto-1/`: playground unico, com exemplos dos fundamentos aos testes.
- `tech-event-hub/`: aplicacao final Vue do TechEventHub.
- documentos de produto na raiz: estado atual da descoberta do TechEventHub.

## Executando o TechEventHub

```bash
cd tech-event-hub
npm install
npm run dev
```

O estado detalhado da implementacao e as proximas entregas estao em
[`ROADMAP.md`](./ROADMAP.md).

## Executando o Playground

```bash
cd projeto-1
npm install
npm run dev:full
```

No `projeto-1`, o Vite e o `json-server` sao iniciados em paralelo pelo script
`dev:full`. Os exemplos dos modulos iniciais ficam disponiveis em `/examples`.
