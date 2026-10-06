/**
 * اطلاعات شخص فوت‌شده
 */
export const personConfig = {
  fullName: 'نجیه رویشدزاده',
  birthDateShamsi: '۱۳۳۱/۰۵/۰۸',
  deathDateShamsi: '۱۴۰۵/۰۷/۰۲',
  birthDateGregorian: '1952-07-30',
  deathDateGregorian: '2026-07-24',
  shortBio: 'زنی مهربان، صبور و فداکار که یادش همیشه در قلب ما زنده است.',
  profileImage: '/images/profile-placeholder.svg',
  coverImage: '/images/cover-placeholder.svg',
  imageAlt: 'تصویر نجیه رویشدزاده',
} as const;

export type PersonConfig = typeof personConfig;