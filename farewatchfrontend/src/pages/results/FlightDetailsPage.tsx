import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { AirlineMark } from '../../components/AirlineMark';
import { ClockIcon } from '../../components/icons';
import { flightResults, providersYYZDEL } from '../../data/mock';
import { useAppState } from '../../state/AppState';

export default function FlightDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { searchForm } = useAppState();
  const f = flightResults.find((x) => x.id === id) ?? flightResults[1];
  const cheapest = providersYYZDEL.find((p) => p.isBestPrice)!;
  const isAC42 = f.id === 'ac42';

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate(-1)} />
        <div style={{ flex: 1 }}>
          <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>
            {searchForm.fromCity} → {searchForm.toCity}
          </div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
            {searchForm.departDate.replace(/^\w+, /, '')} · {searchForm.tripType} · {searchForm.travelers} travelers
          </div>
        </div>
        {f.badge && (
          <span style={{ background: f.badgeBg, color: f.badgeFg, font: '600 11px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>
            {f.badge}
          </span>
        )}
      </div>

      <div className="fw-scroll" style={{ padding: '14px 16px' }}>
        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <AirlineMark code={f.code} color={f.color} size={28} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>
                  {isAC42 ? 'Air Canada + Lufthansa' : f.airline}
                </span>
                {isAC42 && (
                  <span style={{ display: 'inline-flex', background: 'var(--gray-100)', color: 'var(--gray-600)', font: '600 10px/1 var(--font-sans)', padding: '4px 8px', borderRadius: 'var(--r-pill)' }}>
                    Multiple airlines
                  </span>
                )}
              </div>
              <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 5 }}>
                Outbound · {f.dur} · {f.stops}
              </div>
            </div>
          </div>

          {isAC42 ? (
            <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 5 }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid var(--blue-600)', boxSizing: 'border-box' }} />
                <span style={{ flex: 1, width: 1.5, background: 'var(--gray-300)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--gray-300)' }} />
                <span style={{ flex: 1, width: 1.5, background: 'var(--gray-300)' }} />
                <span style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid var(--blue-600)', boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <span style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>10:20 AM</span>
                  <span style={{ font: '700 13px/1 var(--font-mono)', color: 'var(--navy-900)', marginLeft: 8 }}>YYZ</span>
                  <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginLeft: 6 }}>Toronto Pearson</span>
                </div>
                <div style={{ paddingLeft: 2 }}>
                  <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>Air Canada AC 840 · 8h 05m · 787-9</div>
                  <div style={{ font: '400 11px/1.4 var(--font-sans)', color: 'var(--text-faint)', marginTop: 2 }}>Codeshare · operated by Lufthansa</div>
                </div>
                <div>
                  <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>FRA</span>
                  <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginLeft: 6 }}>Frankfurt</span>
                  <span style={{ display: 'inline-flex', marginLeft: 8, background: 'var(--amber-50)', color: 'var(--amber-600)', font: '600 11px/1 var(--font-sans)', padding: '4px 8px', borderRadius: 'var(--r-pill)' }}>
                    2h 15m layover
                  </span>
                </div>
                <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', paddingLeft: 2 }}>Lufthansa LH 760 · 7h 20m · A350-900</div>
                <div>
                  <span style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>1:30 PM</span>
                  <sup style={{ font: '600 10px/1 var(--font-sans)', color: 'var(--text-faint)' }}> +1</sup>
                  <span style={{ font: '700 13px/1 var(--font-mono)', color: 'var(--navy-900)', marginLeft: 8 }}>DEL</span>
                  <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginLeft: 6 }}>Indira Gandhi Intl</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <div>
                <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{f.dep}</div>
                <div style={{ font: '700 13px/1 var(--font-mono)', color: 'var(--gray-500)', marginTop: 4 }}>YYZ</div>
              </div>
              <div style={{ flex: 1, textAlign: 'center', font: '400 11px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{f.dur}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>
                  {f.arr}
                  {f.plus && <sup style={{ font: '600 10px/1 var(--font-sans)', color: 'var(--text-faint)' }}> {f.plus}</sup>}
                </div>
                <div style={{ font: '700 13px/1 var(--font-mono)', color: 'var(--gray-500)', marginTop: 4 }}>DEL</div>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Cabin</div>
            <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 5 }}>{searchForm.cabin}</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Fare type</div>
            <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 5 }}>Standard</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Baggage</div>
            <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 5 }}>1 carry-on · 1 checked 23kg</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Seats</div>
            <div style={{ font: '500 13px/1.3 var(--font-sans)', color: 'var(--text-muted)', marginTop: 5 }}>Choose at booking</div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: 16, marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 var(--font-sans)', color: 'var(--text-body)' }}>
            <span>Base fare</span>
            <span>CA${cheapest.price - 137}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 13px/1 var(--font-sans)', color: 'var(--text-body)', marginTop: 10 }}>
            <span>Taxes & fees</span>
            <span>CA$137</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--gray-100)', marginTop: 12, paddingTop: 12 }}>
            <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Estimated total per traveler</span>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 5 }}>
              <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>from</span>
              <span style={{ font: '800 22px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>CA${f.price}</span>
            </span>
          </div>
          <div style={{ font: '400 12px/1.4 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>
            CA${(parseInt(f.price.replace(/,/g, ''), 10) * searchForm.travelers).toLocaleString()} total for {searchForm.travelers} travelers · cheapest of {providersYYZDEL.filter((p) => !p.unavailable).length} booking options
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, color: 'var(--text-faint)' }}>
            <ClockIcon size={12} />
            <span style={{ font: '400 11px/1 var(--font-sans)' }}>Checked 2 minutes ago · fares can change quickly</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--border-default)', background: '#fff', flexShrink: 0, boxShadow: '0 -4px 12px rgba(10,37,64,.04)' }}>
        <Button size="lg" fullWidth onClick={() => navigate(`/flight/${f.id}/compare`)}>
          Compare prices
        </Button>
        <div
          onClick={() => navigate(`/track/${f.id}`)}
          style={{ textAlign: 'center', font: '600 14px/1 var(--font-sans)', color: 'var(--action)', marginTop: 12, cursor: 'pointer' }}
        >
          Track price
        </div>
      </div>
    </Screen>
  );
}
