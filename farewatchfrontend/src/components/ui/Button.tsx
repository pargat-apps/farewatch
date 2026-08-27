import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: ReactNode;
  fullWidth?: boolean;
  style?: CSSProperties;
  children?: ReactNode;
}

const looks: Record<ButtonVariant, CSSProperties> = {
  primary: { background: 'var(--action)', color: '#fff', border: '1px solid transparent' },
  secondary: { background: '#fff', color: 'var(--text-heading)', border: '1px solid var(--border-strong)' },
  ghost: { background: 'transparent', color: 'var(--action)', border: '1px solid transparent' },
  danger: { background: 'var(--red-500)', color: '#fff', border: '1px solid transparent' },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  fullWidth = false,
  style,
  children,
  ...rest
}: ButtonProps) {
  const pad = size === 'sm' ? '8px 14px' : size === 'lg' ? '14px 24px' : '11px 18px';
  const fs = size === 'sm' ? 13 : size === 'lg' ? 15 : 14;

  return (
    <button
      disabled={disabled || loading}
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: pad,
        borderRadius: 'var(--r-md)',
        font: `600 ${fs}px/1 var(--font-sans)`,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'all var(--dur-fast) var(--ease-out)',
        width: fullWidth ? '100%' : undefined,
        ...looks[variant],
        ...(disabled ? { background: 'var(--gray-100)', color: 'var(--gray-400)', border: '1px solid transparent' } : {}),
        ...(loading ? { opacity: 0.7 } : {}),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (disabled || loading) return;
        e.currentTarget.style.filter = 'brightness(.94)';
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--blue-50)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.filter = '';
        if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
      }}
    >
      {loading && (
        <span
          style={{
            width: 14,
            height: 14,
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'fwSpin .7s linear infinite',
          }}
        />
      )}
      {icon}
      {children}
    </button>
  );
}
