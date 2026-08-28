import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { TopNav } from '../../components/TopNav';
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

const DESKTOP_STEPS = [
  {
    title: 'Search once',
    text: 'Enter your route and dates. FareWatch queries supported airlines and travel sites together.',
    bg: 'var(--blue-50)',
    color: 'var(--blue-600)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" />
      </svg>
    ),
  },
  {
    title: 'Compare providers',
    text: 'One card per itinerary, every booking option priced side by side with baggage and change rules.',
    bg: 'var(--teal-50)',
    color: 'var(--teal-600)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="16" y2="12" />
        <line x1="4" y1="17" x2="11" y2="17" />
      </svg>
    ),
  },
  {
    title: 'Set your target',
    text: "Name the price you'd pay. Track any provider, the airline direct, or just the ones you trust.",
    bg: 'var(--purple-50)',
    color: 'var(--purple-600)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Get alerted, then book',
    text: 'When the fare drops to your target we email you and hand you off to that provider to book.',
    bg: 'var(--green-50)',
    color: 'var(--green-600)',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
        <path d="M10.5 20a2 2 0 0 0 3 0" />
      </svg>
    ),
  },
];

const WATCHED_ROUTES = [
  { route: 'YYZ → DEL', label: 'Toronto → Delhi', price: 'CA$879', delta: '↓ CA$46', deltaColor: 'var(--green-600)' },
  { route: 'YVR → NRT', label: 'Vancouver → Tokyo', price: 'CA$734', delta: '↑ CA$22', deltaColor: 'var(--red-500)' },
  { route: 'YUL → CDG', label: 'Montréal → Paris', price: 'CA$612', delta: '↓ CA$88', deltaColor: 'var(--green-600)' },
  { route: 'YYC → LHR', label: 'Calgary → London', price: 'CA$698', delta: 'No change', deltaColor: 'var(--gray-500)' },
];

const TRIP_TYPES: SearchForm['tripType'][] = ['Round trip', 'One way', 'Multi-city'];

