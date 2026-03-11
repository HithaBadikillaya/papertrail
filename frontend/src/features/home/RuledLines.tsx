import React from "react";

const SAND = "var(--color-retro-sand)";

export function RuledLines({ count = 8 }: { count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-px"
          style={{
            top: `${(i + 1) * (100 / (count + 1))}%`,
            backgroundColor: SAND,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}
