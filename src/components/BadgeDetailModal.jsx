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
  Gem,
  Brain
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
  CheckCircle2,
  Gem,
  Brain
};

// Rich metallic styling for modal 3D centerpiece
const TIER_METALLIC = {
  bronce: {
    outerRing: 'from-amber-600 via-amber-800 to-amber-950',
    innerGleam: 'from-amber-400/40 via-amber-600/15 to-transparent',
    iconColor: 'text-amber-300',
    glow: 'shadow-[0_15px_45px_rgba(217,119,6,0.4)]',
    tagClass: 'border-amber-500/40 bg-amber-500/15 text-amber-300'
  },
  plata: {
    outerRing: 'from-zinc-200 via-slate-400 to-zinc-700',
    innerGleam: 'from-white/50 via-slate-300/20 to-transparent',
    iconColor: 'text-slate-100',
    glow: 'shadow-[0_15px_45px_rgba(226,232,240,0.4)]',
    tagClass: 'border-slate-300/40 bg-slate-300/15 text-slate-200'
  },
  oro: {
    outerRing: 'from-yellow-300 via-amber-500 to-yellow-800',
    innerGleam: 'from-yellow-200/60 via-amber-400/25 to-transparent',
    iconColor: 'text-yellow-200',
    glow: 'shadow-[0_15px_50px_rgba(245,158,11,0.5)]',
    tagClass: 'border-yellow-400/40 bg-yellow-400/15 text-yellow-300'
  },
  diamante: {
    outerRing: 'from-cyan-200 via-cyan-500 to-blue-800',
    innerGleam: 'from-cyan-200/70 via-cyan-400/30 to-transparent',
    iconColor: 'text-cyan-200',
    glow: 'shadow-[0_15px_55px_rgba(6,182,212,0.55)]',
    tagClass: 'border-cyan-400/40 bg-cyan-400/15 text-cyan-300'
  },
  mitico: {
    outerRing: 'from-fuchsia-300 via-purple-600 to-indigo-950',
    innerGleam: 'from-fuchsia-200/70 via-purple-400/30 to-transparent',
    iconColor: 'text-fuchsia-200',
    glow: 'shadow-[0_15px_55px_rgba(168,85,247,0.55)]',
    tagClass: 'border-purple-400/40 bg-purple-400/15 text-purple-300'
  }
};

