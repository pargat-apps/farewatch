import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { OfflineIcon } from '../../components/icons';

export default function NetworkErrorPage() {
  const navigate = useNavigate();

  return (
    <Screen background="#fff">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
          <OfflineIcon size={26} />
        </div>
        <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 16 }}>We couldn't connect</div>
        <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6, maxWidth: 260 }}>Check your connection and try again.</div>
        <div style={{ marginTop: 20 }}>
          <Button onClick={() => navigate(-1)}>Try again</Button>
        </div>
        <div style={{ font: '400 11px/1 var(--font-sans)', color: 'var(--text-faint)', marginTop: 16 }}>Your alerts keep running on our side while you're offline.</div>
      </div>
    </Screen>
  );
}
