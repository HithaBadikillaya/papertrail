import React from "react";

interface FileUploadZoneProps {
    uploadedFile: File | null;
    isDragging: boolean;
    onDrop: (e: React.DragEvent) => void;
    onDragOver: (e: React.DragEvent) => void;
    onDragLeave: () => void;
    onFileSelect: (file: File) => void;
    isTranscribing: boolean;
    progress: number;
    transcriptionError: string;
    transcription: string;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
    uploadedFile,
    isDragging,
    onDrop,
    onDragOver,
    onDragLeave,
    onFileSelect,
    isTranscribing,
    progress,
    transcriptionError,
    transcription,
}) => {
    return (
        <div className="bg-card border-2 border-foreground p-8 space-y-6 shadow-[6px_6px_0_var(--color-retro-sand)]">
            <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">1</span>
                Upload Audio/Video
            </label>

            <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={`relative border-2 border-dashed p-8 transition-all cursor-pointer ${isDragging
                    ? "border-primary bg-primary/10 shadow-[4px_4px_0_var(--color-primary)]"
                    : "border-foreground/20 hover:border-foreground hover:shadow-[4px_4px_0_var(--color-retro-sand)]"
                    }`}
            >
                <input
                    type="file"
                    accept="audio/*,video/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFileSelect(file);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={isTranscribing}
                />

                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-sm border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0_var(--color-primary)]">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    {uploadedFile ? (
                        <div className="space-y-1">
                            <p className="font-bold text-foreground uppercase tracking-tight">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground font-mono">
                                {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="font-bold text-foreground uppercase tracking-tight">Drop file here or click to upload</p>
                            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest opacity-60">
                                MP3, MP4, MOV, WAV, WebM up to 4GB
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {isTranscribing && (
                <div className="space-y-3 p-4 bg-primary/10 border-2 border-foreground shadow-[3px_3px_0_var(--color-primary)]">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-primary uppercase tracking-tighter">Transcribing...</span>
                            <span className="font-mono text-primary">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-background border border-foreground overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {transcriptionError && (
                <p className="text-destructive text-sm font-bold border-2 border-destructive bg-destructive/5 p-3 shadow-[3px_3px_0_var(--color-destructive)]">
                    {transcriptionError}
                </p>
            )}

            {transcription && !isTranscribing && (
                <div className="space-y-2 p-4 bg-green-500/5 border-2 border-green-500 shadow-[3px_3px_0_rgba(34,197,94,0.3)]">
                    <p className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">
                        ✓ Transcription Complete
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">
                        {transcription.length} characters
                    </p>
                </div>
            )}
        </div>
    );
};
