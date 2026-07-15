<script setup lang="ts">
import ThemeProvider from './components/ThemeProvider.vue'
</script>

<template>
  <ThemeProvider>
    <RouterView />
  </ThemeProvider>
</template>

<style lang="css">
html,
body {
  margin: 0;
  border: 0;
  padding: 0;
  font-size: 16px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
