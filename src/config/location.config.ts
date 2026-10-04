/**
 * اطلاعات مکانی قبر و تنظیمات نقشه/AR
 */
export const locationConfig = {
  latitude: 32.0498053,
  longitude: 48.8765405,
  altitude: null as number | null,
  defaultZoom: 19,
  cemeteryName: 'قبرستان صاحب‌الزمان',
  city: 'شوشتر',
  province: 'خوزستان',
  country: 'ایران',
  fullAddress: 'شوشتر، قبرستان صاحب‌الزمان',
  googleMapsUrl: 'https://www.google.com/maps?q=32.0498053,48.8765405',
  arRadiusMeters: 20,
  arMinAccuracyMeters: 15,
} as const;

export type LocationConfig = typeof locationConfig;