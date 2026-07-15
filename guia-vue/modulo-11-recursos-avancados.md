# Modulo 11 - Recursos Avancados

## Contexto

Os recursos deste modulo resolvem problemas especificos de renderizacao, DOM,
cache e extensibilidade. Eles nao formam um nivel obrigatorio: uma aplicacao pode ser
profissional usando poucos deles. O criterio e sempre o problema real.

## Teleport

```vue
<Teleport to="body">
  <AppToast v-if="message" :message="message" />
</Teleport>
```

Teleport move o DOM renderizado para outro container, mantendo ownership, props,
emits e provide/inject na arvore logica original. E ideal para modal, toast, tooltip
e overlay que precisam escapar de `overflow`, stacking context ou posicionamento do
ancestral.

Nao use Teleport para corrigir dependencia arquitetural. Um `CartButton` importado
pelo layout continua pertencendo a feature cart; Teleport apenas mudaria onde seu
DOM aparece.

## Suspense

```vue
<Suspense>
  <CustomerSummaryAsync />
  <template #fallback>Carregando resumo...</template>
</Suspense>
```

Suspense coordena dependencias encontradas durante `async setup`, incluindo top-level
`await`, e componentes assincronos suspensiveis. `onMounted(async () => ...)` ocorre
depois que o componente ja montou; portanto, sua Promise nao ativa o fallback do
Suspense.

Escolha:

- `onMounted`: renderize a pagina imediatamente e controle loading local.
- top-level `await` + Suspense: nao revele a subarvore antes de resolver dependencias.
- carregamento no pai: dados sao necessarios para decidir se o filho deve existir.
- rota/loader: dados precisam participar da decisao de navegacao.

Suspense continua marcado como experimental na documentacao do Vue. Isole seu uso e
nao dependa dele para todo fluxo de dados.

## Transition

```vue
<Transition name="fade" mode="out-in">
  <SuccessState v-if="success" key="success" />
  <FormState v-else key="form" />
</Transition>
```

`Transition` trabalha com um unico elemento ou componente por vez. Vue aplica
classes de entrada e saida; CSS ou hooks JavaScript definem o efeito. `mode="out-in"`
espera o anterior sair antes de inserir o novo.

## TransitionGroup

```vue
<TransitionGroup name="customer-row" tag="tbody">
  <CustomerRow v-for="customer in customers" :key="customer.id" />
</TransitionGroup>
```

E voltado a insercao, remocao e mudanca de posicao em listas. Cada filho precisa de
`key` unica e estavel. Nao possui `mode`, pois varios itens coexistem; classes sao
aplicadas a cada item. Movimentos podem usar a tecnica FLIP com `transform`.

Ao animar remocao e reorganizacao, e comum retirar temporariamente o item que sai do
fluxo com `position: absolute`, permitindo que os demais calculem e animem suas novas
posicoes. Isso e uma tecnica de layout, nao uma exigencia universal do Vue.

## KeepAlive

```vue
<KeepAlive :max="5">
  <component :is="currentTab" />
</KeepAlive>
```

Sem KeepAlive, trocar componente dinamico desmonta a instancia e perde estado local.
Com ele, a instancia inativa fica em cache.

- `onActivated`: chamado no mount inicial e ao retornar do cache.
- `onDeactivated`: chamado ao ir para o cache e tambem na desmontagem final.
- `onUnmounted`: ocorre quando a instancia realmente e destruida.

Se o usuario nunca voltar, a instancia pode permanecer no cache enquanto o
`KeepAlive` existir. Ela so sera desmontada se for expulsa por `max` (LRU), deixar de
atender `include/exclude`, mudar de identidade de forma relevante ou se a propria
arvore com KeepAlive for desmontada.

Pause timers, streams e listeners em `onDeactivated`; retome em `onActivated`.

## Componentes Dinamicos

```ts
const tabs = [
  { id: 'summary', component: SummaryTab },
  { id: 'notes', component: NotesTab },
]

const currentTab = shallowRef(tabs[0].component)
```

Definicoes de componente sao objetos. `ref` profundo tentaria tornar seu conteudo
reativo sem beneficio; `shallowRef` observa apenas a troca da definicao atual.

No Angular antigo, esse tipo de criacao dinamica frequentemente envolvia
`ComponentFactoryResolver`. Nas APIs modernas, `NgComponentOutlet` ou
`createComponent` sao paralelos mais proximos; no Vue, `<component :is>` cobre o caso
declarativo comum.

## Render Functions

```ts
import { h } from 'vue'

export default () => h(
  'button',
  { class: 'button', onClick: handleClick },
  'Salvar',
)
```

