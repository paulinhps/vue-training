<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

function handleLogin(): void {
  authStore.login()

  const redirectTo = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin'

  void router.replace(redirectTo)
}
</script>

<template>
  <section>
    <h1>Login simulado</h1>
    <p>Clique para autenticar localmente e voltar para a rota protegida.</p>
    <p>Status atual: {{ authStore.statusLabel }}</p>

    <button @click="handleLogin">
      Entrar
    </button>
  </section>
</template>
