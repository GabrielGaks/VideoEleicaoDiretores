import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { FONT_FAMILY, SPRING_CONFIG } from "../constants";

interface AnimatedTitleProps {
  text: string;
  frame: number;
  delay?: number;
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  style?: React.CSSProperties;
  /** If true, renders a pill/badge highlight behind the text */
  highlight?: boolean;
  highlightColor?: string;
}

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  frame,
  delay = 0,
  color = "#FFFFFF",
  fontSize = 72,
  fontWeight = 800,
  align = "center",
  maxWidth = 1700,
  style,
  highlight = false,
  highlightColor = "rgba(255,255,255,0.15)",
}) => {
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
    durationInFrames: 35,
  });

  const translateY = interpolate(progress, [0, 1], [70, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        transform: `translateY(${translateY}px)`,
        opacity,
        textAlign: align,
        fontFamily: FONT_FAMILY,
        fontSize,
        fontWeight,
        color,
        width: "100%",
        margin: "0 auto",
        maxWidth,
        lineHeight: 1.25,
        letterSpacing: "-0.02em",
        ...(highlight && {
          background: highlightColor,
          borderRadius: 20,
          padding: "16px 40px",
          backdropFilter: "blur(8px)",
        }),
        ...style,
      }}
    >
      {text}
    </div>
  );
};
