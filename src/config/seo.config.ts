/**
 * تنظیمات SEO و متا تگ‌ها
 */
export const seoConfig = {
  metaTitle: 'یادبود نجیه رویشدزاده',
  metaDescription: 'سایت یادبود نجیه رویشدزاده — زنی که زندگی را آموخت، برای حقیقت و عدالت ایستاد و امید را از دل بیرون نکرد.',
  keywords: ['یادبود', 'نجیه رویشدزاده', 'شوشتر', 'خاطرات', 'آزادی', 'عدالت'],
  ogImage: '/images/og-default.webp',
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  twitterSite: null as string | null,
  logo: '/images/logo.webp',
  jsonLd: true,
  indexable: true,
} as const;

export type SeoConfig = typeof seoConfig;