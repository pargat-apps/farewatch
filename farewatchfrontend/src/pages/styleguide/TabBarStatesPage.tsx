import { useNavigate } from 'react-router-dom';
import { TabBar } from '../../components/TabBar';
import { BackButton } from '../../components/Screen';

function Demo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>{label}</div>
      <div style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>{children}</div>
    </div>
  );
}

export default function TabBarStatesPage() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', gap: 18, padding: '24px 22px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <BackButton onClick={() => navigate('/styleguide')} />
        <span style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Bottom navigation states</span>
      </div>
      <Demo label="Default — Search active">
        <TabBar active="Search" />
      </Demo>
      <Demo label="Active tab — Alerts">
        <TabBar active="Alerts" />
      </Demo>
      <Demo label="Notification badge">
        <TabBar active="Search" badge={3} />
      </Demo>
      <div style={{ font: '400 11px/1.5 var(--font-sans)', color: 'var(--text-faint)' }}>
        Active = blue icon + label, 3px top indicator. Badge = green count on the bell. Tab switches crossfade content 200ms.
      </div>
    </div>
  );
}
