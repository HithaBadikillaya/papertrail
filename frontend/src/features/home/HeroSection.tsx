import React, { useRef } from "react";
import { motion } from "framer-motion";
import { RuledLines } from "./RuledLines";
import { MetaLine } from "./MetaLine";
import { StampBadge } from "./StampBadge";

const TERRACOTTA = "var(--color-retro-terracotta)";
const CRIMSON = "var(--color-retro-crimson)";
const INK = "var(--color-retro-ink)";
const LINEN = "var(--color-retro-linen)";
const PARCHMENT = "var(--color-retro-parchment)";
const SAND = "var(--color-retro-sand)";
const KHAKI = "var(--color-retro-khaki)";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: LINEN }}
    >
      <RuledLines count={14} />

      <div
        className="absolute top-0 left-24 w-px h-full"
        style={{ backgroundColor: TERRACOTTA, opacity: 0.25 }}
        aria-hidden
      />

      <div
        className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-3 z-10 border-b"
        style={{ borderColor: `${SAND}88`, backgroundColor: `${PARCHMENT}CC` }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.25em]" style={{ color: KHAKI }}>
          Papertrail · Archive System · PT-2026-A
        </span>
        <div className="flex items-center gap-4">
          <MetaLine label="Status" value="Active" />
          <MetaLine label="Class" value="Open Source" />
        </div>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 pt-28 pb-20">
        <div className="grid grid-cols-12 gap-4 items-start mb-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-5 lg:col-span-4 relative overflow-hidden min-h-[200px] md:min-h-[280px]"
            style={{ border: `2px solid ${INK}` }}
          >
            <img
              src="/assets/typo1.jpg"
              alt="Papertrail - collage typography logotype"
              className="w-full h-full object-cover min-h-[200px] md:min-h-[280px]"
              style={{ filter: "contrast(1.05) saturate(0.95)" }}
            />
            <div className="absolute top-3 left-3">
              <StampBadge rotate={-3}>Archival</StampBadge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-between min-h-0 md:min-h-[280px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px" style={{ backgroundColor: TERRACOTTA }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: TERRACOTTA }}>
                Documentation Engine · v2.0
              </span>
            </div>

            <div className="relative">
              <h1
                className="font-zilla leading-[0.88] tracking-tighter select-none"
                style={{
                  fontSize: "clamp(64px, 11vw, 152px)",
                  color: INK,
                  fontWeight: 700,
                }}
              >
                PAPER
                <br />
                <span style={{ color: TERRACOTTA }}>TRAIL</span>
                <span
                  className="inline-block w-[3px] ml-1"
                  style={{
                    height: "0.85em",
                    backgroundColor: TERRACOTTA,
                    verticalAlign: "text-bottom",
                    animation: "blinkCaret 1s step-end infinite",
                  }}
                />
              </h1>

              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1.0, ease: "circOut" }}
                className="absolute pointer-events-none"
                style={{
                  bottom: "12%",
                  left: 0,
                  width: "55%",
                  height: "18%",
                  backgroundColor: `${SAND}60`,
                  zIndex: -1,
                }}
              />
            </div>

            <p
              className="mt-6 font-mono text-sm leading-relaxed max-w-lg"
              style={{ color: KHAKI }}
            >
              Turn audio, video, and conversations into precise written documents
              - captions, letters, meeting minutes - no accounts, no lock-in.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-4 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="col-span-12 md:col-span-3 flex flex-col justify-between p-5"
            style={{
              border: `1px solid ${SAND}`,
              backgroundColor: PARCHMENT,
              borderLeft: `3px solid ${TERRACOTTA}`,
            }}
          >
            <div className="space-y-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: KHAKI }}>
                Archive Index
              </p>
              <div className="space-y-2">
                <MetaLine label="Ref" value="PT-ARC-26" />
                <MetaLine label="Type" value="Class A" />
                <MetaLine label="Build" value="2.0.0" />
                <MetaLine label="Host" value="Self" />
                <MetaLine label="License" value="Open" />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" style={{ animation: "pulse 2s infinite" }} />
              <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: INK }}>
                Archive Ready
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="col-span-12 md:col-span-4 relative overflow-hidden min-h-[160px] md:min-h-[240px]"
            style={{ border: `2px solid ${INK}` }}
          >
            <img
              src="/assets/typo2.jpg"
              alt="Papertrail - alternate collage logotype"
              className="w-full h-full object-cover min-h-[160px] md:min-h-[240px]"
              style={{ filter: "contrast(1.02) saturate(0.98)" }}
            />
            <div
              className="absolute bottom-4 right-4"
              style={{ transform: "rotate(3deg)" }}
            >
              <StampBadge rotate={3}>Open Source</StampBadge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="col-span-12 md:col-span-5 flex flex-col justify-between p-6"
            style={{ backgroundColor: INK }}
          >
            <div>
              <p
                className="font-mono text-[9px] uppercase tracking-[0.25em] mb-3"
                style={{ color: SAND }}
              >
                Archival Integrity
              </p>
              <p
                className="font-zilla text-lg leading-relaxed"
                style={{ color: PARCHMENT }}
              >
                Procedural generation and automated transcription ensure every
                sync, meeting, and milestone is captured with{" "}
                <em style={{ color: TERRACOTTA }}>surgical precision</em>.
                Papertrail is the evolutionary history of your work.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/captions"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-200"
                style={{
                  backgroundColor: TERRACOTTA,
                  color: PARCHMENT,
                  border: `1px solid ${TERRACOTTA}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = CRIMSON;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = CRIMSON;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = TERRACOTTA;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = TERRACOTTA;
                }}
              >
                Begin Archive ↗
              </a>
              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] font-bold transition-all duration-200"
                style={{
                  backgroundColor: "transparent",
                  color: PARCHMENT,
                  border: `1px solid ${SAND}55`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = PARCHMENT;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${SAND}55`;
                }}
              >
                View Index ↓
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes blinkCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
