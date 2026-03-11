import React from "react";

const TERRACOTTA = "var(--color-retro-terracotta)";

export function StampBadge({ children, rotate = 0 }: { children: React.ReactNode; rotate?: number }) {
  return (
    <div
      className="inline-block px-4 py-1.5 border-2 font-mono font-bold text-[9px] uppercase tracking-[0.3em]"
      style={{
        borderColor: TERRACOTTA,
        color: TERRACOTTA,
        transform: `rotate(${rotate}deg)`,
        boxShadow: `1px 1px 0 ${TERRACOTTA}`,
      }}
    >
      {children}
    </div>
  );
}
