/**
 * مدیریت مجوزهای AR برای iOS و Android
 *
 * نکات حیاتی:
 * - در iOS، درخواست مجوز DeviceOrientation باید بعد از کلیک کاربر باشد.
 * - در iOS 13+، متد DeviceOrientationEvent.requestPermission() وجود دارد.
 * - در Android، معمولاً مجوز به صورت خودکار داده می‌شود.
 * - دوربین و GPS باید در HTTPS درخواست شوند.
 */

/** درخواست مجوز DeviceOrientation (مخصوص iOS) */
export async function requestDeviceOrientationPermission(): Promise<boolean> {
  // بررسی وجود متد requestPermission (iOS 13+)
  const DOE = DeviceOrientationEvent as unknown as {
    requestPermission?: () => Promise<'granted' | 'denied'>;
  };

  if (typeof DOE.requestPermission === 'function') {
    try {
      const result = await DOE.requestPermission();
      return result === 'granted';
    } catch {
      return false;
    }
  }
  // Android و دسکتاپ — مجوز از قبل داده شده
  return true;
}

/** درخواست مجوز دوربین */
export async function requestCameraPermission(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });
    // stream را بلافاصله متوقف می‌کنیم — فقط برای گرفتن مجوز
    stream.getTracks().forEach((t) => t.stop());
    return true;
  } catch {
    return false;
  }
}

/** درخواست موقعیت GPS */
export function requestGeolocationPermission(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('مرورگر شما از GPS پشتیبانی نمی‌کند.'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      resolve,
      (err) => {
        const msgs: Record<number, string> = {
          1: 'دسترسی به موقعیت رد شد. لطفاً در تنظیمات مرورگر مجوز بدهید.',
          2: 'موقعیت شما در دسترس نیست. لطفاً به فضای باز بروید.',
          3: 'زمان دریافت موقعیت به پایان رسید.',
        };
        reject(new Error(msgs[err.code] ?? 'خطا در دریافت موقعیت.'));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}

/** درخواست همه مجوزها به ترتیب صحیح */
export async function requestAllPermissions(): Promise<{
  camera: boolean;
  orientation: boolean;
  gps: GeolocationPosition | null;
  errors: string[];
}> {
  const errors: string[] = [];

  // ۱. دوربین
  const camera = await requestCameraPermission();
  if (!camera) errors.push('دسترسی به دوربین رد شد.');

  // ۲. جهت‌یاب (بعد از دوربین، چون iOS ترتیب را دوست دارد)
  const orientation = await requestDeviceOrientationPermission();
  if (!orientation) errors.push('دسترسی به سنسور جهت‌یابی رد شد.');

  // ۳. GPS
  let gps: GeolocationPosition | null = null;
  try {
    gps = await requestGeolocationPermission();
  } catch (e) {
    errors.push(e instanceof Error ? e.message : 'خطا در دریافت موقعیت.');
  }

  return { camera, orientation, gps, errors };
}