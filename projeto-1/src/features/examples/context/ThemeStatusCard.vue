<script setup lang="ts">
import { inject } from 'vue'
import { themeContextKey } from './themeContext'

const themeContext = inject(themeContextKey)

if (!themeContext) {
  throw new Error('ThemeContext was not provided')
}
</script>

<template>
  <article
    class="theme-status-card"
    :class="`theme-status-card--${themeContext.theme.value}`"
  >
    <span>Componente descendente consumindo inject</span>
    <strong>Tema atual: {{ themeContext.theme }}</strong>
    <p>
      Este card nao recebeu props. Ele le o tema diretamente do contexto
      fornecido pelo ThemeProvider.
    </p>
  </article>
</template>

<style scoped>
.theme-status-card {
  display: grid;
  gap: 8px;
  max-width: 520px;
  border: 1px solid;
  border-radius: 8px;
  padding: 18px;
  transition:
    border-color 180ms ease,
    background-color 180ms ease;
}

.theme-status-card span {
  font-size: 13px;
  color: #64748b;
}

.theme-status-card strong {
  font-size: 24px;
}

.theme-status-card p {
  margin: 0;
}

.theme-status-card--light {
  border-color: #cbd5e1;
  background-color: white;
}

.theme-status-card--dark {
  border-color: #334155;
  background-color: #1e293b;
}

.theme-status-card--dark span {
  color: #94a3b8;
}
</style>
