import { writable } from 'svelte/store';

function createToastStore() {
  const { subscribe, update } = writable([]);

  return {
    subscribe,
    add: (message, type = 'success', duration = 4000) => {
      const id = Date.now() + Math.random();
      update(toasts => [...toasts, { id, message, type }]);
      setTimeout(() => {
        update(toasts => toasts.filter(t => t.id !== id));
      }, duration);
    },
    remove: (id) => {
      update(toasts => toasts.filter(t => t.id !== id));
    }
  };
}

export const toastStore = createToastStore();
