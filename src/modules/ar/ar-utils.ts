/**
 * توابع کمکی AR — محاسبه فاصله، جهت، فرمت‌بندی
 * این فایل هیچ وابستگی به DOM ندارد و می‌تواند جداگانه تست شود.
 */

/** فرمول Haversine — فاصله بین دو نقطه GPS به متر */
export function haversineDistance(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 6371000; // شعاع زمین به متر
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** محاسبه bearing (زاویه نسبت به شمال) از نقطه اول به دوم */
export function calculateBearing(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;
  const dLon = toRad(lon2 - lon1);
  const y = Math.sin(dLon) * Math.cos(toRad(lat2));
  const x =
    Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
    Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

/** فرمت‌بندی فاصله */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} متر`;
  return `${(meters / 1000).toFixed(1)} کیلومتر`;
}

/** آیا دستگاه از AR پشتیبانی می‌کند؟ (بررسی اولیه) */
export function isARSupported(): { supported: boolean; reason?: string } {
  if (typeof window === 'undefined') return { supported: false, reason: 'SSR' };
  if (!('geolocation' in navigator)) {
    return { supported: false, reason: 'مرورگر شما از GPS پشتیبانی نمی‌کند.' };
  }
  if (!('DeviceOrientationEvent' in window)) {
    return { supported: false, reason: 'مرورگر شما از سنسور جهت‌یابی پشتیبانی نمی‌کند.' };
  }
  if (!navigator.mediaDevices?.getUserMedia) {
    return { supported: false, reason: 'مرورگر شما از دوربین پشتیبانی نمی‌کند.' };
  }
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('firefox')) {
    return { supported: false, reason: 'Firefox از AR مبتنی بر مکان پشتیبانی نمی‌کند. لطفاً از Chrome یا Safari استفاده کنید.' };
  }
  return { supported: true };
}