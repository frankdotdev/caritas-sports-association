"use client";

import { useState } from "react";
import { LogOut, CheckCircle2, ChevronDown, X } from "lucide-react";
import { useSportsApp } from "@/lib/store";

export function GoogleLogo({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" style={{ display: "inline-block", flexShrink: 0 }}>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function GoogleAuthButton() {
  const { authUser, signInWithGoogle, signOut } = useSportsApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");

  const handleQuickSignIn = (name: string, email: string, image: string) => {
    signInWithGoogle({ name, email, image });
    setModalOpen(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customEmail.trim()) return;
    signInWithGoogle({
      name: customName.trim(),
      email: customEmail.trim(),
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
    });
    setModalOpen(false);
  };

  if (authUser) {
    return (
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            padding: "4px 10px 4px 6px",
            borderRadius: 99,
            cursor: "pointer",
            color: "var(--text)"
          }}
        >
          {authUser.image ? (
            <img
              src={authUser.image}
              alt={authUser.name}
              style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "var(--elevated)",
                display: "grid",
                placeItems: "center",
                fontSize: 11,
                fontWeight: 700
              }}
            >
              {authUser.name.charAt(0)}
            </div>
          )}
          <span style={{ fontSize: 12, fontWeight: 600, maxWidth: 90, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {authUser.name.split(" ")[0]}
          </span>
          <ChevronDown size={12} className="muted" />
        </button>

        {menuOpen && (
          <div
            className="card"
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              marginTop: 6,
              width: 240,
              padding: 14,
              zIndex: 70,
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
            }}
          >
            <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: 10, marginBottom: 10 }}>
              <strong style={{ fontSize: 13, display: "block" }}>{authUser.name}</strong>
              <span className="muted" style={{ fontSize: 11, display: "block", wordBreak: "break-all" }}>
                {authUser.email}
              </span>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 10, color: "var(--accent)", fontWeight: 700 }}>
                <CheckCircle2 size={11} /> Verified via Google
              </div>
            </div>

            <button
              onClick={() => {
                signOut();
                setMenuOpen(false);
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                border: 0,
                color: "#EF4444",
                cursor: "pointer",
                padding: "6px 4px",
                fontSize: 12,
                fontWeight: 600
              }}
            >
              <LogOut size={14} /> Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "#FFFFFF",
          color: "#1F1F1F",
          border: "1px solid #DADCE0",
          borderRadius: 20,
          padding: "7px 14px",
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "Roboto, Arial, sans-serif",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          transition: "background-color 0.15s, box-shadow 0.15s"
        }}
      >
        <GoogleLogo size={16} />
        <span>Sign in with Google</span>
      </button>

      {/* Google Sign-In Dialog */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 99,
            display: "grid",
            placeItems: "center",
            padding: 16
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="card"
            style={{
              width: "min(100%, 420px)",
              padding: 24,
              background: "#181A15",
              borderColor: "#2F3528",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="icon-button"
              style={{ position: "absolute", top: 16, right: 16, width: 28, height: 28 }}
            >
              <X size={14} />
            </button>

            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ display: "inline-flex", padding: 10, background: "#FFFFFF", borderRadius: "50%", marginBottom: 12 }}>
                <GoogleLogo size={28} />
              </div>
              <h3 className="font-display" style={{ fontSize: 20, margin: "0 0 6px" }}>
                Sign in with Google
              </h3>
              <p className="muted" style={{ fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                Connect your Caritas student account to track predictions, claim leaderboard prizes, and submit match photography.
              </p>
            </div>

            {/* Quick Demo Accounts */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              <button
                onClick={() =>
                  handleQuickSignIn(
                    "Somtochukwu Dike",
                    "somto.dike@caritas.edu.ng",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  background: "#22261C",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  cursor: "pointer",
                  color: "#FFFFFF",
                  textAlign: "left"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="avatar"
                  style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <strong style={{ fontSize: 13, display: "block" }}>Somtochukwu Dike</strong>
                  <span className="muted" style={{ fontSize: 11 }}>somto.dike@caritas.edu.ng</span>
                </div>
              </button>

              <button
                onClick={() =>
                  handleQuickSignIn(
                    "Chidera Miracle",
                    "chidera.miracle@gmail.com",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 14px",
                  background: "#22261C",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  cursor: "pointer",
                  color: "#FFFFFF",
                  textAlign: "left"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                  alt="avatar"
                  style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <strong style={{ fontSize: 13, display: "block" }}>Chidera Miracle</strong>
                  <span className="muted" style={{ fontSize: 11 }}>chidera.miracle@gmail.com</span>
                </div>
              </button>
            </div>

            <div style={{ textAlign: "center", margin: "14px 0", position: "relative" }}>
              <div style={{ height: 1, background: "var(--line)" }} />
              <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: "#181A15", padding: "0 10px", fontSize: 11, color: "var(--muted)" }}>
                OR ENTER CUSTOM EMAIL
              </span>
            </div>

            <form onSubmit={handleCustomSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <input
                type="text"
                placeholder="Full Name"
                required
                value={customName}
                onChange={e => setCustomName(e.target.value)}
                style={{ height: 38, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 12px", color: "#FFF", fontSize: 12 }}
              />
              <input
                type="email"
                placeholder="Google / Student Email"
                required
                value={customEmail}
                onChange={e => setCustomEmail(e.target.value)}
                style={{ height: 38, background: "#11130F", border: "1px solid var(--line)", borderRadius: 8, padding: "0 12px", color: "#FFF", fontSize: 12 }}
              />
              <button
                type="submit"
                className="primary-button"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: 4,
                  padding: "9px 14px",
                  fontSize: 12
                }}
              >
                Sign In with Google
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
