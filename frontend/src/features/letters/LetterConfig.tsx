import React from "react";

interface LetterConfigProps {
  tone: string;
  setTone: (tone: string) => void;
}

export const LetterConfig: React.FC<LetterConfigProps> = ({ tone, setTone }) => {
  return (
    <div className="space-y-4">
      <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
        <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
          2
        </span>
        Letter Tone
      </label>
      <select
        className="w-full p-3 bg-background border-2 border-foreground rounded-sm text-sm font-bold focus:shadow-[3px_3px_0_var(--color-primary)] appearance-none cursor-pointer outline-none"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option value="formal">Strictly Formal</option>
        <option value="professional">Standard Professional</option>
        <option value="casual">Friendly & Casual</option>
        <option value="urgent">Urgent & Direct</option>
      </select>
    </div>
  );
};
