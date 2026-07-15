<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="wizard-step-view">
    <h2>Empresa</h2>
    <p>Etapa para dados da empresa.</p>

    <div class="actions">
      <RouterLink :to="{ name: 'onboarding-profile' }">
        Voltar
      </RouterLink>

      <RouterLink :to="{ name: 'onboarding-plan' }">
        Proxima etapa
      </RouterLink>
    </div>
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

.actions {
  display: flex;
  gap: 12px;
}
</style>
