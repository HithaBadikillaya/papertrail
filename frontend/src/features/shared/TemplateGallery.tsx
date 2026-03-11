import React from "react";
import type { Template } from "./types";

interface TemplateGalleryProps {
  templates: Template[];
  selectedTemplateId: string;
  setSelectedTemplateId: (id: string) => void;
  onPreview: (template: Template) => void;
  onEdit: (template: Template, e: React.MouseEvent) => void;
  onRemove: (id: string) => void;
  label?: string;
  countLabel?: string;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  templates,
  selectedTemplateId,
  setSelectedTemplateId,
  onPreview,
  onEdit,
  onRemove,
  label = "Select Style",
  countLabel = "Loaded",
}) => {
  return (
    <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-10 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex justify-between items-center px-1">
        <label className="text-sm font-semibold tracking-widest text-foreground uppercase font-inter">
          {label}
        </label>
        <span className="text-[10px] font-mono text-muted-foreground uppercase">
          {templates.length} {countLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {templates.map((t) => (
          <div
            key={t.id}
            onClick={() => setSelectedTemplateId(t.id)}
            className={`relative group cursor-pointer border-2 transition-all p-4 flex gap-4 items-center ${
              selectedTemplateId === t.id
                ? "border-foreground bg-primary/5 shadow-[3px_3px_0_var(--color-primary)]"
                : "border-foreground/20 bg-card hover:border-foreground/50 hover:shadow-[3px_3px_0_var(--color-retro-sand)]"
            }`}
          >
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <div
                  className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                    t.type === "system" ? "bg-secondary/20 text-foreground" : "bg-primary/20 text-primary"
                  }`}
                >
                  {t.type}
                </div>
              </div>
              <h4 className="font-bold text-xs leading-tight text-foreground truncate max-w-[180px]">
                {t.name.toUpperCase()}
              </h4>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPreview(t);
                }}
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                title="Preview Template"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
              {t.type === "user" && (
                <div className="flex gap-1">
                  <button
                    onClick={(e) => onEdit(t, e)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(t.id);
                    }}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
