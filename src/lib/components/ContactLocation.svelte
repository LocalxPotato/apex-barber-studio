<script>
  import { onMount } from 'svelte';
  import { MapPin, Phone, Clock, Navigation, CreditCard, MessageCircle, Car, Banknote, Smartphone, QrCode, Wallet } from 'lucide-svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef;
  let headerRef;
  let leftColRef;
  let mapRef;

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef,
          start: 'top 85%'
        }
      });

      gsap.from(leftColRef.children, {
        x: -35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef,
          start: 'top 85%'
        }
      });

      gsap.from(mapRef, {
        x: 35,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mapRef,
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  });
</script>

<section id="contact" bind:this={sectionRef} class="py-20 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div bind:this={headerRef} class="text-center max-w-xl mx-auto space-y-2">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">CONTACT &amp; LOCATION</span>
      <h2 class="text-3xl sm:text-4xl font-semibold text-[#1c241b]">Visit Apex Studio</h2>
      <p class="text-xs text-[#1c241b]/70 leading-relaxed">
        Station Road, Downtown Mymensingh. Free motorcycle &amp; car parking options.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div bind:this={leftColRef} class="lg:col-span-5 space-y-6">
        
        <div class="bg-[#f4f2ea] rounded-3xl p-6 border border-[#d2cebf]/60 space-y-4 shadow-xs">
          <h3 class="text-base font-semibold text-[#1c241b] flex items-center space-x-2">
            <MapPin class="w-4 h-4 text-[#1b2a1a]" />
            <span>Shop Address</span>
          </h3>

          <p class="text-xs text-[#1c241b]/70 leading-relaxed">
            Station Road, Opposite City Park Complex,<br />
            Downtown Mymensingh, Bangladesh (Postal 2200)
          </p>

          <div class="pt-3 border-t border-[#d2cebf]/40 space-y-2 text-xs text-[#1c241b]/70">
            <div class="flex items-center space-x-2">
              <Clock class="w-3.5 h-3.5 text-[#1b2a1a]" />
              <span>Hours: <strong class="text-emerald-700">Mon - Sun: 9:00 AM – 9:00 PM</strong></span>
            </div>
            <div class="flex items-center space-x-2">
              <Phone class="w-3.5 h-3.5 text-[#1b2a1a]" />
              <span>Phone: <a href="tel:+8801700000000" class="text-[#1c241b] font-medium underline">+880 1700-000000</a></span>
            </div>
          </div>

          <div class="flex gap-2.5 pt-2">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-2.5 px-4 rounded-full transition-colors text-center text-xs flex items-center justify-center space-x-2 shadow-xs"
            >
              <Navigation class="w-3.5 h-3.5" />
              <span>Get Directions</span>
            </a>

            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-emerald-700 hover:bg-emerald-600 text-white font-medium p-2.5 rounded-full transition-colors flex items-center justify-center"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle class="w-4 h-4" />
            </a>
          </div>
        </div>

        <div class="bg-[#f4f2ea] rounded-3xl p-6 border border-[#d2cebf]/60 space-y-3 shadow-xs">
          <h4 class="text-xs font-semibold text-[#1c241b] flex items-center space-x-1.5">
            <Car class="w-3.5 h-3.5 text-[#1b2a1a]" />
            <span>Parking &amp; Policy</span>
          </h4>

          <ul class="space-y-2 text-xs text-[#1c241b]/70">
            <li class="flex items-start space-x-1.5">
              <span class="text-[#1b2a1a] font-bold">•</span>
              <span><strong>Parking:</strong> Free motorcycle parking out front; free 2-hour car parking behind City Park.</span>
            </li>
            <li class="flex items-start space-x-1.5">
              <span class="text-[#1b2a1a] font-bold">•</span>
              <span><strong>Walk-ins:</strong> Walk-ins welcome based on availability. Appointments recommended on weekends.</span>
            </li>
          </ul>
        </div>

        <div class="bg-[#f4f2ea] rounded-3xl p-6 border border-[#d2cebf]/60 space-y-3 shadow-xs">
          <h4 class="text-xs font-semibold text-[#1c241b] flex items-center space-x-1.5">
            <CreditCard class="w-3.5 h-3.5 text-[#1b2a1a]" />
            <span>Accepted Payment Methods</span>
          </h4>

          <div class="flex flex-wrap items-center gap-3 pt-1">
            <span title="Cash Payment" class="w-11 h-11 rounded-full bg-white border border-[#d2cebf]/60 text-[#1b2a1a] shadow-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-all" aria-label="Cash Payment">
              <Banknote class="w-5 h-5" />
            </span>
            <span title="bKash Mobile Banking" class="w-11 h-11 rounded-full bg-pink-50/80 border border-pink-200 text-pink-600 shadow-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-all" aria-label="bKash Mobile Banking">
              <Smartphone class="w-5 h-5" />
            </span>
            <span title="Nagad Mobile Banking" class="w-11 h-11 rounded-full bg-amber-50/80 border border-amber-200 text-amber-800 shadow-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-all" aria-label="Nagad Mobile Banking">
              <QrCode class="w-5 h-5" />
            </span>
            <span title="Rocket Mobile Banking" class="w-11 h-11 rounded-full bg-purple-50/80 border border-purple-200 text-purple-600 shadow-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-all" aria-label="Rocket Mobile Banking">
              <Wallet class="w-5 h-5" />
            </span>
            <span title="Credit & Debit Cards" class="w-11 h-11 rounded-full bg-white border border-[#d2cebf]/60 text-[#1b2a1a] shadow-xs flex items-center justify-center cursor-pointer hover:scale-105 transition-all" aria-label="Credit & Debit Cards">
              <CreditCard class="w-5 h-5" />
            </span>
          </div>
        </div>

      </div>

      <div bind:this={mapRef} class="lg:col-span-7 h-[460px] rounded-3xl overflow-hidden border border-[#d2cebf]/60 shadow-xs relative bg-[#dfdcd2]">
        <iframe
          title="Apex Barbershop Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.2386057193635!2d90.41811431500355!3d24.7471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37564ef123456789%3A0x123456789abcdef!2sStation%20Rd%2C%20Mymensingh!5e0!3m2!1sen!2sbd!4v1690000000000!5m2!1sen!2sbd"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>

        <div class="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs text-[#1c241b] font-medium shadow-xs">
          💈 Station Road, Downtown Mymensingh
        </div>
      </div>

    </div>
  </div>
</section>
