import type { Locale } from '../i18n/translations';

export type TechStackCategoryId = 'practical' | 'education' | 'experimental';

export interface TechStackItem {
  id: string;
  name: string;
  context: string;
  description: string;
}

export interface TechStackGroup {
  id: TechStackCategoryId;
  title: string;
  eyebrow: string;
  description: string;
  items: TechStackItem[];
}

export interface DeveloperMilestone {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
}

export interface DeveloperProfileConfig {
  name: string;
  roleTitle: string;
  philosophy: string;
  coreTechnologies: string[];
  intro: string;
  milestones: DeveloperMilestone[];
  philosophyPillars: {
    id: string;
    label: string;
    detail: string;
  }[];
}

export const DEVELOPER_PROFILE: DeveloperProfileConfig = {
  name: 'I3LACKOUT',
  roleTitle: 'Software Developer & Creative Technologist',
  philosophy: 'Music × Code × Technology',
  coreTechnologies: ['Python', 'Flask', 'JavaScript', 'C#'],
  intro:
    'Eigenständige Softwareentwicklung an der Schnittstelle von elektronischer Musik, Web-Architektur und eigener Plattform-Infrastruktur.',
  milestones: [
    {
      id: 'it-training',
      eyebrow: '01 // IT-AUSBILDUNG',
      title: 'Betriebliche IT-Ausbildung mit C# (nicht abgeschlossen)',
      summary:
        'Praxisnahe Grundlagen in objektorientierter Programmierung, strukturierter Anwendungslogik und Software-Entwicklung im C#-Umfeld. Ohne abgeschlossenen Berufsabschluss dokumentiert.',
    },
    {
      id: 'musicchaini3-dev',
      eyebrow: '02 // PLATTFORM-ENTWICKLUNG',
      title: 'Eigenständige Entwicklung von musicchaini3',
      summary:
        'Konzeption und Umsetzung der eigenen Musik- und Creator-Plattform musicchaini3 mit Python, Flask, relationaler Datenhaltung, REST-Schnittstellen und modernen Frontend-Technologien.',
    },
    {
      id: 'creative-tech',
      eyebrow: '03 // CREATIVE TECHNOLOGY',
      title: 'Entwicklungsphilosophie: Music × Code × Technology',
      summary:
        'Verbindung aus eigenständiger Musikproduktion und eigener Software-Architektur — Werkzeuge nicht nur nutzen, sondern gezielt selbst entwerfen und weiterentwickeln.',
    },
  ],
  philosophyPillars: [
    {
      id: 'music',
      label: 'Music',
      detail: 'Künstlerische Identität, Sound Design und direkte Creator-Perspektive.',
    },
    {
      id: 'code',
      label: 'Code',
      detail: 'Nachvollziehbare Architektur in Python, Flask, JavaScript, TypeScript und C#.',
    },
    {
      id: 'technology',
      label: 'Technology',
      detail: 'Unabhängige Plattformen, API-Integrationen und modulare Web-Systeme.',
    },
  ],
};

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    id: 'practical',
    eyebrow: '01 // PRAXIS',
    title: 'Praktisch eingesetzte Technologien',
    description:
      'Technologien, die aktiv bei der Entwicklung von musicchaini3 und i3lackout.com eingesetzt werden.',
    items: [
      {
        id: 'python',
        name: 'Python',
        context: 'Backend & Automatisierung (musicchaini3)',
        description: 'Serverseitige Anwendungslogik, Datenverarbeitung und Skript-Tooling.',
      },
      {
        id: 'flask',
        name: 'Flask',
        context: 'Web-Framework (musicchaini3)',
        description: 'Routing, Templates, API-Endpunkte und modulare Blueprint-Strukturen.',
      },
      {
        id: 'javascript',
        name: 'JavaScript / TypeScript',
        context: 'Frontend & Client-Logik',
        description: 'Interaktive Browser-Komponenten, typisierte React-Frontends und UI-Status.',
      },
      {
        id: 'react',
        name: 'React & Tailwind CSS',
        context: 'i3lackout-web (V1.1)',
        description: 'Komponentenbasierte UI-Architektur mit responsivem Designsystem.',
      },
      {
        id: 'mariadb-sqlalchemy',
        name: 'MariaDB / SQLAlchemy',
        context: 'Persistenz (musicchaini3)',
        description: 'Relationale Datenmodellierung, Abfragen und strukturierte Schema-Pflege.',
      },
      {
        id: 'rest-testing',
        name: 'REST APIs & Automated Testing',
        context: 'Schnittstellen & Qualitätssicherung',
        description: 'Strukturierte Endpunkte sowie automatisierte Testläufe zur Absicherung.',
      },
    ],
  },
  {
    id: 'education',
    eyebrow: '02 // WEITERBILDUNG',
    title: 'Ausbildung / Weiterbildung',
    description:
      'Grundlagen aus der betrieblichen IT-Ausbildung sowie vorläufig dokumentierte Kursthemen (Original-Zertifikate in Prüfung).',
    items: [
      {
        id: 'csharp',
        name: 'C#',
        context: 'Betriebliche IT-Ausbildung (nicht abgeschlossen)',
        description: 'Objektorientierte Grundlagen, Typisierung und strukturierte Programmierung.',
      },
      {
        id: 'web-basics',
        name: 'HTML5, CSS3 & Bootstrap',
        context: 'Weiterbildungsthemen (vorläufig)',
        description: 'Semantisches Markup, Layout-Systeme und responsives Styling.',
      },
      {
        id: 'compiled-languages',
        name: 'C, C++ & Java',
        context: 'Weiterbildungsthemen (vorläufig)',
        description: 'Sprachgrundlagen aus strukturierten Kursmodulen.',
      },
      {
        id: 'ethical-hacking',
        name: 'Ethical Hacking (Grundlagen)',
        context: 'Weiterbildungsthema (vorläufig)',
        description: 'Sensibilisierung für Web-Sicherheit, Angriffsvektoren und Schutzmechanismen.',
      },
    ],
  },
  {
    id: 'experimental',
    eyebrow: '03 // EXPLORATION',
    title: 'Experimentelle Technologien',
    description:
      'Technologien im Ausbau, in Prototypen oder zur gezielten Erweiterung bestehender Systeme.',
    items: [
      {
        id: 'react-native-expo',
        name: 'React Native / Expo',
        context: 'Mobile Exploration (musicchaini3)',
        description: 'Plattformübergreifende mobile Client-Strukturen und Build-Workflows.',
      },
      {
        id: 'webrtc',
        name: 'WebRTC',
        context: 'Echtzeit-Kommunikation',
        description: 'Browserbasierte Peer-to-Peer-Audio- und Streaming-Mechanismen.',
      },
      {
        id: 'google-cloud',
        name: 'Google Cloud',
        context: 'Cloud-Evaluierung & Workflows',
        description: 'Erste Staging-Planung, IAM-Grundlagen und kostenbegrenzte Cloud-Konzepte.',
      },
      {
        id: 'ai-blockchain',
        name: 'Generative AI & Blockchain-Konzepte',
        context: 'Weiterbildung & Architektur-Ideen',
        description: 'Konzeptionelle Auseinandersetzung mit KI-gestützten Workflows und Ledger-Modellen.',
      },
    ],
  },
];

