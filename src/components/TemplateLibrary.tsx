import type { Template } from '../types';

interface TemplateLibraryProps {
    templates: Template[];
    searchQuery: string;
    onSearchChange: (query: string) => void;
    onLoadTemplate: (template: Template) => void;
    onDeleteTemplate: (id: string) => void;
    onExport: () => void;
    onImport: () => void;
}

export function TemplateLibrary({
    templates,
    searchQuery,
    onSearchChange,
    onLoadTemplate,
    onDeleteTemplate,
    onExport,
    onImport,
}: TemplateLibraryProps) {
    const filteredTemplates = templates.filter((t) => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            t.title.toLowerCase().includes(query) ||
            t.keyPoints.some((p) => p.toLowerCase().includes(query)) ||
            t.versions.warm.toLowerCase().includes(query)
        );
    });

    return (
        <div className="bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100/50 p-8 md:p-12 animate-fade-in-up animate-delay-300">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-light text-gray-900 tracking-tight">模板库</h2>
                <div className="flex gap-3">
                    <button
                        onClick={onExport}
                        className="px-5 py-2.5 text-sm border border-gray-200/60 rounded-xl hover:bg-gray-50/80 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:ring-offset-2 transition-all duration-300 text-gray-700 font-medium hover:scale-105 active:scale-95"
                    >
                        导出 Export
                    </button>
                    <button
                        onClick={onImport}
                        className="px-5 py-2.5 text-sm border border-gray-200/60 rounded-xl hover:bg-gray-50/80 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:ring-offset-2 transition-all duration-300 text-gray-700 font-medium hover:scale-105 active:scale-95"
                    >
                        导入 Import
                    </button>
                </div>
            </div>
            <div className="mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="搜索模板（标题/内容）..."
                    className="w-full px-4 py-3.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-300"
                />
            </div>
            {filteredTemplates.length === 0 ? (
                <p className="text-gray-400 text-center py-16 text-lg font-light">暂无模板</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template, index) => (
                        <div
                            key={template.id}
                            className="border border-gray-200/60 rounded-3xl p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 bg-white animate-scale-in"
                            style={{ animationDelay: `${0.4 + index * 0.05}s` }}
                        >
                            <h3 className="font-light text-gray-900 mb-4 text-xl tracking-tight">{template.title}</h3>
                            <div className="flex flex-wrap gap-2 mb-5">
                                <span className="text-xs px-3 py-1.5 bg-gray-50/80 text-gray-700 rounded-full font-medium">
                                    {template.scene}
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-gray-50/80 text-gray-700 rounded-full font-medium">
                                    {template.relationship}
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-gray-50/80 text-gray-700 rounded-full font-medium">
                                    {template.intent}
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-gray-50/80 text-gray-700 rounded-full font-medium">
                                    {template.language}
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 mb-5 font-light">
                                更新于 {new Date(template.updatedAt).toLocaleDateString()}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onLoadTemplate(template)}
                                    className="flex-1 px-4 py-2.5 text-sm bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/30 focus:ring-offset-2 transition-all duration-300 font-medium shadow-sm hover:shadow-lg hover:scale-105 active:scale-95"
                                >
                                    载入 Load
                                </button>
                                <button
                                    onClick={() => onDeleteTemplate(template.id)}
                                    className="px-4 py-2.5 text-sm bg-gray-50/80 text-gray-700 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:ring-offset-2 transition-all duration-300 font-medium hover:scale-105 active:scale-95"
                                >
                                    删除 Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
