import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CircleDot,
  Target,
  Timer,
  Trophy,
  Volleyball
} from "lucide-react";
import type { Sport } from "@/domain/types";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  trophy: Trophy,
  "circle-dot": CircleDot,
  volleyball: Volleyball,
  activity: Activity,
  target: Target,
  timer: Timer
};

export function SportCard({ sport }: { sport: Sport }) {
  const IconComponent = iconMap[sport.icon] || Trophy;

  return (
    <Link
      href={`/sports/${sport.slug}`}
      className="card sport-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textDecoration: "none"
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div className="sport-icon">
            <IconComponent size={20} />
          </div>
          <span
            style={{
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: ".08em",
              color: sport.active ? "var(--accent)" : "var(--muted)",
              background: "#292D24",
              padding: "3px 8px",
              borderRadius: 6,
              fontWeight: 700
            }}
          >
            {sport.participantType}
          </span>
        </div>

        <h3 style={{ margin: "14px 0 6px", fontFamily: "Space Grotesk, sans-serif", fontSize: 18 }}>
          {sport.name}
        </h3>
        <p className="muted" style={{ fontSize: 12, lineHeight: 1.5, margin: 0 }}>
          {sport.description}
        </p>
      </div>

      <div
        style={{
          borderTop: "1px solid var(--line)",
          paddingTop: 12,
          marginTop: 14,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <span className="muted" style={{ fontSize: 11, fontWeight: 500 }}>
          {sport.countLabel}
        </span>
        <span className="text-link" style={{ fontSize: 11 }}>
          Explore <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
