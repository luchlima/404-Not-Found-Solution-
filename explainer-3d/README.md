# Explainer 3D — estilo Desmontando o Mundo

Vídeos verticais **Remotion + Three.js**: cutaway, gancho, 1 frase = 1 cena, narração TTS.

## Mini-série: Abrigo em Casa (apocalipse zumbi)

Ver [`SERIES-ZUMBI.md`](./SERIES-ZUMBI.md).

| Ep | Título | Comando |
|----|--------|---------|
| 01 | Barricar a casa (1:15) | `npm run render:zumbi-01` |

```bash
cd explainer-3d
npm install
npm run studio              # escolha ZumbiEp01
npm run still:zumbi-01
npm run render:zumbi-01     # out/zumbi-ep01.mp4
```

## Demo clássico (geladeira)

```bash
npm run render              # out/geladeira.mp4
```

## Stack

- Remotion 4 + Three.js (`@remotion/three`)
- Edge TTS pt-BR + `scripts/mux-audio.sh` (AAC 48 kHz)
- Sem câmera / sem rosto
