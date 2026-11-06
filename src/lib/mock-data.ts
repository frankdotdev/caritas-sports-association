import type {
  Sport,
  Team,
  Fixture,
  Athlete,
  Transfer,
  Announcement,
  NewsArticle,
  Official,
  StandingRow,
  MediaAsset
} from "@/domain/types";

export const sports: Sport[] = [
  {
    id: "football",
    name: "Football",
    slug: "football",
    description: "The flagship Caritas Football Association (CFA) league featuring eight university clubs.",
    coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    participantType: "team",
    competitionFormats: ["league", "knockout", "group_stage"],
    positions: ["Goalkeeper", "Defender", "Midfielder", "Forward", "Winger"],
    scoringModel: "goals",
    features: {
      fixtures: true,
      liveScoring: true,
      standings: true,
      rankings: false,
      brackets: true,
      statistics: true,
      transfers: true,
      rosters: true
    },
    active: true,
    icon: "trophy",
    countLabel: "8 clubs · 28 matches"
  },
  {
    id: "basketball",
    name: "Basketball",
    slug: "basketball",
    description: "High-octane university basketball tournament with fast-paced court action and playoffs.",
    coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    participantType: "team",
    competitionFormats: ["tournament", "league"],
    positions: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"],
    scoringModel: "points_quarters",
    features: {
      fixtures: true,
      liveScoring: true,
      standings: true,
      rankings: false,
      brackets: true,
      statistics: true,
      transfers: true,
      rosters: true
    },
    active: true,
    icon: "circle-dot",
    countLabel: "6 teams registered"
  },
  {
    id: "volleyball",
    name: "Volleyball",
    slug: "volleyball",
    description: "Intense set-based volleyball championships across faculty and hostel teams.",
    coverImage: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80",
    participantType: "team",
    competitionFormats: ["tournament", "group_stage"],
    positions: ["Setter", "Outside Hitter", "Opposite Hitter", "Middle Blocker", "Libero"],
    scoringModel: "sets_volleyball",
    features: {
      fixtures: true,
      liveScoring: true,
      standings: true,
      rankings: false,
      brackets: true,
      statistics: true,
      transfers: false,
      rosters: true
    },
    active: true,
    icon: "volleyball",
    countLabel: "6 teams registered"
  },
  {
    id: "badminton",
    name: "Badminton",
    slug: "badminton",
    description: "Singles and doubles collegiate badminton open tournament.",
    coverImage: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    participantType: "both",
    competitionFormats: ["knockout", "tournament"],
    positions: ["Singles Player", "Doubles Specialist"],
    scoringModel: "sets_badminton",
    features: {
      fixtures: true,
      liveScoring: true,
      standings: false,
      rankings: true,
      brackets: true,
      statistics: true,
      transfers: false,
      rosters: false
    },
    active: true,
    icon: "activity",
    countLabel: "16 athletes seeded"
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    slug: "table-tennis",
    description: "Caritas table tennis championship with singles and doubles knockout brackets.",
    coverImage: "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=80",
    participantType: "both",
    competitionFormats: ["knockout", "round_robin"],
    positions: ["Singles", "Doubles"],
    scoringModel: "sets_table_tennis",
    features: {
      fixtures: true,
      liveScoring: true,
      standings: false,
      rankings: true,
      brackets: true,
      statistics: true,
      transfers: false,
      rosters: false
    },
    active: true,
    icon: "target",
    countLabel: "12 athletes seeded"
  },
  {
    id: "athletics",
    name: "Athletics",
    slug: "athletics",
    description: "Track & field events: 100m, 200m, 400m, 4x100m relay, long jump and high jump.",
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    participantType: "individual",
    competitionFormats: ["tournament", "custom"],
    positions: ["Sprinter", "Middle Distance", "Relay Specialist", "Jumper"],
    scoringModel: "time_distance",
    features: {
      fixtures: true,
      liveScoring: true,
      standings: false,
      rankings: true,
      brackets: false,
      statistics: true,
      transfers: false,
      rosters: false
    },
    active: true,
    icon: "timer",
    countLabel: "8 track & field events"
  }
];

export const teams: Team[] = [
  {
    id: "trinity",
    name: "Trinity FC",
    shortName: "TRI",
    slug: "trinity-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#2563EB",
    logoUrl: "/crests/trinity.svg",
    coach: "DC",
    assistantCoach: "Coach Samuel",
    teamManager: "T. Okoro",
    bio: "Known for discipline, tactical organization and rapid counter-attacks in the Caritas Football League.",
    department: "Engineering & Sciences",
    wing: "Block C",
    foundedYear: 2021,
    rosterCount: 22
  },
  {
    id: "iea",
    name: "IEA FC",
    shortName: "IEA",
    slug: "iea-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#EA580C",
    logoUrl: "/crests/iea.svg",
    coach: "Jk",
    assistantCoach: "Coach Austin",
    teamManager: "K. Obiora",
    bio: "The orange army with high-octane offensive flair and huge student backing across campus.",
    department: "Management & Social Sciences",
    wing: "North Wing",
    foundedYear: 2020,
    rosterCount: 26
  },
  {
    id: "ben",
    name: "BEN FC",
    shortName: "BEN",
    slug: "ben-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#16A34A",
    logoUrl: "/crests/ben.svg",
    coach: "9zeros",
    assistantCoach: "Coach Frank",
    teamManager: "C. Madu",
    bio: "The greens — relentless pressing, strong defensive spine and one of the largest squads in the league.",
    department: "Environmental Sciences",
    wing: "South Wing",
    foundedYear: 2022,
    rosterCount: 28
  },
  {
    id: "elite",
    name: "Elite FC",
    shortName: "ELT",
    slug: "elite-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#EAB308",
    logoUrl: "/crests/elite.svg",
    coach: "Chukwu",
    assistantCoach: "Coach Dave",
    teamManager: "D. Eze",
    bio: "Technical, possession-driven side looking to claim the 2026 championship trophy.",
    department: "Physical Sciences",
    wing: "West Wing",
    foundedYear: 2021,
    rosterCount: 24
  },
  {
    id: "jane",
    name: "Jane FC",
    shortName: "JAN",
    slug: "jane-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#DC2626",
    logoUrl: "/crests/jane.svg",
    coach: "Ak",
    assistantCoach: "Coach Jude",
    teamManager: "P. Nnamdi",
    bio: "Passionate reds with a potent forward line and heavy recruitment during the 2026 transfer window.",
    department: "Health & Allied Sciences",
    wing: "East Wing",
    foundedYear: 2020,
    rosterCount: 25
  },
  {
    id: "ckc",
    name: "CKC FC",
    shortName: "CKC",
    slug: "ckc-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#E2E8F0",
    logoUrl: "/crests/ckc.svg",
    coach: "Chief001",
    assistantCoach: "Coach Brian",
    teamManager: "B. Uche",
    bio: "The white knights with championship pedigree and stubborn resilience on matchdays.",
    department: "Humanities & Arts",
    wing: "Central Wing",
    foundedYear: 2019,
    rosterCount: 23
  },
  {
    id: "remy",
    name: "Remy FC",
    shortName: "RMY",
    slug: "remy-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#475569",
    logoUrl: "/crests/remy.svg",
    coach: "+234 904 598 8152",
    assistantCoach: "Coach Nelson",
    teamManager: "G. Benson",
    bio: "The dark horses of the league, combining youthful energy with creative wing play.",
    department: "Computer & Info Sciences",
    wing: "Hostel A",
    foundedYear: 2022,
    rosterCount: 24
  },
  {
    id: "ark",
    name: "ARK FC",
    shortName: "ARK",
    slug: "ark-fc",
    sport: "Football",
    sportSlug: "football",
    color: "#9333EA",
    logoUrl: "/crests/ark.svg",
    coach: "CONFIDO",
    assistantCoach: "Coach Henry",
    teamManager: "E. Jesse",
    bio: "The purple covenant club with a dedicated tactical system and strong set-piece execution.",
    department: "Law & Jurisprudence",
    wing: "Hostel B",
    foundedYear: 2021,
    rosterCount: 25
  }
];

