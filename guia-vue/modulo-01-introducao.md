# Modulo 1 - Introducao ao Vue

## Contexto e Filosofia

Vue e um framework progressivo: pode aprimorar uma pagina existente, construir uma
SPA ou participar de uma solucao SSR. O nucleo combina templates declarativos,
componentes e reatividade granular. O compilador de Single-File Components (SFCs)
transforma template, script e estilo em modulos JavaScript otimizados.

O modelo mental central e:

```text
estado reativo -> template declarativo -> DOM atualizado pelo Vue
```

Ao contrario do React, uma alteracao reativa nao significa executar novamente toda
a funcao do componente. Vue rastreia quais efeitos dependem de quais valores. Em
relacao ao Angular, Vue oferece menos estrutura obrigatoria e nao traz DI, HTTP ou
forms enterprise no nucleo.

## Historia em Poucas Linhas

Vue foi criado por Evan You e publicado em 2014, aproveitando ideias declarativas de
frameworks existentes com uma adocao mais gradual. Vue 2 consolidou o ecossistema de
SFCs; Vue 3 reescreveu o nucleo em TypeScript, adotou Proxy para reatividade e
introduziu Composition API. Vite nasceu no ecossistema Vue e tornou-se uma ferramenta
independente e multi-framework. Para codigo novo, o foco e Vue 3; APIs de Vue 2 devem
ser tratadas como contexto de legado/migracao.

## Comparacao

| Tema | Vue | React | Angular |
| --- | --- | --- | --- |
| Unidade principal | SFC `.vue` | Componente JSX/TSX | Componente + template |
| Atualizacao | Dependencias reativas | Nova renderizacao funcional | Change detection/signals |
| Template | HTML estendido | JSX | HTML estendido |
| Estado global recomendado | Pinia | Biblioteca escolhida | Services/signals/store |
| Roteamento oficial | Vue Router | Biblioteca separada | Angular Router |
| Convencao | Moderada | Baixa | Alta |

## Ecossistema Moderno

- `vue`: runtime, compilador e Composition API.
- `create-vue`: scaffolding oficial.
- Vite: servidor de desenvolvimento e build.
- Vue Router: roteamento client-side.
- Pinia: estado compartilhado.
- Vue DevTools: inspecao de componentes, reatividade e stores.
- Vitest + Vue Test Utils: testes unitarios e de componentes.

Vite transpila TypeScript, mas nao executa type checking. O pipeline profissional
mantem `vue-tsc` como etapa separada.

## Criando um Projeto

```bash
npm create vue@latest
cd nome-do-projeto
npm install
npm run dev
```

As opcoes do assistente podem habilitar TypeScript, Router, Pinia, Vitest, ESLint e
formatacao. O ponto de entrada tipico e:

```ts
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

## Anatomia de um SFC

```vue
<script setup lang="ts">
const title = 'Vue 3'
</script>

<template>
  <h1>{{ title }}</h1>
</template>

<style scoped>
h1 { color: #2563eb; }
</style>
```

- `<script setup>` expoe bindings ao template sem objeto `return`.
- `lang="ts"` habilita TypeScript; nao determina se a API e moderna ou antiga.
- `<template>` e compilado para uma funcao de renderizacao.
- `scoped` adiciona seletores de escopo; nao cria Shadow DOM.

## Composition API e Options API

Options API (`data`, `methods`, `computed`, `watch`) nao esta depreciada. Ela e uma
API valida e mantida. Neste treinamento, Composition API com `<script setup>` e o
padrao porque organiza melhor logica por responsabilidade e oferece excelente
inferencia de tipos.

Uma sintaxe com `export default defineComponent({ ... })` nao e necessariamente
"JavaScript antigo". Ela pode ser Options API ou Composition API sem
`<script setup>`. O atributo `lang="js"` apenas seleciona a linguagem do bloco.

## Estrutura Inicial

```text
src/
  assets/
  components/
  App.vue
  main.ts
index.html
vite.config.ts
package.json
```

`index.html` e a entrada do Vite; `main.ts` cria a aplicacao; `App.vue` e o
componente raiz. Features, router, stores e shared surgem quando o dominio exigir.

## Duvidas Consolidadas

### O exercicio precisa estar em um arquivo `.vue`?

Se envolve template e comportamento de componente, sim. Logica TypeScript pura
pode ficar em `.ts`, mas precisa ser consumida por um componente ou teste para
aparecer na interface.

### Todo componente precisa ser registrado globalmente?

Nao. Em `<script setup>`, importar um componente ja o disponibiliza no template.
Registro global deve ficar restrito a recursos realmente globais.

### CSS precisa ficar no arquivo `.vue`?

Nao. Pode ser global, importado por TypeScript ou referenciado por
`<style src="./Component.css" scoped>`. Manter estilo no SFC melhora coesao;
separar pode ser util para arquivos grandes ou estilos compartilhados.

## Praticas Profissionais

- Prefira SFCs pequenos e coesos, sem fragmentar cada elemento visual.
- Use Composition API para organizar logica por feature, nao apenas por tipo de API.
- Nao confunda Vite com Vue: Vite e a ferramenta de desenvolvimento e build.
- Rode type checking e testes separadamente do build.
- Evite copiar organizacao de Angular ou React sem considerar o modelo do Vue.

## Exemplos do Workspace

- [`projeto-1/src/App.vue`](../projeto-1/src/App.vue)
- [`projeto-1/src/features/examples/components/SkillBadge.vue`](../projeto-1/src/features/examples/components/SkillBadge.vue)
- [`projeto-1/src/features/examples/components/OptionsApiExample.vue`](../projeto-1/src/features/examples/components/OptionsApiExample.vue)
- [`projeto-1/src/main.ts`](../projeto-1/src/main.ts)

## Revisao Rapida

- SFC agrupa template, logica e estilo; nao obriga que tudo permaneça no arquivo.
- `<script setup>` e acucar sintatico de compilacao, nao um lifecycle hook.
- Options API continua valida, mas nao e o padrao deste treinamento.
- Vite nao substitui `vue-tsc` para type checking.

## Referencias

- [Introducao oficial ao Vue](https://vuejs.org/guide/introduction.html)
- [Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html)
- [Tooling](https://vuejs.org/guide/scaling-up/tooling.html)
- [Guia do Vite](https://vite.dev/guide/)
