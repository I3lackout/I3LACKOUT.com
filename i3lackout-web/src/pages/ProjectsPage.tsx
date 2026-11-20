import { useMemo, useState } from 'react';
import { ExternalLink, Filter, FolderGit2 } from 'lucide-react';
import { m } from 'motion/react';
import { DeveloperSubnav } from '../components/layout/DeveloperSubnav';
import { SectionHeading } from '../components/ui/SectionHeading';
import { UniverseBadge } from '../components/ui/UniverseBadge';
import {
  PROJECTS,
  filterProjects,
  getProjectCategories,
  getProjectTechnologies,
  getProjects,
  resolveProjectExternalUrl,
  type ProjectCategory,
  type ProjectEntry,
} from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

interface ProjectsPageProps {
  projects?: ProjectEntry[];
}

export function ProjectsPage({ projects = PROJECTS }: ProjectsPageProps) {
  const { locale, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'Alle' | ProjectCategory>('Alle');
  const [selectedTech, setSelectedTech] = useState<string>('Alle');

  const localizedProjects = useMemo(() => getProjects(projects, locale), [projects, locale]);
  const categories = useMemo(() => getProjectCategories(localizedProjects), [localizedProjects]);
  const technologies = useMemo(
    () => ['Alle', ...getProjectTechnologies(localizedProjects)],
    [localizedProjects],
  );

  const filteredProjects = useMemo(
    () => filterProjects(localizedProjects, selectedCategory, selectedTech),
    [localizedProjects, selectedCategory, selectedTech],
  );

  return (
    <div className="i3-grid-backdrop py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <DeveloperSubnav />

        <div className="mb-6">
          <UniverseBadge universe="developer" />
        </div>

        <SectionHeading
          id="projects-heading"
          as="h1"
          accent="cyan"
          eyebrow={t.developerPages.projects.eyebrow}
          title={t.developerPages.projects.title}
          description={t.developerPages.projects.description}
        />

        <div
          className="i3-card mb-8 rounded-2xl p-5 sm:p-6"
          aria-label={t.developerPages.projects.filterAriaLabel}
        >
          <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
            <Filter className="h-4 w-4 text-[#00E5FF]" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#B4B4CC]">
              {t.developerPages.projects.categoryLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const active = selectedCategory === category;
                const label = category === 'Alle' ? t.developerPages.projects.allFilter : category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                      active
                        ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                        : 'border-white/10 bg-[#090909] text-[#B8B8C4] hover:border-[#00E5FF]/40 hover:text-[#FFFFFF]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-xs uppercase tracking-[0.18em] text-[#B8B8C4]">
              {t.developerPages.projects.technologyLabel}
            </span>
            {technologies.map((tech) => {
              const active = selectedTech === tech;
              const label = tech === 'Alle' ? t.developerPages.projects.allFilter : tech;
              return (
                <button
                  key={tech}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedTech(tech)}
                  className={`rounded-md border px-2.5 py-1 font-mono text-[11px] transition ${
                    active
                      ? 'border-[#00E5FF] bg-[#00E5FF]/15 text-[#00E5FF]'
                      : 'border-white/10 bg-[#090909] text-[#B8B8C4] hover:border-[#00E5FF]/40 hover:text-[#FFFFFF]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div
            data-testid="projects-empty-state"
            className="i3-card rounded-2xl p-8 text-center"
          >
            <p className="text-base font-semibold text-[#FFFFFF]">
              {t.developerPages.projects.emptyStateTitle}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('Alle');
                setSelectedTech('Alle');
              }}
              className="mt-4 rounded-lg border border-[#00E5FF]/50 bg-[#090909] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00E5FF] hover:border-[#00E5FF]"
            >
              {t.developerPages.projects.resetFilter}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2" data-testid="projects-grid">
            {filteredProjects.map((project, index) => {
              const safeUrl = resolveProjectExternalUrl(project);
              return (
                <m.article
                  key={project.id}
                  data-testid={`project-card-${project.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="i3-card flex flex-col justify-between rounded-2xl border-[#00E5FF]/20 p-6 sm:p-8"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
                        <FolderGit2 className="h-4 w-4" aria-hidden="true" />
                        {project.category}
                      </span>
                      <span className="rounded-full border border-[#00E5FF]/40 bg-[#090909] px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#00E5FF]">
                        {project.stage}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-[#FFFFFF]">{project.name}</h2>
                    <p className="mt-1 font-mono text-xs text-[#B8B8C4]">{project.stageNote}</p>
                    <p className="mt-4 text-sm leading-relaxed text-[#B8B8C4]">
                      {project.summary}
                    </p>

                    <ul className="mt-5 space-y-2 text-sm text-[#FFFFFF]/90">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00E5FF]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/10 bg-[#090909] px-2.5 py-1 font-mono text-xs text-[#B8B8C4]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {safeUrl ? (
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <a
                        href={safeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00E5FF] hover:underline"
                      >
                        <span>
                          {project.externalLabel ?? t.developerPages.projects.defaultExternalLabel}
                        </span>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  ) : null}
                </m.article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
