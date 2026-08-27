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
  Check
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

export const BadgeItem = ({ 
  badge, 
  stats, 
  isUnlocked, 
  onClick, 
  isLight = false,
  compact = false 
}) => {
  const tierConfig = BADGE_TIERS[badge.tier] || BADGE_TIERS.bronce;
  const IconComponent = ICON_MAP[badge.icon] || Award;
  const progressInfo = badge.check ? badge.check(stats) : { current: 0, max: 1, unlocked: isUnlocked };
  const unlocked = isUnlocked || progressInfo.unlocked;
  const progressPct = Math.min(100, Math.round((progressInfo.current / progressInfo.max) * 100));

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative p-3 rounded-2xl border flex flex-col items-center justify-center text-center transition-all ${
          unlocked
            ? `${tierConfig.border} ${isLight ? 'bg-white shadow-sm' : 'bg-white/5'} ${tierConfig.glow}`
            : `${isLight ? 'bg-zinc-100/80 border-zinc-200 opacity-60' : 'bg-white/[0.02] border-white/10 opacity-50'}`
        }`}
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center relative mb-2 ${
          unlocked 
            ? `bg-gradient-to-br ${tierConfig.bg} border ${tierConfig.border}` 
            : `${isLight ? 'bg-zinc-200' : 'bg-white/10'}`
        }`}>
          <IconComponent size={22} className={unlocked ? tierConfig.text : (isLight ? 'text-zinc-400' : 'text-white/40')} />
          {unlocked ? (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-black shadow-sm">
              <Check size={10} strokeWidth={3} />
            </div>
          ) : (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-zinc-700 text-white/70 flex items-center justify-center text-[9px]">
              <Lock size={9} />
            </div>
          )}
        </div>
        <span className={`text-[11px] font-black uppercase tracking-tight line-clamp-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
          {badge.title}
        </span>
        <span className={`text-[9px] font-bold uppercase mt-0.5 ${tierConfig.text}`}>
          {tierConfig.name}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={`relative p-5 rounded-3xl border cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
        unlocked
          ? `${tierConfig.border} ${isLight ? 'bg-white shadow-md shadow-zinc-200/50' : 'bg-[#0f0f0f] shadow-lg'} ${tierConfig.glow}`
          : `${isLight ? 'bg-zinc-50 border-zinc-200/80 hover:border-zinc-300' : 'bg-white/[0.03] border-white/10 hover:border-white/20'}`
      }`}
    >
      {/* Top Header: Badge Icon, Tier Tag & Unlock State */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105 ${
            unlocked 
              ? `bg-gradient-to-br ${tierConfig.bg} border-2 ${tierConfig.border} shadow-md` 
              : `${isLight ? 'bg-zinc-200/70 border border-zinc-300/60' : 'bg-white/10 border border-white/10'}`
          }`}>
            <IconComponent size={26} className={unlocked ? tierConfig.text : (isLight ? 'text-zinc-400' : 'text-white/40')} />
            {unlocked ? (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shadow-md border-2 border-white dark:border-black">
                <Check size={12} strokeWidth={3} />
              </div>
            ) : (
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-700 text-white/70 flex items-center justify-center text-[10px] shadow-sm border border-zinc-600">
                <Lock size={10} />
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border tracking-wider ${
              unlocked ? tierConfig.badgeClass : (isLight ? 'bg-zinc-200 text-zinc-600 border-zinc-300' : 'bg-white/10 text-white/50 border-white/10')
            }`}>
              {tierConfig.name}
            </span>
            <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
              +{badge.xpReward} XP · +{badge.diamondReward} 💎
            </span>
          </div>
        </div>

        {/* Badge Title & Subtitle */}
        <h4 className={`text-base font-black tracking-tight uppercase leading-snug line-clamp-1 ${
          isLight ? 'text-zinc-900' : 'text-white'
        }`}>
          {badge.title}
        </h4>
        <p className={`text-xs font-semibold mt-0.5 line-clamp-1 ${
          unlocked ? (isLight ? 'text-zinc-700' : 'text-white/80') : (isLight ? 'text-zinc-500' : 'text-white/40')
        }`}>
          {badge.subtitle}
        </p>
        <p className={`text-[11px] mt-2 line-clamp-2 leading-relaxed ${
          isLight ? 'text-zinc-600' : 'text-white/60'
        }`}>
          {badge.desc}
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div className={`mt-5 pt-3 border-t ${isLight ? 'border-zinc-100' : 'border-white/5'}`}>
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider mb-1.5">
          <span className={unlocked ? 'text-emerald-500' : (isLight ? 'text-zinc-500' : 'text-white/40')}>
            {unlocked ? 'Desbloqueada' : 'Progreso'}
          </span>
          <span className={isLight ? 'text-zinc-700' : 'text-white/70'}>
            {progressInfo.current} / {progressInfo.max}
          </span>
        </div>
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-zinc-200' : 'bg-white/10'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              unlocked 
                ? 'bg-emerald-500' 
                : (isLight ? 'bg-zinc-800' : 'bg-white')
            }`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
