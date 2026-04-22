import React from "react";
import { interpolate, spring, useVideoConfig } from "remotion";
import { staticFile } from "remotion";
import { SPRING_CONFIG } from "../constants";

interface SchoolBuildingProps {
  frame: number;
  delay?: number;
  width?: number;
}

export const SchoolBuilding: React.FC<SchoolBuildingProps> = ({
  frame,
  delay = 0,
  width = 480,
}) => {
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { ...SPRING_CONFIG, damping: 12 },
    durationInFrames: 40,
  });

  const scale = interpolate(entrance, [0, 1], [0.3, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Window light flicker — subtle
  const windowOpacity = 0.85 + Math.sin(frame * 0.08) * 0.1;

  const h = width * (420 / 480);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        display: "inline-block",
      }}
    >
      <svg
        width={width}
        height={h}
        viewBox="0 0 480 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ground shadow */}
        <ellipse cx="240" cy="415" rx="200" ry="14" fill="rgba(0,0,0,0.12)" />

        {/* Main building body */}
        <rect x="60" y="160" width="360" height="240" rx="8" fill="#1E88E5" />

        {/* Roof / triangle */}
        <polygon points="30,160 240,30 450,160" fill="#0D47A1" />

        {/* Roof highlight */}
        <polygon points="60,160 240,48 420,160" fill="#1565C0" />

        {/* Door */}
        <rect x="195" y="310" width="90" height="90" rx="6" fill="#0D47A1" />
        {/* Door knob */}
        <circle cx="274" cy="358" r="5" fill="#FFD600" />
        {/* Door arch */}
        <path
          d="M195,325 Q240,290 285,325"
          stroke="#1A237E"
          strokeWidth="3"
          fill="none"
        />

        {/* Window row 1 */}
        <rect
          x="85"
          y="195"
          width="70"
          height="60"
          rx="6"
          fill="#FFF9C4"
          opacity={windowOpacity}
        />
        <rect
          x="205"
          y="195"
          width="70"
          height="60"
          rx="6"
          fill="#FFF9C4"
          opacity={windowOpacity}
        />
        <rect
          x="325"
          y="195"
          width="70"
          height="60"
          rx="6"
          fill="#FFF9C4"
          opacity={windowOpacity}
        />

        {/* Window crosses */}
        {[85, 205, 325].map((wx, i) => (
          <g key={i}>
            <line
              x1={wx + 35}
              y1={195}
              x2={wx + 35}
              y2={255}
              stroke="#90CAF9"
              strokeWidth="2"
            />
            <line
              x1={wx}
              y1={225}
              x2={wx + 70}
              y2={225}
              stroke="#90CAF9"
              strokeWidth="2"
            />
          </g>
        ))}

        {/* Window row 2 (smaller) */}
        <rect
          x="100"
          y="270"
          width="50"
          height="35"
          rx="4"
          fill="#FFF9C4"
          opacity={windowOpacity * 0.9}
        />
        <rect
          x="330"
          y="270"
          width="50"
          height="35"
          rx="4"
          fill="#FFF9C4"
          opacity={windowOpacity * 0.9}
        />

        {/* Flag pole */}
        <line
          x1="240"
          y1="30"
          x2="240"
          y2="-20"
          stroke="#1A237E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Flag - Brazilian green + detail */}
        <rect x="240" y="-20" width="52" height="32" rx="3" fill="#43A047" />
        <polygon points="240,-20 266,-4 240,12" fill="#FFD600" />

        {/* Brasão real da Prefeitura de Vitória */}
        <image
          href={staticFile("brasao-vitoria.png")}
          x="190"
          y="55"
          width="100"
          height="100"
        />

        {/* School sign above door */}
        <rect x="160" y="175" width="160" height="28" rx="6" fill="#FFD600" />
        <text
          x="240"
          y="195"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#1A237E"
          fontFamily="Nunito, Arial, sans-serif"
        >
          ESCOLA
        </text>

        {/* Steps */}
        <rect x="175" y="395" width="130" height="12" rx="3" fill="#1565C0" />
        <rect x="160" y="403" width="160" height="9" rx="3" fill="#0D47A1" />

        {/* Decorative bushes */}
        <ellipse cx="120" cy="400" rx="38" ry="22" fill="#43A047" />
        <ellipse cx="360" cy="400" rx="38" ry="22" fill="#43A047" />
        <ellipse cx="105" cy="393" rx="22" ry="16" fill="#66BB6A" />
        <ellipse cx="375" cy="393" rx="22" ry="16" fill="#66BB6A" />
      </svg>
    </div>
  );
};
