import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/Button';
import { BellIcon } from './icons';
import { currentUser } from '../data/mock';
import { useAppState } from '../state/AppState';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Logo({ size = 22 }: { size?: number }) {
  const navigate = useNavigate();
  return (
    <button
      className="fw-reset-btn"
      onClick={() => navigate('/home')}
      style={{ font: `800 ${size}px/1 var(--font-sans)`, letterSpacing: '-0.02em', color: 'var(--navy-900)', flexShrink: 0 }}
    >
      Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
    </button>
  );
}

function Avatar({ unreadCount = 0 }: { unreadCount?: number }) {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginLeft: 'auto', flexShrink: 0 }}>
      <button
        className="fw-reset-btn"
        onClick={() => navigate('/notifications')}
        aria-label="Notifications"
        style={{
          position: 'relative',
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'var(--gray-100)',
          color: 'var(--gray-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BellIcon size={18} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 5,
              right: 6,
              minWidth: 15,
              height: 15,
              padding: '0 3px',
              boxSizing: 'border-box',
              borderRadius: 8,
              background: 'var(--red-500)',
              color: '#fff',
              font: '700 9px/15px var(--font-sans)',
              textAlign: 'center',
              border: '1.5px solid #fff',
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>
      <button
        className="fw-reset-btn"
        onClick={() => navigate('/profile')}
        aria-label="Profile"
        style={{
          width: 34,
          height: 34,
          borderRadius: '50%',
          background: 'var(--navy-900)',
          color: '#fff',
          font: '700 12px/1 var(--font-sans)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {initials(currentUser.name)}
      </button>
    </div>
  );
}

const APP_LINKS = [
  { label: 'Search flights', to: '/home', key: 'search' },
  { label: 'Price alerts', to: '/alerts', key: 'alerts' },
  { label: 'Saved', to: '/saved', key: 'saved' },
  { label: 'Help', to: '/styleguide', key: 'help' },
] as const;

type AppLinkKey = (typeof APP_LINKS)[number]['key'];

export interface TopNavProps {
  /** Signed-out marketing chrome (D1–D3): nav links + Sign in / Create account. */
  variant?: 'marketing' | 'app' | 'task';
  /** Which app link is current, for the `app` variant. */
  active?: AppLinkKey;
  /** Route summary pill for the `task` variant, e.g. mid-search or results. */
  context?: { route: ReactNode; dates: string; travelers: string; onEdit?: () => void };
  /** Alternative to `context`: a "back to results" link, for the `task` variant. */
  backLabel?: string;
  onBack?: () => void;
}

export function TopNav({ variant = 'app', active, context, backLabel, onBack }: TopNavProps) {
  const navigate = useNavigate();
  const { unreadCount, isSignedIn } = useAppState();

  if (variant === 'marketing') {
    return (
      <div className="fw-topnav fw-topnav--marketing">
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, flex: 1, minWidth: 0 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 26 }}>
            {APP_LINKS.slice(0, 3).map((l, i) => (
              <button
                key={l.key}
                className="fw-topnav-link fw-reset-btn"
                aria-current={i === 0 ? 'page' : undefined}
                onClick={() => navigate(l.to)}
              >
                {l.label}
              </button>
            ))}
            <button className="fw-topnav-link fw-reset-btn" onClick={() => navigate('/styleguide')}>
              Help
            </button>
          </div>
        </div>
        {isSignedIn ? (
          <Avatar unreadCount={unreadCount} />
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button variant="ghost" size="sm" onClick={() => navigate('/auth/sign-in')}>
              Sign in
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/auth/create-account')}>
              Create account
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'task') {
    return (
      <div className="fw-topnav">
        <Logo size={20} />
        {backLabel ? (
          <button
            className="fw-reset-btn"
            onClick={onBack ?? (() => navigate(-1))}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: '600 13px/1 var(--font-sans)', color: 'var(--action)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            {backLabel}
          </button>
        ) : context ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '7px 14px',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--r-pill)',
              font: '500 13px/1 var(--font-sans)',
              color: 'var(--text-body)',
            }}
          >
            <span style={{ font: '700 12.5px/1 var(--font-mono)', color: 'var(--navy-900)' }}>{context.route}</span>
            <span style={{ color: 'var(--gray-300)' }}>|</span>
            <span>{context.dates}</span>
            <span style={{ color: 'var(--gray-300)' }}>|</span>
            <span>{context.travelers}</span>
            {context.onEdit && (
              <button className="fw-reset-btn" onClick={context.onEdit} style={{ color: 'var(--action)', fontWeight: 600 }}>
                Edit
              </button>
            )}
          </div>
        ) : null}
        <Avatar unreadCount={unreadCount} />
      </div>
    );
  }

  return (
    <div className="fw-topnav">
      <Logo />
      <div style={{ display: 'flex', gap: 26 }}>
        {APP_LINKS.map((l) => (
          <button key={l.key} className="fw-topnav-link fw-reset-btn" aria-current={active === l.key ? 'page' : undefined} onClick={() => navigate(l.to)}>
            {l.label}
          </button>
        ))}
      </div>
      <Avatar unreadCount={unreadCount} />
    </div>
  );
}
