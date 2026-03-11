"use client";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

const steps = [
    {
        id: 1,
        title: "1. The Skeleton",
        subtitle: "Structure First",
        description: "Every great document starts with a strong backbone. Choose a template layout that fits your needs - whether it's a formal letter or a punchy social post.",
        visualType: "skeleton"
    },
    {
        id: 2,
        title: "2. The Spark",
        subtitle: "Your Raw Ideas",
        description: "Don't worry about phrasing. Just pour your raw, messy thoughts into the input field. Bullet points, brain dumps, or keywords - we take it all.",
        visualType: "spark"
    },
    {
        id: 3,
        title: "3. The Instruction",
        subtitle: "Guide the AI",
        description: "Tell the AI exactly how to behave. 'Act as a lawyer', 'Summarize briefly', or 'Be funny'. Your instructions shape the output.",
        visualType: "instruction"
    },
    {
        id: 4,
        title: "4. The Vibe",
        subtitle: "Set the Tone",
        description: "This is where the magic happens. Dial in the mood you want. Professional? Witty? Empathetic? You control the voice of the final output.",
        visualType: "vibe"
    },
    {
        id: 5,
        title: "5. The Source",
        subtitle: "System vs Custom",
        description: "Need speed? Grab a battle-tested system template. Need control? Forge your own custom path. The choice is yours.",
        visualType: "source"
    }
];

