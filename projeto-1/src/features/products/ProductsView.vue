<script setup lang="ts">
import { useCartStore, type Product } from '@/features/cart/cart.store'

const cartStore = useCartStore()

const products: Product[] = [
  { id: 1, name: 'Notebook', price: 5000 },
  { id: 2, name: 'Mouse', price: 120 },
  { id: 3, name: 'Teclado', price: 240 },
]

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<template>
  <section>
    <h1>Produtos</h1>
    <p>Total no carrinho: {{ cartStore.totalItems }}</p>

    <ul>
      <li
        v-for="product in products"
        :key="product.id"
      >
        <strong>{{ product.name }}</strong>
        <span>{{ formatCurrency(product.price) }}</span>

        <button @click="cartStore.addProduct(product)">
          Adicionar
        </button>
      </li>
    </ul>
  </section>
</template>
