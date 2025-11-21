
import React, { useState, useRef, useEffect } from 'react';
import { GameStatus, MoodType, GameStats, LevelConfig, CustomUserItem, InputMode, Language, Testimonial } from '../types';
import { Play, RotateCcw, Sparkles, Video, Loader2, ChevronRight, Share2, Coffee, Check, ArrowLeft, MousePointer, Upload, LayoutGrid, BatteryCharging, Zap, X, Plus, Trash2, Download, Copy, Twitter, Facebook, Square, Link as LinkIcon, Star, Send, User, Sliders } from 'lucide-react';
import { TRANSLATIONS } from '../constants';
import { suggestEmojiForText } from '../services/geminiService';

interface UIOverlayProps {
  status: GameStatus;
  inputMode: InputMode;
  stats: GameStats;
  customItems: CustomUserItem[];
  currentMood: MoodType;
  currentLevelConfig: LevelConfig;
  setCustomItems: (items: CustomUserItem[]) => void;
  onClearItems: () => void;
  onMoodSelect: (mood: MoodType) => void;
  onGenerateLevel: (prompt: string) => void;
  onGenerateLevelFromImage: (base64: string) => void;
  isGeneratingLevel: boolean;
  setInputMode: (mode: InputMode) => void;
  onStart: () => void;
  onRestart: () => void;
  onHome: () => void;
  onGameOver: () => void;
  onStealth: () => void;
  onSubmitTestimonial: (t: Testimonial) => void;
  language: Language;
  sensitivity?: number;
  setSensitivity?: (val: number) => void;
}

const EyeOffIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
);

