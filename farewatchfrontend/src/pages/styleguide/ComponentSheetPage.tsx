import { useNavigate } from 'react-router-dom';
import { BackButton } from '../../components/Screen';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Checkbox } from '../../components/ui/Checkbox';
import { Switch } from '../../components/ui/Switch';
import {
  PlaneIcon,
  SearchIcon,
  CalendarIcon,
  SwapIcon,
  TravelersIcon,
  BaggageIcon,
  BellIcon,
  FilterIcon,
  SortIcon,
  TrendDownIcon,
  TrendUpIcon,
  TargetIcon,
  SettingsIcon,
  ProfileIcon,
  HelpIcon,
  LogoutIcon,
  ChevronRightIcon,
  CloseIcon,
  CheckIcon,
  WarningIcon,
  ErrorIcon,
  ClockIcon,
  type IconProps,
} from '../../components/icons';

const ICONS: [string, (p?: IconProps) => React.ReactNode][] = [
  ['plane', PlaneIcon],
  ['search', SearchIcon],
  ['calendar', CalendarIcon],
  ['swap', SwapIcon],
  ['travelers', TravelersIcon],
  ['baggage', BaggageIcon],
  ['bell', BellIcon],
  ['filter', FilterIcon],
  ['sort', SortIcon],
  ['trend down', TrendDownIcon],
  ['trend up', TrendUpIcon],
  ['target', TargetIcon],
  ['settings', SettingsIcon],
  ['profile', ProfileIcon],
  ['help', HelpIcon],
  ['logout', LogoutIcon],
  ['chevron', ChevronRightIcon],
  ['close', CloseIcon],
  ['check', CheckIcon],
  ['warning', WarningIcon],
  ['error', ErrorIcon],
  ['clock', ClockIcon],
];

const FLIGHT_VARIANTS = [
  { label: 'Normal', code: 'QR', color: '#5C0632', airline: 'Qatar Airways', price: '915', sub: 'per traveler', priceColor: 'var(--navy-900)' },
  { label: 'Cheapest', code: 'EK', color: '#8A1538', airline: 'Emirates', price: '842', sub: 'per traveler', priceColor: 'var(--navy-900)', badge: 'Cheapest', badgeBg: 'var(--green-50)', badgeFg: 'var(--green-700)' },
  { label: 'Best value', code: 'AC', color: '#D22630', airline: 'Air Canada', price: '898', sub: 'per traveler', priceColor: 'var(--navy-900)', badge: 'Best value', badgeBg: 'var(--blue-50)', badgeFg: 'var(--blue-700)' },
  { label: 'Price drop', code: 'AC', color: '#D22630', airline: 'Air Canada', price: '898', sub: 'was CA$1,020 · ↓ CA$122', priceColor: 'var(--green-700)', badge: '↓ Price drop', badgeBg: 'var(--green-100)', badgeFg: 'var(--green-700)' },
  { label: 'Unavailable', code: 'LH', color: '#9CA3AF', airline: 'Lufthansa', price: '1,020', sub: 'sold out at this fare', priceColor: 'var(--gray-400)', badge: 'Unavailable', badgeBg: 'var(--gray-100)', badgeFg: 'var(--gray-600)', dim: true },
];

const ALERT_VARIANTS = [
  { status: 'Active', price: 'CA$940', priceColor: 'var(--navy-900)', pillBg: 'var(--green-50)', pillFg: 'var(--green-700)', msg: 'Checked 5 min ago · ↓ CA$180 since created.' },
  { status: 'Target reached', price: 'CA$875', priceColor: 'var(--green-700)', pillBg: 'var(--green-100)', pillFg: 'var(--green-700)', msg: 'CA$25 under your target. Fares may not last.', border: '1.5px solid var(--green-500)' },
  { status: 'Paused', price: 'CA$1,040', priceColor: 'var(--gray-500)', pillBg: 'var(--gray-100)', pillFg: 'var(--gray-600)', msg: 'Not currently checking this route.' },
  { status: 'Expired', price: 'CA$1,120', priceColor: 'var(--gray-500)', pillBg: 'var(--amber-50)', pillFg: 'var(--amber-600)', msg: 'Departure date passed — tracking ended.' },
];

