// src/components/BadgeDetailModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Lock, 
  Sparkles, 
  Target, 
  Zap, 
  Shield, 
  Trophy, 
  Crown, 
  Heart, 
  Play, 
  BookOpen, 
  Flame, 
  Medal, 
  Award, 
  Calendar, 
  CheckCircle2,
  Gem
} from 'lucide-react';
import { BADGE_TIERS } from '../data/badges';

const ICON_MAP = {
  Target,
  Zap,
  Shield,
  Trophy,
  Crown,
  Sparkles,
  Heart,
  Play,
  BookOpen,
  Flame,
  Medal,
  Award,
  Calendar,
  CheckCircle2
};

export const BadgeDetailModal = ({ 
  badge, 
  stats, 
  isUnlocked, 
  onClose, 
  isLight = false 
}) => {
  if (!badge) return null;

  const tierConfig = BADGE_TIERS[badge.tier] || BADGE_TIERS.bronce;
  const IconComponent = ICON_MAP[badge.icon] || Award;
  const progressInfo = badge.check ? badge.check(stats) : { current: 0, max: 1, unlocked: isUnlocked };
  const unlocked = isUnlocked || progressInfo.unlocked;
  const progressPct = Math.min(100, Math.round((progressInfo.current / progressInfo.max) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`w-full max-w-md rounded-[32px] border overflow-hidden relative shadow-2xl ${
            isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2 rounded-full z-20 transition-all ${
              isLight ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900' : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            <X size={18} />
          </button>

          {/* Glowing Top Banner */}
          <div className={`p-8 text-center relative overflow-hidden bg-gradient-to-b ${tierConfig.bg} flex flex-col items-center justify-center border-b ${isLight ? 'border-zinc-200/80' : 'border-white/10'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] pointer-events-none" />

            {/* Giant Badge Icon */}
            <div className={`w-28 h-28 rounded-3xl flex items-center justify-center relative shadow-2xl border-4 ${tierConfig.border} ${tierConfig.glow} ${
              isLight ? 'bg-white' : 'bg-black/80'
            }`}>
              <IconComponent size={56} className={unlocked ? tierConfig.text : (isLight ? 'text-zinc-300' : 'text-white/30')} />
              
              {/* Status Badge Tag */}
              {unlocked ? (
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1.5 text-xs font-black shadow-lg border-2 border-white dark:border-black">
                  <Check size={12} strokeWidth={3} />
                  <span>Obtenida</span>
                </div>
              ) : (
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-zinc-800 text-white/80 flex items-center gap-1.5 text-xs font-black shadow-md border border-zinc-700">
                  <Lock size={11} />
                  <span>Bloqueada</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-full border tracking-wider ${tierConfig.badgeClass}`}>
                Rango {tierConfig.name}
              </span>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 space-y-5">
            <div className="text-center">
              <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {badge.title}
              </h3>
              <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                {badge.subtitle}
              </p>
            </div>

            {/* Lore & Description */}
            <div className={`p-4 rounded-2xl border ${isLight ? 'bg-zinc-50 border-zinc-200/80 text-zinc-700' : 'bg-white/[0.03] border-white/10 text-white/80'}`}>
              <span className="text-[10px] font-black uppercase tracking-wider block text-zinc-400 mb-1">Requisitos de Desbloqueo</span>
              <p className="text-xs leading-relaxed font-medium">
                {badge.desc}
              </p>
            </div>

            {/* Rewards */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight ? 'bg-amber-50/60 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center font-black text-amber-500">
                  <Zap size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider block opacity-70">Experiencia</span>
                  <span className="text-sm font-black">+{badge.xpReward} XP</span>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                isLight ? 'bg-cyan-50/60 border-cyan-200 text-cyan-900' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
              }`}>
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center font-black text-cyan-500">
                  <Gem size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider block opacity-70">Diamantes</span>
                  <span className="text-sm font-black">+{badge.diamondReward} 💎</span>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div>
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider mb-2">
                <span className={isLight ? 'text-zinc-600' : 'text-white/60'}>Progreso Actual</span>
                <span className={isLight ? 'text-zinc-900' : 'text-white'}>
                  {progressInfo.current} / {progressInfo.max} ({progressPct}%)
                </span>
              </div>
              <div className={`w-full h-3 rounded-full overflow-hidden border p-0.5 ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    unlocked 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                      : (isLight ? 'bg-zinc-900' : 'bg-white')
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs transition-all ${
                isLight 
                  ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-md' 
                  : 'bg-white text-black hover:bg-white/90 shadow-lg shadow-white/10'
              }`}
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
