import { ArrowLeft, Mail, ShieldCheck, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LEGAL_OPERATOR } from '../data/artist';
import { useLanguage } from '../i18n/LanguageContext';

interface LegalPageProps {
  variant: 'impressum' | 'datenschutz';
}

export function LegalPage({ variant }: LegalPageProps) {
  const { locale, t } = useLanguage();
  const isImpressum = variant === 'impressum';
  const isGerman = locale === 'de';

  const country = isGerman ? LEGAL_OPERATOR.countryDe : LEGAL_OPERATOR.countryEn;
  const entityNote = isGerman
    ? LEGAL_OPERATOR.legalEntityNoteDe
    : LEGAL_OPERATOR.legalEntityNoteEn;

  return (
    <section
      className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20"
      data-legal-variant={variant}
    >
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#00E5FF]">
        {isImpressum ? t.legal.impressumEyebrow : t.legal.datenschutzEyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-bold text-[#F5F5FA] sm:text-4xl">
        {isImpressum ? t.legal.impressumTitle : t.legal.datenschutzTitle}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#B4B4CC] sm:text-base">
        {isImpressum ? t.legal.impressumIntro : t.legal.datenschutzIntro}
      </p>

      {isImpressum ? (
        <div className="mt-8 space-y-6">
          <article className="i3-card rounded-2xl border-[#00E5FF]/25 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#00E5FF]">
              <Scale className="h-5 w-5" aria-hidden="true" />
              <h2 className="text-lg font-bold text-[#F5F5FA]">
                {isGerman ? 'Angaben gemäß § 5 DDG' : 'Provider Information pursuant to § 5 DDG'}
              </h2>
            </div>

            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Öffentliche Marke' : 'Public Brand'}
                </dt>
                <dd className="mt-1 font-semibold text-[#F5F5FA]">{LEGAL_OPERATOR.brand}</dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Diensteanbieter / Betreiber' : 'Operator / Service Provider'}
                </dt>
                <dd className="mt-1 font-semibold text-[#F5F5FA]">
                  {LEGAL_OPERATOR.operatorName}
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Rechtsstatus' : 'Legal Status'}
                </dt>
                <dd className="mt-1 text-[#F5F5FA]">{entityNote}</dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Anschrift' : 'Address'}
                </dt>
                <dd className="mt-1 text-[#F5F5FA]">
                  <address className="not-italic leading-relaxed">
                    {LEGAL_OPERATOR.operatorName}
                    <br />
                    {LEGAL_OPERATOR.street}
                    <br />
                    {LEGAL_OPERATOR.postalCity}
                    <br />
                    {country}
                  </address>
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-[#B4B4CC]">
                  {isGerman ? 'Elektronischer Kontakt' : 'Electronic Contact'}
                </dt>
                <dd className="mt-1 space-y-2 text-[#F5F5FA]">
                  <p>
                    <a
                      href={`mailto:${LEGAL_OPERATOR.email}`}
                      className="inline-flex items-center gap-1.5 font-semibold text-[#00E5FF] hover:underline"
                    >
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      <span>{LEGAL_OPERATOR.email}</span>
                    </a>
                  </p>
                  <p className="text-xs leading-relaxed text-[#B4B4CC]">
                    {isGerman
                      ? 'Hinweis zur Kontaktstruktur (§ 5 Abs. 1 Nr. 2 DDG): Vor dem Produktivstart kann bei Bedarf ein zweiter schneller Kommunikationsweg (z. B. Telefonnummer oder Kontaktformular) ergänzt werden.'
                      : 'Note on contact channels (§ 5 (1) no. 2 DDG): A second fast direct communication channel (e.g. phone number or contact form) can be added before production launch if required.'}
                  </p>
                </dd>
              </div>
            </dl>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman
                ? 'Verantwortlich für redaktionelle Inhalte (§ 18 Abs. 2 MStV)'
                : 'Editorial Responsibility (§ 18 (2) MStV)'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {LEGAL_OPERATOR.operatorName}, {LEGAL_OPERATOR.street}, {LEGAL_OPERATOR.postalCity},{' '}
              {country}.
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? 'Verknüpfte Plattform' : 'Linked Ecosystem'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Verbundene Musik- und Creator-Plattform:'
                : 'Connected music and creator platform:'}{' '}
              <a
                href={LEGAL_OPERATOR.ecosystemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#00E5FF] hover:underline"
              >
                musicchaini3.com
              </a>
              .
            </p>
          </article>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <article className="i3-card rounded-2xl border-[#00E5FF]/25 p-6 sm:p-8">
            <div className="flex items-center gap-2.5 text-[#00E5FF]">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
              <h2 className="text-lg font-bold text-[#F5F5FA]">
                {isGerman ? '1. Verantwortlicher (Art. 13 DSGVO)' : '1. Data Controller (Art. 13 GDPR)'}
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {LEGAL_OPERATOR.operatorName} ({isGerman ? 'Marke' : 'Brand'}: {LEGAL_OPERATOR.brand})
              <br />
              {LEGAL_OPERATOR.street}, {LEGAL_OPERATOR.postalCity}, {country}
              <br />
              E-Mail:{' '}
              <a
                href={`mailto:${LEGAL_OPERATOR.email}`}
                className="font-semibold text-[#00E5FF] hover:underline"
              >
                {LEGAL_OPERATOR.email}
              </a>
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman
                ? '2. Bereitstellung der Website & Server-Logdaten'
                : '2. Website Provision & Server Log Files'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Bei jedem Aufruf dieser Website verarbeitet der Webserver technisch erforderliche Verbindungsdaten (insbesondere IP-Adresse, Datum/Uhrzeit, angefragte URL/Pfad, HTTP-Statuscode und User-Agent), um die statischen Inhalte sicher auszuliefern und Störungen abzuwehren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am sicheren Betrieb). Es werden auf i3lackout.com keine Werbe-Tracker, keine externen Schriftarten-CDNs und keine Authentifizierungs-Cookies eingesetzt.'
                : 'When accessing this website, the web server processes technically necessary connection data (in particular IP address, date/time, requested path, HTTP status code and user agent) to deliver static content reliably and safeguard system security. The legal basis is Art. 6 (1) (f) GDPR (legitimate interest in secure operation). No advertising trackers, third-party font CDNs or authentication cookies are used on i3lackout.com.'}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman
                ? '3. Optionale Abfrage öffentlicher Daten von musicchaini3.com'
                : '3. Optional Public API Requests to musicchaini3.com'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Sofern die schreibgeschützte öffentliche Schnittstelle (GET /api/public/artists/i3lackout) aktiviert ist, ruft dein Browser öffentliche Artist-, Release- und Session-Metadaten von musicchaini3.com ab. Dabei wird deine IP-Adresse technisch bedingt an musicchaini3.com übermittelt; es werden dabei keine Cookies oder Zugangsdaten mitgesendet (credentials: omit). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.'
                : 'When the read-only public endpoint (GET /api/public/artists/i3lackout) is enabled, your browser fetches public artist, release and live-session metadata from musicchaini3.com. For technical delivery your IP address is transmitted to musicchaini3.com without cookies or credentials (credentials: omit). Legal basis: Art. 6 (1) (f) GDPR.'}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? '4. Kontaktaufnahme per E-Mail' : '4. Email Inquiries'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? `Wenn du per E-Mail an ${LEGAL_OPERATOR.email} Kontakt aufnimmst (z. B. für Presse-, Booking- oder Projektanfragen), werden die übermittelten Angaben ausschließlich zur Bearbeitung deiner Anfrage verarbeitet und anschließend entsprechend gesetzlicher Aufbewahrungspflichten bzw. nach Wegfall des Zwecks gelöscht (Art. 6 Abs. 1 lit. b bzw. lit. f DSGVO).`
                : `When contacting ${LEGAL_OPERATOR.email} by email (e.g. for press, booking or development inquiries), your provided details are processed solely to handle your request and deleted once no longer needed unless statutory retention duties apply (Art. 6 (1) (b) / (f) GDPR).`}
            </p>
          </article>

          <article className="i3-card rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-[#F5F5FA]">
              {isGerman ? '5. Rechte betroffener Personen' : '5. Data Subject Rights'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#B4B4CC]">
              {isGerman
                ? 'Du hast im gesetzlichen Rahmen jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit (Art. 20 DSGVO), Widerspruch (Art. 21 DSGVO) sowie das Recht auf Beschwerde bei einer zuständigen Datenschutz-Aufsichtsbehörde (Art. 77 DSGVO).'
                : 'Within statutory limits, you have the right of access (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17 GDPR), restriction of processing (Art. 18 GDPR), data portability (Art. 20 GDPR), objection (Art. 21 GDPR) and the right to lodge a complaint with a competent supervisory authority (Art. 77 GDPR).'}
            </p>
          </article>
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#00E5FF] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{t.legal.backHome}</span>
        </Link>
      </div>
    </section>
  );
}
