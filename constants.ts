
import { LevelConfig, MoodType, Language, Testimonial, BlogPost } from './types';

// High Def resolution (4:3 aspect ratio for webcam match)
export const CANVAS_WIDTH = 1024;
export const CANVAS_HEIGHT = 768;

export const GRAVITY = 0.35; // Slightly lower gravity for better float
export const MAX_ITEMS = 8; 
export const MOTION_THRESHOLD = 25; 
export const MOTION_TRIGGER_COUNT = 12; 

// --- BLOG DATA (SEO TEMPLATE) ---
// Edit this JSON content to update the blog section
export const BLOG_POSTS: Record<Language, BlogPost[]> = {
    zh: [
        {
            id: '7',
            slug: 'breathing-techniques',
            title: '30秒呼吸法：考场与职场的焦虑急救',
            excerpt: '当被导师提问或老板点名时，大脑一片空白？通过简单的呼吸调整，你可以欺骗大脑进入放松状态。',
            content: `
                <p>当你感到焦虑时，你的呼吸会变浅且急促。这是一个生理信号，告诉大脑"我们在战斗"。反过来，如果我们主动控制呼吸，也能告诉大脑"现在很安全"。</p>
                <br/>
                <h3>1. 箱式呼吸法 (Box Breathing)</h3>
                <p>这是海豹突击队用于在高压任务前保持冷静的方法：</p>
                <ul>
                    <li>吸气 4 秒</li>
                    <li>屏气 4 秒</li>
                    <li>呼气 4 秒</li>
                    <li>屏气 4 秒</li>
                </ul>
                <p>重复4个循环，你会感到心率明显下降，非常适合面试前或考试前使用。</p>
                <br/>
                <h3>2. 4-7-8 呼吸法</h3>
                <p>这种方法由安德鲁·威尔博士开发，被称为"神经系统的天然镇静剂"。</p>
            `,
            date: '2025-03-12',
            author: 'Zen Master',
            readTime: '2 min',
            category: '冥想',
            image: '🌬️',
            tags: ['呼吸', '考试焦虑', '面试技巧']
        },
        {
            id: '1',
            slug: 'why-slicing-helps-anger',
            title: '为什么"切水果"能缓解论文焦虑与职场倦怠？',
            excerpt: '当你挥动手臂切碎屏幕上的"Deadline"时，大脑发生了什么？本文深入探讨"替代性攻击"疗法与数字多巴胺的释放机制。',
            content: `
                <p>在现代高压环境下，无论是面对<strong>毕业论文 (Thesis)</strong> 还是 <strong>季度KPI</strong>，皮质醇（Cortisol）水平的长期升高是导致倦怠（Burnout）的主要原因。</p>
                <br/>
                <h3>具象化发泄的科学原理</h3>
                <p>心理学上的<strong>"替代性攻击"（Displacement Aggression）</strong>理论指出，将攻击冲动转移到非生命体对象上，可以有效释放积压的负面能量。MoodSlider 利用这一原理，通过视觉反馈（破碎效果）和听觉反馈（爆炸音效），为用户提供即时的心理补偿。</p>
                <br/>
                <h3>体感交互的优势</h3>
                <p>久坐是学生和白领的通病。<strong>大幅度的肢体运动</strong>能促进内啡肽（Endorphins）的分泌。挥动手臂不仅是游戏操作，更是一次微型的有氧运动，帮助身体从"僵直"状态恢复活力。</p>
            `,
            date: '2025-03-10',
            author: 'Dr. Mood',
            readTime: '3 min',
            category: '心理健康',
            image: '🧠',
            tags: ['焦虑管理', '考研', '职场心理']
        },
        {
            id: '2',
            slug: 'digital-detox-2025',
            title: '2025年"发疯"新趋势：用AI对抗精神内耗',
            excerpt: '从图书馆到格子间，年轻人的解压方式正在经历一场数字化革命。无需下载、即开即玩成为主流。',
            content: `
                <p>随着WebGPU和Edge AI技术的发展，浏览器端的体验已不再局限于简单的网页浏览。<strong>MoodSlider</strong> 代表了新一代的"微型解压应用"：</p>
                <ul>
                    <li>🔒 <strong>隐私优先</strong>：本地AI处理，在宿舍或办公室玩也不用担心泄露隐私。</li>
                    <li>⚡ <strong>即开即用</strong>：没有繁琐的注册登录流程，打开就能发泄。</li>
                    <li>🎯 <strong>高度定制</strong>：利用NLP技术，让你的"敌人"不仅仅是水果，而是"高数"、"雅思"或"甲方"。</li>
                </ul>
                <p>这种"短平快"的情绪急救包，正在成为高强度脑力劳动者的标配。</p>
            `,
            date: '2025-03-08',
            author: 'TechCrunchy',
            readTime: '4 min',
            category: '行业趋势',
            image: '🌊',
            tags: ['Web3', 'AI应用', '精神状态']
        },
        {
            id: '3',
            slug: 'office-rage-room',
            title: '宿舍与工位里的"隐形发泄室"',
            excerpt: '想摔键盘？想大吼大叫？在图书馆或开放式办公室里这些都不现实。试试这款"静音"的愤怒管理工具。',
            content: `
                <p>愤怒是一种高能量情绪，如果被压抑（Suppression），会对心血管系统造成负担。但在公共环境中，我们往往不得不保持"体面"。</p>
                <br/>
                <p>MoodSlider 的<strong>"老板键"（Stealth Mode）</strong>和<strong>"静音模式"</strong>专为这种场景设计。你可以在复习间隙或会议空档的5分钟里，通过鼠标或触控板，在屏幕上疯狂切碎那些让你抓狂的关键词。</p>
                <p>这不仅是游戏，更是一种<strong>情绪的快速重启（Emotional Reboot）</strong>。</p>
            `,
            date: '2025-03-05',
            author: 'Zen Space',
            readTime: '2 min',
            category: '生存指南',
            image: '🤫',
            tags: ['情绪管理', '宿舍生活', 'Boss Key']
        },
        {
            id: '4',
            slug: 'remote-work-loneliness',
            title: '孤独的奋斗者：如何建立数字化连接',
            excerpt: '独自在异乡求学或工作，孤独感如影随形。如何通过简单的互动游戏找回归属感？',
            content: `<p>物理距离让心理隔阂加深。我们失去了茶水间的闲聊，失去了寝室夜聊的机会。</p><p>MoodSlider 提供的实时解压榜单，让你看到此时此刻，北京的产品经理和伦敦的留学生都在为了同一个目标（解压）而挥舞手臂。这种"天涯共此时"的微妙连接，是缓解数字孤独的良药。</p>`,
            date: '2025-03-01',
            author: 'Remote Life',
            readTime: '5 min',
            category: '情感连接',
            image: '🏠',
            tags: ['留学生', '孤独感', '独居']
        },
        {
            id: '5',
            slug: 'sleep-and-stress',
            title: '睡前切一切：运动助眠的科学',
            excerpt: '考前失眠？项目上线前睡不着？通过体感运动消耗多余的精力，是助眠的最佳方式。',
            content: `<p>很多时候我们"累"，是"心累"而不是"身累"。这种状态下，大脑极度活跃，身体却处于静止，导致入睡困难。</p><p>睡前进行10分钟的轻度体感游戏（如 MoodSlider 的快乐模式），可以：1. 消耗未完全释放的血糖；2. 转移大脑的焦虑焦点；3. 产生适量的内啡肽，带来平静感。</p>`,
            date: '2025-02-28',
            author: 'Sleep Well',
            readTime: '3 min',
            category: '健康生活',
            image: '💤',
            tags: ['睡眠', '健康', '运动']
        },
        {
            id: '6',
            slug: 'color-psychology',
            title: '颜色的力量：为什么我们的敌人是红色的？',
            excerpt: '游戏色彩设计背后的心理学原理。红色激发斗志，蓝色带来冷静，绿色象征治愈。',
            content: `<p>在 MoodSlider 中，愤怒模式的主色调是深红与橙色。这并非巧合。色彩心理学研究表明，长波长的颜色（红、橙）能唤起人的警觉和行动欲。</p><p>相反，当你进入"摸鱼模式"（快乐模式），满屏的青色和蓝色（Under water）能迅速降低心率，起到镇静作用。每一次视觉主题的切换，都是一次心理状态的引导。</p>`,
            date: '2025-02-25',
            author: 'Design Lab',
            readTime: '4 min',
            category: '设计美学',
            image: '🎨',
            tags: ['设计', '心理学', '色彩']
        },
        {
            id: '8',
            slug: 'mood-slider-how-to',
            title: 'MoodSlider 入门：如何用“先滑后切”在 30 秒内解压',
            excerpt: '把情绪写进滑块，再把坏情绪“水果”切碎，完整流程示范。',
            content: `<p>MoodSlider 的核心动作是“先滑后切”：先用情绪滑块标记你的真实状态，然后 AI 会生成对应的坏情绪目标，接着用摄像头或鼠标切掉它们。</p>
                      <p>最佳实践：</p>
                      <ul>
                        <li>滑块要真实：心情越“炸”，生成的目标越多，宣泄越爽。</li>
                        <li>用 Stealth 模式：在办公室/图书馆也能安静切水果。</li>
                        <li>设 30 秒计时：短平快的情绪重启，避免越玩越累。</li>
                      </ul>
                      <p>Tip: 记得开“先滑后切”心态，而不是直接砍，能让大脑更快完成“我在掌控情绪”的认知闭环。</p>`,
            date: '2025-04-02',
            author: 'Flow Coach',
            readTime: '3 min',
            category: '玩法',
            image: '🕹️',
            tags: ['MoodSlider', '滑块', '解压', '教程']
        },
        {
            id: '9',
            slug: 'mood-slider-office',
            title: '在工位/自习室玩 MoodSlider，不被发现的 5 个技巧',
            excerpt: '“先滑后切”也能很安静，适合会议间隙/宿舍深夜。',
            content: `<p>很多玩家担心在办公室或自习室被发现。这里有 5 个安静玩法：</p>
                     <ol>
                        <li>切换鼠标模式：不用挥手，静音切。</li>
                        <li>降低音量或关声效：保留震动/视觉反馈即可。</li>
                        <li>Stealth Screen：一键变 Excel 界面，老板键安心。</li>
                        <li>30 秒一局：高频短局，心率不会拉太高。</li>
                        <li>自定义敌人：把“周报”“deadline”写进滑块，情绪释放更精准。</li>
                     </ol>
                     <p>记得在情绪滑块里诚实标记心情，才能让切割动作形成“掌控”信号，真正降低焦虑。</p>`,
            date: '2025-04-01',
            author: 'Office Ninja',
            readTime: '4 min',
            category: '场景',
            image: '🧊',
            tags: ['办公室', '宿舍', 'Stealth', '滑块']
        }
    ],
    en: [
        {
            id: '7',
            slug: 'breathing-techniques',
            title: '30-Second Breathing: For Exams & Interviews',
            excerpt: 'Blanking out during a test or meeting? Trick your brain into relaxing with simple breathing adjustments.',
            content: `
                <p>When you are anxious, your breathing becomes shallow and rapid. This is a physiological signal telling the brain "we are fighting". Conversely, if we actively control our breathing, we can tell the brain "we are safe".</p>
                <br/>
                <h3>1. Box Breathing</h3>
                <p>Used by Navy SEALs to stay calm before high-pressure missions:</p>
                <ul>
                    <li>Inhale for 4 seconds</li>
                    <li>Hold for 4 seconds</li>
                    <li>Exhale for 4 seconds</li>
                    <li>Hold for 4 seconds</li>
                </ul>
                <p>Repeat for 4 cycles. Perfect for before an exam or a big presentation.</p>
            `,
            date: 'March 12, 2025',
            author: 'Zen Master',
            readTime: '2 min',
            category: 'Meditation',
            image: '🌬️',
            tags: ['Breathing', 'Exams', 'Interviews']
        },
        {
            id: '1',
            slug: 'science-of-slicing',
            title: 'Why "Slicing" Helps with Study & Work Burnout',
            excerpt: 'What happens to your brain when you virtually slash a "Thesis"? Exploring Displacement Aggression and digital dopamine.',
            content: `
                <p>In high-pressure environments, whether it's <strong>Finals Week</strong> or <strong>Quarterly Reviews</strong>, chronic elevation of cortisol leads to burnout.</p>
                <br/>
                <h3>The Science of Displacement</h3>
                <p><strong>Displacement Aggression</strong> allows us to redirect negative energy towards safe, inanimate objects. MoodSlider leverages this by providing instant visual and auditory feedback—shattering your problems virtually so you don't have to physically.</p>
                <br/>
                <h3>Motion Matters</h3>
                <p>Sedentary lifestyles are common for students and pros. <strong>Gross motor movements</strong> (like waving arms) stimulate endorphin production. It's a micro-workout that breaks your body out of its stress-induced rigidity.</p>
            `,
            date: 'March 10, 2025',
            author: 'Dr. Mood',
            readTime: '3 min',
            category: 'Mental Health',
            image: '🧠',
            tags: ['Anxiety', 'Student Life', 'Digital Therapy']
        },
        {
            id: '2',
            slug: 'micro-breaks-guide',
            title: 'The Art of the Micro-Break: Venting in 60 Seconds',
            excerpt: 'You don\'t need a vacation to reset. How 60 seconds of intense virtual activity can reboot your focus.',
            content: `
                <p>The Pomodoro technique is famous for a reason. But what do you do in that 5-minute break? Doomscrolling often increases anxiety.</p>
                <p><strong>Active Recovery</strong> is the key. MoodSlider provides a burst of high-intensity interaction that:</p>
                <ul>
                    <li>🚀 <strong>Resets Attention</strong>: Shifts focus completely away from books and spreadsheets.</li>
                    <li>🩸 <strong>Increases Blood Flow</strong>: Gets you moving in your chair.</li>
                    <li>😊 <strong>Provides Closure</strong>: Seeing tasks "destroyed" offers a micro-sense of completion.</li>
                </ul>
            `,
            date: 'March 8, 2025',
            author: 'Productivity Ninja',
            readTime: '4 min',
            category: 'Productivity',
            image: '⚡',
            tags: ['Focus', 'Hacks', 'Energy']
        },
        {
            id: '3',
            slug: 'future-of-gaming',
            title: 'Browser Gaming in 2025: AI & Motion Control',
            excerpt: 'No downloads, no consoles. How WebGL and Edge AI are turning your laptop webcam into a next-gen controller.',
            content: `
                <p>The barrier between player and game is dissolving. With <strong>TensorFlow.js</strong>, MoodSlider performs complex computer vision tasks directly in your Chrome tab.</p>
                <br/>
                <p>This means:</p>
                <p>1. <strong>Zero Latency</strong>: No server roundtrips for movement data.</p>
                <p>2. <strong>Total Privacy</strong>: Your video feed never leaves your RAM. Perfect for dorms or offices.</p>
                <p>3. <strong>Accessibility</strong>: High-end motion gaming is now free and accessible to anyone with a laptop.</p>
            `,
            date: 'March 5, 2025',
            author: 'Tech Insider',
            readTime: '2 min',
            category: 'Technology',
            image: '💻',
            tags: ['WebGL', 'AI', 'Future']
        },
        {
            id: '4',
            slug: 'remote-work-isolation',
            title: 'Combating Isolation: From Dorms to Home Offices',
            excerpt: 'Working or studying alone is freeing but lonely. How digital connections can bridge the gap.',
            content: `<p>Remote work and solitary studying turn physical distance into emotional barriers. We lose the watercooler chats and the face-to-face smiles.</p><p>Studies find that <strong>shared gaming experiences</strong> can rapidly bridge psychological distance. MoodSlider's live leaderboard lets you see that right now, a Student in Boston and a Trader in NYC are both waving their arms for the same goal: stress relief.</p>`,
            date: 'March 1, 2025',
            author: 'Remote Life',
            readTime: '5 min',
            category: 'Connection',
            image: '🏠',
            tags: ['Remote', 'Loneliness', 'Team Building']
        },
        {
            id: '5',
            slug: 'sleep-hygiene',
            title: 'Slice Before Sleep: Motion for Rest',
            excerpt: 'Insomnia often comes from a racing mind. Burning off excess energy is the best sleep aid.',
            content: `<p>Often we are "mentally tired" but "physically awake". In this state, the brain races while the body is stagnant.</p><p>10 minutes of light motion gaming (like MoodSlider's Chill Mode) before bed can: 1. Burn off unreleased glucose; 2. Shift focus away from anxiety; 3. Release calming endorphins.</p>`,
            date: 'Feb 28, 2025',
            author: 'Sleep Well',
            readTime: '3 min',
            category: 'Wellness',
            image: '💤',
            tags: ['Sleep', 'Health', 'Exercise']
        },
        {
            id: '6',
            slug: 'color-therapy',
            title: 'The Power of Color: Why Are Enemies Red?',
            excerpt: 'The psychology behind game color design. Red triggers action, Blue brings calm.',
            content: `<p>In MoodSlider, Rage Mode is dominated by deep reds and oranges. This isn't random. Color psychology shows long-wavelength colors (Red) trigger alertness and action.</p><p>Conversely, "Chill Mode" uses cyans and blues to lower heart rate. Every visual theme switch is a guided shift in your psychological state.</p>`,
            date: 'Feb 25, 2025',
            author: 'Design Lab',
            readTime: '4 min',
            category: 'Design',
            image: '🎨',
            tags: ['Design', 'Psychology', 'Color']
        },
        {
            id: '8',
            slug: 'mood-slider-how-to',
            title: 'MoodSlider Basics: Slide First, Slice Fast',
            excerpt: 'A 2-step playbook to reset stress in 30 seconds using the mood slider.',
            content: `<p>MoodSlider’s core loop is “slide then slice”: you slide the mood slider to label how you feel, the AI spawns bad-mood fruits that match your rating, then you slice them away.</p>
                      <p>Best practices:</p>
                      <ul>
                        <li>Be honest on the slider—higher stress spawns more targets and better venting.</li>
                        <li>Use Stealth mode for office/library: silent mouse slicing, no waving needed.</li>
                        <li>Keep it to 30s sprints: micro-breaks that reboot dopamine without fatigue.</li>
                      </ul>
                      <p>Tip: “Slide then slice” tells your brain you’re in control, which reduces anxiety faster than pure button-mashing.</p>`,
            date: 'Apr 2, 2025',
            author: 'Flow Coach',
            readTime: '3 min',
            category: 'How-To',
            image: '🕹️',
            tags: ['MoodSlider', 'How-To', 'Stress Relief']
        },
        {
            id: '9',
            slug: 'mood-slider-office',
            title: 'Playing MoodSlider at Work or School—Without Getting Noticed',
            excerpt: 'Stealth tips: silent slicing, 30s rounds, and honest slider input.',
            content: `<p>Worried about playing in an open office or study hall? Try these stealth moves:</p>
                     <ol>
                        <li>Switch to mouse mode—no arm waving, just precise slicing.</li>
                        <li>Mute SFX, keep haptics/visuals.</li>
                        <li>Use Stealth Screen: boss key to an “Excel-like” cover.</li>
                        <li>Play 30-second rounds: quick venting, no sweat.</li>
                        <li>Custom enemies: add “deadlines” or “midterms” so slicing matches real stressors.</li>
                     </ol>
                     <p>Always start with the mood slider—label the feeling, then slice. That control signal is what calms your nervous system.</p>`,
            date: 'Apr 1, 2025',
            author: 'Office Ninja',
            readTime: '4 min',
            category: 'Use Cases',
            image: '🧊',
            tags: ['Office', 'Study', 'Stealth', 'Mood Slider']
        }
    ]
};

