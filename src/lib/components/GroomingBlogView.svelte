<script>
  import { blogPosts } from '../data/blogPosts';
  import { Clock, ArrowUpRight, X } from 'lucide-svelte';

  let selectedPost = null;
</script>

<div class="py-16 bg-[#eae7df] text-[#1c241b] border-t border-[#d2cebf]/60 min-h-screen">
  <div class="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
    
    <div class="text-center space-y-2 max-w-xl mx-auto">
      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569]">ARTICLES &amp; ADVICE</span>
      <h1 class="text-3xl sm:text-5xl font-semibold text-[#1c241b]">Grooming Blog</h1>
      <p class="text-xs text-[#1c241b]/70">
        Master barber advice on beard routines, fade maintenance, and hair styling products.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each blogPosts as post (post.id)}
        <div class="bg-[#f4f2ea] rounded-3xl overflow-hidden border border-[#d2cebf]/60 shadow-xs flex flex-col justify-between group">
          <div>
            <div class="relative h-52 overflow-hidden bg-[#dfdcd2]">
              <img
                src={post.image}
                alt={post.title}
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-3 left-3 bg-white/90 text-[#1c241b] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#d2cebf]/60 uppercase">
                {post.category}
              </div>
            </div>

            <div class="p-5 space-y-2">
              <div class="flex items-center space-x-2 text-[11px] text-[#6b7569]">
                <span class="flex items-center space-x-1">
                  <Clock class="w-3 h-3 text-[#1b2a1a]" />
                  <span>{post.readTime}</span>
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>

              <h3 class="text-base font-semibold text-[#1c241b]">{post.title}</h3>
              <p class="text-xs text-[#1c241b]/70 leading-relaxed">{post.summary}</p>
            </div>
          </div>

          <div class="p-5 pt-0">
            <button
              on:click={() => selectedPost = post}
              class="text-xs font-semibold uppercase text-[#1c241b] hover:text-[#1b2a1a] flex items-center space-x-1"
            >
              <span>Read Article</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      {/each}
    </div>

  </div>
</div>

{#if selectedPost}
  <div class="fixed inset-0 z-50 bg-[#1c241b]/40 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-[#f4f2ea] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#d2cebf] shadow-xl space-y-4 max-h-[90vh] overflow-y-auto relative text-[#1c241b]">
      <button
        on:click={() => selectedPost = null}
        class="absolute top-6 right-6 p-2 rounded-full bg-[#eae7df] text-[#1c241b]/60 hover:text-[#1c241b]"
      >
        <X class="w-5 h-5" />
      </button>

      <span class="text-[10px] font-semibold uppercase tracking-widest text-[#6b7569] bg-[#eae7df] px-3 py-1 rounded-full border border-[#d2cebf]/60 inline-block">
        {selectedPost.category}
      </span>

      <h2 class="text-2xl font-semibold text-[#1c241b]">{selectedPost.title}</h2>
      
      <div class="text-xs text-[#6b7569] flex items-center space-x-3">
        <span>By {selectedPost.author}</span>
        <span>•</span>
        <span>{selectedPost.date}</span>
      </div>

      <img src={selectedPost.image} alt={selectedPost.title} class="w-full h-60 object-cover rounded-2xl border border-[#d2cebf]/60" />

      <div class="text-xs text-[#1c241b]/80 leading-relaxed space-y-3">
        <p>{selectedPost.content}</p>
      </div>

      <button
        on:click={() => selectedPost = null}
        class="w-full bg-[#1b2a1a] hover:bg-[#283c27] text-white font-medium py-3 rounded-full uppercase text-xs tracking-wider"
      >
        Close Article
      </button>
    </div>
  </div>
{/if}
