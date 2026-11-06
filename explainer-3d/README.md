# Explainer 3D — estilo Desmontando o Mundo

Esqueleto **Remotion + Three.js** com roteiro, plano de cenas e vídeo vertical de exemplo:

> **A geladeira não fabrica frio** — mito corrigido + cutaway + fluxo de calor.

## O que tem aqui

| Arquivo | Função |
|---------|--------|
| `ROTEIRO.md` | Roteiro falado + plano de cenas |
| `src/lib/script.ts` | Timing dos beats (1 frase = 1 cena) |
| `src/scenes/FridgeScene.tsx` | Cena 3D (cutaway, partículas, serpentinas, ciclo) |
| `src/Composition.tsx` | Composição Remotion + legendas |

## Rodar

```bash
cd explainer-3d
npm install
npm run studio          # preview interativo
npm run still           # um frame de preview
npm run stills          # 6 stills das batidas principais
npm run render          # MP4 final (1080×1920)
```

Requisito: GPU / OpenGL via `--gl=angle` (já nos scripts).

## Plugar narração (ElevenLabs / Gemini TTS)

1. Grave o texto de `ROTEIRO.md`
2. Salve como `public/narracao.wav`
3. Em `src/Composition.tsx`, descomente o `<Audio />`
4. Ajuste `startFrame` / `endFrame` em `src/lib/script.ts`

## Fazer outro tema

1. Troque os textos em `BEATS` (`src/lib/script.ts`)
2. Crie uma nova cena em `src/scenes/` (ou adapte a geladeira)
3. Aponte `Composition.tsx` para a nova cena
4. Mantenha a regra: **cada frase precisa ser visível**

## Stack

- Remotion 4 (vídeo em React)
- Three.js via `@remotion/three`
- Legendas sincronizadas por frame (sem câmera / sem rosto)
