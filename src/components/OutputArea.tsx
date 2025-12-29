import React from 'react';
import { GeneratedVersions } from '../types';

interface OutputAreaProps {
    versions: GeneratedVersions;
    onVersionChange: (key: keyof GeneratedVersions, value: string) => void;
    onCopy: (text: string) => void;
    onSaveTemplate: (key: keyof GeneratedVersions) => void;
    onRevert: (key: keyof GeneratedVersions) => void;
    originalVersions: GeneratedVersions;
}

const versionLabels: Record<keyof GeneratedVersions, string> = {
    warm: '温暖版',
    professional: '专业版',
    concise: '精炼版',
    humorous: '幽默版',
    bilingual: '中英双语版',
};

export function OutputArea({
    versions,
    onVersionChange,
    onCopy,
    onSaveTemplate,
    onRevert,
    originalVersions,
}: OutputAreaProps) {
    const versionKeys: (keyof GeneratedVersions)[] = ['warm', 'professional', 'concise', 'humorous', 'bilingual'];

    return (
        <div className="mb-16">
            <h2 className="text-3xl font-light mb-10 text-gray-900 tracking-tight">输出区</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {versionKeys.map((key, index) => {
                    const isModified = versions[key] !== originalVersions[key];
                    return (
                        <div
                            key={key}
                            className="bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100/50 p-6 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-500 animate-scale-in"
                            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                        >
                            <div className="flex items-center justify-between mb-5">
                                <h3 className="font-light text-gray-900 text-xl tracking-tight">
                                    {versionLabels[key]}
                                </h3>
                                {isModified && (
                                    <span className="text-xs px-3 py-1 bg-orange-50/80 text-orange-600 rounded-full font-medium animate-fade-in">
                                        已修改
                                    </span>
                                )}
                            </div>
                            <textarea
                                value={versions[key]}
                                onChange={(e) => onVersionChange(key, e.target.value)}
                                rows={10}
                                className="w-full px-4 py-3.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 text-sm mb-5 bg-white text-gray-900 transition-all duration-300 hover:border-gray-300 resize-none leading-relaxed"
                            />
                            <div className="flex gap-2 flex-wrap">
                                <button
                                    onClick={() => onCopy(versions[key])}
                                    className="text-xs px-4 py-2 bg-gray-100/80 hover:bg-gray-200 rounded-xl text-gray-700 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    复制 Copy
                                </button>
                                <button
                                    onClick={() => onSaveTemplate(key)}
                                    className="text-xs px-4 py-2 bg-gray-50/80 hover:bg-gray-100 rounded-xl text-gray-700 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    保存为模板 Save
                                </button>
                                {isModified && (
                                    <button
                                        onClick={() => onRevert(key)}
                                        className="text-xs px-4 py-2 bg-orange-50/80 hover:bg-orange-100 rounded-xl text-orange-700 font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        恢复 Revert
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
