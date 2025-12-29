import { InputData, GeneratedVersions } from '../types';

// 开头句式库
const openings: Record<string, Record<string, string[]>> = {
    邮件: {
        熟人: ['你好', 'Hi', '最近怎么样', '想和你聊聊'],
        半熟: ['你好', 'Hi', '打扰一下', '想和你沟通一下'],
        陌生: ['您好', 'Hello', '冒昧打扰', '初次联系'],
    },
    会议开场: {
        熟人: ['大家好', 'Hi everyone', '我们开始吧', '今天想和大家分享'],
        半熟: ['大家好', 'Hello everyone', '感谢大家参与', '今天我们来讨论'],
        陌生: ['各位好', 'Good morning/afternoon', '感谢各位参与', '今天会议的主题是'],
    },
    跟进: {
        熟人: ['上次我们聊到', '关于之前提到的', '想跟进一下', '还记得我们说的'],
        半熟: ['关于之前沟通的', '想跟进一下', '上次提到的', '关于这件事'],
        陌生: ['关于之前沟通的', '想跟进一下进展', '上次提到的', '关于此事'],
    },
    社媒短帖: {
        熟人: ['分享一个', '最近发现', '想和大家聊聊', '今天想分享'],
        半熟: ['分享一个', '最近发现', '想聊聊', '今天想分享'],
        陌生: ['分享一个', '最近发现', '想聊聊', '今天想分享'],
    },
    即时消息: {
        熟人: ['在吗', '想跟你说个事', '有个小问题问你', '有个想法想和你说说'],
        半熟: ['你好', '打扰一下', '有个问题想和你确认一下', '想和你简单沟通一件事'],
        陌生: ['您好', '打扰一下', '有件事情想和您确认', '这边有个简单的问题想请教'],
    },
};

// 结尾句式库
const closings: Record<string, Record<string, string[]>> = {
    请求: {
        熟人: ['麻烦你了', '谢谢', '拜托', '感激不尽'],
        半熟: ['谢谢', '感谢', '麻烦了', '期待回复'],
        陌生: ['谢谢', '感谢', '麻烦了', '期待您的回复'],
    },
    感谢: {
        熟人: ['再次感谢', '真的很感谢', '太感谢了', '谢谢'],
        半熟: ['再次感谢', '非常感谢', '谢谢', '感激不尽'],
        陌生: ['再次感谢', '非常感谢', '谢谢', '感激不尽'],
    },
    道歉: {
        熟人: ['抱歉', '不好意思', '再次道歉', '希望理解'],
        半熟: ['抱歉', '不好意思', '再次道歉', '希望您能理解'],
        陌生: ['抱歉', '不好意思', '再次道歉', '希望您能理解'],
    },
    通知: {
        熟人: ['请知悉', '请查看', '请留意', '谢谢'],
        半熟: ['请知悉', '请查看', '请留意', '谢谢'],
        陌生: ['请知悉', '请查看', '请留意', '谢谢'],
    },
    邀约: {
        熟人: ['期待见面', '期待', '等你', '到时候见'],
        半熟: ['期待见面', '期待', '期待您的参与', '谢谢'],
        陌生: ['期待见面', '期待', '期待您的参与', '谢谢'],
    },
};

// 连接词和过渡语（预留，未来可能使用）
// const connectors = [
//     '另外',
//     '同时',
//     '此外',
//     '值得一提的是',
//     '更重要的是',
//     '具体来说',
// ];

// 温暖版增强词
const warmthWords = ['非常', '特别', '真的', '真心', '由衷', '深深'];

// 专业版结构化词
const professionalWords = ['具体而言', '详细来说', '从以下方面', '主要包括', '关键点如下'];

// 幽默版轻松词（不冒犯）
const humorousPhrases = ['顺便一提', '悄悄说一句', '小提示', '友情提醒'];

// 英文开头
const englishOpenings: Record<string, Record<string, string[]>> = {
    邮件: {
        熟人: ['Hi', 'Hey', 'Hello', 'Hi there'],
        半熟: ['Hi', 'Hello', 'Hi there', 'Greetings'],
        陌生: ['Hello', 'Dear', 'Greetings', 'Good day'],
    },
    会议开场: {
        熟人: ['Hi everyone', 'Hey team', 'Hello all', 'Good to see everyone'],
        半熟: ['Hello everyone', 'Hi all', 'Good morning/afternoon', 'Thank you all'],
        陌生: ['Good morning/afternoon', 'Hello everyone', 'Thank you all', 'Greetings'],
    },
    跟进: {
        熟人: ['Following up on', 'About what we discussed', 'Just checking in', 'Re:'],
        半熟: ['Following up on', 'Regarding', 'About', 'Re:'],
        陌生: ['Following up on', 'Regarding', 'About', 'Re:'],
    },
    社媒短帖: {
        熟人: ['Sharing', 'Quick update', "Thought I'd share", 'FYI'],
        半熟: ['Sharing', 'Quick update', "Thought I'd share", 'FYI'],
        陌生: ['Sharing', 'Quick update', "Thought I'd share", 'FYI'],
    },
    即时消息: {
        熟人: ['Hey', 'Quick ping', 'Got a quick question', 'One quick thing'],
        半熟: ['Hi', 'Quick question', 'Quick check', 'Small request'],
        陌生: ['Hello', 'Quick question for you', 'Quick check-in', 'Short note for you'],
    },
};

