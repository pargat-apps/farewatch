import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Switch } from '../../components/ui/Switch';
import { ChevronRightIcon } from '../../components/icons';
import { currentUser } from '../../data/mock';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 8px' }}>{title}</div>
      <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>{children}</div>
    </>
  );
}

function SwitchRow({ label, hint, checked, onChange, last }: { label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void; last?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: last ? undefined : '1px solid var(--gray-100)' }}>
      <div>
        <div style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>{label}</div>
        {hint && <div style={{ font: '400 11.5px/1.3 var(--font-sans)', color: 'var(--text-muted)', marginTop: 3 }}>{hint}</div>}
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}

function NavRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderBottom: last ? undefined : '1px solid var(--gray-100)' }}>
      <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>{label}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
        {value}
        <ChevronRightIcon size={14} color="var(--gray-400)" />
      </span>
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(true);
  const [browser, setBrowser] = useState(true);
  const [targetReached, setTargetReached] = useState(true);
  const [priceDrop, setPriceDrop] = useState(true);
  const [flightChanges, setFlightChanges] = useState(false);

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate(-1)} />
        <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>Settings</span>
      </div>
      <div className="fw-scroll" style={{ padding: 16 }}>
        <Section title="Notifications">
          <SwitchRow label="Email notifications" checked={email} onChange={setEmail} />
          <SwitchRow label="Browser notifications" checked={browser} onChange={setBrowser} />
          <SwitchRow label="Target reached" hint="When a fare hits your budget" checked={targetReached} onChange={setTargetReached} />
          <SwitchRow label="Price drop" hint="Any meaningful drop on tracked routes" checked={priceDrop} onChange={setPriceDrop} />
          <SwitchRow label="Flight changes" hint="Schedule or availability changes" checked={flightChanges} onChange={setFlightChanges} last />
        </Section>

        <Section title="Travel">
          <NavRow label="Preferred currency" value="CAD" />
          <NavRow label="Preferred cabin" value={currentUser.cabin} />
          <NavRow label="Home airport" value="YYZ" />
          <NavRow label="Preferred airlines" value={currentUser.airlines} last />
        </Section>

        <Section title="Appearance">
          <NavRow label="Theme" value="Light" />
          <NavRow label="Language" value="English (Canada)" last />
        </Section>

        <Section title="Account">
          <NavRow label="Privacy" value="" />
          <NavRow label="Security" value="" />
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', cursor: 'pointer' }} onClick={() => navigate('/home')}>
            <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--red-600)' }}>Delete account</span>
          </div>
        </Section>
      </div>
    </Screen>
  );
}
