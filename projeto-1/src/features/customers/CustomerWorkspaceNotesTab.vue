<script setup lang="ts">
import { onActivated, onDeactivated, ref } from 'vue'

const notes = ref('')

onActivated(() => {
  console.log('CustomerWorkspaceNotesTab ativada')
})

onDeactivated(() => {
  console.log('CustomerWorkspaceNotesTab desativada')
})
</script>

<template>
  <section class="workspace-tab">
    <h2>Anotações</h2>

    <label for="customer-notes">
      Escreva algo, troque de aba e volte.
    </label>

    <textarea
      id="customer-notes"
      v-model="notes"
      rows="6"
      placeholder="Exemplo: cliente pediu retorno na próxima semana."
    />

    <p>
      Caracteres digitados: {{ notes.length }}
    </p>
  </section>
</template>

<style scoped>
.workspace-tab {
  display: grid;
  gap: 10px;
}

.workspace-tab h2,
.workspace-tab p {
  margin: 0;
}

.workspace-tab textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 12px;
  font: inherit;
  resize: vertical;
}
</style>
