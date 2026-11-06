export type ParticipantType = "team" | "individual" | "both";

export type CompetitionFormat = "league" | "knockout" | "group_stage" | "round_robin" | "tournament" | "custom";

export interface SportFeatures {
  fixtures: boolean;
  liveScoring: boolean;
  standings: boolean;
  rankings: boolean;
  brackets: boolean;
  statistics: boolean;
  transfers: boolean;
  rosters: boolean;
  betting?: boolean;
}

export interface Sport {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  participantType: ParticipantType;
  competitionFormats: CompetitionFormat[];
  positions: string[];
  scoringModel: "goals" | "points_quarters" | "sets_volleyball" | "sets_badminton" | "sets_table_tennis" | "time_distance";
  features: SportFeatures;
  active: boolean;
  icon: string;
  countLabel: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  sport: string;
  sportSlug: string;
  color: string;
  crestColor?: string;
  coach: string;
  assistantCoach?: string;
  teamManager?: string;
  bio?: string;
  department?: string;
  wing?: string;
  foundedYear?: number;
  rosterCount?: number;
  logoUrl?: string;
}

export type MatchStatus =
  | "scheduled"
  | "live"
  | "half_time"
  | "completed"
  | "postponed"
  | "cancelled"
  | "abandoned"
  | "suspended"
  | "delayed";

export type StreamProvider = "tiktok" | "youtube" | "facebook" | "external";

export interface LiveStreamConfig {
  provider: StreamProvider;
  url: string;
  status: "scheduled" | "live" | "ended" | "unavailable";
  title?: string;
  embedAllowed?: boolean;
}

export type MatchEventType =
  | "goal"
  | "yellow_card"
  | "red_card"
  | "substitution"
  | "point"
  | "quarter_end"
  | "set_end"
  | "assist"
  | "foul";

export interface MatchEvent {
  id: string;
  matchId: string;
  minute: number;
  period?: string;
  type: MatchEventType;
  team: "home" | "away";
  playerName: string;
  detail?: string;
}

export interface MatchStatistics {
  possession?: [number, number];
  shots?: [number, number];
  shotsOnTarget?: [number, number];
  fouls?: [number, number];
  yellowCards?: [number, number];
  redCards?: [number, number];
  corners?: [number, number];
  quarters?: Array<[number, number]>;
  sets?: Array<[number, number]>;
}

export interface TeamLineup {
  startingEleven: string[];
  substitutes: string[];
  formation?: string;
}

export interface Fixture {
  id: string;
  date: string;
  time?: string;
  venue?: string;
  home: string;
  away: string;
  homeId?: string;
  awayId?: string;
  round: string;
  competition: string;
  competitionSlug?: string;
  sport: string;
  sportSlug: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  liveMinute?: number;
  period?: string;
  events?: MatchEvent[];
  stats?: MatchStatistics[];
  officials?: string[];
  stream?: LiveStreamConfig;
  commentary?: Array<{ id: string; minute: number; text: string }>;
  homeLineup?: TeamLineup;
  awayLineup?: TeamLineup;
}

export interface AthleteSportProfile {
  sportSlug: string;
  sportName: string;
  teamId?: string;
  teamName?: string;
  position?: string;
  jerseyNumber?: number;
  appearances?: number;
  goals?: number;
  assists?: number;
  points?: number;
  personalBest?: string;
  rating?: string;
}

export interface Athlete {
  id: string;
  slug: string;
  name: string;
  nickname?: string;
  image: string | null;
  bio?: string;
  department: string;
  level: string; // "100", "200", "300", "400", "Postgrad"
  wing?: string;
  birthdayDayMonth: string; // e.g. "15 August" - NO YEAR EXPOSED PUBLICLY
  sports: AthleteSportProfile[];
  achievements?: string[];
  socialInstagram?: string;
  status: "active" | "injured" | "suspended" | "pending_verification";
}

