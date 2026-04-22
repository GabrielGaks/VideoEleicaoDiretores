import type { SceneTiming } from "./types";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

// Audio file served from the dedicated public directory.
export const AUDIO_FILE = "audio-back.mp3";
export const INTRO_MUSIC_FRAMES = FPS * 2;
export const OUTRO_MUSIC_FRAMES = FPS * 2;
export const TRANSITION_FRAMES = 8;

// Positive = atrasa as legendas (se aparecem antes do áudio, aumente este valor).
export const SUBTITLE_DELAY_FRAMES = 0;

// Measured speech windows for the current audio file, mapped 1:1 to the 27 script lines.
export const AUDIO_SPEECH_WINDOWS = [
  { from: 60, to: 136 },
  { from: 154, to: 221 },
  { from: 239, to: 347 },
  { from: 377, to: 443 },
  { from: 461, to: 553 },
  { from: 571, to: 719 },
  { from: 749, to: 815 },
  { from: 833, to: 920 },
  { from: 938, to: 1062 },
  { from: 1092, to: 1173 },
  { from: 1191, to: 1342 },
  { from: 1372, to: 1421 },
  { from: 1439, to: 1571 },
  { from: 1589, to: 1711 },
  { from: 1741, to: 1833 },
  { from: 1851, to: 2151 },
  { from: 2169, to: 2296 },
  { from: 2326, to: 2410 },
  { from: 2428, to: 2575 },
  { from: 2605, to: 2676 },
  { from: 2694, to: 2819 },
  { from: 2837, to: 2904 },
  { from: 2934, to: 2995 },
  { from: 3013, to: 3107 },
  { from: 3137, to: 3292 },
  { from: 3310, to: 3426 },
  { from: 3444, to: 3519 },
] as const;

export const SCENE_LINE_COUNTS = [
  3,
  3,
  3,
  2,
  3,
  3,
  2,
  3,
  2,
  3,
] as const;

// Scene 1 starts at frame 0 to cover the musical intro.
// The remaining scenes are aligned to the first spoken frame of their first line.
export const SCENE_START_FRAMES = [
  0,
  377,
  749,
  1092,
  1372,
  1741,
  2326,
  2605,
  2934,
  3137,
] as const;

export function buildSceneTimings(totalFrames: number): SceneTiming[] {
  return SCENE_START_FRAMES.map((startFrame, index) => {
    const endFrame =
      index === SCENE_START_FRAMES.length - 1
        ? totalFrames
        : SCENE_START_FRAMES[index + 1];

    return {
      index,
      startFrame,
      durationInFrames: Math.max(1, endFrame - startFrame),
    };
  });
}

export const COLORS = {
  primary: "#1E88E5",
  secondary: "#43A047",
  accent: "#FB8C00",
  danger: "#E53935",
  bgLight: "#F5F7FA",
  bgDark: "#1A237E",
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  textDark: "#1A237E",
  textLight: "#FFFFFF",
  yellow: "#FFD600",
  purple: "#7B1FA2",
  teal: "#00897B",
} as const;

export const SCENE_GRADIENTS: [string, string][] = [
  ["#1A237E", "#1E88E5"],
  ["#E3F2FD", "#BBDEFB"],
  ["#E8F5E9", "#C8E6C9"],
  ["#FFF8E1", "#FFECB3"],
  ["#FCE4EC", "#F8BBD0"],
  ["#E8EAF6", "#C5CAE9"],
  ["#E3F2FD", "#90CAF9"],
  ["#F3E5F5", "#CE93D8"],
  ["#E8F5E9", "#A5D6A7"],
  ["#1A237E", "#283593"],
];

export const FONT_FAMILY =
  "Nunito, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";

export const SPRING_CONFIG = {
  damping: 22,
  stiffness: 68,
  mass: 0.9,
};

export const SPRING_BOUNCE = {
  damping: 16,
  stiffness: 75,
  mass: 0.9,
};
