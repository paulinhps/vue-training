import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { CustomerRole } from './customer.types'

const customerCreateZodSchema = z.object({
  name: z.string().min(1, 'Informe o nome.'),
  email: z.string().email('Informe um e-mail valido.'),
  role: z.enum(['admin', 'user']),
  creditLimit: z.number().min(0, 'O limite precisa ser maior ou igual a zero.'),
  isActive: z.boolean(),
})

export const customerCreateSchema = toTypedSchema(customerCreateZodSchema)

export type CustomerCreateInput = z.infer<typeof customerCreateZodSchema> & {
  role: CustomerRole
}
