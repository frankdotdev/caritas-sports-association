"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Bell, Menu, Search, Target, Trophy, X } from "lucide-react";
import { useSportsApp } from "@/lib/store";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";

const links = [
  ["/sports", "Sports"],
  ["/fixtures", "Fixtures"],
  ["/predictions", "Fan Predictor"],
  ["/transfers", "Transfers"],
  ["/teams", "Teams"],
  ["/athletes", "Athletes"],
  ["/news", "News"],
  ["/media", "Media"],
  ["/officials", "Officials"]
];

export function SiteHeader() {
  const pathname = usePathname();
  const { fanTokens } = useSportsApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <header className="site-header">
        <Link href="/" className="brand">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              overflow: "hidden",
              background: "#1D2019",
              border: "1px solid var(--line)",
              display: "grid",
              placeItems: "center"
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Caritas Sports Association"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                // Graceful fallback to SVG if image not yet loaded
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <span>
            CARITAS
            <span className="brand-sub">SPORTS ASSOCIATION</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href || (href !== "/" && pathname.startsWith(href)) ? "active" : ""}
            >
              {label}
              {href === "/predictions" && (
                <span
                  style={{
                    marginLeft: 5,
                    fontSize: 8,
                    background: "var(--accent)",
                    color: "#11130F",
                    fontWeight: 800,
                    padding: "1px 5px",
                    borderRadius: 99
                  }}
                >
                  FUN
                </span>
              )}
              {href === "/transfers" && (
                <span
                  style={{
                    marginLeft: 5,
                    fontSize: 8,
                    background: "rgba(239, 68, 68, 0.2)",
                    color: "#EF4444",
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 99
                  }}
                >
                  CLOSED
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          {/* Fan Coins Pill */}
          <Link
            href="/predictions"
            className="desktop-only"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#20261A",
              border: "1px solid rgba(184, 255, 22, 0.3)",
              padding: "6px 12px",
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 700,
              color: "var(--accent)"
            }}
            title="Free Campus Fan Prediction Tokens"
          >
            <Target size={14} />
            <span>{fanTokens.toLocaleString()} Fan Coins</span>
          </Link>

          <div className="desktop-only">
            <GoogleAuthButton />
          </div>

          <button
            className="icon-button"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={17} />
          </button>

          <button
            className="icon-button mobile-menu"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Completely free of any admin hints) */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(17,19,15,0.98)",
            zIndex: 49,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--line)",
            overflowY: "auto"
          }}
        >
          <div className="eyebrow" style={{ marginBottom: 4 }}>
            SPORTS ASSOCIATION DIRECTORY
          </div>
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 17,
                fontFamily: "Space Grotesk, sans-serif",
                fontWeight: 600,
                color: pathname.startsWith(href) ? "var(--accent)" : "var(--text)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid var(--line)"
              }}
            >
              <span>{label}</span>
              <ArrowRight size={16} className="muted" />
            </Link>
          ))}

          <div style={{ marginTop: "auto", paddingTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GoogleAuthButton />
            </div>
            <Link
              href="/predictions"
              onClick={() => setMobileMenuOpen(false)}
              className="primary-button"
              style={{ width: "100%", textAlign: "center" }}
            >
              <Target size={16} /> Predict Matches ({fanTokens} Coins)
            </Link>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(12px)",
            zIndex: 60,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "80px 20px"
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="card"
            style={{ width: "min(100%, 580px)", padding: 20 }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--line)", paddingBottom: 14 }}>
              <Search size={18} className="muted" />
              <input
                type="text"
                placeholder="Search sports, teams, athletes, fixtures, transfers..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  background: "transparent",
                  border: 0,
                  outline: "none",
                  color: "var(--text)",
                  fontSize: 15
                }}
              />
              <button
                className="icon-button"
                style={{ width: 28, height: 28 }}
                onClick={() => setSearchOpen(false)}
              >
                <X size={14} />
              </button>
            </div>

            <div style={{ marginTop: 16, maxHeight: 340, overflowY: "auto" }}>
              {searchQuery.trim().length === 0 ? (
                <div className="muted" style={{ fontSize: 12, padding: "10px 0" }}>
                  Try searching for: <span style={{ color: "var(--accent)" }}>Trinity FC</span>, <span style={{ color: "var(--accent)" }}>Modric</span>, <span style={{ color: "var(--accent)" }}>Transfer</span>, <span style={{ color: "var(--accent)" }}>IEA</span> or <span style={{ color: "var(--accent)" }}>Basketball</span>.
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link
                    href={`/fixtures?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchOpen(false)}
                    className="card card-pad"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <div>
                      <strong style={{ fontSize: 13 }}>Search fixtures matching &ldquo;{searchQuery}&rdquo;</strong>
                      <div className="muted" style={{ fontSize: 11 }}>View match schedule & scores</div>
                    </div>
                    <ArrowRight size={14} className="muted" />
                  </Link>

                  <Link
                    href={`/athletes?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchOpen(false)}
                    className="card card-pad"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <div>
                      <strong style={{ fontSize: 13 }}>Search athletes matching &ldquo;{searchQuery}&rdquo;</strong>
                      <div className="muted" style={{ fontSize: 11 }}>Browse player profiles and stats</div>
                    </div>
                    <ArrowRight size={14} className="muted" />
                  </Link>

                  <Link
                    href={`/transfers?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setSearchOpen(false)}
                    className="card card-pad"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                  >
                    <div>
                      <strong style={{ fontSize: 13 }}>Search transfers for &ldquo;{searchQuery}&rdquo;</strong>
                      <div className="muted" style={{ fontSize: 11 }}>Official 2026 player movements</div>
                    </div>
                    <ArrowRight size={14} className="muted" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
