import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { TopNav } from '../../components/TopNav';
import { Button } from '../../components/ui/Button';
import { BellIcon, TrendDownIcon, TargetIcon, WarningIcon } from '../../components/icons';
import { currentUser } from '../../data/mock';
import { useAppState } from '../../state/AppState';

const ACTIVITY = [
  { icon: <TrendDownIcon size={15} color="var(--green-700)" strokeWidth={1.75} />, bg: 'var(--green-50)', text: <>New lowest price — <b style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: 12 }}>YYZ → DEL</b> fell to CA$940 on Expedia</>, time: '2 hours ago' },
  { icon: <TargetIcon size={15} color="var(--purple-700)" strokeWidth={1.75} />, bg: 'var(--purple-50)', text: <>Target reached — <b style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: 12 }}>YYZ → YVR</b> hit CA$248</>, time: 'Yesterday' },
  { icon: <BellIcon size={15} color="var(--blue-700)" strokeWidth={1.75} />, bg: 'var(--blue-50)', text: <>Alert created — <b style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: 12 }}>YYZ → LHR</b> under CA$600</>, time: 'Aug 24' },
  { icon: <WarningIcon size={15} color="var(--amber-600)" strokeWidth={1.75} />, bg: 'var(--amber-50)', text: <>Tracked itinerary no longer available — <b style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: 12 }}>YYZ → BOM</b></>, time: 'Aug 22' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { unreadCount, alerts } = useAppState();
  const closeAlert = alerts.find((a) => a.status === 'Active' && a.target > 0);

  return (
    <Screen wide>
      <div className="fw-mobile-only">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <img src={currentUser.avatar} alt={currentUser.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '600 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Good evening, {currentUser.name.split(' ')[0]}</div>
            <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{alerts.length} routes tracked · {closeAlert ? '1' : '0'} close to target</div>
          </div>
          <span
            onClick={() => navigate('/notifications')}
            style={{ position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', cursor: 'pointer' }}
          >
            <BellIcon size={20} />
            {unreadCount > 0 && (
              <span style={{ position: 'absolute', top: 4, right: 4, minWidth: 15, height: 15, borderRadius: 8, background: 'var(--green-600)', color: '#fff', font: '700 10px/15px var(--font-sans)', textAlign: 'center', padding: '0 3px', boxSizing: 'border-box' }}>
                {unreadCount}
              </span>
            )}
          </span>
        </div>
      </div>
      <div className="fw-desktop-only">
        <TopNav variant="app" active="search" />
      </div>

      <div className="fw-scroll" style={{ padding: '14px 16px' }}>
        <div className="fw-desktop-only">
          <div className="fw-container" style={{ padding: '32px 40px 0' }}>
            <div style={{ font: '800 30px/1.2 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
              Good evening, {currentUser.name.split(' ')[0]}
            </div>
            <div style={{ font: '400 14px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 9 }}>
              {alerts.length} routes tracked · {closeAlert ? '1' : '0'} close to target
            </div>
          </div>
        </div>
        <div className="fw-container">
        <div className="fw-grid-4">
          <div className="fw-hoverable" style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '12px 14px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Active alerts</div>
            <div style={{ font: '800 22px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 8 }}>{alerts.filter((a) => a.status === 'Active').length}</div>
          </div>
          <div className="fw-hoverable" style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '12px 14px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Price drops</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8 }}>
              <span style={{ font: '800 22px/1 var(--font-sans)', color: 'var(--navy-900)' }}>7</span>
              <span style={{ font: '700 11px/1 var(--font-sans)', color: 'var(--green-700)' }}>↓ this week</span>
            </div>
          </div>
          <div className="fw-hoverable" style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '12px 14px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Potential savings</div>
            <div style={{ font: '800 22px/1 var(--font-sans)', color: 'var(--green-700)', marginTop: 8 }}>CA$520</div>
          </div>
          <div className="fw-hoverable" style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '12px 14px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Routes tracked</div>
            <div style={{ font: '800 22px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 8 }}>{alerts.length}</div>
          </div>
        </div>

        {closeAlert && (
          <>
            <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)', margin: '20px 0 10px' }}>Close to your target</div>
            <div style={{ background: '#fff', border: '1.5px solid var(--purple-100)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>{closeAlert.route}</span>
                <span style={{ display: 'inline-flex', background: 'var(--purple-50)', color: 'var(--purple-700)', font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>
                  Only CA${closeAlert.currentBest - closeAlert.target} away
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 10 }}>
                <span style={{ font: '800 24px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>CA${closeAlert.currentBest}</span>
                <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>best · {closeAlert.bestProvider}</span>
                <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--target)', marginLeft: 'auto' }}>Target CA${closeAlert.target}</span>
              </div>
              <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)', marginTop: 6 }}>
                Airline direct CA${closeAlert.officialPrice} · checked {closeAlert.checkedAgo}
              </div>
              <div style={{ position: 'relative', height: 6, borderRadius: 3, background: 'var(--gray-100)', marginTop: 12 }}>
                <div style={{ width: '82%', height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,var(--blue-500),var(--purple-500))' }} />
                <span style={{ position: 'absolute', right: 0, top: -3, width: 12, height: 12, borderRadius: '50%', background: '#fff', border: '2px solid var(--purple-500)', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 10.5px/1 var(--font-sans)', color: 'var(--text-faint)', marginTop: 6 }}>
                <span>Started CA${closeAlert.startPrice ?? closeAlert.currentBest}</span>
                <span>Target CA${closeAlert.target}</span>
              </div>
              <div style={{ marginTop: 12 }}>
                <Button size="sm" fullWidth onClick={() => navigate(`/flight/ac42/compare`)}>
                  Compare prices
                </Button>
              </div>
            </div>
          </>
        )}

        <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)', margin: '20px 0 6px' }}>Recent activity</div>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--gray-100)' : undefined }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{a.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ font: '500 13px/1.35 var(--font-sans)', color: 'var(--text-heading)' }}>{a.text}</div>
                <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)', marginTop: 4 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      <TabBar active="Search" badge={unreadCount} />
    </Screen>
  );
}
