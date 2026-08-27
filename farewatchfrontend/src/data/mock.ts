export interface Airport {
  code: string;
  name: string;
  city: string;
  dist?: string;
}

export const airportsRecent: Airport[] = [
  { code: 'YYZ', name: 'Toronto Pearson International', city: 'Toronto, Canada' },
  { code: 'DEL', name: 'Indira Gandhi International', city: 'Delhi, India' },
];

export const airportsNearby: Airport[] = [
  { code: 'YTZ', name: 'Billy Bishop Toronto City', city: 'Toronto, Canada', dist: '12 km' },
  { code: 'YHM', name: 'Hamilton International', city: 'Hamilton, Canada', dist: '68 km' },
];

export const airportsPopular: Airport[] = [
  { code: 'YVR', name: 'Vancouver International', city: 'Vancouver, Canada' },
  { code: 'LHR', name: 'London Heathrow', city: 'London, United Kingdom' },
  { code: 'DXB', name: 'Dubai International', city: 'Dubai, UAE' },
  { code: 'JFK', name: 'New York JFK', city: 'New York, USA' },
];

export interface Provider {
  id: string;
  name: string;
  mark: string;
  markColor?: string;
  type: 'Official airline' | 'Travel site';
  price: number;
  diff?: number;
  isBestPrice?: boolean;
  isOfficial?: boolean;
  sponsored?: boolean;
  unavailable?: boolean;
  baggage: string;
  checkedAgo: string;
  fareNote?: string;
  convertedFrom?: string;
}

export const providersYYZDEL: Provider[] = [
  {
    id: 'trip',
    name: 'Trip.com',
    mark: 'T',
    type: 'Travel site',
    price: 879,
    isBestPrice: true,
    baggage: 'Carry-on included · Checked bag extra',
    checkedAgo: '2 min ago',
  },
  {
    id: 'expedia',
    name: 'Expedia',
    mark: 'E',
    type: 'Travel site',
    price: 887,
    diff: 8,
    baggage: 'Carry-on included',
    checkedAgo: '2 min ago',
    fareNote: 'Flexible fare from CA$945',
  },
  {
    id: 'cheapoair',
    name: 'CheapOair',
    mark: 'C',
    type: 'Travel site',
    price: 899,
    diff: 20,
    sponsored: true,
    baggage: 'Carry-on included',
    checkedAgo: '4 min ago',
    convertedFrom: 'US$652',
  },
  {
    id: 'aircanada',
    name: 'Air Canada',
    mark: 'AC',
    markColor: '#D22630',
    type: 'Official airline',
    isOfficial: true,
    price: 918,
    diff: 39,
    baggage: 'Carry-on + checked bag included',
    checkedAgo: '2 min ago',
  },
  {
    id: 'booking',
    name: 'Booking.com',
    mark: 'B',
    type: 'Travel site',
    price: 895,
    unavailable: true,
    baggage: '',
    checkedAgo: '',
  },
];

export interface Itinerary {
  id: string;
  code: string;
  color: string;
  airline: string;
  flightNumber?: string;
  dep: string;
  arr: string;
  plus?: string;
  dur: string;
  stops: string;
  stopsColor: string;
  price: string;
  opts: string;
  badge?: string;
  badgeBg?: string;
  badgeFg?: string;
  hasBadge: boolean;
  hasPreview: boolean;
  mixedAirlines?: boolean;
}

export const flightResults: Itinerary[] = [
  {
    id: 'ek201',
    code: 'EK',
    color: '#8A1538',
    airline: 'Emirates',
    dep: '8:45 PM',
    arr: '9:15 AM',
    plus: '+2',
    dur: '18h 00m',
    stops: '1 stop · DXB',
    stopsColor: 'var(--text-muted)',
    price: '842',
    opts: '4 booking options',
    badge: 'Cheapest',
    badgeBg: 'var(--green-50)',
    badgeFg: 'var(--green-700)',
    hasBadge: true,
    hasPreview: false,
  },
  {
    id: 'ac42',
    code: 'AC',
    color: '#D22630',
    airline: 'Air Canada AC 42',
    dep: '10:20 AM',
    arr: '1:30 PM',
    plus: '+1',
    dur: '15h 40m',
    stops: '1 stop · FRA',
    stopsColor: 'var(--text-muted)',
    price: '879',
    opts: '5 booking options',
    badge: 'Best value',
    badgeBg: 'var(--blue-50)',
    badgeFg: 'var(--blue-700)',
    hasBadge: true,
    hasPreview: true,
  },
  {
    id: 'qr738',
    code: 'QR',
    color: '#5C0632',
    airline: 'Qatar Airways',
    dep: '9:05 PM',
    arr: '8:20 AM',
    plus: '+2',
    dur: '16h 45m',
    stops: '1 stop · DOH',
    stopsColor: 'var(--text-muted)',
    price: '915',
    opts: '3 booking options',
    hasBadge: false,
    hasPreview: false,
  },
  {
    id: 'ai191',
    code: 'AI',
    color: '#C4452B',
    airline: 'Air India',
    dep: '9:40 PM',
    arr: '9:05 PM',
    plus: '+1',
    dur: '13h 55m',
    stops: 'Nonstop',
    stopsColor: 'var(--green-700)',
    price: '976',
    opts: '2 booking options',
    badge: 'Fastest',
    badgeBg: 'var(--teal-50)',
    badgeFg: 'var(--teal-600)',
    hasBadge: true,
    hasPreview: false,
  },
  {
    id: 'lh760',
    code: 'LH',
    color: '#05164D',
    airline: 'Lufthansa',
    dep: '6:05 PM',
    arr: '11:55 PM',
    plus: '+1',
    dur: '17h 20m',
    stops: '1 stop · FRA',
    stopsColor: 'var(--text-muted)',
    price: '1,020',
    opts: '4 booking options',
    hasBadge: false,
    hasPreview: false,
  },
  {
    id: 'tk123',
    code: 'TK',
    color: '#B5232A',
    airline: 'Turkish Airlines',
    dep: '10:55 PM',
    arr: '6:10 AM',
    plus: '+2',
    dur: '18h 45m',
    stops: '1 stop · IST',
    stopsColor: 'var(--text-muted)',
    price: '1,145',
    opts: '2 booking options',
    hasBadge: false,
    hasPreview: false,
  },
];

