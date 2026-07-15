<script setup lang="ts">
import { onUnmounted, watch } from 'vue'

const props = withDefaults(defineProps<{
  open: boolean
  type?: 'success' | 'error'
  message: string
  durationInMs?: number
}>(), {
  type: 'success',
  durationInMs: 3500,
})

const emit = defineEmits<{
  close: []
}>()

let closeTimeoutId: number | undefined

function clearCloseTimeout(): void {
  if (closeTimeoutId) {
    window.clearTimeout(closeTimeoutId)
    closeTimeoutId = undefined
  }
}

watch(
  () => props.open,
  (isOpen) => {
    clearCloseTimeout()

    if (isOpen) {
      closeTimeoutId = window.setTimeout(() => {
        emit('close')
      }, props.durationInMs)
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  clearCloseTimeout()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="toast-slide">
      <div v-if="open" class="toast" :class="`toast--${type}`" role="status">
        <p>{{ message }}</p>

        <button type="button" aria-label="Fechar mensagem" @click="emit('close')">
          x
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 76px;
  right: 24px;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  max-width: min(380px, calc(100vw - 48px));
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 14px 16px;
  box-shadow: 0 18px 40px rgb(15 23 42 / 18%);
}

.toast p {
  margin: 0;
  line-height: 1.4;
}

.toast button {
  border: 0;
  padding: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.toast--success {
  border-color: #86efac;
  color: #14532d;
  background-color: #dcfce7;
}

.toast--error {
  border-color: #fecaca;
  color: #7f1d1d;
  background-color: #fee2e2;
}

.toast-slide-enter-active,
.toast-slide-leave-active {
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.toast-slide-enter-from,
.toast-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
