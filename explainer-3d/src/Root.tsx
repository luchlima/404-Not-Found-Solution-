import React from "react";
import { Composition } from "remotion";
import { GeladeiraExplainer } from "./Composition";
import {
  DURATION_IN_FRAMES as GELADEIRA_DURATION,
  FPS as GELADEIRA_FPS,
  HEIGHT as GELADEIRA_HEIGHT,
  WIDTH as GELADEIRA_WIDTH,
} from "./lib/script";
import { ZumbiEp01 } from "./series/zumbi/ZumbiEp01";
import {
  DURATION_IN_FRAMES as ZUMBI_DURATION,
  FPS as ZUMBI_FPS,
  HEIGHT as ZUMBI_HEIGHT,
  WIDTH as ZUMBI_WIDTH,
} from "./series/zumbi/scriptEp01";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GeladeiraExplainer"
        component={GeladeiraExplainer}
        durationInFrames={GELADEIRA_DURATION}
        fps={GELADEIRA_FPS}
        width={GELADEIRA_WIDTH}
        height={GELADEIRA_HEIGHT}
      />
      <Composition
        id="ZumbiEp01"
        component={ZumbiEp01}
        durationInFrames={ZUMBI_DURATION}
        fps={ZUMBI_FPS}
        width={ZUMBI_WIDTH}
        height={ZUMBI_HEIGHT}
      />
    </>
  );
};
