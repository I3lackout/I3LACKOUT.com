import { ArrowDownRight, Code2 } from 'lucide-react';
import { m } from 'motion/react';
import { ARTIST_CONFIG } from '../data/artist';
import { useLanguage } from '../i18n/LanguageContext';
import { AudioVisualizer } from '../components/effects/AudioVisualizer';
import { GlowButton } from '../components/ui/GlowButton';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="hero-title"
      className="i3-hero-glow i3-grid-backdrop relative overflow-hidden border-b border-white/10 py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12">
        <m.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[#DC143C]/60 bg-[#121215]/90 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
            <span className="h-2 w-2 rounded-full bg-[#FF1744] shadow-[0_0_8px_#FF1744]" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-4xl font-extrabold tracking-[0.08em] text-[#FFFFFF] sm:text-6xl lg:text-7xl"
          >
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF] to-[#FF2020] bg-clip-text text-transparent">
              {ARTIST_CONFIG.name}
            </span>
          </h1>

          <p className="mt-4 text-xl font-bold tracking-[0.14em] text-[#FF6B7A] sm:text-2xl">
            {t.hero.claim}
          </p>

          <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-[#B8B8C4] sm:text-sm">
            {t.hero.subheadline}
          </p>

          <p className="mt-3 text-sm font-medium text-[#FFFFFF]/95">
            {t.hero.positioning}
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#B8B8C4] sm:text-lg">
            {t.hero.description}
          </p>

          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
            {t.hero.ecosystemTag}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <GlowButton href="#music" variant="primary">
              <span>{t.hero.primaryCta}</span>
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </GlowButton>

            <GlowButton href="#developer-universe" variant="secondary">
              <span>{t.hero.secondaryCta}</span>
              <Code2 className="h-4 w-4" aria-hidden="true" />
            </GlowButton>
          </div>
        </m.div>

        <m.div
          className="space-y-4 lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: 'easeOut' }}
        >
          {ARTIST_CONFIG.aboutImageUrl ? (
            <div className="relative overflow-hidden rounded-2xl border border-[#DC143C]/55 bg-[#121215] shadow-[0_24px_60px_-22px_rgba(255,23,68,0.45)]">
              <img
                src={ARTIST_CONFIG.aboutImageUrl}
                alt={ARTIST_CONFIG.aboutImageAlt}
                loading="eager"
                decoding="async"
                className="aspect-[16/11] w-full object-cover object-[center_28%]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                <span className="text-[#FFFFFF]">ARTIST IDENTITY // {ARTIST_CONFIG.name}</span>
                <span className="inline-flex items-center gap-1.5 text-[#00E5FF]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF1744] shadow-[0_0_8px_#FF1744]" />
                  RED EDITION
                </span>
              </div>
            </div>
          ) : null}
          <AudioVisualizer />
        </m.div>
      </div>
    </section>
  );
}
