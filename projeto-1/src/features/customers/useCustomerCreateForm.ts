import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { customerCreateSchema } from './customer.schema'
import { createCustomer } from './customer.service'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export function useCustomerCreateForm() {
  const { defineField, errors, handleSubmit, meta, resetForm } = useForm({
    validationSchema: customerCreateSchema,
    initialValues: {
      name: '',
      email: '',
      role: 'user',
      creditLimit: 0,
      isActive: true,
    },
  })

  const [name, nameAttrs] = defineField('name')
  const [email, emailAttrs] = defineField('email')
  const [role, roleAttrs] = defineField('role')
  const [creditLimit, creditLimitAttrs] = defineField('creditLimit')
  const [isActive, isActiveAttrs] = defineField('isActive')

  const status = ref<RequestStatus>('idle')
  const errorMessage = ref('')

  const canSubmit = computed(() => {
    return meta.value.valid && status.value !== 'loading'
  })

  const submitForm = handleSubmit(async (values) => {
    status.value = 'loading'
    errorMessage.value = ''

    try {
      await createCustomer(values)
      resetForm()
      status.value = 'success'
    } catch (error) {
      status.value = 'error'
      errorMessage.value =
        error instanceof Error ? error.message : 'Erro inesperado ao cadastrar cliente.'
    }
  })

  return {
    name,
    nameAttrs,
    email,
    emailAttrs,
    role,
    roleAttrs,
    creditLimit,
    creditLimitAttrs,
    isActive,
    isActiveAttrs,
    errors,
    status,
    errorMessage,
    canSubmit,
    submitForm,
  }
}
