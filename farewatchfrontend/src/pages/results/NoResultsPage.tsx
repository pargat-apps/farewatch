import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { SearchOffIcon } from '../../components/icons';
import { useAppState } from '../../state/AppState';

export default function NoResultsPage() {
  const navigate = useNavigate();
  const { searchForm } = useAppState();

  return (
    <Screen>
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px' }}>
          <BackButton onClick={() => navigate('/results')} />
          <div style={{ flex: 1 }}>
            <div style={{ font: '700 15px/1 var(--font-mono)', color: 'var(--navy-900)' }}>
              {searchForm.fromCode} → {searchForm.toCode}
            </div>
            <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>
              {searchForm.departDate} – {searchForm.returnDate} · Direct only · Under CA$700
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={() => navigate('/home')}>
            Modify
          </Button>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-400)' }}>
          <SearchOffIcon size={28} />
        </div>
        <div style={{ font: '600 18px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 18 }}>No matching flights</div>
        <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 8, maxWidth: 280 }}>
          Try changing your dates, filters, or nearby airports.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24, width: 240 }}>
          <Button fullWidth onClick={() => navigate('/results')}>
            Change filters
          </Button>
          <Button variant="secondary" fullWidth onClick={() => navigate('/home')}>
            Modify search
          </Button>
        </div>
      </div>
    </Screen>
  );
}
