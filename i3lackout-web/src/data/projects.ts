import type { Locale } from '../i18n/translations';
import { getSafeExternalUrl } from '../utils/links';

export type ProjectCategory = 'Platform' | 'Web & Artist';

export type ProjectDevelopmentStage =
  | 'Aktive Entwicklung'
  | 'Lokale V1.1-Erweiterung';

export interface ProjectEntry {
  id: string;
  name: string;
  category: ProjectCategory;
  stage: ProjectDevelopmentStage;
  stageNote: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  externalUrl: string | null;
  externalLabel: string | null;
}

export const PROJECTS: ProjectEntry[] = [
  {
    id: 'musicchaini3',
    name: 'musicchaini3',
    category: 'Platform',
    stage: 'Aktive Entwicklung',
    stageNote: 'Eigenständig entwickelte Musik- & Creator-Plattform (laufende Weiterentwicklung)',
    summary:
      'Vollständig eigenständig konzipierte und entwickelte Web- und Plattform-Architektur für Musik, Creator-Profile, Interaktionen und Streaming-Workflows.',
    highlights: [
      'Serverseitige Web-Architektur und REST-Schnittstellen auf Basis von Python und Flask',
      'Relationale Datenhaltung mit MariaDB und SQLAlchemy',
      'Mobile-App-Workflows mit React Native / Expo sowie Echtzeit-Ansätze mit WebRTC',
      'Cloud-Staging-Konzepte (Google Cloud) und automatisierte Tests zur Absicherung',
    ],
    technologies: [
      'Python / Flask',
      'MariaDB / SQLAlchemy',
      'React Native / Expo',
      'WebRTC',
      'Google Cloud',
      'REST APIs',
      'Automated Testing',
    ],
    externalUrl: 'https://musicchaini3.com',
    externalLabel: 'Plattform besuchen',
  },
  {
    id: 'i3lackout-web',
    name: 'i3lackout.com (i3lackout-web)',
    category: 'Web & Artist',
    stage: 'Lokale V1.1-Erweiterung',
    stageNote: 'Unabhängiges Artist- & Developer-Frontend im I3-Hybrid-Design',
    summary:
      'Eigenständiges React- und TypeScript-Frontend für das Artist- und Developer-Universum von I3LACKOUT mit vorbereiteter Read-only-Anbindung an musicchaini3.',
    highlights: [
      'Modulares I3-Hybrid-Designsystem (Purple für Music Universe, Cyan für Developer Universe)',
      'Resilienter Fallback-Client ohne Laufzeitabhängigkeit von externen APIs',
      'Barrierearme Navigation, Reduced-Motion-Unterstützung und Vitest-Testabdeckung',
    ],
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Motion', 'Vite', 'Vitest'],
    externalUrl: null,
    externalLabel: null,
  },
];

export function getProjectCategories(projects: ProjectEntry[]): Array<'Alle' | ProjectCategory> {
  const unique = Array.from(new Set(projects.map((p) => p.category)));
  return ['Alle', ...unique];
}

export function getProjectTechnologies(projects: ProjectEntry[]): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.technologies)));
}

export function filterProjects(
  projects: ProjectEntry[],
  category: 'Alle' | ProjectCategory,
  technology: string,
): ProjectEntry[] {
  return projects.filter((project) => {
    const matchesCategory = category === 'Alle' || project.category === category;
    const matchesTech = !technology || technology === 'Alle' || project.technologies.includes(technology);
    return matchesCategory && matchesTech;
  });
}

export function resolveProjectExternalUrl(project: ProjectEntry): string | null {
  return getSafeExternalUrl(project.externalUrl);
}

const PROJECTS_EN_OVERRIDES: Record<
  string,
  Partial<Pick<ProjectEntry, 'stageNote' | 'summary' | 'highlights' | 'externalLabel'>> & {
    localizedStage: string;
  }
> = {
  musicchaini3: {
    localizedStage: 'Active Development',
    stageNote: 'Independently built music & creator platform (ongoing development)',
    summary:
      'Independently designed and engineered web and platform architecture for music releases, creator profiles, interactions and streaming workflows.',
    highlights: [
      'Server-side web architecture and REST interfaces built with Python and Flask',
      'Relational data persistence powered by MariaDB and SQLAlchemy',
      'Mobile app workflows using React Native / Expo alongside real-time WebRTC approaches',
      'Cloud staging concepts (Google Cloud) and automated test coverage',
    ],
    externalLabel: 'Visit platform',
  },
  'i3lackout-web': {
    localizedStage: 'Local Pre-Launch Release',
    stageNote: 'Independent artist & developer frontend in the I3 Hybrid design system',
    summary:
      'Standalone React and TypeScript frontend for I3LACKOUT uniting the Artist and Developer universes with optional read-only musicchaini3 integration.',
    highlights: [
      'Dual-universe I3 Hybrid design system (Purple for Music Universe, Cyan for Developer Universe)',
      'Resilient fallback client with zero runtime dependency on external APIs',
      'Accessible navigation, Reduced-Motion support and Vitest test coverage',
    ],
  },
};

export function getProjects(projects: ProjectEntry[], locale: Locale): ProjectEntry[] {
  if (locale === 'de') {
    return projects;
  }

  return projects.map((project) => {
    const override = PROJECTS_EN_OVERRIDES[project.id];
    if (!override) {
      return project;
    }
    return {
      ...project,
      stage: override.localizedStage as ProjectDevelopmentStage,
      stageNote: override.stageNote ?? project.stageNote,
      summary: override.summary ?? project.summary,
      highlights: override.highlights ?? project.highlights,
      externalLabel: override.externalLabel ?? project.externalLabel,
    };
  });
}
