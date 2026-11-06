"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle, Send, Share2, Twitter, X, Instagram, Video, Facebook } from "lucide-react";

interface ShareModalProps {
  title: string;
  text: string;
  url?: string;
  onClose: () => void;
}

export function ShareModal({ title, text, url, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const shareUrl = typeof window !== "undefined" ? url || window.location.href : "https://caritas-sports.org";

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`🏆 ${title}\n\n${text}\n\n👉 Follow live on CSA: ${shareUrl}`);
    setCopied(true);
    showToast("Link and match preview copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const waText = encodeURIComponent(`🏆 *CARITAS SPORTS ASSOCIATION*\n*${title}*\n\n${text}\n\n🔗 ${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${waText}`, "_blank");
  };

  const handleFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(`🏆 CARITAS SPORTS: ${title} - ${text}`)}`;
    window.open(fbUrl, "_blank", "width=600,height=500");
  };

  const handleInstagram = () => {
    navigator.clipboard.writeText(`🏆 ${title}\n\n${text}\n\nFollow @caritas_football for official highlights!\n🔗 ${shareUrl}`);
    showToast("Caption copied! Opening Instagram...");
    setTimeout(() => {
      window.open("https://www.instagram.com/caritas_football/", "_blank");
    }, 800);
  };

  const handleTikTok = () => {
    navigator.clipboard.writeText(`🏆 Caritas Sports: ${title}\n\n${text}\n\n#CaritasSports #CaritasFootball #CFA2026 #CampusFootball\n🔗 ${shareUrl}`);
    showToast("TikTok caption copied! Opening TikTok...");
    setTimeout(() => {
      window.open("https://www.tiktok.com/@caritas_football", "_blank");
    }, 800);
  };

  const handleTwitter = () => {
    const twText = encodeURIComponent(`${title}: ${text} via @caritas_football #CaritasSports #CFA2026`);
    window.open(`https://twitter.com/intent/tweet?text=${twText}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleTelegram = () => {
    const tgText = encodeURIComponent(`🏆 *${title}*\n\n${text}\n\n${shareUrl}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${tgText}`, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(12px)",
        zIndex: 90,
        display: "grid",
        placeItems: "center",
        padding: 16
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ width: "min(100%, 480px)", padding: 22, position: "relative", maxHeight: "90vh", overflowY: "auto" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="icon-button"
          style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30 }}
        >
          <X size={15} />
        </button>

        <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)" }}>
          <Share2 size={13} /> ONE-TAP SOCIAL BROADCAST
        </div>
        <h3 className="font-display" style={{ fontSize: 20, margin: "6px 0 10px" }}>
          {title}
        </h3>

        {/* Live Content Preview */}
        <div
          style={{
            background: "#161912",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: 14,
            fontSize: 12,
            lineHeight: 1.6,
            color: "#DFE2D8",
            marginBottom: 16
          }}
        >
          {text}
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--accent)", wordBreak: "break-all" }}>
            🔗 {shareUrl}
          </div>
        </div>

        {toastMsg && (
          <div
            style={{
              background: "rgba(184, 255, 22, 0.15)",
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              padding: "8px 12px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textAlign: "center",
              marginBottom: 12
            }}
          >
            {toastMsg}
          </div>
        )}

        {/* Channels Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
          {/* TikTok */}
          <button
            onClick={handleTikTok}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#121212",
              borderColor: "#FE2C55",
              color: "#fff",
              cursor: "pointer",
              padding: "12px 14px",
              textAlign: "left"
            }}
          >
            <Video size={18} style={{ color: "#FE2C55" }} />
            <div>
              <strong style={{ fontSize: 13, display: "block" }}>TikTok</strong>
              <span className="muted" style={{ fontSize: 10 }}>Copies tags & open</span>
            </div>
          </button>

          {/* Instagram */}
          <button
            onClick={handleInstagram}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#23131D",
              borderColor: "#E1306C",
              color: "#fff",
              cursor: "pointer",
              padding: "12px 14px",
              textAlign: "left"
            }}
          >
            <Instagram size={18} style={{ color: "#E1306C" }} />
            <div>
              <strong style={{ fontSize: 13, display: "block" }}>Instagram</strong>
              <span className="muted" style={{ fontSize: 10 }}>Story & post caption</span>
            </div>
          </button>

          {/* Facebook */}
          <button
            onClick={handleFacebook}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#121A2A",
              borderColor: "#1877F2",
              color: "#fff",
              cursor: "pointer",
              padding: "12px 14px",
              textAlign: "left"
            }}
          >
            <Facebook size={18} style={{ color: "#1877F2" }} />
            <div>
              <strong style={{ fontSize: 13, display: "block" }}>Facebook</strong>
              <span className="muted" style={{ fontSize: 10 }}>Direct wall share</span>
            </div>
          </button>

          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#1E2C1E",
              borderColor: "#25D366",
              color: "#fff",
              cursor: "pointer",
              padding: "12px 14px",
              textAlign: "left"
            }}
          >
            <MessageCircle size={18} style={{ color: "#25D366" }} />
            <div>
              <strong style={{ fontSize: 13, display: "block" }}>WhatsApp</strong>
              <span className="muted" style={{ fontSize: 10 }}>Hostel & dept groups</span>
            </div>
          </button>

          {/* Twitter / X */}
          <button
            onClick={handleTwitter}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#19222B",
              borderColor: "#1DA1F2",
              color: "#fff",
              cursor: "pointer",
              padding: "12px 14px",
              textAlign: "left"
            }}
          >
            <Twitter size={18} style={{ color: "#1DA1F2" }} />
            <div>
              <strong style={{ fontSize: 13, display: "block" }}>Twitter / X</strong>
              <span className="muted" style={{ fontSize: 10 }}>Campus trending tags</span>
            </div>
          </button>

          {/* Telegram */}
          <button
            onClick={handleTelegram}
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "#1A262E",
              borderColor: "#0088CC",
              color: "#fff",
              cursor: "pointer",
              padding: "12px 14px",
              textAlign: "left"
            }}
          >
            <Send size={18} style={{ color: "#0088CC" }} />
            <div>
              <strong style={{ fontSize: 13, display: "block" }}>Telegram</strong>
              <span className="muted" style={{ fontSize: 10 }}>Channel broadcast</span>
            </div>
          </button>
        </div>

        {/* Copy All Button */}
        <button
          onClick={handleCopy}
          className="card"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            background: copied ? "rgba(184, 255, 22, 0.15)" : "var(--surface)",
            borderColor: copied ? "var(--accent)" : "var(--line)",
            color: copied ? "var(--accent)" : "var(--text)",
            cursor: "pointer",
            padding: "12px 16px"
          }}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          <strong style={{ fontSize: 13 }}>{copied ? "Copied Preview & Link!" : "Copy Full Card & Link"}</strong>
        </button>
      </div>
    </div>
  );
}
