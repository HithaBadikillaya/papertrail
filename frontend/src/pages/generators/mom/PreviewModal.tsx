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
            <div className="bg-card border border-border w-full max-w-xl rounded-[2.5rem] shadow-2xl p-10 space-y-8">
                <div className="flex justify-between items-center border-b border-border pb-6">
                    <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase">
                        {template.name}
                    </h3>
                    <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-widest">
                        {template.type}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black text-muted-foreground tracking-widest uppercase opacity-70">
                        Expected Content Layout
                    </label>
                    <div className="p-8 bg-muted/30 rounded-[2rem] border-2 border-dashed border-border/50 text-foreground font-bold text-lg text-center flex flex-col gap-4">
                        {template.structure.split(/\s*[+→]\s*/).map((step, i) => (
                            <div
                                key={i}
                                className="py-2 bg-background/50 rounded-xl border border-border/20 shadow-sm"
                            >
                                {step.trim()}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-foreground text-background rounded-2xl font-black uppercase tracking-tighter hover:brightness-110 active:scale-[0.98] transition-all"
                >
                    CLOSE PREVIEW
                </button>
            </div>
        </div>
    );
};
