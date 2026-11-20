import type { Locale } from '../i18n/translations';
import { getSafeExternalUrl } from '../utils/links';

export type CertificationProvider = 'W3Schools' | 'CodingX';

export type CertificationDocumentStatus = 'pending_document' | 'verified_document';

export interface CertificationEntry {
  id: string;
  topic: string;
  provisionalTitle: string;
  provider: CertificationProvider;
  issuerLabel?: string;
  status: CertificationDocumentStatus;
  isProvisional: boolean;
  approved?: boolean;
  certificateId?: string | null;
  issuedAt?: string | null;
  note: string;
  documentUrl: string | null;
  verificationUrl: string | null;
}

const VERIFIED_NOTES_EN: Record<string, string> = {
  'cert-html5': 'Passed the W3Schools HTML certification exam at the Intermediate level.',
  'cert-css3': 'Passed the W3Schools CSS certification exam at the Intermediate level.',
  'cert-web-designer':
    'Completed W3Schools Web Designer certification covering HTML5, CSS, and Bootstrap.',
  'cert-bootstrap': 'Passed the W3Schools Bootstrap 4 certification exam.',
  'cert-blockchain':
    'Completed all Blockchain certification courses and passed the Blockchain Technology test.',
  'cert-generative-ai':
    'Completed all Gen AI & Prompt Engineering courses and passed the domain assessment.',
  'cert-web-development':
    'Completed all Web Development certification courses and passed the domain test.',
  'cert-java':
    'Completed the Online Institute of Java Programming course and cleared the certification test.',
};

export const CERTIFICATIONS: CertificationEntry[] = [
  {
    id: 'cert-html5',
    topic: 'HTML5',
    provisionalTitle: 'Certified HTML Developer (W3Schools)',
    provider: 'W3Schools',
    issuerLabel: 'W3Schools',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '1OM4D6LE0F',
    issuedAt: '09.03.2024',
    note: 'W3Schools HTML-Zertifizierungsprüfung auf Intermediate-Level erfolgreich bestanden.',
    documentUrl: '/certificates/w3schools-html5.jpg',
    verificationUrl: 'https://verify.w3schools.com/1OM4D6LE0F',
  },
  {
    id: 'cert-css3',
    topic: 'CSS3',
    provisionalTitle: 'Certified CSS Developer (W3Schools)',
    provider: 'W3Schools',
    issuerLabel: 'W3Schools',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '1OML428IMI',
    issuedAt: '13.03.2024',
    note: 'W3Schools CSS-Zertifizierungsprüfung auf Intermediate-Level erfolgreich bestanden.',
    documentUrl: '/certificates/w3schools-css3.jpg',
    verificationUrl: 'https://verify.w3schools.com/1OML428IMI',
  },
  {
    id: 'cert-web-designer',
    topic: 'Web Design · HTML5, CSS & Bootstrap',
    provisionalTitle: 'Certified Web Designer (W3Schools)',
    provider: 'W3Schools',
    issuerLabel: 'W3Schools',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '1RMBCTQ9EL',
    issuedAt: '13.03.2024',
    note: 'W3Schools Web-Designer-Zertifizierung für HTML5, CSS und Bootstrap bestanden.',
    documentUrl: '/certificates/w3schools-web-designer.jpg',
    verificationUrl: 'https://verify.w3schools.com/1RMBCTQ9EL',
  },
  {
    id: 'cert-bootstrap',
    topic: 'Bootstrap 4',
    provisionalTitle: 'Certified Bootstrap 4 Developer (W3Schools)',
    provider: 'W3Schools',
    issuerLabel: 'W3Schools',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '1NXNQUULQW',
    issuedAt: '31.07.2023',
    note: 'W3Schools Bootstrap-4-Zertifizierungsprüfung erfolgreich abgeschlossen.',
    documentUrl: '/certificates/w3schools-bootstrap4.jpg',
    verificationUrl: 'https://verify.w3schools.com/1NXNQUULQW',
  },
  {
    id: 'cert-blockchain',
    topic: 'Blockchain',
    provisionalTitle: 'Blockchain Technology (CodingX)',
    provider: 'CodingX',
    issuerLabel: 'CodingX · Blockchain X',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '267dd51a8f7e4089',
    issuedAt: '06.04.2024',
    note: 'Alle Zertifizierungskurse und Wissenstest in Blockchain Technology abgeschlossen.',
    documentUrl: '/certificates/x-blockchain.png',
    verificationUrl: null,
  },
  {
    id: 'cert-generative-ai',
    topic: 'Generative AI',
    provisionalTitle: 'Gen AI & Prompt Engineering (CodingX)',
    provider: 'CodingX',
    issuerLabel: 'CodingX · Gen-AI X',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '33a0f78972404089',
    issuedAt: '07.04.2024',
    note: 'Kurse und Wissenstest zu Gen AI & Prompt Engineering erfolgreich abgeschlossen.',
    documentUrl: '/certificates/x-genai.png',
    verificationUrl: null,
  },
  {
    id: 'cert-web-development',
    topic: 'Web Development',
    provisionalTitle: 'Web Development (CodingX)',
    provider: 'CodingX',
    issuerLabel: 'CodingX · Web X',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '76b6826369a544f3',
    issuedAt: '08.04.2024',
    note: 'Alle Zertifizierungskurse und Wissenstest in Web Development abgeschlossen.',
    documentUrl: '/certificates/x-web-development.png',
    verificationUrl: null,
  },
  {
    id: 'cert-java',
    topic: 'Java',
    provisionalTitle: 'Java Programming (CodingX)',
    provider: 'CodingX',
    issuerLabel: 'CodingX · Java X',
    status: 'verified_document',
    isProvisional: false,
    approved: true,
    certificateId: '996d26396b4b4f71',
    issuedAt: '11.04.2024',
    note: 'Kurs und Prüfung des Online Institute of Java Programming erfolgreich bestanden.',
    documentUrl: '/certificates/x-java.png',
    verificationUrl: null,
  },
  {
    id: 'cert-python',
    topic: 'Python',
    provisionalTitle: 'Python (W3Schools · Ausstehend)',
    provider: 'W3Schools',
    issuerLabel: 'W3Schools',
    status: 'pending_document',
    isProvisional: true,
    approved: false,
    note: 'Originalnachweis wird noch ergänzt; Zertifikatsnummer und Datum folgen nach Dokumentprüfung.',
    documentUrl: null,
    verificationUrl: null,
  },
  {
    id: 'cert-javascript',
    topic: 'JavaScript',
    provisionalTitle: 'JavaScript (W3Schools · Ausstehend)',
    provider: 'W3Schools',
    issuerLabel: 'W3Schools',
    status: 'pending_document',
    isProvisional: true,
    approved: false,
    note: 'Originalnachweis wird noch ergänzt; Zertifikatsnummer und Datum folgen nach Dokumentprüfung.',
    documentUrl: null,
    verificationUrl: null,
  },
  {
    id: 'cert-ethical-hacking',
    topic: 'Ethical Hacking',
    provisionalTitle: 'Ethical Hacking (CodingX · Ausstehend)',
    provider: 'CodingX',
    issuerLabel: 'CodingX',
    status: 'pending_document',
    isProvisional: true,
    approved: false,
    note: 'Originalnachweis wird noch ergänzt; Zertifikatsnummer und Datum folgen nach Dokumentprüfung.',
    documentUrl: null,
    verificationUrl: null,
  },
  {
    id: 'cert-c',
    topic: 'C',
    provisionalTitle: 'C (CodingX · Ausstehend)',
    provider: 'CodingX',
    issuerLabel: 'CodingX',
    status: 'pending_document',
    isProvisional: true,
    approved: false,
    note: 'Originalnachweis wird noch ergänzt; Zertifikatsnummer und Datum folgen nach Dokumentprüfung.',
    documentUrl: null,
    verificationUrl: null,
  },
  {
    id: 'cert-cpp',
    topic: 'C++',
    provisionalTitle: 'C++ (CodingX · Ausstehend)',
    provider: 'CodingX',
    issuerLabel: 'CodingX',
    status: 'pending_document',
    isProvisional: true,
    approved: false,
    note: 'Originalnachweis wird noch ergänzt; Zertifikatsnummer und Datum folgen nach Dokumentprüfung.',
    documentUrl: null,
    verificationUrl: null,
  },
];

