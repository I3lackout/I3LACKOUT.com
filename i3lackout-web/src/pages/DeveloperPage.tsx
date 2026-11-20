import { ArrowRight, Code2, Cpu, Layers } from 'lucide-react';
import { m } from 'motion/react';
import { Link } from 'react-router-dom';
import { DeveloperSubnav } from '../components/layout/DeveloperSubnav';
import { SectionHeading } from '../components/ui/SectionHeading';
import { UniverseBadge } from '../components/ui/UniverseBadge';
import { getDeveloperProfile } from '../data/developer';
import { useLanguage } from '../i18n/LanguageContext';

export function DeveloperPage() {
  const { locale, t } = useLanguage();
  const profile = getDeveloperProfile(locale);

  return (
    <div className="i3-grid-backdrop py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <DeveloperSubnav />

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <UniverseBadge universe="developer" />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#B4B4CC]">
            {profile.philosophy}
          </span>
        </div>

        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <SectionHeading
            id="developer-heading"
            as="h1"
            accent="cyan"
            eyebrow={t.developerPages.developer.eyebrow}
            title={profile.roleTitle}
            description={profile.intro}
          />
        </m.div>

        <div
          className="mb-10 flex flex-wrap gap-2.5"
          aria-label={t.developerPages.developer.coreTechAriaLabel}
        >
          {profile.coreTechnologies.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-[#00E5FF]/35 bg-[#121215] px-3.5 py-1.5 font-mono text-xs font-semibold text-[#00E5FF]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {profile.milestones.map((milestone) => (
            <article
              key={milestone.id}
              className="i3-card rounded-2xl border-[#00E5FF]/20 p-6 transition duration-200"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]">
                {milestone.eyebrow}
              </p>
              <h2 className="mt-2 text-lg font-bold text-[#F5F5FA]">{milestone.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">{milestone.summary}</p>
            </article>
          ))}
        </div>

        <section
          aria-labelledby="philosophy-heading"
          className="i3-card mt-10 rounded-2xl border-[#00E5FF]/25 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
                {t.developerPages.developer.philosophyEyebrow}
              </p>
              <h2 id="philosophy-heading" className="mt-1 text-2xl font-bold text-[#F5F5FA]">
                {profile.philosophy}
              </h2>
            </div>
            <Code2 className="h-7 w-7 text-[#00E5FF]" aria-hidden="true" />
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {profile.philosophyPillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className="rounded-xl border border-white/10 bg-[#090909]/85 p-5"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
                  0{index + 1} // {pillar.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#B4B4CC]">{pillar.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Link
            to="/projects"
            className="i3-card group flex items-center justify-between rounded-xl p-5 transition"
          >
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-[#00E5FF]" aria-hidden="true" />
              <span className="font-semibold text-[#F5F5FA]">
                {t.developerPages.developer.quickLinkProjects}
              </span>
            </div>
            <ArrowRight
              className="h-4 w-4 text-[#B4B4CC] transition group-hover:text-[#00E5FF]"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/certifications"
            className="i3-card group flex items-center justify-between rounded-xl p-5 transition"
          >
            <div className="flex items-center gap-3">
              <Code2 className="h-5 w-5 text-[#00E5FF]" aria-hidden="true" />
              <span className="font-semibold text-[#F5F5FA]">
                {t.developerPages.developer.quickLinkCertifications}
              </span>
            </div>
            <ArrowRight
              className="h-4 w-4 text-[#B4B4CC] transition group-hover:text-[#00E5FF]"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/tech-stack"
            className="i3-card group flex items-center justify-between rounded-xl p-5 transition"
          >
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-[#00E5FF]" aria-hidden="true" />
              <span className="font-semibold text-[#F5F5FA]">
                {t.developerPages.developer.quickLinkTechStack}
              </span>
            </div>
            <ArrowRight
              className="h-4 w-4 text-[#B4B4CC] transition group-hover:text-[#00E5FF]"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
