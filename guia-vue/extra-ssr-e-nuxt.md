# Conteudo Extra - SSR, Hidratacao e Nuxt

## Contexto

A SPA atual renderiza inicialmente no navegador. SSR executa Vue no servidor para
produzir HTML da rota, envia esse HTML e depois o cliente hidrata a mesma arvore para
assumir interatividade.

O plano definido e consolidar primeiro o TechEventHub como SPA Vue e, depois,
evolui-lo durante o estudo de Nuxt.

## Modos de Renderizacao

| Modo | Momento do HTML | Bom para |
| --- | --- | --- |
| CSR | navegador apos carregar JS | paineis e apps autenticados |
| SSR | servidor a cada requisicao | conteudo publico dinamico e SEO |
| SSG/prerender | build | paginas publicas relativamente estaveis |
| hibrido | por rota | produtos com area publica e painel privado |

TechEventHub combina bem com modo hibrido: catalogo e detalhes publicos podem usar
SSR/SSG; `/my` e `/management` continuam altamente interativos no cliente.

## Hidratacao

```text
servidor executa componentes
       -> envia HTML + payload
navegador exibe HTML
       -> carrega JavaScript
Vue hidrata e conecta eventos ao DOM existente
```

Servidor e cliente precisam produzir a mesma estrutura inicial. Divergencias causam
hydration mismatch.

Causas comuns:

- `Date.now()`, `Math.random()` ou timezone gerando saidas diferentes;
- leitura de `window`, `document` ou localStorage no servidor;
- dados diferentes entre render server e primeiro render client;
- HTML invalido corrigido pelo browser;
- estado singleton compartilhado entre requisicoes.

## Lifecycle em SSR

`onMounted` nao executa durante renderizacao no servidor; ele e exclusivo do
cliente. Por isso e um local seguro para integracao DOM/browser, mas dados essenciais
buscados apenas ali nao participam do HTML SSR.

`setup` e computed podem executar no servidor. Evite efeitos colaterais globais e
APIs do browser durante essa fase.

## Data Fetching

Em Vue SSR manual, e necessario coordenar busca, serializacao de estado e hidratacao.
Nuxt fornece primitives SSR-aware:

```vue
<script setup lang="ts">
const { data, status, error } = await useAsyncData(
  'events',
  (_nuxtApp, { signal }) => eventService.list({ signal }),
)
</script>
```

`useAsyncData` e `useFetch` transferem payload do servidor ao cliente para evitar
buscar o mesmo dado novamente durante hidratacao. O handler deve ser previsivel e
sem efeitos colaterais de negocio.

Usar `$fetch` diretamente no setup universal pode executar uma vez no servidor e
outra no cliente; por isso Nuxt oferece composables de dados.

## Estado e Pinia

Em SPA, singleton de modulo e unico para a pagina. Em SSR, um singleton mutavel pode
vazar estado entre requisicoes de usuarios diferentes. Cada request precisa de sua
propria instancia de aplicacao/store, e o estado serializado deve ser escapado com
seguranca.

Nuxt e o modulo oficial de Pinia resolvem grande parte da integracao, mas composables
com refs no escopo do modulo ainda precisam ser auditados.

## Vue SSR Manual ou Nuxt

Vue possui APIs de SSR, mas uma aplicacao profissional tambem precisa de:

- roteamento server/client;
- data fetching e payload;
- head/SEO;
- build server e client;
- deploy e caching;
- tratamento de erro e status HTTP;
- hidratacao de estado.

Nuxt fornece essas convencoes. Para aprender mecanismos internos, SSR manual e
instrutivo; para evoluir o TechEventHub, Nuxt e a escolha recomendada.

## Plano de Evolucao do TechEventHub

1. Concluir a SPA com services e dominio desacoplados.
2. Criar a versao Nuxt sem copiar o router manualmente.
3. Migrar Home, catalogo e detalhes para rotas publicas renderizadas.
4. Usar data fetching SSR-aware e metadados por evento.
5. Manter areas autenticadas com comportamento client-heavy quando apropriado.
6. Substituir persistencias/browser APIs por adapters compatíveis com SSR.
7. Medir HTML inicial, hidratacao, navegacao client-side e SEO.

## Armadilhas

- Tratar SSR apenas como "rodar `onMounted` no servidor".
- Acessar localStorage durante setup universal.
- Buscar dados duas vezes.
- Gerar valores nao deterministas na primeira renderizacao.
- Compartilhar store entre requests.
- Migrar para Nuxt mantendo toda a estrutura de router da SPA por reflexo.
- Usar SSR em dashboard privado sem beneficio de produto.

## Revisao Rapida

- SSR gera HTML por requisicao; SSG gera no build; hidratacao ativa o HTML.
- `onMounted` e client-only.
- Codigo universal precisa funcionar sem DOM.
- Data essencial deve chegar no payload para evitar double fetch.
- Nuxt adiciona convencoes e infraestrutura sobre Vue.

## Referencias

- [SSR no Vue](https://vuejs.org/guide/scaling-up/ssr.html)
- [Introducao ao Nuxt](https://nuxt.com/docs/4.x/getting-started/introduction)
- [Data fetching no Nuxt](https://nuxt.com/docs/4.x/getting-started/data-fetching)
- [`useAsyncData`](https://nuxt.com/docs/4.x/api/composables/use-async-data)
- [Boas praticas de hidratacao](https://nuxt.com/docs/4.x/guide/best-practices/hydration)
