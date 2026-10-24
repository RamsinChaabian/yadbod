// src/utils/candleOfflineCache.ts
import { openDB } from 'idb';
import type { CandleRecord } from './supabase';

const DB_NAME = 'yadbod-offline-db';
const STORE_NAME = 'candles';

const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    }
  },
});

// ذخیره لیست شمع‌ها در مرورگر
export async function saveCandlesToCache(candles: CandleRecord[]) {
  try {
    const db = await dbPromise;
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.clear(); // پاک کردن لیست قبلی
    await Promise.all(candles.map((c) => tx.store.put(c)));
    await tx.done;
  } catch (err) {
    console.warn('Failed to save candles to IndexedDB', err);
  }
}

// خواندن لیست شمع‌ها از مرورگر
export async function getCandlesFromCache(): Promise<CandleRecord[]> {
  try {
    const db = await dbPromise;
    const data = await db.getAll(STORE_NAME);
    // مرتب‌سازی بر اساس تاریخ (جدیدترین‌ها اول)
    return data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (err) {
    console.warn('Failed to read candles from IndexedDB', err);
    return [];
  }
}