const UIOverlay: React.FC<UIOverlayProps> = ({
  status,
  inputMode,
  stats,
  customItems,
  currentMood,
  currentLevelConfig,
  setCustomItems,
  onClearItems,
  onMoodSelect,
  onGenerateLevel,
  onGenerateLevelFromImage,
  isGeneratingLevel,
  setInputMode,
  onStart,
  onRestart,
  onHome,
  onGameOver,
  onStealth,
  onSubmitTestimonial,
  language,
  sensitivity = 25,
  setSensitivity
}) => {
    const [aiPrompt, setAiPrompt] = useState("");
    const [aiMode, setAiMode] = useState<'TEXT' | 'IMAGE'>('TEXT');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [newItemText, setNewItemText] = useState("");
    const [copied, setCopied] = useState(false);
    
    const t = TRANSLATIONS[language];

    // Robust Copy to Clipboard
    const copyToClipboard = async (text: string) => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                setCopied(true);
            } else {
                throw new Error("Clipboard API unavailable");
            }
        } catch (err) {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = text;
                textArea.style.top = "0";
                textArea.style.left = "0";
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                if (successful) setCopied(true);
            } catch (fallbackErr) {
                console.error('Fallback: Oops, unable to copy', fallbackErr);
            }
        }
        setTimeout(() => setCopied(false), 2000);
    };

    const generateSEOLink = () => 'https://moodslicer.app';

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setSelectedImage(base64);
                onGenerateLevelFromImage(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddItem = async () => {
        if (!newItemText.trim()) return;
        const emoji = await suggestEmojiForText(newItemText);
        const newItem: CustomUserItem = {
            id: Date.now().toString(),
            text: newItemText,
            emoji: emoji
        };
        setCustomItems([...customItems, newItem]);
        setNewItemText("");
    };

    const handleRemoveItem = (id: string) => {
        setCustomItems(customItems.filter(i => i.id !== id));
    };

    // --- RENDER HELPERS ---

    const renderMoodSelector = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e6fbe3]/90 backdrop-blur-md pointer-events-auto p-4">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-block p-3 rounded-2xl bg-white/40 border border-emerald-100/50 mb-4 backdrop-blur-sm shadow-sm">
                    <Sparkles className="w-8 h-8 text-emerald-500 animate-pulse" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-[#1a3c34] mb-4 font-sans tracking-tighter uppercase">
                    {t.title}
                </h1>
                <p className="text-lg text-emerald-800/60 font-medium tracking-wide font-sans">{t.selectMode}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl px-4">
                {(['ANGRY', 'SAD', 'HAPPY', 'AI'] as const).map((mood, index) => (
                    <button
                        key={mood}
                        onClick={() => onMoodSelect(mood === 'AI' ? 'AI_GENERATED' : mood)}
                        className="group relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10 border border-white/50 hover:border-emerald-300/50 bg-white/40 backdrop-blur-lg"
                    >
                        {/* Content Container */}
                        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 z-10">
                            
                            {/* Header */}
                            <div className="w-full flex justify-between items-start opacity-50 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black font-tech tracking-widest text-emerald-800/60 border border-emerald-800/20 px-3 py-1 rounded-full bg-white/30">0{index+1}</span>
                                <div className={`w-2 h-2 rounded-full ${
                                    mood === 'ANGRY' ? 'bg-red-500' :
                                    mood === 'SAD' ? 'bg-blue-500' :
                                    mood === 'HAPPY' ? 'bg-emerald-500' :
                                    'bg-purple-500'
                                }`}></div>
                            </div>

                            {/* Center Emoji */}
                            <div className="text-7xl md:text-8xl transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md grayscale-[0.2] group-hover:grayscale-0">
                                {mood === 'ANGRY' ? '🤬' : mood === 'SAD' ? '🌧️' : mood === 'HAPPY' ? '🐠' : '🧠'}
                            </div>

                            {/* Bottom Text */}
                            <div className="text-center w-full">
                                <h3 className="text-2xl font-bold text-[#1a3c34] mb-2 font-sans uppercase tracking-tight group-hover:text-emerald-700 transition-all">
                                    {t.modes[mood].label}
                                </h3>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-mono font-bold h-8 line-clamp-2 uppercase tracking-wide">{t.modes[mood].desc}</p>
                                
                                <div className="mt-6 w-full h-12 flex items-center justify-center rounded-2xl bg-white/50 border border-white/60 text-[#1a3c34] text-[10px] font-black uppercase tracking-widest group-hover:bg-[#1a3c34] group-hover:text-white transition-all shadow-sm">
                                    {t.playNow}
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Stealth Button */}
            <button 
                onClick={onStealth}
                className="absolute bottom-8 right-8 text-emerald-800/40 hover:text-emerald-900 transition-colors flex items-center gap-2 text-[10px] uppercase tracking-widest font-mono font-bold"
            >
                <EyeOffIcon className="w-4 h-4" />
                Boss Key (Esc)
            </button>
        </div>
    );

    const renderLobby = () => (
        <div className="absolute inset-0 flex flex-col bg-[#e6fbe3]/95 backdrop-blur-2xl pointer-events-auto text-[#333333] animate-in fade-in duration-300 z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-emerald-900/5">
                <button onClick={onHome} className="flex items-center gap-2 text-emerald-800/60 hover:text-[#1a3c34] transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-tech font-bold uppercase tracking-widest text-xs">{t.menu}</span>
                </button>
                <div className="text-center">
                    <h2 className={`text-4xl font-black tracking-tighter text-transparent bg-clip-text font-sans uppercase italic ${
                        currentMood === 'ANGRY' ? 'bg-gradient-to-r from-red-600 to-orange-600' :
                        currentMood === 'SAD' ? 'bg-gradient-to-r from-blue-600 to-indigo-600' :
                        currentMood === 'HAPPY' ? 'bg-gradient-to-r from-emerald-600 to-teal-600' :
                        'bg-gradient-to-r from-purple-600 to-pink-600'
                    }`}>
                        {currentLevelConfig.label}
                    </h2>
                    <p className="text-emerald-800/50 text-[10px] mt-1 font-mono font-bold tracking-[0.2em] uppercase">{currentLevelConfig.description}</p>
                </div>
                <div className="w-24"></div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                {/* Left Panel: Configuration */}
                <div className="flex-1 p-8 overflow-y-auto border-r border-emerald-900/5 custom-scrollbar">
                    {currentMood === 'AI_GENERATED' && (
                        <div className="mb-10 bg-white/40 p-6 rounded-[2rem] border border-white/50 shadow-sm backdrop-blur-md">
                            <div className="flex gap-4 mb-6">
                                <button 
                                    onClick={() => setAiMode('TEXT')}
                                    className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 font-tech tracking-wider uppercase ${aiMode === 'TEXT' ? 'bg-[#1a3c34] text-white shadow-lg shadow-emerald-900/20' : 'bg-white/40 text-emerald-800/60 hover:bg-white/80'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" /> {t.textMode}
                                </button>
                                <button 
                                    onClick={() => setAiMode('IMAGE')}
                                    className={`flex-1 py-4 rounded-2xl font-black text-xs transition-all flex items-center justify-center gap-2 font-tech tracking-wider uppercase ${aiMode === 'IMAGE' ? 'bg-[#1a3c34] text-white shadow-lg shadow-emerald-900/20' : 'bg-white/40 text-emerald-800/60 hover:bg-white/80'}`}
                                >
                                    <Video className="w-4 h-4" /> {t.imageMode}
                                </button>
                            </div>

                            {aiMode === 'TEXT' ? (
                                <div className="space-y-4">
                                    <textarea 
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        placeholder={t.aiPlaceholder}
                                        className="w-full bg-white/50 border border-white/60 rounded-2xl p-5 text-[#1a3c34] placeholder-emerald-800/30 focus:outline-none focus:bg-white focus:border-emerald-500/50 transition-all h-32 resize-none font-mono text-sm font-medium shadow-inner"
                                    />
                                    <button 
                                        onClick={() => onGenerateLevel(aiPrompt)}
                                        disabled={!aiPrompt || isGeneratingLevel}
                                        className="w-full bg-[#1a3c34] text-white hover:bg-emerald-900 disabled:opacity-50 disabled:cursor-not-allowed py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all font-tech uppercase tracking-wider shadow-lg shadow-emerald-900/10"
                                    >
                                        {isGeneratingLevel ? <Loader2 className="animate-spin" /> : <Sparkles className="w-4 h-4" />}
                                        {isGeneratingLevel ? t.ui.thinking : t.generate}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div 
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-emerald-900/10 rounded-2xl h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-white/40 transition-colors relative overflow-hidden group bg-white/20"
                                    >
                                        {selectedImage ? (
                                            <img src={selectedImage} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                                        ) : (
                                            <>
                                                <Upload className="w-8 h-8 text-emerald-800/30 mb-4" />
                                                <p className="text-xs text-emerald-800/50 font-mono font-bold uppercase tracking-wider">{t.uploadImage}</p>
                                            </>
                                        )}
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleImageUpload}
                                        />
                                    </div>
                                    {isGeneratingLevel && (
                                        <div className="flex items-center justify-center gap-2 text-emerald-600 animate-pulse">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span className="text-xs font-mono font-bold uppercase">{t.ui.loadingAnalysis}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Mode Selection */}
                    <div className="mb-8">
                        <label className="text-[10px] font-tech text-emerald-800/40 uppercase tracking-[0.2em] mb-4 block border-b border-emerald-900/5 pb-2 font-black">{t.configTitle}</label>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button 
                                onClick={() => setInputMode('MOUSE')}
                                className={`p-6 rounded-[1.5rem] border transition-all flex flex-col items-center gap-3 ${inputMode === 'MOUSE' ? 'bg-[#1a3c34] border-[#1a3c34] text-white shadow-xl shadow-emerald-900/20' : 'bg-white/40 border-white/50 text-emerald-800/50 hover:bg-white/60'}`}
                            >
                                <MousePointer className="w-6 h-6" />
                                <span className="font-bold text-xs font-tech uppercase tracking-widest">{t.mouse}</span>
                            </button>
                            <button 
                                onClick={() => setInputMode('CAMERA')}
                                className={`p-6 rounded-[1.5rem] border transition-all flex flex-col items-center gap-3 ${inputMode === 'CAMERA' ? 'bg-[#1a3c34] border-[#1a3c34] text-white shadow-xl shadow-emerald-900/20' : 'bg-white/40 border-white/50 text-emerald-800/50 hover:bg-white/60'}`}
                            >
                                <Video className="w-6 h-6" />
                                <span className="font-bold text-xs font-tech uppercase tracking-widest">{t.camera}</span>
                            </button>
                        </div>
                        
                        {/* Motion Sensitivity Slider */}
                        {inputMode === 'CAMERA' && setSensitivity && (
                            <div className="bg-white/40 border border-white/50 rounded-2xl p-5 shadow-sm backdrop-blur-sm">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[10px] font-black text-emerald-800/70 flex items-center gap-2 font-tech uppercase tracking-wider">
                                        <Sliders className="w-3 h-3" /> {language === 'zh' ? '体感灵敏度' : 'Motion Sensitivity'}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-100/50 px-2 py-1 rounded">
                                        {sensitivity < 15 ? (language === 'zh' ? '极高' : 'High') : sensitivity > 35 ? (language === 'zh' ? '低' : 'Low') : (language === 'zh' ? '中' : 'Med')}
                                    </span>
                                </div>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="50" 
                                    step="1" 
                                    value={sensitivity} 
                                    onChange={(e) => setSensitivity(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-emerald-900/10 rounded-lg appearance-none cursor-pointer accent-[#1a3c34]"
                                />
                                <div className="flex justify-between mt-2 text-[9px] text-emerald-800/40 font-mono font-bold uppercase">
                                    <span>High (Sensitive)</span>
                                    <span>Low (Stable)</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Add Custom Items */}
                    <div>
                         <div className="flex justify-between items-center mb-4 border-b border-emerald-900/5 pb-2">
                            <label className="text-[10px] font-tech text-emerald-800/40 uppercase tracking-[0.2em] font-black">{t.suggestions}</label>
                            <button onClick={onClearItems} className="text-[10px] text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors font-mono font-bold uppercase">
                                <Trash2 className="w-3 h-3" /> {t.clear}
                            </button>
                         </div>
                         
                         <div className="flex gap-2 mb-4">
                             <input 
                                type="text" 
                                value={newItemText}
                                onChange={(e) => setNewItemText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                                placeholder={t.inputPlaceholder}
                                className="flex-1 bg-white/60 border border-white/50 rounded-2xl px-5 py-3 text-sm text-[#1a3c34] font-bold focus:outline-none focus:bg-white transition-all font-mono backdrop-blur-sm placeholder-emerald-800/30"
                             />
                             <button 
                                onClick={handleAddItem}
                                disabled={!newItemText.trim()}
                                className="bg-[#1a3c34] text-white hover:bg-emerald-900 p-3 rounded-2xl disabled:opacity-50 transition-colors shadow-md"
                             >
                                 <Plus className="w-5 h-5" />
                             </button>
                         </div>

                         <div className="flex flex-wrap gap-2">
                             {customItems.map(item => (
                                 <div key={item.id} className="group flex items-center gap-2 bg-white/60 border border-white/50 pl-3 pr-2 py-2 rounded-full hover:bg-white transition-all animate-in zoom-in duration-200 shadow-sm backdrop-blur-sm">
                                     <span className="text-lg filter drop-shadow-sm">{item.emoji}</span>
                                     <span className="text-[10px] font-black text-[#1a3c34] font-tech uppercase tracking-wider">{item.text}</span>
                                     <button 
                                        onClick={() => handleRemoveItem(item.id)}
                                        className="ml-1 w-5 h-5 rounded-full bg-emerald-900/5 flex items-center justify-center text-emerald-800/40 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                                     >
                                         <X className="w-3 h-3" />
                                     </button>
                                 </div>
                             ))}
                             {customItems.length === 0 && (
                                 <div className="text-emerald-800/40 text-xs font-bold uppercase tracking-wider w-full text-center py-6 border-2 border-dashed border-emerald-900/5 rounded-2xl font-mono">
                                     {t.addItemsFirst}
                                 </div>
                             )}
                         </div>
                    </div>
                </div>

                {/* Right Panel: Preview & Start */}
                <div className="w-full md:w-1/3 bg-white/20 p-8 flex flex-col justify-center relative overflow-hidden border-l border-white/40 backdrop-blur-md">
                     <div className="relative z-10 text-center">
                         <div className="w-24 h-24 rounded-[2rem] bg-white/60 border border-white/60 mx-auto mb-8 flex items-center justify-center shadow-xl backdrop-blur-md">
                             <div className="text-6xl animate-bounce filter drop-shadow-md grayscale-[0.2]">
                                 {currentMood === 'ANGRY' ? '🔥' : currentMood === 'SAD' ? '💧' : currentMood === 'HAPPY' ? '⚡' : '🤖'}
                             </div>
                         </div>
                         
                         <h3 className="text-emerald-900/40 font-black text-[10px] mb-4 font-tech uppercase tracking-[0.2em]">{t.activeItems}</h3>
                         <div className="flex justify-center -space-x-3 mb-12 pl-3">
                             {customItems.slice(0, 5).map((item, i) => (
                                 <div key={i} className="w-12 h-12 rounded-full bg-white/90 border-2 border-white flex items-center justify-center text-xl shadow-lg z-10 relative backdrop-blur-sm transform hover:-translate-y-1 transition-transform duration-300">
                                     {item.emoji}
                                 </div>
                             ))}
                             {customItems.length > 5 && (
                                 <div className="w-12 h-12 rounded-full bg-emerald-100/90 border-2 border-white flex items-center justify-center text-[10px] font-black text-emerald-700 z-0 font-mono backdrop-blur-sm">
                                     +{customItems.length - 5}
                                 </div>
                             )}
                         </div>

                         <button 
                            onClick={onStart}
                            className="w-full group relative px-8 py-6 bg-[#1a3c34] text-white rounded-[2rem] font-black text-xl tracking-widest overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-900/20 font-tech uppercase"
                         >
                             <span className="relative z-10 flex items-center justify-center gap-3">
                                 {currentLevelConfig.buttonText} <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                             </span>
                         </button>
                         
                         <p className="mt-6 text-[10px] text-emerald-800/40 font-mono font-bold uppercase tracking-wider">
                             {inputMode === 'CAMERA' ? t.ui.cameraReq : t.ui.mouseReq}
                         </p>
                     </div>
                </div>
            </div>
        </div>
    );

    const renderGameOver = () => {
        const shareUrl = generateSEOLink();
        const shareMessage = `${t.shareText.replace('{score}', stats.score.toString())} #MoodSlicer #StressRelief ${shareUrl}`;

        return (
            <div className="absolute inset-0 bg-[#e6fbe3]/95 backdrop-blur-3xl z-50 pointer-events-auto animate-in fade-in zoom-in duration-300 overflow-y-auto custom-scrollbar">
                <div className="min-h-full flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full space-y-6">
                    {/* Header */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-[#1a3c34] text-4xl shadow-xl shadow-emerald-900/20 mb-6 text-emerald-400 border border-emerald-800">
                            🏆
                        </div>
                        <h2 className="text-4xl font-black text-[#1a3c34] mb-2 tracking-tighter font-sans uppercase">{t.sessionReport}</h2>
                        <p className="text-emerald-800/50 font-mono text-[10px] font-bold uppercase tracking-widest">{new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/50 backdrop-blur-lg border border-white/60 rounded-[2rem] p-6 text-center shadow-sm">
                            <div className="text-[10px] font-black font-tech text-emerald-800/40 uppercase mb-2 tracking-[0.2em]">{t.score}</div>
                            <div className="text-5xl font-black text-[#1a3c34] font-tech tracking-tighter">{stats.score}</div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-lg border border-white/60 rounded-[2rem] p-6 text-center shadow-sm">
                            <div className="text-[10px] font-black font-tech text-emerald-800/40 uppercase mb-2 tracking-[0.2em]">{t.maxCombo}</div>
                            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-emerald-600 to-teal-600 font-tech tracking-tighter">{stats.maxCombo}x</div>
                        </div>
                        <div className="bg-white/50 backdrop-blur-lg border border-white/60 rounded-[2rem] p-6 text-center col-span-2 flex justify-between items-center px-8 shadow-sm">
                             <div className="text-left">
                                 <div className="text-[10px] font-black font-tech text-emerald-800/40 uppercase mb-1 tracking-[0.2em]">{t.energy}</div>
                                 <div className="text-2xl font-black text-[#1a3c34] flex items-center gap-2 font-tech">
                                     <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" /> {stats.caloriesBurned} <span className="text-xs text-emerald-800/40 font-bold">KCAL</span>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className="text-[10px] font-black font-tech text-emerald-800/40 uppercase mb-1 tracking-[0.2em]">{t.mood}</div>
                                 <div className="text-2xl font-black text-emerald-600 flex items-center gap-2 font-tech">
                                     +{stats.happinessIncrease}% <BatteryCharging className="w-5 h-5" />
                                 </div>
                             </div>
                        </div>
                    </div>
                    
                    {/* Share Link Display */}
                    <div className="bg-white/40 p-4 rounded-2xl border border-white/50 relative group shadow-sm backdrop-blur-md">
                        <div className="flex items-center gap-2 mb-2">
                             <LinkIcon className="w-3 h-3 text-emerald-800/40" />
                             <p className="text-[10px] text-emerald-800/40 uppercase font-mono font-bold tracking-wider">Share Link</p>
                        </div>
                        <textarea 
                            readOnly 
                            value={shareMessage}
                            className="w-full bg-transparent text-emerald-900/80 text-xs font-mono outline-none resize-none selection:bg-emerald-200 font-medium custom-scrollbar"
                            rows={2}
                            onClick={(e) => e.currentTarget.select()}
                        />
                        <button 
                            onClick={() => copyToClipboard(shareMessage)}
                            className="w-full mt-3 py-3 bg-[#1a3c34] hover:bg-emerald-900 text-white rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20 active:scale-95 text-xs font-tech uppercase tracking-widest"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                            {copied ? t.copied : t.share}
                        </button>
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex gap-4 pt-2">
                             <button 
                                onClick={onRestart}
                                className="flex-1 py-4 bg-white hover:bg-emerald-50 border border-white/60 text-[#1a3c34] rounded-[1.5rem] font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm font-tech uppercase tracking-wider text-sm"
                            >
                                <RotateCcw className="w-4 h-4" /> {t.playAgain}
                            </button>
                             <button 
                                onClick={onHome}
                                className="flex-1 py-4 bg-white hover:bg-emerald-50 border border-white/60 text-[#1a3c34] rounded-[1.5rem] font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm font-tech uppercase tracking-wider text-sm"
                            >
                                <LayoutGrid className="w-4 h-4" /> {t.menu}
                            </button>
                    </div>
                </div>
                </div>
            </div>
        );
    };

    return (
        <div className="absolute inset-0 pointer-events-none z-50 flex flex-col h-full w-full rounded-[2rem] overflow-hidden font-sans">
            {status === GameStatus.IDLE && renderMoodSelector()}
            {status === GameStatus.LOBBY && renderLobby()}
            {status === GameStatus.GAME_OVER && renderGameOver()}
            
            {/* Playing Overlay */}
            {status === GameStatus.PLAYING && (
                <>
                    <div className="absolute top-6 left-6 pointer-events-auto z-40">
                        <button 
                            onClick={onHome}
                            className="w-12 h-12 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md text-white hover:text-[#1a3c34] flex items-center justify-center transition-colors border border-white/30 shadow-sm"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <div className="absolute bottom-6 left-6 pointer-events-auto z-40 flex gap-4">
                        <button 
                            onClick={onGameOver}
                            className="px-6 py-3 rounded-full bg-red-500/20 hover:bg-red-500/40 backdrop-blur-md text-red-100 hover:text-white border border-red-500/30 font-black text-xs flex items-center gap-2 transition-colors font-tech uppercase tracking-widest"
                        >
                            <Square className="w-3 h-3 fill-current" />
                            {language === 'zh' ? '结束' : 'End'}
                        </button>
                    </div>
                </>
            )}

            {/* Stealth Button */}
            {status !== GameStatus.IDLE && status !== GameStatus.GAME_OVER && (
                 <div className="absolute bottom-6 right-6 pointer-events-auto z-40 opacity-30 hover:opacity-100 transition-opacity">
                     <button onClick={onStealth} className="bg-black/20 backdrop-blur-md p-4 rounded-full text-white border border-white/10 hover:bg-red-500/80 hover:text-white transition-all shadow-lg">
                         <EyeOffIcon className="w-5 h-5" />
                     </button>
                 </div>
            )}
        </div>
    );
};

export default UIOverlay;
