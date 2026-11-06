# Database notes

The initial migration is a portable PostgreSQL starting point, not the complete final schema.

## Principles

- UUID primary keys.
- `timestamptz` for timestamps.
- `date` for internal dates where appropriate.
- Public athlete birthday is stored as month/day where possible; do not publish year.
- Explicit foreign keys and deletion policies.
- Unique constraints for stable slugs and membership pairs.
- Seed scripts use `ON CONFLICT` and can be rerun.
- Keep migrations immutable after they have been applied in shared environments; add a new migration for changes.

## Migration execution

Run `database/migrations/0001_core.sql` against a fresh development PostgreSQL database.

The migration uses `CREATE TABLE IF NOT EXISTS` for initial bootstrap. If you later change a table definition, write an explicit `ALTER TABLE` migration with checks and update the migration ledger. Do not edit an already-applied migration in production.

## Supabase

When using Supabase:
- Enable RLS for tables exposed through the Data API.
- Add policies before enabling client-side writes.
- Prefer server-side writes for privileged operations.
- Never put the service-role key in `NEXT_PUBLIC_*`.
- Configure Storage buckets and object policies separately.
- Configure Auth user-to-profile provisioning deliberately.
