import path from "path";
import fs from "fs";
import { spawn } from "child_process";

// ---------------------------------------------------------------------------
// FFmpeg / FFprobe Binary Resolution
// ---------------------------------------------------------------------------
// We use system-installed ffmpeg and ffprobe (available on PATH).
// ffmpeg-static ships platform-specific binaries that break in mixed
// Windows/WSL environments, so we bypass it entirely and rely on:
//   sudo apt-get install -y ffmpeg   (Ubuntu/WSL)
// ---------------------------------------------------------------------------

const FFMPEG_PATH = "ffmpeg";
const FFPROBE_PATH = "ffprobe";

// ---------------------------------------------------------------------------
// Startup Validation
// ---------------------------------------------------------------------------

/**
 * Call once at server startup. Spawns `ffprobe -version` and asserts it runs.
 * Throws with a clear message if ffprobe is not available on PATH.
 */
export async function validateFfprobe() {
    return new Promise((resolve, reject) => {
        const proc = spawn(FFPROBE_PATH, ["-version"], { stdio: ["ignore", "pipe", "pipe"] });
        let stdout = "";
        proc.stdout.on("data", (d) => { stdout += d.toString(); });
        proc.on("error", (err) => {
            reject(new Error(
                `[FATAL] ffprobe not found on PATH.\n` +
                `Install ffmpeg (includes ffprobe) on your system:\n` +
                `  Ubuntu/Debian : sudo apt-get install -y ffmpeg\n` +
                `  macOS         : brew install ffmpeg\n` +
                `Original error: ${err.message}`
            ));
        });
        proc.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`ffprobe exited with code ${code}. Is it installed correctly?`));
            }
            const version = stdout.split("\n")[0] || "unknown";
            console.log(`[MediaProcessor] ffprobe validated: ${version.trim()}`);
            resolve();
        });
    });
}

// ---------------------------------------------------------------------------
// Audio Extraction & Normalization
// ---------------------------------------------------------------------------

/**
 * Extracts audio from any audio/video file and normalises to:
 * - mono channel
 * - 16 kHz sample rate
 * - PCM signed 16-bit little-endian (WAV)
 *
 * @param {string} inputPath  – source media file
 * @param {string} outputDir  – directory to write the normalised wav into
 * @returns {Promise<string>} – absolute path to the normalised WAV
 */
export async function extractAndNormalizeAudio(inputPath, outputDir) {
    const outPath = path.join(outputDir, `normalised_${Date.now()}.wav`);

    return new Promise((resolve, reject) => {
        const args = [
            "-i", inputPath,
            "-vn",                // strip video
            "-ac", "1",           // mono
            "-ar", "16000",       // 16 kHz
            "-acodec", "pcm_s16le",
            "-y",                 // overwrite
            outPath,
        ];

        const proc = spawn(FFMPEG_PATH, args, { stdio: ["ignore", "pipe", "pipe"] });

        let stderr = "";
        proc.stderr.on("data", (d) => { stderr += d.toString(); });

        proc.on("error", (err) => reject(new Error(`FFmpeg spawn error: ${err.message}`)));
        proc.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`FFmpeg exited with code ${code}.\nstderr: ${stderr.slice(-500)}`));
            }
            resolve(outPath);
        });
    });
}

// ---------------------------------------------------------------------------
// Audio Chunking
// ---------------------------------------------------------------------------

/**
 * Probes audio duration then splits into fixed-length chunks.
 *
 * @param {string} wavPath       – path to normalised WAV
 * @param {string} outputDir     – directory for chunk files
 * @param {number} chunkMinutes  – target chunk length (default 7)
 * @returns {Promise<string[]>}  – ordered array of chunk file paths
 */
export async function splitAudioIntoChunks(wavPath, outputDir, chunkMinutes = 7) {
    const durationSec = await probeDuration(wavPath);
    const chunkSec = chunkMinutes * 60;

    // If the entire file fits in one chunk, skip splitting.
    if (durationSec <= chunkSec + 30) {
        return [wavPath];
    }

    const chunks = [];
    let offset = 0;
    let idx = 0;

    while (offset < durationSec) {
        const chunkPath = path.join(outputDir, `chunk_${String(idx).padStart(3, "0")}.wav`);
        const length = Math.min(chunkSec, durationSec - offset);

        await new Promise((resolve, reject) => {
            const args = [
                "-ss", String(offset),
                "-t", String(length),
                "-i", wavPath,
                "-acodec", "pcm_s16le",
                "-ac", "1",
                "-ar", "16000",
                "-y",
                chunkPath,
            ];
            const proc = spawn(FFMPEG_PATH, args, { stdio: ["ignore", "pipe", "pipe"] });
            let stderr = "";
            proc.stderr.on("data", (d) => { stderr += d.toString(); });
            proc.on("error", (err) => reject(new Error(`FFmpeg chunk error: ${err.message}`)));
            proc.on("close", (code) => {
                if (code !== 0) return reject(new Error(`FFmpeg chunk split exited ${code}: ${stderr.slice(-300)}`));
                resolve();
            });
        });

        chunks.push(chunkPath);
        offset += chunkSec;
        idx++;
    }

    return chunks;
}

// ---------------------------------------------------------------------------
// ffprobe Duration Helper
// ---------------------------------------------------------------------------

/**
 * Returns the duration of a media file in seconds using ffprobe.
 * Uses spawn to avoid stdout buffering issues.
 */
function probeDuration(filePath) {
    return new Promise((resolve, reject) => {
        const args = [
            "-v", "error",
            "-show_entries", "format=duration",
            "-of", "default=noprint_wrappers=1:nokey=1",
            filePath,
        ];

        const proc = spawn(FFPROBE_PATH, args, { stdio: ["ignore", "pipe", "pipe"] });
        let stdout = "";
        let stderr = "";

        proc.stdout.on("data", (d) => { stdout += d.toString(); });
        proc.stderr.on("data", (d) => { stderr += d.toString(); });

        proc.on("error", (err) => reject(new Error(`ffprobe spawn error: ${err.message}`)));
        proc.on("close", (code) => {
            if (code !== 0) {
                return reject(new Error(`ffprobe exited ${code}: ${stderr.slice(-300)}`));
            }
            const dur = parseFloat(stdout.trim());
            if (isNaN(dur)) {
                return reject(new Error(`ffprobe returned non-numeric duration: "${stdout.trim()}"`));
            }
            resolve(dur);
        });
    });
}
