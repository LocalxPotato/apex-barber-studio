<script>
  import { products } from '../data/products';
  import { cartStore } from '../stores/cartStore';
  import { toastStore } from '../stores/toastStore';
  import { ShoppingBag, Star, Plus } from 'lucide-svelte';

  export let isCartOpen = false;

  function addToCart(product) {
    cartStore.addItem(product);
    toastStore.add(`Added ${product.name} to cart!`, 'success');
  }
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2 max-w-xl mx-auto">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">STORE &amp; MERCH</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">Grooming Products</h1>
      <p class="text-xs text-[#1c241b]/70">
        Hair pomades, beard elixirs, and official shop merchandise. Click-and-collect pickup available during your next appointment.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each products as prod (prod.id)}
        <div class="bg-[#f4f2ea] rounded-3xl overflow-hidden border border-[#d2cebf]/60 shadow-xs flex flex-col justify-between group">
          
          <div>
            <div class="relative h-56 overflow-hidden bg-[#dfdcd2]">
              <img
                src={prod.image}
                alt={prod.name}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3 bg-white/90 text-[#1c241b] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#d2cebf]/60 uppercase">
                {prod.category}
              </div>
            </div>

            <div class="p-5 space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#6b7569] font-mono">{prod.size}</span>
                <span class="text-amber-600 flex items-center space-x-1 font-semibold">
                  <Star class="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{prod.rating}</span>
                </span>
              </div>

              <h3 class="text-base font-semibold text-[#1c241b] line-clamp-1">{prod.name}</h3>
              <p class="text-xs text-[#1c241b]/70 line-clamp-2 leading-relaxed">{prod.description}</p>
            </div>
          </div>

          <div class="p-5 pt-0 flex items-center justify-between">
            <div class="text-lg font-semibold text-[#1c241b]">৳{prod.price}</div>

            <button
              on:click={() => addToCart(prod)}
              class="bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium px-4 py-2 rounded-full transition-all text-xs flex items-center space-x-1"
            >
              <Plus class="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>

        </div>
      {/each}
    </div>

  </div>
</div>
