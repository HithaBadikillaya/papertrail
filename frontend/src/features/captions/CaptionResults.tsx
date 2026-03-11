import React from "react";
import { ExportOptions } from "../../components/ui/ExportOptions";

interface CaptionResultsProps {
  caption: string;
  onExpand: () => void;
  loading: boolean;
}

export const CaptionResults: React.FC<CaptionResultsProps> = ({
  caption,
  onExpand,
  loading,
}) => {
  if (!caption) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="bg-card border-2 border-foreground p-1 shadow-[8px_8px_0_var(--color-primary)] overflow-hidden">
        <div className="bg-retro-linen p-10 space-y-8 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 pointer-events-none" />
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-primary tracking-[0.3em] uppercase">
                Manuscript Ready
              </span>
              <h4 className="text-2xl font-bold text-foreground tracking-tight">
                Caption is ready!
              </h4>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onExpand}
                disabled={loading}
                className="px-6 py-3 rounded-sm font-bold text-xs tracking-tight transition-all bg-background border-2 border-foreground shadow-[3px_3px_0_var(--color-retro-ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--color-retro-ink)] disabled:opacity-50"
              >
                {loading ? "Expanding..." : "Expand Copy"}
              </button>
              <ExportOptions content={caption} filename="caption" />
            </div>
          </div>

          <div className="relative group">
            <textarea
              className="w-full min-h-[600px] bg-white/50 border-2 border-foreground p-8 rounded-sm outline-none text-xl text-foreground/90 font-zilla italic shadow-[4px_4px_0_var(--color-retro-sand)] leading-relaxed resize-none"
              value={caption}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};