export type TransferType = "permanent" | "loan" | "free_agent" | "release" | "return_from_loan";
export type TransferStatus = "approved" | "pending" | "rejected" | "cancelled";

export interface Transfer {
  id: string;
  athleteId?: string;
  athleteName: string;
  previousTeam: string;
  newTeam: string;
  transferType: TransferType;
  season: string;
  date: string;
  status: TransferStatus;
  approvedBy?: string;
  notes?: string;
  sport: string;
}

export interface Announcement {
  id: string;
  slug: string;
  title: string;
  body: string;
  category: "official" | "transfers" | "competition" | "general" | "instagram";
  sport?: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  featured: boolean;
  coverImage?: string;
  externalLink?: { label: string; url: string };
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  coverImage: string;
  sport: string;
  author: string;
  authorRole?: string;
  isVerifiedJournalist?: boolean;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
}

export interface JournalistApplication {
  id: string;
  fullName: string;
  matricNumber: string;
  department: string;
  level: string;
  phoneWhatsApp: string;
  preferredSport: string;
  sampleArticle: string;
  appliedAt: string;
  status: "pending" | "approved" | "rejected";
}

export interface TrialApplication {
  id: string;
  fullName: string;
  matricNumber: string;
  department: string;
  level: string;
  phoneWhatsApp: string;
  sportSlug: string;
  sportName: string;
  preferredTeamId?: string;
  preferredTeamName?: string;
  positionOrEvent: string;
  experienceNotes?: string;
  photoUrl?: string;
  appliedAt: string;
  status: "pending" | "approved" | "rejected";
  adminFeedback?: string;
}

// -------------------------------------------------------------
// FAN PREDICTIONS & BETTING (NO REAL MONEY - PURE FUN & GLORY)
// -------------------------------------------------------------
export interface BettingOdds {
  homeWin: number;
  draw: number;
  awayWin: number;
  over25: number;
  under25: number;
  correctScores: Record<string, number>; // e.g. "1-0": 6.5, "2-1": 7.0
  goalscorers?: Array<{ playerName: string; team: string; odds: number }>;
}

export interface PredictionBet {
  id: string;
  fixtureId: string;
  fixtureTitle: string;
  marketType: "match_result" | "over_under" | "correct_score" | "player_to_score";
  selection: string; // e.g. "Trinity FC", "Over 2.5", "2-1", "Modric"
  odds: number;
  stakedPoints: number;
  potentialPoints: number;
  status: "pending" | "won" | "lost";
  placedAt: string;
}

export interface PredictorLeaderboardUser {
  id: string;
  name: string;
  nickname?: string;
  department: string;
  level: string;
  pointsWon: number;
  accuracyRate: number; // e.g. 74%
  rank: number;
  avatarUrl?: string;
}

export interface SponsorRewardPledge {
  id: string;
  sponsorName: string;
  sponsorTitle: string;
  rewardTitle: string;
  rewardDescription: string;
  targetWeek: string;
  sponsorLogoUrl?: string;
  status: "active" | "awarded";
}

export interface MediaAsset {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: "match" | "flyer" | "team" | "ceremony";
  sport: string;
  createdAt: string;
  status?: "approved" | "pending" | "rejected";
  uploadedBy?: string;
  sourceType?: "upload" | "url";
}

export interface Official {
  id: string;
  name: string;
  role: string;
  title: string;
  department?: string;
  image?: string;
  contact?: string;
  bio?: string;
}

export interface StandingRow {
  position: number;
  team: string;
  shortName: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: Array<"W" | "D" | "L">;
}

export type UserRole =
  | "super_admin"
  | "association_president"
  | "association_admin"
  | "sports_director"
  | "sport_manager"
  | "competition_manager"
  | "coach"
  | "team_manager"
  | "referee"
  | "media_manager"
  | "athlete";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  provider: "google" | "anonymous";
}

export interface UserSession {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  assignedSport?: string;
  assignedTeam?: string;
}
