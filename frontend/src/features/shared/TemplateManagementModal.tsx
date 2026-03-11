import React from "react";
import type { Template } from "./types";

interface Preset {
  label: string;
  structure: string;
  content: string;
}

interface TemplateManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingTemplate: Template | null;
  modalName: string;
  setModalName: (name: string) => void;
  modalContent: string;
  setModalContent: (content: string) => void;
  modalStructure: string;
  setModalStructure: (structure: string) => void;
  handleSaveTemplate: () => void;
  presets: Preset[];
  title?: string;
  nameLabel?: string;
  structureLabel?: string;
  instructLabel?: string;
  injectionPointLabel?: string;
}

export const TemplateManagementModal: React.FC<TemplateManagementModalProps> = ({
  isOpen,
  onClose,
  editingTemplate,
  modalName,
  setModalName,
  modalContent,
  setModalContent,
  modalStructure,
  setModalStructure,
  handleSaveTemplate,
  presets,
  title = "Management Protocol",
  nameLabel = "Protocol Identifier",
  structureLabel = "Flow Hierarchy",
  instructLabel = "Strategic Instructs",
  injectionPointLabel = "{{inputText}}",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
      <div className="bg-card border-4 border-foreground w-full max-w-2xl shadow-2xl p-10 space-y-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-3xl font-bold text-foreground tracking-tight uppercase">
              {editingTemplate ? `Update ${title}` : `New ${title}`}
            </h3>
            <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
              Define the architectural structure for generation
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl hover:scale-110 transition-transform p-2"
          >
            ✕
          </button>
        </div>

        <div className="space-y-8">
          {/* Field 1: Name */}
          <div className="space-y-3">
            <label className="text-sm font-semibold uppercase text-foreground tracking-widest">
              1. {nameLabel}
            </label>
            <input
              type="text"
              className="w-full p-5 bg-background border-2 border-border rounded-sm text-xl font-bold focus:border-primary transition-all shadow-[4px_4px_0_var(--color-retro-sand)]"
              placeholder="e.g. Executive Style Protocol"
              value={modalName}
              onChange={(e) => setModalName(e.target.value)}
            />
          </div>

          {/* Field 2: Structure */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold uppercase text-foreground tracking-widest">
                2. {structureLabel}
              </label>
              <span className="text-[10px] text-muted-foreground uppercase font-bold">
                Pick a style or type your own
              </span>
            </div>

            {/* Preset Chips */}
            <div className="flex flex-wrap gap-2 mb-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setModalStructure(preset.structure);
                    if (!modalContent.trim()) {
                      setModalContent(preset.content);
                    }
                  }}
                  className="px-3 py-1.5 bg-muted/30 border border-border rounded-full text-[10px] font-bold hover:bg-primary/20 hover:border-primary transition-all"
                >
                  + {preset.label}
                </button>
              ))}
            </div>

            <input
              type="text"
              className="w-full p-4 bg-background border-2 border-border rounded-sm text-lg font-bold focus:border-primary transition-all shadow-[4px_4px_0_var(--color-retro-sand)]"
              placeholder="Hook → Body → Details → Closing"
              value={modalStructure}
              onChange={(e) => setModalStructure(e.target.value)}
            />
          </div>

          {/* Field 3: AI Prompt */}
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold uppercase text-foreground tracking-widest">
                3. {instructLabel}
              </label>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-sm mb-2">
              <p className="text-[11px] text-primary leading-relaxed font-bold">
                The code <code className="bg-primary/10 px-1 rounded">{injectionPointLabel}</code> is where the input data will be injected.
              </p>
            </div>
            <textarea
              className="w-full min-h-[160px] p-6 bg-background border-2 border-border rounded-sm text-base font-medium resize-none focus:border-primary transition-all leading-relaxed shadow-[4px_4px_0_var(--color-retro-sand)]"
              placeholder={`Define instructions for the AI model...`}
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={onClose}
            className="flex-1 py-5 bg-muted/20 border-2 border-border rounded-sm font-bold uppercase tracking-tight hover:bg-muted/40 transition-all shadow-[4px_4px_0_var(--color-retro-ink)]"
          >
            Discard
          </button>
          <button
            onClick={handleSaveTemplate}
            disabled={!modalName.trim() || !modalContent.trim()}
            className="flex-[2] py-5 bg-primary text-primary-foreground rounded-sm font-bold uppercase tracking-tight hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all border-2 border-foreground shadow-[6px_6px_0_var(--color-retro-ink)] disabled:opacity-30"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
};
