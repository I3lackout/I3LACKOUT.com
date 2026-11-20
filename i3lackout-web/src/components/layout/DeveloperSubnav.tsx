import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';

export function DeveloperSubnav() {
  const location = useLocation();
  const { t } = useLanguage();

  const developerTabs = [
    { label: t.developerPages.subnav.profile, to: '/developer' },
    { label: t.developerPages.subnav.projects, to: '/projects' },
    { label: t.developerPages.subnav.certifications, to: '/certifications' },
    { label: t.developerPages.subnav.techStack, to: '/tech-stack' },
  ];

  return (
    <nav
      aria-label={t.developerPages.subnavAriaLabel}
      className="mb-10 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4"
    >
      {developerTabs.map((tab) => {
        const active = location.pathname === tab.to;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            aria-current={active ? 'page' : undefined}
            className={`rounded-lg border px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition ${
              active
                ? 'border-[#00E5FF] bg-[#00E5FF]/12 text-[#00E5FF]'
                : 'border-white/10 bg-[#121215] text-[#B8B8C4] hover:border-[#00E5FF]/45 hover:text-[#FFFFFF]'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
