import { useState, useEffect } from "react";
import { generateLetter } from "../../services/letterApi";
import { useTemplates } from "../../hooks/useTemplate";
import type { Template } from "../../features/shared/types";
import { GeneratorPageLayout } from "../../features/shared/GeneratorPageLayout";
import { TemplateGallery } from "../../features/shared/TemplateGallery";
import { TemplateManagementModal } from "../../features/shared/TemplateManagementModal";
import { PreviewModal } from "../../features/shared/PreviewModal";
import { LetterConfig } from "../../features/letters/LetterConfig";
import { LetterInput } from "../../features/letters/LetterInput";
import { LetterResults } from "../../features/letters/LetterResults";

export default function LetterGenerator() {
  const { templates, addTemplate, removeTemplate, editTemplate, loading: templatesLoading } = useTemplates();
  const [inputText, setInputText] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [tone, setTone] = useState("professional");
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

  useEffect(() => {
    if (letterTemplates.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(letterTemplates[0].id);
    }
  }, [letterTemplates, selectedTemplateId]);

  const handleGenerate = async (length: "normal" | "longer" = "normal", currentContent?: string) => {
    if (!inputText.trim()) {
      setError("Please enter some input text");
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

  const presets = [
    { label: "Formal Letter", structure: "Header + Recipient + Salutation + Body + Closing + Sign-off", content: "Write a professional formal letter regarding: {{inputText}}" },
    { label: "Resignation", structure: "Header + Intent + Transition Plan + Gratitude + Signing", content: "Write a respectful resignation letter based on: {{inputText}}" },
    { label: "Recommendation", structure: "Salutation + Context + Skills + Summary + Closing", content: "Write a letter of recommendation for: {{inputText}}" }
  ];

  return (
    <GeneratorPageLayout
      title="Letter Generator"
      subtitle="Craft professional correspondence"
      onNewTemplate={openCreateModal}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <TemplateGallery
          templates={letterTemplates}
          selectedTemplateId={selectedTemplateId}
          setSelectedTemplateId={setSelectedTemplateId}
          onPreview={setPreviewTemplate}
          onEdit={openEditModal}
          onRemove={removeTemplate}
        />

        <div className="lg:col-span-8 space-y-8">
          <LetterInput
            inputText={inputText}
            setInputText={setInputText}
            onGenerate={() => handleGenerate()}
            loading={loading}
            disabled={templatesLoading}
            error={error}
          >
            <LetterConfig tone={tone} setTone={setTone} />
            <div className="space-y-4">
              <label className="text-xs font-semibold tracking-widest text-muted-foreground uppercase opacity-80 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary">
                  1
                </span>
                Ref. ID
              </label>
              <div className="w-full p-3 bg-secondary/10 border-2 border-foreground/10 rounded-sm text-sm font-mono text-muted-foreground">
                LTR-{Math.random().toString(36).substring(7).toUpperCase()}
              </div>
            </div>
          </LetterInput>

          <LetterResults
            letter={letter}
            onExpand={() => handleGenerate("longer", letter)}
            loading={loading}
          />
        </div>
      </div>

      <TemplateManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTemplate={editingTemplate}
        modalName={modalName}
        setModalName={setModalName}
        modalContent={modalContent}
        setModalContent={setModalContent}
        modalStructure={modalStructure}
        setModalStructure={setModalStructure}
        handleSaveTemplate={handleSaveTemplate}
        presets={presets}
        title="Letter Script"
      />

      <PreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </GeneratorPageLayout>
  );
}
