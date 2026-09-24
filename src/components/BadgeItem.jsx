// src/components/BadgeItem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
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
  Lock,
  Check,
  Brain,
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
  CheckCircle2,
  Brain,
  Gem
};

// Rich styling per tier for 3D metallic medallions
const TIER_METALLIC = {
  bronce: {
    outerRing: 'from-amber-600 via-amber-800 to-amber-950',
    innerGleam: 'from-amber-400/30 via-amber-600/10 to-transparent',
    iconColor: 'text-amber-300',
    glow: 'group-hover:shadow-[0_12px_32px_rgba(217,119,6,0.35)]',
    aura: 'bg-amber-600/20',
    pillClass: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    borderUnlocked: 'border-amber-500/40'
  },
  plata: {
    outerRing: 'from-zinc-200 via-slate-400 to-zinc-700',
    innerGleam: 'from-white/40 via-slate-300/10 to-transparent',
    iconColor: 'text-slate-100',
    glow: 'group-hover:shadow-[0_12px_32px_rgba(226,232,240,0.35)]',
    aura: 'bg-slate-400/20',
    pillClass: 'border-slate-300/30 bg-slate-300/10 text-slate-200',
    borderUnlocked: 'border-slate-300/40'
  },
  oro: {
    outerRing: 'from-yellow-300 via-amber-500 to-yellow-800',
    innerGleam: 'from-yellow-200/50 via-amber-400/20 to-transparent',
    iconColor: 'text-yellow-200',
    glow: 'group-hover:shadow-[0_12px_36px_rgba(245,158,11,0.45)]',
    aura: 'bg-yellow-500/25',
    pillClass: 'border-yellow-400/40 bg-yellow-400/10 text-yellow-300',
    borderUnlocked: 'border-yellow-400/50'
  },
  diamante: {
    outerRing: 'from-cyan-200 via-cyan-500 to-blue-800',
    innerGleam: 'from-cyan-200/60 via-cyan-400/20 to-transparent',
    iconColor: 'text-cyan-200',
    glow: 'group-hover:shadow-[0_12px_40px_rgba(6,182,212,0.5)]',
    aura: 'bg-cyan-500/25',
    pillClass: 'border-cyan-400/40 bg-cyan-400/10 text-cyan-300',
    borderUnlocked: 'border-cyan-400/50'
  },
  mitico: {
    outerRing: 'from-fuchsia-300 via-purple-600 to-indigo-950',
    innerGleam: 'from-fuchsia-200/60 via-purple-400/20 to-transparent',
    iconColor: 'text-fuchsia-200',
    glow: 'group-hover:shadow-[0_12px_40px_rgba(168,85,247,0.5)]',
    aura: 'bg-purple-600/30',
    pillClass: 'border-purple-400/40 bg-purple-400/10 text-purple-300',
    borderUnlocked: 'border-purple-400/50'
  }
};

