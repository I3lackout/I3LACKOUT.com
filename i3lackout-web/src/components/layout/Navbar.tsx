import { useEffect, useState } from 'react';
import { ExternalLink, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ARTIST_CONFIG } from '../../data/artist';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionNavLink } from '../ui/SectionNavLink';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { locale, setLocale, t } = useLanguage();

  const musicNavItems = [
    { label: t.nav.music, href: '#music' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.live, href: '#live' },
    { label: t.nav.social, href: '#social' },
    { label: t.nav.press, href: '#press-kit' },
  ];

  const developerNavItems = [
    { label: t.nav.developer, to: '/developer' },
    { label: t.nav.projects, to: '/projects' },
    { label: t.nav.certifications, to: '/certifications' },
    { label: t.nav.techStack, to: '/tech-stack' },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090909]/92 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-[#121215] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#00E5FF]"
      >
        {t.nav.skipToMain}
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex shrink-0 items-center gap-2.5">
          <a
            href={ARTIST_CONFIG.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ARTIST_CONFIG.platformName}
            title={ARTIST_CONFIG.platformName}
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-white/15 bg-[#121215] p-1 transition hover:border-[#FF1744]"
          >
            <img
              src="/icons/musicchaini3-favicon.ico"
              alt={ARTIST_CONFIG.platformName}
              className="h-5 w-5 object-contain"
            />
          </a>
          <Link
            to="/"
            className="group inline-flex shrink-0 items-center gap-2.5 text-base font-bold tracking-[0.18em] text-[#FFFFFF]"
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-xs bg-gradient-to-br from-[#FF2020] to-[#00E5FF] transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            />
            <span>{ARTIST_CONFIG.name}</span>
          </Link>
        </div>

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-3.5 lg:flex">
          <div className="flex items-center gap-3.5">
            {musicNavItems.map((item) => (
              <SectionNavLink
                key={item.href}
                hash={item.href}
                className="text-xs font-medium text-[#B8B8C4] transition-colors hover:text-[#FF6B7A] xl:text-sm"
              >
                {item.label}
              </SectionNavLink>
            ))}
          </div>

          <span className="h-4 w-px bg-white/15" aria-hidden="true" />

          <div className="flex items-center gap-3">
            {developerNavItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`text-xs font-medium transition-colors xl:text-sm ${
                    active ? 'text-[#00E5FF]' : 'text-[#B8B8C4] hover:text-[#00E5FF]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div
            role="group"
            aria-label={t.nav.languageLabel}
            className="inline-flex items-center rounded-lg border border-white/15 bg-[#121215] p-0.5 font-mono text-[11px]"
          >
            {(['de', 'en'] as const).map((lang) => {
              const active = locale === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLocale(lang)}
                  className={`rounded-md px-2 py-1 uppercase transition ${
                    active
                      ? 'bg-[#00E5FF]/15 text-[#00E5FF]'
                      : 'text-[#B8B8C4] hover:text-[#FFFFFF]'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          <a
            href={ARTIST_CONFIG.platformUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[#DC143C]/65 bg-[#121215] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFFFFF] transition hover:border-[#FF1744] hover:text-[#FF6B7A]"
          >
            <span>{ARTIST_CONFIG.platformName}</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <div
            role="group"
            aria-label={t.nav.languageLabel}
            className="inline-flex items-center rounded-lg border border-white/15 bg-[#121215] p-0.5 font-mono text-[11px]"
          >
            {(['de', 'en'] as const).map((lang) => {
              const active = locale === lang;
              return (
                <button
                  key={lang}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLocale(lang)}
                  className={`rounded-md px-2 py-1 uppercase transition ${
                    active
                      ? 'bg-[#00E5FF]/15 text-[#00E5FF]'
                      : 'text-[#B8B8C4] hover:text-[#FFFFFF]'
                  }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-[#121215] p-2 text-[#FFFFFF] hover:border-[#FF1744]/70"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile Navigation"
          className="border-t border-white/10 bg-[#090909] px-4 py-4 lg:hidden"
        >
          <p className="px-2 pb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#FF6B7A]">
            {t.nav.musicUniverse}
          </p>
          <ul className="flex flex-col gap-1.5">
            {musicNavItems.map((item) => (
              <li key={item.href}>
                <SectionNavLink
                  hash={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-2 py-2 text-base font-medium text-[#FFFFFF] hover:bg-[#121215] hover:text-[#FF6B7A]"
                >
                  {item.label}
                </SectionNavLink>
              </li>
            ))}
          </ul>

          <p className="mt-4 border-t border-white/10 px-2 pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#00E5FF]">
            {t.nav.developerUniverse}
          </p>
          <ul className="flex flex-col gap-1.5">
            {developerNavItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`block rounded-md px-2 py-2 text-base font-medium hover:bg-[#121215] hover:text-[#00E5FF] ${
                      active ? 'text-[#00E5FF]' : 'text-[#FFFFFF]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
              <a
                href={ARTIST_CONFIG.platformUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#DC143C]/65 bg-[#121215] px-4 py-2.5 text-sm font-semibold text-[#FFFFFF] hover:border-[#FF1744]"
              >
                <span>{t.nav.creatorPortal}</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
