<script setup lang="ts">
import { ref } from 'vue'
import SummaryCard from './SummaryCard.vue'

type DashboardStatus = 'loading' | 'success' | 'empty' | 'error'

type MetricStatus = 'positive' | 'negative' | 'neutral'

type DashboardMetric = {
    id: number
    label: string
    value: string
    description: string
    status: MetricStatus
    progress: number
}

const dashboardStatus = ref<DashboardStatus>('empty')

const reportUrl = '/reports/monthly'

const metrics = ref<DashboardMetric[]>([
    {
        id: 1,
        label: 'Receita',
        value: 'R$ 42.000',
        description: 'Receita acumulada no mês',
        status: 'positive',
        progress: 84,
    },
    {
        id: 2,
        label: 'Clientes',
        value: '128',
        description: 'Clientes ativos',
        status: 'neutral',
        progress: 64,
    },
    {
        id: 3,
        label: 'Cancelamentos',
        value: '8',
        description: 'Cancelamentos no mês',
        status: 'negative',
        progress: 24,
    },
])

function setLoading(): void {
    dashboardStatus.value = 'loading'
}

function setSuccess(): void {
    dashboardStatus.value = 'success'
}

function setEmpty(): void {
    dashboardStatus.value = 'empty'
}

function setError(): void {
    dashboardStatus.value = 'error'
}

function updateMetric(id: number): void {
    const metric = metrics.value.find((m) => m.id === id)
    if (metric) {
        metric.progress = Math.min(Math.random() * 100, 100)
    }
}
</script>

<template>
    <main class="dashboard-page">
        <header class="dashboard-header">
            <div>
                <h1>Dashboard Comercial</h1>
                <p>Resumo dos indicadores principais.</p>
            </div>

            <a :href="reportUrl">
                Ver relatório
            </a>
        </header>

        <section class="dashboard-actions">
            <button @click="setLoading">Loading</button>
            <button @click="setSuccess">Success</button>
            <button @click="setEmpty">Empty</button>
            <button @click="setError">Error</button>
        </section>

        <section v-if="dashboardStatus === 'loading'" class="state-card">
            <h2>Carregando...</h2>
            <p>Buscando dados do dashboard.</p>
        </section>

        <section v-else-if="dashboardStatus === 'error'" class="state-card state-card--error">
            <h2>Erro ao carregar</h2>
            <p>Não foi possível buscar os indicadores.</p>
        </section>

        <section v-else-if="dashboardStatus === 'empty'" class="state-card">
            <h2>Nenhum dado encontrado</h2>
            <p>Não existem métricas para o período selecionado.</p>
        </section>

        <section v-else class="metrics-grid">
            <SummaryCard v-for="(metric, index) in metrics" :key="metric.id" :status="metric.status"
                :label="metric.label" :count="index + 1" :description="metric.description" :progress="metric.progress"
                :value="metric.value" :id="metric.id" @update="updateMetric" />
        </section>
    </main>
</template>

<style scoped>
.dashboard-page {
    padding: 32px;
    font-family: Inter, system-ui, sans-serif;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
}

.dashboard-header h1 {
    margin: 0 0 8px;
}

.dashboard-header p {
    margin: 0;
    color: #64748b;
}

.dashboard-actions {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
}

.state-card,
.metric-card {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
}

.state-card--error {
    border-color: #dc2626;
    background-color: #fee2e2;
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
}
</style>