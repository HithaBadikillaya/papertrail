import React from "react";

interface CaptionInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onGenerate: () => void;
  loading: boolean;
  disabled: boolean;
  error?: string;
}

export const CaptionInput: React.FC<CaptionInputProps & { children?: React.ReactNode }> = ({
  inputText,
  setInputText,
  onGenerate,
  loading,
  disabled,
  error,
  children,
}) => {
  return (
    <div className="bg-card border-2 border-foreground p-8 space-y-8 shadow-[6px_6px_0_var(--color-retro-sand)]">
      {children}
      <div className="space-y-4 pt-4 border-t border-border/50">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
            4
          </span>
          Brief (The Story)
        </label>
        <textarea
          className="w-full min-h-[180px] p-6 text-lg bg-background border-2 border-foreground rounded-sm focus:shadow-[4px_4px_0_var(--color-primary)] transition-all placeholder:text-muted-foreground/30 resize-none font-zilla leading-relaxed outline-none"
          placeholder="What's the story you want to tell? Paste raw notes or rough drafts..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading || disabled}
          className="px-10 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-sm border-2 border-foreground hover:translate-x-[2px] hover:translate-y-[2px] shadow-[6px_6px_0_var(--color-retro-ink)] active:shadow-none transition-all disabled:opacity-50 flex items-center gap-3 uppercase tracking-tight"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Craft Content</span>
          )}
        </button>
      </div>
      {error && (
        <p className="text-destructive text-center text-xs font-bold uppercase mt-2">
          {error}
        </p>
      )}
    </div>
  );
};
