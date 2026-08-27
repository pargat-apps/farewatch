---
name: design-system
description: FareWatch token and styling discipline — which CSS custom property to reach for, the semantic colour channels that must not be reused decoratively, typography and spacing conventions, and the inline-style idiom the codebase uses. Use when styling any component or screen, picking a colour, or reviewing a diff for design consistency.
---

# FareWatch styling

Source of truth: `farewatchfrontend/src/styles/tokens/*.css`.
Full reference: `docs/specs/02-design-system.md`.

## The four rules

1. **No literal colours.** `var(--action)`, never `#1B66D1`. The only legitimate
   hex in the app is an airline brand colour, and it lives in data
   (`airlines.ts`), never inline in a component.
2. **No new CSS files.** Inline style objects. `global.css` holds resets,
   keyframes and `.fw-*` utilities — nothing else.
3. **`components/ui/` before hand-rolling.** Writing a `<button>` with a
   border-radius means you wanted `<Button>`.
4. **The `font` shorthand.** `font: '600 15px/1 var(--font-sans)'` — weight, size,
   line-height, family in one property. This is the codebase idiom; match it.

## Semantic colours — do not reuse decoratively

| Token | Means, and only means |
|---|---|
| `--price-drop` / `--green-600` | A price went **down**, or a saving |
| `--price-rise` / `--red-500` | A price went **up** |
| `--target` / `--purple-600` | The **user's target price** |
| `--amber-500/600` | Warning: stale data, provider changed, availability risk |
| `--red-600` | Error, destructive action |

Purple is a semantic channel in this app. There is no such thing as a decorative
purple divider here. If you need a neutral accent, use `--action` blue or a gray.

Colour is never the *sole* signal — a price drop shows an arrow as well as green.

## Structural colours

- `--navy-900` / `--brand` — headings, primary text
- `--action` (`--blue-600`) — primary buttons, links, active tab, selection
- `--accent` (`--teal-500`) — sparingly: trust marks, the "Fastest" badge
- Text ladder: `--text-heading` → `--text-body` → `--text-muted` → `--text-faint`
- Surfaces: `--surface-page`, `--surface-card`, `--surface-sunken`, `--surface-selected`
- Borders: `--border-default` (cards), `--border-strong` (inputs, buttons),
  `--border-selected` (active choice)

`--text-faint` is for genuinely incidental metadata only. Its contrast on white is
borderline, so it must never be the only thing carrying meaning.

## Typography

Two families:
- `--font-sans` (Inter) — everything
- `--font-mono` — **airport codes and flight numbers only** (`YYZ → DEL`, `AC 42`).
  This is a signal that a string is a code, not prose. Don't mono anything else.

Common patterns:
```
Screen title       600 15px/1
Section heading    600 14px/1
Card title         600 15px/1
Body               400 14px/1.5
Secondary          400 12px/1.4    --text-muted
Metadata           400 11px/1      --text-faint
Uppercase label    600 10-11px/1 + letter-spacing: var(--track-wide) + uppercase
Headline price     800 24px/1 + letter-spacing: -0.01em
Airport code       700 13-17px/1 var(--font-mono)
```

Uppercase labels **always** carry `--track-wide`. Uppercase without tracking looks
broken at 10–11px. Text ≥20px takes negative tracking.

## Spacing

4px base. Mobile conventions:
- Screen horizontal padding **16px**
- Card padding **14px 16px**
- Gap between cards **8–10px**
- Heading to its content **10px**
- Section to section **20px**

## Radius and shadow

`--r-sm` 6 (chips) · `--r-md` 10 (buttons, inputs) · `--r-lg` 14 (cards) ·
`--r-xl` 20 (hero cards, sheets) · `--r-pill` (badges).

`--shadow-xs` (resting chip) · `--shadow-sm` (cards) · `--shadow-md` (raised) ·
`--shadow-lg` (sheets, toasts) · `--shadow-focus` (**the focus ring** — use this,
never `outline`).

## Motion

`--dur-fast` 120ms (hover, colour) · `--dur-base` 200ms (fades) · `--dur-slow`
360ms (sheet slide) · `--dur-entrance` 600ms, all with `--ease-out`.

Utility animations in `global.css`: `.fw-shimmer` (skeletons),
`.fw-card-stagger` (staggered entry, up to 6 children).

Everything must be disabled under `prefers-reduced-motion` (Phase 10).

## Data display

- Prices: `CA$1,020` — symbol attached, thousands separated
- Deltas: `+CA$39` / `−CA$39` with U+2212 minus, **not** a hyphen
- Routes: `YYZ → DEL` in mono with U+2192
- Overnight arrival: `+1` / `+2` superscript on the arrival time
- Freshness: relative under 24h ("2 min ago"), absolute beyond ("Aug 23")
- Sellers: always labelled "Official airline" or "Travel site"; sponsored offers
  carry a visible "Sponsored" mark

## Layout

```
.fw-app-shell   full width, centres its child
  .fw-screen    max-width 480px, min-height 100vh, flex column
    header      flexShrink: 0
    .fw-scroll  flex: 1 — the only scroller
    TabBar      flexShrink: 0
```

**Mobile first. No desktop layouts, breakpoints, sidebars or multi-column grids
before Phase 11.** Above 480px the screen currently gains only a border and
shadow — leave it that way.

## Reviewing a diff

- [ ] Any hex literal outside `airlines.ts`?
- [ ] Any new `.css` file or CSS import?
- [ ] Green, red or purple used for anything other than its semantic meaning?
- [ ] Mono font on something that isn't a code?
- [ ] Uppercase label without `--track-wide`?
- [ ] `<div onClick>` instead of `<button className="fw-reset-btn">`?
- [ ] `outline` instead of `--shadow-focus`?
- [ ] A hand-rolled control that `components/ui/` already provides?
- [ ] Does it hold up at 390px?
