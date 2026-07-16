<script setup lang="ts">
import { inject, provide, readonly, ref } from 'vue'
import {
  themeContextKey,
  type ThemeName,
} from './themeContext'

type Props = {
  defaultTheme?: ThemeName
}
const parentTheme = inject(themeContextKey, undefined)

const { defaultTheme } = defineProps<Props>()

const theme = ref<ThemeName>(defaultTheme || parentTheme?.theme.value || 'light')

function toggleTheme(): void {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

provide(themeContextKey, {
  theme: readonly(theme),
  toggleTheme,
})
</script>

<template>
  <section class="theme-provider" :class="`theme-provider--${theme}`">
    <slot />
  </section>
</template>

<style scoped>
.theme-provider {
  display: grid;
  gap: 20px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 32px;
  font-family: Inter, system-ui, sans-serif;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.theme-provider--light {
  color: #0f172a;
  background-color: #f8fafc;
}

.theme-provider--dark {
  color: #e2e8f0;
  background-color: #0f172a;
}
</style>
