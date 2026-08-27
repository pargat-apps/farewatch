import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { Button } from '../../components/ui/Button';
import { useAppState } from '../../state/AppState';

export default function TargetReachedPage() {
  const navigate = useNavigate();
  const { unreadCount } = useAppState();

  return (
    <Screen>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--green-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fwPulse 2s var(--ease-out) infinite',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green-700)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </div>
        <div style={{ font: '800 26px/1.15 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)', marginTop: 20 }}>Target reached!</div>
        <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 10 }}>YYZ → DEL · Oct 15 – Nov 10</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 22 }}>
          <span style={{ font: '800 44px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>CA$875</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--green-100)', color: 'var(--green-700)', font: '700 13px/1 var(--font-sans)', padding: '6px 12px', borderRadius: 'var(--r-pill)' }}>
            ↓ CA$245
          </span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, background: 'var(--purple-50)', color: 'var(--purple-700)', font: '600 12px/1 var(--font-sans)', padding: '7px 12px', borderRadius: 'var(--r-pill)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1.2" fill="currentColor" />
          </svg>
          CA$25 under your CA$900 target
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 320, marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1.5px solid var(--green-500)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
            <span style={{ width: 24, height: 24, borderRadius: 6, background: '#fff', border: '1px solid var(--border-strong)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 10px/1 var(--font-mono)', color: 'var(--navy-900)' }}>T</span>
            <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Trip.com</span>
            <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Travel site</span>
            <span style={{ marginLeft: 'auto', font: '800 15px/1 var(--font-sans)', color: 'var(--green-700)' }}>CA$875</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
            <span style={{ width: 24, height: 24, borderRadius: 6, background: '#C4452B', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 9px/1 var(--font-mono)' }}>AI</span>
            <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Air India</span>
            <span style={{ display: 'inline-flex', background: 'var(--blue-50)', color: 'var(--blue-700)', font: '600 10px/1 var(--font-sans)', padding: '3px 7px', borderRadius: 'var(--r-pill)' }}>Official airline</span>
            <span style={{ marginLeft: 'auto', font: '700 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>CA$920</span>
          </div>
        </div>
        <div style={{ width: '100%', maxWidth: 320, marginTop: 20 }}>
          <Button size="lg" fullWidth onClick={() => navigate('/provider/trip/deal?flightId=ac42')}>
            View CA$875 deal
          </Button>
        </div>
        <div onClick={() => navigate('/flight/ac42/compare')} style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--action)', marginTop: 14, cursor: 'pointer' }}>
          Compare prices
        </div>
      </div>
      <TabBar active="Alerts" badge={unreadCount} />
    </Screen>
  );
}
