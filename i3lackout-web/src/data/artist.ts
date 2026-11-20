import { isSafeExternalUrl } from '../utils/links';

export interface SocialLinkConfig {
  id: string;
  label: string;
  url: string;
  handle?: string;
  verified?: boolean;
  iconUrl?: string;
}

export interface PressKitAssetPlaceholder {
  id: string;
  title: string;
  formatHint: string;
  description: string;
  assetUrl: string | null;
  available?: boolean;
}

export interface AboutBlockConfig {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
}

export interface ArtistProfileConfig {
  name: string;
  subtitle: string;
  domain: string;
  platformName: string;
  platformUrl: string;
  platformFrontpageUrl: string;
  platformStartUrl: string;
  platformAnalyticsUrl: string;
  promoUrl: string;
  heroSummary: string;
  aboutImageUrl: string | null;
  aboutImageAlt: string;
  aboutBlocks: AboutBlockConfig[];
  socialLinks: SocialLinkConfig[];
  pressKit: {
    assets: PressKitAssetPlaceholder[];
    contactLabel: string | null;
    contactPlaceholderNote: string;
  };
}

/**
 * Validates and returns only verified social links with an explicit http(s) URL.
 */
export function getConfiguredSocialLinks(links: SocialLinkConfig[]): SocialLinkConfig[] {
  return links.filter((item) => item.verified !== false && isSafeExternalUrl(item.url));
}

/**
 * Returns only press kit assets that are marked available and point to a valid local or http(s) asset.
 */
export function getAvailablePressAssets(
  assets: PressKitAssetPlaceholder[],
): PressKitAssetPlaceholder[] {
  return assets.filter((asset) => {
    if (asset.available === false || !asset.assetUrl) {
      return false;
    }
    const trimmed = asset.assetUrl.trim();
    if (!trimmed) {
      return false;
    }
    if (trimmed.startsWith('/')) {
      return !trimmed.includes('..');
    }
    return isSafeExternalUrl(trimmed);
  });
}

export interface LegalOperatorConfig {
  brand: string;
  operatorName: string;
  legalEntityNoteDe: string;
  legalEntityNoteEn: string;
  street: string;
  postalCity: string;
  countryDe: string;
  countryEn: string;
  email: string;
  website: string;
  ecosystemUrl: string;
}

export const DEFAULT_CONTACT_EMAIL =
  import.meta.env.VITE_ARTIST_CONTACT_LABEL?.trim() || 'I3lackout@gmx.de';

export const LEGAL_OPERATOR: LegalOperatorConfig = {
  brand: 'I3LACKOUT',
  operatorName: 'Michael Kowol',
  legalEntityNoteDe: 'Natürliche Person (unabhängiger Künstler, Softwareentwickler & Digital Creator)',
  legalEntityNoteEn: 'Natural person (Independent Electronic Music Artist, Software Developer & Digital Creator)',
  street: 'Lindenstraße 15 1B',
  postalCity: '38704 Liebenburg',
  countryDe: 'Deutschland',
  countryEn: 'Germany',
  email: DEFAULT_CONTACT_EMAIL,
  website: 'https://i3lackout.com',
  ecosystemUrl: 'https://musicchaini3.com',
};

