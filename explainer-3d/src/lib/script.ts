/**
 * Roteiro + timing sincronizado com public/narracao.mp3 (Edge TTS pt-BR-AntonioNeural)
 * FPS = 30. Cada bloco = uma batida visual (1 frase ≈ 1 cena).
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 1338; // ~44.6s

export type Beat = {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  visual: "hook" | "cutaway" | "heat-out" | "coils" | "cycle" | "close";
};

export const BEATS: Beat[] = [
  {
    id: "hook",
    text: "A geladeira fabrica frio?",
    startFrame: 0,
    endFrame: 90,
    visual: "hook",
  },
  {
    id: "myth",
    text: "Essa explicação parece certa… mas não é.",
    startFrame: 90,
    endFrame: 221,
    visual: "hook",
  },
  {
    id: "cutaway",
    text: "Ela não cria frio. Ela remove calor de dentro.",
    startFrame: 221,
    endFrame: 383,
    visual: "cutaway",
  },
  {
    id: "heat-out",
    text: "Um gás especial circula pelos tubos e absorve o calor dos alimentos.",
    startFrame: 383,
    endFrame: 557,
    visual: "heat-out",
  },
  {
    id: "coils",
    text: "Depois, esse calor é jogado para fora — nas serpentinas da traseira.",
    startFrame: 557,
    endFrame: 735,
    visual: "coils",
  },
  {
    id: "cycle",
    text: "Compressor, evaporador, condensador: um ciclo contínuo de troca de calor.",
    startFrame: 735,
    endFrame: 939,
    visual: "cycle",
  },
  {
    id: "close",
    text: "Por isso a parte de trás esquenta. A geladeira move calor — não inventa frio.",
    startFrame: 939,
    endFrame: 1155,
    visual: "close",
  },
  {
    id: "brand",
    text: "Desmontando o estilo: como as coisas funcionam por dentro.",
    startFrame: 1155,
    endFrame: 1293,
    visual: "close",
  },
];

export function beatAt(frame: number): Beat {
  return (
    BEATS.find((b) => frame >= b.startFrame && frame < b.endFrame) ??
    BEATS[BEATS.length - 1]
  );
}

export function progressInBeat(frame: number, beat: Beat): number {
  const span = Math.max(1, beat.endFrame - beat.startFrame);
  return Math.min(1, Math.max(0, (frame - beat.startFrame) / span));
}
