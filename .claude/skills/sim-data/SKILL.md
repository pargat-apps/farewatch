---
name: sim-data
description: Extending or debugging the FareWatch simulated fare engine in src/sim/ without breaking determinism or the layering that lets a real backend replace it later. Use when adding airports, airlines, providers, price rules, alert-evaluation logic, or when generated flight data looks wrong.
---

# Working on the simulation engine

`src/sim/` generates all flight data. Full requirements:
`docs/specs/03-simulation-engine.md`.

## The two invariants

**1. Determinism.** The same seed and the same query must produce identical
results, forever. This is what makes the app feel real instead of broken, and
it's the only reason the engine is testable.

```ts
// Never, anywhere in sim/
Math.random()
new Date()
Date.now()

// Always
const rng = makeRng(deriveSeed(origin, destination, departDate, globalSeed))
const now = clock.now()
```

One stray `Math.random()` silently destroys this. **Grep for it before every PR.**

**2. Isolation.** `sim/` imports only its own files and `services/types.ts`.
Nothing outside `services/` imports `sim/`. The folder is designed to be deleted
when a real backend arrives — anything that makes it un-deletable is a bug.

```bash
grep -rn "Math.random\|new Date()\|Date.now()" farewatchfrontend/src/sim/
grep -rn "from '.*sim/" farewatchfrontend/src/pages farewatchfrontend/src/components
```

Both should return nothing.

## Where things go

| File | Owns |
|---|---|
| `rng.ts` | Seeded PRNG, string hashing, seed derivation |
| `clock.ts` | Injectable "now" — the only time source |
| `datasets/airports.ts` | IATA, name, city, country, timezone, lat/lon, popularity |
| `datasets/airlines.ts` | IATA, name, brand hex, alliance, hubs, tier |
| `datasets/providers.ts` | Sellers, price factor ranges, deep-link templates |
| `datasets/routes.ts` | Region-pair base rates, seasonality multipliers |
| `geo.ts` | Haversine, flight-time estimation, region classification |
| `fareEngine.ts` | Query → itineraries |
| `offerEngine.ts` | Itinerary → provider offers |
| `priceWalk.ts` | Price movement over time, history, verdict |
| `store.ts` | Versioned, validated `localStorage` |
| `latency.ts` | Artificial delay and error injection |
| `index.ts` | The only public surface |

## Adding an airport

Append to `datasets/airports.ts` with **real** coordinates and a real IANA
timezone. Distance drives every duration and price in the app, so a wrong
lat/lon produces wrong fares everywhere the airport appears.

`popularity` (0–1) orders the picker. Major international hubs ~0.9, regional
airports ~0.2.

Then check: does any airline in `airlines.ts` plausibly serve it? An airport no
carrier reaches generates zero results.

## Adding an airline

Needs a brand hex (**this is the one place hex literals belong**), an alliance,
hub airport codes, and a tier (`legacy` | `budget`). Carrier selection keys off
hubs and alliance, so an airline with no hubs in the dataset will never be picked.

## Changing price rules

Every modifier is multiplicative, in `fareEngine.ts`. When you change one, check
the tests in `fareEngine.test.ts` — they assert plausibility bounds precisely so
a modifier tweak can't quietly produce CA$40 transatlantic fares.

Sanity anchors to hold onto:
- YYZ→DEL economy, ~60 days out: roughly CA$800–1,200
- YYZ→YVR economy, ~60 days out: roughly CA$200–400
- Business class is ~3.4× economy
- Nonstop carries a 10–25% premium over a one-stop

## Changing the price walk

Mean-reverting: `next = current + θ(mean − current) + σ·noise + shocks`,
`θ = 0.15`, `σ = 2.5%`, one step = 6 hours.

Raising `σ` or lowering `θ` makes prices wander further. The bounds test (40–250%
of base over 1000 steps) is what catches a change that lets prices run away —
if you change these constants, run that test, don't just adjust it to pass.

## Debugging bad-looking data

1. **Same wrong result every reload?** The generator. Different every reload?
   An unseeded random got in.
2. **Duration wrong?** Check the airport coordinates first — it's almost always
   a bad lat/lon, not the flight-time formula.
3. **Price absurd?** Log each modifier separately. It's usually seasonality or
   the days-to-departure curve compounding unexpectedly.
4. **Alert never fires?** Fast-forward the clock in a test rather than waiting.
   Check the alert's `scope` and `constraints` actually admit the cheapest offer.
5. **Data stuck after a code change?** `localStorage` is holding old state.
   Clear `farewatch:v1:sim`.

## The dev panel

`/styleguide/sim` (Phase 2) exposes the seed, latency range, error rate,
"advance time by N hours", and "force this alert to trigger". Use it instead of
editing constants to reproduce a state — and keep it working when you change the
engine's config shape.

## Testing anything you add

`sim/` is the one area with thorough unit tests, because everything else trusts
it. New generation logic needs at minimum:

- a determinism assertion (same seed twice → deeply equal)
- a plausibility bound (no negative prices, arrival after departure, duration
  within ±25% of the geo estimate)
- an edge case (same origin and destination, a date in the past, an unknown IATA code)

Tests run with `latency.enabled = false` and a fixed clock and seed. A test that
needs real time to pass is a test that will flake.
