# Infrastructure adapters

Implement provider-specific adapters here:
- `supabase/` database repositories, auth, storage and realtime.
- Future `http/` adapter for a NestJS API.
- `postgres/` direct PostgreSQL adapter if required.

Never import these adapters from domain entities. Compose dependencies at the application boundary.
