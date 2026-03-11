import React from "react";

const SAND = "var(--color-retro-sand)";
const INK = "var(--color-retro-ink)";

export function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
      <span style={{ color: SAND }}>{label}</span>
      <span className="w-8 h-px" style={{ backgroundColor: SAND }} />
      <span style={{ color: INK, fontWeight: 700 }}>{value}</span>
    </div>
  );
}