export const TRANSLATIONS = {
    zh: {
        title: "MoodSlider 情绪滑块",
        subtitle: "今天心情怎么样？",
        selectMode: "选择一个模式来释放你的情绪",
        playNow: "开始",
        tryAi: "试试 AI",
        configTitle: "情绪映射",
        mouse: "鼠标模式",
        camera: "体感模式",
        startGame: "开始 MoodSlider · 先滑后切",
        addItemsFirst: "请先选择或输入要宣泄的情绪...",
        activeItems: "本次宣泄目标", 
        clear: "清空",
        suggestions: "情绪图鉴库 (点击添加)", 
        add: "添加",
        inputPlaceholder: "输入烦恼 (如: 论文, 甲方)...",
        aiGenTitle: "AI 智能生成",
        textMode: "文字描述",
        imageMode: "图片识别",
        aiPlaceholder: "描述一下让你心烦意乱的事...",
        uploadImage: "上传图片",
        generate: "生成关卡",
        sessionReport: "本局滑完再切 · 报告",
        score: "宣泄值",
        maxCombo: "最大连击",
        rage: "怒气值",
        energy: "热量",
        mood: "心情指数",
        menu: "主菜单",
        playAgain: "再玩一次",
        initializing: "初始化体感引擎...",
        cameraErrorTitle: "无法访问摄像头",
        cameraErrorDesc: "请允许浏览器访问摄像头以开始游戏",
        deviceError: "未检测到摄像头设备",
        genericError: "摄像头启动失败，请刷新重试",
        refresh: "刷新页面",
        share: "分享 MoodSlider 成绩",
        shareText: "我在 MoodSlider 先滑后切，释放了 {score} 点坏情绪！30 秒重启，快来试试 moodslider.top！",
        copied: "已复制!",
        support: "支持作者",
        nav: {
            startGame: "开始 MoodSlider",
            blog: "解压博客"
        },
        ads: {
            label: "广告",
            sponsored: "赞助内容",
            sidebar: "赞助商"
        },
        ui: {
             cameraReq: "需要访问摄像头",
             mouseReq: "鼠标 / 触控操作",
             loadingAnalysis: "正在解析像素...",
             stealthHint: "双击屏幕恢复游戏",
             thinking: "思考中..."
        },
        stealth: {
            filename: "学习资料_复习提纲_2024_Final.xlsx - 已保存",
            menu: ["文件", "开始", "插入", "绘图", "页面布局", "公式", "数据", "审阅", "视图", "帮助"],
            ready: "就绪",
            confidential: "绝密",
            status: {
                approved: "已复习",
                pending: "待办"
            },
            colProject: "科目",
            colAnalysis: "重点笔记"
        },
        modes: {
            ANGRY: { label: "暴躁模式", desc: "世界太吵了，给我安静点！" },
            SAD: { label: "EMO模式", desc: "累了...感觉不会再爱了..." },
            HAPPY: { label: "摸鱼模式", desc: "学分和加薪，我全都要~" },
            AI: { label: "自定义生成", desc: "本地智能匹配，定制专属关卡" }
        },
        gameModesSection: {
            title: "核心玩法模式深度解析",
            subtitle: "选择最适合你的宣泄方式",
            modes: [
                { 
                    title: "暴躁模式 (Rage Mode)", 
                    subtitle: "瞬间释放高强度怒火",
                    desc: "针对考研复习瓶颈、论文被毙、甲方刁难等高压场景。通过大幅度的肢体挥砍动作，粉碎满屏红色的愤怒气泡。让积压的怒气随着每一次'切碎'而消散。", 
                    features: ["高频快节奏交互", "红色警示色彩心理学", "重低音打击反馈"],
                    seoTag: "愤怒管理首选",
                    icon: "🔥", 
                    color: "border-red-500/20 hover:border-red-500/50"
                },
                { 
                    title: "EMO模式 (Gloom Mode)", 
                    subtitle: "治愈深夜的网抑云时刻",
                    desc: "无论是挂科、失恋还是求职受挫，这里允许你脆弱。伴随着淅沥的雨声和Lo-Fi音乐，轻轻划破蓝色的忧郁因子，接纳并释放情绪。", 
                    features: ["舒缓治愈系音效", "冷色调视觉降噪", "慢节奏呼吸引导"],
                    seoTag: "缓解抑郁焦虑",
                    icon: "🌧️", 
                    color: "border-blue-400/20 hover:border-blue-400/50"
                },
                { 
                    title: "摸鱼模式 (Chill Mode)", 
                    subtitle: "课间与工位的快乐充电站",
                    desc: "置身于海底世界，收集代表'学分'、'加薪'、'奶茶'的快乐能量，躲避'点名'和'会议'。简单轻松的玩法，适合学习工作间隙的微休息。", 
                    features: ["水下沉浸式体验", "正向激励机制", "趣味校园/职场梗"],
                    seoTag: "摸鱼/课间神器",
                    icon: "🐠", 
                    color: "border-teal-400/20 hover:border-teal-400/50"
                },
                { 
                    title: "AI 定制 (Custom Gen)", 
                    subtitle: "你的情绪，私人订制",
                    desc: "基于本地大语言模型技术，只需输入关键词（如'高数'、'雅思'、'前任'），系统将自动生成专属的图标与关卡配置。", 
                    features: ["语义情绪映射", "个性化关卡生成", "100%隐私保护"],
                    seoTag: "AI心理疗愈",
                    icon: "🧠", 
                    color: "border-purple-500/20 hover:border-purple-500/50"
                }
            ]
        },
        liveStats: {
            title: "全球实时解压榜",
            online: "当前在线宣泄中",
            totalVented: "今日累计消除烦恼",
            regions: "活跃重灾区",
            recent: "实时动态",
            activities: [
                "来自 北京 的大学生刚刚切碎了 50 个 '高数题'",
                "来自 深圳 的程序员开启了 '暴躁模式'",
                "来自 上海 的HR释放了 1200 点招聘压力",
                "来自 杭州 的考研党切碎了 10 个 '英语单词'",
                "来自 广州 的设计师达成了 50 连击",
                "来自 成都 的用户正在发泄 '论文焦虑'",
                "来自 纽约 的留学生刚砸碎了 'Deadline'",
                "来自 硅谷 的工程师正在修复心情"
            ]
        },
        gallery: {
            title: "情绪图鉴库",
            subtitle: "认识一下这些即将被你切碎的'讨厌鬼'",
            intro: "我们在本地构建了包含100+种情绪映射的图鉴库，涵盖校园生活、职场压力、情感问题等。",
            refresh: "刷新图鉴数据",
            terminal: {
                filename: "情绪映射实验室_v2.0.exe",
                ready: "等待输入..."
            },
            keywordsTitle: "热门解压关键词覆盖",
            keywords: [
                "考研焦虑粉碎机", "办公室摸鱼神器", "期末周解压", "心理健康数字疗法",
                "情绪宣泄小游戏", "免费解压网页版", "暴躁打工人必备", "防止精神内耗", 
                "体感切水果网页版", "雅思托福压力"
            ],
            translator: {
                title: "情绪映射实验室",
                subtitle: "输入任意烦恼，测试本地语义匹配引擎",
                placeholder: "例如：论文、Bug、前任...",
                button: "生成图标",
                loading: "检索中...",
                result: "映射结果"
            }
        },
        blog: {
            title: "解压研究室",
            subtitle: "情绪管理科学",
            readMore: "阅读全文",
            back: "返回列表",
            share: "分享文章",
            viewAll: "查看更多文章",
            allArticles: "所有文章",
            searchPlaceholder: "搜索文章...",
        },
        testimonials: {
            title: "玩家证言",
            subtitle: "看看大家怎么说",
            leaveReview: "留下你的评价",
            placeholderName: "你的昵称 (可选)",
            placeholderText: "玩完感觉如何？说两句吧...",
            submit: "提交评价",
            submitted: "感谢分享！",
            list: [
                { 
                    id: '1', 
                    name: "Alex Liu", 
                    role: "全栈工程师", 
                    avatar: "👨‍💻", 
                    text: "作为一个每天面对报错的程序员，切碎 BUG 的感觉太爽了！这就是我要的'物理除虫'。", 
                    rating: 5, 
                    isVerified: true,
                    ip: "114.23.**.**",
                    location: "Shenzhen, CN"
                },
                { 
                    id: '2', 
                    name: "Lisa Wang", 
                    role: "大三学生", 
                    avatar: "🎓", 
                    text: "期末周复习不进去的时候就来切几把，把'高数'和'大物'切碎真的太解压了！", 
                    rating: 5, 
                    isVerified: true,
                    ip: "58.31.**.**",
                    location: "Shanghai, CN"
                },
                { 
                    id: '3', 
                    name: "David Zhang", 
                    role: "考研党", 
                    avatar: "📚", 
                    text: "背书背不下去的时候动一动，出一身汗，脑子清醒多了。比刷短视频解压更健康。", 
                    rating: 4, 
                    isVerified: true,
                    ip: "202.112.**.**",
                    location: "Beijing, CN"
                },
                { 
                    id: '4', 
                    name: "Kevin Chen", 
                    role: "创业者", 
                    avatar: "🚀", 
                    text: "简单直接，没有废话。不仅是游戏，更是我的情绪急救包。体感识别真的很准！", 
                    rating: 5, 
                    isVerified: true,
                    ip: "121.40.**.**",
                    location: "Hangzhou, CN"
                }
            ] as Testimonial[]
        },
        landing: {
             seoTitle: "MoodSlider 情绪滑块：先滑后切，1 分钟解压",
             seoSubtitle: "免下载，浏览器即开即玩，摄像头/鼠标都能用",
             seoContent: "MoodSlider 是一款**免费 AI 情绪滑块游戏**：先滑动情绪滑块，标记你当前的心情，再把生成的坏情绪“水果”切碎，30 秒完成多巴胺重启。支持**摄像头体感**和**鼠标静音模式**，**零下载、隐私本地处理**，适合上课或上班间隙的快节奏解压。\n\nStep 1: 滑动情绪滑块，标记真实状态\nStep 2: 切掉 AI 生成的坏情绪水果\n\n• No signup needed\n• 100% free forever\n• Works on phone & desktop",
             keywords: ["AI解压游戏", "情绪滑块", "MoodSlider", "考研焦虑", "体感切水果", "免费发泄", "在线减压", "愤怒管理", "浏览器游戏", "摄像头体感"],
             featuresTitle: "核心功能亮点",
             subtitle_features: "核心能力",
             features: [
                 { title: "智能语义生成", desc: "内置本地 NLP 词库，根据你输入的具体烦恼（如'雅思'、'甲方'、'催婚'）实时匹配专属发泄目标，保护隐私，无需联网。" },
                 { title: "零门槛体感交互", desc: "抛弃键盘鼠标，站起来！在宿舍或办公室，使用电脑或手机摄像头，通过真实的肢体运动操控游戏，燃脂又解压。" },
                 { title: "隐私安全保护", desc: "我们深知隐私的重要性。所有视频流数据均在本地浏览器端处理（Edge Computing），绝不上传云端。" },
                 { title: "多巴胺视觉反馈", desc: "精心设计的粒子爆炸特效与震动反馈，配合动态音效，提供极致爽快的打击感。" }
             ],
             howToPlay: "新手指南",
             subtitle_howToPlay: "快速上手",
             steps: ["选择你的当前心情（愤怒、悲伤或快乐），或者输入文字自定义你的敌人（如'高数'）。", "授权浏览器访问摄像头权限（请放心，我们不偷看）。", "站在屏幕前，挥动双臂，切碎红色的烦恼气泡，避开黑色的炸弹。", "收集蓝色的快乐因子，创造连击(Combo)，挑战高分！"],
             faqTitle: "常见问题 (FAQ)",
             subtitle_faq: "支持中心",
             faq: [
                 { q: "这个游戏收费吗？", a: "完全免费！MoodSlider 是一款旨在帮助大家缓解压力的公益性质网页游戏。" },
                 { q: "我的摄像头画面会被录制吗？", a: "绝对不会。我们使用 TensorFlow.js 在您的设备本地进行动作捕捉，画面数据不会离开您的电脑。" },
                 { q: "手机上可以玩吗？", a: "可以！游戏适配移动端浏览器，但在电脑大屏幕上体验更佳。" }
             ]
        },
        workplace: {
            title: "学业与职场的情绪急救包",
            subtitle: "拒绝精神内耗，把压力切成碎片",
            intro: "在**GPA**、**论文**、**996**和**KPI**的多重重压下，我们往往无处宣泄。MoodSlider 的设计初衷，就是为你提供一个安全、私密且即时的发泄空间，让你在'切碎'烦恼的过程中重获掌控感。",
            designPhilosophy: "设计哲学",
            startVenting: "开始宣泄",
            painPointsTitle: "你是否也经历过这些？",
            painPoints: [
                { icon: "📝", text: "改不完的论文/需求" },
                { icon: "📢", text: "枯燥的早八/会议" },
                { icon: "🎒", text: "挂科/背锅的恐惧" },
                { icon: "🌚", text: "周日/考前的焦虑" }
            ],
            philosophyTitle: "游戏设计理念：具象化宣泄",
            philosophy: "心理学研究表明，将抽象的压力源（Stressors）转化为具象的物体并进行物理上的击破，能有效降低皮质醇水平。在 MoodSlider 中，我们将“Deadline”、“Bug”、“考试”设计为可被切碎的视觉元素，配合爽快的音效反馈，实现心理学上的“替代性攻击”疗法。",
            wellnessTitle: "高效解压小贴士",
            wellnessTips: [
                { title: "4-7-8 呼吸法", desc: "吸气4秒，憋气7秒，呼气8秒，快速平复心率。" },
                { title: "番茄工作法", desc: "专注25分钟，强制休息5分钟，避免大脑过载。" },
                { title: "运动代偿", desc: "身体的疲惫能抑制精神的焦虑，试试我们的体感模式！" }
            ]
        }
    },
    en: {
        title: "MoodSlider",
        subtitle: "How Are You Today?",
        selectMode: "Select a mode to match your mood",
        playNow: "Play",
        tryAi: "Try AI",
        configTitle: "Emotion Mapping",
        mouse: "Mouse",
        camera: "Camera",
        startGame: "Start MoodSlider – Slide & Slice Now!",
        addItemsFirst: "ADD EMOTIONS",
        activeItems: "Mission Targets", 
        clear: "Clear",
        suggestions: "Emotion Library", 
        add: "ADD",
        inputPlaceholder: "Type stressor (e.g. Thesis, Tax)...", 
        aiGenTitle: "AI Generation",
        textMode: "Text",
        imageMode: "Image",
        aiPlaceholder: "Describe what's bothering you...",
        uploadImage: "Upload Image",
        generate: "Generate Level",
        sessionReport: "You Slid & Sliced Your Stress!",
        score: "Vented",
        maxCombo: "Max Combo",
        rage: "Rage",
        energy: "Energy",
        mood: "Mood Boost",
        menu: "Menu",
        playAgain: "Play Again",
        initializing: "Initializing Motion Engine...",
        cameraErrorTitle: "Camera Access Denied",
        cameraErrorDesc: "Please allow camera access to play.",
        deviceError: "No camera device found.",
        genericError: "Camera failed to start.",
        refresh: "Refresh Page",
        share: "Share Your MoodSlider Score",
        shareText: "I just slid & sliced away {score} bad moods with MoodSlider. Slide to rate, slice to release at moodslider.top!",
        copied: "Copied!",
        support: "Support Dev",
        nav: {
            startGame: "Start MoodSlider",
            blog: "Wellness Blog"
        },
        ads: {
            label: "Advertisement",
            sponsored: "Sponsored Content",
            sidebar: "Sponsor"
        },
        ui: {
             cameraReq: "Requires Webcam Access",
             mouseReq: "Mouse / Touch Controls",
             loadingAnalysis: "ANALYZING_PIXELS...",
             stealthHint: "Double click to restore game",
             thinking: "Thinking..."
        },
        stealth: {
            filename: "Study_Notes_Final_Revision_2024.xlsx - Saved",
            menu: ["File", "Home", "Insert", "Draw", "Page Layout", "Formulas", "Data", "Review", "View", "Help"],
            ready: "Ready",
            confidential: "Confidential",
            status: {
                approved: "Reviewed",
                pending: "Pending"
            },
            colProject: "Subject",
            colAnalysis: "Notes"
        },
        modes: {
            ANGRY: { label: "RAGE MODE", desc: "The world is too loud. Silence it!" },
            SAD: { label: "GLOOM MODE", desc: "Tired... just want to be alone..." },
            HAPPY: { label: "CHILL MODE", desc: "Grades & Salary, I want both!" },
            AI: { label: "Custom Gen", desc: "Local smart match, build your level." }
        },
        gameModesSection: {
            title: "Game Modes Explained",
            subtitle: "Choose the right therapy for you",
            modes: [
                { 
                    title: "Rage Mode", 
                    subtitle: "Instant Anger Release",
                    desc: "Targeting study bottlenecks, rejected thesis, or difficult clients. Physically destroy red anger bubbles with high-intensity slashing movements. Release pent-up frustration instantly.", 
                    features: ["Fast-paced interaction", "Red color psychology", "Heavy bass feedback"],
                    seoTag: "Best for Anger Management",
                    icon: "🔥", 
                    color: "border-red-500/20 hover:border-red-500/50"
                },
                { 
                    title: "Gloom Mode", 
                    subtitle: "Healing for Sad Days",
                    desc: "Whether it's failing a class, a breakup, or job rejection, this space allows vulnerability. Slice through blue melancholy indicators with soothing rain sounds.", 
                    features: ["Soothing audio", "Cool color palette", "Slow breathing guide"],
                    seoTag: "Relieves Anxiety & Depression",
                    icon: "🌧️", 
                    color: "border-blue-400/20 hover:border-blue-400/50"
                },
                { 
                    title: "Chill Mode", 
                    subtitle: "Break Time for School & Work",
                    desc: "Dive underwater to collect happy energy bubbles like 'Credits', 'Raise', and 'Snacks'. Avoid 'Pop Quiz' and 'Meeting' bombs. A fun way to recharge during breaks.", 
                    features: ["Immersive underwater theme", "Positive reinforcement", "Campus/Office humor"],
                    seoTag: "Fun Break Game",
                    icon: "🐠", 
                    color: "border-teal-400/20 hover:border-teal-400/50"
                },
                { 
                    title: "AI Custom", 
                    subtitle: "Personalized Venting",
                    desc: "Powered by local LLM logic. Simply type what's bothering you (e.g., 'Math', 'Taxes', 'Ex'), and the system generates a custom level.", 
                    features: ["Semantic mood mapping", "Custom level generation", "100% Private"],
                    seoTag: "AI Mental Therapy",
                    icon: "🧠", 
                    color: "border-purple-500/20 hover:border-purple-500/50"
                }
            ]
        },
        liveStats: {
            title: "Global Stress Relief Grid",
            online: "Live Venting Now",
            totalVented: "Issues Resolved Today",
            regions: "High Stress Zones",
            recent: "Live Feed",
            activities: [
                "Student in Beijing just sliced 50 'Calculus Problems'",
                "Developer in Shenzhen started 'Rage Mode'",
                "HR in Shanghai vented 1200 Hiring Stress points",
                "Student in Hangzhou sliced 10 'Vocab Words'",
                "Designer in Guangzhou hit a 50x Combo",
                "User in Chengdu is venting 'Thesis Anxiety'",
                "Student in NYC just smashed 'Finals'",
                "Engineer in Silicon Valley is fixing their mood"
            ]
        },
        gallery: {
            title: "Stressor Encyclopedia",
            subtitle: "Meet the 'Villains' You Will Destroy",
            intro: "We've built a local semantic mapping library with 100+ stressors covering campus life, workplace pressure, and relationships.",
            refresh: "REFRESH DATASET",
            terminal: {
                filename: "mood_mapper_lab_v2.0.exe",
                ready: "READY_FOR_INPUT..."
            },
            keywordsTitle: "Popular Stress Relief Topics",
            keywords: [
                "Exam Anxiety Crusher", "Office Break Tool", "Online Anger Management", "Digital Mental Health Therapy",
                "Emotional Venting Game", "Free Stress Relief Web App", "Burnout Prevention", "Stop Overthinking",
                "Browser Fruit Slicing", "Offline Ready"
            ],
            translator: {
                title: "Mood Mapper Lab",
                subtitle: "Type any stressor, test our local semantic engine.",
                placeholder: "e.g. Thesis, Bug, Ex...",
                button: "Generate Icon",
                loading: "Searching...",
                result: "Mapping Result"
            }
        },
        blog: {
            title: "Wellness Journal",
            subtitle: "Stress Management Science",
            readMore: "Read Article",
            back: "Back to List",
            share: "Share Article",
            viewAll: "View All Articles",
            allArticles: "All Articles",
            searchPlaceholder: "Search articles...",
        },
        testimonials: {
            title: "User Stories",
            subtitle: "Why People Love It",
            leaveReview: "Leave a Review",
            placeholderName: "Your Nickname (Optional)",
            placeholderText: "How was it? Vent here...",
            submit: "Submit Review",
            submitted: "Thanks for sharing!",
            list: [
                { 
                    id: '1', 
                    name: "Alex Liu", 
                    role: "Full Stack Dev", 
                    avatar: "👨‍💻", 
                    text: "As a dev facing errors daily, slicing bugs feels absolutely euphoric! It's the 'physical debugging' I needed.", 
                    rating: 5, 
                    isVerified: true,
                    ip: "104.28.**.**",
                    location: "NYC, USA"
                },
                { 
                    id: '2', 
                    name: "Lisa Wang", 
                    role: "Student", 
                    avatar: "🎓", 
                    text: "When I can't study anymore for finals, I play this. Slicing 'Calculus' and 'Physics' is so relieving!", 
                    rating: 5, 
                    isVerified: true,
                    ip: "82.11.**.**",
                    location: "London, UK"
                },
                { 
                    id: '3', 
                    name: "David Zhang", 
                    role: "Grad Student", 
                    avatar: "📚", 
                    text: "Great for study breaks. Getting physical clears my head immediately. Better than doomscrolling.", 
                    rating: 4, 
                    isVerified: true,
                    ip: "142.15.**.**",
                    location: "Toronto, CA"
                },
                { 
                    id: '4', 
                    name: "Kevin Chen", 
                    role: "Founder", 
                    avatar: "🚀", 
                    text: "Simple, direct, no nonsense. It's not just a game, it's my emotional first-aid kit. The motion tracking is spot on!", 
                    rating: 5, 
                    isVerified: true,
                    ip: "98.44.**.**",
                    location: "San Francisco, USA"
                }
            ] as Testimonial[]
        },
        landing: {
             seoTitle: "MoodSlider: Slide Your Mood, Slice Your Stress",
             seoSubtitle: "Free AI Mood Slider Game 2025 — slide & slice stress instantly.",
             seoContent: "MoodSlider is a free, AI-powered **mood slider game**. Step 1: Slide the mood slider to rate how you feel. Step 2: Slice away the AI-generated bad-mood fruits—30-second dopamine reset, no download, privacy-safe. Works with **webcam motion** or **silent mouse mode**, perfect for quick breaks at work or school.\n\n• No signup needed\n• 100% free forever\n• Works on phone & desktop",
             keywords: ["AI stress relief game", "mood slider", "free browser game", "motion control", "cut anxiety fast", "mood slicer", "anger management", "work burnout relief", "mental health", "webcam game"],
             featuresTitle: "Why Play MoodSlider?",
             subtitle_features: "Core Capabilities",
             features: [
                 { title: "Smart Semantic Gen", desc: "Built-in local NLP dictionary matches your specific annoyances (e.g., 'Taxes', 'Thesis', 'Ex') to targets instantly. Private & Offline-ready." },
                 { title: "Immersive Motion Control", desc: "No controllers needed. Our advanced hand-tracking technology maps your real movements to the game. Perfect for dorms or offices." },
                 { title: "100% Privacy Focused", desc: "Your privacy matters. All video processing happens locally on your device via Edge AI. No video data is ever sent to our servers." },
                 { title: "Instant Gratification", desc: "Experience satisfying visual effects, explosive particle systems, and dynamic audio that rewards every slash." }
             ],
             howToPlay: "How to Play",
             subtitle_howToPlay: "Get Started",
             steps: ["Select a mood mode or use the Custom Generator to customize your enemies.", "Enable camera access to activate the Motion Engine.", "Stand back and wave your arms to slash red targets. Avoid the bombs!", "Collect blue bonuses and build your Combo meter for maximum score."],
             faqTitle: "Frequently Asked Questions",
             subtitle_faq: "Support",
             faq: [
                 { q: "Is MoodSlider free?", a: "Yes, it is 100% free to play online directly in your browser." },
                 { q: "Is it safe to use my camera?", a: "Absolutely. We use local processing (TensorFlow.js). Your video feed never leaves your computer." },
                 { q: "Can I play on mobile?", a: "Yes, but for the best motion control experience, a laptop or desktop with a webcam is recommended." }
             ]
        },
        workplace: {
            title: "Mental First-Aid for School & Work",
            subtitle: "Stop Burnout. Start Slicing.",
            intro: "Under the crushing weight of **Exams**, **Grades**, **Deadlines**, and **KPIs**, we often have no outlet. MoodSlider is designed to provide a safe, private, and instant space to vent, giving you back control by physically 'slicing' away your worries.",
            designPhilosophy: "Design Philosophy",
            startVenting: "Start Venting",
            painPointsTitle: "Sound Familiar?",
            painPoints: [
                { icon: "📝", text: "Endless Revisions/Essays" },
                { icon: "📢", text: "Boring Meetings/Lectures" },
                { icon: "🎒", text: "Unfair Blame/Bad Grades" },
                { icon: "🌚", text: "Sunday/Pre-Exam Anxiety" }
            ],
            philosophyTitle: "Design Philosophy: Tangible Venting",
            philosophy: "Psychological studies show that visualizing abstract stressors as concrete objects and physically destroying them helps lower cortisol levels. In MoodSlider, we turn 'Bugs', 'Exams', and 'Bad Bosses' into destructible targets. Combined with satisfying audio-visual feedback, this creates a 'displacement activity' that provides instant relief.",
            wellnessTitle: "Wellness Tips",
            wellnessTips: [
                { title: "4-7-8 Breathing", desc: "Inhale 4s, hold 7s, exhale 8s to calm your nervous system." },
                { title: "Pomodoro Technique", desc: "Focus 25m, rest 5m to prevent cognitive overload." },
                { title: "Physical Movement", desc: "Physical fatigue inhibits mental anxiety. Try our Camera Mode!" }
            ]
        }
    }
};

