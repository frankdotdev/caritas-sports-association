"use client";

import { Trophy } from "lucide-react";
import { PublicShell } from "@/components/layout/public-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { SportCard } from "@/components/sports/sport-card";
import { useSportsApp } from "@/lib/store";

export default function SportsPage() {
  const { sports } = useSportsApp();

  return (
    <PublicShell>
      <div className="page-intro">
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Trophy size={13} /> MULTI-SPORT PLATFORM
        </div>
        <h1>Sports Directory</h1>
        <p>
          Caritas Sports Association governs football, basketball, volleyball, badminton, table tennis, athletics and collegiate athletic disciplines across the university.
        </p>
      </div>

      <SectionHeading
        title="Active sports disciplines"
        subtitle={`${sports.length} configurable sports engines running on the platform.`}
      />

      <div className="grid-3">
        {sports.map(sport => (
          <SportCard key={sport.id} sport={sport} />
        ))}
      </div>
    </PublicShell>
  );
}
