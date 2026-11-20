import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import type { PressKitAssetPlaceholder, SocialLinkConfig } from '../data/artist';
import type { CertificationEntry } from '../data/certifications';
import type { ProjectEntry } from '../data/projects';
import { LanguageProvider } from '../i18n/LanguageContext';
import type { Locale } from '../i18n/translations';
import type {
  MusicChainClientConfig,
  MusicChainPublicPayload,
} from '../integrations/musicchaini3/types';
import { usePublicArtistData } from '../integrations/musicchaini3/usePublicArtistData';
import { AppRoutes } from './routes';

export interface AppProps {
  artistData?: MusicChainPublicPayload;
  musicChainConfig?: MusicChainClientConfig;
  fetchImpl?: typeof fetch;
  socialLinks?: SocialLinkConfig[];
  pressAssets?: PressKitAssetPlaceholder[];
  projects?: ProjectEntry[];
  certifications?: CertificationEntry[];
  initialLocale?: Locale;
}

export function App({
  artistData,
  musicChainConfig,
  fetchImpl,
  socialLinks,
  pressAssets,
  projects,
  certifications,
  initialLocale = 'de',
}: AppProps) {
  const { data: resolvedArtistData, isLoading } = usePublicArtistData(
    artistData,
    musicChainConfig,
    fetchImpl,
  );

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <LanguageProvider initialLocale={initialLocale}>
          <div className="flex min-h-screen flex-col bg-[#090909] text-[#FFFFFF]">
            <Navbar />
            <main id="main-content" className="flex-1">
              <AppRoutes
                artistData={resolvedArtistData}
                isMusicLoading={isLoading}
                socialLinks={socialLinks}
                pressAssets={pressAssets}
                projects={projects}
                certifications={certifications}
              />
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

export default App;
