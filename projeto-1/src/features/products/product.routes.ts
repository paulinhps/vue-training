import type { RouteRecordRaw } from 'vue-router'

export const productRoutes: RouteRecordRaw[] = [
  {
    path: '/products',
    name: 'products',
    component: () => import('./ProductsView.vue'),
    meta: {
      breadcrumb: 'Produtos',
    },
  },
]
