# TechEventHub - Criterios de Aceite do MVP

O MVP esta pronto quando os criterios abaixo forem atendidos em uma build de
producao executavel sem backend externo.

## Experiencia Publica

- `/` encaminha visitantes para o catalogo e perfis autenticados para a area
  inicial correspondente.
- Visitantes acessam catalogo e detalhes sem autenticacao.
- Busca, filtros e ordenacao do catalogo funcionam e sao refletidos na URL.
- Detalhes apresentam dados, sessoes, palestrantes e disponibilidade do evento.
- Eventos inexistentes, cancelados e encerrados possuem experiencias adequadas.
- Todas as paginas tratam loading, erro e estados vazios aplicaveis.

## Autenticacao e Participante

- Login validado oferece contas rapidas para os tres perfis.
- Rotas privadas preservam e restauram o destino solicitado.
- Favoritar sem sessao inicia login e conclui a intencao automaticamente.
- Participante gerencia favoritos, inscricoes e sessoes da agenda.
- Capacidade, duplicidade e dependencia entre inscricao e agenda sao respeitadas.
- Sessao e preferencias relevantes persistem entre recarregamentos.

## Gestao

- Participantes nao acessam `/management`.
- Organizadores administram apenas seus eventos e recursos permitidos.
- Administradores possuem visao global.
- O dashboard adapta indicadores e dados ao perfil.
- Eventos podem ser criados, salvos como rascunho, publicados, editados e cancelados.
- Somente rascunhos podem ser excluidos definitivamente.
- O formulario em etapas permite salvar progresso incompleto.
- A publicacao aplica todas as invariantes de evento e sessao.
- Palestrantes respeitam propriedade, compartilhamento e arquivamento.

## Experiencia e Qualidade

- O layout funciona em dispositivos moveis e desktop.
- Tema claro e escuro sao persistidos.
- Modais, toasts, formularios e navegacao por teclado possuem acessibilidade basica.
- Rotas administrativas e componentes pesados usam carregamento sob demanda quando
  houver beneficio mensuravel.
- A API e simulada com MSW e acessada exclusivamente por services.
- Erros, latencia e respostas vazias podem ser demonstrados pelos mocks.
- TypeScript e `vue-tsc` nao apresentam erros.
- Testes cobrem regras de dominio, stores, composables, componentes criticos e
  autorizacao de rotas.
- A suite de testes e a build de producao passam no ambiente local e na integracao
  continua.

## Portfolio

- O README publico explica produto, stack, arquitetura, execucao e testes.
- O repositorio apresenta dados demonstrativos coerentes.
- A aplicacao pode ser explorada sem configurar um backend.
- Decisoes arquiteturais e trade-offs relevantes estao documentados.
- O backlog de evolucao com Nuxt esta separado do escopo da SPA inicial.
