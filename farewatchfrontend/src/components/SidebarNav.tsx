import { useNavigate } from 'react-router-dom';
import { TABS, TAB_ROUTES, TAB_ICONS, type TabName } from './TabBar';
import { LogoutIcon } from './icons';
import { currentUser } from '../data/mock';
import { useAppState } from '../state/AppState';

export interface SidebarNavProps {
  active: TabName;
  badge?: number;
}

/**
 * Desktop replacement for the bottom TabBar (>=1024px, via the .fw-sidebar
 * CSS rule in global.css). Renders unconditionally — visibility is handled
 * entirely by CSS so there's no layout flash or resize-driven remount.
 */
export function SidebarNav({ active, badge = 0 }: SidebarNavProps) {
  const navigate = useNavigate();
  const { signOut } = useAppState();

  return (
    <aside className="fw-sidebar" aria-label="Primary navigation">
      <div
        style={{ display: 'flex', alignItems: 'center', height: 64, padding: '0 20px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}
      >
        <button className="fw-reset-btn" onClick={() => navigate('/home')} style={{ font: '800 18px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
          Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
        </button>
      </div>

      <nav style={{ flex: 1, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {TABS.map((name) => {
          const on = name === active;
          return (
            <button
              key={name}
              className="fw-reset-btn"
              onClick={() => navigate(TAB_ROUTES[name])}
              aria-current={on ? 'page' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 'var(--r-md)',
                background: on ? 'var(--surface-selected)' : 'transparent',
                textAlign: 'left',
              }}
            >
              {TAB_ICONS[name](on, 19)}
              <span style={{ flex: 1, font: `${on ? 600 : 500} 14px/1 var(--font-sans)`, color: on ? 'var(--blue-700)' : 'var(--text-body)' }}>
                {name === 'Search' ? 'Dashboard' : name}
              </span>
              {name === 'Notifications' && badge > 0 && (
                <span
                  style={{
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    background: 'var(--green-600)',
                    color: '#fff',
                    font: '700 10.5px/18px var(--font-sans)',
                    textAlign: 'center',
                    padding: '0 5px',
                    boxSizing: 'border-box',
                  }}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ borderTop: '1px solid var(--border-default)', padding: 12, flexShrink: 0 }}>
        <button
          className="fw-reset-btn"
          onClick={() => navigate('/profile')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px', borderRadius: 'var(--r-md)', width: '100%', textAlign: 'left' }}
        >
          <img src={currentUser.avatar} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '600 13px/1.2 var(--font-sans)', color: 'var(--navy-900)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.name}
            </div>
          </div>
        </button>
        <button
          className="fw-reset-btn"
          onClick={() => {
            signOut();
            navigate('/home');
          }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px', marginTop: 2, borderRadius: 'var(--r-md)', width: '100%', textAlign: 'left' }}
        >
          <LogoutIcon size={15} color="var(--red-600)" />
          <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--red-600)' }}>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
