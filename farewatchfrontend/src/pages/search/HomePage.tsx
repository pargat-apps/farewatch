import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { SwapIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';
import type { SearchForm } from '../../state/AppState';

const STEPS = [
  { n: 1, bold: 'Search.', text: 'Find the flight you want.' },
  { n: 2, bold: 'Compare.', text: 'See prices across supported airlines and travel sites.' },
  { n: 3, bold: 'Track.', text: 'Set the maximum price you want to pay.' },
  { n: 4, bold: 'Get alerted.', text: "We'll tell you when a matching fare reaches your target." },
  { n: 5, bold: 'Choose where to book.', text: "Continue to your preferred provider." },
];

const TRIP_TYPES: SearchForm['tripType'][] = ['Round trip', 'One way', 'Multi-city'];

export default function HomePage() {
  const navigate = useNavigate();
  const { searchForm, setSearchForm, isSignedIn } = useAppState();

  return (
    <Screen>
      <div className="fw-scroll">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 56,
            padding: '0 16px',
            background: '#fff',
            borderBottom: '1px solid var(--border-default)',
          }}
        >
          <span style={{ font: '800 20px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {isSignedIn ? (
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate('/auth/sign-in')}>
                Sign in
              </Button>
            )}
          </div>
        </div>

        <div style={{ padding: '20px 16px 16px' }}>
          <div style={{ font: '800 30px/1.15 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            One flight. Many prices.
            <br />
            Find the best one.
          </div>
          <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 8 }}>
            Compare flight prices across airlines and leading travel sites, then track the fare and book when the price fits your budget.
          </div>
        </div>

        <div style={{ margin: '0 16px', background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-sm)', padding: 14 }}>
          <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 'var(--r-pill)', padding: 3 }}>
            {TRIP_TYPES.map((t) => (
              <span
                key={t}
                onClick={() => setSearchForm({ tripType: t })}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '8px 0',
                  borderRadius: 'var(--r-pill)',
                  background: searchForm.tripType === t ? '#fff' : 'transparent',
                  boxShadow: searchForm.tripType === t ? 'var(--shadow-xs)' : undefined,
                  font: `${searchForm.tripType === t ? 600 : 500} 13px/1 var(--font-sans)`,
                  color: searchForm.tripType === t ? 'var(--navy-900)' : 'var(--gray-500)',
                  cursor: 'pointer',
                }}
              >
                {t}
              </span>
            ))}
          </div>

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
            <button
              className="fw-reset-btn"
              onClick={() => navigate('/search/airport?field=from')}
              style={{ textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '10px 12px', background: '#fff' }}
            >
              <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                From
              </div>
              <div style={{ font: '600 17px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>{searchForm.fromCity}</div>
              <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 3 }}>
                <span style={{ font: '700 12px/1 var(--font-mono)' }}>{searchForm.fromCode}</span> · {searchForm.fromCity} Pearson
              </div>
            </button>
            <button
              className="fw-reset-btn"
              onClick={() => navigate('/search/airport?field=to')}
              style={{ textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '10px 12px', background: '#fff' }}
            >
              <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                To
              </div>
              <div style={{ font: '600 17px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>{searchForm.toCity}</div>
              <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 3 }}>
                <span style={{ font: '700 12px/1 var(--font-mono)' }}>{searchForm.toCode}</span> · Indira Gandhi International
              </div>
            </button>
            <button
              className="fw-reset-btn"
              aria-label="Swap origin and destination"
              onClick={() =>
                setSearchForm({
                  fromCode: searchForm.toCode,
                  fromCity: searchForm.toCity,
                  toCode: searchForm.fromCode,
                  toCity: searchForm.fromCity,
                })
              }
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: '#fff',
                border: '1px solid var(--border-strong)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--blue-600)',
              }}
            >
              <SwapIcon size={17} style={{ transform: 'rotate(90deg)' }} strokeWidth={1.75} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              className="fw-reset-btn"
              onClick={() => navigate('/search/dates')}
              style={{ flex: 1, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '10px 12px', background: '#fff' }}
            >
              <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Departure
              </div>
              <div style={{ font: '600 15px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>{searchForm.departDate}</div>
            </button>
            <button
              className="fw-reset-btn"
              onClick={() => navigate('/search/dates')}
              style={{ flex: 1, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '10px 12px', background: '#fff' }}
            >
              <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Return
              </div>
              <div style={{ font: '600 15px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>{searchForm.returnDate}</div>
            </button>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button
              className="fw-reset-btn"
              onClick={() => navigate('/search/travelers')}
              style={{ flex: 1, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '10px 12px', background: '#fff' }}
            >
              <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Travelers
              </div>
              <div style={{ font: '600 15px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>{searchForm.travelers} travelers</div>
            </button>
            <button
              className="fw-reset-btn"
              onClick={() => navigate('/search/travelers')}
              style={{ flex: 1, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '10px 12px', background: '#fff' }}
            >
              <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Cabin
              </div>
              <div style={{ font: '600 15px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 4 }}>{searchForm.cabin}</div>
            </button>
          </div>

          <div style={{ marginTop: 12 }}>
            <Button size="lg" fullWidth onClick={() => navigate('/search/loading')}>
              Search flights
            </Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 10, color: 'var(--text-faint)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--teal-600)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span style={{ font: '400 11.5px/1 var(--font-sans)' }}>Comparing airlines and leading travel sites</span>
          </div>
        </div>

        <div style={{ padding: '24px 16px 0' }}>
          <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            How FareWatch works
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 10 }}>
            {STEPS.map((s) => (
              <div key={s.n} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'var(--blue-50)',
                    color: 'var(--blue-700)',
                    font: '700 11px/22px var(--font-sans)',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  {s.n}
                </span>
                <div style={{ font: '400 12.5px/1.5 var(--font-sans)', color: 'var(--text-muted)' }}>
                  <b style={{ color: 'var(--navy-900)', fontWeight: 600 }}>{s.bold}</b> {s.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-faint)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ font: '400 12px/1 var(--font-sans)' }}>Fares refresh every few minutes</span>
        </div>
      </div>
    </Screen>
  );
}
