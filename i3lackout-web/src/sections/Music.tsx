import { Disc3, ExternalLink } from 'lucide-react';
import { ARTIST_CONFIG } from '../data/artist';
import { useLanguage } from '../i18n/LanguageContext';
import { MUSICCHAIN_FALLBACK_DATA } from '../integrations/musicchaini3/fallback';
import type {
  MusicChainDataSource,
  MusicChainRelease,
} from '../integrations/musicchaini3/types';
import { GlowButton } from '../components/ui/GlowButton';
import { SectionHeading } from '../components/ui/SectionHeading';

interface MusicProps {
  releases?: MusicChainRelease[];
  isLoading?: boolean;
  dataSource?: MusicChainDataSource;
}

export function Music({
  releases = MUSICCHAIN_FALLBACK_DATA.releases,
  isLoading = false,
  dataSource = 'fallback',
}: MusicProps) {
  const { t } = useLanguage();

  return (
    <section
      id="music"
      aria-labelledby="music-heading"
      className="border-b border-white/10 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="music-heading"
          eyebrow={t.music.eyebrow}
          title={t.music.title}
          description={t.music.description}
          action={
            <div className="flex items-center gap-3">
              {dataSource === 'api' || dataSource === 'cache' ? (
                <span
                  data-testid="music-source-badge"
                  className="rounded-full border border-[#DC143C]/60 bg-[#121215] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#FF6B7A]"
                >
                  {dataSource === 'cache' ? t.music.cachedLabel : t.music.syncedLabel}
                </span>
              ) : null}
              <GlowButton href={ARTIST_CONFIG.platformFrontpageUrl} variant="ghost">
                <span>{t.music.cta}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </GlowButton>
            </div>
          }
        />

        <div className="i3-card mb-8 grid overflow-hidden rounded-2xl lg:grid-cols-12">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6B7A]">
              {t.music.promoEyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-[#FFFFFF]">
              {t.music.promoTitle}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#B8B8C4] sm:text-base">
              {t.music.promoBody}
            </p>
            <div className="mt-6">
              <GlowButton href={ARTIST_CONFIG.promoUrl} variant="primary">
                <span>{t.music.promoCta}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </GlowButton>
            </div>
          </div>
          <a
            href={ARTIST_CONFIG.promoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="I3LACKOUT Track Cover 2 — Red Edition"
            className="relative block min-h-[220px] lg:col-span-5"
          >
            <img
              src="/images/track-cover-2.png"
              alt="I3LACKOUT Track Cover 2 — Red Edition"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#090909] via-transparent to-transparent lg:bg-gradient-to-l"
            />
          </a>
        </div>

        {isLoading && releases.length === 0 ? (
          <div
            data-testid="music-loading-state"
            aria-busy="true"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[0, 1, 2].map((slot) => (
              <div key={slot} className="i3-card overflow-hidden rounded-2xl p-5">
                <div className="aspect-square w-full rounded-xl bg-[#090909]" />
                <div className="mt-4 h-4 w-24 rounded bg-white/10" />
                <div className="mt-3 h-5 w-3/4 rounded bg-white/15" />
              </div>
            ))}
          </div>
        ) : releases.length === 0 ? (
          <div data-testid="music-empty-state" className="i3-card rounded-2xl p-8 sm:p-10">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#DC143C]/55 bg-[#090909] text-[#FF2020]">
                  <Disc3 className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#FFFFFF]">{t.music.emptyTitle}</h3>
                  <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#B8B8C4]">
                    {t.music.emptyBody}
                  </p>
                </div>
              </div>

              <GlowButton href={ARTIST_CONFIG.platformFrontpageUrl} variant="secondary">
                <span>{t.music.emptyCta}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </GlowButton>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="music-release-grid">
            {releases.map((release) => (
              <article
                key={release.id}
                className="i3-card flex flex-col overflow-hidden rounded-2xl transition duration-200"
              >
                <div className="relative aspect-square w-full overflow-hidden border-b border-white/10 bg-[#090909]">
                  {release.coverUrl ? (
                    <img
                      src={release.coverUrl}
                      alt={`Cover-Artwork für ${release.title}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#1C0D12] via-[#090909] to-[#260910] p-6 text-center">
                      <Disc3 className="h-10 w-10 text-[#FF2020]" aria-hidden="true" />
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#B8B8C4]">
                        {t.music.coverPlaceholder}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-xs uppercase tracking-wider text-[#FF6B7A]">
                      <span>{release.releaseType}</span>
                      {release.releaseDate ? (
                        <span className="text-[#B8B8C4]">{release.releaseDate}</span>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-lg font-bold text-[#FFFFFF]">{release.title}</h3>
                    {release.genre || release.bpm ? (
                      <p className="mt-2 text-xs text-[#B8B8C4]">
                        {[release.genre, release.bpm ? `${release.bpm} BPM` : null]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    ) : null}
                  </div>

                  {release.platformUrl || release.soundcloudUrl ? (
                    <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-3">
                      {release.platformUrl ? (
                        <a
                          href={release.platformUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B7A] hover:text-[#00E5FF] hover:underline"
                        >
                          <span>{t.music.openTrack}</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                      {release.soundcloudUrl ? (
                        <a
                          href={release.soundcloudUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#FF6B7A] hover:text-[#00E5FF] hover:underline"
                        >
                          <span>SoundCloud</span>
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
