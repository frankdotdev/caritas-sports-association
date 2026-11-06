"use client";

import { Code2, ExternalLink, Sparkles } from "lucide-react";

export function DeveloperCredits({ variant = "card" }: { variant?: "card" | "inline" | "prominent" }) {
  if (variant === "inline") {
    return (
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--muted)" }}>
        <span>Engineered with precision by</span>
        <a
          href="https://frankoge.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)", fontWeight: 700 }}
        >
          Frank Oge
        </a>
        <span>at</span>
        <a
          href="https://hackversetechnologies.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#FFFFFF", fontWeight: 600, textDecoration: "underline" }}
        >
          Hackverse Technologies
        </a>
      </div>
    );
  }

  return (
    <section
      className="card"
      style={{
        marginTop: 48,
        padding: "24px 28px",
        background: "linear-gradient(135deg, #151812 0%, #1E2319 100%)",
        border: "1px solid rgba(184, 255, 22, 0.25)",
        borderRadius: 20,
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 140,
          height: 140,
          background: "radial-gradient(circle, rgba(184, 255, 22, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ maxWidth: 640 }}>
          <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent)", marginBottom: 6 }}>
            <Code2 size={13} /> DIGITAL ARCHITECTURE & PLATFORM LEAD
          </div>

          <h3 className="font-display" style={{ fontSize: 20, margin: "0 0 6px", letterSpacing: "-.03em" }}>
            Engineered by Frank Oge · Hackverse Technologies
          </h3>

          <p className="muted" style={{ fontSize: 12, lineHeight: 1.6, margin: 0 }}>
            Master product architecture, real-time sports state management, PWA offline resilience and extensible multi-sport engines designed and built for collegiate sports excellence.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <a
            href="https://frankoge.com"
            target="_blank"
            rel="noopener noreferrer"
            className="secondary-button"
            style={{ padding: "8px 14px", fontSize: 12, borderColor: "rgba(184, 255, 22, 0.4)", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span>frankoge.com</span>
            <ExternalLink size={12} className="muted" />
          </a>

          <a
            href="https://hackversetechnologies.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button"
            style={{ padding: "8px 14px", fontSize: 12, display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span>Hackverse Technologies</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  );
}
