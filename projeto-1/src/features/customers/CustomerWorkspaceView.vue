<script setup lang="ts">
import type { Component } from 'vue'
import { computed, shallowRef } from 'vue'
import CustomerWorkspaceNotesTab from './CustomerWorkspaceNotesTab.vue'
import CustomerWorkspacePreferencesTab from './CustomerWorkspacePreferencesTab.vue'
import CustomerWorkspaceSummaryTab from './CustomerWorkspaceSummaryTab.vue'

type WorkspaceTab = {
  id: string
  label: string
  component: Component
}

const summaryTab: WorkspaceTab = {
  id: 'summary',
  label: 'Resumo',
  component: CustomerWorkspaceSummaryTab,
}

const tabs: WorkspaceTab[] = [
  summaryTab,
  {
    id: 'notes',
    label: 'Anotações',
    component: CustomerWorkspaceNotesTab,
  },
  {
    id: 'preferences',
    label: 'Preferências',
    component: CustomerWorkspacePreferencesTab,
  },
]

const currentTab = shallowRef(summaryTab)

const currentComponent = computed(() => {
  return currentTab.value.component
})
</script>

<template>
  <section class="workspace-page">
    <header>
      <h1>Workspace de clientes</h1>
      <p>
        Exemplo visual de KeepAlive com componentes dinâmicos.
      </p>
    </header>

    <nav class="workspace-tabs" aria-label="Abas do workspace">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="{ active: currentTab.id === tab.id }"
        type="button"
        @click="currentTab = tab"
      >
        {{ tab.label }}
      </button>
    </nav>

    <section class="workspace-panel">
      <KeepAlive>
        <component :is="currentComponent" />
      </KeepAlive>
    </section>
  </section>
</template>

<style scoped>
.workspace-page {
  display: grid;
  gap: 20px;
  max-width: 720px;
}

.workspace-page h1,
.workspace-page p {
  margin: 0;
}

.workspace-page p {
  color: #64748b;
}

.workspace-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.workspace-tabs button {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
  color: #0f172a;
  background-color: white;
  cursor: pointer;
}

.workspace-tabs button.active {
  border-color: #2563eb;
  color: white;
  background-color: #2563eb;
}

.workspace-panel {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}
</style>
