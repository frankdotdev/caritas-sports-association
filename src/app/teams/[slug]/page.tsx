"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Camera,
  MapPin,
  ShieldCheck,
  Trophy,
  UserCheck,
  Users
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { MatchCard } from "@/components/sports/match-card";
import { useSportsApp } from "@/lib/store";
import { TeamLogo } from "@/components/ui/team-logo";

export default function TeamDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { teams, fixtures, athletes, transfers, mediaAssets } = useSportsApp();

  const team = teams.find(t => t.slug === resolvedParams.slug) || teams[0];

  const [activeTab, setActiveTab] = useState<"overview" | "squad" | "staff" | "fixtures" | "transfers" | "gallery">("overview");

  const teamFixtures = useMemo(() => {
    return fixtures.filter(f => f.home === team.name || f.away === team.name);
  }, [fixtures, team]);

  const teamAthletes = useMemo(() => {
    return athletes.filter(a => a.sports.some(s => s.teamName === team.name || s.teamId === team.id));
  }, [athletes, team]);

  const teamTransfers = useMemo(() => {
    return transfers.filter(t => t.newTeam === team.name || t.previousTeam === team.name);
  }, [transfers, team]);

  return (
    <PublicShell>
      {/* Back button */}
      <div style={{ padding: "16px 0 8px" }}>
        <Link href="/teams" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={14} /> Back to clubs directory
        </Link>
      </div>

      {/* Team Header Banner */}
      <section
        className="card"
        style={{
          padding: 28,
          marginBottom: 20,
          background: "linear-gradient(135deg, #1D2019 0%, #151812 100%)",
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap"
        }}
      >
        <TeamLogo name={team.name} size={84} />

        <div style={{ flex: 1, minWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span
              style={{
                background: "var(--accent)",
                color: "#11130F",
                fontSize: 10,
                fontWeight: 800,
                padding: "2px 7px",
                borderRadius: 4
              }}
            >
              OFFICIAL CFA CLUB
            </span>
            <span className="muted" style={{ fontSize: 11 }}>
              {team.sport} · Founded {team.foundedYear || 2021}
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 40px)", margin: "0 0 6px", letterSpacing: "-.04em" }}>
            {team.name}
          </h1>

          <p className="muted" style={{ fontSize: 13, margin: 0, maxWidth: 540 }}>
            {team.bio || "Registered club competing in the flagship 2026 Caritas Football League."}
          </p>

          <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12, color: "var(--muted)", flexWrap: "wrap" }}>
            <span>
              <strong>Head Coach:</strong> {team.coach}
            </span>
            <span>
              <strong>Department:</strong> {team.department || "Caritas University"}
            </span>
            <span>
              <strong>Wing:</strong> {team.wing || "Campus Wing"}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ background: "#292D24", padding: "12px 18px", borderRadius: 12, textAlign: "center" }}>
            <div className="font-display" style={{ fontSize: 24, color: "var(--accent)", fontWeight: 700 }}>
              {team.rosterCount || 24}
            </div>
            <div className="muted" style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase" }}>
              Registered Squad
            </div>
          </div>
          <div style={{ background: "#292D24", padding: "12px 18px", borderRadius: 12, textAlign: "center" }}>
            <div className="font-display" style={{ fontSize: 24, color: "#fff", fontWeight: 700 }}>
              {teamFixtures.length}
            </div>
            <div className="muted" style={{ fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase" }}>
              Fixtures
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="filter-row">
        <button
          onClick={() => setActiveTab("overview")}
          className={`filter-chip ${activeTab === "overview" ? "active" : ""}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("squad")}
          className={`filter-chip ${activeTab === "squad" ? "active" : ""}`}
        >
          Squad Roster
        </button>
        <button
          onClick={() => setActiveTab("staff")}
          className={`filter-chip ${activeTab === "staff" ? "active" : ""}`}
        >
          Coaching Staff
        </button>
        <button
          onClick={() => setActiveTab("fixtures")}
          className={`filter-chip ${activeTab === "fixtures" ? "active" : ""}`}
        >
          Fixtures ({teamFixtures.length})
        </button>
        <button
          onClick={() => setActiveTab("transfers")}
          className={`filter-chip ${activeTab === "transfers" ? "active" : ""}`}
        >
          Transfers ({teamTransfers.length})
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`filter-chip ${activeTab === "gallery" ? "active" : ""}`}
        >
          Gallery
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="grid-3">
            <div className="metric">
              <div className="metric-label">Competition</div>
              <div className="metric-value" style={{ fontSize: 18 }}>Caritas Football League</div>
            </div>
            <div className="metric">
              <div className="metric-label">Head Coach</div>
              <div className="metric-value" style={{ fontSize: 20, color: "var(--accent)" }}>{team.coach}</div>
            </div>
            <div className="metric">
              <div className="metric-label">Home Venue</div>
              <div className="metric-value" style={{ fontSize: 18 }}>Caritas Main Stadium</div>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 className="font-display" style={{ margin: 0, fontSize: 18 }}>
                Next matchday fixtures
              </h3>
              <button onClick={() => setActiveTab("fixtures")} className="text-link">
                View all fixtures <ArrowRight size={13} />
              </button>
            </div>
            <div className="grid-2">
              {teamFixtures.slice(0, 4).map(f => (
                <MatchCard key={f.id} fixture={f} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Squad */}
      {activeTab === "squad" && (
        <section className="card card-pad">
          <h3 className="font-display" style={{ fontSize: 18, marginBottom: 16 }}>
            Official Registered Squad · 2026 Campaign
          </h3>
          <div className="grid-2">
            {[
              ["Modric O.", "Midfielder", "300 Level", "Block C", "10"],
              ["Nero K.", "Defender", "300 Level", "Block C", "4"],
              ["Patoski S.", "Forward", "200 Level", "North Wing", "9"],
              ["Aisha M.", "Winger", "200 Level", "Central Wing", "11"],
              ["Kritolite D.", "Midfielder", "100 Level", "South Wing", "8"],
              ["Miracle C.", "Midfielder", "200 Level", "North Wing", "6"],
              ["Ifeanyi E.", "Defender", "300 Level", "East Wing", "2"],
              ["Lawson K.", "Goalkeeper", "200 Level", "West Wing", "1"],
              ["Joseph B.", "Forward", "100 Level", "North Wing", "19"],
              ["Favourite O.", "Defender", "200 Level", "Block C", "5"],
              ["Eto V.", "Midfielder", "300 Level", "South Wing", "17"]
            ].map(([name, pos, level, wing, num]) => (
              <div
                key={name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: "var(--surface)",
                  borderRadius: 10,
                  border: "1px solid var(--line)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 6,
                      background: "#292D24",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--accent)"
                    }}
                  >
                    #{num}
                  </span>
                  <div>
                    <strong style={{ fontSize: 13 }}>{name}</strong>
                    <span className="muted" style={{ fontSize: 11, display: "block" }}>
                      {pos} · {level} ({wing})
                    </span>
                  </div>
                </div>
                <span className="status status-upcoming">Eligible</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 3: Staff */}
      {activeTab === "staff" && (
        <section className="grid-3">
          <div className="card card-pad">
            <div className="eyebrow">HEAD COACH</div>
            <h3 style={{ margin: "8px 0 4px", fontSize: 16 }}>{team.coach}</h3>
            <p className="muted" style={{ fontSize: 12, margin: 0 }}>
              Tactical planning, squad selection and matchday direction.
            </p>
          </div>

          <div className="card card-pad">
            <div className="eyebrow">ASSISTANT COACH</div>
            <h3 style={{ margin: "8px 0 4px", fontSize: 16 }}>{team.assistantCoach || "Appointed by Head Coach"}</h3>
            <p className="muted" style={{ fontSize: 12, margin: 0 }}>
              Training ground drills and fitness conditioning.
            </p>
          </div>

          <div className="card card-pad">
            <div className="eyebrow">TEAM MANAGER</div>
            <h3 style={{ margin: "8px 0 4px", fontSize: 16 }}>{team.teamManager || "Student Affairs Liaison"}</h3>
            <p className="muted" style={{ fontSize: 12, margin: 0 }}>
              Club logistics, kit coordination and administrative clearances.
            </p>
          </div>
        </section>
      )}

      {/* Tab 4: Fixtures */}
      {activeTab === "fixtures" && (
        <div className="grid-2">
          {teamFixtures.map(f => (
            <MatchCard key={f.id} fixture={f} />
          ))}
        </div>
      )}

      {/* Tab 5: Transfers */}
      {activeTab === "transfers" && (
        <div className="card">
          {teamTransfers.map(tr => (
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
                  {tr.previousTeam} ➔ {tr.newTeam} ({tr.transferType.replace("_", " ")})
                </div>
              </div>
              <span className="status status-live">{tr.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Gallery */}
      {activeTab === "gallery" && (
        <div className="grid-3">
          {mediaAssets.slice(0, 3).map(asset => (
            <div key={asset.id} className="card" style={{ overflow: "hidden" }}>
              <div
                style={{
                  height: 180,
                  backgroundImage: `url(${asset.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              />
              <div style={{ padding: 12 }}>
                <strong style={{ fontSize: 12 }}>{asset.title}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </PublicShell>
  );
}
