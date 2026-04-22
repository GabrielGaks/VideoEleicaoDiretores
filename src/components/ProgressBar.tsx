import React from "react";
import { interpolate } from "remotion";
import { COLORS } from "../constants";

interface ProgressBarProps {
  /** Global frame (used to show overall progress) */
  globalFrame: number;
  /** Total composition frames */
  totalFrames: number;
  height?: number;
  color?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  globalFrame,
  totalFrames,
  height = 6,
  color = COLORS.accent,
}) => {
  const progress = interpolate(globalFrame, [0, totalFrames], [0, 100], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height,
        backgroundColor: "rgba(255,255,255,0.2)",
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          backgroundColor: color,
          borderRadius: "0 4px 4px 0",
          transition: "none",
        }}
      />
    </div>
  );
};
