# TechEventHub - Registro de Decisoes

Este documento registra decisoes duraveis. Novas decisoes devem ser adicionadas
com data, contexto e consequencias relevantes.

## 2026-07-15 - Tema e Nome

**Decisao:** o projeto se chamara **TechEventHub** e sera focado em eventos de
tecnologia.

**Motivo:** o dominio permite combinar uma experiencia publica visualmente rica
com fluxos administrativos, formularios, dashboards e gerenciamento de estado.

**Consequencia:** textos, categorias, dados mockados e casos de uso devem pertencer
ao ecossistema de tecnologia.

## 2026-07-15 - Favoritos Exigem Autenticacao

**Decisao:** somente participantes autenticados podem favoritar eventos.

**Motivo:** a regra cria um fluxo real para guards, redirect para login, retorno a
rota original e persistencia de estado autenticado.

**Consequencia:** ao tentar favoritar sem sessao, o usuario deve ser encaminhado ao
login e poder retornar ao contexto anterior depois da autenticacao.

## 2026-07-15 - Favorito Automatico Depois do Login

**Decisao:** quando o login for iniciado pela tentativa de favoritar um evento, a
aplicacao deve concluir o favorito automaticamente depois da autenticacao.

**Motivo:** o clique anterior ao login ja expressa a intencao do usuario. Exigir um
segundo clique criaria atrito e poderia dar a impressao de que a primeira acao foi
perdida.

**Consequencia:** antes do redirecionamento, a aplicacao deve preservar tanto a
rota de retorno quanto a intencao pendente de favoritar o evento. Depois do login,
essa intencao deve ser processada uma unica vez e removida.

## 2026-07-15 - Contas Demonstrativas de Acesso Rapido

**Decisao:** a tela de login oferecera contas demonstrativas de participante,
organizador e administrador, alem do formulario validado.

**Motivo:** permitir que quem avalia o portfolio explore rapidamente cada nivel de
acesso sem eliminar a demonstracao de formularios, validacao e autenticacao.

**Consequencia:** a interface podera preencher as credenciais da conta escolhida,
mas todas as formas de entrada passarao pelo mesmo fluxo de autenticacao. Os perfis
terao permissoes cumulativas.

## 2026-07-15 - Area de Gestao Compartilhada

**Decisao:** organizadores e administradores compartilharao rotas sob
`/management` e o mesmo layout de gestao.

**Motivo:** a area nao pertence exclusivamente ao administrador. O termo
`management` representa melhor as responsabilidades comuns dos dois perfis.

**Consequencia:** o perfil controlara o escopo dos dados e das operacoes. Um
organizador gerencia seus proprios eventos; um administrador possui visao global.
Participantes nao acessam essa arvore de rotas.

## 2026-07-15 - Tres Arvores de Navegacao

**Decisao:** a aplicacao sera organizada em uma arvore publica, uma arvore de conta
autenticada e uma arvore de gestao autorizada.

**Motivo:** cada area possui layout, navegacao e politica de acesso diferentes.

**Consequencia:** as regras comuns serao declaradas nas rotas pai e aplicadas as
rotas filhas, evitando repeticao de metadados e guards por pagina.

## 2026-07-15 - Favorito, Inscricao e Agenda Sao Estados Distintos

**Decisao:** favorito representa interesse no evento, inscricao representa a
intencao de participar e agenda representa sessoes individuais escolhidas.

**Motivo:** cada estado responde a uma necessidade diferente e possui ciclo de vida
proprio.

**Consequencia:** os tres estados terao modelos e operacoes separados. Estar
inscrito nao torna o evento favorito, e favoritar nao realiza uma inscricao.

## 2026-07-15 - Agenda Depende de Inscricao

**Decisao:** somente um participante inscrito no evento pode adicionar suas sessoes
a agenda pessoal.

**Motivo:** a agenda representa o planejamento efetivo da participacao, enquanto o
favorito representa apenas interesse.

**Consequencia:** cancelar uma inscricao remove, depois de confirmacao, todas as
sessoes daquele evento da agenda. A operacao deve manter os estados consistentes.

## 2026-07-15 - Ciclo de Vida do Evento

**Decisao:** eventos persistem apenas os estados `draft`, `published` e
`cancelled`. A condicao de evento encerrado sera derivada de `endsAt`.

**Motivo:** encerramento e uma consequencia do tempo, nao uma transicao manual de
negocio. Armazena-lo duplicaria informacao e permitiria estados inconsistentes.

**Consequencia:** somente rascunhos podem ser excluidos definitivamente. Eventos
publicados podem ser cancelados e continuam acessiveis com um aviso. Eventos
encerrados permanecem consultaveis, mas nao aceitam novas inscricoes.

## 2026-07-15 - Validacao Diferente para Rascunho e Publicacao

**Decisao:** um rascunho pode ser salvo incompleto em qualquer etapa, enquanto a
publicacao exige o preenchimento integral das informacoes e da programacao.

**Motivo:** salvar progresso e publicar sao comandos com objetivos e invariantes
diferentes.

**Consequencia:** a feature de eventos tera contratos de validacao distintos para
rascunho e publicacao. Para publicar, o evento exige imagem de capa, dados basicos,
formato, localizacao aplicavel, periodo, capacidade e ao menos uma sessao valida
com palestrante.

## 2026-07-15 - Dashboard Adaptado ao Perfil

**Decisao:** organizador e administrador usarao a mesma rota e estrutura de
dashboard, com indicadores e escopo de dados adaptados ao perfil.

