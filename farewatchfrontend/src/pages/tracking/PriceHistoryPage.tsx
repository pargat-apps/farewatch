import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { TopNav } from '../../components/TopNav';
import { Button } from '../../components/ui/Button';
import { providersYYZDEL } from '../../data/mock';
import { useAppState } from '../../state/AppState';

type Range = '7D' | '30D' | '90D';
type Series = 'Best price' | 'Airline direct';

const BEST_PATH = 'M0 52 L28 45 L56 34 L84 60 L112 78 L140 70 L168 95 L196 110 L224 100 L252 118 L280 124 L316 126';
const DIRECT_PATH = 'M0 40 L28 38 L56 30 L84 46 L112 60 L140 55 L168 72 L196 80 L224 78 L252 90 L280 96 L316 100';

const DESKTOP_BEST_PATH = 'M0,96 L60,84 L120,110 L180,72 L240,64 L300,118 L360,104 L420,150 L480,134 L540,168 L600,146 L660,180 L720,164 L780,190';

const RECENT_CHANGES = [
  { dir: 'down' as const, text: 'Trip.com dropped to CA$879', delta: '−CA$46', time: 'Today, 9:12 AM' },
  { dir: 'up' as const, text: 'Expedia rose to CA$941', delta: '+CA$23', time: 'Yesterday, 6:40 PM' },
  { dir: 'down' as const, text: 'Air Canada dropped to CA$924', delta: '−CA$18', time: 'Aug 25, 11:05 AM' },
];

