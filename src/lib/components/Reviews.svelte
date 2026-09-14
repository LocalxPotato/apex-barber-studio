<script>
  import { onMount } from 'svelte';
  import { toastStore } from '../stores/toastStore';
  import { Star, CheckCircle, MessageSquarePlus, X, ThumbsUp } from 'lucide-svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let sectionRef;
  let summaryRef;
  let cardsRef;

  let reviews = [
    {
      id: 1,
      author: 'Tanvir Hossain',
      rating: 5,
      date: '2 days ago',
      service: 'The Executive Combo',
      barber: 'Tariq Ahmed',
      comment: 'Best barbershop in Mymensingh! Punctual appointment start, extremely clean sanitized equipment, and Tariq gave me the sharpest skin fade.',
      verified: true
    },
    {
      id: 2,
      author: 'Shahriar Rahman',
      rating: 5,
      date: '1 week ago',
      service: 'Beard Trim & Sculpt',
      barber: 'Samir Khan',
      comment: 'Samir is a genius with beard shaping! The hot towel steam and oil massage felt like a spa. Subscribing to their monthly plan.',
      verified: true
    },
    {
      id: 3,
      author: 'Mahmudul Hasan',
      rating: 5,
      date: '2 weeks ago',
      service: 'Standard Haircut',
      barber: 'Razor Ron',
      comment: 'Ron killed the low taper fade! Great vibe, zero waiting time when you book online.',
      verified: true
    }
  ];

  let isWriteReviewOpen = false;
  let newName = '';
  let newRating = 5;
  let newService = 'Standard Haircut';
  let newComment = '';

  function submitReview() {
    if (!newName || !newComment) {
      toastStore.add('Please enter your name and review comment', 'error');
      return;
    }

    const reviewObj = {
      id: Date.now(),
      author: newName,
      rating: newRating,
      date: 'Just now',
      service: newService,
      barber: 'Apex Craftsman',
      comment: newComment,
      verified: true
    };

    reviews = [reviewObj, ...reviews];
    toastStore.add('Thank you! Your review has been submitted.', 'success');
    isWriteReviewOpen = false;
    newName = '';
    newComment = '';
  }

  onMount(() => {
    const ctx = gsap.context(() => {
      gsap.from(summaryRef, {
        y: 35,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: summaryRef,
          start: 'top 85%'
        }
      });

      gsap.from(cardsRef.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef,
          start: 'top 85%'
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  });
</script>

<section id="reviews" bind:this={sectionRef} class="py-20 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 overflow-hidden">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div bind:this={summaryRef} class="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#f4f2ea] p-8 rounded-3xl border border-[#d2cebf]/60 shadow-xs">
      <div class="space-y-1 text-center md:text-left">
        <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">VERIFIED REVIEWS</span>
        <h2 class="text-3xl font-semibold text-[#1c241b]">
          4.9 ★★★★★ Rating <span class="text-[#6b7569] text-xl">(128+ Reviews)</span>
        </h2>
        <p class="text-xs text-[#1c241b]/70">
          Recognized for cleanliness, zero waiting time, and master haircut craft.
        </p>
      </div>

      <button
        on:click={() => isWriteReviewOpen = true}
        class="bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium px-5 py-2.5 rounded-full transition-colors text-xs flex items-center space-x-2 shadow-xs"
      >
        <MessageSquarePlus class="w-4 h-4" />
        <span>Write a Review</span>
      </button>
    </div>

    <div bind:this={cardsRef} class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each reviews as review (review.id)}
        <div class="bg-[#f4f2ea] rounded-3xl p-6 border border-[#d2cebf]/60 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#1b2a1a]/40 transition-colors">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-1 text-amber-500">
                {#each Array(review.rating) as _}
                  <Star class="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                {/each}
              </div>
              <span class="text-[11px] text-[#6b7569]">{review.date}</span>
            </div>

            <p class="text-xs text-[#1c241b]/80 leading-relaxed italic">
              "{review.comment}"
            </p>
          </div>

          <div class="pt-3 border-t border-[#d2cebf]/40 flex items-center justify-between text-xs">
            <div>
              <div class="font-semibold text-[#1c241b] flex items-center space-x-1">
                <span>{review.author}</span>
                {#if review.verified}
                  <CheckCircle class="w-3 h-3 text-emerald-700" />
                {/if}
              </div>
              <div class="text-[11px] text-[#6b7569]">{review.service}</div>
            </div>
            <div class="p-1.5 rounded-full bg-[#eae7df] text-[#1c241b]/60">
              <ThumbsUp class="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      {/each}
    </div>

  </div>
</section>

{#if isWriteReviewOpen}
  <div class="fixed inset-0 z-50 bg-[#1c241b]/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-[#f4f2ea] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#d2cebf] shadow-xl space-y-5 relative">
      <button
        on:click={() => isWriteReviewOpen = false}
        class="absolute top-6 right-6 text-[#1c241b]/60 hover:text-[#1c241b]"
      >
        <X class="w-5 h-5" />
      </button>

      <h3 class="text-xl font-semibold text-[#1c241b]">Leave a Review</h3>

      <div class="space-y-3.5 text-xs">
        <div>
          <label for="revAuthor" class="block font-medium text-[#1c241b] mb-1">Your Name</label>
          <input
            id="revAuthor"
            type="text"
            bind:value={newName}
            placeholder="e.g. Rahul Sharma"
            class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
          />
        </div>

        <div>
          <label for="revRating" class="block font-medium text-[#1c241b] mb-1">Rating</label>
          <div id="revRating" class="flex items-center space-x-1">
            {#each [1, 2, 3, 4, 5] as star}
              <button
                type="button"
                on:click={() => newRating = star}
                class="p-1 text-amber-500"
              >
                <Star class="w-5 h-5 {star <= newRating ? 'fill-amber-500' : 'text-slate-300'}" />
              </button>
            {/each}
          </div>
        </div>

        <div>
          <label for="revComment" class="block font-medium text-[#1c241b] mb-1">Your Comment</label>
          <textarea
            id="revComment"
            bind:value={newComment}
            rows="3"
            placeholder="Share your haircut experience..."
            class="w-full bg-[#eae7df] border border-[#d2cebf] rounded-xl px-3.5 py-2 text-[#1c241b] focus:outline-none"
          ></textarea>
        </div>
      </div>

      <button
        on:click={submitReview}
        class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-3 rounded-full uppercase text-xs tracking-wider"
      >
        Submit Review
      </button>
    </div>
  </div>
{/if}
