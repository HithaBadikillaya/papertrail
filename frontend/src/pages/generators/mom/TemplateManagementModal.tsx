import React from "react";
import type { Template } from "./types";

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
}) => {
    if (!isOpen) return null;

    const presets = [
        { label: "Standard Meeting", structure: "Title + Date/Time + Attendees + Agenda + Discussion + Decisions + Action Items", content: "Generate comprehensive meeting minutes from: {{transcriptText}}\n\nInclude all key sections with clear formatting." },
        { label: "Executive Summary", structure: "Executive Summary + Key Decisions + Strategic Actions + Next Steps", content: "Create a high-level executive summary from: {{transcriptText}}\n\nFocus on strategic decisions and critical action items only." },
        { label: "Technical Standup", structure: "Sprint Context + Technical Updates + Blockers + Implementation Tasks + Next Meeting", content: "Document this technical meeting: {{transcriptText}}\n\nCapture technical details, architecture decisions, and development tasks." },
        { label: "Client Meeting", structure: "Client Info + Meeting Purpose + Discussion + Agreements + Follow-up Actions", content: "Create client meeting notes from: {{transcriptText}}\n\nMaintain professional tone and highlight all commitments made." },
        { label: "Brainstorming", structure: "Session Goal + Ideas Generated + Promising Concepts + Next Steps + Assigned Tasks", content: "Summarize this brainstorming session: {{transcriptText}}\n\nCapture all ideas and identify most promising concepts." }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
            <div className="bg-card border-4 border-border w-full max-w-2xl rounded-[3rem] shadow-3xl p-10 space-y-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-4xl font-black text-foreground tracking-tighter uppercase">
                            {editingTemplate ? "Edit Template" : "Create New Template"}
                        </h3>
                        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
                            Define your meeting notes format
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
                    {/* Template Name */}
                    <div className="space-y-3">
                        <label className="text-sm font-black uppercase text-foreground tracking-widest">
                            1. Name your template
                        </label>
                        <input
                            type="text"
                            className="w-full p-5 bg-background border-2 border-border rounded-2xl text-xl font-bold focus:border-primary transition-all"
                            placeholder="e.g. Sprint Retrospective Notes"
                            value={modalName}
                            onChange={(e) => setModalName(e.target.value)}
                        />
                    </div>

                    {/* Structure */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-sm font-black uppercase text-foreground tracking-widest">
                                2. Content Plan (Layout)
                            </label>
                            <span className="text-[10px] text-muted-foreground uppercase font-bold">
                                Pick a style or type your own
                            </span>
                        </div>

                        {/* Preset Chips */}
                        <div className="flex flex-wrap gap-2 mb-2">
                            {presets.map(preset => (
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
                            className="w-full p-4 bg-background border-2 border-border rounded-2xl text-lg font-bold focus:border-primary transition-all"
                            placeholder="Title + Attendees + Discussion + Action Items"
                            value={modalStructure}
                            onChange={(e) => setModalStructure(e.target.value)}
                        />
                    </div>

                    {/* AI Instructions */}
                    <div className="space-y-4">
                        <label className="text-sm font-black uppercase text-foreground tracking-widest">
                            3. AI Instructions
                        </label>
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl mb-2">
                            <p className="text-[11px] text-primary leading-relaxed font-bold">
                                💡 Use <code className="bg-primary/10 px-1 rounded">{"{{transcriptText}}"}</code> where the
                                meeting transcription should appear.
                            </p>
                        </div>
                        <textarea
                            className="w-full min-h-[160px] p-6 bg-background border-2 border-border rounded-2xl text-base font-medium resize-none focus:border-primary transition-all leading-relaxed"
                            placeholder="Example: Analyze the following meeting transcript and create structured notes with key takeaways: {{transcriptText}}"
                            value={modalContent}
                            onChange={(e) => setModalContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-5 bg-muted/20 border-2 border-border rounded-2xl font-black uppercase tracking-tighter hover:bg-muted/40 transition-all"
                    >
                        Discard
                    </button>
                    <button
                        onClick={handleSaveTemplate}
                        disabled={!modalName.trim() || !modalContent.trim()}
                        className="flex-[2] py-5 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-30"
                    >
                        Save Template
                    </button>
                </div>
            </div>
        </div>
    );
};
