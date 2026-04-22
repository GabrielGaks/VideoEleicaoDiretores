import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_CONFIG } from "../constants";

interface FloatingEmojiProps {
  emoji: string;
  frame: number;
  /** Horizontal position 0-1 (normalized to 1920px) */
  x: number;
  /** Vertical position 0-1 (normalized to 1080px) */
  y: number;
  size?: number;
  /** Bobbing amplitude in pixels */
  amplitude?: number;
  /** Bobbing period in frames */
  period?: number;
  /** Frame offset before entrance animation starts */
  delay?: number;
  /** Rotation angle in degrees */
  rotate?: number;
}

export const FloatingEmoji: React.FC<FloatingEmojiProps> = ({
  emoji,
  frame,
  x,
  y,
  size = 72,
  amplitude = 10,
  period = 90,
  delay = 0,
  rotate = 0,
}) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { ...SPRING_CONFIG, damping: 10 },
    durationInFrames: 25,
  });

  const scale = interpolate(entrance, [0, 1], [0, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Smooth sine-wave bobbing
  const bobY =
    Math.sin(((frame - delay) / period) * Math.PI * 2) * amplitude;
  // Subtle horizontal sway
  const bobX =
    Math.cos(((frame - delay) / (period * 1.3)) * Math.PI * 2) * (amplitude * 0.4);

  const px = x * 1920;
  const py = y * 1080;

  return (
    <div
      style={{
        position: "absolute",
        left: px,
        top: py,
        transform: `translate(-50%, -50%) translateX(${bobX}px) translateY(${bobY}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        fontSize: size,
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
      }}
    >
      {emoji}
    </div>
  );
};
