"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, CalendarDays, Filter, Radio, Trophy } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { MatchCard } from "@/components/sports/match-card";
import { useSportsApp } from "@/lib/store";

const statusFilters = ["All matches", "Upcoming", "Live now", "Completed"];

export default function FixturesPage() {
  const { fixtures, sports } = useSportsApp();
  const [statusFilter, setStatusFilter] = useState("All matches");
  const [selectedSport, setSelectedSport] = useState("All sports");
  const [selectedWeek, setSelectedWeek] = useState("All weeks");

  const filtered = useMemo(() => {
    return fixtures.filter(item => {
      if (statusFilter === "Upcoming" && item.status !== "scheduled") return false;
      if (statusFilter === "Live now" && item.status !== "live" && item.status !== "half_time") return false;
      if (statusFilter === "Completed" && item.status !== "completed") return false;
      if (selectedSport !== "All sports" && item.sport.toLowerCase() !== selectedSport.toLowerCase()) return false;
      if (selectedWeek !== "All weeks" && !item.round.includes(selectedWeek)) return false;
      return true;
    });
  }, [fixtures, statusFilter, selectedSport, selectedWeek]);

  const liveMatches = fixtures.filter(f => f.status === "live" || f.status === "half_time");

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <CalendarDays size={13} /> OFFICIAL MATCH CALENDAR
        </div>
        <h1>Fixtures & Results</h1>
        <p>
          Follow the official 2026 Caritas Football League schedule — twenty-eight scheduled fixtures from opening week (Nov 1) through the championship finale (Nov 28).
        </p>
      </div>

      {/* Live Alert Banner if any match is in progress */}
      {liveMatches.length > 0 && (
        <div
          className="card card-pad"
          style={{
            background: "rgba(184, 255, 22, 0.08)",
            borderColor: "rgba(184, 255, 22, 0.35)",
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="status status-live">
              <Radio size={12} /> MATCH IN PROGRESS
            </span>
            <strong style={{ fontSize: 14 }}>
              {liveMatches[0].home} {liveMatches[0].homeScore} : {liveMatches[0].awayScore} {liveMatches[0].away} ({liveMatches[0].liveMinute}&apos;)
            </strong>
          </div>
          <Link href={`/matches/${liveMatches[0].id}`} className="primary-button" style={{ padding: "6px 12px", fontSize: 11 }}>
            Enter Live Match Centre
          </Link>
        </div>
      )}

      {/* Filter Chips Bar */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 16 }}>
        <div className="filter-row" style={{ margin: 0 }}>
          {statusFilters.map(f => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`filter-chip ${statusFilter === f ? "active" : ""}`}
            >
              {f}
            </button>
          ))}
        </div>

        <select
          value={selectedWeek}
          onChange={e => setSelectedWeek(e.target.value)}
          style={{
            height: 38,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 999,
            padding: "0 14px",
            color: "var(--text)",
            fontSize: 12,
            cursor: "pointer"
          }}
        >
          <option value="All weeks">All 4 Weeks</option>
          <option value="Week 1">Week 1 (Nov 1 - Nov 7)</option>
          <option value="Week 2">Week 2 (Nov 8 - Nov 14)</option>
          <option value="Week 3">Week 3 (Nov 15 - Nov 21)</option>
          <option value="Week 4">Week 4 (Nov 22 - Nov 28)</option>
        </select>
      </div>

      <div className="section-heading">
        <div>
          <h2>Caritas Football League 2026 Schedule</h2>
          <p>{filtered.length} fixture records matching current filters · Caritas Main Stadium</p>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No fixtures found matching your selected filters.</div>
      ) : (
        <div className="grid-2">
          {filtered.map(fixture => (
            <MatchCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      )}
    </PublicShell>
  );
}
