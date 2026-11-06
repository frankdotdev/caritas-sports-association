"use client";

import { useMemo, useState } from "react";
import { Camera, CheckCircle2, ImagePlus, Smartphone, X } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { useSportsApp } from "@/lib/store";
import { uploadMediaAsset } from "@/lib/storage-adapter";

export default function MediaPage() {
  const { mediaAssets, sports, submitCrowdsourcedMedia } = useSportsApp();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSport, setSelectedSport] = useState("all");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Upload Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photographerName, setPhotographerName] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState<"match" | "flyer" | "team" | "ceremony">("match");
  const [sport, setSport] = useState("Football");
  const [uploadType, setUploadType] = useState<"file" | "url">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Only show approved assets in public gallery
  const filteredAssets = useMemo(() => {
    return mediaAssets.filter(m => {
      // If status is present, must be approved
      if (m.status && m.status !== "approved") return false;
      if (selectedCategory !== "all" && m.category !== selectedCategory) return false;
      if (selectedSport !== "all" && m.sport.toLowerCase() !== selectedSport.toLowerCase()) return false;
      return true;
    });
  }, [mediaAssets, selectedCategory, selectedSport]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsUploading(true);
    let finalUrl = url.trim();

    try {
      if (uploadType === "file" && selectedFile) {
        // Dual storage architecture: Cloudflare R2 -> Supabase Storage -> Local DataURL
        const res = await uploadMediaAsset(selectedFile, "media-captures");
        finalUrl = res.url;
      } else if (uploadType === "file" && previewUrl) {
        finalUrl = previewUrl;
      }

      if (!finalUrl) {
        alert("Please provide an image file or a valid URL");
        setIsUploading(false);
        return;
      }

      submitCrowdsourcedMedia({
        title: title.trim(),
        description: description.trim() || undefined,
        url: finalUrl,
        category,
        sport,
        uploadedBy: photographerName.trim() || "Student Sideline Photographer",
        sourceType: uploadType
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setUploadModalOpen(false);
        setTitle("");
        setDescription("");
        setPhotographerName("");
        setUrl("");
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsUploading(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      setIsUploading(false);
      alert("Error processing upload. Please try again.");
    }
  };

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Camera size={13} /> OFFICIAL MEDIA & CROWDSOURCED MATCH CAPTURES
        </div>
        <h1>Media & Flyers</h1>
        <p>
          High-resolution match photography, official announcement flyers, team moments and live student sideline captures across Caritas sports.
        </p>
      </div>

      {/* Control bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["all", "match", "flyer", "team", "ceremony"].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
              style={{ textTransform: "capitalize" }}
            >
              {cat === "all" ? "All media" : `${cat}s`}
            </button>
          ))}
        </div>

        <button onClick={() => setUploadModalOpen(true)} className="primary-button">
          <Smartphone size={15} /> Submit Match Capture
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid-3">
        {filteredAssets.map(asset => (
          <div key={asset.id} className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                height: 230,
                backgroundImage: `url(${asset.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative"
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(17,19,15,0.85)",
                  backdropFilter: "blur(6px)",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--accent)",
                  padding: "3px 8px",
                  borderRadius: 6,
                  textTransform: "uppercase"
                }}
              >
                {asset.category}
              </span>

              {asset.uploadedBy && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    background: "rgba(17,19,15,0.9)",
                    backdropFilter: "blur(6px)",
                    fontSize: 10,
                    fontWeight: 600,
                    color: "var(--text)",
                    padding: "2px 8px",
                    borderRadius: 4
                  }}
                >
                  📷 {asset.uploadedBy}
                </span>
              )}
            </div>

            <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <strong style={{ fontSize: 14, display: "block" }}>{asset.title}</strong>
                <p className="muted" style={{ fontSize: 12, margin: "6px 0 0", lineHeight: 1.5 }}>
                  {asset.description || "Caritas Sports Association verified media."}
                </p>
              </div>

              <div
                style={{
                  marginTop: 14,
                  paddingTop: 10,
                  borderTop: "1px solid var(--line)",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "var(--muted)"
                }}
              >
                <span>{asset.sport}</span>
                <span>{asset.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="card" style={{ padding: 40, textAlign: "center", marginTop: 20 }}>
          <Camera size={32} className="muted" style={{ margin: "0 auto 12px" }} />
          <h3>No media items in this category</h3>
          <p className="muted" style={{ fontSize: 13, margin: "6px auto 0" }}>
            Submit clean match photos from your device to see them featured here once approved by admins!
          </p>
        </div>
      )}

      {/* Crowdsourced Match Photo Upload Modal */}
      {uploadModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 60,
            display: "grid",
            placeItems: "center",
            padding: 16
          }}
          onClick={() => setUploadModalOpen(false)}
        >
          <div
            className="card"
            style={{ width: "min(100%, 500px)", padding: 24, position: "relative", maxHeight: "90vh", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setUploadModalOpen(false)}
              className="icon-button"
              style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30 }}
            >
              <X size={15} />
            </button>

            {submitSuccess ? (
              <div style={{ textAlign: "center", padding: "26px 10px" }}>
                <CheckCircle2 size={46} style={{ color: "var(--accent)", margin: "0 auto 14px" }} />
                <h3 className="font-display" style={{ fontSize: 20, marginBottom: 8 }}>
                  Match Capture Submitted!
                </h3>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, maxWidth: 380, margin: "0 auto" }}>
                  Thank you! Your photo has been sent to the CSA Media Moderation Desk. Once verified and approved by administrators, it will be visible in the public gallery.
                </p>
              </div>
            ) : (
              <>
                <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)" }}>
                  <Smartphone size={13} /> FAN & SIDELINE PHOTOGRAPHY
                </div>
                <h2 className="font-display" style={{ fontSize: 20, margin: "6px 0 6px" }}>
                  Submit Clean Match Capture
                </h2>
                <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, marginBottom: 16 }}>
                  Captured great action or celebration from the pitch? Upload directly from your phone storage or share a photo URL. Approved shots are showcased in the official association gallery.
                </p>

                {/* Upload Method Selector */}
                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  <button
                    type="button"
                    onClick={() => setUploadType("file")}
                    className={`filter-chip ${uploadType === "file" ? "active" : ""}`}
                    style={{ flex: 1, textAlign: "center" }}
                  >
                    📱 Phone / Device Storage
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadType("url")}
                    className={`filter-chip ${uploadType === "url" ? "active" : ""}`}
                    style={{ flex: 1, textAlign: "center" }}
                  >
                    🔗 Image Web Link
                  </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Capture Title *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Morata Goal Celebration vs ARK FC"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Category</label>
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value as "match" | "flyer" | "team" | "ceremony")}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      >
                        <option value="match">Match Photo</option>
                        <option value="flyer">Matchday Flyer</option>
                        <option value="team">Team Portrait</option>
                        <option value="ceremony">Fans & Atmosphere</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Sport</label>
                      <select
                        value={sport}
                        onChange={e => setSport(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      >
                        {sports.map(s => (
                          <option key={s.id} value={s.name}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {uploadType === "file" ? (
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>
                        Select Image from Phone / Computer *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        required={!previewUrl}
                        onChange={handleFileChange}
                        style={{
                          width: "100%",
                          padding: "10px",
                          background: "var(--surface)",
                          border: "1px dashed var(--line)",
                          borderRadius: 8,
                          color: "var(--text)",
                          fontSize: 12,
                          cursor: "pointer"
                        }}
                      />
                      {previewUrl && (
                        <div style={{ marginTop: 8, position: "relative", height: 120, borderRadius: 8, overflow: "hidden", border: "1px solid var(--accent)" }}>
                          <img src={previewUrl} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Image Direct URL *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://..."
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                  )}

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Your Name / Handle</label>
                      <input
                        type="text"
                        placeholder="e.g. Victor (Mech Eng)"
                        value={photographerName}
                        onChange={e => setPhotographerName(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, marginBottom: 4, fontWeight: 600 }}>Caption / Notes</label>
                      <input
                        type="text"
                        placeholder="Brief context"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        style={{ width: "100%", height: 40, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "0 10px", color: "var(--text)" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                    <button type="submit" disabled={isUploading} className="primary-button" style={{ flex: 1 }}>
                      {isUploading ? "Uploading..." : "Submit to Moderation Queue"}
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => setUploadModalOpen(false)}
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
