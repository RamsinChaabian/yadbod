/**
 * Haptic Feedback — لرزش ملایم روی دستگاه‌های پشتیبان
 *
 * - Android Chrome: پشتیبانی کامل
 * - iOS Safari: پشتیبانی نمی‌شود (بی‌خطا نادیده گرفته می‌شود)
 * - Desktop: عموماً پشتیبانی نمی‌شود
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/vibrate
 */

/**
 * بررسی پشتیبانی از Vibration API
 */
export function isHapticSupported(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (!('vibrate' in navigator)) return false;
  if (typeof navigator.vibrate !== 'function') return false;
  return true;
}

/**
 * بررسی اینکه کاربر prefers-reduced-motion دارد
 */
function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * اجرای لرزش با الگوی دلخواه
 * @param pattern - یک عدد (میلی‌ثانیه) یا آرایه‌ای از اعداد (لرزش-توقف-لرزش)
 */
export function vibrate(pattern: number | number[]): void {
  if (!isHapticSupported()) return;
  if (prefersReducedMotion()) return;

  try {
    navigator.vibrate(pattern);
  } catch {
    // بعضی از مرورگرها در برخی شرایط خطا می‌دهند — بی‌خطر
  }
}

/**
 * الگوهای آماده برای موقعیت‌های مختلف
 */
export const haptic = {
  /** لرزش بسیار ملایم — برای کلیک‌های معمولی */
  tap: () => vibrate(8),

  /** لرزش ملایم‌تر — برای open/close */
  soft: () => vibrate(5),

  /** دو ضربه کوتاه — برای تأیید */
  confirm: () => vibrate([8, 40, 8]),

  /** یک ضربه متوسط — برای تأکید */
  emphasis: () => vibrate(15),

  /** الگوی موفقیت — برای تکمیل کار */
  success: () => vibrate([10, 30, 10, 30, 20]),

  /** الگوی هشدار — برای خطا */
  warning: () => vibrate([20, 60, 20]),
};