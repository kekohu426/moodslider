
import { CoachFeedback, LevelConfig, Language, ItemType, CustomUserItem } from "../types";

// --- LOCAL SEMANTIC DICTIONARY (本地语义映射词库) ---
// Maps keywords (regex or string) to specific Emojis.
// Expanded to 100+ entries to cover diverse life stressors without AI.

const STRESSOR_MAP: Array<{ keys: string[], emoji: string, category: string }> = [
    // --- Workplace (职场) ---
    { keys: ["boss", "manager", "ceo", "老板", "领导", "总监", "经理", "上司"], emoji: "👹", category: "Work" },
    { keys: ["meeting", "meet", "call", "zoom", "teams", "会议", "开会", "日报", "周报", "月报"], emoji: "📢", category: "Work" },
    { keys: ["deadline", "ddl", "late", "urgent", "asap", "截止", "过期", "加急", "最后期限"], emoji: "⏰", category: "Work" },
    { keys: ["email", "spam", "outlook", "邮件", "消息", "钉钉", "飞书", "微信", "回复"], emoji: "📧", category: "Work" },
    { keys: ["ppt", "slides", "presentation", "deck", "汇报", "幻灯片", "方案"], emoji: "📉", category: "Work" },
    { keys: ["bug", "error", "fix", "crash", "故障", "报错", "漏洞", "调试", "exception"], emoji: "🪲", category: "Work" },
    { keys: ["code", "java", "python", "css", "dev", "代码", "编程", "开发", "需求", "git"], emoji: "💻", category: "Work" },
    { keys: ["salary", "money", "pay", "bonus", "工资", "薪水", "奖金", "钱", "穷", "报销", "扣钱"], emoji: "💸", category: "Work" },
    { keys: ["fired", "layoff", "quit", "裁员", "辞职", "失业", "优化", "毕业"], emoji: "📦", category: "Work" },
    { keys: ["overtime", "ot", "996", "007", "tired", "work", "加班", "好累", "疲惫", "卷", "通宵"], emoji: "🌚", category: "Work" },
    { keys: ["client", "customer", "甲方", "客户", "爸爸", "改稿", "意见", "logo"], emoji: "😤", category: "Work" },
    { keys: ["kpi", "okr", "review", "绩效", "考核", "目标", "末位淘汰", "361"], emoji: "📊", category: "Work" },
    { keys: ["tax", "taxes", "audit", "税", "个税", "社保", "公积金"], emoji: "📉", category: "Work" },
    { keys: ["interview", "resume", "cv", "面试", "简历", "求职", "找工作"], emoji: "👔", category: "Work" },
    { keys: ["printer", "jam", "paper", "打印机", "卡纸", "没墨"], emoji: "🖨️", category: "Work" },
    { keys: ["excel", "spreadsheet", "data", "表格", "数据", "透视表", "vlookup"], emoji: "📑", category: "Work" },
    { keys: ["colleague", "coworker", "team", "同事", "猪队友", "甩锅"], emoji: "🤡", category: "Work" },
    { keys: ["commute", "bus", "subway", "traffic", "通勤", "地铁", "挤", "堵车"], emoji: "🚌", category: "Work" },
    { keys: ["vpn", "connection", "proxy", "翻墙", "连不上", "网络"], emoji: "🌐", category: "Work" },
    { keys: ["password", "login", "access", "密码", "登录", "权限"], emoji: "🔐", category: "Work" },
    { keys: ["monday", "week", "周一", "星期一"], emoji: "📅", category: "Work" },
    { keys: ["friday", "weekend", "周五", "周末"], emoji: "🎉", category: "Happy" },

    // --- Life & Home (生活) ---
    { keys: ["rent", "house", "bill", "房租", "房贷", "物业费", "账单", "水电"], emoji: "🧾", category: "Life" },
    { keys: ["chore", "clean", "wash", "家务", "打扫", "洗碗", "拖地"], emoji: "🧹", category: "Life" },
    { keys: ["laundry", "clothes", "洗衣服", "晾衣", "叠衣服", "袜子"], emoji: "🧺", category: "Life" },
    { keys: ["trash", "garbage", "rubbish", "垃圾", "倒垃圾", "分类"], emoji: "🚮", category: "Life" },
    { keys: ["noise", "loud", "neighbor", "snore", "噪音", "装修", "邻居", "吵", "呼噜"], emoji: "🔊", category: "Life" },
    { keys: ["repair", "broken", "leak", "维修", "漏水", "坏了", "堵了"], emoji: "🔧", category: "Life" },
    { keys: ["pest", "cockroach", "rat", "蟑螂", "老鼠", "虫子", "蚊子"], emoji: "🪳", category: "Life" },
    { keys: ["delivery", "package", "wait", "快递", "外卖", "超时", "丢件"], emoji: "📦", category: "Life" },
    { keys: ["weather", "rain", "hot", "cold", "天气", "下雨", "暴晒", "太冷", "humid"], emoji: "🌧️", category: "Life" },
    { keys: ["queue", "wait", "line", "排队", "插队", "等位"], emoji: "🚶", category: "Life" },
    { keys: ["cooking", "burn", "food", "做饭", "糊了", "难吃", "咸"], emoji: "🍳", category: "Life" },
    { keys: ["shopping", "buy", "expensive", "买", "贵", "剁手", "双11"], emoji: "🛍️", category: "Life" },

    // --- Health & Body (健康) ---
    { keys: ["sleep", "insomnia", "awake", "失眠", "睡不着", "熬夜", "黑眼圈"], emoji: "💤", category: "Health" },
    { keys: ["sick", "ill", "covid", "flu", "pain", "生病", "发烧", "感冒", "疼", "难受"], emoji: "🤒", category: "Health" },
    { keys: ["weight", "fat", "diet", "减肥", "长胖", "卡路里", "肚子", "scale"], emoji: "⚖️", category: "Health" },
    { keys: ["hair", "bald", "loss", "脱发", "秃头", "掉发", "发际线"], emoji: "👨‍🦲", category: "Health" },
    { keys: ["acne", "pimple", "skin", "痘痘", "长痘", "烂脸", "过敏"], emoji: "🔴", category: "Health" },
    { keys: ["dentist", "tooth", "teeth", "牙医", "牙疼", "拔牙", "智齿"], emoji: "🦷", category: "Health" },
    { keys: ["hospital", "doctor", "med", "医院", "看病", "吃药", "挂号"], emoji: "🏥", category: "Health" },
    { keys: ["period", "cramp", "pain", "姨妈", "痛经", "肚子疼"], emoji: "🩸", category: "Health" },
    { keys: ["back", "pain", "neck", "腰疼", "颈椎", "酸痛"], emoji: "🦴", category: "Health" },
    { keys: ["gym", "exercise", "run", "健身", "运动", "跑步", "累"], emoji: "🏋️", category: "Health" },

    // --- Relationships (情感) ---
    { keys: ["ex", "breakup", "divorce", "前任", "分手", "离婚", "渣男", "渣女"], emoji: "💔", category: "Social" },
    { keys: ["single", "alone", "lonely", "单身", "孤独", "寂寞", "吃狗粮"], emoji: "🐕", category: "Social" },
    { keys: ["fight", "argue", "quarrel", "吵架", "矛盾", "冷战", "撕逼", "想打人"], emoji: "💢", category: "Social" },
    { keys: ["husband", "wife", "partner", "老公", "老婆", "对象"], emoji: "👫", category: "Social" },
    { keys: ["parents", "mom", "dad", "nag", "父母", "催婚", "唠叨", "代沟"], emoji: "👪", category: "Social" },
    { keys: ["baby", "cry", "kid", "child", "孩子", "带娃", "哭闹", "辅导作业"], emoji: "🍼", category: "Social" },
    { keys: ["ghosted", "ignore", "reply", "不回", "已读", "消失", "拉黑"], emoji: "👻", category: "Social" },
    { keys: ["marriage", "wedding", "gift", "结婚", "份子钱", "相亲", "彩礼"], emoji: "💍", category: "Social" },
    { keys: ["social", "party", "introvert", "社恐", "聚会", "尴尬"], emoji: "🤐", category: "Social" },
    { keys: ["drama", "gossip", "rumor", "八卦", "谣言", "吃瓜"], emoji: "🍉", category: "Social" },

    // --- Technology (科技) ---
    { keys: ["wifi", "net", "slow", "lag", "ping", "断网", "卡顿", "网速", "404"], emoji: "📶", category: "Tech" },
    { keys: ["phone", "battery", "die", "手机", "没电", "关机", "碎屏"], emoji: "🪫", category: "Tech" },
    { keys: ["password", "forgot", "login", "密码", "忘记", "登录失败", "验证码"], emoji: "🔒", category: "Tech" },
    { keys: ["update", "windows", "loading", "更新", "重启", "加载中", "转圈"], emoji: "⏳", category: "Tech" },
    { keys: ["scam", "fraud", "fake", "诈骗", "骗子", "假货", "推销"], emoji: "🤥", category: "Tech" },
    { keys: ["ad", "advert", "spam", "广告", "弹窗", "骚扰电话"], emoji: "📺", category: "Tech" },
    { keys: ["gpt", "ai", "bot", "chatgpt", "人工智障", "机器人"], emoji: "🤖", category: "Tech" },
    { keys: ["server", "down", "500", "崩了", "服务器", "维护"], emoji: "🔥", category: "Tech" },

    // --- Education (学业) ---
    { keys: ["exam", "test", "fail", "pass", "考试", "挂科", "成绩", "考研", "公考"], emoji: "📝", category: "School" },
    { keys: ["homework", "study", "read", "作业", "论文", "复习", "截稿"], emoji: "📚", category: "School" },
    { keys: ["teacher", "prof", "class", "老师", "教授", "点名", "答辩"], emoji: "👩‍🏫", category: "School" },
    { keys: ["math", "calc", "algebra", "数学", "微积分", "高数", "听不懂"], emoji: "➗", category: "School" },
    { keys: ["tuition", "fee", "school", "学费", "学校", "开学"], emoji: "🏫", category: "School" },

    // --- Abstract/Other (抽象/情绪) ---
    { keys: ["stupid", "idiot", "dumb", "fool", "傻", "笨", "蠢", "脑残", "智障"], emoji: "🥴", category: "Other" },
    { keys: ["no", "reject", "deny", "拒绝", "不行", "不可以", "驳回"], emoji: "🙅", category: "Other" },
    { keys: ["shit", "poop", "crap", "屎", "垃圾", "烂", "恶心"], emoji: "💩", category: "Other" },
    { keys: ["clown", "joker", "embarrass", "小丑", "社死", "丢人", "现眼"], emoji: "🤡", category: "Other" },
    { keys: ["fear", "scary", "dark", "害怕", "恐怖", "焦虑", "恐慌", "烦躁"], emoji: "😱", category: "Other" },
    { keys: ["fake", "lie", "hypocrite", "虚伪", "装", "绿茶", "假"], emoji: "🎭", category: "Other" },
    { keys: ["debt", "loan", "credit", "还钱", "欠款", "信用卡", "花呗"], emoji: "💳", category: "Other" },
    { keys: ["politics", "news", "war", "政治", "新闻", "战争", "吵架"], emoji: "🌍", category: "Other" },
    { keys: ["traffic", "jam", "堵车", "红灯", "路怒"], emoji: "🚦", category: "Other" },

    // --- Positive Fallbacks (Happy Mode) ---
    { keys: ["food", "eat", "hungry", "吃", "美食", "饿", "火锅", "奶茶", "烧烤"], emoji: "🍔", category: "Happy" },
    { keys: ["drink", "beer", "wine", "酒", "喝", "干杯", "微醺"], emoji: "🍺", category: "Happy" },
    { keys: ["game", "play", "switch", "ps5", "游戏", "玩", "上分", "五杀"], emoji: "🎮", category: "Happy" },
    { keys: ["cat", "dog", "pet", "猫", "狗", "宠物", "吸猫", "修勾"], emoji: "🐱", category: "Happy" },
    { keys: ["music", "song", "sing", "音乐", "歌", "唱", "KTV", "演唱会"], emoji: "🎵", category: "Happy" },
    { keys: ["money", "rich", "win", "发财", "中奖", "暴富", "加薪"], emoji: "💰", category: "Happy" },
    { keys: ["love", "like", "crush", "喜欢", "爱", "表白", "约会"], emoji: "❤️", category: "Happy" },
    { keys: ["sleep", "bed", "nap", "睡觉", "赖床", "自然醒"], emoji: "🛌", category: "Happy" },
    { keys: ["travel", "trip", "beach", "旅行", "度假", "海边", "机票"], emoji: "✈️", category: "Happy" },
    { keys: ["party", "dance", "club", "蹦迪", "舞", "派对"], emoji: "💃", category: "Happy" },
    { keys: ["coffee", "latte", "cafe", "咖啡", "拿铁", "星巴克"], emoji: "☕", category: "Happy" },
    { keys: ["movie", "film", "cinema", "电影", "追剧", "Netflix"], emoji: "🎬", category: "Happy" }
];

