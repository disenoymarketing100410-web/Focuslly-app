// src/components/MasteryCourseModal.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Play, 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Gem, 
  Laptop, 
  Brain, 
  Lock, 
  Trophy, 
  Star, 
  Volume2, 
  VolumeX, 
  Gift, 
  Heart, 
  ChevronRight, 
  Gamepad2, 
  RotateCcw, 
  Timer, 
  Flame, 
  ShieldCheck, 
  Layers,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { MASTERIES_DATA } from '../data/masteries';
import { MASTERY_MINIGAMES, COACH_TIPS } from '../data/masteryMinigames';
import { KhanSyllabusView } from './mastery/KhanSyllabusView';
import { KhanDuolingoClassroom } from './mastery/KhanDuolingoClassroom';
import { MasteryUnitChallengeModal } from './mastery/MasteryUnitChallengeModal';

// ==========================================
// 🔊 SOUND SYNTHESIZER (WEB AUDIO API)
// ==========================================
const playSound = (type, soundEnabled = true) => {
  if (!soundEnabled || typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'click' || type === 'select') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.05);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'hit') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'correct') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.08, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.25);
      });
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(130, now + 0.2);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'victory' || type === 'chest') {
      [523.25, 659.25, 783.99, 1046.50, 1318.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.1, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.35);
      });
    }
  } catch {
    // Audio fallback
  }
};

