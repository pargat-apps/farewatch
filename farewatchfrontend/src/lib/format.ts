export function money(n: number): string {
  return `CA$${n.toLocaleString('en-CA')}`;
}

export function signedMoney(n: number): string {
  const sign = n > 0 ? '+' : n < 0 ? '−' : '';
  return `${sign}CA$${Math.abs(n).toLocaleString('en-CA')}`;
}
