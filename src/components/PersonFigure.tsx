import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { staticFile } from "remotion";
import { SPRING_CONFIG } from "../constants";

export type PersonRole =
  | "aluno"
  | "professor"
  | "funcionario"
  | "familia"
  | "diretor"
  | "comunidade";

export type PersonActivityMode = "auto" | "wave" | "alternate" | "neutral";

interface RoleConfig {
  skinBase: string;
  bodyColor: string;
  pantsColor: string;
  shoeColor: string;
  hairColor: string;
  label: string;
  faceHighlight?: string;
  faceShadow?: string;
  cheekColor?: string;
  cheekOpacity?: number;
  eyebrowColor?: string;
  accessoryBack: React.ReactNode;
  accessoryChest: React.ReactNode;
  accessoryTop: React.ReactNode;
  clothingDetail: React.ReactNode;
  faceDetail: React.ReactNode;
}

const CONFIGS: Record<PersonRole, RoleConfig> = {
  aluno: {
    skinBase: "#FFCC80",
    bodyColor: "#FFFFFF",
    pantsColor: "#1A237E",
    shoeColor: "#37474F",
    hairColor: "#4E342E",
    label: "Aluno",
    accessoryBack: (
      <g>
        <rect x="17" y="-44" width="18" height="26" rx="6" fill="#FB8C00" />
        <rect x="18" y="-48" width="16" height="7" rx="4" fill="#E65100" />
        <rect x="19" y="-38" width="14" height="2.5" rx="1.2" fill="#E65100" />
        <rect x="19" y="-32" width="14" height="2.5" rx="1.2" fill="#E65100" />
      </g>
    ),
    accessoryChest: null,
    accessoryTop: null,
    clothingDetail: (
      <g>
        {/* collar navy trim */}
        <path d="M-12,-54 Q0,-61 12,-54" stroke="#1565C0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* chest brasão Vitória */}
        <image href={staticFile("brasao-vitoria.png")} x={-11} y={-43} width={14} height={14} />
      </g>
    ),
    faceDetail: null,
  },
  professor: {
    skinBase: "#FFCCBC",
    bodyColor: "#43A047",
    pantsColor: "#2E7D32",
    shoeColor: "#37474F",
    hairColor: "#5D4037",
    label: "Professor(a)",
    accessoryBack: null,
    accessoryChest: null,
    accessoryTop: (
      <g>
        <ellipse cx="0" cy="-94" rx="18" ry="5.5" fill="#1A237E" />
        <path d="M-22,-94 Q0,-112 22,-94" fill="#1A237E" />
        <line
          x1="18"
          y1="-97"
          x2="25"
          y2="-85"
          stroke="#FFD600"
          strokeWidth="2"
        />
        <circle cx="25" cy="-83" r="3.5" fill="#FFD600" />
      </g>
    ),
    clothingDetail: (
      <g>
        <path
          d="M-7,-47 L0,-39 L7,-47"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    ),
    faceDetail: (
      <g>
        <circle
          cx="-7"
          cy="-73"
          r="5.8"
          stroke="#5D4037"
          strokeWidth="1.8"
          fill="rgba(200,230,255,0.15)"
        />
        <circle
          cx="7"
          cy="-73"
          r="5.8"
          stroke="#5D4037"
          strokeWidth="1.8"
          fill="rgba(200,230,255,0.15)"
        />
        <line
          x1="-1.2"
          y1="-73"
          x2="1.2"
          y2="-73"
          stroke="#5D4037"
          strokeWidth="1.8"
        />
        <line
          x1="-22"
          y1="-71"
          x2="-12.8"
          y2="-72.5"
          stroke="#5D4037"
          strokeWidth="1.5"
        />
        <line
          x1="12.8"
          y1="-72.5"
          x2="22"
          y2="-71"
          stroke="#5D4037"
          strokeWidth="1.5"
        />
      </g>
    ),
  },
  funcionario: {
    skinBase: "#FFE0B2",
    bodyColor: "#7B1FA2",
    pantsColor: "#4A148C",
    shoeColor: "#37474F",
    hairColor: "#3E2723",
    label: "Funcionário(a)",
    accessoryBack: null,
    accessoryChest: null,
    accessoryTop: (
      <g>
        <path d="M-25,-91 Q0,-113 25,-91" fill="#FB8C00" />
        <rect x="-25" y="-95" width="50" height="8" rx="3.5" fill="#E65100" />
        <path
          d="M-23,-92 Q0,-80 23,-92"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    ),
    clothingDetail: (
      <g>
        <path
          d="M-7,-47 L-3,-41 L0,-43 L3,-41 L7,-47"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="-14"
          y="-37"
          width="12"
          height="10"
          rx="2.5"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.30)"
          strokeWidth="1.2"
        />
      </g>
    ),
    faceDetail: null,
  },
  familia: {
    skinBase: "#F8BBD0",
    bodyColor: "#E53935",
    pantsColor: "#B71C1C",
    shoeColor: "#37474F",
    hairColor: "#6D4C41",
    label: "Família",
    accessoryBack: null,
    accessoryChest: (
      <g>
        <path
          d="M0,-28 C-2,-34 -11,-34 -11,-26 C-11,-18 0,-12 0,-12 C0,-12 11,-18 11,-26 C11,-34 2,-34 0,-28 Z"
          fill="#FF5252"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
      </g>
    ),
    accessoryTop: null,
    clothingDetail: (
      <g>
        <path
          d="M-8,-47 Q0,-53 8,-47"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M-6,-47 L-1,-43 L0,-45 L1,-43 L6,-47 Z" fill="rgba(255,255,255,0.30)" />
      </g>
    ),
    faceDetail: null,
  },
  diretor: {
    skinBase: "#9C623E",
    bodyColor: "#1A237E",
    pantsColor: "#0D1650",
    shoeColor: "#212121",
    hairColor: "#221715",
    label: "Diretora(o)",
    faceHighlight: "rgba(255,255,255,0)",
    faceShadow: "rgba(46,20,8,0.12)",
    cheekColor: "#B97352",
    cheekOpacity: 0.52,
    eyebrowColor: "#221715",
    accessoryBack: null,
    accessoryChest: (
      <g>
        <polygon
          points="0,-97 3,-89 11,-89 5,-84 7,-76 0,-81 -7,-76 -5,-84 -11,-89 -3,-89"
          fill="#FFD600"
          stroke="#FFA000"
          strokeWidth="0.8"
        />
      </g>
    ),
    accessoryTop: null,
    clothingDetail: (
      <g>
        {/* blazer left side shadow for volume */}
        <path d="M-20,-44 C-25,-36 -25,-20 -20,-6 C-17,-12 -19,-28 -17,-40 Z" fill="rgba(0,0,0,0.10)" />
        {/* blazer right highlight */}
        <path d="M20,-44 C25,-36 25,-20 20,-6 C17,-12 19,-28 17,-40 Z" fill="rgba(255,255,255,0.07)" />

        {/* white blouse showing through lapels */}
        <path d="M-9,-47 L-3,-28 L0,-34" fill="rgba(255,255,255,0.92)" />
        <path d="M9,-47 L3,-28 L0,-34"  fill="rgba(255,255,255,0.92)" />
        {/* lapel edges */}
        <path d="M-9,-47 L-3,-28 L0,-34 L3,-28 L9,-47" stroke="#0D1650" strokeWidth="1.2" fill="none" strokeLinejoin="round" />

        {/* blazer buttons */}
        <circle cx="0" cy="-22" r="1.8" fill="rgba(255,255,255,0.38)" />
        <circle cx="0" cy="-14" r="1.8" fill="rgba(255,255,255,0.38)" />
        <circle cx="0" cy="-6"  r="1.8" fill="rgba(255,255,255,0.38)" />

        {/* matching navy skirt: waistband */}
        <path d="M-21,-6 Q0,-1 21,-6 L20,1 Q0,6 -20,1 Z" fill="#0D1650" />
        {/* skirt body */}
        <path d="M-20,1 Q0,6 20,1 L23,28 L-23,28 Z" fill="#1A237E" />
        {/* skirt right highlight */}
        <path d="M13,2 L17,28 L15,28 L11,3 Z" fill="rgba(255,255,255,0.10)" />
        {/* skirt left shadow */}
        <path d="M-20,1 L-19,3 L-22,28 L-23,28 Z" fill="rgba(0,0,0,0.14)" />
        {/* skirt fold creases */}
        <line x1="-7"  y1="4"  x2="-8"  y2="28" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="3"   y1="3"  x2="3"   y2="28" stroke="rgba(0,0,0,0.08)"        strokeWidth="1.2" strokeLinecap="round" />
        {/* skirt hem */}
        <line x1="-23" y1="28" x2="23"  y2="28" stroke="#0D1650" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    ),
    faceDetail: (
      <path d="M-8,-62 Q0,-55 8,-62" stroke="#B5673A" strokeWidth="2.2" strokeOpacity="0.55" fill="none" strokeLinecap="round" />
    ),
  },
  comunidade: {
    skinBase: "#FFE0B2",
    bodyColor: "#00897B",
    pantsColor: "#00695C",
    shoeColor: "#37474F",
    hairColor: "#4E342E",
    label: "Comunidade",
    accessoryBack: null,
    accessoryChest: (
      <g>
        <rect x="-2" y="-52" width="4" height="12" rx="2" fill="rgba(255,255,255,0.5)" />
        <rect x="-9" y="-40" width="18" height="14" rx="2.5" fill="rgba(255,255,255,0.88)" stroke="rgba(0,0,0,0.10)" strokeWidth="0.8" />
        <rect x="-7" y="-38" width="8" height="4" rx="1" fill="#00695C" />
        <line x1="-7" y1="-31" x2="7" y2="-31" stroke="#90A4AE" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="-7" y1="-28" x2="3" y2="-28" stroke="#90A4AE" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    ),
    accessoryTop: null,
    clothingDetail: (
      <g>
        <path
          d="M-8,-47 Q0,-52 8,-47"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    ),
    faceDetail: null,
  },
};

