<script setup lang="ts">
import ThemeProvider from './ThemeProvider.vue'
import ThemeSettingsPanel from './ThemeSettingsPanel.vue'
</script>

<template>
  <ThemeProvider default-theme="light">
    <ThemeSettingsPanel title="Provider externo" />

    <ThemeProvider default-theme="dark">
      <ThemeSettingsPanel title="Provider interno independente" />
    </ThemeProvider>
  </ThemeProvider>
</template>
