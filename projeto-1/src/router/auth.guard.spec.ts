import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryHistory, createRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

function createTestRouter() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/login',
        name: 'login',
        component: { template: '<div>Login</div>' },
      },
      {
        path: '/admin',
        name: 'admin',
        component: { template: '<div>Admin</div>' },
        meta: {
          requiresAuth: true,
        },
      },
    ],
  })

  router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      return {
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      }
    }
  })

  return router
}

describe('auth guard', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('redireciona visitante para login ao acessar rota privada', async () => {
    const router = createTestRouter()

    await router.push('/admin')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('login')
    expect(router.currentRoute.value.query.redirect).toBe('/admin')
  })

  it('permite usuario autenticado acessar rota privada', async () => {
    const authStore = useAuthStore()
    authStore.login()
    const router = createTestRouter()

    await router.push('/admin')
    await router.isReady()

    expect(router.currentRoute.value.name).toBe('admin')
  })
})
