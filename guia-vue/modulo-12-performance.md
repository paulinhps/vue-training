# Modulo 12 - Performance

## Contexto

Performance e uma disciplina de medicao. Vue ja otimiza dependencias e patches; as
APIs deste modulo sao ferramentas para gargalos observados, nao decoracao de codigo.

Comece por arquitetura de entrega e estabilidade de props antes de micro-otimizar
calculos pequenos.

## Estrategia em Camadas

1. Escolha correta de arquitetura: SPA, SSR ou SSG.
2. Menos JavaScript inicial: lazy routes e code splitting.
3. Menos trabalho de renderizacao: props estaveis, componentes bem delimitados.
4. Menos DOM: paginacao ou virtualizacao.
5. Menos overhead reativo: APIs shallow para dados grandes e imutaveis.
6. Otimizacoes pontuais: `v-once`, `v-memo`, memoizacao de transformacoes.

## Lazy Loading e Code Splitting

```ts
const routes = [
  { path: '/reports', component: () => import('./ReportsView.vue') },
]
```

Adie codigo raro, pesado ou isolado por rota. Nao adie tudo: requests adicionais e
fallbacks podem piorar interacao. Rotas sao um bom limite porque representam uso
real e o bundler cria chunks naturalmente.

## `computed` e Estabilidade

`computed` evita recalculo ate uma dependencia mudar e so notifica consumidores
quando o valor computado muda conforme a semantica do Vue. Use para estado derivado,
nao como supersticao de performance.

Um calculo curto com poucos itens nao merece estrutura complexa. O custo de
entendimento frequentemente supera qualquer ganho.

`watchEffect` descobre dependencias ao executar; isso e conveniente, mas pode tornar
o custo menos evidente. Para trabalho caro ou I/O, fontes explicitas em `watch`
melhoram controle.

## `v-once` e `v-memo`

```vue
<LegalNotice v-once />

<article v-memo="[event.id, event.updatedAt, selectedEventId === event.id]">
  <!-- subarvore grande -->
</article>
```

- `v-once` renderiza uma vez e nunca atualiza a subarvore.
- `v-memo` compara o array de dependencias; se nenhuma mudar, Vue pula a atualizacao
  da subarvore, inclusive criacao/patch de VNodes.

`v-memo` e uma otimizacao de baixo nivel para subarvores ou listas grandes. Nao e
equivalente geral a `useMemo`. Dependencias incompletas congelam UI incorreta; use
apenas apos profiling.

## Paginacao e Virtualizacao

As duas reduzem DOM, mas resolvem UX diferente:

- paginacao: usuario navega por conjuntos discretos; boa para tabelas, busca e URLs;
- virtualizacao: experiencia de scroll continuo com janela de itens renderizados;
- "carregar mais": meio-termo com acumulacao controlada.

Paginacao nao torna virtualizacao obsoleta, e virtualizacao nao e sempre melhor.
Altura variavel exige biblioteca que meca itens ou uma estrategia de layout
compativel. Nao tente deduzir manualmente tamanhos imprevisiveis se o produto nao
exige scroll continuo.

Use biblioteca madura para virtualizacao. Construir engine propria envolve scroll,
overscan, resize, foco, acessibilidade e restauracao de posicao.

## `shallowRef`

```ts
const rows = shallowRef<ReadonlyArray<Row>>([])

rows.value = [...rows.value, newRow] // atualiza
rows.value.push(newRow)              // nao dispara por si so
```

`ref` torna objetos profundamente reativos. `shallowRef` rastreia apenas a leitura e
substituicao de `.value`; dados internos permanecem crus. E adequado para grandes
estruturas tratadas de modo imutavel, definicoes de componente e estado externo.

## `markRaw` e `const`

```ts
const chartLibrary = markRaw(createChartLibrary())
const config = reactive({ chartLibrary })
```

Uma `const` impede reatribuicao da variavel; nao impede que o objeto seja convertido
em Proxy ao ser inserido em `reactive`, `ref` ou Pinia. `markRaw` marca o objeto para
que Vue nao o proxifique.

```ts
const teste = 1
```

Pode ser usado normalmente no template: `<span>{{ teste }}</span>`. Ele aparece,
mas nunca muda reativamente. "Nao precisa renderizar" nao significa "nao pode ser
renderizado"; significa apenas que reatividade talvez nao seja necessaria.

Use `markRaw` para:

- instancias de bibliotecas externas;
- objetos de componente armazenados em estruturas reativas;
- classes com invariantes/proxies proprios;
- grandes dados imutaveis quando a identidade crua importa.

Evite misturar versoes raw e proxificadas do mesmo objeto, pois comparacoes de
identidade podem surpreender.

## Objetos de Componente

Uma definicao importada e uma `const`, mas ao coloca-la dentro de um array reativo ou
store ela pode ser proxificada. `shallowRef(Component)` protege o slot atual;
`markRaw(Component)` protege a propria definicao ao inseri-la em containers reativos.
Escolha pelo local onde a reatividade seria introduzida.

## Props Estaveis

Em listas, nao passe um grande objeto mutavel se o filho precisa apenas de dois
valores. Calcule flags no pai quando isso evita atualizar todos os filhos:

```vue
<EventRow
  v-for="event in events"
  :key="event.id"
  :event="event"
  :selected="event.id === selectedId"
/>
```

Vue pode pular filhos cujas props permanecem estaveis.

## DevTools e Medicao

Investigue:

- bundle/chunks e dependencias grandes;
- Performance panel e Vue DevTools;
- quantidade de componentes e nos DOM;
- rerenders/updates provocados por props instaveis;
- tempo de scripting, rendering e network;
- memoria de caches KeepAlive.

Performance percebida tambem depende de loading, skeleton, prefetch e resposta a
interacao, nao apenas de milissegundos totais.

## Armadilhas

- Lazy load de componente essencial acima da dobra.
- `v-memo` sem profiling ou com dependencias incompletas.
- Deep watch em estruturas grandes.
- Virtualizar uma lista curta.
- Manter cache KeepAlive sem limite e sem pausar recursos.
- Usar `markRaw` para esconder modelagem reativa confusa.
- Otimizar calculo trivial enquanto o bundle carrega uma biblioteca enorme.

## Exemplos do Workspace

- [`projeto-1/src/router/index.ts`](../projeto-1/src/router/index.ts)
- [`projeto-1/src/features/customers/CustomerWorkspaceView.vue`](../projeto-1/src/features/customers/CustomerWorkspaceView.vue)
- [`projeto-1/src/features/customers/CustomersListView.vue`](../projeto-1/src/features/customers/CustomersListView.vue)

## Revisao Rapida

- Meça antes e depois.
- Paginacao e virtualizacao sao escolhas de produto diferentes.
- `v-memo` pula patch de subarvore quando dependencias permanecem iguais.
- `const` controla binding; `markRaw` controla proxificacao.
- `shallowRef` exige substituicao da raiz.

## Referencias

- [Performance no Vue](https://vuejs.org/guide/best-practices/performance.html)
- [Reatividade avancada](https://vuejs.org/api/reactivity-advanced.html)
- [Diretivas built-in](https://vuejs.org/api/built-in-directives.html)
