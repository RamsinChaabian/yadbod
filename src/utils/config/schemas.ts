/**
 * تمام schemaهای Zod برای اعتبارسنجی کانفیگ‌ها
 * اگر مقدار کانفیگی نامعتبر باشد، build با خطای واضح fail می‌شود.
 */
import { z } from 'zod';

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'رنگ باید hex 6 رقمی باشد');
const shamsiDateRegex = /^[\d۰-۹]{4}\/[\d۰-۹]{2}\/[\d۰-۹]{2}$/;
export const siteConfigSchema = z.object({
  title: z.string().min(1, 'عنوان سایت الزامی است'),
  description: z.string().min(1),
  lang: z.enum(['fa', 'en', 'ar']),
  dir: z.enum(['rtl', 'ltr']),
  locales: z.array(z.enum(['fa', 'en', 'ar'])).min(1),
  defaultLocale: z.enum(['fa', 'en', 'ar']),
  baseUrl: z.url('baseUrl باید URL معتبر باشد'),
  author: z.string().min(1),
  since: z.number().int().positive(),
});

export const personConfigSchema = z.object({
  fullName: z.string().min(1, 'نام کامل الزامی است'),
  birthDateShamsi: z.string().regex(shamsiDateRegex, 'فرمت تاریخ شمسی: YYYY/MM/DD'),
  deathDateShamsi: z.string().regex(shamsiDateRegex, 'فرمت تاریخ شمسی: YYYY/MM/DD'),
  birthDateGregorian: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'فرمت تاریخ میلادی: YYYY-MM-DD'),
  deathDateGregorian: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'فرمت تاریخ میلادی: YYYY-MM-DD'),
  shortBio: z.string().min(1),
  profileImage: z.string().startsWith('/'),
  coverImage: z.string().startsWith('/'),
  imageAlt: z.string().min(1),
});

export const locationConfigSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  altitude: z.number().nullable(),
  defaultZoom: z.number().min(1).max(22),
  cemeteryName: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  country: z.string().min(1),
  fullAddress: z.string().min(1),
  googleMapsUrl: z.url(),
  arRadiusMeters: z.number().positive(),
  arMinAccuracyMeters: z.number().positive(),
});

export const themeConfigSchema = z.object({
  colors: z.object({
    obsidian: hexColor,
    obsidianSoft: hexColor,
    obsidianElevated: hexColor,
    gold: hexColor,
    goldLight: hexColor,
    goldDark: hexColor,
    ivory: hexColor,
    ivorySoft: hexColor,
    ivoryMuted: hexColor,
    success: hexColor,
    warning: hexColor,
    danger: hexColor,
  }),
  font: z.object({
    family: z.string().min(1),
    source: z.enum(['local', 'cdn']),
    baseSize: z.number().min(12).max(24),
    scale: z.record(z.string(), z.number().positive()),
  }),
  touchTargetMin: z.number().min(44, 'حداقل اندازه لمس باید ۴۴px باشد'),
  breakpoints: z.object({
    sm: z.number().int().positive(),
    md: z.number().int().positive(),
    lg: z.number().int().positive(),
    xl: z.number().int().positive(),
  }),
  animation: z.object({
    duration: z.record(z.string(), z.number().positive()),
    ease: z.record(z.string(), z.string()),
    respectReducedMotion: z.boolean(),
  }),
  radius: z.record(z.string(), z.number().nonnegative()),
});

export const tabConfigSchema = z.object({
  id: z.enum(['biography', 'gallery', 'timeline', 'navigate', 'contacts']),
  label: z.string().min(1),
  icon: z.string().min(1),
  enabled: z.boolean(),
  order: z.number().int().nonnegative(),
  ariaLabel: z.string().min(1),
});

export const tabsConfigSchema = z.object({
  tabs: z.array(tabConfigSchema).min(1, 'حداقل یک تب لازم است'),
});

export const featuresConfigSchema = z.object({
  ar: z.boolean(),
  liveRouting: z.boolean(),
  gallery: z.boolean(),
  timeline: z.boolean(),
  visitorMemories: z.boolean(),
  qrCode: z.boolean(),
  threeBackground: z.boolean(),
  animations: z.boolean(),
  analytics: z.boolean(),
  floatingTabBar: z.boolean(),
  googleMapsFallback: z.boolean(),
});

export const seoConfigSchema = z.object({
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  keywords: z.array(z.string()),
  ogImage: z.string().startsWith('/'),
  ogType: z.enum(['website', 'article', 'profile']),
  twitterCard: z.enum(['summary', 'summary_large_image']),
  twitterSite: z.string().nullable(),
  logo: z.string().startsWith('/'),
  jsonLd: z.boolean(),
  indexable: z.boolean(),
});

export const analyticsConfigSchema = z.object({
  enabled: z.boolean(),
  provider: z.enum(['plausible', 'umami', 'google']).nullable(),
  siteId: z.string().nullable(),
  scriptUrl: z.url().nullable(),
  respectDnt: z.boolean(),
});

// ============================================================
// Contacts
// ============================================================

const phoneRegex = /^\+\d{10,15}$/;

export const contactSchema = z.object({
  id: z.string().min(1, 'id الزامی است'),
  name: z.string().min(1, 'نام الزامی است'),
  relation: z.string().min(1, 'نسبت الزامی است'),
  phone: z.string().regex(phoneRegex, 'شماره باید با + شروع شود (مثل +989120000000)'),
  whatsapp: z.string().regex(phoneRegex, 'شماره واتساپ نامعتبر است').nullable(),
  avatar: z.string().min(1, 'آواتار الزامی است'),
  availableHours: z.string().nullable(),
  note: z.string().nullable(),
});

export const contactsConfigSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  contacts: z.array(contactSchema),
});

// ============================================================
// Family Tree
// ============================================================

const familyMemberBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export const familyParentSchema = familyMemberBaseSchema.extend({
  role: z.string().min(1),
  avatar: z.string().min(1),
  relation: z.enum(['father', 'mother']),
});

export const familySiblingSchema = familyMemberBaseSchema.extend({
  gender: z.enum(['male', 'female']),
  isMain: z.boolean().optional(),
});

export const familySpouseSchema = familyMemberBaseSchema.extend({
  role: z.string().min(1),
  avatar: z.string().min(1),
});

export const familyChildSchema = familyMemberBaseSchema.extend({
  gender: z.enum(['male', 'female']),
});

export const familyConfigSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  parents: z.array(familyParentSchema).length(2, 'باید دقیقاً دو والد باشد'),
  siblings: z.array(familySiblingSchema).min(1, 'حداقل یک خواهر یا برادر لازم است'),
  spouse: familySpouseSchema,
  children: z.array(familyChildSchema).min(1),
});