import type { ReactNode } from 'react';
import { CloseIcon } from './icons';

export function BottomSheet({
  onClose,
  title,
  children,
  footer,
}: {
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <>
      <div className="fw-sheet-overlay" onClick={onClose} />
      <div className="fw-sheet" role="dialog" aria-modal="true">
        <div style={{ padding: '8px 16px 0', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--gray-300)', margin: '0 auto' }} />
          {title && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
              <span style={{ font: '600 17px/1 var(--font-sans)', color: 'var(--navy-900)' }}>{title}</span>
              <button className="fw-reset-btn" onClick={onClose} aria-label="Close" style={{ color: 'var(--gray-500)' }}>
                <CloseIcon size={18} />
              </button>
            </div>
          )}
        </div>
        <div className="fw-scroll" style={{ padding: '12px 16px 16px' }}>
          {children}
        </div>
        {footer && (
          <div
            style={{
              padding: '12px 16px 16px',
              borderTop: '1px solid var(--border-default)',
              background: '#fff',
              flexShrink: 0,
              boxShadow: '0 -4px 12px rgba(10,37,64,.04)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
}