**Motivo:** os dois perfis executam gestao, mas respondem a perguntas diferentes.
Duplicar paginas e layouts criaria manutencao desnecessaria.

**Consequencia:** organizadores enxergam apenas seus eventos, inscricoes e ocupacao.
Administradores enxergam indicadores globais, organizadores ativos, categorias e
ranking de ocupacao. Cada perfil tera no maximo dois graficos.

## 2026-07-15 - Diretorio Compartilhado de Palestrantes

**Decisao:** palestrantes formarao um diretorio compartilhado entre organizadores.
O criador do cadastro e o administrador poderao edita-lo.

**Motivo:** um palestrante pode participar de eventos de organizadores diferentes.
Criar uma copia por evento causaria duplicidade e divergencia de informacoes.

**Consequencia:** qualquer organizador pode selecionar um palestrante ativo. Um
palestrante referenciado nao pode ser excluido definitivamente, mas pode ser
arquivado pelo criador ou administrador e deixa de aparecer em novas selecoes.

## 2026-07-15 - Backend Simulado

**Decisao:** usar MSW como API fake principal do projeto final.

**Motivo:** manter uma camada HTTP realista sem depender de um processo backend na
demonstracao publicada.

**Consequencia:** components e composables nao devem conhecer os handlers do MSW.
Eles acessarao services HTTP como fariam com uma API real.

## 2026-07-15 - Evolucao Posterior com Nuxt

**Decisao:** primeiro consolidar Vue em uma SPA; depois estudar Nuxt e evoluir o
mesmo produto.

**Motivo:** separar o aprendizado da base Vue dos conceitos de SSR, SSG e do
framework Nuxt.

**Consequencia:** a arquitetura inicial deve manter os dominios desacoplados, mas
nao deve antecipar abstracoes exclusivas de Nuxt.

## 2026-07-15 - Separacao entre Playground e Projeto Final

**Decisao:** exemplos didaticos e experimentos isolados devem ser implementados em
`C:\projects\vue-treining\projeto-1`.

**Motivo:** impedir que exemplos de aula contaminem o codigo do projeto final.

**Consequencia:** o projeto final so pode ser alterado quando uma etapa dele for
explicitamente iniciada ou solicitada.

## 2026-07-16 - Shell Compartilhado e Layouts por Area

**Decisao:** `MainLayout` sera o shell compartilhado das areas da aplicacao. Ele
define a grid responsiva, as regioes semanticas e sua aparencia global. Layouts de
area fornecem o conteudo concreto por slots.

**Motivo:** header, aside, main e footer obedecem as mesmas regras estruturais e
visuais. Centraliza-las evita repeticao entre as areas sem acoplar o shell ao
conteudo de uma navegacao especifica.

**Consequencia:** o aside e opcional e sua ausencia remove tambem a coluna
reservada. Espacamento e largura do conteudo nao pertencem ao shell; ficam no
layout de area ou na pagina. `PublicLayout` usa o shell sem aside e o futuro layout
de gestao o usara com aside.

## 2026-07-16 - Rotas Declaradas por Feature e Compostas por Area

**Decisao:** features declaram suas rotas, podendo exportar conjuntos diferentes
por contexto. O roteador principal compoe esses conjuntos sob as rotas pai das
areas.

**Motivo:** eventos possuem paginas publicas e administrativas. Organizar tudo
apenas por area fragmentaria a feature, enquanto colocar layout e autorizacao
apenas na feature duplicaria regras estruturais.

**Consequencia:** areas controlam layout, prefixo e acesso comum; features
controlam caminhos relativos, paginas e regras especificas. A feature de eventos
pode participar simultaneamente das areas publica e de gestao.

## 2026-07-16 - Raiz como Entrada Dinamica

**Decisao:** `/` sera uma rota de entrada, e nao uma Home publica obrigatoria no
MVP. Ela encaminhara visitantes para `/events`, participantes para `/my` e perfis
de gestao para `/management`.

**Motivo:** ainda nao existe uma necessidade de produto que justifique uma pagina
publica separada do catalogo. O redirecionamento oferece um destino inicial
coerente para cada perfil sem criar conteudo artificial.

**Consequencia:** `/events` permanece uma rota publica e estavel para todos os
perfis. A entrada dinamica sera concluida depois da implementacao da sessao e dos
destinos autenticados. Uma Home publica podera ser adicionada futuramente se
surgir conteudo proprio, como destaques ou apresentacao do produto.

## 2026-07-16 - Tema Persistido Adiado

**Decisao:** a infraestrutura de `ThemeProvider` nao fara parte da fundacao
inicial. Os tokens e variantes visuais podem ser preparados, mas a troca e a
persistencia de tema serao implementadas na fase de qualidade.

**Motivo:** o tema nao e necessario para validar o shell, as rotas e o primeiro
fluxo publico.

**Consequencia:** a remocao temporaria do provider reduz a fundacao atual sem
retirar dark mode do escopo final do MVP.

## 2026-07-16 - Handlers do MSW Criados por Demanda

**Decisao:** a infraestrutura do MSW permanece configurada desde a fundacao, mas
handlers e dados mockados serao criados apenas quando uma feature precisar de um
contrato de backend.

**Motivo:** antecipar endpoints antes dos fluxos e contratos estarem claros pode
gerar rotas artificiais e retrabalho.

**Consequencia:** a ausencia inicial de handlers nao representa configuracao
incompleta. Cada feature adiciona os endpoints de que necessita, mantendo os
componentes desacoplados dos mocks por meio de services HTTP.
