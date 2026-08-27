# Roadmap

One phase = one branch = one PR. Phases are ordered by dependency; don't reorder
without reading what each one unblocks.

**Desktop is Phase 11 and nothing before it.** Every phase up to that point is
built and verified at 390px.

## Status

| # | Phase | Branch | Status |
|---|---|---|---|
| 0 | Project foundation | `feat/project-foundation` | **in review** |
| 1 | Toolchain & quality gates | `feat/toolchain` | not started |
| 2 | Domain model & simulation engine | `feat/sim-engine` | not started |
| 3 | Service layer & data fetching | `feat/service-layer` | not started |
| 4 | Persistence & app state | `feat/persistence` | not started |
| 5 | Auth flows & route guards | `feat/auth` | not started |
| 6 | Search flow completion | `feat/search-flow` | not started |
| 7 | Alerts & price tracking | `feat/alerts` | not started |
| 8 | Notifications & toasts | `feat/notifications` | not started |
| 9 | Compare & booking hand-off | `feat/compare-booking` | not started |
| 10 | Polish, a11y & PWA | `feat/polish-a11y` | not started |
| 11 | Desktop responsive | `feat/desktop-responsive` | not started |

---

## Phase 0 — Project foundation

Repo, docs, specs, plans, skills, CI. No app code changes.

**Done when:** `main` holds the prototype; this branch adds `CLAUDE.md` files,
`docs/specs/*`, `docs/plans/*`, `.claude/skills/*`, CI workflow, root README.

---

## Phase 1 — Toolchain & quality gates

Get the safety net in **before** touching app code. Every later phase depends on
`npm run build` and `npm test` being meaningful.

- `npm install`; confirm `npm run build` and `npm run dev` are green as-is
- Add Vitest + Testing Library + jsdom; `npm test`, `npm run test:watch`
- Add Prettier; align with existing formatting rather than reformatting the world
- Tighten `tsconfig.app.json`: `strict: true`, `noUncheckedIndexedAccess: true`
- Path alias `@/*` → `src/*` in both `tsconfig` and `vite.config.ts`
- Add zod
- `src/config/env.ts` — typed, zod-validated `import.meta.env` access
- `.env.example`
- CI (`.github/workflows/ci.yml`) running typecheck, lint, test, build on PRs
- One smoke test that renders `<App />` and asserts the splash screen

**Watch out:** turning on `strict` will surface errors in existing files. Fix them
in this branch — that's the point. Do not `// @ts-ignore` them forward.

**Done when:** CI passes on the PR; `npm test` runs at least one real test;
`strict` is on with zero errors.

---

## Phase 2 — Domain model & simulation engine

The biggest and most important phase. No UI changes at all.

- `src/services/types.ts` — every type in `docs/specs/04-domain-model.md`
- `src/services/schemas.ts` — matching zod schemas, types derived via `z.infer`
- `src/services/errors.ts` — `AppError` and `AppErrorKind`
- `src/sim/` in full, per `docs/specs/03-simulation-engine.md`:
  `rng`, `datasets/{airports,airlines,providers,routes}`, `geo`, `fareEngine`,
  `offerEngine`, `priceWalk`, `store`, `clock`, `latency`, `index`
- Unit tests: determinism, plausibility, tag assignment, walk bounds, store
  corruption recovery

**Watch out:** no `Math.random()` anywhere in `sim/`. No imports from `sim/` into
anything but `services/`. Airport dataset needs ~200 entries with real coordinates
and timezones — worth the effort, since distance drives every duration and price.

**Done when:** `npm test` covers the engine; calling `searchFlights` twice with
the same seed returns deeply-equal results; a fast-forwarded clock produces
visible price movement.

---

## Phase 3 — Service layer & data fetching

Wire the engine to the screens.

- `src/services/{flights,alerts,notifications,saved,airports,auth}.service.ts`
- TanStack Query: `QueryClientProvider` in `main.tsx`, `src/hooks/keys.ts`
- Read hooks: `useFlightSearch`, `useItinerary`, `useProviderOffers`,
  `useAirportSearch`
