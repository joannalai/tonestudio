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

function getDefaultTemplates(): Template[] {
    const now = new Date().toISOString();
    return [
        {
            id: 'default-1',
            scene: '邮件',
            relationship: '半熟',
            intent: '请求',
            keyPoints: ['项目进度需要加快', '希望能在本周五前完成'],
            language: '中文',
            warmth: 3,
            cta: '能尽快回复我吗',
            title: '邮件 - 请求 - 示例',
            versions: {
                warm: '你好，想和你沟通一下项目进度需要加快，希望能在本周五前完成。希望能尽快回复我吗。谢谢。',
                professional: '你好，通知你具体而言：项目进度需要加快；希望能在本周五前完成。能尽快回复我吗。谢谢。',
                concise: '你好，项目进度需要加快；希望能在本周五前完成。能尽快回复我吗。谢谢。',
                humorous: '你好，项目进度需要加快，希望能在本周五前完成。能尽快回复我吗（不是催你哈）。谢谢。',
                bilingual: '你好，想和你沟通一下项目进度需要加快，希望能在本周五前完成。希望能尽快回复我吗。谢谢。\n\n---\n\nHi, regarding project progress needs to be accelerated. Hope to complete by this Friday. Can you reply as soon as possible. Thanks.',
            },
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'default-2',
            scene: '即时消息',
            relationship: '半熟',
            intent: '感谢',
            keyPoints: ['感谢你的帮助', '项目顺利完成'],
            language: '中文',
            warmth: 4,
            title: '即时消息 - 感谢 - 示例',
            versions: {
                warm: 'Hi，特别想感谢你的帮助，项目顺利完成。再次感谢。',
                professional: 'Hi，通知你具体而言：感谢你的帮助；项目顺利完成。再次感谢。',
                concise: 'Hi，感谢你的帮助，项目顺利完成。再次感谢。',
                humorous: 'Hi，感谢你的帮助，项目顺利完成。顺便一提：再次感谢。再次感谢。',
                bilingual: 'Hi，特别想感谢你的帮助，项目顺利完成。再次感谢。\n\n---\n\nHi, really want to thank you for your help. Project completed successfully. Thanks again.',
            },
            createdAt: now,
            updatedAt: now,
        },
        {
            id: 'default-3',
            scene: '会议开场',
            relationship: '半熟',
            intent: '通知',
            keyPoints: ['今天的会议主题', '讨论项目进展', '预计1小时'],
            language: '中文',
            warmth: 3,
            title: '会议开场 - 通知 - 示例',
            versions: {
                warm: '大家好，想和大家分享今天的会议主题，讨论项目进展，预计1小时。请知悉。',
                professional: '大家好，通知你具体而言：今天的会议主题；讨论项目进展；预计1小时。请知悉。',
                concise: '大家好，今天的会议主题，讨论项目进展，预计1小时。请知悉。',
                humorous: '大家好，今天的会议主题，讨论项目进展。悄悄说一句：预计1小时。请知悉。',
                bilingual: '大家好，想和大家分享今天的会议主题，讨论项目进展，预计1小时。请知悉。\n\n---\n\nHello everyone, want to share today\'s meeting topic. Discuss project progress. Expected 1 hour. Please note.',
            },
            createdAt: now,
            updatedAt: now,
        },
    ];
}

export function loadTemplates(): Template[] {
    try {
        const data = localStorage.getItem(TEMPLATES_KEY);
        if (!data) {
            // 如果没有任何模板，初始化默认模板
            const defaultTemplates = getDefaultTemplates();
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates));
            return defaultTemplates;
        }
        const templates = JSON.parse(data);
        // 如果模板数组为空，也初始化默认模板
        if (Array.isArray(templates) && templates.length === 0) {
            const defaultTemplates = getDefaultTemplates();
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates));
            return defaultTemplates;
        }
        return templates;
    } catch (error) {
        console.error('Failed to load templates:', error);
        // 出错时也返回默认模板
        const defaultTemplates = getDefaultTemplates();
        try {
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates));
        } catch (e) {
            // 如果 localStorage 不可用，至少返回默认模板
        }
        return defaultTemplates;
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
