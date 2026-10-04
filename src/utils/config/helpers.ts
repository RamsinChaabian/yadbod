/**
 * توابع کمکی برای کار با کانفیگ
 * همه از لایه loader عبور می‌کنند تا type-safe باشند.
 */
import { config } from './loader';

export function getEnabledTabs() {
  return config.tabs.tabs
    .filter((tab) => tab.enabled)
    .sort((a, b) => a.order - b.order);
}

export function getTabById(id: string) {
  return getEnabledTabs().find((tab) => tab.id === id) ?? null;
}

export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature] === true;
}

export function getGoogleMapsUrl(): string {
  return config.location.googleMapsUrl;
}