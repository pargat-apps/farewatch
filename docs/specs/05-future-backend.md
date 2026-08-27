# Future Backend — NOT BEING BUILT

> **Status: deferred by explicit decision.** `farewatchbackend/` stays empty.
> Do not implement any of this unless the user asks for it directly.
>
> This document exists for one reason: so the frontend being written today is
> shaped to accept this backend later without rework. It is a target to design
> *toward*, not a task list.

## Agreed stack

| Concern | Choice |
|---|---|
| Runtime | Node.js + Express + TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | JWT access + refresh tokens, bcrypt password hashing |
| Validation | zod (shared with the frontend) |
| Jobs | node-cron for price polling |
| Flight data | Simulated engine ported from `src/sim/`, real provider APIs later |

Chosen because it shares a language and validation schemas with the frontend,
Postgres suits the alert/price-history relational and time-series queries, and
the whole thing deploys free on Render, Railway or Fly.

## API surface

These paths mirror `src/services/*.service.ts` one-to-one. **If a service
function is added to the frontend, add its endpoint here** — that correspondence
is what makes the eventual swap mechanical.

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/refresh
POST   /api/auth/logout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
GET    /api/auth/me

GET    /api/airports?q=&limit=
GET    /api/airports/nearby?lat=&lon=

POST   /api/search                    → SearchResult
GET    /api/itineraries/:id           → Itinerary
GET    /api/itineraries/:id/offers    → ProviderOffer[]

GET    /api/alerts
POST   /api/alerts
GET    /api/alerts/:id
PATCH  /api/alerts/:id                 (edit, pause, resume)
DELETE /api/alerts/:id
GET    /api/alerts/:id/history?window= → PriceHistory

GET    /api/notifications
PATCH  /api/notifications/:id/read
POST   /api/notifications/read-all
DELETE /api/notifications

GET    /api/saved
POST   /api/saved
DELETE /api/saved/:id

GET    /api/me/preferences
PATCH  /api/me/preferences
```

## Data model sketch

Prisma models follow `04-domain-model.md`. Notable shapes:

- `User` 1—n `Alert` 1—n `PricePoint`
- `PricePoint` is append-only and partitioned or indexed on `(alertId, at)` —
  it is by far the highest-volume table
- `Provider` and `Airport` are reference tables, seeded not user-written
- `Money` stores as `amountMinor Int` + `currency String`, never `Float`

## Migration path

1. Port `src/sim/` to the server largely unchanged — it has no React or DOM
   dependencies precisely so this is possible.
2. Implement the endpoints above against it.
3. Frontend: write `src/api/client.ts`, then change each `services/*.service.ts`
   body from a `sim` call to an `api` call. Signatures do not change.
4. Delete `src/sim/` from the frontend.
5. Replace the frontend's simulated `Session` minting with real token handling —
   `AuthContext` already expects the same `Session` shape, so this is confined to
   `auth.service.ts`.
6. Move the alert tick from a client hook to a `node-cron` job.

Steps 3–6 should touch **zero files under `src/pages/`**. If they don't, the
layering rule in `01-frontend-architecture.md` was violated somewhere, and that's
the thing to fix.

## Security notes (for when this is built)

- bcrypt cost ≥ 12; never log or return password hashes
- Access tokens ~15min; refresh tokens rotated on use, revocable, stored hashed
- Refresh token in an httpOnly SameSite=Strict cookie, not `localStorage`
- Rate-limit `/api/auth/*` and `/api/search`
- Validate every request body with zod at the edge
- CORS restricted to known frontend origins
- Never proxy a provider deep-link through the server in a way that could leak
  user identifiers to sellers
