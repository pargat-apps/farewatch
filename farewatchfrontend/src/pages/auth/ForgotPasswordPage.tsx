import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { BackButton } from '../../components/Screen';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('pargat@gmail.com');
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <Screen background="#fff">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--green-700)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </div>
          <div style={{ font: '700 19px/1.3 var(--font-sans)', color: 'var(--navy-900)', marginTop: 18 }}>Check your email</div>
          <div style={{ font: '400 14px/1.55 var(--font-sans)', color: 'var(--text-muted)', marginTop: 8, maxWidth: 280 }}>
            We sent a reset link to <b style={{ color: 'var(--text-heading)' }}>{email}</b>. The link expires in 30 minutes.
          </div>
          <div onClick={() => setSent(false)} style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--action)', marginTop: 22, cursor: 'pointer' }}>
            Resend email
          </div>
          <div onClick={() => navigate('/auth/sign-in')} style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 16, cursor: 'pointer' }}>
            Back to sign in
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen background="#fff">
      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: 52, margin: '8px -12px 0' }}>
          <BackButton onClick={() => navigate(-1)} />
        </div>
        <div style={{ font: '800 22px/1.2 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)', marginTop: 16 }}>Reset your password</div>
        <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 8 }}>Enter your account email and we'll send you a reset link.</div>
        <div style={{ marginTop: 22 }}>
          <Input label="Email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button size="lg" fullWidth onClick={() => setSent(true)}>
            Send reset link
          </Button>
        </div>
      </div>
    </Screen>
  );
}