export const IMPACT_WORDS = {
    zh: {
        ANGRY: ["滚!", "驳回!", "闭嘴!", "走开!", "再见!", "K.O.", "爽!"],
        SAD: ["呜呜", "走好", "拜拜", "叹气", "唉..."],
        HAPPY: ["拿来!", "我的!", "好耶!", "真香!", "加薪!", "Nice!"]
    },
    en: {
        ANGRY: ["NOPE!", "BYE!", "SHUT UP", "GO AWAY", "BOOM", "K.O.", "GONE"],
        SAD: ["Sigh...", "Bye...", "Tears", "Gone", "Oh no"],
        HAPPY: ["MINE!", "YAY!", "WOOHOO", "YUMMY", "NICE!", "COOL"]
    }
};

// Mood Configurations - Chinese
export const MOOD_CONFIG_ZH: Record<Exclude<MoodType, 'AI_GENERATED'>, LevelConfig> = {
    ANGRY: {
        label: "暴躁模式",
        description: "世界太吵了，给我安静点！",
        buttonText: "开始 MoodSlider · 先滑后切",
        themeColor: "from-red-500 to-orange-600",
        gradient: "bg-gradient-to-br from-red-200 via-red-100 to-orange-200", // Lighter Gradient
        bgStyle: "contrast(1.1) saturate(1.2)", 
        interactionType: 'SLICE',
        visualTheme: 'DESTRUCTION',
        musicBpm: 170,
        musicTheme: 'HEAVY_METAL',
        items: [
            { name: '傻X导师/领导', emoji: '👹', color: '#EF4444', points: 50, isBomb: false },
            { name: '改论文/需求', emoji: '🤬', color: '#F97316', points: 40, isBomb: false },
            { name: '电脑死机', emoji: '💻', color: '#64748B', points: 30, isBomb: false },
            { name: '杠精', emoji: '😤', color: '#EA580C', points: 35, isBomb: false },
            { name: '小组作业', emoji: '💩', color: '#EAB308', points: 25, isBomb: false },
            { name: '画大饼', emoji: '🥞', color: '#EAB308', points: 25, isBomb: false },
            { name: '早八/早会', emoji: '📢', color: '#475569', points: 30, isBomb: false },
            { name: 'KPI/GPA', emoji: '📉', color: '#7C3AED', points: 20, isBomb: false },
            { name: '背黑锅', emoji: '🎒', color: '#1E293B', points: 60, isBomb: false },
            { name: '挂科/裁员', emoji: '💣', color: '#000000', points: -100, isBomb: true },
        ]
    },
    SAD: {
        label: "EMO模式",
        description: "累了...感觉不会再爱了...",
        buttonText: "开始 MoodSlider · 先滑后切",
        themeColor: "from-slate-400 to-blue-500",
        gradient: "bg-gradient-to-b from-slate-200 via-blue-100 to-white", // Lighter Gradient
        bgStyle: "grayscale(0.3) contrast(1.0)", 
        interactionType: 'SLICE',
        visualTheme: 'SAD_RAIN',
        musicBpm: 85,
        musicTheme: 'LO_FI',
        items: [
            { name: '无偿加班/内卷', emoji: '🌚', color: '#475569', points: 20, isBomb: false },
            { name: '考研失败', emoji: '💔', color: '#64748B', points: 30, isBomb: false },
            { name: '没钱', emoji: '💸', color: '#94A3B8', points: 25, isBomb: false },
            { name: '失眠', emoji: '💤', color: '#6366F1', points: 10, isBomb: false },
            { name: '迷茫', emoji: '🌀', color: '#3B82F6', points: 30, isBomb: false },
            { name: '周一/早八', emoji: '📅', color: '#1E293B', points: 40, isBomb: false },
            { name: '很累', emoji: '😫', color: '#64748B', points: 20, isBomb: false },
            { name: '孤独', emoji: '🍂', color: '#B45309', points: 20, isBomb: false },
            { name: '被放鸽子', emoji: '🕊️', color: '#F1F5F9', points: 15, isBomb: false },
            { name: 'HR/辅导员', emoji: '💣', color: '#000000', points: -50, isBomb: true },
        ]
    },
    HAPPY: {
        label: "摸鱼模式",
        description: "工作是老板的，学业是自己的，但快乐是当下的~",
        buttonText: "开始 MoodSlider · 先滑后切",
        themeColor: "from-teal-400 to-cyan-500",
        gradient: "bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100", // Lighter Gradient
        bgStyle: "brightness(1.05) saturate(1.1)", 
        interactionType: 'COLLECT', // Catching fish
        visualTheme: 'UNDERWATER',
        musicBpm: 110,
        musicTheme: 'ARCADE',
        items: [
            { name: '下午茶', emoji: '🧋', color: '#F97316', points: 10, isBomb: false },
            { name: '小鱼干', emoji: '🐟', color: '#0EA5E9', points: 50, isBomb: false },
            { name: '八卦', emoji: '🍉', color: '#22C55E', points: 20, isBomb: false },
            { name: '及格/万岁', emoji: '💯', color: '#22C55E', points: 40, isBomb: false },
            { name: '手机', emoji: '📱', color: '#A855F7', points: 30, isBomb: false },
            { name: '周五', emoji: '🎉', color: '#EAB308', points: 40, isBomb: false },
            { name: '摸鱼', emoji: '🚽', color: '#F1F5F9', points: 15, isBomb: false },
            { name: '早退/逃课', emoji: '🏃', color: '#F59E0B', points: 25, isBomb: false },
            { name: '奖学金/奖金', emoji: '💰', color: '#FACC15', points: 100, isBomb: false },
            { name: '老板/老师', emoji: '🦈', color: '#000000', points: -80, isBomb: true },
            { name: '紧急会议/点名', emoji: '💣', color: '#171717', points: -80, isBomb: true },
        ]
    }
};

