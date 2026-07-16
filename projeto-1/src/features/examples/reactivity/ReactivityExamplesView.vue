<script setup lang="ts">
import CepSearch from './CepSearch.vue'
import WatchExample from './WatchExample.vue'
</script>

<template>
  <div class="examples-stack">
    <section class="example-section">
      <WatchExample />
    </section>

    <section class="example-section">
      <CepSearch />
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
  padding: 4px;
}
</style>
