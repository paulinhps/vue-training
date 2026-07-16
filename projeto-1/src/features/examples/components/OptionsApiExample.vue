<template>
    <section class="options-api-example">
        <p>{{ message }}</p>
        <button @click="updateMessage('Mensagem atualizada pela Options API')">
            Atualizar mensagem
        </button>
        <SimpleDashboard />
    </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SimpleDashboard from './SimpleDashboard.vue';

export default defineComponent({
    name: 'MyExampleComponent',
    data() {
        return {
            message: 'Hello from MyExampleComponent!'
        }
    },
    methods: {
        updateMessage(newMessage: string) {
            this.message = newMessage;
        }
    },
    components: {
        SimpleDashboard
    }
})
</script>

<style scoped>
.options-api-example {
    display: grid;
    gap: 16px;
}

.options-api-example > p {
    margin: 0;
    font-weight: 700;
}

.options-api-example > button {
    width: fit-content;
}
</style>
