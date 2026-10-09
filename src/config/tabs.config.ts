export type TabId = 'biography' | 'gallery' | 'timeline' | 'navigate' | 'contacts';

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
    { id: 'gallery',   label: 'گالری',      icon: 'image',    enabled: true, order: 2, ariaLabel: 'گالری تصاویر و ویدیوها' },
    { id: 'timeline',  label: 'تایم‌لاین',   icon: 'clock',    enabled: true, order: 3, ariaLabel: 'تایم‌لاین زندگی' },
    { id: 'navigate',  label: 'مسیر و قبر', icon: 'map-pin',  enabled: true, order: 4, ariaLabel: 'مسیریابی و یافتن قبر' },
    { id: 'contacts',  label: 'تماس',       icon: 'phone',    enabled: true, order: 5, ariaLabel: 'تماس با اقوام' },
  ] as TabConfig[],
} as const;

export type TabsConfig = typeof tabsConfig;