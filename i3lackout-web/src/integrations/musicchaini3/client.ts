import { getSafeExternalUrl } from '../../utils/links';
import { MUSICCHAIN_FALLBACK_DATA } from './fallback';
import type {
  MusicChainClientConfig,
  MusicChainCreatorProfile,
  MusicChainFetchResult,
  MusicChainLiveEvent,
  MusicChainLiveStatus,
  MusicChainPublicPayload,
  MusicChainRelease,
} from './types';

const DEFAULT_TIMEOUT_MS = 5000;
const DEFAULT_CACHE_TTL_MS = 60_000;
const DEFAULT_ALLOWED_ORIGINS = ['https://musicchaini3.com', 'https://www.musicchaini3.com'];
const ALLOWED_RELEASE_TYPES = new Set<MusicChainRelease['releaseType']>([
  'Single',
  'EP',
  'Album',
  'Remix',
  'Release',
]);

interface CacheRecord {
  expiresAt: number;
  payload: Omit<MusicChainPublicPayload, 'source'>;
}

const memoryCache = new Map<string, CacheRecord>();

export function clearMusicChainCache(): void {
  memoryCache.clear();
}

function parseNumberInRange(
  raw: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }
  return Math.min(Math.max(parsed, min), max);
}

function parseAllowedOrigins(raw: string | undefined): string[] {
  if (!raw || !raw.trim()) {
    return DEFAULT_ALLOWED_ORIGINS;
  }
  const origins = raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      try {
        return new URL(entry).origin;
      } catch {
        return null;
      }
    })
    .filter((origin): origin is string => origin !== null);

  return origins.length > 0 ? origins : DEFAULT_ALLOWED_ORIGINS;
}

/**
 * Reads the public MusicChain integration configuration from Vite environment variables.
 * Remains disabled by default until a read-only public endpoint is explicitly enabled.
 */
export function getMusicChainConfig(
  env: Record<string, string | undefined> = import.meta.env,
): MusicChainClientConfig {
  const enabled = String(env.VITE_MUSICCHAIN_ENABLED ?? 'false').toLowerCase() === 'true';
  const apiBaseUrl = String(env.VITE_MUSICCHAIN_API_BASE_URL ?? 'https://musicchaini3.com').trim();
  const publicPath = String(env.VITE_MUSICCHAIN_PUBLIC_PATH ?? '').trim();
  const creatorSlug = String(env.VITE_MUSICCHAIN_CREATOR_SLUG ?? '').trim();
  const timeoutMs = parseNumberInRange(env.VITE_MUSICCHAIN_TIMEOUT_MS, DEFAULT_TIMEOUT_MS, 500, 30000);
  const cacheTtlMs = parseNumberInRange(
    env.VITE_MUSICCHAIN_CACHE_TTL_MS,
    DEFAULT_CACHE_TTL_MS,
    0,
    3_600_000,
  );
  const allowedOrigins = parseAllowedOrigins(env.VITE_MUSICCHAIN_ALLOWED_ORIGINS);

  return {
    enabled,
    apiBaseUrl,
    publicPath,
    creatorSlug,
    timeoutMs,
    cacheTtlMs,
    allowedOrigins,
  };
}

function buildPublicEndpointUrl(
  config: MusicChainClientConfig,
): { url: URL; allowed: boolean } | null {
  if (!config.apiBaseUrl || !config.publicPath) {
    return null;
  }

  try {
    const base = new URL(config.apiBaseUrl);
    if (base.protocol !== 'https:' && base.protocol !== 'http:') {
      return null;
    }
    const allowed = config.allowedOrigins.includes(base.origin);
    const normalizedPath = config.publicPath.startsWith('/')
      ? config.publicPath
      : `/${config.publicPath}`;
    const target = new URL(normalizedPath, base);
    const endsWithCreatorSlug =
      Boolean(config.creatorSlug) &&
      normalizedPath.toLowerCase().endsWith(`/${config.creatorSlug.toLowerCase()}`);
    if (config.creatorSlug && !endsWithCreatorSlug) {
      target.searchParams.set('creator', config.creatorSlug);
    }
    return { url: target, allowed };
  } catch {
    return null;
  }
}

function sanitizeOptionalString(value: unknown, maxLength = 240): string | null {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.slice(0, maxLength);
}