export type CertificationProviderFilter = 'Alle' | CertificationProvider;

export function filterCertifications(
  entries: CertificationEntry[],
  provider: CertificationProviderFilter,
  query: string,
): CertificationEntry[] {
  const normalizedQuery = query.trim().toLowerCase();
  return entries.filter((entry) => {
    const matchesProvider = provider === 'Alle' || entry.provider === provider;
    const matchesQuery =
      !normalizedQuery ||
      entry.topic.toLowerCase().includes(normalizedQuery) ||
      entry.provisionalTitle.toLowerCase().includes(normalizedQuery) ||
      entry.provider.toLowerCase().includes(normalizedQuery) ||
      Boolean(entry.issuerLabel?.toLowerCase().includes(normalizedQuery)) ||
      Boolean(entry.certificateId?.toLowerCase().includes(normalizedQuery));
    return matchesProvider && matchesQuery;
  });
}

export function resolveCertificationUrl(entry: CertificationEntry): string | null {
  return getSafeExternalUrl(entry.verificationUrl);
}

/**
 * Validates that a certificate document reference is either a safe local `/certificates/...` path
 * or an http(s) URL, rejecting protocol-relative URLs or unsafe schemes.
 */
export function resolveCertificationDocumentUrl(entry: CertificationEntry): string | null {
  if (!entry.documentUrl) {
    return null;
  }
  const trimmed = entry.documentUrl.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith('/certificates/') && !trimmed.startsWith('//')) {
    return trimmed;
  }
  return getSafeExternalUrl(trimmed);
}

/**
 * Returns only verified and explicitly approved certificates for press/public credentials.
 */
export function getApprovedCertificates(entries: CertificationEntry[]): CertificationEntry[] {
  return entries.filter(
    (entry) => entry.status === 'verified_document' && entry.approved === true,
  );
}

export function getLocalizedCertifications(
  entries: CertificationEntry[],
  locale: Locale,
): CertificationEntry[] {
  if (locale === 'de') {
    return entries;
  }

  return entries.map((entry) => ({
    ...entry,
    provisionalTitle: entry.provisionalTitle
      .replace('(Vorläufiger Eintrag)', '(Provisional Entry)')
      .replace('· Ausstehend)', '· Pending)'),
    note:
      entry.status === 'pending_document'
        ? 'Original certificate upload pending; certificate ID and issue date will follow after verification.'
        : (VERIFIED_NOTES_EN[entry.id] ?? entry.note),
  }));
}
