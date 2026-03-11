import React from "react";

interface GeneratorPageLayoutProps {
  title: string;
  subtitle: string;
  onNewTemplate: () => void;
  children: React.ReactNode;
}

export const GeneratorPageLayout: React.FC<GeneratorPageLayoutProps> = ({
  title,
  subtitle,
  onNewTemplate,
  children,
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-10 relative overflow-y-auto">
      {/* Decorative Gradients */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-6xl space-y-10 mt-6 pb-20">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-6xl font-zilla font-bold text-foreground tracking-tighter decoration-primary decoration-4">
              {title}
            </h2>
            <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase opacity-70">
              {subtitle}
            </p>
          </div>
          <button
            onClick={onNewTemplate}
            className="px-6 py-3 bg-foreground text-background font-semibold rounded-sm border-2 border-foreground shadow-[4px_4px_0_var(--color-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm tracking-tighter"
          >
            + NEW TEMPLATE
          </button>
        </div>

        {/* Page Content (usually a grid) */}
        {children}
      </div>
    </div>
  );
};
