import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { ChevronRightIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';

export default function EditAlertPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { alerts, upsertAlert } = useAppState();
  const alert = alerts.find((a) => a.id === id);
  const [target, setTarget] = useState(alert?.target ?? 900);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserNotif, setBrowserNotif] = useState(true);

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate(-1)} />
        <div style={{ flex: 1 }}>
          <div style={{ font: '600 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Edit alert</div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
            <span style={{ font: '700 12px/1 var(--font-mono)' }}>{alert?.route ?? 'YYZ → DEL'}</span> · created {alert?.createdOn ?? 'Jul 27'}
          </div>
        </div>
      </div>
      <div className="fw-scroll" style={{ padding: 16 }}>
        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Route & dates</div>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <div onClick={() => navigate('/search/airport?field=to')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: '1px solid var(--gray-100)', cursor: 'pointer' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Route</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '700 13px/1 var(--font-mono)', color: 'var(--navy-900)' }}>
              {alert?.route ?? 'YYZ → DEL'}
              <ChevronRightIcon size={14} color="var(--gray-400)" />
            </span>
          </div>
          <div onClick={() => navigate('/search/dates')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', cursor: 'pointer' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Dates</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
              Oct 15 – Nov 10
              <ChevronRightIcon size={14} color="var(--gray-400)" />
            </span>
          </div>
        </div>

        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 8px' }}>Maximum budget</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', background: '#fff', font: '600 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>
            CAD
          </span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', background: '#fff', padding: 12 }}>
            <span style={{ font: '800 20px/1 var(--font-sans)', color: 'var(--target)' }}>CA$</span>
            <input
              type="number"
              value={target}
              onChange={(e) => setTarget(parseInt(e.target.value || '0', 10))}
              style={{ border: 0, outline: 'none', width: 100, font: '800 20px/1 var(--font-sans)', color: 'var(--target)' }}
            />
          </div>
        </div>

        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 8px' }}>Preferences</div>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Stops</span>
            <span style={{ font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Up to 1 stop</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Airlines</span>
            <span style={{ font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Any airline</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Cabin</span>
            <span style={{ font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Economy</span>
          </div>
        </div>

        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 8px' }}>Notifications</div>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Email</span>
            <Switch checked={emailAlerts} onChange={setEmailAlerts} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 14px' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Browser notifications</span>
            <Switch checked={browserNotif} onChange={setBrowserNotif} />
          </div>
        </div>
      </div>
      <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--border-default)', background: '#fff', flexShrink: 0, boxShadow: '0 -4px 12px rgba(10,37,64,.04)' }}>
        <Button
          size="lg"
          fullWidth
          onClick={() => {
            if (alert) upsertAlert({ ...alert, target });
            navigate('/alerts');
          }}
        >
          Save changes
        </Button>
      </div>
    </Screen>
  );
}
