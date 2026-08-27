import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { SidebarNav } from '../../components/SidebarNav';
import { Button } from '../../components/ui/Button';
import { BellIcon, EditIcon, MoreIcon, PauseIcon, TrashIcon } from '../../components/icons';
import type { AlertItem } from '../../data/mock';
import { useAppState } from '../../state/AppState';

type Tab = 'All' | 'Active' | 'Paused' | 'Expired';

function statusPill(status: AlertItem['status']) {
  if (status === 'Active') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--green-50)', color: 'var(--green-700)', font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green-600)' }} />
        Active
      </span>
    );
  }
  if (status === 'Paused') {
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--gray-100)', color: 'var(--gray-600)', font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>
        <PauseIcon size={10} />
        Paused
      </span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'var(--amber-50)', color: 'var(--amber-600)', font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>
      Expired
    </span>
  );
}

export default function AlertsPage() {
  const navigate = useNavigate();
  const { alerts, pauseAlert, resumeAlert, deleteAlert, unreadCount } = useAppState();
  const [tab, setTab] = useState<Tab>('All');
  const [menuFor, setMenuFor] = useState<string | null>(null);

  const counts = {
    All: alerts.length,
    Active: alerts.filter((a) => a.status === 'Active').length,
    Paused: alerts.filter((a) => a.status === 'Paused').length,
    Expired: alerts.filter((a) => a.status === 'Expired').length,
  };
  const filtered = tab === 'All' ? alerts : alerts.filter((a) => a.status === tab);

  if (alerts.length === 0) {
    return (
      <div className="fw-shell-with-sidebar">
        <SidebarNav active="Alerts" badge={unreadCount} />
        <Screen wide>
          <div style={{ padding: 16, background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
            <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>My alerts</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
              <BellIcon size={26} />
            </div>
            <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 16 }}>No price alerts yet</div>
            <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6, maxWidth: 280 }}>
              Search for a flight and set the maximum price you'd like to pay.
            </div>
            <div style={{ marginTop: 20 }}>
              <Button onClick={() => navigate('/home')}>Search flights</Button>
            </div>
          </div>
          <TabBar active="Alerts" badge={unreadCount} />
        </Screen>
      </div>
    );
  }

  return (
    <div className="fw-shell-with-sidebar">
      <SidebarNav active="Alerts" badge={unreadCount} />
      <Screen wide>
      <div style={{ padding: '14px 16px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <div style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>My alerts</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
          {(['All', 'Active', 'Paused', 'Expired'] as Tab[]).map((t) => {
            const selected = tab === t;
            return (
              <span
                key={t}
                onClick={() => setTab(t)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 32,
                  padding: '0 12px',
                  borderRadius: 'var(--r-pill)',
                  background: selected ? 'var(--navy-900)' : 'transparent',
                  border: selected ? undefined : '1px solid var(--border-strong)',
                  font: `${selected ? 600 : 500} 12px/1 var(--font-sans)`,
                  color: selected ? '#fff' : 'var(--text-body)',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                {t} · {counts[t]}
              </span>
            );
          })}
        </div>
      </div>

      <div className="fw-scroll" style={{ padding: '14px 16px' }}>
        <div className="fw-grid-2">
        {filtered.map((a) => {
          const active = a.status === 'Active';
          const paused = a.status === 'Paused';
          const expired = a.status === 'Expired';
          const dimColor = active ? 'var(--navy-900)' : 'var(--gray-500)';
          const pct = active && a.startPrice ? Math.min(100, Math.max(6, Math.round(((a.startPrice - a.currentBest) / (a.startPrice - a.target)) * 100))) : 38;
          const diff = active ? a.startPrice != null ? a.currentBest - a.startPrice : null : null;

          return (
            <div key={a.id} style={{ position: 'relative', background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: active ? 'var(--shadow-md)' : 'var(--shadow-sm)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ font: '700 16px/1 var(--font-mono)', color: dimColor }}>{a.route}</span>
                {statusPill(a.status)}
                {(active || paused) && (
                  <span
                    onClick={() => setMenuFor(menuFor === a.id ? null : a.id)}
                    style={{ marginLeft: 'auto', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--r-md)', background: active ? 'var(--gray-100)' : 'transparent', color: 'var(--gray-600)', cursor: 'pointer' }}
                  >
                    <MoreIcon size={17} />
                  </span>
                )}
              </div>
              <div style={{ font: '400 12px/1 var(--font-sans)', color: active ? 'var(--text-muted)' : 'var(--text-muted)', marginTop: 6 }}>{a.dates}</div>

              {expired ? (
                <>
                  <div style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 10 }}>The departure date has passed, so tracking ended automatically.</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <div style={{ flex: 1 }}>
                      <Button variant="secondary" size="sm" fullWidth onClick={() => navigate('/home')}>
                        Search again
                      </Button>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => deleteAlert(a.id)}>
                      Delete
                    </Button>
                  </div>
                </>
              ) : paused ? (
                <>
                  <div style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 10 }}>FareWatch is not currently checking this route.</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
                    <span style={{ font: '800 20px/1 var(--font-sans)', color: 'var(--gray-500)' }}>CA${a.currentBest.toLocaleString()}</span>
                    <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>last known · {a.checkedAgo}</span>
                    <span style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--gray-500)', marginLeft: 'auto' }}>Target CA${a.target}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <div style={{ flex: 1 }}>
                      <Button size="sm" fullWidth onClick={() => resumeAlert(a.id)}>
                        Resume alert
                      </Button>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => deleteAlert(a.id)}>
                      Delete
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 12 }}>
                    <span style={{ font: '800 26px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>CA${a.currentBest.toLocaleString()}</span>
                    {diff != null && diff !== 0 && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          background: diff < 0 ? 'var(--green-100)' : 'var(--red-100)',
                          color: diff < 0 ? 'var(--green-700)' : 'var(--red-600)',
                          font: '700 12px/1 var(--font-sans)',
                          padding: '5px 10px',
                          borderRadius: 'var(--r-pill)',
                        }}
                      >
                        {diff < 0 ? '↓' : '↑'} CA${Math.abs(diff)}
                      </span>
                    )}
                    {a.startPrice != null && (
                      <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-faint)', textDecoration: 'line-through', marginLeft: 'auto' }}>CA${a.startPrice.toLocaleString()}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 7 }}>
                    <span style={{ font: '400 11.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
                      Best provider <b style={{ color: 'var(--navy-900)', fontWeight: 600 }}>{a.bestProvider}</b> · Airline direct CA${a.officialPrice}
                    </span>
                  </div>
                  <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'var(--gray-100)', marginTop: 12 }}>
                    <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,var(--blue-500),var(--purple-500))' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                    <span style={{ font: '400 10.5px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Checked {a.checkedAgo}</span>
                    <span style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--target)' }}>
                      Target CA${a.target} · CA${Math.max(0, a.currentBest - a.target)} to go
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <div style={{ flex: 1 }}>
                      <Button size="sm" fullWidth onClick={() => navigate('/flight/ac42/compare')}>
                        Compare prices
                      </Button>
                    </div>
                    <Button variant="secondary" size="sm" onClick={() => navigate(`/alerts/${a.id}/history`)}>
                      History
                    </Button>
                  </div>
                </>
              )}

              {menuFor === a.id && (
                <div style={{ position: 'absolute', top: 52, right: 14, width: 150, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', boxShadow: 'var(--shadow-lg)', padding: 6, zIndex: 2 }}>
                  <div
                    onClick={() => {
                      setMenuFor(null);
                      navigate(`/alerts/${a.id}/edit`);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 6, font: '500 13px/1 var(--font-sans)', color: 'var(--text-heading)', cursor: 'pointer' }}
                  >
                    <EditIcon size={15} />
                    Edit
                  </div>
                  {active && (
                    <div
                      onClick={() => {
                        pauseAlert(a.id);
                        setMenuFor(null);
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 6, background: 'var(--gray-50)', font: '500 13px/1 var(--font-sans)', color: 'var(--text-heading)', cursor: 'pointer' }}
                    >
                      <PauseIcon size={15} />
                      Pause
                    </div>
                  )}
                  <div
                    onClick={() => {
                      deleteAlert(a.id);
                      setMenuFor(null);
                    }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 6, font: '500 13px/1 var(--font-sans)', color: 'var(--red-600)', cursor: 'pointer' }}
                  >
                    <TrashIcon size={15} />
                    Delete
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {(tab === 'Paused' || tab === 'All') && filtered.some((a) => a.status === 'Paused') && (
          <div className="fw-grid-span-all" style={{ display: 'flex', gap: 10, background: 'var(--blue-50)', border: '1px solid var(--blue-100)', borderRadius: 'var(--r-md)', padding: '12px 14px' }}>
            <span style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--navy-800)' }}>Paused alerts keep their settings and history. Expired alerts are deleted after 90 days.</span>
          </div>
        )}
        </div>
      </div>
      <TabBar active="Alerts" badge={unreadCount} />
      </Screen>
    </div>
  );
}