const DEVELOPER_PROFILE_EN: DeveloperProfileConfig = {
  ...DEVELOPER_PROFILE,
  intro:
    'Independent software engineering at the intersection of electronic music, web architecture and custom platform infrastructure.',
  milestones: [
    {
      id: 'it-training',
      eyebrow: '01 // IT TRAINING',
      title: 'Vocational IT Training with C# (not completed)',
      summary:
        'Practical foundations in object-oriented programming, structured application logic and software engineering in the C# ecosystem. Documented transparently without completed vocational degree.',
    },
    {
      id: 'musicchaini3-dev',
      eyebrow: '02 // PLATFORM ENGINEERING',
      title: 'Independent Development of musicchaini3',
      summary:
        'Architecture and implementation of the independent music and creator platform musicchaini3 using Python, Flask, relational persistence, REST interfaces and modern frontend technologies.',
    },
    {
      id: 'creative-tech',
      eyebrow: '03 // CREATIVE TECHNOLOGY',
      title: 'Development Philosophy: Music × Code × Technology',
      summary:
        'Combining independent electronic music production with custom software architecture — not just using existing tools, but designing and building tailored systems.',
    },
  ],
  philosophyPillars: [
    {
      id: 'music',
      label: 'Music',
      detail: 'Artistic identity, sound design and a direct creator perspective.',
    },
    {
      id: 'code',
      label: 'Code',
      detail: 'Transparent architecture in Python, Flask, JavaScript, TypeScript and C#.',
    },
    {
      id: 'technology',
      label: 'Technology',
      detail: 'Independent platforms, API integrations and modular web systems.',
    },
  ],
};

