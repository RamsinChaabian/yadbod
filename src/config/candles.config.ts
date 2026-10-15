/**
 * تنظیمات دیوار شمع‌ها
 *
 * برای تغییر API URL یا Site Key، فقط این فایل را ویرایش کنید.
 */
export const candlesConfig = {
  /** فعال/غیرفعال کردن کل ماژول */
  enabled: true,

  /** آدرس API روی Cloudflare Workers */
  apiUrl: 'https://yadbod-api.ramsin-chaabian.workers.dev',

  /** Site Key مربوط به Turnstile */
  turnstileSiteKey: '0x4AAAAAAAWFW3_B0ZN1FCtOzD',

  /** حداکثر تعداد شمع قابل نمایش */
  maxDisplay: 100,

  /** حداکثر طول نام */
  maxNameLength: 30,

  /** متن‌های UI */
    texts: {
    tabTitle: 'دیوار شمع‌ها',
    tabSubtitle: 'یاد نجیه جان را با روشن کردن یک شمع گرامی بدارید',
    formTitle: 'شمعی روشن کنید',
    namePlaceholder: 'نام شما',
    submitButton: '🕯️ روشن کردن شمع',
    submitButtonLoading: 'در حال روشن کردن...',
    submitButtonWaiting: 'لطفاً صبر کنید…',
    totalLabel: 'تاکنون روشن شده',
    totalUnit: 'شمع',
    wallTitle: 'شمع‌های اخیر (۳۰ روز گذشته)',
    wallRefresh: 'به‌روزرسانی',
    emptyState: 'هنوز شمعی روشن نشده. اولین نفر باشید 🕯️',
    successMessage: 'شمع شما روشن شد. یادش گرامی باد 🕯️',
    unknownUser: 'ناشناس',
    charCounter: 'کاراکتر',
    justNow: 'همین الان',
    minutesAgo: 'دقیقه پیش',
    hoursAgo: 'ساعت پیش',
    daysAgo: 'روز پیش',
    yesterday: 'دیروز',
  },
} as const;

export type CandlesConfig = typeof candlesConfig;