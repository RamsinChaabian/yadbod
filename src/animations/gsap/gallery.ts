/**
 * انیمیشن stagger کارت‌های گالری وقتی برای اولین بار ظاهر می‌شوند
 */
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../utils/motion';

export function initGalleryAnimation(): void {
  if (prefersReducedMotion()) return;

  const grid = document.querySelector<HTMLElement>('[data-gallery-grid]');
  if (!grid) return;

  const cards = grid.querySelectorAll<HTMLElement>('[data-memory-card]');
  if (cards.length === 0) return;

  // فقط یک‌بار اجرا شود — با IntersectionObserver
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        gsap.fromTo(
          cards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            clearProps: 'transform',
          }
        );

        obs.disconnect();
      });
    },
    { threshold: 0.15 }
  );

  observer.observe(grid);
}