<script>
  import { isBookingOpen } from '../stores/bookingStore';
  import { Calendar, Phone, MapPin, ShoppingBag } from 'lucide-svelte';

  export let navigateTo = (route) => {};
</script>

<div class="fixed bottom-0 left-0 right-0 z-30 bg-[#eae7df]/95 backdrop-blur-md border-t border-[#d2cebf] px-4 py-3 sm:hidden shadow-lg flex items-center justify-between space-x-2">
  <button
    on:click={() => isBookingOpen.set(true)}
    class="flex-1 bg-[#1b2a1a] text-white font-medium py-3 px-4 rounded-full flex items-center justify-center space-x-2 text-xs uppercase tracking-wider active:scale-95 transition-transform"
  >
    <Calendar class="w-4 h-4" />
    <span>Book a Cut</span>
  </button>

  <a
    href="tel:+8801700000000"
    class="p-3 bg-[#f4f2ea] border border-[#d2cebf]/60 text-[#1c241b] rounded-full flex items-center justify-center active:scale-95 transition-transform"
    aria-label="Call Shop"
  >
    <Phone class="w-4 h-4" />
  </a>

  <button
    on:click={() => {
      navigateTo('home');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }}
    class="p-3 bg-[#f4f2ea] border border-[#d2cebf]/60 text-[#1c241b] rounded-full flex items-center justify-center active:scale-95 transition-transform"
    aria-label="Shop Location Map"
  >
    <MapPin class="w-4 h-4" />
  </button>

  <button
    on:click={() => navigateTo('shop')}
    class="p-3 bg-[#f4f2ea] border border-[#d2cebf]/60 text-[#1c241b] rounded-full flex items-center justify-center active:scale-95 transition-transform"
    aria-label="Shop Grooming Store"
  >
    <ShoppingBag class="w-4 h-4" />
  </button>
</div>
