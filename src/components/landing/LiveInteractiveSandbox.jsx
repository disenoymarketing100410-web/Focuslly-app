import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Shield, ShieldCheck, 
  ArrowRight, Check, X
} from 'lucide-react';

export function LiveInteractiveSandbox({ onFinish }) {
  // Mode selection
  const [sessionType, setSessionType] = useState('pomodoro'); // 'pomodoro' | 'deep' | 'sprint'
  const [secondsLeft, setSecondsLeft] = useState(1500); // default 25 min
  const [isActive, setIsActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundMode, setSoundMode] = useState('binaural');
  const [xpEarned, setXpEarned] = useState(120);

  // App Blocker Simulator Modal State
  const [simulatingApp, setSimulatingApp] = useState(null);
  const [breathingSeconds, setBreathingSeconds] = useState(5);
  const [breathPhase, setBreathPhase] = useState('Inhala profundo...');
  const [shieldTriggered, setShieldTriggered] = useState(false);

  // Audio Context Ref for synthesized binaural sound
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Handle timer countdown
  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => s - 1);
        if (secondsLeft % 5 === 0) {
          setXpEarned((prev) => prev + 5);
        }
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  // Handle Audio Synthesis
  const stopAudio = React.useCallback(() => {
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch (e) {}
      oscillatorRef.current = null;
    }
    if (noiseNodeRef.current) {
      try { noiseNodeRef.current.stop(); } catch (e) {}
      noiseNodeRef.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch (e) {}
      audioCtxRef.current = null;
    }
  }, []);

  const startAudio = React.useCallback((type) => {
    stopAudio();
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      if (type === 'binaural') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(196, ctx.currentTime);
        osc.connect(masterGain);
        osc.start();
        oscillatorRef.current = osc;
      } else {
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          output[i] = (b0 + b1 + b2) * 0.1;
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        whiteNoise.connect(masterGain);
        whiteNoise.start();
        noiseNodeRef.current = whiteNoise;
      }
    } catch (err) {
      console.log('Audio init prevented by browser policy until interaction');
    }
  }, [stopAudio]);

  useEffect(() => {
    if (soundEnabled && isActive) {
      startAudio(soundMode);
    } else {
      stopAudio();
    }
    return () => stopAudio();
  }, [soundEnabled, soundMode, isActive, startAudio, stopAudio]);

  const handleSelectPreset = (type) => {
    setSessionType(type);
    setIsActive(false);
    if (type === 'pomodoro') setSecondsLeft(1500);
    if (type === 'deep') setSecondsLeft(3000);
    if (type === 'sprint') setSecondsLeft(600);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulateBlock = (appName) => {
    setSimulatingApp(appName);
    setBreathingSeconds(5);
    setShieldTriggered(true);
  };

  useEffect(() => {
    let t = null;
    if (shieldTriggered && breathingSeconds > 0) {
      t = setInterval(() => {
        setBreathingSeconds((prev) => {
          if (prev <= 1) {
            setBreathPhase('Decisión consciente lograda.');
            return 0;
          }
          if (prev === 4) setBreathPhase('Retén el aire y reconoce el impulso...');
          if (prev === 2) setBreathPhase('Exhala despacio. ¿Realmente lo necesitas?');
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(t);
  }, [shieldTriggered, breathingSeconds]);

  return (
    <section id="simulador-en-vivo" className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Apple Minimalist Header */}
      <div className="max-w-4xl space-y-6 mb-16">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
          Interacción en Tiempo Real
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
          Pruébalo ahora. <br />
          <span className="text-zinc-500">Sin intermediarios ni registros.</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 font-medium leading-relaxed max-w-2xl pt-2">
          Experimenta el motor de concentración, activa la síntesis de audio binaural y pon a prueba la interrupción consciente contra distracciones.
        </p>
      </div>

      {/* Main Sandbox Stage - Clean Open Layout, NO Heavy Outer Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* LEFT COLUMN: THE PURE MONOCHROME FOCUS ENGINE */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Preset Pill Switcher */}
          <div className="flex items-center gap-6 border-b border-white/10 pb-4 text-xs uppercase tracking-widest font-black">
            {[
              { id: 'pomodoro', label: 'Pomodoro 25m' },
              { id: 'deep', label: 'Deep Work 50m' },
              { id: 'sprint', label: 'Sprint 10m' },
            ].map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`pb-2 transition-all cursor-pointer relative ${
                  sessionType === p.id 
                    ? 'text-white font-black' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {p.label}
                {sessionType === p.id && (
                  <motion.div 
                    layoutId="activePresetUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Huge Minimalist Timer Display */}
          <div className="py-6">
            <div className="text-7xl sm:text-9xl font-mono font-black tracking-tighter text-white select-none leading-none">
              {formatTime(secondsLeft)}
            </div>
            <div className="flex items-center gap-3 mt-4 text-xs uppercase tracking-widest font-bold text-zinc-500">
              <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-zinc-700'}`} />
              <span>{isActive ? 'Sesión en curso' : 'Listo para iniciar'}</span>
              <span className="text-zinc-600">•</span>
              <span>XP: +{xpEarned}</span>
            </div>
          </div>

          {/* Waveform Line */}
          <div className="flex items-center gap-1.5 h-6">
            {[10, 22, 14, 28, 18, 24, 12, 30, 20, 16, 26, 12, 22, 28, 16, 20, 12].map((h, i) => (
              <motion.div
                key={i}
                animate={{
                  height: (isActive && soundEnabled) ? [h * 0.3, h, h * 0.2] : 3,
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.04,
                  ease: "easeInOut"
                }}
                className={`w-1 rounded-full ${soundEnabled && isActive ? 'bg-white' : 'bg-zinc-800'}`}
              />
            ))}
          </div>

          {/* Minimal Controls Bar */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setIsActive(!isActive)}
              className="bg-white text-black hover:bg-zinc-200 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              {isActive ? <Pause size={14} /> : <Play size={14} className="fill-black" />}
              <span>{isActive ? 'Pausar Sesión' : 'Iniciar Foco'}</span>
            </button>

            <button
              onClick={() => {
                setIsActive(false);
                handleSelectPreset(sessionType);
              }}
              className="p-4 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-white transition-all cursor-pointer"
              title="Reiniciar"
            >
              <RotateCcw size={14} />
            </button>

            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) startAudio(soundMode);
                else stopAudio();
              }}
              className={`px-5 py-4 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                soundEnabled 
                  ? 'bg-white/10 text-white border-white/40' 
                  : 'border-white/15 text-zinc-500 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              <span>{soundEnabled ? 'Audio 40Hz Activo' : 'Audio Binaural'}</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: BEHAVIORAL INTERVENTION (CLEAN LIST, NO BOX CLUTTER) */}
        <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-white/10 lg:pl-12">
          
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 block">
              Escudo de Intervención
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              Simulador de Bloqueo
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Haz clic en cualquiera de las siguientes apps para experimentar la pausa consciente de Focusly cuando tu mente busca estímulo automático:
            </p>
          </div>

          {/* Minimal App Row Triggers (NO HEAVY CARDS, JUST SLEEK ROWS) */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {[
              { name: 'TikTok', tag: 'Dopamina Inmediata', time: '0m permitidos' },
              { name: 'Instagram', tag: 'Scroll Infinito', time: '15m diario' },
              { name: 'YouTube Shorts', tag: 'Binge Watching', time: 'Bloqueo estricto' },
              { name: 'X / Twitter', tag: 'Micro-Estrés', time: '10m diario' },
            ].map((app) => (
              <div
                key={app.name}
                onClick={() => handleSimulateBlock(app.name)}
                className="py-4 flex items-center justify-between group cursor-pointer hover:pl-2 transition-all"
              >
                <div>
                  <h5 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-zinc-300">
                    {app.name}
                  </h5>
                  <span className="text-[11px] text-zinc-500 font-medium">
                    {app.tag} • {app.time}
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-hover:text-white border border-white/20 px-3 py-1.5 rounded-full transition-colors">
                  Intentar Abrir →
                </span>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-500 leading-relaxed">
            * El 84% de las personas que experimentan esta pausa de 5 segundos deciden regresar a su tarea voluntariamente.
          </p>

        </div>

      </div>

      {/* MINIMALIST BREATHING / INTERVENTION MODAL */}
      <AnimatePresence>
        {shieldTriggered && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg border border-white/20 bg-black p-8 sm:p-12 text-center space-y-8 rounded-3xl"
            >
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-500">
                <span>Escudo Focusly</span>
                <button 
                  onClick={() => setShieldTriggered(false)}
                  className="p-1 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
                  Intervención en {simulatingApp}
                </span>
                <h4 className="text-3xl font-black uppercase tracking-tight text-white">
                  Pausa Consciente
                </h4>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  {breathPhase}
                </p>
              </div>

              {/* Minimal Animated Pulse Ring */}
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: breathingSeconds > 0 ? [1, 1.3, 1] : 1,
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full border border-white/30"
                />
                <span className="text-4xl font-mono font-black text-white">
                  {breathingSeconds > 0 ? breathingSeconds : <Check size={36} className="text-white mx-auto" />}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShieldTriggered(false)}
                  className="w-full py-4 bg-white text-black hover:bg-zinc-200 text-xs font-black uppercase tracking-widest rounded-full transition-all cursor-pointer"
                >
                  {breathingSeconds === 0 ? 'Volver a mi Tarea Principal' : 'Cerrar y Reenfocarme'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
