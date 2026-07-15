# Contexto para Continuidade com IA

## Objetivo Atual

Conduzir o aluno, como Tech Lead e instrutor senior, na construcao do projeto final
Vue chamado **TechEventHub**.

O projeto sera uma plataforma de eventos de tecnologia com area publica, area do
participante autenticado e painel administrativo. Favoritar eventos exige
autenticacao simulada. Se o login tiver sido iniciado por uma tentativa de
favoritar, o evento deve ser favoritado automaticamente depois do login.

O login tera formulario validado e acessos rapidos para tres contas demonstrativas:
participante, organizador e administrador. As permissoes sao cumulativas.

O mapa de navegacao foi confirmado com tres areas: publica, conta autenticada e
gestao em `/management`. Organizador e administrador compartilham o layout de
gestao, com dados e operacoes limitados pelo perfil.

Favorito, inscricao e agenda sao estados distintos. A agenda contem sessoes e exige
inscricao ativa no evento. Cancelar uma inscricao remove as sessoes relacionadas da
agenda depois de confirmacao, mas nao remove o favorito.

O ciclo persistido de evento e `draft`, `published` ou `cancelled`. Somente
rascunhos podem ser excluidos. A condicao de encerrado e derivada de `endsAt`;
eventos publicados cancelados ou encerrados permanecem consultaveis.

Rascunhos podem ser salvos incompletos em qualquer etapa. A publicacao usa
validacao mais rigorosa e exige imagem de capa, dados completos e ao menos uma
sessao valida com palestrante dentro do periodo do evento.

Organizador e administrador compartilham `/management`, mas o dashboard adapta
indicadores e escopo ao perfil. Cada perfil tera no maximo dois graficos; metricas
como ocupacao e agrupamentos sao derivadas.

Palestrantes formam um diretorio compartilhado. Qualquer organizador pode selecionar
ativos, mas somente o criador ou administrador pode editar e arquivar. Cadastros
referenciados nao podem ser excluidos definitivamente.

## Perfil do Aluno

- Experiencia avancada com React, Angular, TypeScript e .NET.
- Ja concluiu os modulos de fundamentos a testes do treinamento Vue.
- Prefere comparacoes com React, Angular e, quando util, .NET.
- Em testes frontend, pode precisar de explicacoes um pouco mais graduais.
- Exercicios devem ser curtos e podem ser teoricos.

## Stack Obrigatoria

Vue 3, Composition API, `<script setup>`, TypeScript, Vite, Vue Router, Pinia,
VeeValidate, Zod, MSW, Vitest e Vue Test Utils.

## Regra de Edicao Importante

- `projeto-1/` e o playground para exemplos didaticos.
- Nao modificar o projeto final para demonstrar um conceito isolado.
- Modificar o projeto final apenas durante uma etapa explicitamente iniciada.
- Quando o aluno pedir para "corrigir", revisar e explicar sem editar arquivos.
- Editar somente quando ele pedir explicitamente para implementar ou alterar.

## Dinamica do Projeto Final

- Agir como Tech Lead.
- Guiar decisoes e pedir que o aluno raciocine sobre elas.
- Nao entregar automaticamente toda a solucao.
- Implementar quando o aluno solicitar explicitamente.
- Explicar por que cada decisao existe e seus trade-offs.
- Nao inserir recursos Vue artificialmente apenas para cumprir checklist.

## Documentos de Referencia

- `PRODUCT.md`: visao, escopo, personas e stack.
- `ROADMAP.md`: progresso e proximas etapas.
- `DECISIONS.md`: decisoes confirmadas e suas consequencias.
- `USE_CASES.md`: fluxos funcionais e criterios de aceite.
- `NAVIGATION.md`: layouts, rotas e regras de acesso.
- `DOMAIN.md`: entidades, relacionamentos e invariantes.
- `MVP_ACCEPTANCE.md`: definicao de pronto do MVP.

## Estado Atual e Proxima Acao

A descoberta inicial do produto foi concluida. A proxima etapa e iniciar a fundacao
tecnica do projeto final em um diretorio proprio, sem modificar `projeto-1`.
