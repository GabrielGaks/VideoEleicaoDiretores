import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { FloatingEmoji } from "../components/FloatingEmoji";
import { SchoolBuilding } from "../components/SchoolBuilding";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

export const Scene01Intro: React.FC<SceneProps> = ({ localFrame, durationInFrames }) => {
  const { fps } = useVideoConfig();
  const schoolTop = 250;

  // Question mark pulsing
  const questionPulse = 1 + Math.sin(localFrame * 0.08) * 0.04;

  // Subtitle question text entrance
  const questionProgress = spring({
    frame: localFrame - 35,
    fps,
    config: { ...SPRING_CONFIG, damping: 10 },
    durationInFrames: 35,
  });
  const questionOpacity = interpolate(questionProgress, [0, 1], [0, 1]);
  const questionScale = interpolate(questionProgress, [0, 1], [0.7, 1]);

  const [gradFrom, gradTo] = SCENE_GRADIENTS[0];

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      {/* Floating decorative emojis */}
      <FloatingEmoji emoji="📚" frame={localFrame} x={0.08} y={0.18} size={80} delay={20} period={100} />
      <FloatingEmoji emoji="⭐" frame={localFrame} x={0.88} y={0.12} size={70} delay={35} period={80} rotate={15} />
      <FloatingEmoji emoji="🎓" frame={localFrame} x={0.80} y={0.72} size={76} delay={25} period={110} rotate={-10} />
      <FloatingEmoji emoji="✏️" frame={localFrame} x={0.12} y={0.75} size={64} delay={40} period={90} rotate={20} />
      <FloatingEmoji emoji="🏫" frame={localFrame} x={0.50} y={0.06} size={68} delay={15} period={120} />

      {/* School building — centered, upper half */}
      <div
        style={{
          position: "absolute",
          top: schoolTop,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <SchoolBuilding frame={localFrame} delay={5} width={380} />
      </div>

      {/* Main question */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            opacity: questionOpacity,
            transform: `scale(${questionScale * questionPulse})`,
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: 28,
            padding: "28px 60px",
            border: "2px solid rgba(255,255,255,0.3)",
            maxWidth: 1400,
            textAlign: "center",
          }}
        >
          <AnimatedTitle
            text="Como é escolhido o Diretor da Escola?"
            frame={localFrame}
            delay={35}
            color={COLORS.white}
            fontSize={72}
            fontWeight={800}
            style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.4))" }}
          />
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT_FAMILY,
          fontSize: 38,
          fontWeight: 600,
          color: "rgba(255,255,255,0.85)",
          opacity: interpolate(
            spring({ frame: localFrame - 65, fps, config: SPRING_CONFIG, durationInFrames: 25 }),
            [0, 1], [0, 1]
          ),
        }}
      >
        Vamos descobrir juntos! 🎉
      </div>

      <Subtitle cues={SUBTITLES[0]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
