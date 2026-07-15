import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { cpfDirective } from './cpf'

function mountCpfInput() {
  return mount(defineComponent({
    setup() {
      const cpf = ref('')

      return {
        cpf,
      }
    },
    template: `
      <input v-model="cpf" v-cpf>
      <span data-test="model-value">{{ cpf }}</span>
    `,
  }), {
    global: {
      directives: {
        cpf: cpfDirective,
      },
    },
  })
}

describe('v-cpf', () => {
  it('formata CPF progressivamente', async () => {
    const wrapper = mountCpfInput()
    const input = wrapper.get('input')

    await input.setValue('1')
    expect((input.element as HTMLInputElement).value).toBe('1')

    await input.setValue('1009')
    expect((input.element as HTMLInputElement).value).toBe('100.9')

    await input.setValue('10093797630')
    expect((input.element as HTMLInputElement).value).toBe('100.937.976-30')
  })

  it('remove caracteres nao numericos', async () => {
    const wrapper = mountCpfInput()
    const input = wrapper.get('input')

    await input.setValue('abc100x937y976z30')

    expect((input.element as HTMLInputElement).value).toBe('100.937.976-30')
  })

  it('limita o valor a onze digitos', async () => {
    const wrapper = mountCpfInput()
    const input = wrapper.get('input')

    await input.setValue('100937976309999')

    expect((input.element as HTMLInputElement).value).toBe('100.937.976-30')
  })

  it('mantem o v-model sincronizado com o valor formatado', async () => {
    const wrapper = mountCpfInput()
    const input = wrapper.get('input')

    await input.setValue('10093797630')

    expect(wrapper.get('[data-test="model-value"]').text()).toBe('100.937.976-30')
  })
})
