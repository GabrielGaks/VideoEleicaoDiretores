export interface SceneProps {
  /** Frame index relative to the start of this scene (0 = first frame of scene) */
  localFrame: number;
  /** Total frames allocated to this scene */
  durationInFrames: number;
}

export interface SubtitleCue {
  /** Start frame relative to scene start */
  from: number;
  /** End frame relative to scene start */
  to: number;
  /** Brazilian Portuguese subtitle text */
  text: string;
}

// Must extend Record<string, unknown> to satisfy Remotion's Composition generic constraint
export interface CompositionProps extends Record<string, unknown> {
  durationInFrames: number;
  audioDurationSeconds: number;
}

export interface SceneTiming {
  index: number;
  startFrame: number;
  durationInFrames: number;
}
