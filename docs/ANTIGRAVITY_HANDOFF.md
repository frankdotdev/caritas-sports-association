# Antigravity handoff — continue from this repository

You are continuing an existing Next.js project for Caritas Sports Association. Do not discard or regenerate the repository from scratch.

## First task: inspect before editing

1. Read `README.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE.md` and `docs/DESIGN_SYSTEM.md`.
2. Inspect the existing routes, components, tokens and domain contracts.
3. Run `npm install`, `npm run typecheck` and `npm run build`.
4. Fix genuine issues while preserving the visual direction.
5. Do not replace the design with a generic dashboard template.

## Product brief

CSA is the parent sports association. CFA is its football division. Football is the first fully implemented sport; basketball, volleyball, badminton, table tennis and athletics must fit the same extensible engine.

The UI foundation currently includes public routes:
- `/`
- `/sports`
- `/fixtures`
- `/teams`
- `/athletes`
- `/news`
- `/dashboard`

The screens currently use typed local mock data. This is deliberate: implement the database and application boundaries before wiring live services.

## Non-negotiable design

- Dark charcoal / olive surfaces.
- Lime `#B8FF16` accent.
- No gradients.
- No emoji icons.
- Lucide icons.
- Mobile-first, app-like layout.
- Bottom navigation on mobile.
- Responsive desktop sidebar.
- High-quality sports photography, real uploaded images when supplied.
- Consistent spacing, radii, typography and interaction states.

## Architecture requirements

- Keep UI components free of direct Supabase queries.
- Use domain and application layers.
- Use repository interfaces.
- Put Supabase in infrastructure adapters only.
- PostgreSQL is the source-of-truth database.
- Keep schema portable to Supabase, Neon and self-hosted PostgreSQL.
- Keep auth, storage and realtime behind provider interfaces.
- Plan a future NestJS API without coupling domain logic to Next.js.
- Enforce permissions server-side and in database policies.

## Build sequence

### Milestone 1 — harden the foundation
- Finish responsive and accessible public UI.
- Add proper loading, empty and error states.
- Implement PWA manifest/service worker strategy safely.
- Add component tests for core primitives.

### Milestone 2 — database and identity
- Complete normalized schema.
- Add migration ledger and safe migrations.
- Integrate Supabase Auth behind an auth adapter.
- Add user profiles, memberships, roles and permissions.
- Add RLS policies and server-side authorization.

### Milestone 3 — sports and CFA
- Implement sport configuration.
- Add competition formats.
- Implement football module and CFA league.
- Import the supplied 8 teams and 28 fixtures.
- Do not invent results.
- Treat repeated names as ambiguous until manually resolved.

### Milestone 4 — management workflows
- Coach/team manager dashboard.
- Athlete registration and approval.
- Transfer submission and approval.
- Fixture and result management.
- Match official workflows.
- Audit logs.

### Milestone 5 — live and content
- Match event timeline and realtime updates.
- Provider-based streaming embeds with external fallback.
- Announcements, news and media library.
- In-app notifications and optional web push.

### Milestone 6 — additional sports
- Basketball.
- Volleyball.
- Badminton.
- Table tennis.
- Athletics.

Implement sport-specific scoring through separate modules behind common contracts. Do not use football-specific fields as universal match fields.

## Data integrity cautions

- The fixture dates supplied are November 1–28, 2026.
- The current date in the project brief is November 6, 2026.
- Past fixture dates do not imply a result. Leave result/status verification to administrators.
- Duplicate player names exist in the transfer lists. Use stable IDs and manual identity resolution.
- Public athlete birthday should expose day/month only.
- A player can participate in multiple sports.
- Team membership and competition registration are separate concepts.

## Deliverable expectation

Work incrementally. After each milestone:
- Run typecheck and build.
- Summarize files changed.
- Explain database changes.
- List remaining gaps.
- Do not claim integrations are complete unless they are connected and tested.
