/**
 * انیمیشن ورود هدر — fade + slide آرام و محسوس
 * ترتیب: کاور → آواتار → نام → تاریخ‌ها → بیو
 */
import { gsap } from 'gsap';
import { prefersReducedMotion } from '../../utils/motion';

export function initHeaderAnimation(): void {
  const header = document.querySelector<HTMLElement>('[data-anim-header]');
  if (!header || prefersReducedMotion()) return;

  const cover = header.querySelector('[data-anim-cover]');
  const avatar = header.querySelector('[data-anim-avatar]');
  const name = header.querySelector('[data-anim-name]');
  const dates = header.querySelector('[data-anim-dates]');
  const bio = header.querySelector('[data-anim-bio]');

  // حالت اولیه: همه نامرئی و کمی پایین‌تر
  gsap.set([avatar, name, dates, bio], { opacity: 0, y: 24 });
  gsap.set(cover, { opacity: 0, scale: 1.08 });

  const tl = gsap.timeline({
    defaults: { duration: 1.1, ease: 'power2.out' },
  });

  tl.to(cover, { opacity: 1, scale: 1, duration: 1.6 })
    .to(avatar, { opacity: 1, y: 0, duration: 1.0 }, '-=1.0')
    .to(name, { opacity: 1, y: 0 }, '-=0.7')
    .to(dates, { opacity: 1, y: 0 }, '-=0.85')
    .to(bio, { opacity: 1, y: 0, duration: 1.2 }, '-=0.85');
}