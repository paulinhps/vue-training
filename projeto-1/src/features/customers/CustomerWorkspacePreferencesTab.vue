<script setup lang="ts">
import { onActivated, onDeactivated, ref } from 'vue'

const showInactiveCustomers = ref(true)
const highlightAdmins = ref(false)

onActivated(() => {
  console.log('CustomerWorkspacePreferencesTab ativada')
})

onDeactivated(() => {
  console.log('CustomerWorkspacePreferencesTab desativada')
})
</script>

<template>
  <section class="workspace-tab">
    <h2>Preferências</h2>

    <label>
      <input v-model="showInactiveCustomers" type="checkbox">
      Mostrar clientes inativos
    </label>

    <label>
      <input v-model="highlightAdmins" type="checkbox">
      Destacar administradores
    </label>
  </section>
</template>

<style scoped>
.workspace-tab {
  display: grid;
  gap: 10px;
}

.workspace-tab h2 {
  margin: 0;
}
</style>
