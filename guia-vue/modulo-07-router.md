# Modulo 7 - Vue Router

## Contexto

Vue Router associa URL, historico e arvore de componentes. Um route record descreve
o que deve ser renderizado; `RouterView` marca o ponto de encaixe; `RouterLink`
produz navegacao acessivel sem reload completo.

## Comparacao

| Vue Router | React Router | Angular Router |
| --- | --- | --- |
| `RouterView` | `Outlet` | `router-outlet` |
| `RouterLink` | `Link` | `routerLink` |
| `beforeEach` | loader/middleware da solucao | guards funcionais |
| `meta` | handle/dados da rota | data |
| children | nested routes | children |

## Configuracao Basica

```ts
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('@/features/users/UserDetailsView.vue'),
      props: true,
    },
  ],
})
```

Prefira navegacao por nome para rotas de negocio:

```ts
router.push({ name: 'user-details', params: { id: user.id } })
```

## Nested Routes e Layouts

```ts
{
  path: '/onboarding',
  component: WizardLayoutView,
  children: [
    { path: 'profile', component: ProfileStepView },
    { path: 'company', component: CompanyStepView },
  ],
}
```

O componente pai precisa expor `<RouterView />` para renderizar a filha. Nested
routes nao significam apenas paginas: modelam qualquer fluxo cuja URL e hierarquia
devam persistir, incluindo wizard, abas e areas administrativas.

Uma rota pai usada apenas para agrupamento pode renderizar um componente vazio com
`RouterView`, mas isso adiciona um nivel. Se breadcrumb depende de `name` e `meta`,
uma rota index filha nomeada costuma ser mais explicita:

```ts
{
  path: '/customers',
  name: 'customers-root',
  component: CustomersLayout,
  meta: { breadcrumb: 'Clientes' },
  children: [
    { path: '', name: 'customers-list', component: CustomersListView },
  ],
}
```

## Params e Reutilizacao de Instancia

Ao navegar de `/users/1` para `/users/2`, Vue Router pode reutilizar a mesma
instancia. Nao dependa apenas de `onMounted`; observe o param ou use
`onBeforeRouteUpdate`.

```ts
watch(() => route.params.id, loadUser, { immediate: true })
```

## Lazy Loading

Para paginas de rota, use import dinamico diretamente:

```ts
component: () => import('./CustomerEditView.vue')
```

Vue Router resolve e armazena o modulo. Isso e distinto de
`defineAsyncComponent`, indicado para componentes assincronos dentro de uma pagina.

## Guards: Pipeline de Navegacao

Guards nao sao lifecycle hooks do componente, embora participem do ciclo da
navegacao.

- `beforeEach`: global, executado em ordem de registro.
- `beforeResolve`: apos guards de componentes e componentes async, antes de confirmar.
- `afterEach`: observacao posterior; nao cancela navegacao.
- `beforeEnter`: pertence ao route record.
- `onBeforeRouteLeave` / `onBeforeRouteUpdate`: pertencem ao componente de rota.

```ts
router.beforeEach(requireAuthentication)
router.beforeEach(requireAuthorization)
router.afterEach(trackNavigation)
```

Registrar mais de um `beforeEach` e valido. Eles formam um pipeline semelhante a
middlewares do ASP.NET Core: ordem importa, um redirect/cancelamento interrompe a
navegacao corrente, e guards seguintes so participam da navegacao resultante quando
aplicavel.

Prefira retornar `false`, uma rota ou nada. O argumento legado `next` continua por
compatibilidade, mas e mais sujeito a chamadas duplicadas.

## Meta Tipada

`requiresAuth` nao e nome reservado. `meta` aceita dados definidos pela aplicacao.

```ts
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    roles?: Array<'organizer' | 'administrator'>
    breadcrumb?: string
  }
}
```

`to.meta` combina de forma nao recursiva metadados dos records pai e filho. Isso
permite colocar `requiresAuth` no grupo privado e autorizar a arvore uma vez.

Autenticacao e autorizacao podem ficar em guards separados: primeiro prova-se quem
e o usuario; depois, se ele possui permissao. Menus privados ainda sao UI e devem
ser derivados da store de autenticacao; esconder link nao substitui guard.

## Arvores Publica e Privada

```text
PublicLayout
  /, /events, /login
AuthenticatedLayout  meta.requiresAuth
  /dashboard, /account
ManagementLayout     meta.roles
  /management/**
```

Um redirect pode depender da sessao. Exemplo: `/` leva visitante para Home e usuario
autenticado para Dashboard. Isso pode ser um guard ou redirect funcional; evite
duplicar a regra entre menu, componente e router.

## 404 de Rota e 404 de Recurso

Catch-all:

```ts
{
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  component: NotFoundView,
}
```

O rankeamento do Router prioriza rotas mais especificas, mas manter o catch-all no
fim melhora leitura e evita surpresas em configuracoes complexas.

Para `/users/999`, a URL e uma rota valida; o recurso e que nao existe. A propria
view deve renderizar loading, detalhe ou `ResourceNotFound` conforme a resposta da
API. Assim a URL permanece `/users/999`, o que preserva diagnostico, refresh e link.

## Classes do RouterLink

`RouterLink` aplica automaticamente `router-link-active` e
`router-link-exact-active` ao elemento renderizado. Nao e injecao de CSS: e uma
classe calculada pelo componente conforme a rota atual. Os nomes podem ser
configurados globalmente ou por link.

## Separacao por Feature

```text
router/index.ts
features/customers/customer.routes.ts
features/cart/cart.routes.ts
features/onboarding/onboarding.routes.ts
```

O router raiz compoe as arvores e guards globais; cada feature declara seus route
records. Essa divisao reduz acoplamento e evita um `index.ts` crescente.

## Armadilhas

- Criar children sem `RouterView` no componente pai.
- Usar apenas `onMounted` para params de uma instancia reutilizada.
- Confiar em item de menu oculto como autorizacao.
- Dar redirect para `/404` quando apenas o recurso consultado nao existe.
- Usar path string em todo `push` e espalhar detalhes de URL.
- Misturar breadcrumb, autenticacao e analytics em um unico guard enorme.
- Fazer um guard redirecionar para uma rota que o proprio guard bloqueia.

## Exemplos do Workspace

- [`projeto-1/src/router/index.ts`](../projeto-1/src/router/index.ts)
- [`projeto-1/src/features/users/user.routes.ts`](../projeto-1/src/features/users/user.routes.ts)
- [`projeto-1/src/features/onboarding/onboarding.routes.ts`](../projeto-1/src/features/onboarding/onboarding.routes.ts)
- [`projeto-1/src/layouts/components/Breadcrumb.vue`](../projeto-1/src/layouts/components/Breadcrumb.vue)
- [`projeto-1/src/shared/router/RenderViewEmpty.vue`](../projeto-1/src/shared/router/RenderViewEmpty.vue)

## Referencias

- [Guia do Vue Router](https://router.vuejs.org/guide/)
- [Nested routes](https://router.vuejs.org/guide/essentials/nested-routes.html)
- [Navigation guards](https://router.vuejs.org/guide/advanced/navigation-guards.html)
- [Route meta](https://router.vuejs.org/guide/advanced/meta.html)
- [Lazy loading](https://router.vuejs.org/guide/advanced/lazy-loading.html)
