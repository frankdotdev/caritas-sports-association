"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Clock,
  Coins,
  Flame,
  Gift,
  HelpCircle,
  Plus,
  Radio,
  Share2,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { ShareModal } from "@/components/ui/share-modal";
import { TeamLogo } from "@/components/ui/team-logo";

export default function PredictionsPage() {
  const {
    fixtures,
    fanTokens,
    userBets,
    leaderboard,
    sponsorPledges,
    placePredictionBet,
    addSponsorPledge
  } = useSportsApp();

  const [selectedSport, setSelectedSport] = useState("all");
  const [selectedFixtureId, setSelectedFixtureId] = useState<string>(fixtures[4]?.id || fixtures[0]?.id);
  const [activeMarket, setActiveMarket] = useState<"result" | "scorer" | "score" | "totals">("result");
  const [stakeAmount, setStakeAmount] = useState<number>(100);
  const [betSuccessMessage, setBetSuccessMessage] = useState<string | null>(null);
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);
  const [shareData, setShareData] = useState<{ title: string; text: string } | null>(null);

  // Sponsor Form State
  const [sponsorName, setSponsorName] = useState("");
  const [sponsorTitle, setSponsorTitle] = useState("");
  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardDesc, setRewardDesc] = useState("");
  const [targetWeek, setTargetWeek] = useState("Week 1");

  const selectedFixture = useMemo(() => {
    return fixtures.find(f => f.id === selectedFixtureId) || fixtures[0];
  }, [fixtures, selectedFixtureId]);

  // Check if Lineup has been uploaded for goalscorer market
  const hasLineup = Boolean(
    (selectedFixture.homeLineup?.startingEleven && selectedFixture.homeLineup.startingEleven.length > 0) ||
    (selectedFixture.awayLineup?.startingEleven && selectedFixture.awayLineup.startingEleven.length > 0)
  );

  const availableGoalscorers = useMemo(() => {
    if (!hasLineup) return [];
    const homePlayers = (selectedFixture.homeLineup?.startingEleven || []).map(p => ({
      name: p,
      team: selectedFixture.home,
      odds: 2.25
    }));
    const awayPlayers = (selectedFixture.awayLineup?.startingEleven || []).map(p => ({
      name: p,
      team: selectedFixture.away,
      odds: 2.45
    }));
    return [...homePlayers.slice(0, 5), ...awayPlayers.slice(0, 5)];
  }, [selectedFixture, hasLineup]);

  const handlePlaceBet = (selection: string, odds: number, marketType: "match_result" | "over_under" | "correct_score" | "player_to_score") => {
    const success = placePredictionBet({
      fixtureId: selectedFixture.id,
      fixtureTitle: `${selectedFixture.home} vs ${selectedFixture.away}`,
      marketType,
      selection,
      odds,
      stakedPoints: stakeAmount,
      potentialPoints: Math.round(stakeAmount * odds)
    });

    if (success) {
      setBetSuccessMessage(`Prediction locked! Staked ${stakeAmount} Fan Coins on "${selection}" @ ${odds.toFixed(2)}x`);
      setTimeout(() => setBetSuccessMessage(null), 4000);
    }
  };

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorName.trim() || !rewardTitle.trim()) return;
    addSponsorPledge({
      sponsorName: sponsorName.trim(),
      sponsorTitle: sponsorTitle.trim() || "Campus Supporter",
      rewardTitle: rewardTitle.trim(),
      rewardDescription: rewardDesc.trim() || "Awarded to top performers on the predictor leaderboard.",
      targetWeek
    });
    setSponsorName("");
    setRewardTitle("");
    setRewardDesc("");
    setSponsorModalOpen(false);
    alert("Thank you! Your sponsor reward pledge has been posted on the Leaderboard.");
  };

  return (
    <PublicShell>
      {/* Intro Header */}
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Target size={13} /> CARITAS FAN PREDICTOR · PURE FUN & GLORY
        </div>
        <h1>Fan Predictions & Betting</h1>
        <p>
          Predict match outcomes, goalscorers, and scores across collegiate sports for free. Win Fan Coins, climb the campus Leaderboard, and win sponsored airtime and alumni prizes!
        </p>
      </div>

      {/* Fan Wallet & Sponsored Prizes Banner */}
      <div
        className="card"
        style={{
          padding: 24,
          background: "linear-gradient(135deg, #1D2019 0%, #262B1F 100%)",
          border: "1px solid rgba(184, 255, 22, 0.35)",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 20
        }}
      >
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
              100% FREE · NO MONEY INVOLVED
            </span>
            <span className="muted" style={{ fontSize: 11 }}>
              Official Student Fan Zone
            </span>
          </div>

          <h2 className="font-display" style={{ fontSize: 24, margin: "6px 0 6px" }}>
            Your Prediction Balance: <span style={{ color: "var(--accent)" }}>{fanTokens.toLocaleString()} Fan Coins</span>
          </h2>
          <p className="muted" style={{ fontSize: 12, margin: 0, maxWidth: 520, lineHeight: 1.5 }}>
            Every Caritas student receives free Fan Coins. Place predictions on scheduled matches. Correct predictions earn points that qualify you for weekly sponsor airtime rewards!
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() => setSponsorModalOpen(true)}
            className="secondary-button"
            style={{ padding: "8px 14px", fontSize: 12, borderColor: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Gift size={14} style={{ color: "var(--accent)" }} />
            <span>Sponsor a Reward</span>
          </button>

          <button
            onClick={() =>
              setShareData({
                title: "Caritas Fan Predictions",
                text: `🔥 I'm competing on the Caritas Football League Fan Predictor with ${fanTokens} Fan Coins! Predict match results and win sponsored alumni prizes!`
              })
            }
            className="primary-button"
            style={{ padding: "8px 14px", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Share2 size={14} />
            <span>Share Predictor</span>
          </button>
        </div>
      </div>

      {/* Bet Success Toast */}
      {betSuccessMessage && (
        <div
          className="card card-pad"
          style={{
            background: "rgba(184, 255, 22, 0.15)",
            borderColor: "var(--accent)",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--accent)",
            fontWeight: 700,
            fontSize: 13
          }}
        >
          <CheckCircle2 size={18} />
          <span>{betSuccessMessage}</span>
        </div>
      )}

      {/* Main Grid: Match Selector & Betting Markets (2/3) + Leaderboard & Pledges (1/3) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24, alignItems: "start" }}>
        {/* Left Column: Match & Betting Markets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Fixture Selector Dropdown */}
          <div className="card card-pad">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <CalendarDays size={12} /> SELECT FIXTURE TO PREDICT
              </span>
              <span className="muted" style={{ fontSize: 11 }}>
                Stake: {stakeAmount} coins
              </span>
            </div>

            <select
              value={selectedFixtureId}
              onChange={e => setSelectedFixtureId(e.target.value)}
              style={{
                width: "100%",
                height: 44,
                background: "#11130F",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "0 14px",
                color: "var(--text)",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              {fixtures.map(f => (
                <option key={f.id} value={f.id}>
                  {f.round} · {f.home} vs {f.away} ({formatDate(f.date)})
                </option>
              ))}
            </select>

            {/* Selected Fixture Banner */}
            <div
              style={{
                marginTop: 16,
                padding: 16,
                background: "#161912",
                borderRadius: 12,
                border: "1px solid var(--line)",
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "center",
                gap: 12,
                textAlign: "center"
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TeamLogo name={selectedFixture.home} size={42} />
                <strong style={{ fontSize: 14, display: "block", marginTop: 6 }}>{selectedFixture.home}</strong>
                <span className="muted" style={{ fontSize: 10 }}>Home</span>
              </div>
              <div>
                <span className="status status-upcoming">{selectedFixture.round}</span>
                <div className="muted" style={{ fontSize: 10, marginTop: 4 }}>
                  {formatDate(selectedFixture.date)} · {selectedFixture.venue || "Caritas Stadium"}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <TeamLogo name={selectedFixture.away} size={42} />
                <strong style={{ fontSize: 14, display: "block", marginTop: 6 }}>{selectedFixture.away}</strong>
                <span className="muted" style={{ fontSize: 10 }}>Away</span>
              </div>
            </div>

            {/* Stake selector slider/buttons */}
            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span className="muted" style={{ fontSize: 12 }}>Quick Stake:</span>
              {[50, 100, 200, 500].map(amt => (
                <button
                  key={amt}
                  onClick={() => setStakeAmount(amt)}
                  className={`filter-chip ${stakeAmount === amt ? "active" : ""}`}
                  style={{ padding: "4px 10px", fontSize: 11 }}
                >
                  {amt} Coins
                </button>
              ))}
            </div>
          </div>

          {/* Market Tabs */}
          <div className="filter-row" style={{ margin: 0 }}>
            <button
              onClick={() => setActiveMarket("result")}
              className={`filter-chip ${activeMarket === "result" ? "active" : ""}`}
            >
              Match Result (1X2)
            </button>
            <button
              onClick={() => setActiveMarket("scorer")}
              className={`filter-chip ${activeMarket === "scorer" ? "active" : ""}`}
            >
              Player to Score {hasLineup ? "🔥" : "🔒"}
            </button>
            <button
              onClick={() => setActiveMarket("score")}
              className={`filter-chip ${activeMarket === "score" ? "active" : ""}`}
            >
              Correct Score
            </button>
            <button
              onClick={() => setActiveMarket("totals")}
              className={`filter-chip ${activeMarket === "totals" ? "active" : ""}`}
            >
              Over / Under 2.5
            </button>
          </div>

          {/* Market 1: Match Result (1X2) */}
          {activeMarket === "result" && (
            <div className="card card-pad">
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                MATCH RESULT MARKET (1X2)
              </div>
              <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                Predict the full-time winner or draw. Staked coins are multiplied by decimal odds.
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                <button
                  onClick={() => handlePlaceBet(`${selectedFixture.home} Win`, 1.85, "match_result")}
                  className="card card-pad"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    background: "var(--surface)",
                    borderColor: "var(--line)",
                    color: "var(--text)"
                  }}
                >
                  <span className="muted" style={{ fontSize: 11, display: "block" }}>1 (Home Win)</span>
                  <strong style={{ fontSize: 14, display: "block", margin: "4px 0" }}>{selectedFixture.home}</strong>
                  <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 15 }}>1.85x</span>
                </button>

                <button
                  onClick={() => handlePlaceBet("Match Draw", 3.25, "match_result")}
                  className="card card-pad"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    background: "var(--surface)",
                    borderColor: "var(--line)",
                    color: "var(--text)"
                  }}
                >
                  <span className="muted" style={{ fontSize: 11, display: "block" }}>X (Draw)</span>
                  <strong style={{ fontSize: 14, display: "block", margin: "4px 0" }}>Draw</strong>
                  <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 15 }}>3.25x</span>
                </button>

                <button
                  onClick={() => handlePlaceBet(`${selectedFixture.away} Win`, 3.90, "match_result")}
                  className="card card-pad"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    background: "var(--surface)",
                    borderColor: "var(--line)",
                    color: "var(--text)"
                  }}
                >
                  <span className="muted" style={{ fontSize: 11, display: "block" }}>2 (Away Win)</span>
                  <strong style={{ fontSize: 14, display: "block", margin: "4px 0" }}>{selectedFixture.away}</strong>
                  <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 15 }}>3.90x</span>
                </button>
              </div>
            </div>
          )}

          {/* Market 2: Player to Score (Dynamic Lineup Dependent) */}
          {activeMarket === "scorer" && (
            <div className="card card-pad">
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                ANYTIME GOALSCORER / POINT SCORER
              </div>

              {!hasLineup ? (
                <div
                  style={{
                    padding: 24,
                    background: "#161912",
                    borderRadius: 12,
                    border: "1px dashed rgba(255,255,255,0.2)",
                    textAlign: "center"
                  }}
                >
                  <HelpCircle size={28} style={{ color: "var(--muted)", margin: "0 auto 10px" }} />
                  <strong style={{ fontSize: 14, display: "block" }}>
                    Starting XI Lineup Not Yet Confirmed
                  </strong>
                  <p className="muted" style={{ fontSize: 12, maxWidth: 440, margin: "6px auto 0", lineHeight: 1.5 }}>
                    As specified by association regulations, the Goalscorer market is unlocked as soon as team coaches submit their official Starting XI lineup for this match.
                  </p>
                  <span className="status status-upcoming" style={{ marginTop: 12 }}>
                    Awaiting Coach Submission
                  </span>
                </div>
              ) : (
                <div>
                  <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                    Official Starting XI lineups confirmed! Select any eligible starting player to score during the match:
                  </p>
                  <div className="grid-2">
                    {availableGoalscorers.map(p => (
                      <button
                        key={p.name}
                        onClick={() => handlePlaceBet(`${p.name} to score`, p.odds, "player_to_score")}
                        className="card card-pad"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                          background: "var(--surface)",
                          borderColor: "var(--line)",
                          color: "var(--text)"
                        }}
                      >
                        <div style={{ textAlign: "left" }}>
                          <strong style={{ fontSize: 13, display: "block" }}>{p.name}</strong>
                          <span className="muted" style={{ fontSize: 11 }}>{p.team}</span>
                        </div>
                        <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 14 }}>
                          {p.odds}x
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Market 3: Correct Score */}
          {activeMarket === "score" && (
            <div className="card card-pad">
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                CORRECT FULL-TIME SCORE
              </div>
              <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                Predict the exact final scoreline. High odds yield massive fan token rewards.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  ["1 - 0", 6.5],
                  ["2 - 0", 7.0],
                  ["2 - 1", 7.5],
                  ["1 - 1", 5.5],
                  ["0 - 0", 8.5],
                  ["2 - 2", 11.0],
                  ["0 - 1", 6.8],
                  ["1 - 2", 8.0],
                  ["0 - 2", 9.5]
                ].map(([score, odds]) => (
                  <button
                    key={String(score)}
                    onClick={() => handlePlaceBet(`Score: ${score}`, Number(odds), "correct_score")}
                    className="card card-pad"
                    style={{
                      textAlign: "center",
                      cursor: "pointer",
                      background: "var(--surface)",
                      borderColor: "var(--line)",
                      color: "var(--text)"
                    }}
                  >
                    <strong style={{ fontSize: 15, display: "block" }}>{score}</strong>
                    <span style={{ color: "var(--accent)", fontWeight: 700, fontSize: 13 }}>{odds}x</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Market 4: Over / Under 2.5 Goals */}
          {activeMarket === "totals" && (
            <div className="card card-pad">
              <div className="eyebrow" style={{ marginBottom: 8 }}>
                TOTAL MATCH GOALS (OVER / UNDER 2.5)
              </div>
              <p className="muted" style={{ fontSize: 12, marginBottom: 14 }}>
                Predict if the combined goals scored by both teams will be over or under 2.5.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <button
                  onClick={() => handlePlaceBet("Over 2.5 Goals", 1.95, "over_under")}
                  className="card card-pad"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    background: "var(--surface)",
                    borderColor: "var(--line)",
                    color: "var(--text)"
                  }}
                >
                  <strong style={{ fontSize: 15, display: "block" }}>Over 2.5 Goals</strong>
                  <span className="muted" style={{ fontSize: 11 }}>3 or more total goals</span>
                  <div style={{ color: "var(--accent)", fontWeight: 800, fontSize: 16, marginTop: 4 }}>1.95x</div>
                </button>

                <button
                  onClick={() => handlePlaceBet("Under 2.5 Goals", 1.80, "over_under")}
                  className="card card-pad"
                  style={{
                    textAlign: "center",
                    cursor: "pointer",
                    background: "var(--surface)",
                    borderColor: "var(--line)",
                    color: "var(--text)"
                  }}
                >
                  <strong style={{ fontSize: 15, display: "block" }}>Under 2.5 Goals</strong>
                  <span className="muted" style={{ fontSize: 11 }}>0, 1 or 2 total goals</span>
                  <div style={{ color: "var(--accent)", fontWeight: 800, fontSize: 16, marginTop: 4 }}>1.80x</div>
                </button>
              </div>
            </div>
          )}

          {/* User's Active Prediction Bets */}
          {userBets.length > 0 && (
            <div className="card card-pad">
              <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <Coins size={13} /> YOUR ACTIVE PREDICTION SLIPS ({userBets.length})
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {userBets.map(b => (
                  <div
                    key={b.id}
                    style={{
                      padding: "10px 14px",
                      background: "var(--surface)",
                      borderRadius: 10,
                      border: "1px solid var(--line)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: 13 }}>{b.selection}</strong>
                      <div className="muted" style={{ fontSize: 11 }}>
                        {b.fixtureTitle} · Staked: {b.stakedPoints} coins
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ color: "var(--accent)", fontWeight: 800, fontSize: 13 }}>
                        +{b.potentialPoints} coins
                      </span>
                      <span className="status status-upcoming" style={{ display: "block", fontSize: 9, marginTop: 2 }}>
                        {b.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Leaderboard & Sponsored Rewards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Sponsored Weekly Prizes Box */}
          <div
            className="card card-pad"
            style={{
              background: "linear-gradient(180deg, #1D2019 0%, #151812 100%)",
              borderColor: "rgba(184, 255, 22, 0.3)"
            }}
          >
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", marginBottom: 6 }}>
              <Gift size={13} /> SPONSORED MATCHDAY REWARDS
            </div>
            <h3 className="font-display" style={{ fontSize: 17, margin: "0 0 10px" }}>
              Active Campus Sponsor Pledges
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {sponsorPledges.map(sp => (
                <div
                  key={sp.id}
                  style={{
                    background: "#161912",
                    padding: 12,
                    borderRadius: 10,
                    border: "1px solid var(--line)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                    <strong style={{ color: "var(--accent)" }}>{sp.sponsorName}</strong>
                    <span className="muted">{sp.targetWeek}</span>
                  </div>
                  <strong style={{ fontSize: 13, display: "block" }}>{sp.rewardTitle}</strong>
                  <p className="muted" style={{ fontSize: 11, margin: "4px 0 0", lineHeight: 1.4 }}>
                    {sp.rewardDescription}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSponsorModalOpen(true)}
              className="secondary-button"
              style={{ width: "100%", marginTop: 14, fontSize: 12, padding: "8px 0" }}
            >
              <Plus size={14} /> Pledge a Reward as an Alumnus / Patron
            </button>
          </div>

          {/* Student Predictors Leaderboard */}
          <div className="card card-pad">
            <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <Trophy size={13} /> CAMPUS PREDICTOR LEADERBOARD
            </div>
            <h3 className="font-display" style={{ fontSize: 17, margin: "0 0 12px" }}>
              Top Student Forecasters
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {leaderboard.map(u => (
                <div
                  key={u.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "8px 12px",
                    background: u.rank === 1 ? "rgba(184, 255, 22, 0.08)" : "var(--surface)",
                    borderRadius: 10,
                    border: "1px solid var(--line)"
                  }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: u.rank === 1 ? "var(--accent)" : "#292D24",
                      color: u.rank === 1 ? "#11130F" : "#fff",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 800,
                      fontSize: 11
                    }}
                  >
                    #{u.rank}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <strong style={{ fontSize: 13, display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                      {u.name} {u.nickname ? `("${u.nickname}")` : ""}
                    </strong>
                    <span className="muted" style={{ fontSize: 10, display: "block" }}>
                      {u.department} · {u.level}
                    </span>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <strong style={{ fontSize: 13, color: "var(--accent)", display: "block" }}>
                      {u.pointsWon.toLocaleString()} pts
                    </strong>
                    <span className="muted" style={{ fontSize: 10 }}>{u.accuracyRate}% acc</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sponsor Modal */}
      {sponsorModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 80,
            display: "grid",
            placeItems: "center",
            padding: 20
          }}
          onClick={() => setSponsorModalOpen(false)}
        >
          <div
            className="card"
            style={{ width: "min(100%, 500px)", padding: 24 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="eyebrow">COMMUNITY ENGAGEMENT</div>
            <h2 className="font-display" style={{ fontSize: 20, margin: "6px 0 14px" }}>
              Pledge a Matchday Sponsor Prize
            </h2>

            <form onSubmit={handleAddSponsor} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Your Name / Business / Alumni Chapter</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engr. Obinna Okafor (Class of 2018)"
                  value={sponsorName}
                  onChange={e => setSponsorName(e.target.value)}
                  style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Sponsor Designation / Title</label>
                <input
                  type="text"
                  placeholder="e.g. Alumni Football Patron"
                  value={sponsorTitle}
                  onChange={e => setSponsorTitle(e.target.value)}
                  style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Reward Item / Prize Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ₦10,000 Airtime / Data Bundle"
                  value={rewardTitle}
                  onChange={e => setRewardTitle(e.target.value)}
                  style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Description & How to Claim</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Awarded to the student with the most accurate scoreline on Friday's match."
                  value={rewardDesc}
                  onChange={e => setRewardDesc(e.target.value)}
                  style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "10px", color: "var(--text)", fontSize: 12 }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button type="submit" className="primary-button" style={{ flex: 1 }}>
                  Submit Sponsor Pledge
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setSponsorModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
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
