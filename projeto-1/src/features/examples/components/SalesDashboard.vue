<script setup lang="ts">
import { ref } from 'vue'

type SalesSummary = {
    title: string
    totalSales: number
    target: number
    reportUrl: string
}

const salesSummary = ref<SalesSummary>({
    title: 'Sales Summary',
    totalSales: 128,
    target: 200,
    reportUrl: '/reports/sales'
})

function increaseSales(): void {
    salesSummary.value.totalSales += 1;
}

function resetSales(): void {
    salesSummary.value.totalSales = 0
}

</script>
<template>
    <main class="dashboard-page">
        <header class="dashboard-header">
            <h1>{{ salesSummary.title }}</h1>

            <a :href="salesSummary.reportUrl">
                View Full Report
            </a>
        </header>

        <section class="summary-card">
            <h2>Total Sales</h2>

            <p class="sales-summary" :class="['example', {
                early: salesSummary.totalSales < salesSummary.target * 0.5,
                'on-target': salesSummary.totalSales >= salesSummary.target * 0.5 && salesSummary.totalSales < salesSummary.target,
                late: salesSummary.totalSales >= salesSummary.target
            }]">
                {{ salesSummary.totalSales }} / {{ salesSummary.target }}
            </p>
        </section>
        <section class="summary-card">
            <button @click="increaseSales">
                Adicionar venda
            </button>
            <button @click="resetSales">
                Resetar vendas
            </button>
        </section>
    </main>
</template>

<style scoped>
.dashboard-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.sales-summary {
    font-size: 1.5rem;
    font-weight: bold;
}

.sales-summary::after {
    content: ' vendas';
    font-size: 1rem;
    font-weight: normal;
}

.sales-summary::before {
    content: 'Total: ';
    font-size: 1rem;
    font-weight: normal;
}

.sales-summary.early {
    color: red;
}

.sales-summary.on-target {
    color: orange;
}

.sales-summary.late {
    color: green;
}

.example {
    border: 2px solid #ccc;
}
</style>