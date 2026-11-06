"use client";

import React from "react";

const CREST_MAP: Record<string, string> = {
  trinity: "/crests/trinity.svg",
  "trinity-fc": "/crests/trinity.svg",
  "trinity fc": "/crests/trinity.svg",
  iea: "/crests/iea.svg",
  "iea-fc": "/crests/iea.svg",
  "iea fc": "/crests/iea.svg",
  ben: "/crests/ben.svg",
  "ben-fc": "/crests/ben.svg",
  "ben fc": "/crests/ben.svg",
  elite: "/crests/elite.svg",
  "elite-fc": "/crests/elite.svg",
  "elite fc": "/crests/elite.svg",
  jane: "/crests/jane.svg",
  "jane-fc": "/crests/jane.svg",
  "jane fc": "/crests/jane.svg",
  ckc: "/crests/ckc.svg",
  "ckc-fc": "/crests/ckc.svg",
  "ckc fc": "/crests/ckc.svg",
  ark: "/crests/ark.svg",
  "ark-fc": "/crests/ark.svg",
  "ark fc": "/crests/ark.svg",
  remy: "/crests/remy.svg",
  "remy-fc": "/crests/remy.svg",
  "remy fc": "/crests/remy.svg"
};

interface TeamLogoProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TeamLogo({ name, size = 32, className = "", style = {} }: TeamLogoProps) {
  const key = name.trim().toLowerCase();
  const crestUrl = CREST_MAP[key];

  if (crestUrl) {
    return (
      <img
        src={crestUrl}
        alt={`${name} crest`}
        width={size}
        height={size}
        className={className}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
          flexShrink: 0,
          ...style
        }}
      />
    );
  }

  // Fallback initial badge
  return (
    <span
      className={`team-crest ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: Math.max(10, Math.floor(size * 0.35)),
        flexShrink: 0,
        ...style
      }}
    >
      {name.slice(0, 3).toUpperCase()}
    </span>
  );
}
