
import React, { useState, useCallback, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import UIOverlay from './components/UIOverlay';
import StealthScreen from './components/StealthScreen';
import { GameStatus, MoodType, GameStats, LevelConfig, CustomUserItem, InputMode, Language, Testimonial } from './types';
import { generateLevelFromPrompt, generateLevelFromImage, suggestEmojiForText, getAllKnownStressors, expandPromptToItems } from './services/geminiService';
import { getMoodConfigs, TRANSLATIONS, BLOG_POSTS } from './constants';
import { Globe, MousePointer, Video, Sparkles, Shield, Menu, Twitter, Facebook, Linkedin, Brain, Coffee, Battery, Users, Activity, Zap, ArrowRight, Loader2, RefreshCw, Database, Cpu, Terminal, HelpCircle, MessageSquare, Star, Quote, CheckCircle, MapPin, Globe2, BookOpen, Calendar, Clock, Tag, ArrowLeft, Search, Grid, Megaphone, Play, Layout, Target, Music, Aperture } from 'lucide-react';

// --- Components ---

// Simple Markdown Renderer with Highlight Color
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
    if (!content) return null;
    const segments = content.split(/(\*\*.*?\*\*)/g);
    return (
        <>
            {segments.map((segment, i) => {
                if (segment.startsWith('**') && segment.endsWith('**')) {
                    return <strong key={i} className="font-bold text-emerald-600">{segment.slice(2, -2)}</strong>;
                }
                return <span key={i}>{segment}</span>;
            })}
        </>
    );
};

// HTML Content Renderer
const HtmlRenderer: React.FC<{ content: string }> = ({ content }) => {
    return <div className="prose prose-emerald max-w-none text-slate-700 leading-relaxed font-sans" dangerouslySetInnerHTML={{ __html: content }} />;
};

// Commercial: Ad Slot Component - Clean Minimalist
const AdSlot: React.FC<{ className?: string, label?: string }> = ({ className, label }) => (
    <div className={`ad-slot-container w-full max-w-5xl ${className} border border-dashed border-emerald-900/10 bg-emerald-50/30 rounded-3xl`}>
        <div className="flex flex-col items-center justify-center py-8">
             <Megaphone className="w-5 h-5 text-emerald-900/20 mb-2" />
             <span className="ad-label text-emerald-900/20 font-bold tracking-widest text-[10px]">{label || "SPONSORED"}</span>
        </div>
    </div>
);