function renderHair(role: PersonRole, hairColor: string): React.ReactNode {
  const hc = hairColor;
  switch (role) {
    case "aluno":
      return (
        <g>
          <ellipse cx="0" cy="-90" rx="20" ry="9" fill={hc} />
          <path
            d="M-20,-84 Q-18,-104 -10,-97 Q-5,-110 0,-100 Q5,-110 10,-97 Q18,-104 20,-84"
            fill={hc}
          />
        </g>
      );
    case "professor":
      return (
        <g>
          <ellipse cx="0" cy="-91" rx="20" ry="9" fill={hc} />
          <path d="M-20,-84 Q-22,-94 0,-98 Q22,-94 20,-84" fill={hc} />
          <path
            d="M-21,-83 Q-26,-74 -24,-62"
            stroke={hc}
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    case "funcionario":
      return (
        <g>
          <ellipse cx="0" cy="-91" rx="19" ry="8" fill={hc} />
          <path d="M-19,-84 Q-21,-93 0,-97 Q21,-93 19,-84" fill={hc} />
        </g>
      );
    case "familia":
      return (
        <g>
          <path
            d="M-23,-60
               C-26,-51 -27,-39 -27,-24
               C-27,-21 -25,-17 -21,-14
               C-14,-16 -7,-17 0,-17
               C7,-17 14,-16 21,-14
               C25,-17 27,-21 27,-24
               C27,-39 26,-51 23,-60
               C17,-56 10,-53 0,-53
               C-10,-53 -17,-56 -23,-60 Z"
            fill={hc}
          />
          <path
            d="M-22,-63
               C-24,-55 -24,-46 -23,-37
               C-22,-31 -20,-26 -17,-22
               C-15,-23 -13,-24 -11,-24
               C-13,-29 -14,-35 -15,-43
               C-16,-51 -18,-58 -22,-63 Z"
            fill="rgba(0,0,0,0.14)"
          />
          <path
            d="M22,-63
               C24,-55 24,-46 23,-37
               C22,-31 20,-26 17,-22
               C15,-23 13,-24 11,-24
               C13,-29 14,-35 15,-43
               C16,-51 18,-58 22,-63 Z"
            fill="rgba(0,0,0,0.14)"
          />
          <path
            d="M-22,-63
               C-24,-55 -24,-46 -23,-37
               C-22,-31 -20,-26 -17,-22
               C-11,-23 -5,-24 0,-24
               C5,-24 11,-23 17,-22
               C20,-26 22,-31 23,-37
               C24,-46 24,-55 22,-63
               C18,-58 16,-51 15,-43
               C14,-37 14,-31 15,-27
               C10,-28 5,-29 0,-29
               C-5,-29 -10,-28 -15,-27
               C-14,-31 -14,-37 -15,-43
               C-16,-51 -18,-58 -22,-63 Z"
            fill={hc}
          />
          <path
            d="M-16,-60
               C-17,-52 -17,-44 -16,-36
               C-15,-31 -13,-26 -11,-22"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M16,-60
               C17,-52 17,-44 16,-36
               C15,-31 13,-26 11,-22"
            stroke="rgba(0,0,0,0.12)"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-12,-25 Q-6,-27 0,-27 Q6,-27 12,-25"
            stroke="rgba(0,0,0,0.10)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    case "diretor":
      return (
        <g>
          {/* fill base so no gaps between rows */}
          <ellipse cx="0" cy="-93" rx="23" ry="8"  fill={hc} />
          <ellipse cx="0" cy="-98" rx="18" ry="7" fill={hc} />
        </g>
      );
    case "comunidade":
      return (
        <g>
          <ellipse cx="0" cy="-91" rx="19" ry="8" fill={hc} />
          <path d="M-19,-84 Q-21,-93 0,-97 Q21,-93 19,-84" fill={hc} />
        </g>
      );
  }
}

function renderBackHair(_role: PersonRole, _hairColor: string): React.ReactNode {
  return null;
}

function renderFrontHair(role: PersonRole, hairColor: string): React.ReactNode {
  const hc = hairColor;

  switch (role) {
    case "familia":
      return (
        <g>
          <path
            d="M0,-95
               A23 23 0 0 0 -21,-63
               C-20,-68 -16,-74 -10,-79
               C-7,-82 -4,-88 0,-95 Z"
            fill={hc}
          />
          <path
            d="M-2,-94
               C-5,-89 -8,-84 -11,-79
               C-14,-74 -17,-69 -19,-64"
            stroke="rgba(0,0,0,0.16)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M0,-95
               A23 23 0 0 1 21,-63
               C20,-68 16,-74 10,-79
               C7,-82 4,-88 0,-95 Z"
            fill={hc}
          />
          <path
            d="M2,-94
               C5,-89 8,-84 11,-79
               C14,-74 17,-69 19,-64"
            stroke="rgba(0,0,0,0.16)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-2,-94 C-5,-90 -7,-86 -8,-82"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M2,-94 C5,-90 7,-86 8,-82"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      );
    case "diretor":
      return (
        <g>
          {/* row 1 — hairline arc */}
          <circle cx="-14" cy="-85" r="5"   fill={hc} />
          <circle cx="-10" cy="-88" r="5"   fill={hc} />
          <circle cx="-5"  cy="-89" r="5"   fill={hc} />
          <circle cx="0"   cy="-90" r="5"   fill={hc} />
          <circle cx="5"   cy="-89" r="5"   fill={hc} />
          <circle cx="10"  cy="-88" r="5"   fill={hc} />
          <circle cx="14"  cy="-85" r="5"   fill={hc} />
          {/* row 2 — upper cap arc */}
          <circle cx="-21" cy="-86" r="5.5" fill={hc} />
          <circle cx="-14" cy="-92" r="5.5" fill={hc} />
          <circle cx="-5"  cy="-96" r="5.5" fill={hc} />
          <circle cx="5"   cy="-96" r="5.5" fill={hc} />
          <circle cx="14"  cy="-92" r="5.5" fill={hc} />
          <circle cx="21"  cy="-86" r="5.5" fill={hc} />
          {/* row 3 — crown */}
          <circle cx="-14" cy="-98" r="6"  fill={hc} />
          <circle cx="0"   cy="-101" r="6"  fill={hc} />
          <circle cx="14"  cy="-98" r="6"  fill={hc} />
        </g>
      );
    default:
      return null;
  }
}

function renderDirectorEyelashes(
  eyeOpen: number,
  strokeColor = "#221715"
): React.ReactNode {
  const lashLineY = interpolate(eyeOpen, [0.2, 1], [-74.1, -76.4]);
  const lashCurveY = interpolate(eyeOpen, [0.2, 1], [-74.9, -79.1]);
  const lashEndY = interpolate(eyeOpen, [0.2, 1], [-74.2, -76.6]);
  const outerBaseY = interpolate(eyeOpen, [0.2, 1], [-75.0, -77.8]);
  const outerTipY = interpolate(eyeOpen, [0.2, 1], [-76.3, -80.6]);
  const innerBaseY = interpolate(eyeOpen, [0.2, 1], [-75.3, -78.8]);
  const innerTipY = interpolate(eyeOpen, [0.2, 1], [-76.6, -81.6]);

  return (
    <g>
      <path
        d={`M-11.6,${lashLineY} Q-7.1,${lashCurveY} -2.2,${lashEndY}`}
        stroke={strokeColor}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M-11.6,${outerBaseY} L-14.1,${outerTipY}`}
        stroke={strokeColor}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M-7.2,${innerBaseY} L-8.1,${innerTipY}`}
        stroke={strokeColor}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M2.2,${lashEndY} Q7.1,${lashCurveY} 11.6,${lashLineY}`}
        stroke={strokeColor}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M11.6,${outerBaseY} L14.1,${outerTipY}`}
        stroke={strokeColor}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={`M7.2,${innerBaseY} L8.1,${innerTipY}`}
        stroke={strokeColor}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function activityBlend(f: number, len: number): number {
  const raise = Math.floor(len * 0.25);
  const lower = Math.floor(len * 0.25);
  const action = len - raise - lower;
  return interpolate(
    f,
    [0, raise, raise + action, len],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
}

type ArmPose = {
  armEndX: number;
  armEndY: number;
  elbowX: number;
  elbowY: number;
};

type ActivityGesture =
  | "none"
  | "wave"
  | "gesture"
  | "touch-glasses"
  | "adjust-hair"
  | "arms-up"
  | "cross-arms"
  | "adjust-badge";

const ENTRANCE_FRAMES = 45;
const STABILIZE_FRAMES = 18;

const ACTIVITY_LENGTHS: Record<PersonRole, number> = {
  professor: 95,
  aluno: 130,
  diretor: 85,
  familia: 110,
  funcionario: 120,
  comunidade: 100,
};

const ACTIVITY_PAUSES: Record<PersonRole, number> = {
  professor: 40,
  aluno: 48,
  diretor: 38,
  familia: 24,
  funcionario: 42,
  comunidade: 38,
};

// 0 = start on characteristic, 1 = start on wave — staggers so not all wave at once
const WAVE_CYCLE_PHASE: Record<PersonRole, number> = {
  aluno: 0,
  professor: 1,
  diretor: 0,
  familia: 1,
  funcionario: 0,
  comunidade: 1,
};

function mix(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

function resolveAutoGesture(role: PersonRole): ActivityGesture {
  switch (role) {
    case "professor":
      return "touch-glasses";
    case "aluno":
      return "gesture";
    case "diretor":
      return "adjust-hair";
    case "familia":
      return "arms-up";
    case "funcionario":
      return "cross-arms";
    case "comunidade":
      return "adjust-badge";
  }
}

function getWavePose(
  frame: number,
  length: number,
  baseEnd: { x: number; y: number },
  baseElbow: { x: number; y: number },
  targetEnd: { x: number; y: number },
  targetElbow: { x: number; y: number },
  wobbleAmplitude: number
): ArmPose {
  const raise = Math.max(1, Math.floor(length * 0.22));
  const lower = Math.max(1, Math.floor(length * 0.22));
  const holdEnd = Math.max(raise + 1, length - lower);

  if (frame < raise) {
    const t = frame / raise;
    return {
      armEndX: mix(baseEnd.x, targetEnd.x, t),
      armEndY: mix(baseEnd.y, targetEnd.y, t),
      elbowX: mix(baseElbow.x, targetElbow.x, t),
      elbowY: mix(baseElbow.y, targetElbow.y, t),
    };
  }

  if (frame < holdEnd) {
    const wobble = Math.sin((frame - raise) * 0.28) * wobbleAmplitude;
    return {
      armEndX: targetEnd.x + wobble,
      armEndY: targetEnd.y,
      elbowX: targetElbow.x + wobble * 0.45,
      elbowY: targetElbow.y,
    };
  }

  const t = (frame - holdEnd) / Math.max(1, length - holdEnd);
  return {
    armEndX: mix(targetEnd.x, baseEnd.x, t),
    armEndY: mix(targetEnd.y, baseEnd.y, t),
    elbowX: mix(targetElbow.x, baseElbow.x, t),
    elbowY: mix(targetElbow.y, baseElbow.y, t),
  };
}

interface PersonFigureProps {
  role: PersonRole;
  frame: number;
  delay?: number;
  x: number;
  y: number;
  scale?: number;
  slideDir?: 1 | -1;
  label?: boolean;
  activity?: boolean;
  activityStartDelay?: number;
  activityMode?: PersonActivityMode;
  activityCycleDelay?: number;
}

export const PersonFigure: React.FC<PersonFigureProps> = ({
  role,
  frame,
  delay = 0,
  x,
  y,
  scale = 1,
  slideDir = 1,
  label = true,
  activity = false,
  activityStartDelay = 0,
  activityMode = "auto",
  activityCycleDelay,
}) => {
  const { fps } = useVideoConfig();
  const cfg = CONFIGS[role];

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: SPRING_CONFIG,
    durationInFrames: ENTRANCE_FRAMES,
  });
  const translateX = interpolate(entrance, [0, 1], [slideDir * 80, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const figScale = interpolate(entrance, [0, 1], [0.88, 1]);

  const ANIM_MODS: Record<
    PersonRole,
    {
      sway: number;
      bob: number;
      lean: number;
      arm: number;
      waveMod: number;
      lookAmp: number;
    }
  > = {
    aluno: { sway: 0.55, bob: 0.9, lean: 0.4, arm: 0.65, waveMod: 0.75, lookAmp: 0.8 },
    professor: { sway: 0.1, bob: 0.5, lean: 0.1, arm: 0.22, waveMod: 0.52, lookAmp: 1.05 },
    funcionario: { sway: 0.16, bob: 0.36, lean: 0.18, arm: 0.2, waveMod: 0.62, lookAmp: 0.95 },
    familia: { sway: 0.42, bob: 0.6, lean: 0.3, arm: 0.42, waveMod: 0.68, lookAmp: 0.68 },
    diretor: { sway: 0.07, bob: 0.42, lean: 0.08, arm: 0.2, waveMod: 0.58, lookAmp: 1.0 },
    comunidade: { sway: 0.22, bob: 0.55, lean: 0.15, arm: 0.3, waveMod: 0.6, lookAmp: 0.9 },
  };
  const animMod = ANIM_MODS[role];

  const postEntranceFrames = Math.max(0, frame - delay - ENTRANCE_FRAMES);
  const settledFrames = Math.max(0, postEntranceFrames - STABILIZE_FRAMES);
  const motionProgress = interpolate(
    postEntranceFrames,
    [0, STABILIZE_FRAMES],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const idleWave = settledFrames * 0.026 * animMod.waveMod;
  const idleSway = Math.sin(idleWave * 0.7) * 1.2 * animMod.sway * motionProgress;
  const idleBob = Math.cos(idleWave * 0.9) * 1.0 * animMod.bob * motionProgress;
  const bodyLean = Math.sin(idleWave * 0.5) * 0.55 * animMod.lean * motionProgress;
  const armSwing = Math.sin(idleWave * 1.05) * 1.4 * animMod.arm * motionProgress;
  const forearmSwing =
    Math.cos(idleWave * 1.05) * 1.0 * animMod.arm * motionProgress;
  const legSwing = Math.sin(idleWave * 0.8) * 1.0 * animMod.lean * motionProgress;
  const footLift =
    Math.max(0, Math.sin(idleWave * 0.8)) * 0.55 * animMod.lean * motionProgress;

  const blinkWindow = settledFrames % 180;
  const eyeOpen = blinkWindow > 12 && blinkWindow < 20 ? 0.2 : 1;

  const leftArmEnd = { x: -31 - armSwing, y: -16 + forearmSwing };
  const rightArmEnd = { x: 31 + armSwing, y: -16 - forearmSwing };
  const leftLegEnd = { x: -12 - legSwing, y: 44 - footLift };
  const rightLegEnd = { x: 12 + legSwing, y: 44 + footLift };
  const leftElbow = { x: -22 - armSwing * 0.45, y: -24 + forearmSwing * 0.55 };
  const rightElbow = { x: 22 + armSwing * 0.45, y: -24 - forearmSwing * 0.55 };
  const leftKnee = { x: -10 - legSwing * 0.35, y: 24 - footLift * 0.3 };
  const rightKnee = { x: 10 + legSwing * 0.35, y: 24 + footLift * 0.3 };

  const ROLE_OFFSET: Record<PersonRole, number> = {
    aluno: 0,
    professor: 80,
    funcionario: 155,
    familia: 38,
    diretor: 115,
    comunidade: 200,
  };
  const rOff = ROLE_OFFSET[role];

  const actLen = ACTIVITY_LENGTHS[role];
  const cyclePause = activityCycleDelay ?? ACTIVITY_PAUSES[role];
  const cycleWindow = actLen + cyclePause;
  const activityFrames = postEntranceFrames - STABILIZE_FRAMES - activityStartDelay;
  const canRunActivity = activity && activityFrames >= 0;
  const actLoopF = canRunActivity ? activityFrames % cycleWindow : cycleWindow;
  const actCycle = canRunActivity ? Math.floor(activityFrames / cycleWindow) : 0;
  const isActivityActive = canRunActivity && actLoopF < actLen;

  const resolvedActivityMode: PersonActivityMode = !activity
    ? "neutral"
    : activityMode === "auto" && role === "funcionario"
      ? "alternate"
      : activityMode;

  let activeGesture: ActivityGesture = "none";
  if (isActivityActive) {
    switch (resolvedActivityMode) {
      case "neutral":
        activeGesture = "none";
        break;
      case "wave":
        activeGesture = "wave";
        break;
      case "alternate":
        activeGesture =
          actCycle % 2 === 0 ? "wave" : resolveAutoGesture(role);
        break;
      case "auto": {
        const phase = WAVE_CYCLE_PHASE[role];
        const isWaveCycle = (actCycle + phase) % 2 === 1;
        activeGesture = isWaveCycle ? "wave" : resolveAutoGesture(role);
        break;
      }
    }
  }

  const WAVE_PERIOD = 480;
  const WAVE_LEN = 90;
  const waveF = (settledFrames + rOff) % WAVE_PERIOD;
  const waving = !activity && settledFrames > 0 && waveF < WAVE_LEN;

  let rArmEndX = rightArmEnd.x;
  let rArmEndY = rightArmEnd.y;
  let rElbX = rightElbow.x;
  let rElbY = rightElbow.y;

  if (waving) {
    const idleWavePose = getWavePose(
      waveF,
      WAVE_LEN,
      rightArmEnd,
      rightElbow,
      { x: 26, y: -66 },
      { x: 18, y: -52 },
      6
    );
    rArmEndX = idleWavePose.armEndX;
    rArmEndY = idleWavePose.armEndY;
    rElbX = idleWavePose.elbowX;
    rElbY = idleWavePose.elbowY;
  }

  const LOOK_PERIOD = 340;
  const LOOK_LEN = 65;
  const lookF = (settledFrames + rOff * 1.4 + 150) % LOOK_PERIOD;
  const headLookX =
    (lookF < LOOK_LEN
      ? Math.sin((lookF / LOOK_LEN) * Math.PI) * (6 * animMod.lookAmp)
      : 0) * motionProgress;

  const BOUNCE_PERIOD = 980;
  const BOUNCE_LEN = 40;
  const bounceF = (settledFrames + rOff * 0.85 + 210) % BOUNCE_PERIOD;
  const bounceY =
    (bounceF < BOUNCE_LEN ? -Math.abs(Math.sin(bounceF * 0.24)) * 3.5 : 0) *
    motionProgress;

  const liftL =
    (bounceF < BOUNCE_LEN ? Math.abs(Math.sin(bounceF * 0.24)) * 1.5 : 0) *
    motionProgress;
  let lArmEndX = leftArmEnd.x - liftL * 0.3;
  let lArmEndY = leftArmEnd.y - liftL;
  let lElbX = leftElbow.x - liftL * 0.2;
  let lElbY = leftElbow.y - liftL * 0.5;

  let glassesShiftX = 0;
  let tieShiftX = 0;
  let badgeShiftX = 0;
  if (activeGesture === "touch-glasses") {
    const gb = activityBlend(actLoopF, actLen);
    rArmEndX += interpolate(gb, [0, 1], [0, 10 - rightArmEnd.x]);
    rArmEndY += interpolate(gb, [0, 1], [0, -68 - rightArmEnd.y]);
    rElbX += interpolate(gb, [0, 1], [0, 16 - rightElbow.x]);
    rElbY += interpolate(gb, [0, 1], [0, -50 - rightElbow.y]);
    const aStart = Math.floor(actLen * 0.25);
    const aEnd = Math.floor(actLen * 0.75);
    if (actLoopF >= aStart && actLoopF < aEnd) {
      glassesShiftX = Math.sin((actLoopF - aStart) * 0.5) * 1.5;
    }
  } else if (activeGesture === "wave") {
    const wavePose = getWavePose(
      actLoopF,
      actLen,
      rightArmEnd,
      rightElbow,
      { x: 26, y: -64 },
      { x: 18, y: -50 },
      6
    );
    rArmEndX = wavePose.armEndX;
    rArmEndY = wavePose.armEndY;
    rElbX = wavePose.elbowX;
    rElbY = wavePose.elbowY;
  } else if (activeGesture === "gesture") {
    const gb = activityBlend(actLoopF, actLen);
    const aStart = Math.floor(actLen * 0.25);
    const aEnd = Math.floor(actLen * 0.75);
    const pulse =
      actLoopF >= aStart && actLoopF < aEnd
        ? Math.sin((actLoopF - aStart) * 0.35) * 5
        : 0;
    lArmEndX += interpolate(gb, [0, 1], [0, -18 - leftArmEnd.x]);
    lArmEndY += interpolate(gb, [0, 1], [0, -38 - leftArmEnd.y]) - pulse * 0.5;
    lElbX += interpolate(gb, [0, 1], [0, -24 - leftElbow.x]);
    lElbY += interpolate(gb, [0, 1], [0, -36 - leftElbow.y]);
    rArmEndX += interpolate(gb, [0, 1], [0, 18 - rightArmEnd.x]);
    rArmEndY += interpolate(gb, [0, 1], [0, -38 - rightArmEnd.y]) + pulse * 0.5;
    rElbX += interpolate(gb, [0, 1], [0, 24 - rightElbow.x]);
    rElbY += interpolate(gb, [0, 1], [0, -36 - rightElbow.y]);
  } else if (activeGesture === "adjust-hair") {
    const ah = activityBlend(actLoopF, actLen);
    rArmEndX += interpolate(ah, [0, 1], [0, 6  - rightArmEnd.x]);
    rArmEndY += interpolate(ah, [0, 1], [0, -80 - rightArmEnd.y]);
    rElbX    += interpolate(ah, [0, 1], [0, 28  - rightElbow.x]);
    rElbY    += interpolate(ah, [0, 1], [0, -54 - rightElbow.y]);
  } else if (activeGesture === "arms-up") {
    const signX = actCycle % 2 === 0 ? 1 : -1;
    const wavePose = getWavePose(
      actLoopF,
      actLen,
      signX === 1 ? rightArmEnd : leftArmEnd,
      signX === 1 ? rightElbow : leftElbow,
      { x: 26 * signX, y: -64 },
      { x: 18 * signX, y: -50 },
      7
    );
    if (signX === 1) {
      rArmEndX = wavePose.armEndX;
      rArmEndY = wavePose.armEndY;
      rElbX = wavePose.elbowX;
      rElbY = wavePose.elbowY;
    } else {
      lArmEndX = wavePose.armEndX;
      lArmEndY = wavePose.armEndY;
      lElbX = wavePose.elbowX;
      lElbY = wavePose.elbowY;
    }
  } else if (activeGesture === "cross-arms") {
    const cb = activityBlend(actLoopF, actLen);
    lArmEndX += interpolate(cb, [0, 1], [0, 10 - leftArmEnd.x]);
    lArmEndY += interpolate(cb, [0, 1], [0, -28 - leftArmEnd.y]);
    lElbX += interpolate(cb, [0, 1], [0, -2 - leftElbow.x]);
    lElbY += interpolate(cb, [0, 1], [0, -32 - leftElbow.y]);
    rArmEndX += interpolate(cb, [0, 1], [0, -10 - rightArmEnd.x]);
    rArmEndY += interpolate(cb, [0, 1], [0, -28 - rightArmEnd.y]);
    rElbX += interpolate(cb, [0, 1], [0, 2 - rightElbow.x]);
    rElbY += interpolate(cb, [0, 1], [0, -32 - rightElbow.y]);
  } else if (activeGesture === "adjust-badge") {
    const ab = activityBlend(actLoopF, actLen);
    rArmEndX += interpolate(ab, [0, 1], [0, 4  - rightArmEnd.x]);
    rArmEndY += interpolate(ab, [0, 1], [0, -34 - rightArmEnd.y]);
    rElbX    += interpolate(ab, [0, 1], [0, 12 - rightElbow.x]);
    rElbY    += interpolate(ab, [0, 1], [0, -40 - rightElbow.y]);
    const aStart = Math.floor(actLen * 0.25);
    const aEnd   = Math.floor(actLen * 0.75);
    if (actLoopF >= aStart && actLoopF < aEnd)
      badgeShiftX = Math.sin((actLoopF - aStart) * 0.35) * 1.8;
  }

  const eyebrowRaise = waving && waveF > 18 && waveF < 70 ? -3.5 : 0;

  const sk = cfg.skinBase;
  const bc = cfg.bodyColor;
  const pc = cfg.pantsColor;
  const sc = cfg.shoeColor;
  const faceHighlight = cfg.faceHighlight ?? "rgba(255,255,255,0.13)";
  const faceShadow = cfg.faceShadow ?? "rgba(0,0,0,0.04)";
  const cheekColor = cfg.cheekColor ?? "#F48FB1";
  const cheekOpacity = cfg.cheekOpacity ?? 0.42;
  const eyebrowColor = cfg.eyebrowColor ?? "#5D4037";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translateX(${translateX + idleSway}px) translateY(${idleBob + bounceY}px) rotate(${bodyLean}deg) scale(${figScale * scale})`,
        opacity,
        transformOrigin: "bottom center",
      }}
    >
      <svg
        width="110"
        height="168"
        viewBox="-55 -112 110 168"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="0" cy="54" rx="30" ry="5.5" fill="rgba(0,0,0,0.10)" />

        {cfg.accessoryBack}
        {renderBackHair(role, cfg.hairColor)}
        {role === "familia" && (
          <g transform={`translate(${headLookX}, 0)`}>
            {renderHair(role, cfg.hairColor)}
          </g>
        )}

        <path
          d={`M-7,10 Q${leftKnee.x},${leftKnee.y} ${leftLegEnd.x},${leftLegEnd.y}`}
          stroke={pc}
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M-6,12 Q${leftKnee.x + 1.5},${leftKnee.y + 1} ${leftLegEnd.x + 1.5},${leftLegEnd.y}`}
          stroke="rgba(0,0,0,0.09)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M7,10 Q${rightKnee.x},${rightKnee.y} ${rightLegEnd.x},${rightLegEnd.y}`}
          stroke={pc}
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M8,12 Q${rightKnee.x + 1.5},${rightKnee.y + 1} ${rightLegEnd.x + 1.5},${rightLegEnd.y}`}
          stroke="rgba(0,0,0,0.09)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d={`M${leftLegEnd.x - 13},${leftLegEnd.y + 1} Q${leftLegEnd.x - 1},${leftLegEnd.y - 7} ${leftLegEnd.x + 13},${leftLegEnd.y + 1} Q${leftLegEnd.x + 5},${leftLegEnd.y + 8} ${leftLegEnd.x - 11},${leftLegEnd.y + 6} Z`}
          fill={sc}
        />
        <path
          d={`M${leftLegEnd.x - 9},${leftLegEnd.y - 1} Q${leftLegEnd.x},${leftLegEnd.y - 6} ${leftLegEnd.x + 8},${leftLegEnd.y - 1}`}
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M${rightLegEnd.x - 13},${rightLegEnd.y + 1} Q${rightLegEnd.x - 1},${rightLegEnd.y - 7} ${rightLegEnd.x + 13},${rightLegEnd.y + 1} Q${rightLegEnd.x + 5},${rightLegEnd.y + 8} ${rightLegEnd.x - 11},${rightLegEnd.y + 6} Z`}
          fill={sc}
        />
        <path
          d={`M${rightLegEnd.x - 9},${rightLegEnd.y - 1} Q${rightLegEnd.x},${rightLegEnd.y - 6} ${rightLegEnd.x + 8},${rightLegEnd.y - 1}`}
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />

        <path
          d={`
            M-20,-44
            C-18,-56 -9,-61 0,-61
            C9,-61 18,-56 20,-44
            C25,-36 25,-20 20,-6
            C18,2 12,12 0,12
            C-12,12 -18,2 -20,-6
            C-25,-20 -25,-36 -20,-44
            Z
          `}
          fill={bc}
        />
        <path
          d="M-20,-44 C-25,-36 -25,-20 -20,-6"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20,-44 C25,-36 25,-20 20,-6"
          stroke="rgba(0,0,0,0.08)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="-4" cy="-38" rx="10" ry="8" fill="rgba(255,255,255,0.10)" />

        <path
          d="M-20,-6 C-25,-20 -20,-6 -20,-6 L20,-6 C20,-6 25,-20 20,-6 C18,2 12,12 0,12 C-12,12 -18,2 -20,-6 Z"
          fill={pc}
          opacity="0.85"
        />
        <path
          d="M-20,-6 Q0,-2 20,-6"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {cfg.clothingDetail}
        {role === "diretor" && (
          <g transform={`translate(${tieShiftX}, 0)`}>
            <circle cx="-7"  cy="-52" r="2.1" fill="#F5F5F5" stroke="#BDBDBD" strokeWidth="0.5" />
            <circle cx="-4"  cy="-54" r="2.1" fill="#F5F5F5" stroke="#BDBDBD" strokeWidth="0.5" />
            <circle cx="-1"  cy="-55" r="2.1" fill="#F5F5F5" stroke="#BDBDBD" strokeWidth="0.5" />
            <circle cx="2"   cy="-55" r="2.1" fill="#F5F5F5" stroke="#BDBDBD" strokeWidth="0.5" />
            <circle cx="5"   cy="-54" r="2.1" fill="#F5F5F5" stroke="#BDBDBD" strokeWidth="0.5" />
            <circle cx="8"   cy="-52" r="2.1" fill="#F5F5F5" stroke="#BDBDBD" strokeWidth="0.5" />
          </g>
        )}
        {role === "comunidade" ? (
          <g transform={`translate(${badgeShiftX}, 0)`}>{cfg.accessoryChest}</g>
        ) : cfg.accessoryChest}

        <path
          d={`M-15,-42 Q${lElbX},${lElbY} ${lArmEndX},${lArmEndY}`}
          stroke={bc}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M-15,-42 Q${lElbX - 1},${lElbY - 2} ${lArmEndX - 2},${lArmEndY - 3}`}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx={lArmEndX} cy={lArmEndY} rx="6.2" ry="6.8" fill={sk} />
        <ellipse cx={lArmEndX - 1} cy={lArmEndY - 3} rx="3" ry="2" fill="rgba(0,0,0,0.06)" />

        <path
          d={`M15,-42 Q${rElbX},${rElbY} ${rArmEndX},${rArmEndY}`}
          stroke={bc}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M15,-42 Q${rElbX + 1},${rElbY - 2} ${rArmEndX + 2},${rArmEndY - 3}`}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx={rArmEndX} cy={rArmEndY} rx="6.2" ry="6.8" fill={sk} />
        <ellipse cx={rArmEndX + 1} cy={rArmEndY - 3} rx="3" ry="2" fill="rgba(0,0,0,0.06)" />

        <rect x="-6" y="-55" width="12" height="13" rx="6" fill={sk} />
        <rect x="1" y="-55" width="4" height="13" rx="2" fill="rgba(0,0,0,0.06)" />

        <g transform={`translate(${headLookX}, 0)`}>
          {role !== "familia" && renderHair(role, cfg.hairColor)}

          {role !== "familia" && role !== "diretor" && (
            <>
              <ellipse cx="-24" cy="-70" rx="5.5" ry="7.5" fill={sk} />
              <ellipse cx="-24" cy="-70" rx="3.5" ry="5" fill="rgba(0,0,0,0.07)" />
              <ellipse cx="24" cy="-70" rx="5.5" ry="7.5" fill={sk} />
              <ellipse cx="24" cy="-70" rx="3.5" ry="5" fill="rgba(0,0,0,0.07)" />
            </>
          )}

          <circle cx="0" cy="-72" r="23" fill={sk} />
          <ellipse cx="-4" cy="-68" rx="18" ry="14" fill={faceHighlight} />
          <ellipse cx="10" cy="-78" rx="10" ry="8" fill={faceShadow} />

          <ellipse cx="-10" cy="-63" rx="5.5" ry="3.5" fill={cheekColor} opacity={cheekOpacity} />
          <ellipse cx="10" cy="-63" rx="5.5" ry="3.5" fill={cheekColor} opacity={cheekOpacity} />

          {role !== "diretor" && renderFrontHair(role, cfg.hairColor)}

          <g transform={`translate(0, ${eyebrowRaise})`}>
            {role === "familia" ? (
              <>
                <path
                  d="M-12,-80 Q-7,-84 -3,-82"
                  stroke="rgba(93,64,55,0.28)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M-8.2,-82.2 Q-5.8,-84 -3,-82"
                  stroke="#5D4037"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M3,-82 Q7,-84 12,-80"
                  stroke="rgba(93,64,55,0.28)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M3,-82 Q5.8,-84 8.2,-82.2"
                  stroke="#5D4037"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </>
            ) : role === "diretor" ? (
              <>
                {/* thin arched feminine eyebrows */}
                <path d="M-11,-80 Q-6.5,-86 -3,-82" stroke={eyebrowColor} strokeWidth="1.4" strokeLinecap="round" fill="none" />
                <path d="M3,-82 Q6.5,-86 11,-80"    stroke={eyebrowColor} strokeWidth="1.4" strokeLinecap="round" fill="none" />
              </>
            ) : (
              <>
                <path
                  d="M-12,-80 Q-7,-84 -3,-82"
                  stroke={eyebrowColor}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M3,-82 Q7,-84 12,-80"
                  stroke={eyebrowColor}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </>
            )}
          </g>

          {role === "diretor" && renderFrontHair(role, cfg.hairColor)}

          <ellipse cx="-7" cy="-74" rx="4.2" ry={4.2 * eyeOpen} fill="#37474F" />
          <ellipse cx="7" cy="-74" rx="4.2" ry={4.2 * eyeOpen} fill="#37474F" />
          <ellipse cx="-5.4" cy="-75.8" rx="1.9" ry={1.9 * eyeOpen} fill="white" />
          <ellipse cx="8.6" cy="-75.8" rx="1.9" ry={1.9 * eyeOpen} fill="white" />

          <ellipse cx="0" cy="-67" rx="2.2" ry="1.6" fill="rgba(0,0,0,0.09)" />

          <path
            d="M-8,-62 Q0,-55 8,-62"
            stroke="#37474F"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M-5,-58 Q0,-55 5,-58"
            stroke="rgba(255,255,255,0.40)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />

          {role === "professor" ? (
            <g transform={`translate(${glassesShiftX}, 0)`}>
              <circle
                cx="-7"
                cy="-73"
                r="5.8"
                stroke="#5D4037"
                strokeWidth="1.8"
                fill="rgba(200,230,255,0.15)"
              />
              <circle
                cx="7"
                cy="-73"
                r="5.8"
                stroke="#5D4037"
                strokeWidth="1.8"
                fill="rgba(200,230,255,0.15)"
              />
              <line
                x1="-1.2"
                y1="-73"
                x2="1.2"
                y2="-73"
                stroke="#5D4037"
                strokeWidth="1.8"
              />
              <line
                x1="-22"
                y1="-71"
                x2="-12.8"
                y2="-72.5"
                stroke="#5D4037"
                strokeWidth="1.5"
              />
              <line
                x1="12.8"
                y1="-72.5"
                x2="22"
                y2="-71"
                stroke="#5D4037"
                strokeWidth="1.5"
              />
            </g>
          ) : role === "diretor" ? (
            <>{renderDirectorEyelashes(eyeOpen)}{cfg.faceDetail}</>
          ) : role === "familia" ? (
            renderDirectorEyelashes(eyeOpen, "#5D4037")
          ) : (
            cfg.faceDetail
          )}
          {cfg.accessoryTop}
        </g>
      </svg>

      {label && (
        <div
          style={{
            textAlign: "center",
            fontFamily: "Nunito, Arial, sans-serif",
            fontSize: 22,
            fontWeight: 700,
            color: cfg.bodyColor,
            marginTop: 2,
            whiteSpace: "nowrap",
            textShadow: "0 1px 4px rgba(255,255,255,0.85)",
          }}
        >
          {cfg.label}
        </div>
      )}
    </div>
  );
};
