-- CARITAS SPORTS ASSOCIATION (CSA) SEED DATA
-- Idempotent seeds using ON CONFLICT DO NOTHING

BEGIN;

-- 1. Insert Association
INSERT INTO associations (id, name, short_name, slug, tagline, description, instagram_url)
VALUES (
    'csa-main',
    'Caritas Sports Association',
    'CSA',
    'caritas-sports',
    'More Than a Game. A Community.',
    'Official digital headquarters of the Caritas Sports Association.',
    'https://www.instagram.com/caritas_football?stkn=MWgyMnd4cXNpdHptNw%3D%3D&utm_source=qr'
) ON CONFLICT (id) DO NOTHING;

-- 2. Insert Season 2026
INSERT INTO seasons (id, association_id, year, name, is_active, start_date, end_date)
VALUES (
    'season-2026',
    'csa-main',
    '2026',
    '2026 Academic Sporting Season',
    TRUE,
    '2026-11-01',
    '2026-11-28'
) ON CONFLICT (id) DO NOTHING;

-- 3. Insert Sports
INSERT INTO sports (id, association_id, name, slug, description, participant_type, scoring_model, active)
VALUES
    ('football', 'csa-main', 'Football', 'football', 'Flagship Caritas Football Association (CFA) league.', 'team', 'goals', TRUE),
    ('basketball', 'csa-main', 'Basketball', 'basketball', 'Collegiate basketball tournament with quarter-by-quarter scoring.', 'team', 'points_quarters', TRUE),
    ('volleyball', 'csa-main', 'Volleyball', 'volleyball', 'Set-based volleyball championships.', 'team', 'sets_volleyball', TRUE),
    ('badminton', 'csa-main', 'Badminton', 'badminton', 'Singles and doubles collegiate tournament.', 'both', 'sets_badminton', TRUE),
    ('table-tennis', 'csa-main', 'Table Tennis', 'table-tennis', 'Singles and doubles knockout championships.', 'both', 'sets_table_tennis', TRUE),
    ('athletics', 'csa-main', 'Athletics', 'athletics', 'Track and field events, times and distances.', 'individual', 'time_distance', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert CFA Competition
INSERT INTO competitions (id, sport_id, season_id, name, slug, format, is_active)
VALUES (
    'cfl-2026',
    'football',
    'season-2026',
    'Caritas Football League 2026',
    'caritas-football-league-2026',
    'league',
    TRUE
) ON CONFLICT (id) DO NOTHING;

-- 5. Insert The 8 Official CFA Teams
INSERT INTO teams (id, sport_id, name, short_name, slug, color, coach, bio)
VALUES
    ('trinity', 'football', 'Trinity FC', 'TRI', 'trinity-fc', '#2563EB', 'DC', 'Tactical discipline and rapid counter-attacks.'),
    ('iea', 'football', 'IEA FC', 'IEA', 'iea-fc', '#EA580C', 'Jk', 'The orange army with high-octane offensive flair.'),
    ('ben', 'football', 'BEN FC', 'BEN', 'ben-fc', '#16A34A', '9zeros', 'The greens with relentless pressing and strong defensive spine.'),
    ('elite', 'football', 'Elite FC', 'ELT', 'elite-fc', '#EAB308', 'Chukwu', 'Technical, possession-driven collegiate side.'),
    ('jane', 'football', 'Jane FC', 'JAN', 'jane-fc', '#DC2626', 'Ak', 'Passionate reds with a potent forward line.'),
    ('ckc', 'football', 'CKC FC', 'CKC', 'ckc-fc', '#E2E8F0', 'Chief001', 'The white knights with championship pedigree.'),
    ('remy', 'football', 'Remy FC', 'RMY', 'remy-fc', '#475569', '+234 904 598 8152', 'The dark horses combining youthful energy with creative wing play.'),
    ('ark', 'football', 'ARK FC', 'ARK', 'ark-fc', '#9333EA', 'CONFIDO', 'The purple covenant club with dedicated set-piece execution.')
ON CONFLICT (id) DO NOTHING;

-- 6. Insert Key Officials
INSERT INTO officials (id, name, role, title, department, bio)
VALUES
    ('off-01', 'Lukeeze Jesse', 'President', 'President, Caritas Football Association (CFA)', 'Executive Council', 'Head of CFA driving league operations and digital media.'),
    ('off-02', 'Dike Somtochukwu', 'Assistant President', 'Assistant President, Caritas Football Association', 'Executive Council', 'Supervises competition scheduling and disciplinary affairs.'),
    ('off-03', 'Dr. K. Anyanwu', 'Director of Sports', 'Director of Sports, Caritas University', 'Sports Directorate', 'Oversees athletic programmes across all sports.')
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Initial Announcements
INSERT INTO announcements (id, slug, title, body, category, author, author_role, published_at, featured)
VALUES
    (
        'ann-01',
        'transfer-window-officially-open',
        'THE TRANSFER WINDOW IS OFFICIALLY OPEN',
        'Caritas football league transfer window is officially open and the doors are wide open! If you have got your eyes on a new challenge or you are ready to switch colors, now is your chance. Signed: CFA PRESIDENT: LUKEEZE JESSE & ASST CFA PRESIDENT: DIKE SOMTOCHUKWU',
        'transfers',
        'Lukeeze Jesse & Dike Somtochukwu',
        'CFA Executive Presidency',
        '2026-10-27',
        TRUE
    ),
    (
        'ann-02',
        'official-instagram-page-launch',
        'CARITAS FOOTBALL ASSOCIATION — OFFICIAL INSTAGRAM PAGE',
        'We are pleased to officially announce the launch of the Caritas Football Association (CFA) Instagram page: https://www.instagram.com/caritas_football?stkn=MWgyMnd4cXNpdHptNw%3D%3D&utm_source=qr',
        'instagram',
        'CFA Media Office',
        'Media Directorate',
        '2026-10-25',
        TRUE
    )
ON CONFLICT (id) DO NOTHING;

COMMIT;
