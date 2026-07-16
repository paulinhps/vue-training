import seed from '../../db.json'

import type { Customer } from '@/features/customers/customer.types'

type Address = (typeof seed.addresses)[number]

export type MockDatabase = {
  customers: Customer[]
  addresses: Address[]
}

export const MOCK_DATABASE_STORAGE_KEY = 'projeto-1:mock-database:v1'

function createDatabaseFromSeed(): MockDatabase {
  return structuredClone({
    customers: seed.customers,
    addresses: seed.addresses,
  }) as MockDatabase
}

function isMockDatabase(value: unknown): value is MockDatabase {
  if (!value || typeof value !== 'object') {
    return false
  }

  const database = value as Partial<MockDatabase>

  return Array.isArray(database.customers) && Array.isArray(database.addresses)
}

export function loadDatabase(): MockDatabase {
  const storedDatabase = localStorage.getItem(MOCK_DATABASE_STORAGE_KEY)

  if (storedDatabase) {
    try {
      const database: unknown = JSON.parse(storedDatabase)

      if (isMockDatabase(database)) {
        return database
      }
    } catch {
      // A persistencia invalida sera substituida pelo seed abaixo.
    }
  }

  return resetDatabase()
}

export function saveDatabase(database: MockDatabase): void {
  localStorage.setItem(MOCK_DATABASE_STORAGE_KEY, JSON.stringify(database))
}

export function resetDatabase(): MockDatabase {
  const database = createDatabaseFromSeed()
  saveDatabase(database)

  return database
}