- Rewire `ResultsPage`, `FlightDetailsPage`, `ComparePage`, `CompareFlightsPage`,
  `SearchLoadingPage` onto hooks
- Real loading (skeletons), error (mapped to the `errors/` screens by
  `AppError.kind`) and empty states
- `FlightCard` and `ProviderCard` take domain types as props — remove the
  hardcoded `YYZ`/`DEL` and provider prices from `FlightCard`'s markup
- Move price formatting into `lib/format.ts` operating on `Money`
- Delete every `data/mock.ts` import from `pages/`

**Watch out:** `mock.ts` types are display-shaped (`price: '1,020'`,
`stopsColor`). Map to the real model; don't widen the real model to fit them.
`SearchLoadingPage` currently fakes a delay — it should now reflect real query state.

**Done when:** no page imports `data/mock.ts` or `sim/`; results, details and
compare are engine-driven; killing the engine surfaces the error screens.

---

## Phase 4 — Persistence & app state

- `src/lib/storage.ts` — namespaced, versioned, zod-validated `localStorage`
  wrapper with migration hooks
- Split `AppState.tsx` into `SearchContext` and `PreferencesContext`; alerts,
  notifications and saved searches move to Query
- Search parameters encoded in the `/results` URL and parsed back
- Alerts / saved / notifications survive refresh
- Optimistic updates for pause, resume and delete, with rollback on failure
- Real empty states (delete every alert → the empty state, not a blank list)

**Watch out:** never `JSON.parse` into a typed variable without validating.
Corrupt storage must fall back to defaults.

**Done when:** a refresh preserves alerts, saved searches, read-state and the
current search; a hand-corrupted storage key degrades gracefully.

---

## Phase 5 — Auth flows & route guards

Simulated auth, shaped exactly like the future real one.

- `auth.service.ts` — `register`, `login`, `logout`, `refresh`, `me`,
  `requestPasswordReset`; mints a `Session` with the same shape a real JWT
  endpoint returns
- Simulated user store in `localStorage`; passwords hashed with a Web Crypto
  digest (a stand-in for bcrypt — **note in code that this is not real security**)
- `AuthContext`: hydrates from storage on boot, exposes `user`, `status`
  (`loading` | `authenticated` | `anonymous`), `signIn`, `signOut`
- `<RequireAuth>` on `/dashboard`, `/alerts/*`, `/saved`, `/notifications`,
  `/profile/*`, `/track/*`; redirect to `/auth/sign-in?next=…` and return after
- Wire `SignInPage`, `CreateAccountPage`, `ForgotPasswordPage` with zod
  validation, field errors, loading and failure states
- `ProfilePage` / `EditProfilePage` / `SettingsPage` read and write real prefs
- Sign out clears session and Query cache

**Watch out:** while `status === 'loading'`, render the splash — never redirect,
or refreshing a guarded route bounces the user to sign-in.

**Done when:** a guarded route while signed out redirects and returns
post-sign-in; the session survives refresh; sign-out clears everything.

---

## Phase 6 — Search flow completion

- `AirportSearchPage`: debounced typeahead over the airport dataset, matching
  code, city and airport name; recent (persisted), nearby (geolocation with a
  graceful denial path), popular
- `DatePickerPage`: a real calendar — month grid, range selection, disabled past
  dates, min/max stay, one-way mode, and a cheapest-price hint per day from the
  engine
- `TravelersPage`: adults / children / infants with real constraints
  (infants ≤ adults, total ≤ 9) and cabin selection
- `HomePage`: validate before search (origin ≠ destination, return ≥ depart)
- Multi-city if time allows; otherwise disable the tab with a note

**Watch out:** date maths without a library is where bugs live. Either add
`date-fns` or write `lib/date.ts` with tests — do not scatter `new Date()`
arithmetic through components.

**Done when:** every search field is real, validated, and round-trips through
the URL.

