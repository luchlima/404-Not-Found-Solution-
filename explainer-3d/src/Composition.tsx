import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
// import { Audio, staticFile } from "remotion";
import { BrandBar } from "./components/BrandBar";
import { Caption } from "./components/Caption";
import { FridgeScene } from "./scenes/FridgeScene";

/**
 * Composição principal no estilo Desmontando o Mundo.
 *
 * Para ativar narração:
 *   1. Coloque public/narracao.wav
 *   2. Descomente o import e o <Audio /> abaixo
 */
export const GeladeiraExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#07111C" }}>
      <Sequence from={0}>
        <FridgeScene />
      </Sequence>

      {/* <Audio src={staticFile("narracao.wav")} /> */}

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
