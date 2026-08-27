import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { WarningIcon } from '../../components/icons';

export default function PriceChangedPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <span
          onClick={() => navigate(-1)}
          style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', cursor: 'pointer' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </span>
        <div>
          <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Compare booking options</div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Air Canada AC 42 · Thu, Oct 15</div>
        </div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: 'var(--amber-50)', border: '1px solid var(--amber-100)', borderRadius: 'var(--r-lg)', padding: '14px 16px' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            <WarningIcon size={18} color="var(--amber-600)" style={{ flexShrink: 0, marginTop: 1 }} />
            <div>
              <div style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--amber-600)' }}>Price changed</div>
              <div style={{ font: '400 13px/1.55 var(--font-sans)', color: 'var(--text-body)', marginTop: 5 }}>
                The Trip.com fare increased from <span style={{ textDecoration: 'line-through', color: 'var(--text-faint)' }}>CA$879</span> to <b>CA$904</b> while you were viewing.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
            <Button fullWidth onClick={() => navigate(`/provider/trip/deal?flightId=${id}`)}>
              View updated deal — CA$904
            </Button>
            <Button variant="secondary" fullWidth onClick={() => navigate(`/flight/${id}/compare`)}>
              Compare other providers
            </Button>
          </div>
        </div>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: '#fff',
                border: '1px solid var(--border-strong)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                font: '700 12px/1 var(--font-mono)',
                color: 'var(--navy-900)',
              }}
            >
              E
            </span>
            <div>
              <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Expedia</div>
              <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 3 }}>Travel site</div>
            </div>
            <span
              style={{
                marginLeft: 'auto',
                display: 'inline-flex',
                background: 'var(--green-100)',
                color: 'var(--green-700)',
                font: '600 11px/1 var(--font-sans)',
                padding: '5px 10px',
                borderRadius: 'var(--r-pill)',
              }}
            >
              Now cheapest
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            <span style={{ font: '800 20px/1 var(--font-sans)', color: 'var(--navy-900)' }}>CA$887</span>
            <span style={{ marginLeft: 'auto' }}>
              <Button variant="secondary" size="sm" onClick={() => navigate(`/provider/expedia/deal?flightId=${id}`)}>
                View deal
              </Button>
            </span>
          </div>
        </div>
        <div style={{ font: '400 11px/1.5 var(--font-sans)', color: 'var(--text-faint)', textAlign: 'center' }}>
          Provider fares can change quickly. Prices re-check automatically.
        </div>
      </div>
    </Screen>
  );
}
