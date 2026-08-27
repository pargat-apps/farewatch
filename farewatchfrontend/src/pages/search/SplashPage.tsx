import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Screen } from '../../components/Screen';

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/home'), 1400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <Screen background="#fff">
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/home')}
      >
        <span style={{ font: '800 32px/1 var(--font-sans)', letterSpacing: '-0.02em', color: 'var(--navy-900)' }}>
          Fare<span style={{ color: 'var(--blue-600)' }}>Watch</span>
        </span>
        <div style={{ font: '400 15px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 12 }}>
          Track fares. Catch the right price.
        </div>
        <div style={{ width: 120, height: 3, borderRadius: 2, background: 'var(--gray-100)', overflow: 'hidden', marginTop: 40 }}>
          <div
            style={{
              width: 36,
              height: '100%',
              borderRadius: 2,
              background: 'var(--blue-600)',
              animation: 'fwProg 1.4s var(--ease-inout) infinite',
            }}
          />
        </div>
        <div style={{ position: 'absolute', bottom: 28, font: '400 11px/1 var(--font-mono)', color: 'var(--text-faint)' }}>
          farewatch.app
        </div>
      </div>
    </Screen>
  );
}