const TECH_STACK_EN_OVERRIDES: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    items: Record<string, { name?: string; context: string; description: string }>;
  }
> = {
  practical: {
    eyebrow: '01 // PRACTICAL USE',
    title: 'Technologies Used in Practice',
    description:
      'Technologies actively used when building musicchaini3 and i3lackout.com.',
    items: {
      python: {
        context: 'Backend & Automation (musicchaini3)',
        description: 'Server-side application logic, data processing and scripting workflows.',
      },
      flask: {
        context: 'Web Framework (musicchaini3)',
        description: 'Routing, templates, API endpoints and modular blueprint architecture.',
      },
      javascript: {
        context: 'Frontend & Client Logic',
        description: 'Interactive browser components, typed React frontends and UI state.',
      },
      react: {
        context: 'i3lackout-web',
        description: 'Component-based UI architecture with a responsive design system.',
      },
      'mariadb-sqlalchemy': {
        context: 'Persistence (musicchaini3)',
        description: 'Relational data modeling, queries and structured schema maintenance.',
      },
      'rest-testing': {
        context: 'Interfaces & Quality Assurance',
        description: 'Structured HTTP endpoints backed by automated test suites.',
      },
    },
  },
  education: {
    eyebrow: '02 // TRAINING & COURSEWORK',
    title: 'Training & Coursework',
    description:
      'Foundations from vocational IT training alongside provisionally documented coursework topics (original certificates pending verification).',
    items: {
      csharp: {
        context: 'Vocational IT Training (not completed)',
        description: 'Object-oriented foundations, static typing and structured programming.',
      },
      'web-basics': {
        context: 'Coursework Topics (provisional)',
        description: 'Semantic markup, layout systems and responsive styling.',
      },
      'compiled-languages': {
        context: 'Coursework Topics (provisional)',
        description: 'Language fundamentals covered in structured course modules.',
      },
      'ethical-hacking': {
        name: 'Ethical Hacking (Foundations)',
        context: 'Coursework Topic (provisional)',
        description: 'Awareness of web security, attack vectors and defensive mechanisms.',
      },
    },
  },
  experimental: {
    eyebrow: '03 // EXPLORATION',
    title: 'Experimental Technologies',
    description:
      'Technologies under active exploration, in prototypes, or extending existing systems.',
    items: {
      'react-native-expo': {
        context: 'Mobile Exploration (musicchaini3)',
        description: 'Cross-platform mobile client structures and build workflows.',
      },
      webrtc: {
        context: 'Real-Time Communication',
        description: 'Browser-based peer-to-peer audio and streaming mechanisms.',
      },
      'google-cloud': {
        context: 'Cloud Evaluation & Workflows',
        description: 'Staging architecture planning, IAM fundamentals and cost-bounded cloud setups.',
      },
      'ai-blockchain': {
        name: 'Generative AI & Blockchain Concepts',
        context: 'Coursework & Architecture Concepts',
        description: 'Conceptual exploration of AI-assisted workflows and ledger models.',
      },
    },
  },
};

export function getDeveloperProfile(locale: Locale): DeveloperProfileConfig {
  return locale === 'en' ? DEVELOPER_PROFILE_EN : DEVELOPER_PROFILE;
}

export function getTechStackGroups(locale: Locale): TechStackGroup[] {
  if (locale === 'de') {
    return TECH_STACK_GROUPS;
  }

  return TECH_STACK_GROUPS.map((group) => {
    const override = TECH_STACK_EN_OVERRIDES[group.id];
    if (!override) {
      return group;
    }
    return {
      ...group,
      eyebrow: override.eyebrow,
      title: override.title,
      description: override.description,
      items: group.items.map((item) => {
        const itemOverride = override.items[item.id];
        if (!itemOverride) {
          return item;
        }
        return {
          ...item,
          name: itemOverride.name ?? item.name,
          context: itemOverride.context,
          description: itemOverride.description,
        };
      }),
    };
  });
}
