"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, ArrowRight, CheckCircle2, Clock, Filter, Flame, Plus, Search, Share2, ShieldCheck } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";
import { ShareModal } from "@/components/ui/share-modal";
import type { TransferType } from "@/domain/types";

export default function TransfersPage() {
  const { transfers, teams, submitTransfer } = useSportsApp();
  const [selectedTeam, setSelectedTeam] = useState<string>("All clubs");
  const [selectedType, setSelectedType] = useState<string>("All types");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [shareData, setShareData] = useState<{ title: string; text: string } | null>(null);

  // New transfer form state
  const [playerName, setPlayerName] = useState("");
  const [previousTeam, setPreviousTeam] = useState("Free Agent");
  const [newTeam, setNewTeam] = useState("IEA FC");
  const [transferType, setTransferType] = useState<TransferType>("permanent");
  const [notes, setNotes] = useState("");

  const filteredTransfers = useMemo(() => {
    return transfers.filter(t => {
      if (selectedTeam !== "All clubs" && t.newTeam !== selectedTeam && t.previousTeam !== selectedTeam) {
        return false;
      }
      if (selectedType === "Permanent" && t.transferType !== "permanent") return false;
      if (selectedType === "Free Agent" && t.transferType !== "free_agent") return false;
      if (selectedType === "Loan" && t.transferType !== "loan") return false;
      if (search.trim()) {
        const query = search.toLowerCase();
        return (
          t.athleteName.toLowerCase().includes(query) ||
          t.newTeam.toLowerCase().includes(query) ||
          t.previousTeam.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [transfers, selectedTeam, selectedType, search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    submitTransfer({
      athleteName: playerName.trim(),
      previousTeam,
      newTeam,
      transferType,
      season: "2026",
      sport: "Football",
      notes: notes.trim() || undefined
    });
    setPlayerName("");
    setNotes("");
    setModalOpen(false);
    alert("Transfer deal submitted for official CFA clearance!");
  };

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Flame size={13} /> CARITAS FOOTBALL LEAGUE · CFA
        </div>
        <h1>Transfer Centre</h1>
        <p>
          Official 2026 player movements and window activity across the eight Caritas Football League clubs.
        </p>
      </div>

      {/* Official Status Banner */}
      <div
        className="card"
        style={{
          padding: 20,
          background: "var(--surface)",
          borderColor: "rgba(239, 68, 68, 0.4)",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16
        }}
      >
        <div style={{ maxWidth: 680 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                background: "#DC2626",
                color: "#FFFFFF",
                fontSize: 10,
                fontWeight: 800,
                padding: "3px 8px",
                borderRadius: 4,
                letterSpacing: "0.5px"
              }}
            >
              WINDOW CLOSED
            </span>
            <span className="muted" style={{ fontSize: 12 }}>
              Official 2026 Football Rosters Locked
            </span>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 13, lineHeight: 1.6 }}>
            &ldquo;The 2026 Caritas Football League Transfer Window is strictly CLOSED. All 8 club rosters are sealed for the official championship. Students wishing to join sports teams may submit applications for trials.&rdquo;
          </p>
          <div className="muted" style={{ fontSize: 11, marginTop: 4 }}>
            Signed: CFA President Lukeeze Jesse & Asst President Dike Somtochukwu
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() =>
              setShareData({
                title: "CFA Transfer Centre",
                text: "📋 Verified 2026 Caritas Football League Transfer Records (Window Closed). Track all sealed moves across the 8 clubs on CSA platform:"
              })
            }
            className="secondary-button"
            style={{ padding: "8px 12px", fontSize: 12 }}
          >
            <Share2 size={14} /> Share
          </button>

          <Link
            href="/athletes"
            className="primary-button"
            style={{ whiteSpace: "nowrap", textDecoration: "none" }}
          >
            Apply for Sports Trials →
          </Link>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <div
          style={{
            flex: "1 1 240px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: "0 14px"
          }}
        >
          <Search size={16} className="muted" />
          <input
            type="text"
            placeholder="Search athlete or club..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: 40,
              background: "transparent",
              border: 0,
              outline: "none",
              color: "var(--text)",
              fontSize: 13
            }}
          />
        </div>

        <select
          value={selectedTeam}
          onChange={e => setSelectedTeam(e.target.value)}
          style={{
            height: 42,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: "0 14px",
            color: "var(--text)",
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          <option value="All clubs">All clubs ({transfers.length})</option>
          {teams.map(t => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={e => setSelectedType(e.target.value)}
          style={{
            height: 42,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: "0 14px",
            color: "var(--text)",
            fontSize: 13,
            cursor: "pointer"
          }}
        >
          <option value="All types">All transfer types</option>
          <option value="Permanent">Permanent</option>
          <option value="Free Agent">Free Agent</option>
          <option value="Loan">Loan</option>
        </select>
      </div>

      {/* Results Count */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span className="muted" style={{ fontSize: 12 }}>
          Showing {filteredTransfers.length} official transfer records
        </span>
        <span className="muted" style={{ fontSize: 12 }}>
          Caritas Football Association (CFA)
        </span>
      </div>

      {/* Transfers List */}
      <div className="card">
        {filteredTransfers.length === 0 ? (
          <div className="empty-state">No transfers match your current filter criteria.</div>
        ) : (
          filteredTransfers.map(tr => (
            <div
              key={tr.id}
              style={{
                padding: "16px 20px",
                display: "grid",
                gridTemplateColumns: "1.4fr 1.6fr auto",
                alignItems: "center",
                gap: 16,
                borderBottom: "1px solid var(--line)"
              }}
            >
              <div>
                <strong style={{ fontSize: 15, display: "block" }}>{tr.athleteName}</strong>
                <span className="muted" style={{ fontSize: 11, display: "block", marginTop: 2 }}>
                  {tr.transferType === "free_agent" ? "Free Agent Signing" : tr.transferType.toUpperCase()} · 2026 Season
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <span
                  style={{
                    background: "#292D24",
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#C0C4B9"
                  }}
                >
                  {tr.previousTeam}
                </span>

                <ArrowRight size={14} className="muted" />

                <span
                  style={{
                    background: "rgba(184, 255, 22, 0.12)",
                    color: "var(--accent)",
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    fontWeight: 700
                  }}
                >
                  {tr.newTeam}
                </span>
              </div>

              <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 10 }}>
                <div>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      color: tr.status === "approved" ? "var(--accent)" : "#FACC15"
                    }}
                  >
                    {tr.status === "approved" ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                    {tr.status === "approved" ? "Verified" : "Pending Review"}
                  </span>
                  <span className="muted" style={{ display: "block", fontSize: 10, marginTop: 2 }}>
                    {tr.date}
                  </span>
                </div>

                <button
                  onClick={() =>
                    setShareData({
                      title: `Transfer Deal: ${tr.athleteName}`,
                      text: `🚨 TRANSFER ANNOUNCEMENT: ${tr.athleteName} moves from ${tr.previousTeam} ➡️ ${tr.newTeam}! Verified by CFA.`
                    })
                  }
                  className="icon-button"
                  style={{ width: 28, height: 28 }}
                  title="Share Deal"
                >
                  <Share2 size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submit Transfer Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 60,
            display: "grid",
            placeItems: "center",
            padding: 20
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="card"
            style={{ width: "min(100%, 500px)", padding: 24 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="eyebrow">CFA TRANSFER REGISTRATION</div>
            <h2 className="font-display" style={{ fontSize: 22, margin: "8px 0 16px" }}>
              Submit Transfer Deal
            </h2>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>Athlete Full Name or Nickname</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Eze"
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  style={{
                    width: "100%",
                    height: 42,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: "0 12px",
                    color: "var(--text)"
                  }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>Previous Club</label>
                  <select
                    value={previousTeam}
                    onChange={e => setPreviousTeam(e.target.value)}
                    style={{
                      width: "100%",
                      height: 42,
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 10,
                      padding: "0 10px",
                      color: "var(--text)"
                    }}
                  >
                    <option value="Free Agent">Free Agent</option>
                    {teams.map(t => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>Destination Club</label>
                  <select
                    value={newTeam}
                    onChange={e => setNewTeam(e.target.value)}
                    style={{
                      width: "100%",
                      height: 42,
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 10,
                      padding: "0 10px",
                      color: "var(--text)"
                    }}
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>Transfer Agreement Type</label>
                <select
                  value={transferType}
                  onChange={e => setTransferType(e.target.value as TransferType)}
                  style={{
                    width: "100%",
                    height: 42,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: "0 10px",
                    color: "var(--text)"
                  }}
                >
                  <option value="permanent">Permanent Signing</option>
                  <option value="free_agent">Free Agent Signing</option>
                  <option value="loan">Loan Deal</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 12, marginBottom: 5 }}>Notes / Coach Reference (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Agreed via Coach DC / Medical clearance verified"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  style={{
                    width: "100%",
                    height: 42,
                    background: "var(--surface)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: "0 12px",
                    color: "var(--text)"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button type="submit" className="primary-button" style={{ flex: 1 }}>
                  Submit for CFA Approval
                </button>
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setModalOpen(false)}
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
