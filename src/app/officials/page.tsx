"use client";

import Link from "next/link";
import { ArrowUpRight, Award, Mail, Phone, ShieldCheck, Trophy, Users } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";

export default function OfficialsPage() {
  const { officials, teams } = useSportsApp();

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow">ASSOCIATION GOVERNANCE</div>
        <h1>Leadership & Officials</h1>
        <p>
          Meet the executive council, technical committee, certified match commissioners, referees and club head coaches of Caritas Sports Association.
        </p>
      </div>

      {/* Executive Council Section */}
      <div className="section-heading">
        <div>
          <h2>Executive council & directorate</h2>
          <p>Leading strategic direction, inter-faculty compliance and association affairs.</p>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 40 }}>
        {officials.map(off => (
          <div key={off.id} className="card card-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundImage: `url(${off.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: "2px solid var(--accent)",
                    flexShrink: 0
                  }}
                />
                <div>
                  <strong style={{ fontSize: 16, display: "block" }}>{off.name}</strong>
                  <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 600 }}>{off.role}</span>
                  <span className="muted" style={{ fontSize: 11, display: "block" }}>{off.department}</span>
                </div>
              </div>

              <p className="muted" style={{ fontSize: 12, lineHeight: 1.6, margin: 0 }}>
                {off.bio || off.title}
              </p>
            </div>

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--line)", fontSize: 11, color: "var(--muted)", display: "flex", justifyContent: "space-between" }}>
              <span>Verified Official</span>
              <span style={{ color: "var(--accent)" }}>Active 2026</span>
            </div>
          </div>
        ))}
      </div>

      {/* CFA 2026 Coaches Directory */}
      <div className="section-heading">
        <div>
          <h2>Caritas Football League coaches directory</h2>
          <p>Official contacts published by CFA for new and prospective player recruitment.</p>
        </div>
      </div>

      <div className="grid-2">
        {teams.map(team => (
          <div
            key={team.id}
            className="card card-pad"
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                className="team-crest"
                style={{
                  width: 44,
                  height: 44,
                  backgroundColor: team.color,
                  color: "#fff",
                  fontSize: 12
                }}
              >
                {team.shortName}
              </span>
              <div>
                <strong style={{ fontSize: 14, display: "block" }}>{team.name}</strong>
                <span className="muted" style={{ fontSize: 12 }}>
                  Head Coach: <strong style={{ color: "var(--accent)" }}>{team.coach}</strong>
                </span>
                <span className="muted" style={{ fontSize: 11, display: "block", marginTop: 2 }}>
                  {team.department || "Caritas University"}
                </span>
              </div>
            </div>

            <Link href={`/teams/${team.slug}`} className="secondary-button" style={{ padding: "6px 10px", fontSize: 11 }}>
              Club profile <ArrowUpRight size={12} />
            </Link>
          </div>
        ))}
      </div>
    </PublicShell>
  );
}
