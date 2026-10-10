/**
 * تنظیمات تم: رنگ، فونت، انیمیشن، Liquid Glass
 */
export const themeConfig = {
  colors: {
    obsidian: '#0B0B0C',
    obsidianSoft: '#16161A',
    obsidianElevated: '#1E1E24',
    gold: '#B8915A',
    goldLight: '#D4B483',
    goldDark: '#8C6D3F',
    ivory: '#F5EFE0',
    ivorySoft: '#D8D2C4',
    ivoryMuted: '#9A9488',
    success: '#7A9B76',
    warning: '#C9A227',
    danger: '#9B5A5A',
  },
  font: {
    family: 'Vazirmatn',
    source: 'local' as const,
    baseSize: 16,
    scale: {
      xs: 0.75,
      sm: 0.875,
      base: 1,
      lg: 1.125,
      xl: 1.25,
      '2xl': 1.5,
      '3xl': 1.875,
      '4xl': 2.25,
    },
  },
  touchTargetMin: 44,
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 },

  /**
   * Liquid Glass 2026 — زبان طراحی اپل
   * @see https://www.apple.com/newsroom/2025/06/apple-elevates-the-iphone-experience-with-ios-26/
   */
  glass: {
    /** شدت blur — برای سطوح با شفافیت قوی */
    blur: {
      soft: 16,
      normal: 28,
      strong: 40,
      heavy: 56,
    },
    /** شدت اشباع رنگ — رنگ پس‌زمینه را به شیشه می‌آورد */
    saturation: 180,
    /** شفافیت لایه‌های مختلف (0-1) */
    opacity: {
      /** هدر، فوتر */
      surface: 0.55,
      /** کارت‌های معمولی */
      card: 0.65,
      /** مودال‌ها، Lightbox */
      modal: 0.72,
      /** دکمه‌های شیشه‌ای */
      button: 0.6,
      /** لایه‌های overlay */
      overlay: 0.3,
    },
    /** ضخامت لبه‌ی نور */
    borderWidth: {
      thin: 1,
      normal: 1.5,
      thick: 2,
    },
    /** radius بزرگ برای Liquid Glass */
    radius: {
      sm: 20,
      md: 28,
      lg: 36,
      xl: 44,
      '2xl': 56,
      full: 9999,
    },
  },

  animation: {
    duration: { fast: 0.3, normal: 0.6, slow: 1.2, cinematic: 2.0 },
    ease: {
      out: 'power2.out',
      inOut: 'power2.inOut',
      soft: 'power1.out',
      /** easing مخصوص Liquid Glass — نرم و کشسان */
      liquid: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    respectReducedMotion: true,
  },

  radius: { sm: 4, md: 8, lg: 16, xl: 24, full: 9999 },
} as const;

export type ThemeConfig = typeof themeConfig;