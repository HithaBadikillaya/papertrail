import { useEffect, useState } from "react";
import { getTemplates, createTemplate, deleteTemplate, updateTemplate } from "../services/captionApi";
import type { Template } from "../services/captionApi";

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function loadTemplates() {
    try {
      setLoading(true);
      const data = await getTemplates();
      setTemplates(data);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function addTemplate(template: Partial<Template>) {
    try {
      await createTemplate(template);
      await loadTemplates();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function removeTemplate(id: string) {
    try {
      await deleteTemplate(id);
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function editTemplate(id: string, updatedData: Partial<Template>) {
    try {
      await updateTemplate(id, updatedData);
      await loadTemplates();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    loadTemplates();
  }, []);

  return {
    templates,
    loading,
    error,
    addTemplate,
    removeTemplate,
    editTemplate,
    refreshTemplates: loadTemplates
  };
}
