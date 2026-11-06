import Link from "next/link";
import { MapPin, Radio, Video, ArrowRight } from "lucide-react";
import type { Fixture } from "@/domain/types";
import { formatDate } from "@/lib/utils";
import { TeamLogo } from "@/components/ui/team-logo";

export function MatchCard({ fixture }: { fixture: Fixture }) {
  const isLive = fixture.status === "live" || fixture.status === "half_time";
  const hasScore = fixture.homeScore !== undefined && fixture.awayScore !== undefined;

  return (
    <Link
      href={`/matches/${fixture.id}`}
      className="card match-card"
      style={{
        display: "block",
        transition: "transform 0.15s ease, border-color 0.15s ease",
        borderColor: isLive ? "rgba(184, 255, 22, 0.4)" : undefined
      }}
    >
      <div className="match-meta">
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span>{fixture.competition}</span>
          {fixture.stream?.status === "live" && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                background: "rgba(184,255,22,0.15)",
                color: "var(--accent)",
                fontSize: 9,
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: 4
              }}
            >
              <Radio size={10} /> TIKTOK LIVE
            </span>
          )}
        </span>

        <span
          className={`status ${
            isLive ? "status-live" : fixture.status === "completed" ? "status-done" : "status-upcoming"
          }`}
        >
          {isLive && (
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "currentColor",
                animation: "pulse 1.5s infinite"
              }}
            />
          )}
          {isLive && fixture.liveMinute ? `${fixture.liveMinute}' ` : ""}
          {fixture.status.replace("_", " ")}
        </span>
      </div>

      <div className="match-teams">
        <div className="match-team">
          <TeamLogo name={fixture.home} size={28} />
          <span className="team-name">{fixture.home}</span>
        </div>

        <div className="match-score">
          {hasScore ? `${fixture.homeScore} – ${fixture.awayScore}` : "VS"}
        </div>

        <div className="match-team">
          <span className="team-name">{fixture.away}</span>
          <TeamLogo name={fixture.away} size={28} />
        </div>
      </div>

      <div className="match-footer">
        <span>
          {formatDate(fixture.date)} · {fixture.round}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={11} /> {fixture.venue || "Caritas Stadium"}
        </span>
      </div>
    </Link>
  );
}
