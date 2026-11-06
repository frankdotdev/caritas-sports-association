"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  Flame,
  GraduationCap,
  Instagram,
  Megaphone,
  Newspaper,
  PenTool,
  Plus,
  Share2
} from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";
import { formatDate } from "@/lib/utils";
import { ShareModal } from "@/components/ui/share-modal";

export default function NewsPage() {
  const { announcements, newsArticles, applyForJournalist } = useSportsApp();
  const [activeFilter, setActiveFilter] = useState("all");
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [shareData, setShareData] = useState<{ title: string; text: string } | null>(null);

  // Journalist Application Form State
  const [fullName, setFullName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("200 Level");
  const [phoneWhatsApp, setPhoneWhatsApp] = useState("");
  const [preferredSport, setPreferredSport] = useState("Football");
  const [sampleArticle, setSampleArticle] = useState("");
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !sampleArticle.trim()) return;

    applyForJournalist({
      fullName: fullName.trim(),
      matricNumber: matricNumber.trim() || "Pending verification",
      department: department.trim() || "General Studies",
      level,
      phoneWhatsApp: phoneWhatsApp.trim(),
      preferredSport,
      sampleArticle: sampleArticle.trim()
    });

    setAppliedSuccess(true);
    setTimeout(() => {
      setAppliedSuccess(false);
      setApplicationModalOpen(false);
      setFullName("");
      setSampleArticle("");
    }, 2800);
  };

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Megaphone size={13} /> OFFICIAL COMMUNICATIONS
        </div>
        <h1>News & Press Directorate</h1>
        <p>
          Official communiqués, competition reports, transfer bulletins and student journalism covering Caritas Sports Association and CFA.
        </p>
      </div>

      {/* Action & Filter Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div className="filter-row" style={{ margin: 0 }}>
          {["all", "official", "transfers", "competition", "instagram"].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`filter-chip ${activeFilter === f ? "active" : ""}`}
              style={{ textTransform: "capitalize" }}
            >
              {f === "all" ? "All Updates" : f}
            </button>
          ))}
        </div>

        {/* Apply as Sports Journalist CTA */}
        <button
          onClick={() => setApplicationModalOpen(true)}
          className="primary-button"
          style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
        >
          <PenTool size={14} /> Apply as Sports Journalist
        </button>
      </div>

      {/* Featured Instagram Announcement Callout */}
      <div
        className="card"
        style={{
          padding: 24,
          background: "linear-gradient(135deg, #1D2019 0%, #292D24 100%)",
          borderColor: "rgba(184, 255, 22, 0.3)",
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16
        }}
      >
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ background: "#E1306C", color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 4 }}>
              INSTAGRAM LAUNCH
            </span>
            <span className="muted" style={{ fontSize: 12 }}>@caritas_football</span>
          </div>
          <h2 className="font-display" style={{ fontSize: 22, margin: "8px 0 6px" }}>
            Official Caritas Football Association Instagram Page
          </h2>
          <p className="muted" style={{ fontSize: 13, margin: 0, lineHeight: 1.5 }}>
            Follow the newly launched official page for matchday reels, live score updates, awards, photo drops and student reactions.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button
            onClick={() =>
              setShareData({
                title: "CFA Instagram Page Launch",
                text: "📲 Follow the official Caritas Football Association Instagram page for match updates, pictures and highlights: https://www.instagram.com/caritas_football"
              })
            }
            className="secondary-button"
            style={{ padding: "8px 12px", fontSize: 12 }}
          >
            <Share2 size={14} />
          </button>

          <a
            href="https://www.instagram.com/caritas_football?stkn=MWgyMnd4cXNpdHptNw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noreferrer"
            className="primary-button"
            style={{ display: "inline-flex", alignItems: "center", gap: 7 }}
          >
            <Instagram size={15} /> Open @caritas_football <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {/* Announcements List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
        {announcements
          .filter(a => activeFilter === "all" || a.category === activeFilter)
          .map(ann => (
            <div key={ann.id} className="card card-pad">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <span className="eyebrow">{ann.category}</span>
                  <h2 className="font-display" style={{ fontSize: 20, margin: "6px 0 8px" }}>
                    {ann.title}
                  </h2>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="muted" style={{ fontSize: 12 }}>
                    {formatDate(ann.publishedAt)}
                  </span>
                  <button
                    onClick={() =>
                      setShareData({
                        title: ann.title,
                        text: `📢 *${ann.title}*\n\n${ann.body.slice(0, 200)}...`
                      })
                    }
                    className="icon-button"
                    style={{ width: 28, height: 28 }}
                    title="Share Announcement"
                  >
                    <Share2 size={13} />
                  </button>
                </div>
              </div>

              <div
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  color: "#DFE2D8",
                  whiteSpace: "pre-line",
                  background: "#161912",
                  padding: 18,
                  borderRadius: 12,
                  margin: "12px 0",
                  border: "1px solid var(--line)"
                }}
              >
                {ann.body}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "var(--muted)", flexWrap: "wrap", gap: 8 }}>
                <span>
                  Issued by: <strong style={{ color: "var(--accent)" }}>{ann.author}</strong> ({ann.authorRole})
                </span>
                {ann.externalLink && (
                  <a
                    href={ann.externalLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link"
                    style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
                  >
                    {ann.externalLink.label} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* News Articles Section */}
      <div className="section-heading">
        <div>
          <h2>Match reports and verified journalism</h2>
          <p>Articles published by accredited student sports correspondents.</p>
        </div>
      </div>

      <div className="grid-3">
        {newsArticles.map(article => (
          <div key={article.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                height: 180,
                backgroundImage: `url(${article.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
            <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginBottom: 6 }}>
                  <span>{article.sport}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span>{article.readTime}</span>
                    <button
                      onClick={() =>
                        setShareData({
                          title: article.title,
                          text: `📰 *${article.title}*\n\n${article.summary}`
                        })
                      }
                      className="icon-button"
                      style={{ width: 24, height: 24 }}
                      title="Share Article"
                    >
                      <Share2 size={12} />
                    </button>
                  </div>
                </div>

                <strong style={{ fontSize: 15, display: "block", lineHeight: 1.3 }}>
                  {article.title}
                </strong>
                <p className="muted" style={{ fontSize: 12, margin: "8px 0 14px", lineHeight: 1.5 }}>
                  {article.summary}
                </p>
              </div>

              <div style={{ fontSize: 11, color: "var(--muted)", borderTop: "1px solid var(--line)", paddingTop: 10, display: "flex", alignItems: "center", gap: 5 }}>
                <span>By {article.author}</span>
                <BadgeCheck size={14} style={{ color: "var(--accent)" }} title="Verified CFA Journalist" />
                <span className="muted">· {formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sports Journalist Application Modal */}
      {applicationModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 80,
            display: "grid",
            placeItems: "center",
            padding: 20
          }}
          onClick={() => setApplicationModalOpen(false)}
        >
          <div
            className="card"
            style={{ width: "min(100%, 540px)", padding: 24, maxHeight: "90vh", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="eyebrow">CFA MEDIA CORRESPONDENCE</div>
            <h2 className="font-display" style={{ fontSize: 22, margin: "6px 0 12px" }}>
              Apply for Sports Journalist Accreditation
            </h2>
            <p className="muted" style={{ fontSize: 12, marginBottom: 16, lineHeight: 1.5 }}>
              Passionate about covering campus sports, writing match reports, and conducting player interviews? Submit your profile for verification by the CFA Media Directorate.
            </p>

            {appliedSuccess ? (
              <div
                style={{
                  padding: 20,
                  background: "rgba(184, 255, 22, 0.12)",
                  borderRadius: 12,
                  border: "1px solid var(--accent)",
                  textAlign: "center",
                  color: "var(--accent)"
                }}
              >
                <CheckCircle2 size={32} style={{ margin: "0 auto 8px" }} />
                <strong style={{ fontSize: 15, display: "block" }}>Application Submitted Successfully!</strong>
                <span style={{ fontSize: 12, color: "#DFE2D8", display: "block", marginTop: 4 }}>
                  The Media Directorate will review your writing sample and notify your department.
                </span>
              </div>
            ) : (
              <form onSubmit={handleApply} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chisom Daniel"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Matric / Student ID</label>
                    <input
                      type="text"
                      placeholder="e.g. CU/2023/1089"
                      value={matricNumber}
                      onChange={e => setMatricNumber(e.target.value)}
                      style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Department</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mass Comm / English"
                      value={department}
                      onChange={e => setDepartment(e.target.value)}
                      style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Study Level</label>
                    <select
                      value={level}
                      onChange={e => setLevel(e.target.value)}
                      style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                    >
                      <option value="100 Level">100 Level</option>
                      <option value="200 Level">200 Level</option>
                      <option value="300 Level">300 Level</option>
                      <option value="400 Level">400 Level</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Phone / WhatsApp Contact</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234 ..."
                      value={phoneWhatsApp}
                      onChange={e => setPhoneWhatsApp(e.target.value)}
                      style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Preferred Sport Coverage</label>
                  <select
                    value={preferredSport}
                    onChange={e => setPreferredSport(e.target.value)}
                    style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                  >
                    <option value="Football">Football (CFA Flagship)</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Volleyball">Volleyball</option>
                    <option value="Badminton">Badminton</option>
                    <option value="Athletics">Athletics</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 4 }}>Sample Article / Match Report Excerpt (100–250 words)</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write a brief mock match report or tactical review demonstrating your writing style..."
                    value={sampleArticle}
                    onChange={e => setSampleArticle(e.target.value)}
                    style={{ width: "100%", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "10px", color: "var(--text)", fontSize: 12 }}
                  />
                </div>

                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button type="submit" className="primary-button" style={{ flex: 1 }}>
                    Submit Accreditation Application
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setApplicationModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
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
