<script setup lang="ts">
import { listCustomers } from './customer.service'

function wait(delayInMs: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, delayInMs)
  })
}

await wait(1200)

const customers = await listCustomers()
const totalCustomers = customers.length
const activeCustomers = customers.filter((customer) => customer.isActive).length
const inactiveCustomers = totalCustomers - activeCustomers
</script>

<template>
  <section class="summary-card">
    <h2>Resumo assíncrono</h2>

    <dl>
      <div>
        <dt>Total</dt>
        <dd>{{ totalCustomers }}</dd>
      </div>

      <div>
        <dt>Ativos</dt>
        <dd>{{ activeCustomers }}</dd>
      </div>

      <div>
        <dt>Inativos</dt>
        <dd>{{ inactiveCustomers }}</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.summary-card {
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 16px;
  background-color: #eff6ff;
}

.summary-card h2 {
  margin: 0 0 12px;
  font-size: 18px;
}

.summary-card dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin: 0;
}

.summary-card div {
  display: grid;
  gap: 4px;
}

.summary-card dt {
  color: #64748b;
  font-size: 13px;
}

.summary-card dd {
  margin: 0;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: 700;
}
</style>
