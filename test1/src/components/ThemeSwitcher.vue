<script setup lang="ts">
import { inject } from 'vue'
import { themeContextKey } from '@/contexts/themeContext'

const themeContext = inject(themeContextKey)

if (!themeContext) {
  throw new Error('ThemeContext was not provided')
}
</script>

<template>
  <button
    class="theme-switcher"
    type="button"
    @click="themeContext.toggleTheme"
  >
    Alternar para tema
    {{ themeContext.theme.value === 'light' ? 'dark' : 'light' }}
  </button>
</template>

<style scoped>
.theme-switcher {
  width: fit-content;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  background-color: #2563eb;
  cursor: pointer;
}
</style>
