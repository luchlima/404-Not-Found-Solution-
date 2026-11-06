#!/usr/bin/env bash
# Remuxa vídeo + narração com reencode H.264/AAC (players compatíveis).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IN="${1:-}"
NARR="${2:-}"
OUT="${3:-}"

if [[ -z "$IN" || -z "$NARR" || -z "$OUT" ]]; then
  echo "Uso: mux-audio.sh <video.mp4> <narracao.mp3|wav> <saida.mp4>" >&2
  exit 1
fi
if [[ ! -f "$IN" ]]; then echo "Vídeo não encontrado: $IN" >&2; exit 1; fi
if [[ ! -f "$NARR" ]]; then echo "Narração não encontrada: $NARR" >&2; exit 1; fi

TMP="${OUT}.tmp.mp4"
mkdir -p "$(dirname "$OUT")"

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