export const standings: StandingRow[] = [
  { position: 1, team: "Remy FC", shortName: "RMY", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 1, goalDifference: 5, points: 3, form: ["W"] },
  { position: 2, team: "Jane FC", shortName: "JAN", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 0, goalDifference: 3, points: 3, form: ["W"] },
  { position: 3, team: "BEN FC", shortName: "BEN", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3, form: ["W"] },
  { position: 4, team: "Trinity FC", shortName: "TRI", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3, form: ["W"] },
  { position: 5, team: "Elite FC", shortName: "ELT", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0, form: ["L"] },
  { position: 6, team: "IEA FC", shortName: "IEA", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0, form: ["L"] },
  { position: 7, team: "CKC FC", shortName: "CKC", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 3, goalDifference: -3, points: 0, form: ["L"] },
  { position: 8, team: "ARK FC", shortName: "ARK", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 6, goalDifference: -5, points: 0, form: ["L"] }
];

export const fixtures: Fixture[] = [
  // Week 1
  {
    id: "cfa-2026-01",
    date: "2026-11-01",
    time: "15:30",
    venue: "Caritas Main Stadium",
    home: "Trinity FC",
    away: "IEA FC",
    homeId: "trinity",
    awayId: "iea",
    round: "Matchday 1 · Opening Day",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "completed",
    homeScore: 2,
    awayScore: 0,
    officials: ["Referee Chukwuma", "AR1 Danladi", "AR2 Sunday", "Fourth Official Moses"],
    events: [
      { id: "ev-1", matchId: "cfa-2026-01", minute: 28, type: "goal", team: "home", playerName: "Miracle", detail: "Clinical finish into bottom left" },
      { id: "ev-2", matchId: "cfa-2026-01", minute: 62, type: "red_card", team: "away", playerName: "Legend", detail: "Second bookable offence" },
      { id: "ev-3", matchId: "cfa-2026-01", minute: 73, type: "goal", team: "home", playerName: "Savage", detail: "Rocket shot past goalkeeper" }
    ],
    commentary: [
      { id: "c-1", minute: 90, text: "Full time! Trinity FC secure all 3 points with a disciplined 2-0 victory over IEA FC." },
      { id: "c-2", minute: 73, text: "GOAL! Savage doubles the lead for Trinity FC with a thunderous strike!" },
      { id: "c-3", minute: 62, text: "RED CARD! Legend receives a second yellow card and IEA FC are down to 10 men." },
      { id: "c-4", minute: 28, text: "GOAL! Miracle opens the scoring for Trinity FC with a composed finish!" }
    ]
  },
  {
    id: "cfa-2026-02",
    date: "2026-11-02",
    time: "15:30",
    venue: "Caritas Main Stadium",
    home: "BEN FC",
    away: "Elite FC",
    homeId: "ben",
    awayId: "elite",
    round: "Matchday 2",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "completed",
    homeScore: 3,
    awayScore: 1,
    officials: ["Referee Jude", "AR1 Victor", "AR2 Samuel"],
    events: [
      { id: "ev-5", matchId: "cfa-2026-02", minute: 19, type: "goal", team: "home", playerName: "Paul", detail: "Curler into top corner" },
      { id: "ev-6", matchId: "cfa-2026-02", minute: 44, type: "goal", team: "home", playerName: "Blaise", detail: "Header from corner delivery" },
      { id: "ev-7", matchId: "cfa-2026-02", minute: 63, type: "goal", team: "away", playerName: "Morave", detail: "Fine strike to pull one back" },
      { id: "ev-8", matchId: "cfa-2026-02", minute: 82, type: "goal", team: "home", playerName: "Kelvin", detail: "Seals the 3-1 victory" }
    ],
    commentary: [
      { id: "c-5", minute: 90, text: "Full time! BEN FC triumph 3-1 in a thrilling Matchday 2 clash against Elite FC." },
      { id: "c-6", minute: 82, text: "GOAL! Kelvin restores BEN FC's two-goal cushion to make it 3-1!" }
    ]
  },
  {
    id: "cfa-2026-03",
    date: "2026-11-03",
    time: "15:30",
    venue: "Caritas Main Stadium",
    home: "Jane FC",
    away: "CKC FC",
    homeId: "jane",
    awayId: "ckc",
    round: "Matchday 3",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "completed",
    homeScore: 3,
    awayScore: 0,
    officials: ["Referee Sunday", "AR1 Austin", "AR2 Emeka"],
    events: [
      { id: "ev-9", matchId: "cfa-2026-03", minute: 24, type: "goal", team: "home", playerName: "Soft", detail: "Direct free kick into bottom corner" },
      { id: "ev-10", matchId: "cfa-2026-03", minute: 58, type: "goal", team: "home", playerName: "Makuo God", detail: "Volley after team build-up" },
      { id: "ev-11", matchId: "cfa-2026-03", minute: 79, type: "goal", team: "home", playerName: "Chidera", detail: "Solo run and composed finish" }
    ],
    commentary: [
      { id: "c-7", minute: 90, text: "Full time! Jane FC dominate CKC FC with an emphatic 3-0 clean sheet win." },
      { id: "c-8", minute: 79, text: "GOAL! Chidera caps a masterclass performance with the 3rd goal!" }
    ]
  },
  {
    id: "cfa-2026-04",
    date: "2026-11-05",
    time: "15:30",
    venue: "Caritas Main Stadium",
    home: "Remy FC",
    away: "ARK FC",
    homeId: "remy",
    awayId: "ark",
    round: "Matchday 4",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "completed",
    homeScore: 6,
    awayScore: 1,
    officials: ["Referee Danladi", "AR1 Jude", "AR2 Moses"],
    events: [
      { id: "ev-12", matchId: "cfa-2026-04", minute: 11, type: "goal", team: "home", playerName: "Morata", detail: "Opener from close range" },
      { id: "ev-13", matchId: "cfa-2026-04", minute: 28, type: "goal", team: "home", playerName: "Morata", detail: "Second goal - cool chip" },
      { id: "ev-14", matchId: "cfa-2026-04", minute: 36, type: "goal", team: "away", playerName: "Nene", detail: "ARK FC strike to make it 2-1" },
      { id: "ev-15", matchId: "cfa-2026-04", minute: 51, type: "goal", team: "home", playerName: "Morata", detail: "Hat-trick completed with power strike" },
      { id: "ev-16", matchId: "cfa-2026-04", minute: 64, type: "goal", team: "home", playerName: "Morata", detail: "4th goal - header" },
      { id: "ev-17", matchId: "cfa-2026-04", minute: 77, type: "goal", team: "home", playerName: "Eze", detail: "Fine curled finish for Remy's 5th" },
      { id: "ev-18", matchId: "cfa-2026-04", minute: 85, type: "goal", team: "home", playerName: "Morata", detail: "Historical 5th goal (glut!) to seal 6-1" }
    ],
    commentary: [
      { id: "c-9", minute: 90, text: "Full time! Remy FC demolish ARK FC 6-1 behind a legendary 5-goal haul from Morata!" },
      { id: "c-10", minute: 85, text: "GOAL! Morata scores his FIFTH goal of the match! Unbelievable display from Remy FC's talisman!" },
      { id: "c-11", minute: 77, text: "GOAL! Eze gets on the scoresheet with a magnificent shot into the top right corner." }
    ]
  },
  {
    id: "cfa-2026-05",
    date: "2026-11-06", // TODAY 6th Nov!
    time: "15:30",
    venue: "Caritas Main Stadium",
    home: "Elite FC",
    away: "Trinity FC",
    homeId: "elite",
    awayId: "trinity",
    round: "Matchday 5 · Friday Heavyweight Clash",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "live",
    homeScore: 1,
    awayScore: 1,
    liveMinute: 55,
    period: "2nd Half",
    officials: ["Referee Chukwuma", "AR1 Victor", "AR2 Danladi", "Commissioner Jude"],
    homeLineup: {
      formation: "4-3-3",
      startingEleven: ["Denco M.", "Lawrence A.", "Egede J.", "Favour P.", "Ike S.", "JC O.", "Dice K.", "Machala T.", "Otika D.", "Paschal C.", "Morave K."],
      substitutes: ["Damon F.", "Nzenwa C."]
    },
    awayLineup: {
      formation: "4-2-3-1",
      startingEleven: ["Lawson K.", "Nero K.", "Favourite O.", "Ifeanyi E.", "Chike O.", "Modric O.", "Miracle C.", "Savage P.", "Patoski S.", "Joseph B.", "Aisha M."],
      substitutes: ["Eto V.", "Samuel T.", "Austin P."]
    },
    stream: {
      provider: "tiktok",
      url: "https://www.tiktok.com/@caritas_football/live",
      status: "live",
      title: "Matchday 5: Elite FC vs Trinity FC LIVE",
      embedAllowed: true
    },
    events: [
      { id: "ev-19", matchId: "cfa-2026-05", minute: 22, type: "goal", team: "away", playerName: "Miracle", detail: "Composed finish from edge of the box" },
      { id: "ev-20", matchId: "cfa-2026-05", minute: 49, type: "goal", team: "home", playerName: "Morave", detail: "Fierce equalizer off crossbar rebound" }
    ],
    commentary: [
      { id: "c-12", minute: 55, text: "High tempo from both sides as Elite FC push for the lead after Morave's equalizer!" },
      { id: "c-13", minute: 49, text: "GOAL! Morave strikes for Elite FC! 1-1 in Matchday 5!" },
      { id: "c-14", minute: 22, text: "GOAL! Miracle puts Trinity FC ahead with a calm strike!" }
    ]
  },
  {
    id: "cfa-2026-06",
    date: "2026-11-07",
    time: "08:30",
    venue: "Caritas Main Stadium",
    home: "IEA FC",
    away: "CKC FC",
    homeId: "iea",
    awayId: "ckc",
    round: "Week 1 · Morning",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-07",
    date: "2026-11-07",
    time: "16:30",
    venue: "Caritas Main Stadium",
    home: "BEN FC",
    away: "ARK FC",
    homeId: "ben",
    awayId: "ark",
    round: "Week 1 · Evening",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  // Week 2
  {
    id: "cfa-2026-08",
    date: "2026-11-08",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Jane FC",
    away: "Remy FC",
    round: "Week 2",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-09",
    date: "2026-11-09",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Trinity FC",
    away: "CKC FC",
    round: "Week 2",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-10",
    date: "2026-11-10",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Elite FC",
    away: "ARK FC",
    round: "Week 2",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-11",
    date: "2026-11-12",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "IEA FC",
    away: "Remy FC",
    round: "Week 2",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-12",
    date: "2026-11-13",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "BEN FC",
    away: "Jane FC",
    round: "Week 2",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-13",
    date: "2026-11-14",
    time: "08:30",
    venue: "Caritas Main Stadium",
    home: "Trinity FC",
    away: "ARK FC",
    round: "Week 2 · Morning",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-14",
    date: "2026-11-14",
    time: "16:30",
    venue: "Caritas Main Stadium",
    home: "CKC FC",
    away: "Remy FC",
    round: "Week 2 · Evening",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  // Week 3
  {
    id: "cfa-2026-15",
    date: "2026-11-15",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Elite FC",
    away: "Jane FC",
    round: "Week 3",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-16",
    date: "2026-11-16",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "IEA FC",
    away: "BEN FC",
    round: "Week 3",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-17",
    date: "2026-11-17",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Trinity FC",
    away: "Remy FC",
    round: "Week 3",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-18",
    date: "2026-11-19",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "ARK FC",
    away: "Jane FC",
    round: "Week 3",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-19",
    date: "2026-11-20",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "CKC FC",
    away: "BEN FC",
    round: "Week 3",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-20",
    date: "2026-11-21",
    time: "08:30",
    venue: "Caritas Main Stadium",
    home: "Elite FC",
    away: "IEA FC",
    round: "Week 3 · Morning",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-21",
    date: "2026-11-21",
    time: "16:30",
    venue: "Caritas Main Stadium",
    home: "Trinity FC",
    away: "Jane FC",
    round: "Week 3 · Evening",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  // Week 4 - Final Week
  {
    id: "cfa-2026-22",
    date: "2026-11-22",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Remy FC",
    away: "BEN FC",
    round: "Week 4",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-23",
    date: "2026-11-23",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "ARK FC",
    away: "IEA FC",
    round: "Week 4",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-24",
    date: "2026-11-24",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "CKC FC",
    away: "Elite FC",
    round: "Week 4",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-25",
    date: "2026-11-26",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Trinity FC",
    away: "BEN FC",
    round: "Week 4",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-26",
    date: "2026-11-27",
    time: "16:00",
    venue: "Caritas Main Stadium",
    home: "Jane FC",
    away: "IEA FC",
    round: "Week 4",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-27",
    date: "2026-11-28",
    time: "08:30",
    venue: "Caritas Main Stadium",
    home: "ARK FC",
    away: "CKC FC",
    round: "Week 4 · Morning",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  },
  {
    id: "cfa-2026-28",
    date: "2026-11-28",
    time: "16:30",
    venue: "Caritas Main Stadium",
    home: "Remy FC",
    away: "Elite FC",
    round: "Week 4 · Championship Finale",
    competition: "Caritas Football League 2026",
    competitionSlug: "caritas-football-league-2026",
    sport: "Football",
    sportSlug: "football",
    status: "scheduled"
  }
];

// Complete verified transfers as supplied in the official CFA announcements
export const transfers: Transfer[] = [
  // IEA FC
  { id: "tr-iea-01", athleteName: "Joseph", previousTeam: "Remy FC", newTeam: "IEA FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-iea-02", athleteName: "Danya", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-iea-03", athleteName: "Ubi John", previousTeam: "Elite FC", newTeam: "IEA FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-iea-04", athleteName: "Chike", previousTeam: "CKC FC", newTeam: "IEA FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-iea-05", athleteName: "Joseph", previousTeam: "Jane FC", newTeam: "IEA FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-iea-06", athleteName: "Santiago", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-iea-07", athleteName: "Bernard", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-iea-08", athleteName: "Max", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-iea-09", athleteName: "Samuel", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-iea-10", athleteName: "Emeka", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-iea-11", athleteName: "Haaland", previousTeam: "Remy FC", newTeam: "IEA FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-iea-12", athleteName: "Gideon", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-iea-13", athleteName: "Emmanuel", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-iea-14", athleteName: "Miracle", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-iea-15", athleteName: "Emezie", previousTeam: "Remy FC", newTeam: "IEA FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-iea-16", athleteName: "Billionaire Boi", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-iea-17", athleteName: "Steven", previousTeam: "Free Agent", newTeam: "IEA FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-iea-18", athleteName: "Zaza", previousTeam: "ARK FC", newTeam: "IEA FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },

  // ELITE FC
  { id: "tr-elt-01", athleteName: "Paschal", previousTeam: "ARK FC", newTeam: "Elite FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-elt-02", athleteName: "Ike", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-elt-03", athleteName: "Lawrence", previousTeam: "ARK FC", newTeam: "Elite FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-elt-04", athleteName: "Joseph", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-elt-05", athleteName: "JC", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-elt-06", athleteName: "Dice", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-elt-07", athleteName: "Machala", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-elt-08", athleteName: "Otika", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-elt-09", athleteName: "Nzenwa", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-elt-10", athleteName: "Paul", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-elt-11", athleteName: "Denco", previousTeam: "Remy FC", newTeam: "Elite FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-elt-12", athleteName: "Egede", previousTeam: "ARK FC", newTeam: "Elite FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-elt-13", athleteName: "Damon", previousTeam: "Free Agent", newTeam: "Elite FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-elt-14", athleteName: "Favour", previousTeam: "ARK FC", newTeam: "Elite FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },

  // JANE FC
  { id: "tr-jan-01", athleteName: "ThankGod", previousTeam: "Free Agent", newTeam: "Jane FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-jan-02", athleteName: "Hezes", previousTeam: "CKC FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-jan-03", athleteName: "Madugu", previousTeam: "BEN FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-jan-04", athleteName: "Chiwaya", previousTeam: "CKC FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-jan-05", athleteName: "Jude", previousTeam: "Free Agent", newTeam: "Jane FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-jan-06", athleteName: "Rahman Promise", previousTeam: "Remy FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-jan-07", athleteName: "Gucci Philip", previousTeam: "BEN FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-jan-08", athleteName: "Soft", previousTeam: "Remy FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-jan-09", athleteName: "Makuo", previousTeam: "Trinity FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-jan-10", athleteName: "Cypher jnr", previousTeam: "Trinity FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-jan-11", athleteName: "Kurah", previousTeam: "Trinity FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-jan-12", athleteName: "Obinna", previousTeam: "Trinity FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-jan-13", athleteName: "Xander", previousTeam: "Free Agent", newTeam: "Jane FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-jan-14", athleteName: "Joshua", previousTeam: "BEN FC", newTeam: "Jane FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },

  // BEN FC
  { id: "tr-ben-01", athleteName: "Boski", previousTeam: "Jane FC", newTeam: "BEN FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ben-02", athleteName: "Kelvin", previousTeam: "IEA FC", newTeam: "BEN FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ben-03", athleteName: "Gentle", previousTeam: "IEA FC", newTeam: "BEN FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ben-04", athleteName: "Kolu", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ben-05", athleteName: "Wisdom", previousTeam: "Elite FC", newTeam: "BEN FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ben-06", athleteName: "Enzo", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ben-07", athleteName: "Raphael", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ben-08", athleteName: "Drenzie", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ben-09", athleteName: "Number 2", previousTeam: "Elite FC", newTeam: "BEN FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ben-10", athleteName: "Presido", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ben-11", athleteName: "Ifeanyi Caninus", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-12", athleteName: "Gideon", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-13", athleteName: "Big Joe", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-14", athleteName: "Pere", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-15", athleteName: "Garba", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-16", athleteName: "VID", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-17", athleteName: "Bube", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-18", athleteName: "Ernest", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-19", athleteName: "Alex", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-20", athleteName: "Uchechukwu", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-21", athleteName: "Nonso", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-22", athleteName: "Wisdom (FA)", previousTeam: "Free Agent", newTeam: "BEN FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ben-23", athleteName: "Jefter", previousTeam: "Jane FC", newTeam: "BEN FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },

  // TRINITY FC
  { id: "tr-tri-01", athleteName: "Nero", previousTeam: "Jane FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-tri-02", athleteName: "Aisha", previousTeam: "CKC FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-tri-03", athleteName: "Kritolite", previousTeam: "IEA FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-tri-04", athleteName: "Miracle", previousTeam: "IEA FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-tri-05", athleteName: "Ifeanyi", previousTeam: "IEA FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-tri-06", athleteName: "Patoski", previousTeam: "Remy FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-tri-07", athleteName: "Eto", previousTeam: "Elite FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-tri-08", athleteName: "Modric", previousTeam: "Elite FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-tri-09", athleteName: "Lawson", previousTeam: "Remy FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-tri-10", athleteName: "Joseph", previousTeam: "Free Agent", newTeam: "Trinity FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-tri-11", athleteName: "Favourite", previousTeam: "ARK FC", newTeam: "Trinity FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },

  // ARK FC
  { id: "tr-ark-01", athleteName: "Sumudu", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ark-02", athleteName: "Joseph", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ark-03", athleteName: "Jesse", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ark-04", athleteName: "Dhevhine Joseph", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ark-05", athleteName: "Chime Valentine", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ark-06", athleteName: "Daniel", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ark-07", athleteName: "Ebube", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ark-08", athleteName: "KDB", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ark-09", athleteName: "Dexter", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ark-10", athleteName: "EIN", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ark-11", athleteName: "Henry", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ark-12", athleteName: "Victor", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ark-13", athleteName: "Lorenzo Victor", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ark-14", athleteName: "Davidson", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ark-15", athleteName: "Elon", previousTeam: "Free Agent", newTeam: "ARK FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },

  // CKC FC
  { id: "tr-ckc-01", athleteName: "Veron", previousTeam: "Free Agent", newTeam: "CKC FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ckc-02", athleteName: "Boma", previousTeam: "Remy FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ckc-03", athleteName: "Good news", previousTeam: "Remy FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-ckc-04", athleteName: "Lorex", previousTeam: "Remy FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ckc-05", athleteName: "Micheal", previousTeam: "Trinity FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ckc-06", athleteName: "Michael", previousTeam: "Free Agent", newTeam: "CKC FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-ckc-07", athleteName: "Maxwell", previousTeam: "ARK FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ckc-08", athleteName: "Vawulence jnr", previousTeam: "Trinity FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-ckc-09", athleteName: "Kelvin", previousTeam: "Free Agent", newTeam: "CKC FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ckc-10", athleteName: "Promise", previousTeam: "Remy FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ckc-11", athleteName: "De mask", previousTeam: "Remy FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ckc-12", athleteName: "Okoli", previousTeam: "Free Agent", newTeam: "CKC FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-ckc-13", athleteName: "Jose Maria", previousTeam: "BEN FC", newTeam: "CKC FC", transferType: "permanent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },

  // REMY FC
  { id: "tr-rmy-01", athleteName: "Franklin", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-rmy-02", athleteName: "Adriel", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-rmy-03", athleteName: "Draxy", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-28", status: "approved", sport: "Football" },
  { id: "tr-rmy-04", athleteName: "Emmanuel", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-rmy-05", athleteName: "Pedro", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-rmy-06", athleteName: "Henry", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-29", status: "approved", sport: "Football" },
  { id: "tr-rmy-07", athleteName: "Benedict", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-rmy-08", athleteName: "Declan", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-rmy-09", athleteName: "Emerie", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-30", status: "approved", sport: "Football" },
  { id: "tr-rmy-10", athleteName: "David", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-rmy-11", athleteName: "Ernest", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-rmy-12", athleteName: "Gabriel", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-rmy-13", athleteName: "Gerard", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-rmy-14", athleteName: "Evan", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" },
  { id: "tr-rmy-15", athleteName: "Benson", previousTeam: "Free Agent", newTeam: "Remy FC", transferType: "free_agent", season: "2026", date: "2026-10-31", status: "approved", sport: "Football" }
];

// Centralized athlete identities (supporting multiple sports, no year publicly exposed)
export const athletes: Athlete[] = [
  {
    id: "ath-modric",
    slug: "modric",
    name: "Modric O.",
    nickname: "The Maestro",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Key playmaker in midfield with exceptional vision and dead-ball accuracy. Moved to Trinity FC for the 2026 season.",
    department: "Computer Science",
    level: "300 Level",
    wing: "Block C",
    birthdayDayMonth: "14 September",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "trinity",
        teamName: "Trinity FC",
        position: "Midfielder",
        jerseyNumber: 10,
        appearances: 8,
        goals: 4,
        assists: 6
      },
      {
        sportSlug: "table-tennis",
        sportName: "Table Tennis",
        position: "Singles",
        rating: "Seed #4",
        appearances: 5
      }
    ],
    achievements: ["CFA Man of the Match (W1D1)", "2025 Midfielder of the Tournament Nominee"],
    socialInstagram: "@modric_cfa",
    status: "active"
  },
  {
    id: "ath-haaland",
    slug: "haaland",
    name: "Haaland B.",
    nickname: "CFA Cyborg",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Physical forward who converted from Remy FC to IEA FC. Renowned for heading power and clinical instinct.",
    department: "Business Administration",
    level: "200 Level",
    wing: "North Wing",
    birthdayDayMonth: "21 July",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "iea",
        teamName: "IEA FC",
        position: "Forward",
        jerseyNumber: 9,
        appearances: 9,
        goals: 7,
        assists: 2
      },
      {
        sportSlug: "basketball",
        sportName: "Basketball",
        position: "Power Forward",
        points: 44,
        appearances: 4
      }
    ],
    achievements: ["IEA Opening Day Scorer 2026", "Campus Golden Boot Runner-up 2025"],
    socialInstagram: "@haaland_iea",
    status: "active"
  },
  {
    id: "ath-paschal",
    slug: "paschal",
    name: "Paschal C.",
    nickname: "The Blade",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Dynamic winger who transferred from ARK FC to Elite FC. Explosive pace down the flank.",
    department: "Civil Engineering",
    level: "400 Level",
    wing: "West Wing",
    birthdayDayMonth: "08 March",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "elite",
        teamName: "Elite FC",
        position: "Winger",
        jerseyNumber: 7,
        appearances: 10,
        goals: 5,
        assists: 5
      },
      {
        sportSlug: "athletics",
        sportName: "Athletics",
        position: "100m / 200m Sprinter",
        personalBest: "10.82s (100m)",
        appearances: 6
      }
    ],
    achievements: ["2026 Transfer Headline", "Caritas Track 100m Silver Medalist"],
    socialInstagram: "@paschal_7",
    status: "active"
  },
  {
    id: "ath-thankgod",
    slug: "thankgod",
    name: "ThankGod E.",
    nickname: "TG Sniper",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bio: "Free kick specialist and Jane FC's marquee free-agent signing for the 2026 campaign.",
    department: "Microbiology",
    level: "100 Level",
    wing: "East Wing",
    birthdayDayMonth: "19 November",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "jane",
        teamName: "Jane FC",
        position: "Attacking Midfielder",
        jerseyNumber: 8,
        appearances: 6,
        goals: 3,
        assists: 3
      }
    ],
    achievements: ["Match Winner vs CKC (Week 1)", "CFA Rookie of the Week"],
    status: "active"
  },
  {
    id: "ath-nero",
    slug: "nero",
    name: "Nero K.",
    nickname: "El Comandante",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80",
    bio: "Leader in defense and penalty specialist. Made a high-profile move from Jane FC to Trinity FC.",
    department: "Electrical Engineering",
    level: "300 Level",
    wing: "Block C",
    birthdayDayMonth: "03 June",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "trinity",
        teamName: "Trinity FC",
        position: "Defender",
        jerseyNumber: 4,
        appearances: 12,
        goals: 2,
        assists: 1
      }
    ],
    achievements: ["Trinity FC Vice Captain", "Clean Sheet Leader 2025"],
    status: "active"
  },
  {
    id: "ath-wisdom",
    slug: "wisdom-ben",
    name: "Wisdom M.",
    nickname: "The Wall",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    bio: "Anchor in BEN FC's defensive midfield after switching colors from Elite FC.",
    department: "Economics",
    level: "200 Level",
    wing: "South Wing",
    birthdayDayMonth: "12 May",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "ben",
        teamName: "BEN FC",
        position: "Defensive Midfielder",
        jerseyNumber: 6,
        appearances: 8,
        goals: 1,
        assists: 4
      }
    ],
    status: "active"
  },
  {
    id: "ath-chike",
    slug: "chike-iea",
    name: "Chike O.",
    nickname: "Turbo",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    bio: "Right fullback known for stamina, tackling precision and rapid overlapping runs.",
    department: "Political Science",
    level: "300 Level",
    wing: "North Wing",
    birthdayDayMonth: "29 August",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "iea",
        teamName: "IEA FC",
        position: "Defender",
        jerseyNumber: 2,
        appearances: 7,
        goals: 0,
        assists: 3
      }
    ],
    status: "active"
  },
  {
    id: "ath-franklin-rmy",
    slug: "franklin-rmy",
    name: "Franklin N.",
    nickname: "The Panther",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Agile shot-stopper who secured Remy FC's net as a headline free agent acquisition.",
    department: "Computer Science",
    level: "200 Level",
    wing: "Hostel A",
    birthdayDayMonth: "17 October",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "remy",
        teamName: "Remy FC",
        position: "Goalkeeper",
        jerseyNumber: 1,
        appearances: 6
      }
    ],
    status: "active"
  },
  {
    id: "ath-morata",
    slug: "morata-remy",
    name: "Morata K.",
    nickname: "El Matador",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Sensational Remy FC striker who made Caritas Football League history on Matchday 4 with an astonishing 5-goal haul against ARK FC.",
    department: "Computer & Information Science",
    level: "300 Level",
    wing: "Hostel A",
    birthdayDayMonth: "04 May",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "remy",
        teamName: "Remy FC",
        position: "Striker",
        jerseyNumber: 9,
        appearances: 1,
        goals: 5,
        assists: 1,
        rating: "9.9"
      }
    ],
    achievements: ["5 Goals in One Match (Matchday 4)", "CFA Golden Boot Leader 2026", "Player of the Week (Week 1)"],
    status: "active"
  },
  {
    id: "ath-miracle",
    slug: "miracle-trinity",
    name: "Miracle C.",
    nickname: "The Magician",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bio: "Deadly Trinity FC winger with lightning acceleration and clinical finishing. Opened the scoring on Matchday 1 and struck again on Matchday 5.",
    department: "Civil Engineering",
    level: "200 Level",
    wing: "Block C",
    birthdayDayMonth: "18 June",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "trinity",
        teamName: "Trinity FC",
        position: "Winger",
        jerseyNumber: 11,
        appearances: 2,
        goals: 2,
        assists: 1
      }
    ],
    achievements: ["Matchday 1 Opening Goalscorer", "Trinity FC Key Attacker"],
    status: "active"
  },
  {
    id: "ath-morave",
    slug: "morave-elite",
    name: "Morave T.",
    nickname: "Thunderfoot",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Key attacking spark for Elite FC, scoring against BEN FC on Matchday 2 and equalizing against Trinity FC on Matchday 5.",
    department: "Physical Sciences",
    level: "300 Level",
    wing: "West Wing",
    birthdayDayMonth: "25 October",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "elite",
        teamName: "Elite FC",
        position: "Forward",
        jerseyNumber: 10,
        appearances: 2,
        goals: 2,
        assists: 0
      }
    ],
    achievements: ["Elite FC Top Scorer 2026"],
    status: "active"
  },
  {
    id: "ath-soft",
    slug: "soft-jane",
    name: "Soft O.",
    nickname: "Smooth Operator",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Jane FC's dynamic goalscorer who unlocked CKC FC with a sublime curling free kick on Matchday 3.",
    department: "Medical Laboratory Science",
    level: "200 Level",
    wing: "East Wing",
    birthdayDayMonth: "09 January",
    sports: [
      {
        sportSlug: "football",
        sportName: "Football",
        teamId: "jane",
        teamName: "Jane FC",
        position: "Forward",
        jerseyNumber: 7,
        appearances: 1,
        goals: 1,
        assists: 1
      }
    ],
    achievements: ["Matchday 3 Man of the Match"],
    status: "active"
  }
];

