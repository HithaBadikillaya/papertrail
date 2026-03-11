import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TERRACOTTA = "var(--color-retro-terracotta)";
const INK = "var(--color-retro-ink)";
const SLATE_BLUE = "var(--color-retro-slate)";
const LINEN = "var(--color-retro-linen)";
const PARCHMENT = "var(--color-retro-parchment)";
const SAND = "var(--color-retro-sand)";
const KHAKI = "var(--color-retro-khaki)";

const TOOLS = [
  {
    id: "captions",
    title: "Captions",
    label: "SOC-CAP",
    description: "Craft engaging social media captions with AI assistance - tailored to your voice and platform.",
    to: "/captions",
    accent: TERRACOTTA,
    bg: PARCHMENT,
    glyphLetter: "C",
    delay: 0.1,
  },
  {
    id: "letters",
    title: "Letters",
    label: "DOC-LET",
    description: "Generate professional letters for any occasion instantly - formal, casual, or persuasive.",
    to: "/letters",
    accent: SLATE_BLUE,
    bg: "#EBF0F8",
    glyphLetter: "L",
    delay: 0.2,
  },
  {
    id: "mom",
    title: "MoM",
    label: "MTG-MIN",
    description: "Record and summarize minutes of meetings automatically - structured, timestamped, shareable.",
    to: "/mom",
    accent: KHAKI,
    bg: "#F0EDE2",
    glyphLetter: "M",
    delay: 0.3,
  },
];

interface CardProps {
  title: string;
  label: string;
  description: string;
  to: string;
  accent: string;
  bg: string;
  glyphLetter: string;
  delay: number;
  disabled?: boolean;
}

function ToolCard({ title, label, description, to, accent, bg, glyphLetter, delay, disabled }: CardProps) {
  const inner = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={!disabled ? { y: -4 } : undefined}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col overflow-hidden h-full"
      style={{
        backgroundColor: bg,
        border: `2px solid ${INK}`,
        boxShadow: disabled ? "none" : `3px 3px 0 ${accent}`,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        filter: disabled ? "grayscale(0.4)" : "none",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        minHeight: 380,
      }}
      onMouseEnter={e => {
        if (!disabled) (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${accent}`;
      }}
      onMouseLeave={e => {
        if (!disabled) (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${accent}`;
      }}
    >
      {/* Header band */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b-2"
        style={{ borderColor: INK, backgroundColor: accent }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold text-white">
          {label}.EXE
        </span>
        <div className="flex gap-1.5">
          {["stop", "minimise", "go"].map(action => (
            <div
              key={action}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor: action === "stop" ? "#C4533A" : action === "minimise" ? "#D4A017" : "#3A8C4A",
                border: `1px solid ${INK}30`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Giant glyph / letter */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-6 pt-8 pb-4 relative"
      >
        <div
          className="absolute font-zilla font-bold select-none pointer-events-none"
          style={{
            fontSize: "clamp(120px, 20vw, 200px)",
            color: accent,
            opacity: 0.06,
            lineHeight: 1,
            bottom: "-15%",
            right: "-5%",
          }}
        >
          {glyphLetter}
        </div>

        {/* Ruled divider */}
        <div className="w-10 h-0.5 mb-6" style={{ backgroundColor: accent }} />

        {/* Title */}
        <h3 className="font-zilla font-bold text-4xl mb-3 relative z-10" style={{ color: INK }}>
          {title}
        </h3>

        {/* Description */}
        <p
          className="font-mono text-xs leading-relaxed text-center relative z-10 max-w-[22ch]"
          style={{ color: KHAKI }}
        >
          {description}
        </p>
      </div>

      {/* Footer CTA */}
      <div
        className="px-4 py-3 border-t-2 flex items-center justify-between"
        style={{ borderColor: INK }}
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: accent }}>
          {disabled ? "Unavailable" : "Open Program"}
        </span>
        {!disabled && (
          <span
            className="font-mono text-xs font-bold"
            style={{ color: accent }}
          >
            →
          </span>
        )}
      </div>
    </motion.article>
  );

  if (disabled) return <div className="w-full h-full">{inner}</div>;

  return (
    <Link
      to={to}
      onClick={() => window.scrollTo(0, 0)}
      className="w-full block no-underline focus:outline-none h-full"
    >
      {inner}
    </Link>
  );
}

/*Section wrapper*/
export default function FeatureCards() {
  return (
    <section
      className="w-full py-24 px-4 relative"
      style={{ backgroundColor: LINEN }}
    >
      {/* Ruled paper lines */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{ top: `${i * 5.5}%`, backgroundColor: SAND, opacity: 0.3 }}
          />
        ))}
      </div>

      {/* Left red margin rule */}
      <div
        className="absolute top-0 left-20 w-px h-full hidden md:block"
        style={{ backgroundColor: TERRACOTTA, opacity: 0.2 }}
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-px" style={{ backgroundColor: TERRACOTTA }} />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]" style={{ color: TERRACOTTA }}>
              Docs Generation · Select Tool
            </span>
          </div>
          <h2
            className="font-zilla font-bold leading-none"
            style={{
              fontSize: "clamp(40px, 7vw, 96px)",
              color: INK,
            }}
          >
            Explore Tools
          </h2>
          <div
            className="w-24 h-1 mt-3"
            style={{ backgroundColor: TERRACOTTA }}
          />
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TOOLS.map(tool => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>

        {/* Footer label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 font-mono text-[9px] uppercase tracking-[0.3em] text-center"
          style={{ color: KHAKI }}
        >
          No account required · Open Source · Self-hosted
        </motion.p>
      </div>
    </section>
  );
}
