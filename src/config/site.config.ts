/**
 * تنظیمات کلی سایت
 * این فایل توسط utils/config/loader.ts اعتبارسنجی می‌شود.
 */
export const siteConfig = {
  title: 'یادبود نجیه رویشدزاده',
  description: 'یادبودی برای نجیه رویشدزاده — زنده در یادها',
  lang: 'fa' as const,
  dir: 'rtl' as const,
  locales: ['fa'] as const,
  defaultLocale: 'fa' as const,
  baseUrl: 'https://RamsinChaabian.github.io/yadbod',
  author: 'خانواده رویشدزاده',
  since: 1405,
} as const;

export type SiteConfig = typeof siteConfig;