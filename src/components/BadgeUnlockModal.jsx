// src/components/BadgeUnlockModal.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Check, 
  Zap, 
  Gem, 
  Target, 
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
  CheckCircle2 
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

export const BadgeUnlockModal = ({ 
  badge, 
  onClaim, 
  isLight = false 
}) => {
  if (!badge) return null;

  const tierConfig = BADGE_TIERS[badge.tier] || BADGE_TIERS.bronce;
  const IconComponent = ICON_MAP[badge.icon] || Award;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
        {/* Celebration Background Glow Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`w-full max-w-sm rounded-[36px] border-2 text-center p-8 relative shadow-2xl overflow-hidden ${
            tierConfig.border
          } ${
            isLight ? 'bg-white text-zinc-900 shadow-amber-500/10' : 'bg-[#0c0c0c] text-white shadow-black/80'
          }`}
        >
          {/* Top Pill */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-wider mb-6 shadow-lg shadow-amber-400/20">
            <Sparkles size={14} />
            <span>¡NUEVA INSIGNIA DESBLOQUEADA!</span>
          </div>

          {/* Big Center Badge */}
          <div className="flex justify-center my-2">
            <motion.div 
              initial={{ rotate: -15, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', damping: 15 }}
              className={`w-28 h-28 rounded-3xl flex items-center justify-center relative border-4 ${tierConfig.border} ${tierConfig.glow} ${
                isLight ? 'bg-white shadow-xl' : 'bg-black/90 shadow-2xl'
              }`}
            >
              <IconComponent size={56} className={tierConfig.text} />
              <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-black shadow-md border-2 border-white dark:border-black">
                <Check size={16} strokeWidth={3} />
              </div>
            </motion.div>
          </div>

          {/* Badge Titles */}
          <div className="mt-6 mb-4">
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${tierConfig.badgeClass}`}>
              Rango {tierConfig.name}
            </span>
            <h3 className={`text-2xl font-black uppercase tracking-tight mt-3 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {badge.title}
            </h3>
            <p className={`text-xs font-semibold mt-1 ${isLight ? 'text-zinc-600' : 'text-white/70'}`}>
              {badge.subtitle}
            </p>
          </div>

          <p className={`text-xs leading-relaxed px-2 mb-6 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
            {badge.desc}
          </p>

          {/* Reward Badges */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border ${
              isLight ? 'bg-amber-50 border-amber-200 text-amber-900 font-black text-xs' : 'bg-amber-500/15 border-amber-500/30 text-amber-300 font-black text-xs'
            }`}>
              <Zap size={14} className="text-amber-500" />
              <span>+{badge.xpReward} XP</span>
            </div>

            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border ${
              isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-900 font-black text-xs' : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300 font-black text-xs'
            }`}>
              <Gem size={14} className="text-cyan-500" />
              <span>+{badge.diamondReward} 💎</span>
            </div>
          </div>

          {/* Claim Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClaim}
            className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
              isLight 
                ? 'bg-zinc-900 text-white hover:bg-zinc-800' 
                : 'bg-white text-black hover:bg-white/90 shadow-white/10'
            }`}
          >
            Reclamar e Incorporar
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
