# Domain Model

Status: target · Built in Phase 2 as `farewatchfrontend/src/services/types.ts`

These types are the vocabulary the whole app shares. They are also the future API
contract — every one of them must be JSON-serialisable, because one day they will
arrive over the wire.

## Rules

- **Money is an integer of minor units** (cents), plus a currency code. Never a
  float, never a pre-formatted string. `{ amount: 87900, currency: 'CAD' }` is
  CA$879.00. Formatting happens once, in `lib/format.ts`, at render time.
- **Dates are ISO 8601 strings.** `'2026-10-15'` for a date, full ISO with offset
  for an instant. Never a `Date` object in a domain type — it doesn't survive JSON.
- **Durations are integer minutes.**
- **IDs are branded strings**, so an `AlertId` can't be passed where an
  `ItineraryId` is wanted.
- **No presentation in the model.** No `stopsColor`, no `badgeBg`, no `'1,020'`.
  The existing `data/mock.ts` breaks all three of those — do not carry its shapes
  forward.

## Primitives

```ts
type Brand<T, B> = T & { readonly __brand: B }

type ItineraryId = Brand<string, 'ItineraryId'>
type AlertId     = Brand<string, 'AlertId'>
type UserId      = Brand<string, 'UserId'>
type ProviderId  = Brand<string, 'ProviderId'>
type SavedId     = Brand<string, 'SavedId'>

type IsoDate    = string   // '2026-10-15'
type IsoInstant = string   // '2026-10-15T13:45:00-04:00'
type Minutes    = number

type CurrencyCode = 'CAD' | 'USD' | 'EUR' | 'GBP' | 'INR'

interface Money {
  amount: number          // minor units
  currency: CurrencyCode
}
```

## Places and carriers

```ts
interface Airport {
  code: string            // IATA, 'YYZ'
  name: string            // 'Toronto Pearson International'
  city: string
  country: string
  countryCode: string
  timezone: string        // IANA, 'America/Toronto'
  lat: number
  lon: number
  popularity: number      // 0–1, drives result ordering in the picker
}

interface Airline {
  code: string            // IATA, 'AC'
  name: string
  brandColor: string      // the ONE place a hex literal is legitimate
  alliance?: 'Star Alliance' | 'oneworld' | 'SkyTeam'
}
```

## Search

```ts
type TripType = 'round_trip' | 'one_way' | 'multi_city'
type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first'

interface TravelerCounts {
  adults: number          // >= 1
  children: number
  infants: number         // <= adults
}

interface SearchQuery {
  tripType: TripType
  origin: string          // IATA
  destination: string     // IATA
  departDate: IsoDate
  returnDate?: IsoDate    // required when tripType === 'round_trip'
  travelers: TravelerCounts
  cabin: CabinClass
  currency: CurrencyCode
}

interface SearchResult {
  queryId: string
  query: SearchQuery
  itineraries: Itinerary[]
  searchedAt: IsoInstant
  /** Providers that failed for this search — results are still usable. */
  degradedProviders: ProviderId[]
}
```

`SearchQuery` is what gets encoded into the `/results` URL, so it must round-trip
cleanly through query parameters.

## Itineraries

```ts
interface Segment {
  airlineCode: string
  flightNumber: string       // '42'
  origin: string             // IATA
  destination: string
  departsAt: IsoInstant
  arrivesAt: IsoInstant
  durationMinutes: Minutes
  aircraft?: string
}

interface Leg {
  segments: Segment[]        // length-1 means nonstop
  durationMinutes: Minutes   // includes layovers
  stops: number
  layovers: Array<{ airport: string; durationMinutes: Minutes }>
}

type ItineraryTag = 'cheapest' | 'best_value' | 'fastest'

interface Itinerary {
  id: ItineraryId
  outbound: Leg
  inbound?: Leg              // present for round trips
  /** Lowest price across all currently available offers, per traveller. */
  lowestPrice: Money
  offerCount: number
  /** At most one tag; assigned across the result set, never per-itinerary. */
  tag?: ItineraryTag
  /** Carriers differ between segments — surfaced as a warning in the UI. */
  mixedAirlines: boolean
  primaryAirlineCode: string
}
```

Note `mixedAirlines`: a fare stitched from two carriers has real consequences for
baggage and missed connections, so the model tracks it explicitly.

## Provider offers

