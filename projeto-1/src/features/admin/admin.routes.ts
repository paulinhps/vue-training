import type { RouteRecordRaw } from 'vue-router'

export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('./AdminView.vue'),
    meta: {
      breadcrumb: 'Admin',
      requiresAuth: true,
    },
  },
]
