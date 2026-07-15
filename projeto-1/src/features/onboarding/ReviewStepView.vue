<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="wizard-step-view">
    <h2>Revisao</h2>
    <p>Etapa final antes de concluir o onboarding.</p>

    <RouterLink :to="{ name: 'onboarding-plan' }">
      Voltar
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
