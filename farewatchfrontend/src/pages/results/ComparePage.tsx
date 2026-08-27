import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { TopNav } from '../../components/TopNav';
import { AirlineMark } from '../../components/AirlineMark';
import { ProviderCard } from '../../components/ProviderCard';
import { Button } from '../../components/ui/Button';
import { flightResults, providersYYZDEL } from '../../data/mock';

type ProviderFilter = 'All' | 'Airline direct' | 'Travel sites' | 'Baggage';

export default function ComparePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const f = flightResults.find((x) => x.id === id) ?? flightResults[1];
  const [filter, setFilter] = useState<ProviderFilter>('All');

  const providers = useMemo(() => {
    let list = [...providersYYZDEL];
    if (filter === 'Airline direct') list = list.filter((p) => p.isOfficial);
    if (filter === 'Travel sites') list = list.filter((p) => !p.isOfficial);
    if (filter === 'Baggage') list = [...list].sort((a, b) => Number(!!b.baggage.includes('checked')) - Number(!!a.baggage.includes('checked')));
    return list;
  }, [filter]);

  const cheapest = providersYYZDEL.find((p) => p.isBestPrice)!;
  const official = providersYYZDEL.find((p) => p.isOfficial)!;

  return (
    <Screen wide>
      <div className="fw-mobile-only">
        <div style={{ background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
            <BackButton onClick={() => navigate(-1)} />
            <div style={{ flex: 1 }}>
              <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Compare booking options</div>
              <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Air Canada AC 42 · Thu, Oct 15</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px 12px' }}>
            <AirlineMark code="AC" color="#D22630" />
            <span style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--navy-900)' }}>
              10:20 AM <span style={{ font: '700 12px/1 var(--font-mono)', color: 'var(--gray-500)' }}>YYZ</span> → 1:30 PM
              <sup style={{ font: '600 9px/1 var(--font-sans)', color: 'var(--text-faint)' }}> +1</sup>{' '}
              <span style={{ font: '700 12px/1 var(--font-mono)', color: 'var(--gray-500)' }}>DEL</span>
            </span>
            <span style={{ marginLeft: 'auto', font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>15h 40m · 1 stop</span>
          </div>
        </div>
      </div>
      <div className="fw-desktop-only">
        <TopNav variant="task" backLabel="Back to results" onBack={() => navigate(-1)} />
      </div>

      <div className="fw-mobile-only">
      <div className="fw-scroll" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 760 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '9px 10px' }}>
            <div style={{ font: '600 9px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--green-700)' }}>Cheapest</div>
            <div style={{ font: '500 11.5px/1.2 var(--font-sans)', color: 'var(--text-muted)', marginTop: 5 }}>{cheapest.name}</div>
            <div style={{ font: '700 13.5px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>CA${cheapest.price}</div>
          </div>
          <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '9px 10px' }}>
            <div style={{ font: '600 9px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--blue-700)' }}>Airline direct</div>
            <div style={{ font: '500 11.5px/1.2 var(--font-sans)', color: 'var(--text-muted)', marginTop: 5 }}>{official.name}</div>
            <div style={{ font: '700 13.5px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>CA${official.price}</div>
          </div>
          <div style={{ flex: 1, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '9px 10px' }}>
            <div style={{ font: '600 9px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Flexible fare</div>
            <div style={{ font: '500 11.5px/1.2 var(--font-sans)', color: 'var(--text-muted)', marginTop: 5 }}>Expedia</div>
            <div style={{ font: '700 13.5px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>CA$945</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {(['All', 'Airline direct', 'Travel sites', 'Baggage'] as ProviderFilter[]).map((opt) => {
            const selected = filter === opt;
            return (
              <span
                key={opt}
                onClick={() => setFilter(opt)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 32,
                  padding: '0 12px',
                  borderRadius: 'var(--r-pill)',
                  background: selected ? 'var(--navy-900)' : '#fff',
                  border: selected ? undefined : '1px solid var(--border-strong)',
                  font: `${selected ? 600 : 500} 12px/1 var(--font-sans)`,
                  color: selected ? '#fff' : 'var(--text-body)',
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                {opt}
              </span>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{providersYYZDEL.length} providers compared · per traveler</span>
          <span style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)' }}>Checked 2 min ago</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {providers.map((p) => (
            <ProviderCard key={p.id} p={p} onViewDeal={() => navigate(`/provider/${p.id}/deal?flightId=${f.id}`)} />
          ))}
        </div>

        <div style={{ font: '400 11px/1.5 var(--font-sans)', color: 'var(--text-faint)', textAlign: 'center' }}>
          FareWatch compares prices. Your booking is completed with the selected provider.
        </div>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 4 }}>
          <span onClick={() => navigate(`/flight/${f.id}/price-changed`)} style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)', textDecoration: 'underline', cursor: 'pointer' }}>
            Price changed example
          </span>
          <span onClick={() => navigate(`/flight/${f.id}/sold-out`)} style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)', textDecoration: 'underline', cursor: 'pointer' }}>
            No booking options example
          </span>
        </div>
      </div>
      </div>
      </div>

      {/* ---- Desktop: main column + price-trend/alert sidebar (per D5) ---- */}
      <div className="fw-desktop-only">
        <div className="fw-scroll">
          <div className="fw-container" style={{ padding: '26px 40px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xs)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <AirlineMark code="AC" color="#D22630" size={34} />
                  <div>
                    <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Air Canada · AC 042</div>
                    <div style={{ font: '400 11.5px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 5 }}>Round trip · Economy</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border-default)' }}>
                  <div>
                    <div style={{ font: '600 22px/1 var(--font-sans)', color: 'var(--navy-900)' }}>10:20 AM</div>
                    <div style={{ font: '700 12px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 6 }}>YYZ · Thu, Oct 15</div>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>15h 40m · 1 stop</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ font: '600 22px/1 var(--font-sans)', color: 'var(--navy-900)' }}>
                      1:30 AM <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>+1</span>
                    </div>
                    <div style={{ font: '700 12px/1 var(--font-mono)', color: 'var(--text-muted)', marginTop: 6 }}>DEL · Sat, Oct 17</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 26 }}>
                <div style={{ font: '800 20px/1.2 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>{providers.length} ways to book this flight</div>
                <span style={{ font: '400 12.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Prices include taxes and fees · per traveller</span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                {(['All', 'Airline direct', 'Travel sites', 'Baggage'] as ProviderFilter[]).map((opt) => {
                  const selected = filter === opt;
                  return (
                    <button
                      key={opt}
                      className="fw-reset-btn"
                      onClick={() => setFilter(opt)}
                      style={{
                        height: 32,
                        padding: '0 12px',
                        borderRadius: 'var(--r-pill)',
                        background: selected ? 'var(--navy-900)' : '#fff',
                        border: selected ? undefined : '1px solid var(--border-strong)',
                        font: `${selected ? 600 : 500} 12px/1 var(--font-sans)`,
                        color: selected ? '#fff' : 'var(--text-body)',
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                {providers.map((p) => (
                  <ProviderCard key={p.id} p={p} onViewDeal={() => navigate(`/provider/${p.id}/deal?flightId=${f.id}`)} />
                ))}
              </div>
              <div style={{ font: '400 11.5px/1.6 var(--font-sans)', color: 'var(--text-faint)', marginTop: 16, maxWidth: 720 }}>
                FareWatch shows prices from supported airlines and travel sites and does not sell tickets. Booking happens on the provider's own site.
              </div>
            </div>

            <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xs)', padding: 20 }}>
                <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Price trend</div>
                <div style={{ font: '400 12.5px/1.6 var(--font-sans)', color: 'var(--text-muted)', marginTop: 7 }}>
                  CA${cheapest.price} is 12% below the 90-day average for this route.
                </div>
                <svg viewBox="0 0 280 96" style={{ width: '100%', height: 96, marginTop: 14, overflow: 'visible' }}>
                  <line x1="0" y1="24" x2="280" y2="24" stroke="var(--gray-100)" strokeWidth={1} />
                  <line x1="0" y1="56" x2="280" y2="56" stroke="var(--gray-100)" strokeWidth={1} />
                  <line x1="0" y1="88" x2="280" y2="88" stroke="var(--gray-100)" strokeWidth={1} />
                  <polyline points="0,40 35,32 70,48 105,36 140,58 175,50 210,66 245,60 280,74" fill="none" stroke="var(--blue-600)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx={280} cy={74} r={4} fill="var(--blue-600)" stroke="#fff" strokeWidth={2} />
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 11px/1 var(--font-mono)', color: 'var(--text-faint)', marginTop: 8 }}>
                  <span>90d ago</span>
                  <span>Today</span>
                </div>
              </div>
              <div style={{ background: 'var(--navy-900)', borderRadius: 'var(--r-lg)', padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'var(--teal-100)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
                    <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
                    <path d="M10.5 20a2 2 0 0 0 3 0" />
                  </svg>
                  <span style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase' }}>Price alert</span>
                </div>
                <div style={{ font: '700 18px/1.3 var(--font-sans)', color: '#fff', marginTop: 12 }}>Wait for a better price</div>
                <div style={{ font: '400 13px/1.6 var(--font-sans)', color: 'rgba(255,255,255,.72)', marginTop: 8 }}>
                  Set your target and we'll email you when any supported provider drops below it.
                </div>
                <div style={{ marginTop: 16 }}>
                  <Button variant="primary" size="md" fullWidth onClick={() => navigate(`/track/${f.id}`)}>
                    Track this fare
                  </Button>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: 20 }}>
                <div style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>What we compare</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12, font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-body)' }}>
                  <span>Total price with taxes and fees</span>
                  <span>Carry-on and checked baggage</span>
                  <span>Change and cancellation rules</span>
                  <span>Seat selection cost</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
