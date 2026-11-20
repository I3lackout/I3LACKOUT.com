import { Layers } from 'lucide-react';
import { DeveloperSubnav } from '../components/layout/DeveloperSubnav';
import { SectionHeading } from '../components/ui/SectionHeading';
import { UniverseBadge } from '../components/ui/UniverseBadge';
import { getTechStackGroups } from '../data/developer';
import { useLanguage } from '../i18n/LanguageContext';

export function TechStackPage() {
  const { locale, t } = useLanguage();
  const stackGroups = getTechStackGroups(locale);

  return (
    <div className="i3-grid-backdrop py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <DeveloperSubnav />

        <div className="mb-6">
          <UniverseBadge universe="developer" />
        </div>

        <SectionHeading
          id="tech-stack-heading"
          as="h1"
          accent="cyan"
          eyebrow={t.developerPages.techStack.eyebrow}
          title={t.developerPages.techStack.title}
          description={t.developerPages.techStack.description}
        />

        <div className="space-y-10">
          {stackGroups.map((group) => (
            <section
              key={group.id}
              aria-labelledby={`stack-group-${group.id}`}
              className="i3-card rounded-2xl border-[#00E5FF]/20 p-6 sm:p-8"
            >
              <div className="mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]">
                    {group.eyebrow}
                  </p>
                  <h2
                    id={`stack-group-${group.id}`}
                    className="mt-1 text-2xl font-bold text-[#F5F5FA]"
                  >
                    {group.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B4B4CC]">
                    {group.description}
                  </p>
                </div>
                <Layers className="h-6 w-6 shrink-0 text-[#00E5FF]" aria-hidden="true" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-white/10 bg-[#090909]/90 p-5"
                  >
                    <h3 className="text-base font-bold text-[#F5F5FA]">{item.name}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#00E5FF]">
                      {item.context}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#B4B4CC]">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
