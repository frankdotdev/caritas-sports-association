"use client";

import { useEffect, useState } from "react";
import { Download, HelpCircle, Share2, Smartphone, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallBanner() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    // Check dismissal state from storage
    const isDismissed = localStorage.getItem("csa-install-dismissed") === "1";
    setDismissed(isDismissed);

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(isIosDevice);

    const handler = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("csa-install-dismissed", "1");
    setDismissed(true);
  };

  if (dismissed && !showIosGuide) return null;

  return (
    <>
      {!dismissed && (
        <div
          className="card"
          style={{
            marginTop: 18,
            padding: 16,
            display: "flex",
            alignItems: "center",
            gap: 14,
            borderColor: "rgba(184, 255, 22, 0.35)",
            background: "linear-gradient(135deg, #1D2019 0%, #20261A 100%)"
          }}
        >
          <div className="sport-icon" style={{ background: "var(--accent)", color: "#11130F" }}>
            <Download size={18} strokeWidth={2.5} />
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            <strong style={{ fontSize: 13, display: "block" }}>
              Install Caritas Sports on Your Device
            </strong>
            <p className="muted" style={{ fontSize: 11, margin: "2px 0 0", lineHeight: 1.4 }}>
              Get the native mobile app experience with rapid access to live scores, TikTok streams and fixtures.
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {promptEvent ? (
              <button
                className="primary-button"
                style={{ padding: "8px 14px", fontSize: 12 }}
                onClick={async () => {
                  await promptEvent.prompt();
                  setPromptEvent(null);
                }}
              >
                Add to Home Screen
              </button>
            ) : isIos ? (
              <button
                className="secondary-button"
                style={{ padding: "8px 12px", fontSize: 12, borderColor: "var(--accent)" }}
                onClick={() => setShowIosGuide(true)}
              >
                iOS Instructions
              </button>
            ) : (
              <button
                className="primary-button"
                style={{ padding: "8px 14px", fontSize: 12 }}
                onClick={() => alert("Tap your browser's menu (⋮ or Share) and select 'Install' or 'Add to Home Screen'.")}
              >
                Install App
              </button>
            )}

            <button
              className="icon-button"
              aria-label="Dismiss banner"
              onClick={handleDismiss}
              style={{ width: 32, height: 32 }}
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* iOS Instructions Modal */}
      {showIosGuide && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(10px)",
            zIndex: 70,
            display: "grid",
            placeItems: "center",
            padding: 20
          }}
          onClick={() => setShowIosGuide(false)}
        >
          <div
            className="card"
            style={{ width: "min(100%, 460px)", padding: 24 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="eyebrow">IPHONE & IPAD INSTALLATION</div>
            <h2 className="font-display" style={{ fontSize: 20, margin: "6px 0 14px" }}>
              How to Install on Safari
            </h2>

            <ol style={{ fontSize: 13, lineHeight: 1.8, color: "#DFE2D8", paddingLeft: 20, margin: 0 }}>
              <li>
                Tap the <strong>Share</strong> button (box with an arrow pointing up) at the bottom of Safari.
              </li>
              <li>
                Scroll down and select <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
              </li>
              <li>
                Tap <strong>Add</strong> in the top-right corner.
              </li>
              <li>
                Launch <strong>Caritas Sports</strong> from your home screen for an app-like experience!
              </li>
            </ol>

            <button
              onClick={() => {
                setShowIosGuide(false);
                handleDismiss();
              }}
              className="primary-button"
              style={{ width: "100%", marginTop: 20 }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
