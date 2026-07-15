import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseInput from './BaseInput.vue'

describe('BaseInput', () => {
  it('renderiza o label recebido', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'customer-name',
        label: 'Nome',
      },
    })

    expect(wrapper.text()).toContain('Nome')
  })

  it('usa type text quando nenhum type e informado', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'customer-name',
        label: 'Nome',
      },
    })

    const input = wrapper.get('input')

    expect(input.attributes('type')).toBe('text')
  })

  it('renderiza a mensagem de erro quando error e informado', () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'customer-email',
        label: 'E-mail',
        error: 'E-mail invalido.',
      },
    })

    expect(wrapper.text()).toContain('E-mail invalido.')
  })

  it('emite update:modelValue quando o usuario digita', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        id: 'customer-name',
        label: 'Nome',
        modelValue: '',
      },
    })

    await wrapper.get('input').setValue('Ana Silva')

    expect(wrapper.emitted('update:modelValue')).toEqual([['Ana Silva']])
  })
})
