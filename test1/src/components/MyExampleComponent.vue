<template>
    {{ message }}
    <SimpleDashboard />
</template>
<script>
import SimpleDashboard from './SimpleDashboard.vue';

export default {
    name: 'MyExampleComponent',
    data() {
        return {
            message: 'Hello from MyExampleComponent!'
        }
    },
    methods: {
        updateMessage(newMessage) {
            this.message = newMessage;
        }
    },
    components: {
        SimpleDashboard
    }
}
</script>