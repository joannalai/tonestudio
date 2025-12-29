import { InputData, Template } from '../types';

const DRAFT_KEY = 'tone-studio-draft';
const TEMPLATES_KEY = 'tone-studio-templates';
const TEMPLATES_VERSION_KEY = 'tone-studio-templates-version';
const CURRENT_TEMPLATES_VERSION = '2'; // 版本号，更新默认模板时递增

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
    return [
        {
            scene: '邮件',
            relationship: '半熟',
            intent: '请求',
            keyPoints: [
                'Thanks for taking the time to review my background',
                "I'm applying for {Role} and I believe my experience in {X} maps well to {Y}",
                "I've attached my resume + a short portfolio link: {Link}",
                "If you think it's a fit, could you point me to the right next step (referral / recruiter / interview loop)?",
                'Happy to adapt quickly based on your guidance',
            ],
            language: '英文',
            warmth: 3,
            cta: 'Would you be open to a quick 10–15 min chat next week?',
            id: 'default-1',
            title: '邮件 - 请求 - 2025/12/29',
            versions: {
                warm: "想和你沟通一下，想和你和你Thanks for taking the time to review my background，I'm applying for {Role} and I believe my experience in {X} maps well to {Y}，I've attached my resume + a short portfolio link: {Link}，If you think it's a fit, could you point me to the right next step (referral / recruiter / interview loop)?，Happy to adapt quickly based on your guidance。希望Would you be open to a quick 10–15 min chat next week?。麻烦了",
                professional: "Hi，和你关键点如下：Thanks for taking the time to review my background；I'm applying for {Role} and I believe my experience in {X} maps well to {Y}；I've attached my resume + a short portfolio link: {Link}；If you think it's a fit, could you point me to the right next step (referral / recruiter / interview loop)?；Happy to adapt quickly based on your guidance。Would you be open to a quick 10–15 min chat next week?。麻烦了",
                concise: "Hi {Name}, thanks for taking the time to review my background. I'm applying for {Role}, and I believe my experience in {X} maps well to {Y}. I've attached my resume and included a short portfolio link: {Link}. If you think it's a fit, could you point me to the right next step—referral, recruiter contact, or the interview process? I'm happy to adapt quickly based on your guidance. Would you be open to a quick 10–15 minute chat next week? I look forward to hearing from you.",
                humorous: "Hi，Thanks for taking the time to review my background，I'm applying for {Role} and I believe my experience in {X} maps well to {Y}，I've attached my resume + a short portfolio link: {Link}，If you think it's a fit, could you point me to the right next step (referral / recruiter / interview loop)?。小提示：Happy to adapt quickly based on your guidance。Would you be open to a quick 10–15 min chat next week?（不是催你哈）。麻烦了",
                bilingual: "想和你沟通一下，想和你和你Thanks for taking the time to review my background，I'm applying for {Role} and I believe my experience in {X} maps well to {Y}，I've attached my resume + a short portfolio link: {Link}，If you think it's a fit, could you point me to the right next step (referral / recruiter / interview loop)?，Happy to adapt quickly based on your guidance。希望Would you be open to a quick 10–15 min chat next week?。麻烦了",
            },
            createdAt: '2025-12-29T09:48:11.315Z',
            updatedAt: '2025-12-29T09:48:11.315Z',
        },
        {
            scene: '会议开场',
            relationship: '半熟',
            intent: '请求',
            keyPoints: [
                '谢谢大家今天来，我们目标很简单：对齐 {Goal} 并敲定 {Decision}',
                '我建议我们按三个点过：现状、选项、下一步',
                '我会控制在 {Time} 分钟内结束',
                '有不同意见没关系，但希望我们能把分歧落到"下一步怎么做"',
                '好，那我们先从现状开始：{Context}',
            ],
            language: '中文',
            warmth: 3,
            cta: '如果过程中你觉得哪一点需要深挖，请直接打断我',
            id: 'default-2',
            title: '会议开场 - 请求 - 2025/12/29',
            versions: {
                warm: '你好，想和你和你谢谢大家今天来，我们目标很简单：对齐 {Goal} 并敲定 {Decision}，我建议我们按三个点过：现状、选项、下一步，我会控制在 {Time} 分钟内结束，有不同意见没关系，但希望我们能把分歧落到"下一步怎么做"，好，那我们先从现状开始：{Context}。希望如果过程中你觉得哪一点需要深挖，请直接打断我。麻烦了',
                professional: '你好，和你具体而言：谢谢大家今天来，我们目标很简单：对齐 {Goal} 并敲定 {Decision}；我建议我们按三个点过：现状、选项、下一步；我会控制在 {Time} 分钟内结束；有不同意见没关系，但希望我们能把分歧落到"下一步怎么做"；好，那我们先从现状开始：{Context}。如果过程中你觉得哪一点需要深挖，请直接打断我。期待回复',
                concise: '谢谢大家今天来，我们目标很简单：对齐 {Goal} 并敲定 {Decision}。我建议我们按三个部分来：现状、选项、下一步。我会控制在 {Time} 分钟内结束。如果有不同意见也没关系，希望我们能把分歧落到下一步怎么做上。好，那我们先从现状开始：{Context}。如果过程中你觉得哪一点需要深挖，请直接打断我。',
                humorous: 'Hi，谢谢大家今天来，我们目标很简单：对齐 {Goal} 并敲定 {Decision}，我建议我们按三个点过：现状、选项、下一步，我会控制在 {Time} 分钟内结束，有不同意见没关系，但希望我们能把分歧落到"下一步怎么做"。顺便一提：好，那我们先从现状开始：{Context}。如果过程中你觉得哪一点需要深挖，请直接打断我（不是催你哈）。谢谢',
                bilingual: '你好，想和你和你谢谢大家今天来，我们目标很简单：对齐 {Goal} 并敲定 {Decision}，我建议我们按三个点过：现状、选项、下一步，我会控制在 {Time} 分钟内结束，有不同意见没关系，但希望我们能把分歧落到"下一步怎么做"，好，那我们先从现状开始：{Context}。希望如果过程中你觉得哪一点需要深挖，请直接打断我。麻烦了',
            },
            createdAt: '2025-12-29T09:48:30.052Z',
            updatedAt: '2025-12-29T09:48:30.052Z',
        },
        {
            scene: '跟进',
            relationship: '半熟',
            intent: '请求',
            keyPoints: [
                '谢谢你们这两天配合确认 {Item} 的细节',
                '我们这边内部已经确认：数量 {Qty}、颜色 {Color}、包装 {Packaging}',
                '现在只差交期和打样节点的最终确认',
                '你们能否给到：{Date} 前出 Top sample、{Date2} 前可量产的计划？',
                '如果有风险点也请直接告诉我，我们可以一起调整方案',
            ],
            language: '中文',
            warmth: 3,
            cta: '请回信确认交期表是否可行（或给出你们建议的替代时间）',
            id: 'default-3',
            title: '跟进 - 请求 - 2025/12/29',
            versions: {
                warm: '谢谢你们这两天配合确认 {Item} 的细节，我们这边内部已经确认：{Qty}、{Color}和 {Packaging}，现在还需确认交期和打样节点。你们能否在 {Date} 前给出 Top sample？能否在 {Date2} 前给出可量产的计划？如果有任何风险点也请直接告诉我，我们可以一起调整方案。请回信确认交期表是否可行（或给出你们建议的替代时间）。谢谢！',
                professional: '上次提到的，和你详细来说：谢谢你们这两天配合确认 {Item} 的细节；我们这边内部已经确认：数量 {Qty}、颜色 {Color}、包装 {Packaging}；现在只差交期和打样节点的最终确认；你们能否给到：{Date} 前出 Top sample、{Date2} 前可量产的计划？；如果有风险点也请直接告诉我，我们可以一起调整方案。请回信确认交期表是否可行（或给出你们建议的替代时间）。感谢',
                concise: '上次提到的，谢谢你们这两天配合确认 {Item} 的细节；我们这边内部已经确认：数量 {Qty}、颜色 {Color}、包装 {Packaging}；现在只差交期和打样节点的最终确认；你们能否给到：{Date} 前出 Top sample、{Date2} 前可量产的计划？；如果有风险点也请直接告诉我，我们可以一起调整方案。请回信确认交期表是否可行（或给出你们建议的替代时间）。谢谢',
                humorous: '关于这件事，谢谢你们这两天配合确认 {Item} 的细节，我们这边内部已经确认：数量 {Qty}、颜色 {Color}、包装 {Packaging}，现在只差交期和打样节点的最终确认，你们能否给到：{Date} 前出 Top sample、{Date2} 前可量产的计划？。悄悄说一句：如果有风险点也请直接告诉我，我们可以一起调整方案。请回信确认交期表是否可行（或给出你们建议的替代时间）（不是催你哈）。感谢',
                bilingual: '关于这件事，想和你和你谢谢你们这两天配合确认 {Item} 的细节，我们这边内部已经确认：数量 {Qty}、颜色 {Color}、包装 {Packaging}，现在只差交期和打样节点的最终确认，你们能否给到：{Date} 前出 Top sample、{Date2} 前可量产的计划？，如果有风险点也请直接告诉我，我们可以一起调整方案。希望请回信确认交期表是否可行（或给出你们建议的替代时间）。谢谢\n\n---\n\nAbout, 谢谢你们这两天配合确认 {Item} 的细节. 我们这边内部已经确认：数量 {Qty}、颜色 {Color}、包装 {Packaging}. 现在只差交期和打样节点的最终确认. 你们能否给到：{Date} 前出 Top sample、{Date2} 前可量产的计划？. 如果有风险点也请直接告诉我，我们可以一起调整方案. 请回信确认交期表是否可行（或给出你们建议的替代时间）. Looking forward',
            },
            createdAt: '2025-12-29T09:48:51.649Z',
            updatedAt: '2025-12-29T09:48:51.649Z',
        },
        {
            scene: '社媒短帖',
            relationship: '半熟',
            intent: '请求',
            keyPoints: [
                '我最近在做一个小工具：Tone Studio（让表达更自然、更省心）',
                '它不是写鸡汤，是帮你把事实说清楚、把语气调舒服',
                '我做了 5 种版本：温暖/专业/精炼/幽默/中英双语',
                '如果你愿意，丢给我一个你最难开口的场景，我用它帮你跑一遍',
                '我也想收集真实需求，看看下一步最该补什么',
            ],
            language: '中文',
            warmth: 3,
            cta: '评论区写一句你最常用的场景：道歉/催进度/感谢/邀约/拒绝',
            id: 'default-4',
            title: '社媒短帖 - 请求 - 2025/12/29',
            versions: {
                warm: '我发现自己最耗能的一件事，不是做事，是发消息：该客气的时候怕显得卑微，该强硬的时候又怕伤人。\n\n所以我做了 Tone Studio——把事实写进去，它帮我把语气调到刚刚好（温暖/专业/精炼/幽默/中英双语）。\n\n你也有那种难以开口的消息吗？如果你愿意，留言一个你最难开口的场景。我用它先给你写一版，你只需要告诉我：像不像你？',
                professional: '今天想分享，和你关键点如下：我最近在做一个小工具：Tone Studio（让表达更自然、更省心）；它不是写鸡汤，是帮你把事实说清楚、把语气调舒服；我做了 5 种版本：温暖/专业/精炼/幽默/中英双语；如果你愿意，丢给我一个你最难开口的场景，我用它帮你跑一遍；我也想收集真实需求，看看下一步最该补什么。评论区写一句你最常用的场景：道歉/催进度/感谢/邀约/拒绝。麻烦了',
                concise: '最近发现，我最近在做一个小工具：Tone Studio（让表达更自然、更省心）；它不是写鸡汤，是帮你把事实说清楚、把语气调舒服；我做了 5 种版本：温暖/专业/精炼/幽默/中英双语；如果你愿意，丢给我一个你最难开口的场景，我用它帮你跑一遍；我也想收集真实需求，看看下一步最该补什么。评论区写一句你最常用的场景：道歉/催进度/感谢/邀约/拒绝。期待回复',
                humorous: '想聊聊，我最近在做一个小工具：Tone Studio（让表达更自然、更省心），它不是写鸡汤，是帮你把事实说清楚、把语气调舒服，我做了 5 种版本：温暖/专业/精炼/幽默/中英双语，如果你愿意，丢给我一个你最难开口的场景，我用它帮你跑一遍。悄悄说一句：我也想收集真实需求，看看下一步最该补什么。评论区写一句你最常用的场景：道歉/催进度/感谢/邀约/拒绝（不是催你哈）。感谢',
                bilingual: '分享一个，想和你和你我最近在做一个小工具：Tone Studio（让表达更自然、更省心），它不是写鸡汤，是帮你把事实说清楚、把语气调舒服，我做了 5 种版本：温暖/专业/精炼/幽默/中英双语，如果你愿意，丢给我一个你最难开口的场景，我用它帮你跑一遍，我也想收集真实需求，看看下一步最该补什么。希望评论区写一句你最常用的场景：道歉/催进度/感谢/邀约/拒绝。麻烦了\n\n---\n\nSharing, 我最近在做一个小工具：Tone Studio（让表达更自然、更省心）. 它不是写鸡汤，是帮你把事实说清楚、把语气调舒服. 我做了 5 种版本：温暖/专业/精炼/幽默/中英双语. 如果你愿意，丢给我一个你最难开口的场景，我用它帮你跑一遍. 我也想收集真实需求，看看下一步最该补什么. 评论区写一句你最常用的场景：道歉/催进度/感谢/邀约/拒绝. Looking forward',
            },
            createdAt: '2025-12-29T09:49:15.540Z',
            updatedAt: '2025-12-29T09:49:15.540Z',
        },
        {
            scene: '即时消息',
            relationship: '半熟',
            intent: '请求',
            keyPoints: ['嗨 {Name}，想请你帮我确认一下 {Thing}', '我这边需要在 {Time} 前把下一步定下来', '你更倾向 A 还是 B？我把差异写成一句：{Diff}'],
            language: '中文',
            warmth: 3,
            cta: '你回我 A 或 B 就行，我立刻按你的方向推进。',
            id: 'default-5',
            title: '即时消息 - 请求 - 2025/12/29',
            versions: {
                warm: '你好，想和你和你嗨 {Name}，想请你帮我确认一下 {Thing}，我这边需要在 {Time} 前把下一步定下来，你更倾向 A 还是 B？我把差异写成一句：{Diff}。希望你回我 A 或 B 就行，我立刻按你的方向推进。。期待回复',
                professional: '你好，和你具体而言：嗨 {Name}，想请你帮我确认一下 {Thing}；我这边需要在 {Time} 前把下一步定下来；你更倾向 A 还是 B？我把差异写成一句：{Diff}。你回我 A 或 B 就行，我立刻按你的方向推进。。麻烦了',
                concise: '嗨 {Name}，打扰了，想请你帮我确认一下 {Thing}，我这边需要在 {Time} 前把下一步定下来。你更倾向 A 还是 B？我把差异写成一句：{Diff}。你回我 A 或 B 就行，我立刻按你的方向推进。麻烦了！',
                humorous: '有个问题想和你确认一下，嗨 {Name}，想请你帮我确认一下 {Thing}，我这边需要在 {Time} 前把下一步定下来。友情提醒：你更倾向 A 还是 B？我把差异写成一句：{Diff}。你回我 A 或 B 就行，我立刻按你的方向推进。（不是催你哈）。麻烦了',
                bilingual: '你好，想和你和你嗨 {Name}，想请你帮我确认一下 {Thing}，我这边需要在 {Time} 前把下一步定下来，你更倾向 A 还是 B？我把差异写成一句：{Diff}。希望你回我 A 或 B 就行，我立刻按你的方向推进。。期待回复\n\n---\n\nQuick check, 嗨 {Name}，想请你帮我确认一下 {Thing}. 我这边需要在 {Time} 前把下一步定下来. 你更倾向 A 还是 B？我把差异写成一句：{Diff}. 你回我 A 或 B 就行，我立刻按你的方向推进。. Looking forward',
            },
            createdAt: '2025-12-29T09:49:30.572Z',
            updatedAt: '2025-12-29T09:49:30.572Z',
        },
        {
            scene: '即时消息',
            relationship: '半熟',
            intent: '感谢',
            keyPoints: ['谢谢你刚刚帮我看 {Topic}，真的很关键', '我已经按你说的把 {Change} 调整好了', '结果比我预期顺很多，省了不少时间'],
            language: '中文',
            warmth: 3,
            cta: '改完的版本我发你一份？你方便的话帮我看一眼有没有漏的点',
            id: 'default-6',
            title: '即时消息 - 感谢 - 2025/12/29',
            versions: {
                warm: '想和你沟通一下，想和你和你谢谢你刚刚帮我看 {Topic}，真的很关键，我已经按你说的把 {Change} 调整好了，结果比我预期顺很多，省了不少时间。希望改完的版本我发你一份？你方便的话帮我看一眼有没有漏的点。感谢',
                professional: 'Hi，和你详细来说：谢谢你刚刚帮我看 {Topic}，真的很关键；我已经按你说的把 {Change} 调整好了；结果比我预期顺很多，省了不少时间。改完的版本我发你一份？你方便的话帮我看一眼有没有漏的点。谢谢',
                concise: 'Hi！谢谢你刚刚帮我审阅 {Topic}，真的很关键。我已经按你说的把 {Change} 调整好了，结果比我预期顺很多，省了不少时间。改后的版本我发你一份？方便的话能否请你帮我看一眼有没有漏的点。麻烦了！',
                humorous: 'Hi，谢谢你刚刚帮我看 {Topic}，真的很关键，我已经按你说的把 {Change} 调整好了。顺便一提：结果比我预期顺很多，省了不少时间。改完的版本我发你一份？你方便的话帮我看一眼有没有漏的点（不是催你哈）。感谢',
                bilingual: '想和你沟通一下，想和你和你谢谢你刚刚帮我看 {Topic}，真的很关键，我已经按你说的把 {Change} 调整好了，结果比我预期顺很多，省了不少时间。希望改完的版本我发你一份？你方便的话帮我看一眼有没有漏的点。感谢',
            },
            createdAt: '2025-12-29T09:49:46.345Z',
            updatedAt: '2025-12-29T09:49:46.345Z',
        },
        {
            scene: '即时消息',
            relationship: '半熟',
            intent: '道歉',
            keyPoints: ['抱歉我回得有点晚，这两天在处理 {Context}', '但你提的 {Topic} 我没忘，也一直在推进', '目前进度是：{Progress}，我会在 {Time} 前发你可用版本'],
            language: '中文',
            warmth: 3,
            cta: '你希望我先发关键部分，还是等完整版一起发？',
            id: 'default-7',
            title: '即时消息 - 道歉 - 2025/12/29',
            versions: {
                warm: '有个问题想和你确认一下，想和你向你道歉抱歉我回得有点晚，这两天在处理 {Context}，但你提的 {Topic} 我没忘，也一直在推进，目前进度是：{Progress}，我会在 {Time} 前发你可用版本。希望你希望我先发关键部分，还是等完整版一起发？。抱歉',
                professional: '你好，向你道歉主要包括：抱歉我回得有点晚，这两天在处理 {Context}；但你提的 {Topic} 我没忘，也一直在推进；目前进度是：{Progress}，我会在 {Time} 前发你可用版本。你希望我先发关键部分，还是等完整版一起发？。希望您能理解',
                concise: '你好，抱歉我回得有点晚，这两天在处理 {Context}。但你提的 {Topic} 我没忘，也一直在推进。目前进度是：{Progress}，我会在 {Time} 前发你可用版本。你希望我先发关键部分，还是等完整版一起发？',
                humorous: '有个问题想和你确认一下，抱歉我回得有点晚，这两天在处理 {Context}，但你提的 {Topic} 我没忘，也一直在推进。小提示：目前进度是：{Progress}，我会在 {Time} 前发你可用版本。你希望我先发关键部分，还是等完整版一起发？（不是催你哈）。再次道歉',
                bilingual: '有个问题想和你确认一下，想和你向你道歉抱歉我回得有点晚，这两天在处理 {Context}，但你提的 {Topic} 我没忘，也一直在推进，目前进度是：{Progress}，我会在 {Time} 前发你可用版本。希望你希望我先发关键部分，还是等完整版一起发？。抱歉\n\n---\n\nQuick check, 抱歉我回得有点晚，这两天在处理 {Context}. 但你提的 {Topic} 我没忘，也一直在推进. 目前进度是：{Progress}，我会在 {Time} 前发你可用版本. 你希望我先发关键部分，还是等完整版一起发？. My apologies',
            },
            createdAt: '2025-12-29T09:51:01.605Z',
            updatedAt: '2025-12-29T09:51:01.605Z',
        },
        {
            scene: '即时消息',
            relationship: '半熟',
            intent: '通知',
            keyPoints: [
                '跟你同步一下：{Topic} 我这边已经更新到 {Status}',
                '我把最新版本放在 {Link/Where}，并标了改动点',
                '如果你这边没有异议，我会按这个版本继续推进',
            ],
            language: '中文',
            warmth: 3,
            cta: '你方便回我一句 ok / 需要改 就行',
            id: 'default-8',
            title: '即时消息 - 通知 - 2025/12/29',
            versions: {
                warm: '想和你简单沟通一件事，想和你通知你跟你同步一下：{Topic} 我这边已经更新到 {Status}，我把最新版本放在 {Link/Where}，并标了改动点，如果你这边没有异议，我会按这个版本继续推进。希望你方便回我一句 ok / 需要改 就行。请知悉',
                professional: '打扰一下，通知你具体而言：跟你同步一下：{Topic} 我这边已经更新到 {Status}；我把最新版本放在 {Link/Where}，并标了改动点；如果你这边没有异议，我会按这个版本继续推进。你方便回我一句 ok / 需要改 就行。请留意',
                concise: '有个问题想跟你同步一下：{Topic} 我这边已经更新到 {Status}。我把最新版本放在 {Link/Where}，并标了改动点。如果你这边没有异议，我会按这个版本继续推进。你方便回我一句"ok / 需要改"就行。请留意，谢谢！',
                humorous: '你好，跟你同步一下：{Topic} 我这边已经更新到 {Status}，我把最新版本放在 {Link/Where}，并标了改动点。悄悄说一句：如果你这边没有异议，我会按这个版本继续推进。你方便回我一句 ok / 需要改 就行（不是催你哈）。请查看',
                bilingual: '想和你简单沟通一件事，想和你通知你跟你同步一下：{Topic} 我这边已经更新到 {Status}，我把最新版本放在 {Link/Where}，并标了改动点，如果你这边没有异议，我会按这个版本继续推进。希望你方便回我一句 ok / 需要改 就行。请知悉\n\n---\n\nQuick question, 跟你同步一下：{Topic} 我这边已经更新到 {Status}. 我把最新版本放在 {Link/Where}，并标了改动点. 如果你这边没有异议，我会按这个版本继续推进. 你方便回我一句 ok / 需要改 就行. Please check',
            },
            createdAt: '2025-12-29T09:54:14.633Z',
            updatedAt: '2025-12-29T09:54:14.633Z',
        },
        {
            scene: '即时消息',
            relationship: '半熟',
            intent: '邀约',
            keyPoints: ['我想约你 10 分钟快速对齐一下 {Topic}', '你今天 {TimeA} 或明天 {TimeB} 哪个方便？', '如果你不方便语音，我也可以把问题整理成 3 句话发你'],
            language: '中文',
            warmth: 3,
            cta: '回我一个你方便的时间点就好',
            id: 'default-9',
            title: '即时消息 - 邀约 - 2025/12/29',
            versions: {
                warm: '有个问题想和你确认一下，想和你邀请你我想约你 10 分钟快速对齐一下 {Topic}，你今天 {TimeA} 或明天 {TimeB} 哪个方便？，如果你不方便语音，我也可以把问题整理成 3 句话发你。希望回我一个你方便的时间点就好。谢谢',
                professional: '你好，邀请你主要包括：我想约你 10 分钟快速对齐一下 {Topic}；你今天 {TimeA} 或明天 {TimeB} 哪个方便？；如果你不方便语音，我也可以把问题整理成 3 句话发你。回我一个你方便的时间点就好。期待见面',
                concise: '你好，我想约你 10 分钟快速对齐一下 {Topic}。请问今天 {TimeA} 或明天 {TimeB} ，哪个时间你更方便？如果不方便语音，我也可以把问题整理成3句话发你。回我一个你方便的时间点就好。期待您的参与！',
                humorous: '你好，我想约你 10 分钟快速对齐一下 {Topic}，你今天 {TimeA} 或明天 {TimeB} 哪个方便？。友情提醒：如果你不方便语音，我也可以把问题整理成 3 句话发你。回我一个你方便的时间点就好（不是催你哈）。期待',
                bilingual: '有个问题想和你确认一下，想和你邀请你我想约你 10 分钟快速对齐一下 {Topic}，你今天 {TimeA} 或明天 {TimeB} 哪个方便？，如果你不方便语音，我也可以把问题整理成 3 句话发你。希望回我一个你方便的时间点就好。谢谢',
            },
            createdAt: '2025-12-29T09:56:07.423Z',
            updatedAt: '2025-12-29T09:56:07.423Z',
        },
    ];
}

