import type { RouteRecordRaw } from 'vue-router'

export const cartRoutes: RouteRecordRaw[] = [
  {
    path: '/cart',
    name: 'cart',
    component: () => import('./CartView.vue'),
    meta: {
      breadcrumb: 'Carrinho',
    },
  },
]
