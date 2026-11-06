"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  ArrowLeftRight,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  Edit2,
  Flame,
  Gift,
  ImagePlus,
  Megaphone,
  PenTool,
  Plus,
  Radio,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Trophy,
  UserCheck,
  UserRound,
  Users,
  Video,
  XCircle
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { useSportsApp } from "@/lib/store";
import type { UserRole, Sport, Team, Fixture } from "@/domain/types";

export default function AdminPage() {
  const {
    sports,
    teams,
    fixtures,
    athletes,
    transfers,
    announcements,
    newsArticles,
    mediaAssets,
    journalistApplications,
    trialApplications,
    currentSession,
    switchRole,
    addSport,
    updateSport,
    deleteSport,
    toggleSportActive,
    addTeam,
    updateTeam,
    deleteTeam,
    addAthlete,
    directRegisterAthlete,
    updateFixture,
    updateFixtureScore,
    updateFixtureStatus,
    updateFixtureLineup,
    updateMatchStream,
    approveTransfer,
    rejectTransfer,
    approveJournalist,
    rejectJournalist,
    approveTrial,
    rejectTrial,
    approveMedia,
    rejectMedia,
    deleteMedia,
    deleteAnnouncement,
    deleteNews,
    resetToSeeds
  } = useSportsApp();

  const [activeTab, setActiveTab] = useState<
    "overview" | "sports" | "teams" | "fixtures" | "trials" | "transfers" | "media" | "journalists" | "athletes" | "news" | "roles"
  >("overview");

  // Direct Athlete Registration State
  const [directName, setDirectName] = useState("");
  const [directNickname, setDirectNickname] = useState("");
  const [directDepartment, setDirectDepartment] = useState("");
  const [directLevel, setDirectLevel] = useState("100 Level");
  const [directWing, setDirectWing] = useState("Block A");
  const [directSport, setDirectSport] = useState("football");
  const [directTeam, setDirectTeam] = useState("Trinity FC");
  const [directPosition, setDirectPosition] = useState("Forward");
  const [directJersey, setDirectJersey] = useState<number>(10);
  const [directImage, setDirectImage] = useState("");
  const [directBio, setDirectBio] = useState("");

  // Add Sport Form State
  const [newSportName, setNewSportName] = useState("");
  const [newSportDesc, setNewSportDesc] = useState("");
  const [newSportType, setNewSportType] = useState<Sport["participantType"]>("team");
  const [newSportScoring, setNewSportScoring] = useState<Sport["scoringModel"]>("goals");

  // Add Team Form State
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamShort, setNewTeamShort] = useState("");
  const [newTeamCoach, setNewTeamCoach] = useState("");
  const [newTeamSport, setNewTeamSport] = useState("Football");
  const [newTeamColor, setNewTeamColor] = useState("#2563EB");

  // Fixture Stream & Lineup Editor
  const [selectedFixtureId, setSelectedFixtureId] = useState<string>(fixtures[4]?.id || fixtures[0]?.id);
  const [streamUrl, setStreamUrl] = useState("https://www.tiktok.com/@caritas_football/live");
  const [editingFixture, setEditingFixture] = useState<Fixture | null>(null);

  // Lineup Editor Strings
  const [homeLineupStr, setHomeLineupStr] = useState("Lawson K., Nero K., Favourite O., Ifeanyi E., Chike O., Modric O., Kritolite D., Miracle C., Patoski S., Joseph B., Aisha M.");
  const [awayLineupStr, setAwayLineupStr] = useState("Denco M., Lawrence A., Egede J., Favour P., Ike S., JC O., Dice K., Machala T., Otika D., Paschal C., Paul E.");

  // Editing Team State
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const pendingTransfers = useMemo(() => transfers.filter(t => t.status === "pending"), [transfers]);
  const pendingJournalists = useMemo(() => journalistApplications.filter(j => j.status === "pending"), [journalistApplications]);
  const pendingTrials = useMemo(() => trialApplications.filter(t => t.status === "pending"), [trialApplications]);
  const pendingMedia = useMemo(() => mediaAssets.filter(m => m.status === "pending"), [mediaAssets]);
  const liveMatches = useMemo(() => fixtures.filter(f => f.status === "live" || f.status === "half_time"), [fixtures]);

  const handleDirectRegisterAthlete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directName.trim()) return;

    const chosenSport = sports.find(s => s.slug === directSport);
    const chosenTeam = teams.find(t => t.name === directTeam);

    directRegisterAthlete({
      slug: directName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      name: directName.trim(),
      nickname: directNickname.trim() || undefined,
      image: directImage.trim() || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: directBio.trim() || "Official athlete registered by Caritas Sports Association.",
      department: directDepartment.trim() || "General Studies",
      level: directLevel,
      wing: directWing,
      birthdayDayMonth: "01 January",
      sports: [
        {
          sportSlug: directSport,
          sportName: chosenSport?.name || "Football",
          teamId: chosenTeam?.id,
          teamName: directTeam,
          position: directPosition,
          jerseyNumber: directJersey || 10,
          appearances: 0,
          goals: 0,
          assists: 0
        }
      ],
      status: "active"
    });

    setDirectName("");
    setDirectNickname("");
    setDirectDepartment("");
    setDirectBio("");
    setDirectImage("");
    alert(`Athlete "${directName}" directly registered and added to ${directTeam}!`);
  };

  const handleAddSport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSportName.trim()) return;
    const slug = newSportName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    addSport({
      name: newSportName.trim(),
      slug,
      description: newSportDesc.trim() || `Official Caritas ${newSportName} league.`,
      coverImage: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
      participantType: newSportType,
      competitionFormats: ["tournament", "league"],
      positions: ["Player 1", "Player 2", "Substitute"],
      scoringModel: newSportScoring,
      features: {
        fixtures: true,
        liveScoring: true,
        standings: newSportType === "team",
        rankings: newSportType !== "team",
        brackets: true,
        statistics: true,
        transfers: false,
        rosters: true
      },
      active: true,
      icon: "trophy",
      countLabel: "Newly Created Sport"
    });
    setNewSportName("");
    setNewSportDesc("");
    alert("New sport engine configured successfully!");
  };

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim() || !newTeamShort.trim()) return;
    addTeam({
      name: newTeamName.trim(),
      shortName: newTeamShort.trim().toUpperCase(),
      slug: newTeamName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      sport: newTeamSport,
      sportSlug: newTeamSport.toLowerCase(),
      color: newTeamColor,
      coach: newTeamCoach.trim() || "To be appointed",
      bio: "Newly formed collegiate club in Caritas Sports Association.",
      rosterCount: 0
    });
    setNewTeamName("");
    setNewTeamShort("");
    setNewTeamCoach("");
    alert("Club registered successfully!");
  };

  const handleSaveTeamEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;
    updateTeam(editingTeam.id, editingTeam);
    setEditingTeam(null);
    alert("Team information updated!");
  };

  const handleSaveFixtureEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFixture) return;
    updateFixture(editingFixture.id, editingFixture);
    setEditingFixture(null);
    alert("Fixture details updated successfully!");
  };

  const handleSaveLineups = (e: React.FormEvent) => {
    e.preventDefault();
    const homeArr = homeLineupStr.split(",").map(s => s.trim()).filter(Boolean);
    const awayArr = awayLineupStr.split(",").map(s => s.trim()).filter(Boolean);
    updateFixtureLineup(selectedFixtureId, homeArr, awayArr);
    alert("Starting XI Lineups updated! Goalscorer prediction market is now automatically unlocked for this match!");
  };

  const handleSaveStream = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFixtureId || !streamUrl.trim()) return;
    updateMatchStream(selectedFixtureId, {
      provider: "tiktok",
      url: streamUrl.trim(),
      status: "live",
      title: "Caritas Football Association LIVE Broadcast",
      embedAllowed: true
    });
    alert("TikTok LIVE Stream URL updated for selected fixture!");
  };

  return (
    <>
      <SiteHeader />
      <div className="dashboard-layout">
        {/* Collapsible Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-label">SECRET GATEWAY</div>
          <div style={{ padding: "8px 12px", background: "#20241A", borderRadius: 10, margin: "0 4px 14px", border: "1px solid var(--line)" }}>
            <strong style={{ fontSize: 13, display: "block", color: "var(--accent)" }}>{currentSession.name}</strong>
            <span className="muted" style={{ fontSize: 10, display: "block" }}>{currentSession.roleLabel}</span>
          </div>

          <div className="sidebar-label">MANAGEMENT CONSOLE</div>
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "trials", label: `Student Trials (${pendingTrials.length})`, icon: UserCheck },
            { id: "media", label: `Media Moderation (${pendingMedia.length})`, icon: ImagePlus },
            { id: "sports", label: "Sports Engine", icon: Trophy },
            { id: "teams", label: "Clubs & Teams", icon: Users },
            { id: "fixtures", label: "Fixtures & Live Ops", icon: CalendarDays },
            { id: "transfers", label: `Transfers (${pendingTransfers.length})`, icon: ArrowLeftRight },
            { id: "journalists", label: `Journalists (${pendingJournalists.length})`, icon: PenTool },
            { id: "athletes", label: "Athlete Registry & Register", icon: UserRound },
            { id: "news", label: "News & Bulletins", icon: Megaphone },
            { id: "roles", label: "Role Switcher", icon: ShieldCheck }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as typeof activeTab)}
              className={`sidebar-link ${activeTab === id ? "active" : ""}`}
              style={{ width: "100%", textAlign: "left", background: "none", border: 0, cursor: "pointer" }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </button>
          ))}

          <div className="sidebar-label" style={{ marginTop: 24 }}>SYSTEM TOOLS</div>
          <button
            onClick={() => {
              if (confirm("Reset local database back to official initial seeds?")) {
                resetToSeeds();
              }
            }}
            className="sidebar-link"
            style={{ width: "100%", textAlign: "left", background: "none", border: 0, cursor: "pointer", color: "#EF4444" }}
          >
            <RotateCcw size={16} />
            <span>Reset to Seeds</span>
          </button>
        </aside>

        {/* Dashboard Main Content Area */}
        <main className="dashboard-content">
          <div className="page-intro" style={{ paddingTop: 4 }}>
            <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--accent)" }}>
              <ShieldCheck size={13} /> SECURE ADMINISTRATIVE DESK (URL ACCESSIBLE ONLY)
            </div>
            <h1>Management Headquarters</h1>
            <p>
              Signed in as <strong style={{ color: "var(--accent)" }}>{currentSession.name}</strong> ({currentSession.roleLabel}). Fully regulate and edit sports, clubs, starting lineups, live scores, TikTok streaming, transfers, and journalist accreditations.
            </p>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="grid-4">
                <div className="metric">
                  <div className="metric-label">Configured Sports</div>
                  <div className="metric-value">{sports.length}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Registered Teams</div>
                  <div className="metric-value">{teams.length}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Total Fixtures</div>
                  <div className="metric-value">{fixtures.length}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">Pending Reviews</div>
                  <div className="metric-value" style={{ color: pendingTransfers.length + pendingJournalists.length > 0 ? "#FACC15" : "inherit" }}>
                    {pendingTransfers.length + pendingJournalists.length}
                  </div>
                </div>
              </div>

              {/* Live Match Notice */}
              {liveMatches.length > 0 && (
                <div className="card card-pad" style={{ background: "rgba(184, 255, 22, 0.08)", borderColor: "rgba(184, 255, 22, 0.3)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="status status-live">
                        <Radio size={12} /> {liveMatches.length} MATCH IN PROGRESS
                      </span>
                      <strong style={{ fontSize: 14 }}>
                        {liveMatches[0].home} {liveMatches[0].homeScore} : {liveMatches[0].awayScore} {liveMatches[0].away} ({liveMatches[0].liveMinute}&apos;)
                      </strong>
                    </div>

                    <Link href={`/matches/${liveMatches[0].id}`} className="primary-button" style={{ padding: "6px 12px", fontSize: 11 }}>
                      Open Match Centre <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Quick Actions Grid */}
              <div className="grid-3">
                <button
                  onClick={() => setActiveTab("sports")}
                  className="card card-pad"
                  style={{ textAlign: "left", cursor: "pointer", background: "var(--surface)", border: "1px solid var(--line)", color: "var(--text)" }}
                >
                  <div className="sport-icon"><Trophy size={18} /></div>
                  <strong style={{ display: "block", marginTop: 14, fontSize: 14 }}>Add / Edit Sports Engine</strong>
                  <span className="muted" style={{ display: "block", fontSize: 11, marginTop: 4 }}>
                    Deploy basketball, volleyball, badminton or new sports without rebuilding.
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("journalists")}
                  className="card card-pad"
                  style={{ textAlign: "left", cursor: "pointer", background: "var(--surface)", border: "1px solid var(--line)", color: "var(--text)" }}
                >
                  <div className="sport-icon"><PenTool size={18} /></div>
                  <strong style={{ display: "block", marginTop: 14, fontSize: 14 }}>Journalist Accreditations ({pendingJournalists.length})</strong>
                  <span className="muted" style={{ display: "block", fontSize: 11, marginTop: 4 }}>
                    Approve student sports journalists to post verified news.
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("fixtures")}
                  className="card card-pad"
                  style={{ textAlign: "left", cursor: "pointer", background: "var(--surface)", border: "1px solid var(--line)", color: "var(--text)" }}
                >
                  <div className="sport-icon"><CalendarDays size={18} /></div>
                  <strong style={{ display: "block", marginTop: 14, fontSize: 14 }}>Matchday Operations & Lineups</strong>
                  <span className="muted" style={{ display: "block", fontSize: 11, marginTop: 4 }}>
                    Set starting 11 lineups, live scores, and TikTok LIVE streams.
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EXTENSIBLE SPORTS ENGINE */}
          {activeTab === "sports" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="card card-pad">
                <div className="eyebrow">CONFIGURABLE SPORTS ENGINE</div>
                <h3 className="font-display" style={{ fontSize: 20, margin: "8px 0 14px" }}>
                  Register a New Sport
                </h3>
                <form onSubmit={handleAddSport} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Sport Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Handball, Tennis, Swimming"
                      value={newSportName}
                      onChange={e => setNewSportName(e.target.value)}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Participant Model</label>
                    <select
                      value={newSportType}
                      onChange={e => setNewSportType(e.target.value as Sport["participantType"])}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    >
                      <option value="team">Team-Based</option>
                      <option value="individual">Individual Athletes</option>
                      <option value="both">Both (Singles & Doubles / Relay)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Scoring Model</label>
                    <select
                      value={newSportScoring}
                      onChange={e => setNewSportScoring(e.target.value as Sport["scoringModel"])}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    >
                      <option value="goals">Goals (Football, Handball)</option>
                      <option value="points_quarters">Points by Quarters (Basketball)</option>
                      <option value="sets_volleyball">Sets & Points (Volleyball)</option>
                      <option value="sets_badminton">Sets (Badminton)</option>
                      <option value="sets_table_tennis">Sets (Table Tennis)</option>
                      <option value="time_distance">Time & Distance (Athletics / Swimming)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Brief Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Inter-hall championship tournament"
                      value={newSportDesc}
                      onChange={e => setNewSportDesc(e.target.value)}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    />
                  </div>

                  <div style={{ gridColumn: "span 2" }}>
                    <button type="submit" className="primary-button" style={{ width: "100%" }}>
                      <Plus size={16} /> Deploy New Sport
                    </button>
                  </div>
                </form>
              </div>

              {/* Current Sports List with Edit/Delete */}
              <div className="section-heading">
                <div>
                  <h2>Configured sports ({sports.length})</h2>
                  <p>Administrators can activate, deactivate, or delete sports.</p>
                </div>
              </div>

              <div className="grid-2">
                {sports.map(s => (
                  <div key={s.id} className="card card-pad" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <strong style={{ fontSize: 15 }}>{s.name}</strong>
                        <span className={`status ${s.active ? "status-live" : "status-done"}`}>
                          {s.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                      <span className="muted" style={{ fontSize: 11, display: "block", marginTop: 4 }}>
                        Model: {s.participantType} · Scoring: {s.scoringModel}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => toggleSportActive(s.id)}
                        className="secondary-button"
                        style={{ padding: "6px 10px", fontSize: 11 }}
                      >
                        {s.active ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete sport ${s.name}?`)) deleteSport(s.id);
                        }}
                        className="icon-button"
                        style={{ width: 30, height: 30, color: "#EF4444" }}
                        title="Delete Sport"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TEAMS & CLUBS (FULL EDITING & DELETION) */}
          {activeTab === "teams" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Edit Team Modal if active */}
              {editingTeam && (
                <div className="card card-pad" style={{ background: "#20251C", borderColor: "var(--accent)" }}>
                  <div className="eyebrow">EDIT TEAM DETAILS</div>
                  <h3 className="font-display" style={{ fontSize: 18, margin: "6px 0 12px" }}>
                    Editing {editingTeam.name}
                  </h3>
                  <form onSubmit={handleSaveTeamEdit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, display: "block", marginBottom: 3 }}>Name</label>
                      <input
                        type="text"
                        value={editingTeam.name}
                        onChange={e => setEditingTeam({ ...editingTeam, name: e.target.value })}
                        style={{ width: "100%", height: 36, background: "#11130F", border: "1px solid var(--line)", padding: "0 8px", color: "#fff" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, display: "block", marginBottom: 3 }}>Short Name</label>
                      <input
                        type="text"
                        value={editingTeam.shortName}
                        onChange={e => setEditingTeam({ ...editingTeam, shortName: e.target.value })}
                        style={{ width: "100%", height: 36, background: "#11130F", border: "1px solid var(--line)", padding: "0 8px", color: "#fff" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, display: "block", marginBottom: 3 }}>Head Coach</label>
                      <input
                        type="text"
                        value={editingTeam.coach}
                        onChange={e => setEditingTeam({ ...editingTeam, coach: e.target.value })}
                        style={{ width: "100%", height: 36, background: "#11130F", border: "1px solid var(--line)", padding: "0 8px", color: "#fff" }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, display: "block", marginBottom: 3 }}>Department / Wing</label>
                      <input
                        type="text"
                        value={editingTeam.department || ""}
                        onChange={e => setEditingTeam({ ...editingTeam, department: e.target.value })}
                        style={{ width: "100%", height: 36, background: "#11130F", border: "1px solid var(--line)", padding: "0 8px", color: "#fff" }}
                      />
                    </div>
                    <div style={{ gridColumn: "span 2", display: "flex", gap: 8 }}>
                      <button type="submit" className="primary-button" style={{ padding: "6px 14px", fontSize: 12 }}>
                        Save Changes
                      </button>
                      <button type="button" className="secondary-button" onClick={() => setEditingTeam(null)} style={{ padding: "6px 14px", fontSize: 12 }}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="card card-pad">
                <div className="eyebrow">CLUB REGISTRATION</div>
                <h3 className="font-display" style={{ fontSize: 20, margin: "8px 0 14px" }}>
                  Add a New Club
                </h3>
                <form onSubmit={handleAddTeam} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Club Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal FC"
                      value={newTeamName}
                      onChange={e => setNewTeamName(e.target.value)}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Short Code (3 Letters)</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="e.g. ROY"
                      value={newTeamShort}
                      onChange={e => setNewTeamShort(e.target.value)}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Head Coach</label>
                    <input
                      type="text"
                      placeholder="e.g. Coach Emmanuel"
                      value={newTeamCoach}
                      onChange={e => setNewTeamCoach(e.target.value)}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Sport Division</label>
                    <select
                      value={newTeamSport}
                      onChange={e => setNewTeamSport(e.target.value)}
                      style={{ width: "100%", height: 40, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                    >
                      {sports.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ gridColumn: "span 2" }}>
                    <button type="submit" className="primary-button" style={{ width: "100%" }}>
                      <Plus size={16} /> Register Club
                    </button>
                  </div>
                </form>
              </div>

              <div className="card">
                {teams.map(t => (
                  <div key={t.id} className="team-row">
                    <span className="team-crest" style={{ backgroundColor: t.color }}>{t.shortName}</span>
                    <div className="team-row-info">
                      <strong>{t.name}</strong>
                      <span>Coach: {t.coach} · {t.sport} · {t.rosterCount || 22} Players</span>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        onClick={() => setEditingTeam(t)}
                        className="secondary-button"
                        style={{ padding: "4px 8px", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}
                      >
                        <Edit2 size={12} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete team ${t.name}?`)) deleteTeam(t.id);
                        }}
                        className="icon-button"
                        style={{ width: 28, height: 28, color: "#EF4444" }}
                        title="Delete Team"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FIXTURES & LINEUPS & TIKTOK LIVE OPS */}
          {activeTab === "fixtures" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Lineup & Goalscorer Market Controller */}
              <div className="card card-pad" style={{ background: "#1E2419", borderColor: "rgba(184, 255, 22, 0.4)" }}>
                <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)" }}>
                  <Users size={13} /> STARTING XI LINEUP & GOALSCORER PREDICTOR UNLOCKER
                </div>
                <h3 className="font-display" style={{ fontSize: 18, margin: "6px 0 12px" }}>
                  Confirm Starting Lineups for Fixture
                </h3>
                <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                  Once starting 11 players are confirmed and saved, the <strong>&ldquo;Player to Score&rdquo;</strong> prediction market is automatically enabled for fans on this match!
                </p>

                <form onSubmit={handleSaveLineups} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <select
                    value={selectedFixtureId}
                    onChange={e => setSelectedFixtureId(e.target.value)}
                    style={{ height: 42, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                  >
                    {fixtures.map(f => (
                      <option key={f.id} value={f.id}>
                        {f.round} · {f.home} vs {f.away} ({f.date})
                      </option>
                    ))}
                  </select>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 11, display: "block", color: "var(--muted)", marginBottom: 4 }}>Home Team Starting XI (Comma Separated)</label>
                      <textarea
                        rows={3}
                        value={homeLineupStr}
                        onChange={e => setHomeLineupStr(e.target.value)}
                        style={{ width: "100%", background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: 8, color: "#fff", fontSize: 11 }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 11, display: "block", color: "var(--muted)", marginBottom: 4 }}>Away Team Starting XI (Comma Separated)</label>
                      <textarea
                        rows={3}
                        value={awayLineupStr}
                        onChange={e => setAwayLineupStr(e.target.value)}
                        style={{ width: "100%", background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: 8, color: "#fff", fontSize: 11 }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="primary-button" style={{ alignSelf: "flex-start", padding: "8px 16px", fontSize: 12 }}>
                    Save Lineup & Unlock Goalscorer Market
                  </button>
                </form>
              </div>

              {/* TikTok Live Stream Broadcaster Config */}
              <div className="card card-pad" style={{ background: "#1D2019", borderColor: "rgba(184, 255, 22, 0.4)" }}>
                <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Radio size={13} /> TIKTOK LIVE BROADCAST MANAGEMENT
                </div>
                <h3 className="font-display" style={{ fontSize: 18, margin: "6px 0 12px" }}>
                  Attach Live Video Stream to Match
                </h3>
                <form onSubmit={handleSaveStream} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input
                    type="url"
                    value={streamUrl}
                    onChange={e => setStreamUrl(e.target.value)}
                    placeholder="https://www.tiktok.com/@caritas_football/live"
                    style={{ flex: 2, minWidth: 240, height: 42, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "#fff" }}
                  />

                  <button type="submit" className="primary-button">
                    <Video size={16} /> Broadcast TikTok LIVE
                  </button>
                </form>
              </div>

              {/* Fixtures Quick-Score Entry Table */}
              <div className="section-heading">
                <div>
                  <h2>All 28 official CFA fixtures</h2>
                  <p>Administrators can adjust scores and mark matches as live, half-time or completed.</p>
                </div>
              </div>

              <div className="card" style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>DATE</th>
                      <th style={{ padding: "10px 14px", textAlign: "left" }}>MATCH</th>
                      <th style={{ padding: "10px 14px", textAlign: "center" }}>STATUS</th>
                      <th style={{ padding: "10px 14px", textAlign: "center" }}>SCORE (H - A)</th>
                      <th style={{ padding: "10px 14px", textAlign: "right" }}>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fixtures.map(f => (
                      <tr key={f.id} style={{ borderBottom: "1px solid var(--line)" }}>
                        <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>{f.date}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <strong>{f.home}</strong> vs <strong>{f.away}</strong>
                          <div className="muted" style={{ fontSize: 10 }}>{f.round}</div>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          <span className={`status ${f.status === "live" ? "status-live" : f.status === "completed" ? "status-done" : "status-upcoming"}`}>
                            {f.status.replace("_", " ")}
                          </span>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "center" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                            <input
                              type="number"
                              min={0}
                              value={f.homeScore ?? ""}
                              placeholder="0"
                              onChange={e => updateFixtureScore(f.id, Number(e.target.value), f.awayScore ?? 0)}
                              style={{ width: 36, height: 26, background: "#11130F", border: "1px solid var(--line)", textAlign: "center", color: "#fff", borderRadius: 4 }}
                            />
                            <span>-</span>
                            <input
                              type="number"
                              min={0}
                              value={f.awayScore ?? ""}
                              placeholder="0"
                              onChange={e => updateFixtureScore(f.id, f.homeScore ?? 0, Number(e.target.value))}
                              style={{ width: 36, height: 26, background: "#11130F", border: "1px solid var(--line)", textAlign: "center", color: "#fff", borderRadius: 4 }}
                            />
                          </div>
                        </td>
                        <td style={{ padding: "10px 14px", textAlign: "right" }}>
                          <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                            <button
                              onClick={() => updateFixtureStatus(f.id, "live", 65, "2nd Half")}
                              className="secondary-button"
                              style={{ padding: "3px 6px", fontSize: 10 }}
                            >
                              Live
                            </button>
                            <button
                              onClick={() => updateFixtureStatus(f.id, "completed", 90, "Full Time")}
                              className="secondary-button"
                              style={{ padding: "3px 6px", fontSize: 10 }}
                            >
                              Full Time
                            </button>
                            <Link href={`/matches/${f.id}`} className="primary-button" style={{ padding: "3px 8px", fontSize: 10 }}>
                              Centre
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: JOURNALISTS ACCREDITATION DESK */}
          {activeTab === "journalists" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="section-heading">
                <div>
                  <h2>Student sports journalist applications ({journalistApplications.length})</h2>
                  <p>Review submitted writing samples and grant official press accreditation.</p>
                </div>
              </div>

              <div className="card">
                {journalistApplications.map(ja => (
                  <div key={ja.id} style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <strong style={{ fontSize: 15 }}>{ja.fullName}</strong>
                          <span className={`status ${ja.status === "approved" ? "status-live" : ja.status === "rejected" ? "status-done" : "status-upcoming"}`}>
                            {ja.status.toUpperCase()}
                          </span>
                        </div>
                        <span className="muted" style={{ fontSize: 12, display: "block", marginTop: 2 }}>
                          {ja.department} · {ja.level} · Matric: {ja.matricNumber} · WhatsApp: {ja.phoneWhatsApp}
                        </span>
                        <span style={{ fontSize: 11, color: "var(--accent)", display: "block", marginTop: 2 }}>
                          Preferred Coverage: {ja.preferredSport}
                        </span>
                      </div>

                      <div style={{ display: "flex", gap: 8 }}>
                        {ja.status === "pending" && (
                          <>
                            <button
                              onClick={() => approveJournalist(ja.id)}
                              className="primary-button"
                              style={{ padding: "6px 12px", fontSize: 11 }}
                            >
                              <CheckCircle2 size={13} /> Approve Accreditation
                            </button>
                            <button
                              onClick={() => rejectJournalist(ja.id)}
                              className="secondary-button"
                              style={{ padding: "6px 12px", fontSize: 11, color: "#EF4444" }}
                            >
                              <XCircle size={13} /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        padding: 12,
                        background: "#161912",
                        borderRadius: 8,
                        border: "1px solid var(--line)",
                        fontSize: 12,
                        lineHeight: 1.6,
                        color: "#DFE2D8"
                      }}
                    >
                      <strong>Writing Sample:</strong>
                      <p style={{ margin: "4px 0 0" }}>{ja.sampleArticle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: STUDENT TRIALS & APPLICATIONS */}
          {activeTab === "trials" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="section-heading">
                <div>
                  <h2>Student Sports Trial Applications ({trialApplications.length})</h2>
                  <p>Review applications from students wishing to join sports teams. Approving automatically registers them into the athlete database and assigns them to the roster.</p>
                </div>
              </div>

              <div className="card">
                {trialApplications.map(app => (
                  <div key={app.id} style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ display: "flex", gap: 14 }}>
                        {app.photoUrl ? (
                          <img
                            src={app.photoUrl}
                            alt={app.fullName}
                            style={{ width: 48, height: 48, borderRadius: 8, objectFit: "cover", border: "1px solid var(--accent)" }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 8,
                              background: "var(--elevated)",
                              display: "grid",
                              placeItems: "center",
                              fontSize: 18,
                              fontWeight: 700,
                              color: "var(--accent)"
                            }}
                          >
                            {app.fullName.charAt(0)}
                          </div>
                        )}

                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <strong style={{ fontSize: 15 }}>{app.fullName}</strong>
                            <span className={`status ${app.status === "approved" ? "status-live" : app.status === "rejected" ? "status-done" : "status-upcoming"}`}>
                              {app.status.toUpperCase()}
                            </span>
                          </div>
                          <span className="muted" style={{ fontSize: 12, display: "block", marginTop: 2 }}>
                            {app.department} · {app.level} · Matric: {app.matricNumber} · WhatsApp: {app.phoneWhatsApp}
                          </span>
                          <span style={{ fontSize: 12, color: "var(--accent)", display: "block", marginTop: 4 }}>
                            Target Sport: <strong>{app.sportName}</strong> · Preferred Team: <strong>{app.preferredTeamName || "Open to Any"}</strong> · Role: <strong>{app.positionOrEvent}</strong>
                          </span>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: 8 }}>
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => {
                                approveTrial(app.id, "Approved by CSA Technical Directorate");
                                alert(`Trial approved! ${app.fullName} has been enrolled into ${app.sportName}!`);
                              }}
                              className="primary-button"
                              style={{ padding: "6px 14px", fontSize: 11 }}
                            >
                              <CheckCircle2 size={13} /> Approve & Enrol
                            </button>
                            <button
                              onClick={() => {
                                rejectTrial(app.id, "Roster full for current season");
                              }}
                              className="secondary-button"
                              style={{ padding: "6px 12px", fontSize: 11, color: "#EF4444" }}
                            >
                              <XCircle size={13} /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {app.experienceNotes && (
                      <div
                        style={{
                          marginTop: 12,
                          padding: 10,
                          background: "#161912",
                          borderRadius: 6,
                          border: "1px solid var(--line)",
                          fontSize: 12,
                          color: "#DFE2D8"
                        }}
                      >
                        <strong>Playing Background:</strong> {app.experienceNotes}
                      </div>
                    )}
                  </div>
                ))}

                {trialApplications.length === 0 && (
                  <div style={{ padding: 30, textAlign: "center" }} className="muted">
                    No student trial applications submitted yet.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: MEDIA MODERATION DESK */}
          {activeTab === "media" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="section-heading">
                <div>
                  <h2>Crowdsourced Media Moderation Desk ({mediaAssets.length})</h2>
                  <p>Review match photos and sideline captures submitted by students and campus photographers before displaying in the public gallery.</p>
                </div>
              </div>

              <div className="grid-3">
                {mediaAssets.map(asset => (
                  <div key={asset.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    <div
                      style={{
                        height: 180,
                        backgroundImage: `url(${asset.url})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative"
                      }}
                    >
                      <span
                        className={`status ${asset.status === "approved" ? "status-live" : asset.status === "rejected" ? "status-done" : "status-upcoming"}`}
                        style={{ position: "absolute", top: 10, right: 10 }}
                      >
                        {asset.status ? asset.status.toUpperCase() : "APPROVED"}
                      </span>
                      {asset.uploadedBy && (
                        <span style={{ position: "absolute", bottom: 8, left: 8, background: "rgba(0,0,0,0.8)", fontSize: 10, padding: "2px 6px", borderRadius: 4 }}>
                          By: {asset.uploadedBy}
                        </span>
                      )}
                    </div>

                    <div style={{ padding: 14, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                      <div>
                        <strong style={{ fontSize: 14, display: "block" }}>{asset.title}</strong>
                        <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>
                          {asset.sport} · {asset.category} · {asset.createdAt}
                        </div>
                      </div>

                      <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                        {asset.status === "pending" && (
                          <button
                            onClick={() => {
                              approveMedia(asset.id);
                              alert("Capture approved for public gallery!");
                            }}
                            className="primary-button"
                            style={{ flex: 1, padding: "6px 8px", fontSize: 11 }}
                          >
                            <CheckCircle2 size={13} /> Approve
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm(`Delete media "${asset.title}"?`)) deleteMedia(asset.id);
                          }}
                          className="secondary-button"
                          style={{ padding: "6px 10px", fontSize: 11, color: "#EF4444" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TRANSFERS APPROVAL WORKFLOW */}
          {activeTab === "transfers" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="section-heading">
                <div>
                  <h2>Transfer approval desk</h2>
                  <p>Transaction history and pending club registration requests.</p>
                </div>
              </div>

              <div className="card">
                {transfers.slice(0, 25).map(tr => (
                  <div key={tr.id} style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                    <div>
                      <strong style={{ fontSize: 14 }}>{tr.athleteName}</strong>
                      <div className="muted" style={{ fontSize: 11 }}>
                        {tr.previousTeam} ➔ <span style={{ color: "var(--accent)" }}>{tr.newTeam}</span> · {tr.transferType.replace("_", " ")}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className={`status ${tr.status === "approved" ? "status-live" : tr.status === "rejected" ? "status-done" : "status-upcoming"}`}>
                        {tr.status}
                      </span>
                      {tr.status === "pending" && (
                        <>
                          <button
                            onClick={() => approveTransfer(tr.id)}
                            className="primary-button"
                            style={{ padding: "4px 10px", fontSize: 11 }}
                          >
                            <CheckCircle2 size={13} /> Approve
                          </button>
                          <button
                            onClick={() => rejectTransfer(tr.id, "Disapproved by CFA Presidency")}
                            className="secondary-button"
                            style={{ padding: "4px 10px", fontSize: 11, color: "#EF4444" }}
                          >
                            <XCircle size={13} /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ATHLETES REGISTRY & DIRECT REGISTRATION */}
          {activeTab === "athletes" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="section-heading">
                <div>
                  <h2>Central Athlete Records & Direct Registration ({athletes.length})</h2>
                  <p>Register official student-athletes directly into team rosters or manage existing profiles.</p>
                </div>
              </div>

              {/* Direct Athlete Registration Form */}
              <div className="card" style={{ padding: 22, border: "1px solid var(--accent)" }}>
                <div className="eyebrow" style={{ color: "var(--accent)", marginBottom: 6 }}>
                  DIRECT ATHLETE REGISTRATION FORM
                </div>
                <h3 className="font-display" style={{ fontSize: 18, marginBottom: 14 }}>
                  Register Athlete into Team Roster
                </h3>

                <form onSubmit={handleDirectRegisterAthlete} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Victor Okafor"
                        value={directName}
                        onChange={e => setDirectName(e.target.value)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Nickname</label>
                      <input
                        type="text"
                        placeholder="e.g. The Sniper"
                        value={directNickname}
                        onChange={e => setDirectNickname(e.target.value)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Department</label>
                      <input
                        type="text"
                        placeholder="e.g. Mechanical Engineering"
                        value={directDepartment}
                        onChange={e => setDirectDepartment(e.target.value)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Sport</label>
                      <select
                        value={directSport}
                        onChange={e => setDirectSport(e.target.value)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      >
                        {sports.map(s => (
                          <option key={s.id} value={s.slug}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Assigned Club / Team</label>
                      <select
                        value={directTeam}
                        onChange={e => setDirectTeam(e.target.value)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      >
                        {teams.map(t => (
                          <option key={t.id} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Position / Role</label>
                      <input
                        type="text"
                        placeholder="e.g. Striker / Winger"
                        value={directPosition}
                        onChange={e => setDirectPosition(e.target.value)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Jersey Number</label>
                      <input
                        type="number"
                        placeholder="10"
                        value={directJersey}
                        onChange={e => setDirectJersey(parseInt(e.target.value) || 10)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Level & Wing</label>
                      <div style={{ display: "flex", gap: 6 }}>
                        <select
                          value={directLevel}
                          onChange={e => setDirectLevel(e.target.value)}
                          style={{ flex: 1, height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 8px", color: "var(--text)", fontSize: 12 }}
                        >
                          <option value="100 Level">100 Level</option>
                          <option value="200 Level">200 Level</option>
                          <option value="300 Level">300 Level</option>
                          <option value="400 Level">400 Level</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Wing/Hostel"
                          value={directWing}
                          onChange={e => setDirectWing(e.target.value)}
                          style={{ flex: 1, height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 8px", color: "var(--text)", fontSize: 12 }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 11, marginBottom: 4, fontWeight: 600 }}>Image URL / Avatar</label>
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        value={directImage}
                        onChange={e => setDirectImage(e.target.value)}
                        style={{ width: "100%", height: 38, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="primary-button" style={{ alignSelf: "flex-start", marginTop: 4 }}>
                    <Plus size={14} /> Register Athlete to Squad
                  </button>
                </form>
              </div>

              {/* Existing Roster */}
              <div className="card">
                {athletes.map(ath => (
                  <div key={ath.id} className="team-row">
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        backgroundImage: `url(${ath.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                      }}
                    />
                    <div className="team-row-info">
                      <strong>{ath.name} {ath.nickname ? `("${ath.nickname}")` : ""}</strong>
                      <span>{ath.department} · {ath.level} · {ath.sports.map(s => `${s.teamName || s.sportName} (${s.position})`).join(", ")}</span>
                    </div>
                    <span className="status status-live">Eligible</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: NEWS & COMMUNIQUES MANAGER */}
          {activeTab === "news" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="section-heading">
                <div>
                  <h2>Manage announcements & news</h2>
                  <p>Review, edit or remove posted releases.</p>
                </div>
              </div>

              <div className="card">
                {announcements.map(ann => (
                  <div key={ann.id} className="team-row">
                    <div className="team-row-info">
                      <strong>{ann.title}</strong>
                      <span>By: {ann.author} · Category: {ann.category}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete announcement "${ann.title}"?`)) deleteAnnouncement(ann.id);
                      }}
                      className="icon-button"
                      style={{ width: 30, height: 30, color: "#EF4444" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}

                {newsArticles.map(news => (
                  <div key={news.id} className="team-row">
                    <div className="team-row-info">
                      <strong>{news.title}</strong>
                      <span>By: {news.author} · Sport: {news.sport}</span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete news article "${news.title}"?`)) deleteNews(news.id);
                      }}
                      className="icon-button"
                      style={{ width: 30, height: 30, color: "#EF4444" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: ROLE SWITCHER */}
          {activeTab === "roles" && (
            <div className="card card-pad">
              <div className="eyebrow">ROLE-BASED AUTHORIZATION ENGINE</div>
              <h3 className="font-display" style={{ fontSize: 20, margin: "8px 0 16px" }}>
                Switch Role Context
              </h3>
              <p className="muted" style={{ fontSize: 13, marginBottom: 16 }}>
                Test permissions as different association personnel across the Caritas sports ecosystem:
              </p>

              <div className="grid-2">
                {[
                  ["super_admin", "Super Admin", "Unrestricted master access across all sports, users and logs."],
                  ["association_president", "CFA President (Lukeeze Jesse)", "Executive presidential authority over league and transfers."],
                  ["sports_director", "Director of Sports (Dr. Anyanwu)", "Inter-faculty compliance and university sports facilities."],
                  ["sport_manager", "Sport Manager", "Manages assigned sports, athlete registration and brackets."],
                  ["coach", "Team Coach (DC - Trinity FC)", "Manages team roster, tactical formation and transfer requests."],
                  ["referee", "Match Official / Referee", "Updates live scores, cards and match reports."],
                  ["media_manager", "Media Manager", "Publishes press communiqués, flyers and gallery photography."]
                ].map(([roleKey, title, desc]) => (
                  <button
                    key={roleKey}
                    onClick={() => {
                      switchRole(roleKey as UserRole);
                      alert(`Context switched to: ${title}`);
                    }}
                    className={`card card-pad ${currentSession.role === roleKey ? "card-active" : ""}`}
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      background: currentSession.role === roleKey ? "rgba(184, 255, 22, 0.12)" : "var(--surface)",
                      borderColor: currentSession.role === roleKey ? "var(--accent)" : "var(--line)",
                      color: "var(--text)"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <strong style={{ fontSize: 14 }}>{title}</strong>
                      {currentSession.role === roleKey && (
                        <span className="status status-live">Active</span>
                      )}
                    </div>
                    <p className="muted" style={{ fontSize: 11, margin: "6px 0 0", lineHeight: 1.5 }}>
                      {desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
