<script setup lang="ts">
import { useClock } from '@/composables/useClock';
import { computed } from 'vue';

const { fixedDate, currentTime, updateFixedDate } = useClock();

const formattedTime = computed(() => {
    return currentTime.value.toLocaleTimeString();
});

const fixedTime = computed(() => {
    return fixedDate.value.toLocaleTimeString();
});

</script>

<template>
    <div class="clock">
        <h2>Relógio</h2>
        <p>Hora atual: {{ formattedTime }}</p>
        <p>Data fixa: {{ fixedTime }}</p>
        <button @click="updateFixedDate">Atualizar data fixa</button>
    </div>
</template>
<style scoped>
.clock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
}
</style>