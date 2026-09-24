import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Gem, Zap, Shield, Crown, Sparkles, CheckCircle2, Lock, ArrowRight, X, Sprout, Award, Layers
} from 'lucide-react';
import { PROGRESSION_ROAD, RARITIES } from '../data/focuslyCustomization';

export const FocuslyProgressionRoad = ({
  userXP = 0,
  userDiamonds = 0,
  isLight = false,
  onClaimReward = null,
  className = '',
  lang = 'es'
}) => {
  const currentLevel = Math.max(1, Math.floor(userXP / 1000) + 1);
  const currentLevelXP = userXP % 1000;
  const levelProgress = Math.min(100, Math.round((currentLevelXP / 1000) * 100));

  const [selectedMilestone, setSelectedMilestone] = useState(null);

  // Find next unlockable milestone
  const nextMilestone = PROGRESSION_ROAD.find(m => userXP < m.xpRequired) || PROGRESSION_ROAD[PROGRESSION_ROAD.length - 1];

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'Gem': return Gem;
      case 'Zap': return Zap;
      case 'Shield': return Shield;
      case 'Crown': return Crown;
      case 'Sparkles': return Sparkles;
      case 'Sprout': return Sprout;
      case 'Award': return Award;
      case 'Layers': return Layers;
      default: return Trophy;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      
      {/* Top Hero Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-xl ${
        isLight ? 'bg-white border-zinc-200/80 shadow-md text-zinc-900' : 'bg-zinc-950/80 border-white/10 shadow-2xl text-white'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Crown size={12} />
                {lang === 'en' ? 'Focusly Mastery Road' : 'Camino de Maestría Focusly'}
              </span>
              <span className={`text-xs font-semibold ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {lang === 'en'
                  ? `Level ${currentLevel} • ${userXP.toLocaleString()} Total XP`
                  : `Nivel ${currentLevel} • ${userXP.toLocaleString()} XP Totales`}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {lang === 'en' ? 'Your Evolution Road' : 'Tu Ruta de Evolución'}
            </h3>
            <p className={`text-xs sm:text-sm max-w-xl ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {lang === 'en'
                ? 'Every study block, completed quest, and preserved streak elevates you to the next tier and unlocks mythical avatars, apparel and environments.'
                : 'Cada bloque de estudio, desafío completado y racha protegida te acerca al siguiente nivel y desbloquea avatares, trajes y entornos míticos.'}
            </p>
          </div>

          {/* Next Goal Badge */}
          {nextMilestone && (
            <div className={`p-4 rounded-2xl border flex items-center gap-4 ${
              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
            }`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg">
                <Sparkles size={24} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 block">
                  {lang === 'en' ? 'Next Reward' : 'Siguiente Recompensa'}
                </span>
                <span className="text-sm font-bold block">{nextMilestone.reward.name}</span>
                <span className={`text-[11px] ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {lang === 'en'
                    ? `Level ${nextMilestone.level} (${Math.max(0, nextMilestone.xpRequired - userXP)} XP remaining)`
                    : `Nivel ${nextMilestone.level} (${Math.max(0, nextMilestone.xpRequired - userXP)} XP restantes)`}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Global Level Progress Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs font-black uppercase tracking-wider">
            <span>{lang === 'en' ? `Level ${currentLevel}` : `Nivel ${currentLevel}`}</span>
            <span className="text-amber-500">
              {levelProgress}% {lang === 'en' ? `towards Level ${currentLevel + 1}` : `hacia Nivel ${currentLevel + 1}`}
            </span>
            <span>{lang === 'en' ? `Level ${currentLevel + 1}` : `Nivel ${currentLevel + 1}`}</span>
          </div>
          <div className={`h-3 rounded-full overflow-hidden border ${isLight ? 'bg-zinc-200/70 border-zinc-300/50' : 'bg-zinc-800/80 border-zinc-700/50'}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${levelProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Interactive Progression Road Track (Visual Nodes) */}
      <div className="relative py-4">
        
        {/* Track Connecting Line */}
        <div className={`absolute top-1/2 left-4 right-4 h-1.5 -translate-y-1/2 z-0 rounded-full hidden md:block ${
          isLight ? 'bg-zinc-200' : 'bg-white/10'
        }`} />

        {/* Horizontal Scroll Track */}
        <div className="flex items-center gap-4 overflow-x-auto pb-6 pt-2 scrollbar-thin px-2 relative z-10">
          {PROGRESSION_ROAD.map((milestone, idx) => {
            const isCompleted = userXP >= milestone.xpRequired;
            const isCurrent = !isCompleted && (idx === 0 || userXP >= PROGRESSION_ROAD[idx - 1].xpRequired);
            const IconComp = getIconComponent(milestone.icon);

            return (
              <motion.div
                key={milestone.level}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMilestone(milestone)}
                className={`flex-shrink-0 w-48 p-4 rounded-3xl border cursor-pointer select-none transition-all duration-300 relative overflow-hidden backdrop-blur-md ${
                  isCompleted
                    ? (isLight 
                        ? 'bg-white border-blue-200 text-zinc-900 shadow-sm hover:border-blue-300' 
                        : 'bg-gradient-to-b from-[#111624] to-[#0c0f17] border-blue-500/30 text-white shadow-lg shadow-blue-500/5 hover:border-blue-400/50')
                    : isCurrent
                    ? (isLight 
                        ? 'bg-amber-50/90 border-amber-400 text-zinc-900 shadow-md ring-2 ring-amber-400/30' 
                        : 'bg-gradient-to-b from-[#1c1407] to-[#120e06] border-amber-500/60 text-white shadow-xl shadow-amber-500/10 ring-2 ring-amber-400/30')
                    : (isLight 
                        ? 'bg-zinc-100/70 border-zinc-200 text-zinc-400 opacity-70 hover:opacity-90' 
                        : 'bg-white/[0.02] border-white/5 text-zinc-500 opacity-60 hover:opacity-85 hover:border-white/10')
                }`}
              >
                {/* Node Status Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    isCompleted
                      ? (isLight ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-blue-500/15 text-blue-400 border border-blue-500/30')
                      : isCurrent
                      ? (isLight ? 'bg-amber-100 text-amber-700 border border-amber-200 animate-pulse' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse')
                      : 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20'
                  }`}>
                    {isCompleted 
                      ? (lang === 'en' ? '✓ Unlocked' : '✓ Desbloqueado') 
                      : isCurrent 
                      ? (lang === 'en' ? 'Current Goal' : 'Objetivo Actual') 
                      : (lang === 'en' ? 'Locked' : 'Bloqueado')}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="text-blue-400" />
                  ) : isCurrent ? (
                    <Sparkles size={14} className="text-amber-400 fill-amber-400/30" />
                  ) : (
                    <Lock size={14} className="text-zinc-500" />
                  )}
                </div>

                {/* Node Icon Medallion */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto my-2.5 transition-all shadow-sm ${
                  isCompleted
                    ? (isLight ? 'bg-blue-50 border border-blue-200 text-blue-600' : 'bg-gradient-to-tr from-blue-600/20 to-indigo-500/20 border border-blue-400/30 text-blue-400 shadow-blue-500/10')
                    : isCurrent
                    ? (isLight ? 'bg-amber-100 border border-amber-300 text-amber-600' : 'bg-gradient-to-tr from-amber-500/25 to-orange-500/20 border border-amber-400/50 text-amber-400 shadow-amber-500/20')
                    : (isLight ? 'bg-zinc-200/50 border border-zinc-300 text-zinc-400' : 'bg-white/5 border border-white/10 text-zinc-600')
                }`}>
                  <IconComp size={22} />
                </div>

                {/* Info */}
                <div className="text-center space-y-1">
                  <div className={`text-[10px] font-black uppercase tracking-wider ${
                    isCompleted ? 'text-blue-400' : isCurrent ? 'text-amber-400' : 'text-zinc-500'
                  }`}>
                    {lang === 'en' ? `Level ${milestone.level}` : `Nivel ${milestone.level}`}
                  </div>
                  <div className="text-xs font-black truncate">{milestone.reward.name}</div>
                  <div className="text-[10px] font-mono text-zinc-400">{milestone.xpRequired.toLocaleString()} XP</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Milestone Preview Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl border shadow-2xl space-y-6 ${
                isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-zinc-950 border-white/15 text-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-500">
                    {lang === 'en' ? 'Progression Milestone' : 'Hito de Progreso'}
                  </span>
                  <h4 className="text-xl font-black uppercase">
                    {lang === 'en'
                      ? `Level ${selectedMilestone.level}: ${selectedMilestone.title}`
                      : `Nivel ${selectedMilestone.level}: ${selectedMilestone.title}`}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-3 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-xl">
                  <Trophy size={32} />
                </div>
                <div>
                  <div className="text-base font-black uppercase">{selectedMilestone.reward.name}</div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {lang === 'en'
                      ? `Requirement: ${selectedMilestone.xpRequired.toLocaleString()} Focus XP`
                      : `Requisito: ${selectedMilestone.xpRequired.toLocaleString()} XP de Enfoque`}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setSelectedMilestone(null)}
                  className="w-full py-3 rounded-xl bg-white text-black font-black uppercase text-xs tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  {lang === 'en' ? 'Got It' : 'Entendido'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
