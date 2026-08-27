import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { Button } from '../../components/ui/Button';
import { HeartFilledIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';

export default function SavedPage() {
  const navigate = useNavigate();
  const { savedSearches, deleteSaved, unreadCount } = useAppState();

  if (savedSearches.length === 0) {
    return (
      <Screen>
        <div style={{ padding: 16, background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>Saved</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
            <HeartFilledIcon size={26} color="var(--gray-400)" />
          </div>
          <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 16 }}>No saved searches</div>
          <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6, maxWidth: 280 }}>
            Save routes you want to check again later.
          </div>
          <div style={{ marginTop: 20 }}>
            <Button variant="secondary" onClick={() => navigate('/home')}>
              Search flights
            </Button>
          </div>
        </div>
        <TabBar active="Saved" badge={unreadCount} />
      </Screen>
    );
  }

  return (
    <Screen>
      <div style={{ padding: 16, background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>Saved</span>
      </div>
      <div className="fw-scroll" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {savedSearches.map((s) => (
          <div key={s.id} style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ font: '700 16px/1 var(--font-mono)', color: 'var(--navy-900)' }}>{s.route}</span>
              {s.tracking && (
                <span style={{ display: 'inline-flex', background: 'var(--blue-50)', color: 'var(--blue-700)', font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>
                  Tracking
                </span>
              )}
              <span onClick={() => deleteSaved(s.id)} style={{ marginLeft: 'auto', cursor: 'pointer' }}>
                <HeartFilledIcon size={18} />
              </span>
            </div>
            <div style={{ font: '400 12px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>
              {s.routeLabel} · {s.dates}
            </div>
            {s.tracking ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
                <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Current best</span>
                <span style={{ font: '800 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>CA${s.currentBest}</span>
                <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>· {s.provider}</span>
                <span style={{ marginLeft: 'auto', font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>
                  Airline direct CA${s.officialPrice} · <b style={{ color: 'var(--green-700)', fontWeight: 600 }}>save CA${s.saving}</b>
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Last searched {s.lastSearched} · from</span>
                <span style={{ font: '800 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>CA${s.currentBest}</span>
              </div>
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <Button variant={s.tracking ? 'primary' : 'secondary'} size="sm" fullWidth onClick={() => navigate(s.tracking ? '/flight/ac42/compare' : '/home')}>
                  {s.tracking ? 'Compare prices' : 'Search again'}
                </Button>
              </div>
              <Button variant="secondary" size="sm" onClick={() => deleteSaved(s.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="Saved" badge={unreadCount} />
    </Screen>
  );
}
