import { render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../src/app/App';
import {
  clearMusicChainCache,
  getMusicChainConfig,
} from '../src/integrations/musicchaini3/client';

afterEach(() => {
  clearMusicChainCache();
});

describe('V1.2 Public Artist API & Branding Polish', () => {
  it('uses permanent branding copy without version numbers in public Hero and DeveloperBridge headers', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByText('INDEPENDENT ARTIST × DEVELOPER')).toBeInTheDocument();
    expect(screen.getByText('MUSIC × CODE // DEVELOPER UNIVERSE')).toBeInTheDocument();
    expect(screen.queryByText(/V1 FOUNDATION/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/V1\.1 \/\//i)).not.toBeInTheDocument();
  });

  it('dynamically loads releases from the public read-only API and caches subsequent mounts', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/api/public/artist',
      VITE_MUSICCHAIN_CREATOR_SLUG: 'i3lackout',
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        creatorProfile: null,
        releases: [
          {
            id: 'mc-101',
            title: 'Void Protocol',
            releaseType: 'Single',
            releaseDate: '2026-11',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/101/void-protocol',
            bpm: 130,
            genre: 'Melodic Techno',
          },
        ],
        liveStatus: {
          isLive: false,
          statusLabel: 'Aktuell keine Live-Sessions oder Termine angekündigt.',
          events: [],
        },
      }),
    });

    const { unmount } = render(
      <MemoryRouter initialEntries={['/']}>
        <App
          musicChainConfig={config}
          fetchImpl={mockFetch as unknown as typeof fetch}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('music-release-grid')).toBeInTheDocument();
    });

    const grid = screen.getByTestId('music-release-grid');
    expect(within(grid).getByRole('heading', { level: 3, name: 'Void Protocol' })).toBeInTheDocument();
    expect(within(grid).getByText('Melodic Techno · 130 BPM')).toBeInTheDocument();
    expect(screen.getByTestId('music-source-badge')).toHaveTextContent('musicchaini3 · synced');
    expect(mockFetch).toHaveBeenCalledTimes(1);

    unmount();

    render(
      <MemoryRouter initialEntries={['/']}>
        <App
          musicChainConfig={config}
          fetchImpl={mockFetch as unknown as typeof fetch}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('music-source-badge')).toHaveTextContent('musicchaini3 · cached');
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('falls back cleanly to bundled local releases when the public API returns an error', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/api/public/artist',
    });

    const failingFetch = vi.fn().mockRejectedValue(new Error('Service unreachable'));

    render(
      <MemoryRouter initialEntries={['/']}>
        <App
          musicChainConfig={config}
          fetchImpl={failingFetch as unknown as typeof fetch}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 3, name: 'QuizeD (Intro)' })).toBeInTheDocument();
    });
    expect(screen.queryByTestId('music-empty-state')).not.toBeInTheDocument();
    expect(screen.queryByTestId('music-source-badge')).not.toBeInTheDocument();
  });

  it('never renders unpublished or draft tracks returned by an external payload', async () => {
    const config = getMusicChainConfig({
      VITE_MUSICCHAIN_ENABLED: 'true',
      VITE_MUSICCHAIN_API_BASE_URL: 'https://musicchaini3.com',
      VITE_MUSICCHAIN_PUBLIC_PATH: '/api/public/artist',
    });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        creatorProfile: null,
        releases: [
          {
            id: 'mc-draft',
            title: 'Hidden Studio Draft',
            releaseType: 'Single',
            releaseDate: '2026-11',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/draft',
            status: 'draft',
          },
          {
            id: 'mc-live',
            title: 'Pressure Protocol',
            releaseType: 'Single',
            releaseDate: '2026-11',
            coverUrl: null,
            platformUrl: 'https://musicchaini3.com/track/live',
            isPublic: true,
          },
        ],
        liveStatus: {
          isLive: false,
          statusLabel: 'Offline',
          events: [],
        },
      }),
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <App
          musicChainConfig={config}
          fetchImpl={mockFetch as unknown as typeof fetch}
        />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('music-release-grid')).toBeInTheDocument();
    });

    const grid = screen.getByTestId('music-release-grid');
    expect(
      within(grid).getByRole('heading', { level: 3, name: 'Pressure Protocol' }),
    ).toBeInTheDocument();
    expect(within(grid).queryByText('Hidden Studio Draft')).not.toBeInTheDocument();
  });
});
