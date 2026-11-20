/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MUSICCHAIN_ENABLED?: string;
  readonly VITE_MUSICCHAIN_API_BASE_URL?: string;
  readonly VITE_MUSICCHAIN_PUBLIC_PATH?: string;
  readonly VITE_MUSICCHAIN_CREATOR_SLUG?: string;
  readonly VITE_MUSICCHAIN_TIMEOUT_MS?: string;
  readonly VITE_MUSICCHAIN_CACHE_TTL_MS?: string;
  readonly VITE_MUSICCHAIN_ALLOWED_ORIGINS?: string;
  readonly VITE_ARTIST_CONTACT_LABEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
