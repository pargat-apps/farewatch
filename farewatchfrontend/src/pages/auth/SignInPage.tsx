import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useAppState } from '../../state/AppState';

const CHECKLIST = ['Track unlimited routes', 'Compare every supported provider', 'Email alerts the moment a fare drops'];

function CheckItem({ children }: { children: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11, font: '500 13.5px/1 var(--font-sans)', color: 'rgba(255,255,255,.86)' }}>
      <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,.12)', color: 'var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
          <path d="m5 13 4 4 10-11" />
        </svg>
      </span>
      {children}
    </div>
  );
}

function FormBody({ email, setEmail, password, setPassword, submit, navigate }: {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  submit: () => void;
  navigate: (to: string) => void;
}) {
  return (
    <>
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
    </>
  );
}

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
    <Screen background="#fff" wide>
      <div className="fw-mobile-only">
        <div className="fw-scroll" style={{ padding: '0 24px' }}>
          <div style={{ textAlign: 'center', paddingTop: 56 }}>
            <span style={{ font: '800 24px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
              Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
            </span>
          </div>
          <div style={{ font: '800 22px/1.2 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)', marginTop: 36 }}>Sign in</div>
          <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>Your alerts and tracked routes, in one place.</div>
          <FormBody email={email} setEmail={setEmail} password={password} setPassword={setPassword} submit={submit} navigate={navigate} />
          <div style={{ textAlign: 'center', font: '400 14px/1 var(--font-sans)', color: 'var(--text-muted)', margin: '28px 0' }}>
            New to FareWatch?{' '}
            <span onClick={() => navigate('/auth/create-account')} style={{ fontWeight: 600, color: 'var(--action)', cursor: 'pointer' }}>
              Create account
            </span>
          </div>
        </div>
      </div>

      {/* ---- Desktop: split screen (per FareWatch Desktop UI D11) ---- */}
      <div className="fw-desktop-only">
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          <div
            style={{
              width: 480,
              flexShrink: 0,
              background: 'linear-gradient(180deg,var(--navy-900),var(--navy-800))',
              padding: '48px 48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ font: '800 22px/1 var(--font-sans)', letterSpacing: '-0.02em', color: '#fff' }}>
              Fare<span style={{ color: 'var(--blue-500)' }}>Watch</span>
            </span>
            <div>
              <div style={{ font: '800 32px/1.2 var(--font-sans)', letterSpacing: '-0.025em', color: '#fff' }}>Never overpay for a flight again.</div>
              <div style={{ font: '400 15px/1.6 var(--font-sans)', color: 'rgba(255,255,255,.72)', marginTop: 14, maxWidth: 380 }}>
                Sign in to keep your tracked fares, targets and alert history in one place.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 28 }}>
                {CHECKLIST.map((c) => (
                  <CheckItem key={c}>{c}</CheckItem>
                ))}
              </div>
            </div>
            <div style={{ font: '400 12px/1.6 var(--font-sans)', color: 'rgba(255,255,255,.5)', maxWidth: 380 }}>
              FareWatch compares prices and hands you off to the provider to book. We never charge you for a ticket.
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
            <div style={{ width: 400 }}>
              <div style={{ font: '800 28px/1.2 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>Sign in</div>
              <div style={{ font: '400 13.5px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 10 }}>
                New here?{' '}
                <span onClick={() => navigate('/auth/create-account')} style={{ fontWeight: 600, color: 'var(--action)', cursor: 'pointer' }}>
                  Create an account
                </span>
              </div>
              <FormBody email={email} setEmail={setEmail} password={password} setPassword={setPassword} submit={submit} navigate={navigate} />
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
