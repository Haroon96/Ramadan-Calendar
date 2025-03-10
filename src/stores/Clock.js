import { defineStore } from 'pinia'
import { ref } from 'vue'

export const clockStore = defineStore('clockStore', () => {
    const clock = ref(new Date());
    const newDateListeners = [];

    let lastKnownDate = clock.value.getDate();
    setInterval(incrementClock, 1000);

    function incrementClock() {
        clock.value = new Date();
        if (lastKnownDate != clock.value.getDate()) {
            for (let listener of newDateListeners) {
                listener();
            }
            lastKnownDate = clock.value.getDate();
        }
    }

    function registerNewDateListener(fn) {
        newDateListeners.push(fn);
    }

    return { clock, registerNewDateListener };
});
