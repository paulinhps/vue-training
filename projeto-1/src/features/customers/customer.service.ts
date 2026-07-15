import type { Customer } from './customer.types'
import type { CustomerCreateInput } from './customer.schema'
import { withRetry } from '@/shared/http/withRetry'

const baseUrl = 'http://localhost:3001/customers'

export async function listCustomers(signal?: AbortSignal): Promise<Customer[]> {
  return withRetry(async () => {
    const response = await fetch(baseUrl, {
      signal,
    })

    if (!response.ok) {
      throw new Error('Nao foi possivel carregar clientes.')
    }

    return (await response.json()) as Customer[]
  }, {
    retries: 2,
    delayInMs: 500,
    signal,
  })
}

export async function getCustomerById(customerId: string): Promise<Customer> {
  const response = await fetch(`${baseUrl}/${customerId}`)

  if (!response.ok) {
    throw new Error('Nao foi possivel carregar o cliente.')
  }

  return (await response.json()) as Customer
}

export async function createCustomer(customer: CustomerCreateInput): Promise<void> {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customer),
  })

  if (!response.ok) {
    throw new Error('Nao foi possivel cadastrar o cliente.')
  }
}

export async function updateCustomer(
  customerId: string,
  customer: CustomerCreateInput,
): Promise<void> {
  const response = await fetch(`${baseUrl}/${customerId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...customer,
      id: customerId,
    }),
  })

  if (!response.ok) {
    throw new Error('Nao foi possivel atualizar o cliente.')
  }
}

export async function deleteCustomer(customerId: string): Promise<void> {
  const response = await fetch(`${baseUrl}/${customerId}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Nao foi possivel remover o cliente.')
  }
}
