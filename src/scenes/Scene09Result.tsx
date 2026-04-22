import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { FloatingEmoji } from "../components/FloatingEmoji";
import { PersonFigure } from "../components/PersonFigure";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_BOUNCE } from "../constants";
import { SUBTITLES } from "../data/subtitles";

export const Scene09Result: React.FC<SceneProps> = ({
  localFrame,
  durationInFrames,
}) => {
  const { fps } = useVideoConfig();
  // Background Colors - Clean and elegant
  const gradFrom = "#F0F4F8";
  const gradTo = "#D9E2EC";

  // Winner announcement
  const winnerProgress = spring({
    frame: localFrame - 15,
    fps,
    config: SPRING_BOUNCE,
    durationInFrames: 40,
  });
  const winnerScale = interpolate(winnerProgress, [0, 1], [0, 1]);
  const winnerOpacity = interpolate(winnerProgress, [0, 1], [0, 1]);

  // Decorative elements - cleanly reduced
  const confettiItems = [
    { emoji: "✨", x: 0.15, y: 0.25, delay: 30, size: 48 },
    { emoji: "⭐", x: 0.85, y: 0.20, delay: 45, size: 40 },
    { emoji: "✨", x: 0.80, y: 0.75, delay: 60, size: 52 },
    { emoji: "⭐", x: 0.20, y: 0.70, delay: 75, size: 44 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: "#F8FAFC" }}>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      {/* Confetti emojis */}
      {confettiItems.map((item, i) => (
        <FloatingEmoji
          key={i}
          emoji={item.emoji}
          frame={localFrame}
          x={item.x}
          y={item.y}
          size={item.size}
          delay={item.delay}
          period={80 + i * 20}
          rotate={i * 15}
        />
      ))}

      {/* Central Organization Block */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 180, // leaves margin for characters and subtitle
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 60,
          zIndex: 3,
        }}
      >
        {/* Title */}
        <div style={{ position: "relative", zIndex: 1, marginTop: -20 }}>
          <AnimatedTitle
            text="Resultado Final!"
            frame={localFrame}
            delay={5}
            color={COLORS.textDark}
            fontSize={64}
            fontWeight={800}
            style={{ opacity: 0.9 }}
          />
        </div>

        {/* Winner card */}
        <div
          style={{
            position: "relative",
            transform: `scale(${winnerScale})`,
            opacity: winnerOpacity,
            zIndex: 3,
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderRadius: 32,
              padding: "48px 80px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
              width: 800,
              borderTop: `8px solid ${COLORS.accent}`,
            }}
          >
            {/* Status Label */}
            <div
              style={{
                background: COLORS.accent,
                borderRadius: 50,
                padding: "10px 40px",
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 800,
                color: "white",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                boxShadow: "0 4px 12px rgba(251,140,0,0.3)",
              }}
            >
              Candidata Eleita
            </div>

            {/* Winner Name */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 72,
                fontWeight: 900,
                color: COLORS.textDark,
                lineHeight: 1.1,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              Maria Silva
            </div>

            {/* Divider */}
            <div style={{ width: "60%", height: 2, background: "#E0E0E0", margin: "10px 0" }} />

            {/* Vote Stats */}
            <div
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 32,
                fontWeight: 800,
                color: COLORS.secondary,
              }}
            >
              312 votos <span style={{ color: "#757575", fontWeight: 600, fontSize: 24 }}>| 41,3%</span>
            </div>

            {/* Additional Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginTop: 10,
              }}
            >
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.textDark,
                  background: "#F5F5F5",
                  padding: "8px 20px",
                  borderRadius: 16,
                }}
              >
                Chapa 01
              </div>
              <div
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 24,
                  color: "#616161",
                  fontWeight: 600,
                }}
              >
                Profª de Matemática
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              zIndex: 4,
              opacity: interpolate(
              spring({ frame: localFrame - 124, fps, config: SPRING_BOUNCE, durationInFrames: 25 }),
                [0, 1], [0, 1]
              ),
            }}
        >
          <div
            style={{
              background: COLORS.textDark,
              color: "white",
              padding: "16px 48px",
              borderRadius: 30,
              fontFamily: FONT_FAMILY,
              fontSize: 28,
              fontWeight: 700,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            A pessoa com mais votos é eleita de forma democrática!
          </div>
        </div>
      </div>

      {/* Community figures - Removed wrapper so absolute positioning inside works */}
      <PersonFigure role="aluno" frame={localFrame} delay={58} x={80} y={860} scale={1.2} slideDir={1} label={false} activity={true} activityStartDelay={10} />
      <PersonFigure role="familia" frame={localFrame} delay={72} x={280} y={880} scale={1.1} slideDir={1} label={false} activity={true} activityStartDelay={10} />
      <PersonFigure role="professor" frame={localFrame} delay={86} x={1540} y={860} scale={1.1} slideDir={-1} label={false} activity={true} activityStartDelay={10} />
      <PersonFigure role="diretor" frame={localFrame} delay={46} x={1760} y={890} scale={1.3} slideDir={-1} label={false} activity={true} activityStartDelay={10} />

      <Subtitle cues={SUBTITLES[8]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
