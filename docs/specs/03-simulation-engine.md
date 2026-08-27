# Simulation Engine

Status: target · Built in Phase 2 as `farewatchfrontend/src/sim/`

## Purpose

Produce flight data convincing enough to build and test the entire product
against — including the parts that only exist over time, like a price crossing a
target three days after an alert was created.

A hardcoded fixture file can't do that. A generator can.

**This folder is designed to be deleted.** When a real backend lands, `services/`
stops calling `sim/` and starts calling `api/`. Nothing else changes. Keep that
property: no React, no routing, no components, no imports from outside `sim/`
and `services/types.ts`.

## Design requirements

| Requirement | Why |
|---|---|
| **Deterministic** | The same route + date must yield the same flights every reload, or the app feels broken and tests can't assert anything. |
| **Plausible** | Prices, durations and layovers must pass a glance from someone who flies. Nonstop YYZ→DEL is ~14h; a 3h version destroys trust in the demo. |
| **Time-varying** | Prices must move between sessions so alerts have something to detect. |
| **Fallible** | It must be able to be slow, to fail, and to fail partially — so error states are exercised in normal development, not bolted on. |
| **Fast** | A search generates in well under 100ms before artificial latency. |

## Structure

```
src/sim/
  rng.ts           seeded PRNG + derived-seed helpers
  datasets/
    airports.ts    ~200 airports with coords, timezones, popularity
    airlines.ts    ~40 carriers with brand colours and hubs
    providers.ts   the sellers (Expedia, Trip.com, CheapOair, airline-direct)
    routes.ts      base fare and typical duration per region pair
  geo.ts           great-circle distance, flight-time estimation
  fareEngine.ts    route + date → Itinerary[]
  offerEngine.ts   itinerary → ProviderOffer[]
  priceWalk.ts     time-series price movement and history
  store.ts         localStorage persistence, versioned + zod-validated
  clock.ts         injectable "now" (tests fast-forward through this)
  latency.ts       artificial delay + error injection
  index.ts         the only file services/ imports from
```

## Determinism

A seeded PRNG (mulberry32 or xorshift128 — small, fast, good enough) plus a
string hash to derive per-entity seeds:

```ts
const seed = hash(`${origin}:${destination}:${departDate}:${globalSeed}`)
const rng = makeRng(seed)
```

`globalSeed` is generated once per browser and persisted, so two people demoing
see different-but-stable data. Tests pass a fixed `globalSeed`.

**Never call `Math.random()` in `sim/`.** A single unseeded call makes the whole
engine non-reproducible and is the most likely way this design gets broken.

## Fare generation

For a route:

1. **Distance** — great-circle from the airport coordinates.
2. **Base fare** — a per-kilometre rate scaled by region pair (domestic
   short-haul is dearer per km than transatlantic), from `routes.ts`.
3. **Carrier selection** — airlines that plausibly serve the route: either
   endpoint is a hub, or the carrier's alliance covers both regions. 4–8 carriers.
4. **Itinerary shape** — for each carrier, 1–3 itineraries: nonstop if the
   carrier realistically flies it, otherwise one stop at the carrier's hub.
   Flight time from distance (≈800 km/h cruise + 40min taxi/climb), layovers
   90–240min.
5. **Departure times** — clustered into morning / afternoon / evening banks, not
   uniformly random. Real schedules bunch.
6. **Price modifiers**, multiplicative:
   - Cabin: economy ×1, premium ×1.9, business ×3.4, first ×6.2
   - Days to departure: a U-curve — expensive far out, cheapest around 45–70
     days, sharply rising inside 21 days
   - Day of week: Tue/Wed departures cheaper, Fri/Sun dearer
   - Seasonality: a per-month multiplier by region (December to India, July to
     Europe)
   - Stops: nonstop carries a 10–25% premium
   - Carrier tier: legacy carriers above budget carriers
   - Per-itinerary jitter: ±8%
7. **Tags** — assigned once **across the result set**: lowest price gets
   `cheapest`, shortest duration gets `fastest`, best price×duration score gets
   `best_value`. At most one tag per itinerary; if one wins two, it keeps
   `best_value` and the next-best takes the other.

## Offer generation

For each itinerary, 3–6 providers:

- The operating carrier is always present as `airline_direct`, priced at or above
  the median offer — airlines rarely undercut OTAs, and the product's honesty
  principle depends on showing this.
