import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useLogger } from '@/plugins/logger/useLogger'
import { deleteCustomer, listCustomers } from './customer.service'
import type { Customer } from './customer.types'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export function useCustomersList() {
  const logger = useLogger()
  const customers = ref<Customer[]>([])
  const status = ref<RequestStatus>('idle')
  const errorMessage = ref('')
  const deletingCustomerId = ref<string | null>(null)
  const searchTerm = ref('')
  let loadController: AbortController | null = null

  const hasCustomers = computed(() => {
    return customers.value.length > 0
  })

  const filteredCustomers = computed(() => {
    const normalizedSearch = searchTerm.value.trim().toLowerCase()

    if (!normalizedSearch) {
      return customers.value
    }

    return customers.value.filter((customer) => {
      return [
        customer.name,
        customer.email,
        customer.role,
      ].some((field) => field.toLowerCase().includes(normalizedSearch))
    })
  })

  const hasFilteredCustomers = computed(() => {
    return filteredCustomers.value.length > 0
  })

  async function loadCustomers(): Promise<void> {
    loadController?.abort()
    const currentController = new AbortController()
    loadController = currentController

    status.value = 'loading'
    errorMessage.value = ''

    try {
      customers.value = await listCustomers(currentController.signal)
      logger.info('Clientes carregados.', {
        total: customers.value.length,
      })
      status.value = 'success'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        logger.info('Carregamento de clientes cancelado.')
        return
      }

      status.value = 'error'
      logger.error('Erro ao carregar clientes.', error)
      errorMessage.value =
        error instanceof Error ? error.message : 'Erro inesperado ao carregar clientes.'
    } finally {
      if (loadController === currentController) {
        loadController = null
      }
    }
  }

  async function removeCustomer(customerId: string): Promise<void> {
    const shouldRemove = window.confirm('Deseja remover este cliente?')

    if (!shouldRemove) {
      return
    }

    deletingCustomerId.value = customerId
    errorMessage.value = ''

    try {
      await deleteCustomer(customerId)
      customers.value = customers.value.filter((customer) => customer.id !== customerId)
      logger.info('Cliente removido.', {
        customerId,
      })
    } catch (error) {
      status.value = 'error'
      logger.error('Erro ao remover cliente.', error)
      errorMessage.value =
        error instanceof Error ? error.message : 'Erro inesperado ao remover cliente.'
    } finally {
      deletingCustomerId.value = null
    }
  }

  onMounted(() => {
    void loadCustomers()
  })

  onUnmounted(() => {
    loadController?.abort()
  })

  return {
    customers,
    status,
    errorMessage,
    deletingCustomerId,
    searchTerm,
    filteredCustomers,
    hasCustomers,
    hasFilteredCustomers,
    loadCustomers,
    removeCustomer,
  }
}
