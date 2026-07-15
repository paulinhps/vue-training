import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renderiza o layout e a pagina da rota atual', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        {
          path: '/',
          component: () => import('../layouts/MainLayout.vue'),
          children: [
            {
              path: '',
              component: () => import('../views/HomeView.vue'),
            },
          ],
        },
      ],
    })

    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.text()).toContain('Main Layout')
    expect(wrapper.text()).toContain('Welcome to the Home Page')
  })
})
