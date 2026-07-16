import { http, HttpResponse } from 'msw'

import type { Customer } from '@/features/customers/customer.types'
import { loadDatabase, saveDatabase } from './database'

type CustomerInput = Omit<Customer, 'id'>

function nextCustomerId(customers: Customer[]): string {
  const greatestId = customers.reduce((greatest, customer) => {
    const numericId = Number(customer.id)

    return Number.isFinite(numericId) ? Math.max(greatest, numericId) : greatest
  }, 0)

  return String(greatestId + 1)
}

export const handlers = [
  http.get('/api/customers', () => {
    const database = loadDatabase()

    return HttpResponse.json(database.customers)
  }),

  http.get('/api/customers/:customerId', ({ params }) => {
    const database = loadDatabase()
    const customer = database.customers.find(({ id }) => id === params.customerId)

    if (!customer) {
      return HttpResponse.json({ message: 'Cliente nao encontrado.' }, { status: 404 })
    }

    return HttpResponse.json(customer)
  }),

  http.post('/api/customers', async ({ request }) => {
    const input = (await request.json()) as CustomerInput
    const database = loadDatabase()
    const customer: Customer = {
      ...input,
      id: nextCustomerId(database.customers),
    }

    database.customers.push(customer)
    saveDatabase(database)

    return HttpResponse.json(customer, { status: 201 })
  }),

  http.put('/api/customers/:customerId', async ({ params, request }) => {
    const database = loadDatabase()
    const customerIndex = database.customers.findIndex(({ id }) => id === params.customerId)

    if (customerIndex === -1) {
      return HttpResponse.json({ message: 'Cliente nao encontrado.' }, { status: 404 })
    }

    const input = (await request.json()) as CustomerInput
    const customer: Customer = {
      ...input,
      id: String(params.customerId),
    }

    database.customers[customerIndex] = customer
    saveDatabase(database)

    return HttpResponse.json(customer)
  }),

  http.delete('/api/customers/:customerId', ({ params }) => {
    const database = loadDatabase()
    const customerIndex = database.customers.findIndex(({ id }) => id === params.customerId)

    if (customerIndex === -1) {
      return HttpResponse.json({ message: 'Cliente nao encontrado.' }, { status: 404 })
    }

    database.customers.splice(customerIndex, 1)
    saveDatabase(database)

    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/addresses/:addressId', ({ params }) => {
    const database = loadDatabase()
    const address = database.addresses.find(({ id }) => id === params.addressId)

    if (!address) {
      return HttpResponse.json({ message: 'CEP nao encontrado.' }, { status: 404 })
    }

    return HttpResponse.json(address)
  }),
]
