<script>
  import { isBookingOpen } from '../stores/bookingStore';
  import { cartCount } from '../stores/cartStore';
  import { scrollToElement } from '../smoothScroll';
  import { Scissors, ShoppingBag, Menu, X } from 'lucide-svelte';

  export let currentRoute = 'home';
  export let navigateTo = (route) => {};
  export let isCartOpen = false;

  let mobileMenuOpen = false;

  function handleNav(route, anchorId = null) {
    mobileMenuOpen = false;
    navigateTo(route);
    if (anchorId) {
      setTimeout(() => {
        scrollToElement(`#${anchorId}`);
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
</script>

<header class="sticky top-0 z-40 bg-[#eae7df]/90 backdrop-blur-md transition-all border-b border-[#d2cebf]/40">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
    
    <button on:click={() => handleNav('home')} class="flex items-center space-x-2 text-left group">
      <div class="w-7 h-7 rounded-full bg-[#1b2a1a] text-[#eae7df] flex items-center justify-center">
        <Scissors class="w-3.5 h-3.5 transform -rotate-45" />
      </div>
      <span class="text-xs font-bold tracking-widest text-[#1c241b] uppercase">
        APEX <span class="text-[#6b7569] font-normal">STUDIO</span>
      </span>
    </button>

    <nav class="hidden lg:flex items-center space-x-7 text-xs font-medium text-[#1c241b]/70">
      <button on:click={() => handleNav('home')} class="hover:text-[#1c241b] transition-colors {currentRoute === 'home' ? 'text-[#1c241b] font-bold' : ''}">Home</button>
      <button on:click={() => handleNav('home', 'services')} class="hover:text-[#1c241b] transition-colors">Services</button>
      <button on:click={() => handleNav('home', 'portfolio')} class="hover:text-[#1c241b] transition-colors">Portfolio</button>
      <button on:click={() => handleNav('home', 'team')} class="hover:text-[#1c241b] transition-colors">Barbers</button>
      <button on:click={() => handleNav('memberships')} class="hover:text-[#1c241b] transition-colors {currentRoute === 'memberships' ? 'text-[#1c241b] font-bold' : ''}">Subscriptions</button>
      <button on:click={() => handleNav('shop')} class="hover:text-[#1c241b] transition-colors {currentRoute === 'shop' ? 'text-[#1c241b] font-bold' : ''}">Shop</button>
      <button on:click={() => handleNav('faq')} class="hover:text-[#1c241b] transition-colors {currentRoute === 'faq' ? 'text-[#1c241b] font-bold' : ''}">FAQ</button>
      <button on:click={() => handleNav('blog')} class="hover:text-[#1c241b] transition-colors {currentRoute === 'blog' ? 'text-[#1c241b] font-bold' : ''}">Blog</button>
    </nav>

    <div class="flex items-center space-x-3">
      <button
        on:click={() => isCartOpen = true}
        class="relative p-2 rounded-full text-[#1c241b] hover:bg-[#dfdcd2] transition-colors"
        aria-label="Open Shopping Cart"
      >
        <ShoppingBag class="w-4 h-4" />
        {#if $cartCount > 0}
          <span class="absolute -top-1 -right-1 bg-[#1b2a1a] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {$cartCount}
          </span>
        {/if}
      </button>

      <button
        on:click={() => isBookingOpen.set(true)}
        class="hidden sm:inline-flex items-center space-x-1.5 bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium px-5 py-2.5 rounded-full transition-all text-xs shadow-xs"
      >
        <span>Book a Cut</span>
      </button>

      <button
        on:click={() => mobileMenuOpen = !mobileMenuOpen}
        class="lg:hidden p-2 text-[#1c241b]"
        aria-label="Toggle Navigation Menu"
      >
        {#if mobileMenuOpen}
          <X class="w-5 h-5" />
        {:else}
          <Menu class="w-5 h-5" />
        {/if}
      </button>

    </div>
  </div>

  {#if mobileMenuOpen}
    <div class="lg:hidden bg-[#eae7df] border-b border-[#d2cebf] px-6 py-5 space-y-3 animate-in slide-in-from-top duration-200">
      <div class="grid grid-cols-1 gap-2.5 text-xs font-medium text-[#1c241b]">
        <button on:click={() => handleNav('home')} class="text-left py-1.5 border-b border-[#d2cebf]/40">Home</button>
        <button on:click={() => handleNav('home', 'services')} class="text-left py-1.5 border-b border-[#d2cebf]/40">Services &amp; Pricing</button>
        <button on:click={() => handleNav('memberships')} class="text-left py-1.5 border-b border-[#d2cebf]/40">VIP Subscriptions</button>
        <button on:click={() => handleNav('home', 'portfolio')} class="text-left py-1.5 border-b border-[#d2cebf]/40">Portfolio</button>
        <button on:click={() => handleNav('home', 'team')} class="text-left py-1.5 border-b border-[#d2cebf]/40">Meet Our Barbers</button>
        <button on:click={() => handleNav('shop')} class="text-left py-1.5 border-b border-[#d2cebf]/40">Grooming Shop</button>
        <button on:click={() => handleNav('promotions')} class="text-left py-1.5 border-b border-[#d2cebf]/40">Specials &amp; Referral Program</button>
        <button on:click={() => handleNav('faq')} class="text-left py-1.5 border-b border-[#d2cebf]/40">FAQ</button>
        <button on:click={() => handleNav('blog')} class="text-left py-1.5 border-b border-[#d2cebf]/40">Grooming Blog</button>
        <button on:click={() => handleNav('careers')} class="text-left py-1.5">Join Our Team</button>
      </div>

      <div class="pt-3 border-t border-[#d2cebf]">
        <button
          on:click={() => { mobileMenuOpen = false; isBookingOpen.set(true); }}
          class="w-full py-2.5 bg-[#1b2a1a] text-white font-medium rounded-full text-center text-xs"
        >
          Book Appointment Now
        </button>
      </div>
    </div>
  {/if}
</header>
