<script setup lang="ts">
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('CustomerWorkspaceSummaryTab ativada')
})

onDeactivated(() => {
  console.log('CustomerWorkspaceSummaryTab desativada')
})
</script>

<template>
  <section class="workspace-tab">
    <h2>Resumo</h2>
    <p>
      Esta aba simula um painel simples. Troque de aba e volte para observar
      os hooks de KeepAlive no console.
    </p>
  </section>
</template>

<style scoped>
.workspace-tab {
  display: grid;
  gap: 8px;
}

.workspace-tab h2,
.workspace-tab p {
  margin: 0;
}
</style>