export default function PriceHistoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { alerts, unreadCount } = useAppState();
  const alert = alerts.find((a) => a.id === id);
  const [range, setRange] = useState<Range>('30D');
  const [series, setSeries] = useState<Series>('Best price');

  const path = series === 'Best price' ? BEST_PATH : DIRECT_PATH;

  return (
    <Screen wide>
      <div className="fw-mobile-only">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
          <BackButton onClick={() => navigate(-1)} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>{alert?.route ?? 'YYZ → DEL'}</div>
            <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Price history · Best available fare</div>
          </div>
        </div>
      </div>
      <div className="fw-desktop-only">
        <TopNav variant="task" backLabel="All price alerts" onBack={() => navigate('/alerts')} />
      </div>

      <div className="fw-mobile-only">
      <div className="fw-scroll" style={{ padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 760 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Best available today · Expedia</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ font: '800 30px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>CA$940</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'var(--green-100)', color: 'var(--green-700)', font: '700 12px/1 var(--font-sans)', padding: '5px 10px', borderRadius: 'var(--r-pill)' }}>↓ 16%</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--target)' }}>Target</div>
            <div style={{ font: '800 18px/1 var(--font-sans)', color: 'var(--target)', marginTop: 6 }}>CA${alert?.target ?? 900}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 'var(--r-pill)', padding: 3, width: 170 }}>
            {(['7D', '30D', '90D'] as Range[]).map((r) => (
              <span
                key={r}
                onClick={() => setRange(r)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '7px 0',
                  borderRadius: 'var(--r-pill)',
                  background: range === r ? '#fff' : 'transparent',
                  boxShadow: range === r ? 'var(--shadow-xs)' : undefined,
                  font: `${range === r ? 600 : 500} 12px/1 var(--font-sans)`,
                  color: range === r ? 'var(--navy-900)' : 'var(--gray-500)',
                  cursor: 'pointer',
                }}
              >
                {r}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', background: 'var(--gray-100)', borderRadius: 'var(--r-pill)', padding: 3, flex: 1 }}>
            {(['Best price', 'Airline direct'] as Series[]).map((s) => (
              <span
                key={s}
                onClick={() => setSeries(s)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '7px 0',
                  borderRadius: 'var(--r-pill)',
                  background: series === s ? '#fff' : 'transparent',
                  boxShadow: series === s ? 'var(--shadow-xs)' : undefined,
                  font: `${series === s ? 600 : 500} 12px/1 var(--font-sans)`,
                  color: series === s ? 'var(--navy-900)' : 'var(--gray-500)',
                  cursor: 'pointer',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '16px 12px 8px', marginTop: 12 }}>
          <svg width="100%" viewBox="0 0 330 180" style={{ display: 'block' }}>
            <line x1="0" y1="30" x2="330" y2="30" stroke="var(--gray-100)" strokeWidth={1} />
            <line x1="0" y1="80" x2="330" y2="80" stroke="var(--gray-100)" strokeWidth={1} />
            <line x1="0" y1="130" x2="330" y2="130" stroke="var(--gray-100)" strokeWidth={1} />
            <path d={path} fill="none" stroke="var(--blue-600)" strokeWidth={2} strokeLinejoin="round" />
            <path d={`${path} L316 180 L0 180 Z`} fill="var(--blue-50)" opacity={0.6} />
            <line x1="0" y1="148" x2="330" y2="148" stroke="var(--purple-500)" strokeWidth={1.5} strokeDasharray="5 4" />
            <rect x="240" y="138" width="90" height="20" rx="10" fill="var(--purple-100)" />
            <text x="285" y="151.5" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10.5" fontWeight={600} fill="var(--purple-700)">
              Target CA${alert?.target ?? 900}
            </text>
            <circle cx="316" cy={series === 'Best price' ? 126 : 100} r="4.5" fill="var(--blue-600)" stroke="#fff" strokeWidth={2} />
            <text x="8" y="24" fontFamily="Inter,sans-serif" fontSize="10" fill="var(--gray-400)">CA$1,180</text>
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: '400 10.5px/1 var(--font-sans)', color: 'var(--text-faint)', padding: '6px 2px 4px' }}>
            <span>Jul 27</span>
            <span>Aug 10</span>
            <span>Aug 26</span>
          </div>
        </div>

        <div className="fw-grid-4" style={{ marginTop: 12 }}>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: 12 }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>30-day low</div>
            <div style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--green-700)', marginTop: 6 }}>CA$875</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: 12 }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Airline direct</div>
            <div style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 6 }}>CA$975</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: 12 }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Average</div>
            <div style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 6 }}>CA$1,010</div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: 12 }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Highest</div>
            <div style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 6 }}>CA$1,180</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, background: 'var(--green-50)', border: '1px solid var(--green-100)', borderRadius: 'var(--r-md)', padding: '11px 14px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-700)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 17-8.5-8.5-5 5L2 7" />
            <path d="M16 17h6v-6" />
          </svg>
          <span style={{ font: '600 13px/1.3 var(--font-sans)', color: 'var(--green-700)' }}>↓ 16% since you started tracking</span>
        </div>
      </div>
      </div>
      </div>

      {/* ---- Desktop: main history column + alert-settings sidebar (per D9) ---- */}
      <div className="fw-desktop-only">
        <div className="fw-scroll">
          <div className="fw-container" style={{ padding: '30px 40px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ font: '800 28px/1.15 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>{alert?.route ?? 'YYZ → DEL'}</span>
                    <span style={{ padding: '5px 10px', borderRadius: 'var(--r-pill)', background: 'var(--blue-50)', border: '1px solid var(--blue-100)', font: '600 10.5px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--blue-700)' }}>
                      Tracking
                    </span>
                  </div>
                  <div style={{ font: '400 13.5px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 10 }}>{alert?.dates ?? 'Oct 15 – Nov 10'}</div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <Button variant="ghost" size="sm">
                    Pause
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => navigate(`/alerts/${id}/edit`)}>
                    Edit target
                  </Button>
                </div>
              </div>

              <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xs)', padding: 24, marginTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Best price now · {alert?.bestProvider || 'Trip.com'}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 9 }}>
                      <span style={{ font: '800 38px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>CA${alert?.currentBest ?? 940}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 'var(--r-pill)', background: 'var(--green-50)', font: '600 12px/1 var(--font-sans)', color: 'var(--green-700)' }}>↓ 16%</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, background: 'var(--gray-100)', borderRadius: 'var(--r-md)', padding: 3 }}>
                    {(['7D', '30D', '90D'] as Range[]).map((r) => (
                      <button
                        key={r}
                        className="fw-reset-btn"
                        onClick={() => setRange(r)}
                        style={{ padding: '7px 13px', borderRadius: 7, background: range === r ? '#fff' : 'transparent', boxShadow: range === r ? 'var(--shadow-xs)' : undefined, font: `${range === r ? 600 : 500} 12px/1 var(--font-sans)`, color: range === r ? 'var(--navy-900)' : 'var(--gray-500)' }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <svg viewBox="0 0 780 260" style={{ width: '100%', height: 260, marginTop: 22, overflow: 'visible' }}>
                  <line x1="0" y1="20" x2="780" y2="20" stroke="var(--gray-100)" />
                  <line x1="0" y1="80" x2="780" y2="80" stroke="var(--gray-100)" />
                  <line x1="0" y1="140" x2="780" y2="140" stroke="var(--gray-100)" />
                  <line x1="0" y1="200" x2="780" y2="200" stroke="var(--gray-100)" />
                  <path d={`${DESKTOP_BEST_PATH} L780,245 L0,245 Z`} fill="var(--blue-50)" />
                  <polyline points={DESKTOP_BEST_PATH.replace(/[ML]/g, '').trim()} fill="none" stroke="var(--blue-600)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="0" y1="214" x2="780" y2="214" stroke="var(--purple-600)" strokeWidth={1.5} strokeDasharray="5 5" />
                  <circle cx={780} cy={190} r={5.5} fill="var(--blue-600)" stroke="#fff" strokeWidth={2.5} />
                  <text x={8} y={207} style={{ font: '600 11px var(--font-sans)', fill: 'var(--purple-600)' }}>
                    Your target CA${alert?.target ?? 800}
                  </text>
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, font: '400 11px/1 var(--font-mono)', color: 'var(--text-faint)' }}>
                  <span>Jul 28</span>
                  <span>Aug 6</span>
                  <span>Aug 14</span>
                  <span>Aug 21</span>
                  <span>Today</span>
                </div>
                <div style={{ display: 'flex', gap: 36, marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--border-default)' }}>
                  <div>
                    <div style={{ font: '400 11.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>30-day low</div>
                    <div style={{ font: '700 17px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 7 }}>CA$875</div>
                  </div>
                  <div>
                    <div style={{ font: '400 11.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>30-day high</div>
                    <div style={{ font: '700 17px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 7 }}>CA$1,094</div>
                  </div>
                  <div>
                    <div style={{ font: '400 11.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Average</div>
                    <div style={{ font: '700 17px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 7 }}>CA$968</div>
                  </div>
                </div>
              </div>

              <div style={{ font: '600 16px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 26 }}>Recent price changes</div>
              <div className="fw-list-card" style={{ marginTop: 14 }}>
                {RECENT_CHANGES.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '15px 20px', borderBottom: i < RECENT_CHANGES.length - 1 ? '1px solid var(--border-default)' : undefined }}>
                    <span
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 'var(--r-sm)',
                        background: c.dir === 'down' ? 'var(--green-50)' : 'var(--red-50)',
                        color: c.dir === 'down' ? 'var(--green-600)' : 'var(--red-500)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
                        {c.dir === 'down' ? (
                          <>
                            <path d="M12 5v14" />
                            <path d="m6 13 6 6 6-6" />
                          </>
                        ) : (
                          <>
                            <path d="M12 19V5" />
                            <path d="m6 11 6-6 6 6" />
                          </>
                        )}
                      </svg>
                    </span>
                    <span style={{ flex: 1, font: '500 13.5px/1 var(--font-sans)', color: 'var(--text-body)' }}>{c.text}</span>
                    <span style={{ font: '600 13px/1 var(--font-sans)', color: c.dir === 'down' ? 'var(--green-600)' : 'var(--red-500)' }}>{c.delta}</span>
                    <span style={{ width: 120, textAlign: 'right', font: '400 12px/1 var(--font-sans)', color: 'var(--text-faint)' }}>{c.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xs)', padding: 20 }}>
                <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Alert settings</div>
                {[
                  ['Target price', `CA$${alert?.target ?? 800}`, 'var(--target)'],
                  ['Watching', 'Any provider', 'var(--navy-900)'],
                  ['Notify by', 'Email', 'var(--navy-900)'],
                ].map(([label, value, color], i, arr) => (
                  <div key={label}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: i === 0 ? 16 : 0 }}>
                      <span style={{ font: '400 12.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{label}</span>
                      <span style={{ font: `${i === 0 ? 700 : 600} ${i === 0 ? 16 : 13}px/1 var(--font-sans)`, color }}>{value}</span>
                    </div>
                    {i < arr.length - 1 && <div style={{ height: 1, background: 'var(--border-default)', margin: '14px 0' }} />}
                  </div>
                ))}
              </div>
              <div style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-xs)', padding: 20 }}>
                <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Cheapest by provider</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 16 }}>
                  {providersYYZDEL.filter((p) => !p.unavailable).slice(0, 4).map((p) => (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <span style={{ width: 28, height: 28, borderRadius: 'var(--r-sm)', background: p.markColor ?? 'var(--navy-900)', color: '#fff', font: '700 10px/1 var(--font-mono)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {p.mark}
                      </span>
                      <span style={{ flex: 1, font: '500 13px/1 var(--font-sans)', color: 'var(--text-body)' }}>{p.name}</span>
                      <span style={{ font: '700 14px/1 var(--font-sans)', color: 'var(--navy-900)' }}>CA${p.price}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 18 }}>
                  <Button variant="primary" size="md" fullWidth onClick={() => navigate('/flight/ac42/compare')}>
                    Compare all
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TabBar active="Alerts" badge={unreadCount} />
    </Screen>
  );
}