export const announcements: Announcement[] = [
  {
    id: "ann-01",
    slug: "transfer-window-officially-closed",
    title: "THE 2026 TRANSFER WINDOW IS OFFICIALLY CLOSED",
    body: `The Caritas Football Association (CFA) Executive Presidency hereby announces that the 2026 Season Transfer Window is NOW STRICTLY CLOSED.

All team rosters and official squad player allocations for the eight participating clubs have been finalized, sealed, and approved by the CFA Secretariat. 

No further player movements, club-to-club transfers, or late additions will be entertained for the duration of the current league campaign. Any student wishing to participate in future sports seasons may apply for upcoming sports trials through the official Student Trial Application portal.

Signed:
CFA PRESIDENT: LUKEEZE JESSE
ASST CFA PRESIDENT: DIKE SOMTOCHUKWU`,
    category: "transfers",
    sport: "Football",
    author: "Lukeeze Jesse & Dike Somtochukwu",
    authorRole: "CFA Executive Presidency",
    publishedAt: "2026-11-01",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "ann-02",
    slug: "official-instagram-page-launch",
    title: "CARITAS FOOTBALL ASSOCIATION — OFFICIAL INSTAGRAM PAGE",
    body: `We are pleased to officially announce the launch of the Caritas Football Association (CFA) Instagram page.

The page will keep us updated with everything happening around the association — league fixtures, match results, team updates, highlights, awards, announcements, pictures, and more.

We encourage everyone to follow the page, engage with our posts, and share the account with other members of the football community.

Let’s build the CFA community together!`,
    category: "instagram",
    sport: "Football",
    author: "CFA Media Office",
    authorRole: "Media Directorate",
    publishedAt: "2026-10-25",
    featured: true,
    coverImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    externalLink: {
      label: "Follow CFA on Instagram",
      url: "https://www.instagram.com/caritas_football?stkn=MWgyMnd4cXNpdHptNw%3D%3D&utm_source=qr"
    }
  },
  {
    id: "ann-03",
    slug: "new-coaches-contact-directory-2026",
    title: "New Team Coaches & Contact Directory for 2026 Season",
    body: `As we all know our school football league is coming and it has come to our notice that there are 100 level students who have interest in participating in the league.

Below are the contacts of the new coaches of each of the 8 teams. Message any coach you feel you want to join:

• Jane FC — Coach Ak
• CKC FC — Coach Chief001
• Ben FC — Coach 9zeros
• Elite FC — Coach Chukwu
• Trinity FC — Coach DC
• IEA FC — Coach Jk
• Remy FC — Coach (+234 904 598 8152)
• Ark FC — Coach CONFIDO

Reach out directly to arrange trials before squad lists lock.`,
    category: "competition",
    sport: "Football",
    author: "CFA Technical Committee",
    authorRole: "Technical Secretariat",
    publishedAt: "2026-10-26",
    featured: false,
    coverImage: "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80"
  }
];

