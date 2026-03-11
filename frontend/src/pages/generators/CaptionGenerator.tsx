import { useState, useEffect } from "react";
import { generateCaption } from "../../services/captionApi";
import { useTemplates } from "../../hooks/useTemplate";
import type { Template } from "../../features/shared/types";
import { GeneratorPageLayout } from "../../features/shared/GeneratorPageLayout";
import { TemplateGallery } from "../../features/shared/TemplateGallery";
import { TemplateManagementModal } from "../../features/shared/TemplateManagementModal";
import { PreviewModal } from "../../features/shared/PreviewModal";
import { CaptionConfig } from "../../features/captions/CaptionConfig";
import { CaptionInput } from "../../features/captions/CaptionInput";
import { CaptionResults } from "../../features/captions/CaptionResults";

export default function CaptionGenerator() {
  const { templates, addTemplate, removeTemplate, editTemplate, loading: templatesLoading } = useTemplates();
  const [inputText, setInputText] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [tone, setTone] = useState("casual");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [modalName, setModalName] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalStructure, setModalStructure] = useState("");

  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const captionTemplates = templates.filter(t => t.category === "caption");

  useEffect(() => {
    if (captionTemplates.length > 0 && !selectedTemplateId) {
      setSelectedTemplateId(captionTemplates[0].id);
    }
  }, [captionTemplates, selectedTemplateId]);

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
    if (length === "normal") setCaption("");

    try {
      const result = await generateCaption({
        inputText,
        templateId: selectedTemplateId,
        platform,
        tone,
        length,
        currentContent
      });

      setCaption(result);
    } catch (err: any) {
      setError(err.message || "Failed to generate caption");
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
        category: "caption",
        structure: modalStructure
      });
    } else {
      await addTemplate({
        name: modalName,
        content: modalContent,
        category: "caption",
        structure: modalStructure
      });
    }
    setIsModalOpen(false);
  };

  const presets = [
    { label: "Social Caption", structure: "Hook + Body + CTA", content: "Write a catchy social post about: {{inputText}}" },
    { label: "Formal Post", structure: "Header + Detail + Insight + Sign-off", content: "Write a professional update based on: {{inputText}}" },
    { label: "Storytelling", structure: "Setting + Conflict + Result + CTA", content: "Narrate a story about: {{inputText}}" }
  ];

  return (
    <GeneratorPageLayout
      title="Caption Generator"
      subtitle="Generate captions for your posts"
      onNewTemplate={openCreateModal}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <TemplateGallery
          templates={captionTemplates}
          selectedTemplateId={selectedTemplateId}
          setSelectedTemplateId={setSelectedTemplateId}
          onPreview={setPreviewTemplate}
          onEdit={openEditModal}
          onRemove={removeTemplate}
        />

        <div className="lg:col-span-8 space-y-8">
          <CaptionInput
            inputText={inputText}
            setInputText={setInputText}
            onGenerate={() => handleGenerate()}
            loading={loading}
            disabled={templatesLoading}
            error={error}
          >
            <CaptionConfig
              platform={platform}
              setPlatform={setPlatform}
              tone={tone}
              setTone={setTone}
            />
          </CaptionInput>

          <CaptionResults
            caption={caption}
            onExpand={() => handleGenerate("longer", caption)}
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
        title="Caption Style"
      />

      <PreviewModal
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />
    </GeneratorPageLayout>
  );
}
