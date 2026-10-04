/**
 * نقطه ورود رسمی به لایه کانفیگ
 * کامپوننت‌ها فقط از اینجا import می‌کنند.
 *
 * مثال استفاده:
 *   import { config } from '../utils/config';
 *   config.person.fullName
 */
export { config } from './loader';
export type { Config } from './loader';
export { getEnabledTabs, getTabById, isFeatureEnabled, getGoogleMapsUrl } from './helpers';