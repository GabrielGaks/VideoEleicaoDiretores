import React, { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  delayRender,
  continueRender,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Nunito";
import type { CompositionProps } from "./types";
import { buildSceneTimings, AUDIO_FILE, TRANSITION_FRAMES } from "./constants";
import { ProgressBar } from "./components/ProgressBar";

import { Scene01Intro } from "./scenes/Scene01Intro";
import { Scene02Organization } from "./scenes/Scene02Organization";
import { Scene03Registration } from "./scenes/Scene03Registration";
import { Scene04Announcement } from "./scenes/Scene04Announcement";
import { Scene05Campaign } from "./scenes/Scene05Campaign";
import { Scene06WhoCanVote } from "./scenes/Scene06WhoCanVote";
import { Scene07Voting } from "./scenes/Scene07Voting";
import { Scene08Counting } from "./scenes/Scene08Counting";
import { Scene09Result } from "./scenes/Scene09Result";
import { Scene10Conclusion } from "./scenes/Scene10Conclusion";

const { fontFamily, waitUntilDone } = loadFont("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});

const SCENE_COMPONENTS = [
  Scene01Intro,
  Scene02Organization,
  Scene03Registration,
  Scene04Announcement,
  Scene05Campaign,
  Scene06WhoCanVote,
  Scene07Voting,
  Scene08Counting,
  Scene09Result,
  Scene10Conclusion,
];

export const MainVideo: React.FC<CompositionProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const timings = buildSceneTimings(durationInFrames);

  const [fontHandle] = useState(() => delayRender("Loading Nunito font"));
  useEffect(() => {
    void waitUntilDone()
      .catch((err) => {
        console.warn(
          "[MainVideo] Failed to load Nunito from Google Fonts, continuing with fallback fonts.",
          err
        );
      })
      .finally(() => {
        continueRender(fontHandle);
      });
  }, [fontHandle]);

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: "#F5F7FA",
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile(AUDIO_FILE)} />

      {timings.map((timing, i) => {
        const SceneComponent = SCENE_COMPONENTS[i];
        if (!SceneComponent) return null;
        if (frame < timing.startFrame) return null;
        if (frame >= timing.startFrame + timing.durationInFrames) return null;

        const localFrame = frame - timing.startFrame;
        const opacity = (() => {
          if (localFrame > timing.durationInFrames - TRANSITION_FRAMES) {
            return (timing.durationInFrames - localFrame) / TRANSITION_FRAMES;
          }
          return 1;
        })();

        return (
          <AbsoluteFill
            key={i}
            style={{
              opacity,
              willChange: "opacity",
            }}
          >
            <SceneComponent
              localFrame={localFrame}
              durationInFrames={timing.durationInFrames}
            />
          </AbsoluteFill>
        );
      })}

      <ProgressBar globalFrame={frame} totalFrames={durationInFrames} />
    </AbsoluteFill>
  );
};
