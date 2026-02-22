# Base image
FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    ffmpeg \
    wget \
    curl \
    inotify-tools \
    bash \
    && rm -rf /var/lib/apt/lists/*

# Clone whisper.cpp
RUN git clone https://github.com/ggerganov/whisper.cpp.git /whisper.cpp

# Build whisper.cpp
WORKDIR /whisper.cpp
RUN cmake -B build && cmake --build build

# Download base English model
RUN bash ./models/download-ggml-model.sh base.en

# Expose folder for audio/video files
VOLUME ["/media"]

# Copy pre-created scripts from your project into the container
COPY backend/src/scripts/run-whisper.sh /whisper.cpp/run-whisper.sh
COPY backend/src/scripts/watcher.sh /whisper.cpp/watcher.sh

# Make scripts executable
RUN chmod +x /whisper.cpp/run-whisper.sh /whisper.cpp/watcher.sh

# Start watcher as the container entrypoint
ENTRYPOINT ["/whisper.cpp/watcher.sh"]