import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { RouterLinkStub } from '@vue/test-utils'
import { useCartStore } from '../cart.store'
import CartButton from './CartButton.vue'

function mountCartButton() {
  return mount(CartButton, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  })
}

describe('CartButton', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('nao renderiza o link quando o carrinho esta vazio', () => {
    const wrapper = mountCartButton()

    expect(wrapper.find('.cart-button').exists()).toBe(false)
  })

  it('renderiza o badge com a quantidade total de itens', () => {
    const cartStore = useCartStore()

    cartStore.addProduct({
      id: 1,
      name: 'Notebook',
      price: 5000,
    })

    cartStore.addProduct({
      id: 1,
      name: 'Notebook',
      price: 5000,
    })

    const wrapper = mountCartButton()

    expect(wrapper.get('.cart-button__badge').text()).toBe('2')
  })

  it('aponta para a rota do carrinho', () => {
    const cartStore = useCartStore()

    cartStore.addProduct({
      id: 1,
      name: 'Notebook',
      price: 5000,
    })

    const wrapper = mountCartButton()
    const routerLink = wrapper.getComponent(RouterLinkStub)

    expect(routerLink.props('to')).toBe('/cart')
  })

  it('carrega itens persistidos no localStorage', () => {
    localStorage.setItem('projeto-1:cart', JSON.stringify([
      {
        id: 1,
        name: 'Notebook',
        price: 5000,
        quantity: 2,
      },
    ]))

    const cartStore = useCartStore()

    expect(cartStore.totalItems).toBe(2)
  })
})
