#!/bin/bash
echo "Watcher started, monitoring /media..."
while true; do
    inotifywait -e close_write,moved_to,create -r /media |
    while read path action file; do
        echo "New file detected: $file"
        /whisper.cpp/run-whisper.sh "$path$file"
    done
done