import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Button } from '../../components/ui/Button';

export default function NoBookingOptionsPage() {
  const navigate = useNavigate();

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate(-1)} />
        <div>
          <div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Compare booking options</div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>Air Canada AC 42 · Thu, Oct 15</div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="7.5" cy="7.5" r="0.5" fill="currentColor" />
          </svg>
        </div>
        <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 16 }}>No booking options available</div>
        <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6, maxWidth: 280 }}>
          We found the itinerary, but current fares from supported providers aren't available.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, width: 230 }}>
          <Button fullWidth onClick={() => navigate(-1)}>
            Refresh prices
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/results')}>
            View similar flights
          </Button>
        </div>
      </div>
    </Screen>
  );
}
