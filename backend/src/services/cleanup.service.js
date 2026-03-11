import fs from "fs";
import path from "path";

const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");

export async function cleanupUploads() {
    try {
        if (!fs.existsSync(UPLOAD_DIR)) {
            return;
        }

        const files = await fs.promises.readdir(UPLOAD_DIR);
        for (const file of files) {
            const fullPath = path.join(UPLOAD_DIR, file);
            await fs.promises.rm(fullPath, { recursive: true, force: true });
        }
    } catch (err) {
        console.error("Failed to run startup cleanup:", err.message);
    }
}

export async function cleanupJobFiles(jobId, originalPath) {
    try {
        if (originalPath && fs.existsSync(originalPath)) {
            await fs.promises.rm(originalPath, { force: true });
        }
    } catch (_) {}

    try {
        const jobDir = path.join(UPLOAD_DIR, `job_${jobId}`);
        if (fs.existsSync(jobDir)) {
            await fs.promises.rm(jobDir, { recursive: true, force: true });
        }
    } catch (_) {}
}

export function startPeriodicCleanup() {
    setInterval(async () => {
        try {
            if (!fs.existsSync(UPLOAD_DIR)) return;

            const files = await fs.promises.readdir(UPLOAD_DIR);
            const now = Date.now();
            const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

            for (const file of files) {
                const fullPath = path.join(UPLOAD_DIR, file);
                const stats = await fs.promises.stat(fullPath);

                if (now - stats.mtimeMs > TWO_HOURS_MS) {
                    await fs.promises.rm(fullPath, { recursive: true, force: true });
                }
            }
        } catch (err) {
            console.error("Periodic cleanup error:", err.message);
        }
    }, 60 * 60 * 1000);
}
