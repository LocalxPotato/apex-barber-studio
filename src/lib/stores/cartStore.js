import { writable, derived } from 'svelte/store';

function createCartStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe,
    addItem: (product) => {
      update(items => {
        const existing = items.find(item => item.id === product.id);
        if (existing) {
          return items.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...items, { ...product, quantity: 1 }];
      });
    },
    removeItem: (productId) => {
      update(items => items.filter(item => item.id !== productId));
    },
    updateQuantity: (productId, delta) => {
      update(items => {
        return items.map(item => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        });
      });
    },
    clear: () => set([])
  };
}

export const cartStore = createCartStore();

export const cartTotal = derived(cartStore, $cart => {
  return $cart.reduce((total, item) => total + (item.price * item.quantity), 0);
});

export const cartCount = derived(cartStore, $cart => {
  return $cart.reduce((count, item) => count + item.quantity, 0);
});
