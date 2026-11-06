"use client";

import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  ImagePlus,
  Megaphone,
  Plus,
  Radio,
  ShieldCheck,
  Trophy,
  Users,
  UserRound,
  ClipboardList,
  ArrowLeftRight
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useSportsApp } from "@/lib/store";

export default function DashboardPage() {
  const { sports, teams, fixtures, transfers, currentSession } = useSportsApp();

  const liveMatches = fixtures.filter(f => f.status === "live" || f.status === "half_time");

  return (
    <>
      <SiteHeader />
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-label">WORKSPACE</div>
          <Link href="/dashboard" className="sidebar-link active">
            <Activity size={16} /> Overview
          </Link>
          <Link href="/sports" className="sidebar-link">
            <Trophy size={16} /> Sports
          </Link>
          <Link href="/teams" className="sidebar-link">
            <Users size={16} /> Teams
          </Link>
          <Link href="/athletes" className="sidebar-link">
            <UserRound size={16} /> Athletes
          </Link>
          <Link href="/fixtures" className="sidebar-link">
            <CalendarDays size={16} /> Fixtures
          </Link>
          <Link href="/transfers" className="sidebar-link">
            <ArrowLeftRight size={16} /> Transfers
          </Link>
          <Link href="/news" className="sidebar-link">
            <Megaphone size={16} /> News & media
          </Link>

          <div className="sidebar-label">ADMINISTRATION</div>
          <Link href="/admin" className="sidebar-link" style={{ color: "var(--accent)" }}>
            <ShieldCheck size={16} /> Central Admin Console
          </Link>
        </aside>

        <main className="dashboard-content">
          <div className="page-intro" style={{ paddingTop: 4 }}>
            <div className="eyebrow">CARITAS SPORTS · MANAGEMENT</div>
            <h1>Good morning, {currentSession.name}.</h1>
            <p>
              Your role: <strong style={{ color: "var(--accent)" }}>{currentSession.roleLabel}</strong>. Monitor active competitions, live scores, team registrations and transfer windows.
            </p>
          </div>

          <div className="grid-4">
            <div className="metric">
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)" }}>
                <span className="metric-label">Sports</span>
                <Trophy size={16} />
              </div>
              <div className="metric-value">{sports.length}</div>
            </div>

            <div className="metric">
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)" }}>
                <span className="metric-label">Football clubs</span>
                <Users size={16} />
              </div>
              <div className="metric-value">{teams.length}</div>
            </div>

            <div className="metric">
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)" }}>
                <span className="metric-label">Fixtures</span>
                <CalendarDays size={16} />
              </div>
              <div className="metric-value">{fixtures.length}</div>
            </div>

            <div className="metric">
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)" }}>
                <span className="metric-label">Live matches</span>
                <Activity size={16} />
              </div>
              <div className="metric-value" style={{ color: liveMatches.length > 0 ? "var(--accent)" : "inherit" }}>
                {liveMatches.length}
              </div>
            </div>
          </div>

          <section className="section">
            <div className="section-heading">
              <div>
                <h2>Quick actions</h2>
                <p>Common association management tasks.</p>
              </div>
            </div>
            <div className="grid-3">
              <Link href="/admin" className="card card-pad" style={{ textAlign: "left", color: "var(--text)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="sport-icon"><Trophy size={18} /></div>
                  <Plus size={16} className="muted" />
                </div>
                <strong style={{ display: "block", marginTop: 16, fontSize: 13 }}>Add a sport</strong>
                <span className="muted" style={{ display: "block", fontSize: 11, marginTop: 5 }}>
                  Configure sports rules, scoring model and features
                </span>
              </Link>

              <Link href="/admin" className="card card-pad" style={{ textAlign: "left", color: "var(--text)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="sport-icon"><CalendarDays size={18} /></div>
                  <Plus size={16} className="muted" />
                </div>
                <strong style={{ display: "block", marginTop: 16, fontSize: 13 }}>Matchday operations</strong>
                <span className="muted" style={{ display: "block", fontSize: 11, marginTop: 5 }}>
                  Update live scores & TikTok LIVE URLs
                </span>
              </Link>

              <Link href="/transfers" className="card card-pad" style={{ textAlign: "left", color: "var(--text)" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="sport-icon"><ArrowLeftRight size={18} /></div>
                  <Plus size={16} className="muted" />
                </div>
                <strong style={{ display: "block", marginTop: 16, fontSize: 13 }}>Transfer Centre</strong>
                <span className="muted" style={{ display: "block", fontSize: 11, marginTop: 5 }}>
                  Submit or approve 2026 player movements
                </span>
              </Link>
            </div>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <h2>Flagship Caritas Football League 2026</h2>
                <p>8 Clubs · 28 Scheduled Fixtures · 4 Weeks of Competition</p>
              </div>
              <Link href="/fixtures" className="text-link">
                View schedule <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className="card">
              {teams.map(team => (
                <div className="team-row" key={team.id}>
                  <span className="team-crest" style={{ backgroundColor: team.color }}>{team.shortName}</span>
                  <div className="team-row-info">
                    <strong>{team.name}</strong>
                    <span>Caritas Football League 2026 · Coach: {team.coach}</span>
                  </div>
                  <span className="status status-live">Seeded & Verified</span>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
      <BottomNav />
    </>
  );
}
