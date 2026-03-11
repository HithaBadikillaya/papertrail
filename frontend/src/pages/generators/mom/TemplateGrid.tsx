import React from "react";
import type { Template } from "./types";

interface TemplateGridProps {
    templates: Template[];
    selectedTemplateId: string;
    setSelectedTemplateId: (id: string) => void;
    setPreviewTemplate: (template: Template) => void;
    openEditModal: (template: Template, e: React.MouseEvent) => void;
    handleDeleteTemplate: (id: string, e: React.MouseEvent) => void;
    templatesLoading?: boolean;
    templatesError?: string;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
    templates,
    selectedTemplateId,
    setSelectedTemplateId,
    setPreviewTemplate,
    openEditModal,
    handleDeleteTemplate,
    templatesLoading,
    templatesError,
}) => {
    return (
        <div className="space-y-6 lg:sticky lg:top-10 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold tracking-widest text-foreground uppercase">
                    1. Select Style
                </label>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {templatesLoading ? "Loading..." : templatesError ? "Error" : `${templates.length} Loaded`}
                </span>
            </div>

            {templatesError && (
                <div className="p-10 bg-destructive/5 border-2 border-dashed border-destructive rounded-sm text-center shadow-[4px_4px_0_var(--color-destructive)]">
                    <p className="text-destructive font-bold uppercase tracking-tight">{templatesError}</p>
                </div>
            )}

            {templatesLoading && !templatesError && (
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 border-2 border-foreground/20 bg-card/20 animate-pulse" />
                    ))}
                </div>
            )}

            {!templatesLoading && !templatesError && templates.length === 0 && (
                <div className="p-10 bg-card border-2 border-dashed border-foreground/20 rounded-sm text-center">
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-[10px]">No templates found.</p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => setSelectedTemplateId(template.id)}
                        className={`relative group cursor-pointer border-2 transition-all overflow-hidden ${selectedTemplateId === template.id
                            ? "border-foreground bg-primary/5 shadow-[3px_3px_0_var(--color-primary)]"
                            : "border-foreground/20 bg-card hover:border-foreground/50 hover:shadow-[3px_3px_0_var(--color-retro-sand)]"
                            }`}
                    >
                        <div className="p-4 flex gap-4 items-center">
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-start">
                                    <div
                                        className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${template.type === "system"
                                            ? "bg-secondary/20 text-foreground"
                                            : "bg-primary/20 text-primary"
                                            }`}
                                    >
                                        {template.type}
                                    </div>
                                </div>
                                <h4 className="font-bold text-xs leading-tight text-foreground truncate max-w-[180px]">
                                    {template.name.toUpperCase()}
                                </h4>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setPreviewTemplate(template);
                                }}
                                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                title="Preview Template"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                            </button>
                            {template.type === "user" && (
                                <div className="flex gap-1">
                                    <button
                                        onClick={(e) => openEditModal(template, e)}
                                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                                    </button>
                                    <button
                                        onClick={(e) => handleDeleteTemplate(template.id, e)}
                                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {selectedTemplateId === template.id && (
                            <div className="absolute top-0 right-0 w-1 h-full bg-primary" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
