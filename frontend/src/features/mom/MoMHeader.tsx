import React from "react";

interface MoMHeaderProps {
    onNewTemplate: () => void;
}

export const MoMHeader: React.FC<MoMHeaderProps> = ({ onNewTemplate }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border pb-6">
            <div className="space-y-1">
                <h2 className="text-4xl md:text-6xl font-zilla font-bold text-foreground tracking-tighter decoration-primary decoration-4 mb-2">
                    AI Minutes of Meetings
                </h2>
                <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase opacity-70">
                    Upload recordings, get structured notes
                </p>
            </div>
            <button
                onClick={onNewTemplate}
                className="px-6 py-3 bg-foreground text-background font-inter font-semibold rounded-sm border-2 border-foreground shadow-[4px_4px_0_var(--color-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm tracking-tighter"
            >
                + NEW TEMPLATE
            </button>
        </div>
    );
};
