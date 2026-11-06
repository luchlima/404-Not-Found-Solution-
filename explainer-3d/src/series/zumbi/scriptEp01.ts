/** Ep.01 — Barricar a casa · 1:15 · sincronizado com ep01-narracao.mp3 */

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 2250; // 75s

export type Visual =
  | "hook"
  | "door"
  | "locks"
  | "furniture"
  | "windows"
  | "escape"
  | "silence"
  | "close";

export type Beat = {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  visual: Visual;
};

export const BEATS: Beat[] = [
  {
    id: "hook",
    text: "Apocalipse zumbi. Você está em casa. O que fazer agora?",
    startFrame: 0,
    endFrame: 282,
    visual: "hook",
  },
  {
    id: "door",
    text: "Primeira regra: não abra a porta. Curiosidade mata mais rápido que a fome.",
    startFrame: 282,
    endFrame: 569,
    visual: "door",
  },
  {
    id: "locks",
    text: "Trave todas as fechaduras. Corrente, trinco, chave — tudo que existir.",
    startFrame: 569,
    endFrame: 868,
    visual: "locks",
  },
  {
    id: "furniture",
    text: "Empurre o sofá, a geladeira ou um armário contra a porta de entrada.",
    startFrame: 868,
    endFrame: 1105,
    visual: "furniture",
  },
  {
    id: "windows",
    text: "Nas janelas, use tábuas, travesseiros ou colchões. Bloqueie a visão de fora.",
    startFrame: 1105,
    endFrame: 1418,
    visual: "windows",
  },
  {
    id: "escape",
    text: "Deixe uma única rota de fuga planejada — fundo da casa ou janela alta.",
    startFrame: 1418,
    endFrame: 1667,
    visual: "escape",
  },
  {
    id: "silence",
    text: "Apague as luzes. Fale baixo. Qualquer barulho vira um convite.",
    startFrame: 1667,
    endFrame: 1962,
    visual: "silence",
  },
  {
    id: "close",
    text: "Sua casa virou abrigo. Parte um concluída. Em seguida: água e comida.",
    startFrame: 1962,
    endFrame: 2235,
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
