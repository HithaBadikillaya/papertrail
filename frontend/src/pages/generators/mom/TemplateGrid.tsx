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
        <div className="space-y-6">
            <div className="flex justify-between items-center px-1">
                <label className="text-sm font-black tracking-widest text-foreground uppercase">
                    Select Template
                </label>
                <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {templatesLoading ? "Loading..." : templatesError ? "Error" : `${templates.length} Templates Loaded`}
                </span>
            </div>

            {templatesError && (
                <div className="p-10 bg-destructive/10 border-2 border-dashed border-destructive/20 rounded-[2rem] text-center">
                    <p className="text-destructive font-black uppercase tracking-tighter">{templatesError}</p>
                    <p className="text-xs text-muted-foreground mt-2">Check if your backend is running at http://localhost:5000</p>
                </div>
            )}

            {templatesLoading && !templatesError && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="aspect-[3/4] rounded-3xl border-2 border-border bg-card/20 animate-pulse" />
                    ))}
                </div>
            )}

            {!templatesLoading && !templatesError && templates.length === 0 && (
                <div className="p-20 bg-card/40 border-2 border-dashed border-border rounded-[3rem] text-center">
                    <p className="text-muted-foreground font-black uppercase tracking-widest text-sm">No MoM templates found.</p>
                    <p className="text-[10px] text-muted-foreground/50 mt-2 uppercase tracking-tighter">Create a new template to get started</p>
                </div>
            )}

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        onClick={() => setSelectedTemplateId(template.id)}
                        className={`relative group cursor-pointer aspect-[3/4] rounded-3xl border-2 transition-all overflow-hidden ${selectedTemplateId === template.id
                            ? "border-primary bg-primary/10 shadow-[0_0_30px_rgba(var(--primary),0.2)]"
                            : "border-border bg-card/40 hover:border-primary/50"
                            }`}
                    >
                        <div className="p-6 h-full flex flex-col justify-between">
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <div
                                        className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${template.type === "system"
                                            ? "bg-secondary text-black"
                                            : "bg-primary/20 text-primary"
                                            }`}
                                    >
                                        {template.type}
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setPreviewTemplate(template);
                                        }}
                                        className="px-2 py-1 text-xs bg-background/50 rounded-lg hover:bg-background transition-colors text-muted-foreground hover:text-foreground"
                                    >
                                        Preview
                                    </button>
                                </div>
                                <h4 className="font-bold text-sm leading-tight text-foreground line-clamp-2">
                                    {template.name.toUpperCase()}
                                </h4>
                            </div>

                            <div className="space-y-4">
                                <div className="h-20 opacity-30 select-none">
                                    {template.structure ? (
                                        <div className="flex flex-col gap-1">
                                            {template.structure.split(/\s*[+→]\s*/).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-full h-2 bg-foreground/20 rounded-full"
                                                    style={{ width: `${Math.max(40, 100 - i * 15)}%` }}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-full h-2 bg-foreground/20 rounded-full mb-2" />
                                            <div className="w-5/6 h-2 bg-foreground/20 rounded-full mb-2" />
                                            <div className="w-4/6 h-2 bg-foreground/20 rounded-full" />
                                        </>
                                    )}
                                </div>

                                {template.type === "user" && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => openEditModal(template, e)}
                                            className="flex-1 py-1.5 bg-background/50 text-[10px] font-black rounded-lg hover:bg-background"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={(e) => handleDeleteTemplate(template.id, e)}
                                            className="px-2 py-1.5 bg-destructive/10 text-destructive text-[10px] font-black rounded-lg hover:bg-destructive/20"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {selectedTemplateId === template.id && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full border-2 border-background flex items-center justify-center text-[8px] text-primary-foreground font-black">
                                ✓
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
