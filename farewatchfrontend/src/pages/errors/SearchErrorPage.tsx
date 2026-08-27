import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { WarningIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';

export default function SearchErrorPage() {
  const navigate = useNavigate();
  const { searchForm } = useAppState();

  return (
    <Screen>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <BackButton onClick={() => navigate('/home')} />
        <div>
          <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>
            {searchForm.fromCode} → {searchForm.toCode}
          </div>
          <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
            {searchForm.departDate} – {searchForm.returnDate} · {searchForm.travelers} travelers
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--red-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red-500)' }}>
          <WarningIcon size={26} />
        </div>
        <div style={{ font: '600 16px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 16 }}>We couldn't load flights</div>
        <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6, maxWidth: 270 }}>Something went wrong while checking fares.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20, width: 220 }}>
          <Button fullWidth onClick={() => navigate('/search/loading')}>
            Try again
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/home')}>
            Modify search
          </Button>
        </div>
      </div>
    </Screen>
  );
}