export const newsArticles: NewsArticle[] = [
  {
    id: "news-01",
    slug: "opening-week-thrills-at-caritas-stadium",
    title: "Opening Week Delivers Blockbuster Football at Caritas Main Stadium",
    summary: "Trinity FC and BEN FC start strong while Jane FC grind out a hard-fought 1-0 win over CKC.",
    content: `The 2026 Caritas Football League exploded into life this November with packed terraces, high intensity and electric atmosphere at the Caritas Main Stadium. 

From the opening kickoff between Trinity FC and IEA FC to Jane FC's gritty defensive display against CKC FC, the standard of university football has reached unprecedented heights. With the transfer window now complete and team rosters fortified, the race for the 2026 silverware is officially blown wide open.`,
    coverImage: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    sport: "Football",
    author: "CFA Editorial Team",
    publishedAt: "2026-11-04",
    readTime: "3 min read",
    featured: true
  },
  {
    id: "news-02",
    slug: "tiktok-live-broadcasts-revolutionize-matchday",
    title: "TikTok LIVE Broadcasts Bring Caritas Matches to Students Everywhere",
    summary: "Real-time streaming integration allows fans across hostels and off-campus to follow every minute.",
    content: `In a landmark move for campus sports media, Caritas Sports Association has introduced integrated live streaming powered by TikTok LIVE and official broadcast feeds. Fans can now tune into high-stakes fixtures right from the CSA Match Centre or launch straight into TikTok to interact with fellow student supporters.`,
    coverImage: "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=1200&q=80",
    sport: "Association",
    author: "Digital Communications Unit",
    publishedAt: "2026-11-05",
    readTime: "2 min read",
    featured: false
  },
  {
    id: "news-03",
    slug: "multi-sport-expansion-basketball-volleyball-badminton",
    title: "Caritas Sports Association Prepares Basketball & Volleyball Calendar",
    summary: "The sports engine expands beyond football as indoor competitions schedule opening qualifiers.",
    content: `Following the successful kickoff of the Caritas Football Association league, the central sports directorate has confirmed that basketball, volleyball, badminton and athletics competitions are finalizing their registration brackets for the ongoing semester.`,
    coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    sport: "Association",
    author: "Directorate of Sports",
    publishedAt: "2026-11-05",
    readTime: "4 min read",
    featured: false
  }
];

