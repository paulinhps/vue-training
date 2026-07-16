# TechEventHub - Definicao do Produto

## Visao

O **TechEventHub** e uma plataforma para descobrir e gerenciar eventos de
tecnologia.

O objetivo do projeto e demonstrar conhecimentos profissionais de Vue por meio de
uma aplicacao completa, visualmente interessante e com baixa dependencia de
backend. A aplicacao usara uma API simulada e sera preparada para uma futura
evolucao com Nuxt, SSR e SSG.

## Objetivos

- Demonstrar dominio de Vue 3, TypeScript e Composition API.
- Construir fluxos publicos e autenticados com Vue Router.
- Aplicar estado global, formularios complexos, componentes reutilizaveis e testes.
- Tratar loading, erro, vazio, sucesso, cancelamento e persistencia.
- Manter uma arquitetura organizada por features.
- Publicar o codigo em um repositorio publico no GitHub.

## Personas

### Visitante

Deseja descobrir eventos de tecnologia e consultar seus detalhes.

### Participante Autenticado

Deseja favoritar eventos, organizar sua agenda e realizar inscricoes simuladas.

### Organizador

Deseja criar, editar, visualizar e administrar seus eventos.

### Administrador

Deseja acompanhar indicadores e administrar os dados gerais da plataforma.

## Regras de Produto Confirmadas

- O dominio e exclusivamente de eventos de tecnologia.
- Consultar catalogo e detalhes de eventos e uma operacao publica.
- Favoritar um evento exige autenticacao simulada.
- Depois do login iniciado pela acao de favoritar, o evento sera favoritado
  automaticamente.
- A aplicacao deve distinguir areas publica e autenticada.
- Autenticacao, autorizacao, inscricao e upload serao simulados.

## MVP

### Area Publica

- Entrada dinamica em `/`, com `/events` como destino de visitantes.
- Catalogo de eventos.
- Busca, filtros e ordenacao.
- Detalhes de evento por rota dinamica.
- Login simulado.
- Estados de carregamento, erro e lista vazia.
- Pagina para rota nao encontrada.

### Area do Participante

- Eventos favoritos.
- Agenda pessoal.
- Inscricao simulada em eventos.
- Persistencia local da sessao e das preferencias.

### Area Administrativa

- Layout administrativo protegido.
- Dashboard adaptado ao perfil, com indicadores e no maximo dois graficos.
- CRUD completo de eventos.
- Gestao de palestrantes.
- Formulario em etapas para criacao e edicao de evento.
- Upload simulado da imagem de capa.
- Preview antes da publicacao.
- Perfis simulados de organizador e administrador.

### Acesso Demonstrativo

- Formulario de login com validacao.
- Contas de acesso rapido para participante, organizador e administrador.
- Credenciais demonstrativas visiveis e preenchiveis pela interface.
- Redirecionamento para o destino originalmente solicitado.

### Experiencia Geral

- Layout responsivo.
- Tema claro e escuro.
- Toasts e modais.
- Confirmacao de operacoes destrutivas.
- Navegacao por teclado e acessibilidade basica.
- Lazy loading e code splitting.
- Componentes reutilizaveis.

## Perfis e Permissoes

| Perfil | Permissoes principais |
| --- | --- |
| Participante | Favoritos, agenda e inscricoes simuladas |
| Organizador | Recursos de participante e gestao dos proprios eventos |
| Administrador | Acesso administrativo completo |

As permissoes sao cumulativas: organizadores tambem podem usar os recursos de
participante, e administradores possuem acesso a todas as areas demonstrativas.

## Indicadores do Dashboard

### Organizador

- Proximos eventos.
- Rascunhos pendentes.
- Total de inscricoes em seus eventos.
- Taxa media de ocupacao.
- Inscricoes nos ultimos 30 dias.
- Proximos eventos e vagas restantes.

### Administrador

- Eventos publicados.
- Organizadores ativos.
- Total global de inscricoes.
- Eventos cancelados.
- Inscricoes nos ultimos 30 dias.
- Distribuicao por categoria.
- Ranking de eventos por ocupacao.

## Fora do Escopo

- Backend real.
- Banco de dados remoto.
- Autenticacao real.
- Pagamentos.
- Envio real de e-mail.
- Upload real de arquivos.
- Chat.
- Integracao com mapas.
- Sincronizacao entre usuarios ou dispositivos.

## Stack Obrigatoria

- Vue 3.
- Composition API.
- `<script setup>`.
- TypeScript.
- Vite.
- Vue Router.
- Pinia.
- VeeValidate e Zod.
- Vitest e Vue Test Utils.
- Mock Service Worker (MSW) para a API simulada.

## Recursos Vue a Demonstrar

- Props, emits e slots.
- Composables.
- Provide/inject quando houver contexto hierarquico real.
- Diretivas personalizadas.
- Componentes assincronos.
- Teleport.
- Suspense.
- Transition e TransitionGroup.
- KeepAlive.
- Lazy loading de rotas.
- Guards e metadados de rota.
- Stores Pinia organizadas por feature.
- Testes de componentes, composables, stores e rotas.

Os recursos devem ser empregados quando resolverem um problema real da aplicacao,
e nao apenas para preencher uma lista de tecnologias.

## Modelo Inicial de Evento

O contrato ainda sera refinado durante a modelagem dos casos de uso.

```ts
interface Event {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  category: EventCategory
  format: 'online' | 'in-person' | 'hybrid'
  status: 'draft' | 'published' | 'cancelled'
  startsAt: string
  endsAt: string
  capacity: number
  location: EventLocation | null
  coverImageUrl: string | null
  speakerIds: string[]
  sessions: EventSession[]
}
```