export const ARTIST_CONFIG: ArtistProfileConfig = {
  name: 'I3LACKOUT',
  subtitle: 'Independent Electronic Music Artist · Software Developer · Digital Creator',
  domain: 'i3lackout.com',
  platformName: 'musicchaini3',
  platformUrl: 'https://musicchaini3.com',
  platformFrontpageUrl: 'https://musicchaini3.com/frontpage/',
  platformStartUrl: 'https://musicchaini3.com/user/guest/start',
  platformAnalyticsUrl: 'https://musicchaini3.com/user/guest/analytics',
  promoUrl: 'https://musicchaini3.com/app',
  heroSummary:
    'Offizielle Artist- und Developer-Website von I3LACKOUT — elektronische Musik, Softwareentwicklung, musicchaini3 und das iTHREE-Ökosystem.',
  aboutImageUrl: '/images/i3lackout-artist.jpg',
  aboutImageAlt:
    'Offizielles Artist-Porträt von I3LACKOUT mit roter Sonnenbrille und rotem Backlight auf Schwarz',
  aboutBlocks: [
    {
      id: 'identity',
      eyebrow: '01 // ARTIST IDENTITY',
      title: 'Klangästhetik & Vision',
      body: 'I3LACKOUT steht für dunkle, präzise elektronische Klangarchitektur zwischen Club-Atmosphäre, synthetischen Texturen und eigenständiger digitaler Umsetzung. Die ausführliche Künstlerbiografie wird an dieser Stelle ergänzt.',
    },
    {
      id: 'sound',
      eyebrow: '02 // SOUND ARCHITECTURE',
      title: 'Produktion & Live-Perspektive',
      body: 'Im Mittelpunkt stehen atmosphärische Dynamik, strukturierte Arrangements und die Verbindung aus Sound Design und eigener Software-Entwicklung — ohne vorgefertigte Standard-Schablonen.',
    },
    {
      id: 'ecosystem',
      eyebrow: '03 // CREATOR PORTAL',
      title: 'Direkt verbunden mit musicchaini3',
      body: 'Als eigenständige Artist-Heimat greift i3lackout.com direkt auf das Creator-Ökosystem von musicchaini3 zu und verbindet Musikveröffentlichungen mit eigener Plattform-Technologie.',
    },
  ],
  socialLinks: [
    {
      id: 'instagram-artist',
      label: 'Instagram (Creator)',
      iconUrl: '/images/social-instagram.png',
      url: 'https://www.instagram.com/ithreelackout/',
      handle: '@ithreelackout',
      verified: true,
    },
    {
      id: 'github',
      label: 'GitHub',
      iconUrl: '/images/social-github.png',
      url: 'https://github.com/I3lackout/musicchaini3',
      handle: 'github.com/I3lackout/musicchaini3',
      verified: true,
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      iconUrl: '/images/social-tiktok.png',
      url: 'https://www.tiktok.com/@i3lackout5',
      handle: '@i3lackout5',
      verified: true,
    },
    {
      id: 'soundcloud',
      label: 'SoundCloud',
      iconUrl: '/images/social-soundcloud.png',
      url: 'https://soundcloud.com/user-725368592-910550547',
      handle: 'soundcloud.com/user-725368592-910550547',
      verified: true,
    },
    { id: 'youtube', label: 'YouTube', url: '', handle: '' },
    { id: 'spotify', label: 'Spotify', url: '', handle: '' },
  ],
  pressKit: {
    assets: [
      {
        id: 'logos',
        title: 'Logo & Brand Marks',
        formatHint: 'SVG / PNG — Platzhalter',
        description: 'Offizielle Wort- und Bildmarken folgen nach finaler Design-Freigabe.',
        assetUrl: null,
      },
      {
        id: 'photos',
        title: 'Official Artist Portrait',
        formatHint: 'JPG · 1024×935',
        description:
          'Freigegebenes Artist- und Pressefoto von I3LACKOUT (Red & Black Edition) zum direkten Download.',
        assetUrl: '/images/i3lackout-artist.jpg',
        available: true,
      },
      {
        id: 'biography',
        title: 'Artist Bio & Tech Rider',
        formatHint: 'PDF / Text — Platzhalter',
        description: 'Redaktionelle Biografie und technische Bühnenanforderungen folgen nach Freigabe.',
        assetUrl: null,
      },
    ],
    contactLabel: DEFAULT_CONTACT_EMAIL,
    contactPlaceholderNote:
      'Booking- und Presse-Kontakt wird vor dem produktiven Launch hier bereitgestellt.',
  },
};
