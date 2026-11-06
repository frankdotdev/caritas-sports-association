"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type {
  Sport,
  Team,
  Fixture,
  Athlete,
  Transfer,
  Announcement,
  NewsArticle,
  Official,
  MediaAsset,
  StandingRow,
  UserSession,
  UserRole,
  MatchEvent,
  LiveStreamConfig,
  PredictionBet,
  PredictorLeaderboardUser,
  SponsorRewardPledge,
  JournalistApplication,
  TrialApplication,
  AuthUser
} from "@/domain/types";
import {
  sports as initialSports,
  teams as initialTeams,
  fixtures as initialFixtures,
  transfers as initialTransfers,
  athletes as initialAthletes,
  announcements as initialAnnouncements,
  newsArticles as initialNews,
  officials as initialOfficials,
  mediaAssets as initialMedia,
  standings as initialStandings,
  initialLeaderboard,
  initialSponsorPledges,
  initialJournalistApplications,
  initialTrialApplications
} from "@/lib/mock-data";

export interface SportsAppContextType {
  // Data
  sports: Sport[];
  teams: Team[];
  fixtures: Fixture[];
  transfers: Transfer[];
  athletes: Athlete[];
  announcements: Announcement[];
  newsArticles: NewsArticle[];
  officials: Official[];
  mediaAssets: MediaAsset[];
  standings: StandingRow[];
  currentSession: UserSession;

  // Google Authentication
  authUser: AuthUser | null;
  signInWithGoogle: (customData?: Partial<AuthUser>) => void;
  signOut: () => void;

  // Student Trials & Applications
  trialApplications: TrialApplication[];
  applyForTrial: (app: Omit<TrialApplication, "id" | "appliedAt" | "status">) => void;
  approveTrial: (id: string, notes?: string) => void;
  rejectTrial: (id: string, notes?: string) => void;

  // Transfer Window Status
  isFootballTransferWindowOpen: boolean;

  // Direct Athlete Registration (Admin)
  directRegisterAthlete: (athlete: Omit<Athlete, "id">) => void;

  // Fan Predictions & Betting (Free Fun / Campus Glory)
  fanTokens: number;
  userBets: PredictionBet[];
  leaderboard: PredictorLeaderboardUser[];
  sponsorPledges: SponsorRewardPledge[];
  placePredictionBet: (bet: Omit<PredictionBet, "id" | "placedAt" | "status">) => boolean;
  addSponsorPledge: (pledge: Omit<SponsorRewardPledge, "id" | "status">) => void;

  // Sports Journalists
  journalistApplications: JournalistApplication[];
  applyForJournalist: (app: Omit<JournalistApplication, "id" | "appliedAt" | "status">) => void;
  approveJournalist: (id: string) => void;
  rejectJournalist: (id: string) => void;

  // Actions
  switchRole: (role: UserRole) => void;

  // Sport actions
  addSport: (sport: Omit<Sport, "id">) => void;
  updateSport: (id: string, updates: Partial<Sport>) => void;
  deleteSport: (id: string) => void;
  toggleSportActive: (id: string) => void;

  // Team actions
  addTeam: (team: Omit<Team, "id">) => void;
  updateTeam: (id: string, updates: Partial<Team>) => void;
  deleteTeam: (id: string) => void;

  // Athlete actions
  addAthlete: (athlete: Omit<Athlete, "id">) => void;
  updateAthlete: (id: string, updates: Partial<Athlete>) => void;
  deleteAthlete: (id: string) => void;

  // Fixture / Match actions
  updateFixture: (id: string, updates: Partial<Fixture>) => void;
  updateFixtureScore: (id: string, homeScore: number, awayScore: number, status?: Fixture["status"]) => void;
  updateFixtureStatus: (id: string, status: Fixture["status"], minute?: number, period?: string) => void;
  updateFixtureLineup: (id: string, homeStartingXI: string[], awayStartingXI: string[]) => void;
  addMatchEvent: (matchId: string, event: Omit<MatchEvent, "id" | "matchId">) => void;
  updateMatchStream: (matchId: string, stream: LiveStreamConfig) => void;
  addMatchCommentary: (matchId: string, text: string, minute: number) => void;

  // Transfer actions
  submitTransfer: (transfer: Omit<Transfer, "id" | "date" | "status">) => void;
  approveTransfer: (id: string) => void;
  rejectTransfer: (id: string, reason?: string) => void;

