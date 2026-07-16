<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CustomerSummaryAsync from './CustomerSummaryAsync.vue'
import { useCustomersList } from './useCustomersList'

const {
  status,
  errorMessage,
  deletingCustomerId,
  searchTerm,
  filteredCustomers,
  hasCustomers,
  hasFilteredCustomers,
  loadCustomers,
  removeCustomer,
} = useCustomersList()

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
</script>

<template>
  <section class="customers-page">
    <header class="customers-header">
      <div>
        <h1>Clientes</h1>
        <p>Dados carregados da API simulada pelo MSW.</p>
      </div>

      <div class="customers-actions">
        <button @click="loadCustomers">
          Recarregar
        </button>

        <RouterLink :to="{ name: 'customer-create-validated' }">
          Novo cliente
        </RouterLink>

        <RouterLink :to="{ name: 'customer-workspace' }">
          Workspace
        </RouterLink>
      </div>
    </header>

    <Suspense>
      <CustomerSummaryAsync />

      <template #fallback>
        <section class="summary-card summary-card--loading">
          Carregando resumo assíncrono...
        </section>
      </template>
    </Suspense>

    <label class="customer-search" for="customer-search">
      Buscar cliente
      <input
        id="customer-search"
        v-model="searchTerm"
        type="search"
        placeholder="Nome, e-mail ou perfil"
      >
    </label>

    <p v-if="status === 'loading'">
      Carregando clientes...
    </p>

    <div v-else-if="status === 'error'" class="feedback feedback--error">
      <p>{{ errorMessage }}</p>

      <button @click="loadCustomers">
        Tentar novamente
      </button>
    </div>

    <p v-else-if="!hasCustomers">
      Nenhum cliente cadastrado.
    </p>

    <p v-else-if="!hasFilteredCustomers">
      Nenhum cliente encontrado para "{{ searchTerm }}".
    </p>

    <table v-else class="customers-table">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Perfil</th>
          <th>Limite</th>
          <th>Status</th>
          <th>Acoes</th>
        </tr>
      </thead>

      <TransitionGroup name="customer-row" tag="tbody">
        <tr v-for="customer in filteredCustomers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.role }}</td>
          <td>{{ formatCurrency(customer.creditLimit) }}</td>
          <td>{{ customer.isActive ? 'Ativo' : 'Inativo' }}</td>
          <td>
            <div class="row-actions">
              <RouterLink
                :to="{ name: 'customer-edit', params: { id: customer.id } }"
              >
                Editar
              </RouterLink>

              <button
                :disabled="deletingCustomerId === customer.id"
                @click="removeCustomer(customer.id)"
              >
                {{ deletingCustomerId === customer.id ? 'Removendo...' : 'Remover' }}
              </button>
            </div>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </section>
</template>

<style scoped>
.customers-page {
  display: grid;
  gap: 20px;
}

.customers-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.customers-header h1,
.customers-header p {
  margin: 0;
}

.customers-header p {
  color: #64748b;
}

.customers-actions {
  display: flex;
  gap: 10px;
}

.customers-actions a,
.customers-actions button {
  border: 0;
  border-radius: 8px;
  padding: 10px 12px;
  background-color: #2563eb;
  color: white;
  cursor: pointer;
  text-decoration: none;
}

.summary-card {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 16px;
}

.summary-card--loading {
  color: #475569;
  background-color: #f8fafc;
}

.customer-search {
  display: grid;
  gap: 6px;
  max-width: 360px;
  color: #334155;
  font-weight: 600;
}

.customer-search input {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
  font: inherit;
  font-weight: 400;
}

.row-actions {
  display: flex;
  gap: 8px;
}

.row-actions a,
.row-actions button {
  border: 0;
  border-radius: 8px;
  padding: 8px 10px;
  background-color: #e2e8f0;
  color: #0f172a;
  cursor: pointer;
  text-decoration: none;
}

.row-actions button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.customers-table {
  width: 100%;
  border-collapse: collapse;
}

.customers-table th,
.customers-table td {
  border-bottom: 1px solid #e2e8f0;
  padding: 10px;
  text-align: left;
}

.customer-row-enter-active,
.customer-row-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.customer-row-enter-from,
.customer-row-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.customer-row-move {
  transition: transform 180ms ease;
}

.feedback {
  border-radius: 8px;
  padding: 12px;
}

.feedback p {
  margin: 0;
}

.feedback button {
  margin-top: 10px;
  border: 0;
  border-radius: 8px;
  padding: 8px 10px;
  background-color: #991b1b;
  color: white;
  cursor: pointer;
}

.feedback--error {
  color: #991b1b;
  background-color: #fee2e2;
}
</style>
