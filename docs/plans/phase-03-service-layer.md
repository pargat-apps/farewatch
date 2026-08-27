# Phase 3 — Service Layer & Data Fetching

Branch: `feat/service-layer` · Depends on: Phase 2 merged

## Goal

Connect the engine to the screens through the contract layer, and delete every
`data/mock.ts` import from `pages/`. This is where the app stops being a mockup.

## Steps

### 1. Services

`src/services/flights.service.ts`
```ts
export async function searchFlights(q: SearchQuery): Promise<SearchResult>
export async function getItinerary(id: ItineraryId): Promise<Itinerary>
export async function getProviderOffers(id: ItineraryId): Promise<ProviderOffer[]>
export async function refreshProviderOffers(id: ItineraryId): Promise<ProviderOffer[]>
```

`src/services/airports.service.ts`
```ts
export async function searchAirports(q: string, limit?: number): Promise<Airport[]>
export async function getPopularAirports(): Promise<Airport[]>
export async function getNearbyAirports(lat: number, lon: number): Promise<Airport[]>
```

Each function: validate input with a zod schema → `await simulateLatency()` →
`maybeThrow()` → call `sim/` → return domain types. No React, no storage, no
`setTimeout` outside `latency.ts`.

Write `alerts`, `notifications`, `saved` and `auth` services as stubs here only if
a screen in this phase needs them — otherwise leave them for Phases 4, 5 and 7.

### 2. TanStack Query

```bash
npm i @tanstack/react-query
npm i -D @tanstack/react-query-devtools
```

`main.tsx`: wrap in `QueryClientProvider`. Defaults:
```ts
{ queries: { retry: (n, e) => isAppError(e) && e.retryable && n < 2,
             refetchOnWindowFocus: false, staleTime: 60_000 } }
```

`src/hooks/keys.ts` — every cache key in one place:
```ts
export const qk = {
  search: (q: SearchQuery) => ['search', q] as const,
  itinerary: (id: ItineraryId) => ['itinerary', id] as const,
  offers: (id: ItineraryId) => ['offers', id] as const,
  airports: (q: string) => ['airports', q] as const,
} as const
```

`staleTime`: search 60s · itinerary 5min · offers 30s · airports Infinity.

### 3. Hooks

`src/hooks/useFlightSearch.ts`, `useItinerary.ts`, `useProviderOffers.ts`,
`useAirportSearch.ts` (debounced 250ms). Thin wrappers — logic belongs in
services, not here.

### 4. Component props

`FlightCard` currently hardcodes `YYZ`, `DEL`, and a Trip.com/Air Canada preview
in its markup. Change its signature to:
```ts
{ itinerary: Itinerary; offers?: ProviderOffer[]; onCompare?: ...; onTrack?: ... }
```
and derive everything — airline mark, times, codes, duration, stops, price, tag
badge, preview rows — from props. Same for `ProviderCard` taking
`{ offer: ProviderOffer; provider: Provider; isCheapest: boolean }`.

Badge colours currently come from data (`badgeBg`, `badgeFg`). Move that mapping
into the component: `tag → token pair`. Presentation does not belong in the model.

### 5. Formatting

`lib/format.ts` operates on `Money`:
```ts
export function formatMoney(m: Money, opts?: { compact?: boolean }): string
export function formatMoneyDelta(m: Money): string   // U+2212 for negatives
export function formatDuration(minutes: number): string        // '15h 40m'
export function formatRelativeTime(iso: IsoInstant, now: Date): string
export function formatDayOffset(dep: IsoInstant, arr: IsoInstant): string | null  // '+1'
```
Tests for each, including the minus sign and the day-offset boundary.

### 6. Rewire screens

- **`SearchLoadingPage`** — reflects the real query's pending state; navigates to
  `/results` on success, to an error screen on failure. Delete the fake timer.
- **`ResultsPage`** — `useFlightSearch`; keep the existing filter/sort logic but
  move it onto domain types (numbers, not `'1,020'` strings, and enums, not
  `stops.startsWith('1 stop')`). Skeletons while pending, `NoResultsPage` content
  inline when the filtered set is empty, error screen on failure.
- **`FlightDetailsPage`** — `useItinerary` + `useProviderOffers`.
- **`ComparePage`** — `useProviderOffers`, sorted, with delta and freshness.
- **`CompareFlightsPage`** — reads from the cached search result.

### 7. Error mapping

One helper both here and later phases use:
```ts
function errorRouteFor(e: unknown): string   // AppError.kind → '/error/network' | '/error/search' | …
```
The `errors/` screens stop being styleguide-only curiosities and become the real
failure destinations.

## Acceptance

- [ ] `grep -r "data/mock" src/pages` returns nothing
- [ ] `grep -r "from '.*sim/" src/pages src/components` returns nothing
- [ ] Search → results → details → compare all run on generated data
- [ ] Setting `VITE_SIM_ERROR_RATE=1` sends the user to the right error screen
- [ ] Skeletons appear while loading; empty state appears when filters exclude all
- [ ] `FlightCard` has no hardcoded airport codes or prices
- [ ] Build, lint and tests green

## Traps

- **Don't widen the domain model to fit `mock.ts`.** Map at the boundary; if a
  screen wants `stopsColor`, that's the component's job to derive.
- Cache keys must be stable — a `SearchQuery` object with keys in a different
  order produces a different key. Normalise before keying.
- `refetchOnWindowFocus: false` matters here; fares that jump when the user
  tabs back look like a bug even though the engine is behaving.
- Leave `data/mock.ts` on disk until the end of the phase, then delete it in one
  commit once nothing imports it.
