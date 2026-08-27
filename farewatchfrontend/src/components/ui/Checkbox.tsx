import type { CSSProperties, ReactNode } from 'react';
import { CheckIcon } from '../icons';

export interface CheckboxProps {
  label: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  count?: ReactNode;
  style?: CSSProperties;
}

export function Checkbox({ label, checked = false, disabled = false, onChange, count, style }: CheckboxProps) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      <span
        onClick={() => !disabled && onChange && onChange(!checked)}
        style={{
          width: 18,
          height: 18,
          flexShrink: 0,
          borderRadius: 5,
          border: '1.5px solid ' + (checked ? 'var(--action)' : 'var(--border-strong)'),
          background: checked ? 'var(--action)' : '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--dur-fast) var(--ease-out)',
        }}
      >
        {checked && <CheckIcon size={11} color="#fff" strokeWidth={3.5} />}
      </span>
      <span style={{ font: '400 14px/1.3 var(--font-sans)', color: 'var(--text-body)', flex: 1 }}>{label}</span>
      {count != null && <span style={{ font: '400 12px/1 var(--font-sans)', color: 'var(--text-faint)' }}>{count}</span>}
    </label>
  );
}
