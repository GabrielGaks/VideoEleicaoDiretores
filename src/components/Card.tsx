import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONT_FAMILY, SPRING_CONFIG } from "../constants";

interface CardProps {
  icon: string;
  title: string;
  body?: string;
  frame: number;
  delay?: number;
  accentColor?: string;
  width?: number;
  style?: React.CSSProperties;
  iconSize?: number;
  titleSize?: number;
  bodySize?: number;
}

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  body,
  frame,
  delay = 0,
  accentColor = "#1E88E5",
  width = 380,
  style,
  iconSize = 64,
  titleSize = 32,
  bodySize = 26,
}) => {
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { ...SPRING_CONFIG, damping: 12 },
    durationInFrames: 30,
  });

  const translateY = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const scale = interpolate(progress, [0, 1], [0.85, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        width,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: "32px 28px",
        boxShadow: `0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
        borderTop: `6px solid ${accentColor}`,
        fontFamily: FONT_FAMILY,
        ...style,
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: iconSize,
          lineHeight: 1,
          background: `${accentColor}18`,
          borderRadius: "50%",
          width: iconSize * 1.5,
          height: iconSize * 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: titleSize,
          fontWeight: 700,
          color: "#1A237E",
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {title}
      </div>

      {/* Body */}
      {body && (
        <div
          style={{
            fontSize: bodySize,
            fontWeight: 400,
            color: "#546E7A",
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {body}
        </div>
      )}
    </div>
  );
};
