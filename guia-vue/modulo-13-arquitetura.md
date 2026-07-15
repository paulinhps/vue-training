# Modulo 13 - Arquitetura

## Contexto

Vue nao prescreve uma arquitetura rigida. Isso e liberdade e risco: projetos pequenos
podem comecar simples, mas organizacao por tipo (`components`, `services`, `stores`)
tende a espalhar uma feature por toda a arvore conforme o dominio cresce.

Feature First aproxima codigo que muda junto. `shared` contem capacidades genericas
e estaveis; `app` ou raiz compoe features, router, plugins e layouts.

## Comparacao

| Vue | React | Angular |
| --- | --- | --- |
| Convencao arquitetural flexivel | Flexivel | Estrutura e DI mais prescritivas |
| Feature folders | Feature folders | Feature areas/libraries |
| Composables | hooks | services/facades |
| Pinia stores | stores/hooks | services/store |
| Plugins/provide | providers/context | providers/injector |

Conhecimento de Angular pode induzir classes e DI para tudo. Conhecimento de React
pode induzir uma pasta global de hooks/components sem ownership. No Vue, comece por
modulos ES e features; adicione indirecao quando houver necessidade real.

## Estrutura de Referencia

```text
src/
  app/
    router/
    layouts/
    plugins/
  features/
    auth/
    cart/
      components/
      cart.routes.ts
      cart.store.ts
    customers/
      components/
      customer.routes.ts
      customer.schema.ts
      customer.service.ts
      customer.types.ts
      useCustomersList.ts
      CustomersListView.vue
  shared/
    http/
    router/
    ui/
  views/
    HomeView.vue
    NotFoundView.vue
  App.vue
  main.ts
```

O nome exato e menos importante que ownership claro e dependencia previsivel.

## Regras de Posicionamento

### Feature

Coloque na feature quando o codigo conhece seu vocabulario ou caso de uso:

- `useCustomerCreateForm` conhece Customer;
- `customer.schema` valida regras de Customer;
- `CustomerEditView` representa uma pagina da feature;
- `customer.routes` expoe a navegacao da feature.

### Shared

Coloque em shared quando o contrato e generico, reutilizado e nao conhece dominio:

- `BaseInput`;
- `withRetry`;
- `RenderViewEmpty`;
- composable generico de localStorage, quando houver consumidores reais.

Nao promova para shared apenas porque "talvez seja util". Duplicacao pequena e
temporaria pode revelar a abstracao correta melhor que generalizacao precoce.

### App, Layouts e Views Globais

- layout coordena estrutura global e pontos de composicao;
- App instala o shell da aplicacao;
- `views/` raiz deve conter apenas telas realmente globais, como Home, Forbidden e
  NotFound;
- telas de Customer, Cart ou Onboarding pertencem as respectivas features.

## `components/` e `shared/ui`

Manter ambos como fontes de componentes genericos cria ambiguidade. Escolha uma
convencao:

- `shared/ui` para primitives e componentes reutilizaveis;
- `features/*/components` para componentes de feature;
- `layouts/components` para elementos de layout.

Uma pasta `components` do scaffold pode ser migrada gradualmente; nao precisa
coexistir como destino permanente.

## Dependencias entre Layout e Feature

O `CartButton` pertence a feature cart, mesmo aparecendo em toda a aplicacao. O
layout pode importa-lo:

```text
App/Layout -> CartButton -> cart.store
```

O layout e composition root e esta autorizado a compor features. O problema seria
shared importar cart, porque shared deixaria de ser generico. Teleport nao altera
essa dependencia; apenas reposiciona DOM.

## Rotas por Feature

```ts
// features/customers/customer.routes.ts
export const customerRoutes: RouteRecordRaw[] = [/* ... */]

// router/index.ts
children: [
  ...customerRoutes,
  ...cartRoutes,
]
```

Separe quando novas features inflarem o router central. A feature declara records;
o router raiz decide em qual arvore publica/privada eles entram e instala guards
globais.

## Composables, Stores e Services

| Artefato | Responsabilidade |
| --- | --- |
| componente | renderizacao e eventos do usuario |
| composable | estado e fluxo reutilizavel da UI/feature |
| store | estado compartilhado e actions |
| service | fronteira externa/HTTP |
| schema | contrato e validacao runtime |
| plugin | infraestrutura instalada na aplicacao |

Um service pode ser uma colecao de funcoes exportadas. Classe injetavel nao e sinal
automatico de arquitetura madura. Use classe/injecao quando estado, implementacoes
intercambiaveis ou lifecycle da dependencia justificarem.

## Domain-Driven Frontend

Nao significa copiar todas as camadas do backend. Significa usar linguagem do
produto e organizar por capacidades:

```text
events/
  catalog/
  management/
  event.types.ts
favorites/
registrations/
schedule/
```

Entidades de frontend tambem incluem estado de apresentacao, permissao e fluxo. DTO
de API nao precisa ser o mesmo modelo usado no formulario ou na view.

## Direcao de Dependencias

```text
app/layouts -> features -> shared
                      \-> services/schemas da propria feature
shared -X-> feature
feature A -> feature B somente por contrato explicito ou composicao superior
```

Quando duas features precisam coordenar um fluxo, opcoes incluem uma store de
orquestracao, um modulo de aplicacao ou eventos/contratos claros. Evite importacao
circular e singleton oculto.

## Perguntas de Posicionamento Respondidas

- Composable que conhece Customer: feature customers.
- Composable generico de localStorage: shared, depois de reutilizacao real.
- Schema de Customer: feature customers.
- Rotas de Customer: feature customers.
- Diretivas genericas de input: `shared/directives` ou `directives` global bem
  definido.
- Breadcrumb visual: layouts/shared UI conforme seu nivel de reutilizacao.
- `CartButton`: feature cart, composto pelo layout.
- Views de feature: dentro da feature; `views/` raiz apenas para telas globais.

## Armadilhas

- Criar `shared` como deposito de tudo que nao tem lugar claro.
- Duplicar fontes de componentes genericos.
- Fazer shared depender de feature.
- Separar arquivos por tipo e obrigar uma mudanca simples a atravessar dez pastas.
- Criar repository, facade, use case e adapter para CRUD trivial sem variacao.
- Esperar que Vue imponha uma arquitetura oficial rigida.
- Migrar toda a estrutura de uma vez sem beneficio funcional.

## Exemplos do Workspace

- [`projeto-1/src/features/customers`](../projeto-1/src/features/customers)
- [`projeto-1/src/features/cart`](../projeto-1/src/features/cart)
- [`projeto-1/src/shared`](../projeto-1/src/shared)
- [`projeto-1/src/layouts`](../projeto-1/src/layouts)
- [`projeto-1/src/router/index.ts`](../projeto-1/src/router/index.ts)

## Revisao Rapida

- Feature First agrupa codigo que muda junto.
- Shared nao conhece dominio nem importa features.
- Um componente globalmente visivel pode continuar pertencendo a uma feature.
- `views/` raiz nao deve competir com feature folders.
- Arquitetura profissional e proporcional, nao maximamente abstrata.

## Referencias

- [Vue: scaling up](https://vuejs.org/guide/scaling-up/)
- [State management](https://vuejs.org/guide/scaling-up/state-management.html)
- [Composables](https://vuejs.org/guide/reusability/composables.html)
