/**
 * Roteiro + timing do vídeo "A geladeira não fabrica frio".
 * FPS = 30. Cada bloco = uma batida visual (1 frase ≈ 1 cena).
 *
 * Para plugar narração real (ElevenLabs / Gemini TTS):
 * 1. Grave o áudio com este texto na ordem
 * 2. Substitua `startFrame` pelos timestamps palavra-a-palavra
 * 3. Coloque o arquivo em public/narracao.wav e ative <Audio> em Composition
 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 30 * 72; // 72s

export type Beat = {
  id: string;
  /** Texto falado / legendado */
  text: string;
  /** Frame de início (inclusivo) */
  startFrame: number;
  /** Frame de fim (exclusivo) */
  endFrame: number;
  /** Direção visual da cena */
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
    endFrame: 180,
    visual: "hook",
  },
  {
    id: "cutaway",
    text: "Ela não cria frio. Ela remove calor de dentro.",
    startFrame: 180,
    endFrame: 300,
    visual: "cutaway",
  },
  {
    id: "heat-out",
    text: "Um gás especial circula pelos tubos e absorve o calor dos alimentos.",
    startFrame: 300,
    endFrame: 450,
    visual: "heat-out",
  },
  {
    id: "coils",
    text: "Depois, esse calor é jogado para fora — nas serpentinas da traseira.",
    startFrame: 450,
    endFrame: 600,
    visual: "coils",
  },
  {
    id: "cycle",
    text: "Compressor, evaporador, condensador: um ciclo contínuo de troca de calor.",
    startFrame: 600,
    endFrame: 780,
    visual: "cycle",
  },
  {
    id: "close",
    text: "Por isso a parte de trás esquenta. A geladeira move calor — não inventa frio.",
    startFrame: 780,
    endFrame: 960,
    visual: "close",
  },
  {
    id: "brand",
    text: "Desmontando o estilo: como as coisas funcionam por dentro.",
    startFrame: 960,
    endFrame: 1080,
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
