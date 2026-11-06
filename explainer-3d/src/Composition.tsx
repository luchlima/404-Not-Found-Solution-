import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { BrandBar } from "./components/BrandBar";
import { Caption } from "./components/Caption";
import { FridgeScene } from "./scenes/FridgeScene";

/**
 * Composição principal no estilo Desmontando o Mundo.
 * Narração: public/narracao.mp3 (gTTS, sincronizada com BEATS).
 * Após o render, rode `npm run mux-audio` para garantir áudio no MP4.
 */
export const GeladeiraExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#07111C" }}>
      <Sequence from={0}>
        <FridgeScene />
      </Sequence>

      <Audio src={staticFile("narracao.mp3")} volume={1} />

      <BrandBar />
      <Caption />

      {/* vinheta de canto — área segura Reels */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.35) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
