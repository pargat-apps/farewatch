import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { SearchIcon } from '../../components/icons';
import { airportsNearby, airportsPopular, airportsRecent, type Airport } from '../../data/mock';
import { useAppState } from '../../state/AppState';

function AirportRow({ ap, dist, onClick }: { ap: Airport; dist?: string; onClick: () => void }) {
  return (
    <button
      className="fw-reset-btn"
      onClick={onClick}
      style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid var(--gray-100)', textAlign: 'left' }}
    >
      <span
        style={{
          width: 46,
          height: 38,
          borderRadius: 'var(--r-md)',
          background: 'var(--gray-100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          font: '700 13px/1 var(--font-mono)',
          color: 'var(--navy-900)',
          flexShrink: 0,
        }}
      >
        {ap.code}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--navy-900)' }}>{ap.name}</div>
        <div style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--text-muted)', marginTop: 2 }}>{ap.city}</div>
      </div>
      {dist ? (
        <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-faint)' }}>{dist}</span>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth={1.75} strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
    </button>
  );
}

export default function AirportSearchPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const field = (params.get('field') === 'to' ? 'to' : 'from') as 'from' | 'to';
  const { setSearchForm } = useAppState();
  const [query, setQuery] = useState('');

  const all = useMemo(() => [...airportsRecent, ...airportsNearby, ...airportsPopular], []);
  const filtered = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return all.filter((a) => a.code.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.city.toLowerCase().includes(q));
  }, [query, all]);

  const pick = (ap: Airport) => {
    const city = ap.city.split(',')[0];
    if (field === 'from') setSearchForm({ fromCode: ap.code, fromCity: city });
    else setSearchForm({ toCode: ap.code, toCity: city });
    navigate(-1);
  };

  return (
    <Screen background="#fff">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate(-1)} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid var(--action)',
            borderRadius: 'var(--r-md)',
            padding: '11px 12px',
            boxShadow: 'var(--shadow-focus)',
            background: '#fff',
          }}
        >
          <SearchIcon size={16} color="var(--gray-400)" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search city or airport (${field === 'from' ? 'From' : 'To'})`}
            style={{ flex: 1, border: 0, outline: 'none', font: '400 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}
          />
        </div>
      </div>
      <div className="fw-scroll" style={{ padding: '16px 16px 0' }}>
        {filtered ? (
          filtered.length > 0 ? (
            filtered.map((ap) => <AirportRow key={ap.code} ap={ap} onClick={() => pick(ap)} />)
          ) : (
            <div style={{ padding: '40px 0', textAlign: 'center', font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-muted)' }}>
              No airports match "{query}"
            </div>
          )
        ) : (
          <>
            <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>
              Recent
            </div>
            {airportsRecent.map((ap) => (
              <AirportRow key={ap.code} ap={ap} onClick={() => pick(ap)} />
            ))}
            <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 4px' }}>
              Nearby
            </div>
            {airportsNearby.map((ap) => (
              <AirportRow key={ap.code} ap={ap} dist={ap.dist} onClick={() => pick(ap)} />
            ))}
            <div style={{ font: '600 11px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '18px 0 4px' }}>
              Popular airports
            </div>
            {airportsPopular.map((ap) => (
              <AirportRow key={ap.code} ap={ap} onClick={() => pick(ap)} />
            ))}
          </>
        )}
      </div>
    </Screen>
  );
}
