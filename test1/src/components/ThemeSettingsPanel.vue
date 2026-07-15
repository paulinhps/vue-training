<script setup lang="ts">
import ThemeStatusCard from './ThemeStatusCard.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
</script>

<template>
  <main class="theme-settings-panel">
    <header>
      <h1>provide/inject: Tema local</h1>
      <p>
        O provider esta acima deste painel. O botao e o card consomem o mesmo
        contexto sem receber props.
      </p>
    </header>

    <ThemeSwitcher />
  </main>
</template>

<style scoped>
.theme-settings-panel {
  display: grid;
  gap: 24px;
}

.theme-settings-panel h1,
.theme-settings-panel p {
  margin-top: 0;
}

.theme-settings-panel header p {
  max-width: 640px;
  color: #64748b;
}
</style>
