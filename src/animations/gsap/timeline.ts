/**
 * انیمیشن رویدادهای تایم‌لاین با ScrollTrigger
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export function initTimelineAnimation(): void {
  if (prefersReducedMotion()) return;

  const items = gsap.utils.toArray<HTMLElement>('[data-timeline-item]');
  console.log('[yadbod-timeline] items found:', items.length);
  if (items.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      isMobile: '(max-width: 640px)',
      isDesktop: '(min-width: 641px)',
    },
    (context) => {
      const { isMobile } = context.conditions as { isMobile: boolean };

      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: isMobile ? 0 : 24,
            y: isMobile ? 20 : 0,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            delay: isMobile ? 0 : i * 0.05,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (items.includes(t.trigger as HTMLElement)) t.kill();
        });
      };
    }
  );

  // مهم: بعد از init، ScrollTrigger را refresh کن
  setTimeout(() => ScrollTrigger.refresh(), 100);
}