const UNPUBLISHED_STATUSES = new Set(['draft', 'private', 'unpublished', 'hidden', 'deleted']);
const UNPUBLISHED_VISIBILITIES = new Set(['private', 'draft', 'unlisted']);

function isReleasePublic(record: Record<string, unknown>): boolean {
  if (record.isPublic === false || record.published === false || record.isDeleted === true) {
    return false;
  }
  const status = typeof record.status === 'string' ? record.status.trim().toLowerCase() : '';
  if (status && UNPUBLISHED_STATUSES.has(status)) {
    return false;
  }
  const visibility =
    typeof record.visibility === 'string' ? record.visibility.trim().toLowerCase() : '';
  if (visibility && UNPUBLISHED_VISIBILITIES.has(visibility)) {
    return false;
  }
  return true;
}

function sanitizeRelease(raw: unknown): MusicChainRelease | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const record = raw as Record<string, unknown>;
  if (!isReleasePublic(record)) {
    return null;
  }
  const id = sanitizeOptionalString(record.id, 100);
  const title = sanitizeOptionalString(record.title, 180);
  if (!id || !title) {
    return null;
  }

  const rawType = typeof record.releaseType === 'string' ? record.releaseType.trim() : 'Release';
  const releaseType = ALLOWED_RELEASE_TYPES.has(rawType as MusicChainRelease['releaseType'])
    ? (rawType as MusicChainRelease['releaseType'])
    : 'Release';

  const bpm =
    typeof record.bpm === 'number' && Number.isFinite(record.bpm) && record.bpm > 0 && record.bpm <= 300
      ? Math.round(record.bpm)
      : null;

  return {
    id,
    title,
    releaseType,
    releaseDate: sanitizeOptionalString(record.releaseDate, 40),
    coverUrl: getSafeExternalUrl(typeof record.coverUrl === 'string' ? record.coverUrl : null),
    platformUrl: getSafeExternalUrl(
      typeof record.platformUrl === 'string' ? record.platformUrl : null,
    ),
    soundcloudUrl: getSafeExternalUrl(
      typeof record.soundcloudUrl === 'string' ? record.soundcloudUrl : null,
    ),
    bpm,
    genre: sanitizeOptionalString(record.genre, 80),
  };
}

function sanitizeCreatorProfile(raw: unknown): MusicChainCreatorProfile | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const record = raw as Record<string, unknown>;
  const handle = sanitizeOptionalString(record.handle, 80);
  const displayName = sanitizeOptionalString(record.displayName, 120);
  if (!handle || !displayName) {
    return null;
  }

  return {
    handle,
    displayName,
    profileUrl: getSafeExternalUrl(
      typeof record.profileUrl === 'string' ? record.profileUrl : null,
    ),
    avatarUrl: getSafeExternalUrl(typeof record.avatarUrl === 'string' ? record.avatarUrl : null),
    bio: sanitizeOptionalString(record.bio, 600),
  };
}

function sanitizeLiveEvent(raw: unknown): MusicChainLiveEvent | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const record = raw as Record<string, unknown>;
  const id = sanitizeOptionalString(record.id, 100);
  const title = sanitizeOptionalString(record.title, 160);
  const dateLabel = sanitizeOptionalString(record.dateLabel, 80);
  const venueOrStream = sanitizeOptionalString(record.venueOrStream, 160);
  if (!id || !title || !dateLabel || !venueOrStream) {
    return null;
  }

  return {
    id,
    title,
    dateLabel,
    venueOrStream,
    eventUrl: getSafeExternalUrl(typeof record.eventUrl === 'string' ? record.eventUrl : null),
  };
}

function sanitizePublicPayload(value: unknown): Omit<MusicChainPublicPayload, 'source'> | null {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const candidate = value as Record<string, unknown>;
  if (!Array.isArray(candidate.releases)) {
    return null;
  }
  if (!candidate.liveStatus || typeof candidate.liveStatus !== 'object') {
    return null;
  }

  const rawLive = candidate.liveStatus as Record<string, unknown>;
  if (!Array.isArray(rawLive.events)) {
    return null;
  }

  const releases = candidate.releases
    .map(sanitizeRelease)
    .filter((item): item is MusicChainRelease => item !== null);

  const events = rawLive.events
    .map(sanitizeLiveEvent)
    .filter((item): item is MusicChainLiveEvent => item !== null);

  const liveStatus: MusicChainLiveStatus = {
    isLive: typeof rawLive.isLive === 'boolean' ? rawLive.isLive : null,
    statusLabel:
      sanitizeOptionalString(rawLive.statusLabel, 200) ??
      MUSICCHAIN_FALLBACK_DATA.liveStatus.statusLabel,
    events,
  };

  return {
    creatorProfile: sanitizeCreatorProfile(candidate.creatorProfile),
    releases,
    liveStatus,
  };
}

