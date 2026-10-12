/**
 * توابع کمکی برای فراخوانی OpenRouteService
 * مشترک بین MapModule و ARModule
 */

export interface RouteResult {
  /** فاصله به متر */
  distanceMeters: number;
  /** زمان تقریبی به ثانیه */
  durationSeconds: number;
  /** مختصات مسیر به صورت [lng, lat] */
  coordinates: [number, number][];
}

export type RouteProfile = 'foot-walking' | 'driving-car' | 'cycling-regular';

/**
 * دریافت مسیر از ORS
 * @param from - [lat, lng] مبدأ
 * @param to - [lat, lng] مقصد
 * @param profile - نوع مسیر (پیاده، ماشین، دوچرخه)
 */
export async function fetchRoute(
  from: [number, number],
  to: [number, number],
  profile: RouteProfile = 'foot-walking'
): Promise<RouteResult> {
  const key = import.meta.env.PUBLIC_ORS_API_KEY;
  if (!key) {
    throw new Error('کلید OpenRouteService تنظیم نشده است.');
  }

  const res = await fetch(
    `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: key,
        Accept: 'application/geo+json, application/json',
      },
      body: JSON.stringify({
        // ORS مختصات را به صورت [lng, lat] می‌خواهد
        coordinates: [
          [from[1], from[0]],
          [to[1], to[0]],
        ],
        instructions: false,
        preference: 'recommended',
        units: 'm',
      }),
    }
  );

  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error(
      `خطای سرویس مسیریابی (${res.status}). ${t ? '' : 'لطفاً بعداً امتحان کنید.'}`
    );
  }

  const data = await res.json();
  const feature = data?.features?.[0];
  if (!feature) {
    throw new Error('مسیری برای این مقصد یافت نشد.');
  }

  return {
    distanceMeters: feature.properties?.summary?.distance ?? 0,
    durationSeconds: feature.properties?.summary?.duration ?? 0,
    coordinates: feature.geometry.coordinates as [number, number][],
  };
}

/** فرمت‌بندی فاصله (متر → خوانا) */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} متر`;
  return `${(meters / 1000).toFixed(1)} کیلومتر`;
}

/** فرمت‌بندی زمان (ثانیه → «X دقیقه») */
export function formatDuration(seconds: number): string {
  const totalMin = Math.round(seconds / 60);
  if (totalMin < 60) return `${totalMin} دقیقه`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h} ساعت` : `${h} ساعت و ${m} دقیقه`;
}