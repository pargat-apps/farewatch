import type { CSSProperties } from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
  className?: string;
}

const base = (
  { size = 20, color = 'currentColor', strokeWidth = 1.75, style, className }: IconProps,
  children: React.ReactNode,
  fill: string = 'none',
) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const BackIcon = (p: IconProps = {}) => base(p, <path d="m15 18-6-6 6-6" />);

export const CloseIcon = (p: IconProps = {}) => base(p, <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>);

export const SearchIcon = (p: IconProps = {}) => base(p, <><circle cx="11" cy="11" r="7" /><path d="m20.5 20.5-4.4-4.4" /></>);

export const SwapIcon = (p: IconProps = {}) => base(p, <><path d="m16 3 4 4-4 4" /><path d="M20 7H4" /><path d="m8 21-4-4 4-4" /><path d="M4 17h16" /></>);

export const CalendarIcon = (p: IconProps = {}) => base(p, <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></>);

export const TravelersIcon = (p: IconProps = {}) => base(p, <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>);

export const BaggageIcon = (p: IconProps = {}) => base(p, <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>);

export const BellIcon = (p: IconProps = {}) => base(p, <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></>);

export const TargetIcon = (p: IconProps = {}) => base(p, <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /></>);

export const FilterIcon = (p: IconProps = {}) => base(p, <><line x1="21" y1="5" x2="14" y2="5" /><line x1="10" y1="5" x2="3" y2="5" /><line x1="21" y1="12" x2="12" y2="12" /><line x1="8" y1="12" x2="3" y2="12" /><line x1="21" y1="19" x2="16" y2="19" /><line x1="12" y1="19" x2="3" y2="19" /><line x1="14" y1="3" x2="14" y2="7" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="16" y1="17" x2="16" y2="21" /></>);

export const SortIcon = (p: IconProps = {}) => base(p, <><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="m21 16-4 4-4-4" /><path d="M17 20V4" /></>);

export const TrendDownIcon = (p: IconProps = {}) => base(p, <><path d="m22 17-8.5-8.5-5 5L2 7" /><path d="M16 17h6v-6" /></>);

export const TrendUpIcon = (p: IconProps = {}) => base(p, <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>);

export const ClockIcon = (p: IconProps = {}) => base(p, <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>);

export const CheckIcon = (p: IconProps = {}) => base(p, <path d="M20 6 9 17l-5-5" />);

export const ChevronRightIcon = (p: IconProps = {}) => base(p, <path d="m9 18 6-6-6-6" />);

export const ChevronDownIcon = (p: IconProps = {}) => base(p, <path d="m6 9 6 6 6-6" />);

export const SettingsIcon = (p: IconProps = {}) => base(p, <><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></>);

export const ProfileIcon = (p: IconProps = {}) => base(p, <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>);

export const LogoutIcon = (p: IconProps = {}) => base(p, <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></>);

export const HelpIcon = (p: IconProps = {}) => base(p, <><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>);

export const WarningIcon = (p: IconProps = {}) => base(p, <><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>);

export const ErrorIcon = (p: IconProps = {}) => base(p, <><circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" /></>);

export const OfflineIcon = (p: IconProps = {}) => base(p, <><path d="M12 20h.01" /><path d="M8.5 16.4a5 5 0 0 1 7 0" /><path d="M5 12.9a10 10 0 0 1 5.2-2.7" /><path d="M19 12.9a10 10 0 0 0-2.5-1.8" /><path d="M2 8.8a15 15 0 0 1 4.2-2.6" /><path d="M22 8.8a15 15 0 0 0-11.2-3.6" /><path d="m2 2 20 20" /></>);

export const SearchOffIcon = (p: IconProps = {}) => base(p, <><circle cx="11" cy="11" r="7" /><path d="m20.5 20.5-4.4-4.4" /><path d="m8.5 8.5 5 5" /><path d="m13.5 8.5-5 5" /></>);

export const InfoIcon = (p: IconProps = {}) => base(p, <><circle cx="12" cy="12" r="10" /><path d="M12 16v-5" /><path d="M12 8h.01" /></>);

export const PlaneIcon = (p: IconProps = {}) => base(p, <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />);

export const HeartIcon = (p: IconProps = {}) => base(p, <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />, p.color ? undefined : undefined);

export const HeartFilledIcon = (p: IconProps = {}) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill={p.color ?? 'var(--red-500)'} stroke={p.color ?? 'var(--red-500)'} strokeWidth={1.75} strokeLinejoin="round" aria-hidden="true" style={p.style}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
  </svg>
);

export const MoreIcon = (p: IconProps = {}) => (
  <svg width={p.size ?? 17} height={p.size ?? 17} viewBox="0 0 24 24" fill={p.color ?? 'currentColor'} aria-hidden="true" style={p.style}>
    <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
  </svg>
);

export const EditIcon = (p: IconProps = {}) => base(p, <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />);

export const PauseIcon = (p: IconProps = {}) => (
  <svg width={p.size ?? 15} height={p.size ?? 15} viewBox="0 0 24 24" fill={p.color ?? 'currentColor'} aria-hidden="true" style={p.style}>
    <rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" />
  </svg>
);

export const TrashIcon = (p: IconProps = {}) => base(p, <><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>);

export const MailIcon = (p: IconProps = {}) => base(p, <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>);

export const ChevronLeftDoorIcon = BackIcon;
