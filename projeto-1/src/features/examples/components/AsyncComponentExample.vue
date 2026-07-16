<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import ErrorState from './ErrorState.vue'
import LoadingState from './LoadingState.vue'

const isReportVisible = ref(false)

const MonthlyReport = defineAsyncComponent({
  loader: async () => {
    await wait(1500)

    return import('./MonthlyReport.vue')
  },
  loadingComponent: LoadingState,
  errorComponent: ErrorState,
  delay: 200,
  timeout: 5000,
})

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })
}

function showReport(): void {
  isReportVisible.value = true
}

function hideReport(): void {
  isReportVisible.value = false
}
</script>

<template>
  <main class="async-example-page">
    <header>
      <h1>Async Component</h1>
      <p>O relatorio mensal e carregado apenas quando voce solicita.</p>
    </header>

    <button
      v-if="!isReportVisible"
      @click="showReport"
    >
      Abrir relatorio mensal
    </button>

    <section
      v-else
      class="report-section"
    >
      <button @click="hideReport">
        Fechar relatorio
      </button>

      <MonthlyReport />
    </section>
  </main>
</template>

<style scoped>
.async-example-page {
  display: grid;
  gap: 24px;
  max-width: 720px;
  padding: 32px;
  font-family: Inter, system-ui, sans-serif;
}

.async-example-page h1 {
  margin: 0 0 8px;
}

.async-example-page p {
  margin: 0;
  color: #64748b;
}

.async-example-page button {
  width: fit-content;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  background-color: #2563eb;
  cursor: pointer;
}

.report-section {
  display: grid;
  gap: 16px;
}
</style>
