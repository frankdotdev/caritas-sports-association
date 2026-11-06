"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ExternalLink,
  Flame,
  MapPin,
  MessageSquare,
  Play,
  Plus,
  Radio,
  Share2,
  ShieldCheck,
  Target,
  Trophy,
  Users,
  Video
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { TeamLogo } from "@/components/ui/team-logo";
import { ShareModal } from "@/components/ui/share-modal";
import type { MatchEventType } from "@/domain/types";

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { fixtures, addMatchEvent, addMatchCommentary, updateFixtureScore, updateFixtureStatus, updateMatchStream, currentSession } = useSportsApp();

  const fixture = fixtures.find(f => f.id === resolvedParams.id) || fixtures[4]; // fallback to today's live clash

  const [activeTab, setActiveTab] = useState<"stream" | "timeline" | "commentary" | "stats" | "lineups">("stream");
  const [shareData, setShareData] = useState<{ title: string; text: string } | null>(null);

  const isLive = fixture.status === "live" || fixture.status === "half_time";

  return (
    <PublicShell>
      {/* Back button and Share */}
      <div style={{ padding: "16px 0 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          href="/fixtures"
          className="text-link"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <ArrowLeft size={14} /> Back to match schedule
        </Link>

        <button
          onClick={() =>
            setShareData({
              title: `${fixture.home} vs ${fixture.away}`,
              text: `⚽ *${fixture.home} vs ${fixture.away}*\n${isLive ? `🔴 LIVE (${fixture.liveMinute}'): ${fixture.homeScore ?? 0} - ${fixture.awayScore ?? 0}` : `🗓️ ${formatDate(fixture.date)} · ${fixture.round}`}\n🏟️ Venue: ${fixture.venue || "Caritas Stadium"}`
            })
          }
          className="secondary-button"
          style={{ padding: "6px 12px", fontSize: 11, display: "inline-flex", alignItems: "center", gap: 5 }}
        >
          <Share2 size={13} /> Share Match
        </button>
      </div>

      {/* Match Header Scoreboard */}
      <section
        className="card"
        style={{
          padding: "24px 20px",
          background: "linear-gradient(180deg, #1D2019 0%, #151812 100%)",
          borderColor: isLive ? "rgba(184, 255, 22, 0.4)" : "var(--line)",
          marginBottom: 20
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <span className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {fixture.competition} · {fixture.round}
          </span>

          <span
            className={`status ${
              isLive ? "status-live" : fixture.status === "completed" ? "status-done" : "status-upcoming"
            }`}
          >
            {isLive && (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "currentColor",
                  animation: "pulse 1.5s infinite"
                }}
              />
            )}
            {isLive && fixture.liveMinute ? `${fixture.liveMinute}' ` : ""}
            {fixture.status.replace("_", " ")}
          </span>
        </div>

        {/* Main Scoreboard Display */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 16,
            padding: "20px 0"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <TeamLogo name={fixture.home} size={64} />
            <strong style={{ fontSize: 16, marginTop: 10 }}>{fixture.home}</strong>
            <span className="muted" style={{ fontSize: 11 }}>
              Home
            </span>
          </div>

          <div style={{ textAlign: "center" }}>
            <div
              className="font-display"
              style={{
                fontSize: "clamp(36px, 8vw, 56px)",
                fontWeight: 700,
                letterSpacing: "-.05em",
                color: isLive ? "var(--accent)" : "var(--text)"
              }}
            >
              {fixture.homeScore !== undefined && fixture.awayScore !== undefined
                ? `${fixture.homeScore} : ${fixture.awayScore}`
                : "VS"}
            </div>
            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
              {isLive ? `${fixture.period || "Live Match"} · ${fixture.liveMinute || 0}'` : formatDate(fixture.date)}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <TeamLogo name={fixture.away} size={64} />
            <strong style={{ fontSize: 16, marginTop: 10 }}>{fixture.away}</strong>
            <span className="muted" style={{ fontSize: 11 }}>
              Away
            </span>
          </div>
        </div>

        {/* Venue & Date Footer */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: "var(--muted)",
            flexWrap: "wrap",
            gap: 10
          }}
        >
          <span>
            <CalendarDays size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            {formatDate(fixture.date)} · Kickoff {fixture.time || "16:00"}
          </span>
          <span>
            <MapPin size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            {fixture.venue || "Caritas Main Stadium"}
          </span>
          <span>Officials: {fixture.officials?.join(", ") || "Caritas Referees Council"}</span>
        </div>
      </section>

      {/* Fan Predictor Callout inside Match Centre */}
      <div
        className="card card-pad"
        style={{
          background: "rgba(184, 255, 22, 0.08)",
          borderColor: "rgba(184, 255, 22, 0.25)",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Target size={18} style={{ color: "var(--accent)" }} />
          <div>
            <strong style={{ fontSize: 13, display: "block" }}>Want to predict this match result?</strong>
            <span className="muted" style={{ fontSize: 11 }}>Free campus fan betting. Predict winner, correct score & goalscorer.</span>
          </div>
        </div>

        <Link href={`/predictions`} className="primary-button" style={{ padding: "6px 12px", fontSize: 11 }}>
          Place Free Prediction
        </Link>
      </div>

      {/* Navigation Tabs */}
      <div className="filter-row">
        <button
          onClick={() => setActiveTab("stream")}
          className={`filter-chip ${activeTab === "stream" ? "active" : ""}`}
        >
          <Radio size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
          TikTok LIVE Stream
        </button>
        <button
          onClick={() => setActiveTab("timeline")}
          className={`filter-chip ${activeTab === "timeline" ? "active" : ""}`}
        >
          Match Timeline ({fixture.events?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("commentary")}
          className={`filter-chip ${activeTab === "commentary" ? "active" : ""}`}
        >
          Live Commentary ({fixture.commentary?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab("stats")}
          className={`filter-chip ${activeTab === "stats" ? "active" : ""}`}
        >
          Match Statistics
        </button>
        <button
          onClick={() => setActiveTab("lineups")}
          className={`filter-chip ${activeTab === "lineups" ? "active" : ""}`}
        >
          Squad Lineups
        </button>
      </div>

      {/* Tab 1: TikTok LIVE Streaming Player */}
      {activeTab === "stream" && (
        <section className="card" style={{ padding: 20, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <strong style={{ fontSize: 15, display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent)" }} />
                TikTok LIVE Collegiate Broadcast
              </strong>
              <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>
                Official Caritas Football Association live video stream
              </div>
            </div>

            <a
              href={fixture.stream?.url || "https://www.tiktok.com/@caritas_football/live"}
              target="_blank"
              rel="noreferrer"
              className="primary-button"
              style={{ padding: "7px 14px", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}
            >
              Open in TikTok <ExternalLink size={13} />
            </a>
          </div>

          {/* Interactive Player Screen */}
          <div
            style={{
              position: "relative",
              aspectRatio: "16 / 9",
              borderRadius: 16,
              overflow: "hidden",
              background: "#080A07",
              border: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 20
            }}
          >
            {/* Top Stream Overlay */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(8px)",
                    color: "var(--accent)",
                    fontWeight: 700,
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 5
                  }}
                >
                  <Radio size={11} /> LIVE ON TIKTOK
                </span>
                <span
                  style={{
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    fontSize: 10,
                    padding: "4px 8px",
                    borderRadius: 6
                  }}
                >
                  👁️ 428 students watching
                </span>
              </div>

              <span
                style={{
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontSize: 11,
                  padding: "4px 10px",
                  borderRadius: 6
                }}
              >
                {fixture.home} {fixture.homeScore ?? 0} : {fixture.awayScore ?? 0} {fixture.away}
              </span>
            </div>

            {/* Stadium Ambience Visualizer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.4
              }}
            />

            {/* Center Live Simulation */}
            <div style={{ zIndex: 2, textAlign: "center", margin: "auto 0" }}>
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  color: "#11130F",
                  display: "grid",
                  placeItems: "center",
                  margin: "0 auto 12px",
                  boxShadow: "0 0 24px rgba(184, 255, 22, 0.4)"
                }}
              >
                <Play size={24} style={{ marginLeft: 3 }} />
              </div>
              <strong style={{ fontSize: 16, display: "block" }}>
                {fixture.home} vs {fixture.away}
              </strong>
              <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
                Caritas Main Stadium · Official CFA Stream
              </div>
            </div>

            {/* Bottom Stream Bar */}
            <div
              style={{
                zIndex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "rgba(0,0,0,0.6)",
                padding: "8px 12px",
                borderRadius: 10,
                backdropFilter: "blur(6px)"
              }}
            >
              <span style={{ fontSize: 11, color: "#C0C4B9" }}>
                Stream Provider: <strong style={{ color: "#fff" }}>TikTok LIVE (@caritas_football)</strong>
              </span>

              <a
                href={fixture.stream?.url || "https://www.tiktok.com/@caritas_football/live"}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}
              >
                Watch fullscreen in app <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Match Timeline Events */}
      {activeTab === "timeline" && (
        <section className="card card-pad" style={{ marginBottom: 24 }}>
          <h3 className="font-display" style={{ fontSize: 16, marginBottom: 16 }}>
            Match Events Timeline
          </h3>
          {!fixture.events || fixture.events.length === 0 ? (
            <div className="empty-state">No match events recorded yet for this fixture.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {fixture.events.map(ev => (
                <div
                  key={ev.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "10px 14px",
                    background: "var(--surface)",
                    borderRadius: 10,
                    border: "1px solid var(--line)"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      color: "var(--accent)",
                      fontSize: 14,
                      width: 32
                    }}
                  >
                    {ev.minute}&apos;
                  </span>

                  <span
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: ev.type === "goal" ? "var(--accent)" : "#292D24",
                      color: ev.type === "goal" ? "#11130F" : "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 12,
                      fontWeight: 700
                    }}
                  >
                    {ev.type === "goal" ? "⚽" : ev.type === "yellow_card" ? "🟨" : "🟥"}
                  </span>

                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 13 }}>{ev.playerName}</strong>
                    <span className="muted" style={{ fontSize: 11, display: "block" }}>
                      {ev.team === "home" ? fixture.home : fixture.away} · {ev.detail || ev.type.replace("_", " ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 3: Live Commentary */}
      {activeTab === "commentary" && (
        <section className="card card-pad" style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 className="font-display" style={{ fontSize: 16, margin: 0 }}>
              Live Text Commentary
            </h3>
            <span className="muted" style={{ fontSize: 11 }}>
              Official CFA Press Feed
            </span>
          </div>

          {!fixture.commentary || fixture.commentary.length === 0 ? (
            <div className="empty-state">No commentary entries yet.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {fixture.commentary.map(c => (
                <div
                  key={c.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--line)"
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      color: "var(--accent)",
                      fontSize: 13,
                      minWidth: 30
                    }}
                  >
                    {c.minute}&apos;
                  </span>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: "#DFE2D8" }}>{c.text}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab 4: Match Statistics */}
      {activeTab === "stats" && (
        <section className="card card-pad" style={{ marginBottom: 24 }}>
          <h3 className="font-display" style={{ fontSize: 16, marginBottom: 16 }}>
            Match Performance Statistics
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              ["Possession", "56%", "44%", 56],
              ["Total Shots", "12", "8", 60],
              ["Shots on Target", "6", "4", 60],
              ["Fouls", "9", "13", 41],
              ["Corner Kicks", "7", "3", 70],
              ["Yellow Cards", "1", "2", 33]
            ].map(([label, homeVal, awayVal, pct]) => (
              <div key={String(label)}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
                  <span style={{ fontWeight: 700 }}>{String(homeVal)}</span>
                  <span className="muted">{String(label)}</span>
                  <span style={{ fontWeight: 700 }}>{String(awayVal)}</span>
                </div>
                <div style={{ height: 6, background: "#292D24", borderRadius: 99, overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${pct}%`, background: "var(--accent)" }} />
                  <div style={{ flex: 1, background: "#475569" }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tab 5: Squad Lineups */}
      {activeTab === "lineups" && (
        <section className="grid-2" style={{ marginBottom: 24 }}>
          <div className="card card-pad">
            <div className="eyebrow" style={{ color: "var(--accent)" }}>
              {fixture.home}
            </div>
            <h4 style={{ margin: "6px 0 12px" }}>Starting XI Lineup</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {(fixture.homeLineup?.startingEleven || ["Modric (C)", "Nero", "Patoski", "Aisha", "Kritolite", "Miracle", "Ifeanyi", "Lawson", "Joseph", "Favourite", "Eto"]).map((p, idx) => (
                <div key={p} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: "1px solid var(--line)" }}>
                  <span>{p}</span>
                  <span className="muted">#{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card card-pad">
            <div className="eyebrow">{fixture.away}</div>
            <h4 style={{ margin: "6px 0 12px" }}>Starting XI Lineup</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {(fixture.awayLineup?.startingEleven || ["Paschal (C)", "Lawrence", "Egede", "Favour", "Denco", "Ike", "Joseph", "JC", "Dice", "Machala", "Otika"]).map((p, idx) => (
                <div key={p} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderBottom: "1px solid var(--line)" }}>
                  <span>{p}</span>
                  <span className="muted">#{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
