<script>
  import { onMount } from 'svelte';
  import { barbers } from '../data/barbers';
  import { openBookingWithService } from '../stores/bookingStore';
  import { Star, Calendar, Scissors } from 'lucide-svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef;
  let headerRef;
  let teamGridRef;

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

      gsap.from(teamGridRef.children, {
        y: 45,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: teamGridRef,
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  });
</script>

<section id="team" bind:this={sectionRef} class="py-20 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-14">
    
    <div bind:this={headerRef} class="text-center max-w-xl mx-auto space-y-2">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">MASTER CRAFTSMEN</span>
      <h2 class="text-3xl sm:text-4xl font-semibold text-[#1c241b]">Meet Our Barbers</h2>
      <p class="text-xs text-[#1c241b]/70 leading-relaxed">
        Choose your preferred barber based on specialty and technique.
      </p>
    </div>

    <div bind:this={teamGridRef} class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each barbers as barber (barber.id)}
        <div class="bg-[#f4f2ea] rounded-3xl overflow-hidden border border-[#d2cebf]/60 shadow-xs flex flex-col justify-between group hover:border-[#1b2a1a]/40 transition-colors">
          
          <div>
            <div class="relative h-72 overflow-hidden bg-[#dfdcd2]">
              <img
                src={barber.avatar}
                alt={barber.name}
                class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#1c241b] flex items-center space-x-1 shadow-xs">
                <Star class="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{barber.rating}</span>
              </div>

              <div class="absolute bottom-3 left-3 bg-[#1b2a1a] text-white text-[10px] font-medium px-3 py-1 rounded-full">
                {barber.experience}
              </div>
            </div>

            <div class="p-6 space-y-3">
              <div>
                <h3 class="text-xl font-semibold text-[#1c241b]">{barber.name}</h3>
                <p class="text-xs text-[#6b7569] font-medium mt-0.5">{barber.role}</p>
              </div>

              <div class="space-y-2 text-xs text-[#1c241b]/70">
                <p>Specialty: <strong class="text-[#1c241b]">{barber.specialty}</strong></p>
                <p class="text-xs leading-relaxed text-[#1c241b]/70 pt-2 border-t border-[#d2cebf]/40">
                  {barber.bio}
                </p>
              </div>
            </div>
          </div>

          <div class="p-6 pt-0">
            <button
              on:click={() => openBookingWithService(null, barber)}
              class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-2.5 rounded-2xl transition-all flex items-center justify-center space-x-2 text-xs shadow-xs"
            >
              <Calendar class="w-3.5 h-3.5" />
              <span>Book with {barber.name.split(' ')[0]}</span>
            </button>
          </div>

        </div>
      {/each}
    </div>

  </div>
</section>
