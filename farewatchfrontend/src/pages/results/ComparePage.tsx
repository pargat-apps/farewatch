import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { AirlineMark } from '../../components/AirlineMark';
import { ProviderCard } from '../../components/ProviderCard';
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
    <Screen>
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

      <div className="fw-scroll" style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
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
    </Screen>
  );
}
