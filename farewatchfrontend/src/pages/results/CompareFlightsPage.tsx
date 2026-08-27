import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { AirlineMark } from '../../components/AirlineMark';
import { InfoIcon } from '../../components/icons';

const CARDS = [
  {
    id: 'ac42',
    code: 'AC',
    color: '#D22630',
    airline: 'Air Canada',
    price: '898',
    badge: 'Best value',
    badgeBg: 'var(--blue-50)',
    badgeFg: 'var(--blue-700)',
    duration: '15h 40m',
    stops: '1 stop · FRA 2h 15m',
    time: '10:20 AM → 1:30 PM +1',
    baggage: 'Carry-on + 23kg',
    cabin: 'Economy',
    selected: true,
  },
  {
    id: 'ek201',
    code: 'EK',
    color: '#8A1538',
    airline: 'Emirates',
    price: '842',
    badge: 'Cheapest',
    badgeBg: 'var(--green-50)',
    badgeFg: 'var(--green-700)',
    duration: '18h 00m',
    stops: '1 stop · DXB 3h 05m',
    time: '8:45 PM → 9:15 AM +2',
    baggage: 'Carry-on + 30kg',
    cabin: 'Economy',
    selected: false,
  },
];

export default function CompareFlightsPage() {
  const navigate = useNavigate();
  const [selectedCount] = useState(3);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 172 + 10;
    setPage(Math.round(el.scrollLeft / cardWidth));
  };

  return (
    <Screen wide>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <span onClick={() => navigate(-1)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-600)', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Compare flights</div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{selectedCount} of {selectedCount} selected · YYZ → DEL</div>
        </div>
        <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--action)', cursor: 'pointer' }} onClick={() => navigate('/results')}>
          Clear
        </span>
      </div>

      <div
        ref={scrollerRef}
        onScroll={onScroll}
        style={{ display: 'flex', gap: 10, padding: '16px 0 8px 16px', overflowX: 'auto', scrollSnapType: 'x mandatory' }}
      >
        {CARDS.map((c) => (
          <div
            key={c.id}
            onClick={() => navigate(`/flight/${c.id}`)}
            style={{
              width: 172,
              flexShrink: 0,
              scrollSnapAlign: 'start',
              background: '#fff',
              border: c.selected ? '1.5px solid var(--border-selected)' : '1px solid var(--border-default)',
              borderRadius: 'var(--r-lg)',
              boxShadow: 'var(--shadow-sm)',
              padding: 14,
              boxSizing: 'border-box',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AirlineMark code={c.code} color={c.color} />
              <span style={{ font: '400 12px/1.2 var(--font-sans)', color: 'var(--text-muted)' }}>{c.airline}</span>
            </div>
            <div style={{ font: '800 22px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)', marginTop: 10 }}>CA${c.price}</div>
            <span style={{ display: 'inline-flex', background: c.badgeBg, color: c.badgeFg, font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)', marginTop: 8 }}>
              {c.badge}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12, borderTop: '1px solid var(--gray-100)', paddingTop: 12 }}>
              <div>
                <div style={{ font: '600 9.5px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Duration</div>
                <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 3 }}>{c.duration}</div>
              </div>
              <div>
                <div style={{ font: '600 9.5px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Stops</div>
                <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 3 }}>{c.stops}</div>
              </div>
              <div>
                <div style={{ font: '600 9.5px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Depart / arrive</div>
                <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 3 }}>{c.time}</div>
              </div>
              <div>
                <div style={{ font: '600 9.5px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Baggage</div>
                <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 3 }}>{c.baggage}</div>
              </div>
              <div>
                <div style={{ font: '600 9.5px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>Cabin</div>
                <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 3 }}>{c.cabin}</div>
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <Button size="sm" variant={c.selected ? 'primary' : 'secondary'} fullWidth onClick={(e) => { e.stopPropagation(); navigate(`/flight/${c.id}`); }}>
                View flight
              </Button>
            </div>
          </div>
        ))}
        <div
          style={{
            width: 60,
            flexShrink: 0,
            background: '#fff',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--r-lg) 0 0 var(--r-lg)',
            borderRight: 'none',
            padding: '14px 0 14px 14px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          <AirlineMark code="AI" color="#C4452B" />
          <div style={{ font: '800 22px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 10, whiteSpace: 'nowrap' }}>CA$976</div>
          <span style={{ display: 'inline-flex', background: 'var(--teal-50)', color: 'var(--teal-600)', font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)', marginTop: 8, whiteSpace: 'nowrap' }}>
            Fastest
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '6px 0 14px' }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: page === i ? 16 : 6, height: 6, borderRadius: 3, background: page === i ? 'var(--blue-600)' : 'var(--gray-300)' }} />
        ))}
      </div>

      <div style={{ margin: '0 16px', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', borderRadius: 'var(--r-md)', padding: '12px 14px', display: 'flex', gap: 10 }}>
        <InfoIcon size={16} color="var(--blue-700)" style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--navy-800)' }}>
          Air Canada is CA$56 more than the cheapest but saves 2h 20m and has the best layover.
        </span>
      </div>
    </Screen>
  );
}