export const BadgeItem = ({ 
  badge, 
  stats, 
  isUnlocked, 
  onClick, 
  isLight = false,
  compact = false,
  lang = 'es'
}) => {
  const tierConfig = BADGE_TIERS[badge.tier] || BADGE_TIERS.bronce;
  const metallic = TIER_METALLIC[badge.tier] || TIER_METALLIC.bronce;
  const IconComponent = ICON_MAP[badge.icon] || Award;
  
  const progressInfo = badge.check ? badge.check(stats) : { current: 0, max: 1, unlocked: isUnlocked };
  const unlocked = isUnlocked || progressInfo.unlocked;

  const tierLabel = lang === 'en'
    ? (badge.tier === 'bronce' ? 'Bronze' : badge.tier === 'plata' ? 'Silver' : badge.tier === 'oro' ? 'Gold' : badge.tier === 'diamante' ? 'Diamond' : badge.tier === 'mitico' ? 'Mythic' : tierConfig.name)
    : tierConfig.name;

  const badgeTitle = (lang === 'en' && badge.titleEn) ? badge.titleEn : badge.title;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={`group relative flex flex-col items-center justify-between p-4 sm:p-5 rounded-[28px] border transition-all duration-300 cursor-pointer select-none text-center overflow-hidden ${
        unlocked
          ? `${metallic.borderUnlocked} ${metallic.glow} ${
              isLight 
                ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-black/30' 
                : 'bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-white/40'
            }`
          : `${
              isLight 
                ? 'bg-zinc-50/70 border-zinc-200/60 opacity-60 hover:opacity-90 hover:border-zinc-300' 
                : 'bg-white/[0.02] border-white/10 opacity-50 hover:opacity-85 hover:border-white/20'
            }`
      }`}
    >
      {/* Dynamic Ambient Aura Behind Medallion */}
      {unlocked && (
        <div className={`absolute -top-6 -left-6 w-28 h-28 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-40 group-hover:opacity-80 ${metallic.aura}`} />
      )}

      {/* 3D METALLIC MEDALLION */}
      <div className="relative my-2">
        {/* Outer Ring with Bevel & Specular Highlight */}
        <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] shadow-2xl transition-transform duration-300 group-hover:rotate-3 ${
          unlocked
            ? `bg-gradient-to-b ${metallic.outerRing} shadow-[0_8px_20px_rgba(0,0,0,0.4)]`
            : isLight ? 'bg-zinc-300' : 'bg-zinc-800'
        }`}>
          
          {/* Inner Coin Core */}
          <div className={`w-full h-full rounded-full flex items-center justify-center relative overflow-hidden transition-all duration-300 ${
            unlocked
              ? isLight 
                ? 'bg-gradient-to-b from-white via-zinc-50 to-zinc-100 shadow-inner' 
                : 'bg-gradient-to-b from-zinc-900 via-black to-zinc-950 shadow-inner'
              : isLight
                ? 'bg-zinc-100 shadow-inner'
                : 'bg-zinc-900/90 shadow-inner'
          }`}>
            
            {/* Top Curved Specular Glint */}
            {unlocked && (
              <div className={`absolute top-0 inset-x-0 h-1/2 rounded-t-full bg-gradient-to-b ${metallic.innerGleam} pointer-events-none`} />
            )}

            {/* Shimmer Light Sweep on Hover */}
            {unlocked && (
              <motion.div 
                initial={{ x: '-150%', opacity: 0 }}
                whileHover={{ x: '150%', opacity: 0.6 }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
              />
            )}

            {/* Icon Centerpiece */}
            <motion.div
              animate={unlocked ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 drop-shadow-md"
            >
              <IconComponent 
                size={compact ? 28 : 34} 
                className={`transition-colors duration-300 ${
                  unlocked 
                    ? metallic.iconColor 
                    : isLight ? 'text-zinc-400' : 'text-zinc-600'
                }`} 
                strokeWidth={2.2}
              />
            </motion.div>
          </div>
        </div>

        {/* Status Mini-Badge in Corner (Checkmark or Lock) */}
        {unlocked ? (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[10px] font-black shadow-lg border-2 border-black">
            <Check size={13} strokeWidth={3.5} />
          </div>
        ) : (
          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-md border ${
            isLight ? 'bg-zinc-200 border-zinc-300 text-zinc-600' : 'bg-zinc-800 border-zinc-700 text-zinc-400'
          }`}>
            <Lock size={12} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Clean Minimalist Label (No Cluttered Description) */}
      <div className="w-full mt-2 space-y-1">
        <h4 className={`text-xs sm:text-sm font-black uppercase tracking-tight line-clamp-1 group-hover:text-white transition-colors ${
          unlocked 
            ? isLight ? 'text-zinc-900' : 'text-white' 
            : isLight ? 'text-zinc-500' : 'text-zinc-500'
        }`}>
          {badgeTitle}
        </h4>

        <div className="flex items-center justify-center gap-1.5">
          <span className={`text-[8px] sm:text-[9px] font-black uppercase px-2 py-0.5 rounded-full border tracking-widest ${
            unlocked ? metallic.pillClass : isLight ? 'border-zinc-200 bg-zinc-100 text-zinc-500' : 'border-white/10 bg-white/5 text-zinc-500'
          }`}>
            {tierLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
