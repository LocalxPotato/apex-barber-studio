<script>
  import { Scissors, Instagram, Facebook } from 'lucide-svelte';

  export let navigateTo = (route, anchorId = null) => {};

  function handleFooterNav(route, anchorId = null) {
    navigateTo(route);
    if (anchorId) {
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
</script>

<footer class="bg-[#eae7df] border-t border-[#d2cebf]/60 text-[#1c241b] text-xs py-16 pb-24 sm:pb-16">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      
      <!-- Col 1 -->
      <div class="lg:col-span-2 space-y-3">
        <div class="flex items-center space-x-2">
          <div class="w-6 h-6 rounded-full bg-[#1b2a1a] text-[#eae7df] flex items-center justify-center">
            <Scissors class="w-3 h-3 transform -rotate-45" />
          </div>
          <span class="text-xs font-bold tracking-widest text-[#1c241b] uppercase">
            APEX <span class="text-[#6b7569] font-normal">STUDIO</span>
          </span>
        </div>

        <p class="text-xs text-[#6b7569] leading-relaxed max-w-sm">
          Downtown Mymensingh’s most popular and trusted gents salon. Precision fades, classic straight razor shaves, and hot towel treatments.
        </p>

        <div class="flex space-x-2 text-[#1c241b] pt-1">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-[#f4f2ea] border border-[#d2cebf]/60 hover:bg-[#1b2a1a] hover:text-white transition-colors" aria-label="Instagram">
            <Instagram class="w-3.5 h-3.5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="p-2 rounded-full bg-[#f4f2ea] border border-[#d2cebf]/60 hover:bg-[#1b2a1a] hover:text-white transition-colors" aria-label="Facebook">
            <Facebook class="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <!-- Col 2 -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold text-[#1c241b] uppercase tracking-wider">Client Engagement</h4>
        <ul class="space-y-1.5 text-xs text-[#6b7569]">
          <li><button on:click={() => handleFooterNav('gift-cards')} class="hover:text-[#1c241b] transition-colors">Digital Gift Cards</button></li>
          <li><button on:click={() => handleFooterNav('memberships')} class="hover:text-[#1c241b] transition-colors">VIP Monthly Subscriptions</button></li>
          <li><button on:click={() => handleFooterNav('shop')} class="hover:text-[#1c241b] transition-colors">Grooming E-Store</button></li>
          <li><button on:click={() => handleFooterNav('promotions')} class="hover:text-[#1c241b] transition-colors">Specials &amp; Referrals</button></li>
        </ul>
      </div>

      <!-- Col 3 -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold text-[#1c241b] uppercase tracking-wider">Information</h4>
        <ul class="space-y-1.5 text-xs text-[#6b7569]">
          <li><button on:click={() => handleFooterNav('faq')} class="hover:text-[#1c241b] transition-colors">Frequently Asked Questions</button></li>
          <li><button on:click={() => handleFooterNav('blog')} class="hover:text-[#1c241b] transition-colors">Grooming Blog</button></li>
          <li><button on:click={() => handleFooterNav('careers')} class="hover:text-[#1c241b] transition-colors">Careers &amp; Join Team</button></li>
          <li><button on:click={() => handleFooterNav('home', 'reviews')} class="hover:text-[#1c241b] transition-colors">Google Reviews</button></li>
        </ul>
      </div>

      <!-- Col 4 -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold text-[#1c241b] uppercase tracking-wider">Utility &amp; Legal</h4>
        <ul class="space-y-1.5 text-xs text-[#6b7569]">
          <li><button on:click={() => handleFooterNav('policies')} class="hover:text-[#1c241b] transition-colors">Cancellation Policy</button></li>
          <li><button on:click={() => handleFooterNav('policies')} class="hover:text-[#1c241b] transition-colors">Privacy Policy</button></li>
          <li><button on:click={() => handleFooterNav('policies')} class="hover:text-[#1c241b] transition-colors">Terms of Service</button></li>
          <li><button on:click={() => handleFooterNav('home', 'contact')} class="hover:text-[#1c241b] transition-colors">Location &amp; Parking</button></li>
        </ul>
      </div>

    </div>

    <div class="pt-8 border-t border-[#d2cebf]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6b7569] gap-4">
      <div>
        © 2026 Apex Precision Studio. Station Road, Downtown Mymensingh.
      </div>
      <div class="text-[11px]">
        Minimal Soft Aesthetic Layout
      </div>
    </div>

  </div>
</footer>
