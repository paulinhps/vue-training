<script setup lang="ts">
import { RouterLink } from 'vue-router'

const exampleGroups = [
  {
    routeName: 'examples-components',
    title: 'Componentes',
    description: 'Options API, props, emits, componentes dinamicos e async components.',
  },
  {
    routeName: 'examples-reactivity',
    title: 'Reatividade',
    description: 'computed, watch, customRef, debounce e cancelamento de requisicao.',
  },
  {
    routeName: 'examples-composables',
    title: 'Composables',
    description: 'Relogios independentes com lifecycle e cleanup encapsulados.',
  },
  {
    routeName: 'examples-provide-inject',
    title: 'Provide/inject',
    description: 'Contextos de tema tipados e providers aninhados independentes.',
  },
]
</script>

<template>
  <div class="examples-grid">
    <RouterLink
      v-for="group in exampleGroups"
      :key="group.routeName"
      :to="{ name: group.routeName }"
      class="example-card"
    >
      <strong>{{ group.title }}</strong>
      <span>{{ group.description }}</span>
    </RouterLink>
  </div>
</template>

<style scoped>
.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.example-card {
  display: grid;
  gap: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 18px;
  color: #0f172a;
  text-decoration: none;
}

.example-card:hover {
  border-color: #2563eb;
}

.example-card span {
  color: #64748b;
}
</style>
