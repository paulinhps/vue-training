import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore, type CartItem, type Product } from './cart.store'

const notebook: Product = {
  id: 1,
  name: 'Notebook',
  price: 5000,
}

const mouse: Product = {
  id: 2,
  name: 'Mouse',
  price: 120,
}

function persistCart(items: CartItem[]): void {
  localStorage.setItem('projeto-1:cart', JSON.stringify(items))
}

describe('cart.store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('adiciona produto e calcula total de itens e subtotal', () => {
    const cartStore = useCartStore()

    cartStore.addProduct(notebook)
    cartStore.addProduct(mouse)

    expect(cartStore.items).toHaveLength(2)
    expect(cartStore.totalItems).toBe(2)
    expect(cartStore.subtotal).toBe(5120)
    expect(cartStore.isEmpty).toBe(false)
  })

  it('incrementa quantidade quando adiciona o mesmo produto mais de uma vez', () => {
    const cartStore = useCartStore()

    cartStore.addProduct(notebook)
    cartStore.addProduct(notebook)

    expect(cartStore.items).toHaveLength(1)
    expect(cartStore.items[0]?.quantity).toBe(2)
    expect(cartStore.totalItems).toBe(2)
    expect(cartStore.subtotal).toBe(10000)
  })

  it('diminui quantidade e remove o item quando chega a zero', () => {
    const cartStore = useCartStore()

    cartStore.addProduct(notebook)
    cartStore.addProduct(notebook)

    cartStore.decreaseProduct(notebook.id)

    expect(cartStore.items[0]?.quantity).toBe(1)
    expect(cartStore.totalItems).toBe(1)

    cartStore.decreaseProduct(notebook.id)

    expect(cartStore.items).toHaveLength(0)
    expect(cartStore.isEmpty).toBe(true)
  })

  it('inicializa com itens persistidos no localStorage', () => {
    persistCart([
      {
        ...notebook,
        quantity: 2,
      },
    ])

    const cartStore = useCartStore()

    expect(cartStore.items).toHaveLength(1)
    expect(cartStore.totalItems).toBe(2)
    expect(cartStore.subtotal).toBe(10000)
  })
})
