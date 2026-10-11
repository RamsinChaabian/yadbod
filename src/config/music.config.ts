/**
 * تنظیمات پلیر موزیک
 *
 * برای افزودن آهنگ جدید، یک آبجکت به آرایه‌ی tracks اضافه کنید.
 * فایل‌ها را در public/music/ قرار دهید و src را با /music/ شروع کنید.
 */
export const musicConfig = {
  /** فعال/غیرفعال کردن کل پلیر */
  enabled: true,

  /** پخش خودکار — مرورگرها معمولاً مسدود می‌کنند */
  autoplay: false,

  /** تکرار خودکار */
  loop: true,

  /** صدای اولیه (0 تا 1) */
  defaultVolume: 0.35,

  /** لیست آهنگ‌ها */
  tracks: [
    {
      id: 'ambient-1',
      title: 'صیاد',
      src: '/music/Alireza-Eftekhari.mp3',
    },
    // {
    //   id: 'ambient-2',
    //   title: 'خاطره',
    //   src: '/music/ambient-2.mp3',
    // },
  ],
} as const;

export type MusicConfig = typeof musicConfig;