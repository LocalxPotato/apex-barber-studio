<script>
  import { toastStore } from '../stores/toastStore';
  import { Briefcase, CheckCircle2, Send, DollarSign, Award } from 'lucide-svelte';

  let applicantName = '';
  let applicantPhone = '';
  let applicantExp = '3-5 Years';
  let instagramPortfolio = '';
  let applicantRole = 'Barber';
  let isSubmitted = false;

  function submitApplication() {
    if (!applicantName || !applicantPhone) {
      toastStore.add('Please enter your name and phone number', 'error');
      return;
    }
    isSubmitted = true;
    toastStore.add('Application submitted! Our shop manager will call you shortly.', 'success', 6000);
  }
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-5xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2 max-w-xl mx-auto">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">JOIN OUR TEAM</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">Barber Careers</h1>
      <p class="text-xs text-[#1c241b]/70">
        Build your client base at Downtown Mymensingh’s top-rated barbershop. 60/40 commission splits or chair lease.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-[#f4f2ea] rounded-3xl p-8 border border-[#d2cebf]/60 space-y-3 shadow-xs">
        <div class="w-10 h-10 rounded-full bg-[#1b2a1a] text-white flex items-center justify-center font-bold">
          <DollarSign class="w-5 h-5 text-amber-400" />
        </div>
        <h3 class="text-lg font-semibold text-[#1c241b]">60/40 Commission Split</h3>
        <p class="text-xs text-[#1c241b]/70 leading-relaxed">
          High-volume walk-in traffic &amp; online booking pipeline. Keep 60% of all service revenue plus 100% of tips.
        </p>
        <ul class="space-y-1.5 text-xs text-[#1c241b]/70 pt-2 border-t border-[#d2cebf]/40">
          <li class="flex items-center space-x-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-700" />
            <span>All shop products &amp; towels provided</span>
          </li>
          <li class="flex items-center space-x-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-700" />
            <span>Weekly direct payouts</span>
          </li>
        </ul>
      </div>

      <div class="bg-[#f4f2ea] rounded-3xl p-8 border border-[#d2cebf]/60 space-y-3 shadow-xs">
        <div class="w-10 h-10 rounded-full bg-[#1b2a1a] text-white flex items-center justify-center font-bold">
          <Award class="w-5 h-5 text-amber-400" />
        </div>
        <h3 class="text-lg font-semibold text-[#1c241b]">Booth Rent / Chair Lease</h3>
        <p class="text-xs text-[#1c241b]/70 leading-relaxed">
          Ideal for master barbers with an established local clientele. Fixed low weekly chair rental rate with key access.
        </p>
        <ul class="space-y-1.5 text-xs text-[#1c241b]/70 pt-2 border-t border-[#d2cebf]/40">
          <li class="flex items-center space-x-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-700" />
            <span>Set your custom schedule &amp; rates</span>
          </li>
          <li class="flex items-center space-x-1.5">
            <CheckCircle2 class="w-4 h-4 text-emerald-700" />
            <span>Free online booking integration</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Application Form -->
    <div class="bg-[#f4f2ea] rounded-3xl p-8 border border-[#d2cebf]/60 max-w-xl mx-auto space-y-5 shadow-xs">
      <h3 class="text-xl font-semibold text-[#1c241b] text-center">Apply for Barber Chair</h3>

      {#if !isSubmitted}
        <form on:submit|preventDefault={submitApplication} class="space-y-3 text-xs">
          <div>
            <label for="cName" class="block font-medium text-[#1c241b] mb-1">Full Name *</label>
            <input
              id="cName"
              type="text"
              bind:value={applicantName}
              placeholder="e.g. Tariq Ahmed"
              class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
            />
          </div>

          <div>
            <label for="cPhone" class="block font-medium text-[#1c241b] mb-1">Mobile Phone *</label>
            <input
              id="cPhone"
              type="tel"
              bind:value={applicantPhone}
              placeholder="+880 1700-000000"
              class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="cRole" class="block font-medium text-[#1c241b] mb-1">Role</label>
              <select
                id="cRole"
                bind:value={applicantRole}
                class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
              >
                <option>Barber (Full Time)</option>
                <option>Barber (Part Time)</option>
                <option>Apprentice</option>
              </select>
            </div>
            <div>
              <label for="cExp" class="block font-medium text-[#1c241b] mb-1">Experience</label>
              <select
                id="cExp"
                bind:value={applicantExp}
                class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
              >
                <option>1-2 Years</option>
                <option>3-5 Years</option>
                <option>5+ Years</option>
              </select>
            </div>
          </div>

          <div>
            <label for="cInsta" class="block font-medium text-[#1c241b] mb-1">Instagram Link</label>
            <input
              id="cInsta"
              type="url"
              bind:value={instagramPortfolio}
              placeholder="https://instagram.com/your_cuts"
              class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-2xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-3 rounded-full uppercase text-xs tracking-wider shadow-xs flex items-center justify-center space-x-2"
          >
            <Send class="w-3.5 h-3.5" />
            <span>Submit Application</span>
          </button>
        </form>
      {:else}
        <div class="text-center space-y-2 py-6">
          <CheckCircle2 class="w-12 h-12 text-emerald-700 mx-auto" />
          <h4 class="text-xl font-semibold text-[#1c241b]">Application Received!</h4>
          <p class="text-xs text-[#6b7569]">Thank you {applicantName}. We will call you at {applicantPhone}.</p>
        </div>
      {/if}

    </div>

  </div>
</div>
