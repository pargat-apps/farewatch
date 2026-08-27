import type { CSSProperties, ReactNode } from 'react';

export interface SwitchProps {
  label?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  style?: CSSProperties;
}

export function Switch({ label, checked = false, disabled = false, onChange, style }: SwitchProps) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      onClick={() => !disabled && onChange && onChange(!checked)}
    >
      <span
        style={{
          width: 38,
          height: 22,
          borderRadius: 11,
          background: checked ? 'var(--action)' : 'var(--gray-300)',
          position: 'relative',
          transition: 'background var(--dur-base) var(--ease-out)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 18 : 2,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fff',
            boxShadow: 'var(--shadow-xs)',
            transition: 'left var(--dur-base) var(--ease-out)',
          }}
        />
      </span>
      {label && <span style={{ font: '400 14px/1.3 var(--font-sans)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