export const officials: Official[] = [
  {
    id: "off-01",
    name: "Lukeeze Jesse",
    role: "President",
    title: "President, Caritas Football Association (CFA)",
    department: "Executive Council",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Head of the Caritas Football Association, championing league professionalism, player welfare and digital transformation."
  },
  {
    id: "off-02",
    name: "Dike Somtochukwu",
    role: "Assistant President",
    title: "Assistant President, Caritas Football Association",
    department: "Executive Council",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Co-chair of the CFA Executive Council and supervisor of competition scheduling and disciplinary affairs."
  },
  {
    id: "off-03",
    name: "Dr. K. Anyanwu",
    role: "Director of Sports",
    title: "Director of Sports, Caritas University",
    department: "University Sports Directorate",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Oversees athletic programmes across all sports, facilities management and collegiate compliance."
  },
  {
    id: "off-04",
    name: "Engr. Jude N.",
    role: "Chief Match Commissioner",
    title: "Head of Match Operations & Logistics",
    department: "Technical Secretariat",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Directs pitch inspection, fixture adjudication and official match reports."
  },
  {
    id: "off-05",
    name: "Michael Chukwuma",
    role: "Chief Referee",
    title: "Head of Refereeing Council",
    department: "Officiating Board",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    bio: "FIFA-certified collegiate official managing referee appointments and fair play enforcement."
  }
];

