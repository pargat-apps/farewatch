import type { CSSProperties, ReactNode } from 'react';

export function Screen({ children, background, style }: { children: ReactNode; background?: string; style?: CSSProperties }) {
  return (
    <div className="fw-screen" style={{ background: background ?? 'var(--surface-page)', ...style }}>
      {children}
    </div>
  );
}

export function ScreenHeader({
  onBack,
  title,
  subtitle,
  right,
  mono = false,
}: {
  onBack?: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
  mono?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 12px',
        background: '#fff',
        borderBottom: '1px solid var(--border-default)',
        flexShrink: 0,
      }}
    >
      {onBack && <BackButton onClick={onBack} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: mono ? '700 15px/1 var(--font-mono)' : '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{title}</div>
        {subtitle && <div style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

import { BackIcon } from './icons';

export function BackButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className="fw-reset-btn"
      onClick={onClick}
      aria-label="Back"
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--gray-600)',
        flexShrink: 0,
      }}
    >
      <BackIcon size={20} />
    </button>
  );
}
