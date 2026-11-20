import { Award, Download, ExternalLink, FileText, Mail } from 'lucide-react';
import { SectionHeading } from '../components/ui/SectionHeading';
import {
  ARTIST_CONFIG,
  getAvailablePressAssets,
  type PressKitAssetPlaceholder,
} from '../data/artist';
import {
  CERTIFICATIONS,
  getApprovedCertificates,
  resolveCertificationDocumentUrl,
  resolveCertificationUrl,
  type CertificationEntry,
} from '../data/certifications';
import { useLanguage } from '../i18n/LanguageContext';

interface PressKitProps {
  assets?: PressKitAssetPlaceholder[];
  certificates?: CertificationEntry[];
  contactLabel?: string | null;
}

export function PressKit({
  assets = ARTIST_CONFIG.pressKit.assets,
  certificates = CERTIFICATIONS,
  contactLabel = ARTIST_CONFIG.pressKit.contactLabel,
}: PressKitProps) {
  const { t } = useLanguage();
  const availableAssets = getAvailablePressAssets(assets);
  const approvedCertificates = getApprovedCertificates(certificates);

  return (
    <section
      id="press-kit"
      aria-labelledby="press-kit-heading"
      className="border-b border-white/10 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="press-kit-heading"
          eyebrow={t.press.eyebrow}
          title={t.press.title}
          description={t.press.description}
        />

        {/* Official Short Bio & Approved Long Bio */}
        <div className="grid gap-6 lg:grid-cols-12">
          <article className="i3-card rounded-2xl p-6 sm:p-8 lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6B7A]">
              {t.press.shortBioLabel}
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#FFFFFF]">
              {t.press.shortBio}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8 lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00E5FF]">
              {t.press.longBioLabel}
            </p>
            <h3 className="mt-3 text-xl font-bold text-[#FFFFFF]">
              {t.press.longBioHeadline}
            </h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#B8B8C4] sm:text-base">
              {t.press.longBioParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </div>

        {/* Available Press Downloads (unavailable downloads are hidden) */}
        <div className="mt-8">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#B8B8C4]">
            {t.press.assetsHeading}
          </h3>
          {availableAssets.length === 0 ? (
            <div
              data-testid="press-assets-empty"
              className="i3-card rounded-2xl p-6 text-sm leading-relaxed text-[#B8B8C4]"
            >
              {t.press.assetsEmptyNotice}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3" data-testid="press-assets-grid">
              {availableAssets.map((asset) => (
                <article
                  key={asset.id}
                  className="i3-card flex flex-col justify-between rounded-2xl p-6"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <FileText className="h-5 w-5 text-[#FF2020]" aria-hidden="true" />
                      <span className="rounded-full border border-[#00E5FF]/35 bg-[#090909] px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[#00E5FF]">
                        {asset.formatHint}
                      </span>
                    </div>
                    <h4 className="mt-4 text-lg font-bold text-[#FFFFFF]">{asset.title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#B8B8C4]">
                      {asset.description}
                    </p>
                  </div>

                  {asset.assetUrl ? (
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <a
                        href={asset.assetUrl}
                        download
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:underline"
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        <span>{t.press.downloadLabel}</span>
                      </a>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Verified & Approved Certificates Only */}
        <div className="mt-8">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#B8B8C4]">
            {t.press.certificatesHeading}
          </h3>
          {approvedCertificates.length === 0 ? (
            <div
              data-testid="press-certificates-empty"
              className="i3-card rounded-2xl p-6 text-sm leading-relaxed text-[#B8B8C4]"
            >
              {t.press.certificatesEmptyNotice}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2" data-testid="press-certificates-list">
              {approvedCertificates.map((cert) => {
                const verifyUrl = resolveCertificationUrl(cert);
                const docUrl = resolveCertificationDocumentUrl(cert);
                return (
                  <article
                    key={cert.id}
                    className="i3-card flex items-start gap-3.5 rounded-2xl p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00E5FF]/35 bg-[#090909] text-[#00E5FF]">
                      <Award className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-wider text-[#00E5FF]">
                        {cert.issuerLabel ?? cert.provider}
                      </p>
                      <h4 className="mt-1 text-base font-bold text-[#FFFFFF]">
                        {cert.provisionalTitle}
                      </h4>
                      {cert.certificateId || cert.issuedAt ? (
                        <p className="mt-1 font-mono text-[11px] text-[#FF6B7A]">
                          {[cert.issuedAt, cert.certificateId ? `ID: ${cert.certificateId}` : null]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm text-[#B8B8C4]">{cert.note}</p>
                      {verifyUrl || docUrl ? (
                        <div className="mt-2.5 flex flex-wrap gap-3">
                          {verifyUrl ? (
                            <a
                              href={verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#00E5FF] hover:underline"
                            >
                              <span>{t.developerPages.certifications.verifyLinkLabel}</span>
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          ) : null}
                          {docUrl ? (
                            <a
                              href={docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-[#FF6B7A] hover:text-[#00E5FF] hover:underline"
                            >
                              <FileText className="h-3 w-3" aria-hidden="true" />
                              <span>{t.developerPages.certifications.documentLinkLabel}</span>
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="i3-card mt-8 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#DC143C]/55 bg-[#090909] text-[#FF2020]">
                <Mail className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#FF6B7A]">
                  {t.press.contactLabel}
                </p>
                {contactLabel && contactLabel.includes('@') && !/\s/.test(contactLabel) ? (
                  <a
                    href={`mailto:${contactLabel}`}
                    className="mt-1 inline-block text-sm font-semibold text-[#FFFFFF] hover:text-[#00E5FF] hover:underline sm:text-base"
                  >
                    {contactLabel}
                  </a>
                ) : (
                  <p className="mt-1 text-sm leading-relaxed text-[#B8B8C4] sm:text-base">
                    {contactLabel || t.press.contactPlaceholder}
                  </p>
                )}
              </div>
            </div>

            <span className="self-start rounded-lg border border-white/15 bg-[#090909] px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-[#B8B8C4] sm:self-center">
              {contactLabel ? t.press.contactConfiguredBadge : t.press.contactPendingBadge}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
