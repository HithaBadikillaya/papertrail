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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <div className="bg-card border border-border w-full max-w-2xl p-10 space-y-10 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto rounded-none shadow-2xl">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-foreground tracking-tight uppercase font-inter">
                            {editingTemplate ? "Update Protocol" : "Define New Protocol"}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-xl hover:text-primary transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Template Name */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">01. Protocol Identifier</label>
                        <input
                            type="text"
                            className="w-full p-4 bg-background border border-border rounded-none text-lg font-bold focus:border-primary transition-all outline-none"
                            placeholder="e.g. Sprint Retrospective Notes"
                            value={modalName}
                            onChange={(e) => setModalName(e.target.value)}
                        />
                    </div>

                    {/* Structure */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">02. Flow Hierarchy</label>
                            <span className="text-[9px] text-muted-foreground uppercase font-bold">
                                SELECT PRESET OR MANUALLY DEFINE
                            </span>
                        </div>

                        {/* Preset Chips */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                            {presets.map(preset => (
                                <button
                                    key={preset.label}
                                    onClick={() => {
                                        setModalStructure(preset.structure);
                                        if (!modalContent.trim()) {
                                            setModalContent(preset.content);
                                        }
                                    }}
                                    className="px-2.5 py-1 bg-muted border border-border rounded-none text-[9px] font-bold hover:bg-primary/10 hover:border-primary transition-all uppercase"
                                >
                                    + {preset.label}
                                </button>
                            ))}
                        </div>

                        <input
                            type="text"
                            className="w-full p-4 bg-background border border-border rounded-none text-base font-medium focus:border-primary transition-all outline-none"
                            placeholder="Title + Attendees + Discussion + Action Items"
                            value={modalStructure}
                            onChange={(e) => setModalStructure(e.target.value)}
                        />
                    </div>

                    {/* AI Instructions */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]">03. Strategic Instructs</label>
                        <div className="p-3 bg-primary/5 border border-primary/20 rounded-none mb-2">
                            <p className="text-[10px] text-primary font-bold tracking-tight">
                                USE <code className="bg-primary/10 px-1 rounded">{"{{transcriptText}}"}</code> AS THE DYNAMIC DATA INJECTION POINT.
                            </p>
                        </div>
                        <textarea
                            className="w-full min-h-[160px] p-6 bg-background border border-border rounded-none text-sm font-medium resize-none focus:border-primary transition-all leading-relaxed outline-none"
                            placeholder="Define architectural instructions for the AI..."
                            value={modalContent}
                            onChange={(e) => setModalContent(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 bg-muted text-muted-foreground border border-border rounded-none font-bold uppercase text-[10px] tracking-widest hover:bg-muted/80 transition-all font-inter"
                    >
                        DISCARD
                    </button>
                    <button
                        onClick={handleSaveTemplate}
                        disabled={!modalName.trim() || !modalContent.trim()}
                        className="flex-[2] py-4 bg-primary text-primary-foreground rounded-none font-bold uppercase text-[10px] tracking-widest hover:bg-primary/90 transition-all disabled:opacity-30 font-inter"
                    >
                        COMMIT PROTOCOL
                    </button>
                </div>
            </div>
        </div>
    );
};
