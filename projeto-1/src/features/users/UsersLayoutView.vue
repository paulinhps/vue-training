<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <section class="users-layout">
    <aside class="users-sidebar">
      <strong>Area de usuarios</strong>

      <RouterLink :to="{ name: 'users-list' }">
        Lista
      </RouterLink>

      <RouterLink :to="{ name: 'user-details', params: { id: 1 } }">
        Usuario 1
      </RouterLink>
    </aside>

    <div class="users-content">
      <RouterView />
    </div>
  </section>
</template>

<style scoped>
.users-layout {
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 24px;
}

.users-sidebar {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.users-sidebar a {
  color: #2563eb;
  text-decoration: none;
}

.users-sidebar a.router-link-exact-active {
  color: #0f172a;
  font-weight: 700;
}

.users-content {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}
</style>
