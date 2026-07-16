import { onMounted, onUnmounted, ref } from 'vue'

export function useClock() {
    const currentTime = ref(new Date())
    const fixedDate = ref(currentTime.value)
    let intervalId: number | undefined

    onMounted(() => {
        intervalId = window.setInterval(() => {
            currentTime.value = new Date()
        }, 1000)
    })

    onUnmounted(() => {
        window.clearInterval(intervalId)
    })

    function updateFixedDate() {
        fixedDate.value = new Date(currentTime.value)
    }

    return {
        currentTime,
        fixedDate,
        updateFixedDate,
    }
}