---

## Phase 7 — Alerts & price tracking

The product's centrepiece.

- `TrackPricePage` creates a real `Alert` via the service, prefilled from the
  itinerary and search
- `AlertsPage`: real list, filter by status, pause/resume/edit/delete, empty state
- `EditAlertPage`: full edit including target, scope, constraints, channels
- `PriceHistoryPage`: a real SVG chart from `PriceHistory` — line, target line,
  low/high/median markers, window switcher, and the `verdict` banner
- `runAlertTick()` on load and every 60s; `useAlertTick` hook mounted once at app
  root
- `TargetReachedPage` reachable through a genuine trigger
- `DashboardPage` stats computed from real alerts

**Watch out:** build the chart by hand in SVG — the app has no chart library and
adding one for a single sparkline is not worth the bundle. Keep it token-coloured
(`--target` purple for the target line).

**Done when:** creating an alert with a target below the current price and
fast-forwarding the clock triggers it, produces a notification, and moves the
alert to `triggered`.

---

## Phase 8 — Notifications & toasts

- `ToastContext` + `useToast` + a mounted host; replace every silent success
  with a toast
- `NotificationsPage` wired to real notifications; read/unread, mark-all, clear,
  deep-links to the relevant alert
- Today / Earlier grouped at render time from `createdAt`
- Unread badge on `TabBar` from real data
- Browser Notification API: permission request from Settings, delivery on
  `target_reached`, graceful handling of denial

**Watch out:** never request notification permission on page load — ask from an
explicit user action in Settings, or browsers will block it and users resent it.

**Done when:** a triggered alert produces an in-app notification, a toast, and
(with permission) a browser notification.

---

## Phase 9 — Compare & booking hand-off

- `ComparePage`: real offers, sorted, with delta, baggage, sponsored marks,
  unavailable states, freshness, and currency-conversion disclosure
- Airline-direct always visible and labelled, even when not cheapest
- `ViewDealPage`: hand-off with a confirmation of what the user is leaving for
- `PriceChangedPage`: shown when the offer's price moved between list and tap —
  a real detected condition, not a mock screen
- `NoBookingOptionsPage`: shown when every offer is unavailable
- `CompareFlightsPage`: multi-select up to 3 itineraries, side-by-side
- Refresh-offers action with freshness stamps

**Done when:** every provider state (cheapest, sponsored, unavailable, converted,
price-changed) is reachable from generated data.

---

## Phase 10 — Polish, a11y & PWA

- Replace every `<div onClick>` with a real `<button>` (`.fw-reset-btn`)
- Focus trap and restore in `BottomSheet`; `Escape` to close
- ARIA: `aria-live` on price updates, labelled icon buttons, `aria-current` on tabs
- `prefers-reduced-motion` disables stagger, slide and pulse
- Contrast audit; ensure colour is never the sole signal
- Error boundary at the route level; a real 404 page instead of the
  redirect-to-`/` catch-all
- Skeletons for every loading surface
- PWA: manifest, icons, service worker, offline shell
- Bundle audit and route-level code splitting
- Lighthouse ≥ 90 on performance and accessibility, mobile profile

---

## Phase 11 — Desktop responsive

**Only after Phase 10.** Mobile behaviour must not regress.

- Breakpoints 768 / 1024 / 1280
- Lift the 480px cap; container widths from `--container` / `--container-narrow`
- Sidebar navigation replaces `TabBar` at ≥1024px
- Two-pane results (list + detail) at ≥1024px
- Bottom sheets become centred modals or side panels at ≥768px
- Multi-column dashboard and alerts grid
- Hover states — currently near-absent because the design is touch-first
- Keyboard shortcuts for search and navigation
- Verify every screen at 390 / 768 / 1024 / 1440

---

## Later (not scheduled)

- Real backend per `docs/specs/05-future-backend.md`
- Real flight provider integration
- Email delivery
- i18n and multi-currency with live FX
- Playwright E2E
