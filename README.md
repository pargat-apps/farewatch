# FareWatch

**Live demo: [farewatch-beryl.vercel.app](https://farewatch-beryl.vercel.app/)** — open it on a phone, or narrow your browser to ~390px.

Flight metasearch and price alerts. Search a route, compare its price across
airlines and travel sites, set the maximum you're willing to pay, and get alerted
when a matching fare appears — then pick which provider to book with.

> **Frontend-only, running on simulated data.** There is no backend and no real
> flight API. A deterministic fare engine in the browser generates itineraries,
> provider offers, and price movement over time — enough to build and test the
> whole product, including alerts that fire days after they're created.

## Layout

```
FareWatch/
├── farewatchfrontend/     React 19 + TypeScript + Vite — the app
├── farewatchbackend/      empty; deferred by design
└── docs/
    ├── specs/             what we're building and why
    └── plans/             how, phase by phase
```

## Getting started

```bash
cd farewatchfrontend
npm install
npm run dev
```

Open http://localhost:5173. **Use a mobile viewport (390px)** — the app is built
mobile-first and desktop layouts come last.

`/styleguide` indexes every screen in the app, which is the fastest way to see
what exists without walking the user flow.

```bash
npm run build   # tsc -b && vite build — the gate that must stay green
npm run lint    # oxlint
npm test        # from Phase 1 onward
```

## Where things are

```
farewatchfrontend/src/
├── components/ui/   design-system primitives
├── components/      shared app components
├── pages/<area>/    one file per screen
├── styles/tokens/   the design system, as CSS custom properties
├── services/        the data contract (what a backend must satisfy)
├── sim/             the simulated engine behind that contract
├── hooks/           TanStack Query wrappers
└── state/           React contexts
```

The layering is the point: `pages → hooks → services → sim`. Screens never touch
the data source directly, so replacing the simulator with a real API later
shouldn't change a single screen.

## Docs

| | |
|---|---|
| [Product spec](docs/specs/00-product-spec.md) | What it does and for whom |
| [Frontend architecture](docs/specs/01-frontend-architecture.md) | How the code is layered |
| [Design system](docs/specs/02-design-system.md) | Tokens and styling rules |
| [Simulation engine](docs/specs/03-simulation-engine.md) | How fake flight data is generated |
| [Domain model](docs/specs/04-domain-model.md) | The shared type vocabulary |
| [Future backend](docs/specs/05-future-backend.md) | Deferred — design target only |
| [Roadmap](docs/plans/roadmap.md) | Phases, branches, acceptance criteria |

`CLAUDE.md` at the root and in `farewatchfrontend/` carry the working conventions.

## Contributing

One phase from the roadmap = one branch = one PR against `main`. CI runs lint,
tests and a type-checking build on every PR. Mobile first — nothing gets a
desktop layout before Phase 11.

## Deployment

Hosted free on [Vercel](https://vercel.com), building `farewatchfrontend/` as a
static Vite SPA. `farewatchfrontend/vercel.json` rewrites every path to
`index.html` so client-side routes (e.g. `/dashboard`, `/styleguide`) work on a
direct load or refresh, not just via in-app navigation.

## Status

Phase 0 (foundation) in review. Phase 1 (toolchain) next. Live demo deployed
from `main`.

## License

Private project. Not licensed for redistribution.
