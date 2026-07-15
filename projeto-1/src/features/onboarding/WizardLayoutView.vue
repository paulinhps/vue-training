<script setup lang="ts">
import { computed } from 'vue'
import { onBeforeRouteLeave, RouterLink, RouterView, useRoute } from 'vue-router'

type WizardStep = {
  name: string
  label: string
  routeName: string
}

const route = useRoute()

const steps: WizardStep[] = [
  { name: 'profile', label: 'Perfil', routeName: 'onboarding-profile' },
  { name: 'company', label: 'Empresa', routeName: 'onboarding-company' },
  { name: 'plan', label: 'Plano', routeName: 'onboarding-plan' },
  { name: 'review', label: 'Revisao', routeName: 'onboarding-review' },
]

const activeStepIndex = computed(() => {
  const index = steps.findIndex((step) => step.routeName === route.name)

  return index === -1 ? 0 : index
})

const progressPercentage = computed(() => {
  return ((activeStepIndex.value + 1) / steps.length) * 100
})

onBeforeRouteLeave(() => {
  return window.confirm('Deseja sair do wizard de onboarding?')
})
</script>

<template>
  <section class="wizard-page">
    <header class="wizard-header">
      <div>
        <h1>Wizard de onboarding</h1>
        <p>Layout persistente com etapas renderizadas por nested routes.</p>
      </div>

      <strong>Etapa {{ activeStepIndex + 1 }} de {{ steps.length }}</strong>
    </header>

    <div class="progress-track">
      <div
        class="progress-bar"
        :style="{ width: `${progressPercentage}%` }"
      />
    </div>

    <nav class="wizard-steps" aria-label="Etapas do onboarding">
      <RouterLink
        v-for="(step, index) in steps"
        :key="step.name"
        :to="{ name: step.routeName }"
        class="wizard-step"
        :class="{
          'wizard-step--active': route.name === step.routeName,
          'wizard-step--completed': index < activeStepIndex,
        }"
      >
        <span>{{ index + 1 }}</span>
        {{ step.label }}
      </RouterLink>
    </nav>

    <section class="wizard-content">
      <RouterView />
    </section>
  </section>
</template>

<style scoped>
.wizard-page {
  display: grid;
  gap: 20px;
  max-width: 840px;
}

.wizard-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.wizard-header h1,
.wizard-header p {
  margin: 0;
}

.wizard-header p {
  color: #64748b;
}

.progress-track {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background-color: #e2e8f0;
}

.progress-bar {
  height: 100%;
  border-radius: inherit;
  background-color: #2563eb;
  transition: width 180ms ease;
}

.wizard-steps {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.wizard-step {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 8px 10px;
  color: #475569;
  text-decoration: none;
  background-color: white;
}

.wizard-step span {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  color: #475569;
  background-color: #e2e8f0;
  font-size: 13px;
}

.wizard-step--active {
  border-color: #2563eb;
  color: #1d4ed8;
  font-weight: 700;
}

.wizard-step--active span,
.wizard-step--completed span {
  color: white;
  background-color: #2563eb;
}

.wizard-content {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  background-color: #f8fafc;
}
</style>
