import {
  defineConfig,
  minimal2023Preset,
} from '@vite-pwa/assets-generator/config';

export default defineConfig({
  preset: {
    ...minimal2023Preset,
    apple: {
      sizes: [180],
      padding: 0.3,
      resizeOptions: { background: '#FFF8F0' },
    },
    maskable: {
      sizes: [512],
      padding: 0.4,
      resizeOptions: { background: '#E8833A' },
    },
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[64, 'favicon.ico']],
    },
  },
  images: ['public/favicon.svg'],
});