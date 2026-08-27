import type { MouseEvent } from 'react';
import type { Itinerary } from '../data/mock';
import { AirlineMark } from './AirlineMark';
import { Button } from './ui/Button';

export function FlightCard({
  f,
  onCompare,
  onTrack,
}: {
  f: Itinerary;
  onCompare?: (e: MouseEvent) => void;
  onTrack?: (e: MouseEvent) => void;
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-sm)',
        padding: '14px 16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <AirlineMark code={f.code} color={f.color} />
        <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{f.airline}</span>
        {f.hasBadge && (
          <span
            style={{
              marginLeft: 'auto',
              background: f.badgeBg,
              color: f.badgeFg,
              font: '600 11px/1 var(--font-sans)',
              padding: '5px 10px',
              borderRadius: 'var(--r-pill)',
            }}
          >
            {f.badge}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
        <div style={{ width: 74 }}>
          <div style={{ font: '600 18px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{f.dep}</div>
          <div style={{ font: '700 13px/1 var(--font-mono)', color: 'var(--gray-500)', marginTop: 5 }}>YYZ</div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{f.dur}</span>
          <div style={{ width: '100%', height: 1.5, background: 'var(--gray-300)', position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                right: -1,
                top: -3,
                width: 0,
                height: 0,
                borderLeft: '6px solid var(--gray-400)',
                borderTop: '4px solid transparent',
                borderBottom: '4px solid transparent',
              }}
            />
          </div>
          <span style={{ font: '500 11px/1 var(--font-sans)', color: f.stopsColor }}>{f.stops}</span>
        </div>
        <div style={{ width: 74, textAlign: 'right' }}>
          <div style={{ font: '600 18px/1 var(--font-sans)', color: 'var(--navy-900)' }}>
            {f.arr}
            {f.plus && <sup style={{ font: '600 10px/1 var(--font-sans)', color: 'var(--text-faint)' }}> {f.plus}</sup>}
          </div>
          <div style={{ font: '700 13px/1 var(--font-mono)', color: 'var(--gray-500)', marginTop: 5 }}>DEL</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 12 }}>
        <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>From</span>
        <span style={{ font: '800 24px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>CA${f.price}</span>
        <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>per traveler</span>
        <span style={{ marginLeft: 'auto', font: '600 12px/1 var(--font-sans)', color: 'var(--action)' }}>{f.opts}</span>
      </div>
      {f.hasPreview && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
            marginTop: 10,
            background: 'var(--gray-50)',
            border: '1px solid var(--gray-100)',
            borderRadius: 'var(--r-md)',
            padding: '9px 11px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AirlineMark code="T" color="#fff" />
            <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Trip.com</span>
            <span
              style={{
                display: 'inline-flex',
                background: 'var(--green-100)',
                color: 'var(--green-700)',
                font: '600 10px/1 var(--font-sans)',
                padding: '3px 7px',
                borderRadius: 'var(--r-pill)',
              }}
            >
              Cheapest
            </span>
            <span style={{ marginLeft: 'auto', font: '700 12.5px/1 var(--font-sans)', color: 'var(--navy-900)' }}>CA$879</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AirlineMark code="AC" color="#D22630" />
            <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Air Canada</span>
            <span style={{ font: '400 10.5px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Official airline</span>
            <span style={{ marginLeft: 'auto', font: '700 12.5px/1 var(--font-sans)', color: 'var(--text-body)' }}>CA$918</span>
          </div>
          <div style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--action)' }}>+3 more providers</div>
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <div style={{ flex: 1 }}>
          <Button size="sm" fullWidth onClick={onCompare}>
            Compare prices
          </Button>
        </div>
        <div style={{ flex: 1 }}>
          <Button variant="secondary" size="sm" fullWidth onClick={onTrack}>
            Track price
          </Button>
        </div>
      </div>
    </div>
  );
}
