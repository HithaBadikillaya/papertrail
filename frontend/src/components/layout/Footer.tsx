import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TERRACOTTA = "var(--color-retro-terracotta)";
const PARCHMENT = "var(--color-retro-parchment)";
const SAND = "var(--color-retro-sand)";

export default function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-footer-bg)",
        borderTop: `2px solid var(--color-footer-border)`
      }}
    >
      {/* Subtle ruled lines on dark background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px"
            style={{ top: `${(i + 1) * 6.25}%`, backgroundColor: PARCHMENT, opacity: 0.04 }}
          />
        ))}
      </div>

      {/* Left vertical rule */}
      <div
        className="absolute top-0 left-16 w-px h-full hidden lg:block"
        style={{ backgroundColor: TERRACOTTA, opacity: 0.15 }}
        aria-hidden
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-5 space-y-5">
            {/* Masthead */}
            <div>
              <p
                className="font-mono text-[9px] uppercase tracking-[0.35em] mb-2"
                style={{ color: TERRACOTTA }}
              >
                Artifact System · Archive
              </p>
              <h2
                className="font-zilla font-bold leading-none"
                style={{ fontSize: "clamp(48px, 7vw, 80px)", color: PARCHMENT }}
              >
                papertrail.
              </h2>
              <div
                className="w-16 h-0.5 mt-2"
                style={{ backgroundColor: TERRACOTTA }}
              />
            </div>

            <p
              className="font-mono text-xs leading-relaxed max-w-xs"
              style={{ color: SAND, borderLeft: `2px solid ${TERRACOTTA}`, paddingLeft: "1rem" }}
            >
              Turn audio or video into clear written documents.
              No accounts. No permanent storage. No vendor lock-in.
            </p>

            {/* Meta badge row */}
            <div className="flex flex-wrap gap-2">
              {["Open Source", "Self-Hosted", "Privacy-First"].map(tag => (
                <span
                  key={tag}
                  className="font-mono text-[8px] uppercase tracking-[0.25em] px-2 py-1 border"
                  style={{ borderColor: `${SAND}55`, color: SAND }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Quick links */}
          <nav className="md:col-span-3 space-y-4" aria-label="Papertrail tools index">
            <h3
              className="font-mono font-bold text-[9px] uppercase tracking-[0.3em] pb-2 border-b"
              style={{ color: TERRACOTTA, borderColor: `${TERRACOTTA}44` }}
            >
              Tool Index
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Captions", to: "/captions", code: "CAP" },
                { label: "Letters", to: "/letters", code: "LET" },
                { label: "MoM", to: "/mom", code: "MOM" },
              ].map(item => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-3 font-zilla text-base transition-all duration-200 group"
                    style={{ color: `${PARCHMENT}CC` }}
                  >
                    <span
                      className="font-mono text-[8px]"
                      style={{ color: TERRACOTTA }}
                    >
                      [{item.code}]
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Archive / metadata */}
          <div className="md:col-span-3 space-y-4">
            <h3
              className="font-mono font-bold text-[9px] uppercase tracking-[0.3em] pb-2 border-b"
              style={{ color: TERRACOTTA, borderColor: `${TERRACOTTA}44` }}
            >
              Archive Notes
            </h3>
            <div className="space-y-2 font-mono text-[10px] leading-relaxed" style={{ color: SAND }}>
              <p>Documentation Portal v2.0</p>
              <p style={{ opacity: 0.6 }}>
                A decentralised generation system for professional documentation.
              </p>
              <p className="pt-2" style={{ color: TERRACOTTA, fontWeight: 700 }}>
                © 2026 PAPERTRAIL.ARC
              </p>
            </div>
          </div>
        </div>

        {/* Bottom classification bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-between items-center pt-4 border-t"
          style={{ borderColor: `${SAND}22` }}
        >
          <span className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: `${SAND}60` }}>
            Ref: PT-2026-X · Class: Open
          </span>
          <span className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: `${SAND}60` }}>
            Build 2.0.0 · Page 1 of 1
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
