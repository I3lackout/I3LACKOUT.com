import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SectionNavLinkProps {
  hash: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

/**
 * Navigates to a landing-page section hash without triggering full-page reloads from subroutes.
 */
export function SectionNavLink({ hash, className, onClick, children }: SectionNavLinkProps) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  if (isHome) {
    return (
      <a href={hash} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={{ pathname: '/', hash }} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
