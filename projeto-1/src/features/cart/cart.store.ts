import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export type Product = {
  id: number
  name: string
  price: number
}

export type CartItem = Product & {
  quantity: number
}

const storageKey = 'projeto-1:cart'

function readCartFromStorage(): CartItem[] {

  try {
    const storedValue = localStorage.getItem(storageKey);


    return storedValue ? (JSON.parse(storedValue) as CartItem[]) : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(readCartFromStorage())

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + item.price * item.quantity, 0)
  })

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  function addProduct(product: Product): void {
    const existingItem = items.value.find((item) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
      return
    }

    items.value.push({
      ...product,
      quantity: 1,
    })
  }

  function removeProduct(productId: number): void {
    items.value = items.value.filter((item) => item.id !== productId)
  }

  function decreaseProduct(productId: number): void {
    const existingItem = items.value.find((item) => item.id === productId)

    if (!existingItem) {
      return
    }

    if (existingItem.quantity === 1) {
      removeProduct(productId)
      return
    }

    existingItem.quantity -= 1
  }

  function clearCart(): void {
    items.value = []
  }

  watch(
    items,
    () => {
      localStorage.setItem(storageKey, JSON.stringify(items.value))
    },
    { deep: true },
  )

  return {
    items,
    totalItems,
    subtotal,
    isEmpty,
    addProduct,
    removeProduct,
    decreaseProduct,
    clearCart,
  }
})
