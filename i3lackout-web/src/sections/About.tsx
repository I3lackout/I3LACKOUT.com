import { AudioLines } from 'lucide-react';
import { ARTIST_CONFIG } from '../data/artist';
import { useLanguage } from '../i18n/LanguageContext';
import { SectionHeading } from '../components/ui/SectionHeading';

export function About() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-white/10 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="about-heading"
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          description={t.about.headline}
        />

        <div className="grid items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <figure className="i3-card overflow-hidden rounded-2xl">
              {ARTIST_CONFIG.aboutImageUrl ? (
                <img
                  src={ARTIST_CONFIG.aboutImageUrl}
                  alt={ARTIST_CONFIG.aboutImageAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              ) : (
                <div className="i3-grid-backdrop flex aspect-[4/5] w-full flex-col items-center justify-center bg-gradient-to-b from-[#1C0D12] to-[#090909] p-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#DC143C]/60 bg-[#090909] text-[#FF2020] shadow-[0_0_24px_rgba(255,23,68,0.22)]">
                    <AudioLines className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-[#FF6B7A]">
                    {t.about.visualBadge}
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-[#B8B8C4]">
                    {t.about.visualCaptionNote}
                  </p>
                </div>
              )}
              <figcaption className="border-t border-white/10 px-5 py-3 font-mono text-xs text-[#B8B8C4]">
                {ARTIST_CONFIG.name} · {ARTIST_CONFIG.subtitle}
              </figcaption>
            </figure>
          </div>

          <div className="space-y-6 lg:col-span-7">
            <article className="i3-card rounded-2xl p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-[#FFFFFF]">{t.about.headline}</h3>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-[#B8B8C4]">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <div className="grid gap-4 sm:grid-cols-3">
              {t.about.pillars.map((pillar) => (
                <article key={pillar.eyebrow} className="i3-card rounded-2xl p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF6B7A]">
                    {pillar.eyebrow}
                  </p>
                  <h4 className="mt-2 text-base font-bold text-[#FFFFFF]">{pillar.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-[#B8B8C4]">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
