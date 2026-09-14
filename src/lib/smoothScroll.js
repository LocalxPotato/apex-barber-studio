import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  lenis = new Lenis({
    duration: 0.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.25,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const rafHandler = (time) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(rafHandler);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis() {
  return lenis;
}

export function scrollToElement(target, options = {}) {
  if (typeof window === 'undefined') return;

  const selector = typeof target === 'string' ? target : null;
  const element = selector ? document.querySelector(selector) : target;

  if (lenis && element) {
    lenis.scrollTo(element, { offset: -70, duration: 0.7, ...options });
  } else if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
