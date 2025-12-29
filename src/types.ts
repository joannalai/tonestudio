export type Scene = '邮件' | '会议开场' | '跟进' | '社媒短帖' | '即时消息';
export type Relationship = '熟人' | '半熟' | '陌生';
export type Intent = '请求' | '感谢' | '道歉' | '通知' | '邀约';
export type Language = '中文' | '英文' | '中英都要';

export interface InputData {
    scene: Scene;
    relationship: Relationship;
    intent: Intent;
    keyPoints: string[];
    language: Language;
    warmth: number;
    cta?: string;
}

export interface GeneratedVersions {
    warm: string;
    professional: string;
    concise: string;
    humorous: string;
    bilingual: string;
}

export interface Template extends InputData {
    id: string;
    title: string;
    versions: GeneratedVersions;
    createdAt: string;
    updatedAt: string;
}
