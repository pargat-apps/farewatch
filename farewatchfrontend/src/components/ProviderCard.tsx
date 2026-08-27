import type { Provider } from '../data/mock';
import { AirlineMark, ProviderMark } from './AirlineMark';
import { Button } from './ui/Button';

export function ProviderCard({ p, onViewDeal }: { p: Provider; onViewDeal?: () => void }) {
  if (p.unavailable) {
    return (
      <div
        style={{
          background: 'var(--gray-50)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--r-lg)',
          padding: '12px 14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ProviderMark letter={p.mark} muted />
          <div>
            <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--gray-500)' }}>{p.name}</div>
            <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)', marginTop: 3 }}>{p.type}</div>
          </div>
          <span
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              background: 'var(--gray-100)',
              color: 'var(--gray-600)',
              font: '600 10.5px/1 var(--font-sans)',
              padding: '4px 9px',
              borderRadius: 'var(--r-pill)',
            }}
          >
            Currently unavailable
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 8 }}>
          <span style={{ font: '400 11.5px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>Other providers remain available.</span>
          <button className="fw-reset-btn" style={{ marginLeft: 'auto', font: '600 12px/1 var(--font-sans)', color: 'var(--action)' }}>
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const border = p.isBestPrice ? '1.5px solid var(--green-500)' : '1px solid var(--border-default)';

  return (
    <div style={{ background: '#fff', border, borderRadius: 'var(--r-lg)', boxShadow: p.isBestPrice ? 'var(--shadow-sm)' : undefined, padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {p.isOfficial ? <AirlineMark code={p.mark} color={p.markColor ?? '#D22630'} size={30} /> : <ProviderMark letter={p.mark} size={30} />}
        <div>
          <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{p.name}</div>
          <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 3 }}>
            {p.isOfficial ? 'Book directly with the airline' : p.type}
          </div>
        </div>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {p.sponsored && (
            <span
              style={{
                font: '600 9.5px/1 var(--font-sans)',
                letterSpacing: 'var(--track-wide)',
                textTransform: 'uppercase',
                color: 'var(--text-faint)',
                border: '1px solid var(--gray-200)',
                padding: '4px 7px',
                borderRadius: 4,
              }}
            >
              Sponsored
            </span>
          )}
          {p.isOfficial && (
            <span
              style={{
                display: 'inline-flex',
                background: 'var(--blue-50)',
                color: 'var(--blue-700)',
                font: '600 10.5px/1 var(--font-sans)',
                padding: '4px 9px',
                borderRadius: 'var(--r-pill)',
              }}
            >
              Official airline
            </span>
          )}
          {p.isBestPrice && (
            <span
              style={{
                display: 'inline-flex',
                background: 'var(--green-100)',
                color: 'var(--green-700)',
                font: '600 11px/1 var(--font-sans)',
                padding: '5px 10px',
                borderRadius: 'var(--r-pill)',
              }}
            >
              Best price
            </span>
          )}
          {!p.isBestPrice && p.diff != null && (
            <span style={{ font: '600 12px/1 var(--font-sans)', color: 'var(--red-600)' }}>+CA${p.diff}</span>
          )}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 10 }}>
        <span style={{ font: `800 ${p.isBestPrice ? 24 : 20}px/1 var(--font-sans)`, letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>
          CA${p.price}
        </span>
        <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>/ traveler</span>
        {p.isBestPrice && (
          <span style={{ marginLeft: 'auto', font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
            CA${(p.price * 2).toLocaleString()} total · 2 travelers
          </span>
        )}
      </div>
      <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-body)', marginTop: 8 }}>
        {p.convertedFrom ? `Converted from ${p.convertedFrom}` : p.baggage}
        {p.fareNote && ` · ${p.fareNote}`}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
        <span style={{ font: '400 10.5px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Checked {p.checkedAgo}</span>
        <span style={{ marginLeft: 'auto' }}>
          <Button size="sm" variant={p.isBestPrice ? 'primary' : 'secondary'} onClick={onViewDeal}>
            View deal
          </Button>
        </span>
      </div>
    </div>
  );
}
