import React from "react";
import type { Template } from "./types";

interface PreviewModalProps {
  template: Template | null;
  onClose: () => void;
  structureLabel?: string;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  template,
  onClose,
  structureLabel = "Anticipated Content Layout",
}) => {
  if (!template) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
      <div className="bg-card border-4 border-foreground w-full max-w-xl shadow-2xl p-10 space-y-8">
        <div className="flex justify-between items-center border-b border-border pb-6">
          <h3 className="text-2xl font-bold text-foreground tracking-tight uppercase">
            {template.name}
          </h3>
          <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-sm border border-foreground uppercase tracking-widest shadow-[2px_2px_0_var(--color-primary)]">
            {template.type}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase opacity-70">
            {structureLabel}
          </label>
          <div className="p-8 bg-muted/30 rounded-sm border-2 border-dashed border-border/50 text-foreground font-bold text-lg text-center flex flex-col gap-4">
            {template.structure?.split(/\s*[+→]\s*/).map((step, i) => (
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
          className="w-full py-4 bg-foreground text-background border-2 border-foreground rounded-sm font-bold uppercase tracking-tight hover:translate-x-[1px] hover:translate-y-[1px] shadow-[4px_4px_0_var(--color-primary)] transition-all"
        >
          CLOSE PREVIEW
        </button>
      </div>
    </div>
  );
};