  // Announcement & News actions
  publishAnnouncement: (announcement: Omit<Announcement, "id" | "publishedAt">) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  publishNews: (article: Omit<NewsArticle, "id" | "publishedAt">) => void;
  updateNews: (id: string, updates: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  // Media actions
  uploadMedia: (asset: Omit<MediaAsset, "id" | "createdAt">) => void;
  submitCrowdsourcedMedia: (asset: Omit<MediaAsset, "id" | "createdAt" | "status">) => void;
  approveMedia: (id: string) => void;
  rejectMedia: (id: string) => void;
  deleteMedia: (id: string) => void;

  // Reset to initial seed
  resetToSeeds: () => void;
}

const defaultSession: UserSession = {
  id: "user-admin",
  name: "Lukeeze Jesse",
  role: "super_admin",
  roleLabel: "Super Admin / CFA President",
  assignedSport: "football",
  assignedTeam: "trinity"
};

const SportsAppContext = createContext<SportsAppContextType | undefined>(undefined);

const STORAGE_KEY = "csa_platform_state_v4";

export function SportsAppProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [sports, setSports] = useState<Sport[]>(initialSports);
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [fixtures, setFixtures] = useState<Fixture[]>(initialFixtures);
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(initialNews);
  const [officials] = useState<Official[]>(initialOfficials);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(initialMedia);
  const [standings, setStandings] = useState<StandingRow[]>(initialStandings);
  const [currentSession, setCurrentSession] = useState<UserSession>(defaultSession);

