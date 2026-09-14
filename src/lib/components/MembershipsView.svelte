<script>
  import { toastStore } from '../stores/toastStore';
  import { Crown, Check } from 'lucide-svelte';

  const plans = [
    {
      id: 'fade-maintainer',
      name: 'Fade Maintainer',
      price: 1200,
      frequency: 'per month',
      popular: false,
      cuts: '2 Haircuts + Scalp Rinse per month',
      perks: [
        '2 Precision Fades or Classic Haircuts',
        '10% off Grooming Store Pomades',
        'Complimentary Espresso or Cold Beverage',
        'Flexible Online Rescheduling'
      ]
    },
    {
      id: 'executive-vip',
      name: 'Executive VIP Club',
      price: 2200,
      frequency: 'per month',
      popular: true,
      cuts: 'Unlimited Haircuts + 2 Beard Sculpting',
      perks: [
        'Unlimited Haircuts & Edge Line-ups',
        '2 Hot Towel Beard Sculpting treatments',
        'VIP Priority Weekend Booking Slots',
        '15% off All Store Grooming Products',
        'Free Birthday Signature Gift Box'
      ]
    },
    {
      id: 'beard-architect',
      name: 'Beard Architect Plan',
      price: 1500,
      frequency: 'per month',
      popular: false,
      cuts: '4 Beard Trims + 1 Haircut',
      perks: [
        '4 Hot Towel Beard Sculptings & Razor Edge',
        '1 Signature Precision Haircut',
        'Organic Beard Oil Treatment Session',
        '10% off Beard Care Elixirs'
      ]
    }
  ];

  function joinPlan(planName) {
    toastStore.add(`Joined ${planName}! VIP Membership activated.`, 'success', 5000);
  }
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2 max-w-xl mx-auto">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">SUBSCRIPTION PLANS</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">VIP Memberships</h1>
      <p class="text-xs text-[#1c241b]/70">
        Recurring monthly cut &amp; beard maintenance plans designed for priority booking.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each plans as plan (plan.id)}
        <div class="bg-[#f4f2ea] rounded-3xl p-8 border flex flex-col justify-between transition-all duration-300 relative
        {plan.popular ? 'border-[#1b2a1a] shadow-md scale-105' : 'border-[#d2cebf]/60 shadow-xs'}"
        >
          {#if plan.popular}
            <div class="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1b2a1a] text-white text-[10px] font-medium px-4 py-1 rounded-full uppercase tracking-wider">
              ★ POPULAR VIP PLAN
            </div>
          {/if}

          <div class="space-y-6">
            <div>
              <h3 class="text-xl font-semibold text-[#1c241b]">{plan.name}</h3>
              <p class="text-xs text-[#6b7569] font-medium mt-0.5">{plan.cuts}</p>
            </div>

            <div class="flex items-baseline space-x-1">
              <span class="text-4xl font-semibold text-[#1c241b]">৳{plan.price}</span>
              <span class="text-[#6b7569] text-xs">{plan.frequency}</span>
            </div>

            <div class="space-y-2.5 pt-6 border-t border-[#d2cebf]/40">
              <div class="text-[11px] font-semibold text-[#1c241b] uppercase tracking-wider">Plan Benefits:</div>
              {#each plan.perks as perk}
                <div class="flex items-start space-x-2 text-xs text-[#1c241b]/80">
                  <Check class="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </div>
              {/each}
            </div>
          </div>

          <div class="pt-8">
            <button
              on:click={() => joinPlan(plan.name)}
              class="w-full font-medium py-3 rounded-full uppercase text-xs tracking-wider transition-all
              {plan.popular
                ? 'bg-[#1b2a1a] hover:bg-[#283c27] text-white'
                : 'bg-white hover:bg-[#1b2a1a] text-[#1c241b] hover:text-white border border-[#d2cebf]'}"
            >
              Subscribe to {plan.name}
            </button>
          </div>

        </div>
      {/each}
    </div>

  </div>
</div>
