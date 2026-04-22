import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { Card } from "../components/Card";
import { FloatingEmoji } from "../components/FloatingEmoji";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

export const Scene02Organization: React.FC<SceneProps> = ({
  localFrame,
  durationInFrames,
}) => {
  const { fps } = useVideoConfig();
  const [gradFrom, gradTo] = SCENE_GRADIENTS[1];
  const contentOffsetY = 90;

  // Timeline line draw-in animation
  const lineProgress = interpolate(
    localFrame,
    [50, 140],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 1040]);

  // Step number badges entrance
  const badgeProgress = (delay: number) =>
    spring({ frame: localFrame - delay, fps, config: SPRING_CONFIG, durationInFrames: 25 });

  const cards = [
    {
      icon: "📋",
      title: "Comissão Eleitoral",
      body: "Grupo responsável por organizar e fiscalizar todo o processo",
      delay: 30,
      accent: COLORS.primary,
    },
    {
      icon: "📅",
      title: "Calendário Eleitoral",
      body: "Define prazos e datas importantes de cada etapa",
      delay: 60,
      accent: COLORS.secondary,
    },
    {
      icon: "📜",
      title: "Regulamento",
      body: "Regras claras que garantem transparência e igualdade",
      delay: 90,
      accent: COLORS.accent,
    },
  ];

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      <FloatingEmoji emoji="⚖️" frame={localFrame} x={0.06} y={0.15} size={64} delay={20} />
      <FloatingEmoji emoji="📌" frame={localFrame} x={0.92} y={0.20} size={56} delay={35} rotate={15} />
      <FloatingEmoji emoji="🗂️" frame={localFrame} x={0.88} y={0.75} size={60} delay={50} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 60 + contentOffsetY,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 80px",
        }}
      >
        <AnimatedTitle
          text="Organização da Eleição"
          frame={localFrame}
          delay={5}
          color={COLORS.textDark}
          fontSize={68}
          fontWeight={800}
        />
        <div
          style={{
            marginTop: 8,
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            color: COLORS.primary,
            fontWeight: 600,
            opacity: interpolate(
              spring({ frame: localFrame - 20, fps, config: SPRING_CONFIG, durationInFrames: 20 }),
              [0, 1], [0, 1]
            ),
          }}
        >
          Como tudo começa...
        </div>
      </div>

      {/* Step number row */}
      <div
        style={{
          position: "absolute",
          top: 195 + contentOffsetY,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 320,
          zIndex: 2,
        }}
      >
        {[1, 2, 3].map((num, i) => {
          const bp = badgeProgress(30 + i * 30);
          const bs = interpolate(bp, [0, 1], [0.5, 1]);
          const bo = interpolate(bp, [0, 1], [0, 1]);
          return (
            <div
              key={num}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: [COLORS.primary, COLORS.secondary, COLORS.accent][i],
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800,
                fontFamily: FONT_FAMILY,
                transform: `scale(${bs})`,
                opacity: bo,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                zIndex: 3,
              }}
            >
              {num}
            </div>
          );
        })}
      </div>

      {/* Connecting timeline line */}
      <div
        style={{
          position: "absolute",
          top: 219 + contentOffsetY,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1040,
          height: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: lineWidth,
            background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent})`,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Cards */}
      <div
        style={{
          position: "absolute",
          top: 270 + contentOffsetY,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
          padding: "0 80px",
        }}
      >
        {cards.map((card, i) => (
          <Card
            key={i}
            icon={card.icon}
            title={card.title}
            body={card.body}
            frame={localFrame}
            delay={card.delay}
            accentColor={card.accent}
            width={400}
            titleSize={30}
            bodySize={24}
          />
        ))}
      </div>

      <Subtitle cues={SUBTITLES[1]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
