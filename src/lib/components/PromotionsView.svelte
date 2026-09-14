<script>
  import { openBookingWithService } from '../stores/bookingStore';
  import { Tag, ArrowUpRight } from 'lucide-svelte';

  const deals = [
    {
      title: 'First-Timer Welcome Special',
      discount: '20% OFF',
      code: 'FIRST20',
      description: 'Receive 20% off any haircut or Executive Combo service on your first visit to Apex Studio.',
      tag: 'New Clients Only'
    },
    {
      title: 'Student Tuesday Discount',
      discount: '৳300 Cuts',
      code: 'STUDENT300',
      description: 'Present your student ID card on Tuesdays for a ৳300 precision fade cut.',
      tag: 'Students & Youth'
    },
    {
      title: 'Refer-a-Friend Reward Program',
      discount: '৳200 Credit',
      code: 'REFERRAL',
      description: 'Bring a friend or share your referral link. You both receive ৳200 credit towards your next shop visit.',
      tag: 'Community Reward'
    }
  ];
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-6xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2 max-w-xl mx-auto">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">SPECIALS &amp; REFERRALS</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">Promotions &amp; Deals</h1>
      <p class="text-xs text-[#1c241b]/70">
        Seasonal discounts, student cut days, and referral rewards in Downtown Mymensingh.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each deals as deal}
        <div class="bg-[#f4f2ea] rounded-3xl p-8 border border-[#d2cebf]/60 flex flex-col justify-between space-y-6 shadow-xs">
          <div class="space-y-3">
            <span class="bg-[#eae7df] text-[#1c241b] text-[10px] font-semibold px-3 py-1 rounded-full uppercase border border-[#d2cebf]/60 inline-block">
              {deal.tag}
            </span>

            <h3 class="text-xl font-semibold text-[#1c241b]">{deal.title}</h3>
            
            <div class="text-3xl font-bold font-mono text-[#1b2a1a]">{deal.discount}</div>
            
            <p class="text-xs text-[#1c241b]/70 leading-relaxed">{deal.description}</p>
          </div>

          <div class="pt-4 border-t border-[#d2cebf]/40 space-y-3">
            <div class="flex items-center justify-between text-xs font-mono bg-[#eae7df] px-3 py-2 rounded-xl border border-[#d2cebf]/60">
              <span class="text-[#6b7569]">Code:</span>
              <span class="text-[#1c241b] font-semibold">{deal.code}</span>
            </div>

            <button
              on:click={() => openBookingWithService(null)}
              class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-3 rounded-full uppercase text-xs tracking-wider flex items-center justify-center space-x-2"
            >
              <span>Book With Promo</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      {/each}
    </div>

  </div>
</div>
