import { useEffect, useMemo, useState } from 'react';
import { fetchPublicArtistData, getMusicChainConfig } from './client';
import { MUSICCHAIN_FALLBACK_DATA } from './fallback';
import type { MusicChainClientConfig, MusicChainPublicPayload } from './types';

export interface UsePublicArtistDataResult {
  data: MusicChainPublicPayload;
  isLoading: boolean;
  usedFallback: boolean;
}

/**
 * Loads public artist data from the MusicChain read-only API when enabled.
 * Falls back synchronously and reliably to MUSICCHAIN_FALLBACK_DATA without blocking rendering.
 */
export function usePublicArtistData(
  overrideData?: MusicChainPublicPayload,
  configOverride?: MusicChainClientConfig,
  fetchImpl: typeof fetch = fetch,
): UsePublicArtistDataResult {
  const defaultConfig = useMemo(() => getMusicChainConfig(), []);
  const rawConfig = configOverride ?? defaultConfig;
  const { enabled, apiBaseUrl, publicPath, creatorSlug, timeoutMs, cacheTtlMs, allowedOrigins } =
    rawConfig;
  const originsKey = allowedOrigins.join(',');

  const effectiveConfig = useMemo<MusicChainClientConfig>(
    () => ({
      enabled,
      apiBaseUrl,
      publicPath,
      creatorSlug,
      timeoutMs,
      cacheTtlMs,
      allowedOrigins: originsKey ? originsKey.split(',') : [],
    }),
    [enabled, apiBaseUrl, publicPath, creatorSlug, timeoutMs, cacheTtlMs, originsKey],
  );

  const configSignature = [
    enabled,
    apiBaseUrl,
    publicPath,
    creatorSlug,
    timeoutMs,
    cacheTtlMs,
    originsKey,
  ].join('|');

  const [fetchedState, setFetchedState] = useState<{
    signature: string;
    data: MusicChainPublicPayload;
    usedFallback: boolean;
  } | null>(null);

  useEffect(() => {
    if (overrideData || !effectiveConfig.enabled) {
      return;
    }

    const controller = new AbortController();
    let active = true;

    void fetchPublicArtistData(effectiveConfig, fetchImpl, {
      signal: controller.signal,
    }).then((result) => {
      if (!active) {
        return;
      }
      setFetchedState({
        signature: configSignature,
        data: result.data,
        usedFallback: !result.ok,
      });
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [overrideData, effectiveConfig, configSignature, fetchImpl]);

  if (overrideData) {
    return {
      data: overrideData,
      isLoading: false,
      usedFallback: overrideData.source === 'fallback',
    };
  }

  if (!effectiveConfig.enabled) {
    return {
      data: MUSICCHAIN_FALLBACK_DATA,
      isLoading: false,
      usedFallback: true,
    };
  }

  const hasResolvedForCurrentConfig = fetchedState?.signature === configSignature;

  return {
    data: hasResolvedForCurrentConfig ? fetchedState.data : MUSICCHAIN_FALLBACK_DATA,
    isLoading: !hasResolvedForCurrentConfig,
    usedFallback: hasResolvedForCurrentConfig ? fetchedState.usedFallback : true,
  };
}
