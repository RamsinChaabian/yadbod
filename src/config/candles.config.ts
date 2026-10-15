/**
 * تنظیمات دیوار شمع‌ها
 */

const isDev = import.meta.env.DEV;

export const candlesConfig = {
  enabled: true,

  /** در dev به Worker محلی، در prod به Worker واقعی */
  apiUrl: isDev
    ? 'http://127.0.0.1:8787'
    : 'https://yadbod-api.ramsin-chaabian.workers.dev',

  /** در dev از sitekey تستی (همیشه پاس)، در prod از sitekey واقعی */
  turnstileSiteKey: isDev
    ? '1x00000000000000000000AA'      // test key — always passes
    : '0x4AAAAAAAWFW3_B0ZN1FCtOzD',   // real key

  maxDisplay: 100,
  maxNameLength: 30,

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