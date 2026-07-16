import type { RouteRecordRaw } from 'vue-router'

export const exampleRoutes: RouteRecordRaw[] = [
  {
    path: '/examples',
    name: 'examples',
    component: () => import('./ExamplesLayoutView.vue'),
    meta: {
      breadcrumb: 'Exemplos',
    },
    children: [
      {
        path: '',
        name: 'examples-overview',
        component: () => import('./ExamplesOverviewView.vue'),
      },
      {
        path: 'components',
        name: 'examples-components',
        component: () => import('./components/ComponentsExamplesView.vue'),
        meta: {
          breadcrumb: 'Componentes',
        },
      },
      {
        path: 'reactivity',
        name: 'examples-reactivity',
        component: () => import('./reactivity/ReactivityExamplesView.vue'),
        meta: {
          breadcrumb: 'Reatividade',
        },
      },
      {
        path: 'composables',
        name: 'examples-composables',
        component: () => import('./composables/ComposablesExamplesView.vue'),
        meta: {
          breadcrumb: 'Composables',
        },
      },
      {
        path: 'provide-inject',
        name: 'examples-provide-inject',
        component: () => import('./context/ContextExamplesView.vue'),
        meta: {
          breadcrumb: 'Provide e inject',
        },
      },
    ],
  },
]
