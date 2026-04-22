import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { FloatingEmoji } from "../components/FloatingEmoji";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

const RESULTS = [
  { name: "Maria Silva", number: "01", votes: 312, color: "#1E88E5", emoji: "👩‍💼" },
  { name: "João Souza", number: "02", votes: 248, color: "#43A047", emoji: "👨‍🏫" },
  { name: "Ana Lima", number: "03", votes: 195, color: "#FB8C00", emoji: "👩‍💻" },
];
const TOTAL_VOTES = 755;

export const Scene08Counting: React.FC<SceneProps> = ({
  localFrame,
  durationInFrames,
}) => {
  const { fps } = useVideoConfig();
  const [gradFrom, gradTo] = SCENE_GRADIENTS[7];

  // Count-up animation timing
  const countStart = 35;
  const countEnd = 140;

  // Total votes counter
  const totalCount = Math.floor(
    interpolate(localFrame, [countStart, countEnd], [0, TOTAL_VOTES], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      <FloatingEmoji emoji="🔢" frame={localFrame} x={0.06} y={0.10} size={72} delay={15} />
      <FloatingEmoji emoji="📊" frame={localFrame} x={0.92} y={0.12} size={68} delay={25} />
      <FloatingEmoji emoji="🔍" frame={localFrame} x={0.88} y={0.80} size={64} delay={40} />
      <FloatingEmoji emoji="⚖️" frame={localFrame} x={0.07} y={0.78} size={60} delay={35} rotate={15} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <AnimatedTitle
          text="Apuração dos Votos"
          frame={localFrame}
          delay={5}
          color={COLORS.textDark}
          fontSize={68}
          fontWeight={800}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            color: "#7B1FA2",
            fontWeight: 600,
            opacity: interpolate(
              spring({ frame: localFrame - 18, fps, config: SPRING_CONFIG, durationInFrames: 20 }),
              [0, 1], [0, 1]
            ),
          }}
        >
          Com total transparência e fiscalização
        </div>
      </div>

      {/* Total votes counter */}
      <div
        style={{
          position: "absolute",
          top: 650,
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          borderRadius: 32,
          padding: "20px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          opacity: interpolate(
            spring({ frame: localFrame - 25, fps, config: SPRING_CONFIG, durationInFrames: 22 }),
            [0, 1], [0, 1]
          ),
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 26,
            fontWeight: 700,
            color: "#546E7A",
          }}
        >
          Total da Parcial:
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 56,
            fontWeight: 900,
            color: "#7B1FA2",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
        >
          {totalCount.toLocaleString("pt-BR")}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 600,
            color: "#90A4AE",
          }}
        >
          votos válidos
        </div>
      </div>

      {/* Bar chart */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 140,
          right: 140,
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        {RESULTS.map((result, i) => {
          const maxVotes = Math.max(...RESULTS.map((r) => r.votes));
          const maxBarWidth = 1300;
          const targetWidth = (result.votes / maxVotes) * maxBarWidth;

          const barProgress = interpolate(
            localFrame,
            [countStart + i * 15, countEnd + i * 10],
            [0, targetWidth],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          const displayVotes = Math.floor(
            interpolate(
              localFrame,
              [countStart + i * 15, countEnd + i * 10],
              [0, result.votes],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          );

          const percentage = Math.round((result.votes / TOTAL_VOTES) * 100);
          const displayPercentage = Math.floor(
            interpolate(
              localFrame,
              [countStart + i * 15, countEnd + i * 10],
              [0, percentage],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )
          );

          const rowEntrance = spring({
            frame: localFrame - (25 + i * 15),
            fps,
            config: SPRING_CONFIG,
            durationInFrames: 25,
          });
          const rowOpacity = interpolate(rowEntrance, [0, 1], [0, 1]);
          const rowY = interpolate(rowEntrance, [0, 1], [30, 0]);

          return (
            <div
              key={i}
              style={{
                opacity: rowOpacity,
                transform: `translateY(${rowY}px)`,
              }}
            >
              {/* Candidate label row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: result.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "white",
                    fontFamily: FONT_FAMILY,
                    flexShrink: 0,
                  }}
                >
                  {result.number}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.textDark,
                  }}
                >
                  {result.emoji} {result.name}
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    fontFamily: FONT_FAMILY,
                    fontSize: 28,
                    fontWeight: 800,
                    color: result.color,
                  }}
                >
                  {displayVotes.toLocaleString("pt-BR")} votos ({displayPercentage}%)
                </div>
              </div>

              {/* Bar */}
              <div
                style={{
                  height: 44,
                  background: "#E8EAF6",
                  borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: "inset 0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: barProgress,
                    background: `linear-gradient(90deg, ${result.color}cc, ${result.color})`,
                    borderRadius: 22,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingRight: 12,
                    transition: "none",
                  }}
                >
                  {barProgress > 60 && (
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: 18,
                        fontWeight: 700,
                        color: "white",
                        opacity: 0.9,
                      }}
                    >
                      {displayPercentage}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparency badge */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: "50%",
          transform: "translateX(-50%)",
          background: COLORS.secondary,
          color: "white",
          borderRadius: 20,
          padding: "14px 40px",
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          fontWeight: 700,
          opacity: interpolate(
            spring({ frame: localFrame - 80, fps, config: SPRING_CONFIG, durationInFrames: 22 }),
            [0, 1], [0, 1]
          ),
          whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(67,160,71,0.4)",
        }}
      >
        🔍 Apuração pública e verificada por fiscais
      </div>

      <Subtitle cues={SUBTITLES[7]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
