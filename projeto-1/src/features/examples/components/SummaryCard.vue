<script setup lang="ts">
type Props = {
    status: 'positive' | 'negative' | 'neutral'
    label: string
    count: number
    description: string
    progress: number
    value: string
    id: number
}

defineProps<Props>()
const emit = defineEmits<{
    update: [id: number]
}>()

</script>
<template>
    <article class="metric-card" :class="{
        'metric-card--positive': status === 'positive',
        'metric-card--negative': status === 'negative',
        'metric-card--neutral': status === 'neutral',
    }">
        <h2>{{ count }}. {{ label }}</h2>
        <strong>{{ value }}</strong>
        <p>{{ description }}</p>

        <div class="progress-track">
            <div class="progress-bar" :style="{ width: progress + '%' }" />
        </div>
        <button @click="emit('update', id)">
            Atualizar
        </button>
    </article>
</template>

<style scoped>
.metric-card h2 {
    margin: 0 0 8px;
    font-size: 16px;
}

.metric-card strong {
    display: block;
    margin-bottom: 8px;
    font-size: 24px;
}

.metric-card p {
    margin: 0 0 16px;
    color: #64748b;
}

.metric-card--positive {
    border-color: #16a34a;
}

.metric-card--negative {
    border-color: #dc2626;
}

.metric-card--neutral {
    border-color: #94a3b8;
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
}
</style>