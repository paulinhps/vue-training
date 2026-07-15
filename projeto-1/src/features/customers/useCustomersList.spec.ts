import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { deleteCustomer, listCustomers } from './customer.service'
import type { Customer } from './customer.types'
import { useCustomersList } from './useCustomersList'

vi.mock('@/plugins/logger/useLogger', () => ({
  useLogger: () => ({
    info: vi.fn(),
    error: vi.fn(),
  }),
}))

vi.mock('./customer.service', () => ({
  deleteCustomer: vi.fn(),
  listCustomers: vi.fn(),
}))

const customers: Customer[] = [
  {
    id: '1',
    name: 'Ana Silva',
    email: 'ana.silva@example.com',
    role: 'admin',
    creditLimit: 5000,
    isActive: true,
  },
  {
    id: '2',
    name: 'Bruno Costa',
    email: 'bruno.costa@example.com',
    role: 'user',
    creditLimit: 1800,
    isActive: true,
  },
]

function mountUseCustomersList() {
  let result!: ReturnType<typeof useCustomersList>

  const TestComponent = defineComponent({
    setup() {
      result = useCustomersList()

      return () => null
    },
  })

  mount(TestComponent)

  return result
}

describe('useCustomersList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(listCustomers).mockResolvedValue([...customers])
    vi.mocked(deleteCustomer).mockResolvedValue(undefined)
  })

  it('carrega clientes quando o componente e montado', async () => {
    const result = mountUseCustomersList()

    expect(result.status.value).toBe('loading')

    await flushPromises()

    expect(listCustomers).toHaveBeenCalledTimes(1)
    expect(result.status.value).toBe('success')
    expect(result.customers.value).toEqual(customers)
    expect(result.hasCustomers.value).toBe(true)
  })

  it('filtra clientes por nome, email ou perfil', async () => {
    const result = mountUseCustomersList()

    await flushPromises()

    result.searchTerm.value = 'admin'
    await nextTick()

    expect(result.filteredCustomers.value).toEqual([customers[0]])
    expect(result.hasFilteredCustomers.value).toBe(true)
  })

  it('remove cliente quando o usuario confirma a remocao', async () => {
    const result = mountUseCustomersList()

    await flushPromises()

    await result.removeCustomer('1')

    expect(window.confirm).toHaveBeenCalledWith('Deseja remover este cliente?')
    expect(deleteCustomer).toHaveBeenCalledWith('1')
    expect(result.customers.value).toEqual([customers[1]])
  })

  it('nao remove cliente quando o usuario cancela a confirmacao', async () => {
    vi.mocked(window.confirm).mockReturnValue(false)

    const result = mountUseCustomersList()

    await flushPromises()

    await result.removeCustomer('1')

    expect(deleteCustomer).not.toHaveBeenCalled()
    expect(result.customers.value).toEqual(customers)
  })

  it('expõe mensagem de erro quando o carregamento falha', async () => {
    vi.mocked(listCustomers).mockRejectedValue(new Error('Falha ao carregar.'))

    const result = mountUseCustomersList()

    await flushPromises()

    expect(result.status.value).toBe('error')
    expect(result.errorMessage.value).toBe('Falha ao carregar.')
  })
})
