# TechEventHub - Navegacao

## Estrutura Confirmada

```text
PublicLayout
|-- /
|-- /events
|-- /events/:slug
`-- /login

AccountLayout                         requiresAuth
|-- /my/favorites
|-- /my/schedule
`-- /my/registrations

ManagementLayout                      organizer | administrator
|-- /management
|-- /management/events
|-- /management/events/new
|-- /management/events/:id/edit
`-- /management/speakers

Global
|-- /forbidden
`-- /:pathMatch(.*)*
```

## Rotas Publicas

| Caminho | Pagina | Responsabilidade |
| --- | --- | --- |
| `/` | Home | Apresentar eventos em destaque e proximos eventos |
| `/events` | Catalogo | Buscar, filtrar e ordenar eventos publicados |
| `/events/:slug` | Detalhes | Apresentar informacoes, sessoes e palestrantes |
| `/login` | Login | Autenticar com formulario ou conta demonstrativa |

## Rotas da Conta

Todas exigem autenticacao.

| Caminho | Pagina | Responsabilidade |
| --- | --- | --- |
| `/my/favorites` | Favoritos | Consultar e remover eventos favoritos |
| `/my/schedule` | Agenda | Consultar a agenda pessoal |
| `/my/registrations` | Inscricoes | Consultar e cancelar inscricoes simuladas |

## Rotas de Gestao

Todas exigem autenticacao e perfil de organizador ou administrador.

| Caminho | Pagina | Responsabilidade |
| --- | --- | --- |
| `/management` | Dashboard | Exibir indicadores de acordo com o perfil |
| `/management/events` | Eventos | Listar e administrar eventos permitidos |
| `/management/events/new` | Novo evento | Executar o formulario de criacao em etapas |
| `/management/events/:id/edit` | Editar evento | Editar um evento autorizado |
| `/management/speakers` | Palestrantes | Administrar palestrantes |

## Regras de Acesso

| Area | Visitante | Participante | Organizador | Administrador |
| --- | --- | --- | --- | --- |
| Publica | Sim | Sim | Sim | Sim |
| Conta | Nao | Sim | Sim | Sim |
| Gestao | Nao | Nao | Sim | Sim |
| Dados globais | Nao | Nao | Nao | Sim |

## Comportamentos de Navegacao

- Uma rota autenticada sem sessao redireciona para `/login` e preserva o destino.
- Uma rota sem permissao redireciona para `/forbidden`.
- Login iniciado por um favorito tambem preserva a intencao de negocio.
- Login com redirect valido retorna primeiro ao destino preservado.
- Sem redirect, participante vai para sua area de conta e perfis de gestao vao
  para `/management`.
- Rotas inexistentes apresentam a pagina global de nao encontrado.

## Organizacao Esperada no Vue Router

As tres areas serao rotas pai com seus respectivos layouts e `RouterView`. Metadados
de autenticacao e perfis serao declarados no nivel pai sempre que forem comuns a
todas as filhas.

O formato final dos metadados sera definido durante a implementacao, mas deve ser
tipado por extensao de `RouteMeta`.
