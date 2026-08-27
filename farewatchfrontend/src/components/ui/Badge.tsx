import type { CSSProperties, ReactNode } from 'react';

export type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'target' | 'accent';

const tones: Record<BadgeTone, [string, string]> = {
  neutral: ['var(--gray-100)', 'var(--gray-600)'],
  info: ['var(--blue-50)', 'var(--blue-700)'],
  success: ['var(--green-50)', 'var(--green-700)'],
  warning: ['var(--amber-50)', 'var(--amber-600)'],
  error: ['var(--red-50)', 'var(--red-600)'],
  target: ['var(--purple-50)', 'var(--purple-700)'],
  accent: ['var(--teal-50)', 'var(--teal-600)'],
};

export interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  style?: CSSProperties;
  icon?: ReactNode;
}

export function Badge({ tone = 'neutral', children, style, icon }: BadgeProps) {
  const [bg, fg] = tones[tone];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        background: bg,
        color: fg,
        font: '600 12px/1 var(--font-sans)',
        padding: '5px 10px',
        borderRadius: 'var(--r-pill)',
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}
