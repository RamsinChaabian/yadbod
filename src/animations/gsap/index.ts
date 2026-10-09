/**
 * راه‌انداز همه‌ی انیمیشن‌های GSAP
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeaderAnimation } from './header';
import { initTabAnimations } from './tabs';
import { initTimelineAnimation } from './timeline';
import { initGalleryAnimation } from './gallery';
import { prefersReducedMotion } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export async function initAnimations(): Promise<void> {
  if (prefersReducedMotion()) {
    document
      .querySelectorAll<HTMLElement>(
        '[data-anim-cover], [data-anim-avatar], [data-anim-name], [data-anim-dates], [data-anim-bio]'
      )
      .forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    return;
  }

  // ⭐ سبک‌سازی ScrollTrigger
  ScrollTrigger.normalizeScroll(false);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  gsap.defaults({ ease: 'power2.out', duration: 0.6 });

  // ⭐ فقط انیمیشن هدر در بار اول
  initHeaderAnimation();

  // ⭐ بقیه با requestIdleCallback
  const w = window as Window & { requestIdleCallback?: (cb: () => void) => void };
  const defer = (fn: () => void) => {
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(fn);
    } else {
      setTimeout(fn, 800);
    }
  };

  defer(() => {
    initTabAnimations();
    initTimelineAnimation();
    initGalleryAnimation();
  });
}

export function destroyAnimations(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.globalTimeline.clear();
}