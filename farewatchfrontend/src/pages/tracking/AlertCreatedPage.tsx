import { useNavigate, useSearchParams } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { CheckIcon } from '../../components/icons';

export default function AlertCreatedPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const target = parseInt(params.get('target') ?? '900', 10);
  const currentBest = 940;

  return (
    <Screen background="#fff">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--green-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fwPulse 2s var(--ease-out) infinite',
          }}
        >
          <CheckIcon size={34} color="var(--green-700)" strokeWidth={2} />
        </div>
        <div style={{ font: '800 24px/1.2 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)', marginTop: 22 }}>Price alert created</div>
        <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 10, maxWidth: 300 }}>
          We'll watch Toronto → Delhi across supported providers and notify you when any fare reaches{' '}
          <b style={{ color: 'var(--target)' }}>CA${target.toLocaleString()} or lower</b>.
        </div>
        <div style={{ display: 'flex', width: '100%', maxWidth: 320, background: 'var(--gray-50)', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', marginTop: 24 }}>
          <div style={{ flex: 1, padding: '14px 8px' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Current best</div>
            <div style={{ font: '800 17px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 7 }}>CA${currentBest}</div>
          </div>
          <div style={{ flex: 1, padding: '14px 8px', borderLeft: '1px solid var(--border-default)' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--target)' }}>Target</div>
            <div style={{ font: '800 17px/1 var(--font-sans)', color: 'var(--target)', marginTop: 7 }}>CA${target}</div>
          </div>
          <div style={{ flex: 1, padding: '14px 8px', borderLeft: '1px solid var(--border-default)' }}>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>To go</div>
            <div style={{ font: '800 17px/1 var(--font-sans)', color: 'var(--navy-900)', marginTop: 7 }}>CA${Math.max(0, currentBest - target)}</div>
          </div>
        </div>
        <div style={{ width: '100%', maxWidth: 320, marginTop: 24 }}>
          <Button size="lg" fullWidth onClick={() => navigate('/alerts')}>
            View alert
          </Button>
        </div>
        <div onClick={() => navigate('/home')} style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--action)', marginTop: 16, cursor: 'pointer' }}>
          Continue searching
        </div>
      </div>
    </Screen>
  );
}
