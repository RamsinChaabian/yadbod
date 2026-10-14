// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://najiye.ir',
  trailingSlash: 'ignore',

  vite: {
    plugins: [tailwindcss()],
    build: {
      chunkSizeWarningLimit: 1000,
    },
  },

  integrations: [
    // ============================================================
    // Sitemap
    // ============================================================
    sitemap({
      filter: (page) => !page.includes('/qr') && !page.includes('/offline'),
    }),

    // ============================================================
    // PWA
    // ============================================================
    AstroPWA({
      registerType: 'autoUpdate',

      // ⭐ فقط فایل‌های ضروری (بدون تصاویر حجیم)
      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'pwa-64x64.png',
        'pwa-192x192.png',
        'apple-touch-icon-180x180.png',
      ],

      manifest: {
        name: 'یادبود نجیه رویشدزاده',
        short_name: 'یادبود نجیه',
        description:
          'سایت یادبود نجیه رویشدزاده — زندگی‌نامه، خاطرات، تایم‌لاین و مسیریابی به محل قبر.',
        lang: 'fa',
        dir: 'rtl',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#E8833A',
        background_color: '#FFF8F0',
        categories: ['lifestyle', 'education'],
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        // ⭐ فقط فایل‌های حیاتی — بدون تصاویر، صدا، یا ویدیو
        globPatterns: ['**/*.{js,css,html,woff2,svg}'],

        // ⭐ حداکثر اندازه فایل: ۱ مگابایت (به جای ۵)
        maximumFileSizeToCacheInBytes: 1 * 1024 * 1024,

        globIgnores: [
          '**/qr/**',
          '**/_astro/*.webp',   // ⭐ تصاویر بهینه‌شده را از precache خارج کن
          '**/_astro/*.png',
          '**/_astro/*.jpg',
        ],

        navigateFallback: '/offline',

        navigateFallbackDenylist: [
          /^\/robots\.txt$/,
          /^\/sitemap.*\.xml$/,
          /^\/manifest\.webmanifest$/,
        ],

        runtimeCaching: [
          // ============================================================
          // ⭐ تصاویر WebP گالری — CacheFirst با کش on-demand
          // ============================================================
          {
            urlPattern: /\/_astro\/.*\.(?:webp|png|jpg|jpeg|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gallery-images',
              expiration: {
                maxEntries: 300,                        // حداکثر ۳۰۰ تصویر
                maxAgeSeconds: 90 * 24 * 60 * 60,       // ۹۰ روز
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ============================================================
          // تصاویر public (فونت، آیکون، placeholder)
          // ============================================================
          {
            urlPattern: /\/images\/.*\.(?:webp|png|jpg|jpeg|svg|avif)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'public-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 90 * 24 * 60 * 60,
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ============================================================
          // فونت‌های Vazirmatn
          // ============================================================
          {
            urlPattern: /\/fonts\/.*\.woff2$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 365 * 24 * 60 * 60,      // ۱ سال
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ============================================================
          // فایل‌های صوتی (پلیر موسیقی)
          // ============================================================
          {
            urlPattern: /\/music\/.*\.(?:mp3|m4a|ogg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'music',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 180 * 24 * 60 * 60,      // ۱۸۰ روز
                purgeOnQuotaError: true,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ============================================================
          // robots.txt
          // ============================================================
          {
            urlPattern: /\/robots\.txt$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'robots-txt',
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 24 * 60 * 60,
              },
              cacheableResponse: { statuses: [200] },
            },
          },

          // ============================================================
          // کاشی‌های OpenStreetMap
          // ============================================================
          {
            urlPattern: /^https:\/\/[a-c]\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'openstreetmap-tiles',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 30 * 24 * 60 * 60,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // ============================================================
          // ORS API — NetworkOnly
          // ============================================================
          {
            urlPattern: /^https:\/\/api\.openrouteservice\.org\/.*/i,
            handler: 'NetworkOnly',
            options: { cacheName: 'ors-api-no-cache' },
          },
        ],
      },

      devOptions: { enabled: false },
    }),
  ],
});