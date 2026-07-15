# Modulo 9 - Formularios

## Contexto

`v-model` resolve sincronizacao de valor. Ele nao fornece sozinho lifecycle de
campo, validacao, touched/dirty, submit, erros de API ou arrays dinamicos. Vue evita
impor uma solucao enterprise; bibliotecas como VeeValidate e Zod completam esse
espaco.

## Comparacao

| Vue | React | Angular |
| --- | --- | --- |
| `v-model` | value + onChange | Forms binding/control |
| VeeValidate | React Hook Form/Formik | Reactive Forms |
| Zod | Zod/Yup | Validators + schema externo |
| field meta | formState | control state |

## `v-model`

Em elemento nativo:

```vue
<input v-model.trim="name">
<input v-model.number="capacity" type="number">
```

Em componente, o contrato padrao e `modelValue` + `update:modelValue`. A macro
moderna abstrai ambos:

```vue
<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="model">
</template>
```

Multiplos models usam nomes:

```vue
<DateRange v-model:start="startsAt" v-model:end="endsAt" />
```

## Validacao Simples vs Gestao de Formulario

Validacao manual e adequada para poucos campos e regras locais. Formulario complexo
precisa acompanhar:

- valor inicial e atual;
- touched, dirty e valid;
- validacao sincrona e assincrona;
- submit, pending e reset;
- erros de campo e de formulario;
- arrays, objetos aninhados e regras condicionais.

Nao e necessario implementar tudo: VeeValidate gerencia o ciclo; Zod define o
contrato runtime.

## Pristine, Dirty e Touched

Mostrar erros assim que a pagina abre e uma UX ruim. Em VeeValidate, use metadados:

```vue
<span v-if="meta.touched && errorMessage">{{ errorMessage }}</span>
```

- `dirty`: valor difere do inicial.
- `touched`: campo perdeu foco/interagiu conforme configuracao.
- `valid`: regras atuais passam.
- `pending`: validacao assincrona em andamento.

"Pristine" e conceitualmente `!dirty`; nem sempre precisa virar um booleano manual.
No submit, pode-se marcar todos os campos como touched para revelar erros.

## VeeValidate + Zod

```ts
const customerSchema = toTypedSchema(z.object({
  name: z.string().trim().min(3),
  email: z.email(),
  age: z.number().int().min(18),
}))

const { handleSubmit, defineField, errors, meta } = useForm({
  validationSchema: customerSchema,
})
```

TypeScript valida o codigo durante desenvolvimento; Zod valida dados em runtime.
Schemas pertencem ao dominio/feature, nao ao componente visual generico.

## Abstracao Profissional

```text
features/customers/
  customer.schema.ts
  customer.service.ts
  useCustomerCreateForm.ts
  CustomerCreateValidatedView.vue
```

- schema: regras runtime e tipos inferidos;
- service: I/O;
- composable: estado, submit, reset e feedback;
- view: campos e experiencia visual.

Abstrair em composable reduz o componente, mas nao deve esconder labels, ordem dos
campos e decisoes de UX que pertencem a view.

## Componentes de Campo

Um `BaseInput` deve ter contrato claro para label, erro, disabled, IDs e atributos
HTML. Componentes com multiplos nos raiz nao recebem fallthrough attributes de modo
automatico. Use `inheritAttrs: false` e `v-bind="$attrs"` no input correto quando
necessario.

Essa fronteira importa em testes e integracao com VeeValidate: listeners e atributos
devem chegar ao elemento interativo, nao ao wrapper errado.

## Espacos ao Redor de Componentes Inline

Vue preserva whitespace significativo do template. Em:

```vue
Consulte o formulario <RouterLink to="/simple">aqui</RouterLink> para comparar.
```

o espaco antes e depois do link vem dos nos de texto. Quebras de linha e indentacao
podem resultar em espaco normalizado. Nao coloque espaco dentro do texto do link se
ele nao deve fazer parte da area clicavel.

## Erros de API

Separe:

- erro de campo retornado pelo servidor;
- erro global de negocio;
- falha tecnica/rede;
- cancelamento.

O composable traduz a resposta para `setFieldError` ou mensagem global. O service
nao deve conhecer componentes ou toasts.

## Armadilhas

- Duplicar o mesmo dado em ref local e estado do VeeValidate.
- Mostrar erros antes de touched ou submit.
- Tratar TypeScript como validacao runtime.
- Criar um componente de formulario generico que conhece Customer.
- Colocar chamada HTTP diretamente no componente de campo.
- Esquecer de resetar valores e metadados juntos.

## Exemplos do Workspace

- [`projeto-1/src/shared/ui/BaseInput.vue`](../projeto-1/src/shared/ui/BaseInput.vue)
- [`projeto-1/src/features/customers/customer.schema.ts`](../projeto-1/src/features/customers/customer.schema.ts)
- [`projeto-1/src/features/customers/useCustomerCreateForm.ts`](../projeto-1/src/features/customers/useCustomerCreateForm.ts)
- [`projeto-1/src/features/customers/CustomerCreateValidatedView.vue`](../projeto-1/src/features/customers/CustomerCreateValidatedView.vue)
- [`projeto-1/src/features/customers/useCustomerEditForm.ts`](../projeto-1/src/features/customers/useCustomerEditForm.ts)

## Referencias

- [Form input bindings](https://vuejs.org/guide/essentials/forms.html)
- [Component v-model](https://vuejs.org/guide/components/v-model.html)
- [VeeValidate](https://vee-validate.logaretm.com/v4/)
- [Zod](https://zod.dev/)
