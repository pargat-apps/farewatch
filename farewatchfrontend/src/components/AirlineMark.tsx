export function AirlineMark({ code, color, size = 24 }: { code: string; color: string; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size > 24 ? 7 : 6,
        background: color,
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: `700 ${size > 24 ? 11 : 10}px/1 var(--font-mono)`,
        flexShrink: 0,
      }}
    >
      {code}
    </span>
  );
}

export function ProviderMark({ letter, size = 26, muted = false }: { letter: string; size?: number; muted?: boolean }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: 7,
        background: '#fff',
        border: `1px solid ${muted ? 'var(--border-default)' : 'var(--border-strong)'}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: '700 11px/1 var(--font-mono)',
        color: muted ? 'var(--gray-400)' : 'var(--navy-900)',
        flexShrink: 0,
      }}
    >
      {letter}
    </span>
  );
}
