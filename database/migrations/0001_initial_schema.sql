-- CARITAS SPORTS ASSOCIATION (CSA) & CARITAS FOOTBALL ASSOCIATION (CFA)
-- Idempotent PostgreSQL Migration: 0001_initial_schema.sql
-- Portable across Supabase PostgreSQL, Neon, AWS RDS, and self-hosted PostgreSQL VPS

BEGIN;

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Associations (Primary multi-tenant foundation)
CREATE TABLE IF NOT EXISTS associations (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(64) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    tagline VARCHAR(255) DEFAULT 'More Than a Game. A Community.',
    description TEXT,
    logo_url TEXT,
    instagram_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Sporting Seasons
CREATE TABLE IF NOT EXISTS seasons (
    id VARCHAR(64) PRIMARY KEY,
    association_id VARCHAR(64) REFERENCES associations(id) ON DELETE CASCADE,
    year VARCHAR(32) NOT NULL,
    name VARCHAR(128) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Extensible Sports Engine Definition
CREATE TABLE IF NOT EXISTS sports (
    id VARCHAR(64) PRIMARY KEY,
    association_id VARCHAR(64) REFERENCES associations(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    slug VARCHAR(128) UNIQUE NOT NULL,
    description TEXT,
    cover_image TEXT,
    participant_type VARCHAR(32) NOT NULL CHECK (participant_type IN ('team', 'individual', 'both')),
    competition_formats JSONB NOT NULL DEFAULT '["league", "knockout"]'::jsonb,
    positions JSONB NOT NULL DEFAULT '[]'::jsonb,
    scoring_model VARCHAR(64) NOT NULL,
    features JSONB NOT NULL DEFAULT '{}'::jsonb,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Competitions
CREATE TABLE IF NOT EXISTS competitions (
    id VARCHAR(64) PRIMARY KEY,
    sport_id VARCHAR(64) REFERENCES sports(id) ON DELETE CASCADE,
    season_id VARCHAR(64) REFERENCES seasons(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    format VARCHAR(64) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Teams & Clubs
CREATE TABLE IF NOT EXISTS teams (
    id VARCHAR(64) PRIMARY KEY,
    sport_id VARCHAR(64) REFERENCES sports(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(16) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    color VARCHAR(32) DEFAULT '#2563EB',
    coach VARCHAR(255),
    assistant_coach VARCHAR(255),
    team_manager VARCHAR(255),
    bio TEXT,
    department VARCHAR(255),
    wing VARCHAR(128),
    founded_year INTEGER DEFAULT 2026,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Centralized Athletes Identity (No Year Exposed Publicly)
CREATE TABLE IF NOT EXISTS athletes (
    id VARCHAR(64) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    nickname VARCHAR(128),
    slug VARCHAR(255) UNIQUE NOT NULL,
    image_url TEXT,
    bio TEXT,
    department VARCHAR(255) NOT NULL,
    academic_level VARCHAR(64) NOT NULL,
    wing VARCHAR(128),
    birthday_day_month VARCHAR(32) NOT NULL, -- e.g. "15 August", birth year is strictly protected
    social_instagram VARCHAR(128),
    status VARCHAR(32) DEFAULT 'active' CHECK (status IN ('active', 'injured', 'suspended', 'pending_verification')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Athlete Sport Profiles (Enables playing multiple sports without duplicated identity)
CREATE TABLE IF NOT EXISTS athlete_sport_profiles (
    id VARCHAR(64) PRIMARY KEY,
    athlete_id VARCHAR(64) REFERENCES athletes(id) ON DELETE CASCADE,
    sport_id VARCHAR(64) REFERENCES sports(id) ON DELETE CASCADE,
    team_id VARCHAR(64) REFERENCES teams(id) ON DELETE SET NULL,
    position VARCHAR(128),
    jersey_number INTEGER,
    appearances INTEGER DEFAULT 0,
    goals INTEGER DEFAULT 0,
    assists INTEGER DEFAULT 0,
    points INTEGER DEFAULT 0,
    personal_best VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Fixtures & Matches
CREATE TABLE IF NOT EXISTS fixtures (
    id VARCHAR(64) PRIMARY KEY,
    competition_id VARCHAR(64) REFERENCES competitions(id) ON DELETE CASCADE,
    sport_id VARCHAR(64) REFERENCES sports(id) ON DELETE CASCADE,
    home_team_id VARCHAR(64) REFERENCES teams(id) ON DELETE CASCADE,
    away_team_id VARCHAR(64) REFERENCES teams(id) ON DELETE CASCADE,
    match_date DATE NOT NULL,
    match_time TIME DEFAULT '16:00:00',
    venue VARCHAR(255) DEFAULT 'Caritas Main Stadium',
    round_label VARCHAR(128) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'half_time', 'completed', 'postponed', 'cancelled', 'abandoned', 'suspended', 'delayed')),
    home_score INTEGER,
    away_score INTEGER,
    live_minute INTEGER,
    period VARCHAR(64),
    stream_provider VARCHAR(32),
    stream_url TEXT,
    stream_status VARCHAR(32) DEFAULT 'scheduled',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Match Events (Goals, Cards, Substitutions)
CREATE TABLE IF NOT EXISTS match_events (
    id VARCHAR(64) PRIMARY KEY,
    fixture_id VARCHAR(64) REFERENCES fixtures(id) ON DELETE CASCADE,
    event_minute INTEGER NOT NULL,
    event_type VARCHAR(32) NOT NULL,
    team_side VARCHAR(8) NOT NULL CHECK (team_side IN ('home', 'away')),
    player_name VARCHAR(255) NOT NULL,
    detail TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Match Live Text Commentary
CREATE TABLE IF NOT EXISTS match_commentary (
    id VARCHAR(64) PRIMARY KEY,
    fixture_id VARCHAR(64) REFERENCES fixtures(id) ON DELETE CASCADE,
    minute INTEGER NOT NULL,
    commentary_text TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Transfers & Transaction History
CREATE TABLE IF NOT EXISTS transfers (
    id VARCHAR(64) PRIMARY KEY,
    athlete_id VARCHAR(64) REFERENCES athletes(id) ON DELETE SET NULL,
    athlete_name VARCHAR(255) NOT NULL,
    previous_team VARCHAR(255) NOT NULL,
    new_team VARCHAR(255) NOT NULL,
    transfer_type VARCHAR(32) NOT NULL CHECK (transfer_type IN ('permanent', 'loan', 'free_agent', 'release', 'return_from_loan')),
    season_id VARCHAR(64) REFERENCES seasons(id) ON DELETE SET NULL,
    transfer_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(32) NOT NULL DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected', 'cancelled')),
    approved_by VARCHAR(255),
    notes TEXT,
    sport_id VARCHAR(64) REFERENCES sports(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Official Communiqués & Announcements
CREATE TABLE IF NOT EXISTS announcements (
    id VARCHAR(64) PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    category VARCHAR(64) NOT NULL,
    author VARCHAR(255) NOT NULL,
    author_role VARCHAR(255) NOT NULL,
    cover_image TEXT,
    external_link JSONB,
    featured BOOLEAN DEFAULT FALSE,
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Media Assets & Photo Gallery
CREATE TABLE IF NOT EXISTS media_assets (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url TEXT NOT NULL,
    category VARCHAR(32) NOT NULL,
    sport_id VARCHAR(64) REFERENCES sports(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Association Officials
CREATE TABLE IF NOT EXISTS officials (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(128) NOT NULL,
    title VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    image_url TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Audit Logs for Governance
CREATE TABLE IF NOT EXISTS audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) NOT NULL,
    action VARCHAR(128) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    payload JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_fixtures_competition ON fixtures(competition_id);
CREATE INDEX IF NOT EXISTS idx_fixtures_date ON fixtures(match_date);
CREATE INDEX IF NOT EXISTS idx_fixtures_status ON fixtures(status);
CREATE INDEX IF NOT EXISTS idx_transfers_status ON transfers(status);
CREATE INDEX IF NOT EXISTS idx_transfers_new_team ON transfers(new_team);
CREATE INDEX IF NOT EXISTS idx_athletes_slug ON athletes(slug);
CREATE INDEX IF NOT EXISTS idx_teams_slug ON teams(slug);
CREATE INDEX IF NOT EXISTS idx_announcements_published ON announcements(published_at DESC);

COMMIT;
