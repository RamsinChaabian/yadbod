export type TabId = 'biography' | 'gallery' | 'timeline' | 'navigate' | 'candles' | 'contacts';

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
    { id: 'candles',   label: 'شمع‌ها',      icon: 'candle',   enabled: true, order: 5, ariaLabel: 'دیوار شمع‌ها' },
    { id: 'contacts',  label: 'تماس',       icon: 'phone',    enabled: true, order: 6, ariaLabel: 'تماس با اقوام' },
  ] as TabConfig[],
} as const;

export type TabsConfig = typeof tabsConfig;