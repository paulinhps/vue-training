import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'users',
    component: () => import('./UsersLayoutView.vue'),
    meta: {
      breadcrumb: 'Usuários',
    },
    children: [
      {
        path: '',
        name: 'users-list',
        component: () => import('./UsersView.vue'),
      },
      {
        path: ':id',
        name: 'user-details',
        component: () => import('./UserDetailsView.vue'),
        beforeEnter: (to) => {
          const userId = Number(to.params.id)

          if (!Number.isInteger(userId) || userId < 1 || userId > 3) {
            return {
              name: 'users-list',
              query: {
                invalidUserId: String(to.params.id),
              },
            }
          }
        },
        meta: {
          breadcrumb: 'User Details',
        },
      },
    ],
  },
]
