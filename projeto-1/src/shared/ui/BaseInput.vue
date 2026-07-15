<script setup lang="ts">
type Props = {
  id: string
  label: string
  type?: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  error: '',
})

const model = defineModel<string | number>()
</script>

<template>
  <label :for="id">
    {{ label }}
  </label>

  <input
    :id="id"
    v-model="model"
    :type="type"
  >

  <small v-if="error" class="field-error">
    {{ error }}
  </small>
</template>

<style scoped>
.field-error {
  color: #dc2626;
}
</style>
