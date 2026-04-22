import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { FloatingEmoji } from "../components/FloatingEmoji";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

const CANDIDATES = [
  { name: "Maria Silva", role: "Profª de Matemática", number: "01", color: "#1E88E5" },
  { name: "João Souza", role: "Prof. de História", number: "02", color: "#43A047" },
  { name: "Ana Lima", role: "Coordenadora Ped.", number: "03", color: "#FB8C00" },
];

export const Scene04Announcement: React.FC<SceneProps> = ({
  localFrame,
  durationInFrames,
}) => {
  const { fps } = useVideoConfig();
  const [gradFrom, gradTo] = SCENE_GRADIENTS[3];

  // Board entrance
  const boardEntrance = spring({
    frame: localFrame - 5,
    fps,
    config: { ...SPRING_CONFIG, damping: 13 },
    durationInFrames: 35,
  });
  const boardScale = interpolate(boardEntrance, [0, 1], [0.7, 1]);
  const boardOpacity = interpolate(boardEntrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      <FloatingEmoji emoji="📣" frame={localFrame} x={0.06} y={0.12} size={80} delay={15} />
      <FloatingEmoji emoji="👀" frame={localFrame} x={0.90} y={0.15} size={72} delay={25} />
      <FloatingEmoji emoji="🔔" frame={localFrame} x={0.88} y={0.78} size={64} delay={35} rotate={20} />
      <FloatingEmoji emoji="📰" frame={localFrame} x={0.08} y={0.78} size={60} delay={40} rotate={-15} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <AnimatedTitle
          text="Divulgação dos Candidatos"
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
            color: COLORS.accent,
            fontWeight: 600,
            opacity: interpolate(
              spring({ frame: localFrame - 20, fps, config: SPRING_CONFIG, durationInFrames: 20 }),
              [0, 1], [0, 1]
            ),
          }}
        >
          Conheça quem está concorrendo!
        </div>
      </div>

      {/* Bulletin board */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: "50%",
          transform: `translateX(-50%) scale(${boardScale})`,
          opacity: boardOpacity,
          transformOrigin: "top center",
        }}
      >
        <svg
          width="1100"
          height="480"
          viewBox="0 0 1100 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Board frame */}
          <rect width="1100" height="480" rx="20" fill="#8D6E63" />
          <rect x="10" y="10" width="1080" height="460" rx="16" fill="#A1887F" />
          {/* Corkboard texture */}
          <rect x="20" y="20" width="1060" height="440" rx="12" fill="#BCAAA4" />

          {/* Header banner */}
          <rect x="20" y="20" width="1060" height="60" rx="12" fill="#1A237E" />
          <text
            x="550"
            y="60"
            textAnchor="middle"
            fontSize="32"
            fontWeight="bold"
            fill="white"
            fontFamily="Nunito, Arial, sans-serif"
          >
            📌 CANDIDATOS INSCRITOS — ELEIÇÃO DO DIRETOR
          </text>

          {/* Candidate cards on board */}
          {CANDIDATES.map((cand, i) => {
            const cardProgress = spring({
              frame: localFrame - (35 + i * 25),
              fps,
              config: { ...SPRING_CONFIG, damping: 8 },
              durationInFrames: 28,
            });
            const cy = interpolate(cardProgress, [0, 1], [-80, 0]);
            const co = interpolate(cardProgress, [0, 1], [0, 1]);
            const cs = interpolate(cardProgress, [0, 1], [0.6, 1]);
            const cx = 90 + i * 330;

            return (
              <g
                key={i}
                transform={`translate(${cx}, ${108}) scale(${cs}) translate(0, ${cy})`}
                opacity={co}
              >
                {/* Card shadow */}
                <rect x="4" y="4" width="280" height="310" rx="14" fill="rgba(0,0,0,0.15)" />
                {/* Card */}
                <rect width="280" height="310" rx="14" fill="white" />
                {/* Color accent top */}
                <rect width="280" height="12" rx="7" fill={cand.color} />
                {/* Number badge */}
                <circle cx="50" cy="65" r="32" fill={cand.color} />
                <text x="50" y="74" textAnchor="middle" fontSize="28" fontWeight="bold" fill="white" fontFamily="Nunito, Arial">
                  {cand.number}
                </text>
                {/* Person icon */}
                <text x="220" y="80" textAnchor="middle" fontSize="48" fontFamily="Arial">
                  👤
                </text>
                {/* Name */}
                <text x="140" y="140" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#1A237E" fontFamily="Nunito, Arial">
                  {cand.name}
                </text>
                {/* Role */}
                <text x="140" y="170" textAnchor="middle" fontSize="20" fill="#546E7A" fontFamily="Nunito, Arial">
                  {cand.role}
                </text>
                {/* Divider */}
                <line x1="30" y1="190" x2="250" y2="190" stroke="#E0E0E0" strokeWidth="1.5" />
                {/* Status */}
                <rect x="60" y="210" width="160" height="40" rx="20" fill={`${cand.color}22`} />
                <text x="140" y="235" textAnchor="middle" fontSize="18" fontWeight="bold" fill={cand.color} fontFamily="Nunito, Arial">
                  ✅ APROVADO
                </text>
                {/* Proposal note */}
                <text x="140" y="276" textAnchor="middle" fontSize="17" fill="#78909C" fontFamily="Nunito, Arial">
                  Programa de gestão
                </text>
                <text x="140" y="295" textAnchor="middle" fontSize="17" fill="#78909C" fontFamily="Nunito, Arial">
                  apresentado
                </text>
                {/* Pushpin */}
                <circle cx="140" cy="-8" r="8" fill="#E53935" />
                <rect x="137" y="-8" width="6" height="14" rx="3" fill="#B71C1C" />
              </g>
            );
          })}
        </svg>
      </div>

      <Subtitle cues={SUBTITLES[3]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
