#!/usr/bin/env bash
# Remuxa o vídeo Remotion com a narração, reencodando áudio AAC 48 kHz.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IN="${1:-$ROOT/out/geladeira.raw.mp4}"
NARR_WAV="$ROOT/public/narracao.wav"
NARR_MP3="$ROOT/public/narracao.mp3"
OUT="$ROOT/out/geladeira.mp4"
TMP="$ROOT/out/geladeira.mux.tmp.mp4"

if [[ ! -f "$IN" ]]; then
  # fallback: se o render já gravou em geladeira.mp4
  IN="$ROOT/out/geladeira.mp4"
fi
if [[ ! -f "$IN" ]]; then
  echo "Vídeo não encontrado" >&2
  exit 1
fi

NARR="$NARR_WAV"
[[ -f "$NARR" ]] || NARR="$NARR_MP3"
if [[ ! -f "$NARR" ]]; then
  echo "Narração não encontrada (wav/mp3)" >&2
  exit 1
fi

# Reencode completo (vídeo+áudio) para máxima compatibilidade de players
ffmpeg -y -i "$IN" -i "$NARR" \
  -filter_complex "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000,aformat=channel_layouts=stereo[a]" \
  -map 0:v:0 -map "[a]" \
  -c:v libx264 -pix_fmt yuv420p -preset medium -crf 18 \
  -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -shortest -movflags +faststart \
  "$TMP"

mv "$TMP" "$OUT"
echo "OK: $OUT"
ffprobe -v error -show_entries stream=index,codec_type,codec_name,sample_rate,channels -of csv=p=0 "$OUT"
ffmpeg -i "$OUT" -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume" || true
