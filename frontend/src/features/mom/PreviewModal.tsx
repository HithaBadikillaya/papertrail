import React from "react";
import type { Template } from "./types";

interface PreviewModalProps {
    template: Template | null;
    onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ template, onClose }) => {
    if (!template) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
            <div className="bg-card border-4 border-foreground w-full max-w-xl shadow-[8px_8px_0_var(--color-primary)] p-10 space-y-8 animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center border-b border-border pb-6">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight uppercase font-inter">
                        {template.name}
                    </h3>
                    <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-sm border border-foreground uppercase tracking-widest font-inter">
                        {template.type}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase opacity-70">
                        Expected Content Layout
                    </label>
                    <div className="p-8 bg-muted/30 rounded-sm border-2 border-dashed border-border/50 text-foreground font-bold text-lg text-center flex flex-col gap-4">
                        {template.structure.split(/\s*[+→]\s*/).map((step, i) => (
                            <div
                                key={i}
                                className="py-2 bg-background border-2 border-foreground shadow-[3px_3px_0_var(--color-retro-sand)]"
                            >
                                {step.trim()}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-foreground text-background rounded-sm font-bold uppercase tracking-tight border-2 border-foreground shadow-[4px_4px_0_var(--color-primary)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all font-inter"
                >
                    CLOSE PREVIEW
                </button>
            </div>
        </div>
    );
};
