import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  clearMusicChainCache,
  fetchPublicArtistData,
  getMusicChainConfig,
} from '../src/integrations/musicchaini3/client';
import { MUSICCHAIN_FALLBACK_DATA } from '../src/integrations/musicchaini3/fallback';

afterEach(() => {
  clearMusicChainCache();
});

describe('musicchaini3 public read-only client', () => {
  it('stays disabled by default and returns local fallback without calling fetch', async () => {
    const config = getMusicChainConfig({});
    expect(config.enabled).toBe(false);
    expect(config.cacheTtlMs).toBe(60_000);

    const fetchSpy = vi.fn();
    const result = await fetchPublicArtistData(config, fetchSpy as unknown as typeof fetch);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('disabled');
    expect(result.data).toEqual(MUSICCHAIN_FALLBACK_DATA);
  });

  it('returns missing-config fallback when enabled without an explicit publicPath', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '',
    });

    const fetchSpy = vi.fn();
    const result = await fetchPublicArtistData(config, fetchSpy as unknown as typeof fetch);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('missing-config');
    expect(result.data).toEqual(MUSICCHAIN_FALLBACK_DATA);
  });

  it('returns invalid-url fallback when base URL uses an unsupported scheme', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'ftp://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/public/test',
    });

    const result = await fetchPublicArtistData(config);
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('invalid-url');
    expect(result.data).toEqual(MUSICCHAIN_FALLBACK_DATA);
  });

  it('blocks requests to origins outside the configured allowlist', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://untrusted.example.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/public/artist',
    });

    const fetchSpy = vi.fn();
    const result = await fetchPublicArtistData(config, fetchSpy as unknown as typeof fetch);

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    expect(result.reason).toBe('disallowed-origin');
    expect(result.data).toEqual(MUSICCHAIN_FALLBACK_DATA);
  });

  it('handles HTTP errors, network failures, timeouts, and invalid payloads gracefully', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/public/artist',
      VITE_MUSICCHAIN_TIMEOUT_MS: '500',
    });

    const httpErrorFetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
    });
    const httpRes = await fetchPublicArtistData(
      config,
      httpErrorFetch as unknown as typeof fetch,
    );
    expect(httpRes.ok).toBe(false);
    expect(httpRes.reason).toBe('http-error');
    expect(httpRes.statusCode).toBe(503);

    const networkErrorFetch = vi.fn().mockRejectedValue(new Error('Network down'));
    const netRes = await fetchPublicArtistData(
      config,
      networkErrorFetch as unknown as typeof fetch,
    );
    expect(netRes.ok).toBe(false);
    expect(netRes.reason).toBe('network-error');

    const abortErr = new DOMException('Aborted', 'AbortError');
    const timeoutFetch = vi.fn().mockRejectedValue(abortErr);
    const timeoutRes = await fetchPublicArtistData(
      config,
      timeoutFetch as unknown as typeof fetch,
    );
    expect(timeoutRes.ok).toBe(false);
    expect(timeoutRes.reason).toBe('timeout');

    const invalidPayloadFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ unexpected: true }),
    });
    const invalidRes = await fetchPublicArtistData(
      config,
      invalidPayloadFetch as unknown as typeof fetch,
    );
    expect(invalidRes.ok).toBe(false);
    expect(invalidRes.reason).toBe('invalid-payload');
  });

  it('sanitizes unsafe URLs, omits credentials, and caches valid public payloads within TTL', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/public/artist',
      VITE_MUSICCHAIN_CREATOR_SLUG: 'i3lackout',
      VITE_MUSICCHAIN_CACHE_TTL_MS: '60000',
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        creatorProfile: null,
        releases: [
          {
            id: 'r1',
            title: 'Public Release',
            releaseType: 'Single',
            releaseDate: '2026',
            coverUrl: 'javascript:alert(1)',
            platformUrl: 'https://musicchaini3.com/track/1',
            bpm: 134,
          },
        ],
        liveStatus: {
          isLive: false,
          statusLabel: 'Offline',
          events: [
            {
              id: 'ev1',
              title: 'Stream Session',
              dateLabel: '2026-12-01',
              venueOrStream: 'musicchaini3 Live',
              eventUrl: 'data:text/html,bad',
            },
          ],
        },
      }),
    });

    const first = await fetchPublicArtistData(config, mockFetch as unknown as typeof fetch);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://musicchaini3.com/public/artist?creator=i3lackout',
      expect.objectContaining({
        method: 'GET',
        credentials: 'omit',
      }),
    );
    expect(first.ok).toBe(true);
    expect(first.data.source).toBe('api');
    expect(first.data.releases[0].coverUrl).toBeNull();
    expect(first.data.releases[0].platformUrl).toBe('https://musicchaini3.com/track/1');
    expect(first.data.liveStatus.events[0].eventUrl).toBeNull();

    const second = await fetchPublicArtistData(config, mockFetch as unknown as typeof fetch);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(second.ok).toBe(true);
    expect(second.data.source).toBe('cache');
  });

  it('preserves valid cached data when a forced refresh fails', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/api/public/artists/i3lackout',
      VITE_MUSICCHAIN_CREATOR_SLUG: 'i3lackout',
      VITE_MUSICCHAIN_CACHE_TTL_MS: '60000',
    });

    const okFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        creatorProfile: null,
        releases: [
          {
            id: 'r-cached',
            title: 'Cached Track',
            releaseType: 'Single',
            releaseDate: '2026',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/1',
          },
        ],
        liveStatus: {
          isLive: false,
          statusLabel: 'Offline',
          events: [],
        },
      }),
    });

    const initial = await fetchPublicArtistData(config, okFetch as unknown as typeof fetch);
    expect(initial.ok).toBe(true);
    expect(okFetch).toHaveBeenCalledWith(
      'https://musicchaini3.com/api/public/artists/i3lackout',
      expect.any(Object),
    );

    const failingFetch = vi.fn().mockRejectedValue(new Error('Upstream timeout'));
    const refresh = await fetchPublicArtistData(
      config,
      failingFetch as unknown as typeof fetch,
      { bypassCache: true },
    );

    expect(refresh.ok).toBe(false);
    expect(refresh.reason).toBe('network-error');
    expect(refresh.data.source).toBe('cache');
    expect(refresh.data.releases).toHaveLength(1);
    expect(refresh.data.releases[0].title).toBe('Cached Track');
  });

  it('filters out draft, private, deleted, and unpublished releases from API payloads', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/api/public/artists/i3lackout',
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        creatorProfile: null,
        releases: [
          {
            id: 'r-public',
            title: 'Approved Release',
            releaseType: 'Single',
            releaseDate: '2026',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/public',
            status: 'published',
            visibility: 'public',
            isPublic: true,
            published: true,
          },
          {
            id: 'r-draft',
            title: 'Secret Draft',
            releaseType: 'Single',
            releaseDate: '2026',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/draft',
            status: 'draft',
          },
          {
            id: 'r-private',
            title: 'Private Stem',
            releaseType: 'Single',
            releaseDate: '2026',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/private',
            visibility: 'private',
          },
          {
            id: 'r-unpub',
            title: 'Unreleased Track',
            releaseType: 'Single',
            releaseDate: '2026',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/unpub',
            published: false,
            isPublic: false,
          },
          {
            id: 'r-deleted',
            title: 'Deleted Track',
            releaseType: 'Single',
            releaseDate: '2026',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/deleted',
            isDeleted: true,
          },
        ],
        liveStatus: {
          isLive: false,
          statusLabel: 'Offline',
          events: [],
        },
      }),
    });

    const result = await fetchPublicArtistData(config, mockFetch as unknown as typeof fetch);
    expect(result.ok).toBe(true);
    expect(result.data.releases).toHaveLength(1);
    expect(result.data.releases[0].title).toBe('Approved Release');
  });
});
