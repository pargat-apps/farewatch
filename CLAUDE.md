# FareWatch

Flight metasearch and price-alert app. Search a route, compare its price across
airlines and travel sites, set a target price, get alerted when a matching fare
appears, then choose which provider to finish booking with.

## Current state — read this first

**This is a frontend-only project right now.** There is no backend, no database,
and no real flight API. All data comes from a *simulated fare engine* that runs
in the browser. This is deliberate, not a gap to be filled in opportunistically.

- `farewatchfrontend/` — the app. React 19 + TypeScript + Vite. **All work happens here.**
- `farewatchbackend/` — empty placeholder. **Do not build anything here** unless
  the user explicitly asks. See `docs/specs/05-future-backend.md` for the agreed
  future shape (Express + Prisma + PostgreSQL + JWT/bcrypt) — that spec exists so
  today's frontend is *shaped to accept* a backend later, not so someone builds it now.

## Mobile first, desktop later

Every screen is designed and built for a ~390px viewport first. The app shell
(`.fw-screen`) caps at `max-width: 480px` and centres itself; above 480px it only
gains a border and shadow.

**Do not add desktop layouts, sidebars, or multi-column grids** until the desktop
phase (Phase 11 in `docs/plans/roadmap.md`). If a change would look wrong at 390px,
it is wrong. Test at 390px before anything else.

## Where things live

```
farewatchfrontend/src/
  components/ui/   Design-system primitives (Button, Input, Switch, Checkbox,
                   Badge, Toast, Skeleton). Ports of the DS spec — change with care.
  components/      Shared app components (Screen, ScreenHeader, TabBar, FlightCard,
                   ProviderCard, BottomSheet, icons).
  pages/<area>/    One file per screen. Areas: search, results, tracking, auth,
                   dashboard, account, errors, styleguide.
  styles/tokens/   Design tokens as CSS custom properties. The source of truth
                   for every colour, font, space and shadow in the app.
  data/mock.ts     Legacy hardcoded fixtures. Being replaced by src/sim/ — do not
                   add to this file.
  state/           React context providers.
  lib/             Small pure helpers.
```

Planned additions (see the roadmap): `src/services/` (the interface the UI talks
to), `src/sim/` (the simulated engine behind that interface), `src/hooks/`
(TanStack Query wrappers), `src/api/` (the HTTP client that replaces `sim/` later).

## Non-negotiable conventions

**Design tokens, never literals.** Write `var(--action)`, not `#1B66D1`. Write
`var(--sp-4)` or `16`, not a magic number pulled from nowhere. The only hex codes
allowed in `.tsx` are airline brand colours, which live in data, not in components.
Full rules: `docs/specs/02-design-system.md`.

**Inline style objects, not CSS files.** The app has no CSS framework and no CSS
modules. Components style themselves with `style={{ ... }}` referencing tokens.
`global.css` holds only resets, keyframes, and the handful of `.fw-*` utility
classes. Match this — do not introduce Tailwind, styled-components, or `.module.css`.

**Pages never import from `sim/` or `data/`.** Pages call hooks; hooks call
services; services call the engine. That boundary is the entire reason a real
backend can be dropped in later without touching a single screen.

**Screens are routes.** Every screen is a `<Route>` in `App.tsx` and a default
export under `pages/<area>/`. Bottom sheets are overlays rendered by their parent
screen, not separate routes — except where the existing code already does otherwise.

**Keep the styleguide honest.** `/styleguide` indexes every screen. A new screen
that isn't linked there is invisible to review.

## Working agreements

- **One feature per branch.** Branch off `main`, push, open a PR, and stop. The
  user reviews and merges on GitHub, then deletes the branch.
- **Ask before syncing.** After pushing a branch, ask the user whether the PR was
  merged and the branch deleted. Only after they confirm, pull `main` and start
  the next phase. Never assume a merge happened.
- **Never commit to `main` directly.**
- **`npm run build` must pass** before any commit. It runs `tsc -b`, so type
  errors are build errors.

The full loop is in `.claude/skills/ship-feature/SKILL.md`.

## Commands

```bash
cd farewatchfrontend
npm install
npm run dev       # dev server
npm run build     # tsc -b && vite build — the gate that must stay green
npm run lint      # oxlint
```

## Docs

| File | What it answers |
|---|---|
| `docs/specs/00-product-spec.md` | What the product does and for whom |
| `docs/specs/01-frontend-architecture.md` | How the code is layered, and why |
| `docs/specs/02-design-system.md` | Tokens, components, styling rules |
| `docs/specs/03-simulation-engine.md` | How fake flight data is generated |
| `docs/specs/04-domain-model.md` | The types everything agrees on |
| `docs/specs/05-future-backend.md` | The backend we are *not* building yet |
| `docs/plans/roadmap.md` | Phases, branches, acceptance criteria |

## Skills

- `add-screen` — adding a screen or route the way this codebase does it
- `design-system` — token and styling discipline
- `sim-data` — extending the simulated fare engine
- `ship-feature` — the branch → PR → merge → sync loop
