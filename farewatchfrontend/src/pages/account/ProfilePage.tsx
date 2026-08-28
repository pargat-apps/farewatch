import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { TopNav } from '../../components/TopNav';
import { Button } from '../../components/ui/Button';
import { ChevronRightIcon, LogoutIcon } from '../../components/icons';
import { currentUser } from '../../data/mock';
import { useAppState } from '../../state/AppState';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { unreadCount, signOut } = useAppState();

  return (
    <Screen wide>
      <div className="fw-desktop-only">
        <TopNav variant="app" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '28px 16px 20px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <img src={currentUser.avatar} alt={currentUser.name} style={{ width: 76, height: 76, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ position: 'absolute', bottom: 2, right: 2, width: 16, height: 16, borderRadius: '50%', background: 'var(--green-500)', border: '2.5px solid #fff', boxSizing: 'border-box' }} />
        </div>
        <div style={{ font: '700 18px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 12 }}>{currentUser.name}</div>
        <div style={{ font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>{currentUser.email}</div>
        <div style={{ marginTop: 14 }}>
          <Button variant="secondary" size="sm" onClick={() => navigate('/profile/edit')}>
            Edit profile
          </Button>
        </div>
      </div>

      <div className="fw-scroll" style={{ padding: 16 }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Travel preferences</div>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <Row label="Preferred currency" value={currentUser.currency} />
          <Row label="Home airport" value={currentUser.homeAirport} mono />
          <Row label="Preferred cabin" value={currentUser.cabin} />
          <Row label="Preferred airlines" value={currentUser.airlines} last />
        </div>

        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 8px' }}>Account</div>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <NavRow label="Personal information" onClick={() => navigate('/profile/edit')} />
          <NavRow label="Settings" onClick={() => navigate('/profile/settings')} />
          <NavRow label="Help & support" onClick={() => navigate('/styleguide')} last />
        </div>

        <div
          onClick={() => {
            signOut();
            navigate('/home');
          }}
          style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', marginTop: 18, display: 'flex', alignItems: 'center', gap: 10, padding: '13px 14px', cursor: 'pointer' }}
        >
          <LogoutIcon size={15} color="var(--red-600)" />
          <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--red-600)' }}>Sign out</span>
        </div>
        </div>
      </div>
      <TabBar active="Profile" badge={unreadCount} />
    </Screen>
  );
}

function Row({ label, value, mono, last }: { label: string; value: string; mono?: boolean; last?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: last ? undefined : '1px solid var(--gray-100)' }}>
      <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>{label}</span>
      <span style={{ font: mono ? '700 13px/1 var(--font-mono)' : '400 13px/1 var(--font-sans)', color: mono ? 'var(--navy-900)' : 'var(--text-muted)' }}>{value}</span>
    </div>
  );
}

function NavRow({ label, onClick, last }: { label: string; onClick: () => void; last?: boolean }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: last ? undefined : '1px solid var(--gray-100)', cursor: 'pointer' }}>
      <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>{label}</span>
      <ChevronRightIcon size={14} color="var(--gray-400)" />
    </div>
  );
}
