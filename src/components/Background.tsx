import React from "react";
import { AbsoluteFill } from "remotion";

interface BackgroundProps {
  colorFrom: string;
  colorTo: string;
  variant?: "linear" | "radial";
  /** Optional decorative floating circles */
  showDecor?: boolean;
  frame?: number;
}

export const Background: React.FC<BackgroundProps> = ({
  colorFrom,
  colorTo,
  variant = "linear",
  showDecor = true,
  frame = 0,
}) => {
  const gradient =
    variant === "radial"
      ? `radial-gradient(ellipse at 30% 40%, ${colorFrom} 0%, ${colorTo} 100%)`
      : `linear-gradient(135deg, ${colorFrom} 0%, ${colorTo} 100%)`;

  // Slow parallax offset for decorative circles
  const offset = frame * 0.15;

  return (
    <AbsoluteFill style={{ background: gradient, overflow: "hidden" }}>
      {showDecor && (
        <svg
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0, opacity: 0.08 }}
        >
          {/* Large decorative circles */}
          <circle
            cx={200 + Math.sin(offset * 0.01) * 20}
            cy={150 + Math.cos(offset * 0.008) * 15}
            r="200"
            fill="white"
          />
          <circle
            cx={1700 + Math.sin(offset * 0.012) * 18}
            cy={900 + Math.cos(offset * 0.009) * 20}
            r="250"
            fill="white"
          />
          <circle
            cx={960 + Math.sin(offset * 0.007) * 12}
            cy={-80 + Math.cos(offset * 0.011) * 10}
            r="180"
            fill="white"
          />
          {/* Smaller scattered circles */}
          <circle cx={400} cy={800} r="80" fill="white" />
          <circle cx={1500} cy={200} r="100" fill="white" />
          <circle cx={100} cy={600} r="60" fill="white" />
          <circle cx={1800} cy={500} r="70" fill="white" />
        </svg>
      )}
    </AbsoluteFill>
  );
};
