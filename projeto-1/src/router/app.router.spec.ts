import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { createAppRouter } from './index'

function createTestAppRouter() {
  return createAppRouter(createMemoryHistory())
}

describe('app router', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('permite acessar rotas publicas sem autenticacao', async () => {
    const router = createTestAppRouter()

    await router.push('/login')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.matched.map((route) => route.name)).toEqual([
      'public',
      'login',
    ])
    expect(router.currentRoute.value.meta.requiresAuth).toBeUndefined()
  })

  it('redireciona visitante ao acessar rota privada de uma feature', async () => {
    const router = createTestAppRouter()

    await router.push('/customers/new')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/customers/new')
  })

  it('permite usuario autenticado acessar rota privada importada de feature', async () => {
    const authStore = useAuthStore()
    authStore.login()
    const router = createTestAppRouter()

    await router.push('/customers/new')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('customer-create-validated')
    expect(router.currentRoute.value.meta.requiresAuth).toBe(true)
    expect(router.currentRoute.value.meta.breadcrumb).toBe('Novo cliente')
    expect(router.currentRoute.value.matched.map((route) => route.name)).toEqual([
      'authenticated',
      'customers-list-root',
      'customer-create-validated',
    ])
  })

  it('resolve rota dinamica privada de edicao de cliente', async () => {
    const authStore = useAuthStore()
    authStore.login()
    const router = createTestAppRouter()

    await router.push('/customers/123/edit')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('customer-edit')
    expect(router.currentRoute.value.params.id).toBe('123')
    expect(router.currentRoute.value.meta.requiresAuth).toBe(true)
    expect(router.currentRoute.value.meta.breadcrumb).toBe('Editar cliente')
  })

  it('mantem rotas admin privadas dentro do grupo autenticado', async () => {
    const authStore = useAuthStore()
    authStore.login()
    const router = createTestAppRouter()

    await router.push('/admin')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('admin')
    expect(router.currentRoute.value.meta.requiresAuth).toBe(true)
    expect(router.currentRoute.value.matched.map((route) => route.name)).toEqual([
      'authenticated',
      'admin',
    ])
  })
})
