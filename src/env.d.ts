/// <reference types="@vite-pwa/astro/client" />

/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_ORS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}