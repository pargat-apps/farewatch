# farewatchfrontend

React 19 + TypeScript + Vite. The whole FareWatch app lives here.

Read `../CLAUDE.md` first for project-wide rules. This file covers frontend detail.

## Stack

| Concern | Choice | Note |
|---|---|---|
| Framework | React 19 | Function components + hooks only |
| Language | TypeScript (strict-ish) | `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly` are on |
| Build | Vite 8 | `npm run build` = `tsc -b && vite build` |
| Routing | react-router-dom 7 | `BrowserRouter`, one route per screen |
| Styling | Inline style objects + CSS custom properties | No framework, no CSS-in-JS lib |
| Lint | oxlint | `.oxlintrc.json` |
| Server state | TanStack Query *(Phase 3)* | Not installed yet |
| Validation | zod *(Phase 1)* | Not installed yet |
| Tests | Vitest + Testing Library *(Phase 1)* | Not installed yet |

## Layering — the rule that matters most

```
pages/  ──►  hooks/  ──►  services/  ──►  sim/        (today)
                                     └──►  api/       (when a backend exists)
```

- **`pages/`** render and navigate. They may import `components/`, `hooks/`,
  `state/`, `lib/`. They may **not** import `sim/`, `api/`, or `data/`.
- **`hooks/`** wrap services in TanStack Query. They own caching, retries, and
  the loading/error/empty tri-state the screens render.
- **`services/`** are the contract: plain async functions returning domain types
  from `services/types.ts`. Their signatures are what a real backend must satisfy.
- **`sim/`** is the disposable half. Deterministic generation, `localStorage`
  persistence, fake latency, injectable errors. Deleting this folder and pointing
  `services/` at `api/` is the entire migration to a real backend.

If you find yourself importing `sim/` from a page to "just get the data quickly",
that is the one shortcut that breaks the project's whole design. Add the service
function instead.

## Styling rules

Read `../docs/specs/02-design-system.md` for the full set. The short version:

```tsx
// Yes
<div style={{ font: '600 15px/1 var(--font-sans)', color: 'var(--navy-900)' }} />

// No — literal colour
<div style={{ color: '#0A2540' }} />

// No — new CSS file
import './MyComponent.css'
```

- Airport codes and flight numbers use `var(--font-mono)`. Everything else
  uses `var(--font-sans)`.
- Prices use the `--price-*` weights: extrabold, tight tracking.
- Green (`--price-drop`) means the price fell. Red (`--price-rise`) means it rose.
  Purple (`--target`) always and only means the user's target price. Do not
  reuse these colours decoratively.
- Reach for `components/ui/*` before hand-rolling a control.

## Screen anatomy

```tsx
export default function ThingPage() {
  const navigate = useNavigate();
  return (
    <Screen>
      <ScreenHeader onBack={() => navigate(-1)} title="Thing" subtitle="…" />
      <div className="fw-scroll" style={{ padding: '14px 16px' }}>
        {/* content */}
      </div>
      <TabBar active="Alerts" badge={unreadCount} />
    </Screen>
  );
}
```

`Screen` is the 480px-capped flex column. `fw-scroll` is the one growing,
scrolling child. Header and `TabBar` are `flexShrink: 0` and stay put.

## Gotchas in the existing code

- `state/AppState.tsx` starts with `isSignedIn: true` and holds everything in
  memory — it resets on refresh. Phases 4 and 5 replace this.
- `data/mock.ts` is hardcoded and shaped for display (prices are strings like
  `'1,020'`, `stopsColor` is a CSS var). The real domain model in
  `services/types.ts` uses numbers and enums. Do not copy the display-shaped
  types forward.
- `components/ui/Toast.tsx` is presentational only — nothing mounts or queues it.
  A `ToastProvider` arrives in Phase 8.
- `FlightCard` has `YYZ`/`DEL` and provider prices hardcoded in its markup.
  Phase 3 makes these props.
- Several `errors/` screens are unreachable by design and linked only from
  `/styleguide`.

## Before you commit

```bash
npm run build   # must pass — it type-checks
npm run lint    # must be clean
npm run test    # once Phase 1 lands
```
