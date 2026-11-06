"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Instagram,
  MapPin,
  ShieldCheck,
  Trophy,
  UserCheck
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";

export default function AthleteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { athletes, transfers } = useSportsApp();

  const athlete = athletes.find(a => a.slug === resolvedParams.slug) || athletes[0];

  const athleteTransfers = useMemo(() => {
    return transfers.filter(
      t => t.athleteName.toLowerCase() === athlete.name.toLowerCase() ||
           (athlete.nickname && t.athleteName.toLowerCase().includes(athlete.nickname.toLowerCase()))
    );
  }, [transfers, athlete]);

  return (
    <PublicShell>
      {/* Back button */}
      <div style={{ padding: "16px 0 8px" }}>
        <Link href="/athletes" className="text-link" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={14} /> Back to athlete directory
        </Link>
      </div>

      {/* Main Profile Header Card */}
      <section
        className="card"
        style={{
          padding: 28,
          marginBottom: 24,
          background: "linear-gradient(135deg, #1D2019 0%, #151812 100%)",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          gap: 24,
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: 110,
            height: 110,
            borderRadius: 24,
            backgroundImage: `url(${athlete.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            border: "2px solid var(--accent)"
          }}
        />

        <div>
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
              REGISTERED ATHLETE
            </span>
            <span className="muted" style={{ fontSize: 11 }}>
              ID: {athlete.id} · Verified
            </span>
          </div>

          <h1 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 38px)", margin: "0 0 4px", letterSpacing: "-.04em" }}>
            {athlete.name}
          </h1>

          <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
            {athlete.nickname ? `&ldquo;${athlete.nickname}&rdquo; · ` : ""}
            {athlete.sports[0]?.position || "Athlete"} · {athlete.sports[0]?.teamName || "Caritas Association"}
          </div>

          <p className="muted" style={{ fontSize: 13, margin: 0, maxWidth: 540 }}>
            {athlete.bio || "Student-athlete competing in Caritas collegiate sports."}
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8, textAlign: "right" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: "var(--accent)",
              fontSize: 12,
              fontWeight: 700
            }}
          >
            <CheckCircle2 size={15} /> Eligibility Verified
          </span>
          {athlete.socialInstagram && (
            <span className="muted" style={{ fontSize: 11 }}>
              <Instagram size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 3 }} />
              {athlete.socialInstagram}
            </span>
          )}
        </div>
      </section>

      {/* Collegiate Academic & Biological Data (No Year Exposing Privacy Protection) */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="metric">
          <div className="metric-label">Academic Department</div>
          <div className="metric-value" style={{ fontSize: 16 }}>{athlete.department}</div>
        </div>

        <div className="metric">
          <div className="metric-label">Study Level</div>
          <div className="metric-value" style={{ fontSize: 18, color: "var(--accent)" }}>{athlete.level}</div>
        </div>

        <div className="metric">
          <div className="metric-label">Residential Wing</div>
          <div className="metric-value" style={{ fontSize: 16 }}>{athlete.wing || "Campus Wing"}</div>
        </div>

        <div className="metric">
          <div className="metric-label">Birthday (Public Display)</div>
          <div className="metric-value" style={{ fontSize: 16 }}>{athlete.birthdayDayMonth}</div>
          <span className="muted" style={{ fontSize: 9, display: "block", marginTop: 3 }}>
            Birth year protected by privacy policy
          </span>
        </div>
      </div>

      {/* Multi-Sport Registration Profiles */}
      <section className="section" style={{ marginTop: 0, marginBottom: 24 }}>
        <div className="section-heading">
          <div>
            <h2>Sport Registrations ({athlete.sports.length})</h2>
            <p>A single person can participate in multiple sporting disciplines under Caritas Sports.</p>
          </div>
        </div>

        <div className="grid-2">
          {athlete.sports.map(sp => (
            <div key={sp.sportSlug} className="card card-pad">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="eyebrow">{sp.sportName}</div>
                  <h3 style={{ margin: "6px 0 2px", fontSize: 18 }}>
                    {sp.teamName || "Individual Competitor"}
                  </h3>
                  <span className="muted" style={{ fontSize: 12 }}>
                    Role: {sp.position || "Competitor"} {sp.jerseyNumber ? `· Jersey #${sp.jerseyNumber}` : ""}
                  </span>
                </div>

                <span className="status status-live">Active</span>
              </div>

              {/* Statistics Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginTop: 16,
                  paddingTop: 14,
                  borderTop: "1px solid var(--line)"
                }}
              >
                <div>
                  <div className="muted" style={{ fontSize: 10 }}>APPEARANCES</div>
                  <strong style={{ fontSize: 18 }}>{sp.appearances || 0}</strong>
                </div>
                {sp.goals !== undefined && (
                  <div>
                    <div className="muted" style={{ fontSize: 10 }}>GOALS</div>
                    <strong style={{ fontSize: 18, color: "var(--accent)" }}>{sp.goals}</strong>
                  </div>
                )}
                {sp.assists !== undefined && (
                  <div>
                    <div className="muted" style={{ fontSize: 10 }}>ASSISTS</div>
                    <strong style={{ fontSize: 18 }}>{sp.assists}</strong>
                  </div>
                )}
                {sp.points !== undefined && (
                  <div>
                    <div className="muted" style={{ fontSize: 10 }}>POINTS</div>
                    <strong style={{ fontSize: 18, color: "var(--accent)" }}>{sp.points}</strong>
                  </div>
                )}
                {sp.personalBest && (
                  <div style={{ gridColumn: "span 2" }}>
                    <div className="muted" style={{ fontSize: 10 }}>PERSONAL BEST</div>
                    <strong style={{ fontSize: 15, color: "var(--accent)" }}>{sp.personalBest}</strong>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Honors & Achievements */}
      {athlete.achievements && athlete.achievements.length > 0 && (
        <section className="card card-pad" style={{ marginBottom: 24 }}>
          <div className="eyebrow">HONORS & CITATIONS</div>
          <h3 style={{ margin: "8px 0 14px", fontSize: 16 }}>Key Sporting Honors</h3>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {athlete.achievements.map(ach => (
              <span
                key={ach}
                style={{
                  background: "#292D24",
                  border: "1px solid var(--line)",
                  padding: "8px 14px",
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#DFE2D8",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}
              >
                <Trophy size={14} style={{ color: "var(--accent)" }} />
                {ach}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Transfer History */}
      {athleteTransfers.length > 0 && (
        <section className="card card-pad">
          <div className="eyebrow">TRANSFER RECORD</div>
          <h3 style={{ margin: "8px 0 14px", fontSize: 16 }}>Transfer History</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {athleteTransfers.map(tr => (
              <div
                key={tr.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid var(--line)",
                  fontSize: 12
                }}
              >
                <span>
                  From <strong>{tr.previousTeam}</strong> ➔ <strong>{tr.newTeam}</strong> ({tr.transferType.replace("_", " ")})
                </span>
                <span className="muted">{tr.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </PublicShell>
  );
}
