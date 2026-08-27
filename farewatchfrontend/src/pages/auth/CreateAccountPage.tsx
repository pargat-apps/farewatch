import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';
import { Input } from '../../components/ui/Input';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { useAppState } from '../../state/AppState';

export default function CreateAccountPage() {
  const navigate = useNavigate();
  const { signIn } = useAppState();
  const [agree, setAgree] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <Screen background="#fff">
      <div className="fw-scroll" style={{ padding: '0 24px' }}>
        <div style={{ textAlign: 'center', paddingTop: 44 }}>
          <span style={{ font: '800 24px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
            Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
          </span>
        </div>
        <div style={{ font: '800 22px/1.2 var(--font-sans)', letterSpacing: '-0.01em', color: 'var(--navy-900)', marginTop: 30 }}>Create account</div>
        <div style={{ font: '400 14px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 6 }}>Free — track any route and set your budget.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginTop: 22 }}>
          <Input label="Full name" placeholder="Pargat Singh" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" placeholder="you@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            label="Password"
            placeholder="8+ characters"
            type="password"
            hint="Use 8 or more characters with a mix of letters and numbers."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input label="Confirm password" placeholder="••••••••" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </div>
        <div style={{ marginTop: 16 }}>
          <Checkbox label="I agree to the Terms of Service and Privacy Policy" checked={agree} onChange={setAgree} />
        </div>
        <div style={{ marginTop: 18 }}>
          <Button
            size="lg"
            fullWidth
            disabled={!agree}
            onClick={() => {
              signIn();
              navigate('/dashboard');
            }}
          >
            Create account
          </Button>
        </div>
        <div style={{ textAlign: 'center', font: '400 14px/1 var(--font-sans)', color: 'var(--text-muted)', margin: '22px 0' }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/auth/sign-in')} style={{ fontWeight: 600, color: 'var(--action)', cursor: 'pointer' }}>
            Sign in
          </span>
        </div>
      </div>
    </Screen>
  );
}
