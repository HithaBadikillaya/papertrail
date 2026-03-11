import React, { useState } from "react";

interface ResultsDisplayProps {
    generatedMoM: string;
    onExpand: () => void;
    isExpanding: boolean;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ generatedMoM, onExpand, isExpanding }) => {
    if (!generatedMoM) return null;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-700">
            <div className="bg-card border-2 border-foreground p-1 shadow-[8px_8px_0_var(--color-primary)] overflow-hidden">
                <div className="bg-background p-10 space-y-8">
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <span className="text-[10px] font-semibold text-primary tracking-[0.3em] uppercase">
                                All done!
                            </span>
                            <h4 className="text-3xl font-bold text-foreground tracking-tight">
                                Your Meeting Minutes
                            </h4>
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={onExpand}
                                disabled={isExpanding}
                                className="px-8 py-4 rounded-sm font-bold text-sm tracking-tight transition-all border-2 border-foreground shadow-[4px_4px_0_var(--color-retro-ink)] bg-primary/10 text-primary hover:translate-x-[1px] hover:translate-y-[1px] disabled:opacity-50"
                            >
                                {isExpanding ? "EXPANDING..." : "EXPAND"}
                            </button>
                            <CopyButton text={generatedMoM} />
                        </div>
                    </div>

                    <div className="relative group">
                        <textarea
                            className="w-full min-h-[600px] bg-muted/20 border-2 border-foreground p-6 rounded-sm outline-none text-base text-foreground/90 font-medium leading-relaxed resize-none shadow-[4px_4px_0_var(--color-retro-sand)] focus:shadow-[4px_4px_0_var(--color-primary)]"
                            value={generatedMoM}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`px-8 py-4 rounded-sm font-bold border-2 border-foreground transition-all shadow-[4px_4px_0_var(--color-retro-ink)] flex items-center gap-2 ${copied ? "bg-green-500 text-white" : "bg-foreground text-background hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
        >
            {copied ? "COPIED!" : "COPY"}
        </button>
    );
};
