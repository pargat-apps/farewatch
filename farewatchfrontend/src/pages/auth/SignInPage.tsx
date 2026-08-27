import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppState } from '../../state/AppState';

export default function SignInPage() {
  const navigate = useNavigate();
  const { signIn } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    signIn();
    navigate('/dashboard');
  };

  return (
    <Screen background="#fff">
      <div className="fw-scroll" style={{ padding: '0 24px' }}>
        <div style={{ textAlign: 'center', paddingTop: 56 }}>
          <span style={{ font: '800 24px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
          </span>
        </div>
        <div style={{ font: '800 22px/1.2 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)', marginTop: 36 }}>Sign in</div>
        <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>Your alerts and tracked routes, in one place.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
          <Input label="Email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input label="Password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div onClick={() => navigate('/auth/forgot-password')} style={{ textAlign: 'right', font: '600 13px/1 var(--font-sans)', color: 'var(--action)', marginTop: 12, cursor: 'pointer' }}>
          Forgot password?
        </div>
        <div style={{ marginTop: 20 }}>
          <Button size="lg" fullWidth onClick={submit}>
            Sign in
          </Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
          <span style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
          <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-faint)' }}>or</span>
          <span style={{ flex: 1, height: 1, background: 'var(--gray-200)' }} />
        </div>
        <button
          className="fw-reset-btn"
          onClick={submit}
          style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', gap: 10, height: 47, border: '1px solid var(--border-strong)', borderRadius: 'var(--r-md)', marginTop: 20 }}
        >
          <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--gray-100)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 11px/1 var(--font-sans)', color: 'var(--gray-600)' }}>
            G
          </span>
          <span style={{ font: '600 14px/1 var(--font-sans)', color: 'var(--text-heading)' }}>Continue with Google</span>
        </button>
        <div style={{ textAlign: 'center', font: '400 14px/1 var(--font-sans)', color: 'var(--text-muted)', margin: '28px 0' }}>
          New to FareWatch?{' '}
          <span onClick={() => navigate('/auth/create-account')} style={{ fontWeight: 600, color: 'var(--action)', cursor: 'pointer' }}>
            Create account
          </span>
        </div>
      </div>
    </Screen>
  );
}
