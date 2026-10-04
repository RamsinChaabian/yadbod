/**
 * مسیرهای public را با base URL ترکیب می‌کند.
 * برای GitHub Pages که base = '/yadbod' است حیاتی است.
 *
 * مثال:
 *   withBase('/images/x.svg')  →  '/yadbod/images/x.svg'
 *   withBase('https://x.com')  →  'https://x.com'  (بدون تغییر)
 */
export function withBase(path: string): string {
  if (!path) return path;

  // URL کامل خارجی
  if (/^https?:\/\//i.test(path)) return path;

  // فقط مسیرهای داخلی را تغییر می‌دهیم
  if (!path.startsWith('/')) return path;

  // BASE_URL معمولاً '/yadbod' یا '/' است
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}