```ts
type ProviderKind = 'airline_direct' | 'travel_site'

interface Provider {
  id: ProviderId
  name: string               // 'Trip.com'
  kind: ProviderKind
  mark: string               // monogram, 'T'
  markColor?: string
  deepLinkTemplate: string   // where the hand-off goes
}

interface BaggageAllowance {
  carryOnIncluded: boolean
  checkedIncluded: number    // count of free checked bags
  checkedFee?: Money
}

interface ProviderOffer {
  providerId: ProviderId
  itineraryId: ItineraryId
  price: Money               // per traveller, in the user's currency
  totalPrice: Money          // all travellers, incl. taxes and fees
  /** Difference from the cheapest available offer. 0 for the cheapest. */
  priceDelta: Money
  baggage: BaggageAllowance
  fareNote?: string          // 'Flexible fare from CA$945'
  /** Set when the seller charges in another currency and we converted. */
  convertedFrom?: Money
  sponsored: boolean
  available: boolean
  checkedAt: IsoInstant
}
```

`price` vs `totalPrice` matters: results show per-traveller, checkout shows total,
and conflating them is the classic metasearch bait-and-switch.

## Alerts

```ts
type AlertStatus = 'active' | 'paused' | 'expired' | 'triggered'
type AlertScope  = 'any_provider' | 'airline_direct' | 'selected_providers'

interface AlertConstraints {
  maxStops?: number
  cabin: CabinClass
  providerIds?: ProviderId[]   // when scope === 'selected_providers'
  requireCarryOn?: boolean
  requireCheckedBag?: boolean
}

interface AlertChannels {
  email: boolean
  browserPush: boolean
}

interface Alert {
  id: AlertId
  userId: UserId
  origin: string
  destination: string
  departDate: IsoDate
  returnDate?: IsoDate
  travelers: TravelerCounts
  cabin: CabinClass
  targetPrice: Money
  scope: AlertScope
  constraints: AlertConstraints
  channels: AlertChannels
  status: AlertStatus
  /** Price when the alert was created — the baseline for progress. */
  startPrice: Money
  currentBestPrice: Money
  currentBestProviderId: ProviderId | null
  airlineDirectPrice: Money | null
  lastCheckedAt: IsoInstant
  createdAt: IsoInstant
  triggeredAt?: IsoInstant
  expiresAt: IsoInstant        // departure date
}

interface PricePoint {
  at: IsoInstant
  lowestPrice: Money
  airlineDirectPrice: Money | null
  providerId: ProviderId | null
}

interface PriceHistory {
  alertId: AlertId
  points: PricePoint[]
  window: '7d' | '30d' | '90d'
  /** Derived: is the current price good relative to this window? */
  verdict: 'good_time_to_buy' | 'wait' | 'rising' | 'insufficient_data'
  low: Money
  high: Money
  median: Money
}
```

`verdict` is the "should I buy now?" answer the secondary user persona actually
wants. It is derived in `sim/` (later, on the server) — never computed in a
component.

## Notifications

```ts
type NotificationKind =
  | 'target_reached'
  | 'price_drop'
  | 'price_rise'
  | 'provider_changed'
  | 'itinerary_unavailable'
  | 'alert_expiring'
  | 'system'

interface AppNotification {
  id: string
  userId: UserId
  kind: NotificationKind
  title: string
  body: string
  alertId?: AlertId
  createdAt: IsoInstant
  read: boolean
  /** Where tapping it goes. */
  deepLink?: string
}
```

Grouping into "Today" / "Earlier" is a **render-time** decision from `createdAt`,
not a stored field. The current `mock.ts` stores `group` — don't carry that forward.

## User and preferences

```ts
interface UserPreferences {
  homeAirport: string | null
  currency: CurrencyCode
  preferredCabin: CabinClass
  preferredAirlines: string[]
  timezone: string
  emailAlerts: boolean
  browserPush: boolean
}

interface User {
  id: UserId
  name: string
  email: string
  avatarUrl: string | null
  preferences: UserPreferences
  createdAt: IsoInstant
}

interface Session {
  token: string
  refreshToken: string
  expiresAt: IsoInstant
  user: User
}
```

`Session` is shaped like a JWT pair on purpose — the simulated auth in Phase 5
mints fake tokens with the same shape a real `/auth/login` will return, so the
swap is invisible to `AuthContext`.

## Saved searches

```ts
interface SavedSearch {
  id: SavedId
  userId: UserId
  query: SearchQuery
  alertId: AlertId | null      // non-null means it's being tracked
  lastKnownPrice: Money | null
  lastSearchedAt: IsoInstant
  createdAt: IsoInstant
}
```

## Validation

Every type above gets a matching zod schema in `services/schemas.ts`. The schemas
are used to:

1. validate anything read from `localStorage` before it enters app state
2. validate form input before it reaches a service
3. validate API responses once a real backend exists

Derive the TypeScript type from the schema (`z.infer`) so the two cannot drift.