function resolveFailureResult(
  cacheKey: string,
  cacheTtlMs: number,
  reason: MusicChainFetchResult['reason'],
  statusCode?: number,
): MusicChainFetchResult {
  if (cacheTtlMs > 0) {
    const cached = memoryCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return {
        ok: false,
        data: {
          ...cached.payload,
          source: 'cache',
        },
        reason,
        statusCode,
      };
    }
  }

  return {
    ok: false,
    data: MUSICCHAIN_FALLBACK_DATA,
    reason,
    statusCode,
  };
}

/**
 * Fetches public, read-only artist data when explicitly enabled, allowlisted, and configured.
 * Sanitizes all URLs and fields, caches valid responses up to cacheTtlMs, preserves valid
 * cached data if a forced refresh fails, never sends cookies or private tokens, and always
 * falls back cleanly to MUSICCHAIN_FALLBACK_DATA.
 */
export async function fetchPublicArtistData(
  config: MusicChainClientConfig = getMusicChainConfig(),
  fetchImpl: typeof fetch = fetch,
  options?: { signal?: AbortSignal; bypassCache?: boolean },
): Promise<MusicChainFetchResult> {
  if (!config.enabled) {
    return {
      ok: false,
      data: MUSICCHAIN_FALLBACK_DATA,
      reason: 'disabled',
    };
  }

  if (!config.apiBaseUrl || !config.publicPath) {
    return {
      ok: false,
      data: MUSICCHAIN_FALLBACK_DATA,
      reason: 'missing-config',
    };
  }

  const endpoint = buildPublicEndpointUrl(config);
  if (!endpoint) {
    return {
      ok: false,
      data: MUSICCHAIN_FALLBACK_DATA,
      reason: 'invalid-url',
    };
  }

  if (!endpoint.allowed) {
    return {
      ok: false,
      data: MUSICCHAIN_FALLBACK_DATA,
      reason: 'disallowed-origin',
    };
  }

  const cacheKey = endpoint.url.toString();
  const now = Date.now();
  if (!options?.bypassCache && config.cacheTtlMs > 0) {
    const cached = memoryCache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      return {
        ok: true,
        data: {
          ...cached.payload,
          source: 'cache',
        },
      };
    }
    if (cached) {
      memoryCache.delete(cacheKey);
    }
  }

  const controller = new AbortController();
  const timerId = globalThis.setTimeout(() => controller.abort(), config.timeoutMs);
  const externalSignal = options?.signal;
  const handleExternalAbort = () => controller.abort();
  externalSignal?.addEventListener('abort', handleExternalAbort, { once: true });

  try {
    const response = await fetchImpl(cacheKey, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      return resolveFailureResult(cacheKey, config.cacheTtlMs, 'http-error', response.status);
    }

    const json: unknown = await response.json();
    const sanitized = sanitizePublicPayload(json);
    if (!sanitized) {
      return resolveFailureResult(cacheKey, config.cacheTtlMs, 'invalid-payload');
    }

    if (config.cacheTtlMs > 0) {
      memoryCache.set(cacheKey, {
        expiresAt: Date.now() + config.cacheTtlMs,
        payload: sanitized,
      });
    }

    return {
      ok: true,
      data: {
        ...sanitized,
        source: 'api',
      },
    };
  } catch (error) {
    const isAbort =
      error instanceof DOMException
        ? error.name === 'AbortError'
        : error instanceof Error && error.name === 'AbortError';

    return resolveFailureResult(
      cacheKey,
      config.cacheTtlMs,
      isAbort ? 'timeout' : 'network-error',
    );
  } finally {
    globalThis.clearTimeout(timerId);
    externalSignal?.removeEventListener('abort', handleExternalAbort);
  }
}
