<script setup lang="ts">
import LocalClock from './LocalClock.vue'
import UtcClock from './UtcClock.vue'
</script>

<template>
  <div class="clock-grid">
    <LocalClock />
    <UtcClock />
  </div>
</template>

<style scoped>
.clock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
</style>
