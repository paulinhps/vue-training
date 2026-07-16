<script setup lang="ts">
import { useClock } from './useClock';
import { computed } from 'vue';

const { currentTime, fixedDate, updateFixedDate } = useClock();

const utcTime = computed(() => {
    return currentTime.value.getUTCHours().toString().padStart(2, '0') + ':' +
        currentTime.value.getUTCMinutes().toString().padStart(2, '0') + ':' +
        currentTime.value.getUTCSeconds().toString().padStart(2, '0');
});
const fixedUtcTime = computed(() => {
    return fixedDate.value.getUTCHours().toString().padStart(2, '0') + ':' +
        fixedDate.value.getUTCMinutes().toString().padStart(2, '0') + ':' +
        fixedDate.value.getUTCSeconds().toString().padStart(2, '0');
});

</script>

<template>
    <div class="clock">
        <h2>Relógio UTC</h2>
        <p>Tempo UTC: {{ utcTime }}</p>
        <p>Data fixa: {{ fixedUtcTime }}</p>
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
