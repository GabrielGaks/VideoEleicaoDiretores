import React from "react";
import type { SubtitleCue } from "../types";
import { FONT_FAMILY } from "../constants";

interface SubtitleProps {
  cues: SubtitleCue[];
  localFrame: number;
  bottomOffset?: number;
}

export const Subtitle: React.FC<SubtitleProps> = ({
  cues,
  localFrame,
  bottomOffset = 48,
}) => {
  const activeCue = cues.find(
    (cue) => localFrame >= cue.from && localFrame < cue.to
  );

  if (!activeCue) return null;

  return (
    <div
      key={activeCue.text}
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(10, 10, 40, 0.72)",
        backdropFilter: "blur(12px)",
        color: "#FFFFFF",
        padding: "14px 48px",
        borderRadius: 16,
        fontSize: 38,
        fontFamily: FONT_FAMILY,
        fontWeight: 600,
        maxWidth: 1500,
        textAlign: "center",
        lineHeight: 1.35,
        whiteSpace: "pre-wrap",
        boxShadow: "0 4px 32px rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {activeCue.text}
    </div>
  );
};
