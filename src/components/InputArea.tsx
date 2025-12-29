import { InputData, Scene, Relationship, Intent, Language } from '../types';

interface InputAreaProps {
    data: InputData;
    onChange: (data: Partial<InputData>) => void;
    onGenerate: () => void;
    onReset: () => void;
    onFillDemo: () => void;
}

export function InputArea({ data, onChange, onGenerate, onReset, onFillDemo }: InputAreaProps) {
    const handleKeyPointsChange = (value: string) => {
        const points = value.split('\n').filter((p) => p.trim());
        onChange({ keyPoints: points.slice(0, 6) });
    };

    return (
        <div className="bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border border-gray-100/50 p-8 md:p-12 mb-12 animate-fade-in-up animate-delay-100 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-500">
            <h2 className="text-3xl font-light mb-8 text-gray-900 tracking-tight">输入区</h2>
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wide">场景 Scene</label>
                        <select
                            value={data.scene}
                            onChange={(e) => onChange({ scene: e.target.value as Scene })}
                            className="w-full px-4 py-3.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-300 cursor-pointer"
                        >
                            <option value="邮件">邮件</option>
                            <option value="会议开场">会议开场</option>
                            <option value="跟进">跟进</option>
                            <option value="社媒短帖">社媒短帖</option>
                            <option value="即时消息">即时消息</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                            对象关系 Relationship
                        </label>
                        <select
                            value={data.relationship}
                            onChange={(e) => onChange({ relationship: e.target.value as Relationship })}
                            className="w-full px-4 py-3.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-300 cursor-pointer"
                        >
                            <option value="熟人">熟人</option>
                            <option value="半熟">半熟</option>
                            <option value="陌生">陌生</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wide">目的 Intent</label>
                        <select
                            value={data.intent}
                            onChange={(e) => onChange({ intent: e.target.value as Intent })}
                            className="w-full px-4 py-3.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-300 cursor-pointer"
                        >
                            <option value="请求">请求</option>
                            <option value="感谢">感谢</option>
                            <option value="道歉">道歉</option>
                            <option value="通知">通知</option>
                            <option value="邀约">邀约</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                            语种 Language
                        </label>
                        <div className="flex gap-6 mt-3">
                            {(['中文', '英文', '中英都要'] as Language[]).map((lang) => (
                                <label key={lang} className="flex items-center cursor-pointer group">
                                    <input
                                        type="radio"
                                        value={lang}
                                        checked={data.language === lang}
                                        onChange={() => onChange({ language: lang })}
                                        className="mr-2 w-4 h-4 text-gray-900 focus:ring-2 focus:ring-gray-900 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{lang}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                        关键信息点 Key points（最多6条，用换行分隔）
                    </label>
                    <textarea
                        value={data.keyPoints.join('\n')}
                        onChange={(e) => handleKeyPointsChange(e.target.value)}
                        placeholder="每行一条关键信息..."
                        rows={4}
                        className="w-full px-4 py-3.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-300 resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-2">已输入 {data.keyPoints.length} / 6 条</p>
                </div>
                <div>
                    <label className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                        语气强度 Warmth（{data.warmth}/5）
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        value={data.warmth}
                        onChange={(e) => onChange({ warmth: parseInt(e.target.value) })}
                        className="w-full h-1.5 bg-gray-200/60 rounded-full appearance-none cursor-pointer accent-gray-900 transition-all"
                        style={{
                            background: `linear-gradient(to right, #1a1a1a 0%, #1a1a1a ${((data.warmth - 1) / 4) * 100}%, #e5e5e5 ${((data.warmth - 1) / 4) * 100}%, #e5e5e5 100%)`,
                        }}
                    />
                </div>
                <div>
                    <label className="block text-sm font-light text-gray-700 mb-3 tracking-wide">
                        CTA（可选）希望对方下一步做什么
                    </label>
                    <input
                        type="text"
                        value={data.cta || ''}
                        onChange={(e) => onChange({ cta: e.target.value || undefined })}
                        placeholder="例如：能尽快回复我吗"
                        className="w-full px-4 py-3.5 border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/20 focus:border-gray-400 bg-white text-gray-900 transition-all duration-300 hover:border-gray-300"
                    />
                </div>
                <div className="flex gap-4 pt-6">
                    <button
                        onClick={onGenerate}
                        className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900/30 focus:ring-offset-2 font-medium transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                    >
                        生成版本 Generate
                    </button>
                    <button
                        onClick={onReset}
                        className="px-6 py-4 border border-gray-200/60 rounded-xl hover:bg-gray-50/80 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:ring-offset-2 transition-all duration-300 text-gray-700 font-medium hover:scale-[1.02] active:scale-[0.98]"
                    >
                        清空 Reset
                    </button>
                    <button
                        onClick={onFillDemo}
                        className="px-6 py-4 border border-gray-200/60 rounded-xl hover:bg-gray-50/80 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400/30 focus:ring-offset-2 transition-all duration-300 text-gray-700 font-medium hover:scale-[1.02] active:scale-[0.98]"
                    >
                        载入示例 Fill demo
                    </button>
                </div>
            </div>
        </div>
    );
}
