import { customRef, ref, watch, type Ref } from 'vue'

export type SearchStatus = 'idle' | 'loading' | 'success' | 'error'

type CepAddress = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  estado?: string
  regiao?: string
  ibge: string
  ddd: string
  erro?: boolean
}

export type UseCepSearchReturn = {
  cep: Ref<string>
  status: Ref<SearchStatus | null>
  address: Ref<CepAddress | null>
  errorMessage: Ref<string>
  searchedCep: Ref<string>
}

function useDebouncedRef<T>(initialValue: T, delay: number): Ref<T> {
  let value = initialValue
  let timeoutId: number | undefined

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        window.clearTimeout(timeoutId)

        timeoutId = window.setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

export function useCepSearch(): UseCepSearchReturn {
  const cep = useDebouncedRef('', 700)
  const status = ref<SearchStatus>('idle')
  const address = ref<CepAddress | null>(null)
  const errorMessage = ref('')
  const searchedCep = ref('')

  watch(cep, (currentCep, _previousCep, onCleanup) => {
    const controller = new AbortController()

    onCleanup(() => {
      controller.abort()
    })

    void searchCep(currentCep, controller.signal)
  })

  async function searchCep(currentCep: string, signal: AbortSignal): Promise<void> {
    const normalizedCep = currentCep.replace(/\D/g, '')

    if (normalizedCep.length < 3) {
      status.value = 'idle'
      address.value = null
      errorMessage.value = ''
      searchedCep.value = ''
      return
    }

    const paddedCep = normalizedCep.padEnd(8, '0').slice(0, 8)

    status.value = 'loading'
    address.value = null
    errorMessage.value = ''
    searchedCep.value = paddedCep

    try {
      const response = await fetch(`http://localhost:3001/addresses/${paddedCep}`, {
        signal,
      })

      if (!response.ok) {
        throw new Error('Nao foi possivel consultar o CEP.')
      }

      const data = (await response.json()) as CepAddress

      if (data.erro) {
        throw new Error('CEP nao encontrado.')
      }

      address.value = data
      status.value = 'success'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }

      status.value = 'error'
      errorMessage.value =
        error instanceof Error ? error.message : 'Erro inesperado ao consultar CEP.'
    }
  }

  return {
    cep,
    status,
    address,
    errorMessage,
    searchedCep,
  }
}
