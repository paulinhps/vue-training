import { flushPromises, mount } from '@vue/test-utils'
import { RouterLinkStub } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createCustomer } from './customer.service'
import CustomerCreateValidatedView from './CustomerCreateValidatedView.vue'

vi.mock('./customer.service', () => ({
  createCustomer: vi.fn(),
}))

function mountCustomerCreateView() {
  return mount(CustomerCreateValidatedView, {
    global: {
      directives: {
        cpf: {},
      },
      stubs: {
        RouterLink: RouterLinkStub,
        BaseInput: {
          props: ['id', 'label', 'modelValue', 'type', 'error'],
          emits: ['update:modelValue'],
          template: `
            <label :for="id">
              {{ label }}
              <input
                :id="id"
                :type="type ?? 'text'"
                :value="modelValue"
                @input="$emit('update:modelValue', type === 'number' ? Number($event.target.value) : $event.target.value)"
              >
              <small v-if="error">{{ error }}</small>
            </label>
          `,
        },
        AppToast: {
          props: ['open', 'message', 'type'],
          template: `
            <p v-if="open" data-test="toast" :data-type="type">
              {{ message }}
            </p>
          `,
        },
      },
    },
  })
}

async function fillValidForm(wrapper: ReturnType<typeof mountCustomerCreateView>) {
  await wrapper.get('#validated-customer-name').setValue('Ana Silva')
  await wrapper.get('#validated-customer-email').setValue('ana.silva@example.com')
  await wrapper.get('#validated-customer-role').setValue('admin')
  await wrapper.get('#validated-customer-credit-limit').setValue('5000')
  await flushPromises()
}

describe('CustomerCreateValidatedView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(createCustomer).mockResolvedValue(undefined)
  })

  it('envia os dados validos para o service e mostra toast de sucesso', async () => {
    const wrapper = mountCustomerCreateView()

    await fillValidForm(wrapper)
    await wrapper.get('form').trigger('submit')

    await expect.poll(() => vi.mocked(createCustomer).mock.calls.length).toBe(1)
    expect(createCustomer).toHaveBeenCalledWith({
      name: 'Ana Silva',
      email: 'ana.silva@example.com',
      role: 'admin',
      creditLimit: 5000,
      isActive: true,
    })
    expect(wrapper.get('[data-test="toast"]').text()).toContain(
      'Cliente cadastrado com sucesso.',
    )
    expect(wrapper.get('[data-test="toast"]').attributes('data-type')).toBe('success')
  })

  it('mostra toast de erro quando o service falha', async () => {
    vi.mocked(createCustomer).mockRejectedValue(new Error('Falha ao cadastrar cliente.'))
    const wrapper = mountCustomerCreateView()

    await fillValidForm(wrapper)
    await wrapper.get('form').trigger('submit')

    await expect.poll(() => vi.mocked(createCustomer).mock.calls.length).toBe(1)
    await expect.poll(() => wrapper.find('[data-test="toast"]').exists()).toBe(true)
    expect(wrapper.get('[data-test="toast"]').text()).toContain(
      'Falha ao cadastrar cliente.',
    )
    expect(wrapper.get('[data-test="toast"]').attributes('data-type')).toBe('error')
  })
})
