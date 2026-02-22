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
        <div className="bg-card/40 backdrop-blur-xl border border-border rounded-3xl p-8 space-y-4 shadow-xl">
            <label className="text-xs font-black tracking-widest text-muted-foreground uppercase opacity-80">
                Meeting Details
            </label>
            <input
                type="text"
                className="w-full p-4 bg-background/50 border border-border rounded-2xl text-foreground font-bold focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/30"
                placeholder="Meeting Title (Optional)"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
            />

            <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !selectedTemplateId || templatesLoading}
                className="w-full py-5 bg-primary text-primary-foreground text-xl font-black rounded-2xl hover:brightness-110 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-tighter"
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
