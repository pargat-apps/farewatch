# Phase 2 — Domain Model & Simulation Engine

Branch: `feat/sim-engine` · Depends on: Phase 1 merged

Read `docs/specs/04-domain-model.md` and `docs/specs/03-simulation-engine.md`
first — this plan is the build order, those are the requirements.

## Goal

A tested, deterministic flight-data engine and the type vocabulary the whole app
will speak. **Zero UI changes.** Nothing under `pages/` or `components/` is
touched in this branch.

This is the largest phase. It is also the one that makes every later phase easy,
so don't rush it.

## Build order

Bottom-up — each step is testable before the next depends on it.

### 1. `src/services/types.ts`
Every type from the domain-model spec. Branded IDs, `Money` as minor units,
ISO strings for dates. No presentation fields.

### 2. `src/services/schemas.ts`
Zod schema per type. **Derive the TS types from the schemas** via `z.infer` so
they can't drift — `types.ts` re-exports from here rather than declaring twice.

### 3. `src/services/errors.ts`
```ts
export type AppErrorKind =
  | 'network' | 'not_found' | 'unauthorized'
  | 'validation' | 'provider' | 'unknown'

export class AppError extends Error {
  constructor(
    readonly kind: AppErrorKind,
    message: string,
    readonly retryable = false,
    readonly details?: Record<string, unknown>,
  ) { super(message); this.name = 'AppError' }
}
export function isAppError(e: unknown): e is AppError
```

### 4. `src/sim/rng.ts`
```ts
export function hashString(s: string): number
export function makeRng(seed: number): Rng      // { next(), int(min,max), float(min,max), pick(arr), weighted(...), bool(p) }
export function deriveSeed(...parts: (string|number)[]): number
```
mulberry32 is fine. Test: same seed → identical sequence; different seeds diverge;
`next()` stays in [0,1).

### 5. `src/sim/datasets/`

- **`airports.ts`** — ~200 airports: IATA code, name, city, country,
  countryCode, IANA timezone, lat, lon, popularity 0–1. Cover North America,
  Europe, India, Middle East, East/Southeast Asia, Oceania, and major LatAm/Africa
  hubs. Coordinates must be real — every duration and price derives from distance.
- **`airlines.ts`** — ~40 carriers: IATA code, name, brand hex, alliance, hub
  airport codes, tier (`legacy` | `budget`).
- **`providers.ts`** — the sellers: Expedia, Trip.com, CheapOair, Booking.com,
  Kayak, Priceline, plus an `airline_direct` entry synthesised per carrier.
  Each with a price factor range and a deep-link template.
- **`routes.ts`** — region-pair base rates per km, plus monthly seasonality
  multipliers per region pair.

Type these against `services/types.ts` so a malformed entry is a build error.

### 6. `src/sim/geo.ts`
Haversine distance; `estimateFlightMinutes(km)` ≈ `km / 800 * 60 + 40`;
region classification for an airport.

### 7. `src/sim/clock.ts`
```ts
export interface Clock { now(): Date }
export const systemClock: Clock
export function makeFixedClock(iso: string): Clock & { advance(hours: number): void }
```
**Nothing in `sim/` calls `new Date()` or `Date.now()` directly** — always through
a clock. This is what makes "fast-forward three days and check the alert fires"
testable.

### 8. `src/sim/fareEngine.ts`
`generateItineraries(query, config, clock) → Itinerary[]`

Follow the spec's steps: distance → base fare → carrier selection → itinerary
shapes → departure banks → price modifiers → tag assignment.

Tag assignment happens **across the set**, after all itineraries exist. Exactly
one `cheapest`; if the cheapest is also fastest, it keeps `best_value` and the
runner-up takes the other tag.

### 9. `src/sim/offerEngine.ts`
`generateOffers(itinerary, query, config, clock) → ProviderOffer[]`

Airline-direct always present, priced at or above the median. Baggage correlates
inversely with price. ~15% unavailable, ~1 sponsored, ~20% with `convertedFrom`.
`priceDelta` computed against the cheapest **available** offer.

### 10. `src/sim/priceWalk.ts`
```ts
interface PriceWalkState { routeKey: string; current: number; base: number; lastStepAt: IsoInstant; shockStepsLeft: number }
export function advanceWalk(state, steps, rng): PriceWalkState
export function generateHistory(state, window, rng): PricePoint[]
export function computeVerdict(points): PriceHistory['verdict']
```
Mean-reverting per the spec: `θ = 0.15`, `σ = 2.5%`, one step = 6h, flash-sale and
spike shocks. History is generated *backwards* from the current point so the
chart and the live price agree.

### 11. `src/sim/store.ts`
`localStorage` at `farewatch:v1:sim`, zod-validated on read, resets to a default
on any parse failure (logging once). Never throws to the caller.

### 12. `src/sim/latency.ts`
`await simulateLatency(config)` and `maybeThrow(config)`. Both no-ops when
`config.enabled` is false, so tests are fast and deterministic.

### 13. `src/sim/index.ts`
The single public surface. `services/` imports only from here.

## Tests

`sim/` is the one area with thorough coverage. At minimum:

| File | Assertions |
|---|---|
| `rng.test.ts` | Same seed reproduces; range bounds hold |
| `geo.test.ts` | YYZ→DEL ≈ 11,700km; YYZ→YVR ≈ 3,350km |
| `fareEngine.test.ts` | Determinism (deep-equal on repeat); durations within ±25% of geo estimate; arrival after departure; no non-positive prices; exactly one `cheapest` and it is the lowest; days-to-departure U-curve behaves |
| `offerEngine.test.ts` | Airline-direct always present; `priceDelta` correct; cheapest offer has weaker baggage than airline-direct more often than not; sponsored never reorders |
| `priceWalk.test.ts` | 1000 steps stay within 40–250% of base; history is chronological; `verdict` matches hand-built series |
| `store.test.ts` | Corrupt JSON, wrong shape and missing key all fall back cleanly |

## Acceptance

- [ ] `searchFlights`-shaped generation is deterministic for a fixed seed
- [ ] Generated data passes plausibility assertions
- [ ] Fast-forwarding a fixed clock produces visible, bounded price movement
- [ ] No `Math.random()`, `new Date()` or `Date.now()` anywhere in `sim/`
- [ ] `sim/` imports nothing but its own files and `services/types.ts`
- [ ] No file under `pages/` or `components/` changed
- [ ] `npm run build`, `lint`, `test` all green

## Traps

- **One stray `Math.random()` breaks the whole design.** Grep for it before opening the PR.
- Don't shortcut the airport dataset with 20 entries — distance drives everything,
  and a thin dataset makes every generated fare look wrong.
- Money is minor units. A price of `879` (meaning CA$8.79) instead of `87900` will
  silently produce nonsense for phases.
- Resist adding a `services/*.service.ts` here. That's Phase 3, and mixing them
  makes both PRs harder to review.
