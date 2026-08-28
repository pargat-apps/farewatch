import { useNavigate } from 'react-router-dom';
import { BellIcon, ProfileIcon, SearchIcon, TargetIcon, HeartIcon } from './icons';

export type TabName = 'Search' | 'Alerts' | 'Saved' | 'Notifications' | 'Profile';

export const TAB_ROUTES: Record<TabName, string> = {
  Search: '/dashboard',
  Alerts: '/alerts',
  Saved: '/saved',
  Notifications: '/notifications',
  Profile: '/profile',
};

export const TAB_ICONS: Record<TabName, (active: boolean, size?: number) => React.ReactNode> = {
  Search: (on, size = 22) => <SearchIcon size={size} color={on ? 'var(--action)' : 'var(--gray-500)'} />,
  Alerts: (on, size = 22) => <TargetIcon size={size} color={on ? 'var(--action)' : 'var(--gray-500)'} />,
  Saved: (on, size = 22) => (
    <HeartIcon size={size} color={on ? 'var(--action)' : 'var(--gray-500)'} style={on ? { fill: 'var(--action)' } : undefined} />
  ),
  Notifications: (on, size = 22) => <BellIcon size={size} color={on ? 'var(--action)' : 'var(--gray-500)'} />,
  Profile: (on, size = 22) => <ProfileIcon size={size} color={on ? 'var(--action)' : 'var(--gray-500)'} />,
};

export const TABS: TabName[] = ['Search', 'Alerts', 'Saved', 'Notifications', 'Profile'];

export interface TabBarProps {
  active: TabName;
  badge?: number;
}

export function TabBar({ active, badge = 0 }: TabBarProps) {
  const navigate = useNavigate();
  return (
    <nav
      className="fw-tabbar"
      aria-label="Bottom navigation"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        height: 64,
        background: '#fff',
        borderTop: '1px solid var(--border-default)',
        flexShrink: 0,
      }}
    >
      {TABS.map((name) => {
        const on = name === active;
        return (
          <button
            key={name}
            className="fw-reset-btn"
            onClick={() => navigate(TAB_ROUTES[name])}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              position: 'relative',
              minWidth: 0,
            }}
          >
            {TAB_ICONS[name](on)}
            <span style={{ font: `${on ? 600 : 500} 11px/1 var(--font-sans)`, color: on ? 'var(--action)' : 'var(--gray-500)' }}>
              {name}
            </span>
            {name === 'Notifications' && badge > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 8,
                  left: '50%',
                  marginLeft: 6,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 8,
                  background: 'var(--green-600)',
                  color: '#fff',
                  font: '700 10px/16px var(--font-sans)',
                  textAlign: 'center',
                  padding: '0 4px',
                  boxSizing: 'border-box',
                }}
              >
                {badge}
              </span>
            )}
            {on && (
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 28,
                  height: 3,
                  borderRadius: '0 0 3px 3px',
                  background: 'var(--action)',
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
