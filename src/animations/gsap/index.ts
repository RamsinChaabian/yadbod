/**
 * راه‌انداز همه‌ی انیمیشن‌های GSAP
 * این فایل از BaseLayout صدا زده می‌شود.
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
    // اگر کاربر انیمیشن نمی‌خواهد، فقط همه‌چیز را visible کن
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

  // تنظیمات سراسری GSAP
  ScrollTrigger.normalizeScroll(true);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
  });

  // سرعت پیش‌فرض
  gsap.defaults({ ease: 'power2.out', duration: 0.6 });

  // راه‌اندازی انیمیشن‌ها
  initHeaderAnimation();
  initTabAnimations();
  initTimelineAnimation();
  initGalleryAnimation();
}

/** پاک‌سازی هنگام خروج از صفحه (نظافت حافظه) */
export function destroyAnimations(): void {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  gsap.globalTimeline.clear();
}