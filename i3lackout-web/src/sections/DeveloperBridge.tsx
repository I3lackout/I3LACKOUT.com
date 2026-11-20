import { ArrowRight, ArrowUpRight, Award, Code2, Cpu, FolderGit2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlowButton } from '../components/ui/GlowButton';
import { SectionHeading } from '../components/ui/SectionHeading';
import { UniverseBadge } from '../components/ui/UniverseBadge';
import { ARTIST_CONFIG } from '../data/artist';
import { useLanguage } from '../i18n/LanguageContext';

const MODULE_ICONS = {
  '/developer': Code2,
  '/projects': FolderGit2,
  '/certifications': Award,
  '/tech-stack': Cpu,
} as const;

export function DeveloperBridge() {
  const { t } = useLanguage();

  return (
    <section
      id="developer-universe"
      aria-labelledby="developer-bridge-heading"
      className="border-b border-white/10 bg-[#090909] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-4">
          <UniverseBadge universe="developer" />
        </div>

        <SectionHeading
          id="developer-bridge-heading"
          accent="cyan"
          eyebrow={t.developerBridge.eyebrow}
          title={t.developerBridge.title}
          description={t.developerBridge.description}
        />

        {/* Featured Project: musicchaini3 */}
        <article className="i3-card mb-8 rounded-2xl border-[#00E5FF]/30 p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#00E5FF]">
                {t.developerBridge.featuredEyebrow}
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#F5F5FA] sm:text-3xl">
                {t.developerBridge.featuredTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC] sm:text-base">
                {t.developerBridge.featuredDescription}
              </p>
            </div>
            <div className="shrink-0">
              <GlowButton href={ARTIST_CONFIG.platformStartUrl} variant="secondary">
                <span>{t.developerBridge.featuredCta}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </GlowButton>
            </div>
          </div>
        </article>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.developerBridge.modules.map((mod) => {
            const Icon = MODULE_ICONS[mod.to];
            return (
              <Link
                key={mod.to}
                to={mod.to}
                className="i3-card group flex flex-col justify-between rounded-2xl border-[#00E5FF]/20 p-6 transition duration-200 hover:border-[#00E5FF]/60"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00E5FF]">
                      {mod.eyebrow}
                    </span>
                    <Icon className="h-5 w-5 text-[#00E5FF]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#F5F5FA]">{mod.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#B4B4CC]">{mod.description}</p>
                </div>

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#00E5FF]">
                  <span>{t.developerBridge.openModule}</span>
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
