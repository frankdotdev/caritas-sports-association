"use client";

import Link from "next/link";
import { Coins, Flame, Heart, Share2, Sparkles, Target, Trophy, User } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { DeveloperCredits } from "@/components/layout/developer-credits";
import { useSportsApp } from "@/lib/store";

export default function ProfilePage() {
  const { fanTokens, userBets } = useSportsApp();

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <User size={13} /> STUDENT FAN PROFILE
        </div>
        <h1>Fan Headquarters & Settings</h1>
        <p>
          Manage your free Caritas Sports prediction wallet, active match slips, and platform preferences.
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="metric">
          <div className="metric-label">Fan Coins Balance</div>
          <div className="metric-value" style={{ color: "var(--accent)" }}>
            {fanTokens.toLocaleString()}
          </div>
        </div>

        <div className="metric">
          <div className="metric-label">Active Prediction Slips</div>
          <div className="metric-value">{userBets.length}</div>
        </div>

        <div className="metric">
          <div className="metric-label">Accreditation Tier</div>
          <div className="metric-value" style={{ fontSize: 18 }}>Student Supporter</div>
        </div>
      </div>

      {/* Developer Credits Card */}
      <DeveloperCredits variant="prominent" />
    </PublicShell>
  );
}
