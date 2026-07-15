<script setup lang="ts">
import { ref } from 'vue'
import SalesDashboard from './SalesDashboard.vue'

type DashboardMetric = {
    title: string
    value: number
    suffix: string
}

const dashboardTitle = 'Painel Comercial'

const salesMetric = ref<DashboardMetric>({
    title: 'Vendas',
    value: 128,
    suffix: 'pedidos',
})

const reportUrl = '/reports/sales'

function increaseSales(): void {
    salesMetric.value.value += 1
}

function resetSales(): void {
    salesMetric.value.value = 0
}
</script>

<template>
    <main class="dashboard-page">
        <header class="dashboard-header">
            <h1>{{ dashboardTitle }}</h1>

            <a :href="reportUrl">
                Ver relatório completo
            </a>
        </header>

        <section class="metric-card">
            <h2>{{ salesMetric.title }}</h2>

            <p>
                {{ salesMetric.value }} {{ salesMetric.suffix }}
            </p>

            <button @click="increaseSales">
                Adicionar venda
            </button>

            <button @click="resetSales">
                Zerar
            </button>
        </section>
    </main>
    <SalesDashboard />
</template>

<style scoped>
.dashboard-page {
    padding: 32px;
    font-family: Inter, system-ui, sans-serif;
}

.dashboard-header {
    margin-bottom: 24px;
}

.metric-card {
    max-width: 320px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
}

.metric-card h2 {
    margin: 0 0 8px;
}

.metric-card p {
    margin: 0 0 16px;
    font-size: 24px;
    font-weight: 700;
}

.metric-card button {
    margin-right: 8px;
}
</style>