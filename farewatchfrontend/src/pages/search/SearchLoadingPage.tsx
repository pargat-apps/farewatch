import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { useAppState } from '../../state/AppState';

export default function SearchLoadingPage() {
  const navigate = useNavigate();
  const { searchForm } = useAppState();

  useEffect(() => {
    const t = setTimeout(() => navigate('/results'), 1600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Screen>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
          <BackButton onClick={() => navigate('/home')} />
          <div>
            <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>
              {searchForm.fromCode} → {searchForm.toCode}
            </div>
            <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
              {searchForm.departDate} – {searchForm.returnDate} · {searchForm.travelers} travelers · {searchForm.cabin}
            </div>
          </div>
        </div>
        <div style={{ height: 3, background: 'var(--blue-50)', overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: '30%', height: '100%', background: 'var(--blue-600)', animation: 'fwProg 1.3s var(--ease-inout) infinite' }} />
        </div>
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ font: '500 13px/1.4 var(--font-sans)', color: 'var(--text-muted)' }}>Searching flights and comparing fares…</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Finding matching flights</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>Comparing airlines</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--blue-600)', margin: '0 3px' }} />
            <span style={{ font: '500 12px/1 var(--font-sans)', color: 'var(--blue-700)' }}>Checking travel sites</span>
          </div>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-sm)', padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="fw-shimmer" style={{ width: 32, height: 32, borderRadius: 8 }} />
              <span className="fw-shimmer" style={{ width: 110, height: 12, borderRadius: 6 }} />
              <span className="fw-shimmer" style={{ width: 74, height: 22, borderRadius: 6, marginLeft: 'auto' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 16 }}>
              <span className="fw-shimmer" style={{ width: 56, height: 18, borderRadius: 6 }} />
              <span className="fw-shimmer" style={{ flex: 1, height: 8, borderRadius: 4 }} />
              <span className="fw-shimmer" style={{ width: 56, height: 18, borderRadius: 6 }} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <span className="fw-shimmer" style={{ flex: 1, height: 34, borderRadius: 'var(--r-md)' }} />
              <span className="fw-shimmer" style={{ flex: 1, height: 34, borderRadius: 'var(--r-md)' }} />
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
