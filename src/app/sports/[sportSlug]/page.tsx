"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Flame,
  Plus,
  ShieldCheck,
  Target,
  Timer,
  Trophy,
  Users,
  Volleyball
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { MatchCard } from "@/components/sports/match-card";
import { useSportsApp } from "@/lib/store";
import { TeamLogo } from "@/components/ui/team-logo";

export default function SportDetailPage({ params }: { params: Promise<{ sportSlug: string }> }) {
  const resolvedParams = use(params);
  const { sports, teams, fixtures, athletes, standings, transfers } = useSportsApp();

  const sport = sports.find(s => s.slug === resolvedParams.sportSlug) || sports[0];

  const [activeTab, setActiveTab] = useState<"overview" | "fixtures" | "standings" | "teams" | "transfers" | "athletes">("overview");

  const sportTeams = useMemo(() => {
    return teams.filter(t => t.sport.toLowerCase() === sport.name.toLowerCase());
  }, [teams, sport]);

  const sportFixtures = useMemo(() => {
    return fixtures.filter(f => f.sportSlug === sport.slug || f.sport.toLowerCase() === sport.name.toLowerCase());
  }, [fixtures, sport]);

  const sportAthletes = useMemo(() => {
    return athletes.filter(a => a.sports.some(sp => sp.sportSlug === sport.slug));
  }, [athletes, sport]);

  return (
    <PublicShell>
      {/* Back to sports directory */}
      <div style={{ padding: "16px 0 8px" }}>
        <Link href="/sports" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={14} /> All Sports
        </Link>
      </div>

      {/* Sport Banner */}
      <section
        className="card"
        style={{
          position: "relative",
          minHeight: 240,
          borderRadius: 20,
          overflow: "hidden",
          padding: 28,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          marginBottom: 24,
          background: "#1D2019"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${sport.coverImage || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80"})`,
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            opacity: 0.35
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span
              style={{
                background: "var(--accent)",
                color: "#11130F",
                fontSize: 10,
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: 4,
                textTransform: "uppercase"
              }}
            >
              {sport.active ? "ACTIVE DIVISION" : "COMING SOON"}
            </span>
            <span className="muted" style={{ fontSize: 11 }}>
              Participant Model: {sport.participantType.toUpperCase()}
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: "clamp(32px, 6vw, 48px)", margin: "0 0 8px", letterSpacing: "-.04em" }}>
            {sport.slug === "football" ? "Caritas Football Association (CFA)" : `Caritas ${sport.name} Championship`}
          </h1>

          <p className="muted" style={{ fontSize: 14, maxWidth: 620, margin: 0, lineHeight: 1.5 }}>
            {sport.description}
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 18, flexWrap: "wrap" }}>
            <div style={{ background: "rgba(0,0,0,0.6)", padding: "8px 14px", borderRadius: 10, border: "1px solid var(--line)" }}>
              <span className="muted" style={{ fontSize: 10, display: "block" }}>COMPETITION</span>
              <strong style={{ fontSize: 13 }}>{sport.slug === "football" ? "Caritas Football League 2026" : "2026 Invitational"}</strong>
            </div>

            <div style={{ background: "rgba(0,0,0,0.6)", padding: "8px 14px", borderRadius: 10, border: "1px solid var(--line)" }}>
              <span className="muted" style={{ fontSize: 10, display: "block" }}>PARTICIPANTS</span>
              <strong style={{ fontSize: 13 }}>{sportTeams.length > 0 ? `${sportTeams.length} Clubs` : sport.countLabel}</strong>
            </div>

            <div style={{ background: "rgba(0,0,0,0.6)", padding: "8px 14px", borderRadius: 10, border: "1px solid var(--line)" }}>
              <span className="muted" style={{ fontSize: 10, display: "block" }}>SCORING MODEL</span>
              <strong style={{ fontSize: 13, textTransform: "capitalize" }}>{sport.scoringModel.replace("_", " ")}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Sport Navigation Tabs */}
      <div className="filter-row">
        <button
          onClick={() => setActiveTab("overview")}
          className={`filter-chip ${activeTab === "overview" ? "active" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("fixtures")}
          className={`filter-chip ${activeTab === "fixtures" ? "active" : ""}`}
        >
          Fixtures ({sportFixtures.length})
        </button>
        {sport.features.standings && (
          <button
            onClick={() => setActiveTab("standings")}
            className={`filter-chip ${activeTab === "standings" ? "active" : ""}`}
          >
            League Standings
          </button>
        )}
        {sportTeams.length > 0 && (
          <button
            onClick={() => setActiveTab("teams")}
            className={`filter-chip ${activeTab === "teams" ? "active" : ""}`}
          >
            Clubs ({sportTeams.length})
          </button>
        )}
        {sport.features.transfers && (
          <button
            onClick={() => setActiveTab("transfers")}
            className={`filter-chip ${activeTab === "transfers" ? "active" : ""}`}
          >
            Transfers ({transfers.length})
          </button>
        )}
        <button
          onClick={() => setActiveTab("athletes")}
          className={`filter-chip ${activeTab === "athletes" ? "active" : ""}`}
        >
          Athletes ({sportAthletes.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Quick Stats Grid */}
          <div className="grid-3">
            <div className="metric">
              <div className="metric-label">Registered Teams/Athletes</div>
              <div className="metric-value">{sportTeams.length || 16}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Scheduled Fixtures</div>
              <div className="metric-value">{sportFixtures.length || 28}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Status</div>
              <div className="metric-value" style={{ fontSize: 20, color: "var(--accent)" }}>
                {sport.active ? "Season Underway" : "Pre-Season Registration"}
              </div>
            </div>
          </div>

          {/* Configured Positions & Features */}
          <div className="grid-2">
            <div className="card card-pad">
              <div className="eyebrow">SPORT RULES & CONFIGURATION</div>
              <h3 style={{ margin: "8px 0 14px", fontSize: 16 }}>Authorized Positions / Event Categories</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {sport.positions.map(pos => (
                  <span
                    key={pos}
                    style={{
                      background: "#292D24",
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#DFE2D8"
                    }}
                  >
                    {pos}
                  </span>
                ))}
              </div>
            </div>

            <div className="card card-pad">
              <div className="eyebrow">SUPPORTED COMPETITION FORMATS</div>
              <h3 style={{ margin: "8px 0 14px", fontSize: 16 }}>Tournament Structures</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {sport.competitionFormats.map(fmt => (
                  <span
                    key={fmt}
                    style={{
                      background: "rgba(184, 255, 22, 0.12)",
                      color: "var(--accent)",
                      padding: "6px 12px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "capitalize"
                    }}
                  >
                    {fmt.replace("_", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Next matches preview */}
          {sportFixtures.length > 0 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h3 className="font-display" style={{ margin: 0, fontSize: 18 }}>
                  Next matches in this sport
                </h3>
                <button onClick={() => setActiveTab("fixtures")} className="text-link">
                  View all <ArrowRight size={13} />
                </button>
              </div>
              <div className="grid-2">
                {sportFixtures.slice(0, 4).map(f => (
                  <MatchCard key={f.id} fixture={f} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Fixtures */}
      {activeTab === "fixtures" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span className="muted" style={{ fontSize: 12 }}>
              {sportFixtures.length} matches scheduled for {sport.name}
            </span>
          </div>
          <div className="grid-2">
            {sportFixtures.map(f => (
              <MatchCard key={f.id} fixture={f} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Standings */}
      {activeTab === "standings" && (
        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--line)", color: "var(--muted)", fontSize: 11, letterSpacing: ".06em" }}>
                <th style={{ padding: "12px 16px" }}>POS</th>
                <th style={{ padding: "12px 16px" }}>CLUB</th>
                <th style={{ padding: "12px 16px" }}>P</th>
                <th style={{ padding: "12px 16px" }}>W</th>
                <th style={{ padding: "12px 16px" }}>D</th>
                <th style={{ padding: "12px 16px" }}>L</th>
                <th style={{ padding: "12px 16px" }}>GF</th>
                <th style={{ padding: "12px 16px" }}>GA</th>
                <th style={{ padding: "12px 16px" }}>GD</th>
                <th style={{ padding: "12px 16px", color: "var(--accent)" }}>PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(row => (
                <tr key={row.team} style={{ borderBottom: "1px solid var(--line)" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 700, color: row.position <= 2 ? "var(--accent)" : "inherit" }}>
                    {row.position}
                  </td>
                  <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <TeamLogo name={row.team} size={24} />
                      <span>{row.team}</span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 16px" }}>{row.played}</td>
                  <td style={{ padding: "12px 16px" }}>{row.won}</td>
                  <td style={{ padding: "12px 16px" }}>{row.drawn}</td>
                  <td style={{ padding: "12px 16px" }}>{row.lost}</td>
                  <td style={{ padding: "12px 16px" }}>{row.goalsFor}</td>
                  <td style={{ padding: "12px 16px" }}>{row.goalsAgainst}</td>
                  <td style={{ padding: "12px 16px" }}>{row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}</td>
                  <td style={{ padding: "12px 16px", fontWeight: 800, color: "var(--accent)", fontSize: 14 }}>
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Teams */}
      {activeTab === "teams" && (
        <div className="grid-2">
          {sportTeams.map(team => (
            <Link
              href={`/teams/${team.slug}`}
              key={team.id}
              className="card card-pad"
              style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}
            >
              <TeamLogo name={team.name} size={48} />
              <div style={{ flex: 1 }}>
                <strong style={{ fontSize: 14 }}>{team.name}</strong>
                <div className="muted" style={{ fontSize: 11, marginTop: 3 }}>
                  Coach: {team.coach} · {team.department || "Caritas University"}
                </div>
              </div>
              <ArrowUpRight size={16} className="muted" />
            </Link>
          ))}
        </div>
      )}

      {/* Tab 5: Transfers */}
      {activeTab === "transfers" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span className="muted" style={{ fontSize: 12 }}>
              Official 2026 player movements
            </span>
            <Link href="/transfers" className="text-link">
              Open full transfer centre <ArrowRight size={13} />
            </Link>
          </div>
          <div className="card">
            {transfers.slice(0, 10).map(tr => (
              <div
                key={tr.id}
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 13
                }}
              >
                <div>
                  <strong>{tr.athleteName}</strong>
                  <div className="muted" style={{ fontSize: 11 }}>
                    {tr.previousTeam} ➔ <span style={{ color: "var(--accent)" }}>{tr.newTeam}</span>
                  </div>
                </div>
                <span className="status status-upcoming">{tr.transferType.replace("_", " ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 6: Athletes */}
      {activeTab === "athletes" && (
        <div className="grid-3">
          {sportAthletes.map(ath => (
            <Link
              href={`/athletes/${ath.slug}`}
              key={ath.id}
              className="card card-pad"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundImage: `url(${ath.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ fontSize: 13, display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {ath.name}
                </strong>
                <span className="muted" style={{ fontSize: 11, display: "block" }}>
                  {ath.department} · {ath.level}
                </span>
              </div>
              <ArrowUpRight size={14} className="muted" />
            </Link>
          ))}
        </div>
      )}
    </PublicShell>
  );
}
