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

