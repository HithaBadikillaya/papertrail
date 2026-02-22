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
        <div className="bg-card/40 backdrop-blur-xl border border-border rounded-3xl p-8 space-y-6 shadow-xl">
            <label className="text-xs font-black tracking-widest text-muted-foreground uppercase opacity-80">
                Upload Audio/Video
            </label>

            <div
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer ${isDragging
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
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
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    {uploadedFile ? (
                        <div className="space-y-1">
                            <p className="font-bold text-foreground">{uploadedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <p className="font-bold text-foreground">Drop file here or click to upload</p>
                            <p className="text-xs text-muted-foreground">
                                MP3, MP4, MOV, WAV, WebM up to 4GB
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {isTranscribing && (
                <div className="space-y-3 p-4 bg-primary/10 rounded-xl border border-primary/20">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-primary">Transcribing...</span>
                            <span className="font-mono text-primary">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    {uploadedFile && (
                        <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-primary/20">
                            <p>File: {uploadedFile.name}</p>
                            <p>Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                            {uploadedFile.size > 50 * 1024 * 1024 && (
                                <p className="text-primary/70">⏱ Large files split into chunks; processing...</p>
                            )}
                        </div>
                    )}
                </div>
            )}

            {transcriptionError && (
                <p className="text-destructive text-sm font-bold bg-destructive/10 p-3 rounded-xl">
                    {transcriptionError}
                </p>
            )}

            {transcription && !isTranscribing && (
                <div className="space-y-2 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                    <p className="text-xs font-black text-green-700 dark:text-green-400 uppercase tracking-widest">
                        ✓ Transcription Complete
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {transcription.length} characters
                    </p>
                </div>
            )}
        </div>
    );
};
