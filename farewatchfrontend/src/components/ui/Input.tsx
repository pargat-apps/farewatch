import type { InputHTMLAttributes, ReactNode, CSSProperties } from 'react';

export interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
}

export function Field({ label, hint, error, children }: FieldProps) {
  return (
    <label style={{ display: 'block' }}>
      {label && (
        <div
          style={{
            font: 'var(--label)',
            letterSpacing: 'var(--track-wide)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: 6,
          }}
        >
          {label}
        </div>
      )}
      {children}
      {error ? (
        <div style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--red-600)', marginTop: 5 }}>{error}</div>
      ) : hint ? (
        <div style={{ font: '400 12px/1.3 var(--font-sans)', color: 'var(--text-faint)', marginTop: 5 }}>{hint}</div>
      ) : null}
    </label>
  );
}

export const inputBase = (error?: ReactNode, disabled?: boolean): CSSProperties => ({
  width: '100%',
  boxSizing: 'border-box',
  font: '400 14px/1.4 var(--font-sans)',
  color: disabled ? 'var(--gray-400)' : 'var(--text-heading)',
  background: disabled ? 'var(--gray-100)' : '#fff',
  border: '1px solid ' + (error ? 'var(--red-500)' : 'var(--border-strong)'),
  borderRadius: 'var(--r-md)',
  padding: '11px 12px',
  outline: 'none',
  transition: 'box-shadow var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
  cursor: disabled ? 'not-allowed' : 'text',
});

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'style' | 'prefix'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  prefix?: ReactNode;
  style?: CSSProperties;
}

export function Input({ label, hint, error, disabled = false, prefix = null, style, ...rest }: InputProps) {
  return (
    <Field label={label} hint={hint} error={error}>
      <div style={{ position: 'relative' }}>
        {prefix && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--gray-400)',
              display: 'flex',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          disabled={disabled}
          {...rest}
          onFocus={(e) => {
            if (!error) {
              e.target.style.borderColor = 'var(--action)';
              e.target.style.boxShadow = 'var(--shadow-focus)';
            }
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? 'var(--red-500)' : 'var(--border-strong)';
            e.target.style.boxShadow = 'none';
          }}
          style={{
            ...inputBase(error, disabled),
            paddingLeft: prefix ? 38 : 12,
            ...style,
          }}
        />
      </div>
    </Field>
  );
}