  // Predictions state
  const [fanTokens, setFanTokens] = useState<number>(1000);
  const [userBets, setUserBets] = useState<PredictionBet[]>([]);
  const [leaderboard, setLeaderboard] = useState<PredictorLeaderboardUser[]>(initialLeaderboard);
  const [sponsorPledges, setSponsorPledges] = useState<SponsorRewardPledge[]>(initialSponsorPledges);
  const [journalistApplications, setJournalistApplications] = useState<JournalistApplication[]>(initialJournalistApplications);
  const [trialApplications, setTrialApplications] = useState<TrialApplication[]>(initialTrialApplications);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const isFootballTransferWindowOpen = false; // Strictly closed per CFA Secretariat

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.sports) setSports(parsed.sports);
        if (parsed.teams) setTeams(parsed.teams);
        if (parsed.fixtures) setFixtures(parsed.fixtures);
        if (parsed.transfers) setTransfers(parsed.transfers);
        if (parsed.athletes) setAthletes(parsed.athletes);
        if (parsed.announcements) setAnnouncements(parsed.announcements);
        if (parsed.newsArticles) setNewsArticles(parsed.newsArticles);
        if (parsed.mediaAssets) setMediaAssets(parsed.mediaAssets);
        if (parsed.standings) setStandings(parsed.standings);
        if (parsed.currentSession) setCurrentSession(parsed.currentSession);
        if (parsed.fanTokens !== undefined) setFanTokens(parsed.fanTokens);
        if (parsed.userBets) setUserBets(parsed.userBets);
        if (parsed.leaderboard) setLeaderboard(parsed.leaderboard);
        if (parsed.sponsorPledges) setSponsorPledges(parsed.sponsorPledges);
        if (parsed.journalistApplications) setJournalistApplications(parsed.journalistApplications);
        if (parsed.trialApplications) setTrialApplications(parsed.trialApplications);
        if (parsed.authUser) setAuthUser(parsed.authUser);
      }
    } catch {
      // Fallback to initial seeds
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload = {
        sports,
        teams,
        fixtures,
        transfers,
        athletes,
        announcements,
        newsArticles,
        mediaAssets,
        standings,
        currentSession,
        fanTokens,
        userBets,
        leaderboard,
        sponsorPledges,
        journalistApplications,
        trialApplications,
        authUser
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  }, [
    hydrated,
    sports,
    teams,
    fixtures,
    transfers,
    athletes,
    announcements,
    newsArticles,
    mediaAssets,
    standings,
    currentSession,
    fanTokens,
    userBets,
    leaderboard,
    sponsorPledges,
    journalistApplications,
    trialApplications,
    authUser
  ]);

  const placePredictionBet = (bet: Omit<PredictionBet, "id" | "placedAt" | "status">): boolean => {
    if (fanTokens < bet.stakedPoints) {
      alert("Insufficient Fan Tokens! Wait for your next token recharge.");
      return false;
    }
    const newBet: PredictionBet = {
      ...bet,
      id: `bet-${Date.now()}`,
      placedAt: new Date().toISOString(),
      status: "pending"
    };
    setFanTokens(prev => prev - bet.stakedPoints);
    setUserBets(prev => [newBet, ...prev]);
    return true;
  };

  const addSponsorPledge = (pledge: Omit<SponsorRewardPledge, "id" | "status">) => {
    const newPledge: SponsorRewardPledge = {
      ...pledge,
      id: `sp-${Date.now()}`,
      status: "active"
    };
    setSponsorPledges(prev => [newPledge, ...prev]);
  };

  const applyForJournalist = (app: Omit<JournalistApplication, "id" | "appliedAt" | "status">) => {
    const newApp: JournalistApplication = {
      ...app,
      id: `ja-${Date.now()}`,
      appliedAt: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    setJournalistApplications(prev => [newApp, ...prev]);
  };

  const approveJournalist = (id: string) => {
    setJournalistApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: "approved" } : app))
    );
  };

  const rejectJournalist = (id: string) => {
    setJournalistApplications(prev =>
      prev.map(app => (app.id === id ? { ...app, status: "rejected" } : app))
    );
  };

  const switchRole = (role: UserRole) => {
    const roleLabels: Record<UserRole, string> = {
      super_admin: "Super Admin (Full Access)",
      association_president: "Association President (Lukeeze Jesse)",
      association_admin: "Association Administrator",
      sports_director: "Sports Director (Dr. K. Anyanwu)",
      sport_manager: "Sport Manager (CFA Coordinator)",
      competition_manager: "Competition Manager (2026 League)",
      coach: "Team Coach (Trinity FC - DC)",
      team_manager: "Team Manager (IEA FC)",
      referee: "Match Official / Referee",
      media_manager: "Media & PR Manager",
      athlete: "Athlete / Player View"
    };

    setCurrentSession({
      id: `user-${role}`,
      name: role === "super_admin" || role === "association_president" ? "Lukeeze Jesse" : role === "coach" ? "Coach DC" : "Official User",
      role,
      roleLabel: roleLabels[role],
      assignedSport: "football",
      assignedTeam: role === "coach" ? "trinity" : undefined
    });
  };

  const addSport = (sport: Omit<Sport, "id">) => {
    const newSport: Sport = {
      ...sport,
      id: sport.slug || `sport-${Date.now()}`
    };
    setSports(prev => [...prev, newSport]);
  };

  const updateSport = (id: string, updates: Partial<Sport>) => {
    setSports(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSport = (id: string) => {
    setSports(prev => prev.filter(s => s.id !== id));
  };

  const toggleSportActive = (id: string) => {
    setSports(prev => prev.map(s => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  const addTeam = (team: Omit<Team, "id">) => {
    const newTeam: Team = {
      ...team,
      id: team.slug || `team-${Date.now()}`
    };
    setTeams(prev => [...prev, newTeam]);
  };

  const updateTeam = (id: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  };

  const deleteTeam = (id: string) => {
    setTeams(prev => prev.filter(t => t.id !== id));
  };

  const addAthlete = (athlete: Omit<Athlete, "id">) => {
    const newAthlete: Athlete = {
      ...athlete,
      id: `ath-${Date.now()}`
    };
    setAthletes(prev => [newAthlete, ...prev]);
  };

  const updateAthlete = (id: string, updates: Partial<Athlete>) => {
    setAthletes(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAthlete = (id: string) => {
    setAthletes(prev => prev.filter(a => a.id !== id));
  };

  const updateFixture = (id: string, updates: Partial<Fixture>) => {
    setFixtures(prev => prev.map(f => (f.id === id ? { ...f, ...updates } : f)));
  };

  const updateFixtureScore = (id: string, homeScore: number, awayScore: number, status?: Fixture["status"]) => {
    setFixtures(prev =>
      prev.map(f => {
        if (f.id !== id) return f;
        return {
          ...f,
          homeScore,
          awayScore,
          status: status || f.status
        };
      })
    );
  };

  const updateFixtureStatus = (id: string, status: Fixture["status"], minute?: number, period?: string) => {
    setFixtures(prev =>
      prev.map(f => {
        if (f.id !== id) return f;
        return {
          ...f,
          status,
          liveMinute: minute !== undefined ? minute : f.liveMinute,
          period: period !== undefined ? period : f.period
        };
      })
    );
  };

  const updateFixtureLineup = (id: string, homeStartingXI: string[], awayStartingXI: string[]) => {
    setFixtures(prev =>
      prev.map(f => {
        if (f.id !== id) return f;
        return {
          ...f,
          homeLineup: {
            formation: "4-3-3",
            startingEleven: homeStartingXI,
            substitutes: []
          },
          awayLineup: {
            formation: "4-3-3",
            startingEleven: awayStartingXI,
            substitutes: []
          }
        };
      })
    );
  };

  const addMatchEvent = (matchId: string, event: Omit<MatchEvent, "id" | "matchId">) => {
    const newEvent: MatchEvent = {
      ...event,
      id: `ev-${Date.now()}`,
      matchId
    };

    setFixtures(prev =>
      prev.map(f => {
        if (f.id !== matchId) return f;
        const currentEvents = f.events || [];
        const updatedEvents = [...currentEvents, newEvent];

        let updatedHome = f.homeScore ?? 0;
        let updatedAway = f.awayScore ?? 0;
        if (event.type === "goal") {
          if (event.team === "home") updatedHome += 1;
          else updatedAway += 1;
        }

        return {
          ...f,
          homeScore: updatedHome,
          awayScore: updatedAway,
          events: updatedEvents
        };
      })
    );
  };

  const updateMatchStream = (matchId: string, stream: LiveStreamConfig) => {
    setFixtures(prev =>
      prev.map(f => {
        if (f.id !== matchId) return f;
        return {
          ...f,
          stream
        };
      })
    );
  };

  const addMatchCommentary = (matchId: string, text: string, minute: number) => {
    setFixtures(prev =>
      prev.map(f => {
        if (f.id !== matchId) return f;
        const comm = f.commentary || [];
        return {
          ...f,
          commentary: [{ id: `comm-${Date.now()}`, minute, text }, ...comm]
        };
      })
    );
  };

  const submitTransfer = (transfer: Omit<Transfer, "id" | "date" | "status">) => {
    const newTransfer: Transfer = {
      ...transfer,
      id: `tr-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    setTransfers(prev => [newTransfer, ...prev]);
  };

  const approveTransfer = (id: string) => {
    setTransfers(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        return {
          ...t,
          status: "approved",
          approvedBy: currentSession.name
        };
      })
    );
  };

  const rejectTransfer = (id: string, reason?: string) => {
    setTransfers(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        return {
          ...t,
          status: "rejected",
          notes: reason || "Rejected by administration"
        };
      })
    );
  };

  const publishAnnouncement = (announcement: Omit<Announcement, "id" | "publishedAt">) => {
    const newAnn: Announcement = {
      ...announcement,
      id: `ann-${Date.now()}`,
      publishedAt: new Date().toISOString().split("T")[0]
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const publishNews = (article: Omit<NewsArticle, "id" | "publishedAt">) => {
    const newArticle: NewsArticle = {
      ...article,
      id: `news-${Date.now()}`,
      publishedAt: new Date().toISOString().split("T")[0]
    };
    setNewsArticles(prev => [newArticle, ...prev]);
  };

  const updateNews = (id: string, updates: Partial<NewsArticle>) => {
    setNewsArticles(prev => prev.map(a => (a.id === id ? { ...a, ...updates } : a)));
  };

  const deleteNews = (id: string) => {
    setNewsArticles(prev => prev.filter(a => a.id !== id));
  };

  const uploadMedia = (asset: Omit<MediaAsset, "id" | "createdAt">) => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      status: "approved"
    };
    setMediaAssets(prev => [newAsset, ...prev]);
  };

  const submitCrowdsourcedMedia = (asset: Omit<MediaAsset, "id" | "createdAt" | "status">) => {
    const newAsset: MediaAsset = {
      ...asset,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      status: "pending",
      sourceType: asset.sourceType || "upload"
    };
    setMediaAssets(prev => [newAsset, ...prev]);
  };

  const approveMedia = (id: string) => {
    setMediaAssets(prev => prev.map(m => (m.id === id ? { ...m, status: "approved" } : m)));
  };

  const rejectMedia = (id: string) => {
    setMediaAssets(prev => prev.map(m => (m.id === id ? { ...m, status: "rejected" } : m)));
  };

  const deleteMedia = (id: string) => {
    setMediaAssets(prev => prev.filter(m => m.id !== id));
  };

  // Student trials & team applications
  const applyForTrial = (app: Omit<TrialApplication, "id" | "appliedAt" | "status">) => {
    const newApp: TrialApplication = {
      ...app,
      id: `trial-${Date.now()}`,
      appliedAt: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    setTrialApplications(prev => [newApp, ...prev]);
  };

  const approveTrial = (id: string, notes?: string) => {
    const app = trialApplications.find(a => a.id === id);
    if (app) {
      // Create new athlete profile for the accepted student!
      const athleteSlug = app.fullName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newAthlete: Athlete = {
        id: `ath-${Date.now()}`,
        slug: athleteSlug,
        name: app.fullName,
        image: app.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
        bio: `${app.fullName} joined ${app.sportName} via the Student Sports Application portal. ${app.experienceNotes || ""}`,
        department: app.department,
        level: app.level,
        birthdayDayMonth: "01 January",
        status: "active",
        sports: [
          {
            sportSlug: app.sportSlug,
            sportName: app.sportName,
            teamId: app.preferredTeamId,
            teamName: app.preferredTeamName,
            position: app.positionOrEvent,
            appearances: 0,
            goals: 0,
            assists: 0
          }
        ]
      };
      setAthletes(prev => [newAthlete, ...prev]);
    }
    setTrialApplications(prev => prev.map(a => (a.id === id ? { ...a, status: "approved", adminFeedback: notes } : a)));
  };

  const rejectTrial = (id: string, notes?: string) => {
    setTrialApplications(prev => prev.map(a => (a.id === id ? { ...a, status: "rejected", adminFeedback: notes } : a)));
  };

  const directRegisterAthlete = (athleteData: Omit<Athlete, "id">) => {
    const newAthlete: Athlete = {
      ...athleteData,
      id: `ath-${Date.now()}`
    };
    setAthletes(prev => [newAthlete, ...prev]);
  };

  const signInWithGoogle = (customData?: Partial<AuthUser>) => {
    const newUser: AuthUser = {
      id: customData?.id || `goog-${Date.now()}`,
      name: customData?.name || "Caritas Student",
      email: customData?.email || "student@caritas.edu.ng",
      image: customData?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
      provider: "google"
    };
    setAuthUser(newUser);
  };

  const signOut = () => {
    setAuthUser(null);
  };

  const resetToSeeds = () => {
    setSports(initialSports);
    setTeams(initialTeams);
    setFixtures(initialFixtures);
    setTransfers(initialTransfers);
    setAthletes(initialAthletes);
    setAnnouncements(initialAnnouncements);
    setNewsArticles(initialNews);
    setMediaAssets(initialMedia);
    setStandings(initialStandings);
    setCurrentSession(defaultSession);
    setFanTokens(1000);
    setUserBets([]);
    setLeaderboard(initialLeaderboard);
    setSponsorPledges(initialSponsorPledges);
    setJournalistApplications(initialJournalistApplications);
    setTrialApplications(initialTrialApplications);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <SportsAppContext.Provider
      value={{
        sports,
        teams,
        fixtures,
        transfers,
        athletes,
        announcements,
        newsArticles,
        officials,
        mediaAssets,
        standings,
        currentSession,
        authUser,
        signInWithGoogle,
        signOut,
        fanTokens,
        userBets,
        leaderboard,
        sponsorPledges,
        journalistApplications,
        placePredictionBet,
        addSponsorPledge,
        applyForJournalist,
        approveJournalist,
        rejectJournalist,
        switchRole,
        addSport,
        updateSport,
        deleteSport,
        toggleSportActive,
        addTeam,
        updateTeam,
        deleteTeam,
        addAthlete,
        updateAthlete,
        deleteAthlete,
        updateFixture,
        updateFixtureScore,
        updateFixtureStatus,
        updateFixtureLineup,
        addMatchEvent,
        updateMatchStream,
        addMatchCommentary,
        submitTransfer,
        approveTransfer,
        rejectTransfer,
        publishAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        publishNews,
        updateNews,
        deleteNews,
        uploadMedia,
        submitCrowdsourcedMedia,
        approveMedia,
        rejectMedia,
        deleteMedia,
        trialApplications,
        applyForTrial,
        approveTrial,
        rejectTrial,
        directRegisterAthlete,
        isFootballTransferWindowOpen,
        resetToSeeds
      }}
    >
      {children}
    </SportsAppContext.Provider>
  );
}

export function useSportsApp() {
  const context = useContext(SportsAppContext);
  if (!context) {
    throw new Error("useSportsApp must be used within a SportsAppProvider");
  }
  return context;
}
