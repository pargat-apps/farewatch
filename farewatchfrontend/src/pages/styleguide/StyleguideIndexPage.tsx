import { Link } from 'react-router-dom';

interface LinkItem {
  label: string;
  to: string;
  note?: string;
}

interface Section {
  letter: string;
  title: string;
  items: LinkItem[];
}

const SECTIONS: Section[] = [
  {
    letter: 'A',
    title: 'Search flow',
    items: [
      { label: 'Splash / intro', to: '/' },
      { label: 'Homepage — logged out', to: '/home' },
      { label: 'Airport search — full screen', to: '/search/airport?field=from' },
      { label: 'Date picker', to: '/search/dates' },
      { label: 'Travelers & cabin — bottom sheet', to: '/search/travelers' },
      { label: 'Search loading', to: '/search/loading' },
    ],
  },
  {
    letter: 'B',
    title: 'Results, compare & providers',
    items: [
      { label: 'Search results (Sort & Filters open from here)', to: '/results' },
      { label: 'No results', to: '/results/empty' },
      { label: 'Flight details + price breakdown', to: '/flight/ac42' },
      { label: 'Compare booking options', to: '/flight/ac42/compare' },
      { label: 'View deal — provider handoff', to: '/provider/trip/deal?flightId=ac42' },
      { label: 'Price changed', to: '/flight/ac42/price-changed' },
      { label: 'No booking options', to: '/flight/ac42/sold-out' },
      { label: 'Compare flights — swipeable', to: '/compare-flights' },
    ],
  },
  {
    letter: 'C',
    title: 'Price tracking',
    items: [
      { label: 'Track price — bottom sheet', to: '/track/ac42' },
      { label: 'Alert created — success', to: '/track/ac42/success?target=900' },
      { label: 'Target reached', to: '/target-reached' },
      { label: 'Price history', to: '/alerts/yyzdel/history' },
    ],
  },
  {
    letter: 'D',
    title: 'Auth',
    items: [
      { label: 'Sign in', to: '/auth/sign-in' },
      { label: 'Create account', to: '/auth/create-account' },
      { label: 'Forgot password (form + sent)', to: '/auth/forgot-password' },
    ],
  },
  {
    letter: 'E',
    title: 'Dashboard & alerts',
    items: [
      { label: 'Dashboard — logged-in home', to: '/dashboard' },
      { label: 'My alerts (All / Active / Paused / Expired tabs, more menu)', to: '/alerts' },
      { label: 'Edit alert', to: '/alerts/yyzdel/edit' },
    ],
  },
  {
    letter: 'F',
    title: 'Notifications, saved & profile',
    items: [
      { label: 'Notifications', to: '/notifications' },
      { label: 'Saved searches', to: '/saved' },
      { label: 'Profile', to: '/profile' },
      { label: 'Edit profile', to: '/profile/edit' },
      { label: 'Settings', to: '/profile/settings' },
    ],
  },
  {
    letter: 'G',
    title: 'Empty & error states',
    items: [
      { label: 'Empty alerts / notifications / saved', to: '/alerts', note: 'Delete all rows on each list to see its empty state.' },
      { label: 'Network error', to: '/error/network' },
      { label: 'Search error', to: '/error/search' },
      { label: 'Alert error — in sheet', to: '/error/alert' },
    ],
  },
  {
    letter: 'H',
    title: 'Components',
    items: [
      { label: 'Toasts', to: '/styleguide/toasts' },
      { label: 'Bottom navigation states', to: '/styleguide/tabbar' },
      { label: 'Component sheet', to: '/styleguide/components' },
    ],
  },
];

export default function StyleguideIndexPage() {
  return (
    <div style={{ width: '100%', maxWidth: 720, margin: '0 auto', padding: '40px 24px 60px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
        <span style={{ font: '800 24px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
          Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
        </span>
        <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Screen index</span>
      </div>
      <p style={{ font: '400 13px/1.6 var(--font-sans)', color: 'var(--text-muted)', maxWidth: 560, marginTop: 4 }}>
        Every screen from the design handoff, organized the same way as the original canvas. Use this as a quick way to jump to
        any screen for review — the app itself is reached from <Link to="/">the splash screen</Link>.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 28 }}>
        {SECTIONS.map((s) => (
          <div key={s.letter}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
              <span style={{ font: '700 11px/1 var(--font-mono)', padding: '4px 8px', background: 'var(--navy-900)', color: '#fff', borderRadius: 5 }}>{s.letter}</span>
              <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{s.title}</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
              {s.items.map((item, i) => (
                <Link
                  key={item.to + item.label}
                  to={item.to}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px 16px',
                    borderBottom: i < s.items.length - 1 ? '1px solid var(--gray-100)' : undefined,
                    textDecoration: 'none',
                  }}
                >
                  <span style={{ font: '500 14px/1.3 var(--font-sans)', color: 'var(--text-heading)' }}>{item.label}</span>
                  {item.note && <span style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-faint)', marginTop: 3 }}>{item.note}</span>}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
