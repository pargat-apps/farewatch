import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BottomSheet } from '../../components/BottomSheet';
import { Button } from '../../components/ui/Button';
import { Switch } from '../../components/ui/Switch';
import { ChevronDownIcon, ChevronRightIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';

type Scope = 'any' | 'direct' | 'selected';

export default function TrackPricePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { searchForm, upsertAlert } = useAppState();
  const [budget, setBudget] = useState(900);
  const [scope, setScope] = useState<Scope>('any');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserNotif, setBrowserNotif] = useState(false);

  const submit = () => {
    upsertAlert({
      id: id ?? 'yyzdel',
      route: `${searchForm.fromCode} → ${searchForm.toCode}`,
      status: 'Active',
      dates: `${searchForm.departDate} – ${searchForm.returnDate} · ${searchForm.travelers} travelers · ${searchForm.cabin}`,
      travelers: `${searchForm.travelers} travelers`,
      currentBest: 940,
      startPrice: 940,
      bestProvider: 'Expedia',
      officialPrice: 975,
      target: budget,
      checkedAgo: 'just now',
      createdOn: 'today',
    });
    navigate(`/track/${id}/success?target=${budget}`);
  };

  return (
    <Screen background="var(--gray-50)">
      <div style={{ height: 100, background: '#fff', borderBottom: '1px solid var(--border-default)', padding: 16 }}>
        <div style={{ width: '50%', height: 14, borderRadius: 6, background: 'var(--gray-200)' }} />
        <div style={{ width: '70%', height: 10, borderRadius: 5, background: 'var(--gray-100)', marginTop: 8 }} />
      </div>
      <div style={{ margin: '14px 16px', height: 240, borderRadius: 'var(--r-lg)', background: '#fff', border: '1px solid var(--border-default)' }} />

      <BottomSheet
        onClose={() => navigate(-1)}
        title={
          <>
            Track <span style={{ font: '700 16px/1 var(--font-mono)' }}>{searchForm.fromCode} → {searchForm.toCode}</span>
          </>
        }
        footer={
          <Button size="lg" fullWidth onClick={submit}>
            Create price alert
          </Button>
        }
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--gray-50)', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
          <span style={{ font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Current cheapest · 5 providers</span>
          <span style={{ font: '800 17px/1 var(--font-sans)', color: 'var(--navy-900)' }}>CA$940</span>
        </div>

        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '16px 0 8px' }}>Maximum budget</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '0 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', font: '600 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>
            CAD
            <ChevronDownIcon size={14} color="var(--gray-400)" />
          </span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid var(--action)', borderRadius: 'var(--r-md)', padding: 12, boxShadow: 'var(--shadow-focus)' }}>
            <span style={{ font: '800 22px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--target)' }}>CA$</span>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(Math.max(0, parseInt(e.target.value || '0', 10)))}
              style={{ width: 90, border: 0, outline: 'none', background: 'transparent', font: '800 22px/1 var(--font-sans)', color: 'var(--target)' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 10, background: 'var(--purple-50)', border: '1px solid var(--purple-100)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--purple-700)" strokeWidth={1.75} style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="12" cy="12" r="1.2" fill="var(--purple-700)" />
          </svg>
          <span style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--purple-700)' }}>
            We'll notify you when a matching fare from a supported provider reaches <b>CA${budget.toLocaleString()} or lower</b>.
          </span>
        </div>

        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '16px 0 4px' }}>Alert me when</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(
            [
              ['any', `Any provider reaches CA$${budget.toLocaleString()}`, 'Watches the lowest qualifying price across supported providers'],
              ['direct', `Airline direct reaches CA$${budget.toLocaleString()}`, undefined],
              ['selected', `Selected providers reach CA$${budget.toLocaleString()}`, undefined],
            ] as [Scope, string, string | undefined][]
          ).map(([key, label, sub], i, arr) => {
            const selected = scope === key;
            return (
              <div
                key={key}
                onClick={() => setScope(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: selected ? '11px 8px' : '11px 0',
                  margin: selected ? '0 -8px' : undefined,
                  borderRadius: selected ? 'var(--r-md)' : undefined,
                  background: selected ? 'var(--surface-selected)' : undefined,
                  borderBottom: i < arr.length - 1 && !selected ? '1px solid var(--gray-100)' : undefined,
                  cursor: 'pointer',
                }}
              >
                <span style={{ width: 20, height: 20, borderRadius: '50%', border: selected ? '6px solid var(--action)' : '1.5px solid var(--border-strong)', boxSizing: 'border-box', background: '#fff', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ font: `${selected ? 600 : 500} 14px/1 var(--font-sans)`, color: selected ? 'var(--blue-700)' : 'var(--text-heading)' }}>{label}</div>
                  {sub && <div style={{ font: '400 11.5px/1.3 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
                </div>
                {key === 'selected' && <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Choose</span>}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--gray-100)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Stops</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
              Up to 1 stop
              <ChevronRightIcon size={14} color="var(--gray-400)" />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Cabin</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
              {searchForm.cabin}
              <ChevronRightIcon size={14} color="var(--gray-400)" />
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--gray-100)' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Email alerts</span>
            <Switch checked={emailAlerts} onChange={setEmailAlerts} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <span style={{ font: '500 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Browser notifications</span>
            <Switch checked={browserNotif} onChange={setBrowserNotif} />
          </div>
        </div>
      </BottomSheet>
    </Screen>
  );
}
