/**
 * تنظیمات SEO و متا تگ‌ها
 */
export const seoConfig = {
  metaTitle: 'یادبود نجیه رویشدزاده',
  metaDescription: 'سایت یادبود نجیه رویشدزاده — زندگی‌نامه، خاطرات، تایم‌لاین و مسیریابی به محل قبر.',
  keywords: ['یادبود', 'نجیه رویشدزاده', 'شوشتر', 'خاطرات'],
  ogImage: '/images/og-default.webp',
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  twitterSite: null as string | null,
  logo: '/images/logo.webp',
  jsonLd: true,
  indexable: true,
} as const;

export type SeoConfig = typeof seoConfig;