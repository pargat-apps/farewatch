import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { TopNav } from '../../components/TopNav';
import { Button } from '../../components/ui/Button';
import { TargetIcon, TrendDownIcon, WarningIcon, CheckIcon } from '../../components/icons';
import type { NotificationItem } from '../../data/mock';
import { useAppState } from '../../state/AppState';

function iconFor(kind: NotificationItem['kind']) {
  switch (kind) {
    case 'target':
      return { bg: 'var(--purple-100)', el: <TargetIcon size={17} color="var(--purple-700)" /> };
    case 'price-drop':
    case 'success':
      return { bg: 'var(--green-100)', el: <TrendDownIcon size={17} color="var(--green-700)" /> };
    case 'warning':
      return { bg: 'var(--amber-100)', el: <WarningIcon size={17} color="var(--amber-600)" /> };
    default:
      return { bg: null, el: null };
  }
}

export default function NotificationsPage() {
  const navigate = useNavigate();
  const { notifications, unreadCount, markAllNotificationsRead, markNotificationRead, clearAllNotifications } = useAppState();

  if (notifications.length === 0) {
    return (
      <Screen wide>
        <div className="fw-mobile-only">
          <div style={{ padding: 16, background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
            <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>Notifications</span>
          </div>
        </div>
        <div className="fw-desktop-only">
          <TopNav variant="app" />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-600)' }}>
            <CheckIcon size={26} />
          </div>
          <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 16 }}>You're all caught up</div>
          <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6, maxWidth: 280 }}>
            Your price alerts and flight updates will appear here.
          </div>
        </div>
        <TabBar active="Notifications" />
      </Screen>
    );
  }

  const groups: Array<'Today' | 'Earlier'> = ['Today', 'Earlier'];

  return (
    <Screen wide>
      <div className="fw-mobile-only">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>Notifications</span>
          <div style={{ display: 'flex', gap: 14 }}>
            <span onClick={markAllNotificationsRead} style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--action)', cursor: 'pointer' }}>
              Mark all read
            </span>
            <span onClick={clearAllNotifications} style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--text-faint)', cursor: 'pointer' }}>
              Clear all
            </span>
          </div>
        </div>
      </div>
      <div className="fw-desktop-only">
        <TopNav variant="app" />
      </div>
      <div className="fw-scroll">
        <div className="fw-desktop-only">
          <div className="fw-container" style={{ padding: '32px 40px 0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div>
                <div style={{ font: '800 28px/1.2 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>Notifications</div>
                <div style={{ font: '400 13.5px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 9 }}>{unreadCount} unread</div>
              </div>
              <button className="fw-reset-btn" onClick={markAllNotificationsRead} style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--action)' }}>
                Mark all as read
              </button>
            </div>
          </div>
        </div>
        <div className="fw-container" style={{ marginTop: 8 }}>
        <div className="fw-list-card">
        {groups.map((g) => {
          const items = notifications.filter((n) => n.group === g);
          if (items.length === 0) return null;
          return (
            <div key={g}>
              <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '14px 16px 8px' }}>{g}</div>
              {items.map((n) => {
                const { bg, el } = iconFor(n.kind);
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.kind === 'target') navigate('/target-reached');
                    }}
                    style={{
                      background: n.unread ? 'var(--blue-50)' : '#fff',
                      borderTop: n.unread ? '1px solid var(--blue-100)' : '1px solid var(--gray-100)',
                      borderBottom: n.unread ? '1px solid var(--blue-100)' : '1px solid var(--gray-100)',
                      display: 'flex',
                      gap: 12,
                      padding: '14px 16px',
                      cursor: 'pointer',
                    }}
                  >
                    {n.kind === 'support' ? (
                      <img src="/avatars/icon-support.png" alt="FareWatch support" style={{ width: 36, height: 36, borderRadius: '50%', flexShrink: 0 }} />
                    ) : (
                      <span style={{ width: 36, height: 36, borderRadius: '50%', background: bg ?? 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{el}</span>
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ font: `${n.unread ? 700 : 600} 13.5px/1.2 var(--font-sans)`, color: n.unread ? 'var(--navy-900)' : 'var(--text-heading)' }}>{n.title}</span>
                        {n.unread && (
                          <>
                            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--action)' }} />
                            <span style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--action)' }}>New</span>
                          </>
                        )}
                      </div>
                      <div style={{ font: '400 13px/1.5 var(--font-sans)', color: n.unread ? 'var(--text-body)' : 'var(--text-muted)', marginTop: 4 }}>{n.message}</div>
                      <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)', marginTop: 6 }}>{n.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div style={{ padding: 16 }}>
          <Button variant="secondary" size="sm" fullWidth onClick={clearAllNotifications}>
            Clear all notifications
          </Button>
        </div>
        </div>
        </div>
      </div>
      <TabBar active="Notifications" badge={unreadCount} />
    </Screen>
  );
}
