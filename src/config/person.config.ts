/**
 * اطلاعات شخص فوت‌شده
 */
export const personConfig = {
  fullName: 'نجیه رویشدزاده',
  birthDateShamsi: '۱۳۳۱/۰۵/۰۸',
  deathDateShamsi: '۱۴۰۵/۰۷/۰۲',
  birthDateGregorian: '1952-07-30',
  deathDateGregorian: '2026-07-24',
  shortBio: 'زنی که زندگی، بزرگ‌ترین آموزگارش بود؛ برای حقیقت ایستاد و با همه رنج‌ها، امید را از دل بیرون نکرد.',
  profileImage: '/images/profile.jpg',
  coverImage: '/images/cover.jpg',
  imageAlt: 'تصویر نجیه رویشدزاده',
} as const;

export type PersonConfig = typeof personConfig;