- Travel sites are drawn from `providers.ts` weighted by route region.
- Each offer's price is the itinerary's base fare × a per-provider factor
  (0.94–1.12), stable per provider+itinerary via a derived seed.
- **Baggage correlates inversely with price.** The cheapest offer usually excludes
  checked bags; the airline-direct offer usually includes them. This is the real
  trade-off the compare screen exists to expose, and random baggage would hide it.
- ~15% of offers are `available: false`.
- ~1 offer per itinerary is `sponsored: true` — and sponsorship never reorders
  results, only adds the label.
- ~20% of travel-site offers carry `convertedFrom` in USD.
- `checkedAt` is jittered a few minutes into the past.

## Price movement

The part that makes alerts real.

A **mean-reverting random walk** (Ornstein–Uhlenbeck-ish), not a pure walk — pure
walks drift to absurdity over weeks:

```
next = current + θ(mean − current) + σ·noise + shocks
```

- `mean` is the fare-engine base for that route and date
- `θ` ≈ 0.15 — gentle pull back to the mean
- `σ` ≈ 2.5% of base per step
- **Shocks:** ~3% chance per step of a −8% to −20% flash sale lasting 1–3 steps,
  and ~2% chance of a +10% jump
- The days-to-departure U-curve shifts `mean` as the departure approaches, so
  prices genuinely trend up in the final three weeks

One step = 6 simulated hours. On load, the engine advances the walk by however
many steps have elapsed since `lastCheckedAt` and persists the new state — so
leaving the app overnight and returning produces real movement, and a tracked
price can cross its target while the user was away.

History is generated backwards from the current point using the same process, so
the chart and the live price are consistent.

`verdict` on `PriceHistory`:
- `good_time_to_buy` — current is within 5% of the window low
- `wait` — current is above the median and the recent trend is downward
- `rising` — the last 3 points trend upward
- `insufficient_data` — fewer than 5 points

## Alert evaluation

A tick runs on app load and every 60s while open:

1. Advance the price walk for every active alert's route
2. For each active alert, compute the best offer satisfying its scope and
   constraints
3. Update `currentBestPrice`, `currentBestProviderId`, `lastCheckedAt`
4. If it crosses `targetPrice`: set `status: 'triggered'`, stamp `triggeredAt`,
   emit a `target_reached` notification
5. On a >5% drop without crossing: emit `price_drop`
6. If the previous best provider went unavailable: emit `provider_changed`
7. Past `expiresAt`: set `status: 'expired'`

The tick is a service (`services/alerts.service.ts` → `runAlertTick()`) driven by
a hook, not a `setInterval` buried in a component. When a real backend arrives
this becomes a cron job server-side and the hook becomes a poll or a socket.

## Latency and failure injection

Configurable, defaulting to on in dev and off in tests:

```ts
interface SimConfig {
  globalSeed: number
  latency: { min: number; max: number }   // default 250–900ms
  errorRate: number                        // default 0.02
  partialFailureRate: number               // default 0.08
  enabled: boolean                         // false in tests
}
```

- `errorRate` throws an `AppError` with a plausible `kind`
- `partialFailureRate` returns results with a populated `degradedProviders` —
  which is how the "some sellers didn't respond" UI gets built and tested

A dev-only panel at `/styleguide/sim` should expose these knobs plus "advance
time by N hours" and "force this alert to trigger". Building error states is
otherwise guesswork.

## Persistence

`store.ts` owns `farewatch:v1:sim`:

```ts
interface SimState {
  version: 1
  globalSeed: number
  priceWalks: Record<string, PriceWalkState>   // keyed by route+date
  lastTickAt: IsoInstant
}
```

Read → zod parse → on failure, reset to a fresh default and log once. Corrupt
storage must never white-screen the app.

## Testing

`sim/` is the one place with thorough unit tests, because everything else trusts
it:

- **Determinism:** same seed + same query → deeply equal results, twice
- **Plausibility:** generated durations within ±25% of great-circle estimates;
  no negative or zero prices; arrival always after departure
- **Tags:** exactly one `cheapest`, and it really is the lowest
- **Offers:** the airline-direct offer is never the sole cheapest by more than 5%
- **Walk:** over 1000 steps, stays within 40–250% of base (mean reversion works)
- **Alerts:** an alert with a target below the current price eventually triggers
  when time is fast-forwarded via `clock.ts`
- **Store:** corrupt JSON, wrong shape, and missing keys all fall back cleanly
