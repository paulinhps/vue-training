import type { Directive } from 'vue'

type DigitsOnlyElement = HTMLInputElement & {
  cleanupDigitsOnly?: () => void
}

export const digitsOnlyDirective: Directive<DigitsOnlyElement> = {
  mounted(element) {
    const handleInput = () => {
      const nextValue = element.value.replace(/\D/g, '')

      if (element.value === nextValue) {
        return
      }

      element.value = nextValue
      element.dispatchEvent(new Event('input', { bubbles: true }))
    }

    element.addEventListener('input', handleInput)
    element.cleanupDigitsOnly = () => {
      element.removeEventListener('input', handleInput)
    }
  },

  unmounted(element) {
    element.cleanupDigitsOnly?.()
  },
}