export const mediaAssets: MediaAsset[] = [
  {
    id: "med-01",
    title: "Opening Day Stadium Atmosphere",
    description: "Packed stands at Caritas Main Stadium for Trinity vs IEA.",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    category: "match",
    sport: "Football",
    createdAt: "2026-11-01"
  },
  {
    id: "med-02",
    title: "Official Transfer Window Announcement Flyer",
    description: "Official promotional flyer signed by CFA presidency.",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    category: "flyer",
    sport: "Football",
    createdAt: "2026-10-27"
  },
  {
    id: "med-03",
    title: "CFA Official Instagram Launch Flyer",
    description: "Community call to follow @caritas_football.",
    url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
    category: "flyer",
    sport: "Football",
    createdAt: "2026-10-25"
  },
  {
    id: "med-04",
    title: "Trinity FC Squad Celebration",
    description: "Team huddle following their 3-1 victory.",
    url: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&q=80",
    category: "team",
    sport: "Football",
    createdAt: "2026-11-01"
  },
  {
    id: "med-05",
    title: "Indoor Arena Basketball Setup",
    description: "Preparations underway for the Caritas Basketball Championship.",
    url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    category: "match",
    sport: "Basketball",
    createdAt: "2026-11-03"
  },
  {
    id: "med-06",
    title: "Volleyball Court Opening",
    description: "Caritas sports pavilion volleyball court.",
    url: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=80",
    category: "match",
    sport: "Volleyball",
    createdAt: "2026-11-04",
    status: "approved"
  }
];

