import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { customerCreateSchema } from './customer.schema'
import { getCustomerById, updateCustomer } from './customer.service'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export function useCustomerEditForm() {
  const route = useRoute()
  const router = useRouter()
  const customerId = computed(() => String(route.params.id))

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
  const submitStatus = ref<RequestStatus>('idle')
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const submitErrorMessage = ref('')

  const canSubmit = computed(() => {
    return meta.value.valid && !isSubmitting.value
  })

  async function loadCustomer(): Promise<void> {
    status.value = 'loading'
    errorMessage.value = ''

    try {
      const customer = await getCustomerById(customerId.value)

      resetForm({
        values: {
          name: customer.name,
          email: customer.email,
          role: customer.role,
          creditLimit: customer.creditLimit,
          isActive: customer.isActive,
        },
      })

      status.value = 'success'
    } catch (error) {
      status.value = 'error'
      errorMessage.value =
        error instanceof Error ? error.message : 'Erro inesperado ao carregar cliente.'
    }
  }

  const submitForm = handleSubmit(async (values) => {
    isSubmitting.value = true
    submitStatus.value = 'loading'
    submitErrorMessage.value = ''

    try {
      await updateCustomer(customerId.value, values)
      submitStatus.value = 'success'
      window.setTimeout(() => {
        void router.push({ name: 'customers-list' })
      }, 1200)
    } catch (error) {
      submitStatus.value = 'error'
      submitErrorMessage.value =
        error instanceof Error ? error.message : 'Erro inesperado ao atualizar cliente.'
    } finally {
      isSubmitting.value = false
    }
  })

  onMounted(() => {
    void loadCustomer()
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
    submitStatus,
    isSubmitting,
    errorMessage,
    submitErrorMessage,
    canSubmit,
    submitForm,
    loadCustomer,
  }
}
