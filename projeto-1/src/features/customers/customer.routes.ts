import type { RouteRecordRaw } from 'vue-router'
import RenderViewEmpty from '@/shared/router/RenderViewEmpty.vue'

export const customerRoutes: RouteRecordRaw[] = [
  {
    path: '/customers',
    name: 'customers-list-root',
    component: RenderViewEmpty,
    meta: {
      breadcrumb: 'Clientes',
    },
    children: [
      {
        path: '',
        name: 'customers-list',
        component: () => import('./CustomersListView.vue'),
      },
      {
        path: 'new',
        name: 'customer-create-validated',
        component: () => import('./CustomerCreateValidatedView.vue'),
        meta: {
          breadcrumb: 'Novo cliente',
        },
      },
      {
        path: 'new-simple',
        name: 'customer-create',
        component: () => import('./CustomerCreateSimpleView.vue'),
        meta: {
          breadcrumb: 'Novo cliente V1',
        },
      },
      {
        path: 'workspace',
        name: 'customer-workspace',
        component: () => import('./CustomerWorkspaceView.vue'),
        meta: {
          breadcrumb: 'Workspace',
        },
      },
      {
        path: ':id/edit',
        name: 'customer-edit',
        component: () => import('./CustomerEditView.vue'),
        meta: {
          breadcrumb: 'Editar cliente',
        },
      },
    ],
  },
]
