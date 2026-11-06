import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Caption, ProgressBar, SeriesBadge } from "./components/SeriesChrome";
import { HouseBarricadeScene } from "./scenes/HouseBarricadeScene";

/**
 * Mini-série Abrigo em Casa — Ep. 01: Barricar a casa (1:15)
 * Áudio: public/series/zumbi/ep01-narracao.mp3
 * Após render, rode mux para garantir faixa AAC audível.
 */
export const ZumbiEp01: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#120E0C" }}>
      <Sequence from={0}>
        <HouseBarricadeScene />
      </Sequence>

      <Audio src={staticFile("series/zumbi/ep01-narracao.mp3")} volume={1} />

      <SeriesBadge />
      <Caption />
      <ProgressBar />

      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
