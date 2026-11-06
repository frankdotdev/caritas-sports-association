"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Flame,
  Gift,
  Instagram,
  MapPin,
  Radio,
  Share2,
  Sparkles,
  Target,
  Trophy,
  Users,
  Video
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { SportCard } from "@/components/sports/sport-card";
import { MatchCard } from "@/components/sports/match-card";
import { InstallBanner } from "@/components/ui/install-banner";
import { DeveloperCredits } from "@/components/layout/developer-credits";
import { ShareModal } from "@/components/ui/share-modal";
import { TeamLogo } from "@/components/ui/team-logo";
import { useSportsApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";

export default function HomePage() {
  const {
    sports,
    fixtures,
    teams,
    athletes,
    announcements,
    newsArticles,
    officials,
    transfers,
    mediaAssets,
    fanTokens
  } = useSportsApp();

  const [shareData, setShareData] = useState<{ title: string; text: string } | null>(null);

  const liveMatches = fixtures.filter(f => f.status === "live" || f.status === "half_time");
  const upcomingFixtures = fixtures.filter(f => f.status === "scheduled").slice(0, 3);
  const completedMatches = fixtures.filter(f => f.status === "completed").slice(0, 3);
  const featuredAnnouncements = announcements.slice(0, 2);
  const spotlightAthletes = athletes.slice(0, 4);

  return (
    <PublicShell>
      {/* 1. Hero Banner */}
      <section className="hero">
        <div className="hero-photo" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)" }} />
            CARITAS SPORTS ASSOCIATION · 2026 SEASON
          </div>
          <h1>
            MORE THAN
            <br />A GAME.
          </h1>
          <p>
            One association. Multiple sports. One competitive community. The official digital headquarters of Caritas sports, featuring the 2026 Caritas Football League.
          </p>
          <div className="hero-actions">
            <Link href="/sports" className="primary-button">
              Explore sports <ArrowRight size={15} />
            </Link>
            <Link href="/fixtures" className="secondary-button">
              Match schedule
            </Link>
            <Link href="/predictions" className="secondary-button" style={{ borderColor: "rgba(184, 255, 22, 0.4)", color: "var(--accent)" }}>
              <Target size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
              Fan Predictor ({fanTokens} Coins)
            </Link>
            <button
              onClick={() =>
                setShareData({
                  title: "Caritas Sports Association",
                  text: "🏆 Caritas Sports Association 2026: Follow fixtures, live scores, football transfers and multi-sport tournaments!"
                })
              }
              className="icon-button"
              style={{ width: 44, height: 44 }}
              title="Share Platform"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* PWA Install Banner */}
      <InstallBanner />

      {/* 2. Live Match Alert Section (if live) */}
      {liveMatches.length > 0 && (
        <section className="section">
          <div
            className="card"
            style={{
              padding: "16px 20px",
              background: "rgba(184, 255, 22, 0.08)",
              borderColor: "rgba(184, 255, 22, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  background: "var(--accent)",
                  color: "#11130F",
                  padding: "4px 8px",
                  borderRadius: 6,
                  fontWeight: 800,
                  fontSize: 11
                }}
              >
                <Radio size={13} /> MATCHDAY LIVE
              </span>
              <div>
                <strong style={{ fontSize: 14 }}>
                  {liveMatches[0].home} {liveMatches[0].homeScore} – {liveMatches[0].awayScore} {liveMatches[0].away}
                </strong>
                <span className="muted" style={{ display: "block", fontSize: 11 }}>
                  {liveMatches[0].round} · {liveMatches[0].liveMinute}&apos; {liveMatches[0].period} · Live on TikTok
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Link href={`/matches/${liveMatches[0].id}`} className="primary-button" style={{ padding: "8px 14px", fontSize: 12 }}>
                Watch & follow live <ArrowRight size={13} />
              </Link>
              <button
                onClick={() =>
                  setShareData({
                    title: `${liveMatches[0].home} vs ${liveMatches[0].away} Live`,
                    text: `🔴 LIVE SCORE: ${liveMatches[0].home} ${liveMatches[0].homeScore} - ${liveMatches[0].awayScore} ${liveMatches[0].away} (${liveMatches[0].liveMinute}') at Caritas Main Stadium! Follow live now!`
                  })
                }
                className="icon-button"
                style={{ width: 34, height: 34 }}
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 3. Free Fan Predictor Callout */}
      <section className="section">
        <div
          className="card"
          style={{
            padding: 24,
            background: "linear-gradient(135deg, #1A1F16 0%, #252D1E 100%)",
            border: "1px solid rgba(184, 255, 22, 0.3)",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 20,
            alignItems: "center"
          }}
        >
          <div>
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)" }}>
              <Target size={13} /> 100% FREE CAMPUS BETTING & PREDICTION
            </div>
            <h2 className="font-display" style={{ fontSize: 24, margin: "8px 0 6px" }}>
              Predict Matches, Climb Leaderboard & Win Sponsor Prizes
            </h2>
            <p className="muted" style={{ fontSize: 13, lineHeight: 1.5, margin: 0, maxWidth: 500 }}>
              No real money involved — bet your free Fan Coins on match results, correct scores, over/under, and goalscorers. Sponsored alumni airtime rewards given to top weekly predictors!
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "center" }}>
              <Link href="/predictions" className="primary-button">
                Start Predicting ({fanTokens} Coins) <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#11130F", padding: 14, borderRadius: 12, border: "1px solid var(--line)" }}>
              <div className="font-display" style={{ fontSize: 26, color: "var(--accent)", fontWeight: 700 }}>
                {fanTokens.toLocaleString()}
              </div>
              <div className="muted" style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>
                Your Fan Coins
              </div>
            </div>
            <div style={{ background: "#11130F", padding: 14, borderRadius: 12, border: "1px solid var(--line)" }}>
              <div className="font-display" style={{ fontSize: 26, color: "#FFFFFF", fontWeight: 700 }}>
                ₦20,000+
              </div>
              <div className="muted" style={{ fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>
                Sponsor Pledges
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sports Directory */}
      <section className="section">
        <SectionHeading
          title="The sporting community"
          subtitle="Configurable multi-sport architecture powering collegiate athletic disciplines."
          href="/sports"
        />
        <div className="grid-3">
          {sports.map(sport => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>
      </section>

      {/* 5. Flagship Caritas Football League 2026 */}
      <section className="section">
        <div
          className="card"
          style={{
            padding: 28,
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: 24,
            alignItems: "center"
          }}
        >
          <div>
            <div className="eyebrow">FLAGSHIP TOURNAMENT</div>
            <h2 className="font-display" style={{ fontSize: 32, lineHeight: 1.05, letterSpacing: "-.05em", margin: "12px 0" }}>
              CARITAS FOOTBALL LEAGUE 2026
            </h2>
            <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 500 }}>
              The official Caritas Football Association (CFA) division. Eight historic clubs competing across twenty-eight league fixtures from November 1st to November 28th, 2026.
            </p>
            <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/sports/football" className="primary-button">
                Explore CFA League <ArrowUpRight size={15} />
              </Link>
              <Link href="/fixtures" className="secondary-button">
                Full 28 Fixtures
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[
              ["08", "CLUBS"],
              ["28", "FIXTURES"],
              ["04", "WEEKS"],
              ["2026", "SEASON"]
            ].map(([n, l]) => (
              <div key={l} style={{ background: "#292D24", padding: 18, borderRadius: 14 }}>
                <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: "var(--accent)" }}>
                  {n}
                </div>
                <div className="muted" style={{ fontSize: 10, letterSpacing: ".14em", marginTop: 4 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Upcoming Fixtures */}
      <section className="section">
        <SectionHeading
          title="Upcoming fixtures"
          subtitle="Follow the official 2026 match schedule and live score updates."
          href="/fixtures"
        />
        <div className="grid-3">
          {upcomingFixtures.map(fixture => (
            <MatchCard key={fixture.id} fixture={fixture} />
          ))}
        </div>
      </section>

      {/* 7. Latest Results */}
      {completedMatches.length > 0 && (
        <section className="section">
          <SectionHeading
            title="Latest completed matches"
            subtitle="Verified results recorded by the Caritas Football Association."
            href="/fixtures"
          />
          <div className="grid-3">
            {completedMatches.map(fixture => (
              <MatchCard key={fixture.id} fixture={fixture} />
            ))}
          </div>
        </section>
      )}

      {/* 8. Meet the 8 CFA Clubs */}
      <section className="section">
        <SectionHeading
          title="Caritas Football League clubs"
          subtitle="The eight teams competing in the 2026 flagship football season."
          href="/teams"
        />
        <div className="card">
          {teams.map(team => (
            <Link
              href={`/teams/${team.slug}`}
              className="team-row"
              key={team.id}
              style={{ textDecoration: "none" }}
            >
              <TeamLogo name={team.name} size={36} />
              <div className="team-row-info">
                <strong>{team.name}</strong>
                <span>
                  Coach: {team.coach} · {team.department || "Caritas University"} · {team.rosterCount} squad members
                </span>
              </div>
              <ArrowUpRight size={15} className="muted" />
            </Link>
          ))}
        </div>
      </section>

      {/* 9. Athlete Spotlight */}
      <section className="section">
        <SectionHeading
          title="Athlete spotlight"
          subtitle="Meet top student-athletes representing the Caritas sports community."
          href="/athletes"
        />
        <div className="grid-4">
          {spotlightAthletes.map(ath => (
            <Link
              href={`/athletes/${ath.slug}`}
              key={ath.id}
              className="card"
              style={{ overflow: "hidden", display: "block", textDecoration: "none" }}
            >
              <div
                style={{
                  height: 180,
                  backgroundImage: `url(${ath.image || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center top",
                  position: "relative"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    background: "rgba(17,19,15,0.85)",
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 700,
                    color: "var(--accent)"
                  }}
                >
                  {ath.sports[0]?.teamName || ath.sports[0]?.sportName}
                </div>
              </div>

              <div style={{ padding: 14 }}>
                <strong style={{ fontSize: 14, display: "block" }}>{ath.name}</strong>
                <span className="muted" style={{ fontSize: 11, display: "block", marginTop: 2 }}>
                  {ath.nickname ? `"${ath.nickname}" · ` : ""}
                  {ath.sports[0]?.position || "Athlete"}
                </span>
                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 8,
                    borderTop: "1px solid var(--line)",
                    fontSize: 10,
                    color: "var(--muted)",
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <span>{ath.department}</span>
                  <span>{ath.level}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 10. Official Announcements & Instagram Integration */}
      <section className="section">
        <SectionHeading
          title="Latest official announcements"
          subtitle="Direct communiqués from the CFA Executive Presidency and Directorate."
          href="/news"
        />
        <div className="grid-2">
          {featuredAnnouncements.map(ann => (
            <div key={ann.id} className="card card-pad" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="eyebrow">{ann.category}</span>
                  <span className="muted" style={{ fontSize: 11 }}>
                    {formatDate(ann.publishedAt)}
                  </span>
                </div>
                <h3 className="font-display" style={{ fontSize: 18, margin: "10px 0" }}>
                  {ann.title}
                </h3>
                <p className="muted" style={{ fontSize: 12, lineHeight: 1.6, whiteSpace: "pre-line" }}>
                  {ann.body.slice(0, 180)}...
                </p>
              </div>

              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="muted" style={{ fontSize: 11 }}>
                  Author: {ann.author}
                </span>
                {ann.externalLink ? (
                  <a
                    href={ann.externalLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                  >
                    <Instagram size={13} /> {ann.externalLink.label} <ExternalLink size={12} />
                  </a>
                ) : (
                  <Link href="/news" className="text-link">
                    Read communique <ArrowRight size={13} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Association Officials */}
      <section className="section">
        <SectionHeading
          title="Association officials"
          subtitle="Leadership and technical match officials driving Caritas sports."
          href="/officials"
        />
        <div className="grid-4">
          {officials.slice(0, 4).map(off => (
            <div key={off.id} className="card card-pad" style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  backgroundImage: `url(${off.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  margin: "0 auto 12px",
                  border: "2px solid var(--accent)"
                }}
              />
              <strong style={{ fontSize: 14, display: "block" }}>{off.name}</strong>
              <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginTop: 2 }}>
                {off.role}
              </div>
              <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>
                {off.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. PROMINENT DEVELOPER CREDITS SECTION */}
      <DeveloperCredits variant="prominent" />

      {/* Footer (Strictly public, NO admin links whatsoever) */}
      <footer className="footer" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div className="brand">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                overflow: "hidden",
                background: "#1D2019",
                border: "1px solid var(--line)"
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Caritas Sports"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <span>
              CARITAS
              <span className="brand-sub">SPORTS ASSOCIATION · CSA</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a
              href="https://www.instagram.com/caritas_football?stkn=MWgyMnd4cXNpdHptNw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                background: "var(--surface)",
                padding: "8px 14px",
                borderRadius: 99,
                fontSize: 12,
                color: "var(--text)",
                border: "1px solid var(--line)"
              }}
            >
              <Instagram size={15} style={{ color: "#E1306C" }} />
              <span>@caritas_football</span>
              <ExternalLink size={12} className="muted" />
            </a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", borderTop: "1px solid var(--line)", paddingTop: 16, flexWrap: "wrap", gap: 10 }}>
          <span>© 2026 Caritas Sports Association. All rights reserved.</span>
          <DeveloperCredits variant="inline" />
        </div>
      </footer>

      {/* Social Share Modal */}
      {shareData && (
        <ShareModal
          title={shareData.title}
          text={shareData.text}
          onClose={() => setShareData(null)}
        />
      )}
    </PublicShell>
  );
}
