<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

type UserSummary = {
  id: number
  name: string
}

const users: UserSummary[] = [
  { id: 1, name: 'Ana Silva' },
  { id: 2, name: 'Bruno Costa' },
  { id: 3, name: 'Carla Souza' },
]

const route = useRoute()
const router = useRouter()

const search = computed(() => {
  return typeof route.query.search === 'string' ? route.query.search : ''
})

const invalidUserId = computed(() => {
  return typeof route.query.invalidUserId === 'string' ? route.query.invalidUserId : ''
})

const filteredUsers = computed(() => {
  const normalizedSearch = search.value.trim().toLowerCase()

  if (!normalizedSearch) {
    return users
  }

  return users.filter((user) => user.name.toLowerCase().includes(normalizedSearch))
})

function updateSearch(value: string): void {
  void router.push({
    name: 'users-list',
    query: value
      ? {
          search: value,
        }
      : {},
  })
}
</script>

<template>
  <section>
    <h1>Usuarios</h1>

    <p v-if="invalidUserId">
      Usuario {{ invalidUserId }} nao existe. Voce foi redirecionado para a lista.
    </p>

    <label for="user-search">
      Buscar por query param
    </label>

    <input
      id="user-search"
      :value="search"
      type="search"
      placeholder="Ex: Ana"
      @input="updateSearch(($event.target as HTMLInputElement).value)"
    >

    <ul>
      <li
        v-for="user in filteredUsers"
        :key="user.id"
      >
        <RouterLink :to="{ name: 'user-details', params: { id: user.id } }">
          {{ user.name }}
        </RouterLink>
      </li>
    </ul>

    <p>
      Link direto:
      <RouterLink to="/users/1">
        /users/1
      </RouterLink>
    </p>

    <p>
      Teste beforeEnter:
      <RouterLink to="/users/999">
        /users/999
      </RouterLink>
    </p>
  </section>
</template>
