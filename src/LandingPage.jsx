import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import focusImg from './assets/focus.png';
import driveImg from './assets/drive.png';
import strengthImg from './assets/strength.png';
import silenceImg from './assets/silence.png';

const focuslyWordmark = '/focusly-logo-wordmark.png';
const focuslyIcon = '/focusly-logo-icon.png';
const focuslySlogan = '/focusly-logo-slogan.png';

import {
  ArrowRight, ChevronLeft, ChevronRight, Sparkles, Play, CheckCircle2,
  Smartphone, Trophy, Target, TrendingUp, Sprout, Shield, Flame, Crown,
  Zap, Search, ChevronDown, Home, ShoppingBag, User, Minus
} from 'lucide-react';

// --- SLIDES DEL CAROUSEL ---
export const LANDING_CAROUSEL_SLIDES = [
  { id: 'focus', title: 'FOCUS', subtitle: 'Domina tu atención y elimina las distracciones', image: focusImg, tag: 'Concentración Máxima' },
  { id: 'silence', title: 'SILENCIO', subtitle: 'Elimina el ruido digital y recupera la calma', image: silenceImg, tag: 'Detox Digital' },
  { id: 'drive', title: 'IMPULSO', subtitle: 'Alcanza tu máximo rendimiento académico y personal', image: driveImg, tag: 'Progreso Diario' },
  { id: 'strength', title: 'DISCIPLINA', subtitle: 'Construye fortaleza mental y hábitos duraderos', image: strengthImg, tag: 'Hábitos Militares' },
];

