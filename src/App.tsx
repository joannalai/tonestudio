import React, { useState, useEffect, useCallback } from 'react';
import type { InputData, GeneratedVersions, Template } from './types';
import { generateVersions } from './utils/generator';
import {
    saveDraft,
    loadDraft,
    saveTemplate,
    loadTemplates,
    deleteTemplate,
    exportTemplates,
    importTemplates,
} from './utils/storage';
import { InputArea } from './components/InputArea';
import { OutputArea } from './components/OutputArea';
import { TemplateLibrary } from './components/TemplateLibrary';
import { Toast } from './components/Toast';

const defaultInput: InputData = {
    scene: '邮件',
    relationship: '半熟',
    intent: '请求',
    keyPoints: [],
    language: '中文',
    warmth: 3,
    cta: undefined,
};

const demoInput: InputData = {
    scene: '邮件',
    relationship: '半熟',
    intent: '请求',
    keyPoints: ['项目进度需要加快', '希望能在本周五前完成', '如果有困难可以随时沟通'],
    language: '中英都要',
    warmth: 4,
    cta: '能尽快回复我吗',
};

function App() {
    const [inputData, setInputData] = useState<InputData>(defaultInput);
    const [versions, setVersions] = useState<GeneratedVersions | null>(null);
    const [originalVersions, setOriginalVersions] = useState<GeneratedVersions | null>(null);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [toast, setToast] = useState<string | null>(null);
    const [, setSelectedVersionKey] = useState<keyof GeneratedVersions | null>(null);

    useEffect(() => {
        const draft = loadDraft();
        if (draft) {
            setInputData((prev) => ({ ...prev, ...draft }));
        }
        setTemplates(loadTemplates());
    }, []);

    useEffect(() => {
        saveDraft(inputData);
    }, [inputData]);

    const handleGenerate = useCallback(() => {
        if (inputData.keyPoints.length === 0) {
            setToast('请至少输入一条关键信息点');
            return;
        }
        const generated = generateVersions(inputData);
        setVersions(generated);
        setOriginalVersions({ ...generated });
        setSelectedVersionKey(null);
    }, [inputData]);

    const handleReset = () => {
        setInputData(defaultInput);
        setVersions(null);
        setOriginalVersions(null);
        setSelectedVersionKey(null);
    };

    const handleFillDemo = () => {
        setInputData(demoInput);
    };

    const handleVersionChange = (key: keyof GeneratedVersions, value: string) => {
        setVersions((prev) => {
            if (!prev) return prev;
            return { ...prev, [key]: value };
        });
        setSelectedVersionKey(key);
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setToast('已复制到剪贴板');
    };

    const handleSaveTemplate = (_key: keyof GeneratedVersions) => {
        if (!versions) {
            setToast('请先生成版本');
            return;
        }

        const template: Template = {
            ...inputData,
            id: Date.now().toString(),
            title: `${inputData.scene} - ${inputData.intent} - ${new Date().toLocaleDateString()}`,
            versions: { ...versions },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        saveTemplate(template);
        setTemplates(loadTemplates());
        setToast('模板已保存');
    };

    const handleRevert = (key: keyof GeneratedVersions) => {
        if (!originalVersions || !versions) return;
        setVersions((prev) => {
            if (!prev) return prev;
            return { ...prev, [key]: originalVersions[key]! };
        });
    };

    const handleLoadTemplate = (template: Template) => {
        setInputData({
            scene: template.scene,
            relationship: template.relationship,
            intent: template.intent,
            keyPoints: template.keyPoints,
            language: template.language,
            warmth: template.warmth,
            cta: template.cta,
        });
        setVersions(template.versions);
        setOriginalVersions({ ...template.versions });
        setToast('模板已载入');
    };

    const handleDeleteTemplate = (id: string) => {
        if (confirm('确定要删除这个模板吗？')) {
            deleteTemplate(id);
            setTemplates(loadTemplates());
            setToast('模板已删除');
        }
    };

    const handleExport = () => {
        const json = exportTemplates();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tone-studio-templates-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        setToast('模板已导出');
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const json = event.target?.result as string;
                    if (importTemplates(json)) {
                        setTemplates(loadTemplates());
                        setToast('模板已导入');
                    } else {
                        setToast('导入失败，请检查文件格式');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                handleGenerate();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 's') {
                e.preventDefault();
                if (versions) {
                    handleSaveTemplate('warm');
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleGenerate, versions]);

    return (
        <div className="min-h-screen bg-[#fafafa] py-16 px-4 md:py-24">
            <div className="max-w-6xl mx-auto">
                <header className="mb-16 text-center animate-fade-in-up">
                    <h1 className="text-6xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight leading-tight">
                        Tone Studio
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-light max-w-xl mx-auto leading-relaxed">
                        表达工作台 - 一键生成多种语气版本
                    </p>
                </header>

                <InputArea
                    data={inputData}
                    onChange={(data) => setInputData((prev) => ({ ...prev, ...data }))}
                    onGenerate={handleGenerate}
                    onReset={handleReset}
                    onFillDemo={handleFillDemo}
                />

                {versions && (
                    <div className="animate-fade-in-up animate-delay-200">
                        <OutputArea
                            versions={versions}
                            onVersionChange={handleVersionChange}
                            onCopy={handleCopy}
                            onSaveTemplate={handleSaveTemplate}
                            onRevert={handleRevert}
                            originalVersions={originalVersions!}
                        />
                    </div>
                )}

                <TemplateLibrary
                    templates={templates}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onLoadTemplate={handleLoadTemplate}
                    onDeleteTemplate={handleDeleteTemplate}
                    onExport={handleExport}
                    onImport={handleImport}
                />

                {toast && <Toast message={toast} onClose={() => setToast(null)} />}
            </div>
        </div>
    );
}

export default App;
