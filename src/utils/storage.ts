import { InputData, Template } from '../types';

const DRAFT_KEY = 'tone-studio-draft';
const TEMPLATES_KEY = 'tone-studio-templates';

export function saveDraft(data: Partial<InputData>): void {
    try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save draft:', error);
    }
}

export function loadDraft(): Partial<InputData> | null {
    try {
        const data = localStorage.getItem(DRAFT_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to load draft:', error);
        return null;
    }
}

export function saveTemplate(template: Template): void {
    try {
        const templates = loadTemplates();
        const index = templates.findIndex((t) => t.id === template.id);
        if (index >= 0) {
            templates[index] = template;
        } else {
            templates.push(template);
        }
        localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
    } catch (error) {
        console.error('Failed to save template:', error);
    }
}

export function loadTemplates(): Template[] {
    try {
        const data = localStorage.getItem(TEMPLATES_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load templates:', error);
        return [];
    }
}

export function deleteTemplate(id: string): void {
    try {
        const templates = loadTemplates();
        const filtered = templates.filter((t) => t.id !== id);
        localStorage.setItem(TEMPLATES_KEY, JSON.stringify(filtered));
    } catch (error) {
        console.error('Failed to delete template:', error);
    }
}

export function exportTemplates(): string {
    const templates = loadTemplates();
    return JSON.stringify(templates, null, 2);
}

export function importTemplates(json: string): boolean {
    try {
        const templates = JSON.parse(json) as Template[];
        if (Array.isArray(templates)) {
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
            return true;
        }
        return false;
    } catch (error) {
        console.error('Failed to import templates:', error);
        return false;
    }
}
