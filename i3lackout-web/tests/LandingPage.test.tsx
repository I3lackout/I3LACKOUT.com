import fs from 'node:fs';
import path from 'node:path';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../src/app/App';
import type { PressKitAssetPlaceholder, SocialLinkConfig } from '../src/data/artist';
import type { CertificationEntry } from '../src/data/certifications';
import type { Locale } from '../src/i18n/translations';
import { MUSICCHAIN_FALLBACK_DATA } from '../src/integrations/musicchaini3/fallback';
import type { MusicChainPublicPayload } from '../src/integrations/musicchaini3/types';
import { mockMatchMedia } from './setup';

function renderApp(
  initialEntries: string[] = ['/'],
  props?: {
    artistData?: MusicChainPublicPayload;
    socialLinks?: SocialLinkConfig[];
    pressAssets?: PressKitAssetPlaceholder[];
    certifications?: CertificationEntry[];
    initialLocale?: Locale;
  },
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App
        artistData={props?.artistData}
        socialLinks={props?.socialLinks}
        pressAssets={props?.pressAssets}
        certifications={props?.certifications}
        initialLocale={props?.initialLocale}
      />
    </MemoryRouter>,
  );
}

describe('I3LACKOUT.COM V1.6 Artist Content Pack & Foundation', () => {
  it('renders the V1.6 hero, all sections, and footer branding cleanly', () => {
    renderApp();

    expect(screen.getByRole('heading', { level: 1, name: 'I3LACKOUT' })).toBeInTheDocument();
    expect(screen.getByText('INDEPENDENT ARTIST × DEVELOPER')).toBeInTheDocument();
    expect(
      screen.getByText('Independent Electronic Music Artist · Software Developer · Digital Creator'),
    ).toBeInTheDocument();
    expect(screen.getByText('Music × Technology × Innovation')).toBeInTheDocument();
    expect(screen.getAllByText('NO SOFT MODE.').length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('JUST SOUND. PRESSURE. IMPACT.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /EXPLORE THE MUSIC/i })).toHaveAttribute(
      'href',
      '#music',
    );
    expect(screen.getByRole('link', { name: /DISCOVER THE CODE/i })).toHaveAttribute(
      'href',
      '#developer-universe',
    );
    expect(screen.getByRole('link', { name: 'I3lackout@gmx.de' })).toHaveAttribute(
      'href',
      'mailto:I3lackout@gmx.de',
    );

    expect(
      screen.getByRole('heading', { level: 2, name: /TURN UP THE PRESSURE\./i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /About I3LACKOUT/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /Live & Termine/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /Social Hub & Creator Portal/i }),
    ).toBeInTheDocument();
    const socialSection = document.getElementById('social') as HTMLElement;
    expect(
      within(socialSection).getByRole('link', { name: /EXPLORE MUSICCHAINI3/i }),
    ).toHaveAttribute('href', 'https://musicchaini3.com/user/guest/analytics');
    expect(screen.getByRole('heading', { level: 2, name: 'PRESS / MEDIA' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /BEYOND THE SOUND\./i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole('heading', { level: 3, name: 'musicchaini3' }),
    ).toHaveLength(2);

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText('© 2026 I3LACKOUT')).toBeInTheDocument();
    expect(within(footer).getByText('NO SOFT MODE.')).toBeInTheDocument();
    expect(within(footer).getByRole('link', { name: /musicchaini3\.com/i })).toHaveAttribute(
      'href',
      'https://musicchaini3.com',
    );
  });

  it('supports bilingual DE/EN switching across Hero, About, Music, Press Kit, and Developer Bridge', async () => {
    const user = userEvent.setup();
    renderApp();

    expect(
      screen.getAllByText('Hau-drauf-Mucke. Ohne Kompromisse.').length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/Druckvolle elektronische Musik trifft auf unabhängige Technologie\./i),
    ).toBeInTheDocument();

    const desktopNav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    await user.click(within(desktopNav).getByRole('button', { name: /^en$/i }));

    expect(
      screen.getAllByText('Hard-Hitting Sound. No Compromises.').length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(
        /Hard-hitting electronic music meets independent technology\. Built for energy, experimentation and pure sonic impact\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Heavy sounds\. Raw energy\. No unnecessary limits\. Explore the official I3LACKOUT releases and discover the tracks behind the noise\./i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Music is only part of the equation\. I3LACKOUT also builds digital experiences, creator tools and experimental technologies\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'PRESS / MEDIA' })).toBeInTheDocument();
  });

  it('supports desktop navigation links, mobile menu toggle, and complete Impressum/Datenschutz routes', async () => {
    const user = userEvent.setup();
    renderApp();

    const desktopNav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    expect(within(desktopNav).getByRole('link', { name: 'Music' })).toHaveAttribute(
      'href',
      '#music',
    );
    expect(within(desktopNav).getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '#about',
    );
    expect(within(desktopNav).getByRole('link', { name: 'Live' })).toHaveAttribute('href', '#live');
    expect(within(desktopNav).getByRole('link', { name: 'Social Hub' })).toHaveAttribute(
      'href',
      '#social',
    );
    expect(within(desktopNav).getByRole('link', { name: 'Press' })).toHaveAttribute(
      'href',
      '#press-kit',
    );

    const toggleButton = screen.getByRole('button', { name: 'Navigation öffnen' });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile Navigation' });
    expect(within(mobileNav).getByRole('link', { name: 'Music' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Impressum' }));
    expect(
      screen.getByRole('heading', { level: 1, name: /^Impressum$/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Michael Kowol/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Lindenstraße 15 1B/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/38704 Liebenburg/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('link', { name: 'I3lackout@gmx.de' })).toHaveAttribute(
      'href',
      'mailto:I3lackout@gmx.de',
    );

    await user.click(screen.getByRole('link', { name: 'Datenschutz' }));
    expect(
      screen.getByRole('heading', { level: 1, name: /^Datenschutzerklärung$/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/1\. Verantwortlicher \(Art\. 13 DSGVO\)/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /3\. Optionale Abfrage öffentlicher Daten von musicchaini3\.com/i,
      }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: /Zurück zur Startseite/i }));
    expect(screen.getByRole('heading', { level: 1, name: 'I3LACKOUT' })).toBeInTheDocument();

    const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    expect(sitemapContent).toContain('/impressum');
    expect(sitemapContent).toContain('/datenschutz');
  });

  it('handles an empty release list gracefully without API access', () => {
    renderApp(['/'], {
      artistData: { ...MUSICCHAIN_FALLBACK_DATA, releases: [] },
    });

    const emptyState = screen.getByTestId('music-empty-state');
    expect(emptyState).toBeInTheDocument();
    expect(
      within(emptyState).getByText(/Noch keine öffentlichen Releases eingebunden/i),
    ).toBeInTheDocument();
    expect(
      within(emptyState).getByRole('link', { name: /LISTEN ON MUSICCHAINI3/i }),
    ).toHaveAttribute('href', 'https://musicchaini3.com/frontpage/');
  });

  it('renders configured release cards cleanly with cover placeholder and metadata', () => {
    const customData: MusicChainPublicPayload = {
      ...MUSICCHAIN_FALLBACK_DATA,
      releases: [
        {
          id: 'rel-1',
          title: 'Test Signal Alpha',
          releaseType: 'Single',
          releaseDate: '2026',
          coverUrl: null,
          platformUrl: 'https://musicchaini3.com',
          bpm: 132,
          genre: 'Electronic',
        },
      ],
    };

    renderApp(['/'], { artistData: customData });

    expect(screen.queryByTestId('music-empty-state')).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Test Signal Alpha' })).toBeInTheDocument();
    expect(screen.getByText(/Cover-Platzhalter/i)).toBeInTheDocument();
    expect(screen.getByText('Electronic · 132 BPM')).toBeInTheDocument();
  });

  it('renders social links only when verified and validly configured', () => {
    renderApp(['/'], { socialLinks: [] });
    expect(screen.getByTestId('social-empty-state')).toBeInTheDocument();
    expect(screen.queryByTestId('social-links-list')).not.toBeInTheDocument();

    renderApp();
    const defaultList = screen.getByTestId('social-links-list');
    expect(
      within(defaultList).getByRole('link', { name: /Instagram \(Creator\)/i }),
    ).toHaveAttribute('href', 'https://www.instagram.com/ithreelackout/');
    expect(within(defaultList).getByRole('link', { name: /GitHub/i })).toHaveAttribute(
      'href',
      'https://github.com/I3lackout/musicchaini3',
    );
    expect(within(defaultList).getByRole('link', { name: /TikTok/i })).toHaveAttribute(
      'href',
      'https://www.tiktok.com/@i3lackout5',
    );
    expect(within(defaultList).getByRole('link', { name: /SoundCloud/i })).toHaveAttribute(
      'href',
      'https://soundcloud.com/user-725368592-910550547',
    );
    expect(within(defaultList).queryByText('YouTube')).not.toBeInTheDocument();
    expect(within(defaultList).queryByText('Spotify')).not.toBeInTheDocument();

    const mixedLinks: SocialLinkConfig[] = [
      { id: 'empty', label: 'Empty Channel', url: '' },
      { id: 'unsafe', label: 'Unsafe Channel', url: 'javascript:alert(1)' },
      { id: 'invalid', label: 'Invalid Channel', url: 'not-a-url' },
      {
        id: 'unverified',
        label: 'Unverified Channel',
        url: 'https://example.com/unverified',
        verified: false,
      },
      {
        id: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://soundcloud.com/example',
        handle: '@example',
        verified: true,
      },
    ];

    renderApp(['/'], { socialLinks: mixedLinks });
    const list = screen.getAllByTestId('social-links-list')[1];
    expect(within(list).getByRole('link', { name: /SoundCloud/i })).toHaveAttribute(
      'href',
      'https://soundcloud.com/example',
    );
    expect(within(list).queryByText('Empty Channel')).not.toBeInTheDocument();
    expect(within(list).queryByText('Unsafe Channel')).not.toBeInTheDocument();
    expect(within(list).queryByText('Invalid Channel')).not.toBeInTheDocument();
    expect(within(list).queryByText('Unverified Channel')).not.toBeInTheDocument();
    expect(within(list).queryByText(/verifiziert|verified/i)).not.toBeInTheDocument();
  });

  it('hides unavailable press downloads and displays only verified, approved certificates in Press Kit', () => {
    const customCerts: CertificationEntry[] = [
      {
        id: 'pending-cert',
        provisionalTitle: 'Pending Course',
        provider: 'W3Schools',
        topic: 'Python',
        note: 'Unverified',
        status: 'pending_document',
        isProvisional: true,
        approved: false,
        documentUrl: null,
        verificationUrl: null,
      },
      {
        id: 'unapproved-verified-cert',
        provisionalTitle: 'Verified But Unapproved',
        provider: 'CodingX',
        topic: 'C#',
        note: 'Awaiting release approval',
        status: 'verified_document',
        isProvisional: true,
        approved: false,
        documentUrl: null,
        verificationUrl: null,
      },
      {
        id: 'approved-cert',
        provisionalTitle: 'Approved Official Certificate',
        provider: 'W3Schools',
        topic: 'Python',
        note: 'Verified Document',
        status: 'verified_document',
        isProvisional: true,
        approved: true,
        documentUrl: null,
        verificationUrl: null,
      },
    ];

    renderApp(['/'], {
      pressAssets: [
        {
          id: 'unavailable-logo',
          title: 'Unavailable Logo Pack',
          formatHint: 'SVG · PNG',
          description: 'Not ready',
          assetUrl: null,
          available: false,
        },
      ],
      certifications: customCerts,
    });

    expect(screen.getByTestId('press-assets-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('press-assets-grid')).not.toBeInTheDocument();
    expect(screen.queryByText('Unavailable Logo Pack')).not.toBeInTheDocument();

    const certList = screen.getByTestId('press-certificates-list');
    expect(within(certList).getByText('Approved Official Certificate')).toBeInTheDocument();
    expect(within(certList).queryByText('Pending Course')).not.toBeInTheDocument();
    expect(within(certList).queryByText('Verified But Unapproved')).not.toBeInTheDocument();
  });

  it('shows a neutral offline/no-dates state in the Live section without invented events', () => {
    renderApp();

    const livePanel = screen.getByTestId('live-status-panel');
    expect(within(livePanel).getByText('Keine aktive Session')).toBeInTheDocument();
    expect(within(livePanel).getByText('STANDBY // OFFLINE')).toBeInTheDocument();
    expect(
      within(livePanel).getByText('Aktuell keine Live-Sessions oder Termine angekündigt.'),
    ).toBeInTheDocument();
  });

  it('supports prefers-reduced-motion in both CSS and the decorative AudioVisualizer', () => {
    mockMatchMedia(true);
    renderApp();

    const visualizer = screen.getByTestId('decorative-audio-visualizer');
    expect(visualizer).toHaveAttribute('aria-hidden', 'true');
    expect(visualizer).toHaveAttribute('data-decorative', 'true');
    expect(visualizer).toHaveAttribute('data-reduced-motion', 'true');

    const cssPath = path.resolve(process.cwd(), 'src/styles/globals.css');
    const cssContent = fs.readFileSync(cssPath, 'utf-8');
    expect(cssContent).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('publishes V1.9 SEO/Open Graph metadata in index.html with verified artist image assets', () => {
    const htmlPath = path.resolve(process.cwd(), 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    expect(html).toContain(
      '<title>I3LACKOUT — INDEPENDENT ARTIST × DEVELOPER | NO SOFT MODE.</title>',
    );
    expect(html).toContain('NO SOFT MODE. JUST SOUND. PRESSURE. IMPACT.');
    expect(html).toContain('<meta name="musicchain-proof" content="MCI3-000031-2A304C" />');
    expect(html).toContain(
      '<meta property="og:image" content="https://i3lackout.com/images/i3lackout-og.jpg" />',
    );
    expect(html).toContain(
      '<meta name="twitter:image" content="https://i3lackout.com/images/i3lackout-og.jpg" />',
    );
    expect(html).not.toContain('I3-Hybrid-Stil');
    expect(
      fs.existsSync(path.resolve(process.cwd(), 'public/images/i3lackout-artist.jpg')),
    ).toBe(true);
    expect(fs.existsSync(path.resolve(process.cwd(), 'public/images/i3lackout-og.jpg'))).toBe(
      true,
    );
  });

  it('scrolls to hash target cleanly on SPA navigation from subroutes and uses WCAG-AA label color', async () => {
    const scrollIntoViewMock = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      writable: true,
      value: scrollIntoViewMock,
    });
    const rafSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });

    try {
      const user = userEvent.setup();
      renderApp(['/developer']);

      const desktopNav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
      await user.click(within(desktopNav).getByRole('link', { name: 'Music' }));

      expect(scrollIntoViewMock).toHaveBeenCalled();
      const shortBioLabel = screen.getByText('SHORT BIO');
      expect(shortBioLabel).toHaveClass('text-[#FF6B7A]');
      expect(shortBioLabel).not.toHaveClass('text-[#8B5CF6]');
      expect(shortBioLabel).not.toHaveClass('text-[#DC143C]');
    } finally {
      rafSpy.mockRestore();
    }
  });
});
