import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { providersYYZDEL } from '../../data/mock';

export default function ViewDealPage() {
  const navigate = useNavigate();
  const { providerId } = useParams<{ providerId: string }>();
  const [params] = useSearchParams();
  const flightId = params.get('flightId') ?? 'ac42';
  const provider = providersYYZDEL.find((p) => p.id === providerId) ?? providersYYZDEL[0];
  const [redirecting, setRedirecting] = useState(false);

  return (
    <Screen background="var(--gray-50)">
      <div className="fw-sheet-overlay" onClick={() => navigate(-1)} />
      <div className="fw-sheet" style={{ padding: '8px 16px 20px', textAlign: 'center' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--gray-300)', margin: '0 auto' }} />
        <span
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: '#fff',
            border: '1px solid var(--border-strong)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            font: '700 18px/1 var(--font-mono)',
            color: 'var(--navy-900)',
            marginTop: 18,
          }}
        >
          {provider.mark}
        </span>
        <div style={{ font: '600 17px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 12 }}>
          {redirecting ? `Opening ${provider.name}…` : `Opening ${provider.name}`}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          <span style={{ font: '800 26px/1 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)' }}>CA${provider.price}</span>
          <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)' }}>per traveler</span>
        </div>
        <div style={{ font: '400 13px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 10, maxWidth: 290, marginLeft: 'auto', marginRight: 'auto' }}>
          FareWatch will send you to {provider.name} to complete your booking. The final price is confirmed on the provider's site.
        </div>
        <div style={{ marginTop: 18 }}>
          <Button
            size="lg"
            fullWidth
            loading={redirecting}
            onClick={() => {
              setRedirecting(true);
              setTimeout(() => navigate(`/flight/${flightId}/compare`), 900);
            }}
          >
            Continue
          </Button>
        </div>
        <div onClick={() => navigate(-1)} style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--action)', marginTop: 14, cursor: 'pointer' }}>
          Back to comparison
        </div>
        <div style={{ font: '400 10.5px/1.4 var(--font-sans)', color: 'var(--text-faint)', marginTop: 12 }}>
          You'll complete your booking on {provider.name}.
        </div>
      </div>
    </Screen>
  );
}
