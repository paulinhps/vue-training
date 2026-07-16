# TechEventHub - Arquitetura Frontend

Este documento registra a organizacao inicial do codigo da aplicacao
`tech-event-hub`. A estrutura deve evoluir junto com o produto: diretorios e
abstracoes so devem ser criados quando houver uma responsabilidade concreta para
eles.

## Estrategia de Organizacao

A aplicacao usa uma organizacao hibrida:

- responsabilidades compartilhadas ficam agrupadas pelo seu papel tecnico;
- codigo pertencente a um dominio de negocio fica agrupado por feature.

Essa divisao evita tanto uma estrutura inteiramente tecnica, que espalharia uma
feature por toda a aplicacao, quanto features isoladas que duplicariam recursos
globais.

## Estrutura Inicial

```text
src/
|-- app/
|   |-- layouts/
|   `-- router/
|-- assets/
|   `-- styles/
|-- components/
|   `-- ui/
|-- features/
|   |-- auth/
|   |-- events/
|   |-- favorites/
|   |-- registrations/
|   |-- schedule/
|   `-- speakers/
|-- pages/
|   |-- public/
|   |-- account/
|   |-- management/
|   `-- errors/
|-- services/
|   `-- http/
|-- stores/
|-- types/
|-- mocks/
`-- utils/
```

Essa arvore representa o destino esperado da organizacao, nao uma lista de pastas
que precisam ser criadas antecipadamente.

Na implementacao atual, `src/layouts/` e `src/router/` permanecem diretamente sob
`src/`. Eles poderao ser movidos para `app/` apenas se essa camada adicional passar
a melhorar a leitura da composicao global.

## Composicao de Layouts

`MainLayout` e o shell visual compartilhado. Ele define a grid da viewport, as
regioes semanticas, a rolagem e a aparencia global de header, aside, main e footer.
O aside e opcional; quando ausente, sua coluna nao existe e o main ocupa toda a
largura disponivel.

Layouts de area, como `PublicLayout` e o futuro layout de gestao, compoem o
`MainLayout` por slots. Eles fornecem o conteudo concreto das regioes e o container
apropriado para as paginas, sem duplicar a geometria e os estilos globais do shell.

Padding, largura maxima e outras necessidades do conteudo pertencem ao layout da
area ou a pagina. O `MainLayout` nao deve impor espacamento interno ao conteudo das
features.

## Composicao de Rotas

Rotas sao declaradas proximas da feature responsavel e podem ser separadas por
contexto, por exemplo rotas publicas e rotas de gestao de eventos. O roteador
principal encaixa esses conjuntos como filhos das rotas de area.

As rotas pai sao responsaveis pelo layout, prefixo e metadados comuns de acesso.
As features continuam responsaveis por caminhos relativos, paginas e metadados
especificos. Uma feature pode participar de mais de uma area.

## Responsabilidade dos Diretorios

### `app/`

Contem a composicao global da aplicacao.

- `layouts/`: layouts das areas publica, autenticada e de gestao;
- `router/`: configuracao do Vue Router, metadados tipados e guards globais.

### `assets/`

Arquivos estaticos importados pelo codigo, como imagens, fontes e estilos globais.
O subdiretorio `styles/` concentra tokens visuais, resets e estilos compartilhados.

### `components/`

Componentes reutilizaveis que nao pertencem a um dominio especifico. `ui/` deve
conter elementos de interface genericos, como botoes, campos e indicadores de
carregamento.

Um componente usado apenas pela feature de eventos deve permanecer dentro de
`features/events/`, mesmo que seja dividido em varios componentes menores.

### `features/`

Agrupa codigo por capacidade de negocio. Cada feature pode conter seus proprios
componentes, composables, services, tipos e testes quando eles forem exclusivos
daquele dominio.

- `auth/`: sessao, login e autorizacao;
- `events/`: consulta e administracao de eventos;
- `favorites/`: eventos favoritos;
- `registrations/`: inscricoes em eventos;
- `schedule/`: agenda pessoal de sessoes;
- `speakers/`: diretorio e gestao de palestrantes.

### `pages/`

Componentes associados diretamente a rotas. As paginas coordenam features e
estados de tela, mas devem evitar concentrar regras de negocio.

- `public/`: home, catalogo, detalhes e login;
- `account/`: favoritos, agenda e inscricoes;
- `management/`: dashboard e telas administrativas;
- `errors/`: acesso proibido e pagina nao encontrada.

### `services/`

Infraestrutura compartilhada para comunicacao externa. `http/` contem o cliente
HTTP e o tratamento comum de requisicoes e erros.

Services especificos de um dominio devem ficar na respectiva feature. Por exemplo,
o servico que consulta eventos pertence a `features/events/` e usa o cliente
compartilhado de `services/http/`.

### `stores/`

Stores Pinia realmente globais ou que coordenam mais de uma feature. Uma store
restrita a uma feature deve ficar dentro dela.

### `types/`

Tipos compartilhados por varios dominios ou pela infraestrutura. Tipos exclusivos
de uma feature permanecem proximos ao codigo que os utiliza.

### `mocks/`

Configuracao, handlers e dados demonstrativos do MSW. O restante da aplicacao nao
deve importar handlers ou dados mockados diretamente; deve acessar a API por meio
dos services HTTP.

A infraestrutura do MSW e configurada uma unica vez. Handlers nao precisam ser
antecipados: devem ser adicionados incrementalmente quando uma feature definir um
contrato HTTP necessario para seu fluxo.

### `utils/`

Funcoes puras e genericas reutilizadas por partes diferentes da aplicacao. Funcoes
especificas de uma regra de negocio pertencem a sua feature.

## Regras de Crescimento

1. Criar um diretorio apenas quando surgir o primeiro arquivo que pertence a ele.
2. Manter codigo especifico dentro da feature correspondente.
3. Promover codigo para uma area compartilhada somente quando houver reutilizacao
   real entre features.
4. Evitar arquivos genericos como `helpers.ts` ou `types.ts` quando um nome de
   dominio mais preciso puder expressar a responsabilidade.
5. Manter testes proximos ao codigo testado, usando o sufixo `.spec.ts`.
6. Componentes e composables nao conhecem o MSW; acessam services como fariam com
   uma API real.

## Fluxo de Dependencias

O fluxo principal de acesso a dados deve seguir esta direcao:

```text
page/component -> composable ou store -> service de feature
               -> cliente HTTP compartilhado -> API simulada pelo MSW
```

As dependencias nao devem seguir o caminho inverso. Em especial, a camada de
dominio nao deve depender de paginas, layouts ou detalhes dos mocks.