export const BadgeDetailModal = ({ 
  badge, 
  stats, 
  isUnlocked, 
  onClose, 
  isLight = false,
  lang = 'es'
}) => {
  if (!badge) return null;

  const tierConfig = BADGE_TIERS[badge.tier] || BADGE_TIERS.bronce;
  const metallic = TIER_METALLIC[badge.tier] || TIER_METALLIC.bronce;
  const IconComponent = ICON_MAP[badge.icon] || Award;
  
  const progressInfo = badge.check ? badge.check(stats) : { current: 0, max: 1, unlocked: isUnlocked };
  const unlocked = isUnlocked || progressInfo.unlocked;
  const progressPct = Math.min(100, Math.round((progressInfo.current / progressInfo.max) * 100));

  const tierLabel = lang === 'en'
    ? (badge.tier === 'bronce' ? 'Bronze' : badge.tier === 'plata' ? 'Silver' : badge.tier === 'oro' ? 'Gold' : badge.tier === 'diamante' ? 'Diamond' : badge.tier === 'mitico' ? 'Mythic' : tierConfig.name)
    : tierConfig.name;

  const badgeTitle = (lang === 'en' && badge.titleEn) ? badge.titleEn : badge.title;
  const badgeSubtitle = (lang === 'en' && badge.subtitleEn) ? badge.subtitleEn : badge.subtitle;
  const badgeDesc = (lang === 'en' && badge.descEn) ? badge.descEn : badge.desc;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        
        {/* Backdrop click to dismiss */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className={`w-full max-w-md rounded-[36px] border overflow-hidden relative shadow-2xl z-10 ${
            isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-black border-white/20 text-white'
          }`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className={`absolute top-5 right-5 p-2.5 rounded-full z-30 transition-all cursor-pointer ${
              isLight 
                ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900' 
                : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
            }`}
          >
            <X size={18} />
          </button>

          {/* Glowing 3D Medallion Presentation Header */}
          <div className={`p-8 sm:p-10 text-center relative overflow-hidden flex flex-col items-center justify-center border-b ${
            isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-gradient-to-b from-zinc-900 to-black border-white/10'
          }`}>
            
            {/* Ambient Radial Spotlight */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)] pointer-events-none" />

            {/* Giant 3D Medallion */}
            <motion.div 
              animate={unlocked ? { y: [-4, 4, -4] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative my-2"
            >
              {/* Metallic Outer Ring */}
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 shadow-2xl relative ${
                unlocked 
                  ? `bg-gradient-to-b ${metallic.outerRing} ${metallic.glow}` 
                  : isLight ? 'bg-zinc-300' : 'bg-zinc-800 shadow-none'
              }`}>
                {/* Coin Face */}
                <div className={`w-full h-full rounded-full flex items-center justify-center relative overflow-hidden ${
                  unlocked
                    ? isLight 
                      ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100' 
                      : 'bg-gradient-to-b from-zinc-900 via-black to-zinc-950'
                    : isLight ? 'bg-zinc-100' : 'bg-zinc-900'
                }`}>
                  
                  {/* Top Specular Glint */}
                  {unlocked && (
                    <div className={`absolute top-0 inset-x-0 h-1/2 rounded-t-full bg-gradient-to-b ${metallic.innerGleam} pointer-events-none`} />
                  )}

                  {/* Icon */}
                  <IconComponent 
                    size={52} 
                    className={`relative z-10 ${
                      unlocked ? metallic.iconColor : (isLight ? 'text-zinc-400' : 'text-zinc-600')
                    }`} 
                    strokeWidth={2.2}
                  />
                </div>
              </div>

              {/* Status Tag on Medallion */}
              {unlocked ? (
                <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-white text-black flex items-center gap-1.5 text-[10px] font-black shadow-lg border-2 border-black">
                  <Check size={12} strokeWidth={3.5} />
                  <span>{lang === 'en' ? 'UNLOCKED' : 'DESBLOQUEADA'}</span>
                </div>
              ) : (
                <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-black shadow-md border ${
                  isLight ? 'bg-zinc-200 border-zinc-300 text-zinc-700' : 'bg-zinc-800 border-zinc-700 text-zinc-300'
                }`}>
                  <Lock size={11} strokeWidth={2.5} />
                  <span>{lang === 'en' ? 'LOCKED' : 'BLOQUEADA'}</span>
                </div>
              )}
            </motion.div>

            <div className="mt-3 flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase px-3 py-0.5 rounded-full border tracking-widest ${
                unlocked ? metallic.tagClass : isLight ? 'bg-zinc-200 text-zinc-600 border-zinc-300' : 'bg-white/10 text-zinc-400 border-white/10'
              }`}>
                {lang === 'en' ? `Tier ${tierLabel}` : `Rango ${tierConfig.name}`}
              </span>
            </div>
          </div>

          {/* Modal Content Details */}
          <div className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <h3 className={`text-xl sm:text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {badgeTitle}
              </h3>
              <p className={`text-xs font-semibold uppercase tracking-widest ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {badgeSubtitle}
              </p>
            </div>

            {/* Requisitos / Lore */}
            <div className={`p-4 rounded-2xl border ${
              isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-zinc-900/90 border-white/10 text-zinc-300'
            }`}>
              <span className="text-[9px] font-black uppercase tracking-widest block text-zinc-500 mb-1.5">
                {lang === 'en' ? 'How to Unlock' : 'Cómo Desbloquear'}
              </span>
              <p className="text-xs leading-relaxed font-medium">
                {badgeDesc}
              </p>
            </div>

            {/* Rewards */}
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-2xl border text-center ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-white/10'
              }`}>
                <span className="text-[9px] font-black uppercase tracking-wider block text-zinc-500">
                  {lang === 'en' ? 'XP Reward' : 'Recompensa XP'}
                </span>
                <span className={`text-base font-black ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  +{badge.xpReward} XP
                </span>
              </div>

              <div className={`p-3 rounded-2xl border text-center ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-white/10'
              }`}>
                <span className="text-[9px] font-black uppercase tracking-wider block text-zinc-500">
                  {lang === 'en' ? 'Diamonds' : 'Gemas Extra'}
                </span>
                <span className={`text-base font-black ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  +{badge.diamondReward} 💎
                </span>
              </div>
            </div>

            {/* Progress Section */}
            <div>
              <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider mb-2">
                <span className={isLight ? 'text-zinc-600' : 'text-zinc-400'}>
                  {lang === 'en' ? 'Current Progress' : 'Progreso Actual'}
                </span>
                <span className={isLight ? 'text-zinc-900' : 'text-white'}>
                  {progressInfo.current} / {progressInfo.max} ({progressPct}%)
                </span>
              </div>
              <div className={`w-full h-2.5 rounded-full overflow-hidden border p-0.5 ${
                isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900 border-white/15'
              }`}>
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    unlocked 
                      ? 'bg-white' 
                      : (isLight ? 'bg-black' : 'bg-zinc-400')
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all cursor-pointer ${
                isLight 
                  ? 'bg-black text-white hover:bg-zinc-800 shadow-md' 
                  : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/10'
              }`}
            >
              {lang === 'en' ? 'Close' : 'Cerrar'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
