import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { PersonFigure } from "../components/PersonFigure";
import { COLORS, FONT_FAMILY, SPRING_CONFIG, SPRING_BOUNCE } from "../constants";
import { SUBTITLES } from "../data/subtitles";

/* ── mensagens finais ── */
const CARDS = [
  {
    icon: "🗳️",
    title: "Democrática",
    desc: "A escolha acontece por votação, com regras claras para todos",
    accent: COLORS.primary,
    delay: 24,
  },
  {
    icon: "🤝",
    title: "Participativa",
    desc: "Professores, alunos, famílias, funcionários e comunidade têm voz",
    accent: COLORS.secondary,
    delay: 46,
  },
  {
    icon: "🌟",
    title: "Comunitária",
    desc: "Toda a comunidade escolar colabora nesse processo",
    accent: "#7B1FA2",
    delay: 68,
  },
];

/*
 * Personagens distribuídos igualmente na horizontal.
 *
 * Cálculo: canvas=1920, margens=80px cada lado → espaço útil=1760px
 * Largura visual de cada personagem (scale=1.12): 110×1.12 ≈ 123px
 * Centro visual do personagem: x + 55
 * 5 centros igualmente espaçados em [80+61.5 … 1920-80-61.5] = [141.5 … 1778.5]
 * Passo entre centros: 1637 / 4 ≈ 409px
 * x (borda esquerda do div) = centro - 55
 */
const FIGURES = [
  { role: "aluno",       x: 90,   y: 610, scale: 1.05, delay: 118, dir: -1, activityStartDelay: 12, activityMode: undefined },
  { role: "professor",   x: 410,  y: 610, scale: 1.05, delay: 130, dir: -1, activityStartDelay: 12, activityMode: undefined },
  { role: "funcionario", x: 730,  y: 610, scale: 1.05, delay: 142, dir:  1, activityStartDelay: 14, activityMode: "alternate" as const },
  { role: "familia",     x: 1050, y: 610, scale: 1.05, delay: 154, dir:  1, activityStartDelay: 12, activityMode: undefined },
  { role: "comunidade",  x: 1370, y: 610, scale: 1.05, delay: 166, dir:  1, activityStartDelay: 12, activityMode: undefined },
  { role: "diretor",     x: 1690, y: 610, scale: 1.05, delay: 178, dir:  1, activityStartDelay: 12, activityMode: undefined },
] as const;

export const Scene10Conclusion: React.FC<SceneProps> = ({
  localFrame,
  durationInFrames,
}) => {
  const { fps } = useVideoConfig();

  const gradFrom = "#E3F2FD";
  const gradTo   = "#E8F5E9";

  /* ── entrada do subtítulo ── */
  const subtitleMotion = spring({
    frame: localFrame - 20,
    fps,
    config: SPRING_CONFIG,
    durationInFrames: 22,
  });

  /* ── pill final ── */
  const pillMotion = spring({
    frame: localFrame - (durationInFrames - 80),
    fps,
    config: SPRING_BOUNCE,
    durationInFrames: 36,
  });
  const pillScale   = interpolate(pillMotion, [0, 1], [0.75, 1]);
  const pillOpacity = interpolate(pillMotion, [0, 1], [0, 1]);

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      {/* ══════════ SEÇÃO TOPO — título + subtítulo (centralizado) ══════════ */}
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <AnimatedTitle
          text="A escolha do diretor é democrática!"
          frame={localFrame}
          delay={5}
          color={COLORS.textDark}
          fontSize={64}
          fontWeight={900}
        />

        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: 32,
            fontWeight: 700,
            color: COLORS.primary,
            marginTop: 16,
            opacity:   interpolate(subtitleMotion, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(subtitleMotion, [0, 1], [14, 0])}px)`,
          }}
        >
          Agora você já sabe! 🎉
        </div>
      </div>

      {/* ══════════ SEÇÃO MEIO — 3 cards, mesma largura, alinhados ══════════ */}
      <div
        style={{
          position: "absolute",
          top: 222,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "stretch",       /* todos com a mesma altura */
          gap: 40,
        }}
      >
        {CARDS.map((card, i) => {
          const p = spring({
            frame: localFrame - card.delay,
            fps,
            config: SPRING_CONFIG,
            durationInFrames: 26,
          });
          return (
            <div
              key={i}
              style={{
                opacity:   interpolate(p, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`,
                width: 460,
                display: "flex",          /* permite que o card interno ocupe 100% */
              }}
            >
              {/* card visual — flex:1 garante altura igual entre os 3 */}
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.92)",
                  borderRadius: 24,
                  padding: "28px 30px",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
                  borderTop: `6px solid ${card.accent}`,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {/* ícone + título */}
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <span style={{ fontSize: 44 }}>{card.icon}</span>
                  <span
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontSize: 32,
                      fontWeight: 900,
                      color: card.accent,
                    }}
                  >
                    {card.title}
                  </span>
                </div>

                {/* descrição */}
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#546E7A",
                    lineHeight: 1.45,
                  }}
                >
                  {card.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══════════ SEÇÃO BASE — personagens igualmente distribuídos ══════════ */}
      {FIGURES.map((fig) => (
        <PersonFigure
          key={fig.role}
          role={fig.role}
          frame={localFrame}
          delay={fig.delay}
          x={fig.x}
          y={fig.y}
          scale={fig.scale}
          slideDir={fig.dir}
          label={true}
          activity={true}
          activityStartDelay={fig.activityStartDelay}
          activityMode={fig.activityMode}
        />
      ))}

      {/* ── frase final centralizada abaixo dos personagens ── */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: "50%",
          transform: `translateX(-50%) scale(${pillScale})`,
          opacity: pillOpacity,
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
          color: "white",
          borderRadius: 999,
          padding: "18px 56px",
          fontFamily: FONT_FAMILY,
          fontSize: 30,
          fontWeight: 800,
          whiteSpace: "nowrap",
          boxShadow: "0 8px 32px rgba(30,136,229,0.35)",
          letterSpacing: "0.02em",
        }}
      >
        A escola é de todos nós! ✨
      </div>

      <Subtitle cues={SUBTITLES[9]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
