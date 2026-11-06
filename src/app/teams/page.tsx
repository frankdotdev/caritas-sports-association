"use client";

import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { useSportsApp } from "@/lib/store";
import { TeamLogo } from "@/components/ui/team-logo";

export default function TeamsPage() {
  const { teams } = useSportsApp();

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Users size={13} /> OFFICIAL PARTICIPATING CLUBS
        </div>
        <h1>Teams & Clubs</h1>
        <p>
          Meet the eight registered clubs competing for the prestigious 2026 Caritas Football League championship silverware.
        </p>
      </div>

      <SectionHeading
        title="Caritas Football Association (CFA) clubs"
        subtitle="The eight teams competing in the flagship 2026 football tournament."
      />

      <div className="grid-2">
        {teams.map(team => (
          <Link
            href={`/teams/${team.slug}`}
            className="card card-pad"
            key={team.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              textDecoration: "none",
              transition: "transform 0.15s, border-color 0.15s"
            }}
          >
            <TeamLogo name={team.name} size={54} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <strong style={{ fontSize: 15, display: "block" }}>{team.name}</strong>
              <div className="muted" style={{ fontSize: 12, marginTop: 3 }}>
                Head Coach: <strong style={{ color: "var(--accent)" }}>{team.coach}</strong> · {team.department || "Caritas University"}
              </div>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>
                Wing: {team.wing || "Campus Wing"} · {team.rosterCount || 22} Squad Athletes
              </div>
            </div>

            <ArrowUpRight size={16} className="muted" />
          </Link>
        ))}
      </div>
    </PublicShell>
  );
}
