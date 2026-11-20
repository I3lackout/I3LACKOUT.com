import { useMemo, useState } from 'react';
import { Award, ExternalLink, FileClock, FileText, Search } from 'lucide-react';
import { DeveloperSubnav } from '../components/layout/DeveloperSubnav';
import { SectionHeading } from '../components/ui/SectionHeading';
import { UniverseBadge } from '../components/ui/UniverseBadge';
import {
  CERTIFICATIONS,
  filterCertifications,
  getLocalizedCertifications,
  resolveCertificationDocumentUrl,
  resolveCertificationUrl,
  type CertificationEntry,
  type CertificationProviderFilter,
} from '../data/certifications';
import { useLanguage } from '../i18n/LanguageContext';

const PROVIDER_FILTERS: CertificationProviderFilter[] = [
  'Alle',
  'W3Schools',
  'CodingX',
];

interface CertificationsPageProps {
  certifications?: CertificationEntry[];
}

export function CertificationsPage({
  certifications = CERTIFICATIONS,
}: CertificationsPageProps) {
  const { locale, t } = useLanguage();
  const [providerFilter, setProviderFilter] = useState<CertificationProviderFilter>('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  const localizedEntries = useMemo(
    () => getLocalizedCertifications(certifications, locale),
    [certifications, locale],
  );

  const filteredCertifications = useMemo(
    () => filterCertifications(localizedEntries, providerFilter, searchQuery),
    [localizedEntries, providerFilter, searchQuery],
  );

  return (
    <div className="i3-grid-backdrop py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <DeveloperSubnav />

        <div className="mb-6">
          <UniverseBadge universe="developer" />
        </div>

        <SectionHeading
          id="certifications-heading"
          as="h1"
          accent="cyan"
          eyebrow={t.developerPages.certifications.eyebrow}
          title={t.developerPages.certifications.title}
          description={t.developerPages.certifications.description}
        />

        <div
          data-testid="certifications-pending-notice"
          className="i3-card mb-8 rounded-2xl border-[#00E5FF]/30 p-5 sm:p-6"
        >
          <div className="flex items-start gap-3.5">
            <FileClock className="mt-0.5 h-5 w-5 shrink-0 text-[#00E5FF]" aria-hidden="true" />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
                {t.developerPages.certifications.pendingEyebrow}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-[#B4B4CC]">
                {t.developerPages.certifications.pendingBody}
              </p>
            </div>
          </div>
        </div>

        <div className="i3-card mb-8 flex flex-col gap-4 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex flex-wrap items-center gap-2"
            role="group"
            aria-label={t.developerPages.certifications.providerFilterAriaLabel}
          >
            {PROVIDER_FILTERS.map((provider) => {
              const active = providerFilter === provider;
              const label =
                provider === 'Alle' ? t.developerPages.certifications.allFilter : provider;
              return (
                <button
                  key={provider}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setProviderFilter(provider)}
                  className={`rounded-lg border px-3.5 py-2 text-xs font-semibold transition ${
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

          <label className="relative block w-full sm:w-64">
            <span className="sr-only">{t.developerPages.certifications.searchAriaLabel}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8B8C4]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t.developerPages.certifications.searchPlaceholder}
              className="w-full rounded-lg border border-white/15 bg-[#090909] py-2 pl-9 pr-3 text-sm text-[#FFFFFF] placeholder:text-[#B8B8C4]/70 focus:border-[#00E5FF] focus:outline-none"
            />
          </label>
        </div>

        {filteredCertifications.length === 0 ? (
          <div
            data-testid="certifications-empty-state"
            className="i3-card rounded-2xl p-8 text-center"
          >
            <p className="text-base font-semibold text-[#FFFFFF]">
              {t.developerPages.certifications.emptyTitle}
            </p>
            <button
              type="button"
              onClick={() => {
                setProviderFilter('Alle');
                setSearchQuery('');
              }}
              className="mt-4 rounded-lg border border-[#00E5FF]/50 bg-[#090909] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#00E5FF]"
            >
              {t.developerPages.certifications.resetFilter}
            </button>
          </div>
        ) : (
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-testid="certifications-grid"
          >
            {filteredCertifications.map((entry) => {
              const safeVerificationUrl = resolveCertificationUrl(entry);
              const safeDocumentUrl = resolveCertificationDocumentUrl(entry);
              const isVerified = entry.status === 'verified_document';
              return (
                <article
                  key={entry.id}
                  data-testid={`certification-card-${entry.id}`}
                  className="i3-card flex flex-col justify-between rounded-2xl p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 font-mono text-xs text-[#00E5FF]">
                        <Award className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {entry.issuerLabel ?? entry.provider}
                      </span>
                      <span
                        data-status={entry.status}
                        className={`rounded-full border bg-[#090909] px-2.5 py-0.5 font-mono text-[11px] ${
                          isVerified
                            ? 'border-[#00E5FF]/40 text-[#00E5FF]'
                            : 'border-white/15 text-[#B8B8C4]'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </div>

                    <h2 className="mt-4 text-lg font-bold text-[#FFFFFF]">
                      {entry.provisionalTitle}
                    </h2>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-[#B8B8C4]">
                      {t.developerPages.certifications.topicPrefix}: {entry.topic}
                    </p>
                    {entry.certificateId || entry.issuedAt ? (
                      <p className="mt-2 font-mono text-[11px] text-[#FF6B7A]">
                        {[
                          entry.issuedAt
                            ? `${t.developerPages.certifications.issuedPrefix}: ${entry.issuedAt}`
                            : null,
                          entry.certificateId ? `ID: ${entry.certificateId}` : null,
                        ]
                          .filter(Boolean)
                          .join(' · ')}
                      </p>
                    ) : null}
                    <p className="mt-3 text-sm leading-relaxed text-[#B8B8C4]">{entry.note}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-3">
                    {safeVerificationUrl ? (
                      <a
                        href={safeVerificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00E5FF] hover:underline"
                      >
                        <span>{t.developerPages.certifications.verifyLinkLabel}</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                    {safeDocumentUrl ? (
                      <a
                        href={safeDocumentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B7A] hover:text-[#00E5FF] hover:underline"
                      >
                        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{t.developerPages.certifications.documentLinkLabel}</span>
                      </a>
                    ) : null}
                    {!safeVerificationUrl && !safeDocumentUrl ? (
                      <span className="font-mono text-xs text-[#B8B8C4]">
                        {t.developerPages.certifications.pendingFooter}
                      </span>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
