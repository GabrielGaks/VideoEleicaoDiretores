import React from "react";
import { AbsoluteFill, interpolate, spring, useVideoConfig } from "remotion";
import type { SceneProps } from "../types";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { Subtitle } from "../components/Subtitle";
import { PersonFigure } from "../components/PersonFigure";
import { COLORS, FONT_FAMILY, SCENE_GRADIENTS, SPRING_CONFIG } from "../constants";
import { SUBTITLES } from "../data/subtitles";

/* ═══════════════════════════════════════════════════════════════
   URNA ELETRÔNICA BRASILEIRA — layout horizontal
   Tela à esquerda · Teclado numérico à direita
   Candidatos válidos: 10, 20, 30   Data: 19 de maio
   ═══════════════════════════════════════════════════════════════ */
const UrnaEletronica: React.FC<{ frame: number; delay: number }> = ({ frame, delay }) => {
  const f = Math.max(0, frame - delay);

  // Fases: 0=aguardando 1=tela ativa 2=1º dígito 3=2º dígito 4=confirmado
  const fase = f < 38 ? 0 : f < 62 ? 1 : f < 82 ? 2 : f < 102 ? 3 : 4;
  const d1 = fase >= 2 ? "1" : "";
  const d2 = fase >= 3 ? "0" : "";
  const cursor = fase < 4 && Math.floor(f / 14) % 2 === 0 ? "▌" : "";
  const glow = fase >= 4 ? 0.5 + Math.sin((f - 102) * 0.22) * 0.5 : 0;

  // Dimensões
  const W = 620, H = 348;
  const SCR_W = 310; // largura da seção de tela
  const KP_X = 324; // início da seção do teclado

  // Posicionamento dos botões
  const kX = (c: number) => KP_X + 18 + c * 84;
  const kY = (r: number) => 16 + r * 62;
  const kW = 72, kH = 50;
  const CF_W = kX(2) + kW - kX(0); // largura do CONFIRMA

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      {/* Sombra */}
      <ellipse cx={W / 2} cy={H + 10} rx={W / 2 - 20} ry="11" fill="rgba(0,0,0,0.18)" />

      {/* ── CORPO ── cor bege-cinza da urna real */}
      <rect x="0" y="0" width={W} height={H} rx="20" fill="#D5D2BF" />
      <rect x="2" y="2" width={W - 4} height="38" rx="18" fill="rgba(255,255,255,0.22)" />
      <rect x="2" y={H - 16} width={W - 4} height="14" rx="10" fill="rgba(0,0,0,0.07)" />

      {/* ══════════ TELA (esquerda) ══════════ */}
      {/* Bezel */}
      <rect x="12" y="12" width={SCR_W} height={H - 24} rx="11" fill="#111827" />
      {/* Superfície */}
      <rect x="18" y="18" width={SCR_W - 12} height={H - 36} rx="7" fill="#060D1C" />

      {/* Barra de cabeçalho */}
      <rect x="18" y="18" width={SCR_W - 12} height="34" rx="7" fill="#0D1E6E" />
      <text
        x={18 + (SCR_W - 12) / 2} y="40"
        textAnchor="middle" fill="#90CAF9"
        fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5"
      >
        JUSTIÇA ELEITORAL
      </text>

      {/* ── Conteúdo da tela ── */}
      {fase === 0 ? (
        <text
          x={18 + (SCR_W - 12) / 2} y="170"
          textAnchor="middle" fill="#374151"
          fontSize="12" fontFamily="monospace"
        >
          Aguardando votante...
        </text>
      ) : (
        <>
          {/* Cabeçalho da eleição */}
          <text x="26" y="76" fill="#B0BEC5" fontSize="9.5" fontFamily="monospace" fontWeight="bold">
            ELEIÇÃO ESCOLAR — 19 DE MAIO
          </text>
          <line x1="22" y1="83" x2={SCR_W + 4} y2="83" stroke="#111D3C" strokeWidth="1" />
          <text x="26" y="100" fill="#607D8B" fontSize="9" fontFamily="monospace">
            CANDIDATO A DIRETOR(A):
          </text>

          {/* Display de número */}
          <rect x="24" y="108" width={SCR_W - 18} height="66" rx="6" fill="#0A1628" stroke="#1565C0" strokeWidth="1.5" />
          <text
            x={24 + (SCR_W - 18) / 2} y="157"
            textAnchor="middle"
            fill="#64B5F6"
            fontSize="52" fontFamily="monospace" fontWeight="bold" letterSpacing="18"
          >
            {d1}{d2}{cursor}
          </text>

          {/* Dica: candidatos disponíveis */}
          {fase < 4 && (
            <text x="26" y="194" fill="#37474F" fontSize="8.5" fontFamily="monospace">
              Candidatos válidos: 10 · 20 · 30
            </text>
          )}

          {/* Estado confirmado */}
          {fase >= 4 && (
            <>
              <line x1="22" y1="186" x2={SCR_W + 4} y2="186" stroke="#111D3C" strokeWidth="1" />
              <text x="26" y="205" fill="#66BB6A" fontSize="10" fontFamily="monospace" fontWeight="bold">
                ✓ CANDIDATO ENCONTRADO
              </text>
              <text x="26" y="222" fill="#A5D6A7" fontSize="10.5" fontFamily="monospace">
                Nº 10 — Candidato 1
              </text>
              <rect x="24" y="232" width={SCR_W - 18} height="34" rx="5" fill="#0D2B0D" stroke="#2E7D32" strokeWidth="1" />
              <text
                x={24 + (SCR_W - 18) / 2} y="254"
                textAnchor="middle" fill="#81C784"
                fontSize="10" fontFamily="monospace" fontWeight="bold"
              >
                Pressione CONFIRMA para votar
              </text>
            </>
          )}
        </>
      )}

      {/* ── Separador ── */}
      <rect x={KP_X - 4} y="12" width="3" height={H - 24} rx="1" fill="rgba(0,0,0,0.14)" />

      {/* ══════════ TECLADO (direita) ══════════ */}
      <rect x={KP_X} y="12" width={W - KP_X - 12} height={H - 24} rx="10" fill="#C2BFA8" />

      {/* Botões 1–9 */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const bx = kX(col), by = kY(row);
        return (
          <g key={n}>
            <rect x={bx} y={by + 3} width={kW} height={kH} rx="7" fill="rgba(0,0,0,0.22)" />
            <rect x={bx} y={by} width={kW} height={kH} rx="7" fill="#222222" stroke="#111" strokeWidth="0.5" />
            <rect x={bx + 2} y={by + 1} width={kW - 4} height="14" rx="5" fill="rgba(255,255,255,0.09)" />
            <text x={bx + kW / 2} y={by + kH / 2 + 9} textAnchor="middle" fill="white" fontSize="24" fontFamily="Arial, sans-serif" fontWeight="bold">{n}</text>
          </g>
        );
      })}

      {/* BRANCO */}
      <g>
        <rect x={kX(0)} y={kY(3) + 3} width={kW} height={kH} rx="7" fill="rgba(0,0,0,0.15)" />
        <rect x={kX(0)} y={kY(3)} width={kW} height={kH} rx="7" fill="#ECECEC" stroke="#AAAAAA" strokeWidth="1" />
        <text x={kX(0) + kW / 2} y={kY(3) + kH / 2 + 5} textAnchor="middle" fill="#333" fontSize="9" fontFamily="monospace" fontWeight="bold">BRANCO</text>
      </g>

      {/* 0 */}
      <g>
        <rect x={kX(1)} y={kY(3) + 3} width={kW} height={kH} rx="7" fill="rgba(0,0,0,0.22)" />
        <rect x={kX(1)} y={kY(3)} width={kW} height={kH} rx="7" fill="#222222" stroke="#111" strokeWidth="0.5" />
        <rect x={kX(1) + 2} y={kY(3) + 1} width={kW - 4} height="14" rx="5" fill="rgba(255,255,255,0.09)" />
        <text x={kX(1) + kW / 2} y={kY(3) + kH / 2 + 9} textAnchor="middle" fill="white" fontSize="24" fontFamily="Arial, sans-serif" fontWeight="bold">0</text>
      </g>

      {/* CORRIGE */}
      <g>
        <rect x={kX(2)} y={kY(3) + 3} width={kW} height={kH} rx="7" fill="rgba(0,0,0,0.22)" />
        <rect x={kX(2)} y={kY(3)} width={kW} height={kH} rx="7" fill="#C62300" stroke="#FF6D00" strokeWidth="0.8" />
        <text x={kX(2) + kW / 2} y={kY(3) + kH / 2 + 5} textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">CORRIGE</text>
      </g>

      {/* CONFIRMA — largura total, verde com brilho */}
      <g>
        <rect x={kX(0)} y={kY(4) + 3} width={CF_W} height={kH} rx="7" fill="rgba(0,0,0,0.22)" />
        <rect
          x={kX(0)} y={kY(4)} width={CF_W} height={kH} rx="7"
          fill={`rgba(27,94,32,${0.75 + glow * 0.25})`}
          stroke={`rgba(102,187,106,${0.3 + glow * 0.7})`}
          strokeWidth="1.5"
        />
        <rect x={kX(0) + 2} y={kY(4) + 1} width={CF_W - 4} height="14" rx="5" fill={`rgba(255,255,255,${0.05 + glow * 0.07})`} />
        <text x={kX(0) + CF_W / 2} y={kY(4) + kH / 2 + 7} textAnchor="middle" fill="white" fontSize="12" fontFamily="monospace" fontWeight="bold" letterSpacing="3">
          CONFIRMA
        </text>
      </g>
    </svg>
  );
};

