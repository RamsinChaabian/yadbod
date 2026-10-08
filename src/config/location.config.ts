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
} as const;

export type LocationConfig = typeof locationConfig;