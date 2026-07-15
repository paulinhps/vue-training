<script setup lang="ts">
import { useCartStore } from './cart.store'

const cartStore = useCartStore()

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<template>
  <section>
    <h1>Carrinho</h1>

    <p v-if="cartStore.isEmpty">
      Carrinho vazio.
    </p>

    <template v-else>
      <ul>
        <li
          v-for="item in cartStore.items"
          :key="item.id"
        >
          <strong>{{ item.name }}</strong>
          <span>{{ item.quantity }} unidade(s)</span>
          <span>{{ formatCurrency(item.price * item.quantity) }}</span>

          <button @click="cartStore.decreaseProduct(item.id)">
            -
          </button>

          <button @click="cartStore.addProduct(item)">
            +
          </button>

          <button @click="cartStore.removeProduct(item.id)">
            Remover
          </button>
        </li>
      </ul>

      <p>Subtotal: {{ formatCurrency(cartStore.subtotal) }}</p>

      <button @click="cartStore.clearCart">
        Limpar carrinho
      </button>
    </template>
  </section>
</template>
