<script setup lang="ts">
import AsyncComponentExample from './AsyncComponentExample.vue'
import DynamicComponentExample from './DynamicComponentExample.vue'
import OptionsApiExample from './OptionsApiExample.vue'
</script>

<template>
  <div class="examples-stack">
    <section class="example-section">
      <h2>Options API e componentes registrados</h2>
      <OptionsApiExample />
    </section>

    <section class="example-section">
      <h2>Componente dinamico</h2>
      <DynamicComponentExample />
    </section>

    <section class="example-section">
      <h2>Componente assincrono</h2>
      <AsyncComponentExample />
    </section>
  </div>
</template>

<style scoped>
.examples-stack {
  display: grid;
  gap: 24px;
}

.example-section {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
}

.example-section > h2 {
  margin-top: 0;
}
</style>
