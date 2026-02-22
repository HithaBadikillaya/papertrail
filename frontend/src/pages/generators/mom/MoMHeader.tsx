import React from "react";

interface MoMHeaderProps {
    onNewTemplate: () => void;
}

export const MoMHeader: React.FC<MoMHeaderProps> = ({ onNewTemplate }) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border pb-6">
            <div className="space-y-1">
                <h2 className="text-4xl md:text-6xl font-amarna font-black text-foreground tracking-tighter">
                    MEETING MINUTES
                </h2>
                <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase opacity-70">
                    Upload recordings, get structured notes
                </p>
            </div>
            <button
                onClick={onNewTemplate}
                className="px-6 py-3 bg-foreground text-background font-black rounded-full hover:scale-105 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-sm tracking-tighter"
            >
                + NEW TEMPLATE
            </button>
        </div>
    );
};
