# Caritas Sports Association

A mobile-first Next.js PWA starter for the Caritas Sports Association (CSA), with the Caritas Football Association (CFA) as the first flagship sport.

## Current state

This is the **UI and architecture foundation**, not a finished production management system.

Included:
- Premium dark sports design system (charcoal / olive / lime; no gradients or emoji icons).
- Responsive public homepage, sports directory, fixtures, teams, athletes, news and dashboard screens.
- Mobile bottom navigation and desktop sidebar.
- Reusable cards, status pills, page headers and navigation.
- TypeScript domain models and application/repository boundaries.
- PostgreSQL migration starter and repeatable seed data for the initial sports and CFA teams/fixtures.
- PWA manifest and install-prompt foundation.
- Documentation for the next implementation stages.

Not yet connected:
- Authentication and role enforcement.
- Supabase database/storage/realtime.
- Real media uploads.
- Live scores and TikTok embed provider.
- Production push notifications.
- Full create/edit/delete admin workflows.

## Requirements

- Node.js 20.9+
- npm 10+

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Build check

```bash
npm run typecheck
npm run build
```

## Project structure

```text
src/
  app/                    Next.js App Router pages
  components/
    layout/                Public/admin shell and navigation
    ui/                    Reusable interface primitives
    sports/                Sports, team, match and athlete components
  domain/                  Framework-independent entities and contracts
  application/             Use cases / service boundaries
  infrastructure/          Provider adapters (Supabase later)
  lib/                     Mock data and shared utilities
database/
  migrations/              PostgreSQL schema migrations
  seeds/                   Initial sports and CFA schedule
docs/
  ARCHITECTURE.md
  DATABASE.md
  DESIGN_SYSTEM.md
  ANTIGRAVITY_HANDOFF.md
```

## Important implementation rules

1. Keep React components independent of Supabase SDK calls.
2. Put business rules in `domain/` and `application/`.
3. Implement database access behind repository interfaces in `infrastructure/`.
4. Keep sport-specific scoring behind sport module contracts. Do not force all sports into football's goal model.
5. Never fabricate match results or athlete statistics.
6. Enforce authorization on the server and in PostgreSQL policies; hiding UI controls is not security.
7. Keep migration files versioned. `IF NOT EXISTS` alone does not make every schema alteration safe to rerun.
8. Keep user-uploaded images in object storage, not PostgreSQL bytea columns.
9. Treat athlete identity separately from participation in a sport or team.
10. Public birth-date data should expose day/month only, never the birth year.

## Suggested next steps

1. Review `docs/ANTIGRAVITY_HANDOFF.md` and give it to Antigravity alongside this repository.
2. Implement Supabase Auth and server-side session handling.
3. Apply the database migration in a disposable development database first.
4. Implement role/permission tables and RLS policies before exposing admin writes.
5. Replace mock data incrementally with application services and repository adapters.
6. Implement football first, then validate the sport-module pattern with badminton and athletics.
