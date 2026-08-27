# Phase 1 — Toolchain & Quality Gates

Branch: `feat/toolchain` · Depends on: Phase 0 merged

## Goal

Make `npm run build` and `npm test` mean something, before any app code changes.
Every later phase leans on this.

No feature work. No UI changes. If a screen looks different at the end of this
branch, something went wrong.

## Steps

### 1. Baseline
```bash
cd farewatchfrontend
npm install
npm run build   # must pass before you change anything
npm run dev     # sanity-check a few routes at 390px
```
Verified green as of Phase 0: build succeeds, lint reports two
`react/only-export-components` warnings (`AppState.tsx`, `ui/Input.tsx`) and no
errors, bundle is 421 kB / 105 kB gzipped. Those two warnings are worth clearing
in this branch by moving the non-component exports into their own files.

Also rename the package: `package.json` still says `"name": "app"` from the Vite
template. Make it `"farewatch-frontend"`.

### 2. Dependencies
```bash
npm i zod
npm i -D vitest @vitest/coverage-v8 jsdom \
        @testing-library/react @testing-library/user-event @testing-library/jest-dom \
        prettier
```
Not TanStack Query yet — that's Phase 3.

### 3. Path alias

`tsconfig.app.json`:
```json
"baseUrl": ".",
"paths": { "@/*": ["src/*"] }
```

`vite.config.ts`:
```ts
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```

Also add it to `vitest`'s config so tests resolve it.

Do **not** rewrite existing relative imports in this branch — that's churn that
buries the real diff. New code uses `@/`; old code migrates as it's touched.

### 4. Strict TypeScript

In `tsconfig.app.json`:
```json
"strict": true,
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true
```

This will produce errors in existing files. Expect them in:
- `ResultsPage.tsx` — the regex matches (`m[1]`, `m[2]`) become `string | undefined`
- anywhere `useParams()` destructures an id
- `data/mock.ts` optional fields read without a guard

**Fix them properly.** Narrow, guard, or provide a default. No `!` assertions and
no `@ts-ignore` — the point of this branch is to stop shipping those.

### 5. Vitest

`vitest.config.ts` (or merge into `vite.config.ts`):
```ts
test: {
  environment: 'jsdom',
  setupFiles: ['./src/test/setup.ts'],
  globals: true,
  coverage: { reporter: ['text', 'html'], exclude: ['src/pages/styleguide/**'] },
}
```

`src/test/setup.ts` imports `@testing-library/jest-dom/vitest`.

Scripts:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
"format:check": "prettier --check \"src/**/*.{ts,tsx,css}\""
```

### 6. Prettier

`.prettierrc` matched to the existing code so this branch doesn't reformat
everything:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 130,
  "tabWidth": 2
}
```
Run `npm run format:check` and confirm it's already close to clean. If it wants
to reformat hundreds of lines, widen `printWidth` rather than committing the
churn — a formatting-only diff across 90 files makes the PR unreviewable.

### 7. Env config

`src/config/env.ts`:
```ts
import { z } from 'zod'

const schema = z.object({
  VITE_SIM_SEED: z.coerce.number().optional(),
  VITE_SIM_LATENCY: z.coerce.boolean().default(true),
  VITE_SIM_ERROR_RATE: z.coerce.number().min(0).max(1).default(0.02),
})

export const env = schema.parse(import.meta.env)
```
Plus `.env.example` documenting each. Nothing else reads `import.meta.env` directly.

### 8. First tests

Two, to prove the harness works:

- `src/lib/format.test.ts` — `money()` and `signedMoney()`, including the U+2212
  minus and thousands separators
- `src/App.test.tsx` — render `<App />` inside `MemoryRouter` + `AppStateProvider`,
  assert the splash screen renders

### 9. CI

`.github/workflows/ci.yml` — already added in Phase 0; verify it passes and adjust
the test step now that tests exist.

## Acceptance

- [ ] `npm run build` passes with `strict: true` and zero suppressions
- [ ] `npm test` runs and passes
- [ ] `npm run lint` clean
- [ ] `npm run format:check` clean
- [ ] CI green on the PR
- [ ] `@/` alias resolves in both Vite and Vitest
- [ ] No visual change to any screen

## Traps

- **`strict` fallout is the whole job.** Budget most of the branch for it.
- Don't add TanStack Query here — it lands with the hooks that need it.
- Don't mass-rewrite imports to `@/`.
- Don't let Prettier reformat the codebase; tune the config to match instead.
