---
name: add-screen
description: How to add a new screen or route to the FareWatch frontend following its existing conventions — Screen/ScreenHeader shell, inline token styling, routing, bottom sheets, TabBar, and the styleguide index. Use when adding any new page, route, modal, or bottom sheet to the app.
---

# Adding a FareWatch screen

## 1. Decide what it is

**A route** — anything with its own URL: a full screen the user navigates to.
Goes in `src/pages/<area>/`, gets a `<Route>` in `App.tsx`.

**A bottom sheet** — a modal overlay owned by its parent screen (sort, filters,
travellers, confirmations). Rendered conditionally *by the parent*, not routed.
Exception: a few existing sheets are routed (`/search/dates`, `/track/:id`) —
follow the local pattern rather than "fixing" them.

Areas: `search`, `results`, `tracking`, `auth`, `dashboard`, `account`, `errors`,
`styleguide`.

## 2. The skeleton

```tsx
import { useNavigate } from 'react-router-dom';
import { Screen, ScreenHeader } from '@/components/Screen';
import { TabBar } from '@/components/TabBar';

export default function ThingPage() {
  const navigate = useNavigate();

  return (
    <Screen>
      <ScreenHeader
        onBack={() => navigate(-1)}
        title="Thing"
        subtitle="Optional context line"
      />

      <div className="fw-scroll" style={{ padding: '14px 16px' }}>
        {/* content */}
      </div>

      <TabBar active="Alerts" badge={unreadCount} />
    </Screen>
  );
}
```

Rules that hold for every screen:

- **Default export**, named `<Thing>Page`.
- `Screen` is the root — it is the 480px cap and the flex column.
- Exactly **one** `.fw-scroll` child. It's `flex: 1`; header and `TabBar` are
  `flexShrink: 0` and stay put.
- `TabBar` only on top-level tab destinations (dashboard, alerts, saved,
  notifications, profile). Detail screens don't get one.
- Route titles that are routes (`YYZ → DEL`) use `<ScreenHeader mono />`.

## 3. Route it

In `src/App.tsx`, keep the import grouped with its area and add the `<Route>` in
the matching block. Guarded areas go inside `<RequireAuth>` (from Phase 5).

```tsx
<Route path="/thing/:id" element={<ThingPage />} />
```

Paths are lowercase kebab-case. Params are `:id`, not `:thingId`, unless
disambiguation demands it.

## 4. Data

Never fetch in the screen. Call a hook:

```tsx
const { data, isPending, isError, error } = useThing(id);

if (isPending) return <ThingSkeleton />;
if (isError) return <Navigate to={errorRouteFor(error)} replace />;
```

Three states, always: loading (skeleton, not a spinner), error (mapped to an
`errors/` screen by `AppError.kind`), empty (a real designed state, not a blank
list).

**A page never imports `sim/`, `api/`, or `data/mock.ts`.** If the data you want
isn't behind a hook yet, add the service function and the hook — that's the job,
not a detour around it.

## 5. Style it

Inline objects, tokens only. See `.claude/skills/design-system` for the full rules.

```tsx
<div style={{
  background: 'var(--surface-card)',
  border: '1px solid var(--border-default)',
  borderRadius: 'var(--r-lg)',
  boxShadow: 'var(--shadow-sm)',
  padding: '14px 16px',
}}>
```

Mobile conventions: 16px screen padding, `14px 16px` card padding, 8–10px between
cards, 20px between sections.

Reach for `components/ui/*` (`Button`, `Input`, `Switch`, `Checkbox`, `Badge`,
`Skeleton`) before hand-rolling a control.

## 6. Bottom sheets

```tsx
const [sheet, setSheet] = useState<'sort' | 'filter' | null>(null);

{sheet === 'sort' && (
  <BottomSheet
    onClose={() => setSheet(null)}
    title="Sort by"
    footer={<Button size="lg" fullWidth onClick={apply}>Apply</Button>}
  >
    {/* options */}
  </BottomSheet>
)}
```

Sheets scroll internally, cap at 90vh, and get a sticky footer for their primary
action. From Phase 10 they also trap focus and close on `Escape`.

## 7. Interactive elements

Use a real `<button>`. If it needs no chrome:

```tsx
<button className="fw-reset-btn" onClick={…} style={{ textAlign: 'left' }}>
```

Not `<div onClick>` and not `<span onClick>` — both exist in the older code and
both are being removed in Phase 10. Don't add more. Icon-only buttons need
`aria-label`. Touch targets are ≥44×44px.

## 8. Register it

Add the screen to `src/pages/styleguide/StyleguideIndexPage.tsx` under its
section. A screen that isn't linked there is invisible to review.

## 9. Check it

```bash
npm run build && npm run lint && npm test
```

Then open it **at 390px**. Verify: content scrolls without the header or tab bar
moving, nothing overflows horizontally, tap targets are comfortable, and the
loading, error and empty states all render.

Do not add a desktop layout. That's Phase 11.
