import React from "react";

// Embeds as <g> inside any SVG.
// x,y = top-left corner; size = width in px (height = size * 1.2)
export const BrasaoVitoriaIcon: React.FC<{ x: number; y: number; size: number }> = ({ x, y, size }) => {
  const s = size / 100;
  return (
    <g transform={`translate(${x}, ${y}) scale(${s})`}>
      {/* crossed arrows */}
      <line x1="12" y1="32" x2="88" y2="98" stroke="#B8860B" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="88" y1="32" x2="12" y2="98" stroke="#B8860B" strokeWidth="5.5" strokeLinecap="round" />
      <polygon points="12,32 20,40 10,42" fill="#B8860B" />
      <polygon points="88,32 90,42 80,40" fill="#B8860B" />
      <polygon points="12,98 10,88 20,90" fill="#B8860B" />
      <polygon points="88,98 80,90 90,88" fill="#B8860B" />

      {/* shield fill — white base */}
      <path d="M24,20 L76,20 L79,58 Q79,94 50,106 Q21,94 21,58 Z" fill="white" />

      {/* top-right red quadrant */}
      <path d="M50,20 L76,20 L79,58 L50,58 Z" fill="#D32F2F" />

      {/* bottom blue section */}
      <path d="M21,58 L79,58 Q79,94 50,106 Q21,94 21,58 Z" fill="#1565C0" />

      {/* waves */}
      <path d="M26,70 Q36,65 46,70 Q56,75 66,70 Q72,67 75,70" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M24,82 Q34,77 44,82 Q54,87 64,82 Q70,79 76,82" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />

      {/* gold star (top-left) */}
      <text x="35" y="52" fontSize="22" fill="#B8860B" fontFamily="Arial, sans-serif" textAnchor="middle">★</text>

      {/* caduceus simplified (top-right, white) */}
      <line x1="65" y1="30" x2="65" y2="54" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M59,37 Q65,33 71,37" stroke="white" strokeWidth="1.8" fill="none" />
      <path d="M59,44 Q65,40 71,44" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="65" cy="29" r="3.5" fill="white" />

      {/* ship silhouette (blue section) */}
      <rect x="38" y="86" width="24" height="8" rx="2" fill="#0D2A5E" />
      <rect x="46" y="80" width="4" height="8" rx="1" fill="#0D2A5E" />

      {/* shield border + dividers */}
      <path d="M24,20 L76,20 L79,58 Q79,94 50,106 Q21,94 21,58 Z" stroke="#333" strokeWidth="2" fill="none" />
      <line x1="50" y1="20" x2="50" y2="58" stroke="#333" strokeWidth="1.2" />
      <line x1="21" y1="58" x2="79" y2="58" stroke="#333" strokeWidth="1.2" />

      {/* mural crown */}
      <rect x="28" y="10" width="44" height="11" rx="1.5" fill="#9E9E9E" stroke="#777" strokeWidth="0.8" />
      <rect x="30" y="5"  width="6"  height="7" rx="1" fill="#9E9E9E" stroke="#777" strokeWidth="0.6" />
      <rect x="43" y="3"  width="7"  height="9" rx="1" fill="#9E9E9E" stroke="#777" strokeWidth="0.6" />
      <rect x="57" y="5"  width="6"  height="7" rx="1" fill="#9E9E9E" stroke="#777" strokeWidth="0.6" />
      <rect x="36" y="5"  width="5"  height="6" rx="1" fill="#9E9E9E" />
      <rect x="50" y="5"  width="5"  height="6" rx="1" fill="#9E9E9E" />

      {/* banner */}
      <path d="M22,109 Q50,117 78,109 L76,116 Q50,122 24,116 Z" fill="#1565C0" />
      <text x="50" y="116" textAnchor="middle" fontSize="8.5" fill="white" fontWeight="bold" fontFamily="Arial, sans-serif">VICTORIA</text>
    </g>
  );
};
