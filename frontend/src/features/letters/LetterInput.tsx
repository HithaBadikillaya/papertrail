import React from "react";

interface LetterInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onGenerate: () => void;
  loading: boolean;
  disabled: boolean;
  error?: string;
  children?: React.ReactNode;
}

export const LetterInput: React.FC<LetterInputProps> = ({
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {children}
      </div>

      <div className="space-y-4 pt-4 border-t border-border/50">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
            3
          </span>
          The Context (Input Details)
        </label>
        <textarea
          className="w-full min-h-[220px] p-6 text-lg bg-background border-2 border-foreground rounded-sm focus:shadow-[4px_4px_0_var(--color-primary)] transition-all placeholder:text-muted-foreground/30 resize-none font-zilla leading-relaxed outline-none"
          placeholder="What's the situation? Define the purpose, recipient, and key points of the letter..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onGenerate}
          disabled={loading || disabled}
          className="px-12 py-5 bg-primary text-primary-foreground text-xl font-bold rounded-sm border-2 border-foreground hover:translate-x-[2px] hover:translate-y-[2px] shadow-[6px_6px_0_var(--color-retro-ink)] active:shadow-none transition-all disabled:opacity-50 flex items-center gap-3 uppercase tracking-tight"
        >
          {loading ? (
            <span className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Formalize Draft</span>
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
