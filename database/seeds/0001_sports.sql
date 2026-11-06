-- Starter seed. Replace the association UUID only if you intentionally maintain a different seed identity.
INSERT INTO associations (id, name, slug, description)
VALUES ('00000000-0000-4000-8000-000000000001', 'Caritas Sports Association', 'caritas-sports', 'The official sports association.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO seasons (id, association_id, name, starts_on, ends_on, is_active)
VALUES ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', '2026 Season', '2026-01-01', '2026-12-31', true)
ON CONFLICT (association_id, name) DO NOTHING;

INSERT INTO sports (id, association_id, name, slug, description, participant_type, configuration, sort_order)
VALUES
('00000000-0000-4000-8000-000000000201','00000000-0000-4000-8000-000000000001','Football','football','Caritas Football Association','team','{"features":["fixtures","live_scoring","standings","statistics","transfers","rosters"]}',1),
('00000000-0000-4000-8000-000000000202','00000000-0000-4000-8000-000000000001','Basketball','basketball','Basketball competitions','team','{"features":["fixtures","live_scoring","standings","statistics","rosters"]}',2),
('00000000-0000-4000-8000-000000000203','00000000-0000-4000-8000-000000000001','Volleyball','volleyball','Volleyball competitions','team','{"features":["fixtures","live_scoring","standings","statistics","rosters"]}',3),
('00000000-0000-4000-8000-000000000204','00000000-0000-4000-8000-000000000001','Badminton','badminton','Singles and doubles badminton','both','{"features":["fixtures","live_scoring","rankings","brackets","statistics"]}',4),
('00000000-0000-4000-8000-000000000205','00000000-0000-4000-8000-000000000001','Table Tennis','table-tennis','Singles and doubles table tennis','both','{"features":["fixtures","live_scoring","rankings","brackets","statistics"]}',5),
('00000000-0000-4000-8000-000000000206','00000000-0000-4000-8000-000000000001','Athletics','athletics','Track and field events','individual','{"features":["events","rankings","records","statistics"]}',6)
ON CONFLICT (association_id, slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  participant_type = EXCLUDED.participant_type,
  configuration = EXCLUDED.configuration,
  sort_order = EXCLUDED.sort_order;

INSERT INTO teams (id, association_id, sport_id, name, slug, short_name)
SELECT seed.id, '00000000-0000-4000-8000-000000000001', s.id, seed.name, seed.slug, seed.short_name
FROM sports s
CROSS JOIN (VALUES
('00000000-0000-4000-8000-000000000301','Trinity FC','trinity-fc','TRI'),
('00000000-0000-4000-8000-000000000302','IEA FC','iea-fc','IEA'),
('00000000-0000-4000-8000-000000000303','BEN FC','ben-fc','BEN'),
('00000000-0000-4000-8000-000000000304','Elite FC','elite-fc','ELT'),
('00000000-0000-4000-8000-000000000305','Jane FC','jane-fc','JAN'),
('00000000-0000-4000-8000-000000000306','CKC FC','ckc-fc','CKC'),
('00000000-0000-4000-8000-000000000307','Remy FC','remy-fc','RMY'),
('00000000-0000-4000-8000-000000000308','ARK FC','ark-fc','ARK')
) AS seed(id,name,slug,short_name)
WHERE s.association_id = '00000000-0000-4000-8000-000000000001' AND s.slug = 'football'
ON CONFLICT (association_id, slug) DO UPDATE SET name = EXCLUDED.name, short_name = EXCLUDED.short_name;
