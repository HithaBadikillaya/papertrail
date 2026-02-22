#!/bin/bash
INPUT="$1"
EXT="${INPUT##*.}"
if [[ "$EXT" != "wav" && "$EXT" != "mp3" && "$EXT" != "flac" && "$EXT" != "ogg" ]]; then
    echo "Detected video file, extracting audio..."
    ffmpeg -i "$INPUT" -vn -acodec pcm_s16le -ar 16000 -ac 1 /tmp/audio.wav
    INPUT="/tmp/audio.wav"
fi
exec /whisper.cpp/build/bin/whisper-cli "$INPUT" --output-json