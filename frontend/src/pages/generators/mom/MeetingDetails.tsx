import React from "react";

interface MeetingDetailsProps {
    transcription: string;
    meetingTitle: string;
    setMeetingTitle: (title: string) => void;
    handleGenerate: () => void;
    isGenerating: boolean;
    selectedTemplateId: string;
    templatesLoading: boolean;
    generationError: string;
}

export const MeetingDetails: React.FC<MeetingDetailsProps> = ({
    transcription,
    meetingTitle,
    setMeetingTitle,
    handleGenerate,
    isGenerating,
    selectedTemplateId,
    templatesLoading,
    generationError,
}) => {
    if (!transcription) return null;

    return (
        <div className="bg-card border-2 border-foreground p-8 space-y-4 shadow-[6px_6px_0_var(--color-retro-sand)]">
            <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">2</span>
                Meeting Details
            </label>
            <input
                type="text"
                className="w-full p-4 bg-background border-2 border-foreground rounded-sm text-foreground font-bold focus:shadow-[4px_4px_0_var(--color-primary)] transition-all placeholder:text-muted-foreground/30 outline-none"
                placeholder="Meeting Title (Optional)"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
            />

            <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !selectedTemplateId || templatesLoading}
                className="w-full py-5 bg-primary text-primary-foreground text-xl font-bold rounded-sm border-2 border-foreground shadow-[6px_6px_0_var(--color-retro-ink)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-tight"
            >
                {isGenerating ? (
                    <span className="w-6 h-6 border-4 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                    "GENERATE MINUTES"
                )}
            </button>

            {generationError && (
                <p className="text-destructive text-center text-xs font-bold uppercase mt-2">
                    {generationError}
                </p>
            )}
        </div>
    );
};
