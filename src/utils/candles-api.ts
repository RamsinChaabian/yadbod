/**
 * API wrapper برای دیوار شمع‌ها
 * کامپوننت‌ها نباید مستقیم fetch بزنند — از این لایه عبور می‌کنند.
 */
import { candlesConfig } from '../config/candles.config';

export interface Candle {
  id: number;
  name: string;
  created_at: string;
}

export interface CandleListResponse {
  candles: Candle[];
  total: number;
}

export interface CandleCreateResponse {
  id: number;
  name: string;
  created_at: string;
}

export interface CandleError {
  error: string;
}

/**
 * دریافت لیست شمع‌ها و تعداد کل
 */
export async function fetchCandles(): Promise<CandleListResponse> {
  const res = await fetch(`${candlesConfig.apiUrl}/api/candles`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error('خطا در دریافت لیست شمع‌ها');
  }

  return (await res.json()) as CandleListResponse;
}

/**
 * روشن کردن شمع جدید
 */
export async function createCandle(
  name: string,
  turnstileToken: string
): Promise<CandleCreateResponse> {
  const res = await fetch(`${candlesConfig.apiUrl}/api/candles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ name, turnstileToken }),
  });

  if (!res.ok) {
    let errorMessage = 'خطا در روشن کردن شمع';
    try {
      const err = (await res.json()) as CandleError;
      if (err.error) errorMessage = err.error;
    } catch {
      // نادیده بگیر — از پیام پیش‌فرض استفاده می‌شود
    }
    throw new Error(errorMessage);
  }

  return (await res.json()) as CandleCreateResponse;
}

/**
 * فیلتر شمع‌های ۳۰ روز اخیر
 */
export function filterRecentCandles(candles: Candle[]): Candle[] {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  return candles.filter((c) => new Date(c.created_at).getTime() >= thirtyDaysAgo);
}