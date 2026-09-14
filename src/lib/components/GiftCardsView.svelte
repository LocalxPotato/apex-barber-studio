<script>
  import { toastStore } from '../stores/toastStore';
  import { Gift, Send, CheckCircle2, Sparkles } from 'lucide-svelte';

  let selectedAmount = 1000;
  let customAmount = '';
  let recipientName = '';
  let recipientEmail = '';
  let giftMessage = '';
  let isPurchased = false;
  let giftCode = '';

  $: finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  function purchaseGiftCard() {
    if (!recipientName || !recipientEmail) {
      toastStore.add('Please enter recipient name and email', 'error');
      return;
    }
    giftCode = 'APX-GIFT-' + Math.floor(1000 + Math.random() * 9000);
    isPurchased = true;
    toastStore.add(`Digital Gift Card created! Code: ${giftCode}`, 'success', 6000);
  }
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">DIGITAL GIFT CARDS</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">Gift Certificates</h1>
      <p class="text-xs text-[#1c241b]/70 max-w-md mx-auto">
        Valid for any haircut, beard sculpting service, or grooming shop product.
      </p>
    </div>

    {#if !isPurchased}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        <div class="bg-[#f4f2ea] rounded-3xl p-6 border border-[#d2cebf]/60 space-y-5 shadow-xs">
          <div>
            <label for="amtGroup" class="block text-xs font-semibold text-[#1c241b] uppercase tracking-wider mb-2">1. Select Amount</label>
            <div id="amtGroup" class="grid grid-cols-3 gap-2.5">
              {#each [500, 1000, 2000] as amt}
                <button
                  type="button"
                  on:click={() => { selectedAmount = amt; customAmount = ''; }}
                  class="p-2.5 rounded-2xl border text-center font-semibold text-xs transition-all
                  {selectedAmount === amt && !customAmount ? 'bg-[#1b2a1a] text-white border-[#1b2a1a]' : 'bg-[#eae7df] text-[#1c241b] border-[#d2cebf]/60'}"
                >
                  ৳{amt}
                </button>
              {/each}
            </div>
            <input
              type="number"
              bind:value={customAmount}
              placeholder="Or enter custom ৳ amount..."
              class="w-full mt-3 bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-xs text-[#1c241b] focus:outline-none"
            />
          </div>

          <div class="space-y-3 text-xs">
            <label for="recName" class="block font-semibold text-[#1c241b] uppercase tracking-wider">2. Recipient Details</label>
            <input
              id="recName"
              type="text"
              bind:value={recipientName}
              placeholder="Recipient Name (e.g. Farhan Ahmed)"
              class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
            />
            <input
              type="email"
              bind:value={recipientEmail}
              placeholder="Recipient Email Address"
              class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
            />
            <textarea
              bind:value={giftMessage}
              rows="3"
              placeholder="Personalized message..."
              class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
            ></textarea>
          </div>

          <button
            on:click={purchaseGiftCard}
            class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-3 rounded-full uppercase text-xs tracking-wider shadow-xs flex items-center justify-center space-x-2"
          >
            <Send class="w-3.5 h-3.5" />
            <span>Generate Gift Card (৳{finalAmount})</span>
          </button>
        </div>

        <div class="bg-[#1b2a1a] p-8 rounded-3xl text-white space-y-6 shadow-md">
          <div class="flex justify-between items-start">
            <div class="flex items-center space-x-2">
              <Sparkles class="w-4 h-4 text-amber-400" />
              <span class="font-semibold text-sm uppercase tracking-wider">Apex Gift Pass</span>
            </div>
            <div class="text-2xl font-bold font-mono text-amber-400">৳{finalAmount}</div>
          </div>

          <div class="space-y-2 py-6 border-y border-white/20 font-mono text-xs">
            <div>
              <span class="text-white/60">FOR:</span>
              <span class="text-white font-semibold block text-sm font-sans">{recipientName || 'Recipient Name'}</span>
            </div>
            {#if giftMessage}
              <div class="pt-2 text-white/80 italic font-sans text-xs">"{giftMessage}"</div>
            {/if}
          </div>

          <div class="flex justify-between items-end text-[10px] text-white/60">
            <span>Valid at Mymensingh Studio</span>
            <span class="text-amber-400 font-semibold">No Expiration Date</span>
          </div>
        </div>

      </div>
    {:else}
      <div class="bg-[#f4f2ea] rounded-3xl p-8 border border-[#d2cebf]/60 text-center space-y-3 max-w-lg mx-auto shadow-xs">
        <CheckCircle2 class="w-12 h-12 text-emerald-700 mx-auto" />
        <h3 class="text-xl font-semibold text-[#1c241b]">Digital Gift Card Issued!</h3>
        <p class="text-xs text-[#1c241b]/70">
          Gift Code: <strong class="text-[#1b2a1a] font-mono text-base">{giftCode}</strong>
        </p>
        <p class="text-xs text-[#6b7569]">Voucher sent to {recipientEmail}.</p>
        <button
          on:click={() => isPurchased = false}
          class="bg-[#eae7df] text-[#1c241b] font-medium px-5 py-2 rounded-full text-xs"
        >
          Create Another Gift Card
        </button>
      </div>
    {/if}

  </div>
</div>
