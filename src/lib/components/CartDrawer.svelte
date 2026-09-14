<script>
  import { cartStore, cartTotal } from '../stores/cartStore';
  import { toastStore } from '../stores/toastStore';
  import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-svelte';

  export let isOpen = false;

  function checkout() {
    if ($cartStore.length === 0) return;
    toastStore.add('Order placed for Click & Collect pick-up at shop!', 'success', 5000);
    cartStore.clear();
    isOpen = false;
  }
</script>

{#if isOpen}
  <div class="fixed inset-0 z-50 bg-[#1c241b]/40 backdrop-blur-xs flex justify-end">
    <div class="bg-[#f4f2ea] border-l border-[#d2cebf] w-full max-w-md h-full flex flex-col justify-between p-6 shadow-xl text-[#1c241b] animate-in slide-in-from-right duration-300">
      
      <div class="flex items-center justify-between border-b border-[#d2cebf]/40 pb-4">
        <div class="flex items-center space-x-2 text-[#1c241b] font-semibold text-base">
          <ShoppingBag class="w-5 h-5 text-[#1b2a1a]" />
          <span>Grooming Cart</span>
        </div>
        <button
          on:click={() => isOpen = false}
          class="p-2 text-[#1c241b]/60 hover:text-[#1c241b] rounded-full hover:bg-[#eae7df]"
          aria-label="Close Cart"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <div class="flex-1 overflow-y-auto py-6 space-y-3">
        {#if $cartStore.length === 0}
          <div class="text-center text-[#6b7569] py-12 space-y-2">
            <ShoppingBag class="w-10 h-10 mx-auto text-[#d2cebf]" />
            <p class="text-xs">Your grooming cart is currently empty.</p>
          </div>
        {:else}
          {#each $cartStore as item (item.id)}
            <div class="bg-[#eae7df] rounded-2xl p-3.5 border border-[#d2cebf]/60 flex items-center justify-between space-x-3">
              <img src={item.image} alt={item.name} class="w-12 h-12 rounded-xl object-cover border border-[#d2cebf]/60 flex-shrink-0" />
              <div class="flex-1">
                <h4 class="text-xs font-semibold text-[#1c241b] line-clamp-1">{item.name}</h4>
                <div class="text-xs text-[#1b2a1a] font-semibold mt-0.5">৳{item.price}</div>
                <div class="flex items-center space-x-2 mt-1.5">
                  <button
                    on:click={() => cartStore.updateQuantity(item.id, -1)}
                    class="p-1 rounded bg-white text-[#1c241b] border border-[#d2cebf]/60"
                  >
                    <Minus class="w-3 h-3" />
                  </button>
                  <span class="text-xs font-bold text-[#1c241b] px-1">{item.quantity}</span>
                  <button
                    on:click={() => cartStore.updateQuantity(item.id, 1)}
                    class="p-1 rounded bg-white text-[#1c241b] border border-[#d2cebf]/60"
                  >
                    <Plus class="w-3 h-3" />
                  </button>
                </div>
              </div>
              <button
                on:click={() => cartStore.removeItem(item.id)}
                class="text-red-600 p-1.5"
                aria-label="Remove Product"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          {/each}
        {/if}
      </div>

      {#if $cartStore.length > 0}
        <div class="border-t border-[#d2cebf]/40 pt-4 space-y-3">
          <div class="flex justify-between items-center text-sm font-semibold">
            <span class="text-[#1c241b]">Total Amount:</span>
            <span class="text-[#1c241b] text-xl font-bold">৳{$cartTotal}</span>
          </div>

          <div class="text-[11px] text-[#6b7569]">
            🚚 Free Click &amp; Collect pickup during your haircut appointment.
          </div>

          <button
            on:click={checkout}
            class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-3 rounded-full uppercase text-xs tracking-wider flex items-center justify-center space-x-2"
          >
            <span>Click &amp; Collect Checkout</span>
            <ArrowRight class="w-4 h-4" />
          </button>
        </div>
      {/if}

    </div>
  </div>
{/if}
