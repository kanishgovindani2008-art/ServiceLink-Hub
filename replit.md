# Servelink

Servelink is a local service marketplace demo that helps customers find nearby professionals, describe repair needs, compare sample profiles, and request bookings.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

- This milestone is intentionally a browser-local demo; bookings and profile edits remain in localStorage until shared persistence and account access are configured.
- Problem matching is keyword-based demo logic. Uploaded photos are displayed for context but are not analyzed.
- Sample professionals, ratings, and portfolio entries are illustrative, not verified real-world claims.
- Demo phone numbers are intentionally unset, so calls are unavailable until a professional provides a real number.

## Product

Customers can browse nine service categories, search and filter professionals, get rule-based service suggestions, request bookings, and review completed demo bookings. Professionals can edit a sample profile, manage portfolio entries, and update booking statuses.

## User preferences

- Do not claim sample profiles, reviews, portfolio work, certifications, phone numbers, or AI photo analysis are real or verified.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
