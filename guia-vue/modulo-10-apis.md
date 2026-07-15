# Modulo 10 - Consumo de APIs

## Contexto

Consumir API e gerenciar um processo, nao apenas chamar `fetch`. Uma feature
profissional representa estados, cancelamento, concorrencia, retry, validacao
runtime e separacao entre transporte e UI.

No treinamento, `json-server` simulou o backend. O projeto final usara MSW para que
a demonstracao publicada nao dependa de servidor externo.

## Camadas

```text
View -> composable/store -> service -> fetch/HTTP -> API fake
```

- view apresenta e recebe eventos;
- composable coordena loading, erro, cancelamento e transformacao;
- service conhece URL, metodo, headers e DTOs;
- helper HTTP implementa preocupacoes transversais pequenas;
- mock reproduz respostas, latencia e falhas.

## Estados Explicitos

```ts
type LoadStatus = 'idle' | 'loading' | 'success' | 'error'
```

Nao deduza tudo de `data.length`. Lista vazia com sucesso e diferente de ainda nao
ter carregado. Cancelamento normalmente nao deve virar toast de erro.

## Service

```ts
export async function listCustomers(signal?: AbortSignal): Promise<Customer[]> {
  const response = await fetch(`${baseUrl}/customers`, { signal })
  if (!response.ok) throw new HttpError(response.status)
  return customerListSchema.parse(await response.json())
}
```

Interfaces TypeScript desaparecem em runtime. Valide respostas nao confiaveis com
Zod quando a confiabilidade do contrato justificar o custo.

## Cancelamento e Concorrencia

```ts
let loadController: AbortController | undefined

async function load() {
  loadController?.abort()
  const current = new AbortController()
  loadController = current

  try {
    data.value = await service.list(current.signal)
  } catch (error) {
    if (!current.signal.aborted) throw error
  } finally {
    if (loadController === current) loadController = undefined
  }
}
```

- a primeira linha cancela a requisicao anterior, se existir;
- `current` identifica esta execucao;
- o `finally` so limpa o controller se ainda for o corrente;
- uma requisicao antiga nao apaga a referencia de uma nova.

Outra entidade pode chamar `abort()` se possuir o controller. `fetch` rejeita com
um erro de abort/cancelamento; o fluxo deve reconhece-lo e nao trata-lo como falha de
negocio. Cancelar novamente e seguro.

Uma chamada lenta iniciada por `watch` nao congela o componente durante a espera,
mas pode causar corrida, excesso de requests e commits fora de ordem. Debounce,
cleanup e identificacao da execucao resolvem problemas diferentes.

## Retry

`withRetry` nao e API do Vue nem do Node: e um helper criado no projeto.

```ts
await withRetry(() => listCustomers(signal), {
  retries: 2,
  delayInMs: 500,
  signal,
})
```

Retry deve considerar:

- tipo de falha e status HTTP;
- backoff e jitter;
- cancelamento durante espera;
- limite de tentativas;
- idempotencia da operacao.

GET costuma ser seguro. Repetir POST pode duplicar registros. Uma funcao
`withIdempotencyRetry` pode gerar e reutilizar uma chave:

```ts
headers: { 'Idempotency-Key': key }
```

Mas a chave so oferece garantia se o backend armazenar e deduplicar requisicoes com
ela. Adicionar o header apenas no cliente nao cria idempotencia.

## Injeção de Dependencias

Vue nao possui um `@Inject` equivalente ao Angular no nucleo. Alternativas:

- importar um service modular diretamente;
- passar dependencia como argumento para facilitar testes;
- fornecer via `provide/inject` com `InjectionKey`;
- instalar um plugin que fornece infraestrutura global.

Classes injetaveis para todo service costumam adicionar cerimonia sem beneficio.
Use injecao quando ha implementacoes intercambiaveis, escopo, configuracao ou teste
que realmente justificam a indirecao.

## Onde Cada Preocupacao Fica

- componente: UI e eventos do usuario;
- composable: fluxo, estado e coordenacao;
- service: protocolo HTTP;
- `shared/http`: retry, erro HTTP, serializacao generica;
- plugin: infraestrutura global como logger configurado;
- schema: validacao runtime.

Cancelamento e controle de fluxo, nao erro negocial. A UI pode voltar a `idle` ou
manter o dado anterior sem apresentar falha.

## Armadilhas

- Chamar API diretamente em muitos componentes.
- Usar `catch` generico e transformar abort em erro para o usuario.
- Fazer retry de qualquer metodo e qualquer status.
- Criar uma nova chave de idempotencia a cada tentativa.
- Confiar apenas no tipo de retorno TypeScript.
- Limpar loading de uma request antiga enquanto uma nova ainda esta ativa.
- Criar abstracoes HTTP antes de existir repeticao real.

## Exemplos do Workspace

- [`projeto-1/src/features/customers/customer.service.ts`](../projeto-1/src/features/customers/customer.service.ts)
- [`projeto-1/src/features/customers/useCustomersList.ts`](../projeto-1/src/features/customers/useCustomersList.ts)
- [`projeto-1/src/shared/http/withRetry.ts`](../projeto-1/src/shared/http/withRetry.ts)
- [`projeto-1/db.json`](../projeto-1/db.json)

## Revisao Rapida

- Async nao congela durante I/O, mas concorrencia precisa ser governada.
- `AbortController` cancela; identificador corrente impede commit/cleanup obsoleto.
- Retry e politica da aplicacao, nao recurso do Vue.
- Idempotencia exige cooperacao do servidor.
- TypeScript nao valida resposta em runtime.
- Vue favorece modulos simples; DI e opcional.

## Referencias

- [Fetch API](https://developer.mozilla.org/docs/Web/API/Fetch_API)
- [AbortController](https://developer.mozilla.org/docs/Web/API/AbortController)
- [Mock Service Worker](https://mswjs.io/docs/)
- [json-server](https://github.com/typicode/json-server)
