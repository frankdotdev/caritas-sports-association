-- Caritas Sports Association: portable PostgreSQL bootstrap.
-- Apply to a fresh development database first. Keep applied migrations immutable.
BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS associations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  logo_asset_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  name text NOT NULL,
  starts_on date,
  ends_on date,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (association_id, name)
);

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY,
  email text UNIQUE,
  display_name text,
  avatar_asset_id uuid,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  UNIQUE (association_id, slug)
);

CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  description text
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  permission_id uuid NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_id uuid NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  scope_type text NOT NULL DEFAULT 'association',
  scope_id uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (association_id, user_id, role_id, scope_type, scope_id)
);

CREATE TABLE IF NOT EXISTS sports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  participant_type text NOT NULL CHECK (participant_type IN ('team','individual','both')),
  configuration jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (association_id, slug)
);

CREATE TABLE IF NOT EXISTS sport_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport_id uuid NOT NULL REFERENCES sports(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  UNIQUE (sport_id, slug)
);

CREATE TABLE IF NOT EXISTS competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  sport_id uuid NOT NULL REFERENCES sports(id) ON DELETE RESTRICT,
  season_id uuid REFERENCES seasons(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text NOT NULL,
  format text NOT NULL,
  description text,
  starts_on date,
  ends_on date,
  status text NOT NULL DEFAULT 'draft',
  configuration jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (association_id, slug)
);

CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  sport_id uuid NOT NULL REFERENCES sports(id) ON DELETE RESTRICT,
  name text NOT NULL,
  slug text NOT NULL,
  short_name text,
  description text,
  logo_asset_id uuid,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (association_id, slug)
);

CREATE TABLE IF NOT EXISTS athletes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  full_name text NOT NULL,
  nickname text,
  slug text,
  biography text,
  department text,
  academic_level text,
  wing text,
  birthday_month smallint CHECK (birthday_month BETWEEN 1 AND 12),
  birthday_day smallint CHECK (birthday_day BETWEEN 1 AND 31),
  profile_asset_id uuid,
  public_profile boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS athlete_sport_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  sport_id uuid NOT NULL REFERENCES sports(id) ON DELETE RESTRICT,
  position_id uuid REFERENCES sport_positions(id) ON DELETE SET NULL,
  attributes jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (athlete_id, sport_id)
);

CREATE TABLE IF NOT EXISTS team_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  athlete_id uuid NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  season_id uuid REFERENCES seasons(id) ON DELETE SET NULL,
  jersey_number text,
  status text NOT NULL DEFAULT 'pending',
  joined_at date,
  left_at date,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  display_name text NOT NULL,
  role_title text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS competition_teams (
  competition_id uuid NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  team_id uuid NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  registration_status text NOT NULL DEFAULT 'pending',
  PRIMARY KEY (competition_id, team_id)
);

CREATE TABLE IF NOT EXISTS competition_athletes (
  competition_id uuid NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  athlete_id uuid NOT NULL REFERENCES athletes(id) ON DELETE CASCADE,
  registration_status text NOT NULL DEFAULT 'pending',
  PRIMARY KEY (competition_id, athlete_id)
);

CREATE TABLE IF NOT EXISTS fixtures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  home_team_id uuid REFERENCES teams(id) ON DELETE RESTRICT,
  away_team_id uuid REFERENCES teams(id) ON DELETE RESTRICT,
  scheduled_at timestamptz,
  scheduled_date date,
  venue text,
  round_label text,
  status text NOT NULL DEFAULT 'scheduled',
  home_score integer,
  away_score integer,
  result_verified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (home_team_id IS NULL OR away_team_id IS NULL OR home_team_id <> away_team_id)
);

CREATE TABLE IF NOT EXISTS match_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  period_label text,
  elapsed_seconds integer,
  athlete_id uuid REFERENCES athletes(id) ON DELETE SET NULL,
  team_id uuid REFERENCES teams(id) ON DELETE SET NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS match_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  subject_type text NOT NULL,
  subject_id uuid NOT NULL,
  statistic_key text NOT NULL,
  numeric_value numeric,
  text_value text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (fixture_id, subject_type, subject_id, statistic_key)
);

CREATE TABLE IF NOT EXISTS match_officials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  display_name text NOT NULL,
  role_title text NOT NULL
);

CREATE TABLE IF NOT EXISTS transfers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  athlete_id uuid NOT NULL REFERENCES athletes(id) ON DELETE RESTRICT,
  from_team_id uuid REFERENCES teams(id) ON DELETE RESTRICT,
  to_team_id uuid REFERENCES teams(id) ON DELETE RESTRICT,
  season_id uuid REFERENCES seasons(id) ON DELETE SET NULL,
  transfer_type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  submitted_by uuid REFERENCES users(id) ON DELETE SET NULL,
  reviewed_by uuid REFERENCES users(id) ON DELETE SET NULL,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  effective_at timestamptz,
  notes text,
  CHECK (from_team_id IS NULL OR to_team_id IS NULL OR from_team_id <> to_team_id)
);

CREATE TABLE IF NOT EXISTS media_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  storage_provider text NOT NULL,
  storage_key text NOT NULL,
  public_url text,
  mime_type text NOT NULL,
  file_size_bytes bigint NOT NULL,
  alt_text text,
  caption text,
  uploaded_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (storage_provider, storage_key)
);

CREATE TABLE IF NOT EXISTS announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  sport_id uuid REFERENCES sports(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text NOT NULL,
  body text NOT NULL,
  cover_asset_id uuid REFERENCES media_assets(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'draft',
  is_featured boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  author_id uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (association_id, slug)
);

CREATE TABLE IF NOT EXISTS live_streams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fixture_id uuid NOT NULL REFERENCES fixtures(id) ON DELETE CASCADE,
  provider text NOT NULL,
  submitted_url text NOT NULL,
  embed_url text,
  status text NOT NULL DEFAULT 'scheduled',
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  association_id uuid NOT NULL REFERENCES associations(id) ON DELETE CASCADE,
  actor_user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sports_association_active ON sports(association_id, is_active);
CREATE INDEX IF NOT EXISTS idx_teams_sport ON teams(sport_id);
CREATE INDEX IF NOT EXISTS idx_athletes_association_status ON athletes(association_id, status);
CREATE INDEX IF NOT EXISTS idx_fixtures_competition_date ON fixtures(competition_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_fixtures_status ON fixtures(status);
CREATE INDEX IF NOT EXISTS idx_match_events_fixture_time ON match_events(fixture_id, elapsed_seconds);
CREATE INDEX IF NOT EXISTS idx_transfers_status ON transfers(status);
CREATE INDEX IF NOT EXISTS idx_announcements_publication ON announcements(status, published_at DESC);

COMMIT;
