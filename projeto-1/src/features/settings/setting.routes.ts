import type { RouteRecordRaw } from 'vue-router'

export const settingRoutes: RouteRecordRaw[] = [
  {
    path: '/settings',
    name: 'settings',
    component: () => import('./SettingsView.vue'),
    meta: {
      breadcrumb: 'Settings',
    },
  },
]
