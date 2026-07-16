import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupServer } from 'msw/node'

import type { Customer } from '@/features/customers/customer.types'
import { handlers } from './handlers'
import { loadDatabase, MOCK_DATABASE_STORAGE_KEY } from './database'

const server = setupServer(...handlers)
const apiUrl = (path: string) => new URL(path, window.location.origin)

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' })
})

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  server.resetHandlers()
  localStorage.clear()
})

afterAll(() => {
  server.close()
})

describe('API simulada', () => {
  it('inicializa a persistencia com o seed quando ela nao existe', () => {
    expect(localStorage.getItem(MOCK_DATABASE_STORAGE_KEY)).toBeNull()

    const database = loadDatabase()

    expect(database.customers.length).toBeGreaterThan(0)
    expect(database.addresses.length).toBeGreaterThan(0)
    expect(localStorage.getItem(MOCK_DATABASE_STORAGE_KEY)).not.toBeNull()
  })

  it('persiste clientes criados e removidos pelos handlers', async () => {
    const customerInput = {
      name: 'Cliente MSW',
      email: 'cliente.msw@example.com',
      role: 'user',
      creditLimit: 1000,
      isActive: true,
    } as const

    const createResponse = await fetch(apiUrl('/api/customers'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerInput),
    })
    const createdCustomer = (await createResponse.json()) as Customer

    expect(createResponse.status).toBe(201)
    expect(loadDatabase().customers).toContainEqual(createdCustomer)

    const deleteResponse = await fetch(
      apiUrl(`/api/customers/${createdCustomer.id}`),
      { method: 'DELETE' },
    )

    expect(deleteResponse.status).toBe(204)
    expect(loadDatabase().customers).not.toContainEqual(createdCustomer)
  })

  it('retorna 404 para um CEP que nao existe no seed', async () => {
    const response = await fetch(apiUrl('/api/addresses/99999999'))

    expect(response.status).toBe(404)
  })
})
