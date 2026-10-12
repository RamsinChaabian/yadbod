/**
 * اطلاعات مکانی قبر و تنظیمات نقشه/AR
 */
export const locationConfig = {
  latitude: 32.04946770441151,
  longitude: 48.87615613639355,
  altitude: null as number | null,
  defaultZoom: 19,
  cemeteryName: 'قبرستان صاحب‌الزمان',
  city: 'شوشتر',
  province: 'خوزستان',
  country: 'ایران',
  fullAddress: 'شوشتر، قبرستان صاحب‌الزمان',
  googleMapsUrl: 'https://www.google.com/maps?q=32.04946770441151,48.87615613639355',
  arRadiusMeters: 20,
  arMinAccuracyMeters: 15,

  // ⭐ تنظیمات مسیر گوی‌دار طلایی
  arGroundPath: {
    /** حداکثر تعداد گوی‌های قابل نمایش (pool size) */
    sphereCount: 20,
    /** فاصله‌ی بین گوی‌ها به متر */
    sphereSpacing: 1.8,
    /** حداکثر فاصله‌ی دید به متر */
    visibleDistanceMeters: 30,
    /** حداقل فاصله (گوی‌های زیر پا مخفی) */
    hiddenDistanceMeters: 1.5,
    /** اندازه‌ی گوی نزدیک (متر) */
    sphereSizeNear: 0.75,
    /** اندازه‌ی گوی دور (متر) */
    sphereSizeFar: 0.35,
    /** سرعت پالس */
    pulseSpeed: 2.2,
    /** رنگ طلایی اصلی */
    color: 0xF5A623,
    /** رنگ هاله‌ی درخشان */
    glowColor: 0xFFD08A,
    /** profile نوع مسیر */
    walkProfile: 'driving-car' as const,
  },
} as const;

export type LocationConfig = typeof locationConfig;