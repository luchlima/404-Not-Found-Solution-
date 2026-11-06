import React from "react";
import { Composition } from "remotion";
import { GeladeiraExplainer } from "./Composition";
import { DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./lib/script";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GeladeiraExplainer"
        component={GeladeiraExplainer}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
