import { useState, useEffect } from "react";
import { generateLetter } from "../../services/letterApi";
import { useTemplates } from "../../hook/useTemplate";
import type { Template } from "../../services/captionApi";
import { ExportOptions } from "../../components/ExportOptions";

export default function LetterGenerator() {
  const { templates, addTemplate, removeTemplate, editTemplate, loading: templatesLoading } = useTemplates();
  const [inputText, setInputText] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [tone, setTone] = useState("formal");
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [modalName, setModalName] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalStructure, setModalStructure] = useState("");

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const letterTemplates = templates.filter(t => t.category === "letter");

  // Set default template once loaded
  useEffect(() => {
    if (letterTemplates.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(letterTemplates[0].id);
    }
  }, [letterTemplates, selectedTemplateId]);

  const handleGenerate = async (length: "normal" | "longer" = "normal", currentContent?: string) => {
    if (!inputText.trim()) {
      setError("Please enter the letter details");
      return;
    }
    if (!selectedTemplateId) {
      setError("Please select a template");
      return;
    }

    setLoading(true);
    setError("");
    if (length === "normal") setLetter("");

    try {
      const result = await generateLetter({
        inputText,
        templateId: selectedTemplateId,
        tone,
        length,
        currentContent
      });

      setLetter(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate letter");
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = () => {
    handleGenerate("longer", letter);
  };

  const openCreateModal = () => {
    setEditingTemplate(null);
    setModalName("");
    setModalContent("");
    setModalStructure("");
    setIsModalOpen(true);
  };

  const openEditModal = (t: Template, e: React.MouseEvent) => {
    e.stopPropagation();
    if (t.type === "system") return;
    setEditingTemplate(t);
    setModalName(t.name);
    setModalContent(t.content);
    setModalStructure(t.structure || "");
    setIsModalOpen(true);
  };

  const handleSaveTemplate = async () => {
    if (!modalName.trim() || !modalContent.trim()) return;

    if (editingTemplate) {
      await editTemplate(editingTemplate.id, {
        name: modalName,
        content: modalContent,
        category: "letter",
        structure: modalStructure
      });
    } else {
      await addTemplate({
        name: modalName,
        content: modalContent,
        category: "letter",
        structure: modalStructure
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4 md:p-10 relative overflow-y-auto">
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-6xl space-y-10 mt-6 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-6xl font-zilla font-bold text-foreground tracking-tighter decoration-primary decoration-4">
              AI Letter Generator
            </h2>
            <p className="text-muted-foreground font-mono text-sm tracking-widest uppercase opacity-70">
              Generate professional letters with AI
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="px-6 py-3 bg-foreground text-background font-semibold rounded-sm border-2 border-foreground shadow-[4px_4px_0_var(--color-primary)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-sm tracking-tighter"
          >
            + NEW TEMPLATE
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SIDEBAR: Template Gallery */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-10 max-h-[calc(100vh-180px)] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-semibold tracking-widest text-foreground uppercase font-inter">
                1. Select Style
              </label>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                {letterTemplates.length} Loaded
              </span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {letterTemplates.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  className={`relative group cursor-pointer border-2 transition-all p-4 flex gap-4 items-center ${selectedTemplateId === t.id
                    ? "border-foreground bg-primary/5 shadow-[3px_3px_0_var(--color-primary)]"
                    : "border-foreground/20 bg-card hover:border-foreground/50 hover:shadow-[3px_3px_0_var(--color-retro-sand)]"
                    }`}
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <div
                        className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${t.type === "system" ? "bg-secondary/20 text-foreground" : "bg-primary/20 text-primary"
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
                        setPreviewTemplate(t);
                      }}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      title="Preview Template"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                    </button>
                    {t.type === "user" && (
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => openEditModal(t, e)}
                          className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTemplate(t.id);
                          }}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Work Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* 2. Configuration & Input */}
            <div className="bg-card border-2 border-foreground p-8 space-y-8 shadow-[6px_6px_0_var(--color-retro-sand)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">2</span>
                    Correspondence Tone
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["formal", "casual", "urgent", "thankful", "apologetic"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setTone(p)}
                        className={`px-4 py-2 text-[10px] font-bold border-2 transition-all uppercase tracking-tighter ${tone === p
                          ? "bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_var(--color-retro-ink)]"
                          : "bg-background border-foreground/20 text-foreground hover:border-foreground hover:shadow-[2px_2px_0_var(--color-retro-sand)]"
                          }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">3</span>
                    Status Check
                  </label>
                  <div className="p-3 bg-background border-2 border-foreground rounded-sm flex items-center justify-between shadow-[2px_2px_0_var(--color-retro-sand)]">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">Template Ready</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border/50">
                <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">4</span>
                  Letter Context
                </label>
                <textarea
                  className="w-full min-h-[220px] p-6 text-lg bg-background border-2 border-foreground rounded-sm focus:shadow-[4px_4px_0_var(--color-primary)] transition-all placeholder:text-muted-foreground/30 resize-none font-zilla leading-relaxed outline-none"
                  placeholder="Outline the main purpose of this letter. Names, dates, key requests..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => handleGenerate()}
                  disabled={loading || templatesLoading}
                  className="px-10 py-5 bg-primary text-primary-foreground text-lg font-bold rounded-sm border-2 border-foreground shadow-[6px_6px_0_var(--color-retro-ink)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all disabled:opacity-50 flex items-center gap-3 uppercase tracking-tight"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Draft Letter</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.68 7.13 6.69 3.12l4 4" /><path d="m14.7 15.6 2 .6 1.1-1.1" /><path d="M2 12V4c0-1.1.9-2 2-2h10l6 6v12c0 1.1-.9 2-2 2h-4" /><path d="M14 2v6h6" /><path d="m11 11 4 4" /><path d="m9.5 12.5 4 4" /><path d="m8 14 4 4" /></svg>
                    </>
                  )}
                </button>
              </div>
              {error && <p className="text-destructive text-center text-xs font-bold uppercase mt-2">{error}</p>}
            </div>

            {/* 5. Results Section */}
            {letter && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-card border-2 border-foreground p-1 shadow-[8px_8px_0_var(--color-primary)] overflow-hidden">
                  <div className="bg-retro-linen p-12 space-y-8 relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 pointer-events-none" />
                    <div className="flex justify-between items-start relative z-10">
                      <div className="space-y-1">
                        <span className="text-[10px] font-semibold text-primary tracking-[0.3em] uppercase">Draft Finalized</span>
                        <h4 className="text-2xl font-bold text-foreground tracking-tight">Formal Output</h4>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handleExpand}
                          disabled={loading}
                          className="px-6 py-3 rounded-sm font-bold text-xs tracking-tight transition-all bg-background border-2 border-foreground shadow-[3px_3px_0_var(--color-retro-ink)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_var(--color-retro-ink)] disabled:opacity-50"
                        >
                          {loading ? "Expanding..." : "Expand Letter"}
                        </button>
                        <ExportOptions content={letter} filename="letter" />
                      </div>
                    </div>

                    <div className="relative group p-10 bg-white/40 border-2 border-foreground rounded-sm shadow-[4px_4px_0_var(--color-retro-sand)] min-h-[600px]">
                      <div className="w-full text-xl text-foreground/90 font-zilla leading-relaxed whitespace-pre-wrap">
                        {letter}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Template Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-xl">
          <div className="bg-card border-4 border-foreground w-full max-w-2xl shadow-3xl p-10 space-y-8 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-3xl font-bold text-foreground tracking-tight uppercase">
                  {editingTemplate ? "Edit Template" : "Create New Template"}
                </h3>
                <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
                  Define how you want your letter to be structured
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl hover:scale-110 transition-transform p-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-8">
              {/* Field 1: Name */}
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase text-foreground tracking-widest">1. Name your template</label>
                <input
                  type="text"
                  className="w-full p-5 bg-background border-2 border-border rounded-sm text-xl font-bold focus:border-primary transition-all shadow-[4px_4px_0_var(--color-retro-sand)]"
                  placeholder="e.g. Leave Application Letter"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                />
              </div>

              {/* Field 2: Structure */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-semibold uppercase text-foreground tracking-widest">2. Letter Structure</label>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Pick a style or type your own</span>
                </div>

                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {[
                    { label: "Formal Letter", structure: "Sender Info + Date + Recipient + Salutation + Body + Closing", content: "Write a formal letter based on: {{inputText}}\n\nMaintain professional tone and standard formatting." },
                    { label: "Application", structure: "Header + Subject + Body + Request + Closing", content: "Write a formal application letter for: {{inputText}}\n\nInclude proper salutation and professional closing." },
                    { label: "Complaint", structure: "Reference + Issue Description + Impact + Resolution Request + Deadline", content: "Write a professional complaint letter about: {{inputText}}\n\nBe assertive but professional." },
                    { label: "Recommendation", structure: "Introduction + Relationship + Qualities + Examples + Endorsement", content: "Write a recommendation letter for: {{inputText}}\n\nHighlight strengths with specific examples." }
                  ].map(preset => (
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
                  placeholder="Sender Info → Date → Body → Closing"
                  value={modalStructure}
                  onChange={(e) => setModalStructure(e.target.value)}
                />
              </div>

              {/* Field 3: AI Prompt */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-semibold uppercase text-foreground tracking-widest">3. AI Instructions</label>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-sm mb-2">
                  <p className="text-[11px] text-primary leading-relaxed font-bold">
                    The code <code className="bg-primary/10 px-1 rounded">{"{{inputText}}"}</code> is where the letter details you type in the workspace will appear.
                  </p>
                </div>
                <textarea
                  className="w-full min-h-[160px] p-6 bg-background border-2 border-border rounded-sm text-base font-medium resize-none focus:border-primary transition-all leading-relaxed shadow-[4px_4px_0_var(--color-retro-sand)]"
                  placeholder={`Example: Write a formal resignation letter regarding {{inputText}} with a professional and respectful tone.`}
                  value={modalContent}
                  onChange={(e) => setModalContent(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
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
      )}

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
          <div className="bg-card border-4 border-foreground w-full max-w-xl shadow-2xl p-10 space-y-8">
            <div className="flex justify-between items-center border-b border-border pb-6">
              <h3 className="text-2xl font-bold text-foreground tracking-tight uppercase">{previewTemplate?.name}</h3>
              <div className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-sm border border-foreground uppercase tracking-widest shadow-[2px_2px_0_var(--color-primary)]">
                {previewTemplate?.type}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-semibold text-muted-foreground tracking-widest uppercase opacity-70">Letter Structure</label>
              <div className="p-8 bg-muted/30 rounded-sm border-2 border-dashed border-border/50 text-foreground font-bold text-lg text-center flex flex-col gap-4">
                {previewTemplate?.structure?.split(/\s*[+→]\s*/).map((step: string, i: number) => (
                  <div key={i} className="py-2 bg-background border-2 border-foreground shadow-[3px_3px_0_var(--color-retro-sand)]">
                    {step.trim()}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setPreviewTemplate(null)}
              className="w-full py-4 bg-foreground text-background border-2 border-foreground rounded-sm font-bold uppercase tracking-tight hover:translate-x-[1px] hover:translate-y-[1px] shadow-[4px_4px_0_var(--color-primary)] transition-all"
            >
              CLOSE PREVIEW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
