# Frontend Architecture

Status: target state · Phases 1–5 build most of this

## The one idea

The UI must not know where data comes from. Today it comes from a generator
running in the browser; later it comes from an HTTP API. If that swap requires
touching any file under `pages/`, the architecture has failed.

Everything below exists to enforce that.

## Layers

```
┌─────────────────────────────────────────────────────────┐
│  pages/            screens, routing, layout             │
│                    may import: components, hooks,       │
│                    state, lib                           │
├─────────────────────────────────────────────────────────┤
│  hooks/            TanStack Query wrappers              │
│                    owns cache keys, staleness, retries  │
├─────────────────────────────────────────────────────────┤
│  services/         THE CONTRACT                         │
│                    async fns over domain types          │
│                    this is the future API surface       │
├──────────────────────────┬──────────────────────────────┤
│  sim/    (now)           │  api/   (later)              │
│  generator + localStorage│  fetch client + endpoints    │
└──────────────────────────┴──────────────────────────────┘
```

Import direction is strictly downward. A lower layer never imports an upper one.

### `pages/`
Screens. One default-exported component per file, one `<Route>` per screen in
`App.tsx`. Pages own layout, navigation and local UI state (which sheet is open,
which tab is selected). They do not own data fetching beyond calling a hook, and
they never construct a price, a fare, or a date range themselves.

### `hooks/`
One hook per read (`useFlightSearch`, `useAlerts`, `usePriceHistory`) and one per
write (`useCreateAlert`, `usePauseAlert`). These wrap TanStack Query so that:

- cache keys live in one place (`hooks/keys.ts`)
- every screen gets `isLoading` / `isError` / `data` for free
- mutations invalidate the right queries, and nothing else
- optimistic updates for pause/delete happen here, not in components

### `services/`
The contract. Plain async functions, domain types in and out, no React, no
`localStorage`, no `setTimeout`. Example:

```ts
// services/flights.service.ts
export async function searchFlights(q: SearchQuery): Promise<SearchResult>
export async function getItinerary(id: ItineraryId): Promise<Itinerary>
export async function getProviderOffers(id: ItineraryId): Promise<ProviderOffer[]>
```

Every signature here is a REST endpoint in waiting. `searchFlights` becomes
`POST /api/search`. Design them as if the network were already there: they can
be slow, they can fail, and they return serialisable data only.

### `sim/`
The disposable implementation. See `03-simulation-engine.md`. It holds the
generator, the persisted store, artificial latency, and error injection.
**Nothing outside `services/` imports it.**

### `api/` (later)
`client.ts` — a `fetch` wrapper handling base URL, auth header, JSON, timeouts
and error normalisation into the same error type `sim/` throws. `endpoints.ts` —
path constants. When this lands, each service function swaps its body and its
signature stays identical.

## Error model

One error type across both implementations, so screens handle errors the same way
regardless of source:

```ts
type AppErrorKind =
  | 'network'      // couldn't reach the source
  | 'not_found'    // the itinerary/alert is gone
  | 'unauthorized' // session expired
  | 'validation'   // bad input
  | 'provider'     // a seller failed, others may still be fine
  | 'unknown'

class AppError extends Error {
  kind: AppErrorKind
  retryable: boolean
  details?: Record<string, unknown>
}
```

The existing `errors/` screens map onto these kinds: `NetworkErrorPage` →
`network`, `SearchErrorPage` → `provider` or `unknown`, `AlertErrorPage` →
a failed alert mutation.

## State: three kinds, three homes

| Kind | Example | Home |
|---|---|---|
| Server state | flights, alerts, notifications | TanStack Query |
| Session state | who is signed in, the current search form | React context |
| UI state | which sheet is open, which chip is active | `useState` in the page |

The current `AppState.tsx` mixes all three. Phases 3–5 split it into:

- `AuthContext` — user, token, `signIn`/`signOut`, hydration from storage
- `SearchContext` — the in-progress search form shared across the search screens
- `ToastContext` — the toast queue and its host
- everything else moves to Query

**Search parameters belong in the URL.** `/results?from=YYZ&to=DEL&depart=…`
so results are refreshable, shareable, and survive a back-navigation. The
context is a convenience for the multi-step form, not the source of truth.

## Persistence

`localStorage`, namespaced and versioned:

```
farewatch:v1:auth          session token + user
farewatch:v1:alerts        user's alerts
farewatch:v1:saved         saved searches
farewatch:v1:notifications notification feed
farewatch:v1:sim           generator seed + price-walk state
farewatch:v1:prefs         currency, home airport, cabin
```

Every read goes through a parser that validates with zod and falls back to the
default on failure. A schema change bumps `v1` → `v2` with an explicit migration.
Never `JSON.parse` straight into a typed variable — corrupt storage must degrade
to defaults, not white-screen the app.

## Routing

Public: `/`, `/home`, `/search/*`, `/results`, `/flight/*`, `/auth/*`,
`/styleguide/*`.

Guarded by `<RequireAuth>`: `/dashboard`, `/alerts`, `/alerts/*`, `/saved`,
`/notifications`, `/profile`, `/profile/*`, `/track/*`.

`RequireAuth` redirects to `/auth/sign-in?next=<path>` and the sign-in screen
returns the user to `next` on success. While auth is still hydrating from storage
it renders a splash, never a redirect — otherwise a refresh on a guarded route
bounces the user to sign-in.

## Performance

- Route-level `React.lazy` + `Suspense`, with the styleguide always split out
- `useMemo` for filter/sort over result lists (already done in `ResultsPage`)
- Query `staleTime`: search results 60s, price history 5min, alerts 30s
- Skeletons over spinners for anything with known shape
- Target: interactive under 2s on a mid-range phone over 4G

## Testing

| Level | Tool | Covers |
|---|---|---|
| Unit | Vitest | `sim/` determinism and price maths, `lib/` formatters, zod schemas |
| Component | Vitest + Testing Library | `components/ui/*` behaviour and a11y |
| Integration | Vitest + Testing Library + MSW-style service mocks | a page's full loading→loaded→error path |
| E2E | Playwright *(optional, later)* | search → compare → track → alert fires |

The rule: **`sim/` gets real unit tests** — it is the engine everything else
trusts. Screens get integration tests at the flow level, not snapshot tests.

## Accessibility baseline

- Every interactive element is a `<button>` or `<a>`, never a `<div onClick>`.
  The existing code violates this in several places; Phase 10 fixes it.
- Focus is trapped inside an open `BottomSheet` and restored to the trigger on close.
- `Escape` closes sheets.
- Touch targets ≥ 44×44px.
- Text contrast ≥ 4.5:1 — `--text-faint` on white is borderline and must not
  carry meaning alone.
- Colour is never the only signal: a price drop shows an arrow as well as green.
- `prefers-reduced-motion` disables the stagger and slide animations.
