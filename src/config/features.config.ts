/**
 * پرچم‌های فعال/غیرفعال کردن قابلیت‌ها
 */
export const featuresConfig = {
  ar: true,
  liveRouting: true,
  gallery: true,
  timeline: true,
  visitorMemories: true,
  qrCode: true,
  threeBackground: false,
  animations: true,
  analytics: false,
  floatingTabBar: true,
  googleMapsFallback: true,
} as const;

export type FeaturesConfig = typeof featuresConfig;