<script setup lang="ts">
import BaseInput from '@/shared/ui/BaseInput.vue'
import AppToast from '@/shared/ui/AppToast.vue'
import { useCustomerEditForm } from './useCustomerEditForm'
import { useBreadcrumbContext } from '@/composable/useBreadcrumbContext';
import { watch } from 'vue';
import { useRoute } from 'vue-router';


const breadcrumbContext = useBreadcrumbContext();
const route = useRoute();

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
  submitStatus,
  isSubmitting,
  errorMessage,
  submitErrorMessage,
  canSubmit,
  submitForm,
  loadCustomer,
} = useCustomerEditForm()

function closeSubmitToast(): void {
  submitStatus.value = 'idle'
  submitErrorMessage.value = ''
}

watch(status, (s) => {
  if (s === 'success') {
    breadcrumbContext?.changeBreadcrumbLabel(route.name, ` ${route.params.id} - ${name.value}*`)
  }
})


</script>

<template>
  <section class="customer-edit-page">
    <h1>Editar cliente</h1>

    <p v-if="status === 'loading'">
      Carregando...
    </p>

    <p v-else-if="status === 'error'" class="feedback feedback--error">
      {{ errorMessage }}
      <button @click="loadCustomer">
        Tentar novamente
      </button>
    </p>

    <form v-else class="customer-form" @submit="submitForm">
      <BaseInput id="edit-customer-name" v-model="name" v-bind="nameAttrs" label="Nome" :error="errors.name" />

      <BaseInput id="edit-customer-email" v-model="email" v-bind="emailAttrs" label="E-mail" type="email"
        :error="errors.email" />

      <label for="edit-customer-role">
        Perfil
      </label>
      <select id="edit-customer-role" v-model="role" v-bind="roleAttrs">
        <option value="user">
          Usuario
        </option>
        <option value="admin">
          Admin
        </option>
      </select>

      <BaseInput id="edit-customer-credit-limit" v-model.number="creditLimit" v-bind="creditLimitAttrs"
        label="Limite de credito" type="number" :error="errors.creditLimit" />

      <label class="checkbox-field">
        <input v-model="isActive" v-bind="isActiveAttrs" type="checkbox">
        Cliente ativo
      </label>

      <button :disabled="!canSubmit">
        {{ isSubmitting ? 'Salvando...' : 'Salvar alteracoes' }}
      </button>
    </form>

    <AppToast
      :open="submitStatus === 'success'"
      message="Cliente atualizado com sucesso."
      type="success"
      @close="closeSubmitToast"
    />

    <AppToast
      :open="submitStatus === 'error'"
      :message="submitErrorMessage"
      type="error"
      @close="closeSubmitToast"
    />
  </section>
</template>

<style scoped>
.customer-edit-page {
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

.customer-form button,
.feedback button {
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

.feedback {
  display: grid;
  gap: 12px;
  border-radius: 8px;
  padding: 12px;
}

.feedback--error {
  color: #991b1b;
  background-color: #fee2e2;
}
</style>
