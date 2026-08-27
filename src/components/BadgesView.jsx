// src/components/BadgesView.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Sparkles, 
  Target, 
  Shield, 
  Flame, 
  Crown, 
  Calendar, 
  Award,
  Zap,
  Gem,
  CheckCircle2,
  Filter,
  ArrowRight
} from 'lucide-react';
import { BADGES, BADGE_CATEGORIES, BADGE_TIERS } from '../data/badges';
import { BadgeItem } from './BadgeItem';
import { BadgeDetailModal } from './BadgeDetailModal';

export const BadgesView = ({ 
  userStats = {}, 
  unlockedBadgeIds = [], 
  isLight = false,
  onBadgeSelect,
  onNavigateCrece
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBadge, setSelectedBadge] = useState(null);

  // Compute total stats
  const totalBadges = BADGES.length;
  const unlockedCount = BADGES.filter(b => {
    const isExplicit = unlockedBadgeIds.includes(b.id);
    const progress = b.check ? b.check(userStats) : { unlocked: false };
    return isExplicit || progress.unlocked;
  }).length;

  const totalBadgesXP = BADGES.reduce((sum, b) => {
    const isExplicit = unlockedBadgeIds.includes(b.id);
    const progress = b.check ? b.check(userStats) : { unlocked: false };
    return (isExplicit || progress.unlocked) ? sum + b.xpReward : sum;
  }, 0);

  const totalBadgesDiamonds = BADGES.reduce((sum, b) => {
    const isExplicit = unlockedBadgeIds.includes(b.id);
    const progress = b.check ? b.check(userStats) : { unlocked: false };
    return (isExplicit || progress.unlocked) ? sum + b.diamondReward : sum;
  }, 0);

  const overallProgressPct = Math.round((unlockedCount / totalBadges) * 100);

  // Filter badges
  const filteredBadges = selectedCategory === 'all' 
    ? BADGES 
    : BADGES.filter(b => b.category === selectedCategory);

  const handleOpenBadge = (badge) => {
    setSelectedBadge(badge);
    onBadgeSelect?.(badge);
  };

  return (
    <div className="space-y-6">
      {/* HEADER HERO STATS */}
      <div className={`p-6 md:p-8 rounded-[32px] border relative overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 ${
        isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
      }`}>
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center text-3xl md:text-4xl shadow-xl border-2 ${
            isLight ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-amber-500/20 border-amber-500/40 text-amber-400'
          }`}>
            <Trophy size={36} className="text-amber-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border tracking-widest ${
                isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/10 border-white/20 text-white'
              }`}>
                Colección de Logros
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mt-1">
              Insignias y Desafíos
            </h3>
            <p className={`text-xs mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
              Desbloquea medallas épicas superando retos, manteniendo rachas y alcanzando metas.
            </p>
          </div>
        </div>

        {/* Global Progress & Rewards Count */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className={`p-3.5 px-4 rounded-2xl border text-center ${
            isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
          }`}>
            <span className="text-lg md:text-xl font-black">{unlockedCount} / {totalBadges}</span>
            <span className={`text-[9px] font-black uppercase tracking-wider block ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
              Desbloqueadas ({overallProgressPct}%)
            </span>
          </div>

          <div className={`p-3.5 px-4 rounded-2xl border text-center ${
            isLight ? 'bg-amber-50/50 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
          }`}>
            <span className="text-lg md:text-xl font-black">+{totalBadgesXP}</span>
            <span className="text-[9px] font-black uppercase tracking-wider block opacity-70">
              XP Ganada
            </span>
          </div>

          <div className={`p-3.5 px-4 rounded-2xl border text-center ${
            isLight ? 'bg-cyan-50/50 border-cyan-200 text-cyan-900' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300'
          }`}>
            <span className="text-lg md:text-xl font-black">+{totalBadgesDiamonds} 💎</span>
            <span className="text-[9px] font-black uppercase tracking-wider block opacity-70">
              Diamantes
            </span>
          </div>
        </div>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scroll no-scrollbar">
        {BADGE_CATEGORIES.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 border flex items-center gap-2 ${
                isActive
                  ? (isLight ? 'bg-zinc-900 text-white border-zinc-900 shadow-sm' : 'bg-white text-black border-white shadow-md shadow-white/10')
                  : (isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/60')
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isActive 
                  ? (isLight ? 'bg-zinc-800 text-white' : 'bg-black text-white')
                  : (isLight ? 'bg-zinc-100 text-zinc-500' : 'bg-white/10 text-white/40')
              }`}>
                {cat.id === 'all' ? BADGES.length : BADGES.filter(b => b.category === cat.id).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* MAESTRÍAS PROMO BANNER */}
      {selectedCategory === 'maestrias' && (
        <div className={`p-6 rounded-[28px] border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isLight ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-zinc-900' : 'bg-gradient-to-r from-blue-900/30 to-indigo-900/20 border-blue-500/30 text-white'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center text-2xl shrink-0 shadow-md">
              🎓
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-tight">Cursos y Maestrías de Productividad</h4>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-zinc-600' : 'text-white/70'}`}>
                Aprende computación, atajos, toma de notas, IA y neurociencia en la sección Crece para desbloquear estas medallas.
              </p>
            </div>
          </div>
          {onNavigateCrece && (
            <button
              onClick={onNavigateCrece}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 shadow-sm ${
                isLight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-black hover:bg-blue-400 font-black'
              }`}
            >
              <span>Ir a las Clases</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}

      {/* BADGES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {filteredBadges.map(badge => {
          const isExplicit = unlockedBadgeIds.includes(badge.id);
          const progress = badge.check ? badge.check(userStats) : { unlocked: false };
          const unlocked = isExplicit || progress.unlocked;

          return (
            <BadgeItem
              key={badge.id}
              badge={badge}
              stats={userStats}
              isUnlocked={unlocked}
              onClick={() => handleOpenBadge(badge)}
              isLight={isLight}
            />
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      {selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge}
          stats={userStats}
          isUnlocked={unlockedBadgeIds.includes(selectedBadge.id) || (selectedBadge.check && selectedBadge.check(userStats).unlocked)}
          onClose={() => setSelectedBadge(null)}
          isLight={isLight}
        />
      )}
    </div>
  );
};
