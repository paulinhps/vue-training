<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const sections = [
  { name: 'examples-overview', label: 'Visao geral' },
  { name: 'examples-components', label: 'Componentes' },
  { name: 'examples-reactivity', label: 'Reatividade' },
  { name: 'examples-composables', label: 'Composables' },
  { name: 'examples-provide-inject', label: 'Provide/inject' },
]
</script>

<template>
  <section class="examples-layout">
    <header>
      <h1>Playground de exemplos Vue</h1>
      <p>Exemplos isolados usados nos modulos iniciais do treinamento.</p>
    </header>

    <nav class="examples-nav" aria-label="Modulos de exemplo">
      <RouterLink
        v-for="section in sections"
        :key="section.name"
        :to="{ name: section.name }"
      >
        {{ section.label }}
      </RouterLink>
    </nav>

    <RouterView />
  </section>
</template>

<style scoped>
.examples-layout {
  display: grid;
  gap: 24px;
}

.examples-layout > header h1,
.examples-layout > header p {
  margin: 0;
}

.examples-layout > header p {
  margin-top: 8px;
  color: #64748b;
}

.examples-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 12px;
}

.examples-nav a {
  border-radius: 6px;
  padding: 8px 12px;
  color: #2563eb;
  text-decoration: none;
}

.examples-nav a.router-link-exact-active {
  color: white;
  background: #2563eb;
}
</style>
