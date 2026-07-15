# Modulo 6 - Comunicacao e Provide/Inject

## Contexto

Props e emits sao ideais para relacoes diretas e visiveis. Quando varios
descendentes precisam do mesmo contexto e encaminhar props por cada nivel nao agrega
valor, `provide`/`inject` cria uma dependencia hierarquica.

Ele nao e um store global. A resolucao sobe pela arvore logica de componentes e usa
o provider ancestral mais proximo.

## Comparacao

| Vue | React | Angular |
| --- | --- | --- |
| `provide` / `inject` | Context Provider / `useContext` | Injector hierarquico |
| `InjectionKey<T>` | Context tipado | InjectionToken |
| Provider mais proximo vence | Provider mais proximo vence | Injector mais proximo vence |

Angular DI instancia e gerencia providers com regras de escopo. Vue apenas associa
uma chave a um valor no contexto da arvore. Nao ha resolucao automatica por classe.

## Contrato Tipado

```ts
import type { InjectionKey, Ref } from 'vue'

interface ThemeContext {
  theme: Readonly<Ref<'light' | 'dark'>>
  toggleTheme: () => void
}

export const themeContextKey: InjectionKey<ThemeContext> = Symbol('themeContext')
```

`InjectionKey<T>` tipa a relacao entre provider e consumidor. O `Symbol` e a
identidade real da chave. A descricao `'themeContext'` serve apenas para debug.

```ts
provide(themeContextKey, context)
const theme = inject(themeContextKey)
```

Fazer `inject('themeContext')` nao encontra um valor fornecido com o Symbol, mesmo
que a descricao seja igual. String e Symbol sao chaves diferentes, e dois Symbols
com a mesma descricao tambem sao diferentes.

## Provider como Componente

```vue
<script setup lang="ts">
const theme = ref<'light' | 'dark'>('light')

provide(themeContextKey, {
  theme: readonly(theme),
  toggleTheme: () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  },
})
</script>

<template>
  <section :data-theme="theme">
    <slot />
  </section>
</template>
```

O provider possui o estado e expoe leitura + acoes. Consumidores nao precisam saber
como o tema e persistido.

## Hierarquia e Sombreamento

Dois `ThemeProvider` aninhados criam contextos independentes. Descendentes do
provider interno recebem o valor interno; os demais continuam com o externo.

Um componente intermediario como `ThemeSettingsPanel` nao "quebra" a resolucao. A
hierarquia so muda quando:

- o consumidor e montado fora do provider;
- outro provider com a mesma chave e inserido no caminho;
- uma nova aplicacao Vue e criada;
- o valor e solicitado antes de existir um contexto de componente valido.

`Teleport` move DOM, nao a arvore logica do componente; injections continuam
resolvidas pelo local onde o componente foi declarado.

## Composable Compartilhado ou Contexto

Um composable pode encapsular a API de acesso:

```ts
export function useTheme() {
  const context = inject(themeContextKey)
  if (!context) throw new Error('useTheme requer ThemeProvider')
  return context
}
```

- composable local cria estado por consumidor;
- ref no escopo do modulo cria singleton;
- provide/inject cria estado por subarvore;
- Pinia cria estado de aplicacao com convencoes e DevTools.

Escolha pelo ownership, nao pela quantidade de linhas.

## Eventos e Composables Compartilhados

Para pai-filho, continue usando props/emits. Para comunicacao entre features, evite
event bus global sem contrato. Prefira:

- store para estado compartilhado de aplicacao;
- composable para logica reutilizavel;
- provider para contexto de uma subarvore;
- evento para notificar o dono direto.

## Code Smells

- Usar `inject` em muitos componentes sem tornar a dependencia evidente.
- Injetar um grande objeto mutavel e permitir escrita em qualquer lugar.
- Usar provide/inject como service locator global.
- Fornecer valor no `App.vue` quando apenas uma feature precisa dele.
- Usar string em bibliotecas e correr risco de colisao.
- Retornar `undefined` silenciosamente para um contexto obrigatorio.

## Exemplos do Workspace

- [`test1/src/contexts/themeContext.ts`](../test1/src/contexts/themeContext.ts)
- [`test1/src/components/ThemeProvider.vue`](../test1/src/components/ThemeProvider.vue)
- [`test1/src/components/ThemeSwitcher.vue`](../test1/src/components/ThemeSwitcher.vue)
- [`test1/src/components/ThemeSettingsPanel.vue`](../test1/src/components/ThemeSettingsPanel.vue)
- [`projeto-1/src/contexts/breadcrumbContext.ts`](../projeto-1/src/contexts/breadcrumbContext.ts)

## Revisao Rapida

- `InjectionKey` e contrato TypeScript; `Symbol` e identidade runtime.
- Injection atravessa intermediarios, mas nao sai da arvore ancestral.
- Provider aninhado sombreia o externo sem altera-lo.
- Teleport nao muda contexto.
- Estado global de negocio costuma pertencer ao Pinia, nao ao provider raiz.

## Referencias

- [Provide/inject](https://vuejs.org/guide/components/provide-inject.html)
- [Typing provide/inject](https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject)
