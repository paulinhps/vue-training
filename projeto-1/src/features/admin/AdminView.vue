<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

function handleLogout(): void {
  authStore.logout();
  void router.replace("/login");
}
</script>

<template>
  <section>
    <h1>Area administrativa</h1>
    <p>Esta rota usa meta.requiresAuth e passa pelo beforeEach global.</p>
    <p>Status atual: {{ authStore.statusLabel }}</p>

    <button @click="handleLogout">Sair</button>
  </section>
</template>
