<script setup lang="ts">
import { useCepSearch } from '@/composables/useCepSearch'

const { cep, status, address, errorMessage, searchedCep } = useCepSearch();
</script>

<template>
  <main class="cep-search-page">
    <header>
      <h1>Busca de CEP com customRef</h1>
      <p>
        Digite pelo menos 3 numeros. Os digitos restantes serao preenchidos com
        zero antes da consulta ao ViaCEP.
      </p>
    </header>

    <section class="search-panel">
      <label for="cep">
        CEP
      </label>

      <input id="cep" v-model="cep" type="text" placeholder="010">
    </section>

    <section class="status-panel">
      <p v-if="status === 'idle'">
        Aguardando pelo menos 3 numeros.
      </p>

      <p v-else-if="status === 'loading'">
        Consultando CEP {{ searchedCep }}...
      </p>

      <p v-else-if="status === 'error'">
        {{ errorMessage }} CEP consultado: {{ searchedCep }}.
      </p>

      <article v-else-if="address" class="address-card">
        <h2>{{ address.cep }}</h2>
        <p>CEP consultado: {{ searchedCep }}</p>
        <p>{{ address.logradouro }}</p>
        <p>{{ address.bairro }}</p>
        <p>{{ address.localidade }} - {{ address.uf }}</p>
        <p>DDD: {{ address.ddd }}</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.cep-search-page {
  display: grid;
  gap: 24px;
  max-width: 720px;
  padding: 32px;
  font-family: Inter, system-ui, sans-serif;
}

.cep-search-page h1,
.cep-search-page h2,
.cep-search-page p {
  margin-top: 0;
}

.cep-search-page header p {
  color: #64748b;
}

.search-panel {
  display: grid;
  gap: 8px;
  max-width: 320px;
}

.search-panel input {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
}

.status-panel,
.address-card {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.address-card {
  display: grid;
  gap: 4px;
}

.address-card h2 {
  margin-bottom: 8px;
}

.address-card p {
  margin-bottom: 0;
}
</style>