// ==========================================
// 💎 CONFETTI EFFECT
// ==========================================
const ConfettiBurst = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 42 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 440,
      y: (Math.random() - 0.7) * 340,
      rot: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
      color: ['#3B82F6', '#F59E0B', '#6366F1', '#EC4899', '#06B6D4', '#8B5CF6', '#10B981'][i % 7],
      shape: i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-md' : 'rounded-none'
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [1, 1, 0],
            x: p.x,
            y: p.y + 140,
            scale: [0, p.scale, p.scale * 0.7],
            rotate: p.rot + 360
          }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute w-3 h-3 ${p.shape} shadow-md`}
          style={{ backgroundColor: p.color }}
        />
      ))}
    </div>
  );
};

// Zigzag offsets for the winding Duolingo path
const ZIGZAG_OFFSETS = [0, 48, 20, -20, -48, 0];

export const MasteryCourseModal = ({ 
  mastery, 
  completedClasses = [], 
  onCompleteClass, 
  onClose, 
  isLight = false,
  initialClass = null,
  initialUnitChallenge = null,
  initialViewMode = 'khan'
}) => {
  const [activeCourseId, setActiveCourseId] = useState(mastery?.id || MASTERIES_DATA[0].id);
  const activeMastery = useMemo(() => {
    return MASTERIES_DATA.find(m => m.id === activeCourseId) || mastery || MASTERIES_DATA[0];
  }, [activeCourseId, mastery]);

  // Main modes: 'khan' (Khan Academy Syllabus) | 'path' (Duolingo Path) | 'lesson' | 'arcade'
  const [viewMode, setViewMode] = useState(initialClass ? 'lesson' : initialViewMode);
  const [activeLesson, setActiveLesson] = useState(initialClass || null);
  const [activeMinigameType, setActiveMinigameType] = useState('pairs'); // 'pairs' | 'blitz' | 'scramble'
  const [unitChallengeData, setUnitChallengeData] = useState(initialUnitChallenge || null);

  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem('focusly_sound_enabled') !== 'false';
    } catch {
      return true;
    }
  });

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('focusly_sound_enabled', String(next));
      } catch {}
      return next;
    });
  };

  const [claimedChests, setClaimedChests] = useState(() => {
    try {
      const saved = localStorage.getItem('focusly_claimed_chests');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [coachTipIndex, setCoachTipIndex] = useState(0);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [guidebookUnit, setGuidebookUnit] = useState(null);
  const [chestModalData, setChestModalData] = useState(null);
  const [chestHits, setChestHits] = useState(0); // 3 hits to break lock!

  // Next coach tip on click
  const cycleCoachTip = () => {
    playSound('click', soundEnabled);
    setCoachTipIndex(prev => (prev + 1) % COACH_TIPS.length);
  };

  // Metrics
  const totalClassesCount = activeMastery.classes.length;
  const completedInCourseCount = activeMastery.classes.filter(c => completedClasses.includes(c.id)).length;
  const courseProgressPct = Math.round((completedInCourseCount / totalClassesCount) * 100);
  const isCourseFinished = completedInCourseCount === totalClassesCount;

  // Group classes by unit
  const units = useMemo(() => {
    const levelMap = {};
    activeMastery.classes.forEach((cls) => {
      const lvl = cls.level || 1;
      if (!levelMap[lvl]) {
        levelMap[lvl] = {
          level: lvl,
          levelName: cls.levelName || `Nivel ${lvl}`,
          classes: []
        };
      }
      levelMap[lvl].classes.push(cls);
    });
    return Object.values(levelMap).sort((a, b) => a.level - b.level);
  }, [activeMastery]);

  // Target class
  const nextTargetClassId = useMemo(() => {
    const nextCls = activeMastery.classes.find(c => !completedClasses.includes(c.id));
    return nextCls ? nextCls.id : null;
  }, [activeMastery, completedClasses]);

  // Handle hitting chest
  const handleHitChest = (unitLevel) => {
    const chestId = `${activeMastery.id}_lvl_${unitLevel}`;
    if (claimedChests.includes(chestId)) return;

    playSound('hit', soundEnabled);
    const nextHits = chestHits + 1;
    setChestHits(nextHits);

    if (nextHits >= 3) {
      playSound('victory', soundEnabled);
      const updated = [...claimedChests, chestId];
      setClaimedChests(updated);
      try {
        localStorage.setItem('focusly_claimed_chests', JSON.stringify(updated));
      } catch {}

      const bonusXp = 100;
      const bonusDiamonds = 35;
      if (onCompleteClass) {
        onCompleteClass(
          { id: `chest_${chestId}`, xp: bonusXp, diamonds: bonusDiamonds },
          activeMastery
        );
      }

      setChestModalData({
        unitLevel,
        isOpened: true,
        xp: bonusXp,
        diamonds: bonusDiamonds
      });
      setChestHits(0);
    }
  };

  const handleLaunchLesson = (cls) => {
    playSound('click', soundEnabled);
    setActiveLesson(cls);
    setSelectedNodeData(null);
    setViewMode('lesson');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 16 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className={`w-full max-w-4xl h-[94vh] max-h-[920px] rounded-[32px] border shadow-[0_25px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden relative ${
          isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0b0c10] border-white/10 text-white'
        }`}
      >
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-gradient-to-b from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* ========================================================= */}
        {/* 1. TOP BAR: DUOLINGO STATS & COURSE SWITCHER              */}
        {/* ========================================================= */}
        <header className={`px-5 sm:px-7 py-3.5 border-b flex items-center justify-between gap-4 shrink-0 relative z-30 backdrop-blur-xl ${
          isLight ? 'bg-white/90 border-zinc-200' : 'bg-[#0f1015]/90 border-white/10'
        }`}>
          {/* Course Selector Capsule */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-sm">
              {activeMastery.icon === 'Laptop' ? <Laptop size={20} /> : activeMastery.icon === 'Brain' ? <Brain size={20} /> : <BookOpen size={20} />}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">
                  Academia Élite
                </span>
                <span className="text-[10px] font-bold text-amber-400 flex items-center gap-0.5">
                  <Sparkles size={11} className="fill-amber-400 text-amber-400" />
                  +{activeMastery.xpPerClass} XP/clase
                </span>
              </div>

              <select
                value={activeCourseId}
                onChange={(e) => {
                  playSound('click', soundEnabled);
                  setActiveCourseId(e.target.value);
                  setSelectedNodeData(null);
                  if (viewMode === 'lesson') setViewMode('path');
                }}
                className={`text-xs sm:text-sm font-black uppercase tracking-tight bg-transparent pr-3 cursor-pointer outline-none truncate max-w-[170px] sm:max-w-xs ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}
              >
                {MASTERIES_DATA.map(m => (
                  <option key={m.id} value={m.id} className={isLight ? 'bg-white text-zinc-900' : 'bg-[#12131a] text-white'}>
                    {m.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mode Switcher Pills: Khan Academy Plan de Estudios vs Camino vs Arcade */}
          <div className={`hidden md:flex items-center p-1 rounded-2xl border ${
            isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/5 border-white/10'
          }`}>
            <button
              onClick={() => {
                playSound('click', soundEnabled);
                setViewMode('khan');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'khan'
                  ? (isLight ? 'bg-white text-zinc-950 shadow-sm' : 'bg-blue-600 text-white shadow-md')
                  : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white')
              }`}
            >
              <GraduationCap size={14} className={viewMode === 'khan' ? 'text-white' : ''} />
              <span>Plan de Estudios</span>
            </button>

            <button
              onClick={() => {
                playSound('click', soundEnabled);
                setViewMode('path');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'path'
                  ? (isLight ? 'bg-white text-zinc-950 shadow-sm' : 'bg-blue-600 text-white shadow-md')
                  : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white')
              }`}
            >
              <Star size={13} className={viewMode === 'path' ? 'fill-current' : ''} />
              <span>El Camino</span>
            </button>

            <button
              onClick={() => {
                playSound('click', soundEnabled);
                setViewMode('arcade');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'arcade'
                  ? (isLight ? 'bg-white text-zinc-950 shadow-sm' : 'bg-amber-500 text-black shadow-md')
                  : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white')
              }`}
            >
              <Gamepad2 size={13} />
              <span>Arcade Minijuegos</span>
            </button>
          </div>

          {/* Topbar Right Stats: Hearts, Gems & Audio */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Duolingo Progress Capsule */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black ${
              isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-white'
            }`}>
              <CheckCircle2 size={14} className="text-blue-400" />
              <span>{completedInCourseCount}/{totalClassesCount}</span>
              <span className="text-[10px] text-blue-400">({courseProgressPct}%)</span>
            </div>

            {/* Gems */}
            <div className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-black ${
              isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-800' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
            }`}>
              <Gem size={13} className="fill-cyan-400 text-cyan-400" />
              <span>+{activeMastery.diamondsPerClass}</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundEnabled 
                  ? (isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/10 border-white/15 text-white')
                  : (isLight ? 'bg-zinc-200 border-zinc-300 text-zinc-400' : 'bg-white/5 border-white/10 text-white/40')
              }`}
            >
              {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isLight 
                  ? 'border-zinc-200 bg-white hover:bg-zinc-100 text-zinc-700' 
                  : 'border-white/15 bg-white/5 hover:bg-white/15 text-white/80 hover:text-white'
              }`}
            >
              <X size={17} />
            </button>
          </div>
        </header>

        {/* Mobile Navigation bar for Khan Syllabus vs Camino vs Arcade */}
        <div className={`flex md:hidden border-b px-4 py-2 justify-center gap-1.5 shrink-0 ${
          isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0f1015] border-white/10'
        }`}>
          <button
            onClick={() => setViewMode('khan')}
            className={`flex-1 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 ${
              viewMode === 'khan' ? 'bg-blue-600 text-white' : 'text-zinc-400'
            }`}
          >
            <GraduationCap size={12} />
            <span>Plan</span>
          </button>
          <button
            onClick={() => setViewMode('path')}
            className={`flex-1 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 ${
              viewMode === 'path' ? 'bg-blue-600 text-white' : 'text-zinc-400'
            }`}
          >
            <Star size={12} />
            <span>Camino</span>
          </button>
          <button
            onClick={() => setViewMode('arcade')}
            className={`flex-1 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1 ${
              viewMode === 'arcade' ? 'bg-amber-500 text-black' : 'text-zinc-400'
            }`}
          >
            <Gamepad2 size={12} />
            <span>Arcade</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. BODY CONTENT: PATH / ARCADE / LESSON RUNNER            */}
        {/* ========================================================= */}
        <div className="flex-1 overflow-y-auto custom-scroll relative flex flex-col">
          <AnimatePresence mode="wait">

            {/* VIEW 0: KHAN ACADEMY SYLLABUS & MASTERY DASHBOARD */}
            {viewMode === 'khan' && (
              <motion.div
                key="view-khan"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 w-full"
              >
                <KhanSyllabusView
                  activeMastery={activeMastery}
                  units={units}
                  completedClasses={completedClasses}
                  nextTargetClassId={nextTargetClassId}
                  isLight={isLight}
                  onLaunchLesson={handleLaunchLesson}
                  onLaunchUnitChallenge={(unit) => {
                    playSound('click', soundEnabled);
                    setUnitChallengeData(unit);
                  }}
                />
              </motion.div>
            )}
            
            {/* VIEW A: DUOLINGO S-CURVE PATH */}
            {viewMode === 'path' && (
              <motion.div
                key="view-path"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex-1 flex flex-col items-center py-6 sm:py-8 px-4 max-w-xl mx-auto w-full relative"
              >
                {/* DUOLINGO COACH MASCOT BANNER */}
                <div 
                  onClick={cycleCoachTip}
                  className={`w-full p-4 sm:p-5 rounded-3xl border mb-8 flex items-center gap-4 cursor-pointer transition-all shadow-md group ${
                    isLight 
                      ? 'bg-zinc-50 hover:bg-zinc-100/80 border-zinc-200 text-zinc-900' 
                      : 'bg-white/[0.04] hover:bg-white/[0.07] border-white/10 text-white'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-zinc-950 flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                    🦉
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-500">
                        Coach FocusDuo
                      </span>
                      <span className="text-[9px] text-zinc-400 opacity-60">
                        (Toca para otro tip)
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] font-semibold mt-0.5 leading-snug truncate sm:whitespace-normal">
                      {COACH_TIPS[coachTipIndex]}
                    </p>
                  </div>
                  <div className="text-xs text-zinc-400 shrink-0">
                    <ChevronRight size={16} />
                  </div>
                </div>

                {/* Course Overview Card */}
                <div className={`w-full p-5 rounded-3xl border mb-10 relative overflow-hidden backdrop-blur-md shadow-sm ${
                  isLight 
                    ? 'bg-white border-zinc-200 text-zinc-900' 
                    : 'bg-[#12131a] border-white/10 text-white'
                }`}>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 block">
                        Ruta de Maestría
                      </span>
                      <h2 className="text-base sm:text-lg font-black uppercase tracking-tight">
                        {activeMastery.title}
                      </h2>
                    </div>
                    <span className="text-xs font-black text-blue-400">
                      {courseProgressPct}% Listo
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 h-2 rounded-full bg-zinc-200 dark:bg-black/60 overflow-hidden border border-white/10 p-0.5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(4, courseProgressPct)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* ========================================================= */}
                {/* DUOLINGO WINDING PATH WITH CHUNKY 3D BUTTONS              */}
                {/* ========================================================= */}
                <div className="w-full space-y-12 sm:space-y-14 pb-16">
                  {units.map((unit) => {
                    const unitCompletedCount = unit.classes.filter(c => completedClasses.includes(c.id)).length;
                    const isUnitFullyDone = unitCompletedCount === unit.classes.length;
                    const chestId = `${activeMastery.id}_lvl_${unit.level}`;
                    const isChestClaimed = claimedChests.includes(chestId);

                    return (
                      <div key={`unit-${unit.level}`} className="relative flex flex-col items-center">
                        
                        {/* UNIT BANNER (DUOLINGO HEADER) */}
                        <div className={`w-full rounded-2xl p-4 sm:p-5 mb-8 border flex items-center justify-between gap-4 shadow-sm ${
                          isLight 
                            ? 'bg-zinc-100 border-zinc-200 text-zinc-900' 
                            : 'bg-white/[0.05] border-white/10 text-white'
                        }`}>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 tracking-widest">
                                UNIDAD {unit.level}
                              </span>
                              <span className={`text-[10px] font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                {unitCompletedCount}/{unit.classes.length} clases
                              </span>
                            </div>
                            <h3 className="text-sm sm:text-base font-black uppercase tracking-tight truncate">
                              {unit.levelName}
                            </h3>
                          </div>

                          <button
                            onClick={() => {
                              playSound('click', soundEnabled);
                              setGuidebookUnit(unit);
                            }}
                            className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                              isLight
                                ? 'bg-white border-zinc-200 text-zinc-800 hover:bg-zinc-50 shadow-xs'
                                : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                            }`}
                          >
                            <BookOpen size={13} />
                            <span>Guía Rápida</span>
                          </button>
                        </div>

                        {/* STEPPING NODES (DUOLINGO 3D CHUNKY BUTTONS) */}
                        <div className="w-full flex flex-col items-center relative py-2">
                          
                          {/* Sinuous Trail Line in background */}
                          <div className="absolute top-6 bottom-6 w-1.5 bg-gradient-to-b from-blue-500/30 via-indigo-400/30 to-blue-600/30 rounded-full pointer-events-none -z-0" />

                          {unit.classes.map((cls, clsIdx) => {
                            const originalIndex = activeMastery.classes.findIndex(c => c.id === cls.id);
                            const isDone = completedClasses.includes(cls.id);
                            const isNextTarget = nextTargetClassId === cls.id;
                            const isLocked = !isDone && !isNextTarget && originalIndex > 0 && !completedClasses.includes(activeMastery.classes[originalIndex - 1].id);

                            const xOffset = ZIGZAG_OFFSETS[clsIdx % ZIGZAG_OFFSETS.length];

                            return (
                              <div
                                key={cls.id}
                                className="relative my-4 sm:my-5 z-10 flex flex-col items-center"
                                style={{ transform: `translateX(${xOffset}px)` }}
                              >
                                {/* Tooltip for Next Active Step */}
                                {isNextTarget && (
                                  <motion.div
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                    className="absolute -top-9 px-3 py-1 bg-white text-zinc-950 text-[9px] font-black uppercase tracking-wider rounded-xl shadow-lg whitespace-nowrap z-20 border border-zinc-200 flex items-center gap-1"
                                  >
                                    <Sparkles size={11} className="text-amber-500 fill-amber-500" />
                                    <span>¡EMPEZAR!</span>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                                  </motion.div>
                                )}

                                {/* Concentric pulse ring on active node */}
                                {isNextTarget && (
                                  <motion.div
                                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-2 rounded-full border-2 border-blue-400/60 pointer-events-none"
                                  />
                                )}

                                {/* 3D DUOLINGO CHUNKY CIRCLE BUTTON */}
                                <motion.button
                                  whileHover={{ scale: 1.08, y: -2 }}
                                  whileTap={{ scale: 0.94, y: 2 }}
                                  onClick={() => {
                                    playSound('click', soundEnabled);
                                    setSelectedNodeData(cls);
                                  }}
                                  className={`w-18 h-18 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center relative cursor-pointer select-none transition-all border-b-4 active:border-b-0 ${
                                    isDone
                                      ? 'bg-blue-600 border-blue-800 text-white shadow-lg shadow-blue-500/20'
                                      : isNextTarget
                                      ? 'bg-blue-500 border-blue-700 text-white shadow-xl shadow-blue-500/30 ring-4 ring-blue-500/20'
                                      : isLocked
                                      ? (isLight 
                                          ? 'bg-zinc-200 border-zinc-300 text-zinc-400' 
                                          : 'bg-zinc-800 border-zinc-900 text-zinc-500')
                                      : 'bg-indigo-600 border-indigo-800 text-white shadow-md'
                                  }`}
                                >
                                  {isDone ? (
                                    <div className="flex flex-col items-center justify-center">
                                      <Check size={24} strokeWidth={3.5} />
                                      <span className="text-[8px] font-black uppercase">Listo</span>
                                    </div>
                                  ) : isNextTarget ? (
                                    <div className="flex flex-col items-center justify-center">
                                      <Play size={22} className="fill-white translate-x-0.5" />
                                      <span className="text-[8px] font-black uppercase">Clase {originalIndex + 1}</span>
                                    </div>
                                  ) : isLocked ? (
                                    <div className="flex flex-col items-center justify-center">
                                      <Lock size={18} />
                                      <span className="text-[8px] font-bold mt-0.5">{originalIndex + 1}</span>
                                    </div>
                                  ) : (
                                    <div className="flex flex-col items-center justify-center">
                                      <Star size={20} className="fill-white" />
                                      <span className="text-[8px] font-black">{originalIndex + 1}</span>
                                    </div>
                                  )}

                                  {/* Completed badge */}
                                  {isDone && (
                                    <div className="absolute -top-1.5 -right-1 bg-amber-400 text-amber-950 rounded-full p-1 shadow-sm border border-amber-300">
                                      <Award size={11} />
                                    </div>
                                  )}
                                </motion.button>

                                {/* Lesson Title */}
                                <div className="mt-2 text-center max-w-[130px]">
                                  <span className={`text-[10px] font-bold uppercase tracking-tight block truncate ${
                                    isDone 
                                      ? 'text-blue-500 font-black' 
                                      : isNextTarget 
                                      ? 'text-blue-400 font-black' 
                                      : isLight ? 'text-zinc-600' : 'text-zinc-400'
                                  }`}>
                                    {cls.title.replace(/^Clase \d+:\s*/, '')}
                                  </span>
                                  <span className={`text-[9px] font-semibold ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                                    ⏱ {cls.duration}
                                  </span>
                                </div>
                              </div>
                            );
                          })}

                          {/* INTERACTIVE TREASURE CHEST AT END OF UNIT */}
                          <div className="mt-6 z-10 flex flex-col items-center">
                            <motion.button
                              whileHover={{ scale: isUnitFullyDone && !isChestClaimed ? 1.12 : 1.04, y: -2 }}
                              whileTap={{ scale: 0.94 }}
                              onClick={() => {
                                playSound('click', soundEnabled);
                                setChestModalData({
                                  unitLevel: unit.level,
                                  alreadyClaimed: isChestClaimed,
                                  isLocked: !isUnitFullyDone,
                                  xp: 100,
                                  diamonds: 35
                                });
                              }}
                              className={`w-16 h-16 sm:w-18 sm:h-18 rounded-3xl flex flex-col items-center justify-center relative cursor-pointer transition-all border-b-4 active:border-b-0 ${
                                isUnitFullyDone && !isChestClaimed
                                  ? 'bg-gradient-to-tr from-amber-400 to-yellow-400 border-amber-600 text-amber-950 shadow-lg shadow-amber-500/30 animate-bounce'
                                  : isChestClaimed
                                  ? (isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-400' : 'bg-white/5 border-white/10 text-zinc-500')
                                  : (isLight ? 'bg-zinc-200 border-zinc-300 text-zinc-400' : 'bg-white/5 border-white/10 text-zinc-600')
                              }`}
                            >
                              <Gift size={26} className={isUnitFullyDone && !isChestClaimed ? 'animate-pulse' : ''} />
                              <span className="text-[8px] font-black uppercase mt-1">
                                {isChestClaimed ? 'Reclamado' : 'Cofre'}
                              </span>
                            </motion.button>
                            <span className={`text-[10px] font-bold mt-1.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                              {isChestClaimed ? '✓ Abierto' : isUnitFullyDone ? '¡Listo para abrir!' : `Completa Unidad ${unit.level}`}
                            </span>
                          </div>

                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VIEW B: ARCADE DE MINIJUEGOS DE MAESTRÍA */}
            {viewMode === 'arcade' && (
              <MasteryArcadeHub
                activeMastery={activeMastery}
                soundEnabled={soundEnabled}
                isLight={isLight}
                onReward={(reward) => {
                  playSound('victory', soundEnabled);
                  if (onCompleteClass) {
                    onCompleteClass(
                      { id: `minigame_${Date.now()}`, xp: reward.xp, diamonds: reward.diamonds },
                      activeMastery
                    );
                  }
                }}
              />
            )}

            {/* VIEW C: KHAN ACADEMY + DUOLINGO CLASSROOM RUNNER */}
            {viewMode === 'lesson' && activeLesson && (
              <KhanDuolingoClassroom
                lesson={activeLesson}
                mastery={activeMastery}
                soundEnabled={soundEnabled}
                isLight={isLight}
                playSound={playSound}
                onComplete={() => {
                  if (onCompleteClass) {
                    onCompleteClass(activeLesson, activeMastery);
                  }
                }}
                onBackToCourse={() => {
                  playSound('click', soundEnabled);
                  setViewMode('khan');
                  setActiveLesson(null);
                }}
              />
            )}

          </AnimatePresence>
        </div>

        {/* ========================================================= */}
        {/* MODAL 1: NODE POPUP PREVIEW (CARD BEFORE STARTING)        */}
        {/* ========================================================= */}
        <AnimatePresence>
          {selectedNodeData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedNodeData(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-sm p-6 rounded-3xl border shadow-2xl relative ${
                  isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#12131a] border-white/15 text-white'
                }`}
              >
                <button
                  onClick={() => setSelectedNodeData(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-zinc-400"
                >
                  <X size={16} />
                </button>

                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
                  <Play size={20} className="fill-current" />
                </div>

                <span className="text-[9px] font-black uppercase text-blue-400 tracking-wider block mb-1">
                  {selectedNodeData.levelName || `Nivel ${selectedNodeData.level}`}
                </span>
                <h3 className="text-lg font-black uppercase tracking-tight mb-2">
                  {selectedNodeData.title}
                </h3>
                <p className={`text-xs leading-relaxed mb-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {selectedNodeData.summary}
                </p>

                <div className="flex items-center gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-black uppercase">
                    +{activeMastery.xpPerClass} XP
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-black uppercase">
                    +{activeMastery.diamondsPerClass} 💎
                  </span>
                  <span className={`text-[10px] font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    ⏱ {selectedNodeData.duration}
                  </span>
                </div>

                <button
                  onClick={() => handleLaunchLesson(selectedNodeData)}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-98"
                >
                  <Play size={14} className="fill-white" />
                  <span>{completedClasses.includes(selectedNodeData.id) ? 'Repasar Lección' : 'Comenzar Lección'}</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* MODAL 2: INTERACTIVE CHEST CRACKER (MINIJUEGO DE COFRE)   */}
        {/* ========================================================= */}
        <AnimatePresence>
          {chestModalData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => {
                setChestModalData(null);
                setChestHits(0);
              }}
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-sm p-6 rounded-3xl border shadow-2xl relative text-center ${
                  isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#12131a] border-white/15 text-white'
                }`}
              >
                <button
                  onClick={() => {
                    setChestModalData(null);
                    setChestHits(0);
                  }}
                  className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/10 text-zinc-400"
                >
                  <X size={16} />
                </button>

                {chestModalData.alreadyClaimed ? (
                  <div>
                    <div className="w-16 h-16 mx-auto rounded-3xl bg-zinc-800 text-zinc-400 flex items-center justify-center text-3xl mb-3">
                      📦
                    </div>
                    <h3 className="text-lg font-black uppercase">Cofre ya Reclamado</h3>
                    <p className={`text-xs mt-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Ya abriste este cofre de la Unidad {chestModalData.unitLevel}. ¡Continúa con la siguiente unidad!
                    </p>
                  </div>
                ) : chestModalData.isLocked ? (
                  <div>
                    <div className="w-16 h-16 mx-auto rounded-3xl bg-zinc-800 text-zinc-400 flex items-center justify-center text-3xl mb-3">
                      🔒
                    </div>
                    <h3 className="text-lg font-black uppercase">Cofre Bloqueado</h3>
                    <p className={`text-xs mt-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      Completa todas las lecciones de la <strong>Unidad {chestModalData.unitLevel}</strong> para poder romper el candado.
                    </p>
                  </div>
                ) : chestModalData.isOpened ? (
                  <div>
                    <ConfettiBurst />
                    <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-amber-950 flex items-center justify-center text-4xl mb-4 shadow-xl">
                      🎉
                    </div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      ¡COFRE DESBLOQUEADO!
                    </span>
                    <h3 className="text-xl font-black uppercase mt-2">¡Recompensa Obtenida!</h3>
                    
                    <div className="flex items-center justify-center gap-3 my-5">
                      <div className="px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-sm">
                        +{chestModalData.xp} XP
                      </div>
                      <div className="px-4 py-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-black text-sm">
                        +{chestModalData.diamonds} 💎
                      </div>
                    </div>

                    <button
                      onClick={() => setChestModalData(null)}
                      className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md"
                    >
                      CONTINUAR
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* MINIJUEGO: GOLPEA EL CANDADO 3 VECES */}
                    <div className="mb-3">
                      <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 block mb-1">
                        MINIJUEGO DE APERTURA
                      </span>
                      <h3 className="text-lg font-black uppercase">¡Rompe el Candado!</h3>
                      <p className={`text-xs mt-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        Toca el candado {3 - chestHits} veces más para agrietarlo y reclamar el botín.
                      </p>
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.88, rotate: [0, -6, 6, 0] }}
                      onClick={() => handleHitChest(chestModalData.unitLevel)}
                      className="w-24 h-24 mx-auto my-4 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-400 to-amber-500 border-2 border-amber-300 text-amber-950 flex flex-col items-center justify-center shadow-xl cursor-pointer select-none"
                    >
                      <Gift size={36} className={chestHits > 0 ? 'animate-bounce' : ''} />
                      <span className="text-[9px] font-black uppercase mt-1">
                        {chestHits === 0 ? '¡TOCA AQUÍ!' : `¡GOLPE ${chestHits}/3!`}
                      </span>
                    </motion.button>

                    <div className="flex justify-center gap-1.5 my-2">
                      {[0, 1, 2].map((dot) => (
                        <div
                          key={dot}
                          className={`w-3 h-3 rounded-full transition-all ${
                            dot < chestHits ? 'bg-amber-400 shadow-md scale-110' : 'bg-zinc-700'
                          }`}
                        />
                      ))}
                    </div>

                    <div className="text-[10px] text-zinc-400 font-bold mt-3">
                      Contiene: +100 XP y +35 Gemas 💎
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================= */}
        {/* MODAL 3: QUICK GUIDEBOOK (GUÍA DE ESTUDIO)                 */}
        {/* ========================================================= */}
        <AnimatePresence>
          {guidebookUnit && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setGuidebookUnit(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-lg max-h-[80vh] flex flex-col p-6 rounded-3xl border shadow-2xl relative ${
                  isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#12131a] border-white/15 text-white'
                }`}
              >
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-400" />
                    <h3 className="text-base font-black uppercase tracking-tight">
                      Guía Rápida: {guidebookUnit.levelName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setGuidebookUnit(null)}
                    className="p-1 rounded-full hover:bg-white/10 text-zinc-400"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scroll space-y-4 pr-1">
                  {guidebookUnit.classes.map((cls, idx) => (
                    <div
                      key={cls.id}
                      className={`p-4 rounded-2xl border ${
                        isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[9px] font-black uppercase text-blue-400">
                          Lección {idx + 1}
                        </span>
                        <span className="text-[9px] text-zinc-400 font-bold">
                          ⏱ {cls.duration}
                        </span>
                      </div>
                      <h4 className="text-xs font-black uppercase">{cls.title}</h4>
                      <p className={`text-[11px] mt-1 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {cls.summary}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setGuidebookUnit(null)}
                  className="w-full mt-4 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-black text-xs uppercase tracking-widest"
                >
                  Cerrar Guía
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODAL 3: KHAN ACADEMY UNIT CHALLENGE */}
        <AnimatePresence>
          {unitChallengeData && (
            <MasteryUnitChallengeModal
              unit={unitChallengeData}
              activeMastery={activeMastery}
              soundEnabled={soundEnabled}
              isLight={isLight}
              playSound={playSound}
              onClose={() => setUnitChallengeData(null)}
              onSuccess={(unit) => {
                const bonusXp = 120;
                const bonusDiamonds = 40;
                if (onCompleteClass) {
                  onCompleteClass(
                    { id: `challenge_${activeMastery.id}_lvl_${unit.level}`, xp: bonusXp, diamonds: bonusDiamonds },
                    activeMastery
                  );
                }
              }}
            />
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  );
};

// =========================================================================
// 🕹️ ARCADE DE MINIJUEGOS (MATCH PAIRS, SPEED BLITZ & SCRAMBLE)
// =========================================================================
const MasteryArcadeHub = ({ activeMastery, soundEnabled, isLight, onReward }) => {
  const [activeGame, setActiveGame] = useState('pairs'); // 'pairs' | 'blitz' | 'scramble'

  const minigamesData = useMemo(() => {
    return MASTERY_MINIGAMES[activeMastery.id] || MASTERY_MINIGAMES.mastery_digital_productivity;
  }, [activeMastery]);

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-7 max-w-2xl mx-auto w-full">
      {/* Minigames Selector Pills */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={() => {
            playSound('click', soundEnabled);
            setActiveGame('pairs');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeGame === 'pairs'
              ? 'bg-blue-600 text-white shadow-md'
              : (isLight ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200' : 'bg-white/5 text-zinc-400 hover:bg-white/10')
          }`}
        >
          <span>🧩</span>
          <span>Duelo de Pares</span>
        </button>

        <button
          onClick={() => {
            playSound('click', soundEnabled);
            setActiveGame('blitz');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeGame === 'blitz'
              ? 'bg-amber-500 text-black shadow-md'
              : (isLight ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200' : 'bg-white/5 text-zinc-400 hover:bg-white/10')
          }`}
        >
          <span>⚡</span>
          <span>Ráfaga Veloz</span>
        </button>

        <button
          onClick={() => {
            playSound('click', soundEnabled);
            setActiveGame('scramble');
          }}
          className={`px-4 py-2 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
            activeGame === 'scramble'
              ? 'bg-indigo-600 text-white shadow-md'
              : (isLight ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200' : 'bg-white/5 text-zinc-400 hover:bg-white/10')
          }`}
        >
          <span>📐</span>
          <span>Secuencias</span>
        </button>
      </div>

      {/* RENDER THE CHOSEN MINIGAME */}
      <div className="flex-1 flex flex-col justify-center">
        {activeGame === 'pairs' && (
          <MatchPairsGame
            pairs={minigamesData.pairsGame}
            soundEnabled={soundEnabled}
            isLight={isLight}
            onVictory={(score) => onReward({ xp: 50, diamonds: 15 })}
          />
        )}

        {activeGame === 'blitz' && (
          <SpeedBlitzQuiz
            questions={minigamesData.speedQuiz}
            soundEnabled={soundEnabled}
            isLight={isLight}
            onVictory={(score) => onReward({ xp: 60, diamonds: 20 })}
          />
        )}

        {activeGame === 'scramble' && (
          <WorkflowScrambleGame
            scrambles={minigamesData.workflowScramble}
            soundEnabled={soundEnabled}
            isLight={isLight}
            onVictory={() => onReward({ xp: 45, diamonds: 15 })}
          />
        )}
      </div>
    </div>
  );
};

// =========================================================================
// 🧩 MINIJUEGO 1: DUELO DE PARES (MATCH PAIRS MANIA)
// =========================================================================
const MatchPairsGame = ({ pairs, soundEnabled, isLight, onVictory }) => {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [selectedRight, setSelectedRight] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // Take 5 pairs for a fast, punchy round
  const activePairs = useMemo(() => {
    return pairs.slice(0, 5);
  }, [pairs]);

  // Shuffled rights
  const shuffledRights = useMemo(() => {
    return [...activePairs].sort(() => Math.random() - 0.5);
  }, [activePairs]);

  const handleSelectLeft = (p) => {
    playSound('select', soundEnabled);
    setSelectedLeft(p);
    if (selectedRight) {
      checkMatch(p, selectedRight);
    }
  };

  const handleSelectRight = (p) => {
    playSound('select', soundEnabled);
    setSelectedRight(p);
    if (selectedLeft) {
      checkMatch(selectedLeft, p);
    }
  };

  const checkMatch = (left, right) => {
    setMoves(prev => prev + 1);
    if (left.id === right.id) {
      playSound('correct', soundEnabled);
      const nextMatched = [...matchedIds, left.id];
      setMatchedIds(nextMatched);
      setSelectedLeft(null);
      setSelectedRight(null);

      if (nextMatched.length === activePairs.length) {
        playSound('victory', soundEnabled);
        setGameWon(true);
        onVictory?.({ moves });
      }
    } else {
      playSound('wrong', soundEnabled);
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 500);
    }
  };

  const resetGame = () => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
    setGameWon(false);
    setMoves(0);
  };

  if (gameWon) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <ConfettiBurst />
        <div className="w-20 h-20 rounded-3xl bg-blue-500 text-white flex items-center justify-center text-3xl mb-4 shadow-xl">
          ⚡
        </div>
        <h3 className="text-2xl font-black uppercase">¡Pares Completados!</h3>
        <p className={`text-xs mt-1 max-w-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Emparejaste todos los conceptos en {moves} intentos. ¡Ganaste +50 XP y +15 Gemas!
        </p>
        <button
          onClick={resetGame}
          className="mt-6 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest shadow-md cursor-pointer"
        >
          JUGAR OTRA VEZ
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between text-xs font-bold px-1">
        <span className="text-zinc-400 uppercase tracking-wider text-[10px]">
          Empareja cada concepto con su función ({matchedIds.length}/{activePairs.length})
        </span>
        <span className="text-blue-400 font-black">Movimientos: {moves}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Left Column */}
        <div className="space-y-2.5">
          {activePairs.map((p) => {
            const isMatched = matchedIds.includes(p.id);
            const isSelected = selectedLeft?.id === p.id;

            return (
              <button
                key={`left-${p.id}`}
                disabled={isMatched}
                onClick={() => handleSelectLeft(p)}
                className={`w-full p-3.5 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer ${
                  isMatched
                    ? 'opacity-20 bg-zinc-800 border-transparent cursor-not-allowed line-through'
                    : isSelected
                    ? 'bg-blue-600 border-blue-400 text-white shadow-md scale-102'
                    : (isLight ? 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10')
                }`}
              >
                {p.left}
              </button>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-2.5">
          {shuffledRights.map((p) => {
            const isMatched = matchedIds.includes(p.id);
            const isSelected = selectedRight?.id === p.id;

            return (
              <button
                key={`right-${p.id}`}
                disabled={isMatched}
                onClick={() => handleSelectRight(p)}
                className={`w-full p-3.5 rounded-2xl border text-left font-bold text-xs transition-all cursor-pointer ${
                  isMatched
                    ? 'opacity-20 bg-zinc-800 border-transparent cursor-not-allowed line-through'
                    : isSelected
                    ? 'bg-blue-600 border-blue-400 text-white shadow-md scale-102'
                    : (isLight ? 'bg-white border-zinc-200 text-zinc-900 hover:bg-zinc-50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10')
                }`}
              >
                {p.right}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// ⚡ MINIJUEGO 2: RÁFAGA CONTRARRELOJ (SPEED BLITZ QUIZ)
// =========================================================================
const SpeedBlitzQuiz = ({ questions, soundEnabled, isLight, onVictory }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [timeLeft, setTimeLeft] = useState(25);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameOver(true);
          playSound('victory', soundEnabled);
          onVictory?.(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [started, gameOver, score, soundEnabled, onVictory]);

  const handleAnswer = (optionIdx) => {
    const q = questions[currentIdx % questions.length];
    if (optionIdx === q.correct) {
      playSound('correct', soundEnabled);
      setScore(prev => prev + 10 * combo);
      setCombo(prev => Math.min(4, prev + 1));
    } else {
      playSound('wrong', soundEnabled);
      setCombo(1);
    }
    setCurrentIdx(prev => prev + 1);
  };

  const startQuiz = () => {
    playSound('click', soundEnabled);
    setCurrentIdx(0);
    setScore(0);
    setCombo(1);
    setTimeLeft(25);
    setGameOver(false);
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <div className="w-18 h-18 rounded-3xl bg-amber-500 text-black flex items-center justify-center text-3xl mb-4 shadow-lg">
          ⚡
        </div>
        <h3 className="text-2xl font-black uppercase">Ráfaga Contrarreloj</h3>
        <p className={`text-xs mt-2 max-w-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Tienes 25 segundos para responder la mayor cantidad de preguntas posibles. ¡Encadena aciertos para multiplicar tus puntos!
        </p>
        <button
          onClick={startQuiz}
          className="mt-6 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest shadow-lg cursor-pointer active:scale-98"
        >
          ¡INICIAR RÁFAGA!
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <ConfettiBurst />
        <h3 className="text-2xl font-black uppercase">¡Tiempo Agotado!</h3>
        <div className="text-4xl font-black text-amber-400 my-4">
          {score} Puntos
        </div>
        <p className={`text-xs max-w-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          ¡Gran agilidad mental! Has sumado +60 XP y +20 Gemas a tu cuenta.
        </p>
        <button
          onClick={startQuiz}
          className="mt-6 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-widest shadow-md cursor-pointer"
        >
          JUGAR DE NUEVO
        </button>
      </div>
    );
  }

  const activeQ = questions[currentIdx % questions.length];

  return (
    <div className="w-full space-y-5">
      {/* Top Header Stats */}
      <div className="flex items-center justify-between text-xs font-black">
        <div className="flex items-center gap-1.5 text-amber-400">
          <Timer size={16} />
          <span>{timeLeft}s</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px]">
            Combo x{combo} 🔥
          </span>
          <span className="text-white">{score} Pts</span>
        </div>
      </div>

      {/* Question Card */}
      <div className={`p-5 rounded-3xl border ${
        isLight ? 'bg-white border-zinc-200' : 'bg-white/5 border-white/10'
      }`}>
        <h4 className="text-base font-black uppercase leading-snug">
          {activeQ.q}
        </h4>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {activeQ.options.map((opt, idx) => (
          <button
            key={`opt-${idx}`}
            onClick={() => handleAnswer(idx)}
            className={`p-4 rounded-2xl border font-bold text-xs text-left transition-all cursor-pointer active:scale-98 ${
              isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// =========================================================================
// 📐 MINIJUEGO 3: CONSTRUCTOR DE SECUENCIAS (WORKFLOW SCRAMBLE)
// =========================================================================
const WorkflowScrambleGame = ({ scrambles, soundEnabled, isLight, onVictory }) => {
  const currentScramble = scrambles[0];
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Available steps (shuffled initially)
  const availableSteps = useMemo(() => {
    return currentScramble.steps.map((text, idx) => ({ id: idx, text }));
  }, [currentScramble]);

  const handleToggleStep = (step) => {
    playSound('select', soundEnabled);
    if (selectedOrder.some(s => s.id === step.id)) {
      setSelectedOrder(prev => prev.filter(s => s.id !== step.id));
    } else {
      const next = [...selectedOrder, step];
      setSelectedOrder(next);

      // Check if all selected in correct original order 0, 1, 2, 3
      if (next.length === availableSteps.length) {
        const isRight = next.every((s, i) => s.id === i);
        if (isRight) {
          playSound('victory', soundEnabled);
          setIsCompleted(true);
          onVictory?.();
        } else {
          playSound('wrong', soundEnabled);
          setTimeout(() => setSelectedOrder([]), 700);
        }
      }
    }
  };

  const reset = () => {
    setSelectedOrder([]);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <ConfettiBurst />
        <div className="w-18 h-18 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-3xl mb-4 shadow-lg">
          ✓
        </div>
        <h3 className="text-2xl font-black uppercase">¡Secuencia Perfecta!</h3>
        <p className={`text-xs mt-2 max-w-sm ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Ordenaste todos los pasos con éxito. ¡Ganaste +45 XP y +15 Gemas!
        </p>
        <button
          onClick={reset}
          className="mt-6 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest shadow-md cursor-pointer"
        >
          REPETIR DESAFÍO
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div>
        <h4 className="text-sm font-black uppercase">{currentScramble.title}</h4>
        <p className={`text-xs mt-0.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          {currentScramble.instruction}
        </p>
      </div>

      {/* Selected Sequence Box */}
      <div className={`p-4 rounded-2xl border min-h-[120px] space-y-2 ${
        isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-black/40 border-white/10'
      }`}>
        <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">
          Tu Orden ({selectedOrder.length}/{availableSteps.length}):
        </span>
        {selectedOrder.length === 0 ? (
          <div className="text-xs text-zinc-500 italic py-4 text-center">
            Toca los pasos abajo en el orden correcto
          </div>
        ) : (
          selectedOrder.map((step, idx) => (
            <div
              key={`sel-${step.id}`}
              onClick={() => handleToggleStep(step)}
              className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-white font-bold text-xs flex items-center gap-3 cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span>{step.text}</span>
            </div>
          ))
        )}
      </div>

      {/* Available choices */}
      <div className="space-y-2">
        <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">
          Opciones Disponibles:
        </span>
        <div className="grid grid-cols-1 gap-2">
          {availableSteps.map((step) => {
            const isUsed = selectedOrder.some(s => s.id === step.id);
            return (
              <button
                key={`avail-${step.id}`}
                disabled={isUsed}
                onClick={() => handleToggleStep(step)}
                className={`p-3 rounded-xl border font-bold text-xs text-left transition-all cursor-pointer ${
                  isUsed
                    ? 'opacity-25 bg-zinc-800 border-transparent cursor-not-allowed'
                    : (isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white')
                }`}
              >
                {step.text}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 🎮 DUOLINGO LESSON RUNNER (VIDEO -> CONCEPTS -> QUIZ FLOW)
// =========================================================================
const DuolingoLessonRunner = ({
  lesson,
  mastery,
  soundEnabled = true,
  isLight = false,
  onComplete,
  onBackToPath
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const questions = useMemo(() => {
    return lesson.exam || (lesson.quiz ? [lesson.quiz] : []);
  }, [lesson]);

  const totalSteps = 2 + questions.length;
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkStatus, setCheckStatus] = useState(null);
  const [hearts, setHearts] = useState(5);

  const isQuestionStep = currentStepIndex >= 2 && currentStepIndex < totalSteps;
  const currentQuestionIndex = isQuestionStep ? currentStepIndex - 2 : 0;
  const currentQuestion = isQuestionStep ? questions[currentQuestionIndex] : null;

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / (totalSteps + 1)) * 100));

  useEffect(() => {
    setSelectedOption(null);
    setCheckStatus(null);
  }, [currentStepIndex]);

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    const isAnswerCorrect = selectedOption === currentQuestion.answer;
    if (isAnswerCorrect) {
      playSound('correct', soundEnabled);
      setCheckStatus('correct');
    } else {
      playSound('wrong', soundEnabled);
      setCheckStatus('wrong');
      setHearts(prev => Math.max(1, prev - 1));
    }
  };

  const handleNextStep = () => {
    playSound('click', soundEnabled);

    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      playSound('victory', soundEnabled);
      setCurrentStepIndex('victory');
      onComplete?.();
    }
  };

  if (currentStepIndex === 'victory') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 relative text-center">
        <ConfettiBurst />

        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14 }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border border-amber-200 shadow-xl flex items-center justify-center text-amber-950 mb-5"
        >
          <Trophy size={48} strokeWidth={2.5} className="fill-amber-200" />
        </motion.div>

        <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 tracking-widest border border-blue-500/30 mb-2">
          ¡LECCIÓN COMPLETADA!
        </span>

        <h2 className="text-2xl font-black uppercase tracking-tight">
          ¡Dominio Superado!
        </h2>
        <p className={`text-xs sm:text-sm max-w-sm mt-1 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Has superado todas las etapas de <strong>{lesson.title}</strong> con éxito.
        </p>

        {/* Reward Capsules */}
        <div className="grid grid-cols-3 gap-3 my-6 w-full max-w-sm">
          <div className={`p-3.5 rounded-2xl border text-center ${
            isLight ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}>
            <Zap size={18} className="mx-auto mb-1 fill-amber-400" />
            <span className="text-base font-black block">+{mastery.xpPerClass}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-75">XP</span>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center ${
            isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-950' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
          }`}>
            <Gem size={18} className="mx-auto mb-1 fill-cyan-400" />
            <span className="text-base font-black block">+{mastery.diamondsPerClass}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-75">Gemas</span>
          </div>

          <div className={`p-3.5 rounded-2xl border text-center ${
            isLight ? 'bg-blue-50 border-blue-200 text-blue-950' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}>
            <Check size={18} strokeWidth={3} className="mx-auto mb-1 text-blue-400" />
            <span className="text-base font-black block">100%</span>
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-75">Precisión</span>
          </div>
        </div>

        <button
          onClick={onBackToPath}
          className="w-full max-w-sm py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-98"
        >
          CONTINUAR EN EL CAMINO →
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Header in Lesson */}
      <div className={`px-5 sm:px-7 py-3.5 border-b flex items-center justify-between gap-4 shrink-0 backdrop-blur-xl ${
        isLight ? 'bg-white/90 border-zinc-200' : 'bg-black/40 border-white/10'
      }`}>
        <button
          onClick={onBackToPath}
          className={`p-2 rounded-full border transition-all cursor-pointer ${
            isLight ? 'border-zinc-200 text-zinc-600 hover:bg-zinc-100' : 'border-white/10 text-white/60 hover:text-white'
          }`}
        >
          <X size={18} />
        </button>

        {/* Smooth Progress Bar */}
        <div className="flex-1 max-w-sm mx-auto">
          <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-wider mb-1 opacity-60">
            <span>
              {currentStepIndex === 0 && '1. Vídeo Didáctico'}
              {currentStepIndex === 1 && '2. Conceptos Clave'}
              {isQuestionStep && `3. Pregunta ${currentQuestionIndex + 1}/${questions.length}`}
            </span>
            <span>Paso {currentStepIndex + 1} de {totalSteps}</span>
          </div>
          <div className="h-2 rounded-full bg-zinc-200 dark:bg-white/10 overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Duolingo Hearts */}
        <div className="flex items-center gap-1 text-xs font-black text-rose-500 shrink-0">
          <Heart size={15} className="fill-rose-500 text-rose-500" />
          <span>{hearts}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-7 flex flex-col items-center justify-start max-w-2xl mx-auto w-full">
        
        {/* STEP 0: VIDEO */}
        {currentStepIndex === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-5"
          >
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">
                {lesson.levelName || `Nivel ${lesson.level}`}
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight">
                {lesson.title}
              </h2>
            </div>

            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-white/15 bg-black shadow-xl flex items-center justify-center">
              {lesson.video?.embedUrl ? (
                <iframe
                  src={lesson.video.embedUrl}
                  title={lesson.video.title || lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="text-center p-6 text-white space-y-2">
                  <Play size={36} className="mx-auto opacity-70 fill-white" />
                  <h4 className="text-sm font-black uppercase">{lesson.title}</h4>
                </div>
              )}
            </div>

            {/* Key Moments */}
            {lesson.video?.keyMoments && lesson.video.keyMoments.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                  Momentos Clave:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {lesson.video.keyMoments.map((km, idx) => (
                    <div
                      key={`km-${idx}`}
                      className={`p-3 rounded-xl border ${
                        isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <span className="text-[9px] font-black text-amber-400">⏱ {km.time}</span>
                      <h5 className="text-xs font-black uppercase truncate mt-0.5">{km.title}</h5>
                      <p className={`text-[10px] mt-0.5 line-clamp-2 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {km.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 1: CONCEPTS & TASK */}
        {currentStepIndex === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full space-y-5"
          >
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">
                Fundamentos Teóricos
              </span>
              <h2 className="text-xl font-black uppercase tracking-tight">
                Principios Clave
              </h2>
            </div>

            <div className={`p-6 rounded-3xl border space-y-3 leading-relaxed ${
              isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-white/90'
            }`}>
              {lesson.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h4 key={pIdx} className="text-sm font-black uppercase tracking-tight pt-1">
                      {paragraph.replace('### ', '')}
                    </h4>
                  );
                }
                return (
                  <p key={pIdx} className="text-xs sm:text-sm leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}

              {lesson.practicalTask && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-black font-black flex items-center justify-center shrink-0">
                    ⚡
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-75">Reto Práctico</span>
                    <span>{lesson.practicalTask}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP 2+: QUESTIONS */}
        {isQuestionStep && currentQuestion && (
          <motion.div
            key={`question-${currentQuestionIndex}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full my-auto py-2 space-y-5"
          >
            <div>
              <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest block mb-1">
                PREGUNTA {currentQuestionIndex + 1} DE {questions.length}
              </span>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight leading-snug">
                {currentQuestion.question}
              </h3>
            </div>

            <div className="space-y-2.5 pt-1">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isThisAnswer = optIdx === currentQuestion.answer;

                let styles = isLight
                  ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white';

                if (checkStatus === 'correct' && isThisAnswer) {
                  styles = 'bg-blue-600 border-blue-500 text-white shadow-lg';
                } else if (checkStatus === 'wrong' && isSelected) {
                  styles = 'bg-rose-500 border-rose-400 text-white';
                } else if (checkStatus === 'wrong' && isThisAnswer) {
                  styles = 'bg-blue-600/80 border-blue-500 text-white';
                } else if (isSelected && !checkStatus) {
                  styles = isLight
                    ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm'
                    : 'bg-blue-500/20 border-blue-400 text-white shadow-sm';
                }

                return (
                  <button
                    key={`opt-${optIdx}`}
                    disabled={checkStatus !== null}
                    onClick={() => {
                      playSound('select', soundEnabled);
                      setSelectedOption(optIdx);
                    }}
                    className={`w-full p-4 rounded-2xl border font-bold text-xs sm:text-sm text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${styles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-white/10'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optionText}</span>
                    </div>

                    {checkStatus === 'correct' && isThisAnswer && (
                      <CheckCircle2 size={18} className="text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>

      {/* Bottom Feedback Bar */}
      <div className={`px-5 sm:px-7 py-4 border-t shrink-0 transition-colors duration-200 ${
        checkStatus === 'correct'
          ? 'bg-blue-600 text-white border-blue-700'
          : checkStatus === 'wrong'
          ? 'bg-rose-600 text-white border-rose-700'
          : isLight ? 'bg-white border-zinc-200' : 'bg-black/50 border-white/10'
      }`}>
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {checkStatus === 'correct' && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0 shadow">
                <Check size={24} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase">¡Excelente Trabajo!</h4>
                <p className="text-xs text-white/90">{currentQuestion?.explanation || '¡Respuesta correcta!'}</p>
              </div>
            </div>
          )}

          {checkStatus === 'wrong' && (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-white text-rose-600 flex items-center justify-center shrink-0 shadow">
                <X size={24} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase">Solución Correcta:</h4>
                <p className="text-xs text-white/90">
                  {currentQuestion?.options[currentQuestion.answer]}
                </p>
              </div>
            </div>
          )}

          {!checkStatus && (
            <div className="hidden sm:block text-xs font-bold opacity-60">
              {currentStepIndex === 0 && 'Avanza a la teoría cuando estés listo.'}
              {currentStepIndex === 1 && 'Repasa los conceptos y haz el quiz.'}
              {isQuestionStep && 'Elige una opción y pulsa comprobar.'}
            </div>
          )}

          <div className="w-full sm:w-auto">
            {isQuestionStep ? (
              !checkStatus ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className={`w-full sm:w-44 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    selectedOption !== null
                      ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  COMPROBAR
                </button>
              ) : (
                <button
                  onClick={handleNextStep}
                  className="w-full sm:w-44 py-3.5 rounded-xl bg-white text-zinc-950 font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg"
                >
                  CONTINUAR →
                </button>
              )
            ) : (
              <button
                onClick={handleNextStep}
                className="w-full sm:w-52 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>{currentStepIndex === 0 ? 'CONTINUAR' : 'EMPEZAR QUIZ'}</span>
                <ChevronRight size={15} />
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
