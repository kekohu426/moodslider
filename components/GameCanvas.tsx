import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameItem, Particle, Debris, GameStatus, GameStats, LevelConfig, CustomUserItem, InputMode, FloatingText, Language } from '../types';
import { CUSTOM_ITEM_COLORS, GRAVITY, CANVAS_WIDTH, CANVAS_HEIGHT, MOTION_THRESHOLD, TRANSLATIONS, IMPACT_WORDS } from '../constants';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface GameCanvasProps {
  status: GameStatus;
  inputMode: InputMode;
  levelConfig: LevelConfig;
  customItems: CustomUserItem[];
  onStatsUpdate: (stats: GameStats) => void;
  onGameOver: () => void;
  language: Language;
  sensitivity?: number;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ status, inputMode, levelConfig, customItems, onStatsUpdate, onGameOver, language, sensitivity = 25 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const requestRef = useRef<number>(0);
  
  // Mouse input refs
  const mousePosRef = useRef<{x: number, y: number} | null>(null);
  const lastMousePosRef = useRef<{x: number, y: number} | null>(null);

  // Camera centroid tracking for cleaner trails
  const lastCentroidRef = useRef<{x: number, y: number} | null>(null);

  const t = TRANSLATIONS[language];

  const gameStateRef = useRef({
    items: [] as GameItem[],
    particles: [] as Particle[],
    debris: [] as Debris[],
    trail: [] as {x: number, y: number, life: number}[],
    floatingTexts: [] as FloatingText[],
    score: 0,
    combo: 0,
    maxCombo: 0,
    caloriesBurned: 0,
    ventValue: 0,
    happinessIncrease: 0,
    slicedItemCounts: {} as Record<string, { count: number, emoji: string }>,
    lastFrameData: null as ImageData | null,
    lives: 3,
    timeSinceLastSpawn: 0,
    motionPixelCount: 0,
    bgAnimTimer: 0,
    lastDamageTime: 0,
    damageAlpha: 0,
    shakeIntensity: 0,
    hitStop: 0, 
  });

  const [permissionGranted, setPermissionGranted] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // --- Audio System ---
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<number | null>(null);
  const beatCountRef = useRef(0);
  const isMuted = inputMode === 'MOUSE'; 

  const initAudio = useCallback(() => {
    if (isMuted) return; 

    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
      }
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, [isMuted]);

  const playSound = useCallback((type: 'slice' | 'collect' | 'bomb' | 'throw') => {
    if (isMuted) return;
    initAudio();
    const ctx = audioContextRef.current;
    if (!ctx) return;
    
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'slice') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'collect') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.linearRampToValueAtTime(1000, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'bomb') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'throw') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  }, [initAudio, isMuted]);

  // Dynamic Mood Music
  useEffect(() => {
    if (status === GameStatus.PLAYING && !isMuted) {
      initAudio();
      beatCountRef.current = 0;
      const bpm = levelConfig.musicBpm;
      const intervalTime = (60 / bpm) * 1000; 
      const theme = levelConfig.musicTheme || 'DEFAULT';

      const playBeat = () => {
        const ctx = audioContextRef.current;
        if (!ctx) return;
        const t = ctx.currentTime;
        const beat = beatCountRef.current % 4;

        const master = ctx.createGain();
        master.connect(ctx.destination);
        master.gain.value = 0.2; 

        if (theme === 'HEAVY_METAL') {
            if (beat % 1 === 0) {
                const kick = ctx.createOscillator();
                const kg = ctx.createGain();
                kick.connect(kg);
                kg.connect(master);
                kick.frequency.setValueAtTime(150, t);
                kick.frequency.exponentialRampToValueAtTime(0.01, t + 0.2);
                kg.gain.setValueAtTime(0.8, t);
                kg.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                kick.start(t);
                kick.stop(t+0.2);
            }
        } else {
            if (beat % 2 === 0) {
                const kick = ctx.createOscillator();
                kick.type = 'sine';
                const kg = ctx.createGain();
                kick.connect(kg);
                kg.connect(master);
                kick.frequency.setValueAtTime(100, t);
                kick.frequency.exponentialRampToValueAtTime(0.01, t + 0.2);
                kg.gain.setValueAtTime(0.5, t);
                kg.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
                kick.start(t);
                kick.stop(t+0.2);
            }
        }
        beatCountRef.current++;
      };

      playBeat();
      musicIntervalRef.current = window.setInterval(playBeat, intervalTime);

    } else {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
    }

    return () => {
      if (musicIntervalRef.current) {
        clearInterval(musicIntervalRef.current);
      }
    };
  }, [status, initAudio, levelConfig, isMuted]);

  // --- Mouse Input Handlers ---
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      if (inputMode !== 'MOUSE' || status !== GameStatus.PLAYING) return;
      
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width;
      const scaleY = CANVAS_HEIGHT / rect.height;

      let clientX, clientY;
      if ('touches' in e) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
      } else {
          clientX = (e as React.MouseEvent).clientX;
          clientY = (e as React.MouseEvent).clientY;
      }

      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;

      lastMousePosRef.current = mousePosRef.current;
      mousePosRef.current = { x, y };
  };

  // --- Video Setup ---
  useEffect(() => {
    const startVideo = async () => {
      if (inputMode !== 'CAMERA') {
          setPermissionGranted(true); 
          return;
      }

      try {
        setCameraError(null);
        setPermissionGranted(false);
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 }, 
            height: { ideal: 720 },
            facingMode: "user" 
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setPermissionGranted(true);
          };
        }
      } catch (err: any) {
        console.error("Error accessing webcam:", err);
        setPermissionGranted(false);
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
            setCameraError(t.cameraErrorDesc);
        } else if (err.name === 'NotFoundError') {
            setCameraError(t.deviceError);
        } else {
            setCameraError(t.genericError);
        }
      }
    };

    startVideo();

    return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [inputMode, language, t]);

  useEffect(() => {
    if (status === GameStatus.PLAYING) {
        gameStateRef.current = {
            items: [],
            particles: [],
            debris: [],
            trail: [],
            floatingTexts: [],
            score: 0,
            combo: 0,
            maxCombo: 0,
            caloriesBurned: 0,
            ventValue: 0,
            happinessIncrease: 0,
            slicedItemCounts: {},
            lastFrameData: null,
            lives: 3,
            timeSinceLastSpawn: 0,
            motionPixelCount: 0,
            bgAnimTimer: 0,
            lastDamageTime: 0,
            damageAlpha: 0,
            shakeIntensity: 0,
            hitStop: 0
        };
        mousePosRef.current = null;
        lastMousePosRef.current = null;
        lastCentroidRef.current = null;
    }
  }, [status]);

  const spawnItem = (items: GameItem[]) => {
    let itemType;
    const isBombSpawn = Math.random() < 0.12; 
    
    if (isBombSpawn) {
        const bombConfig = levelConfig.items.find(i => i.isBomb);
        itemType = bombConfig || { name: 'BOOM', emoji: '💣', color: '#000', points: -50, isBomb: true };
    } else {
        if (customItems.length === 0) {
             itemType = { name: 'Air', emoji: '💨', color: '#ccc', points: 1, isBomb: false };
        } else {
            const customItem = customItems[Math.floor(Math.random() * customItems.length)];
            const color = customItem.color || CUSTOM_ITEM_COLORS[Math.floor(Math.random() * CUSTOM_ITEM_COLORS.length)];
            itemType = {
                name: customItem.text,
                emoji: customItem.emoji, 
                color: color,
                points: 50, 
                isBomb: false
            };
        }
    }

    const margin = 150;
    const x = Math.random() * (CANVAS_WIDTH - margin*2) + margin;
    const centerX = CANVAS_WIDTH / 2;
    const direction = x < centerX ? 1 : -1;
    
    let speedMultiplier = 1.0;
    if (levelConfig.musicBpm > 140) speedMultiplier = 1.3; 
    if (levelConfig.musicBpm < 100) speedMultiplier = 0.8; 

    const vx = (Math.random() * 3 + 1.5) * direction * speedMultiplier; 
    const vy = -(Math.random() * 6 + 19) * speedMultiplier; 

    items.push({
      id: Date.now() + Math.random(),
      x,
      y: CANVAS_HEIGHT + 120,
      vx,
      vy,
      rotation: 0,
      rotSpeed: (Math.random() - 0.5) * 0.1,
      type: itemType,
      emoji: itemType.emoji,
      color: itemType.color,
      sliced: false,
      collected: false,
      scale: 1.0,
      opacity: 1.0
    });
  };

  const getRandomImpactText = (theme: string) => {
      if (levelConfig.impactWords && levelConfig.impactWords.length > 0) {
          return levelConfig.impactWords[Math.floor(Math.random() * levelConfig.impactWords.length)];
      }
      const impacts = IMPACT_WORDS[language];
      let options = impacts.ANGRY;
      if (theme === 'SAD_RAIN') options = impacts.SAD;
      if (theme === 'UNDERWATER') options = impacts.HAPPY;
      return options[Math.floor(Math.random() * options.length)];
  }

  const handleInteraction = (item: GameItem, state: any, interactionType: 'SLICE' | 'COLLECT') => {
    if (item.type.isBomb) {
        if (Date.now() - state.lastDamageTime < 1000) return;

        playSound('bomb');
        state.lives -= 1;
        state.combo = 0;
        state.happinessIncrease -= 10;
        state.lastDamageTime = Date.now();
        state.damageAlpha = 0.6; 
        state.shakeIntensity = 25; 
        state.hitStop = 8; 

        for(let k=0; k<20; k++) {
            if (state.particles.length < 100) {
                state.particles.push({
                    id: Math.random(),
                    x: item.x,
                    y: item.y,
                    vx: (Math.random() - 0.5) * 30,
                    vy: (Math.random() - 0.5) * 30,
                    life: 1.0,
                    color: '#EF4444',
                    size: Math.random() * 10 + 5,
                    type: 'shard'
                });
            }
        }

        state.floatingTexts.push({
            id: Math.random(),
            x: item.x,
            y: item.y - 50,
            text: "BOOM!",
            life: 1.0,
            vx: 0,
            vy: -2,
            color: "#EF4444",
            scale: 2.0
        });
        
        const idx = state.items.indexOf(item);
        if (idx > -1) state.items.splice(idx, 1);

        if (state.lives <= 0) {
            onGameOver();
        }
        return;
    }

    if (interactionType === 'SLICE') {
        playSound('slice');
        item.sliced = true;
        state.shakeIntensity = 8; 
        state.hitStop = 3; 
    } else {
        playSound('collect');
        item.collected = true;
        item.vx = 0;
        item.vy = -3; 
        state.shakeIntensity = 3; 
    }

    state.combo += 1;
    if (state.combo > state.maxCombo) state.maxCombo = state.combo;

    const points = item.type.points + state.combo * 5;
    state.score += points; 
    state.ventValue += Math.floor(points * (state.combo > 5 ? 1.5 : 1.0));
    state.happinessIncrease += Math.floor(state.combo * 0.5);

    const impactText = getRandomImpactText(levelConfig.visualTheme);
    
    const textColor = interactionType === 'SLICE' ? '#D97706' : '#15803d'; 

    state.floatingTexts.push({
        id: Math.random(),
        x: item.x,
        y: item.y,
        text: impactText,
        life: 1.0,
        vx: (Math.random() - 0.5) * 2,
        vy: -5,
        color: textColor,
        scale: 1.0 + (Math.min(state.combo, 10) * 0.1)
    });

    const key = item.type.name;
    if (!state.slicedItemCounts[key]) {
        state.slicedItemCounts[key] = { count: 0, emoji: item.emoji };
    }
    state.slicedItemCounts[key].count += 1;
    
    onStatsUpdate({
        score: state.score,
        maxCombo: state.maxCombo,
        caloriesBurned: Math.floor(state.caloriesBurned),
        ventValue: state.ventValue,
        happinessIncrease: state.happinessIncrease,
        slicedItemCounts: { ...state.slicedItemCounts }
    });

    if (interactionType === 'SLICE') {
        state.debris.push({
            id: Math.random(),
            x: item.x,
            y: item.y,
            vx: item.vx - 5,
            vy: item.vy - 2,
            rotation: item.rotation,
            rotSpeed: -0.2,
            emoji: item.emoji,
            side: 'left',
            life: 1.0
        });
        state.debris.push({
            id: Math.random(),
            x: item.x,
            y: item.y,
            vx: item.vx + 5,
            vy: item.vy - 2,
            rotation: item.rotation,
            rotSpeed: 0.2,
            emoji: item.emoji,
            side: 'right',
            life: 1.0
        });
    }

    const particleCount = 12;
    if (state.particles.length < 150) { 
        for(let k=0; k<particleCount; k++) {
            state.particles.push({
                id: Math.random(),
                x: item.x,
                y: item.y,
                vx: (Math.random() - 0.5) * 25,
                vy: (Math.random() - 0.5) * 25,
                life: 1.0,
                color: item.color,
                size: Math.random() * 10 + 5,
                type: 'shard'
            });
        }
    }
  };

  const updateParticles = (particles: Particle[]) => {
      for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += GRAVITY * 0.5; 
          p.life -= 0.04; 
          if (p.life <= 0) particles.splice(i, 1);
      }
  };

  const updateDebris = (debris: Debris[]) => {
      for (let i = debris.length - 1; i >= 0; i--) {
          const d = debris[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += GRAVITY;
          d.rotation += d.rotSpeed;
          if (d.y > CANVAS_HEIGHT + 200) debris.splice(i, 1);
      }
  };

  const updateFloatingTexts = (texts: FloatingText[]) => {
      for (let i = texts.length - 1; i >= 0; i--) {
          const t = texts[i];
          t.x += t.vx;
          t.y += t.vy;
          t.life -= 0.02;
          t.scale += 0.01; 
          if (t.life <= 0) texts.splice(i, 1);
      }
  }

  // Render thematic backgrounds
  const renderSceneBackground = (ctx: CanvasRenderingContext2D, theme: string, time: number) => {
      const w = CANVAS_WIDTH;
      const h = CANVAS_HEIGHT;
      
      ctx.save();
      
      if (theme === 'DESTRUCTION') { // Angry
          // Radial Spotlight
          const grd = ctx.createRadialGradient(w/2, h/2, 100, w/2, h/2, w);
          grd.addColorStop(0, '#fff1f2'); // rose-50
          grd.addColorStop(1, '#ffe4e6'); // rose-100
          ctx.fillStyle = grd;
          ctx.fillRect(0,0,w,h);
          
          // Ember effect - subtle
          ctx.fillStyle = 'rgba(234, 88, 12, 0.05)';
          for (let i = 0; i < 20; i++) {
              const s = (time * 0.05 + i * 100) % w;
              const y = (time * 0.1 + i * 50) % h;
              ctx.beginPath();
              ctx.arc(s, h - y, 2 + (i % 4), 0, Math.PI * 2);
              ctx.fill();
          }

      } else if (theme === 'SAD_RAIN') { // Sad
          const grd = ctx.createRadialGradient(w/2, h/2, 100, w/2, h/2, w);
          grd.addColorStop(0, '#f0f9ff'); // sky-50
          grd.addColorStop(1, '#e0f2fe'); // sky-100
          ctx.fillStyle = grd;
          ctx.fillRect(0,0,w,h);
          
          // Rain
          ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          for(let i=0; i<80; i++) {
              const x = (i * 30 + time * 0.1) % w;
              const y = (time * 20 + i * 50) % h;
              ctx.moveTo(x, y);
              ctx.lineTo(x, y + 30);
          }
          ctx.stroke();

      } else if (theme === 'UNDERWATER') { // Happy
          const grd = ctx.createRadialGradient(w/2, h/2, 100, w/2, h/2, w);
          grd.addColorStop(0, '#ecfeff'); // cyan-50
          grd.addColorStop(1, '#cffafe'); // cyan-100
          ctx.fillStyle = grd;
          ctx.fillRect(0,0,w,h);
          
          // Bubbles - Subtle
          ctx.fillStyle = 'rgba(13, 148, 136, 0.08)';
          for(let i=0; i<15; i++) {
              const y = (h - (time * 0.05 + i * 100) % h);
              const x = (w/2 + Math.sin(y * 0.01 + i) * 100 + i * 50) % w;
              ctx.beginPath();
              ctx.arc(x, y, 5 + (i % 10), 0, Math.PI * 2);
              ctx.fill();
          }

      } else {
          // Default Green Radial
          const grd = ctx.createRadialGradient(w/2, h/2, 100, w/2, h/2, w);
          grd.addColorStop(0, '#e6fbe3');
          grd.addColorStop(1, '#dcf1d9');
          ctx.fillStyle = grd;
          ctx.fillRect(0,0,w,h);
      }

      ctx.restore();
  }

  const getTrailColor = (theme: string): string => {
      switch (theme) {
          case 'DESTRUCTION': return 'rgba(239, 68, 68, 0.8)'; // red
          case 'SAD_RAIN': return 'rgba(59, 130, 246, 0.8)'; // blue
          case 'UNDERWATER': return 'rgba(20, 184, 166, 0.8)'; // teal
          default: return 'rgba(76, 175, 80, 0.8)'; // green
      }
  };

  const gameLoop = useCallback(() => {
    if (!canvasRef.current || !offscreenCanvasRef.current) {
        requestRef.current = requestAnimationFrame(gameLoop);
        return;
    }
    
    const ctx = canvasRef.current.getContext('2d');
    const offCtx = offscreenCanvasRef.current.getContext('2d', { willReadFrequently: true });
    const video = videoRef.current;
    
    if (!ctx || !offCtx) return;

    const state = gameStateRef.current;
    
    // --- HIT STOP LOGIC ---
    if (state.hitStop > 0) {
        state.hitStop--;
    } else {
        state.bgAnimTimer += 16; 
    }

    // Apply Shake
    ctx.save();
    if (state.shakeIntensity > 0) {
        const shakeX = (Math.random() - 0.5) * state.shakeIntensity;
        const shakeY = (Math.random() - 0.5) * state.shakeIntensity;
        ctx.translate(shakeX, shakeY);
        state.shakeIntensity *= 0.9; 
        if (state.shakeIntensity < 0.5) state.shakeIntensity = 0;
    }

    // 1. Render Background
    renderSceneBackground(ctx, levelConfig.visualTheme, state.bgAnimTimer);

    // 2. Input Processing
    const activeMotionPoints: {x: number, y: number}[] = [];
    let currentCentroid: {x: number, y: number} | null = null;

    if (inputMode === 'CAMERA' && permissionGranted && video && video.readyState === 4) {
        const scaleFactor = 0.1;
        const sw = Math.floor(CANVAS_WIDTH * scaleFactor);
        const sh = Math.floor(CANVAS_HEIGHT * scaleFactor);
        
        offCtx.save();
        offCtx.translate(sw, 0);
        offCtx.scale(-1, 1);
        offCtx.drawImage(video, 0, 0, sw, sh);
        offCtx.restore();

        const currentFrameData = offCtx.getImageData(0, 0, sw, sh);
        const scaleX = CANVAS_WIDTH / sw;
        const scaleY = CANVAS_HEIGHT / sh;
        let frameMotionCount = 0;

        let sumX = 0;
        let sumY = 0;
        let points = 0;

        if (state.lastFrameData) {
            const threshold = sensitivity; 
            const data = currentFrameData.data;
            const lastData = state.lastFrameData.data;
            
            for (let i = 0; i < data.length; i += 4 * 2) { 
                const rDiff = Math.abs(data[i] - lastData[i]);
                const gDiff = Math.abs(data[i+1] - lastData[i+1]);
                const bDiff = Math.abs(data[i+2] - lastData[i+2]);
                
                if (rDiff + gDiff + bDiff > threshold * 3) {
                    frameMotionCount++;
                    const pixelIndex = i / 4;
                    const y = Math.floor(pixelIndex / sw);
                    const x = pixelIndex % sw;
                    
                    const screenX = x * scaleX;
                    const screenY = y * scaleY;

                    activeMotionPoints.push({x: screenX, y: screenY});
                    
                    sumX += screenX;
                    sumY += screenY;
                    points++;
                }
            }

            if (points > 5) { // Threshold to avoid noise
                currentCentroid = { x: sumX / points, y: sumY / points };
                
                // Create clean trail based on centroid movement
                if (lastCentroidRef.current) {
                     // Interpolate for smoothness
                     const dx = currentCentroid.x - lastCentroidRef.current.x;
                     const dy = currentCentroid.y - lastCentroidRef.current.y;
                     // Only add trail if moved enough
                     if (dx*dx + dy*dy > 50) {
                        state.trail.push({ x: currentCentroid.x, y: currentCentroid.y, life: 0.5 });
                     }
                }
                lastCentroidRef.current = currentCentroid;
            } else {
                lastCentroidRef.current = null;
            }
        }
        state.lastFrameData = currentFrameData;
        state.caloriesBurned += (frameMotionCount / 1000) * 0.05;

    } else if (inputMode === 'MOUSE' && mousePosRef.current) {
        activeMotionPoints.push(mousePosRef.current);
        if (lastMousePosRef.current) {
            const dx = mousePosRef.current.x - lastMousePosRef.current.x;
            const dy = mousePosRef.current.y - lastMousePosRef.current.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            const steps = Math.floor(dist / 20); 
            for(let i=1; i<steps; i++) {
                activeMotionPoints.push({
                    x: lastMousePosRef.current.x + (dx * i / steps),
                    y: lastMousePosRef.current.y + (dy * i / steps)
                });
            }
        }
        state.trail.push({
            x: mousePosRef.current.x,
            y: mousePosRef.current.y,
            life: 0.5
        });
    }
    
    // Game Update (Only if not frozen)
    if (status === GameStatus.PLAYING && state.hitStop <= 0) {
        state.timeSinceLastSpawn++;
        let spawnRate = state.score > 300 ? 25 : 40; 
        
        if (state.timeSinceLastSpawn > spawnRate && state.items.length < 6) { 
            if (Math.random() > 0.2) {
                spawnItem(state.items);
                playSound('throw');
                state.timeSinceLastSpawn = 0;
            }
        }

        for (let i = state.items.length - 1; i >= 0; i--) {
            const item = state.items[i];

            if (item.collected) {
                item.scale += 0.1;
                item.opacity -= 0.1;
                item.y -= 10; 
                if (item.opacity <= 0) {
                    state.items.splice(i, 1);
                }
                continue;
            }

            item.x += item.vx;
            item.y += item.vy;
            item.vy += GRAVITY;
            item.rotation += item.rotSpeed;

            if (item.y > CANVAS_HEIGHT + 150) {
                if (!item.type.isBomb && !item.sliced && !item.collected) {
                    state.combo = 0; 
                }
                state.items.splice(i, 1);
                continue;
            }

            if (!item.sliced && !item.collected) {
                let hit = false;
                if (item.y < CANVAS_HEIGHT && item.y > -50) {
                    const hitRadiusSq = 60 * 60; // Increased hit radius slightly for easier play
                    for (const p of activeMotionPoints) {
                        const dx = p.x - item.x;
                        const dy = p.y - item.y;
                        if (dx*dx + dy*dy < hitRadiusSq) {
                            hit = true;
                            break;
                        }
                    }
                }

                if (hit) {
                    handleInteraction(item, state, levelConfig.interactionType);
                    if (levelConfig.interactionType === 'SLICE' && item.sliced) {
                        state.items.splice(i, 1); 
                    }
                }
            }
        }
        
        updateParticles(state.particles);
        updateDebris(state.debris);
        updateFloatingTexts(state.floatingTexts);
        
        for (let i = state.trail.length - 1; i >= 0; i--) {
            state.trail[i].life -= 0.1; 
            if (state.trail[i].life <= 0) state.trail.splice(i, 1);
        }
    }
    

    // 3. Render Elements
    
    // Trails - Render as clean lines for both modes now
    if (state.trail.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = getTrailColor(levelConfig.visualTheme);
        const trailColor = getTrailColor(levelConfig.visualTheme);

        ctx.beginPath();
        // Draw line connecting trail points
        ctx.moveTo(state.trail[state.trail.length-1].x, state.trail[state.trail.length-1].y);
        for (let i = state.trail.length - 2; i >= 0; i--) {
           const p = state.trail[i];
           ctx.lineTo(p.x, p.y);
        }
        
        // Styling for clean look
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = inputMode === 'CAMERA' ? 12 : 8; // Thicker for camera
        ctx.stroke();
        ctx.restore();
    }

    // Items
    for (const item of state.items) {
        if (item.sliced) continue; 
        
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        ctx.scale(item.scale, item.scale);
        ctx.globalAlpha = item.opacity;
        
        // Sticker Background
        ctx.beginPath();
        ctx.arc(0, 0, 80, 0, Math.PI * 2);
        
        if (item.type.isBomb) {
            ctx.fillStyle = "#1f2937"; 
            ctx.strokeStyle = "#EF4444";
        } else {
            ctx.shadowColor = 'rgba(0,0,0,0.1)';
            ctx.shadowBlur = 15;
            ctx.shadowOffsetY = 10;
            
            ctx.fillStyle = "#FFFFFF";
            ctx.strokeStyle = item.color;
        }
        ctx.lineWidth = 6;
        ctx.fill();
        ctx.stroke();
        
        ctx.shadowColor = 'transparent';
        
        ctx.font = "80px 'Segoe UI Emoji', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.emoji, 0, 5);
        
        ctx.font = "900 22px 'Quicksand', sans-serif"; // Use Quicksand
        const text = item.type.name;
        const textY = 110; 
        
        ctx.lineWidth = 4;
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.strokeText(text, 0, textY);
        ctx.fillStyle = "#1a3c34"; // Dark green-black text
        ctx.fillText(text, 0, textY);

        ctx.restore();
    }

    // Debris
    for (const d of state.debris) {
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.rotate(d.rotation);
        ctx.globalAlpha = d.life;
        
        ctx.beginPath();
        if (d.side === 'left') ctx.arc(0, 0, 80, Math.PI/2, Math.PI * 1.5);
        else ctx.arc(0, 0, 80, Math.PI * 1.5, Math.PI/2);
        ctx.fillStyle = "#FFF";
        ctx.fill();
        ctx.strokeStyle = "#999";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "80px 'Segoe UI Emoji', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        
        ctx.beginPath();
        if (d.side === 'left') ctx.rect(-50, -50, 50, 100);
        else ctx.rect(0, -50, 50, 100);
        ctx.clip();
        
        ctx.fillText(d.emoji, 0, 0);
        ctx.restore();
    }

    // Particles
    for (const p of state.particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.life * 10); 
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        
        if (p.type === 'shard') {
            ctx.beginPath();
            ctx.moveTo(0, -p.size);
            ctx.lineTo(p.size, p.size);
            ctx.lineTo(-p.size, p.size);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }

    // Impact Text
    for (const t of state.floatingTexts) {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.scale(t.scale, t.scale);
        ctx.globalAlpha = t.life;
        
        ctx.font = "700 48px 'Rajdhani', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = t.color;
        
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 4;
        
        ctx.strokeStyle = "white"; 
        ctx.lineWidth = 4;
        ctx.lineJoin = "round";
        
        ctx.strokeText(t.text, 0, 0);
        ctx.fillText(t.text, 0, 0);
        
        ctx.shadowBlur = 0; 
        ctx.restore();
    }

    if (state.damageAlpha > 0) {
        ctx.fillStyle = `rgba(239, 68, 68, ${state.damageAlpha})`;
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        state.damageAlpha -= 0.05;
    }

    ctx.restore();

    // In-Game HUD (Playing)
    if (status === GameStatus.PLAYING) {
         const topItems = (Object.entries(state.slicedItemCounts) as [string, { count: number, emoji: string }][])
             .sort((a, b) => b[1].count - a[1].count)
             .slice(0, 5);
             
         if (topItems.length > 0) {
             let hudY = 200;
             const hudX = 20;
             
             ctx.save();
             ctx.textAlign = "left";
             ctx.textBaseline = "middle";
             
             for (const [name, data] of topItems) {
                 if (data.count > 0) {
                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.beginPath();
                    ctx.roundRect(hudX, hudY, 200, 44, 22);
                    ctx.fill();
                    ctx.strokeStyle = "rgba(0,0,0,0.1)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    
                    ctx.font = "24px 'Segoe UI Emoji', sans-serif";
                    ctx.fillStyle = "#000";
                    ctx.fillText(data.emoji, hudX + 15, hudY + 22);
                    
                    ctx.font = "600 16px 'Quicksand', sans-serif";
                    ctx.fillStyle = "#1a3c34";
                    ctx.fillText(name, hudX + 50, hudY + 22);
                    
                    ctx.textAlign = "right";
                    ctx.font = "700 24px 'Rajdhani', sans-serif";
                    ctx.fillStyle = "#059669"; 
                    ctx.fillText(`x${data.count}`, hudX + 180, hudY + 22);
                    
                    ctx.textAlign = "left";
                    hudY += 55;
                 }
             }
             ctx.restore();
         }

         // Lives HUD
         ctx.save();
         const livesX = CANVAS_WIDTH - 50;
         const livesY = 50;
         ctx.font = "40px 'Segoe UI Emoji', sans-serif";
         ctx.textAlign = "center";
         ctx.textBaseline = "middle";
         
         for(let i=0; i<3; i++) {
             const x = livesX - (i * 50);
             if (i < state.lives) {
                 ctx.globalAlpha = 1.0;
                 ctx.shadowBlur = 0;
                 ctx.fillText("❤️", x, livesY);
             } else {
                 ctx.globalAlpha = 0.3;
                 ctx.shadowBlur = 0;
                 ctx.fillText("🖤", x, livesY);
             }
         }
         ctx.restore();
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  }, [status, levelConfig, playSound, permissionGranted, cameraError, customItems, inputMode, isMuted, language, t, sensitivity]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameLoop]);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT} 
        className={`w-full h-full object-cover rounded-[2rem] shadow-2xl ${inputMode === 'MOUSE' ? 'cursor-none' : ''} bg-[#e6fbe3]`}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
      />
      {inputMode === 'CAMERA' && (
          <video ref={videoRef} className="hidden" playsInline muted />
      )}
      <canvas ref={offscreenCanvasRef} width={Math.floor(CANVAS_WIDTH/10)} height={Math.floor(CANVAS_HEIGHT/10)} className="hidden" />
      
      {inputMode === 'CAMERA' && !permissionGranted && !cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-[2rem] z-40">
              <div className="text-center text-[#1a3c34]">
                  <div className="animate-spin mb-4 mx-auto w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full"></div>
                  <p className="text-lg font-black tracking-wide font-tech uppercase">{t.initializing}</p>
              </div>
          </div>
      )}

      {inputMode === 'CAMERA' && cameraError && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-md text-[#1a3c34] rounded-[2rem] z-50 p-8 text-center">
              <div className="max-w-md">
                  <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-6" />
                  <h3 className="text-2xl font-black mb-2 font-tech uppercase">{t.cameraErrorTitle}</h3>
                  <p className="text-emerald-800/60 mb-8 font-sans font-medium">{cameraError}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="bg-[#1a3c34] text-white hover:bg-emerald-900 px-8 py-4 rounded-full font-black transition-transform hover:scale-105 flex items-center justify-center gap-2 mx-auto font-tech uppercase tracking-wider shadow-lg"
                  >
                      <RefreshCw className="w-4 h-4" />
                      {t.refresh}
                  </button>
              </div>
          </div>
      )}
    </>
  );
};

export default GameCanvas;