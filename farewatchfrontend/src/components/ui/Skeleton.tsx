import type { CSSProperties } from 'react';

export function Skeleton({ style }: { style?: CSSProperties }) {
  return <span className="fw-shimmer" style={{ display: 'block', borderRadius: 6, ...style }} />;
}
