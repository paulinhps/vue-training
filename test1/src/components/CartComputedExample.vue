<script setup lang="ts">
import { computed, ref } from 'vue'

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

const cartItems = ref<CartItem[]>([
  { id: 1, name: 'Notebook', price: 5000, quantity: 1 },
  { id: 2, name: 'Mouse', price: 120, quantity: 2 },
])

const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.quantity
  }, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

const hasItems = computed(() => {
  return cartItems.value.length > 0
})

function addItem(itemName: string): void {
  const founded = cartItems.value.find((item) => item.name === itemName)

  if (!founded) {
    return
  }

  founded.quantity += 1
}
function removeItem(itemName: string): void {
  const founded = cartItems.value.find((item) => item.name === itemName)

  if (!founded || founded.quantity <= 0) {
    return
  }

  founded.quantity -= 1;
}
</script>

<template>
  <section class="cart-page">
    <h1>Carrinho</h1>

    <div class="cart-summary">
      <p>Total de itens: {{ totalItems }}</p>
      <p>Subtotal: R$ {{ subtotal }}</p>
    </div>

    <p v-if="!hasItems">
      Carrinho vazio.
    </p>

    <ul v-else class="cart-list">
      <li v-for="item in cartItems" :key="item.id">
        <span>{{ item.name }}</span>
        <strong>{{ item.quantity }}x</strong>
        <button @click="addItem(item.name)">
          ➕
        </button>
        <button @click="removeItem(item.name)">
          ➖
        </button>
      </li>
    </ul>


  </section>
</template>

<style scoped>
.cart-page {
  display: grid;
  gap: 20px;
  max-width: 520px;
  padding: 32px;
  font-family: Inter, system-ui, sans-serif;
}

.cart-page h1 {
  margin: 0;
}

.cart-summary {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.cart-summary p {
  margin: 0;
}

.cart-summary p+p {
  margin-top: 8px;
}

.cart-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cart-list li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
}

.cart-page button {
  width: fit-content;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  background-color: #2563eb;
  cursor: pointer;
}
</style>
