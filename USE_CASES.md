# TechEventHub - Casos de Uso

## Estado

Este documento esta em modelagem. Os casos detalhados representam regras
confirmadas; os demais serao refinados antes da implementacao.

## Mapa Inicial

| Codigo | Ator | Caso de uso | Area |
| --- | --- | --- | --- |
| UC-00 | Visitante | Autenticar com uma conta demonstrativa | Publica |
| UC-01 | Visitante | Consultar catalogo de eventos | Publica |
| UC-02 | Visitante | Consultar detalhes de um evento | Publica |
| UC-03 | Participante | Favoritar um evento | Autenticada |
| UC-04 | Participante | Gerenciar favoritos | Autenticada |
| UC-05 | Participante | Organizar agenda pessoal | Autenticada |
| UC-06 | Participante | Realizar inscricao simulada | Autenticada |
| UC-07 | Organizador | Criar e publicar evento | Administrativa |
| UC-08 | Organizador | Editar ou cancelar evento | Administrativa |
| UC-09 | Organizador | Gerenciar palestrantes | Administrativa |
| UC-10 | Administrador | Consultar indicadores da plataforma | Administrativa |

## UC-00 - Autenticar com uma Conta Demonstrativa

### Objetivo

Permitir acesso rapido e validado aos recursos de participante, organizador e
administrador.

### Fluxo Principal

1. O visitante acessa a pagina de login.
2. O visitante escolhe uma conta demonstrativa ou informa suas credenciais.
3. A aplicacao valida o formulario e autentica a conta simulada.
4. A aplicacao restaura o destino solicitado anteriormente, quando existir.
5. Sem destino anterior, a aplicacao encaminha o usuario para a pagina inicial
   adequada ao seu perfil.

### Criterios de Aceite

- Existem acessos demonstrativos para os tres perfis.
- Escolher uma conta rapida preenche as credenciais visivelmente.
- O envio sempre passa pelo mesmo fluxo de validacao e autenticacao.
- Credenciais invalidas produzem feedback acessivel e nao iniciam uma sessao.
- O perfil autenticado determina rotas, menus e operacoes permitidas.
- Um redirect valido preservado antes do login tem prioridade sobre a pagina
  inicial do perfil.

## UC-03 - Favoritar um Evento

### Objetivo

Permitir que um participante autenticado salve um evento para consulta posterior.

### Pre-condicoes

- O evento existe e esta publicado.
- O visitante esta na pagina do evento ou em uma listagem que exponha a acao de
  favoritar.

### Fluxo Autenticado

1. O participante aciona o controle de favorito.
2. A aplicacao registra o evento nos favoritos.
3. A interface atualiza o estado do controle imediatamente.
4. A aplicacao apresenta feedback de sucesso.

### Fluxo sem Autenticacao

1. O visitante aciona o controle de favorito.
2. A aplicacao preserva a rota atual e a intencao de favoritar o evento.
3. A aplicacao redireciona o visitante para o login.
4. O visitante conclui o login simulado.
5. A aplicacao retorna para a rota preservada.
6. A aplicacao registra automaticamente o evento nos favoritos.
7. A intencao pendente e removida para impedir reprocessamento.
8. A interface apresenta o evento como favorito e informa o sucesso.

### Criterios de Aceite

- Um visitante nao autenticado nao pode gravar favoritos.
- Cancelar ou abandonar o login nao grava o favorito.
- Apos login bem-sucedido, nao e necessario clicar novamente.
- A intencao pendente e processada no maximo uma vez.
- Recarregar a pagina depois da conclusao nao duplica nem repete a operacao.
- Se o evento deixar de existir durante o fluxo, a aplicacao descarta a intencao e
  apresenta uma mensagem apropriada.
- Se o evento ja estiver favoritado, a operacao permanece idempotente.

### Responsabilidades Tecnicas Provaveis

- Vue Router preserva e restaura a rota de destino.
- A feature de autenticacao controla a sessao simulada.
- A feature de favoritos controla a intencao pendente e os favoritos persistidos.
- A view apenas dispara a acao e representa o estado resultante.

## UC-05 - Organizar Agenda Pessoal

### Objetivo

Permitir que um participante inscrito escolha sessoes de um evento para compor sua
agenda pessoal.

### Criterios de Aceite

- A agenda referencia sessoes, nao o evento inteiro.
- Somente sessoes de eventos com inscricao ativa podem ser adicionadas.
- A mesma sessao nao pode ser adicionada duas vezes.
- Remover uma sessao da agenda nao cancela a inscricao no evento.
- A interface deve identificar conflitos de horario entre sessoes selecionadas.

## UC-06 - Realizar ou Cancelar Inscricao Simulada

### Objetivo

Permitir que um participante reserve uma vaga em um evento publicado.

### Criterios de Aceite

