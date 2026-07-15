<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Breadcrumb from './layouts/components/Breadcrumb.vue';
import CartButton from './features/cart/components/CartButton.vue';
import { useBreadcrumbs } from './composable/useBreadcrumbs.ts';


useBreadcrumbs();

</script>

<template>
  <header class="app-header">
    <RouterLink :to="{ name: 'root' }"><strong>Projeto 1 - Vue Router</strong></RouterLink>

    <nav class="app-nav">
      <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
      <RouterLink to="/users">Usuarios</RouterLink>
      <RouterLink to="/customers">Clientes</RouterLink>
      <RouterLink to="/products">Produtos</RouterLink>
      <RouterLink to="/settings">Configuracoes</RouterLink>
      <RouterLink to="/onboarding">Wizard</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
    </nav>
  </header>

  <main class="app-main">
    <Breadcrumb />
    <RouterView />
  </main>

  <CartButton />
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 24px;
}

.app-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.app-nav a {
  color: #2563eb;
  text-decoration: none;
}

.app-nav a.router-link-exact-active {
  color: #0f172a;
  font-weight: 700;
}

.app-main {
  padding: 24px;
}
</style>
