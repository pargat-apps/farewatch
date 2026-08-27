---
name: ship-feature
description: The FareWatch branch → commit → push → PR → merge → sync loop. Use whenever starting a new phase from docs/plans/roadmap.md, or when finishing a feature and preparing to hand it to the user for review. Also use when asked to "push this", "open a PR", or "start the next phase".
---

# Shipping a FareWatch feature

One phase = one branch = one PR. The user reviews and merges on GitHub; you never
merge, and you never commit to `main`.

## Before starting

Confirm `main` is current and clean:

```bash
cd "/mnt/p/My Projects/FareWatch"
git checkout main
git pull origin main
git status
```

If `git status` shows uncommitted work, stop and ask — don't stash someone's
in-progress changes.

## 1. Branch

Name it after the phase in `docs/plans/roadmap.md`:

```bash
git checkout -b feat/<phase-slug>
```

`feat/` for features, `fix/` for bugs, `chore/` for tooling and docs.

## 2. Build

Work through the phase plan (`docs/plans/phase-NN-*.md`) in order. Keep the
branch scoped to that phase — if you find an unrelated bug, note it in the PR
body rather than fixing it here.

## 3. Verify — every time, no exceptions

```bash
cd farewatchfrontend
npm run build    # tsc -b && vite build — type errors are build errors
npm run lint
npm test         # from Phase 1 onward
```

Then look at it at **390px** in the browser. The build passing is not the same
as the screen being right.

## 4. Commit

Small, coherent commits. Conventional-commit prefixes. Body explains *why*, not
*what* — the diff already says what.

```
feat(sim): add mean-reverting price walk

Prices need to move between sessions so alerts have something to detect.
A pure random walk drifts to absurd values over weeks, so this pulls toward
the fare-engine base with θ=0.15 and adds occasional flash-sale shocks.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01Ub4JWhHodJYVvKePwFf2oR
```

## 5. Push and open the PR

```bash
git push -u origin feat/<phase-slug>

gh pr create --base main --title "<type>(<scope>): <summary>" --body "$(cat <<'EOF'
## What

<one paragraph>

## Why

<link to the phase in docs/plans/roadmap.md>

## Changes

- …

## Verification

- [ ] `npm run build` passes
- [ ] `npm run lint` clean
- [ ] `npm test` passes
- [ ] Checked at 390px
- [ ] <phase-specific acceptance criteria>

## Notes for review

<anything surprising, deferred, or worth a second opinion>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01Ub4JWhHodJYVvKePwFf2oR
EOF
)"
```

## 6. Stop and hand off

Give the user the PR URL and a short summary of what to look at. **Then stop.**

Do not merge. Do not start the next phase. Do not pull `main`.

## 7. Ask before syncing

Once the user comes back, ask explicitly:

> Has the PR been merged and the branch deleted?

Wait for a real answer. "I'll merge it later" is not yes.

**Only after they confirm:**

```bash
cd "/mnt/p/My Projects/FareWatch"
git checkout main
git pull origin main
git branch -d feat/<phase-slug>          # local cleanup
git remote prune origin
git log --oneline -3                      # confirm the merge landed
```

Then update the status table in `docs/plans/roadmap.md` and start the next phase.

## If the user asks for changes

Stay on the branch, make the changes, verify again, commit, push. The PR updates
itself. Don't open a second PR.

## Never

- Commit or push to `main`
- Merge your own PR
- Pull `main` before the user confirms the merge
- Bundle two phases into one branch
- Push with a failing build