// 英文结尾
const englishClosings: Record<string, Record<string, string[]>> = {
    请求: {
        熟人: ['Thanks!', 'Appreciate it!', 'Thanks a lot', 'Much appreciated'],
        半熟: ['Thank you', 'Appreciate it', 'Thanks', 'Looking forward'],
        陌生: ['Thank you', 'Appreciate it', 'Thanks', 'Looking forward to your reply'],
    },
    感谢: {
        熟人: ['Thanks again!', 'Really appreciate it', 'Thank you so much', 'Thanks'],
        半熟: ['Thank you again', 'Much appreciated', 'Thanks', 'Grateful'],
        陌生: ['Thank you again', 'Much appreciated', 'Thanks', 'Grateful'],
    },
    道歉: {
        熟人: ['Sorry about that', 'My apologies', 'Sorry', 'Hope you understand'],
        半熟: ['My apologies', 'Sorry', 'Apologies', 'Hope you understand'],
        陌生: ['My apologies', 'Sorry', 'Apologies', 'Hope you understand'],
    },
    通知: {
        熟人: ['Please note', 'FYI', 'Please check', 'Thanks'],
        半熟: ['Please note', 'FYI', 'Please check', 'Thanks'],
        陌生: ['Please note', 'FYI', 'Please check', 'Thanks'],
    },
    邀约: {
        熟人: ['Looking forward', 'See you then', "Can't wait", 'Thanks'],
        半熟: ['Looking forward', 'Looking forward to it', 'Thanks', 'Appreciate it'],
        陌生: ['Looking forward', 'Looking forward to it', 'Thanks', 'Appreciate it'],
    },
};

function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function organizeKeyPoints(keyPoints: string[], style: 'warm' | 'professional' | 'concise' | 'humorous'): string {
    if (keyPoints.length === 0) return '';
    if (keyPoints.length === 1) return keyPoints[0];

    if (style === 'concise') {
        return keyPoints.join('；');
    }

    if (style === 'professional') {
        const connector = getRandomItem(professionalWords);
        return `${connector}：${keyPoints.join('；')}`;
    }

    if (style === 'humorous' && keyPoints.length > 1) {
        const last = keyPoints[keyPoints.length - 1];
        const rest = keyPoints.slice(0, -1);
        return `${rest.join('，')}。${getRandomItem(humorousPhrases)}：${last}`;
    }

    return keyPoints.join('，');
}

function generateWarmVersion(input: InputData): string {
    const opening = getRandomItem(openings[input.scene][input.relationship]);
    const closing = getRandomItem(closings[input.intent][input.relationship]);
    const warmthLevel = input.warmth;
    const warmthPrefix = warmthLevel >= 4 ? getRandomItem(warmthWords) : '';
    const keyPointsText = organizeKeyPoints(input.keyPoints, 'warm');

    let text = opening;
    if (keyPointsText) {
        text += `，${warmthPrefix ? warmthPrefix + '想' : '想'}和你${getIntentVerb(input.intent)}${keyPointsText}`;
    }
    if (input.cta) {
        text += `。${warmthPrefix ? warmthPrefix + '希望' : '希望'}${input.cta}`;
    }
    text += `。${closing}`;

    return text;
}

function generateProfessionalVersion(input: InputData): string {
    const opening = getRandomItem(openings[input.scene][input.relationship]);
    const closing = getRandomItem(closings[input.intent][input.relationship]);
    const keyPointsText = organizeKeyPoints(input.keyPoints, 'professional');

    let text = opening;
    if (keyPointsText) {
        text += `，${getIntentVerb(input.intent)}${keyPointsText}`;
    }
    if (input.cta) {
        text += `。${input.cta}`;
    }
    text += `。${closing}`;

    return text;
}

function generateConciseVersion(input: InputData): string {
    const opening = getRandomItem(openings[input.scene][input.relationship]);
    const closing = getRandomItem(closings[input.intent][input.relationship]);
    const keyPointsText = organizeKeyPoints(input.keyPoints, 'concise');

    let text = opening;
    if (keyPointsText) {
        text += `，${keyPointsText}`;
    }
    if (input.cta) {
        text += `。${input.cta}`;
    }
    text += `。${closing}`;

    return text;
}

function generateHumorousVersion(input: InputData): string {
    const opening = getRandomItem(openings[input.scene][input.relationship]);
    const closing = getRandomItem(closings[input.intent][input.relationship]);
    const keyPointsText = organizeKeyPoints(input.keyPoints, 'humorous');

    let text = opening;
    if (keyPointsText) {
        text += `，${keyPointsText}`;
    }
    if (input.cta) {
        text += `。${input.cta}（不是催你哈）`;
    }
    text += `。${closing}`;

    return text;
}

function getIntentVerb(intent: string): string {
    const verbs: Record<string, string> = {
        请求: '和你',
        感谢: '感谢你',
        道歉: '向你道歉',
        通知: '通知你',
        邀约: '邀请你',
    };
    return verbs[intent] || '和你';
}

function generateEnglishVersion(input: InputData): string {
    const opening = getRandomItem(englishOpenings[input.scene][input.relationship]);
    const closing = getRandomItem(englishClosings[input.intent][input.relationship]);
    const keyPointsText = input.keyPoints.join('. ');

    let text = opening;
    if (keyPointsText) {
        text += `, ${keyPointsText}`;
    }
    if (input.cta) {
        text += `. ${input.cta}`;
    }
    text += `. ${closing}`;

    return text;
}

export function generateVersions(input: InputData): GeneratedVersions {
    const warm = generateWarmVersion(input);
    const professional = generateProfessionalVersion(input);
    const concise = generateConciseVersion(input);
    const humorous = generateHumorousVersion(input);

    let bilingual = '';
    if (input.language === '中英都要') {
        const chinese = warm;
        const english = generateEnglishVersion(input);
        bilingual = `${chinese}\n\n---\n\n${english}`;
    } else if (input.language === '英文') {
        bilingual = generateEnglishVersion(input);
    } else {
        bilingual = warm;
    }

    return {
        warm,
        professional,
        concise,
        humorous,
        bilingual,
    };
}
