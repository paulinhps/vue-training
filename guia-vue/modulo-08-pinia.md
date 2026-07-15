# Modulo 8 - Pinia

## Contexto

Pinia gerencia estado compartilhado com identidade de store, DevTools, actions,
getters e integracao TypeScript. Use quando varias partes da aplicacao dependem do
mesmo estado ou quando o ciclo de vida precisa sobreviver a componentes.

Estado local continua local. Transformar todo `ref` em store cria acoplamento e
dificulta ownership.

## Comparacao

| Pinia | React | Angular |
| --- | --- | --- |
| setup store | Zustand/Redux slice | service com signals/store |
| state refs | estado do store | signals/subjects |
| getter/computed | selector | computed signal/selector |
| action | action/method | metodo do service |
| `storeToRefs` | selectors/hooks | leitura de signals |

## Setup Store

```ts
export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])
  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0),
  )

  function addProduct(product: Product) { /* regra */ }

  return { items, totalItems, addProduct }
})
```

Refs viram state, computed vira getter e funcoes viram actions. Actions podem ser
assincronas e chamar outras actions.

## Consumo no Componente

```ts
const cartStore = useCartStore()
const { totalItems, isEmpty } = storeToRefs(cartStore)
const { addProduct } = cartStore
```

Desestruturar state/getters diretamente perde a reatividade porque voce copia o
valor atual. `storeToRefs` cria refs ligadas e ignora actions. Actions podem ser
desestruturadas normalmente.

Consultar a store diretamente no `CartButton` estava correto: o componente pertence
a feature cart e representa estado global do carrinho. Um `v-if="!store.isEmpty"`
pode remover completamente o botao quando vazio.

## Persistencia

Pinia nao persiste automaticamente. Opcoes:

- ler/escrever `localStorage` na store;
- criar um composable de persistencia;
- usar plugin Pinia dedicado;
- persistir apenas fatias realmente necessarias.

```ts
watch(items, (value) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}, { deep: true })
```

Valide dados recuperados: storage e entrada runtime, nao fica seguro por possuir um
tipo TypeScript.

## Ownership e Layout

Um componente globalmente visivel pode continuar pertencendo a uma feature. O
`CartButton` pertence a `features/cart/components`, enquanto o layout raiz o importa
como composition root.

Essa dependencia e saudavel: layout decide posicionamento e a feature possui regra
e componente. `Teleport` nao resolve ownership; ele apenas muda o destino no DOM.

## Auth Store

Sessao simulada e candidata a store porque router, menu e paginas precisam da mesma
fonte de verdade. Derive `isAuthenticated`, role e label; concentre login/logout em
actions. Guards podem consumir a store depois que Pinia estiver ativa.

## Estado Local, Composable ou Store

- `ref` no componente: estado de uma instancia visual.
- composable: logica reutilizavel; estado pode ser local ou compartilhado.
- provide/inject: contexto por subarvore.
- Pinia: estado compartilhado da aplicacao com convencoes e tooling.

## Armadilhas

- Desestruturar store sem `storeToRefs`.
- Persistir loading, erros temporarios ou dados derivados.
- Fazer componentes mutarem arrays da store sem actions quando ha invariantes.
- Criar uma store para cada componente.
- Colocar chamadas HTTP, transformacao, cache e toda UI em uma store monolitica.
- Confiar em localStorage sem schema ou fallback.

## Exemplos do Workspace

- [`projeto-1/src/features/cart/cart.store.ts`](../projeto-1/src/features/cart/cart.store.ts)
- [`projeto-1/src/features/cart/components/CartButton.vue`](../projeto-1/src/features/cart/components/CartButton.vue)
- [`projeto-1/src/features/cart/CartView.vue`](../projeto-1/src/features/cart/CartView.vue)
- [`projeto-1/src/stores/auth.ts`](../projeto-1/src/stores/auth.ts)

## Revisao Rapida

- Store e para estado compartilhado com ciclo alem de um componente.
- `storeToRefs` preserva reatividade ao desestruturar state/getters.
- Persistencia e decisao separada da store.
- Componente de feature pode ser composto pelo layout sem mudar de ownership.
- Teleport trata DOM, nao arquitetura.

## Referencias

- [Pinia](https://pinia.vuejs.org/)
- [Defining a store](https://pinia.vuejs.org/core-concepts/)
- [State](https://pinia.vuejs.org/core-concepts/state.html)
- [Actions](https://pinia.vuejs.org/core-concepts/actions.html)
