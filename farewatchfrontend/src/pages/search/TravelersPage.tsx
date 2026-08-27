import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BottomSheet } from '../../components/BottomSheet';
import { Button } from '../../components/ui/Button';
import { CheckIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';

const CABINS = ['Economy', 'Premium economy', 'Business', 'First'];

function Stepper({
  label,
  hint,
  value,
  min,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  const canDec = value > min;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid var(--gray-100)' }}>
      <div>
        <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{label}</div>
        <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{hint}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          className="fw-reset-btn"
          disabled={!canDec}
          onClick={() => onChange(value - 1)}
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: `1px solid ${canDec ? 'var(--border-strong)' : 'var(--gray-200)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: canDec ? 'var(--gray-600)' : 'var(--gray-300)',
            font: '400 18px/1 var(--font-sans)',
          }}
        >
          −
        </button>
        <span style={{ width: 20, textAlign: 'center', font: '600 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{value}</span>
        <button
          className="fw-reset-btn"
          onClick={() => onChange(value + 1)}
          style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue-600)', font: '400 18px/1 var(--font-sans)' }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function TravelersPage() {
  const navigate = useNavigate();
  const { searchForm, setSearchForm } = useAppState();
  const [adults, setAdults] = useState(searchForm.travelers > 0 ? searchForm.travelers : 1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cabin, setCabin] = useState(searchForm.cabin);

  return (
    <Screen background="var(--gray-50)">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56, padding: '0 16px', background: '#fff', borderBottom: '1px solid var(--border-default)' }}>
        <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
          Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
        </span>
      </div>
      <div style={{ padding: '20px 16px', flex: 1 }}>
        <div style={{ width: '70%', height: 22, borderRadius: 6, background: 'var(--gray-200)' }} />
        <div style={{ width: '50%', height: 22, borderRadius: 6, background: 'var(--gray-200)', marginTop: 8 }} />
        <div style={{ width: '88%', height: 12, borderRadius: 6, background: 'var(--gray-100)', marginTop: 12 }} />
        <div style={{ marginTop: 16, height: 340, borderRadius: 'var(--r-xl)', background: '#fff', border: '1px solid var(--border-default)' }} />
      </div>

      <BottomSheet
        title="Travelers & cabin"
        onClose={() => navigate(-1)}
        footer={
          <Button
            size="lg"
            fullWidth
            onClick={() => {
              setSearchForm({ travelers: adults + children, cabin });
              navigate(-1);
            }}
          >
            Done
          </Button>
        }
      >
        <Stepper label="Adults" hint="18+" value={adults} min={1} onChange={setAdults} />
        <Stepper label="Children" hint="2–17" value={children} min={0} onChange={setChildren} />
        <Stepper label="Infants" hint="Under 2" value={infants} min={0} onChange={setInfants} />

        <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '6px 0 10px' }}>
          Cabin class
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {CABINS.map((c) => {
            const selected = c === cabin;
            return (
              <button
                key={c}
                className="fw-reset-btn"
                onClick={() => setCabin(c)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  height: 46,
                  padding: '0 12px',
                  border: selected ? '1.5px solid var(--border-selected)' : '1px solid var(--border-strong)',
                  background: selected ? 'var(--surface-selected)' : 'transparent',
                  borderRadius: 'var(--r-md)',
                  boxSizing: 'border-box',
                }}
              >
                {selected && <CheckIcon size={15} color="var(--blue-600)" strokeWidth={2.25} />}
                <span style={{ font: `${selected ? 600 : 500} 14px/1 var(--font-sans)`, color: selected ? 'var(--blue-700)' : 'var(--text-body)' }}>{c}</span>
              </button>
            );
          })}
        </div>
      </BottomSheet>
    </Screen>
  );
}
