import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { App } from '../src/app/App';
import { CERTIFICATIONS, type CertificationEntry } from '../src/data/certifications';
import { PROJECTS, type ProjectEntry } from '../src/data/projects';

function renderAt(
  route: string,
  overrides?: {
    projects?: ProjectEntry[];
    certifications?: CertificationEntry[];
  },
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App projects={overrides?.projects} certifications={overrides?.certifications} />
    </MemoryRouter>,
  );
}

describe('I3LACKOUT.COM V1.1 Developer Universe', () => {
  it('navigates between Music Universe and all Developer Universe routes cleanly', async () => {
    const user = userEvent.setup();
    renderAt('/');

    const desktopNav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    await user.click(within(desktopNav).getByRole('link', { name: 'Developer' }));
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: /Software Developer & Creative Technologist/i }),
    ).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Developer Universe Navigation' })).getByRole(
        'link',
        { name: 'Projects' },
      ),
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: /Projekte & Plattform-Architektur/i }),
    ).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Developer Universe Navigation' })).getByRole(
        'link',
        { name: 'Certifications' },
      ),
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: /Zertifikate & Qualifikationen/i }),
    ).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Developer Universe Navigation' })).getByRole(
        'link',
        { name: 'Tech Stack' },
      ),
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole('heading', { level: 1, name: /Technologien & Einordnung/i }),
    ).toBeInTheDocument();
  });

  it('supports responsive mobile navigation for both Music and Developer Universe', async () => {
    const user = userEvent.setup();
    renderAt('/');

    const toggle = screen.getByRole('button', { name: 'Navigation öffnen' });
    await user.click(toggle);

    const mobileNav = screen.getByRole('navigation', { name: 'Mobile Navigation' });
    expect(within(mobileNav).getByText('Music Universe')).toBeInTheDocument();
    expect(within(mobileNav).getByText('Developer Universe')).toBeInTheDocument();

    await user.click(within(mobileNav).getByRole('link', { name: 'Projects' }));
    expect(
      screen.getByRole('heading', { level: 1, name: /Projekte & Plattform-Architektur/i }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('navigation', { name: 'Mobile Navigation' })).not.toBeInTheDocument();
  });

  it('renders Developer Profile accurately with C# training status and philosophy', () => {
    renderAt('/developer');

    expect(
      screen.getByRole('heading', { level: 1, name: /Software Developer & Creative Technologist/i }),
    ).toBeInTheDocument();

    const techBar = screen.getByLabelText('Kerntechnologien');
    expect(within(techBar).getByText('Python')).toBeInTheDocument();
    expect(within(techBar).getByText('Flask')).toBeInTheDocument();
    expect(within(techBar).getByText('JavaScript')).toBeInTheDocument();
    expect(within(techBar).getByText('C#')).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Betriebliche IT-Ausbildung mit C# \(nicht abgeschlossen\)/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Eigenständige Entwicklung von musicchaini3/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Music × Code × Technology' }),
    ).toBeInTheDocument();
  });

  it('renders musicchaini3 project card with documented technologies and supports filtering', async () => {
    const user = userEvent.setup();
    renderAt('/projects');

    const musicchainCard = screen.getByTestId('project-card-musicchaini3');
    expect(within(musicchainCard).getByRole('heading', { level: 2, name: 'musicchaini3' })).toBeInTheDocument();
    for (const tech of [
      'Python / Flask',
      'MariaDB / SQLAlchemy',
      'React Native / Expo',
      'WebRTC',
      'Google Cloud',
      'REST APIs',
      'Automated Testing',
    ]) {
      expect(within(musicchainCard).getByText(tech)).toBeInTheDocument();
    }

    const filterArea = screen.getByLabelText('Projektfilter');
    await user.click(within(filterArea).getByRole('button', { name: 'Web & Artist' }));
    expect(screen.queryByTestId('project-card-musicchaini3')).not.toBeInTheDocument();
    expect(screen.getByTestId('project-card-i3lackout-web')).toBeInTheDocument();

    await user.click(within(filterArea).getByRole('button', { name: 'WebRTC' }));
    expect(screen.getByTestId('projects-empty-state')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Filter zurücksetzen' }));
    expect(screen.getByTestId('project-card-musicchaini3')).toBeInTheDocument();
  });

  it('renders verified W3Schools/X and pending certifications and filters by provider/topic', async () => {
    const user = userEvent.setup();
    renderAt('/certifications');

    expect(screen.getByTestId('certifications-pending-notice')).toBeInTheDocument();

    const cards = screen.getAllByTestId(/^certification-card-/);
    expect(cards).toHaveLength(CERTIFICATIONS.length);

    const htmlCard = screen.getByTestId('certification-card-cert-html5');
    expect(within(htmlCard).getByText('verified_document')).toBeInTheDocument();
    expect(within(htmlCard).getByText(/1OM4D6LE0F/)).toBeInTheDocument();
    expect(
      within(htmlCard).getByRole('link', { name: /Nachweis prüfen/i }),
    ).toHaveAttribute('href', 'https://verify.w3schools.com/1OM4D6LE0F');

    const blockchainCard = screen.getByTestId('certification-card-cert-blockchain');
    expect(within(blockchainCard).getByText('verified_document')).toBeInTheDocument();
    expect(within(blockchainCard).getByText(/267dd51a8f7e4089/)).toBeInTheDocument();
    expect(
      within(blockchainCard).getByRole('link', { name: /Zertifikat ansehen/i }),
    ).toHaveAttribute('href', '/certificates/x-blockchain.png');

    const providerGroup = screen.getByRole('group', { name: 'Anbieterfilter' });
    await user.click(within(providerGroup).getByRole('button', { name: 'CodingX' }));
    const hubCards = screen.getAllByTestId(/^certification-card-/);
    expect(hubCards.length).toBeGreaterThan(0);
    expect(hubCards.length).toBeLessThan(CERTIFICATIONS.length);
    expect(screen.getByText('Java Programming (CodingX)')).toBeInTheDocument();
    expect(screen.queryByText('Certified HTML Developer (W3Schools)')).not.toBeInTheDocument();

    await user.click(within(providerGroup).getByRole('button', { name: 'Alle' }));
    const searchInput = screen.getByPlaceholderText(/Thema suchen/i);
    await user.type(searchInput, 'Blockchain');
    expect(screen.getAllByTestId(/^certification-card-/)).toHaveLength(1);
    expect(screen.getByText('Blockchain Technology (CodingX)')).toBeInTheDocument();
  });

  it('rejects invalid external links in projects and certifications', () => {
    const unsafeProjects: ProjectEntry[] = [
      {
        ...PROJECTS[0],
        id: 'unsafe-proj',
        externalUrl: 'javascript:alert(1)',
        externalLabel: 'Unsafe Link',
      },
      {
        ...PROJECTS[0],
        id: 'ftp-proj',
        externalUrl: 'ftp://example.com/file',
        externalLabel: 'FTP Link',
      },
    ];

    renderAt('/projects', { projects: unsafeProjects });
    expect(screen.queryByRole('link', { name: /Unsafe Link/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /FTP Link/i })).not.toBeInTheDocument();

    const unsafeCerts: CertificationEntry[] = [
      {
        ...CERTIFICATIONS[0],
        id: 'unsafe-cert',
        status: 'pending_document',
        isProvisional: true,
        documentUrl: 'javascript:alert(1)',
        verificationUrl: 'data:text/html,<script>alert(1)</script>',
      },
    ];

    renderAt('/certifications', { certifications: unsafeCerts });
    const certCard = screen.getByTestId('certification-card-unsafe-cert');
    expect(within(certCard).queryByRole('link')).not.toBeInTheDocument();
    expect(within(certCard).getByText(/Dokumentprüfung ausstehend/i)).toBeInTheDocument();
  });

  it('renders Tech Stack separated into 3 categories without invented percentages', () => {
    renderAt('/tech-stack');

    expect(
      screen.getByRole('heading', { level: 2, name: 'Praktisch eingesetzte Technologien' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Ausbildung / Weiterbildung' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Experimentelle Technologien' }),
    ).toBeInTheDocument();

    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('translates Developer Universe subpages completely when switching DE to EN', async () => {
    const user = userEvent.setup();
    renderAt('/developer');

    const desktopNav = screen.getByRole('navigation', { name: 'Hauptnavigation' });
    await user.click(within(desktopNav).getByRole('button', { name: /^en$/i }));

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Vocational IT Training with C# \(not completed\)/i,
      }),
    ).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Developer Universe Navigation' })).getByRole(
        'link',
        { name: 'Projects' },
      ),
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /Projects & Platform Architecture/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Active Development')).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Developer Universe Navigation' })).getByRole(
        'link',
        { name: 'Certifications' },
      ),
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /Certifications & Qualifications/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText('Python (W3Schools · Pending)')).toBeInTheDocument();

    await user.click(
      within(screen.getByRole('navigation', { name: 'Developer Universe Navigation' })).getByRole(
        'link',
        { name: 'Tech Stack' },
      ),
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /Technologies & Categorization/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Technologies Used in Practice' }),
    ).toBeInTheDocument();
  });
});
