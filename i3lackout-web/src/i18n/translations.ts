export type Locale = 'de' | 'en';

export interface TranslationDictionary {
  nav: {
    skipToMain: string;
    music: string;
    about: string;
    development: string;
    live: string;
    social: string;
    press: string;
    developer: string;
    projects: string;
    certifications: string;
    techStack: string;
    openMenu: string;
    closeMenu: string;
    musicUniverse: string;
    developerUniverse: string;
    creatorPortal: string;
    languageLabel: string;
  };
  hero: {
    eyebrow: string;
    positioning: string;
    claim: string;
    subheadline: string;
    ecosystemTag: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    visualizerSpectrum: string;
    visualizerBadge: string;
    visualizerLiveBadge: string;
    visualizerModeAuto: string;
    visualizerModeIdle: string;
    visualizerModeLive: string;
    visualizerModeHint: string;
    visualizerVolumeHint: string;
    visualizerFooterRight: string;
  };
  music: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    emptyTitle: string;
    emptyBody: string;
    emptyCta: string;
    coverPlaceholder: string;
    openTrack: string;
    syncedLabel: string;
    cachedLabel: string;
    promoEyebrow: string;
    promoTitle: string;
    promoBody: string;
    promoCta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    headline: string;
    paragraphs: [string, string];
    visualBadge: string;
    visualCaptionNote: string;
    pillars: {
      eyebrow: string;
      title: string;
      body: string;
    }[];
  };
  live: {
    eyebrow: string;
    title: string;
    description: string;
    statusHeading: string;
    activeLabel: string;
    inactiveLabel: string;
    liveBadge: string;
    standbyBadge: string;
    emptyHint: string;
    detailsLink: string;
    defaultOfflineMessage: string;
  };
  social: {
    eyebrow: string;
    title: string;
    description: string;
    portalEyebrow: string;
    portalBody: string;
    portalCta: string;
    emptyTitle: string;
    emptyBody: string;
  };
  press: {
    eyebrow: string;
    title: string;
    description: string;
    shortBioLabel: string;
    shortBio: string;
    longBioLabel: string;
    longBioHeadline: string;
    longBioParagraphs: [string, string];
    assetsHeading: string;
    assetsEmptyNotice: string;
    downloadLabel: string;
    certificatesHeading: string;
    certificatesEmptyNotice: string;
    contactLabel: string;
    contactPlaceholder: string;
    contactConfiguredBadge: string;
    contactPendingBadge: string;
  };
  developerBridge: {
    eyebrow: string;
    title: string;
    description: string;
    featuredEyebrow: string;
    featuredTitle: string;
    featuredDescription: string;
    featuredCta: string;
    openModule: string;
    modules: {
      to: '/developer' | '/projects' | '/certifications' | '/tech-stack';
      eyebrow: string;
      title: string;
      description: string;
    }[];
  };
  footer: {
    tagline: string;
    music: string;
    about: string;
    development: string;
    press: string;
    impressum: string;
    datenschutz: string;
    copyright: string;
  };
  legal: {
    backHome: string;
    impressumEyebrow: string;
    impressumTitle: string;
    impressumIntro: string;
    datenschutzEyebrow: string;
    datenschutzTitle: string;
    datenschutzIntro: string;
  };
  developerPages: {
    subnavAriaLabel: string;
    subnav: {
      profile: string;
      projects: string;
      certifications: string;
      techStack: string;
    };
    developer: {
      eyebrow: string;
      coreTechAriaLabel: string;
      philosophyEyebrow: string;
      quickLinkProjects: string;
      quickLinkCertifications: string;
      quickLinkTechStack: string;
    };
    projects: {
      eyebrow: string;
      title: string;
      description: string;
      filterAriaLabel: string;
      categoryLabel: string;
      technologyLabel: string;
      allFilter: string;
      emptyStateTitle: string;
      resetFilter: string;
      defaultExternalLabel: string;
    };
    certifications: {
      eyebrow: string;
      title: string;
      description: string;
      pendingEyebrow: string;
      pendingBody: string;
      providerFilterAriaLabel: string;
      searchAriaLabel: string;
      searchPlaceholder: string;
      allFilter: string;
      topicPrefix: string;
      issuedPrefix: string;
      verifyLinkLabel: string;
      documentLinkLabel: string;
      pendingFooter: string;
      emptyTitle: string;
      resetFilter: string;
    };
    techStack: {
      eyebrow: string;
      title: string;
      description: string;
    };
  };
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  de: {
    nav: {
      skipToMain: 'Zum Hauptinhalt springen',
      music: 'Music',
      about: 'About',
      development: 'Development',
      live: 'Live',
      social: 'Social Hub',
      press: 'Press',
      developer: 'Developer',
      projects: 'Projects',
      certifications: 'Certifications',
      techStack: 'Tech Stack',
      openMenu: 'Navigation öffnen',
      closeMenu: 'Navigation schließen',
      musicUniverse: 'Music Universe',
      developerUniverse: 'Developer Universe',
      creatorPortal: 'Creator Portal · musicchaini3',
      languageLabel: 'Sprache wechseln',
    },
    hero: {
      eyebrow: 'INDEPENDENT ARTIST × DEVELOPER',
      positioning: 'Independent Electronic Music Artist · Software Developer · Digital Creator',
      claim: 'NO SOFT MODE.',
      subheadline: 'JUST SOUND. PRESSURE. IMPACT.',
      ecosystemTag: 'Music × Technology × Innovation',
      description:
        'Druckvolle elektronische Musik trifft auf unabhängige Technologie. Gebaut für Energie, Experimente und puren klanglichen Druck.',
      primaryCta: 'EXPLORE THE MUSIC',
      secondaryCta: 'DISCOVER THE CODE',
      visualizerSpectrum: 'I3 HYBRID // ABSTRACT SPECTRUM',
      visualizerBadge: 'DECORATIVE',
      visualizerLiveBadge: 'LIVE // REACTIVE',
      visualizerModeAuto: 'AUTO',
      visualizerModeIdle: 'IDLE',
      visualizerModeLive: 'LIVE',
      visualizerModeHint: 'Visualizer-Modus wechseln: Auto, Idle oder Live',
      visualizerVolumeHint: 'Audio-Vorschau ein/aus — spielt QuizeD → LIZED → ZentreMizeD → RyzeD',
      visualizerFooterRight: 'PULSE // STATIC-SAFE',
    },
    music: {
      eyebrow: '01 // RELEASES',
      title: 'TURN UP THE PRESSURE.',
      description:
        'Schwere Sounds. Rohe Energie. Keine unnötigen Grenzen. Entdecke die offiziellen I3LACKOUT-Releases über musicchaini3.',
      cta: 'LISTEN ON MUSICCHAINI3',
      emptyTitle: 'Noch keine öffentlichen Releases eingebunden',
      emptyBody:
        'Hier erscheinen ausschließlich öffentlich freigegebene Tracks aus der musicchaini3 Public Artist API. Entwürfe, private Tracks oder unveröffentlichte Inhalte werden nicht angezeigt.',
      emptyCta: 'LISTEN ON MUSICCHAINI3',
      coverPlaceholder: 'Cover-Platzhalter',
      openTrack: 'Auf musicchaini3 hören',
      syncedLabel: 'musicchaini3 · synced',
      cachedLabel: 'musicchaini3 · cached',
      promoEyebrow: 'RED EDITION // PROMO',
      promoTitle: 'BREAK THE SILENCE.',
      promoBody:
        'Das offizielle I3LACKOUT Red-&-Black-Promo-Visual — Artist Identity, Sound und digitale Energie in einem Bild.',
      promoCta: 'ENTDECKE DIE RELEASES',
    },
    about: {
      eyebrow: '02 // ABOUT THE ARTIST',
      title: 'About I3LACKOUT',
      headline: 'Hau-drauf-Mucke. Ohne Kompromisse.',
      paragraphs: [
        'I3LACKOUT steht für druckvolle elektronische Musik, kompromisslose Energie und kreative Experimente. Hier geht es nicht darum, in eine Schublade zu passen, sondern darum, Sound mit Charakter zu schaffen.',
        'Hinter der Musik steckt zugleich die Leidenschaft für Softwareentwicklung und digitale Innovation. Als kreativer Kopf hinter musicchaini3 verbindet I3LACKOUT Musik, Code und Community zu einem eigenständigen kreativen Universum.',
      ],
      visualBadge: 'ARTIST VISUAL // PLACEHOLDER',
      visualCaptionNote:
        'Vorbereiteter Visual-Slot für freigegebene Artist-Porträts und Stage-Visuals.',
      pillars: [
        {
          eyebrow: '01 // SOUND',
          title: 'NO SOFT MODE.',
          body: 'Druckvolle elektronische Musik ohne Genre-Zwänge — gebaut für maximale Energie und kompromisslosen Charakter.',
        },
        {
          eyebrow: '02 // CODE',
          title: 'Independent Technology',
          body: 'Eigene Web-Architektur, Creator-Werkzeuge und experimentelle Software als direktes Gegenstück zur Musikproduktion.',
        },
        {
          eyebrow: '03 // ECOSYSTEM',
          title: 'musicchaini3',
          body: 'Verbindung aus Musik, Code und Community — mit klarer Trennung zwischen öffentlichen Releases und internen Plattformdaten.',
        },
      ],
    },
    live: {
      eyebrow: '03 // LIVE SESSIONS',
      title: 'Live & Termine',
      description:
        'Übersicht für DJ-Sessions und kommende Termine. Solange keine Daten freigegeben sind, bleibt der Status neutral.',
      statusHeading: 'Session-Status',
      activeLabel: 'Live-Übertragung aktiv',
      inactiveLabel: 'Keine aktive Session',
      liveBadge: 'LIVE',
      standbyBadge: 'STANDBY // OFFLINE',
      emptyHint:
        'Sobald bestätigte Termine oder öffentliche Live-Streams über musicchaini3 vorliegen, erscheinen sie automatisch an dieser Stelle.',
      detailsLink: 'Details ansehen',
      defaultOfflineMessage: 'Aktuell keine Live-Sessions oder Termine angekündigt.',
    },
    social: {
      eyebrow: '04 // NETWORK',
      title: 'Social Hub & Creator Portal',
      description:
        'Es werden ausschließlich bestätigte und verifizierte externe Profile angezeigt.',
      portalEyebrow: 'DIRECT PORTAL',
      portalBody:
        'Direkter Einstieg zu musicchaini3 — dem unabhängigen Ökosystem für Releases, Creator-Profile und digitale Musik-Technologie.',
      portalCta: 'EXPLORE MUSICCHAINI3',
      emptyTitle: 'Noch keine verifizierten Social-Profile veröffentlicht',
      emptyBody:
        'Sobald offizielle Profil-URLs bestätigt sind, erscheinen die entsprechenden Kanäle automatisch hier.',
    },
    press: {
      eyebrow: '05 // PRESS & MEDIA',
      title: 'PRESS / MEDIA',
      description:
        'Offizielle Artist-Informationen für Presse, Booking und Medien. Nicht verfügbare Downloads und unverifizierte Nachweise bleiben ausgeblendet.',
      shortBioLabel: 'SHORT BIO',
      shortBio:
        'I3LACKOUT ist ein unabhängiger Electronic-Music-Artist und Softwareentwickler, der druckvollen Sound, experimentelle Technologie und kreative Eigenständigkeit verbindet.',
      longBioLabel: 'APPROVED ARTIST BIOGRAPHY',
      longBioHeadline: 'Hau-drauf-Mucke. Ohne Kompromisse.',
      longBioParagraphs: [
        'I3LACKOUT steht für druckvolle elektronische Musik, kompromisslose Energie und kreative Experimente. Hier geht es nicht darum, in eine Schublade zu passen, sondern darum, Sound mit Charakter zu schaffen.',
        'Hinter der Musik steckt zugleich die Leidenschaft für Softwareentwicklung und digitale Innovation. Als kreativer Kopf hinter musicchaini3 verbindet I3LACKOUT Musik, Code und Community zu einem eigenständigen kreativen Universum.',
      ],
      assetsHeading: 'Press Assets',
      assetsEmptyNotice:
        'Offizielles Logo, freigegebene Pressefotos und herunterladbare Medienmaterialien werden hier bereitgestellt, sobald die finalen Dateien veröffentlicht sind.',
      downloadLabel: 'Asset herunterladen',
      certificatesHeading: 'Verifizierte Zertifikate',
      certificatesEmptyNotice:
        'Es werden ausschließlich geprüfte und freigegebene Zertifikate angezeigt. Aktuell liegen noch keine öffentlich freigegebenen PDF-Nachweise vor.',
      contactLabel: 'KONTAKT // BOOKING & PRESSE',
      contactPlaceholder:
        'Ein bestätigter öffentlicher Kontaktkanal wird vor dem Launch hier ergänzt.',
      contactConfiguredBadge: 'Konfiguriert',
      contactPendingBadge: 'Kontakt folgt vor Launch',
    },
    developerBridge: {
      eyebrow: 'MUSIC × CODE // DEVELOPER UNIVERSE',
      title: 'BEYOND THE SOUND.',
      description:
        'Musik ist nur ein Teil der Gleichung. I3LACKOUT entwickelt außerdem digitale Erlebnisse, Creator-Tools und experimentelle Technologien.',
      featuredEyebrow: 'FEATURED PROJECT',
      featuredTitle: 'musicchaini3',
      featuredDescription:
        'Eine unabhängige Musik- und Creator-Plattform, die das Zusammenspiel von Artists, Hörern, Teilhabe und digitaler Technologie neu denkt.',
      featuredCta: 'EXPLORE MUSICCHAINI3',
      openModule: 'Öffnen',
      modules: [
        {
          to: '/developer',
          eyebrow: 'PROFILE',
          title: 'Developer Profile',
          description:
            'Software Developer & Creative Technologist — Python, Flask, JavaScript, C#-Ausbildung und Music × Code × Technology.',
        },
        {
          to: '/projects',
          eyebrow: 'PROJECTS',
          title: 'Project Showcase',
          description:
            'Filterbare Projektgalerie mit musicchaini3 als Hauptprojekt und transparentem Entwicklungsstand.',
        },
        {
          to: '/certifications',
          eyebrow: 'CERTIFICATIONS',
          title: 'Certifications',
          description:
            'Verifizierte W3Schools- und CodingX-Zertifikate inklusive Nachweislinks sowie weitere Themen in Prüfung.',
        },
        {
          to: '/tech-stack',
          eyebrow: 'TECH STACK',
          title: 'Developer Tech Stack',
          description:
            'Einordnung nach Praxis, Ausbildung / Weiterbildung und experimentellen Technologien.',
        },
      ],
    },
    footer: {
      tagline: 'NO SOFT MODE.',
      music: 'Music',
      about: 'About',
      development: 'Development',
      press: 'Press',
      impressum: 'Impressum',
      datenschutz: 'Datenschutz',
      copyright: '© 2026 I3LACKOUT',
    },
    legal: {
      backHome: 'Zurück zur Startseite',
      impressumEyebrow: 'LEGAL // § 5 DDG & § 18 MStV',
      impressumTitle: 'Impressum',
      impressumIntro:
        'Anbieterkennzeichnung für die offizielle Website i3lackout.com unter der Marke I3LACKOUT.',
      datenschutzEyebrow: 'PRIVACY // ART. 13 DSGVO',
      datenschutzTitle: 'Datenschutzerklärung',
      datenschutzIntro:
        'Transparente Informationen zur Verarbeitung personenbezogener Daten beim Besuch von i3lackout.com.',
    },
    developerPages: {
      subnavAriaLabel: 'Developer Universe Navigation',
      subnav: {
        profile: 'Developer Profile',
        projects: 'Projects',
        certifications: 'Certifications',
        techStack: 'Tech Stack',
      },
      developer: {
        eyebrow: '01 // DEVELOPER PROFILE',
        coreTechAriaLabel: 'Kerntechnologien',
        philosophyEyebrow: 'ENTWICKLUNGSPHILOSOPHIE',
        quickLinkProjects: 'Project Showcase',
        quickLinkCertifications: 'Certifications',
        quickLinkTechStack: 'Tech Stack',
      },
      projects: {
        eyebrow: '02 // PROJECT SHOWCASE',
        title: 'Projekte & Plattform-Architektur',
        description:
          'Filterbare Übersicht eigenständiger Software-Projekte mit nachvollziehbar dokumentiertem Entwicklungsstand — ohne erfundene Nutzerzahlen oder Kennzahlen.',
        filterAriaLabel: 'Projektfilter',
        categoryLabel: 'Kategorie:',
        technologyLabel: 'Technologie:',
        allFilter: 'Alle',
        emptyStateTitle: 'Keine Projekte für die gewählte Filterkombination gefunden.',
        resetFilter: 'Filter zurücksetzen',
        defaultExternalLabel: 'Projekt öffnen',
      },
      certifications: {
        eyebrow: '03 // CERTIFICATIONS',
        title: 'Zertifikate & Qualifikationen',
        description:
          'Verifizierte Programmier- und Web-Zertifikate von W3Schools und CodingX sowie weitere Themenbereiche im Prüfungsstatus.',
        pendingEyebrow: 'STATUS // VERIFIED & PENDING',
        pendingBody:
          '8 Zertifikate von W3Schools und CodingX sind anhand der Originalnachweise verifiziert — inklusive Zertifikats-ID, Ausstellungsdatum sowie Verifikations- oder Dokumentlink. Weitere Themen folgen nach Belegprüfung.',
        providerFilterAriaLabel: 'Anbieterfilter',
        searchAriaLabel: 'Zertifikate nach Thema filtern',
        searchPlaceholder: 'Thema suchen (z. B. Python)...',
        allFilter: 'Alle',
        topicPrefix: 'Thema',
        issuedPrefix: 'Ausgestellt',
        verifyLinkLabel: 'Nachweis prüfen',
        documentLinkLabel: 'Zertifikat ansehen',
        pendingFooter: 'Dokumentprüfung ausstehend (keine PDF verlinkt)',
        emptyTitle: 'Keine passenden Zertifikatseinträge gefunden.',
        resetFilter: 'Filter zurücksetzen',
      },
      techStack: {
        eyebrow: '04 // TECH STACK',
        title: 'Technologien & Einordnung',
        description:
          'Klare Trennung zwischen praktisch eingesetzten Technologien, Ausbildungs- und Weiterbildungsthemen sowie experimentellen Bereichen — bewusst ohne Prozentwerte oder künstliche Skill-Level.',
      },
    },
  },
  en: {
    nav: {
      skipToMain: 'Skip to main content',
      music: 'Music',
      about: 'About',
      development: 'Development',
      live: 'Live',
      social: 'Social Hub',
      press: 'Press',
      developer: 'Developer',
      projects: 'Projects',
      certifications: 'Certifications',
      techStack: 'Tech Stack',
      openMenu: 'Open navigation',
      closeMenu: 'Close navigation',
      musicUniverse: 'Music Universe',
      developerUniverse: 'Developer Universe',
      creatorPortal: 'Creator Portal · musicchaini3',
      languageLabel: 'Switch language',
    },
    hero: {
      eyebrow: 'INDEPENDENT ARTIST × DEVELOPER',
      positioning: 'Independent Electronic Music Artist · Software Developer · Digital Creator',
      claim: 'NO SOFT MODE.',
      subheadline: 'JUST SOUND. PRESSURE. IMPACT.',
      ecosystemTag: 'Music × Technology × Innovation',
      description:
        'Hard-hitting electronic music meets independent technology. Built for energy, experimentation and pure sonic impact.',
      primaryCta: 'EXPLORE THE MUSIC',
      secondaryCta: 'DISCOVER THE CODE',
      visualizerSpectrum: 'I3 HYBRID // ABSTRACT SPECTRUM',
      visualizerBadge: 'DECORATIVE',
      visualizerLiveBadge: 'LIVE // REACTIVE',
      visualizerModeAuto: 'AUTO',
      visualizerModeIdle: 'IDLE',
      visualizerModeLive: 'LIVE',
      visualizerModeHint: 'Switch visualizer mode: Auto, Idle or Live',
      visualizerVolumeHint: 'Toggle audio preview — plays QuizeD → LIZED → ZentreMizeD → RyzeD',
      visualizerFooterRight: 'PULSE // STATIC-SAFE',
    },
    music: {
      eyebrow: '01 // RELEASES',
      title: 'TURN UP THE PRESSURE.',
      description:
        'Heavy sounds. Raw energy. No unnecessary limits. Explore the official I3LACKOUT releases and discover the tracks behind the noise.',
      cta: 'LISTEN ON MUSICCHAINI3',
      emptyTitle: 'No public releases connected yet',
      emptyBody:
        'Only publicly released tracks returned by the musicchaini3 Public Artist API appear here. Drafts, private tracks or unreleased content are never exposed.',
      emptyCta: 'LISTEN ON MUSICCHAINI3',
      coverPlaceholder: 'Cover Placeholder',
      openTrack: 'Listen on musicchaini3',
      syncedLabel: 'musicchaini3 · synced',
      cachedLabel: 'musicchaini3 · cached',
      promoEyebrow: 'RED EDITION // PROMO',
      promoTitle: 'BREAK THE SILENCE.',
      promoBody:
        'The official I3LACKOUT red & black promo visual — artist identity, sound and digital energy in a single frame.',
      promoCta: 'EXPLORE THE RELEASES',
    },
    about: {
      eyebrow: '02 // ABOUT THE ARTIST',
      title: 'About I3LACKOUT',
      headline: 'Hard-Hitting Sound. No Compromises.',
      paragraphs: [
        "I3LACKOUT delivers hard-hitting electronic music, relentless energy and creative experimentation. It's not about fitting into a genre. It's about creating sound with character.",
        'Beyond the music lies a passion for software development and digital innovation. As the creative force behind musicchaini3, I3LACKOUT connects music, code and community.',
      ],
      visualBadge: 'ARTIST VISUAL // PLACEHOLDER',
      visualCaptionNote: 'Prepared visual slot for approved artist portraits and stage visuals.',
      pillars: [
        {
          eyebrow: '01 // SOUND',
          title: 'NO SOFT MODE.',
          body: 'Hard-hitting electronic music without genre limits — built for relentless energy and sonic character.',
        },
        {
          eyebrow: '02 // CODE',
          title: 'Independent Technology',
          body: 'Custom web architecture, creator tools and experimental software engineered alongside music production.',
        },
        {
          eyebrow: '03 // ECOSYSTEM',
          title: 'musicchaini3',
          body: 'Connecting music, code and community — strictly separating public releases from internal platform data.',
        },
      ],
    },
    live: {
      eyebrow: '03 // LIVE SESSIONS',
      title: 'Live & Sessions',
      description:
        'Overview for DJ sessions and upcoming dates. Status remains neutral while no public dates are scheduled.',
      statusHeading: 'Session Status',
      activeLabel: 'Live stream active',
      inactiveLabel: 'No active session',
      liveBadge: 'LIVE',
      standbyBadge: 'STANDBY // OFFLINE',
      emptyHint:
        'Confirmed tour dates or public live streams from musicchaini3 will appear here automatically once published.',
      detailsLink: 'View details',
      defaultOfflineMessage: 'No live sessions or upcoming dates announced at the moment.',
    },
    social: {
      eyebrow: '04 // NETWORK',
      title: 'Social Hub & Creator Portal',
      description: 'Only verified and explicitly configured external profiles are displayed.',
      portalEyebrow: 'DIRECT PORTAL',
      portalBody:
        'Direct entry to musicchaini3 — the independent ecosystem for releases, creator profiles and digital music technology.',
      portalCta: 'EXPLORE MUSICCHAINI3',
      emptyTitle: 'No verified social links published yet',
      emptyBody:
        'Confirmed official social channels will appear here automatically once verified URLs are configured.',
    },
    press: {
      eyebrow: '05 // PRESS & MEDIA',
      title: 'PRESS / MEDIA',
      description:
        'Official artist facts for press, booking and media. Unavailable downloads and unverified credentials remain hidden.',
      shortBioLabel: 'SHORT BIO',
      shortBio:
        'I3LACKOUT is an independent electronic music artist and developer combining hard-hitting sound, experimental technology and creative independence.',
      longBioLabel: 'APPROVED ARTIST BIOGRAPHY',
      longBioHeadline: 'Hard-Hitting Sound. No Compromises.',
      longBioParagraphs: [
        "I3LACKOUT delivers hard-hitting electronic music, relentless energy and creative experimentation. It's not about fitting into a genre. It's about creating sound with character.",
        'Beyond the music lies a passion for software development and digital innovation. As the creative force behind musicchaini3, I3LACKOUT connects music, code and community.',
      ],
      assetsHeading: 'Press Assets',
      assetsEmptyNotice:
        'Official logo, approved artist images and downloadable media materials will appear here once finalized files are available.',
      downloadLabel: 'Download asset',
      certificatesHeading: 'Verified Certificates',
      certificatesEmptyNotice:
        'Only verified, approved certificates are displayed here. No approved certificate documents are published yet.',
      contactLabel: 'CONTACT // BOOKING & PRESS',
      contactPlaceholder: 'A confirmed public contact channel will be added here before launch.',
      contactConfiguredBadge: 'Configured',
      contactPendingBadge: 'Confirmed channel pending',
    },
    developerBridge: {
      eyebrow: 'MUSIC × CODE // DEVELOPER UNIVERSE',
      title: 'BEYOND THE SOUND.',
      description:
        'Music is only part of the equation. I3LACKOUT also builds digital experiences, creator tools and experimental technologies.',
      featuredEyebrow: 'FEATURED PROJECT',
      featuredTitle: 'musicchaini3',
      featuredDescription:
        'An independent music and creator platform exploring the relationship between artists, listeners, participation and digital technology.',
      featuredCta: 'EXPLORE MUSICCHAINI3',
      openModule: 'Open',
      modules: [
        {
          to: '/developer',
          eyebrow: 'PROFILE',
          title: 'Developer Profile',
          description:
            'Software Developer & Creative Technologist — Python, Flask, JavaScript, C# training and Music × Code × Technology.',
        },
        {
          to: '/projects',
          eyebrow: 'PROJECTS',
          title: 'Project Showcase',
          description:
            'Filterable project showcase featuring musicchaini3 with documented development stages.',
        },
        {
          to: '/certifications',
          eyebrow: 'CERTIFICATIONS',
          title: 'Certifications',
          description:
            'Verified W3Schools and CodingX certifications with proof links plus additional coursework topics.',
        },
        {
          to: '/tech-stack',
          eyebrow: 'TECH STACK',
          title: 'Developer Tech Stack',
          description:
            'Categorized across practical use, training / coursework and experimental technologies.',
        },
      ],
    },
    footer: {
      tagline: 'NO SOFT MODE.',
      music: 'Music',
      about: 'About',
      development: 'Development',
      press: 'Press',
      impressum: 'Impressum',
      datenschutz: 'Privacy',
      copyright: '© 2026 I3LACKOUT',
    },
    legal: {
      backHome: 'Back to home',
      impressumEyebrow: 'LEGAL // § 5 DDG & § 18 MStV',
      impressumTitle: 'Impressum / Legal Notice',
      impressumIntro:
        'Provider disclosure for the official website i3lackout.com operating under the public brand I3LACKOUT.',
      datenschutzEyebrow: 'PRIVACY // ART. 13 GDPR',
      datenschutzTitle: 'Privacy Policy',
      datenschutzIntro:
        'Transparent information regarding personal data processing when visiting i3lackout.com.',
    },
    developerPages: {
      subnavAriaLabel: 'Developer Universe Navigation',
      subnav: {
        profile: 'Developer Profile',
        projects: 'Projects',
        certifications: 'Certifications',
        techStack: 'Tech Stack',
      },
      developer: {
        eyebrow: '01 // DEVELOPER PROFILE',
        coreTechAriaLabel: 'Core technologies',
        philosophyEyebrow: 'DEVELOPMENT PHILOSOPHY',
        quickLinkProjects: 'Project Showcase',
        quickLinkCertifications: 'Certifications',
        quickLinkTechStack: 'Tech Stack',
      },
      projects: {
        eyebrow: '02 // PROJECT SHOWCASE',
        title: 'Projects & Platform Architecture',
        description:
          'Filterable overview of independent software projects with transparently documented development status — without invented user counts or metrics.',
        filterAriaLabel: 'Project filters',
        categoryLabel: 'Category:',
        technologyLabel: 'Technology:',
        allFilter: 'All',
        emptyStateTitle: 'No projects found for the selected filter combination.',
        resetFilter: 'Reset filters',
        defaultExternalLabel: 'Open project',
      },
      certifications: {
        eyebrow: '03 // CERTIFICATIONS',
        title: 'Certifications & Qualifications',
        description:
          'Verified programming and web development certifications from W3Schools and CodingX, plus additional topics awaiting document verification.',
        pendingEyebrow: 'STATUS // VERIFIED & PENDING',
        pendingBody:
          '8 certificates from W3Schools and CodingX are verified from original credentials with certificate ID, issue date, and verification or certificate preview links. Remaining entries stay pending document review.',
        providerFilterAriaLabel: 'Provider filter',
        searchAriaLabel: 'Filter certifications by topic',
        searchPlaceholder: 'Search topic (e.g. Python)...',
        allFilter: 'All',
        topicPrefix: 'Topic',
        issuedPrefix: 'Issued',
        verifyLinkLabel: 'Verify credential',
        documentLinkLabel: 'View certificate',
        pendingFooter: 'Document review pending (no PDF linked)',
        emptyTitle: 'No matching certification entries found.',
        resetFilter: 'Reset filters',
      },
      techStack: {
        eyebrow: '04 // TECH STACK',
        title: 'Technologies & Categorization',
        description:
          'Clear separation between technologies used in production, training/coursework topics, and experimental areas — intentionally without arbitrary percentages or fake skill bars.',
      },
    },
  },
};
