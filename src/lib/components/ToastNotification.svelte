<script>
  import { toastStore } from '../stores/toastStore';
  import { CheckCircle2, AlertCircle, Info, X } from 'lucide-svelte';
</script>

<div class="fixed top-5 right-5 z-[9999] flex flex-col space-y-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
  {#each $toastStore as toast (toast.id)}
    <div
      class="pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0
      bg-[#1b2a1a] border-[#d2cebf]/40 text-white"
    >
      <div class="flex items-center space-x-3">
        {#if toast.type === 'success'}
          <CheckCircle2 class="w-5 h-5 text-emerald-400 flex-shrink-0" />
        {:else if toast.type === 'error'}
          <AlertCircle class="w-5 h-5 text-rose-400 flex-shrink-0" />
        {:else}
          <Info class="w-5 h-5 text-amber-400 flex-shrink-0" />
        {/if}
        <p class="text-xs font-semibold text-white leading-snug">{toast.message}</p>
      </div>

      <button
        on:click={() => toastStore.remove(toast.id)}
        class="text-slate-300 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 ml-2"
        aria-label="Close notification"
      >
        <X class="w-4 h-4" />
      </button>
    </div>
  {/each}
</div>
