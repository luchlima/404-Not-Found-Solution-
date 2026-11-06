#!/usr/bin/env bash
# Garante áudio alto e compatível no MP4 final (Remotion às vezes falha no player).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IN="${1:-$ROOT/out/geladeira.mp4}"
NARR="$ROOT/public/narracao.mp3"
TMP="$ROOT/out/geladeira-mux.tmp.mp4"
OUT="$ROOT/out/geladeira.mp4"

if [[ ! -f "$IN" ]]; then
  echo "Vídeo não encontrado: $IN" >&2
  exit 1
fi
if [[ ! -f "$NARR" ]]; then
  echo "Narração não encontrada: $NARR" >&2
  exit 1
fi

ffmpeg -y -i "$IN" -i "$NARR" \
  -filter_complex "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]" \
  -map 0:v:0 -map "[a]" \
  -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 \
  -shortest -movflags +faststart \
  "$TMP"

mv "$TMP" "$OUT"
echo "OK: $OUT (vídeo + narração loudnorm)"
ffprobe -v error -select_streams a -show_entries stream=codec_name,sample_rate,channels -of default=noprint_wrappers=1 "$OUT"
