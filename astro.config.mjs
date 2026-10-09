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

      includeAssets: [
        'favicon.svg',
        'robots.txt',
        'fonts/**/*.woff2',
        'images/**/*.svg',
        'images/**/*.webp',
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
        // ⭐ 'txt' اضافه شد تا robots.txt هم precache شود
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2,json,txt}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globIgnores: ['**/qr/**'],
        navigateFallback: '/offline',

        // ⭐ فایل‌های خاص از SW مستثنی شوند تا مستقیم از سرور بیایند
        navigateFallbackDenylist: [
          /^\/robots\.txt$/,
          /^\/sitemap.*\.xml$/,
          /^\/manifest\.webmanifest$/,
        ],

        runtimeCaching: [
          // کاشی‌های OpenStreetMap — CacheFirst
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
          // ORS API — NetworkOnly (مسیریابی زنده)
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