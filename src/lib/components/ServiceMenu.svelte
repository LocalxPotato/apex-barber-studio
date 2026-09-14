<script>
  import { onMount } from 'svelte';
  import { services, serviceCategories } from '../data/services';
  import { openBookingWithService } from '../stores/bookingStore';
  import { Clock, ArrowUpRight, Scissors, CheckCircle2 } from 'lucide-svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef;
  let headerRef;
  let showcaseRef;
  let featuredImageRef;
  let featuredTextRef;
  let menuGridRef;

  let activeCategory = 'All';
  let selectedServiceIndex = 2;

  const serviceImages = {
    'standard-cut': 'images/service-cut.jpg',
    'beard-trim-sculpt': 'images/service-beard.jpg',
    'executive-combo': 'images/service-combo.jpg',
    'kids-student-cut': 'images/service-kids.jpg',
    'hot-razor-shave': 'images/service-beard.jpg',
    'scalp-detox-color': 'images/service-cut.jpg'
  };

  $: filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  $: featuredService = services[selectedServiceIndex] || services[0];

  function changeFeaturedService(idx) {
    if (selectedServiceIndex === idx) return;

    gsap.to([featuredImageRef, featuredTextRef], {
      opacity: 0,
      y: 10,
      duration: 0.2,
      onComplete: () => {
        selectedServiceIndex = idx;
        gsap.to([featuredImageRef, featuredTextRef], {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: 'power2.out'
        });
      }
    });
  }

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

      gsap.from(showcaseRef, {
        y: 45,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: showcaseRef,
          start: 'top 85%'
        }
      });

      gsap.from(menuGridRef.children, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: menuGridRef,
          start: 'top 85%'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  });
</script>

<section id="services" bind:this={sectionRef} class="py-20 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-16">
    
    <div bind:this={headerRef} class="text-center max-w-xl mx-auto space-y-2">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">SERVICES</span>
      <h2 class="text-3xl sm:text-4xl font-semibold text-[#1c241b]">What we offer?</h2>
      <p class="text-xs text-[#1c241b]/70 font-normal leading-relaxed">
        From a precision fade cut to an executive beard treatment — we've got the perfect option for you.
      </p>
    </div>

    <div bind:this={showcaseRef} class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#f4f2ea] p-6 sm:p-8 rounded-3xl border border-[#d2cebf]/60 shadow-xs">
      
      <div class="lg:col-span-3 space-y-2">
        {#each services.slice(0, 4) as service, idx}
          <button
            on:click={() => changeFeaturedService(idx)}
            class="w-full text-left p-3.5 rounded-2xl text-xs font-semibold transition-all
            {selectedServiceIndex === idx
              ? 'bg-[#1b2a1a] text-white shadow-xs'
              : 'bg-[#eae7df]/80 text-[#1c241b] hover:bg-[#dfdcd2]'}"
          >
            {service.name}
          </button>
        {/each}
      </div>

      <div bind:this={featuredImageRef} class="lg:col-span-4 h-72 rounded-2xl overflow-hidden bg-[#dfdcd2]">
        <img
          src={serviceImages[featuredService.id] || 'images/service-cut.jpg'}
          alt={featuredService.name}
          class="w-full h-full object-cover"
        />
      </div>

      <div bind:this={featuredTextRef} class="lg:col-span-5 space-y-4">
        <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">{featuredService.category}</span>
        <h3 class="text-2xl font-semibold text-[#1c241b]">
          Tailored <em>{featuredService.name}</em>
        </h3>

        <div class="flex items-center space-x-2 text-xs font-medium text-[#1c241b]/80 bg-[#eae7df] px-3 py-1 rounded-full w-fit">
          <Clock class="w-3.5 h-3.5 text-[#1b2a1a]" />
          <span>Estimated Time: {featuredService.duration}</span>
          <span class="font-bold text-[#1c241b] ml-2">৳{featuredService.price}</span>
        </div>

        <p class="text-xs text-[#1c241b]/70 font-normal leading-relaxed">
          {featuredService.description}
        </p>

        <div class="pt-2">
          <button
            on:click={() => openBookingWithService(featuredService)}
            class="bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium px-6 py-3 rounded-full transition-all text-xs flex items-center space-x-2 shadow-xs group"
          >
            <span>BOOK THIS CUT (৳{featuredService.price})</span>
            <ArrowUpRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

    </div>

    <div class="space-y-6 pt-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 class="text-lg font-semibold text-[#1c241b]">Full Service Menu</h3>
        <div class="flex flex-wrap gap-2">
          {#each serviceCategories as cat}
            <button
              on:click={() => activeCategory = cat}
              class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
              {activeCategory === cat ? 'bg-[#1b2a1a] text-white' : 'bg-[#f4f2ea] text-[#1c241b] hover:bg-[#dfdcd2]'}"
            >
              {cat}
            </button>
          {/each}
        </div>
      </div>

      <div bind:this={menuGridRef} class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each filteredServices as service (service.id)}
          <div class="bg-[#f4f2ea] p-6 rounded-2xl border border-[#d2cebf]/60 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1b2a1a]/40 transition-colors">
            <div class="space-y-3">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-base font-semibold text-[#1c241b]">{service.name}</h4>
                  <span class="text-[11px] text-[#6b7569]">{service.duration}</span>
                </div>
                <span class="text-lg font-semibold text-[#1c241b]">৳{service.price}</span>
              </div>

              <p class="text-xs text-[#1c241b]/70 leading-relaxed">{service.highlights}</p>
            </div>

            <button
              on:click={() => openBookingWithService(service)}
              class="w-full bg-white hover:bg-[#1b2a1a] text-[#1c241b] hover:text-white font-medium py-2.5 rounded-xl border border-[#d2cebf] transition-colors text-xs"
            >
              Book Service
            </button>
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>
