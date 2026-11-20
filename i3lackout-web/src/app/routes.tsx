import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import type { PressKitAssetPlaceholder, SocialLinkConfig } from '../data/artist';
import type { CertificationEntry } from '../data/certifications';
import type { ProjectEntry } from '../data/projects';
import type { MusicChainPublicPayload } from '../integrations/musicchaini3/types';
import { CertificationsPage } from '../pages/CertificationsPage';
import { DeveloperPage } from '../pages/DeveloperPage';
import { LegalPage } from '../pages/LegalPage';
import { ProjectsPage } from '../pages/ProjectsPage';
import { TechStackPage } from '../pages/TechStackPage';
import { About } from '../sections/About';
import { DeveloperBridge } from '../sections/DeveloperBridge';
import { Hero } from '../sections/Hero';
import { Live } from '../sections/Live';
import { Music } from '../sections/Music';
import { PressKit } from '../sections/PressKit';
import { SocialHub } from '../sections/SocialHub';

interface LandingPageProps {
  artistData?: MusicChainPublicPayload;
  isMusicLoading?: boolean;
  socialLinks?: SocialLinkConfig[];
  pressAssets?: PressKitAssetPlaceholder[];
  certifications?: CertificationEntry[];
}

function LandingPage({
  artistData,
  isMusicLoading = false,
  socialLinks,
  pressAssets,
  certifications,
}: LandingPageProps) {
  return (
    <>
      <Hero />
      <Music
        releases={artistData?.releases}
        isLoading={isMusicLoading}
        dataSource={artistData?.source}
      />
      <About />
      <Live liveStatus={artistData?.liveStatus} />
      <SocialHub links={socialLinks} />
      <PressKit assets={pressAssets} certificates={certifications} />
      <DeveloperBridge />
    </>
  );
}

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      const frameId = window.requestAnimationFrame(() => {
        const target = targetId ? document.getElementById(targetId) : null;
        if (target && typeof target.scrollIntoView === 'function') {
          const reduced =
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        }
      });
      return () => window.cancelAnimationFrame(frameId);
    }

    if (typeof window.scrollTo === 'function') {
      window.scrollTo(0, 0);
    }
    return undefined;
  }, [pathname, hash]);

  return null;
}

export interface AppRoutesProps {
  artistData?: MusicChainPublicPayload;
  isMusicLoading?: boolean;
  socialLinks?: SocialLinkConfig[];
  pressAssets?: PressKitAssetPlaceholder[];
  projects?: ProjectEntry[];
  certifications?: CertificationEntry[];
}

export function AppRoutes({
  artistData,
  isMusicLoading = false,
  socialLinks,
  pressAssets,
  projects,
  certifications,
}: AppRoutesProps) {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              artistData={artistData}
              isMusicLoading={isMusicLoading}
              socialLinks={socialLinks}
              pressAssets={pressAssets}
              certifications={certifications}
            />
          }
        />
        <Route path="/developer" element={<DeveloperPage />} />
        <Route path="/projects" element={<ProjectsPage projects={projects} />} />
        <Route
          path="/certifications"
          element={<CertificationsPage certifications={certifications} />}
        />
        <Route path="/tech-stack" element={<TechStackPage />} />
        <Route path="/impressum" element={<LegalPage variant="impressum" />} />
        <Route path="/datenschutz" element={<LegalPage variant="datenschutz" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
