import type { RouteRecordRaw } from 'vue-router'

export const onboardingRoutes: RouteRecordRaw[] = [
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('./WizardLayoutView.vue'),
    meta: {
      breadcrumb: 'Onboarding',
    },
    children: [
      {
        path: '',
        redirect: { name: 'onboarding-profile' },
      },
      {
        path: 'profile',
        name: 'onboarding-profile',
        component: () => import('./ProfileStepView.vue'),
        meta: {
          breadcrumb: 'Perfil',
        },
      },
      {
        path: 'company',
        name: 'onboarding-company',
        component: () => import('./CompanyStepView.vue'),
        meta: {
          breadcrumb: 'Empresa',
        },
      },
      {
        path: 'plan',
        name: 'onboarding-plan',
        component: () => import('./PlanStepView.vue'),
        meta: {
          breadcrumb: 'Plano',
        },
      },
      {
        path: 'review',
        name: 'onboarding-review',
        component: () => import('./ReviewStepView.vue'),
        meta: {
          breadcrumb: 'Revisao',
        },
      },
    ],
  },
]
