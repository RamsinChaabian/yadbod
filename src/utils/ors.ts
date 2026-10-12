/**
 * توابع کمکی برای فراخوانی OpenRouteService
 * مشترک بین MapModule و ARModule
 */

export interface RouteResult {
  distanceMeters: number;
  durationSeconds: number;
  coordinates: [number, number][];
}

export type RouteProfile = 'foot-walking' | 'driving-car' | 'cycling-regular';

/**
 * دریافت مسیر از ORS با timeout و error handling بهتر
 */
export async function fetchRoute(
  from: [number, number],
  to: [number, number],
  profile: RouteProfile = 'foot-walking'
): Promise<RouteResult> {
  const key = import.meta.env.PUBLIC_ORS_API_KEY;

  if (!key) {
    throw new Error('کلید OpenRouteService در متغیرهای محیطی تنظیم نشده است.');
  }

  const url = `https://api.openrouteservice.org/v2/directions/${profile}/geojson`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000); // ۲۰ ثانیه

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: key,
        Accept: 'application/geo+json, application/json',
      },
      body: JSON.stringify({
        coordinates: [
          [from[1], from[0]],
          [to[1], to[0]],
        ],
        instructions: false,
        preference: 'recommended',
        units: 'm',
      }),
    });
  } catch (err) {
    clearTimeout(timeout);

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('زمان انتظار برای پاسخ سرور مسیریابی به پایان رسید. لطفاً اتصال اینترنت را بررسی کنید.');
    }

    console.error('[ORS] fetch error:', err);
    throw new Error(
      'ارتباط با سرور مسیریابی برقرار نشد. این می‌تواند به دلیل قطعی موقت اینترنت، محدودیت شبکه، یا فیلتر باشد. لطفاً دوباره تلاش کنید.'
    );
  } finally {
    clearTimeout(timeout);
  }

  // بررسی خطاهای HTTP
  if (!res.ok) {
    let errorDetail = '';
    try {
      const errData = await res.json();
      errorDetail = errData?.error?.message || errData?.message || '';
    } catch {
      errorDetail = await res.text().catch(() => '');
    }

    if (res.status === 401 || res.status === 403) {
      throw new Error('کلید OpenRouteService نامعتبر است یا دسترسی ندارد.');
    }
    if (res.status === 429) {
      throw new Error('محدودیت تعداد درخواست. لطفاً کمی صبر کنید و دوباره تلاش کنید.');
    }
    if (res.status === 404 || res.status === 400) {
      throw new Error(`مسیری برای این مقصد یافت نشد. ${errorDetail}`);
    }

    throw new Error(
      `خطای سرویس مسیریابی (${res.status}). ${errorDetail || 'لطفاً بعداً امتحان کنید.'}`
    );
  }

  // پارس پاسخ
  let data: any;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error('پاسخ سرور مسیریابی قابل خواندن نبود.');
  }

  const feature = data?.features?.[0];
  if (!feature || !feature.geometry?.coordinates) {
    throw new Error('مسیری برای این مقصد یافت نشد. لطفاً از فاصله‌ی نزدیک‌تری تلاش کنید.');
  }

  return {
    distanceMeters: feature.properties?.summary?.distance ?? 0,
    durationSeconds: feature.properties?.summary?.duration ?? 0,
    coordinates: feature.geometry.coordinates as [number, number][],
  };
}

export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} متر`;
  return `${(meters / 1000).toFixed(1)} کیلومتر`;
}

export function formatDuration(seconds: number): string {
  const totalMin = Math.round(seconds / 60);
  if (totalMin < 60) return `${totalMin} دقیقه`;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return m === 0 ? `${h} ساعت` : `${h} ساعت و ${m} دقیقه`;
}