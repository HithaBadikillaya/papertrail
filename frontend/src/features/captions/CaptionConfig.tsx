import React from "react";

interface CaptionConfigProps {
  platform: string;
  setPlatform: (platform: string) => void;
  tone: string;
  setTone: (tone: string) => void;
}

export const CaptionConfig: React.FC<CaptionConfigProps> = ({
  platform,
  setPlatform,
  tone,
  setTone,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
            2
          </span>
          Target Platform
        </label>
        <div className="flex flex-wrap gap-2">
          {["instagram", "twitter", "linkedin", "youtube", "whatsapp"].map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`px-4 py-2 text-[10px] font-bold border-2 transition-all uppercase tracking-tighter ${
                platform === p
                  ? "bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_var(--color-retro-ink)]"
                  : "bg-background border-foreground/20 text-foreground hover:border-foreground hover:shadow-[2px_2px_0_var(--color-retro-sand)]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
            3
          </span>
          Voice & Tone
        </label>
        <select
          className="w-full p-3 bg-background border-2 border-foreground rounded-sm text-sm font-bold focus:shadow-[3px_3px_0_var(--color-primary)] appearance-none cursor-pointer outline-none"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="casual">Casual & Relatable</option>
          <option value="professional">Sleek & Professional</option>
          <option value="promotional">Hype & High-Energy</option>
          <option value="witty">Witty & Sharp</option>
        </select>
      </div>
    </div>
  );
};
