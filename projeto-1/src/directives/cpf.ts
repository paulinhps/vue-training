import type { Directive } from 'vue'

type CpfElement = HTMLInputElement & {
  cleanupCpf?: () => void
}

function getCpfDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11)
}

function formatCpf(value: string): string {
  const digits = getCpfDigits(value)

  if (digits.length <= 3) {
    return digits
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

export const cpfDirective: Directive<CpfElement> = {
  mounted(element) {
    const handleInput = () => {
      const nextValue = formatCpf(element.value)

      if (element.value === nextValue) {
        return
      }

      element.value = nextValue
      element.dispatchEvent(new Event('input', { bubbles: true }))
    }

    element.addEventListener('input', handleInput)
    element.cleanupCpf = () => {
      element.removeEventListener('input', handleInput)
    }
  },

  updated(element) {
    const nextValue = formatCpf(element.value)

    if (element.value !== nextValue) {
      element.value = nextValue
    }
  },

  unmounted(element) {
    element.cleanupCpf?.()
  },
}