export default function ComponentSheetPage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 900, margin: '24px auto', background: '#fff', border: '1px solid var(--border-default)', borderRadius: 18, boxShadow: 'var(--shadow-md)', padding: 28, display: 'flex', flexDirection: 'column', gap: 26, boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <BackButton onClick={() => navigate('/styleguide')} />
        <span style={{ font: '700 16px/1 var(--font-sans)', color: 'var(--navy-900)' }}>Component sheet</span>
      </div>

      <div>
        <Label>Buttons</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <Button>Search flights</Button>
          <Button variant="secondary">Modify</Button>
          <Button variant="ghost">Sign in</Button>
          <Button variant="danger">Delete alert</Button>
          <Button disabled>Unavailable</Button>
          <Button loading>Searching…</Button>
          <Button size="sm">Track price</Button>
          <Button size="lg">Create price alert</Button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 380 }}>
          <Label>Inputs & search fields</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Email" placeholder="you@example.com" />
            <Input label="Email" defaultValue="pargat@gmail" error="Enter a valid email address." />
            <Input label="Home airport" defaultValue="YYZ · Toronto Pearson" disabled hint="Set in your profile." />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 380 }}>
          <Label>Badges & price badges</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            <Badge>Neutral</Badge>
            <Badge tone="info">Best value</Badge>
            <Badge tone="success">Cheapest</Badge>
            <Badge tone="accent">Fastest</Badge>
            <Badge tone="target">Target CA$900</Badge>
            <Badge tone="warning">Expired</Badge>
            <Badge tone="error">Unavailable</Badge>
          </div>
          <Label style={{ marginTop: 20 }}>Selection controls</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
            <Switch checked label="On" />
            <Switch label="Off" />
            <Checkbox label="Checked" checked />
            <Checkbox label="Unchecked" />
            <Checkbox label="Disabled" disabled />
          </div>
        </div>
      </div>

      <div>
        <Label>Iconography — 1.75px stroke outline set</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {ICONS.map(([name, Icon]) => (
            <span key={name} style={{ width: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 0', border: '1px solid var(--gray-100)', borderRadius: 'var(--r-md)', color: 'var(--gray-600)' }}>
              {Icon()}
              <span style={{ font: '400 9.5px/1 var(--font-sans)', color: 'var(--text-faint)' }}>{name}</span>
            </span>
          ))}
        </div>
      </div>

      <div>
        <Label>Flight card variants</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {FLIGHT_VARIANTS.map((v) => (
            <div key={v.label} style={{ width: 265, background: v.dim ? 'var(--gray-50)' : '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '12px 14px', boxSizing: 'border-box', opacity: v.dim ? 0.75 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: v.color, color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '700 9px/1 var(--font-mono)' }}>{v.code}</span>
                <span style={{ font: '400 11.5px/1 var(--font-sans)', color: 'var(--text-muted)' }}>{v.airline}</span>
                {v.badge && (
                  <span style={{ marginLeft: 'auto', background: v.badgeBg, color: v.badgeFg, font: '600 10.5px/1 var(--font-sans)', padding: '4px 9px', borderRadius: 'var(--r-pill)' }}>{v.badge}</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                <span style={{ font: '800 19px/1 var(--font-sans)', letterSpacing: '-0.01em', color: v.priceColor }}>CA${v.price}</span>
                <span style={{ font: '400 11px/1.3 var(--font-sans)', color: 'var(--text-faint)' }}>{v.sub}</span>
              </div>
              <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 12, borderTop: '1px solid var(--gray-100)', paddingTop: 9 }}>{v.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Alert card variants</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {ALERT_VARIANTS.map((v) => (
            <div key={v.status} style={{ width: 265, background: '#fff', border: v.border ?? '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: '12px 14px', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ font: '700 14px/1 var(--font-mono)', color: 'var(--navy-900)' }}>YYZ → DEL</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, background: v.pillBg, color: v.pillFg, font: '600 10.5px/1 var(--font-sans)', padding: '4px 9px', borderRadius: 'var(--r-pill)' }}>{v.status}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
                <span style={{ font: '800 19px/1 var(--font-sans)', color: v.priceColor }}>{v.price}</span>
                <span style={{ font: '600 11px/1 var(--font-sans)', color: 'var(--target)' }}>Target CA$900</span>
              </div>
              <div style={{ font: '400 11.5px/1.5 var(--font-sans)', color: 'var(--text-muted)', marginTop: 8 }}>{v.msg}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Skeleton loaders</Label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ width: 265, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: 14, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span className="fw-shimmer" style={{ width: 28, height: 28, borderRadius: 8 }} />
              <span className="fw-shimmer" style={{ flex: 1, height: 12, borderRadius: 6 }} />
            </div>
            <span className="fw-shimmer" style={{ display: 'block', height: 8, borderRadius: 4, marginTop: 12 }} />
            <span className="fw-shimmer" style={{ display: 'block', width: '60%', height: 8, borderRadius: 4, marginTop: 8 }} />
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 12 }}>Card / list row</div>
          </div>
          <div style={{ width: 265, background: '#fff', border: '1px solid var(--border-default)', borderRadius: 'var(--r-lg)', padding: 14, boxSizing: 'border-box' }}>
            <span className="fw-shimmer" style={{ display: 'block', height: 70, borderRadius: 8 }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <span className="fw-shimmer" style={{ flex: 1, height: 22, borderRadius: 6 }} />
              <span className="fw-shimmer" style={{ flex: 1, height: 22, borderRadius: 6 }} />
            </div>
            <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-faint)', marginTop: 12 }}>Price history chart</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ font: '600 10px/1 var(--font-sans)', letterSpacing: 'var(--track-wide)', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12, ...style }}>
      {children}
    </div>
  );
}
