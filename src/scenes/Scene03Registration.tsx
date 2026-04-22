import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { FloatingEmoji } from "../components/FloatingEmoji";
import { PersonFigure } from "../components/PersonFigure";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

export const Scene03Registration: React.FC<SceneProps> = ({
  localFrame,
  durationInFrames,
}) => {
  const { fps } = useVideoConfig();
  const [gradFrom, gradTo] = SCENE_GRADIENTS[2];
  const requirementRowHeight = 64;

  // Clipboard entrance
  const clipboardEntrance = spring({
    frame: localFrame - 15,
    fps,
    config: SPRING_CONFIG,
    durationInFrames: 35,
  });
  const clipboardScale = interpolate(clipboardEntrance, [0, 1], [0.4, 1]);
  const clipboardOpacity = interpolate(clipboardEntrance, [0, 1], [0, 1]);
  const candidatePanelProgress = spring({
    frame: localFrame - 24,
    fps,
    config: SPRING_CONFIG,
    durationInFrames: 26,
  });
  const candidatePanelOpacity = interpolate(candidatePanelProgress, [0, 1], [0, 1]);
  const candidatePanelY = interpolate(candidatePanelProgress, [0, 1], [26, 0]);

  // Requirements checklist — items appear one by one
  const requirements = [
    "Servidor do magist\u00e9rio atuando em qualquer unidade de ensino",
    "Mínimo 3 anos de atuação",
    "Sem advertências recentes",
    "Aprovação em assembleia",
    "Projeto de gestão apresentado",
  ];
  const displayRequirements = requirements.filter((_req, i) => i !== 3);
  const clipboardBoardHeight =
    164 + Math.max(0, displayRequirements.length - 1) * requirementRowHeight;
  const clipboardSvgHeight = clipboardBoardHeight + 40;

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      <FloatingEmoji emoji="📝" frame={localFrame} x={0.07} y={0.14} size={72} delay={20} />
      <FloatingEmoji emoji="✏️" frame={localFrame} x={0.90} y={0.18} size={64} delay={30} rotate={25} />
      <FloatingEmoji emoji="📄" frame={localFrame} x={0.85} y={0.80} size={60} delay={40} rotate={-15} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <AnimatedTitle
          text="Inscrição dos Candidatos"
          frame={localFrame}
          delay={5}
          color={COLORS.textDark}
          fontSize={68}
          fontWeight={800}
        />
      </div>

      {/* Main content area */}
      <div
        style={{
          position: "absolute",
          top: 150,
          bottom: 130,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1640,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 72,
        }}
      >
        {/* Clipboard SVG + Checklist */}
        <div
          style={{
            transform: `scale(${clipboardScale})`,
            opacity: clipboardOpacity,
            transformOrigin: "top center",
            flexShrink: 0,
          }}
        >
          <svg
            width="340"
            height={clipboardSvgHeight}
            viewBox={`0 0 340 ${clipboardSvgHeight}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Clipboard board */}
            <rect x="10" y="30" width="320" height={clipboardBoardHeight} rx="16" fill="#ECEFF1" />
            <rect x="10" y="30" width="320" height={clipboardBoardHeight} rx="16" stroke="#B0BEC5" strokeWidth="2" />
            {/* Clip */}
            <rect x="130" y="10" width="80" height="40" rx="8" fill="#90A4AE" />
            <rect x="145" y="5" width="50" height="16" rx="8" fill="#78909C" />
            {/* Header */}
            <rect x="30" y="60" width="280" height="50" rx="10" fill={COLORS.secondary} />
            <text x="170" y="93" textAnchor="middle" fontSize="22" fontWeight="bold" fill="white" fontFamily="Nunito, Arial">
              REQUISITOS
            </text>

            {/* Form lines */}
            {displayRequirements.map((req, i) => (
              <g key={i}>
                <rect x="30" y={130 + i * 64} width="280" height="52" rx="8" fill="white" />
                <rect x="30" y={130 + i * 64} width="280" height="52" rx="8" stroke="#E0E0E0" strokeWidth="1.5" />
                {/* Checkbox */}
                <rect x="45" y={144 + i * 64} width="24" height="24" rx="5" fill={COLORS.secondary} opacity={localFrame > 40 + i * 18 ? 1 : 0.2} />
                {localFrame > 40 + i * 18 && (
                  <path
                    d={`M${50},${156 + i * 64} L${56},${164 + i * 64} L${64},${150 + i * 64}`}
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* Requirements text */}
        <div style={{ width: 660, paddingTop: 8 }}>
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 30,
              fontWeight: 700,
              color: COLORS.secondary,
              marginBottom: 24,
              opacity: interpolate(
                spring({ frame: localFrame - 20, fps, config: SPRING_CONFIG, durationInFrames: 20 }),
                [0, 1], [0, 1]
              ),
            }}
          >
            Para se candidatar:
          </div>

          {displayRequirements.map((req, i) => {
            const reqProgress = spring({
              frame: localFrame - (40 + i * 18),
              fps,
              config: SPRING_CONFIG,
              durationInFrames: 20,
            });
            const reqOpacity = interpolate(reqProgress, [0, 1], [0, 1]);
            const reqX = interpolate(reqProgress, [0, 1], [-30, 0]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 18,
                  opacity: reqOpacity,
                  transform: `translateX(${reqX}px)`,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: COLORS.secondary,
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 800,
                    fontFamily: FONT_FAMILY,
                    flexShrink: 0,
                  }}
                >
                  ✓
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 28,
                    fontWeight: 600,
                    color: COLORS.textDark,
                    lineHeight: 1.18,
                    flex: 1,
                  }}
                >
                  {req}
                </div>
              </div>
            );
          })}
        </div>

        {/* Candidate figures */}
        <div
          style={{
            width: 410,
            height: 330,
            opacity: candidatePanelOpacity,
            transform: `translateY(${candidatePanelY}px)`,
            background: "rgba(255,255,255,0.32)",
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.55)",
            boxShadow: "0 12px 34px rgba(77, 107, 80, 0.10)",
            backdropFilter: "blur(8px)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 20,
              left: 0,
              right: 0,
              textAlign: "center",
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              fontWeight: 800,
              color: COLORS.textDark,
            }}
          >
            Perfis aptos a se candidatar
          </div>

          <PersonFigure
            role="professor"
            frame={localFrame}
            delay={36}
            x={55}
            y={105}
            scale={1.26}
            slideDir={-1}
            label={false}
            activity={true}
            activityStartDelay={10}
          />

          <PersonFigure
            role="diretor"
            frame={localFrame}
            delay={52}
            x={245}
            y={105}
            scale={1.26}
            slideDir={1}
            label={false}
            activity={true}
            activityStartDelay={10}
          />

          <div
            style={{
              position: "absolute",
              left: 22,
              right: 22,
              bottom: 18,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 800,
                color: COLORS.secondary,
              }}
            >
              Professor(a)
            </div>
            <div
              style={{
                textAlign: "center",
                fontFamily: FONT_FAMILY,
                fontSize: 24,
                fontWeight: 800,
                color: COLORS.textDark,
              }}
            >
              Diretora(o)
            </div>
          </div>
        </div>
      </div>

      <Subtitle cues={SUBTITLES[2]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
