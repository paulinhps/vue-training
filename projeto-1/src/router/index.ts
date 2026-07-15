import { createRouter, createWebHistory, type RouterHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import RenderViewEmpty from '@/shared/router/RenderViewEmpty.vue'
import { adminRoutes } from '@/features/admin/admin.routes'
import { authRoutes } from '@/features/auth/auth.routes'
import { cartRoutes } from '@/features/cart/cart.routes'
import { customerRoutes } from '@/features/customers/customer.routes'
import { onboardingRoutes } from '@/features/onboarding/onboarding.routes'
import { productRoutes } from '@/features/products/product.routes'
import { settingRoutes } from '@/features/settings/setting.routes'
import { userRoutes } from '@/features/users/user.routes'

export function createAppRouter(
  history: RouterHistory = createWebHistory(import.meta.env.BASE_URL),
) {
  const router = createRouter({
    history,
    routes: [
      {
        path: '',
        component: RenderViewEmpty,
        redirect: { name: 'root' },
        name: 'public',
        children: [
          {
            path: '/',
            name: 'root',
            component: () => import('@/views/HomeView.vue'),
          },
          ...authRoutes,
        ],
      },
      {
        path: '',
        component: RenderViewEmpty,
        name: 'authenticated',
        meta: {
          requiresAuth: true,
        },
        children: [
          {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('@/views/DashboardView.vue'),
            meta: {
              breadcrumb: 'Dashboard',
            },
          },
          ...userRoutes,
          ...settingRoutes,
          ...customerRoutes,
          ...productRoutes,
          ...cartRoutes,
          ...adminRoutes,
          {
            path: '/forbidden',
            name: 'forbidden',
            component: () => import('@/views/ForbiddenView.vue'),
            meta: {
              breadcrumb: 'Acesso negado',
            },
          },
          ...onboardingRoutes,
        ],
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

const router = createAppRouter()

export default router