export const initialTrialApplications: import("@/domain/types").TrialApplication[] = [
  {
    id: "trial-01",
    fullName: "Chidubem Okafor",
    matricNumber: "CU/2026/ENG/0145",
    department: "Mechanical Engineering",
    level: "100 Level",
    phoneWhatsApp: "+234 814 223 9988",
    sportSlug: "football",
    sportName: "Football",
    preferredTeamId: "trinity",
    preferredTeamName: "Trinity FC",
    positionOrEvent: "Right Winger",
    experienceNotes: "Captain of high school varsity football team. Fast pace, good cross accuracy.",
    appliedAt: "2026-11-04",
    status: "pending"
  },
  {
    id: "trial-02",
    fullName: "Onyinyechi Eze",
    matricNumber: "CU/2025/SCI/0411",
    department: "Biochemistry",
    level: "200 Level",
    phoneWhatsApp: "+234 803 771 2234",
    sportSlug: "volleyball",
    sportName: "Volleyball",
    positionOrEvent: "Setter / Opposite Hitter",
    experienceNotes: "Represented faculty at inter-departmental sports meet. Strong serving.",
    appliedAt: "2026-11-05",
    status: "pending"
  },
  {
    id: "trial-03",
    fullName: "Kelechi Nnamdi",
    matricNumber: "CU/2024/LAW/0087",
    department: "Law",
    level: "300 Level",
    phoneWhatsApp: "+234 905 112 3344",
    sportSlug: "basketball",
    sportName: "Basketball",
    positionOrEvent: "Point Guard",
    experienceNotes: "Inter-hostel basketball tournament finalist 2025. Excellent court vision.",
    appliedAt: "2026-11-05",
    status: "approved"
  }
];

