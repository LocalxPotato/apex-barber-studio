<script>
  import { ShieldCheck, FileText, Clock } from 'lucide-svelte';
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-4xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">TERMS &amp; GUIDELINES</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">Cancellation &amp; Policies</h1>
    </div>

    <div class="bg-[#f4f2ea] rounded-3xl p-8 border border-[#d2cebf]/60 space-y-3 shadow-xs">
      <h2 class="text-base font-semibold text-[#1c241b] flex items-center space-x-2">
        <Clock class="w-4 h-4 text-[#1b2a1a]" />
        <span>Cancellation &amp; Late Policy</span>
      </h2>
      <div class="text-xs text-[#1c241b]/70 space-y-2 leading-relaxed">
        <p>
          We request at least <strong>2 hours advance notice</strong> if you need to cancel or reschedule your appointment slot.
        </p>
        <ul class="list-disc pl-5 space-y-1 text-[#6b7569]">
          <li><strong>Late Arrivals:</strong> If running more than 10 minutes late, please call the shop so we can adjust our schedule without rushing your cut.</li>
          <li><strong>Deposit Refunds:</strong> 10% deposits are fully refundable when cancelled 2 hours prior to scheduled time.</li>
        </ul>
      </div>
    </div>

    <div class="bg-[#f4f2ea] rounded-3xl p-8 border border-[#d2cebf]/60 space-y-3 shadow-xs">
      <h2 class="text-base font-semibold text-[#1c241b] flex items-center space-x-2">
        <FileText class="w-4 h-4 text-[#1b2a1a]" />
        <span>Privacy Policy &amp; SMS Terms</span>
      </h2>
      <div class="text-xs text-[#1c241b]/70 space-y-2 leading-relaxed">
        <p>
          Mobile numbers and email addresses collected during booking are used strictly for automated SMS reminders and confirmation receipts.
        </p>
        <p class="text-[#6b7569]">
          We never sell client data to third parties. You may opt out of SMS reminders anytime.
        </p>
      </div>
    </div>

  </div>
</div>
