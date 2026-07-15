<script setup lang="ts">
import { useCartStore } from '../cart.store'
import { storeToRefs } from 'pinia';

const { totalItems, isEmpty } = storeToRefs(useCartStore())
</script>

<template>
    <RouterLink v-if="!isEmpty" to="/cart" class="cart-button" :class="{ 'cart-button--empty': isEmpty }"
        :aria-label="`Carrinho com ${totalItems} item(s)`">
        <span aria-hidden="true">🛒</span>

        <span v-if="!isEmpty" class="cart-button__badge" aria-hidden="true">
            {{ totalItems }}
        </span>
    </RouterLink>
</template>

<style scoped>
.cart-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 20;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: 1px solid #dbeafe;
    border-radius: 50%;
    padding: 0;
    color: #1d4ed8;
    background-color: #eff6ff;
    box-shadow: 0 14px 30px rgb(15 23 42 / 18%);
    text-decoration: none;
    font-size: 26px;
    transition:
        border-color 160ms ease,
        background-color 160ms ease,
        color 160ms ease,
        transform 160ms ease;
}

.cart-button:hover {
    border-color: #2563eb;
    background-color: #dbeafe;
    transform: translateY(-2px);
}

.cart-button--empty {
    border-color: #e2e8f0;
    color: #64748b;
    background-color: #f8fafc;
}

.cart-button__badge {
    position: absolute;
    top: -6px;
    right: -6px;
    display: inline-grid;
    min-width: 24px;
    height: 24px;
    place-items: center;
    border: 2px solid white;
    border-radius: 999px;
    padding: 0 6px;
    color: white;
    background-color: #dc2626;
    font-size: 12px;
    font-weight: 800;
}

@media (max-width: 640px) {
    .cart-button {
        right: 16px;
        bottom: 16px;
    }
}
</style>
