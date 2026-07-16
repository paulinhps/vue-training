<script setup lang="ts">
type ReportMetric = {
  id: number
  label: string
  value: string
}

const metrics: ReportMetric[] = [
  { id: 1, label: 'Receita mensal', value: 'R$ 42.000' },
  { id: 2, label: 'Novos clientes', value: '18' },
  { id: 3, label: 'Taxa de conversao', value: '12%' },
]
</script>

<template>
  <section class="monthly-report">
    <h2>Relatorio mensal</h2>

    <ul>
      <li
        v-for="metric in metrics"
        :key="metric.id"
      >
        <span>{{ metric.label }}</span>
        <strong>{{ metric.value }}</strong>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.monthly-report {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.monthly-report h2 {
  margin: 0 0 16px;
}

.monthly-report ul {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.monthly-report li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}
</style>
