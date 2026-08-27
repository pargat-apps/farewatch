import type { CSSProperties, ReactNode } from 'react';
import { CloseIcon } from '../icons';

export type ToastTone = 'info' | 'success' | 'warning' | 'error';

const bars: Record<ToastTone, string> = {
  info: 'var(--blue-600)',
  success: 'var(--green-600)',
  warning: 'var(--amber-500)',
  error: 'var(--red-500)',
};

export interface ToastProps {
  tone?: ToastTone;
  title: ReactNode;
  message?: ReactNode;
  action?: ReactNode;
  onAction?: () => void;
  onDismiss?: () => void;
  style?: CSSProperties;
}

export function Toast({ tone = 'info', title, message, action, onAction, onDismiss, style }: ToastProps) {
  return (
    <div
      role="status"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        width: '100%',
        maxWidth: 380,
        background: '#fff',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-lg)',
        padding: '14px 16px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: bars[tone], flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: '600 14px/1.3 var(--font-sans)', color: 'var(--text-heading)' }}>{title}</div>
        {message && <div style={{ font: '400 13px/1.45 var(--font-sans)', color: 'var(--text-muted)', marginTop: 4 }}>{message}</div>}
        {action && (
          <button
            onClick={onAction}
            className="fw-reset-btn"
            style={{ font: '600 13px/1 var(--font-sans)', color: 'var(--action)', marginTop: 8 }}
          >
            {action}
          </button>
        )}
      </div>
      <button onClick={onDismiss} aria-label="Dismiss" className="fw-reset-btn" style={{ color: 'var(--gray-400)' }}>
        <CloseIcon size={16} />
      </button>
    </div>
  );
}
