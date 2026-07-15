# Modulo 5 - Composition API e Composables

## Contexto

Composition API organiza logica por responsabilidade. Um composable e uma funcao
que usa APIs de composicao para encapsular estado reativo e comportamento reutilizavel.
Ele nao e um service Angular nem uma copia exata de React Hook.

## Comparacao

| Vue composable | React custom hook | Angular service |
| --- | --- | --- |
| Executa uma vez no `setup` da instancia | Executa a cada render | Instancia criada pelo injector |
| Refs permanecem ativas | Estado identificado por ordem de hooks | Estado definido pela classe/signals |
| Pode registrar lifecycle | Pode registrar effects | Nao depende de lifecycle de componente por padrao |
| Compartilhamento depende do escopo | Compartilhamento depende de context/store | Escopo depende do provider |

## `<script setup>`

O bloco e compilado como `setup()` do componente. Imports e variaveis top-level
ficam disponiveis ao template. Macros como `defineProps`, `defineEmits`,
`defineModel` e `defineExpose` sao processadas pelo compilador e nao precisam ser
importadas.

```vue
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

onMounted(() => {
  console.info('mounted')
})
</script>
```

## Estrutura de um Composable

```ts
export function useCustomers() {
  const customers = ref<Customer[]>([])
  const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function loadCustomers() { /* fluxo */ }

  onMounted(loadCustomers)

  return {
    customers: readonly(customers),
    status: readonly(status),
    loadCustomers,
  }
}
```

Exponha readonly quando consumidores nao devem mutar estado diretamente. Retorne
acoes nomeadas para preservar invariantes.

## Lifecycle Dentro de Composables

Hooks registrados no componente e em composables funcionam juntos. O composable e
executado durante o `setup` do componente chamador, portanto seus hooks pertencem a
essa mesma instancia.

Implicacoes:

- hooks do mesmo tipo executam na ordem em que foram registrados;
- cada uso do composable registra seu proprio hook;
- desmontar o componente dispara os cleanups do composable;
- chamar o composable fora de um contexto de componente pode impedir APIs que
  dependem da instancia ativa;
- esconder lifecycle demais pode surpreender o consumidor.

Lifecycle interno e bom quando inicializacao e cleanup sao parte inseparavel da
responsabilidade, como listener de `window` ou polling. Oferecer `start`/`stop`
explicitamente e melhor quando o consumidor precisa controlar o momento.

## Onde Buscar Dados

Nao existe uma unica etapa correta; a UX define:

- `setup` sincrono: prepara estado e dependencias.
- `onMounted`: pagina aparece e mostra loading enquanto busca; comum em SPAs.
- guard/loader de rota: adia ou controla a navegacao ate haver dados.
- top-level `await` + `Suspense`: suspende a subarvore durante `async setup`.
- evento do usuario: carrega apenas sob demanda.

`onMounted(async () => ...)` nao torna o componente um async component. Ele monta
primeiro e executa a requisicao depois. Top-level `await` suspende a conclusao do
setup e exige uma fronteira de `Suspense` para UX declarativa.

## Organizacao

```text
features/customers/
  customer.service.ts
  customer.types.ts
  useCustomersList.ts
  CustomersListView.vue
```

- composable: estado e fluxo da interface/feature;
- service: comunicacao externa;
- componente: apresentacao e eventos do usuario;
- tipos/schema: contratos e validacao.

Um composable que conhece `Customer` pertence a feature. Um composable generico de
persistencia pode viver em `shared`, desde que ja exista reutilizacao real.

## Armadilhas

- Nomear qualquer funcao utilitaria como `useX`; composables usam reatividade ou
  contexto de composicao.
- Criar singletons acidentais com refs no escopo do modulo.
- Desestruturar um objeto `reactive` retornado sem `toRefs`.
- Registrar hooks condicionalmente ou depois de um `await`.
- Misturar HTTP, regras de formulario e DOM em um unico composable enorme.
- Esconder efeitos automaticos sem documentar ownership e cleanup.

## Exemplos do Workspace

- [`test1/src/composables/useClock.ts`](../test1/src/composables/useClock.ts)
- [`test1/src/components/Clock.vue`](../test1/src/components/Clock.vue)
- [`projeto-1/src/features/customers/useCustomersList.ts`](../projeto-1/src/features/customers/useCustomersList.ts)
- [`projeto-1/src/features/customers/useCustomerCreateForm.ts`](../projeto-1/src/features/customers/useCustomerCreateForm.ts)

## Revisao Rapida

- Composable e uma funcao de composicao, nao um container magico de DI.
- Hooks internos e externos se registram na mesma instancia chamadora.
- Busca em `onMounted` favorece feedback imediato; busca antes da rota favorece
  consistencia antes de entrar.
- Coloque composables perto do dominio que conhecem.

## Referencias

- [Composition API FAQ](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Composables](https://vuejs.org/guide/reusability/composables.html)
- [Lifecycle hooks](https://vuejs.org/guide/essentials/lifecycle.html)
- [Data fetching com Vue Router](https://router.vuejs.org/guide/advanced/data-fetching.html)
