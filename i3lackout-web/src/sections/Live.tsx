import { CalendarClock, Radio } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import { useLanguage } from '../i18n/LanguageContext';
import { MUSICCHAIN_FALLBACK_DATA } from '../integrations/musicchaini3/fallback';
import type { MusicChainLiveStatus } from '../integrations/musicchaini3/types';

interface LiveProps {
  liveStatus?: MusicChainLiveStatus;
}

export function Live({ liveStatus = MUSICCHAIN_FALLBACK_DATA.liveStatus }: LiveProps) {
  const { t } = useLanguage();
  const hasEvents = liveStatus.events.length > 0;
  const offlineMessage =
    liveStatus.statusLabel === MUSICCHAIN_FALLBACK_DATA.liveStatus.statusLabel
      ? t.live.defaultOfflineMessage
      : liveStatus.statusLabel;

  return (
    <section
      id="live"
      aria-labelledby="live-heading"
      className="border-b border-white/10 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="live-heading"
          eyebrow={t.live.eyebrow}
          title={t.live.title}
          description={t.live.description}
        />

        <div className="i3-card rounded-2xl p-6 sm:p-8" data-testid="live-status-panel">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-[#090909] text-[#B8B8C4]">
                <Radio className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#B8B8C4]">
                  {t.live.statusHeading}
                </p>
                <p className="text-base font-semibold text-[#FFFFFF]">
                  {liveStatus.isLive === true ? t.live.activeLabel : t.live.inactiveLabel}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#090909] px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-[#B8B8C4]">
              <span
                className={`h-2 w-2 rounded-full ${
                  liveStatus.isLive === true
                    ? 'bg-[#FF1744] shadow-[0_0_8px_#FF1744]'
                    : 'bg-[#B8B8C4]/50'
                }`}
                aria-hidden="true"
              />
              {liveStatus.isLive === true ? t.live.liveBadge : t.live.standbyBadge}
            </span>
          </div>

          {!hasEvents ? (
            <div className="mt-6 flex items-start gap-4">
              <CalendarClock
                className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2020]"
                aria-hidden="true"
              />
              <div>
                <p className="text-base font-medium text-[#FFFFFF]">{offlineMessage}</p>
                <p className="mt-1 text-sm text-[#B8B8C4]">{t.live.emptyHint}</p>
              </div>
            </div>
          ) : (
            <ul className="mt-6 divide-y divide-white/10">
              {liveStatus.events.map((eventItem) => (
                <li
                  key={eventItem.id}
                  className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[#00E5FF]">
                      {eventItem.dateLabel}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-[#F5F5FA]">
                      {eventItem.title}
                    </h3>
                    <p className="text-sm text-[#B4B4CC]">{eventItem.venueOrStream}</p>
                  </div>
                  {eventItem.eventUrl ? (
                    <a
                      href={eventItem.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#00E5FF] hover:underline"
                    >
                      {t.live.detailsLink}
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