export default function TemplateUsageGuide() {
    const containerRef = useRef<HTMLElement>(null);
    const [activeStep, setActiveStep] = useState(1);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Update active step based on scroll position
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.20) setActiveStep(1);
        else if (latest < 0.40) setActiveStep(2);
        else if (latest < 0.60) setActiveStep(3);
        else if (latest < 0.80) setActiveStep(4);
        else setActiveStep(5);
    });

    return (
        <div className="relative" style={{ backgroundColor: "var(--color-retro-linen)" }}>
            {/* Ruled paper lines background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-px"
                        style={{
                            top: `${(i + 1) * 3.33}%`,
                            backgroundColor: "var(--color-retro-sand)",
                            opacity: 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Left margin red rule */}
            <div
                className="absolute top-0 left-24 w-px h-full hidden lg:block"
                style={{ backgroundColor: "var(--color-retro-terracotta)", opacity: 0.2 }}
                aria-hidden
            />

            <div className="container mx-auto px-6 pt-24 pb-8 text-center relative z-10 lg:hidden">
                <h2 className="text-4xl md:text-6xl font-zilla font-bold text-foreground mb-4" style={{ color: "var(--color-retro-ink)" }}>
                    How does it work?
                </h2>
                <p className="font-mono text-sm tracking-[0.2em] uppercase font-bold" style={{ color: "var(--color-retro-terracotta)" }}>
                    Archival Workflow
                </p>
            </div>

            {/* Sticky Scrolling Section */}
            <section ref={containerRef} className="relative h-[400vh]">
                <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">

                    {/* Red corner stamp placeholder or rule */}
                    <div className="absolute top-10 right-10 w-32 h-32 border-2 border-dashed border-retro-terracotta/20 rounded-none opacity-20 pointer-events-none hidden lg:block" />

                    <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">

                        {/* Header: Visible on Desktop (Sticky) */}
                        <div className="text-center mb-16 hidden lg:block">
                            <h2 className="text-6xl font-zilla font-bold mb-6" style={{ color: "var(--color-retro-ink)" }}>
                                How does it work?
                            </h2>
                            <p className="font-mono text-sm tracking-[0.2em] uppercase font-bold" style={{ color: "var(--color-retro-terracotta)" }}>
                                Registry Process · Archive Standard
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto">

                            {/* LEFT COLUMN: Changing Text */}
                            <div className="space-y-4 lg:space-y-8 min-h-[200px] lg:min-h-[300px] flex flex-col justify-center order-2 lg:order-1">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeStep}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.4 }}
                                        className="space-y-4"
                                    >
                                        {steps.filter(s => s.id === activeStep).map((step) => (
                                            <div key={step.id}>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div 
                                                        className="w-8 h-8 lg:w-10 lg:h-10 text-white font-mono font-bold flex items-center justify-center text-base lg:text-lg border-2"
                                                        style={{ backgroundColor: "var(--color-retro-terracotta)", borderColor: "var(--color-retro-ink)" }}
                                                    >
                                                        {step.id}
                                                    </div>
                                                    <span className="font-mono text-xs tracking-[0.2em] uppercase font-bold" style={{ color: "var(--color-retro-terracotta)" }}>
                                                        {step.subtitle}
                                                    </span>
                                                </div>

                                                <h3 className="font-amarna text-3xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                                                    {step.title}
                                                </h3>
                                                <p className="font-sans text-base lg:text-xl leading-relaxed text-muted-foreground pt-2 lg:pt-4 max-w-lg">
                                                    {step.description}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Progress Indicators */}
                                <div className="flex gap-2 pt-4 lg:pt-8">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-2 duration-300 ${i === activeStep ? 'w-12 bg-retro-terracotta' : 'w-4 bg-retro-sand opacity-50'}`}
                                            style={{ backgroundColor: i === activeStep ? "var(--color-retro-terracotta)" : "var(--color-retro-sand)" }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Changing Visuals */}
                            <div className="relative h-[300px] lg:h-[450px] flex items-center justify-center p-4 order-1 lg:order-2">
                                {/* Retro Window Container */}
                                <div 
                                    className="w-full h-full bg-retro-cream border-2 overflow-hidden flex flex-col shadow-[6px_6px_0px_0px_var(--color-retro-ink)] transition-shadow duration-300"
                                    style={{ borderColor: "var(--color-retro-ink)", backgroundColor: "var(--color-retro-parchment)" }}
                                >
                                    {/* Window Header */}
                                    <div className="h-10 w-full border-b flex items-center px-4 justify-between" style={{ borderColor: "var(--color-retro-ink)", backgroundColor: "var(--color-retro-sand)" }}>
                                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold truncate" style={{ color: "var(--color-retro-ink)" }}>
                                            {steps.find(s => s.id === activeStep)?.subtitle || "papertrail"}.exe
                                        </span>
                                        <div className="flex gap-2">
                                            <div className="w-2.5 h-2.5 rounded-none border border-retro-ink bg-retro-terracotta"></div>
                                            <div className="w-2.5 h-2.5 rounded-none border border-retro-ink bg-retro-sand"></div>
                                            <div className="w-2.5 h-2.5 rounded-none border border-retro-ink bg-retro-khaki"></div>
                                        </div>
                                    </div>

                                    {/* Window Content */}
                                    <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden">                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeStep}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 1.05 }}
                                                transition={{ duration: 0.4 }}
                                                className="relative z-10 w-full max-w-xs h-full flex items-center justify-center"
                                            >
                                                {/* VISUAL 1: The Skeleton (Building Blocks) */}
                                                {activeStep === 1 && (
                                                    <div className="flex flex-col items-center gap-3 w-full">
                                                        {["Start with a Hook", "Add Key Details", "End with Action"].map((text, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ x: -20, opacity: 0 }}
                                                                animate={{ x: 0, opacity: 1 }}
                                                                transition={{ delay: i * 0.15 + 0.2 }}
                                                                className="w-full bg-white border border-dashed p-4 rounded-none text-center shadow-sm"
                                                                style={{ borderColor: "var(--color-retro-terracotta)" }}
                                                            >
                                                                <span className="font-mono uppercase tracking-widest text-xs font-bold" style={{ color: "var(--color-retro-terracotta)" }}>{text}</span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* VISUAL 2: The Spark (Transformation) */}
                                                {activeStep === 2 && (
                                                    <div className="relative h-60 w-full bg-white shadow-lg rounded-none p-4 overflow-hidden border" style={{ borderColor: "var(--color-retro-sand)" }}>
                                                        <div className="absolute inset-0 font-mono text-[10px] text-muted-foreground/10 p-4 leading-loose select-none uppercase">
                                                            archival raw data processing... ideas flowing random thoughts...
                                                        </div>

                                                        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
                                                            <motion.div
                                                                animate={{ rotate: [0, -2, 2, 0] }}
                                                                transition={{ duration: 4, repeat: Infinity }}
                                                                className="bg-retro-parchment text-foreground p-4 rounded-none shadow-sm font-zilla text-lg border -rotate-1"
                                                                style={{ borderColor: "var(--color-retro-terracotta)" }}
                                                            >
                                                                "Just a messy idea..."
                                                            </motion.div>
                                                            <div className="text-retro-terracotta text-xl">↓</div>
                                                            <div className="font-mono text-[10px] bg-retro-linen p-3 rounded-none w-full border border-retro-sand text-center uppercase tracking-widest" style={{ color: "var(--color-retro-khaki)" }}>
                                                                Standardised Input
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* VISUAL 3: The Instruction (Command Center) */}
                                                {activeStep === 3 && (
                                                    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="bg-retro-ink text-retro-linen font-mono p-6 rounded-none w-full max-w-[280px] shadow-lg border-2 border-retro-terracotta/30 relative overflow-hidden"
                                                        >
                                                            {/* Scanline effect */}
                                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 pointer-events-none bg-[length:100%_4px]" />

                                                            <div className="flex gap-2 mb-4 opacity-50">
                                                                <div className="w-2 h-2 rounded-none bg-retro-terracotta" />
                                                                <div className="w-2 h-2 rounded-none bg-retro-sand" />
                                                                <div className="w-2 h-2 rounded-none bg-retro-khaki" />
                                                            </div>
                                                            <div className="text-[10px] uppercase tracking-tighter leading-relaxed space-y-2">
                                                                <div><span style={{ color: "var(--color-retro-terracotta)" }}>Command:</span> Act as Archiver</div>
                                                                <div><span style={{ color: "var(--color-retro-terracotta)" }}>Priority:</span> High Integrity</div>
                                                                <div><span className="text-white opacity-40">&gt;</span> Awaiting stream...<span className="animate-pulse">_</span></div>
                                                            </div>
                                                        </motion.div>
                                                        <div className="bg-white border px-4 py-2 rounded-none shadow-sm" style={{ borderColor: "var(--color-retro-terracotta)" }}>
                                                            <span className="font-mono text-[10px] uppercase tracking-widest text-retro-terracotta font-bold">Instruction set loaded</span>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* VISUAL 4: The Vibe (Tone Slider) */}
                                                {activeStep === 4 && (
                                                    <div className="bg-white border-2 p-6 rounded-none shadow-md space-y-6 w-full" style={{ borderColor: "var(--color-retro-sand)" }}>
                                                        {/* Slider 1 */}
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                                <span>Casual</span>
                                                                <span>Formal</span>
                                                            </div>
                                                            <div className="h-2 bg-retro-linen rounded-none overflow-hidden relative border border-retro-sand">
                                                                <motion.div
                                                                    className="absolute top-0 bottom-0 bg-retro-terracotta w-4 rounded-none"
                                                                    animate={{ left: ["10%", "80%", "40%"] }}
                                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Slider 2 */}
                                                        <div className="space-y-2">
                                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                                <span>Brief</span>
                                                                <span>Detailed</span>
                                                            </div>
                                                            <div className="h-2 bg-retro-linen rounded-none overflow-hidden relative border border-retro-sand">
                                                                <motion.div
                                                                    className="absolute top-0 bottom-0 bg-retro-terracotta w-4 rounded-none"
                                                                    animate={{ left: ["20%", "90%", "60%"] }}
                                                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="text-center font-zilla text-lg pt-1" style={{ color: "var(--color-retro-ink)" }}>
                                                            "Perfectly balanced."
                                                        </div>
                                                    </div>
                                                )}

                                                {/* VISUAL 5: The Source (System vs Custom) */}
                                                {activeStep === 5 && (
                                                    <div className="flex gap-4 items-center justify-center w-full h-full">
                                                        {/* Custom Card */}
                                                        <motion.div
                                                            initial={{ x: 20, rotate: 5 }}
                                                            animate={{ x: 0, rotate: -2 }}
                                                            transition={{ duration: 0.5 }}
                                                            className="w-32 h-40 bg-white border-2 border-retro-terracotta rounded-none shadow-lg flex flex-col items-center justify-center gap-2 p-2 relative z-10"
                                                        >
                                                            <div className="absolute -top-3 -right-3 bg-retro-terracotta text-white rounded-none p-1 shadow-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                                                            </div>
                                                            <div className="w-10 h-10 border border-retro-terracotta/30 rounded-none flex items-center justify-center bg-retro-parchment text-xl">
                                                                🛠️
                                                            </div>
                                                            <div className="text-center">
                                                                <span className="font-bold text-retro-terracotta font-mono text-[10px] block uppercase">CUSTOM</span>
                                                                <span className="text-[10px] text-muted-foreground leading-tight block mt-1 uppercase">Forge path</span>
                                                            </div>
                                                        </motion.div>

                                                        {/* System Card */}
                                                        <motion.div
                                                            initial={{ x: -20, rotate: -5 }}
                                                            animate={{ x: 0, rotate: 3 }}
                                                            transition={{ duration: 0.5, delay: 0.1 }}
                                                            className="w-32 h-40 bg-retro-linen border-2 border-retro-slate rounded-none shadow-lg flex flex-col items-center justify-center gap-2 p-2"
                                                        >
                                                            <div className="absolute -top-3 -left-3 bg-retro-slate text-white rounded-none p-1 shadow-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                            </div>
                                                            <div className="w-10 h-10 border border-retro-slate/30 rounded-none flex items-center justify-center bg-white text-xl">
                                                                ⚡
                                                            </div>
                                                            <div className="text-center">
                                                                <span className="font-bold text-retro-slate font-mono text-[10px] block uppercase">SYSTEM</span>
                                                                <span className="text-[10px] text-muted-foreground leading-tight block mt-1 uppercase">Standard</span>
                                                            </div>
                                                        </motion.div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
