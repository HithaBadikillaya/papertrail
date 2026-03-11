import React from "react";
import { ExportOptions } from "../../components/ui/ExportOptions";

interface LetterResultsProps {
  letter: string;
  onExpand: () => void;
  loading: boolean;
}

export const LetterResults: React.FC<LetterResultsProps> = ({
  letter,
  onExpand,
  loading,
}) => {
  if (!letter) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-card border-2 border-foreground p-1 shadow-[10px_10px_0_var(--color-primary)] overflow-hidden">
        <div className="bg-retro-linen p-12 space-y-10 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 pointer-events-none" />
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-primary tracking-[0.4em] uppercase">
                Official Correspondence
              </span>
              <h4 className="text-2xl font-bold text-foreground tracking-tight">
                Document Finalized
              </h4>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onExpand}
                disabled={loading}
                className="px-6 py-3 rounded-sm font-bold text-xs tracking-tight transition-all bg-background border-2 border-foreground shadow-[3px_3px_0_var(--color-retro-ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--color-retro-ink)] disabled:opacity-50"
              >
                {loading ? "Elaborating..." : "Elaborate Script"}
              </button>
              <ExportOptions content={letter} filename="formal_letter" />
            </div>
          </div>

          <div className="relative group p-10 bg-white/40 border-2 border-foreground rounded-sm shadow-[4px_4px_0_var(--color-retro-sand)] min-h-[600px]">
            <div className="whitespace-pre-wrap font-zilla text-xl leading-relaxed text-foreground/90 selection:bg-primary/20 italic">
              {letter}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
