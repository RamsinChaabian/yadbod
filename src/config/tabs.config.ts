/**
 * تنظیمات تب‌ها
 * افزودن/حذف/غیرفعال‌سازی هر تب فقط با ویرایش این فایل ممکن است.
 */
export type TabId = 'biography' | 'gallery' | 'timeline' | 'map' | 'ar' | 'memories';

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
    { id: 'biography', label: 'زندگی‌نامه', icon: 'user',    enabled: true, order: 1, ariaLabel: 'مشاهده زندگی‌نامه' },
    { id: 'gallery',   label: 'خاطرات',    icon: 'image',   enabled: true, order: 2, ariaLabel: 'مشاهده گالری خاطرات' },
    { id: 'timeline',  label: 'تایم‌لاین',  icon: 'clock',   enabled: true, order: 3, ariaLabel: 'مشاهده تایم‌لاین زندگی' },
    { id: 'map',       label: 'مسیریابی',  icon: 'map-pin', enabled: true, order: 4, ariaLabel: 'مسیریابی به محل قبر' },
    { id: 'ar',        label: 'یافتن قبر', icon: 'camera',  enabled: true, order: 5, ariaLabel: 'یافتن قبر با واقعیت افزوده' },
    { id: 'memories',  label: 'خاطره شما', icon: 'heart',   enabled: true, order: 6, ariaLabel: 'اشتراک‌گذاری خاطره شما' },
  ] as TabConfig[],
} as const;

export type TabsConfig = typeof tabsConfig;