// Fallback pools if no keyword matches
const FALLBACK_EMOJIS = ['👾', '💥', '💢', '💣', '🗯️', '🧱', '🎱', '🚧', '🌪️', '🔥', '🥊', '🔨', '🗿', '🦂', '🕸️'];

// --- ASSOCIATION LOGIC (联想映射) ---
// Used to breakdown complex sentences into atomic game items
const ASSOCIATION_MAP: Record<string, Array<{text: string, emoji: string}>> = {
    "呼噜": [{text: "失眠", emoji: "💤"}, {text: "烦躁", emoji: "😤"}, {text: "噪音", emoji: "🔊"}, {text: "黑眼圈", emoji: "🐼"}],
    "snore": [{text: "Insomnia", emoji: "💤"}, {text: "Annoyed", emoji: "😤"}, {text: "Noise", emoji: "🔊"}],
    
    "老公": [{text: "做家务", emoji: "🧹"}, {text: "臭袜子", emoji: "🧦"}, {text: "打游戏", emoji: "🎮"}],
    "husband": [{text: "Chores", emoji: "🧹"}, {text: "Socks", emoji: "🧦"}],
    
    "加班": [{text: "脱发", emoji: "👨‍🦲"}, {text: "颈椎病", emoji: "🦴"}, {text: "外卖", emoji: "🥡"}],
    "overtime": [{text: "Hair Loss", emoji: "👨‍🦲"}, {text: "Back Pain", emoji: "🦴"}],
    
    "带娃": [{text: "辅导作业", emoji: "📝"}, {text: "哭闹", emoji: "😭"}, {text: "碎钞机", emoji: "💸"}],
    "kids": [{text: "Homework", emoji: "📝"}, {text: "Crying", emoji: "😭"}, {text: "Money", emoji: "💸"}],
};

