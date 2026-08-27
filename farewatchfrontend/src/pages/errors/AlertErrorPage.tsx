import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { ErrorIcon } from '../../components/icons';

export default function AlertErrorPage() {
  const navigate = useNavigate();

  return (
    <Screen background="var(--gray-50)">
      <div className="fw-sheet-overlay" onClick={() => navigate(-1)} />
      <div className="fw-sheet" style={{ padding: '8px 16px 16px' }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--gray-300)', margin: '0 auto' }} />
        <div style={{ display: 'flex', gap: 12, background: 'var(--red-50)', border: '1px solid var(--red-100)', borderRadius: 'var(--r-md)', padding: '12px 14px', marginTop: 16 }}>
          <ErrorIcon size={18} color="var(--red-600)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--red-600)' }}>Alert wasn't created</div>
            <div style={{ font: '400 13px/1.5 var(--font-sans)', color: 'var(--text-body)', marginTop: 4 }}>Your settings weren't saved. Please try again.</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--gray-50)', border: '1px solid var(--border-default)', borderRadius: 'var(--r-md)', padding: '10px 12px', marginTop: 14 }}>
          <span style={{ font: '400 13px/1 var(--font-sans)', color: 'var(--text-muted)' }}>
            Track <span style={{ font: '700 12px/1 var(--font-mono)', color: 'var(--navy-900)' }}>YYZ → DEL</span> · budget
          </span>
          <span style={{ font: '800 16px/1 var(--font-sans)', color: 'var(--target)' }}>CA$900</span>
        </div>
        <div style={{ marginTop: 16 }}>
          <Button size="lg" fullWidth onClick={() => navigate('/track/ac42')}>
            Try again
          </Button>
        </div>
        <div onClick={() => navigate(-1)} style={{ textAlign: 'center', font: '600 14px/1 var(--font-sans)', color: 'var(--action)', marginTop: 14, paddingBottom: 4, cursor: 'pointer' }}>
          Cancel
        </div>
      </div>
    </Screen>
  );
}
