# FareWatch — mobile web app

A React + TypeScript + Vite implementation of the FareWatch mobile UI mockups
(`../FareWatch Mobile UI.dc.html`), built against the FareWatch Design System
tokens (`../_ds/farewatch-design-system-.../tokens/*.css`).

FareWatch is a flight metasearch and price-alert platform: search a route,
compare its price across supported airlines and travel sites, track a fare
against a budget, and get alerted when a matching price appears — then choose
which provider to finish booking with.

## Stack

- React 19 + TypeScript, built with Vite
- react-router-dom for client-side routing (one route per screen)
- No CSS framework — DS tokens are plain CSS custom properties
  (`src/styles/tokens/*.css`, copied from the design bundle) consumed via
  inline styles, matching the mockup's own approach
- All state is in-memory React context (`src/state/AppState.tsx`) — there is
  no backend; alert/notification/saved-search data is realistic dummy data

## Layout

- `src/components/ui/` — ports of the design system's core components
  (Button, Input, Checkbox, Switch, Badge, Toast, Skeleton)
- `src/components/` — shared app components (TabBar, FlightCard, ProviderCard,
  BottomSheet, Screen/ScreenHeader, icon set)
- `src/pages/<area>/` — one file per screen, grouped the same way as the
  original canvas (search, results, tracking, auth, dashboard, account, errors)
- `src/pages/styleguide/` — a small in-app index (`/styleguide`) linking every
  screen, plus the component/toast/tab-bar reference sheets from section H of
  the canvas. Handy for reviewing the full set without reconstructing the user
  flow by hand.
- `src/data/mock.ts` — the dummy flights/providers/alerts/notifications data
- `src/state/AppState.tsx` — app-wide state (search form, alerts, notifications,
  saved searches) shared across routes

## Running it

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check + production build
npm run lint      # oxlint
```

## Notes on scope

- Every screen from the design canvas (42 screens across sections A–H) is
  implemented as a real, navigable route — see `/styleguide` for the full index.
- Bottom-sheet screens (date picker, travelers, sort, filters, track price,
  etc.) are wired as functional overlays rather than static mockup states.
- A few edge-case screens (network/search/alert error, price-changed, no
  booking options, target-reached) aren't reachable through a real backend
  event in this frontend-only build, so they're linked directly from
  `/styleguide` and from small in-context "demo" links (e.g. on the compare
  screen) rather than left unreachable.
- Empty states for alerts/notifications/saved searches are real: deleting
  every row (or clearing all notifications) shows the actual empty state.
