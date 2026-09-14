<script>
  import { onMount } from 'svelte';
  import { portfolioItems } from '../data/portfolio';
  import { Heart } from 'lucide-svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef;
  let headerRef;
  let gridRef;

  let activeFilter = 'All';

  const categories = ['All', 'Skin Fades', 'Beard Shaping', 'Classic Cuts', 'Hair Designs'];

  $: filteredItems = activeFilter === 'All'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeFilter);

  function setFilter(cat) {
    activeFilter = cat;
    if (gridRef) {
      gsap.fromTo(gridRef.children, 
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
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

      gsap.from(gridRef.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef,
          start: 'top 85%'
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  });
</script>

<section id="portfolio" bind:this={sectionRef} class="py-20 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div bind:this={headerRef} class="text-center max-w-xl mx-auto space-y-2">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">PORTFOLIO</span>
      <h2 class="text-3xl sm:text-4xl font-semibold text-[#1c241b]">Our Craft &amp; Styles</h2>
      <p class="text-xs text-[#1c241b]/70 leading-relaxed">
        Explore recent cuts, skin fades, and beard work crafted by our master barbers.
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      {#each categories as cat}
        <button
          on:click={() => setFilter(cat)}
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all
          {activeFilter === cat ? 'bg-[#1b2a1a] text-white shadow-xs' : 'bg-[#f4f2ea] text-[#1c241b] hover:bg-[#dfdcd2]'}"
        >
          {cat}
        </button>
      {/each}
    </div>

    <div bind:this={gridRef} class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each filteredItems as item (item.id)}
        <div class="bg-[#f4f2ea] rounded-3xl overflow-hidden border border-[#d2cebf]/60 shadow-xs group hover:border-[#1b2a1a]/40 transition-colors">
          <div class="relative h-64 overflow-hidden bg-[#dfdcd2]">
            <img
              src={item.image}
              alt={item.title}
              class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-[#1c241b] flex items-center space-x-1 shadow-xs">
              <Heart class="w-3 h-3 fill-rose-500 text-rose-500" />
              <span>{item.likes}</span>
            </div>
          </div>

          <div class="p-5 space-y-1">
            <span class="text-[10px] font-semibold uppercase text-[#6b7569]">{item.category}</span>
            <h3 class="text-base font-semibold text-[#1c241b]">{item.title}</h3>
            <p class="text-xs text-[#1c241b]/70">Barber: <strong class="text-[#1c241b]">{item.barber}</strong></p>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>