export default function HomePage() {
  const navigate = useNavigate();
  const { searchForm, setSearchForm, isSignedIn } = useAppState();

  return (
    <Screen wide>
      <div className="fw-desktop-only">
        <TopNav variant="marketing" />
      </div>
      <div className="fw-scroll">
        <div className="fw-mobile-only">
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
        </div>

        {/* ---- Desktop marketing layout (per FareWatch Desktop UI D1) ---- */}
        <div className="fw-desktop-only">
          <div style={{ background: 'linear-gradient(180deg,var(--navy-900),var(--navy-800))', padding: '64px 0 128px', position: 'relative' }}>
            <div className="fw-container">
              <div style={{ maxWidth: 660 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '6px 12px',
                    borderRadius: 'var(--r-pill)',
                    background: 'rgba(255,255,255,.1)',
                    border: '1px solid rgba(255,255,255,.18)',
                    font: '600 11.5px/1 var(--font-sans)',
                    letterSpacing: 'var(--track-wide)',
                    textTransform: 'uppercase',
                    color: 'var(--teal-100)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                    <polyline points="16 17 22 17 22 11" />
                  </svg>
                  Fare comparison &amp; price alerts
                </div>
                <div style={{ font: '800 46px/1.1 var(--font-sans)', letterSpacing: '-0.025em', color: '#fff', marginTop: 22 }}>
                  One flight. Many prices.
                  <br />
                  Find the best one.
                </div>
                <div style={{ font: '400 16px/1.6 var(--font-sans)', color: 'rgba(255,255,255,.72)', marginTop: 16, maxWidth: 560 }}>
                  Compare flight prices across airlines and leading travel sites, then track the fare and book when the price fits your budget.
                </div>
              </div>
            </div>

            <div className="fw-container" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: -72, width: '100%' }}>
              <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-lg)', padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 'var(--r-pill)', padding: 3 }}>
                    {TRIP_TYPES.map((t) => (
                      <span
                        key={t}
                        onClick={() => setSearchForm({ tripType: t })}
                        style={{
                          padding: '8px 18px',
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
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'stretch' }}>
                  <div style={{ flex: 1.15, position: 'relative', display: 'flex', gap: 10 }}>
                    <button
                      className="fw-reset-btn"
                      onClick={() => navigate('/search/airport?field=from')}
                      style={{ flex: 1, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '11px 14px', background: '#fff' }}
                    >
                      <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>From</div>
                      <div style={{ font: '600 18px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 5 }}>{searchForm.fromCity}</div>
                      <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
                        <span style={{ font: '700 12px/1 var(--font-mono)' }}>{searchForm.fromCode}</span> · {searchForm.fromCity} Pearson
                      </div>
                    </button>
                    <button
                      className="fw-reset-btn"
                      onClick={() => navigate('/search/airport?field=to')}
                      style={{ flex: 1, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '11px 14px', background: '#fff' }}
                    >
                      <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>To</div>
                      <div style={{ font: '600 18px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 5 }}>{searchForm.toCity}</div>
                      <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
                        <span style={{ font: '700 12px/1 var(--font-mono)' }}>{searchForm.toCode}</span> · Indira Gandhi Intl
                      </div>
                    </button>
                    <button
                      aria-label="Swap origin and destination"
                      className="fw-reset-btn"
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
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%,-50%)',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: '#fff',
                        border: '1px solid var(--border-strong)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--action)',
                      }}
                    >
                      <SwapIcon size={16} style={{ transform: 'rotate(90deg)' }} strokeWidth={1.75} />
                    </button>
                  </div>
                  <button
                    className="fw-reset-btn"
                    onClick={() => navigate('/search/dates')}
                    style={{ flex: 0.55, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '11px 14px', background: '#fff' }}
                  >
                    <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Departure</div>
                    <div style={{ font: '600 16px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 6 }}>{searchForm.departDate}</div>
                  </button>
                  <button
                    className="fw-reset-btn"
                    onClick={() => navigate('/search/dates')}
                    style={{ flex: 0.55, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '11px 14px', background: '#fff' }}
                  >
                    <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Return</div>
                    <div style={{ font: '600 16px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 6 }}>{searchForm.returnDate}</div>
                  </button>
                  <button
                    className="fw-reset-btn"
                    onClick={() => navigate('/search/travelers')}
                    style={{ flex: 0.6, textAlign: 'left', border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', padding: '11px 14px', background: '#fff' }}
                  >
                    <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Travellers</div>
                    <div style={{ font: '600 16px/1.2 var(--font-sans)', color: 'var(--navy-900)', marginTop: 6 }}>{searchForm.travelers} travelers</div>
                  </button>
                  <div style={{ display: 'flex', alignItems: 'stretch' }}>
                    <Button variant="primary" size="lg" onClick={() => navigate('/search/loading')} style={{ height: '100%', width: 176 }}>
                      Search flights
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="fw-container" style={{ padding: '112px 40px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ font: '800 28px/1.2 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>How FareWatch works</div>
                <div style={{ font: '400 14px/1.6 var(--font-sans)', color: 'var(--text-muted)', marginTop: 8 }}>Four steps from search to the right price.</div>
              </div>
            </div>
            <div className="fw-grid-4" style={{ marginTop: 28, gap: 20 }}>
              {DESKTOP_STEPS.map((s) => (
                <div key={s.title} style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xs)', padding: 22 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--r-md)', background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {s.icon}
                  </div>
                  <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 16 }}>{s.title}</div>
                  <div style={{ font: '400 13.5px/1.6 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>{s.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="fw-container" style={{ padding: '56px 40px 64px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ font: '800 24px/1.2 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>Routes people are watching</div>
              <span style={{ font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Lowest price seen in the last 7 days</span>
            </div>
            <div className="fw-grid-4" style={{ marginTop: 22, gap: 20 }}>
              {WATCHED_ROUTES.map((r) => (
                <div key={r.route} style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xs)', padding: '18px 20px' }}>
                  <div style={{ font: '700 13px/1 var(--font-mono)', color: 'var(--navy-900)' }}>{r.route}</div>
                  <div style={{ font: '400 12.5px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>{r.label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 14 }}>
                    <span style={{ font: '800 24px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{r.price}</span>
                    <span style={{ font: '600 12px/1 var(--font-sans)', color: r.deltaColor }}>{r.delta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="fw-mobile-only">
        <div style={{ maxWidth: 640, margin: '0 auto', width: '100%' }}>
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
        </div>
      </div>
    </Screen>
  );
}