export function loadTemplates(): Template[] {
    try {
        const savedVersion = localStorage.getItem(TEMPLATES_VERSION_KEY);
        const data = localStorage.getItem(TEMPLATES_KEY);
        
        // 如果没有数据，或者版本不匹配，或者模板为空，初始化默认模板
        if (!data || savedVersion !== CURRENT_TEMPLATES_VERSION) {
            const defaultTemplates = getDefaultTemplates();
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates));
            localStorage.setItem(TEMPLATES_VERSION_KEY, CURRENT_TEMPLATES_VERSION);
            return defaultTemplates;
        }
        
        const templates = JSON.parse(data);
        // 如果模板数组为空，也初始化默认模板
        if (Array.isArray(templates) && templates.length === 0) {
            const defaultTemplates = getDefaultTemplates();
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates));
            localStorage.setItem(TEMPLATES_VERSION_KEY, CURRENT_TEMPLATES_VERSION);
            return defaultTemplates;
        }
        return templates;
    } catch (error) {
        console.error('Failed to load templates:', error);
        // 出错时也返回默认模板
        const defaultTemplates = getDefaultTemplates();
        try {
            localStorage.setItem(TEMPLATES_KEY, JSON.stringify(defaultTemplates));
            localStorage.setItem(TEMPLATES_VERSION_KEY, CURRENT_TEMPLATES_VERSION);
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
