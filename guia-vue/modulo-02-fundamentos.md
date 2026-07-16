# Modulo 2 - Templates e Diretivas

## Contexto

Templates descrevem a relacao entre estado e interface. Diretivas sao instrucoes
compiladas, prefixadas por `v-`, que adicionam comportamento declarativo ao DOM.
Elas substituem boa parte da manipulacao imperativa que seria feita com refs de DOM.

## Comparacao

| Vue | React | Angular |
| --- | --- | --- |
| `{{ value }}` | `{value}` | `{{ value }}` |
| `:prop="value"` | `prop={value}` | `[prop]="value"` |
| `@click="handler"` | `onClick={handler}` | `(click)="handler"` |
| `v-if` | condicao em JSX | `@if` / `*ngIf` legado |
| `v-for` | `array.map()` | `@for` / `*ngFor` legado |

## Interpolacao e Binding

```vue
<p>{{ user.name }}</p>
<img :src="user.avatarUrl" :alt="user.name">
<button :disabled="isSaving">Salvar</button>
```

Interpolacao produz texto escapado. `v-bind`, abreviado por `:`, avalia uma
expressao e atualiza atributo ou prop. Para booleanos, `false`, `null` e
`undefined` removem ou desativam o atributo conforme a semantica do DOM.

Evite `v-html` com conteudo nao confiavel: ele insere HTML e pode abrir XSS.

## Eventos

```vue
<button @click="save">Salvar</button>
<form @submit.prevent="submitForm">
<input @keyup.enter="search">
```

Modificadores como `.prevent`, `.stop`, `.once` e modificadores de tecla deixam a
intencao no template. A regra pratica e manter expressoes pequenas; fluxo de negocio
fica em funcoes no script.

## Condicionais

```vue
<LoadingState v-if="status === 'loading'" />
<ErrorState v-else-if="status === 'error'" />
<Dashboard v-else />
```

- `v-if` cria e destroi a subarvore. Use quando a condicao muda pouco ou o conteudo
  nao deve existir no DOM.
- `v-show` mantem o elemento e alterna `display`. Use em alternancias frequentes e
  elementos baratos.

## Loops e Chaves

```vue
<li v-for="(product, index) in products" :key="product.id">
  {{ index + 1 }}. {{ product.name }}
</li>
```

A sintaxe `(product, index)` e valida. `index` e uma variavel local exposta pelo
`v-for`, nao uma prop do componente. Para objetos, tambem e possivel obter valor,
chave e indice.

`key` representa identidade entre renderizacoes. Prefira ID estavel. Usar o indice
como chave e aceitavel apenas para listas estaticas, sem reordenacao, insercao,
remocao ou estado local por item.

## Classes e Estilos

```vue
<article
  :class="['card', { 'card--selected': selected, 'card--disabled': disabled }]"
  :style="{ opacity: disabled ? 0.5 : 1 }"
>
```

Class binding aceita string, array e objeto. Style binding aceita objeto ou array.
Para estados recorrentes, prefira classes semanticas; style inline e adequado para
valores realmente dinamicos, como largura calculada.

## Templates Invisiveis

`<template>` agrupa diretivas sem inserir um elemento no DOM:

```vue
<template v-if="hasAccess">
  <h2>Administracao</h2>
  <AdminActions />
</template>
```

Ele nao e exclusivo de slots. Tambem e util com `v-if` e `v-for` quando um wrapper
seria semanticamente incorreto.

## Conteudo Dinamico em `::before` e `::after`

Pseudo-elementos pertencem ao CSS e nao existem como nos acessiveis pelo template.
Para alimentar `content` dinamicamente, exponha um atributo:

```vue
<button class="cart" :data-count="totalItems" aria-label="Abrir carrinho">
  Carrinho
</button>
```

```css
.cart::after {
  content: attr(data-count);
}
```

CSS custom properties tambem podem transportar valores, mas `attr()` e direto para
texto. Se o conteudo comunica informacao essencial ou precisa ser acessivel e
interativo, renderize um elemento real como `<span>`; leitores de tela nao tratam
pseudo-elementos de forma uniforme.

## Duvidas Consolidadas

### O indice de `v-for` e uma prop declarada?

Nao. E uma variavel de escopo criada pela diretiva. Ela existe apenas dentro do
elemento ou bloco onde o `v-for` se aplica.

### Posso combinar `v-if` e `v-for` no mesmo elemento?

Evite. `v-if` possui precedencia e nao enxerga a variavel do `v-for`. Filtre a lista
em um `computed` ou coloque as diretivas em niveis diferentes.

### Por que nao manipular classes diretamente pelo DOM?

Porque o template deve ser funcao do estado. Alteracao imperativa pode divergir da
proxima atualizacao reativa e torna testes mais frageis.

## Praticas Profissionais

- Modele estados mutuamente exclusivos (`idle`, `loading`, `success`, `error`).
- Diferencie lista vazia de filtro sem resultados.
- Nao use metodos com efeitos colaterais dentro da interpolacao.
- Use `computed` para listas filtradas e ordenadas.
- Preserve semantica HTML; `<template>` evita wrappers puramente tecnicos.

## Exemplos do Workspace

- [`projeto-1/src/features/examples/components/SimpleDashboard.vue`](../projeto-1/src/features/examples/components/SimpleDashboard.vue)
- [`projeto-1/src/features/examples/components/SalesDashboard.vue`](../projeto-1/src/features/examples/components/SalesDashboard.vue)
- [`projeto-1/src/features/examples/components/LoadingState.vue`](../projeto-1/src/features/examples/components/LoadingState.vue)
- [`projeto-1/src/features/examples/components/ErrorState.vue`](../projeto-1/src/features/examples/components/ErrorState.vue)

## Revisao Rapida

- `:` e abreviacao de `v-bind`; `@` e abreviacao de `v-on`.
- `v-if` desmonta; `v-show` esconde.
- `v-for` pode expor item e indice, mas a chave deve representar identidade.
- `<template>` agrupa sem produzir um no adicional.

## Referencias

- [Sintaxe de templates](https://vuejs.org/guide/essentials/template-syntax.html)
- [Renderizacao condicional](https://vuejs.org/guide/essentials/conditional.html)
- [Renderizacao de listas](https://vuejs.org/guide/essentials/list.html)
- [Class e style bindings](https://vuejs.org/guide/essentials/class-and-style.html)
