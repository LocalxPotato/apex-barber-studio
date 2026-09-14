<script>
  import { onMount } from 'svelte';
  import { initSmoothScroll } from './lib/smoothScroll';
  import Navbar from './lib/components/Navbar.svelte';
  import MobileStickyBar from './lib/components/MobileStickyBar.svelte';
  import Hero from './lib/components/Hero.svelte';
  import ServiceMenu from './lib/components/ServiceMenu.svelte';
  import PortfolioGallery from './lib/components/PortfolioGallery.svelte';
  import BarberTeam from './lib/components/BarberTeam.svelte';
  import Reviews from './lib/components/Reviews.svelte';
  import ContactLocation from './lib/components/ContactLocation.svelte';
  import BookingModal from './lib/components/BookingModal.svelte';
  import CartDrawer from './lib/components/CartDrawer.svelte';
  import ToastNotification from './lib/components/ToastNotification.svelte';
  import GiftCardsView from './lib/components/GiftCardsView.svelte';
  import MembershipsView from './lib/components/MembershipsView.svelte';
  import ShopView from './lib/components/ShopView.svelte';
  import PromotionsView from './lib/components/PromotionsView.svelte';
  import FAQView from './lib/components/FAQView.svelte';
  import GroomingBlogView from './lib/components/GroomingBlogView.svelte';
  import CareersView from './lib/components/CareersView.svelte';
  import PoliciesView from './lib/components/PoliciesView.svelte';
  import Footer from './lib/components/Footer.svelte';

  let currentRoute = 'home';
  let isCartOpen = false;

  onMount(() => {
    const lenis = initSmoothScroll();
    return () => {
      if (lenis) lenis.destroy();
    };
  });

  function navigateTo(route) {
    currentRoute = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

<div class="min-h-screen bg-obsidian-900 text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-obsidian-900">
  <ToastNotification />
  <Navbar {currentRoute} {navigateTo} bind:isCartOpen />

  <main class="flex-grow">
    {#if currentRoute === 'home'}
      <Hero />
      <ServiceMenu />
      <PortfolioGallery />
      <BarberTeam />
      <Reviews />
      <ContactLocation />
    {:else if currentRoute === 'gift-cards'}
      <GiftCardsView />
    {:else if currentRoute === 'memberships'}
      <MembershipsView />
    {:else if currentRoute === 'shop'}
      <ShopView bind:isCartOpen />
    {:else if currentRoute === 'promotions'}
      <PromotionsView />
    {:else if currentRoute === 'faq'}
      <FAQView />
    {:else if currentRoute === 'blog'}
      <GroomingBlogView />
    {:else if currentRoute === 'careers'}
      <CareersView />
    {:else if currentRoute === 'policies'}
      <PoliciesView />
    {/if}
  </main>

  <BookingModal />
  <CartDrawer bind:isOpen={isCartOpen} />
  <MobileStickyBar {navigateTo} />
  <Footer {navigateTo} />
</div>