/* ═══════════════════════════════════════════════
   CENA
   ═══════════════════════════════════════════════ */
const STEPS = [
  { icon: "🪪", label: "Identifique-se", color: COLORS.primary, delay: 52 },
  { icon: "🔢", label: "Digite o número", color: COLORS.secondary, delay: 68 },
  { icon: "✅", label: "Pressione CONFIRMA", color: "#2E7D32", delay: 84 },
];

// urna: 620px wide (landscape). centered in 1920: left = (1920 - 620) / 2 = 650
const URNA_LEFT = 650;

export const Scene07Voting: React.FC<SceneProps> = ({ localFrame }) => {
  const { fps } = useVideoConfig();
  const [gradFrom, gradTo] = SCENE_GRADIENTS[6];

  /* entrada da urna */
  const urnaP = spring({ frame: localFrame - 12, fps, config: SPRING_CONFIG, durationInFrames: 32 });
  const urnaOpacity = interpolate(urnaP, [0, 1], [0, 1]);
  const urnaY = interpolate(urnaP, [0, 1], [28, 0]);
  const urnaScale = interpolate(urnaP, [0, 1], [0.88, 1]);

  /* badge VOTO SECRETO */
  const badgeP = spring({ frame: localFrame - 118, fps, config: { ...SPRING_CONFIG, damping: 9 }, durationInFrames: 26 });
  const badgeScale = interpolate(badgeP, [0, 1], [0, 1]);
  const badgePulse = 1 + Math.sin(localFrame * 0.09) * 0.04;

  return (
    <AbsoluteFill>
      <Background colorFrom={gradFrom} colorTo={gradTo} frame={localFrame} />

      {/* ════════════ TOP ════════════ */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          zIndex: 2,
        }}
      >
        <AnimatedTitle
          text="Dia da Votação"
          frame={localFrame}
          delay={5}
          color={COLORS.textDark}
          fontSize={72}
          fontWeight={800}
        />

        {/* Data da eleição */}
        <div
          style={{
            transform: `scale(${interpolate(
              spring({ frame: localFrame - 18, fps, config: SPRING_CONFIG, durationInFrames: 22 }),
              [0, 1], [0, 1]
            )})`,
            opacity: interpolate(
              spring({ frame: localFrame - 18, fps, config: SPRING_CONFIG, durationInFrames: 22 }),
              [0, 1], [0, 1]
            ),
            transformOrigin: "center center",
            background: "rgba(255,255,255,0.9)",
            borderRadius: 999,
            padding: "12px 32px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 26 }}>📅</span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              fontWeight: 800,
              color: COLORS.textDark,
            }}
          >
            Dia da eleição:
          </span>
          <span
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: 26,
              fontWeight: 900,
              color: COLORS.primary,
            }}
          >
            19 de maio
          </span>
        </div>
      </div>

      {/* Badge VOTO SECRETO — canto superior direito, alinhado com o título */}
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 80,
          transform: `scale(${badgeScale * badgePulse})`,
          transformOrigin: "right center",
          background: "#C62828",
          color: "white",
          borderRadius: 22,
          padding: "16px 32px",
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          fontWeight: 800,
          boxShadow: "0 6px 24px rgba(198,40,40,0.3)",
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 26 }}>🔒</span>
        <span>VOTO SECRETO</span>
      </div>

      {/* ════════════ CENTER ════════════ */}
      {/* Esquerda: 3 personagens — comunidade, familia, professor */}
      <PersonFigure role="comunidade" frame={localFrame} delay={30} x={105} y={520} scale={1.05} slideDir={1} label={false} activity={true} activityStartDelay={12} />
      <PersonFigure role="familia" frame={localFrame} delay={44} x={305} y={520} scale={1.1} slideDir={1} label={false} activity={true} activityStartDelay={12} />
      <PersonFigure role="professor" frame={localFrame} delay={58} x={505} y={520} scale={1.1} slideDir={1} label={false} activity={true} activityStartDelay={12} />

      {/* Urna centralizada exatamente (1920-620)/2 = 650 */}
      <div
        style={{
          position: "absolute",
          top: 340,
          left: 650,
          opacity: urnaOpacity,
          transform: `translateY(${urnaY}px) scale(${urnaScale})`,
          transformOrigin: "top center",
          zIndex: 5,
        }}
      >
        {/* Glow de destaque leve atrás da urna */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 800,
            height: 500,
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(ellipse at center, rgba(255, 240, 180, 0.5) 0%, rgba(255, 255, 255, 0) 70%)",
            opacity: 0.4 + 0.3 * Math.sin(localFrame * 0.06),
            zIndex: -1,
            pointerEvents: "none",
          }}
        />
        <UrnaEletronica frame={localFrame} delay={12} />
      </div>

      {/* Direita: 2 personagens perfeitamente balanceados */}
      <PersonFigure role="aluno" frame={localFrame} delay={48} x={1295} y={520} scale={1.15} slideDir={-1} label={false} activity={true} activityStartDelay={12} />
      <PersonFigure role="funcionario" frame={localFrame} delay={64} x={1495} y={520} scale={1.15} slideDir={-1} label={false} activity={true} activityStartDelay={14} activityMode="alternate" />

      {/* ════════════ BOTTOM ════════════ */}
      {/* 3 cards em linha na mesma base horizontal e dimensões padronizadas */}
      <div
        style={{
          position: "absolute",
          bottom: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 32,
        }}
      >
        {STEPS.map((step, i) => {
          const p = spring({ frame: localFrame - step.delay, fps, config: SPRING_CONFIG, durationInFrames: 22 });
          const floatIdle = Math.max(0, localFrame - step.delay - 22);
          const floatY = Math.sin(floatIdle * 0.05 + i * 1.5) * 8; // subtle floating idle

          return (
            <div
              key={i}
              style={{
                opacity: interpolate(p, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(p, [0, 1], [20, 0]) + floatY}px) scale(${interpolate(p, [0, 1], [0.9, 1])})`,
                background: "rgba(255,255,255,0.95)",
                borderRadius: 24,
                width: 450,
                height: 100,
                padding: "0 32px",
                boxShadow: "0 14px 42px rgba(0,0,0,0.04)",
                borderTop: `6px solid ${step.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: step.color,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  fontWeight: 900,
                  fontFamily: FONT_FAMILY,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <span style={{ fontSize: 32 }}>{step.icon}</span>
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  fontWeight: 800,
                  color: COLORS.textDark,
                  whiteSpace: "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Subtitle bottom padrao */}
      <Subtitle cues={SUBTITLES[6]} localFrame={localFrame} />
    </AbsoluteFill>
  );
};
