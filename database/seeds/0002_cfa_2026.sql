INSERT INTO competitions (id, association_id, sport_id, season_id, name, slug, format, starts_on, ends_on, status, configuration)
SELECT
  '00000000-0000-4000-8000-000000000401',
  a.id, s.id, se.id,
  'Caritas Football League 2026',
  'caritas-football-league-2026',
  'league',
  '2026-11-01', '2026-11-28',
  'published',
  '{"points":{"win":3,"draw":1,"loss":0},"team_count":8,"fixture_count":28}'::jsonb
FROM associations a
JOIN sports s ON s.association_id = a.id AND s.slug = 'football'
LEFT JOIN seasons se ON se.association_id = a.id AND se.name = '2026 Season'
WHERE a.slug = 'caritas-sports'
ON CONFLICT (association_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  starts_on = EXCLUDED.starts_on,
  ends_on = EXCLUDED.ends_on,
  status = EXCLUDED.status,
  configuration = EXCLUDED.configuration;


-- Idempotent fixture seed: inserts schedule only, never scores or fabricated results.
WITH c AS (
  SELECT id FROM competitions WHERE slug = 'caritas-football-league-2026'
),
rows(seed_id, match_date, home_name, away_name, round_label) AS (
  VALUES
(
  '00000000-0000-4000-8000-000000000001',
  '2026-11-01',
  'Trinity FC',
  'IEA FC',
  'Week 1'
),
(
  '00000000-0000-4000-8000-000000000002',
  '2026-11-02',
  'BEN FC',
  'Elite FC',
  'Week 1'
),
(
  '00000000-0000-4000-8000-000000000003',
  '2026-11-03',
  'Jane FC',
  'CKC FC',
  'Week 1'
),
(
  '00000000-0000-4000-8000-000000000004',
  '2026-11-05',
  'Remy FC',
  'ARK FC',
  'Week 1'
),
(
  '00000000-0000-4000-8000-000000000005',
  '2026-11-06',
  'Trinity FC',
  'Elite FC',
  'Week 1'
),
(
  '00000000-0000-4000-8000-000000000006',
  '2026-11-07',
  'IEA FC',
  'CKC FC',
  'Week 1 · Morning'
),
(
  '00000000-0000-4000-8000-000000000007',
  '2026-11-07',
  'BEN FC',
  'ARK FC',
  'Week 1 · Evening'
),
(
  '00000000-0000-4000-8000-000000000008',
  '2026-11-08',
  'Jane FC',
  'Remy FC',
  'Week 2'
),
(
  '00000000-0000-4000-8000-000000000009',
  '2026-11-09',
  'Trinity FC',
  'CKC FC',
  'Week 2'
),
(
  '00000000-0000-4000-8000-000000000010',
  '2026-11-10',
  'Elite FC',
  'ARK FC',
  'Week 2'
),
(
  '00000000-0000-4000-8000-000000000011',
  '2026-11-12',
  'IEA FC',
  'Remy FC',
  'Week 2'
),
(
  '00000000-0000-4000-8000-000000000012',
  '2026-11-13',
  'BEN FC',
  'Jane FC',
  'Week 2'
),
(
  '00000000-0000-4000-8000-000000000013',
  '2026-11-14',
  'Trinity FC',
  'ARK FC',
  'Week 2 · Morning'
),
(
  '00000000-0000-4000-8000-000000000014',
  '2026-11-14',
  'CKC FC',
  'Remy FC',
  'Week 2 · Evening'
),
(
  '00000000-0000-4000-8000-000000000015',
  '2026-11-15',
  'Elite FC',
  'Jane FC',
  'Week 3'
),
(
  '00000000-0000-4000-8000-000000000016',
  '2026-11-16',
  'IEA FC',
  'BEN FC',
  'Week 3'
),
(
  '00000000-0000-4000-8000-000000000017',
  '2026-11-17',
  'Trinity FC',
  'Remy FC',
  'Week 3'
),
(
  '00000000-0000-4000-8000-000000000018',
  '2026-11-19',
  'ARK FC',
  'Jane FC',
  'Week 3'
),
(
  '00000000-0000-4000-8000-000000000019',
  '2026-11-20',
  'CKC FC',
  'BEN FC',
  'Week 3'
),
(
  '00000000-0000-4000-8000-000000000020',
  '2026-11-21',
  'Elite FC',
  'IEA FC',
  'Week 3 · Morning'
),
(
  '00000000-0000-4000-8000-000000000021',
  '2026-11-21',
  'Trinity FC',
  'Jane FC',
  'Week 3 · Evening'
),
(
  '00000000-0000-4000-8000-000000000022',
  '2026-11-22',
  'Remy FC',
  'BEN FC',
  'Week 4'
),
(
  '00000000-0000-4000-8000-000000000023',
  '2026-11-23',
  'ARK FC',
  'IEA FC',
  'Week 4'
),
(
  '00000000-0000-4000-8000-000000000024',
  '2026-11-24',
  'CKC FC',
  'Elite FC',
  'Week 4'
),
(
  '00000000-0000-4000-8000-000000000025',
  '2026-11-26',
  'Trinity FC',
  'BEN FC',
  'Week 4'
),
(
  '00000000-0000-4000-8000-000000000026',
  '2026-11-27',
  'Jane FC',
  'IEA FC',
  'Week 4'
),
(
  '00000000-0000-4000-8000-000000000027',
  '2026-11-28',
  'ARK FC',
  'CKC FC',
  'Week 4 · Morning'
),
(
  '00000000-0000-4000-8000-000000000028',
  '2026-11-28',
  'Remy FC',
  'Elite FC',
  'Week 4 · Evening'
)
),
resolved AS (
  SELECT
    rows.seed_id::uuid AS id,
    c.id AS competition_id,
    rows.match_date::date AS scheduled_date,
    h.id AS home_team_id,
    a.id AS away_team_id,
    rows.round_label
  FROM rows
  CROSS JOIN c
  JOIN teams h ON h.name = rows.home_name
  JOIN teams a ON a.name = rows.away_name
)
INSERT INTO fixtures (id, competition_id, scheduled_date, home_team_id, away_team_id, round_label, status)
SELECT id, competition_id, scheduled_date, home_team_id, away_team_id, round_label, 'scheduled'
FROM resolved
ON CONFLICT (id) DO NOTHING;
