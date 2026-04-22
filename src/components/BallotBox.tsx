import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { SPRING_CONFIG, COLORS } from "../constants";

interface BallotBoxProps {
  frame: number;
  delay?: number;
  /** Frame within this scene when the paper insertion starts */
  insertAtFrame?: number;
  /** Width of the ballot box SVG */
  width?: number;
}

export const BallotBox: React.FC<BallotBoxProps> = ({
  frame,
  delay = 0,
  insertAtFrame = 40,
  width = 300,
}) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { ...SPRING_CONFIG, damping: 11 },
    durationInFrames: 35,
  });

  const scale = interpolate(entrance, [0, 1], [0.3, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Paper insertion animation: paper slides from above slot into box
  const paperProgress = interpolate(
    frame,
    [insertAtFrame, insertAtFrame + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  // -90 = paper above slot, 0 = paper enters slot, 25 = paper inside
  const paperY = interpolate(paperProgress, [0, 0.5, 1], [-82, -65, -45]);
  const paperOpacity = interpolate(paperProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);

  // Gentle wobble on the box when paper is inserted
  const wobble =
    paperProgress > 0 && paperProgress < 1
      ? Math.sin(paperProgress * Math.PI * 4) * 3
      : 0;

  const h = width * (200 / 300);

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${wobble}deg)`,
        opacity,
        display: "inline-block",
        transformOrigin: "bottom center",
      }}
    >
      <svg
        width={width}
        height={h + 40}
        viewBox="-150 -150 300 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="0" cy="88" rx="115" ry="12" fill="rgba(0,0,0,0.12)" />

        {/* Box body */}
        <rect
          x="-110"
          y="-60"
          width="220"
          height="148"
          rx="16"
          fill="#546E7A"
        />
        {/* Box body highlight (lighter face) */}
        <rect
          x="-107"
          y="-57"
          width="214"
          height="142"
          rx="14"
          fill="#607D8B"
        />

        {/* Box top */}
        <rect
          x="-115"
          y="-100"
          width="230"
          height="50"
          rx="12"
          fill="#455A64"
        />

        {/* Top face highlight */}
        <rect
          x="-112"
          y="-97"
          width="224"
          height="44"
          rx="10"
          fill="#546E7A"
        />

        {/* Slot on top */}
        <rect
          x="-40"
          y="-92"
          width="80"
          height="14"
          rx="7"
          fill="#263238"
        />

        {/* Vote count window (optional) */}
        <rect
          x="-55"
          y="-30"
          width="110"
          height="55"
          rx="10"
          fill="#ECEFF1"
        />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontSize="28"
          fontWeight="bold"
          fill="#1A237E"
          fontFamily="Nunito, Arial, sans-serif"
        >
          VOTOS
        </text>

        {/* Lock icon on front */}
        <rect
          x="-16"
          y="42"
          width="32"
          height="26"
          rx="6"
          fill="#263238"
        />
        <path
          d="M-10,42 Q-10,28 0,28 Q10,28 10,42"
          stroke="#263238"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="0" cy="56" r="5" fill="#78909C" />

        {/* Label */}
        <rect x="-70" y="72" width="140" height="22" rx="4" fill="#FFD600" />
        <text
          x="0"
          y="88"
          textAnchor="middle"
          fontSize="14"
          fontWeight="bold"
          fill="#1A237E"
          fontFamily="Nunito, Arial, sans-serif"
        >
          URNA ELETRÔNICA
        </text>

        {/* Animated paper */}
        <g opacity={paperOpacity}>
          <rect
            x="-32"
            y={paperY}
            width="64"
            height="46"
            rx="6"
            fill="white"
            stroke="#90A4AE"
            strokeWidth="2"
          />
          {/* Lines on paper */}
          <line
            x1="-22"
            y1={paperY + 12}
            x2="22"
            y2={paperY + 12}
            stroke="#B0BEC5"
            strokeWidth="2.5"
          />
          <line
            x1="-22"
            y1={paperY + 22}
            x2="14"
            y2={paperY + 22}
            stroke="#B0BEC5"
            strokeWidth="2.5"
          />
          <line
            x1="-22"
            y1={paperY + 32}
            x2="18"
            y2={paperY + 32}
            stroke="#B0BEC5"
            strokeWidth="2.5"
          />
          {/* Check mark on paper */}
          <path
            d="M12,${paperY + 10} L18,${paperY + 20} L28,${paperY + 5}"
            stroke={COLORS.secondary}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};
