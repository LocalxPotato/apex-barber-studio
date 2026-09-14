<script>
  import { onMount } from 'svelte';
  import { isBookingOpen } from '../stores/bookingStore';
  import { scrollToElement } from '../smoothScroll';
  import { Calendar, Star, MapPin, Clock, ArrowUpRight, ShieldCheck, Award, Sparkles } from 'lucide-svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let heroRef;
  let titleRef;
  let captionRef;
  let bannerRef;
  let aboutRef;
  let featuresRef;

  onMount(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(titleRef, {
        y: 40,
        opacity: 0,
        duration: 1.1,
      })
      .from(captionRef, {
        y: 25,
        opacity: 0,
        duration: 0.9,
      }, '-=0.7')
      .from(bannerRef, {
        scale: 0.96,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
      }, '-=0.8');

      gsap.to(bannerRef.querySelector('img'), {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: bannerRef,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

      gsap.from(aboutRef.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef,
          start: 'top 85%'
        }
      });

      gsap.from(featuresRef.querySelectorAll('.feature-card'), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef,
          start: 'top 85%'
        }
      });

    }, heroRef);

    return () => ctx.revert();
  });
</script>

<section bind:this={heroRef} class="relative bg-[#eae7df] text-[#1c241b] py-10 pb-20 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div bind:this={titleRef} class="space-y-1">
        <span class="text-[11px] font-bold uppercase tracking-widest text-[#6b7569] flex items-center gap-1.5 mb-2">
          <Sparkles class="w-3.5 h-3.5 text-[#1b2a1a]" />
          <span>EST. 2018 • DOWNTOWN MYMENSINGH</span>
        </span>
        <h1 class="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1c241b] uppercase leading-[1.05]">
          APEX PRECISION<br />BARBER STUDIO
        </h1>
      </div>

      <div bind:this={captionRef} class="space-y-3 max-w-sm">
        <p class="text-xs text-[#1c241b]/70 font-normal leading-relaxed">
          The premier gents salon in Downtown Mymensingh. Tailored skin fades, straight razor sculpts, and organic facial grooming.
        </p>
        <button
          on:click={() => scrollToElement('#services')}
          class="bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium px-5 py-2.5 rounded-full transition-all text-xs flex items-center space-x-2 shadow-xs group"
        >
          <span>EXPLORE SERVICES</span>
          <ArrowUpRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>

    <div bind:this={bannerRef} class="w-full h-[320px] sm:h-[480px] rounded-3xl overflow-hidden shadow-sm relative bg-[#dfdcd2]">
      <img
        src="/images/hero.jpg"
        alt="Apex Barber Studio Architecture"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-[#1c241b] shadow-xs">
        📍 Station Road, Downtown Mymensingh
      </div>
      <div class="absolute bottom-4 right-4 bg-[#1b2a1a] text-white px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-2 shadow-sm">
        <Star class="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span>4.9 (128+ Verified Reviews)</span>
      </div>
    </div>

    <div id="about" bind:this={aboutRef} class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
      <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-[#f4f2ea] p-6 sm:p-8 rounded-3xl border border-[#d2cebf]/60 shadow-xs">
        <div class="sm:col-span-5 h-64 rounded-2xl overflow-hidden bg-[#dfdcd2]">
          <img
            src="/images/about-comfort.jpg"
            alt="Haircut Craft Comfort"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="sm:col-span-7 space-y-4">
          <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">ABOUT US</span>
          <h2 class="text-2xl font-semibold text-[#1c241b] leading-snug">
            The Highest Level of Comfort, Hygiene and Service
          </h2>
          <p class="text-xs text-[#1c241b]/70 font-normal leading-relaxed">
            At Apex Studio, we combine premium master barber craft with obsessive attention to detail. Whether it's a skin fade or hot razor shave, we take care of everything so you can enjoy every moment.
          </p>
          <button
            on:click={() => scrollToElement('#team')}
            class="text-xs font-semibold uppercase tracking-wider text-[#1c241b] hover:text-[#1b2a1a] flex items-center space-x-1 pt-2"
          >
            <span>MORE ABOUT US</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div class="lg:col-span-5 h-full rounded-3xl overflow-hidden bg-[#dfdcd2] relative min-h-[360px]">
        <img
          src="/images/tariq.jpg"
          alt="Master Barber Tariq Ahmed"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1c241b]/80 via-transparent to-transparent"></div>
        <div class="absolute bottom-6 left-6 text-white space-y-1">
          <div class="text-sm font-semibold">Tariq Ahmed</div>
          <div class="text-xs text-white/80">Founder &amp; Master Barber • 12+ Yrs Exp</div>
        </div>
      </div>
    </div>

    <div bind:this={featuresRef} class="space-y-6 pt-6">
      <h3 class="text-xl font-semibold text-[#1c241b]">Why Choose Us?</h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="feature-card bg-[#f4f2ea] p-6 rounded-2xl border border-[#d2cebf]/60 space-y-3 shadow-xs">
          <h4 class="text-sm font-semibold text-[#1c241b]">Professional Team</h4>
          <p class="text-xs text-[#1c241b]/70 leading-relaxed">
            With years of experience in precision geometry fades and straight razor sculpting.
          </p>
        </div>

        <div class="feature-card bg-[#f4f2ea] p-6 rounded-2xl border border-[#d2cebf]/60 space-y-3 shadow-xs">
          <h4 class="text-sm font-semibold text-[#1c241b]">Zero Waiting Punctuality</h4>
          <p class="text-xs text-[#1c241b]/70 leading-relaxed">
            Real-time online appointment scheduling ensures your chair is ready the moment you walk in.
          </p>
        </div>

        <div class="feature-card bg-[#f4f2ea] p-6 rounded-2xl border border-[#d2cebf]/60 space-y-3 shadow-xs">
          <h4 class="text-sm font-semibold text-[#1c241b]">100% Sanitized Tools</h4>
          <p class="text-xs text-[#1c241b]/70 leading-relaxed">
            Single-use Japanese razor blades, UV sanitized clippers, and fresh hot towels for every client.
          </p>
        </div>
      </div>
    </div>

  </div>
</section>
