import { ref } from "vue";
const currentTime = ref(new Date());
let intervalId: number | null = null;

export function useClock() {

    const fixedDate = ref(currentTime.value);

    if (!intervalId) {
        intervalId = window.setInterval(() => {
            currentTime.value = new Date()
        }, 1000)
    }

    function updateFixedDate() {
        fixedDate.value = new Date(currentTime.value);
    }

    return {
        currentTime,
        fixedDate,
        updateFixedDate
    }
}