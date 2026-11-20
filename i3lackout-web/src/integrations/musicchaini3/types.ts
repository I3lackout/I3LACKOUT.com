export type MusicChainDataSource = 'fallback' | 'api' | 'cache';

export interface MusicChainRelease {
  id: string;
  title: string;
  releaseType: 'Single' | 'EP' | 'Album' | 'Remix' | 'Release';
  releaseDate: string | null;
  coverUrl: string | null;
  platformUrl: string | null;
  soundcloudUrl?: string | null;
  bpm?: number | null;
  genre?: string | null;
}

export interface MusicChainCreatorProfile {
  handle: string;
  displayName: string;
  profileUrl: string | null;
  avatarUrl: string | null;
  bio: string | null;
}

export interface MusicChainLiveEvent {
  id: string;
  title: string;
  dateLabel: string;
  venueOrStream: string;
  eventUrl: string | null;
}

export interface MusicChainLiveStatus {
  isLive: boolean | null;
  statusLabel: string;
  events: MusicChainLiveEvent[];
}

export interface MusicChainPublicPayload {
  source: MusicChainDataSource;
  creatorProfile: MusicChainCreatorProfile | null;
  releases: MusicChainRelease[];
  liveStatus: MusicChainLiveStatus;
}

export interface MusicChainClientConfig {
  enabled: boolean;
  apiBaseUrl: string;
  publicPath: string;
  creatorSlug: string;
  timeoutMs: number;
  cacheTtlMs: number;
  allowedOrigins: string[];
}

export type MusicChainFallbackReason =
  | 'disabled'
  | 'missing-config'
  | 'invalid-url'
  | 'disallowed-origin'
  | 'timeout'
  | 'http-error'
  | 'network-error'
  | 'invalid-payload';

export interface MusicChainFetchResult {
  ok: boolean;
  data: MusicChainPublicPayload;
  reason?: MusicChainFallbackReason;
  statusCode?: number;
}
