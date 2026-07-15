# Modulo 14 - Testes

## Contexto para Quem Vem de .NET

O objetivo continua igual: observar comportamento, isolar fronteiras quando util e
ganhar confianca para mudar codigo. A diferenca e que componentes possuem DOM,
reatividade e scheduler assincrono.

Uma aproximacao mental:

| Frontend Vue | .NET |
| --- | --- |
| `describe` | classe/contexto de testes |
| `it` / `test` | metodo `[Fact]` |
| `expect` | Assert/FluentAssertions |
| `beforeEach` | construtor/setup por teste |
| `vi.mock` | mock de dependencia |
| `mount` | criar SUT com renderer DOM |
| wrapper | fixture/harness do componente |
| `nextTick` | aguardar fila de atualizacao do Vue |
| `flushPromises` | drenar Promises pendentes conhecidas |

## Piramide Pratica

- funcao/schema: regra pura, rapido e preciso;
- store/composable: estado e fluxo;
- componente: renderizacao, interacao e contrato observavel;
- router integrado: composicao de rotas e guards;
- E2E: jornadas criticas no navegador real.

Teste no nivel mais baixo que oferece confianca, mas nao substitua todos os testes
integrados por mocks.

## Mount e Wrapper

```ts
const wrapper = mount(BaseInput, {
  props: { label: 'Nome', modelValue: '' },
})

await wrapper.get('input').setValue('Ana')

expect(wrapper.emitted('update:modelValue')).toEqual([['Ana']])
```

`mount` cria o componente e filhos reais, salvo stubs configurados. O wrapper oferece
consulta DOM, props, eventos emitidos e helpers de interacao.

Teste o contrato: o objetivo nao e provar que a variavel interna mudou, mas que o
input exibiu estado e emitiu `update:modelValue`.

## Reatividade e Testes `async`

Nem todo teste reativo precisa ser `async`. Computed de store pode atualizar
sincronamente ao ser lido:

```ts
store.addProduct(product)
expect(store.totalItems).toBe(1)
```

Atualizacoes de DOM do Vue sao agrupadas para o proximo tick. Se o teste dispara
evento ou altera prop e consulta DOM depois, aguarde:

```ts
await wrapper.setProps({ error: 'Obrigatorio' })
await wrapper.get('button').trigger('click')
await nextTick()
```

Os helpers do Vue Test Utils normalmente retornam a Promise do proximo tick. O teste
precisa ser `async` apenas quando usa `await`.

## `nextTick` e `flushPromises`

- `nextTick`: espera Vue aplicar atualizacoes reativas pendentes ao DOM.
- `flushPromises`: resolve Promises ja enfileiradas, util para mocks HTTP e cadeias
  assincronas que nao pertencem ao scheduler do Vue.

Nao repita `flushPromises` por reflexo. Duas chamadas so fazem sentido se a primeira
resolucao cria uma nova cadeia que precisa ser drenada e isso e parte conhecida do
fluxo. Nos testes do formulario, o flush apos preencher ajuda a estabilizar
validacoes; apos submit, `expect.poll` ja aguarda o efeito observado, tornando flush
adicional redundante.

## Resultado de Filho Interno

Se o comportamento observavel vem de um filho:

- teste o filho isoladamente para seu contrato;
- no pai com stub, verifique props enviadas e reacao ao evento emitido;
- com mount real, escreva um teste de integracao para o fluxo completo.

Nao acesse estado privado do filho apenas porque o wrapper permite. Observe DOM,
emits, navegacao ou chamada de dependencia.

## `mount` e `shallowMount`

- `mount`: filhos reais; maior confianca de integracao e maior custo/acoplamento.
- `shallowMount`: substitui filhos por stubs; isola o pai e reduz complexidade.

Shallow pode esconder props invalidas, slots quebrados, provide/inject e integracao
de `v-model`. Use quando o teste e realmente sobre o pai; mantenha alguns testes com
arvore real para contratos importantes.

## Pinia em Testes

```ts
beforeEach(() => {
  localStorage.clear()
  setActivePinia(createPinia())
})
```

Testes nao executam `main.ts`; portanto, dependencias instaladas no bootstrap devem
ser configuradas no teste. Para testar hidratacao por localStorage:

```ts
localStorage.setItem(KEY, JSON.stringify(seed))
setActivePinia(createPinia())
const store = useCartStore() // criar depois do seed
```

Nao e preciso "pular" `beforeEach`: ele limpa a base para cada teste; o proprio teste
semeia o estado depois. Se houver setup especifico recorrente, use um `describe`
aninhado com seu proprio `beforeEach`, mantendo isolamento.

Pinia real e adequado para testar store. Mocks/stubs sao uteis quando o componente
nao esta testando regras da store.

## Mocks, Stubs, Spies e Fakes

