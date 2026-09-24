import React from 'react';
import { motion } from 'framer-motion';
import { ENVIRONMENTS, getEnvironmentTier } from '../data/focuslyCustomization';

export const FocuslyEnvironment = ({
  environmentId = 'env_focus',
  userXP = 0,
  isLight = false,
  children = null,
  showBadge = true,
  className = ''
}) => {
  const env = ENVIRONMENTS.find(e => e.id === environmentId) || ENVIRONMENTS[0];
  const tierInfo = getEnvironmentTier(userXP);

  if (isLight) {
    return (
      <div className={`relative w-full min-h-full bg-[#fafafa] text-zinc-900 transition-colors duration-500 overflow-hidden ${className}`}>
        {/* Soft daylight ambient grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
        {children}
      </div>
    );
  }

  return (
    <div className={`relative w-full min-h-full overflow-hidden bg-black transition-all duration-700 ${className}`}>
      
      {/* Dynamic Ambient Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${env.primaryGrad} opacity-90 transition-all duration-700`} />

      {/* Layer 1: Ambient Horizon Glow & Light Cones */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [tierInfo.glowIntensity * 0.4, tierInfo.glowIntensity * 0.7, tierInfo.glowIntensity * 0.4]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] pointer-events-none z-0"
        style={{ backgroundColor: env.accentHex }}
      />

      {/* Layer 2: Realm-Specific Environmental Sculptures & Floating Geometry */}
      {env.code === 'focus' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Zen floating stones / geometric monoliths */}
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, 4, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-24 h-48 rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-2xl"
          />
          <motion.div
            animate={{ y: [0, 22, 0], rotate: [0, -6, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-[12%] w-32 h-64 rounded-[3.5rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm shadow-2xl"
          />
          {tierInfo.elementsCount >= 3 && (
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full border border-white/15"
            />
          )}
        </div>
      )}

      {env.code === 'productivity' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Isometric Cyber Grids & Data Beams */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:48px_48px]" />
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/4 top-0 w-px h-64 bg-gradient-to-b from-transparent via-cyan-400/60 to-transparent"
          />
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute right-1/3 top-0 w-px h-80 bg-gradient-to-b from-transparent via-sky-400/60 to-transparent"
          />
        </div>
      )}

      {env.code === 'growth' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Bioluminescent floating spores and soft organic orbs */}
          <motion.div
            animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/6 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl border border-emerald-500/20"
          />
          <motion.div
            animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/3 right-1/5 w-60 h-60 rounded-full bg-teal-500/10 blur-3xl border border-teal-500/20"
          />
        </div>
      )}

      {env.code === 'mastery' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Celestial Astral Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full border border-amber-500/20 border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full border border-purple-500/25"
          />
        </div>
      )}

      {env.code === 'competitive' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Championship Arena Energy Pillars */}
          <div className="absolute left-10 bottom-0 w-20 h-[80%] bg-gradient-to-t from-rose-600/20 to-transparent blur-xl" />
          <div className="absolute right-10 bottom-0 w-20 h-[80%] bg-gradient-to-t from-rose-600/20 to-transparent blur-xl" />
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent"
          />
        </div>
      )}

      {/* Layer 3: Dynamic Tier Evolution Pillars (Beginner -> Novice -> Pro -> Legend) */}
      {tierInfo.tier === 'legend' && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/30 text-amber-300 font-mono text-[10px] tracking-widest uppercase shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            ⚡ ENTORNO NIVEL LEYENDA ACTIVADO
          </div>
        </div>
      )}

      {/* Foreground Children Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