// --- LOCAL LOGIC FUNCTIONS ---

/**
 * Returns the full list of known stressors for the gallery.
 */
export const getAllKnownStressors = () => STRESSOR_MAP;

/**
 * Locally determines the best emoji for a given text string based on keyword matching.
 */
export const suggestEmojiForText = async (text: string): Promise<string> => {
    const lowerText = text.toLowerCase().trim();

    // 1. Exact or Partial Keyword Match
    for (const entry of STRESSOR_MAP) {
        for (const key of entry.keys) {
            if (lowerText.includes(key) || (key.length > 1 && key.includes(lowerText))) {
                return entry.emoji;
            }
        }
    }

    // 2. Sentiment/Vibe Check (Very basic heuristic)
    if (lowerText.includes("?") || lowerText.includes("？") || lowerText.includes("what") || lowerText.includes("什么")) return "❓";
    if (lowerText.includes("!") || lowerText.includes("！") || lowerText.includes("fuc") || lowerText.includes("cao")) return "🤬";

    // 3. Random Fallback
    const index = text.length % FALLBACK_EMOJIS.length;
    return FALLBACK_EMOJIS[index];
};

export const getGameFeedback = async (score: number, maxCombo: number): Promise<CoachFeedback> => {
  return { message: "", badge: "" };
};

