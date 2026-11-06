"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Search, Trophy, UserPlus, Users, X, Upload } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";

export default function AthletesPage() {
  const { athletes, sports, teams, applyForTrial } = useSportsApp();
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("All sports");
  const [selectedLevel, setSelectedLevel] = useState("All levels");
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Student Trial Form states
  const [fullName, setFullName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("100 Level");
  const [phoneWhatsApp, setPhoneWhatsApp] = useState("");
  const [sportSlug, setSportSlug] = useState("football");
  const [preferredTeam, setPreferredTeam] = useState("Open to Any Team");
  const [positionOrEvent, setPositionOrEvent] = useState("");
  const [experienceNotes, setExperienceNotes] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const filteredAthletes = useMemo(() => {
    return athletes.filter(a => {
      if (selectedSport !== "All sports" && !a.sports.some(s => s.sportSlug === selectedSport)) {
        return false;
      }
      if (selectedLevel !== "All levels" && a.level !== selectedLevel) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          (a.nickname && a.nickname.toLowerCase().includes(q)) ||
          a.department.toLowerCase().includes(q) ||
          a.sports.some(s => (s.teamName && s.teamName.toLowerCase().includes(q)) || (s.position && s.position.toLowerCase().includes(q)))
        );
      }
      return true;
    });
  }, [athletes, selectedSport, selectedLevel, search]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !matricNumber.trim() || !department.trim()) return;

    const chosenSport = sports.find(s => s.slug === sportSlug);
    const chosenTeam = teams.find(t => t.name === preferredTeam);

    applyForTrial({
      fullName: fullName.trim(),
      matricNumber: matricNumber.trim().toUpperCase(),
      department: department.trim(),
      level,
      phoneWhatsApp: phoneWhatsApp.trim() || "+234",
      sportSlug,
      sportName: chosenSport?.name || "Football",
      preferredTeamId: chosenTeam?.id,
      preferredTeamName: preferredTeam === "Open to Any Team" ? "Open to Any Team" : preferredTeam,
      positionOrEvent: positionOrEvent.trim() || "Versatile / All-round",
      experienceNotes: experienceNotes.trim(),
      photoUrl: photoPreview || undefined
    });

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setApplyModalOpen(false);
      setFullName("");
      setMatricNumber("");
      setDepartment("");
      setPhoneWhatsApp("");
      setPositionOrEvent("");
      setExperienceNotes("");
      setPhotoPreview(null);
    }, 2800);
  };

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow">ATHLETE DIRECTORY · ROSTERS & PROFILES</div>
        <h1>Athletes & Players</h1>
        <p>
          Discover registered student-athletes competing across collegiate sports for Caritas Sports Association.
        </p>
      </div>

      {/* Control bar */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 20 }}>
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
            placeholder="Search by name, nickname, department, team..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: 42,
              background: "transparent",
              border: 0,
              outline: "none",
              color: "var(--text)",
              fontSize: 13
            }}
          />
        </div>

        <select
          value={selectedSport}
          onChange={e => setSelectedSport(e.target.value)}
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
          <option value="All sports">All sports</option>
          {sports.map(s => (
            <option key={s.id} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={selectedLevel}
          onChange={e => setSelectedLevel(e.target.value)}
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
          <option value="All levels">All study levels</option>
          <option value="100 Level">100 Level</option>
          <option value="200 Level">200 Level</option>
          <option value="300 Level">300 Level</option>
          <option value="400 Level">400 Level</option>
          <option value="Postgraduate">Postgraduate</option>
        </select>

        {/* Public Application Button for Students */}
        <button
          onClick={() => setApplyModalOpen(true)}
          className="primary-button"
          style={{ whiteSpace: "nowrap" }}
        >
          <UserPlus size={15} /> Apply to Join a Sport / Team
        </button>
      </div>

      {/* Grid of athletes */}
      <div className="grid-3">
        {filteredAthletes.map(ath => (
          <Link
            href={`/athletes/${ath.slug}`}
            key={ath.id}
            className="card"
            style={{ textDecoration: "none", overflow: "hidden", display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                height: 180,
                backgroundImage: `url(${ath.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                position: "relative"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                  background: "rgba(17,19,15,0.88)",
                  backdropFilter: "blur(6px)",
                  padding: "4px 8px",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  color: "var(--accent)"
                }}
              >
                {ath.sports[0]?.teamName || ath.sports[0]?.sportName || "Athletics"}
              </div>

              {ath.level && (
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(17,19,15,0.88)",
                    backdropFilter: "blur(6px)",
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--muted)"
                  }}
                >
                  {ath.level}
                </div>
              )}
            </div>

            <div style={{ padding: 16, display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                <div>
                  <h3 className="font-display" style={{ fontSize: 16, margin: 0 }}>
                    {ath.name}
                  </h3>
                  {ath.nickname && (
                    <div style={{ fontSize: 12, color: "var(--accent)", fontStyle: "italic", marginTop: 2 }}>
                      &ldquo;{ath.nickname}&rdquo;
                    </div>
                  )}
                </div>
                <ArrowUpRight size={16} className="muted" />
              </div>

              <div className="muted" style={{ fontSize: 12, marginTop: 8 }}>
                {ath.department}
              </div>

              {/* Positions / Sports */}
              <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {ath.sports.map((s, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 6,
                      fontSize: 11,
                      padding: "3px 8px",
                      color: "var(--text)"
                    }}
                  >
                    {s.sportName} · {s.position || "Player"}
                  </span>
                ))}
              </div>

              {/* Stat callout if football */}
              {ath.sports[0]?.goals !== undefined && ath.sports[0]?.goals > 0 && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <Trophy size={12} /> {ath.sports[0].goals} Goals Scored in 2026 Season
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredAthletes.length === 0 && (
        <div className="card" style={{ padding: 40, textAlign: "center", marginTop: 20 }}>
          <Users size={32} className="muted" style={{ margin: "0 auto 12px" }} />
          <h3>No athletes found</h3>
          <p className="muted" style={{ fontSize: 13, maxWidth: 400, margin: "6px auto 0" }}>
            No athlete matches your search filter. Try clearing your query or select a different sport.
          </p>
        </div>
      )}

      {/* Student Sports Trial Application Modal */}
      {applyModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: 16
          }}
          onClick={() => setApplyModalOpen(false)}
        >
          <div
            className="card"
            style={{ width: "min(100%, 540px)", padding: 24, position: "relative", maxHeight: "90vh", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setApplyModalOpen(false)}
              className="icon-button"
              style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30 }}
            >
              <X size={15} />
            </button>

            {submittedSuccess ? (
              <div style={{ textAlign: "center", padding: "30px 10px" }}>
                <CheckCircle2 size={48} style={{ color: "var(--accent)", margin: "0 auto 16px" }} />
                <h3 className="font-display" style={{ fontSize: 22, marginBottom: 8 }}>
                  Trial Application Received!
                </h3>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 400, margin: "0 auto" }}>
                  Thank you, <strong>{fullName}</strong>. Your application has been logged with the Caritas Sports Association Technical Committee. Coaches will contact you via WhatsApp for training and trial schedules.
                </p>
              </div>
            ) : (
              <>
                <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)" }}>
                  <UserPlus size={13} /> STUDENT ATHLETE RECRUITMENT & TRIALS
                </div>
                <h3 className="font-display" style={{ fontSize: 20, margin: "6px 0 6px" }}>
                  Apply to Join a Sport / Team
                </h3>
                <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 18 }}>
                  Open to all registered Caritas University students seeking trials, coaching, or team placement across collegiate sports.
                </p>

                <form onSubmit={handleApplySubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chukwuma Daniel"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Matric / Reg No. *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CU/2026/CS/0841"
                        value={matricNumber}
                        onChange={e => setMatricNumber(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Academic Department *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Computer Science"
                        value={department}
                        onChange={e => setDepartment(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Study Level *
                      </label>
                      <select
                        value={level}
                        onChange={e => setLevel(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      >
                        <option value="100 Level">100 Level (Freshman)</option>
                        <option value="200 Level">200 Level</option>
                        <option value="300 Level">300 Level</option>
                        <option value="400 Level">400 Level</option>
                        <option value="Postgraduate">Postgraduate</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Sport You Want to Join *
                      </label>
                      <select
                        value={sportSlug}
                        onChange={e => setSportSlug(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      >
                        {sports.map(s => (
                          <option key={s.id} value={s.slug}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Preferred Team (Optional)
                      </label>
                      <select
                        value={preferredTeam}
                        onChange={e => setPreferredTeam(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      >
                        <option value="Open to Any Team">Open to Any Team</option>
                        {teams.map(t => (
                          <option key={t.id} value={t.name}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Position / Event Category
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Winger, Point Guard, 100m"
                        value={positionOrEvent}
                        onChange={e => setPositionOrEvent(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        WhatsApp / Phone *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+234 812 000 0000"
                        value={phoneWhatsApp}
                        onChange={e => setPhoneWhatsApp(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                      Playing Background & Experience (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="High school team, street soccer, previous academy or tournaments played..."
                      value={experienceNotes}
                      onChange={e => setExperienceNotes(e.target.value)}
                      style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "8px 10px", color: "var(--text)", fontSize: 12 }}
                    />
                  </div>

                  {/* Profile Photo Upload */}
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                      Student Athlete Photo (Optional)
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <label
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          background: "var(--surface)",
                          border: "1px dashed var(--line)",
                          borderRadius: 8,
                          padding: "8px 14px",
                          cursor: "pointer",
                          fontSize: 12
                        }}
                      >
                        <Upload size={14} /> Upload from Phone / PC
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handlePhotoUpload}
                        />
                      </label>
                      {photoPreview && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <img
                            src={photoPreview}
                            alt="preview"
                            style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid var(--accent)" }}
                          />
                          <span style={{ fontSize: 11, color: "var(--accent)" }}>Photo attached</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                    <button type="submit" className="primary-button" style={{ flex: 1 }}>
                      Submit Trial Application
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => setApplyModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </PublicShell>
  );
}
