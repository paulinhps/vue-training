<script setup lang="ts">
import { computed, ref, watch } from 'vue'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

type ActivityLog = {
  id: number
  message: string
}

const searchTerm = ref('')
const status = ref<RequestStatus>('idle')
const resultCount = ref(0)
const activityLogs = ref<ActivityLog[]>([])

let nextLogId = 1

const canSearch = computed(() => {
  return searchTerm.value.trim().length >= 3
})

watch(searchTerm, (newValue, oldValue) => {
  addLog(`searchTerm mudou de "${oldValue}" para "${newValue}"`)

  if (!canSearch.value) {
    status.value = 'idle'
    resultCount.value = 0
    addLog('Busca ignorada: informe pelo menos 3 caracteres.')
    return
  }

  simulateSearch(newValue)
})

function updateSearchTerm(value: string): void {
  searchTerm.value = value
}

function simulateSearch(term: string): void {
  status.value = 'loading'
  addLog(`Iniciando busca por "${term}".`)

  window.setTimeout(() => {
    if (term.toLowerCase() === 'erro') {
      status.value = 'error'
      resultCount.value = 0
      addLog('Busca finalizada com erro simulado.')
      return
    }

    status.value = 'success'
    resultCount.value = term.length * 3
    addLog(`Busca finalizada com ${resultCount.value} resultados.`)
  }, 600)
}

function resetExample(): void {
  searchTerm.value = ''
  status.value = 'idle'
  resultCount.value = 0
  activityLogs.value = []
  nextLogId = 1
}

function addLog(message: string): void {
  activityLogs.value.unshift({
    id: nextLogId,
    message,
  })

  nextLogId += 1
}
</script>

<template>
  <main class="watch-example-page">
    <header>
      <h1>Exemplo de watch</h1>
      <p>
        Digite pelo menos 3 caracteres para disparar uma busca simulada. Digite
        "erro" para simular falha.
      </p>
    </header>

    <section class="search-panel">
      <label for="search-term">
        Termo de busca
      </label>

      <input
        id="search-term"
        :value="searchTerm"
        type="text"
        placeholder="Ex: vue"
        @input="updateSearchTerm(($event.target as HTMLInputElement).value)"
      >

      <button @click="resetExample">
        Resetar
      </button>
    </section>

    <section class="status-card">
      <h2>Status atual</h2>

      <p v-if="status === 'idle'">
        Aguardando termo valido.
      </p>

      <p v-else-if="status === 'loading'">
        Carregando resultados...
      </p>

      <p v-else-if="status === 'error'">
        Erro ao buscar resultados.
      </p>

      <p v-else>
        Busca concluida com {{ resultCount }} resultados.
      </p>
    </section>

    <section class="log-panel">
      <h2>Eventos capturados pelo watch</h2>

      <p v-if="activityLogs.length === 0">
        Nenhum evento registrado ainda.
      </p>

      <ol v-else>
        <li
          v-for="log in activityLogs"
          :key="log.id"
        >
          {{ log.message }}
        </li>
      </ol>
    </section>
  </main>
</template>

<style scoped>
.watch-example-page {
  display: grid;
  gap: 24px;
  max-width: 760px;
  padding: 32px;
  font-family: Inter, system-ui, sans-serif;
}

.watch-example-page h1,
.watch-example-page h2,
.watch-example-page p {
  margin-top: 0;
}

.watch-example-page header p {
  color: #64748b;
}

.search-panel {
  display: grid;
  gap: 8px;
}

.search-panel input {
  max-width: 360px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
}

.search-panel button {
  width: fit-content;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  background-color: #2563eb;
  cursor: pointer;
}

.status-card,
.log-panel {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.log-panel ol {
  display: grid;
  gap: 8px;
  margin-bottom: 0;
  padding-left: 20px;
}
</style>
