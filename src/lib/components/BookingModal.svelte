<script>
  import { isBookingOpen, bookingState } from '../stores/bookingStore';
  import { services } from '../data/services';
  import { barbers } from '../data/barbers';
  import { toastStore } from '../stores/toastStore';
  import { X, Calendar, Clock, Scissors, CheckCircle2, ChevronRight } from 'lucide-svelte';

  const timeSlots = [
    { time: '09:30 AM', status: 'available' },
    { time: '10:30 AM', status: 'available' },
    { time: '11:30 AM', status: 'booked' },
    { time: '02:00 PM', status: 'available' },
    { time: '03:00 PM', status: 'available' },
    { time: '04:30 PM', status: 'available' },
    { time: '06:00 PM', status: 'available' },
    { time: '07:30 PM', status: 'booked' },
    { time: '08:30 PM', status: 'available' }
  ];

  function toggleService(service) {
    bookingState.update(s => {
      const exists = s.services.some(item => item.id === service.id);
      const newServices = exists
        ? s.services.filter(item => item.id !== service.id)
        : [...s.services, service];
      return { ...s, services: newServices.length ? newServices : [service] };
    });
  }

  function nextStep() {
    if ($bookingState.step === 1 && $bookingState.services.length === 0) {
      toastStore.add('Please select at least one service', 'error');
      return;
    }
    if ($bookingState.step === 4) {
      if (!$bookingState.clientName || !$bookingState.clientPhone) {
        toastStore.add('Please fill in your name and phone number', 'error');
        return;
      }
      confirmBooking();
      return;
    }
    bookingState.update(s => ({ ...s, step: s.step + 1 }));
  }

  function prevStep() {
    bookingState.update(s => ({ ...s, step: Math.max(1, s.step - 1) }));
  }

  function confirmBooking() {
    const id = 'APX-' + Math.floor(100000 + Math.random() * 900000);
    bookingState.update(s => ({
      ...s,
      step: 5,
      confirmed: true,
      appointmentId: id
    }));
    toastStore.add(`Appointment confirmed! Pass ID: ${id}. SMS reminder sent.`, 'success', 6000);
  }

  function closeModal() {
    isBookingOpen.set(false);
  }

  $: totalAmount = $bookingState.services.reduce((sum, item) => sum + item.price, 0);
  $: totalDuration = $bookingState.services.reduce((sum, item) => sum + (item.durationMin || 30), 0);
</script>

