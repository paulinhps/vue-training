<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

type CustomerRole = 'admin' | 'user'

type CustomerForm = {
  name: string
  email: string
  role: CustomerRole
  creditLimit: number
  isActive: boolean
}

type CustomerFormTouched = {
  name: boolean
  email: boolean
  creditLimit: boolean
}

const form = reactive<CustomerForm>({
  name: '',
  email: '',
  role: 'user',
  creditLimit: 0,
  isActive: true,
})

const touched = reactive<CustomerFormTouched>({
  name: false,
  email: false,
  creditLimit: false,
})

const wasSubmitted = ref(false)
const status = ref<RequestStatus>('idle')
const errorMessage = ref('')

const fieldErrors = computed(() => {
  return {
    name: form.name ? '' : 'Informe o nome.',
    email: form.email.includes('@') ? '' : 'Informe um e-mail valido.',
    creditLimit: form.creditLimit >= 0 ? '' : 'O limite precisa ser maior ou igual a zero.',
  }
})

const hasFieldErrors = computed(() => {
  return Object.values(fieldErrors.value).some(Boolean)
})

const visibleFieldErrors = computed(() => {
  return {
    name: touched.name || wasSubmitted.value ? fieldErrors.value.name : '',
    email: touched.email || wasSubmitted.value ? fieldErrors.value.email : '',
    creditLimit:
      touched.creditLimit || wasSubmitted.value ? fieldErrors.value.creditLimit : '',
  }
})

const canSubmit = computed(() => {
  return !hasFieldErrors.value && status.value !== 'loading'
})

async function submitForm(): Promise<void> {
  wasSubmitted.value = true

  if (!canSubmit.value) {
    return
  }

  status.value = 'loading'
  errorMessage.value = ''

  try {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        role: form.role,
        creditLimit: form.creditLimit,
        isActive: form.isActive,
      }),
    })

    if (!response.ok) {
      throw new Error('Nao foi possivel cadastrar o cliente.')
    }

    resetForm()
    resetTouched()
    status.value = 'success'
  } catch (error) {
    status.value = 'error'
    errorMessage.value =
      error instanceof Error ? error.message : 'Erro inesperado ao cadastrar cliente.'
  }
}

function resetForm(): void {
  form.name = ''
  form.email = ''
  form.role = 'user'
  form.creditLimit = 0
  form.isActive = true
}

function resetTouched(): void {
  touched.name = false
  touched.email = false
  touched.creditLimit = false
  wasSubmitted.value = false
}
</script>

<template>
  <section class="customer-create-page">
    <h1>Novo cliente</h1>

    <form class="customer-form" @submit.prevent="submitForm">
      <label for="customer-name">
        Nome
      </label>
      <input
        id="customer-name"
        v-model.trim="form.name"
        type="text"
        @blur="touched.name = true"
      >
      <small v-if="visibleFieldErrors.name" class="field-error">
        {{ visibleFieldErrors.name }}
      </small>

      <label for="customer-email">
        E-mail
      </label>
      <input
        id="customer-email"
        v-model.trim="form.email"
        type="email"
        @blur="touched.email = true"
      >
      <small v-if="visibleFieldErrors.email" class="field-error">
        {{ visibleFieldErrors.email }}
      </small>

      <label for="customer-role">
        Perfil
      </label>
      <select id="customer-role" v-model="form.role">
        <option value="user">
          Usuario
        </option>
        <option value="admin">
          Admin
        </option>
      </select>

      <label for="customer-credit-limit">
        Limite de credito
      </label>
      <input
        id="customer-credit-limit"
        v-model.number="form.creditLimit"
        type="number"
        min="0"
        @blur="touched.creditLimit = true"
      >
      <small v-if="visibleFieldErrors.creditLimit" class="field-error">
        {{ visibleFieldErrors.creditLimit }}
      </small>

      <label class="checkbox-field">
        <input
          v-model="form.isActive"
          type="checkbox"
        >
        Cliente ativo
      </label>

      <button :disabled="!canSubmit">
        {{ status === 'loading' ? 'Salvando...' : 'Salvar cliente' }}
      </button>
    </form>

    <p v-if="status === 'success'" class="feedback feedback--success">
      Cliente cadastrado com sucesso.
    </p>

    <p v-else-if="status === 'error'" class="feedback feedback--error">
      {{ errorMessage }}
    </p>
  </section>
</template>

<style scoped>
.customer-create-page {
  max-width: 520px;
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

.feedback {
  margin-top: 16px;
  border-radius: 8px;
  padding: 12px;
}

.feedback--success {
  color: #166534;
  background-color: #dcfce7;
}

.feedback--error {
  color: #991b1b;
  background-color: #fee2e2;
}
</style>
