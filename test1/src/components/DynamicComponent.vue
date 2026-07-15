<script setup lang="ts">
import { ref } from 'vue'
import ProfileSummary from './ProfileSummary.vue'
import SalesDashboard from './SalesDashboard.vue'

const currentView = ref<'profile' | 'sales'>('profile')

const views = {
    profile: ProfileSummary,
    sales: SalesDashboard,
}
</script>

<template>
    <button @click="currentView = 'profile'">
        Perfil
    </button>

    <button @click="currentView = 'sales'">
        Vendas
    </button>

    <component :is="views[currentView]" />
</template>