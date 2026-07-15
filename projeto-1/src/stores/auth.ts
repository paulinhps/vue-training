import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

const storageKey = 'projeto-1:isAuthenticated'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem(storageKey) === 'true')

  const statusLabel = computed(() => {
    return isAuthenticated.value ? 'Autenticado' : 'Visitante'
  })

  function login(): void {
    isAuthenticated.value = true
    localStorage.setItem(storageKey, 'true')
  }

  function logout(): void {
    isAuthenticated.value = false
    localStorage.removeItem(storageKey)
  }

  return {
    isAuthenticated,
    statusLabel,
    login,
    logout,
  }
})
