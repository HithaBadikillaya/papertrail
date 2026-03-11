import { useState, useEffect } from "react";
import {
    uploadAndTranscribe,
    generateMoM,
    getMoMTemplates,
    createMoMTemplate,
    updateMoMTemplate,
    deleteMoMTemplate,
} from "../../services/momApi";

// Shared Features
import type { Template } from "../../features/shared/types";
import { GeneratorPageLayout } from "../../features/shared/GeneratorPageLayout";
import { TemplateGallery } from "../../features/shared/TemplateGallery";
import { TemplateManagementModal } from "../../features/shared/TemplateManagementModal";
import { PreviewModal } from "../../features/shared/PreviewModal";

// MoM Specific Features
import { FileUploadZone } from "../../features/mom/FileUploadZone";
import { MeetingDetails } from "../../features/mom/MeetingDetails";
import { ResultsDisplay } from "../../features/mom/ResultsDisplay";

export default function MoMGenerator() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcriptionError, setTranscriptionError] = useState("");
    const [progress, setProgress] = useState(0);

    const [selectedTemplateId, setSelectedTemplateId] = useState("");
    const [meetingTitle, setMeetingTitle] = useState("");
    const [generatedMoM, setGeneratedMoM] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState("");

    const [templates, setTemplates] = useState<Template[]>([]);
    const [templatesLoading, setTemplatesLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
    const [modalName, setModalName] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [modalStructure, setModalStructure] = useState("");
    const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

    useEffect(() => {
        loadTemplates();
    }, []);

    useEffect(() => {
        if (templates.length > 0 && !selectedTemplateId) {
            setSelectedTemplateId(templates[0].id);
        }
    }, [templates, selectedTemplateId]);

    const loadTemplates = async () => {
        try {
            setTemplatesLoading(true);
            const data = await getMoMTemplates();
            setTemplates(data as any);
        } catch (error: any) {
            console.error("Failed to load templates:", error);
        } finally {
            setTemplatesLoading(false);
        }
    };

    const handleFileSelect = (file: File) => {
        const maxSize = 4 * 1024 * 1024 * 1024; // 4GB
        if (file.size > maxSize) {
            setTranscriptionError("File size exceeds 4GB limit");
            return;
        }
        setUploadedFile(file);
        setTranscriptionError("");
        handleTranscribe(file);
    };

    const handleTranscribe = async (file: File) => {
        setIsTranscribing(true);
        setTranscriptionError("");
        setProgress(0);
        try {
            const transcriptText = await uploadAndTranscribe(file, (_msg, pct) => {
                setProgress(pct);
            });
            setProgress(100);
            setTranscription(transcriptText);
            setGeneratedMoM("");
            setTimeout(() => setProgress(0), 1000);
        } catch (error: any) {
            setTranscriptionError(error.message || "Transcription failed");
            setUploadedFile(null);
        } finally {
            setIsTranscribing(false);
        }
    };

    const handleGenerate = async (length: "normal" | "longer" = "normal", currentContent?: string) => {
        if (!transcription.trim() || !selectedTemplateId) return;
        setIsGenerating(true);
        setGenerationError("");
        if (length === "normal") setGeneratedMoM("");
        try {
            const mom = await generateMoM({
                transcriptText: transcription,
                templateId: selectedTemplateId,
                meetingTitle: meetingTitle.trim() || undefined,
                length,
                currentContent
            });
            setGeneratedMoM(mom);
        } catch (error: any) {
            setGenerationError(error.message || "Failed to generate MoM");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveTemplate = async () => {
        if (!modalName.trim() || !modalContent.trim()) return;
        try {
            if (editingTemplate) {
                await updateMoMTemplate(editingTemplate.id, {
                    name: modalName,
                    content: modalContent,
                    structure: modalStructure,
                });
            } else {
                await createMoMTemplate({
                    name: modalName,
                    content: modalContent,
                    structure: modalStructure,
                });
            }
            await loadTemplates();
            setIsModalOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteTemplate = async (id: string) => {
        try {
            await deleteMoMTemplate(id);
            await loadTemplates();
        } catch (e) {
            console.error(e);
        }
    };

    const presets = [
        { label: "Standard Meeting", structure: "Title + Date + Attendees + Agenda + Decisions + Actions", content: "Generate comprehensive meeting minutes from: {{transcriptText}}" },
        { label: "Client Call", structure: "Client Info + Purpose + Discussion + Agreements + Follow-up", content: "Create professional client meeting notes from: {{transcriptText}}" },
        { label: "Tech Sync", structure: "Sprint Info + Technical Updates + Blockers + Tasks", content: "Document this technical session: {{transcriptText}}" }
    ];

    return (
        <GeneratorPageLayout
            title="Minutes of Meeting"
            subtitle="Automated high-fidelity transcription"
            onNewTemplate={() => {
                setEditingTemplate(null);
                setModalName("");
                setModalContent("");
                setModalStructure("");
                setIsModalOpen(true);
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <TemplateGallery
                    templates={templates}
                    selectedTemplateId={selectedTemplateId}
                    setSelectedTemplateId={setSelectedTemplateId}
                    onPreview={setPreviewTemplate}
                    onEdit={(template, e) => {
                        e.stopPropagation();
                        setEditingTemplate(template);
                        setModalName(template.name);
                        setModalContent(template.content);
                        setModalStructure(template.structure);
                        setIsModalOpen(true);
                    }}
                    onRemove={handleDeleteTemplate}
                    label="1. Document Protocol"
                />

                <div className="lg:col-span-8 space-y-10">
                    <FileUploadZone
                        uploadedFile={uploadedFile}
                        isDragging={isDragging}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) handleFileSelect(f); }}
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onFileSelect={handleFileSelect}
                        isTranscribing={isTranscribing}
                        progress={progress}
                        transcriptionError={transcriptionError}
                        transcription={transcription}
                    />

                    <MeetingDetails
                        transcription={transcription}
                        meetingTitle={meetingTitle}
                        setMeetingTitle={setMeetingTitle}
                        handleGenerate={() => handleGenerate()}
                        isGenerating={isGenerating}
                        selectedTemplateId={selectedTemplateId}
                        templatesLoading={templatesLoading}
                        generationError={generationError}
                    />

                    <ResultsDisplay
                        generatedMoM={generatedMoM}
                        onExpand={() => handleGenerate("longer", generatedMoM)}
                        isExpanding={isGenerating}
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
                title="Protocol"
                injectionPointLabel="{{transcriptText}}"
            />

            <PreviewModal
                template={previewTemplate}
                onClose={() => setPreviewTemplate(null)}
            />
        </GeneratorPageLayout>
    );
}