// Standardized Section Header with Healing Font
const SectionHeader: React.FC<{ icon: React.ElementType, subtitle: string, title: string, center?: boolean }> = ({ icon: Icon, subtitle, title, center }) => (
    <div className={`mb-20 ${center ? 'text-center' : ''}`}>
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-tech text-xs font-bold uppercase tracking-[0.2em] mb-6 ${center ? 'mx-auto' : ''}`}>
            <Icon className="w-3 h-3" />
            <span>{subtitle}</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a3c34] tracking-tight leading-[1.1] font-sans">
            {title}
        </h2>
    </div>
);

const FEATURE_ICONS = [Cpu, Video, Shield, Zap];

// --- Live Stats Component (Refactored for Cleanliness) ---
const LiveGlobalStats: React.FC<{ lang: Language }> = ({ lang }) => {
    const t = TRANSLATIONS[lang].liveStats;
    const [onlineCount, setOnlineCount] = useState(12452);
    const [ventedCount, setVentedCount] = useState(8543210);
    const [currentTicker, setCurrentTicker] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setOnlineCount(prev => prev + (Math.floor(Math.random() * 15) - 5));
            setVentedCount(prev => prev + Math.floor(Math.random() * 200) + 50);
            setCurrentTicker(prev => (prev + 1) % t.activities.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [lang, t.activities.length]);

    return (
        <div className="w-full max-w-5xl mx-auto mb-16 px-4 relative z-20">
            {/* Glass Capsule */}
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-full p-2 shadow-xl shadow-emerald-900/5 flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-6 ring-1 ring-black/5">
                
                {/* Stat 1: Online */}
                <div className="flex items-center gap-4 px-6 py-3 w-full lg:w-auto justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-emerald-900/5">
                     <div className="w-10 h-10 rounded-full bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                        <Users className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                         <div className="text-[9px] font-bold text-emerald-800/40 uppercase tracking-widest mb-0.5">{t.online}</div>
                         <div className="text-xl font-bold text-[#1a3c34] font-tech leading-none flex items-center gap-2">
                             <span className="relative flex h-2 w-2">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                             </span>
                             {onlineCount.toLocaleString()}
                         </div>
                     </div>
                </div>
                
                {/* Stat 2: Vented */}
                 <div className="flex items-center gap-4 px-6 py-3 w-full lg:w-auto justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-emerald-900/5">
                     <div className="w-10 h-10 rounded-full bg-emerald-100/50 flex items-center justify-center text-emerald-600">
                        <Zap className="w-5 h-5" />
                     </div>
                     <div className="text-left">
                         <div className="text-[9px] font-bold text-emerald-800/40 uppercase tracking-widest mb-0.5">{t.totalVented}</div>
                         <div className="text-xl font-bold text-[#1a3c34] font-tech leading-none">{ventedCount.toLocaleString()}</div>
                     </div>
                </div>

                {/* Ticker Feed */}
                <div className="flex-1 px-6 py-3 w-full lg:w-auto flex items-center justify-center lg:justify-start min-w-0">
                     <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-4 flex-shrink-0">
                        <Activity className="w-4 h-4" />
                     </div>
                     <div className="overflow-hidden h-8 relative w-full flex items-center">
                            <div key={currentTicker} className="animate-in slide-in-from-bottom-2 fade-in duration-500 absolute inset-0 flex items-center">
                                <span className="text-xs md:text-sm font-semibold text-slate-600 truncate font-sans">
                                    {t.activities[currentTicker]}
                                </span>
                            </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

// --- Game Modes Overview (Core Gameplay) ---
const GameModesOverview: React.FC<{ lang: Language }> = ({ lang }) => {
    const t = TRANSLATIONS[lang].gameModesSection;
    
    return (
        // THEME: WHITE (#ffffff) for Contrast
        <section className="py-32 px-6 relative z-10 bg-white">
            <div className="max-w-7xl mx-auto relative">
                <SectionHeader center icon={Layout} title={t.title} subtitle={t.subtitle} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {t.modes.map((mode, index) => {
                        return (
                            <div key={index} className={`bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 lg:p-12 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/10 group flex flex-col h-full relative overflow-hidden hover:-translate-y-2`}>
                                <div className="absolute -top-10 -right-10 p-8 opacity-5 text-9xl grayscale group-hover:opacity-10 transition-all duration-500 select-none font-sans rotate-12">
                                    {mode.icon}
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <span className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-xl shadow-sm group-hover:scale-110 transition-transform">
                                            {mode.icon}
                                        </span>
                                        <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-400">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a3c34] mb-4 font-sans tracking-tight">
                                        {mode.title}
                                    </h3>
                                    
                                    <p className="text-slate-500 text-base leading-relaxed mb-8 font-sans flex-1 max-w-md font-medium">
                                        {mode.desc}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto pt-8 border-t border-slate-200/50">
                                        {mode.features.map((feat, fIdx) => (
                                            <span key={fIdx} className="px-3 py-1.5 bg-white rounded-lg text-[10px] font-bold font-mono text-emerald-800/70 uppercase tracking-wide border border-emerald-900/5 shadow-sm">
                                                {feat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};


// --- Game Asset Gallery (Emotion Gallery) ---
const GamePropsGallery: React.FC<{ lang: Language }> = ({ lang }) => {
    const t = TRANSLATIONS[lang].gallery;
    const allStressors = getAllKnownStressors();
    const [displayItems, setDisplayItems] = useState<any[]>([]);
    
    const shuffleItems = useCallback(() => {
        const shuffled = [...allStressors].sort(() => 0.5 - Math.random());
        const formatted = shuffled.slice(0, 12).map(entry => {
            const chineseKey = entry.keys.find(k => /[\u4e00-\u9fa5]/.test(k));
            const englishKey = entry.keys.find(k => !/[\u4e00-\u9fa5]/.test(k));
            const rawName = (lang === 'zh' && chineseKey) ? chineseKey : (englishKey || entry.keys[0]);
            const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
            const colors = ['#EF4444', '#F97316', '#EAB308', '#8B5CF6', '#3B82F6', '#10B981'];
            return { name: name, emoji: entry.emoji, color: colors[Math.floor(Math.random() * colors.length)] };
        });
        setDisplayItems(formatted);
    }, [allStressors, lang]);

    useEffect(() => { shuffleItems(); }, [shuffleItems]);

    const [demoInput, setDemoInput] = useState("");
    const [demoResult, setDemoResult] = useState<{emoji: string, text: string} | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);

    const handleTranslate = async (e: React.FormEvent) => {
       e.preventDefault();
       if(!demoInput.trim()) return;
       setIsTranslating(true);
       try {
          let emoji = await suggestEmojiForText(demoInput);
          setDemoResult({ emoji: emoji, text: demoInput });
       } finally {
          setIsTranslating(false);
       }
    }

    return (
        // THEME: SOFT MINT (#f0fdf4) for Gallery
        <section className="py-32 px-6 relative z-10 bg-[#f0fdf4]">
            <div className="max-w-6xl mx-auto">
                <SectionHeader center icon={Database} title={t.title} subtitle={lang === 'zh' ? '语义数据库' : 'Semantic DB'} />

                {/* Mood Mapper Lab - Terminal Style */}
                <div className="mb-20">
                    <div className="bg-white border border-emerald-100 rounded-[3rem] overflow-hidden relative shadow-xl shadow-emerald-900/5">
                         <div className="p-8 md:p-16 grid md:grid-cols-2 gap-16 items-center">
                             <div>
                                 <div className="inline-flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase mb-6 bg-emerald-50 px-4 py-2 rounded-full tracking-widest font-tech">
                                     <Cpu className="w-3 h-3" /> NLP Engine Active
                                 </div>
                                 <h3 className="text-3xl md:text-4xl text-[#1a3c34] font-bold mb-6 font-sans uppercase leading-tight">{t.translator.subtitle}</h3>
                                 <p className="text-slate-600 text-base leading-relaxed mb-10 font-sans font-medium">
                                     {lang === 'zh' ? "输入任意烦恼关键词，系统将实时匹配最解压的视觉图腾。" : "Enter any stressor keyword. System will map it to a visual totem."}
                                 </p>

                                 <form onSubmit={handleTranslate} className="relative group max-w-md">
                                     <div className="relative flex items-center bg-slate-50 rounded-2xl border border-emerald-900/10 transition-all focus-within:bg-white focus-within:shadow-lg focus-within:border-emerald-400 overflow-hidden">
                                         <span className="pl-6 text-emerald-400 font-mono text-lg">{`>`}</span>
                                         <input 
                                             type="text" 
                                             value={demoInput}
                                             onChange={(e) => setDemoInput(e.target.value)}
                                             placeholder={t.translator.placeholder}
                                             className="w-full bg-transparent border-none text-[#1a3c34] p-6 outline-none font-bold font-sans text-base placeholder-slate-300"
                                         />
                                         <button 
                                             type="submit"
                                             disabled={isTranslating || !demoInput.trim()}
                                             className="mr-3 bg-white hover:bg-emerald-50 text-emerald-800 p-3 rounded-xl transition-colors shadow-sm border border-emerald-100"
                                         >
                                             {isTranslating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                                         </button>
                                     </div>
                                 </form>
                             </div>

                             <div className="flex justify-center py-8 md:py-0">
                                 <div className="relative w-64 h-64">
                                     {/* Concentric Circles */}
                                     <div className="absolute inset-0 border border-emerald-100 rounded-full animate-[spin_20s_linear_infinite]"></div>
                                     <div className="absolute inset-12 border border-dashed border-emerald-200 rounded-full animate-[spin_30s_linear_infinite_reverse]"></div>
                                     
                                     <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                         {demoResult ? (
                                             <div className="animate-in zoom-in duration-300 text-center">
                                                 <div className="text-8xl mb-6 filter drop-shadow-xl transform hover:scale-110 transition-transform cursor-pointer">{demoResult.emoji}</div>
                                                 <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold font-mono text-emerald-800 border border-emerald-100 shadow-sm uppercase tracking-wider">
                                                     {demoResult.text} MATCHED
                                                 </div>
                                             </div>
                                         ) : (
                                             <div className="text-center text-emerald-200">
                                                 <Terminal className="w-16 h-16 mx-auto mb-4 opacity-40" />
                                                 <div className="text-[10px] font-bold font-mono tracking-widest">{t.terminal.ready}</div>
                                             </div>
                                         )}
                                     </div>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>

                {/* Grid Assets - Clean Floating Style */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mb-12">
                    {displayItems.map((item, idx) => (
                        <div key={idx} className="bg-white border border-emerald-50 rounded-3xl p-6 flex flex-col items-center text-center transition-all group cursor-default shadow-sm hover:shadow-xl hover:-translate-y-2">
                            <div className="text-4xl mb-4 transform group-hover:scale-125 transition-transform duration-300 filter drop-shadow-sm">{item.emoji}</div>
                            <div className="text-[10px] font-bold text-slate-400 group-hover:text-[#1a3c34] truncate w-full font-mono uppercase tracking-wide transition-colors">{item.name}</div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center">
                    <button onClick={shuffleItems} className="text-xs font-bold font-mono text-emerald-700 hover:text-white hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 mx-auto border border-emerald-200 px-8 py-4 rounded-full bg-white shadow-sm uppercase tracking-widest">
                        <RefreshCw className="w-3 h-3" /> {t.refresh}
                    </button>
                </div>
            </div>
        </section>
    );
};

// --- Blog List Page ---
const BlogListPage: React.FC<{ lang: Language, onBack: () => void }> = ({ lang, onBack }) => {
    const t = TRANSLATIONS[lang].blog;
    const adsT = TRANSLATIONS[lang].ads;
    const posts = BLOG_POSTS[lang];
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleReadMore = (postId: string) => {
        setExpandedPostId(postId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // THEME: SOFT MINT
        <div className="min-h-screen pt-32 px-6 pb-24 relative z-10 bg-[#f0fdf4]">
             <div className="max-w-6xl mx-auto">
                {/* Header & Search */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <button onClick={onBack} className="flex items-center gap-2 text-emerald-800/60 hover:text-emerald-900 mb-8 font-tech uppercase tracking-wider text-xs font-bold transition-colors">
                            <ArrowLeft className="w-4 h-4" /> {t.back}
                        </button>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#1a3c34] tracking-tighter font-sans uppercase mb-4">{t.allArticles}</h1>
                        <p className="text-emerald-900/60 font-sans font-medium text-lg max-w-lg">{lang === 'zh' ? '探索所有关于情绪管理的科学与技巧' : 'Explore the science and art of stress management.'}</p>
                    </div>
                    <div className="w-full md:w-auto relative">
                        <input 
                            type="text" 
                            placeholder={t.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-96 bg-white border border-emerald-100 rounded-full px-8 py-4 pl-14 text-[#1a3c34] focus:outline-none focus:border-emerald-300 transition-all font-sans font-medium text-sm shadow-sm placeholder-emerald-900/20"
                        />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-400 w-5 h-5" />
                    </div>
                </div>

                {/* Single Post View */}
                {expandedPostId ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                         {(() => {
                             const post = posts.find(p => p.id === expandedPostId);
                             if (!post) return null;
                             return (
                                 <div className="flex flex-col lg:flex-row gap-8">
                                     <article className="bg-white border border-emerald-100 rounded-[2.5rem] overflow-hidden p-8 md:p-16 flex-1 shadow-xl shadow-emerald-900/5">
                                         <div className="flex flex-wrap items-center gap-4 mb-8 text-xs font-bold font-mono text-emerald-800/50 uppercase tracking-wider">
                                             <span className="bg-emerald-50 text-emerald-900 px-3 py-1 rounded-full">{post.category}</span>
                                             <span>{post.date}</span>
                                             <span>{post.readTime}</span>
                                         </div>
                                         <h1 className="text-3xl md:text-5xl font-bold text-[#1a3c34] mb-10 leading-[1.1] font-sans uppercase">{post.title}</h1>
                                         <HtmlRenderer content={post.content} />
                                         <div className="mt-16 pt-10 border-t border-emerald-50">
                                             <button onClick={() => setExpandedPostId(null)} className="text-[#1a3c34] hover:text-emerald-600 font-bold transition-colors flex items-center gap-2 font-tech text-sm uppercase tracking-wider">
                                                 <Grid className="w-4 h-4" /> {t.back}
                                             </button>
                                         </div>
                                     </article>
                                     
                                     {/* Sidebar Ad Slot */}
                                     <div className="w-full lg:w-80 flex-shrink-0">
                                         <div className="sticky top-32">
                                              <AdSlot label={adsT.sidebar} className="h-[600px]" />
                                         </div>
                                     </div>
                                 </div>
                             );
                         })()}
                    </div>
                ) : (
                    /* Grid List View */
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map(post => (
                                <article key={post.id} className="bg-white border border-emerald-50 rounded-[2rem] p-8 transition-all group flex flex-col h-full cursor-pointer shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-2" onClick={() => handleReadMore(post.id)}>
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-3xl border border-emerald-100 group-hover:scale-110 transition-transform">
                                            {post.image}
                                        </div>
                                        <span className="text-[10px] font-bold font-mono text-emerald-800/50 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-wide">{post.category}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#1a3c34] mb-4 leading-tight font-sans group-hover:text-emerald-600 transition-colors uppercase">{post.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 flex-1 font-sans font-medium">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-emerald-800/40 font-mono border-t border-slate-100 pt-6 mt-auto">
                                        <span>{post.date}</span>
                                        <span className="group-hover:translate-x-1 transition-transform text-emerald-600 flex items-center gap-2">Read <ArrowRight className="w-3 h-3" /></span>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <AdSlot className="mt-16" label={adsT.sponsored} />
                    </>
                )}
             </div>
        </div>
    );
};

// --- Blog Section (Home Widget) ---
const BlogSection: React.FC<{ lang: Language, id?: string, onViewAll: () => void }> = ({ lang, id, onViewAll }) => {
    const t = TRANSLATIONS[lang].blog;
    const posts = BLOG_POSTS[lang].slice(0, 3);
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);

    const handleReadMore = (postId: string) => {
        setExpandedPostId(postId);
        setTimeout(() => {
            document.getElementById(`post-${postId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    const handleBack = () => {
        setExpandedPostId(null);
        if (id) {
             document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        // THEME: SOFT MINT (#f0fdf4) - Changed from White
        <section id={id} className="py-32 px-6 relative z-10 bg-[#f0fdf4]">
            <div className="max-w-5xl mx-auto">
                <SectionHeader center icon={BookOpen} title={t.title} subtitle={t.subtitle} />
                
                <div className="grid gap-8 mb-16">
                    {posts.map((post) => {
                        const isExpanded = expandedPostId === post.id;
                        const isHidden = expandedPostId !== null && !isExpanded;
                        
                        if (isHidden) return null;

                        return (
                            <article 
                                id={`post-${post.id}`}
                                key={post.id} 
                                className={`bg-white border border-emerald-100 rounded-[2.5rem] overflow-hidden transition-all duration-500 ${isExpanded ? 'shadow-2xl ring-1 ring-emerald-100' : 'hover:shadow-lg'}`}
                            >
                                <div className="p-10 md:p-12">
                                    {/* Meta Header */}
                                    <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">
                                        <span className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full text-emerald-700">
                                            <Tag className="w-3 h-3" /> {post.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {post.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {post.readTime}
                                        </span>
                                    </div>

                                    <h3 className={`font-bold text-[#1a3c34] mb-6 font-sans uppercase leading-none ${isExpanded ? 'text-4xl md:text-5xl' : 'text-3xl'}`}>
                                        {post.title}
                                    </h3>
                                    
                                    {isExpanded ? (
                                        <div className="animate-in fade-in duration-500">
                                            <HtmlRenderer content={post.content} />
                                            
                                            <div className="mt-12 pt-8 border-t border-emerald-50 flex justify-between items-center">
                                                <button 
                                                    onClick={handleBack}
                                                    className="flex items-center gap-2 text-slate-500 hover:text-[#1a3c34] transition-colors font-bold text-xs font-tech uppercase tracking-wider"
                                                >
                                                    <ArrowLeft className="w-4 h-4" /> {t.back}
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-slate-500 leading-relaxed mb-8 font-sans font-medium text-lg max-w-3xl">
                                                {post.excerpt}
                                            </p>
                                            <button 
                                                onClick={() => handleReadMore(post.id)}
                                                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-bold text-xs uppercase tracking-widest transition-colors group font-tech"
                                            >
                                                {t.readMore} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>
                
                {/* View All Button */}
                {!expandedPostId && (
                    <div className="text-center">
                        <button 
                            onClick={onViewAll}
                            className="inline-flex items-center gap-2 bg-white hover:bg-emerald-50 text-[#1a3c34] px-10 py-5 rounded-full font-bold transition-all border border-emerald-100 group font-tech uppercase tracking-widest text-sm shadow-sm hover:shadow-md"
                        >
                            {t.viewAll} <Grid className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

// --- Testimonials Component ---
const TestimonialsSection: React.FC<{ lang: Language, testimonials: Testimonial[], id?: string }> = ({ lang, testimonials, id }) => {
    const t = TRANSLATIONS[lang].testimonials;

    return (
        // THEME: WHITE (#ffffff) - Changed from Mint
        <section id={id} className="py-32 px-6 relative z-10 bg-white">
            <div className="max-w-7xl mx-auto">
                <SectionHeader center icon={MessageSquare} title={t.title} subtitle={t.subtitle} />
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((item, i) => (
                        <article key={item.id || i} className="bg-slate-50 border border-slate-100 p-8 rounded-[2rem] relative flex flex-col h-full hover:shadow-lg hover:shadow-emerald-900/5 transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500 hover:-translate-y-1 hover:bg-white" style={{ animationDelay: `${i*100}ms`}}>
                            {/* Quote Icon */}
                            <Quote className="absolute top-8 right-8 text-slate-200 w-10 h-10 rotate-180 group-hover:text-emerald-100 transition-colors" />
                            
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl text-emerald-700 border border-slate-200 shadow-sm">
                                    {item.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-[#1a3c34] text-sm flex items-center gap-1 font-tech uppercase tracking-wide">
                                        {item.name}
                                        {item.isVerified && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                                    </div>
                                    <div className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest">{item.role}</div>
                                </div>
                            </div>

                            <div className="flex mb-4 relative z-10">
                                {[...Array(5)].map((_, s) => (
                                    <Star key={s} className={`w-3 h-3 ${s < item.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} />
                                ))}
                            </div>
                            
                            <blockquote className="text-slate-600 text-sm leading-relaxed italic flex-1 relative z-10 mb-6 font-sans font-medium">
                                "{item.text}"
                            </blockquote>

                            {/* Fake IP & Location Footer */}
                            {item.ip && item.location && (
                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-300 font-mono font-bold uppercase">
                                    <div className="flex items-center gap-1">
                                        <Globe2 className="w-3 h-3" /> {item.ip}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" /> {item.location}
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [language, setLanguage] = useState<Language>('zh');
  const [currentMood, setCurrentMood] = useState<MoodType>('ANGRY');
  const [currentLevelConfig, setCurrentLevelConfig] = useState<LevelConfig>(getMoodConfigs('zh')['ANGRY']);
  const [inputMode, setInputMode] = useState<InputMode>('MOUSE'); 
  
  const [currentView, setCurrentView] = useState<'HOME' | 'BLOG_LIST'>(() => {
      if (typeof window !== 'undefined') {
          if (window.location.hash === '#blog') return 'BLOG_LIST';
      }
      return 'HOME';
  });

  const [sensitivity, setSensitivity] = useState<number>(25);
  
  const [stats, setStats] = useState<GameStats>({
      score: 0, maxCombo: 0, caloriesBurned: 0, ventValue: 0, happinessIncrease: 0, slicedItemCounts: {}
  });

  const [moodCustomItems, setMoodCustomItems] = useState<Record<string, CustomUserItem[]>>(() => {
      try {
          const saved = localStorage.getItem('MOOD_SLICER_ITEMS');
          if (saved) {
              return JSON.parse(saved);
          }
      } catch (e) {
          console.error("Failed to load items", e);
      }

      const initialDefaults: Record<string, CustomUserItem[]> = {};
      const configs = getMoodConfigs('zh'); 
      (['ANGRY', 'SAD', 'HAPPY'] as MoodType[]).forEach(m => {
          if (m !== 'AI_GENERATED') {
              initialDefaults[m] = configs[m].items.filter(i => !i.isBomb).map(i => ({
                  id: `default-${m}-${i.name}`,
                  text: i.name,
                  emoji: i.emoji,
                  color: i.color
              }));
          }
      });
      initialDefaults['AI_GENERATED'] = [];
      return initialDefaults;
  });

  useEffect(() => {
      localStorage.setItem('MOOD_SLICER_ITEMS', JSON.stringify(moodCustomItems));
  }, [moodCustomItems]);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          if (window.location.hash === '#game') {
               setTimeout(() => {
                   const el = document.getElementById('game-area');
                   if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
               }, 300); 
          }
      }
  }, []);
  
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [isGeneratingLevel, setIsGeneratingLevel] = useState(false);

  const currentCustomItems = moodCustomItems[currentMood] || [];
  const t = TRANSLATIONS[language];
  const displayedTestimonials = t.testimonials.list;

  useEffect(() => {
      if (currentMood !== 'AI_GENERATED') {
          const newConfig = getMoodConfigs(language)[currentMood];
          setCurrentLevelConfig(newConfig);
          if (!moodCustomItems[currentMood] || moodCustomItems[currentMood].length === 0) {
             const defaultItems = newConfig.items.filter(i => !i.isBomb).map(i => ({
                 id: `default-${currentMood}-${i.name}`,
                 text: i.name,
                 emoji: i.emoji,
                 color: i.color
             }));
             setMoodCustomItems(prev => ({ ...prev, [currentMood]: defaultItems }));
          }
      }
  }, [language, currentMood]);

  const handleSetCustomItems = (items: CustomUserItem[]) => setMoodCustomItems(prev => ({ ...prev, [currentMood]: items }));
  const handleClearItems = () => setMoodCustomItems(prev => ({ ...prev, [currentMood]: [] }));

  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsStealthMode(prev => !prev); };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleStealthToggle = () => setIsStealthMode(true);
  const handleStealthRestore = () => setIsStealthMode(false);

  const handleMoodSelect = (mood: MoodType) => {
      setCurrentMood(mood);
      if (mood !== 'AI_GENERATED') {
          const config = getMoodConfigs(language)[mood];
          setCurrentLevelConfig(config);
          if (!moodCustomItems[mood] || moodCustomItems[mood].length === 0) {
              const defaultItems = config.items.filter(i => !i.isBomb).map(i => ({
                  id: `default-${mood}-${i.name}`,
                  text: i.name,
                  emoji: i.emoji,
                  color: i.color
              }));
              setMoodCustomItems(prev => ({ ...prev, [mood]: defaultItems }));
          }
      }
      setStatus(GameStatus.LOBBY); 
  };

  const handleGenerateLevel = async (prompt: string) => {
      setIsGeneratingLevel(true);
      try {
          const config = await generateLevelFromPrompt(prompt, language);
          setCurrentLevelConfig(config);
          const aiItems = await expandPromptToItems(prompt);
          setMoodCustomItems(prev => ({ ...prev, 'AI_GENERATED': aiItems }));
      } finally { setIsGeneratingLevel(false); }
  };

  const handleGenerateLevelFromImage = async (base64Image: string) => {
      setIsGeneratingLevel(true);
      try {
          const config = await generateLevelFromImage(base64Image, language);
          setCurrentLevelConfig(config);
          const aiItems = config.items.filter(item => !item.isBomb).map(item => ({
                 id: `ai-${item.name}-${Math.random()}`, text: item.name, emoji: item.emoji, color: item.color
          }));
          setMoodCustomItems(prev => ({ ...prev, 'AI_GENERATED': aiItems }));
      } finally { setIsGeneratingLevel(false); }
  };

  const handleStart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStats({ score: 0, maxCombo: 0, caloriesBurned: 0, ventValue: 0, happinessIncrease: 0, slicedItemCounts: {} });
    setStatus(GameStatus.PLAYING);
  };

  const handleBackToMenu = () => {
    setStats({ score: 0, maxCombo: 0, caloriesBurned: 0, ventValue: 0, happinessIncrease: 0, slicedItemCounts: {} });
    setStatus(GameStatus.IDLE);
  };
  
  const handleSubmitTestimonial = (testimonial: Testimonial) => {
      // setUserTestimonials(prev => [testimonial, ...prev]);
  };

  const handleStatsUpdate = useCallback((newStats: GameStats) => setStats(newStats), []);
  const handleGameOver = useCallback(async () => setStatus(GameStatus.GAME_OVER), []);
  const toggleLanguage = () => setLanguage(prev => prev === 'zh' ? 'en' : 'zh');

  const getLinkUrl = (view: string) => {
      if (typeof window === 'undefined') return '#';
      return `${window.location.origin}${window.location.pathname}#${view}`;
  };

  const handleViewAllArticles = () => {
      setCurrentView('BLOG_LIST');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
      setCurrentView('HOME');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    {isStealthMode && <div onDoubleClick={handleStealthRestore} className="fixed inset-0 z-[9999]"><StealthScreen language={language} /></div>}

    {/* Main App Container - Theme: Soft Green (#e6fbe3) */}
    <div className="min-h-screen w-full flex flex-col font-sans bg-[#e6fbe3] text-slate-600 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden">
      
      {/* Subtle Grain Texture for "Paper" feel */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`}}></div>

      {/* Navbar */}
      {(status === GameStatus.IDLE || currentView === 'BLOG_LIST') && (
      <nav className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center animate-in fade-in slide-in-from-top-4 duration-500 pointer-events-none">
          <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-full px-2 py-2 flex justify-between items-center w-auto shadow-xl shadow-emerald-900/5 pointer-events-auto ring-1 ring-white/50">
              
              <div className="flex items-center gap-2 mx-2">
                  <a 
                    href={getLinkUrl('game')}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[#1a3c34] hover:bg-emerald-900 text-emerald-50 text-xs font-bold transition-all font-tech uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-emerald-900/10 no-underline"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    {t.nav.startGame}
                  </a>
                  
                  <a 
                    href={getLinkUrl('blog')}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-transparent hover:bg-white/50 text-emerald-900/70 hover:text-emerald-900 text-xs font-bold transition-colors font-tech uppercase tracking-wider flex items-center gap-2 no-underline"
                  >
                    <BookOpen className="w-3 h-3" />
                    {t.nav.blog}
                  </a>
              </div>

              <div className="w-px h-4 bg-emerald-900/10 mx-1"></div>

              <button 
                onClick={toggleLanguage}
                className="w-9 h-9 rounded-full flex items-center justify-center text-emerald-900/40 hover:text-emerald-900 hover:bg-white/60 transition-colors"
                title="Switch Language"
              >
                <Globe className="w-4 h-4" />
              </button>
          </div>
      </nav>
      )}

      {/* Render View Based on State */}
      {currentView === 'BLOG_LIST' ? (
          <BlogListPage lang={language} onBack={handleBackToHome} />
      ) : (
      /* LANDING PAGE VIEW */
      <>
      {/* HERO SECTION - Base Green */}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 pt-32 lg:pt-24 pb-12">
          <div className="w-full max-w-[1400px] flex flex-col items-center">
            
            {/* SEO Heading - Cleaned Up Typography */}
            <article className={`mb-10 text-center transition-all duration-700 ${status === GameStatus.PLAYING ? 'opacity-0 -translate-y-10 pointer-events-none absolute' : 'opacity-100'}`}>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1a3c34] tracking-tight mb-6 font-sans uppercase leading-[1.1]">
                 {t.landing.seoTitle}
              </h1>
              <p className="text-lg md:text-xl text-emerald-800/70 max-w-4xl mx-auto leading-relaxed font-medium font-sans">
                 <MarkdownRenderer content={t.landing.seoContent} />
              </p>
            </article>

            {/* DATA DASHBOARD SECTION - Clean Glass Capsule */}
            <div className={`w-full flex justify-center transition-all duration-700 ${status === GameStatus.PLAYING ? 'opacity-0 -translate-y-10 pointer-events-none absolute' : 'opacity-100'}`}>
                <LiveGlobalStats lang={language} />
            </div>

            {/* Game Container - The "Monolith" */}
            <div id="game-area" className={`relative w-full max-w-[1024px] aspect-[4/3] transition-all duration-700 ease-in-out ${status === GameStatus.PLAYING ? 'scale-100 lg:scale-110 z-40' : 'hover:scale-[1.01]'}`}>
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-[2.8rem] opacity-20 blur-3xl transition-opacity duration-500 ${status === GameStatus.PLAYING ? 'opacity-40' : 'opacity-20'}`}></div>
              
              <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/50 shadow-2xl bg-[#e6fbe3] ring-1 ring-black/5">
                  <GameCanvas 
                    status={status}
                    inputMode={inputMode}
                    levelConfig={currentLevelConfig}
                    customItems={currentCustomItems}
                    onStatsUpdate={handleStatsUpdate}
                    onGameOver={handleGameOver}
                    language={language}
                    sensitivity={sensitivity}
                  />
                  <UIOverlay 
                    status={status}
                    inputMode={inputMode}
                    stats={stats}
                    customItems={currentCustomItems}
                    currentMood={currentMood}
                    currentLevelConfig={currentLevelConfig}
                    setCustomItems={handleSetCustomItems}
                    onClearItems={handleClearItems}
                    onMoodSelect={handleMoodSelect}
                    onGenerateLevel={handleGenerateLevel}
                    onGenerateLevelFromImage={handleGenerateLevelFromImage}
                    isGeneratingLevel={isGeneratingLevel}
                    setInputMode={setInputMode}
                    onStart={handleStart}
                    onRestart={handleStart}
                    onHome={handleBackToMenu}
                    onGameOver={handleGameOver}
                    onStealth={handleStealthToggle}
                    onSubmitTestimonial={handleSubmitTestimonial}
                    language={language}
                    sensitivity={sensitivity}
                    setSensitivity={setSensitivity}
                  />
              </div>
            </div>
            
            {/* Scroll Hint */}
            {status === GameStatus.IDLE && (
                <div className="mt-16 flex flex-col items-center gap-2 animate-bounce opacity-30">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-emerald-900">Scroll to Explore</span>
                    <div className="w-px h-8 bg-gradient-to-b from-emerald-900 to-transparent"></div>
                </div>
            )}
          </div>
      </main>

      <div className="bg-white py-12">
           <AdSlot label={t.ads.sponsored} className="mx-auto" />
      </div>

      {/* GAME MODES (Core Gameplay) - WHITE (#ffffff) */}
      <GameModesOverview lang={language} />

      {/* FEATURES SECTION (Core Features) - MOVED HERE & MINT (#f0fdf4) */}
      <section id="features" className="py-32 px-6 relative z-10 bg-[#f0fdf4]">
          <div className="max-w-7xl mx-auto">
              <SectionHeader center icon={Sparkles} title={t.landing.featuresTitle} subtitle={t.landing.subtitle_features} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.landing.features.map((feature, i) => {
                      const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                      return (
                      <div key={i} className="group bg-white border border-emerald-50 p-10 rounded-[2rem] transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-lg hover:bg-white hover:-translate-y-1">
                          <div className="relative z-10">
                              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 text-[#1a3c34] border border-emerald-100 group-hover:scale-110 transition-transform group-hover:bg-[#1a3c34] group-hover:text-emerald-50 group-hover:border-[#1a3c34] shadow-sm">
                                  <Icon className="w-6 h-6" />
                              </div>
                              <h3 className="text-2xl font-bold text-[#1a3c34] mb-4 font-sans uppercase tracking-tight">{feature.title}</h3>
                              <p className="text-slate-500 text-sm leading-relaxed font-sans font-medium">{feature.desc}</p>
                          </div>
                      </div>
                  )})}
              </div>
          </div>
      </section>

      {/* TESTIMONIALS SECTION - MOVED HERE & WHITE (#ffffff) */}
      <TestimonialsSection id="testimonials" lang={language} testimonials={displayedTestimonials} />

      {/* GALLERY (Emotion Gallery) - MINT (#f0fdf4) */}
      <GamePropsGallery lang={language} />

      {/* PHILOSOPHY SECTION - WHITE (#ffffff) - Changed from Mint */}
      <section className="py-32 px-6 relative z-10 bg-white">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
              <div>
                  <SectionHeader icon={Brain} title={t.workplace.subtitle} subtitle={t.workplace.title} />
                  <p className="text-lg text-emerald-900/70 mb-10 leading-relaxed font-medium font-sans">
                      <MarkdownRenderer content={t.workplace.intro} />
                  </p>
                  
                  <div className="space-y-6">
                      <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl shadow-sm">
                          <h4 className="font-bold text-[#1a3c34] mb-3 text-xs uppercase tracking-widest font-tech">{t.workplace.designPhilosophy}</h4>
                          <p className="text-slate-600 text-sm font-sans font-medium leading-relaxed">{t.workplace.philosophy}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                           {t.workplace.wellnessTips.map((tip, idx) => (
                              <div key={idx} className="bg-slate-50 border border-slate-100 p-6 rounded-2xl hover:bg-white hover:shadow-sm transition-all">
                                  <div className="font-bold text-[#1a3c34] text-xs mb-2 font-tech uppercase">{tip.title}</div>
                                  <div className="text-[10px] text-emerald-800/60 font-sans font-bold leading-snug">{tip.desc}</div>
                              </div>
                           ))}
                      </div>
                  </div>
              </div>

              {/* Visual Props Grid */}
              <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-[3rem] blur-3xl opacity-5"></div>
                  <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 relative overflow-hidden shadow-xl">
                       <div className="grid grid-cols-2 gap-4 mb-10">
                          {t.workplace.painPoints.map((point, i) => (
                              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-all group cursor-default">
                                  <div className="text-4xl group-hover:scale-110 transition-transform filter drop-shadow-sm">{point.icon}</div>
                                  <div className="text-xs font-bold text-slate-400 group-hover:text-[#1a3c34] font-tech uppercase tracking-wide">{point.text}</div>
                              </div>
                          ))}
                       </div>
                       <button onClick={handleStart} className="w-full bg-[#1a3c34] hover:bg-emerald-900 text-emerald-50 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 font-tech uppercase tracking-widest text-sm shadow-lg shadow-emerald-900/20">
                           <Battery className="w-4 h-4" /> {t.workplace.startVenting}
                       </button>
                  </div>
              </div>
          </div>
      </section>

      {/* BLOG SECTION - MINT (#f0fdf4) - Changed from White */}
      <BlogSection id="blog" lang={language} onViewAll={handleViewAllArticles} />

      {/* HOW TO PLAY SECTION - WHITE (#ffffff) */}
      <section className="py-32 px-6 relative z-10 bg-white">
          <div className="max-w-7xl mx-auto">
              <SectionHeader center icon={Video} title={t.landing.howToPlay} subtitle={t.landing.subtitle_howToPlay} />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.landing.steps.map((step, i) => (
                      <div key={i} className="bg-slate-50 border border-slate-100 p-10 rounded-[2.5rem] hover:bg-white hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                          {/* Number Background */}
                          <div className="absolute -right-6 -bottom-6 text-9xl font-black text-slate-200/50 group-hover:text-emerald-900/5 transition-colors select-none font-tech">
                              {i + 1}
                          </div>
                          
                          <div className="relative z-10">
                              <div className="w-12 h-12 bg-[#1a3c34] rounded-2xl flex items-center justify-center text-emerald-50 font-black mb-8 shadow-lg shadow-emerald-900/10 group-hover:scale-110 transition-transform font-tech text-xl">
                                  {i + 1}
                              </div>
                              <p className="text-slate-600 font-medium leading-relaxed font-sans">
                                  {step}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FAQ SECTION - MINT (#f0fdf4) */}
      <section className="py-32 px-6 relative z-10 bg-[#f0fdf4]">
          <div className="max-w-4xl mx-auto">
              <SectionHeader center icon={HelpCircle} title={t.landing.faqTitle} subtitle={t.landing.subtitle_faq} />
              
              <div className="grid gap-4">
                  {t.landing.faq.map((item, i) => (
                      <div key={i} className="bg-white border border-emerald-100 p-8 md:p-10 rounded-[2rem] hover:shadow-lg transition-all group shadow-sm">
                          <h3 className="text-xl font-bold text-[#1a3c34] mb-4 flex items-start gap-4 font-sans tracking-wide uppercase">
                              <span className="text-emerald-500 font-mono">Q.</span>
                              {item.q}
                          </h3>
                          <div className="pl-8">
                              <p className="text-slate-600 leading-relaxed border-l-2 border-emerald-100 pl-6 font-sans font-medium">
                                  {item.a}
                              </p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 bg-white border-t border-emerald-100">
          <div className="max-w-6xl mx-auto text-center text-sm text-emerald-900/60 font-sans">
              © 2025 MoodSlider.top – Free AI Mood Slider Game. Slide your mood, slice your stress. Privacy-safe, no signup.
          </div>
      </footer>
      </>
      )}

    </div>
    </>
  );
};

export default App;
