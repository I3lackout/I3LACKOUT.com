import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ARTIST_CONFIG, LEGAL_OPERATOR } from '../../data/artist';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionNavLink } from '../ui/SectionNavLink';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-[#090909] py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold tracking-[0.2em] text-[#FFFFFF]">
            {ARTIST_CONFIG.name}
          </p>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-[#00E5FF]">
            {t.footer.tagline}
          </p>
          <p className="mt-2 text-xs text-[#B8B8C4]">{t.footer.copyright}</p>
          <p className="mt-1 text-xs text-[#B8B8C4]">
            {LEGAL_OPERATOR.operatorName} · {t.hero.ecosystemTag}
          </p>
        </div>

        <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-5 text-sm">
          <SectionNavLink
            hash="#music"
            className="text-[#B8B8C4] transition hover:text-[#FF6B7A]"
          >
            {t.footer.music}
          </SectionNavLink>
          <SectionNavLink
            hash="#about"
            className="text-[#B8B8C4] transition hover:text-[#FF6B7A]"
          >
            {t.footer.about}
          </SectionNavLink>
          <Link to="/developer" className="text-[#B8B8C4] transition hover:text-[#00E5FF]">
            {t.footer.development}
          </Link>
          <SectionNavLink
            hash="#press-kit"
            className="text-[#B8B8C4] transition hover:text-[#FF6B7A]"
          >
            {t.footer.press}
          </SectionNavLink>
          <a
            href={ARTIST_CONFIG.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#FF6B7A] transition hover:text-[#00E5FF] hover:underline"
          >
            <span>musicchaini3.com</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <Link to="/impressum" className="text-[#B8B8C4] transition hover:text-[#FFFFFF]">
            {t.footer.impressum}
          </Link>
          <Link to="/datenschutz" className="text-[#B8B8C4] transition hover:text-[#FFFFFF]">
            {t.footer.datenschutz}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
