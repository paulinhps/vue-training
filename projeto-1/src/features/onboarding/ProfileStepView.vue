<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="wizard-step-view">
    <h2>Perfil</h2>
    <p>Etapa para dados basicos do usuario.</p>

    <RouterLink :to="{ name: 'onboarding-company' }">
      Proxima etapa
    </RouterLink>
  </section>
</template>

<style scoped>
.wizard-step-view {
  display: grid;
  gap: 12px;
}

.wizard-step-view h2,
.wizard-step-view p {
  margin: 0;
}
</style>
