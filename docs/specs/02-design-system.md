# Design System

Status: current — this describes code that already exists

Source of truth: `farewatchfrontend/src/styles/tokens/*.css`. Those files are the
system. This document explains how to use them.

## Rules

1. **No literal colours in components.** `var(--action)`, never `#1B66D1`.
   The one exception is airline brand colours, which live in data (`color: '#D22630'`
   on an airline record), never inline in a component.
2. **No new CSS files.** Style with inline objects. `global.css` holds resets,
   keyframes and `.fw-*` utilities — nothing else belongs there.
3. **Compose from `components/ui/` first.** If you're writing `<button>` with a
   border-radius, you wanted `<Button>`.
4. **The `font` shorthand carries weight, size, line-height and family together.**
   `font: '600 15px/1 var(--font-sans)'`. This is the codebase's idiom — match it
   rather than setting four separate properties.

## Colour

### Brand and action
| Token | Use |
|---|---|
| `--navy-900` / `--brand` | Headings, primary text on light, brand surfaces |
| `--action` (`--blue-600`) | Primary buttons, links, active tab, selection |
| `--action-hover` (`--blue-700`) | Hover/pressed state of the above |
| `--accent` (`--teal-500`) | Sparingly — trust marks, the "Fastest" badge |

### Semantic — these carry meaning, do not reuse decoratively
| Token | Means, and only means |
|---|---|
| `--price-drop` (`--green-600`) | A price went **down**, or a saving |
| `--price-rise` (`--red-500`) | A price went **up** |
| `--target` (`--purple-600`) | The **user's target price**. Nothing else is purple. |
| `--amber-500/600` | Warning: stale data, provider changed, availability risk |
| `--red-600` | Error and destructive actions |

If a designer asks for "a purple divider", the answer is no. Purple is a
semantic channel in this app.

### Text
`--text-heading` → `--text-body` → `--text-muted` → `--text-faint`, in
descending prominence. `--text-faint` is for genuinely incidental metadata
(timestamps, footnotes) and must never be the sole carrier of meaning — its
contrast on white is borderline.

### Surfaces
`--surface-page` (the app background), `--surface-card` (white), `--surface-sunken`
(inset panels), `--surface-selected` (`--blue-50`, selected rows).

Borders: `--border-default` for card edges, `--border-strong` for input and
button outlines, `--border-selected` for the active choice.

## Typography

Two families. `--font-sans` (Inter) for everything, `--font-mono` for **airport
codes and flight numbers only** — `YYZ → DEL`, `AC 42`. This is a deliberate
signal that a string is a code, not prose. Do not mono anything else.

Scale: `--text-xs` 12 · `--text-sm` 13 · `--text-base` 14 · `--text-md` 15 ·
`--text-lg` 17 · `--text-xl` 20 · `--text-2xl` 24 · `--text-3xl` 30 ·
`--text-4xl` 38 · `--text-5xl` 48.

Roles worth knowing:

```css
--h3:           600 20px/1.3   /* screen section headings */
--body:         400 15px/1.5   /* default */
--body-sm:      400 13px/1.5   /* secondary copy */
--label:        600 12px/1     /* + uppercase + --track-wide */
--price-lg:     800 24px/1     /* the headline price on a card */
--airport-code: 700 17px/1 mono
```

Uppercase labels **always** pair with `letter-spacing: var(--track-wide)`.
Uppercase without tracking looks broken at 10–11px.

Large text (≥20px) uses negative tracking (`--track-tight` / `--track-snug`).

## Spacing

4px base: `--sp-1` 4 · `--sp-2` 8 · `--sp-3` 12 · `--sp-4` 16 · `--sp-5` 20 ·
`--sp-6` 24 · `--sp-8` 32 · `--sp-10` 40 · `--sp-12` 48.

Mobile conventions in this app:
- Screen horizontal padding: **16px**
- Card internal padding: **14px 16px**
- Gap between stacked cards: **8–10px**
- Gap between a section heading and its content: **10px**
- Section separation: **20px**

## Radius, shadow, motion

Radius: `--r-sm` 6 (chips, small marks) · `--r-md` 10 (buttons, inputs) ·
`--r-lg` 14 (cards) · `--r-xl` 20 (hero cards, sheets) · `--r-pill` (chips, badges).

Shadow: `--shadow-xs` (a resting chip) · `--shadow-sm` (cards) ·
`--shadow-md` (raised) · `--shadow-lg` (sheets, toasts, modals) ·
`--shadow-focus` (the focus ring — use this, never `outline`).

Motion: `--dur-fast` 120ms (hover, colour) · `--dur-base` 200ms (fades) ·
`--dur-slow` 360ms (sheet slide) · `--dur-entrance` 600ms (screen entry), all with
`--ease-out`. Everything must be disabled under `prefers-reduced-motion`.

## Components

### `ui/` primitives
| Component | Notes |
|---|---|
| `Button` | `variant`: primary, secondary, ghost, danger · `size`: sm, md, lg · `loading`, `icon`, `fullWidth` |
| `Input` / `Field` | `label`, `hint`, `error`, `prefix`. `error` overrides `hint`. |
| `Checkbox`, `Switch` | Controlled only |
| `Badge` | Status pills |
| `Toast` | `tone`: info, success, warning, error. Presentational — a provider mounts it (Phase 8). |
| `Skeleton` | Shape placeholder; pairs with `.fw-shimmer` |

### App components
| Component | Notes |
|---|---|
| `Screen` | The 480px-capped flex column. Every screen's root. |
| `ScreenHeader` | Back button, title, subtitle, right slot. `mono` for route titles. |
| `BackButton` | 40×40 tap target |
| `TabBar` | 5 tabs, badge on Notifications. Bottom of guarded screens. |
| `BottomSheet` | Overlay + sheet, grab handle, optional title and sticky footer |
| `FlightCard` | An itinerary row with a provider preview |
| `ProviderCard` | A seller's offer: price, delta, baggage, freshness |
| `AirlineMark` | The square airline monogram |
| `icons.tsx` | 24×24 stroke icons via a shared `base()` — add new icons here |

### Utility classes (`global.css`)
`.fw-screen` · `.fw-scroll` · `.fw-sheet` / `.fw-sheet-overlay` ·
`.fw-shimmer` · `.fw-card-stagger` (staggered entry for up to 6 children) ·
`.fw-reset-btn` (an unstyled button — use this to make a `<div onClick>` a real
button) · `.fw-focusable`.

## Layout

Mobile first, always:

```
.fw-app-shell   full width, centres its child
  .fw-screen    max-width 480px, min-height 100vh, flex column
    header      flexShrink: 0
    .fw-scroll  flex: 1, the only scroller
    TabBar      flexShrink: 0
```

Above 480px the screen gains only a border and shadow. **Do not add desktop
layouts before Phase 11.** When that phase arrives it will introduce breakpoints
at 768 / 1024 / 1280 and replace `TabBar` with a sidebar at ≥1024 — not before.

## Data-display conventions

- Prices: `CA$1,020` — symbol attached, thousands separated (`lib/format.ts`).
- Price deltas: `+CA$39` / `−CA$39` using U+2212 minus, not a hyphen.
- Routes: `YYZ → DEL` in mono with U+2192.
- Overnight arrivals: a `+1` / `+2` superscript on the arrival time.
- Freshness: relative ("2 min ago") under 24h, absolute ("Aug 23") beyond.
- Airline direct offers are always labelled "Official airline"; everything else
  is "Travel site". Sponsored offers carry a visible "Sponsored" mark.
