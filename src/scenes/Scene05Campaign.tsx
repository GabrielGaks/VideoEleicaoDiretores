import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { PersonFigure, type PersonRole } from "../components/PersonFigure";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

/* ─── layout constants ─── */
const COL_W = 560;
const LEFT_X = 80;
const RIGHT_X = 1920 - 80 - COL_W; // 1280
const FIGURE_Y = 430;
const FIGURE_SCALE = 1.38;
const PROFESSOR_FIG_X = LEFT_X + COL_W / 2 - 55;   // centered in left column
const DIRETOR_FIG_X   = RIGHT_X + COL_W / 2 - 55;   // centered in right column

type ProposalItem = { icon: string; text: string };
type CandidateConfig = {
  role: PersonRole;
  figureX: number;
  figureDelay: number;
  slideDir: 1 | -1;
  accent: string;
  speechDelay: number;
  speechLines: string[];
  proposalDelay: number;
  proposals: ProposalItem[];
  align: "left" | "right";
  colLeft: number;
};

const candidates: CandidateConfig[] = [
  {
    role: "professor",
    figureX: PROFESSOR_FIG_X,
    figureDelay: 18,
    slideDir: -1,
    accent: COLORS.secondary,
    speechDelay: 28,
    speechLines: [
      '"Quero transformar nossa escola',
      'em um lugar melhor',
      'para todos aprenderem!"',
    ],
    proposalDelay: 52,
    proposals: [
      { icon: "📚", text: "Mais livros" },
      { icon: "🌱", text: "Horta escolar" },
      { icon: "💻", text: "Laboratório de TI" },
    ],
    align: "left",
    colLeft: LEFT_X,
  },
  {
    role: "diretor",
    figureX: DIRETOR_FIG_X,
    figureDelay: 40,
    slideDir: 1,
    accent: COLORS.textDark,
    speechDelay: 44,
    speechLines: [
      '"Gestão participativa,',
      'projetos inovadores e',
      'escola para todos!"',
    ],
    proposalDelay: 66,
    proposals: [
      { icon: "🏗️", text: "Reforma das salas" },
      { icon: "🤝", text: "Gestão coletiva" },
      { icon: "🎨", text: "Arte e cultura" },
    ],
    align: "right",
    colLeft: RIGHT_X,
  },
];

/* ─── helpers ─── */
const useEntrance = (frame: number, fps: number, delay: number, fromY = 20) => {
  const p = spring({ frame: frame - delay, fps, config: SPRING_CONFIG, durationInFrames: 26 });
  return {
    opacity:    interpolate(p, [0, 1], [0, 1]),
    translateY: interpolate(p, [0, 1], [fromY, 0]),
    scale:      interpolate(p, [0, 1], [0.93, 1]),
  };
};

/* ─── sub-components ─── */
const SpeechCard: React.FC<{
  lines: string[];
  accent: string;
  motion: ReturnType<typeof useEntrance>;
}> = ({ lines, accent, motion }) => (
  <div
    style={{
      opacity: motion.opacity,
      transform: `translateY(${motion.translateY}px) scale(${motion.scale})`,
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.95)",
        borderRadius: 24,
        padding: "24px 32px 28px",
        boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
        borderTop: `5px solid ${accent}`,
      }}
    >
      {lines.map((line) => (
        <div
          key={line}
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 30,
            fontWeight: 800,
            lineHeight: 1.25,
            color: COLORS.textDark,
            textAlign: "center",
          }}
        >
          {line}
        </div>
      ))}
    </div>
  </div>
);

const ProposalPanel: React.FC<{
  accent: string;
  proposals: ProposalItem[];
  motion: ReturnType<typeof useEntrance>;
}> = ({ accent, proposals, motion }) => (
  <div
    style={{
      opacity: motion.opacity,
      transform: `translateY(${motion.translateY}px) scale(${motion.scale})`,
    }}
  >
    <div
      style={{
        background: "rgba(255,255,255,0.88)",
        borderRadius: 22,
        padding: "20px 24px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: 20,
          fontWeight: 900,
          color: accent,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: 14,
        }}
      >
        Principais propostas
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {proposals.map((p) => (
          <div
            key={p.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 14px",
              borderRadius: 14,
              background: `${accent}0e`,
            }}
          >
            <span style={{ fontSize: 22 }}>{p.icon}</span>
            <span
              style={{
                fontFamily: FONT_FAMILY,
                fontSize: 26,
                fontWeight: 700,
                color: COLORS.textDark,
              }}
            >
              {p.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── scene ─── */
export const Scene05Campaign: React.FC<SceneProps> = ({ localFrame }) => {
  const { fps } = useVideoConfig();
  const [gradFrom, gradTo] = SCENE_GRADIENTS[4];

  const centerMotion = useEntrance(localFrame, fps, 30, 18);

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <AnimatedTitle
          text="Período de Campanha"
          frame={localFrame}
          delay={5}
          color={COLORS.textDark}
          fontSize={66}
          fontWeight={900}
        />
      </div>

      {/* ── candidates ── */}
      {candidates.map((c) => {
        const speechM   = useEntrance(localFrame, fps, c.speechDelay, 18);
        const proposalM = useEntrance(localFrame, fps, c.proposalDelay, 18);

        return (
          <React.Fragment key={c.role}>
            {/* Speech card */}
            <div style={{ position: "absolute", top: 155, left: c.colLeft, width: COL_W }}>
              <SpeechCard lines={c.speechLines} accent={c.accent} motion={speechM} />
            </div>

            {/* Figure */}
            <PersonFigure
              role={c.role}
              frame={localFrame}
              delay={c.figureDelay}
              x={c.figureX}
              y={FIGURE_Y}
              scale={FIGURE_SCALE}
              slideDir={c.slideDir}
              label={true}
              activity={true}
            />

            {/* Proposals */}
            <div style={{ position: "absolute", top: 670, left: c.colLeft, width: COL_W }}>
              <ProposalPanel accent={c.accent} proposals={c.proposals} motion={proposalM} />
            </div>
          </React.Fragment>
        );
      })}

      {/* ── VS center card ── */}
      <div
        style={{
          position: "absolute",
          top: 430,
          left: "50%",
          transform: `translateX(-50%) translateY(${centerMotion.translateY}px) scale(${centerMotion.scale})`,
          opacity: centerMotion.opacity,
          width: 340,
          background: "rgba(255,255,255,0.92)",
          borderRadius: 32,
          boxShadow: "0 12px 36px rgba(0,0,0,0.10)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "28px 24px",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 16,
            fontWeight: 900,
            color: "#AD1457",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Debate de ideias
        </div>

        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #C2185B 0%, #AD1457 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 900,
            color: COLORS.white,
            boxShadow: "0 10px 24px rgba(173,20,87,0.28)",
          }}
        >
          VS
        </div>

        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 700,
            color: COLORS.textDark,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          A comunidade observa,
          <br />
          compara e participa
        </div>
      </div>

      <Subtitle cues={SUBTITLES[4]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
