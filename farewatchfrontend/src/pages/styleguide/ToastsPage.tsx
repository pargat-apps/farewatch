import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/ui/Toast';
import { BackButton } from '../../components/Screen';

export default function ToastsPage() {
  const navigate = useNavigate();
  return (
    <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', gap: 14, padding: 24, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <BackButton onClick={() => navigate('/styleguide')} />
        <span style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Toasts</span>
      </div>
      <Toast tone="success" title="Price alert created" message="Tracking YYZ → DEL under CA$900." action="View alert" />
      <Toast tone="info" title="Search saved" message="Find it under Saved." />
      <Toast tone="warning" title="Alert paused" message="FareWatch stopped checking this route." action="Resume" />
      <Toast tone="error" title="Something went wrong" message="We couldn't save your change. Try again." action="Retry" />
      <div style={{ font: '400 11px/1.5 var(--font-sans)', color: 'var(--text-faint)' }}>
        Position on mobile: slides down from the top edge, full-width minus 12px gutters — never over the bottom nav or sticky CTAs. Auto-dismiss 5s, swipe-up to dismiss.
      </div>
    </div>
  );
}
