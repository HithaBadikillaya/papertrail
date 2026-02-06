import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// FOLDER PATHS
const USER_TEMPLATE_DIR = path.join(process.cwd(), "src", "templates", "user");
const SYSTEM_TEMPLATE_DIR = path.join(process.cwd(), "src", "templates", "system");

// HELPERS
function ensureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getUserTemplatePath(id) {
  return path.join(USER_TEMPLATE_DIR, `${id}.json`);
}

function readTemplatesFromDir(dir, type = "user") {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir).map(file => {
    try {
      const fullPath = path.join(dir, file);
      const data = fs.readFileSync(fullPath, "utf-8");
      const template = JSON.parse(data);

      return {
        ...template,
        type: type, // Force correct type based on folder
      };
    } catch (err) {
      console.error(`Error reading template ${file}:`, err);
      return null;
    }
  }).filter(Boolean);
}


// CRUD SERVICES

// Get all templates (system + user)
export function getAllTemplates() {
  const systemTemplates = readTemplatesFromDir(SYSTEM_TEMPLATE_DIR, "system");
  const userTemplates = readTemplatesFromDir(USER_TEMPLATE_DIR, "user");

  return [...systemTemplates, ...userTemplates];
}

// Get a single template by ID
export function getTemplateById(id) {
  const all = getAllTemplates();
  return all.find(t => t.id === id) || null;
}

// Create new user template
export function createTemplate(templateData) {
  const userTemplates = readTemplatesFromDir(USER_TEMPLATE_DIR, "user");
  const id = uuidv4();

  const newTemplate = {
    id,
    name: templateData.name || "Untitled Template",
    category: templateData.category || "caption",
    structure: templateData.structure || "Opening → Body → Conclusion",
    content: templateData.content || "",
    type: "user",
    createdBy: templateData.createdBy || "Anonymous",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const filePath = path.join(USER_TEMPLATE_DIR, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(newTemplate, null, 2));
  return newTemplate;
}

// Update user template
export function updateTemplate(id, updatedFields) {
  const filePath = path.join(USER_TEMPLATE_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) {
    // Check if it's a system template
    const systemTemplates = readTemplatesFromDir(SYSTEM_TEMPLATE_DIR, "system");
    if (systemTemplates.some(t => t.id === id)) {
      throw new Error("System templates cannot be modified");
    }
    throw new Error("Template not found");
  }

  const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const updated = {
    ...existing,
    ...updatedFields,
    id: existing.id, // protect ID
    type: "user", // ensure type remains user
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  return updated;
}

// Delete user template
export function deleteTemplate(id) {
  const filePath = getUserTemplatePath(id);

  if (!fs.existsSync(filePath)) {
    const systemTemplates = readTemplatesFromDir(SYSTEM_TEMPLATE_DIR, "system");
    if (systemTemplates.some(t => t.id === id)) {
      throw new Error("System templates cannot be deleted");
    }
    throw new Error("Template not found");
  }

  fs.unlinkSync(filePath);
}