// Mood Configurations - English
export const MOOD_CONFIG_EN: Record<Exclude<MoodType, 'AI_GENERATED'>, LevelConfig> = {
    ANGRY: {
        label: "RAGE MODE",
        description: "The world is too loud. Silence it!",
        buttonText: "Start MoodSlider – Slide & Slice",
        themeColor: "from-red-500 to-orange-600",
        gradient: "bg-gradient-to-br from-red-200 via-red-100 to-orange-200",
        bgStyle: "contrast(1.1) saturate(1.2)", 
        interactionType: 'SLICE',
        visualTheme: 'DESTRUCTION',
        musicBpm: 170,
        musicTheme: 'HEAVY_METAL',
        items: [
            { name: 'BAD BOSS/PROF', emoji: '👹', color: '#EF4444', points: 50, isBomb: false },
            { name: 'BUGS/ERRORS', emoji: '🪲', color: '#F97316', points: 40, isBomb: false },
            { name: 'CRASH', emoji: '💻', color: '#64748B', points: 30, isBomb: false },
            { name: 'TROLLS', emoji: '😤', color: '#EA580C', points: 35, isBomb: false },
            { name: 'LIES', emoji: '🤥', color: '#EAB308', points: 25, isBomb: false },
            { name: 'MEETING/CLASS', emoji: '📢', color: '#475569', points: 30, isBomb: false },
            { name: 'SPAM/ESSAY', emoji: '📧', color: '#7C3AED', points: 20, isBomb: false },
            { name: 'TRAFFIC', emoji: '🚗', color: '#1E293B', points: 60, isBomb: false },
            { name: 'FIRED/FAIL', emoji: '💣', color: '#000000', points: -100, isBomb: true },
            { name: 'DEADLINE', emoji: '⏰', color: '#000000', points: -100, isBomb: true },
        ]
    },
    SAD: {
        label: "GLOOM MODE",
        description: "Tired... just want to be alone...",
        buttonText: "Start MoodSlider – Slide & Slice",
        themeColor: "from-slate-400 to-blue-500",
        gradient: "bg-gradient-to-b from-slate-200 via-blue-100 to-white",
        bgStyle: "grayscale(0.3) contrast(1.0)", 
        interactionType: 'SLICE',
        visualTheme: 'SAD_RAIN',
        musicBpm: 85,
        musicTheme: 'LO_FI',
        items: [
            { name: 'OVERTIME/STUDY', emoji: '🌚', color: '#475569', points: 20, isBomb: false },
            { name: 'COMMUTE', emoji: '🚌', color: '#64748B', points: 15, isBomb: false },
            { name: 'POOR', emoji: '💸', color: '#94A3B8', points: 25, isBomb: false },
            { name: 'INSOMNIA', emoji: '💤', color: '#6366F1', points: 10, isBomb: false },
            { name: 'STRESS', emoji: '🌀', color: '#3B82F6', points: 30, isBomb: false },
            { name: 'MONDAY', emoji: '📅', color: '#1E293B', points: 40, isBomb: false },
            { name: 'TIRED', emoji: '😫', color: '#64748B', points: 20, isBomb: false },
            { name: 'LONELY', emoji: '🍂', color: '#B45309', points: 20, isBomb: false },
            { name: 'GHOSTED', emoji: '🕊️', color: '#F1F5F9', points: 15, isBomb: false },
            { name: 'HR/ADVISOR', emoji: '💣', color: '#000000', points: -50, isBomb: true },
        ]
    },
    HAPPY: {
        label: "CHILL MODE",
        description: "Work hard, play harder!",
        buttonText: "Start MoodSlider – Slide & Slice",
        themeColor: "from-teal-400 to-cyan-500",
        gradient: "bg-gradient-to-br from-teal-100 via-cyan-50 to-blue-100",
        bgStyle: "brightness(1.05) saturate(1.1)", 
        interactionType: 'COLLECT',
        visualTheme: 'UNDERWATER',
        musicBpm: 110,
        musicTheme: 'ARCADE',
        items: [
            { name: 'SNACKS', emoji: '🧋', color: '#F97316', points: 10, isBomb: false },
            { name: 'FISH', emoji: '🐟', color: '#0EA5E9', points: 50, isBomb: false },
            { name: 'GOSSIP', emoji: '🍉', color: '#22C55E', points: 20, isBomb: false },
            { name: 'PHONE', emoji: '📱', color: '#A855F7', points: 30, isBomb: false },
            { name: 'FRIDAY', emoji: '🎉', color: '#EAB308', points: 40, isBomb: false },
            { name: 'BREAK', emoji: '🚽', color: '#F1F5F9', points: 15, isBomb: false },
            { name: 'LEAVE', emoji: '🏃', color: '#F59E0B', points: 25, isBomb: false },
            { name: 'BONUS/A+', emoji: '💰', color: '#FACC15', points: 100, isBomb: false },
            { name: 'BOSS/PROF', emoji: '🦈', color: '#000000', points: -80, isBomb: true },
            { name: 'POP QUIZ', emoji: '💣', color: '#171717', points: -80, isBomb: true },
        ]
    }
};

export const getMoodConfigs = (lang: Language) => {
    return lang === 'zh' ? MOOD_CONFIG_ZH : MOOD_CONFIG_EN;
};

// Colors to assign to user-defined custom inputs
export const CUSTOM_ITEM_COLORS = [
    '#F43F5E', // Rose
    '#0D6E6E', // Teal (Updated)
    '#FFC107', // Amber (Updated)
    '#8B5CF6', // Violet
    '#06B6D4', // Cyan
    '#F97316', // Orange
];
