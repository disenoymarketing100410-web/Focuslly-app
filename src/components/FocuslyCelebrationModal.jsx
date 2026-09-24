import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Gem, Zap, CheckCircle2, Crown } from 'lucide-react';
import { FocuslyAvatar3D } from './FocuslyAvatar3D';

export const FocuslyCelebrationModal = ({
  isOpen = false,
  onClose = () => {},
  type = 'challenge', // 'challenge' | 'level_up' | 'league' | 'reward'
  title = '¡Desafío Completado!',
  subtitle = 'Tu constancia está elevando tu capacidad de atención.',
  xpGained = 150,
  diamondsGained = 45,
  avatarProps = {},
  isLight = false
}) => {
  const [animatedXP, setAnimatedXP] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setAnimatedXP(0);
      let current = 0;
      const step = Math.max(1, Math.floor(xpGained / 25));
      const interval = setInterval(() => {
        current += step;
        if (current >= xpGained) {
          setAnimatedXP(xpGained);
          clearInterval(interval);
        } else {
          setAnimatedXP(current);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isOpen, xpGained]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
        
        {/* Floating Background Particle Beams */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-500/10 via-purple-500/15 to-transparent blur-3xl"
          />
        </div>

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`relative max-w-md w-full p-8 rounded-[36px] border text-center space-y-6 shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden ${
            isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-zinc-950 border-white/20 text-white'
          }`}
        >
          {/* Top Confetti / Sparkle Pill */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.15, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-500/30"
          >
            <Sparkles size={14} />
            <span>¡Victoria de Enfoque!</span>
          </motion.div>

          {/* 3D Avatar in Celebrating State */}
          <div className="py-2 flex justify-center">
            <FocuslyAvatar3D
              {...avatarProps}
              size="md"
              animationState="celebrate"
              interactive={false}
            />
          </div>

          {/* Titles */}
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
              {title}
            </h3>
            <p className={`text-xs sm:text-sm max-w-xs mx-auto ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {subtitle}
            </p>
          </div>

          {/* Reward Badges with Rolling Numbers */}
          <div className="flex items-center justify-center gap-4">
            {xpGained > 0 && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="px-5 py-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2 text-amber-400 font-black text-base shadow-sm"
              >
                <Zap size={18} />
                <span>+{animatedXP} XP</span>
              </motion.div>
            )}

            {diamondsGained > 0 && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="px-5 py-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center gap-2 text-cyan-400 font-black text-base shadow-sm"
              >
                <Gem size={18} />
                <span>+{diamondsGained} Diamantes</span>
              </motion.div>
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all transform active:scale-95 shadow-xl cursor-pointer"
          >
            Reclamar y Continuar
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