export interface AlertItem {
  id: string;
  route: string;
  status: 'Active' | 'Paused' | 'Expired';
  dates: string;
  travelers: string;
  currentBest: number;
  startPrice?: number;
  bestProvider: string;
  officialPrice: number;
  target: number;
  checkedAgo: string;
  createdOn?: string;
}

export const alerts: AlertItem[] = [
  {
    id: 'yyzdel',
    route: 'YYZ → DEL',
    status: 'Active',
    dates: 'Oct 15 – Nov 10 · 2 travelers · Economy',
    travelers: '2 travelers',
    currentBest: 940,
    startPrice: 1120,
    bestProvider: 'Expedia',
    officialPrice: 975,
    target: 900,
    checkedAgo: '5 min ago',
    createdOn: 'Jul 27',
  },
  {
    id: 'yyzlhr',
    route: 'YYZ → LHR',
    status: 'Active',
    dates: 'Dec 18 – Jan 4 · 1 traveler · Economy',
    travelers: '1 traveler',
    currentBest: 684,
    bestProvider: 'Booking.com',
    officialPrice: 710,
    target: 600,
    checkedAgo: '12 min ago',
  },
  {
    id: 'yyzsin',
    route: 'YYZ → SIN',
    status: 'Paused',
    dates: 'Feb 3 – Feb 24 · 2 travelers · Premium economy',
    travelers: '2 travelers',
    currentBest: 1610,
    bestProvider: '',
    officialPrice: 0,
    target: 1400,
    checkedAgo: 'Aug 12',
  },
  {
    id: 'yyzcdg',
    route: 'YYZ → CDG',
    status: 'Expired',
    dates: 'Jun 12 – Jun 30 · 1 traveler · Economy',
    travelers: '1 traveler',
    currentBest: 0,
    bestProvider: '',
    officialPrice: 0,
    target: 0,
    checkedAgo: '',
  },
];

export interface NotificationItem {
  id: string;
  kind: 'target' | 'price-drop' | 'warning' | 'support' | 'success';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  group: 'Today' | 'Earlier';
}

export const notifications: NotificationItem[] = [
  {
    id: 'n1',
    kind: 'target',
    title: 'New lowest price',
    message: 'Toronto → Delhi is now CA$875 on Expedia. Your target is CA$900.',
    time: '2 min ago',
    unread: true,
    group: 'Today',
  },
  {
    id: 'n2',
    kind: 'price-drop',
    title: 'Airline direct price drop',
    message: "Air Canada's fare dropped from CA$980 to CA$920 · YYZ → DEL",
    time: '1 hour ago',
    unread: true,
    group: 'Today',
  },
  {
    id: 'n3',
    kind: 'warning',
    title: 'Provider changed',
    message: 'Your previous cheapest provider is no longer available. Another option is available for CA$910.',
    time: 'Yesterday',
    unread: false,
    group: 'Earlier',
  },
  {
    id: 'n4',
    kind: 'support',
    title: 'FareWatch support',
    message: 'Your question about baggage rules was answered.',
    time: 'Aug 23',
    unread: false,
    group: 'Earlier',
  },
  {
    id: 'n5',
    kind: 'success',
    title: 'Better deal found',
    message: 'A lower price is available for your tracked flight: CA$940 → CA$895 · YYZ → DEL',
    time: 'Aug 21',
    unread: false,
    group: 'Earlier',
  },
];

export interface SavedSearch {
  id: string;
  route: string;
  routeLabel: string;
  dates: string;
  tracking: boolean;
  currentBest?: number;
  provider?: string;
  officialPrice?: number;
  saving?: number;
  lastSearched?: string;
}

export const savedSearches: SavedSearch[] = [
  {
    id: 'yyzdel',
    route: 'YYZ → DEL',
    routeLabel: 'Toronto → Delhi',
    dates: 'Oct 15 – Nov 10 · 2 travelers · Economy',
    tracking: true,
    currentBest: 879,
    provider: 'Trip.com',
    officialPrice: 918,
    saving: 39,
  },
  {
    id: 'yyzyvr',
    route: 'YYZ → YVR',
    routeLabel: 'Toronto → Vancouver',
    dates: 'Dec 19 – Dec 26 · 1 traveler · Economy',
    tracking: false,
    currentBest: 248,
    lastSearched: 'yesterday',
  },
  {
    id: 'yyzlhr',
    route: 'YYZ → LHR',
    routeLabel: 'Toronto → London',
    dates: 'Dec 18 – Jan 4 · 1 traveler · Economy',
    tracking: false,
    currentBest: 612,
    lastSearched: '3 days ago',
  },
];

export const currentUser = {
  name: 'Pargat Singh',
  email: 'pargat@gmail.com',
  avatar: '/avatars/male2.png',
  homeAirport: 'YYZ · Toronto',
  currency: 'CAD — Canadian dollar',
  cabin: 'Economy',
  airlines: 'Air Canada +2',
  timezone: 'Eastern (GMT−4)',
};

export const searchSummary = {
  route: 'YYZ → DEL',
  dates: 'Oct 15 – Nov 10',
  travelers: '2 travelers',
  cabin: 'Economy',
};
