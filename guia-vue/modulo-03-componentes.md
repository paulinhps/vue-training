# Modulo 3 - Componentes

## Contexto

Componentes criam fronteiras de responsabilidade. Props conduzem dados para baixo,
emits comunicam eventos para cima e slots delegam trechos de interface ao consumidor.
Essa combinacao preserva fluxo unidirecional sem transformar o filho em conhecedor
do pai.

## Comparacao

| Vue | React | Angular |
| --- | --- | --- |
| `defineProps` | props da funcao | `input()` / `@Input` |
| `defineEmits` | callback prop | `output()` / `@Output` |
| slot | `children` / render prop | `ng-content` / template outlet |
| componente dinamico | variavel JSX | `NgComponentOutlet` |
| async component | `lazy()` | lazy route/dynamic import |

## Props e Imutabilidade

```vue
<script setup lang="ts">
interface Props {
  title: string
  value?: number
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
})
</script>
```

Props sao readonly no filho. Objetos continuam sendo referencias; mutar uma
propriedade aninhada e tecnicamente possivel, mas quebra ownership. Emita uma
intencao ou use `v-model` para contratos bidirecionais explicitos.

## Emits em vez de Funcao na Prop

```ts
const emit = defineEmits<{
  update: [id: string]
}>()
```

Passar callback como prop funciona e lembra React, mas aumenta acoplamento: o filho
executa uma funcao fornecida pelo pai e o contrato fica menos idiomatico para
DevTools, listeners e wrappers. `emit` declara que algo aconteceu; o pai decide a
reacao. Callback props sao razoaveis quando o retorno da funcao faz parte do contrato
ou em componentes headless, mas nao devem substituir eventos indiscriminadamente.

## Slots

Filho:

```vue
<article>
  <header><slot name="header" /></header>
  <slot>Conteudo padrao</slot>
</article>
```

Pai:

```vue
<BaseCard>
  <template #header><h2>Resumo</h2></template>
  <p>Conteudo principal</p>
</BaseCard>
```

Se nada for fornecido e nao houver fallback, `<slot>` nao renderiza conteudo. Um
slot nomeado corresponde a uma unica funcao de slot; concentre seu conteudo em um
unico `<template #nome>`. Declaracoes duplicadas para o mesmo nome sao ambiguas e
podem ser rejeitadas ou sobrescritas pelo compilador, portanto nao sao um padrao.

Conteudo sem nome vai para o slot default. Um filho sem `<slot>` simplesmente
descarta o conteudo passado entre suas tags.

## Scoped Slots

```vue
<!-- filho -->
<slot name="item" :item="item" :selected="selected" />

<!-- pai -->
<template #item="{ item, selected }">
  <strong :class="{ selected }">{{ item.name }}</strong>
</template>
```

O filho possui os dados; o pai possui a apresentacao. E analogo a render props no
React e templates com contexto no Angular.

## Genericos em SFCs

```vue
<script setup lang="ts" generic="TItem extends { id: string }, TValue = string">
defineProps<{
  items: TItem[]
  getValue: (item: TItem) => TValue
}>()
</script>
```

O atributo `generic` e o ponto onde os parametros genericos do componente SFC sao
declarados. Pode haver varios parametros, constraints, defaults e composicao entre
eles. Isso nao impede tipos genericos normais em funcoes, aliases ou interfaces do
bloco TypeScript.

Use genericos quando props e slots precisam preservar uma relacao de tipos. Nao os
use apenas para evitar escrever um tipo de dominio explicito.

## Componentes Dinamicos

```vue
<component :is="currentComponent" />
```

`currentComponent` pode ser um componente importado ou nome registrado. Quando
componentes sao armazenados em estado, `shallowRef` evita tornar profundamente
reativo o objeto de definicao.

## Componentes Assincronos

```ts
const Report = defineAsyncComponent({
  loader: () => import('./MonthlyReport.vue'),
  loadingComponent: LoadingState,
  errorComponent: ErrorState,
  delay: 200,
  timeout: 10_000,
})
```

Qualquer componente pode ser carregado assincronamente; a assincronia e introduzida
no ponto de importacao pelo consumidor. Isso cria code splitting. Um filho que usa
`onMounted(async () => ...)` apenas executa I/O depois de montado; nao vira um
"async component".

Top-level `await` em `<script setup>` cria um `async setup` e pode participar de
`Suspense`, mas continua sendo diferente do carregamento assincrono do codigo.

## Quando um Componente e Pesado

Julgue por medicao e contexto:

- tamanho do chunk e dependencias importadas;
- custo de parse/execucao e montagem;
- frequencia e momento de uso;
- impacto em LCP, interacao e memoria;
- bibliotecas de graficos, editores, PDF ou visualizacao pesada.

Um componente pequeno raramente acessado ainda pode ser lazy; um componente grande
acima da dobra pode piorar a UX se atrasado. Assincronia tem custo de request,
loading e tratamento de falha.

## Duvidas Consolidadas

### Chamada de API faz parte do async component?

Nao necessariamente. Codigo e dados possuem ciclos independentes. Primeiro o chunk
pode ser baixado; depois o componente pode buscar dados. O contrario tambem e
possivel: o pai carrega dados antes de renderizar o filho.

### Mais de um `<template>` para o mesmo slot soma conteudo?

Nao trate slots como colecoes. Um nome identifica um unico canal. Agrupe todos os
nos em um unico template ou passe uma lista de dados para o slot.

### Sem nome no filho tem a mesma acao?

`<slot />` e o slot default. Conteudo livre do pai e encaminhado a ele. Slots
nomeados exigem correspondencia explicita.

## Praticas Profissionais

- Props descrevem dados; emits descrevem eventos, nao comandos internos do pai.
- Use slots para variacao estrutural; props para variacao de dados e estado.
- Componentes genericos devem manter inferencia util, nao esconder o dominio.
- Lazy load exige loading, erro e decisao consciente sobre delay.
- Prefira async imports diretamente em rotas para paginas; `defineAsyncComponent`
  e mais adequado dentro de componentes.

## Exemplos do Workspace

- [`test1/src/components/SummaryCard.vue`](../test1/src/components/SummaryCard.vue)
- [`test1/src/components/SimpleDashboard.vue`](../test1/src/components/SimpleDashboard.vue)
- [`test1/src/components/DynamicComponent.vue`](../test1/src/components/DynamicComponent.vue)
- [`test1/src/components/AsyncComponentExample.vue`](../test1/src/components/AsyncComponentExample.vue)
- [`test1/src/components/MonthlyReport.vue`](../test1/src/components/MonthlyReport.vue)

## Referencias

- [Props](https://vuejs.org/guide/components/props.html)
- [Eventos](https://vuejs.org/guide/components/events.html)
- [Slots](https://vuejs.org/guide/components/slots.html)
- [Componentes assincronos](https://vuejs.org/guide/components/async.html)
- [TypeScript com Composition API](https://vuejs.org/guide/typescript/composition-api.html)
