# Modulo 4 - Reatividade

## Contexto

O sistema de reatividade conecta leituras a efeitos. Quando um efeito acessa um
valor reativo, Vue registra a dependencia; quando o valor muda, apenas os efeitos
dependentes sao invalidados.

```text
leitura durante efeito -> dependencia registrada -> escrita -> efeito reagendado
```

Isso difere do modelo de renderizacao funcional do React e se aproxima de signals
modernos, embora as APIs e o scheduler sejam proprios do Vue.

## APIs Principais

| API | Uso |
| --- | --- |
| `ref` | Valor substituivel, primitivo ou objeto |
| `reactive` | Proxy de objeto com reatividade profunda |
| `computed` | Valor derivado, cacheado por dependencias |
| `watch` | Efeito com fontes explicitas e valores anterior/atual |
| `watchEffect` | Efeito que descobre dependencias durante a execucao |
| `readonly` | Exposicao sem escrita |
| `shallowRef` | Reage apenas a substituicao de `.value` |
| `toRef` / `toRefs` | Preserva ligacao reativa ao desestruturar propriedades |
| `customRef` | Controle manual de `track` e `trigger` |

## `ref` e `reactive`

```ts
const count = ref(0)
const form = reactive({ name: '', email: '' })

count.value++
form.name = 'Ana'
```

No template, refs sao desempacotadas automaticamente. Em TypeScript, composables e
funcoes, use `.value`. Prefira `ref` quando o valor pode ser substituido; use
`reactive` para um agregado estavel manipulado por propriedades.

Desestruturar um `reactive` perde a conexao:

```ts
const { name } = reactiveUser        // valor comum
const { name: nameRef } = toRefs(reactiveUser) // ref ligada
```

## `computed`

```ts
const subtotal = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
)
```

E um valor derivado declarativo e cacheado ate uma dependencia mudar. Lembra
`useMemo`, mas nao e uma dica opcional de renderizacao: e um no reativo lazy.
`computed` deve ser puro; efeitos colaterais pertencem a actions ou watchers.

## `watch` e `watchEffect`

```ts
watch(searchTerm, async (term, previousTerm, onCleanup) => {
  const controller = new AbortController()
  onCleanup(() => controller.abort())
  results.value = await search(term, controller.signal)
})
```

`watch` e semelhante a `useEffect` com dependencia explicita, mas entrega valor
anterior e cleanup associado a cada execucao. `watchEffect` executa imediatamente e
descobre dependencias lidas sincronamente.

Uma Promise iniciada por `watch` nao bloqueia a thread enquanto aguarda a rede. O
risco real e concorrencia: respostas antigas podem chegar depois, sobrescrever dados
novos ou manter loading incorreto. Cleanup e `AbortController` resolvem cancelamento;
um identificador de requisicao tambem pode impedir commit de resposta obsoleta.

## `Ref<T, S>`

Nas tipagens modernas do Vue, `Ref` pode ter tipo de leitura e de escrita:

```ts
interface Ref<T = any, S = T> {
  get value(): T
  set value(_: S)
}
```

`Ref<T>` usa `S = T`. Portanto, `Ref<T, T>` costuma ser equivalente, apenas mais
verboso. Dois parametros sao uteis quando um setter aceita tipo diferente do valor
lido. Sugestoes do editor podem revelar a assinatura inferida, mas APIs publicas
simples normalmente retornam `Ref<T>`.

## `customRef`

```ts
function useDebouncedRef<T>(initialValue: T, delay: number) {
  let value = initialValue
  let timer: ReturnType<typeof setTimeout>

  return customRef<T>((track, trigger) => ({
    get() {
      track()
      return value
    },
    set(nextValue) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        value = nextValue
        trigger()
      }, delay)
    },
  }))
}
```

`customRef` customiza quando a leitura e rastreada e quando consumidores sao
notificados. Ele e adequado para debounce, integracao com estado externo e
normalizacao controlada; nao deve substituir composables comuns sem necessidade.

No exemplo de CEP, a partir do terceiro caractere a entrada e completada com zeros
para produzir oito digitos e disparar a busca. Essa regra e didatica: em produto
real, normalizacao e validacao devem refletir o dominio.

## Tipos Dentro ou Fora do Composable

Um tipo declarado dentro da funcao existe apenas naquele escopo e e recriado apenas
no sentido lexical, nao em runtime (tipos sao apagados). Fora da funcao, ele pode ser
reutilizado no arquivo e deixa a assinatura mais legivel. Sem `export`, continua
privado ao modulo. Exporte apenas se consumidores precisarem nomear o contrato.

## Armadilhas

- Desestruturar `reactive` diretamente.
- Usar `watch` para calcular algo que deveria ser `computed`.
- Criar `watchEffect` assincrono e esperar que leituras depois do primeiro `await`
  sejam rastreadas automaticamente.
- Aplicar `deep: true` por reflexo em objetos grandes.
- Esquecer cleanup de timers, listeners e requisicoes.
- Mutar internamente um objeto guardado em `shallowRef` e esperar atualizacao.

## Exemplos do Workspace

- [`test1/src/components/CartComputedExample.vue`](../test1/src/components/CartComputedExample.vue)
- [`test1/src/components/WatchExample.vue`](../test1/src/components/WatchExample.vue)
- [`test1/src/composables/useCepSearch.ts`](../test1/src/composables/useCepSearch.ts)
- [`test1/src/components/CepSearch.vue`](../test1/src/components/CepSearch.vue)
- [`projeto-1/src/features/customers/CustomerWorkspaceView.vue`](../projeto-1/src/features/customers/CustomerWorkspaceView.vue)

## Revisao Rapida

- `computed` modela estado derivado; `watch` modela reacao com efeito colateral.
- `watchEffect` descobre dependencias; `watch` as declara.
- Async nao bloqueia durante a espera, mas cria riscos de corrida.
- `shallowRef` observa a substituicao de `.value`, nao mutacoes profundas.
- `customRef` controla `track` e `trigger`.

## Referencias

- [Fundamentos de reatividade](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)
- [Computed](https://vuejs.org/guide/essentials/computed.html)
- [Watchers](https://vuejs.org/guide/essentials/watchers.html)
- [APIs avancadas de reatividade](https://vuejs.org/api/reactivity-advanced.html)
