import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { BottomSheet } from '../../components/BottomSheet';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { FlightCard } from '../../components/FlightCard';
import { CheckIcon, FilterIcon, SortIcon } from '../../components/icons';
import { flightResults } from '../../data/mock';
import { useAppState } from '../../state/AppState';

type SortKey = 'best' | 'cheapest' | 'fastest' | 'earliest' | 'latest';
type StopsFilter = 'any' | 'direct' | '1' | '2+';

const AIRLINE_OPTIONS = [
  { code: 'AC', label: 'Air Canada', from: 'from CA$898' },
  { code: 'EK', label: 'Emirates', from: 'from CA$842' },
  { code: 'QR', label: 'Qatar Airways', from: 'from CA$915' },
  { code: 'LH', label: 'Lufthansa', from: 'from CA$1,020' },
  { code: 'TK', label: 'Turkish Airlines', from: 'from CA$1,145' },
];

function priceNum(p: string) {
  return parseInt(p.replace(/,/g, ''), 10);
}

function durMinutes(dur: string) {
  const m = dur.match(/(\d+)h\s*(\d+)?m?/);
  if (!m) return 0;
  return parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0);
}

function depMinutes(dep: string) {
  const m = dep.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = parseInt(m[1], 10) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return h * 60 + parseInt(m[2], 10);
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const { searchForm } = useAppState();
  const [sheet, setSheet] = useState<'sort' | 'filter' | null>(null);
  const [sort, setSort] = useState<SortKey>('best');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [stopsFilter, setStopsFilter] = useState<StopsFilter>('1');
  const [bookingOption, setBookingOption] = useState<'Any' | 'Airline direct' | 'Travel sites'>('Any');
  const [selectedAirlines, setSelectedAirlines] = useState<Set<string>>(new Set(['AC', 'EK', 'QR']));
  const [carryOn, setCarryOn] = useState(true);
  const [checkedBag, setCheckedBag] = useState(false);

  const toggleAirline = (code: string) => {
    setSelectedAirlines((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return flightResults.filter((f) => {
      if (priceNum(f.price) > maxPrice) return false;
      if (selectedAirlines.size > 0 && !selectedAirlines.has(f.code)) return false;
      if (stopsFilter === 'direct' && f.stops !== 'Nonstop') return false;
      if (stopsFilter === '1' && !(f.stops === 'Nonstop' || f.stops.startsWith('1 stop'))) return false;
      return true;
    });
  }, [maxPrice, selectedAirlines, stopsFilter]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    if (sort === 'cheapest') list.sort((a, b) => priceNum(a.price) - priceNum(b.price));
    else if (sort === 'fastest') list.sort((a, b) => durMinutes(a.dur) - durMinutes(b.dur));
    else if (sort === 'earliest') list.sort((a, b) => depMinutes(a.dep) - depMinutes(b.dep));
    else if (sort === 'latest') list.sort((a, b) => depMinutes(b.dep) - depMinutes(a.dep));
    return list;
  }, [filtered, sort]);

  const activeChips: string[] = [];
  if (stopsFilter === 'direct') activeChips.push('Direct');
  if (stopsFilter === '1') activeChips.push('1 stop');
  if (maxPrice < 1500) activeChips.push(`Under CA$${maxPrice.toLocaleString()}`);

  return (
    <Screen>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
          <BackButton onClick={() => navigate('/home')} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>
              {searchForm.fromCode} → {searchForm.toCode}
            </div>
            <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
              {searchForm.departDate} – {searchForm.returnDate} · {searchForm.travelers} travelers · {searchForm.cabin}
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate('/home')}>
            Modify
          </Button>
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '4px 12px 12px', overflowX: 'auto' }}>
          <button
            className="fw-reset-btn"
            onClick={() => setSheet('sort')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-pill)', background: '#fff', font: '600 13px/1 var(--font-sans)', color: 'var(--text-heading)', flexShrink: 0 }}
          >
            <SortIcon size={14} />
            Sort
          </button>
          <button
            className="fw-reset-btn"
            onClick={() => setSheet('filter')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-pill)', background: '#fff', font: '600 13px/1 var(--font-sans)', color: 'var(--text-heading)', flexShrink: 0 }}
          >
            <FilterIcon size={14} />
            Filters
          </button>
          {activeChips.map((c) => (
            <span
              key={c}
              style={{ display: 'inline-flex', alignItems: 'center', height: 36, padding: '0 12px', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-pill)', background: '#fff', font: '500 13px/1 var(--font-sans)', color: 'var(--text-body)', flexShrink: 0 }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="fw-scroll" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{sorted.length} itineraries found</span>
          <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Lowest price across supported providers</span>
        </div>
        <div className="fw-card-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sorted.map((f) => (
            <div key={f.id} onClick={() => navigate(`/flight/${f.id}`)} style={{ cursor: 'pointer' }}>
              <FlightCard
                f={f}
                onCompare={(e) => {
                  e.stopPropagation();
                  navigate(`/flight/${f.id}/compare`);
                }}
                onTrack={(e) => {
                  e.stopPropagation();
                  navigate(`/track/${f.id}`);
                }}
              />
            </div>
          ))}
        </div>
        <button
          className="fw-reset-btn"
          onClick={() => navigate('/compare-flights')}
          style={{ textAlign: 'center', font: '600 13px/1 var(--font-sans)', color: 'var(--action)', padding: '8px 0 4px' }}
        >
          Compare a few flights side by side
        </button>
      </div>

      {sheet === 'sort' && (
        <BottomSheet title="Sort by" onClose={() => setSheet(null)}>
          {(
            [
              ['best', 'Best', 'Balances price and duration'],
              ['cheapest', 'Cheapest', `From CA$${Math.min(...flightResults.map((f) => priceNum(f.price)))}`],
              ['fastest', 'Fastest', '13h 55m · from CA$976'],
              ['earliest', 'Earliest departure', undefined],
              ['latest', 'Latest departure', undefined],
            ] as [SortKey, string, string | undefined][]
          ).map(([key, label, sub], i, arr) => {
            const selected = sort === key;
            return (
              <div
                key={key}
                onClick={() => {
                  setSort(key);
                  setSheet(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: selected ? '14px 8px' : '14px 4px',
                  margin: selected ? '0 -8px' : undefined,
                  borderRadius: selected ? 'var(--r-md)' : undefined,
                  background: selected ? 'var(--surface-selected)' : undefined,
                  borderBottom: i < arr.length - 1 && !selected ? '1px solid var(--gray-100)' : undefined,
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: selected ? '6px solid var(--action)' : '1.5px solid var(--border-strong)',
                    boxSizing: 'border-box',
                    background: '#fff',
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ font: `${selected ? 600 : 500} 15px/1 var(--font-sans)`, color: selected ? 'var(--blue-700)' : 'var(--text-heading)' }}>{label}</div>
                  {sub && <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
                </div>
                {selected && <CheckIcon size={16} color="var(--blue-600)" strokeWidth={2.25} />}
              </div>
            );
          })}
        </BottomSheet>
      )}

      {sheet === 'filter' && (
        <BottomSheet
          title="Filters"
          onClose={() => setSheet(null)}
          footer={
            <div style={{ display: 'flex', gap: 10 }}>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setMaxPrice(1500);
                  setStopsFilter('any');
                  setSelectedAirlines(new Set());
                }}
              >
                Clear
              </Button>
              <div style={{ flex: 1 }}>
                <Button
                  size="lg"
                  fullWidth
                  onClick={() => {
                    setSheet(null);
                    if (filtered.length === 0) navigate('/results/empty');
                  }}
                >
                  Show {filtered.length} flights
                </Button>
              </div>
            </div>
          }
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Max price</span>
            <span style={{ font: '700 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Up to CA${maxPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={600}
            max={1500}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
            style={{ width: '100%', marginTop: 8, accentColor: 'var(--blue-600)' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>
            <span>CA$600</span>
            <span>CA$1,500</span>
          </div>

          <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '20px 0 10px' }}>Stops</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['direct', '1', '2+'] as StopsFilter[]).map((s) => {
              const label = s === 'direct' ? 'Direct' : s === '1' ? '1 stop' : '2+ stops';
              const selected = stopsFilter === s;
              return (
                <span
                  key={s}
                  onClick={() => setStopsFilter(selected ? 'any' : s)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    height: 40,
                    border: selected ? '1.5px solid var(--border-selected)' : '1px solid var(--border-strong)',
                    background: selected ? 'var(--surface-selected)' : 'transparent',
                    borderRadius: 'var(--r-md)',
                    font: `${selected ? 600 : 500} 13px/1 var(--font-sans)`,
                    color: selected ? 'var(--blue-700)' : 'var(--text-body)',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                >
                  {selected && <CheckIcon size={13} strokeWidth={2.5} />}
                  {label}
                </span>
              );
            })}
          </div>

          <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '20px 0 10px' }}>Airlines</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {AIRLINE_OPTIONS.map((a) => (
              <Checkbox
                key={a.code}
                label={a.label}
                count={a.from}
                checked={selectedAirlines.has(a.code)}
                onChange={() => toggleAirline(a.code)}
              />
            ))}
          </div>

          <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '20px 0 10px' }}>Booking option</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['Any', 'Airline direct', 'Travel sites'] as const).map((o) => {
              const selected = bookingOption === o;
              return (
                <span
                  key={o}
                  onClick={() => setBookingOption(o)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '9px 0',
                    border: selected ? '1.5px solid var(--border-selected)' : '1px solid var(--border-strong)',
                    background: selected ? 'var(--surface-selected)' : 'transparent',
                    borderRadius: 'var(--r-md)',
                    font: `${selected ? 600 : 500} 12.5px/1 var(--font-sans)`,
                    color: selected ? 'var(--blue-700)' : 'var(--text-body)',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                >
                  {o}
                </span>
              );
            })}
          </div>

          <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '20px 0 10px' }}>Baggage</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Checkbox label="Carry-on included" checked={carryOn} onChange={setCarryOn} />
            <Checkbox label="Checked bag included" checked={checkedBag} onChange={setCheckedBag} />
          </div>
        </BottomSheet>
      )}
    </Screen>
  );
}