- A inscricao pertence a um participante e a um evento.
- Nao pode existir mais de uma inscricao ativa para o mesmo par participante/evento.
- Um evento sem vagas nao aceita novas inscricoes.
- Cancelar a inscricao exige confirmacao quando houver sessoes na agenda.
- Apos o cancelamento, as sessoes daquele evento sao removidas da agenda.
- Cancelar uma inscricao nao remove o evento dos favoritos.

## UC-07 - Criar e Publicar Evento

### Objetivo

Permitir que um organizador ou administrador crie um evento inicialmente como
rascunho e o publique quando estiver valido.

### Criterios de Aceite

- Um novo evento e criado como `draft`.
- O rascunho pode ser salvo incompleto em qualquer etapa do formulario.
- Rascunhos nao aparecem no catalogo publico.
- Somente o organizador proprietario ou um administrador pode editar o evento.
- A publicacao exige os dados basicos, imagem de capa, formato, localizacao
  aplicavel, periodo e capacidade validos.
- A publicacao exige ao menos uma sessao valida com palestrante.
- Todas as sessoes devem ocorrer dentro do periodo do evento.
- Depois da publicacao, o evento aparece no catalogo publico.
- A exclusao definitiva esta disponivel apenas para rascunhos.

## UC-08 - Editar ou Cancelar Evento

### Objetivo

Permitir a manutencao de um evento sem apagar seu historico publico.

### Criterios de Aceite

- Rascunhos podem ser editados ou excluidos definitivamente.
- Eventos publicados podem ser editados ou cancelados.
- Cancelar exige confirmacao explicita.
- Eventos cancelados continuam acessiveis por sua URL publica com um aviso.
- Eventos cancelados nao aceitam novas inscricoes.
- A condicao de encerrado e calculada por `endsAt` e nao altera `status`.
- Eventos encerrados permanecem consultaveis e nao aceitam novas inscricoes.

## UC-10 - Consultar Indicadores da Plataforma

### Objetivo

Apresentar uma visao operacional coerente com o perfil autenticado.

### Criterios de Aceite

- Organizador visualiza apenas indicadores derivados de seus eventos.
- Administrador visualiza indicadores globais.
- Organizadores veem proximos eventos, rascunhos, inscricoes e ocupacao.
- Administradores veem eventos publicados e cancelados, organizadores ativos,
  inscricoes, distribuicao por categoria e ranking de ocupacao.
- Cada perfil visualiza no maximo dois graficos.
- Loading, erro e ausencia de dados possuem representacoes proprias.
- Taxas, totais e agrupamentos sao derivados dos dados da API, nao persistidos como
  propriedades das entidades.

## UC-01 - Consultar Catalogo de Eventos

### Objetivo

Permitir a descoberta de eventos de tecnologia publicados.

### Criterios de Aceite

- Apenas eventos publicados aparecem no catalogo.
- Busca considera titulo, resumo e palestrantes.
- Filtros incluem categoria, formato e periodo.
- Ordenacao permite priorizar eventos mais proximos.
- Busca, filtros e ordenacao sao refletidos na URL para permitir compartilhamento.
- Loading, erro, nenhum evento e nenhum resultado filtrado sao estados distintos.

## UC-02 - Consultar Detalhes de um Evento

### Objetivo

Apresentar informacoes suficientes para o visitante decidir se deseja participar.

### Criterios de Aceite

- A pagina e identificada por um slug estavel.
- Exibe descricao, formato, localizacao, periodo, vagas, sessoes e palestrantes.
- Eventos cancelados ou encerrados permanecem consultaveis com estado explicito.
- Evento inexistente apresenta a experiencia de nao encontrado sem quebrar a rota.
- Acoes de favorito e inscricao refletem autenticacao e disponibilidade.

## UC-04 - Gerenciar Favoritos

### Objetivo

Permitir que o participante consulte e remova eventos de seu interesse.

### Criterios de Aceite

- A pagina exige autenticacao.
- Favoritos persistem entre recarregamentos da demonstracao.
- Remover um favorito atualiza todas as representacoes abertas do evento.
- Remover um favorito nao cancela inscricao nem altera a agenda.
- Eventos cancelados ou encerrados continuam visiveis com seus respectivos estados.

## UC-09 - Gerenciar Palestrantes

### Objetivo

Manter um diretorio compartilhado para selecao nas sessoes dos eventos.

### Criterios de Aceite

- Organizadores podem consultar e selecionar qualquer palestrante ativo.
- Organizadores podem criar novos palestrantes.
- Somente o criador ou um administrador pode editar e arquivar o cadastro.
- Um palestrante referenciado nao pode ser excluido definitivamente.
- Arquivar nao altera sessoes existentes.
- Palestrantes arquivados nao aparecem em novas selecoes.
- Administradores podem editar ou arquivar qualquer palestrante.
