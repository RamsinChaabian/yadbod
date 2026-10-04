/**
 * بررسی تنظیم prefers-reduced-motion کاربر
 * اگر کاربر انیمیشن کم می‌خواهد، همه انیمیشن‌ها را غیرفعال می‌کنیم.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** اجرای callback فقط اگر کاربر انیمیشن می‌خواهد */
export function ifMotion(cb: () => void): void {
  if (!prefersReducedMotion()) cb();
}