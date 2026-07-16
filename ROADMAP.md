# TechEventHub - Roadmap

## Estado Atual

Fase atual: **fundacao tecnica concluida e experiencia publica iniciada**.

Concluido:

- Tema escolhido: plataforma de eventos de tecnologia.
- Nome escolhido: TechEventHub.
- Personas iniciais definidas.
- Escopo inicial e limites registrados.
- Favoritos definidos como funcionalidade autenticada.
- Casos de uso, navegacao, dominio e criterios do MVP definidos.
- Projeto Vue criado em `tech-event-hub` com TypeScript, Vite, Router e Pinia.
- Ferramentas de teste, lint e formatacao configuradas.
- Tailwind CSS e aliases iniciais configurados.
- `MainLayout` responsivo e `PublicLayout` inicial implementados.
- Arvore inicial de rotas publicas criada com carregamento sob demanda.
- Pagina provisoria do catalogo conectada em `/events`.

Proximo passo:

- Definir o contrato e os dados demonstrativos de eventos.
- Criar os primeiros handlers do MSW junto aos endpoints exigidos pelo catalogo.
- Implementar o catalogo publico e seus estados de tela.

## Fases

### 1. Descoberta e Modelagem

- [x] Escolher tema e nome.
- [x] Definir personas iniciais.
- [x] Delimitar o escopo.
- [x] Escrever casos de uso.
- [x] Mapear paginas e navegacao.
- [x] Modelar entidades e relacionamentos iniciais.
- [x] Definir criterios de aceite do MVP.

### 2. Fundacao Tecnica

- [x] Criar o projeto Vue com Vite e TypeScript.
- [x] Configurar Vue Router e Pinia.
- [x] Configurar Vitest e Vue Test Utils.
- [x] Configurar ESLint e formatacao.
- [x] Definir aliases e estrutura inicial de pastas.
- [x] Configurar a infraestrutura do MSW.
- [x] Criar o `MainLayout` responsivo.
- [x] Criar o `PublicLayout` inicial.
- [x] Configurar Tailwind CSS e estilos globais iniciais.

### 3. Experiencia Publica

- [x] Criar a arvore inicial de rotas publicas.
- [x] Conectar a pagina provisoria de eventos em `/events`.
- [ ] Implementar `/` como entrada dinamica por sessao e perfil.
- [ ] Implementar catalogo de eventos.
- [ ] Criar handlers do MSW conforme os endpoints exigidos pela feature.
- [ ] Implementar busca, filtros e ordenacao.
- [ ] Implementar detalhes do evento.
- [ ] Tratar loading, erro e estados vazios.
- [ ] Implementar pagina 404.

### 4. Autenticacao e Participante

- [ ] Implementar login e logout simulados.
- [ ] Criar a arvore de rotas autenticadas em `/my`.
- [ ] Implementar guards e redirect pos-login.
- [ ] Implementar favoritos autenticados.
- [ ] Implementar agenda pessoal.
- [ ] Implementar inscricao simulada.

### 5. Administracao

- [ ] Criar layout de gestao com `MainLayout` e sidebar.
- [ ] Implementar dashboard.
- [ ] Implementar CRUD de eventos.
- [ ] Implementar gestao de palestrantes.
- [ ] Implementar formulario de evento em etapas.
- [ ] Implementar upload e preview simulados.
- [ ] Implementar autorizacao por perfil.

### 6. Qualidade e Experiencia

- [ ] Implementar dark mode.
- [ ] Implementar toasts, modais e confirmacoes.
- [ ] Revisar responsividade e acessibilidade.
- [ ] Aplicar lazy loading e code splitting.
- [ ] Avaliar KeepAlive, Suspense e componentes assincronos.
- [ ] Criar testes de stores, composables, componentes e rotas.
- [ ] Executar verificacao de tipos, testes e build de producao.

### 7. Portfolio e Publicacao

- [ ] Criar dados demonstrativos consistentes.
- [ ] Documentar arquitetura e decisoes tecnicas.
- [ ] Criar README publico do projeto.
- [ ] Registrar screenshots e fluxos principais.
- [ ] Configurar publicacao da aplicacao estatica.
- [ ] Preparar backlog para evolucao com Nuxt.
