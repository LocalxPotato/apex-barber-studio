<script>
  import { faqs } from '../data/faqs';
  import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  let openIndex = 0;

  function toggleFAQ(idx) {
    openIndex = openIndex === idx ? -1 : idx;
  }
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2 max-w-xl mx-auto">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">HELP &amp; INFO</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">Frequently Asked Questions</h1>
      <p class="text-xs text-[#1c241b]/70">
        Answers regarding walk-ins, cancellation policies, kids cuts, and payment methods.
      </p>
    </div>

    <div class="space-y-3">
      {#each faqs as faq, idx}
        <div class="bg-[#f4f2ea] rounded-3xl border border-[#d2cebf]/60 overflow-hidden shadow-xs">
          <button
            on:click={() => toggleFAQ(idx)}
            class="w-full p-5 text-left flex items-center justify-between space-x-4 font-semibold text-sm text-[#1c241b] hover:text-[#1b2a1a] transition-colors"
          >
            <span>{faq.question}</span>
            <div class="p-1 rounded-full bg-[#eae7df] text-[#1c241b]">
              {#if openIndex === idx}
                <ChevronUp class="w-4 h-4" />
              {:else}
                <ChevronDown class="w-4 h-4" />
              {/if}
            </div>
          </button>

          {#if openIndex === idx}
            <div transition:slide={{ duration: 250 }} class="px-5 pb-5 text-xs text-[#1c241b]/70 leading-relaxed border-t border-[#d2cebf]/40 pt-3">
              {faq.answer}
            </div>
          {/if}
        </div>
      {/each}
    </div>

  </div>
</div>