- stub: resposta controlada, sem comportamento real complexo;
- spy: observa chamadas e pode manter implementacao;
- mock: substitui modulo/funcao e permite expectativas;
- fake: implementacao simplificada funcional, como router em memoria ou API fake.

```ts
vi.mock('./customer.service', () => ({
  createCustomer: vi.fn(),
}))

vi.mocked(createCustomer).mockResolvedValue(createdCustomer)
```

Mocke fronteiras lentas ou nao deterministicas: HTTP, relogio, storage quando o
storage nao e o alvo, logger e confirmacao do browser. Evite mockar computed, refs ou
metodos internos do SUT.

Um logger mockado deve preservar o contrato consumido (`debug`, `info`, `warn`,
`error`, correlation context se usado). Mock incompleto falha por acidente, nao por
regra do teste.

## `describe.sequential`

Ele obriga o grupo a executar sequencialmente quando concorrencia poderia existir.
Se o editor o marca como depreciado ou desnecessario na versao usada, remova-o. Os
testes devem ser independentes; compartilhar estado e depender de ordem e um cheiro.
Use serializacao apenas para recurso externo impossivel de isolar, nao para corrigir
setup fragil.

## Formularios Assincronos

Teste:

- preenchimento e mensagens por interacao;
- payload enviado ao service;
- disabled/pending durante submit;
- sucesso e erro observaveis;
- reset ou navegacao conforme contrato.

Use stubs de campo com cuidado: eles precisam reproduzir `modelValue` e
`update:modelValue`, inclusive conversao de number quando relevante. Caso contrario,
o teste valida um contrato diferente do componente real.

## Composables com Lifecycle

Para testar um composable que usa `onMounted`, monte um componente harness:

```ts
const Harness = defineComponent({
  setup() {
    exposed = useCustomersList()
    return () => null
  },
})

mount(Harness)
await flushPromises()
```

Funcoes puras extraidas do composable podem ser testadas sem mount. O harness existe
porque o lifecycle precisa de uma instancia Vue ativa.

## Router: Isolado e Real

Teste isolado de guard e rapido, mas nao prova que as rotas reais foram compostas.
Exponha uma factory:

```ts
export function createAppRouter(
  history: RouterHistory = createWebHistory(import.meta.env.BASE_URL),
) { /* rotas reais */ }
```

No teste:

```ts
const router = createAppRouter(createMemoryHistory())
await router.push('/customers/1/edit')
await router.isReady()
expect(router.currentRoute.value.name).toBe('customer-edit')
```

Isso valida arvores publicas/privadas, rotas importadas por feature, params e guards
sem depender do historico real do browser.

## O Que Testar

Priorize comportamento observavel e regras de risco:

- store: invariantes e persistencia;
- composable: loading, erro, concorrencia e transformacao;
- componente: render, eventos e acessibilidade critica;
- router: autenticacao, autorizacao, params e fallback;
- diretiva: efeito no elemento e sincronizacao de evento;
- schema: limites e mensagens importantes.

Cobertura percentual e sinal, nao objetivo isolado. Um teste que monta sem assert
relevante aumenta cobertura sem aumentar confianca.

## Exemplos do Workspace

- [`projeto-1/src/shared/ui/BaseInput.spec.ts`](../projeto-1/src/shared/ui/BaseInput.spec.ts)
- [`projeto-1/src/features/cart/cart.store.spec.ts`](../projeto-1/src/features/cart/cart.store.spec.ts)
- [`projeto-1/src/features/cart/components/CartButton.spec.ts`](../projeto-1/src/features/cart/components/CartButton.spec.ts)
- [`projeto-1/src/features/customers/useCustomersList.spec.ts`](../projeto-1/src/features/customers/useCustomersList.spec.ts)
- [`projeto-1/src/features/customers/CustomerCreateValidatedView.spec.ts`](../projeto-1/src/features/customers/CustomerCreateValidatedView.spec.ts)
- [`projeto-1/src/router/app.router.spec.ts`](../projeto-1/src/router/app.router.spec.ts)
- [`projeto-1/src/directives/cpf.spec.ts`](../projeto-1/src/directives/cpf.spec.ts)

## Revisao Rapida

- Teste comportamento, nao detalhe interno.
- DOM reativo precisa de tick; Promise externa pode precisar de flush/poll.
- Nem todo teste de estado reativo e assincrono.
- Mocks pertencem a fronteiras; mount real preserva integracao.
- Testes nao executam `main.ts` automaticamente.
- Router em memoria deve usar as rotas reais para validar composicao.

## Referencias

- [Testing no Vue](https://vuejs.org/guide/scaling-up/testing.html)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testando Vue Router](https://test-utils.vuejs.org/guide/advanced/vue-router.html)
- [Vitest](https://vitest.dev/guide/)
- [Mocking no Vitest](https://vitest.dev/guide/mocking.html)
- [Testing Pinia](https://pinia.vuejs.org/cookbook/testing.html)
