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
  BookOpen,
  Award,
  Zap,
  Gem,
  CheckCircle2,
  Lock,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { BADGES, BADGE_CATEGORIES, BADGE_TIERS } from '../data/badges';
import { BadgeItem } from './BadgeItem';
import { BadgeDetailModal } from './BadgeDetailModal';

const CATEGORY_ICON_MAP = {
  Sparkles,
  BookOpen,
  Target,
  Shield,
  Flame,
  Crown,
  Calendar
};

export const BadgesView = ({ 
  userStats = {}, 
  unlockedBadgeIds = [], 
  isLight = false,
  onBadgeSelect,
  onNavigateCrece,
  lang = 'es'
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

  const getCategoryName = (cat) => {
    if (lang !== 'en') return cat.name;
    const map = {
      all: 'All',
      foco: 'Focus',
      maestrias: 'Masteries',
      disciplina: 'Discipline',
      racha: 'Streaks',
      comunidad: 'Community',
      desafios: 'Quests'
    };
    return map[cat.id] || cat.name;
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER HERO STATS: SLEEK, CRAFTED, ZERO SLOP */}
      <div className={`p-6 sm:p-8 rounded-[32px] border relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 ${
        isLight ? 'bg-white border-zinc-200 text-zinc-900 shadow-sm' : 'bg-black border-white/15 text-white shadow-xl'
      }`}>
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl shadow-xl border-2 shrink-0 ${
            isLight 
              ? 'bg-zinc-100 border-zinc-300 text-zinc-900' 
              : 'bg-white/10 border-white/20 text-white'
          }`}>
            <Trophy size={36} className={isLight ? 'text-zinc-900' : 'text-white'} />
          </div>

          <div>
            <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border tracking-widest ${
              isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/10 border-white/20 text-zinc-300'
            }`}>
              {lang === 'en' ? 'Official Collection' : 'Colección Oficial'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-1">
              {lang === 'en' ? 'Badges & Medals' : 'Insignias y Medallas'}
            </h3>
            <p className={`text-xs mt-0.5 max-w-md ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {lang === 'en'
                ? 'Tap any medal to inspect its lore, unlock criteria and rewards.'
                : 'Toca cualquier medalla para consultar su historia, objetivos de desbloqueo y recompensas.'}
            </p>
          </div>
        </div>

        {/* Global Progress & Rewards Count */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className={`p-3 px-4 rounded-2xl border text-center min-w-[100px] ${
            isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-zinc-900 border-white/10'
          }`}>
            <span className="text-base sm:text-lg font-black block">
              {unlockedCount} {lang === 'en' ? 'of' : 'de'} {totalBadges}
            </span>
            <span className={`text-[8px] font-black uppercase tracking-wider block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {overallProgressPct}% {lang === 'en' ? 'Completed' : 'Completado'}
            </span>
          </div>

          <div className={`p-3 px-4 rounded-2xl border text-center min-w-[90px] ${
            isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-zinc-900 border-white/10 text-white'
          }`}>
            <span className="text-base sm:text-lg font-black block">+{totalBadgesXP}</span>
            <span className={`text-[8px] font-black uppercase tracking-wider block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {lang === 'en' ? 'XP Earned' : 'XP Ganada'}
            </span>
          </div>

          <div className={`p-3 px-4 rounded-2xl border text-center min-w-[90px] ${
            isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-zinc-900 border-white/10 text-white'
          }`}>
            <span className="text-base sm:text-lg font-black block">+{totalBadgesDiamonds} 💎</span>
            <span className={`text-[8px] font-black uppercase tracking-wider block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {lang === 'en' ? 'Diamonds' : 'Diamantes'}
            </span>
          </div>
        </div>
      </div>

      {/* CATEGORY SELECTOR */}
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scroll no-scrollbar py-1">
          {BADGE_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            const CategoryIcon = CATEGORY_ICON_MAP[cat.icon] || Sparkles;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 cursor-pointer select-none border ${
                  isActive
                    ? isLight
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-black border-white shadow-lg shadow-white/10'
                    : isLight
                      ? 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-600'
                      : 'bg-zinc-900/80 hover:bg-zinc-800 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <CategoryIcon 
                  size={15} 
                  className={isActive ? (isLight ? 'text-white' : 'text-black') : (isLight ? 'text-zinc-500' : 'text-zinc-400')} 
                />
                <span>{getCategoryName(cat)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAESTRÍAS PROMO BANNER */}
      {selectedCategory === 'maestrias' && (
        <div className={`p-6 rounded-[28px] border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isLight 
            ? 'bg-zinc-100 border-zinc-200 text-zinc-900' 
            : 'bg-zinc-900 border-white/15 text-white'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md ${
              isLight ? 'bg-black text-white' : 'bg-white text-black'
            }`}>
              <GraduationCap size={24} />
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-tight">
                {lang === 'en' ? 'Productivity Courses & Masteries' : 'Cursos y Maestrías de Productividad'}
              </h4>
              <p className={`text-xs mt-0.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {lang === 'en'
                  ? 'Learn computing skills, shortcuts, AI and neuroscience in the Grow section to unlock these medals.'
                  : 'Aprende computación, atajos de teclado, IA y neurociencia en la sección Crece para desbloquear estas medallas.'}
              </p>
            </div>
          </div>
          {onNavigateCrece && (
            <button
              onClick={onNavigateCrece}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 shadow-sm cursor-pointer ${
                isLight ? 'bg-black text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              <span>{lang === 'en' ? 'Go to Classes' : 'Ir a las Clases'}</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      )}

      {/* BADGES SHOWCASE GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5">
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
              lang={lang}
            />
          );
        })}
      </div>

      {/* DETAIL MODAL: OPENS UPON CLICKING ANY MEDAL */}
      {selectedBadge && (
        <BadgeDetailModal
          badge={selectedBadge}
          stats={userStats}
          isUnlocked={unlockedBadgeIds.includes(selectedBadge.id) || (selectedBadge.check && selectedBadge.check(userStats).unlocked)}
          onClose={() => setSelectedBadge(null)}
          isLight={isLight}
          lang={lang}
        />
      )}
    </div>
  );
};
