import React from "react";
import {
  Composition,
  staticFile,
  type CalculateMetadataFunction,
} from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { MainVideo } from "./MainVideo";
import type { CompositionProps } from "./types";
import { FPS, WIDTH, HEIGHT, AUDIO_FILE } from "./constants";

const DEFAULT_DURATION_FRAMES = FPS * 120; // 120s fallback
const AUDIO_METADATA_TIMEOUT_MS = 10000;

const withTimeout = async <T,>(
  promise: Promise<T>,
  timeoutMs: number,
  label: string
): Promise<T> => {
  return await new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`${label} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    promise.then(
      (value) => {
        clearTimeout(timeout);
        resolve(value);
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    );
  });
};

/**
 * calculateMetadata resolves the actual audio duration before rendering.
 * The composition durationInFrames is set to exactly match the audio length.
 *
 * Audio file path is resolved via Config.setPublicDir('public') in remotion.config.ts,
 * so staticFile('audio-back.mp3') points to public/audio-back.mp3.
 */
const calculateMetadata: CalculateMetadataFunction<CompositionProps> =
  async () => {
    try {
      const audioUrl = staticFile(AUDIO_FILE);
      const durationSeconds = await withTimeout(
        getAudioDurationInSeconds(audioUrl),
        AUDIO_METADATA_TIMEOUT_MS,
        "Audio metadata loading"
      );

      if (!durationSeconds || durationSeconds <= 0) {
        throw new Error(`Invalid audio duration: ${durationSeconds}`);
      }

      const durationInFrames = Math.ceil(durationSeconds * FPS);
      console.log(
        `[calculateMetadata] Audio: ${durationSeconds.toFixed(2)}s → ${durationInFrames} frames @ ${FPS}fps`
      );

      return {
        durationInFrames,
        fps: FPS,
        props: { durationInFrames, audioDurationSeconds: durationSeconds },
      };
    } catch (err) {
      console.warn("[calculateMetadata] Failed, using fallback 120s:", err);
      return {
        durationInFrames: DEFAULT_DURATION_FRAMES,
        fps: FPS,
        props: {
          durationInFrames: DEFAULT_DURATION_FRAMES,
          audioDurationSeconds: 120,
        },
      };
    }
  };

export const Root: React.FC = () => {
  return (
    <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={DEFAULT_DURATION_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{
        durationInFrames: DEFAULT_DURATION_FRAMES,
        audioDurationSeconds: 120,
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};
