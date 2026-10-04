/**
 * تنظیمات آنالیتیکس
 * فعلاً غیرفعال — در آینده می‌توان Plausible/Umami/GA اضافه کرد.
 */
export const analyticsConfig = {
  enabled: false,
  provider: null as 'plausible' | 'umami' | 'google' | null,
  siteId: null as string | null,
  scriptUrl: null as string | null,
  respectDnt: true,
} as const;

export type AnalyticsConfig = typeof analyticsConfig;