`h()` retorna um VNode, a descricao da interface usada pelo renderer. Render
functions sao adequadas para bibliotecas, componentes altamente dinamicos e
abstracoes em que template produziria muitas ramificacoes artificiais. O paralelo
historico e `React.createElement`.

## JSX

```tsx
const Counter = defineComponent(() => {
  const count = ref(0)

  return () => (
    <button class="counter" onClick={() => count.value++}>
      {count.value}
    </button>
  )
})
```

Em JSX do Vue:

- use `class`, nao `className` por obrigacao do React;
- listas podem ser produzidas com `map`;
- refs usam `.value` no codigo JSX;
- JSX nao transforma o componente no modelo de renderizacao do React.

Prefira template na aplicacao comum; JSX e render functions sao ferramentas de
expressividade para casos dinamicos.

## Plugins

```ts
export const loggerPlugin = {
  install(app: App, options: LoggerOptions) {
    app.provide(loggerKey, createLogger(options))
  },
}

app.use(loggerPlugin, { prefix: 'app' })
```

`app.use` solicita que a aplicacao instale funcionalidade. Um plugin pode fornecer
dependencias, registrar componentes/diretivas ou configurar recursos globais.

Use plugin para infraestrutura realmente transversal. Um logger com configuracao
global pode ser plugin; uma feature especifica nao. Correlation ID pode ser gerado
por sessao ou operacao e anexado pelo cliente HTTP/logger. O plugin fornece a
infraestrutura, mas o escopo e a renovacao do ID precisam refletir o fluxo real.

## Diretivas Personalizadas

Diretivas sao apropriadas quando a responsabilidade principal e operar diretamente
no elemento DOM: foco, observer, integracao imperativa, selecao e comportamento de
input.

```ts
export const digitsOnlyDirective: Directive<HTMLInputElement> = {
  mounted(element) {
    element.addEventListener('input', handleInput)
  },
  unmounted(element) {
    element.removeEventListener('input', handleInput)
  },
}
```

Hooks incluem `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`,
`beforeUnmount` e `unmounted`. O elemento e o ownership principal; a diretiva nao
deve depender da implementacao do componente pai.

## Mascara e `v-model`

A diretiva `v-cpf` formata progressivamente a partir da direita:

```text
1
10
100
100.9
100.937.976-30
```

Quando uma diretiva altera `input.value` e dispara `input`, o `v-model` nativo le o
valor exibido. Ela nao possui dois canais automaticos para "display mascarado" e
"model cru".

Para separar os valores, prefira um componente:

```vue
<script setup lang="ts">
const rawCpf = defineModel<string>()
const displayCpf = computed({
  get: () => formatCpf(rawCpf.value),
  set: value => { rawCpf.value = onlyDigits(value) },
})
</script>

<template><input v-model="displayCpf"></template>
```

O componente possui estado de exibicao e emite apenas digitos. Uma diretiva poderia
criar evento customizado, mas deixaria de interoperar naturalmente com `v-model` e
seria um contrato menos evidente.

## Exemplos do Workspace

- [`projeto-1/src/shared/ui/AppToast.vue`](../projeto-1/src/shared/ui/AppToast.vue)
- [`projeto-1/src/features/customers/CustomersListView.vue`](../projeto-1/src/features/customers/CustomersListView.vue)
- [`projeto-1/src/features/customers/CustomerSummaryAsync.vue`](../projeto-1/src/features/customers/CustomerSummaryAsync.vue)
- [`projeto-1/src/features/customers/CustomerWorkspaceView.vue`](../projeto-1/src/features/customers/CustomerWorkspaceView.vue)
- [`projeto-1/src/plugins/logger/logger.plugin.ts`](../projeto-1/src/plugins/logger/logger.plugin.ts)
- [`projeto-1/src/directives/cpf.ts`](../projeto-1/src/directives/cpf.ts)
- [`projeto-1/src/directives/digitsOnly.ts`](../projeto-1/src/directives/digitsOnly.ts)

## Referencias

- [Built-in components](https://vuejs.org/api/built-in-components.html)
- [Teleport](https://vuejs.org/guide/built-ins/teleport.html)
- [Suspense](https://vuejs.org/guide/built-ins/suspense.html)
- [TransitionGroup](https://vuejs.org/guide/built-ins/transition-group.html)
- [KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html)
- [Render functions e JSX](https://vuejs.org/guide/extras/render-function.html)
- [Plugins](https://vuejs.org/guide/reusability/plugins.html)
- [Diretivas personalizadas](https://vuejs.org/guide/reusability/custom-directives.html)
