/**
 * تنظیمات تب‌ها
 * افزودن/حذف/غیرفعال‌سازی هر تب فقط با ویرایش این فایل ممکن است.
 */
export type TabId = 'biography' | 'gallery' | 'timeline' | 'navigate' | 'memories';

export interface TabConfig {
  id: TabId;
  label: string;
  icon: string;
  enabled: boolean;
  order: number;
  ariaLabel: string;
}

export const tabsConfig = {
  tabs: [
    { id: 'biography', label: 'زندگی',      icon: 'user',     enabled: true, order: 1, ariaLabel: 'زندگی‌نامه' },
    { id: 'gallery',   label: 'خاطرات',     icon: 'image',    enabled: true, order: 2, ariaLabel: 'گالری خاطرات' },
    { id: 'timeline',  label: 'تایم‌لاین',   icon: 'clock',    enabled: true, order: 3, ariaLabel: 'تایم‌لاین زندگی' },
    { id: 'navigate',  label: 'مسیر و قبر', icon: 'map-pin',  enabled: true, order: 4, ariaLabel: 'مسیریابی و یافتن قبر' },
    { id: 'memories',  label: 'خاطره شما',  icon: 'heart',    enabled: true, order: 5, ariaLabel: 'اشتراک‌گذاری خاطره' },
  ] as TabConfig[],
} as const;

export type TabsConfig = typeof tabsConfig;