export const LandingImageSlider = ({ onFinish }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % LANDING_CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = LANDING_CAROUSEL_SLIDES[slideIndex];

  return (
    <div id="galeria-slider" className="space-y-6 pt-6">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Galería de Impacto</span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">Los 4 Pilares de Focusly</h2>
        <p className="text-sm text-white/60 font-medium">Explora la experiencia visual y los fundamentos de nuestra metodología de concentración.</p>
      </div>

      <div className="relative w-full max-w-4xl mx-auto aspect-[16/9] sm:aspect-[21/9] rounded-[32px] overflow-hidden border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.8)] group bg-[#090d16]">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={current.image} 
              alt={current.title} 
              className="w-full h-full object-cover object-center brightness-[1.1] contrast-[1.05]"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Slide Content Overlay */}
        <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                  {current.tag}
                </span>
                <h3 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter text-white drop-shadow-2xl">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed drop-shadow-md">
                  {current.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={onFinish}
            className="self-start sm:self-auto bg-white text-black font-black text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shrink-0 flex items-center gap-2"
          >
            Comenzar <ArrowRight size={14} />
          </button>
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => setSlideIndex(prev => (prev - 1 + LANDING_CAROUSEL_SLIDES.length) % LANDING_CAROUSEL_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <button 
          onClick={() => setSlideIndex(prev => (prev + 1) % LANDING_CAROUSEL_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100 z-30 cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>

        {/* Indicator Progress Bars */}
        <div className="absolute top-6 left-8 right-8 z-30 flex gap-2">
          {LANDING_CAROUSEL_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setSlideIndex(idx)}
              className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/20 backdrop-blur-md cursor-pointer transition-all"
            >
              <div 
                className={`h-full transition-all duration-500 ${idx === slideIndex ? 'w-full bg-white shadow-[0_0_12px_white]' : 'w-0'}`} 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SIMULADOR INTERACTIVO DENTRO DEL PHONE MOCKUP HERO ---
export const InteractivePhoneMockup = ({ onFinish }) => {
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [seconds, setSeconds] = useState(1500); // 25:00
  const [isRunning, setIsRunning] = useState(false);
  
  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins} : ${secs < 10 ? '0' : ''}${secs}`;
  };

  const [blockedState, setBlockedState] = useState({
    instagram: true,
    tiktok: true,
    youtube: false,
    twitter: true
  });

  const toggleAppBlock = (app) => {
    setBlockedState(prev => ({ ...prev, [app]: !prev[app] }));
  };

  const [aiQuery, setAiQuery] = useState('habito');
  const aiResponses = {
    habito: "💡 'Te sugiero activar la regla 50/10: 50 min de estudio enfocado y 10 min de descanso activo sin pantallas.'",
    distraccion: "🛡️ 'El impulso de abrir TikTok dura en promedio 90 segundos. Respira profundo tres veces y tu cerebro retomará el control.'",
    examen: "📚 'Para tu examen de mañana, prioriza repasar los mapas conceptuales y haz 3 bloques de Pomodoro antes de cenar.'"
  };

  return (
    <motion.div 
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full max-w-[340px] aspect-[9/18.5] bg-[#0c101d] rounded-[50px] p-3 border-[6px] border-[#1e293b] shadow-[0_30px_90px_rgba(15,23,42,0.8),0_0_50px_rgba(99,102,241,0.25)] overflow-hidden font-['Inter',sans-serif]"
    >
      {/* Dynamic Island Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#03060d] rounded-full z-40 flex items-center justify-end px-3 border border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-[#1e293b] border border-white/20" />
      </div>

      {/* Screen Container */}
      <div className="w-full h-full bg-[#050814] rounded-[38px] overflow-hidden flex flex-col pt-10 px-4 pb-4 text-white relative border border-white/10">
        
        {/* Header App Bar inside Phone */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <img src={focuslyIcon} alt="Icon" className="w-6 h-6 rounded-lg object-contain border border-white/20 bg-black" />
            <div>
              <span className="text-[8px] font-black uppercase text-indigo-400 tracking-widest block leading-none">Focusly App</span>
              <h4 className="text-xs font-black uppercase tracking-tight">Panel Live</h4>
            </div>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[8px] font-black uppercase flex items-center gap-1">
            <Flame size={10} fill="currentColor" /> Racha: 12d
          </div>
        </div>

        {/* Tab Selector Buttons inside Phone */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-black/80 rounded-xl border border-white/10 mb-3 text-[8px] font-black uppercase text-center">
          <button 
            onClick={() => setActiveTab('pomodoro')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'pomodoro' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            ⏱️ Timer
          </button>
          <button 
            onClick={() => setActiveTab('blocker')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'blocker' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            📵 Bloqueo
          </button>
          <button 
            onClick={() => setActiveTab('ai')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'ai' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            🤖 IA
          </button>
          <button 
            onClick={() => setActiveTab('ranks')} 
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'ranks' ? 'bg-indigo-600 text-white shadow-md' : 'text-white/40 hover:text-white'}`}
          >
            🏆 Nivel
          </button>
        </div>

        {/* TAB 1: POMODORO TIMER SIMULATOR */}
        {activeTab === 'pomodoro' && (
          <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-indigo-950/40 to-black/80 border border-indigo-500/30 rounded-2xl p-4">
            <div className="text-center">
              <span className="text-[8px] font-black uppercase tracking-widest text-indigo-300 block mb-1">Sesión de Concentración</span>
              <div className="text-3xl font-black tracking-widest text-white font-mono my-2 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                {formatTime(seconds)}
              </div>
              <span className="text-[8px] text-white/50 uppercase font-bold">Estado: {isRunning ? '🔥 Enfoque Activo' : 'Pausado'}</span>
            </div>

            <div className="flex justify-center gap-2 my-2">
              <button 
                onClick={() => setIsRunning(!isRunning)} 
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-lg ${isRunning ? 'bg-amber-500 text-black hover:bg-amber-400' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
              >
                {isRunning ? <Minus size={12} /> : <Play size={12} fill="currentColor" />}
                {isRunning ? 'Pausar' : 'Iniciar'}
              </button>
              <button 
                onClick={() => { setIsRunning(false); setSeconds(1500); }} 
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                Reiniciar
              </button>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-xl p-2 text-[8px] flex justify-between items-center">
              <span className="text-white/60 font-bold">Recompensa estimada:</span>
              <span className="text-amber-400 font-black flex items-center gap-1"><Zap size={10} fill="currentColor" /> +150 XP</span>
            </div>
          </div>
        )}

        {/* TAB 2: BLOCKER SIMULATOR */}
        {activeTab === 'blocker' && (
          <div className="flex-1 flex flex-col justify-between space-y-2 overflow-y-auto custom-scroll pr-1">
            <span className="text-[8px] font-black uppercase text-white/40 tracking-widest block">Límites de Aplicaciones</span>
            {[
              { id: 'instagram', name: 'Instagram', sub: 'Límite: 15m/día' },
              { id: 'tiktok', name: 'TikTok', sub: 'Límite: Bloqueado total' },
              { id: 'youtube', name: 'YouTube', sub: 'Límite: 30m/día' },
              { id: 'twitter', name: 'X / Twitter', sub: 'Límite: 10m/día' },
            ].map((app) => {
              const isBlocked = blockedState[app.id];
              return (
                <div key={app.id} className="bg-white/5 border border-white/10 rounded-xl p-2 flex justify-between items-center">
                  <div>
                    <h6 className="text-[9px] font-black uppercase text-white">{app.name}</h6>
                    <span className="text-[7px] text-white/50 font-medium block">{app.sub}</span>
                  </div>
                  <button 
                    onClick={() => toggleAppBlock(app.id)}
                    className={`px-2.5 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest transition-all cursor-pointer ${isBlocked ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'}`}
                  >
                    {isBlocked ? '🔒 Bloqueado' : '🔓 Permitido'}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: AI COACH SIMULATOR */}
        {activeTab === 'ai' && (
          <div className="flex-1 flex flex-col justify-between space-y-2">
            <span className="text-[8px] font-black uppercase text-cyan-400 tracking-widest block">Asistente Conductual IA</span>
            <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'habito', label: '💡 Hábito' },
                { id: 'distraccion', label: '🛡️ Antidistracción' },
                { id: 'examen', label: '📚 Examen' }
              ].map(q => (
                <button 
                  key={q.id}
                  onClick={() => setAiQuery(q.id)}
                  className={`px-2 py-1 rounded-lg text-[7px] font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer ${aiQuery === q.id ? 'bg-cyan-500 text-black font-extrabold' : 'bg-white/10 text-white/60 hover:text-white'}`}
                >
                  {q.label}
                </button>
              ))}
            </div>

            <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-xl p-3 flex-1 flex flex-col justify-center">
              <span className="text-[7px] font-black uppercase text-cyan-300 tracking-widest block mb-1">Recomendación IA:</span>
              <p className="text-[9px] font-medium text-white/90 leading-relaxed italic">
                {aiResponses[aiQuery]}
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: RANKS SIMULATOR */}
        {activeTab === 'ranks' && (
          <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-purple-950/40 to-black/80 border border-purple-500/30 rounded-2xl p-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[8px] font-black uppercase text-purple-300 tracking-widest">Rango Élite</span>
                <span className="text-[8px] font-black text-amber-400">Nivel 3 • Profesional</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10 my-2">
                <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full w-[72%]" />
              </div>
              <span className="text-[7px] font-bold text-white/50 block text-right">3,600 / 5,000 XP</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 my-2">
              <div className="bg-white/5 p-2 rounded-xl text-center border border-white/10">
                <span className="text-xs">🛡️</span>
                <span className="text-[7px] font-black uppercase text-white block mt-1">Escudo Focus</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl text-center border border-white/10">
                <span className="text-xs">👑</span>
                <span className="text-[7px] font-black uppercase text-white block mt-1">Corona Leyenda</span>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav inside Phone Mockup */}
        <div className="pt-2 mt-2 border-t border-white/10 flex justify-around text-white/40 items-center">
          <Home size={14} className="text-indigo-400" />
          <Trophy size={14} />
          <ShoppingBag size={14} />
          <User size={14} />
        </div>

      </div>
    </motion.div>
  );
};

// --- CALCULADORA DE TIEMPO RECUPERADO ---
export const FocusTimeCalculator = ({ onFinish }) => {
  const [dailyHours, setDailyHours] = useState(3);
  
  const yearlyHours = dailyHours * 365;
  const booksRead = Math.round(yearlyHours / 30);
  const projectsDone = Math.round(yearlyHours / 120);
  const xpEarned = yearlyHours * 100;

  return (
    <section id="calculadora" className="bg-gradient-to-b from-[#0a0f1d] via-[#080d19] to-[#040711] border border-slate-800/80 rounded-[36px] p-8 sm:p-12 shadow-2xl relative overflow-hidden font-['Inter',sans-serif]">
      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Calculadora de Impacto</span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            ¿Cuánto tiempo estás perdiendo realmente?
          </h2>
          <p className="text-sm text-slate-400 font-medium max-w-xl mx-auto">
            Mueve el deslizador a las horas aproximadas que pasas diariamente en TikTok, Instagram y otras redes.
          </p>
        </div>

        {/* Slider Controls */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase tracking-widest text-slate-300">Horas en pantalla/día:</span>
            <span className="text-3xl font-black text-indigo-400 bg-indigo-500/10 border border-indigo-500/30 px-5 py-1.5 rounded-2xl">
              {dailyHours} {dailyHours === 1 ? 'Hora' : 'Horas'}
            </span>
          </div>

          <input 
            type="range" 
            min="1" 
            max="8" 
            value={dailyHours}
            onChange={(e) => setDailyHours(parseInt(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>1 hr / día</span>
            <span>4 hrs / día</span>
            <span>8 hrs / día</span>
          </div>
        </div>

        {/* Results Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-white">{yearlyHours.toLocaleString()}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Horas Ahorradas / Año</span>
          </div>

          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-emerald-400">📚 {booksRead}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Libros Leídos Equivalentes</span>
          </div>

          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-amber-400">⚡ {projectsDone}</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">Proyectos Completados</span>
          </div>

          <div className="bg-[#0a0e1a] border border-slate-800 rounded-2xl p-5 text-center space-y-1">
            <span className="text-3xl font-black text-indigo-400">💎 {(xpEarned / 1000).toFixed(1)}k</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">XP Potencial en Focusly</span>
          </div>
        </div>

        <div className="text-center pt-2">
          <button 
            onClick={onFinish}
            className="bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 hover:scale-105 text-white font-black text-xs uppercase tracking-widest px-10 py-4.5 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.5)] transition-all cursor-pointer inline-flex items-center gap-3"
          >
            Recuperar mis {yearlyHours.toLocaleString()} horas con Focusly <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

// --- MATRIZ COMPARATIVA ---
export const FeatureComparisonMatrix = () => (
  <section id="matriz" className="space-y-8 font-['Inter',sans-serif]">
    <div className="text-center space-y-3 max-w-2xl mx-auto">
      <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Comparativa Élite</span>
      <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">¿Por qué Focusly es Superior?</h2>
      <p className="text-sm text-slate-400 font-medium">Diseñado con psicología de conducta y sistemas de juego para garantizar constancia real.</p>
    </div>

    <div className="overflow-x-auto custom-scroll rounded-3xl border border-slate-800 bg-[#070b16]">
      <table className="w-full text-left border-collapse min-w-[600px]">
        <thead>
          <tr className="border-b border-slate-800 bg-[#0c101d] text-xs font-black uppercase tracking-wider text-slate-400">
            <th className="py-4 px-6">Característica</th>
            <th className="py-4 px-6 text-indigo-400 bg-indigo-500/10 border-x border-indigo-500/20">Focusly App</th>
            <th className="py-4 px-6 text-slate-500">Apps Tradicionales</th>
            <th className="py-4 px-6 text-slate-500">Fuerza de Voluntad Sola</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/80 text-xs font-semibold text-slate-300">
          {[
            { feature: 'Bloqueo Activo y Programable', focusly: '✅ Totalmente Configurable', trad: '⚠️ Fácil de Omitir', solo: '❌ Incumplido' },
            { feature: 'Gamificación RPG & Recompensas', focusly: '⚡ XP, Rangos, Gemas y Avatares', trad: '❌ Sin Gamificación', solo: '❌ Cero Recompensa' },
            { feature: 'Asistente IA Conductual', focusly: '🤖 Algoritmo Personalizado', trad: '❌ No Incluido', solo: '❌ No Incluido' },
            { feature: 'Retos de Desintoxicación Digital', focusly: '🔥 Desafíos Diarios Gamificados', trad: '⚠️ Temporizadores Básicos', solo: '❌ Sin Estructura' },
            { feature: 'Sincronización Supabase Cloud', focusly: '🌐 Persistencia en tiempo real', trad: '⚠️ Local Únicamente', solo: '❌ No Aplica' },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
              <td className="py-4 px-6 font-bold text-white">{row.feature}</td>
              <td className="py-4 px-6 font-black text-emerald-400 bg-indigo-500/5 border-x border-indigo-500/20">{row.focusly}</td>
              <td className="py-4 px-6 text-slate-400">{row.trad}</td>
              <td className="py-4 px-6 text-slate-500">{row.solo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

// --- FAQ INTERACTIVO CON BÚSQUEDA ---
export const InteractiveFAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿Cómo funciona el bloqueo de aplicaciones en Focusly?',
      a: 'Focusly te permite establecer límites precisos diarios para redes sociales como TikTok, Instagram o YouTube. Una vez superado el tiempo o durante una sesión de enfoque activa, las notificaciones y accesos se restringen.'
    },
    {
      q: '¿Es totalmente gratis probar Focusly?',
      a: 'Sí. Puedes acceder de forma gratuita e instantánea mediante el Modo Demo o crear tu cuenta sin necesidad de tarjeta de crédito.'
    },
    {
      q: '¿Qué beneficios otorga el sistema de XP y Rangos?',
      a: 'Al completar sesiones Pomodoro y mantener rachas diarias acumulas XP para ascender de Principiante a Leyenda, desbloqueando insignias militares, aspectos de avatares 3D y gemas de la tienda.'
    },
    {
      q: '¿Mis datos personales están seguros en Focusly?',
      a: 'Absolutamente. Utilizamos Supabase Cloud con autenticación JWT y cifrado de punta a punta. No vendemos ni compartimos tus hábitos de uso con terceros.'
    },
    {
      q: '¿Cómo ayuda el Asistente IA Conductual?',
      a: 'Analiza en qué momentos del día experimentas mayor distracción y genera sugerencias automáticas de horarios de estudio, descansos activos y planes de hábitos.'
    }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section id="faq" className="space-y-8 font-['Inter',sans-serif] max-w-3xl mx-auto">
      <div className="text-center space-y-3">
        <span className="text-xs font-black uppercase tracking-[0.25em] text-indigo-400">Preguntas Frecuentes</span>
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">¿Tienes dudas sobre Focusly?</h2>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="BUSCAR EN PREGUNTAS FRECUENTES..."
            className="w-full bg-[#070b16] border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-xs font-bold text-white placeholder-slate-500 outline-none focus:border-indigo-500/50 transition-all shadow-inner"
        />
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="bg-[#070b16] border border-slate-800 rounded-2xl overflow-hidden transition-all">
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 font-black uppercase text-xs tracking-tight text-white hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-indigo-400' : 'text-slate-500'}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-slate-400 font-medium leading-relaxed border-t border-slate-800/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

// --- LANDING PAGE COMPONENT ---
export default function LandingPage({ onFinish = () => {} }) {
  const [activeTab, setActiveTab] = useState('principiante');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#03050d] text-white overflow-y-auto custom-scroll font-['Inter',sans-serif] selection:bg-indigo-500 selection:text-white">
      {/* Dynamic Ambient Background Lights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-950/20 rounded-full blur-[160px]" />
        <div className="absolute top-[25%] right-[-10%] w-[45vw] h-[45vw] bg-slate-900/30 rounded-full blur-[160px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[40vw] h-[40vw] bg-blue-950/20 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-4 z-50 max-w-6xl mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between px-6 py-3.5 rounded-full bg-[#070b16]/90 backdrop-blur-2xl border border-slate-800/80 shadow-[0_10px_35px_rgba(0,0,0,0.7)]">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 rounded-xl bg-black border border-white/20 p-1 flex items-center justify-center shadow-lg">
              <img src={focuslyIcon} alt="Focusly Icon" className="w-full h-full object-contain rounded-lg" />
            </div>
            <img src={focuslyWordmark} alt="Focusly Logo" className="h-6 w-auto object-contain brightness-125 hidden sm:block" />
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            <button onClick={() => scrollToSection('beneficios')} className="hover:text-white transition-colors cursor-pointer">Beneficios</button>
            <button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors cursor-pointer">Cómo Funciona</button>
            <button onClick={() => scrollToSection('progreso')} className="hover:text-white transition-colors cursor-pointer">Progreso</button>
            <button onClick={() => scrollToSection('mockups')} className="hover:text-white transition-colors cursor-pointer">Demostración</button>
            <button onClick={() => scrollToSection('testimonios')} className="hover:text-white transition-colors cursor-pointer">Testimonios</button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onFinish}
              className="bg-white/10 hover:bg-white/20 border border-white/15 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 rounded-full transition-all cursor-pointer hidden sm:block"
            >
              ⚡ Modo Demo
            </button>
            <button 
              onClick={onFinish}
              className="bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 hover:brightness-110 text-white font-black text-[10px] uppercase tracking-widest px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all cursor-pointer flex items-center gap-2"
            >
              Comenzar <ArrowRight size={14} />
            </button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-24 space-y-24 sm:space-y-32">
        
        {/* HERO SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-2">
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-300 text-[10px] font-black uppercase tracking-widest backdrop-blur-md"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span>Plataforma de Alto Rendimiento 2026</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05] text-white"
            >
              Controla tu tiempo. <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_5px_20px_rgba(255,255,255,0.2)]">Mejora tu vida.</span>
            </motion.h1>

            {/* BRAND SLOGAN LOGO BANNER */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.18 }}
              className="py-1 flex items-center justify-center lg:justify-start"
            >
              <div className="bg-[#000000] border border-slate-800/90 px-6 py-3.5 rounded-2xl shadow-2xl inline-flex items-center justify-center border-indigo-500/30">
                <img 
                  src={focuslySlogan} 
                  alt="More Action! Less Distraction" 
                  className="h-10 sm:h-13 w-auto object-contain mix-blend-screen filter brightness-125" 
                />
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Convierte cada minuto lejos de las redes sociales en progreso real mediante retos, recompensas y gamificación conductual.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button 
                onClick={onFinish}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.5)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center gap-3"
              >
                Comenzar <ArrowRight size={16} />
              </button>

              <button 
                onClick={() => scrollToSection('mockups')}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-slate-700 text-white font-black text-xs uppercase tracking-widest px-8 py-4.5 rounded-2xl backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                <Play size={16} className="text-indigo-400" fill="currentColor" /> Ver demostración
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Supabase Cloud DB</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-400" />
                <span>Gamificación AAA</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <InteractivePhoneMockup onFinish={onFinish} />
          </div>
        </section>

        {/* SLIDER CAROUSEL */}
        <LandingImageSlider onFinish={onFinish} />

        {/* CALCULADORA DE TIEMPO RECUPERADO */}
        <FocusTimeCalculator onFinish={onFinish} />

        {/* SECCIÓN DE BENEFICIOS */}
        <section id="beneficios" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Beneficios Principales</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Redefine tu relación con la tecnología</h2>
            <p className="text-sm text-slate-400 font-medium">Diseñado con psicología del comportamiento para ayudarte a reemplazar distracciones por hábitos de alto impacto.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Smartphone,
                title: 'Reduce tu tiempo en redes sociales',
                desc: 'Establece límites inteligentes y recupera el control sobre TikTok, Instagram y YouTube sin esfuerzo.',
                border: 'border-slate-800'
              },
              {
                icon: Trophy,
                title: 'Gana recompensas y sube de nivel',
                desc: 'Acumula XP y diamantes por cada hora de enfoque. Desbloquea avatares, skins y entornos únicos.',
                border: 'border-slate-800'
              },
              {
                icon: Target,
                title: 'Completa retos diarios',
                desc: 'Desafíos gamificados diseñados para estudiantes y jóvenes profesionales que buscan superar sus límites.',
                border: 'border-slate-800'
              },
              {
                icon: TrendingUp,
                title: 'Mejora tus hábitos constantemente',
                desc: 'Analítica avanzada respaldada por IA conductual para monitorear tu evolución día a día.',
                border: 'border-slate-800'
              }
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-[#070b16] border ${card.border} hover:border-indigo-500/50 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xl transition-all duration-300 group`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-indigo-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-black uppercase tracking-tight text-white">{card.title}</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FILOSOFÍA */}
        <section className="bg-[#050814] border border-slate-800/80 rounded-[32px] p-8 sm:p-12 shadow-2xl text-center space-y-6 font-['Inter',sans-serif]">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 block">Filosofía de Vida & Marca</span>
          <div className="flex justify-center py-2">
            <div className="bg-black border border-white/10 px-8 py-5 rounded-3xl shadow-2xl inline-block">
              <img 
                src={focuslySlogan} 
                alt="More Action! Less Distraction" 
                className="h-12 sm:h-18 w-auto object-contain mix-blend-screen filter brightness-125" 
              />
            </div>
          </div>
          <p className="text-sm text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
            Menos tiempo consumiendo contenido ajeno. Más tiempo ejecutando tus metas, estudios y proyectos reales.
          </p>
        </section>

        {/* CÓMO FUNCIONA */}
        <section id="como-funciona" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Paso a Paso</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Cómo Funciona</h2>
            <p className="text-sm text-slate-400 font-medium">Cuatro pasos sencillos para transformar tus hábitos digitales.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { num: '01', title: 'Configura tus objetivos', desc: 'Elige las apps a bloquear y define tus metas diarias de concentración.' },
              { num: '02', title: 'Completa desafíos', desc: 'Inicia sesiones de enfoque sin distracciones y supera los retos diarios.' },
              { num: '03', title: 'Obtén recompensas', desc: 'Acumula experiencia (XP), diamantes e insignias de rango militar.' },
              { num: '04', title: 'Mejora tus hábitos', desc: 'Visualiza tu racha y evoluciona tu mentalidad constantemente.' },
            ].map((step, idx) => (
              <div key={idx} className="relative bg-[#070b16] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-lg hover:border-indigo-500/40 transition-all">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-indigo-400/40">{step.num}</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 shadow-[0_0_12px_#6366f1]" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-black uppercase tracking-tight text-white">{step.title}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRESO */}
        <section id="progreso" className="space-y-12 bg-[#050814] p-8 sm:p-12 rounded-[40px] border border-slate-800/80 shadow-2xl">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Gamificación Élite</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Sistema de Progreso</h2>
            <p className="text-sm text-slate-400 font-medium">Evoluciona tu rango como en los mejores videojuegos de rol.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'principiante', name: 'Principiante', level: 'Nivel 1', color: '#22c55e', tag: 'COMÚN', icon: Sprout, xp: '0 - 500 XP', desc: 'Ideal para dar el primer paso hacia una mente libre de distracciones.' },
              { id: 'novato', name: 'Novato', level: 'Nivel 2', color: '#3b82f6', tag: 'RARO', icon: Shield, xp: '500 - 1.5K XP', desc: 'Incrementa la intensidad y construye constancia diaria firme.' },
              { id: 'profesional', name: 'Profesional', level: 'Nivel 3', color: '#a855f7', tag: 'ÉPICO', icon: Flame, xp: '1.5K - 3.5K XP', desc: 'Para mentes enfocadas que buscan transformar su rendimiento académico.' },
              { id: 'leyenda', name: 'Leyenda', level: 'Nivel 4', color: '#eab308', tag: 'LEGENDARIO', icon: Crown, xp: '3.5K+ XP', desc: 'Dominio absoluto del tiempo. Cero excusas, disciplina de nivel élite.' },
            ].map(lvl => {
              const Icon = lvl.icon;
              const isSel = activeTab === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setActiveTab(lvl.id)}
                  className={`p-6 rounded-3xl border text-left flex flex-col justify-between space-y-4 transition-all cursor-pointer ${isSel ? 'bg-[#0e1526] border-indigo-500 shadow-2xl scale-[1.02]' : 'bg-[#070b16] border-slate-800 hover:bg-[#0a0f1d]'}`}
                  style={{ borderColor: isSel ? lvl.color : 'rgba(255,255,255,0.1)' }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md" style={{ color: lvl.color, backgroundColor: `${lvl.color}20` }}>{lvl.tag}</span>
                    <Icon size={24} style={{ color: lvl.color }} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-black uppercase text-white">{lvl.name}</h4>
                    <span className="text-[10px] font-bold text-slate-500 block">{lvl.xp}</span>
                    <p className="text-xs text-slate-400 font-medium pt-2 leading-relaxed">{lvl.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* XP Progress Bar Showcase */}
          <div className="bg-black/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest block">Barra de Experiencia</span>
                <h3 className="text-xl font-black uppercase text-white">Rango Élite de Usuario</h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase flex items-center gap-2">
                <Crown size={16} /> 7,450 / 10,000 XP
              </div>
            </div>

            <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
              <motion.div initial={{ width: '0%' }} animate={{ width: '74.5%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 rounded-full shadow-[0_0_15px_#f59e0b]" />
            </div>

            {/* Badges Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {[
                { title: 'Insignia Foco', desc: '100 Horas sin Redes', icon: Zap, color: 'text-indigo-400' },
                { title: 'Fuego Santo', desc: 'Racha de 30 Días', icon: Flame, color: 'text-amber-400' },
                { title: 'Guardián Égida', desc: 'Nivel Élite', icon: Shield, color: 'text-purple-400' },
                { title: 'Campeón Místico', desc: 'Top 1% Global', icon: Trophy, color: 'text-emerald-400' },
              ].map((badge, i) => {
                const BIcon = badge.icon;
                return (
                  <div key={i} className="bg-white/5 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <BIcon size={20} className={badge.color} />
                    </div>
                    <div>
                      <h5 className="text-xs font-black uppercase text-white">{badge.title}</h5>
                      <span className="text-[9px] text-slate-400 font-medium block">{badge.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MATRIZ COMPARATIVA */}
        <FeatureComparisonMatrix />

        {/* DEMOSTRACIÓN VISUAL */}
        <section id="mockups" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Demostración Visual</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Capturas de la Aplicación</h2>
            <p className="text-sm text-slate-400 font-medium">Una interfaz diseñada minuciosamente para inspirarte y mantenerte enfocado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
            {[
              {
                title: 'Panel de Control',
                tag: 'DASHBOARD',
                desc: 'Visualiza tus misiones diarias, racha de atención y el estado en tiempo real del bloqueador.',
                mockupContent: (
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-indigo-400 uppercase">Focusly Dashboard</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">En Línea</span>
                    </div>
                    <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-3 text-center">
                      <span className="text-[8px] font-bold uppercase text-white/50 block">Sesión en Curso</span>
                      <div className="text-xl font-black text-white my-1">25 : 00</div>
                      <span className="text-[8px] font-bold text-amber-300 uppercase"> Recompensa: +150 XP</span>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-black uppercase text-white/40">Apps Limitadas</span>
                      <div className="bg-white/5 p-2 rounded-lg text-[9px] flex justify-between font-bold"><span>Instagram</span><span className="text-red-400">Bloqueado</span></div>
                      <div className="bg-white/5 p-2 rounded-lg text-[9px] flex justify-between font-bold"><span>TikTok</span><span className="text-red-400">Bloqueado</span></div>
                    </div>
                  </div>
                )
              },
              {
                title: 'Colección de Avatares',
                tag: 'TIENDA & SKIN',
                desc: 'Equipa personajes 3D animados con auras y aspectos exclusivos.',
                mockupContent: (
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-purple-400 uppercase">Colección & Avatares</span>
                      <span className="text-[9px] text-amber-300 font-black"> 4,500 Gemas</span>
                    </div>
                    <div className="bg-purple-900/40 border border-purple-500/30 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-2xl shadow-[0_0_20px_#a855f7] mb-2">
                        🔥
                      </div>
                      <h6 className="text-xs font-black uppercase text-white">Fuego Primordial</h6>
                      <span className="text-[8px] font-bold text-purple-300 uppercase">Rango Épico</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                      <div className="bg-white/5 p-2 rounded-lg text-center text-xs">🛡️</div>
                      <div className="bg-white/5 p-2 rounded-lg text-center text-xs">👑</div>
                      <div className="bg-white/5 p-2 rounded-lg text-center text-xs">💎</div>
                    </div>
                  </div>
                )
              },
              {
                title: 'Asistente IA Conductual',
                tag: 'INTELIGENCIA ARTIFICIAL',
                desc: 'Análisis inteligente en tiempo real para optimizar tu horario de estudio y descansos.',
                mockupContent: (
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-cyan-400 uppercase">IA Coach Focusly</span>
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">Activo</span>
                    </div>
                    <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-xl p-3 space-y-2">
                      <span className="text-[8px] font-bold uppercase text-cyan-300 block">Recomendación Personalizada</span>
                      <p className="text-[9px] font-medium text-white/80 leading-relaxed">
                        "Detectamos mayor distracción entre las 4 PM y 6 PM. Te sugerimos activar el reto Ayuno de Redes durante ese bloque."
                      </p>
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-xl text-[9px] font-bold flex justify-between items-center">
                      <span>Plan de Hábitos Creado</span>
                      <span className="text-emerald-400">100% Optimizado</span>
                    </div>
                  </div>
                )
              }
            ].map((mock, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-[#070b16] border border-slate-800 rounded-3xl p-4 shadow-2xl flex flex-col space-y-4 hover:border-indigo-500/40 transition-all"
              >
                <div className="w-full aspect-[9/16] bg-[#03050d] rounded-2xl border-2 border-slate-800 overflow-hidden relative shadow-inner">
                  {mock.mockupContent}
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">{mock.tag}</span>
                  <h4 className="text-base font-black uppercase text-white">{mock.title}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{mock.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ESTADÍSTICAS REALES */}
        <section className="bg-gradient-to-r from-slate-900/80 via-indigo-950/80 to-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: 'Supabase', label: 'Base de Datos Realtime' },
              { num: 'OAuth & JWT', label: 'Autenticación Segura' },
              { num: 'Realtime DB', label: 'Sincronización en Nube' },
              { num: '0 ms', label: 'Persistencia Directa' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white bg-gradient-to-r from-indigo-300 via-slate-200 to-white bg-clip-text text-transparent">{stat.num}</div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <InteractiveFAQ />

        {/* TESTIMONIOS */}
        <section id="testimonios" className="space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">Testimonios</span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">Lo que dice nuestra comunidad</h2>
            <p className="text-sm text-slate-400 font-medium">Historias reales de jóvenes que transformaron su rendimiento digital.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Mateo R.',
                role: 'Estudiante de Medicina',
                comment: 'Pasé de gastar 5 horas al día en TikTok a estudiar sin distracciones. El sistema de XP me enganchó desde el primer día.',
                gradient: 'from-blue-500 to-indigo-600'
              },
              {
                name: 'Valeria G.',
                role: 'Ingeniería de Software',
                comment: 'Focusly se siente como jugar un RPG de productividad. Bloquear mi teléfono nunca había sido tan gratificante.',
                gradient: 'from-purple-500 to-pink-600'
              },
              {
                name: 'Lucas S.',
                role: 'Estudiante de Bachillerato',
                comment: 'Gracias a los desafíos y mentores IA logré organizar mis exámenes sin ansiedad. Es la mejor app que he probado.',
                gradient: 'from-amber-500 to-orange-600'
              }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -4 }}
                className="bg-[#070b16] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between"
              >
                <p className="text-xs text-slate-300 font-medium italic leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-3 pt-2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${t.gradient} flex items-center justify-center text-xs font-black uppercase text-white shadow-md`}>
                    {t.name.substring(0, 2)}
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase text-white">{t.name}</h5>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest block">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#090e1f] via-[#0d142b] to-[#090e1f] p-8 sm:p-16 border border-slate-800 shadow-[0_0_80px_rgba(15,23,42,0.8)] text-center space-y-8">
          <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">Empieza Tu Transformación</span>
            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">Empieza hoy a recuperar tu tiempo.</h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Únete a miles de jóvenes que ya están convirtiendo sus distracciones en logros reales.
            </p>
          </div>

          <div className="relative z-10 pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onFinish}
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-500 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl shadow-[0_0_35px_rgba(99,102,241,0.4)] hover:scale-105 transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-3"
            >
              Comenzar ahora <ArrowRight size={18} />
            </button>
            <button 
              onClick={onFinish}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-slate-700 text-white font-black text-xs uppercase tracking-widest px-10 py-5 rounded-2xl backdrop-blur-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              ⚡ Modo Demo Directo
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-[#020409] py-12 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black border border-white/20 p-1 flex items-center justify-center shadow-lg">
              <img src={focuslyIcon} alt="Focusly Icon" className="w-full h-full object-contain rounded-md" />
            </div>
            <img src={focuslyWordmark} alt="Focusly Logo" className="h-6 w-auto object-contain brightness-125" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors cursor-pointer">Inicio</button>
            <button onClick={() => scrollToSection('beneficios')} className="hover:text-white transition-colors cursor-pointer">Beneficios</button>
            <button onClick={() => scrollToSection('como-funciona')} className="hover:text-white transition-colors cursor-pointer">Cómo Funciona</button>
            <button onClick={() => scrollToSection('progreso')} className="hover:text-white transition-colors cursor-pointer">Progreso</button>
            <button onClick={() => scrollToSection('testimonios')} className="hover:text-white transition-colors cursor-pointer">Testimonios</button>
          </div>

          <div className="text-xs font-medium text-slate-500 text-center md:text-right">
            © 2026 Focusly Inc. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