export const initialLeaderboard: import("@/domain/types").PredictorLeaderboardUser[] = [
  { id: "usr-1", name: "Chisom Valentine", nickname: "Oracle CFA", department: "Computer Science", level: "300 Level", pointsWon: 4850, accuracyRate: 84, rank: 1 },
  { id: "usr-2", name: "Daniel Kene", nickname: "Tactico", department: "Electrical Engineering", level: "400 Level", pointsWon: 4120, accuracyRate: 79, rank: 2 },
  { id: "usr-3", name: "Blessing Okeke", nickname: "Queen B", department: "Accounting", level: "200 Level", pointsWon: 3790, accuracyRate: 75, rank: 3 },
  { id: "usr-4", name: "Somtochukwu P.", nickname: "Goal Hunter", department: "Law", level: "200 Level", pointsWon: 3410, accuracyRate: 71, rank: 4 },
  { id: "usr-5", name: "Franklyn Jude", nickname: "StatsMaster", department: "Economics", level: "100 Level", pointsWon: 2950, accuracyRate: 68, rank: 5 }
];

export const initialSponsorPledges: import("@/domain/types").SponsorRewardPledge[] = [
  {
    id: "sp-01",
    sponsorName: "Caritas Tech Alumni Network",
    sponsorTitle: "Alumni Patron Chapter",
    rewardTitle: "₦20,000 Data Bundle / Airtime Rewards",
    rewardDescription: "Split among the Top 3 student predictors on the Leaderboard for Week 1 fixtures.",
    targetWeek: "Week 1",
    status: "active"
  },
  {
    id: "sp-02",
    sponsorName: "Hackverse Technologies",
    sponsorTitle: "Lead Technology Partner",
    rewardTitle: "Hackverse Campus Developer Swag & ₦15,000 Cash Prize",
    rewardDescription: "Awarded to the student with the highest correct score prediction streak in November.",
    targetWeek: "All Weeks",
    status: "active"
  },
  {
    id: "sp-03",
    sponsorName: "Campus Cafeteria & Lounge",
    sponsorTitle: "Student Welfare Sponsor",
    rewardTitle: "Weekly Free Matchday Lunch Vouchers",
    rewardDescription: "Awarded to the #1 predictor on each Friday Night clash.",
    targetWeek: "Week 2",
    status: "active"
  }
];

export const initialJournalistApplications: import("@/domain/types").JournalistApplication[] = [
  {
    id: "ja-01",
    fullName: "Emmanuel Nwosu",
    matricNumber: "CU/2023/CS/1042",
    department: "Mass Communication",
    level: "300 Level",
    phoneWhatsApp: "+234 812 345 6789",
    preferredSport: "Football",
    sampleArticle: "Trinity FC demonstrated unmatched tactical fluidity against IEA on opening day. Nero commanded the backline with poise while Modric dictated the tempo from deep midfield.",
    appliedAt: "2026-11-04",
    status: "pending"
  },
  {
    id: "ja-02",
    fullName: "Khadija Usman",
    matricNumber: "CU/2024/ENG/0291",
    department: "English & Literary Studies",
    level: "200 Level",
    phoneWhatsApp: "+234 809 876 5432",
    preferredSport: "Basketball",
    sampleArticle: "The impending tip-off of the Caritas Basketball Championship brings fresh anticipation to campus. Fast-break transitions and high-percentage perimeter shooting will define the 2026 title race.",
    appliedAt: "2026-11-05",
    status: "approved"
  }
];

