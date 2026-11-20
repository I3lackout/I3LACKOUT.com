import { ArrowUpRight, Globe, Share2 } from 'lucide-react';
import { GlowButton } from '../components/ui/GlowButton';
import { SectionHeading } from '../components/ui/SectionHeading';
import {
  ARTIST_CONFIG,
  getConfiguredSocialLinks,
  type SocialLinkConfig,
} from '../data/artist';
import { useLanguage } from '../i18n/LanguageContext';

interface SocialHubProps {
  links?: SocialLinkConfig[];
}

export function SocialHub({ links = ARTIST_CONFIG.socialLinks }: SocialHubProps) {
  const { t } = useLanguage();
  const configuredLinks = getConfiguredSocialLinks(links);

  return (
    <section
      id="social"
      aria-labelledby="social-heading"
      className="border-b border-white/10 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="social-heading"
          eyebrow={t.social.eyebrow}
          title={t.social.title}
          description={t.social.description}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <div className="i3-card flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/musicchain-favicon.png"
                  alt="musicchaini3 Logo"
                  className="h-10 w-10 rounded-xl border border-white/10 bg-[#090909] object-cover"
                />
                <img
                  src="/images/musicchain-app.png"
                  alt="musicchaini3 App"
                  className="h-10 w-10 rounded-xl border border-white/10 bg-[#090909] object-cover"
                />
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
                {t.social.portalEyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#F5F5FA]">
                {ARTIST_CONFIG.platformName}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
                {t.social.portalBody}
              </p>
            </div>
            <div className="mt-6">
              <GlowButton href={ARTIST_CONFIG.platformAnalyticsUrl} variant="primary">
                <span>{t.social.portalCta}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </GlowButton>
            </div>
          </div>

          <div className="lg:col-span-7">
            {configuredLinks.length === 0 ? (
              <div
                data-testid="social-empty-state"
                className="i3-card flex h-full flex-col justify-center rounded-2xl p-6 sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#090909] text-[#FF2020]">
                    <Share2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#FFFFFF]">
                      {t.social.emptyTitle}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#B8B8C4]">
                      {t.social.emptyBody}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <ul
                data-testid="social-links-list"
                className="grid gap-4 sm:grid-cols-2"
              >
                {configuredLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="i3-card group flex items-center justify-between rounded-2xl p-5 transition duration-200"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-[#DC143C]/55 bg-[#090909] text-[#00E5FF]">
                          {link.iconUrl ? (
                            <img
                              src={link.iconUrl}
                              alt=""
                              aria-hidden="true"
                              className="h-6 w-6 object-contain"
                              style={
                                link.id === 'github'
                                  ? { filter: 'brightness(0) invert(1)' }
                                  : undefined
                              }
                            />
                          ) : (
                            <Globe className="h-5 w-5" aria-hidden="true" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-[#FFFFFF]">{link.label}</p>
                          {link.handle ? (
                            <p className="text-xs text-[#B8B8C4]">{link.handle}</p>
                          ) : null}
                        </div>
                      </div>
                      <ArrowUpRight
                        className="h-4 w-4 text-[#B8B8C4] transition group-hover:text-[#00E5FF]"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
