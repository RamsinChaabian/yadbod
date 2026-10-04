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
  if (/^https?:\/\//i.test(path)) return path;
  if (!path.startsWith('/')) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path}`;
}