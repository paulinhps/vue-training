<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '@/shared/ui/BaseInput.vue'
import AppToast from '@/shared/ui/AppToast.vue'
import { useCustomerCreateForm } from './useCustomerCreateForm'

const {
  name,
  nameAttrs,
  email,
  emailAttrs,
  role,
  roleAttrs,
  creditLimit,
  creditLimitAttrs,
  isActive,
  isActiveAttrs,
  errors,
  status,
  errorMessage,
  canSubmit,
  submitForm,
} = useCustomerCreateForm()

const customerCpf = ref('')

function closeToast(): void {
  status.value = 'idle'
  errorMessage.value = ''
}
</script>

<template>
  <section class="customer-create-page">
    <h1>Novo cliente com VeeValidate + Zod</h1>

    <p style="text-align: right;">
      <small>
        Veja o formulário simples
        <RouterLink :to="{ name: 'customer-create' }">aqui</RouterLink>.
      </small>
    </p>

    <form class="customer-form" @submit="submitForm">
      <BaseInput id="validated-customer-name" v-model="name" v-bind="nameAttrs" label="Nome" :error="errors.name" />

      <BaseInput id="validated-customer-email" v-model="email" v-bind="emailAttrs" label="E-mail" type="email"
        :error="errors.email" />

      <label for="validated-customer-cpf">
        CPF demonstrativo
      </label>
      <input id="validated-customer-cpf" v-model="customerCpf" v-cpf inputmode="numeric" maxlength="14"
        placeholder="100.937.976-30">

      {{ customerCpf }}

      <label for="validated-customer-role">
        Perfil
      </label>
      <select id="validated-customer-role" v-model="role" v-bind="roleAttrs">
        <option value="user">
          Usuario
        </option>
        <option value="admin">
          Admin
        </option>
      </select>

      <BaseInput id="validated-customer-credit-limit" v-model.number="creditLimit" v-bind="creditLimitAttrs"
        label="Limite de credito" type="number" :error="errors.creditLimit" />

      <label class="checkbox-field">
        <input v-model="isActive" v-bind="isActiveAttrs" type="checkbox">
        Cliente ativo
      </label>

      <button :disabled="!canSubmit">
        {{ status === 'loading' ? 'Salvando...' : 'Salvar cliente' }}
      </button>
    </form>

    <AppToast :open="status === 'success'" message="Cliente cadastrado com sucesso." type="success"
      @close="closeToast" />

    <AppToast :open="status === 'error'" :message="errorMessage" type="error" @close="closeToast" />
  </section>
</template>

<style scoped>
.customer-create-page {
  max-width: 560px;
}

.customer-form {
  display: grid;
  gap: 10px;
}

.customer-form input,
.customer-form select {
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 10px 12px;
}

.checkbox-field {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.field-error {
  color: #dc2626;
}

.customer-form button {
  width: fit-content;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  color: white;
  background-color: #2563eb;
  cursor: pointer;
}

.customer-form button:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
</style>