{#if $isBookingOpen}
  <div class="fixed inset-0 z-50 bg-[#1c241b]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-[#f4f2ea] border border-[#d2cebf] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-xl relative space-y-6 my-8 text-[#1c241b]">
      
      <button
        on:click={closeModal}
        class="absolute top-6 right-6 p-2 rounded-full bg-[#eae7df] text-[#1c241b]/60 hover:text-[#1c241b]"
        aria-label="Close Booking Window"
      >
        <X class="w-5 h-5" />
      </button>

      <div class="space-y-1">
        <div class="flex items-center space-x-2 text-xs font-semibold text-[#1b2a1a] uppercase tracking-wider">
          <Calendar class="w-4 h-4" />
          <span>Apex Scheduling Engine</span>
        </div>
        <h2 class="text-2xl font-semibold text-[#1c241b]">Book Appointment</h2>
      </div>

      {#if !$bookingState.confirmed}
        <div class="flex items-center justify-between border-b border-[#d2cebf]/50 pb-3 text-xs font-medium text-[#1c241b]/50">
          <span class={$bookingState.step >= 1 ? 'text-[#1c241b] font-bold' : ''}>1. Service</span>
          <ChevronRight class="w-3.5 h-3.5 text-[#d2cebf]" />
          <span class={$bookingState.step >= 2 ? 'text-[#1c241b] font-bold' : ''}>2. Barber</span>
          <ChevronRight class="w-3.5 h-3.5 text-[#d2cebf]" />
          <span class={$bookingState.step >= 3 ? 'text-[#1c241b] font-bold' : ''}>3. Time</span>
          <ChevronRight class="w-3.5 h-3.5 text-[#d2cebf]" />
          <span class={$bookingState.step >= 4 ? 'text-[#1c241b] font-bold' : ''}>4. Details</span>
        </div>
      {/if}

      <!-- STEP 1 -->
      {#if $bookingState.step === 1}
        <div class="space-y-3">
          <h3 class="text-xs font-semibold text-[#1c241b]">Select Service(s)</h3>
          <div class="grid grid-cols-1 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {#each services as service}
              <button
                type="button"
                on:click={() => toggleService(service)}
                class="w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all text-xs
                {$bookingState.services.some(s => s.id === service.id)
                  ? 'bg-white border-[#1b2a1a] text-[#1c241b] font-medium shadow-xs'
                  : 'bg-[#eae7df]/70 border-[#d2cebf]/60 text-[#1c241b]'}"
              >
                <div class="flex items-center space-x-3">
                  <div class="p-2 rounded-xl bg-white text-[#1c241b]">
                    <Scissors class="w-4 h-4 text-[#1b2a1a]" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-sm text-[#1c241b]">{service.name}</h4>
                    <p class="text-[11px] text-[#6b7569]">{service.duration} • {service.highlights}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-sm font-semibold text-[#1c241b]">৳{service.price}</span>
                </div>
              </button>
            {/each}
          </div>
        </div>

      {:else if $bookingState.step === 2}
        <div class="space-y-3">
          <h3 class="text-xs font-semibold text-[#1c241b]">Choose Preferred Barber</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            <button
              type="button"
              on:click={() => bookingState.update(s => ({ ...s, barber: null }))}
              class="p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all text-xs
              {!$bookingState.barber ? 'bg-white border-[#1b2a1a] shadow-xs' : 'bg-[#eae7df]/70 border-[#d2cebf]/60 text-[#1c241b]'}"
            >
              <div class="w-9 h-9 rounded-full bg-[#1b2a1a] text-white font-bold flex items-center justify-center">
                💈
              </div>
              <div>
                <h4 class="font-semibold text-sm text-[#1c241b]">First Available</h4>
                <p class="text-[11px] text-[#6b7569]">Fastest slot allocation</p>
              </div>
            </button>

            {#each barbers as barber}
              <button
                type="button"
                on:click={() => bookingState.update(s => ({ ...s, barber }))}
                class="p-3.5 rounded-2xl border text-left flex items-center space-x-3 transition-all text-xs
                {$bookingState.barber?.id === barber.id ? 'bg-white border-[#1b2a1a] shadow-xs' : 'bg-[#eae7df]/70 border-[#d2cebf]/60 text-[#1c241b]'}"
              >
                <img src={barber.avatar} alt={barber.name} class="w-9 h-9 rounded-full object-cover border border-[#d2cebf]" />
                <div>
                  <h4 class="font-semibold text-sm text-[#1c241b]">{barber.name}</h4>
                  <p class="text-[11px] text-[#6b7569]">{barber.role}</p>
                </div>
              </button>
            {/each}
          </div>
        </div>

      {:else if $bookingState.step === 3}
        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <h3 class="text-xs font-semibold text-[#1c241b]">Select Date &amp; Available Slot</h3>
            <input
              type="date"
              bind:value={$bookingState.date}
              min={new Date().toISOString().split('T')[0]}
              class="bg-white border border-[#d2cebf] rounded-xl px-2.5 py-1 text-xs text-[#1c241b] focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-56 overflow-y-auto pr-1">
            {#each timeSlots as slot}
              <button
                type="button"
                disabled={!slot.status}
                on:click={() => bookingState.update(s => ({ ...s, timeSlot: slot.time }))}
                class="py-2.5 px-2 rounded-xl text-center text-xs font-medium border transition-all
                {$bookingState.timeSlot === slot.time
                  ? 'bg-[#1b2a1a] text-white border-[#1b2a1a] shadow-xs'
                  : slot.status
                    ? 'bg-white border-[#d2cebf]/60 text-[#1c241b] hover:bg-[#eae7df]'
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'}"
              >
                {slot.time}
              </button>
            {/each}
          </div>
        </div>

      {:else if $bookingState.step === 4}
        <div class="space-y-3.5 text-xs">
          <h3 class="text-xs font-semibold text-[#1c241b]">Client Information &amp; Notes</h3>

          <div>
            <label for="bName" class="block font-medium text-[#1c241b] mb-1">Full Name</label>
            <input
              id="bName"
              type="text"
              bind:value={$bookingState.clientName}
              placeholder="e.g. Tanvir Hossain"
              class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="bPhone" class="block font-medium text-[#1c241b] mb-1">Phone Number (bKash/Nagad)</label>
              <input
                id="bPhone"
                type="tel"
                bind:value={$bookingState.clientPhone}
                placeholder="+880 1700-000000"
                class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
              />
            </div>

            <div>
              <label for="bEmail" class="block font-medium text-[#1c241b] mb-1">Email Address</label>
              <input
                id="bEmail"
                type="email"
                bind:value={$bookingState.clientEmail}
                placeholder="name@domain.com"
                class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
              />
            </div>
          </div>

          <div class="pt-3 border-t border-[#d2cebf]/40">
            <label for="payPref" class="block font-medium text-[#1c241b] mb-1.5">Payment Preference</label>
            <div id="payPref" class="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                on:click={() => bookingState.update(s => ({ ...s, paymentMethod: 'shop' }))}
                class="p-3 rounded-2xl border text-left text-xs font-semibold transition-all
                {$bookingState.paymentMethod === 'shop' ? 'bg-white border-[#1b2a1a] text-[#1c241b]' : 'bg-[#eae7df] border-[#d2cebf]/60 text-[#6b7569]'}"
              >
                💵 Pay at Shop
                <span class="block text-[10px] text-[#6b7569] font-normal">Cash, Card, or bKash at counter</span>
              </button>

              <button
                type="button"
                on:click={() => bookingState.update(s => ({ ...s, paymentMethod: 'deposit' }))}
                class="p-3 rounded-2xl border text-left text-xs font-semibold transition-all
                {$bookingState.paymentMethod === 'deposit' ? 'bg-white border-[#1b2a1a] text-[#1c241b]' : 'bg-[#eae7df] border-[#d2cebf]/60 text-[#6b7569]'}"
              >
                💳 Pay 10% Deposit
                <span class="block text-[10px] text-emerald-700 font-normal">Lock Priority Weekend Slot</span>
              </button>
            </div>
          </div>
        </div>

      <!-- STEP 5 -->
      {:else if $bookingState.step === 5}
        <div class="space-y-4 text-center py-2">
          <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 class="w-7 h-7" />
          </div>

          <div>
            <h3 class="text-xl font-semibold text-[#1c241b]">Appointment Confirmed!</h3>
            <p class="text-xs text-[#6b7569] mt-0.5">Pass ID: <strong class="text-[#1b2a1a] font-mono">{$bookingState.appointmentId}</strong></p>
          </div>

          <div class="bg-[#eae7df] rounded-2xl p-4 border border-[#d2cebf]/60 text-left space-y-2 font-mono text-xs">
            <div class="flex justify-between border-b border-[#d2cebf]/40 pb-1.5">
              <span class="text-[#6b7569]">Client Name:</span>
              <span class="text-[#1c241b] font-semibold">{$bookingState.clientName}</span>
            </div>
            <div class="flex justify-between border-b border-[#d2cebf]/40 pb-1.5">
              <span class="text-[#6b7569]">Date &amp; Time:</span>
              <span class="text-[#1b2a1a] font-semibold">{$bookingState.date} at {$bookingState.timeSlot}</span>
            </div>
            <div class="flex justify-between border-b border-[#d2cebf]/40 pb-1.5">
              <span class="text-[#6b7569]">Barber:</span>
              <span class="text-[#1c241b] font-semibold">{$bookingState.barber?.name || 'First Available'}</span>
            </div>
            <div class="flex justify-between font-sans text-xs pt-1">
              <span class="text-[#1c241b] font-semibold">Total Amount Due:</span>
              <span class="text-[#1c241b] font-bold">${totalAmount}</span>
            </div>
          </div>

          <button
            on:click={closeModal}
            class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-3 rounded-full uppercase text-xs tracking-wider"
          >
            Done &amp; Close Window
          </button>
        </div>
      {/if}

      {#if !$bookingState.confirmed}
        <div class="pt-4 border-t border-[#d2cebf]/40 flex items-center justify-between">
          <div>
            <div class="text-[10px] text-[#6b7569]">Total:</div>
            <div class="text-base font-semibold text-[#1c241b]">${totalAmount} <span class="text-xs text-[#6b7569] font-normal">({totalDuration} mins)</span></div>
          </div>

          <div class="flex space-x-2">
            {#if $bookingState.step > 1}
              <button
                type="button"
                on:click={prevStep}
                class="px-3.5 py-2 rounded-full bg-[#eae7df] text-[#1c241b] border border-[#d2cebf]/60 text-xs font-medium"
              >
                Back
              </button>
            {/if}

            <button
              type="button"
              on:click={nextStep}
              class="px-5 py-2 rounded-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium text-xs uppercase tracking-wider"
            >
              {$bookingState.step === 4 ? 'Confirm Booking' : 'Next Step'}
            </button>
          </div>
        </div>
      {/if}

    </div>
  </div>
{/if}
