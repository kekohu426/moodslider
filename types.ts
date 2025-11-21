
export enum GameStatus {
  IDLE = 'IDLE',
  LOBBY = 'LOBBY',
  PLAYING = 'PLAYING',
  GAME_OVER = 'GAME_OVER'
}

export type MoodType = 'ANGRY' | 'SAD' | 'HAPPY' | 'AI_GENERATED';
export type Language = 'zh' | 'en';

export type InteractionType = 'SLICE' | 'COLLECT';
export type VisualTheme = 'DESTRUCTION' | 'SAD_RAIN' | 'UNDERWATER' | 'DEFAULT';
export type InputMode = 'CAMERA' | 'MOUSE';

export interface ItemType {
  name: string;
  emoji: string;
  color: string;
  points: number;
  isBomb: boolean;
}

export interface CustomUserItem {
  id: string;
  text: string;
  emoji: string;
  color?: string; // Optional: if derived from default items
}

export interface LevelConfig {
    label: string;
    description: string;
    buttonText: string; // New: Custom button text per mode
    themeColor: string;
    gradient: string;
    bgStyle: string;
    interactionType: InteractionType; // New: Slice vs Collect
    visualTheme: VisualTheme; // New: Particle/Trail effects
    musicBpm: number;
    musicTheme: 'HEAVY_METAL' | 'LO_FI' | 'ARCADE' | 'DEFAULT';
    items: ItemType[];
    impactWords?: string[]; // New: Custom words that appear when slicing (e.g., "爽!", "滚!")
}

export interface GameItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  type: ItemType;
  emoji: string;
  color: string;
  sliced: boolean;
  collected: boolean; // New state for collection mode
  scale: number; // New for animation
  opacity: number; // New for animation
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  type: 'shard' | 'bubble' | 'star'; // New: Different particle shapes
}

export interface Debris {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  emoji: string;
  side: 'left' | 'right';
  life: number;
}

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  life: number;
  vx: number;
  vy: number;
  color: string;
  scale: number;
}

export interface SliceLogItem {
    id: number;
    text: string;
    emoji: string;
    color: string;
    life: number;
}

export interface CoachFeedback {
  message: string;
  badge: string;
}

export interface GameStats {
  score: number;
  maxCombo: number;
  caloriesBurned: number;
  ventValue: number;
  happinessIncrease: number;
  slicedItemCounts: Record<string, { count: number, emoji: string }>;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string; // e.g., "Score: 1200" or "Designer"
    avatar: string;
    text: string;
    rating: number;
    isVerified?: boolean; // True for hardcoded/admin selected, false for user submitted
    timestamp?: number;
    ip?: string;        // New: Fake IP for realism
    location?: string;  // New: Fake location
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML/Markdown content
    date: string;
    author: string;
    readTime: string;
    category: string;
    image: string; // Emoji or URL
    tags: string[];
}