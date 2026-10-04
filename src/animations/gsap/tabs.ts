/**
 * Transition بین تب‌ها + refresh ScrollTrigger
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export function initTabAnimations(): void {
  const panels = document.querySelectorAll<HTMLElement>('[data-tab-panel]');

  panels.forEach((panel) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === 'hidden' && !panel.hasAttribute('hidden')) {
          // پنل قابل مشاهده شد
          if (!prefersReducedMotion()) {
            gsap.fromTo(
              panel,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'transform' }
            );
          }

          // مهم: به ScrollTrigger بگو موقعیت‌ها را دوباره حساب کند
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
            console.log('[yadbod-tabs] panel visible, ScrollTrigger refreshed:', panel.dataset.tabPanel);
          });
        }
      });
    });

    observer.observe(panel, { attributes: true });
  });
}