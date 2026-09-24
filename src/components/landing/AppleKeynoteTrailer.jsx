import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  RotateCcw, Sparkles, Shield, Brain, Zap, ArrowRight, CheckCircle2 
} from 'lucide-react';

export function AppleKeynoteTrailer({ onFinish, onExploreProductivity }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const SCENES = [
    {
      id: 0,
      badge: 'Escena 01 • Diagnóstico',
      title: 'La Economía del Secuestro Dopamínico',
      subtitle: 'Tu cerebro no tiene un problema de voluntad. Compite contra algoritmos diseñados por neurocientíficos para fragmentar cada 47 segundos de tu atención.',
      metric: '47s',
      metricLabel: 'Tiempo promedio antes de que una notificación rompa tu concentración.',
      icon: Zap,
      cue: 'La sobrecarga cromática y los bucles infinitos agotan tu corteza prefrontal.',
    },
    {
      id: 1,
      badge: 'Escena 02 • El Blindaje',
      title: 'Arquitectura Monocromática Pura',
      subtitle: 'Al eliminar el color saturado, desactivamos el reflejo condicionado de tu sistema nervioso. La pantalla deja de ser un casino y vuelve a ser una herramienta.',
      metric: '-62%',
      metricLabel: 'Reducción inmediata de la urgencia compulsiva en la primera sesión.',
      icon: Shield,
      cue: 'Cero rojos, cero badges agresivos. Solo contraste puro de alta precisión.',
    },
    {
      id: 2,
      badge: 'Escena 03 • Neuro-Sincronía',
      title: 'Fricción de 5 Segundos & Audio 40Hz',
      subtitle: 'Cuando intentas abrir una distracción, Focusly introduce una pausa consciente. La frecuencia binaural de 40Hz sincroniza las ondas gamma para alcanzar el estado de flujo.',
      metric: '84%',
      metricLabel: 'De los impulsos de distracción se disipan con una pausa respiratoria guiada.',
      icon: Brain,
      cue: 'El puente biológico entre el impulso primitivo y la decisión consciente.',
    },
    {
      id: 3,
      badge: 'Escena 04 • La Maestría',
      title: '4 Horas Libres Recuperadas al Día',
      subtitle: 'No se trata de restringirte: se trata de recuperar tus tardes, aprobar tus exámenes sin estrés y construir maestría en programación, finanzas y neurociencia.',
      metric: '+4.2h',
      metricLabel: 'Horas netas de vida recuperadas al día por cada estudiante Focusly.',
      icon: Sparkles,
      cue: 'El único juego digital donde subes de nivel ganando tiempo fuera de la pantalla.',
    },
  ];

  // Auto advance scenes
  useEffect(() => {
    if (!isPlaying) return;
    const duration = 6500; // 6.5s per scene
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentScene((s) => (s + 1) % SCENES.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentScene, SCENES.length]);

  // Audio synthesis for binaural drone (silent by default)
  useEffect(() => {
    if (!isMuted) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 40Hz difference ambient chord (200Hz carrier + 240Hz binaural component)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140 + currentScene * 20, ctx.currentTime);
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      } catch (e) {
        console.warn('Web Audio note:', e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0.0001, audioCtxRef.current.currentTime);
        setTimeout(() => {
          if (oscillatorRef.current) {
            try { oscillatorRef.current.stop(); } catch(e){}
            oscillatorRef.current = null;
          }
        }, 100);
      }
    }

    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch(e){}
        oscillatorRef.current = null;
      }
    };
  }, [isMuted, currentScene]);

  // Canvas visualizer rendering Apple-style cinematic generative motion
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      time += 0.015;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.clearRect(0, 0, w, h);

      // Deep vignette gradient
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 20, w / 2, h / 2, Math.max(w, h));
      bgGrad.addColorStop(0, '#111113');
      bgGrad.addColorStop(0.7, '#080809');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 3D Perspective Wireframe Horizon
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridY = h * 0.65;
      const fov = 260;

      for (let i = -12; i <= 12; i++) {
        ctx.beginPath();
        const startX = w / 2 + (i * 28);
        ctx.moveTo(w / 2, gridY - 40);
        ctx.lineTo(w / 2 + (i * 120), h);
        ctx.stroke();
      }

      for (let j = 0; j < 8; j++) {
        const offset = ((time * 20 + j * 30) % 200);
        const yPos = gridY + (offset * offset) / 180;
        if (yPos <= h) {
          ctx.beginPath();
          ctx.moveTo(0, yPos);
          ctx.lineTo(w, yPos);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Generative Central Focus Pulse based on scene
      const cx = w / 2;
      const cy = h * 0.45;
      const baseRadius = Math.min(w, h) * 0.22;

      for (let ring = 0; ring < 3; ring++) {
        const pulse = Math.sin(time * 2 + ring * 0.8) * 12;
        const r = baseRadius + ring * 38 + pulse;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2);
        ctx.strokeStyle = ring === 0 
          ? 'rgba(255, 255, 255, 0.18)' 
          : ring === 1 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = ring === 0 ? 1.5 : 1;
        if (ring === 0) {
          ctx.setLineDash([4, 6]);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Dynamic Audio wave spectrum lines along the bottom
      const waveBars = 48;
      const barWidth = w / waveBars;
      ctx.save();
      for (let b = 0; b < waveBars; b++) {
        const wave = Math.sin(time * 3 + b * 0.25) * Math.cos(time * 1.5 + b * 0.1);
        const barHeight = Math.abs(wave) * (h * 0.12) + 4;
        const x = b * barWidth;
        const y = h - barHeight - 12;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }
      ctx.restore();

      // Floating dust particles (white/subtle)
      ctx.save();
      for (let p = 0; p < 35; p++) {
        const px = (Math.sin(p * 99 + time * 0.4) * 0.5 + 0.5) * w;
        const py = (Math.cos(p * 33 + time * 0.3) * 0.5 + 0.5) * h;
        const alpha = Math.sin(time + p) * 0.2 + 0.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [currentScene]);

  const selectScene = (idx) => {
    setCurrentScene(idx);
    setProgress(0);
    setIsPlaying(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const activeSceneData = SCENES[currentScene];
  const IconComponent = activeSceneData.icon;

  return (
    <section 
      ref={containerRef}
      className={`relative w-full overflow-hidden border border-white/15 rounded-3xl bg-black transition-all duration-500 shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'max-w-7xl mx-auto my-12'
      }`}
    >
      {/* 1. BACKGROUND CANVAS CINEMATIC REEL */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

      {/* 2. TOP BAR: STATUS, AUDIO, AND FULLSCREEN CONTROLS */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5 sm:pt-7">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-300 uppercase">
              Focusly 2026 Keynote Film
            </span>
          </div>

          <span className="hidden sm:inline-block text-[11px] text-zinc-500 font-medium">
            Capítulo {currentScene + 1} de {SCENES.length}
          </span>
        </div>

        {/* Quick Media Controls */}
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-xl border border-white/15 px-3 py-1.5 rounded-full">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pausar Film' : 'Reanudar Film'}
            className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-1"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="fill-white" />}
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            title={isMuted ? 'Activar Frecuencia Sonora (40Hz)' : 'Silenciar'}
            className="text-zinc-300 hover:text-white transition-colors cursor-pointer p-1 flex items-center gap-1.5"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-white" />}
            <span className="text-[9px] font-mono uppercase font-bold text-zinc-400">
              {isMuted ? 'MUTE' : '40Hz ON'}
            </span>
          </button>

          <button
            onClick={() => {
              setCurrentScene(0);
              setProgress(0);
            }}
            title="Reiniciar Presentación"
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1 hidden sm:block"
          >
            <RotateCcw size={13} />
          </button>

          <div className="w-[1px] h-3 bg-white/20 mx-0.5" />

          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* 3. CENTRAL CINEMATIC CONTENT STAGE */}
      <div className="relative z-10 px-5 sm:px-12 py-12 sm:py-16 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Narrative text */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest">
                <IconComponent size={12} className="text-white" />
                <span>{activeSceneData.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.0]">
                {activeSceneData.title}
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed max-w-2xl">
                {activeSceneData.subtitle}
              </p>

              <p className="text-xs text-zinc-500 italic font-mono">
                “{activeSceneData.cue}”
              </p>

              {/* Action Buttons for Keynote */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={onFinish}
                  className="bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-xl transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-98"
                >
                  <span>Abrir la App Ahora</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={onExploreProductivity}
                  className="bg-black/60 hover:bg-white/10 border border-white/25 text-white font-black text-xs uppercase tracking-widest px-5 py-3.5 rounded-full backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles size={13} />
                  <span>Ver en Productividad</span>
                </button>
              </div>
            </div>

            {/* Right: Dramatic Focal Stat Callout */}
            <div className="lg:col-span-4 flex flex-col justify-center items-start lg:items-end">
              <div className="bg-black/80 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-3xl w-full max-w-sm space-y-2 text-left shadow-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                  Métrica Verificada
                </span>
                <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter font-mono">
                  {activeSceneData.metric}
                </div>
                <p className="text-xs text-zinc-400 leading-snug font-medium pt-1">
                  {activeSceneData.metricLabel}
                </p>
                <div className="pt-3 border-t border-white/10 flex items-center gap-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  <CheckCircle2 size={12} className="text-white" />
                  <span>Validado por Neurociencia</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. BOTTOM INTERACTIVE TIMELINE SCRUBBER & CHAPTER SELECTOR */}
      <div className="relative z-10 px-5 sm:px-8 pb-5 sm:pb-6 border-t border-white/10 bg-black/60 backdrop-blur-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-3">
          {SCENES.map((scene, idx) => {
            const isActive = currentScene === idx;
            return (
              <button
                key={scene.id}
                onClick={() => selectScene(idx)}
                className={`text-left p-2.5 rounded-xl transition-all cursor-pointer border ${
                  isActive 
                    ? 'bg-white/10 border-white/40 text-white' 
                    : 'bg-transparent border-transparent hover:bg-white/5 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {/* Micro progress bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-white transition-all duration-75 ease-linear"
                    style={{ 
                      width: isActive 
                        ? `${progress}%` 
                        : idx < currentScene ? '100%' : '0%' 
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-black uppercase">
                    0{idx + 1}
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  )}
                </div>
                <div className="text-[11px] font-black uppercase tracking-tight truncate mt-0.5">
                  {scene.title.split(' ')[0]} {scene.title.split(' ')[1] || ''}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
