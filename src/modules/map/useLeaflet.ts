/**
 * منطق نقشه Leaflet + مسیریابی ORS
 * به صورت module جداگانه برای استفاده در MapModule.astro
 */
import { config } from '../../utils/config';

const ORS_KEY = import.meta.env.PUBLIC_ORS_API_KEY as string | undefined;
const ORS_BASE = 'https://api.openrouteservice.org/v2/directions';

export interface RouteResult {
  distanceMeters: number;
  durationSeconds: number;
  coordinates: [number, number][]; // [lng, lat]
}

/**
 * درخواست مسیر از ORS
 * profile: foot-walking | driving-car | cycling-regular
 */
export async function fetchRoute(
  from: [number, number],
  to: [number, number],
  profile: 'foot-walking' | 'driving-car' | 'cycling-regular' = 'driving-car'
): Promise<RouteResult> {
  if (!ORS_KEY) throw new Error('کلید ORS تنظیم نشده است.');

  const url = `${ORS_BASE}/${profile}/geojson`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: ORS_KEY,
      Accept: 'application/geo+json, application/json',
    },
    body: JSON.stringify({
      coordinates: [
        [from[0], from[1]],
        [to[0], to[1]],
      ],
      instructions: false,
      preference: 'recommended',
      units: 'm',
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`ORS error ${res.status}: ${errText || res.statusText}`);
  }

  const data = await res.json();
  const feature = data?.features?.[0];
  if (!feature) throw new Error('پاسخی از ORS دریافت نشد.');

  return {
    distanceMeters: feature.properties?.summary?.distance ?? 0,
    durationSeconds: feature.properties?.summary?.duration ?? 0,
    coordinates: feature.geometry.coordinates as [number, number][],
  };
}

/**
 * موقعیت فعلی کاربر (با Promise)
 */
export function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('مرورگر شما از GPS پشتیبانی نمی‌کند.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, (err) => {
      let msg = 'خطا در دریافت موقعیت.';
      if (err.code === err.PERMISSION_DENIED) msg = 'دسترسی به موقعیت رد شد. لطفاً مجوز بدهید.';
      else if (err.code === err.POSITION_UNAVAILABLE) msg = 'موقعیت شما در دسترس نیست.';
      else if (err.code === err.TIMEOUT) msg = 'زمان دریافت موقعیت به پایان رسید.';
      reject(new Error(msg));
    }, {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 30000,
    });
  });
}

/**
 * فرمت‌بندی فاصله (متر → خوانا)
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} متر`;
  return `${(meters / 1000).toFixed(1)} کیلومتر`;
}

/**
 * فرمت‌بندی زمان (ثانیه → «X دقیقه» یا «X ساعت و Y دقیقه»)
 */
export function formatDuration(seconds: number): string {
  const totalMin = Math.round(seconds / 60);
  if (totalMin < 60) return `${totalMin} دقیقه`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h} ساعت` : `${h} ساعت و ${m} دقیقه`;
}

/**
 * آدرس گوگل مپ با مبدأ کاربر
 */
export function getGoogleMapsDirectionsUrl(
  from: [number, number] | null
): string {
  const dest = `${config.location.latitude},${config.location.longitude}`;
  if (!from) return config.location.googleMapsUrl;
  return `https://www.google.com/maps/dir/?api=1&origin=${from[1]},${from[0]}&destination=${dest}&travelmode=driving`;
}