import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { TabBar } from '../../components/TabBar';
import { useAppState } from '../../state/AppState';

type Range = '7D' | '30D' | '90D';
type Series = 'Best price' | 'Airline direct';

const BEST_PATH = 'M0 52 L28 45 L56 34 L84 60 L112 78 L140 70 L168 95 L196 110 L224 100 L252 118 L280 124 L316 126';
const DIRECT_PATH = 'M0 40 L28 38 L56 30 L84 46 L112 60 L140 55 L168 72 L196 80 L224 78 L252 90 L280 96 L316 100';

export default function PriceHistoryPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { alerts, unreadCount } = useAppState();
  const alert = alerts.find((a) => a.id === id);
  const [range, setRange] = useState<Range>('30D');
  const [series, setSeries] = useState<Series>('Best price');

  const path = series === 'Best price' ? BEST_PATH : DIRECT_PATH;

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate(-1)} />
        <div style={{ flex: 1 }}>
          <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>{alert?.route ?? 'YYZ → DEL'}</div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Price history · Best available fare</div>
        </div>
      </div>

      <div className="fw-scroll" style={{ padding: 16 }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12 }}>
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
      <TabBar active="Alerts" badge={unreadCount} />
    </Screen>
  );
}
