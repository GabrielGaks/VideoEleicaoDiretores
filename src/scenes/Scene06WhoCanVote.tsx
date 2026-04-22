import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { FloatingEmoji } from "../components/FloatingEmoji";
import { PersonFigure, type PersonRole } from "../components/PersonFigure";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

type Role = PersonRole;

const VOTER_GROUPS: {
  role: Role;
  title: string;
  detail: string;
  color: string;
}[] = [
    {
      role: "aluno",
      title: "Alunos",
      detail: "A partir de 10 anos",
      color: COLORS.primary,
    },
    {
      role: "professor",
      title: "Professores",
      detail: "Todos os docentes",
      color: COLORS.secondary,
    },
    {
      role: "funcionario",
      title: "Funcionários",
      detail: "Servidores da escola",
      color: "#7B1FA2",
    },
    {
      role: "familia",
      title: "Famílias",
      detail: "Pais e responsáveis",
      color: COLORS.danger,
    },
    {
      role: "comunidade",
      title: "Comunidade",
      detail: "Representante local",
      color: "#00897B",
    },
  ];

const VoterCard: React.FC<{
  group: typeof VOTER_GROUPS[number];
  i: number;
  localFrame: number;
  fps: number;
}> = ({ group, i, localFrame, fps }) => {
  const delay = 18 + i * 22;
  const cardProgress = spring({
    frame: localFrame - delay,
    fps,
    config: { ...SPRING_CONFIG, damping: 11 },
    durationInFrames: 30,
  });
  const cardScale = interpolate(cardProgress, [0, 1], [0.76, 1]);
  const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
  const cardY = interpolate(cardProgress, [0, 1], [36, 0]);

  return (
    <div
      style={{
        flex: 1,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        opacity: cardOpacity,
        background: "rgba(255,255,255,0.96)",
        borderRadius: 24,
        padding: "18px 22px",
        display: "grid",
        gridTemplateColumns: "150px 1fr",
        alignItems: "center",
        gap: 14,
        boxShadow: "0 10px 34px rgba(0,0,0,0.08)",
        borderLeft: `10px solid ${group.color}`,
      }}
    >
      <div
        style={{
          position: "relative",
          width: 150,
          height: 170,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "14px 20px 14px",
            borderRadius: "50%",
            background: `${group.color}12`,
          }}
        />
        <PersonFigure
          role={group.role}
          frame={localFrame}
          delay={delay}
          x={27}
          y={-2}
          scale={0.88}
          slideDir={i % 2 === 0 ? -1 : 1}
          label={false}
          activity={true}
          activityStartDelay={12}
          activityMode={group.role === "funcionario" ? "alternate" : "auto"}
        />
      </div>

      <div
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            fontWeight: 800,
            color: group.color,
            lineHeight: 1.1,
          }}
        >
          {group.title}
        </div>
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 22,
            fontWeight: 600,
            color: "#546E7A",
            lineHeight: 1.2,
          }}
        >
          {group.detail}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              background: `${group.color}16`,
              borderRadius: 12,
              padding: "6px 12px",
              fontFamily: FONT_FAMILY,
              fontSize: 18,
              fontWeight: 700,
              color: group.color,
              border: `1px solid ${group.color}18`,
            }}
          >
            {"\u2705"} Tem direito a voto
          </div>
        </div>
      </div>
    </div>
  );
};

export const Scene06WhoCanVote: React.FC<SceneProps> = ({ localFrame }) => {
  const { fps } = useVideoConfig();
  const [gradFrom, gradTo] = SCENE_GRADIENTS[5];

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      <FloatingEmoji emoji={"\u{1F5F3}\uFE0F"} frame={localFrame} x={0.06} y={0.10} size={72} delay={15} />
      <FloatingEmoji emoji={"\u{1F3DB}\uFE0F"} frame={localFrame} x={0.92} y={0.12} size={64} delay={30} />
      <FloatingEmoji emoji={"\u{1F932}"} frame={localFrame} x={0.88} y={0.82} size={58} delay={45} />

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
          text="A Votação - Quem Pode Participar?"
          frame={localFrame}
          delay={5}
          color={COLORS.textDark}
          fontSize={68}
          fontWeight={800}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 34,
            color: "#3949AB",
            fontWeight: 600,
            opacity: interpolate(
              spring({
                frame: localFrame - 20,
                fps,
                config: SPRING_CONFIG,
                durationInFrames: 20,
              }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          Várias pessoas da comunidade participam da decisão!
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 170,
          bottom: 130,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "0 70px",
        }}
      >
        {/* Linha 1: 3 cards */}
        <div style={{ display: "flex", gap: 20, width: "100%" }}>
          {VOTER_GROUPS.slice(0, 3).map((group, i) => (
            <VoterCard key={group.role} group={group} i={i} localFrame={localFrame} fps={fps} />
          ))}
        </div>
        {/* Linha 2: 2 cards centralizados com mesma largura dos da linha 1 */}
        <div style={{ display: "flex", gap: 20, width: "100%", justifyContent: "center" }}>
          {VOTER_GROUPS.slice(3).map((group, i) => (
            <div key={group.role} style={{ flex: "0 0 calc((100% - 40px) / 3)" }}>
              <VoterCard group={group} i={i + 3} localFrame={localFrame} fps={fps} />
            </div>
          ))}
        </div>
      </div>

      <Subtitle cues={SUBTITLES[5]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
