export type CustomerRole = 'admin' | 'user'

export type Customer = {
  id: string
  name: string
  email: string
  role: CustomerRole
  creditLimit: number
  isActive: boolean
}