/**
 * Advanced breakdown: Takes a user sentence and breaks it down into multiple game items (bubbles).
 * e.g., "Husband snores" -> [Husband, Snore, Insomnia, Noise]
 */
export const expandPromptToItems = async (userPrompt: string): Promise<CustomUserItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Fake AI delay

    const results: CustomUserItem[] = [];
    const seenText = new Set<string>();
    const lowerPrompt = userPrompt.toLowerCase();

    // 1. Add the exact terms found in the prompt if they match our dictionary
    for (const entry of STRESSOR_MAP) {
        for (const key of entry.keys) {
            if (lowerPrompt.includes(key)) {
                // Use the matched key (or a cleaner version of it) as the text
                const displayText = key.length > 4 ? key.substring(0, 6) : key;
                if (!seenText.has(displayText)) {
                    results.push({
                        id: `auto-${Date.now()}-${displayText}`,
                        text: displayText,
                        emoji: entry.emoji
                    });
                    seenText.add(displayText);

                    // 2. Check for Associations (Deep Breakdown)
                    // Check if this key triggers an association map
                    for (const assocKey in ASSOCIATION_MAP) {
                        if (key.includes(assocKey) || assocKey.includes(key)) {
                            const related = ASSOCIATION_MAP[assocKey];
                            related.forEach(r => {
                                if (!seenText.has(r.text)) {
                                    results.push({
                                        id: `assoc-${Date.now()}-${r.text}`,
                                        text: r.text,
                                        emoji: r.emoji,
                                        color: '#F59E0B' // Orange for associated items
                                    });
                                    seenText.add(r.text);
                                }
                            });
                        }
                    }
                }
            }
        }
    }

    // 3. If no specific keywords matched, fallback to basic generation
    if (results.length === 0) {
        const emoji = await suggestEmojiForText(userPrompt);
        results.push({
            id: `fallback-${Date.now()}`,
            text: userPrompt.substring(0, 8),
            emoji: emoji
        });
        
        // Add generic fillers based on "mood"
        const fillers = ["烦躁", "压力", "Stress", "Noise"];
        for(const f of fillers) {
             const e = await suggestEmojiForText(f);
             results.push({
                 id: `filler-${f}`,
                 text: f,
                 emoji: e
             });
        }
    }

    return results.slice(0, 8); // Cap at 8 items
};

/**
 * Generates a level configuration locally based on the user's text prompt.
 */
export const generateLevelFromPrompt = async (userPrompt: string, language: Language): Promise<LevelConfig> => {
    // 1. Analyze Sentiment
    const happyKeywords = ["happy", "joy", "love", "fun", "good", "快乐", "开心", "爱", "棒", "爽", "fish", "摸鱼", "holiday", "vacation", "money", "rich"];
    const isHappy = happyKeywords.some(k => userPrompt.toLowerCase().includes(k));

    // 2. Pick Base Template
    const visualTheme = isHappy ? 'UNDERWATER' : 'DESTRUCTION';
    const interactionType = isHappy ? 'COLLECT' : 'SLICE';
    
    // Note: Items are now handled by expandPromptToItems mostly, this config is just for the environment
    
    return {
        label: language === 'zh' ? "AI 定制关卡" : "AI Custom Level",
        description: language === 'zh' ? `针对 "${userPrompt}" 生成的宣泄方案` : `Targeting "${userPrompt}"`,
        buttonText: isHappy ? (language === 'zh' ? "开始享受" : "Enjoy") : (language === 'zh' ? "粉碎它！" : "Smash It!"),
        themeColor: isHappy ? "from-teal-400 to-cyan-500" : "from-red-500 to-orange-600",
        gradient: isHappy 
            ? "bg-gradient-to-br from-teal-800 via-cyan-700 to-blue-900" 
            : "bg-gradient-to-br from-red-900 via-red-800 to-orange-900",
        bgStyle: isHappy ? "brightness(1.1) saturate(1.1)" : "contrast(1.2) saturate(1.2)",
        interactionType: interactionType,
        visualTheme: visualTheme,
        musicBpm: isHappy ? 120 : 160,
        musicTheme: isHappy ? 'ARCADE' : 'HEAVY_METAL',
        items: [], // This will be filled by the CustomUserItems
        impactWords: isHappy 
            ? (language === 'zh' ? ["爽!", "开心", "好耶"] : ["Yay!", "Nice", "Cool"])
            : (language === 'zh' ? ["滚!", "走开!", "拜拜"] : ["NO!", "BYE", "GONE"])
    };
};

/**
 * Mock Image Analysis.
 */
export const generateLevelFromImage = async (base64Image: string, language: Language): Promise<LevelConfig> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Longer delay for image "processing"
    
    const isZh = language === 'zh';

    return {
        label: isZh ? "视觉解析关卡" : "Vision Analysis Level",
        description: isZh ? "已提取图像中的压力特征..." : "Extracted stress features from image...",
        buttonText: isZh ? "清理缓存" : "Clean Up",
        themeColor: "from-purple-500 to-pink-600",
        gradient: "bg-gradient-to-r from-purple-900 via-fuchsia-900 to-black",
        bgStyle: "contrast(1.3) hue-rotate(15deg)",
        interactionType: 'SLICE',
        visualTheme: 'DESTRUCTION',
        musicBpm: 150,
        musicTheme: 'LO_FI',
        items: [
            { name: isZh ? '像素' : 'Pixel', emoji: '👾', color: '#d946ef', points: 20, isBomb: false },
            { name: isZh ? '故障' : 'Glitch', emoji: '📺', color: '#8b5cf6', points: 30, isBomb: false },
            { name: isZh ? '噪点' : 'Noise', emoji: '📻', color: '#6366f1', points: 25, isBomb: false },
            { name: isZh ? '错误' : 'Error', emoji: '⚠️', color: '#f43f5e', points: 40, isBomb: false },
            { name: isZh ? '虚无' : 'Void', emoji: '🕳️', color: '#000000', points: -100, isBomb: true }
        ],
        impactWords: ["Glitch", "Delete", "Null", "NaN"]
    };
};