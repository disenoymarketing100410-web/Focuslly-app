import React, { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Flame, Crown, MessageCircle } from 'lucide-react';
import { RARITIES, OUTFITS, ACCESSORIES, CHARACTER_PERSONAS } from '../data/focuslyCustomization';

const SPEECH_QUOTES = [
  "¡Cada minuto enfocado forja tu destino!",
  "El ruido del mundo desaparece cuando te concentras.",
  "La constancia vence a la motivación vacía.",
  "Una sola tarea a la vez. Dominio total.",
  "Tus metas son más grandes que cualquier distracción.",
  "Respira profundo. Es hora del Deep Work."
];

const FocuslyAvatar3DComponent = ({
  avatarId = 'a_base',
  outfitId = 'outfit_base',
  accessoryId = 'acc_none',
  expression = 'focused',
  title = '',
  size = 'lg', // 'sm' | 'md' | 'lg' | 'hero'
  animationState = 'idle', // 'idle' | 'greet' | 'celebrate' | 'xp_gain' | 'react'
  onAvatarClick = null,
  showPedestal = true,
  interactive = true,
  className = ''
}) => {
  const [internalState, setInternalState] = useState(animationState);
  const [speechBubble, setSpeechBubble] = useState(null);
  const [isBlinking, setIsBlinking] = useState(false);
  const speechTimerRef = useRef(null);
  const greetTimerRef = useRef(null);

  // Synchronize internal animation state when prop changes
  useEffect(() => {
    setInternalState(animationState);
  }, [animationState]);

  // Periodic blinking effect - only active when interactive and not in small avatar thumbnail mode
  useEffect(() => {
    if (!interactive || size === 'sm') return;
    let blinkTimeout = null;
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      blinkTimeout = setTimeout(() => setIsBlinking(false), 180);
    }, 4500 + Math.random() * 2500);

    return () => {
      clearInterval(blinkInterval);
      if (blinkTimeout) clearTimeout(blinkTimeout);
    };
  }, [interactive, size]);

  // Clear speech timers on unmount
  useEffect(() => {
    return () => {
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      if (greetTimerRef.current) clearTimeout(greetTimerRef.current);
    };
  }, []);

  const outfit = OUTFITS.find(o => o.id === outfitId) || OUTFITS[0];
  const accessory = ACCESSORIES.find(a => a.id === accessoryId) || ACCESSORIES[0];
  const outfitRarity = RARITIES[outfit?.rarity || 'common'];
  const accRarity = RARITIES[accessory?.rarity || 'common'];
  const persona = CHARACTER_PERSONAS[avatarId] || CHARACTER_PERSONAS.a_base || {};
  const bodyArchetype = persona.bodyArchetype || (
    avatarId === 'a_atlas' ? 'robust' :
    avatarId === 'a_monk' || avatarId === 'a_chibi_zen' || avatarId === 'a_neko_cyber' ? 'chibi' :
    avatarId === 'a_valkyrie' || avatarId === 'a_crono' || avatarId === 'a_sophia' ? 'tall_ethereal' :
    avatarId === 'a_bot' || avatarId === 'a_cyberdoc' || avatarId === 'a_hacker' ? 'mecha_robot' :
    avatarId === 'a_vento' || avatarId === 'a_icaro' ? 'beast_creature' :
    avatarId === 'a_void' || avatarId === 'a_brain' ? 'astral_entity' :
    'human_standard'
  );
  const isLegendaryOrMythic = persona.rarity === 'legendary' || persona.rarity === 'mythic' || outfit.rarity === 'legendary' || outfit.rarity === 'mythic';

  const handleInteract = () => {
    if (!interactive) return;
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    if (greetTimerRef.current) clearTimeout(greetTimerRef.current);

    const randomQuote = SPEECH_QUOTES[Math.floor(Math.random() * SPEECH_QUOTES.length)];
    setSpeechBubble(randomQuote);
    setInternalState('greet');

    greetTimerRef.current = setTimeout(() => {
      setInternalState('idle');
      speechTimerRef.current = setTimeout(() => setSpeechBubble(null), 3200);
    }, 1800);

    if (onAvatarClick) onAvatarClick();
  };

  // Dimensions based on size prop with responsive scaling for desktop and large monitors
  const sizeMap = {
    sm: { container: 'w-16 h-20', scale: 0.45, fontTitle: 'text-[9px]' },
    md: { container: 'w-32 h-40', scale: 0.75, fontTitle: 'text-[11px]' },
    lg: { container: 'w-48 h-60 sm:w-56 sm:h-72 lg:w-64 lg:h-80 2xl:w-72 2xl:h-92', scale: 1.0, fontTitle: 'text-xs 2xl:text-sm' },
    hero: { container: 'w-64 h-80 sm:w-76 sm:h-96 lg:w-88 lg:h-[420px] 2xl:w-[420px] 2xl:h-[480px]', scale: 1.35, fontTitle: 'text-sm 2xl:text-base' }
  };

  const currentSize = sizeMap[size] || sizeMap.lg;

  return (
    <div
      onClick={handleInteract}
      className={`relative flex flex-col items-center justify-center select-none ${interactive ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Speech Bubble on interaction */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute -top-16 z-50 bg-white text-black font-black text-xs px-4 py-2.5 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-2 border-white/80 max-w-[220px] text-center pointer-events-none"
          >
            <div className="flex items-center gap-1.5 justify-center text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-0.5">
              <Sparkles size={10} className="text-amber-500" />
              <span>Focusly Spirit</span>
            </div>
            <span>{speechBubble}</span>
            <div className="w-3 h-3 bg-white rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-r-2 border-b-2 border-white/80" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Badge if provided */}
      {title && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center gap-1.5 shadow-sm"
        >
          <Crown size={11} className="text-amber-400" />
          <span className={`font-black uppercase tracking-wider text-zinc-200 ${currentSize.fontTitle}`}>
            {title}
          </span>
        </motion.div>
      )}

      {/* Main Avatar Stage & SVG Character Rig */}
      <div className={`relative flex items-center justify-center ${currentSize.container}`}>
        
        {/* Ambient Backlight Glow depending on outfit & accessory rarity */}
        <motion.div
          animate={{
            scale: internalState === 'celebrate' ? [1, 1.25, 1.05] : [1, 1.08, 1],
            opacity: internalState === 'celebrate' ? [0.25, 0.45, 0.3] : [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full blur-2xl pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle, ${outfitRarity.glow} 0%, rgba(255,255,255,0.02) 60%, transparent 85%)`
          }}
        />

        {/* Dynamic Shadow on Pedestal */}
        {showPedestal && (
          <div className="absolute -bottom-4 z-0 flex items-center justify-center w-full">
            <motion.div
              animate={{
                scaleX: internalState === 'celebrate' ? [0.6, 0.9, 0.7] : [0.85, 1, 0.85],
                opacity: internalState === 'celebrate' ? [0.2, 0.4, 0.25] : [0.25, 0.45, 0.25]
              }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="w-28 h-5 bg-black/60 rounded-[100%] blur-sm border border-white/5"
            />
          </div>
        )}

        {/* Floating / Animating Character Body Container */}
        <motion.div
          animate={
            internalState === 'celebrate'
              ? { y: [0, -20, 0, -14, 0], rotate: [0, -4, 4, -2, 0] }
              : internalState === 'greet'
              ? { y: [0, -10, 0], rotate: [0, 3, -3, 0] }
              : internalState === 'xp_gain'
              ? { y: [0, -16, 0], scale: [1, 1.05, 1] }
              : { y: [0, -6, 0] } // idle breathing levitation
          }
          transition={{
            duration: internalState === 'celebrate' ? 1.4 : internalState === 'greet' ? 1 : 3.4,
            repeat: internalState === 'idle' ? Infinity : 0,
            ease: "easeInOut"
          }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          {/* Stylized 3D Character Vector Rendering */}
          <svg
            viewBox="0 0 200 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)]"
          >
            <defs>
              {/* Gradients for 3D Volume & Lighting */}
              <linearGradient id="headGrad" x1="60" y1="30" x2="140" y2="130" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="60%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>

              <linearGradient id="titaniumHead" x1="60" y1="30" x2="140" y2="130" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <linearGradient id="goldFiligree" x1="60" y1="30" x2="140" y2="130" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#d4af37" />
                <stop offset="100%" stopColor="#854d0e" />
              </linearGradient>

              <linearGradient id="visorGrad" x1="70" y1="70" x2="130" y2="95" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={accessoryId === 'acc_holo_visor' ? '#38bdf8' : '#cbd5e1'} />
                <stop offset="50%" stopColor={accessoryId === 'acc_holo_visor' ? '#0369a1' : '#64748b'} />
                <stop offset="100%" stopColor="#090d16" />
              </linearGradient>

              <linearGradient id="bodyGrad" x1="50" y1="120" x2="150" y2="210" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor={outfit.accentColor} />
                <stop offset="45%" stopColor={outfit.primaryColor} />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>

              <linearGradient id="coreGlow" x1="90" y1="140" x2="110" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor={outfit.accentColor} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>

              {/* Gold Champion Foil */}
              <linearGradient id="goldRim" x1="0" y1="0" x2="200" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Back Accessory: Cosmic Wings if equipped */}
            {accessoryId === 'acc_wings' && (
              <g className="animate-pulse">
                <path
                  d="M40 130 C10 90 20 40 5 10 C30 35 60 70 70 120 Z"
                  fill="url(#goldRim)"
                  opacity="0.85"
                />
                <path
                  d="M160 130 C190 90 180 40 195 10 C170 35 140 70 130 120 Z"
                  fill="url(#goldRim)"
                  opacity="0.85"
                />
              </g>
            )}

            {/* Back Accessory: Floating AI Companion Drone */}
            {accessoryId === 'acc_drone' && (
              <g transform="translate(145, 45)">
                <circle cx="15" cy="15" r="14" fill="#0f172a" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="15" cy="15" r="4" fill="#38bdf8" />
                <rect x="5" y="13" width="20" height="3" rx="1.5" fill="#475569" />
              </g>
            )}

            {/* Accessory: Focus Halo above head */}
            {accessoryId === 'acc_focus_halo' && (
              <ellipse
                cx="100"
                cy="28"
                rx="38"
                ry="10"
                fill="none"
                stroke="#d4af37"
                strokeWidth="3"
                strokeDasharray="6 3"
                opacity="0.85"
              />
            )}

            {/* Main Torso / Outfit & Dynamic Archetype Silhouette */}
            {bodyArchetype === 'robust' ? (
              <g>
                {/* Heavy Angular Stone Chestplate */}
                <path
                  d="M45 120 L155 120 L146 200 L100 218 L54 200 Z"
                  fill="url(#bodyGrad)"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
                {/* Runic Energy Fissures */}
                <path d="M72 135 L88 158 L82 188" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
                <path d="M128 135 L112 158 L118 188" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.9" />
                {/* Runic Central Inscription */}
                <polygon points="100,140 114,154 100,168 86,154" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <polygon points="100,144 109,154 100,164 91,154" fill="#38bdf8" />
                {/* Heavy Pauldron Shoulders */}
                <path d="M22 114 L50 114 L44 162 L16 146 Z" fill="#18181b" stroke="#38bdf8" strokeWidth="2" />
                <path d="M178 114 L150 114 L156 162 L184 146 Z" fill="#18181b" stroke="#38bdf8" strokeWidth="2" />
              </g>
            ) : bodyArchetype === 'chibi' ? (
              <g>
                {/* CHIBI ARCHETYPE: Compact Cute Torso & Prayer Beads / Pet Details */}
                <path
                  d="M72 135 C72 122 84 118 100 118 C116 118 128 122 128 135 L132 188 C132 198 118 204 100 204 C82 204 68 198 68 188 Z"
                  fill="url(#bodyGrad)"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                />
                {/* Small Cute Arms */}
                <path d="M66 136 C55 144 54 160 58 172 C62 180 70 176 72 168 L74 145 Z" fill={outfit.primaryColor} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <path d="M134 136 C145 144 146 160 142 172 C138 180 130 176 128 168 L126 145 Z" fill={outfit.primaryColor} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                {/* Sacred Wooden Prayer Beads for Chibi Monk */}
                {avatarId === 'a_chibi_zen' || avatarId === 'a_monk' ? (
                  <g>
                    <circle cx="78" cy="132" r="4.5" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                    <circle cx="89" cy="138" r="4.5" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                    <circle cx="100" cy="141" r="5.5" fill="#b45309" stroke="#fbbf24" strokeWidth="1" />
                    <circle cx="111" cy="138" r="4.5" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                    <circle cx="122" cy="132" r="4.5" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                  </g>
                ) : (
                  <circle cx="100" cy="150" r="7" fill="url(#coreGlow)" />
                )}
                {/* Cyber Tail for Neko */}
                {avatarId === 'a_neko_cyber' && (
                  <path d="M130 188 C158 196 172 172 162 148 C156 134 168 128 174 138" stroke="#38bdf8" strokeWidth="3" fill="none" strokeDasharray="4 2" />
                )}
              </g>
            ) : bodyArchetype === 'tall_ethereal' ? (
              <g>
                {/* TALL ETHEREAL ARCHETYPE: Slender Elongated Robes & Floating Light Veil */}
                <path
                  d="M70 120 C70 110 84 104 100 104 C116 104 130 110 130 120 L140 216 C140 224 122 230 100 230 C78 230 60 224 60 216 Z"
                  fill="url(#bodyGrad)"
                  stroke={outfit.accentColor}
                  strokeWidth="2"
                />
                {/* High Sacred Collar */}
                <path d="M84 104 L100 126 L116 104 Z" fill="#09090b" stroke={outfit.accentColor} strokeWidth="1.5" />
                {/* Slender Arms & Celestial Starlight Drapes */}
                <path d="M64 124 C52 140 48 175 52 205 C56 212 66 210 68 198 L72 142 Z" fill={outfit.primaryColor} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                <path d="M136 124 C148 140 152 175 148 205 C144 212 134 210 132 198 L128 142 Z" fill={outfit.primaryColor} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                {/* Kinetic Light Veils */}
                <path d="M48 120 C36 150 40 190 52 215" stroke={outfit.accentColor} strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.8" />
                <path d="M152 120 C164 150 160 190 148 215" stroke={outfit.accentColor} strokeWidth="2" strokeDasharray="5 3" fill="none" opacity="0.8" />
                <circle cx="100" cy="148" r="9" fill="url(#coreGlow)" />
              </g>
            ) : bodyArchetype === 'mecha_robot' ? (
              <g>
                {/* MECHA ROBOT ARCHETYPE: Hexagonal Armored Chassis & Hydraulic Joints */}
                <path
                  d="M58 124 L100 108 L142 124 L138 185 L100 210 L62 185 Z"
                  fill="#0f172a"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                />
                {/* Cooling Vents */}
                <rect x="70" y="165" width="16" height="3" rx="1.5" fill="#38bdf8" />
                <rect x="114" y="165" width="16" height="3" rx="1.5" fill="#38bdf8" />
                <line x1="100" y1="126" x2="100" y2="198" stroke="#1e293b" strokeWidth="2" />
                {/* Rotating Arc Reactor Core */}
                <circle cx="100" cy="146" r="13" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="100" cy="146" r="6" fill="#e0f2fe" />
                {/* Angular Cybernetic Arms */}
                <path d="M56 126 L38 148 L46 182 L58 180 L52 152 L68 135 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
                <path d="M144 126 L162 148 L154 182 L142 180 L148 152 L132 135 Z" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
              </g>
            ) : bodyArchetype === 'beast_creature' ? (
              <g>
                {/* BEAST / CREATURE ARCHETYPE: Aerodynamic Scale Torso & Lateral Wings */}
                <path
                  d="M58 128 C28 108 12 136 22 178 C34 158 48 152 56 166 Z"
                  fill={avatarId === 'a_icaro' ? '#ea580c' : '#0284c7'}
                  stroke={avatarId === 'a_icaro' ? '#fbbf24' : '#38bdf8'}
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <path
                  d="M142 128 C172 108 188 136 178 178 C166 158 152 152 144 166 Z"
                  fill={avatarId === 'a_icaro' ? '#ea580c' : '#0284c7'}
                  stroke={avatarId === 'a_icaro' ? '#fbbf24' : '#38bdf8'}
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <path
                  d="M62 122 C72 108 100 106 138 122 L142 195 C125 210 100 216 75 210 L58 195 Z"
                  fill="url(#bodyGrad)"
                  stroke={outfit.accentColor}
                  strokeWidth="2"
                />
                <path d="M85 124 L100 145 L115 124" stroke={outfit.accentColor} strokeWidth="2" fill="none" />
                <circle cx="100" cy="154" r="9" fill="url(#coreGlow)" />
              </g>
            ) : bodyArchetype === 'astral_entity' ? (
              <g>
                {/* ASTRAL ENTITY ARCHETYPE: Cosmic Singularity Nebula & Orbital Rings */}
                <ellipse cx="100" cy="165" rx="36" ry="42" fill="#09090b" stroke="#c084fc" strokeWidth="2.5" />
                <ellipse cx="100" cy="165" rx="26" ry="32" fill="#1e1b4b" opacity="0.85" />
                {/* Dual Orbital Kinetic Rings */}
                <ellipse cx="100" cy="165" rx="55" ry="16" fill="none" stroke="#a855f7" strokeWidth="2" transform="rotate(-18 100 165)" strokeDasharray="8 4" />
                <ellipse cx="100" cy="165" rx="55" ry="16" fill="none" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(22 100 165)" strokeDasharray="6 3" />
                {/* Singularity Core Pulsar */}
                <circle cx="100" cy="165" r="8" fill="#f43f5e" />
                <circle cx="100" cy="165" r="4" fill="#ffffff" />
              </g>
            ) : (
              <g>
                {/* HUMAN STANDARD ARCHETYPE: Athletic Form with Custom Tailoring */}
                <path
                  d="M65 130 C65 118 78 112 100 112 C122 112 135 118 135 130 L145 195 C145 208 130 214 100 214 C70 214 55 208 55 195 Z"
                  fill="url(#bodyGrad)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                />
                {/* Outfit Collar & Texture Details */}
                <path
                  d="M85 112 L100 134 L115 112 Z"
                  fill="#18181b"
                  stroke={outfit.accentColor}
                  strokeWidth="2"
                />
                {/* Hero Energy Core in Chest */}
                <circle cx="100" cy="152" r="10" fill="url(#coreGlow)" />
                <circle cx="100" cy="152" r="4" fill="#ffffff" />
                {/* Arms / Shoulders */}
                <path
                  d="M58 132 C45 142 42 165 48 185 C52 195 62 192 65 180 L70 145 Z"
                  fill={outfit.primaryColor}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                />
                <path
                  d="M142 132 C155 142 158 165 152 185 C148 195 138 192 135 180 L130 145 Z"
                  fill={outfit.primaryColor}
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                />
              </g>
            )}

            {/* LEGENDARY & MYTHIC PRESTIGE EFFECTS: Orbiting Particles & Crown Glyphs */}
            {isLegendaryOrMythic && (
              <g>
                <circle cx="42" cy="85" r="3" fill="#fbbf24" opacity="0.85" />
                <circle cx="158" cy="80" r="2.5" fill="#38bdf8" opacity="0.85" />
                <circle cx="165" cy="145" r="3" fill="#f43f5e" opacity="0.8" />
                <circle cx="35" cy="155" r="2" fill="#a855f7" opacity="0.85" />
                {/* Celestial Rune Crest floating above head */}
                <polygon points="100,6 107,14 100,22 93,14" fill="url(#goldFiligree)" stroke="#fef08a" strokeWidth="1" />
              </g>
            )}

            {/* ----------------- SPECIFIC AVATAR PERSONA HEAD & GEAR ----------------- */}

            {/* 1. SAMURAI / RONIN: Kabuto Helmet with Golden Crest Horns */}
            {avatarId === 'a_samurai' ? (
              <g>
                {/* Kabuto Base Helm */}
                <path d="M60 76 C60 40 76 26 100 26 C124 26 140 40 140 76 C140 108 122 118 100 118 C78 118 60 108 60 76 Z" fill="#18181b" stroke="#d4af37" strokeWidth="2.5" />
                {/* Golden Horned Crest (Maedate) */}
                <path d="M100 24 L84 4 C88 12 96 16 100 20 C104 16 112 12 116 4 Z" fill="url(#goldFiligree)" stroke="#fef08a" strokeWidth="1" />
                <path d="M70 42 C85 36 115 36 130 42" stroke="#d4af37" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Stoic Face Mask (Menpo) */}
                <path d="M72 82 L100 96 L128 82 L120 114 L80 114 Z" fill="#27272a" stroke="#d4af37" strokeWidth="1.5" />
                {/* Focused Steel Eyes */}
                <ellipse cx="86" cy="74" rx="5" ry="3" fill="#ffffff" />
                <circle cx="87" cy="74" r="2" fill="#0f172a" />
                <ellipse cx="114" cy="74" rx="5" ry="3" fill="#ffffff" />
                <circle cx="113" cy="74" r="2" fill="#0f172a" />
              </g>
            ) : avatarId === 'a_alchemist' ? (
              /* 2. ALCHEMIST: Scholar Cowl & Round Brass Spectacles */
              <g>
                {/* Hood Cowl */}
                <path d="M56 80 C56 34 74 22 100 22 C126 22 144 34 144 80 C144 116 126 122 100 122 C74 122 56 116 56 80 Z" fill="#292524" stroke="#d97706" strokeWidth="2" />
                {/* Face inside cowl */}
                <ellipse cx="100" cy="76" rx="30" ry="32" fill="#f5f5f4" />
                {/* Round Spectacles */}
                <circle cx="88" cy="73" r="10" fill="rgba(255,255,255,0.4)" stroke="#d97706" strokeWidth="2" />
                <circle cx="112" cy="73" r="10" fill="rgba(255,255,255,0.4)" stroke="#d97706" strokeWidth="2" />
                <line x1="98" y1="73" x2="102" y2="73" stroke="#d97706" strokeWidth="2" />
                {/* Focused Eyes */}
                <circle cx="88" cy="73" r="3" fill="#78350f" />
                <circle cx="112" cy="73" r="3" fill="#78350f" />
                {/* Soft Scholar Smile */}
                <path d="M94 92 Q100 96 106 92" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>
            ) : avatarId === 'a_valkyrie' ? (
              /* 3. VALKYRIE: Platinum Winged Circlet & Resolute Gaze */
              <g>
                {/* Head */}
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="url(#headGrad)" stroke="#e2e8f0" strokeWidth="2" />
                {/* Silver Wing Crests on sides */}
                <path d="M60 65 C45 45 42 20 48 10 C54 30 62 50 64 68 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M140 65 C155 45 158 20 152 10 C146 30 138 50 136 68 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Platinum Diadem */}
                <path d="M68 50 C85 45 115 45 132 50 L100 40 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
                {/* Eyes */}
                <ellipse cx="87" cy="72" rx="6" ry="5" fill="#ffffff" />
                <circle cx="87" cy="72" r="3" fill="#0284c7" />
                <ellipse cx="113" cy="72" rx="6" ry="5" fill="#ffffff" />
                <circle cx="113" cy="72" r="3" fill="#0284c7" />
              </g>
            ) : avatarId === 'a_astronomer' ? (
              /* 4. ASTRONOMER: Deep Midnight Hood & Star Astrolabe Monocle */
              <g>
                <path d="M58 78 C58 35 76 24 100 24 C124 24 142 35 142 78 C142 114 124 120 100 120 C76 120 58 114 58 78 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <ellipse cx="100" cy="76" rx="28" ry="30" fill="#f1f5f9" />
                {/* Astrolabe Monocle on right eye */}
                <circle cx="113" cy="72" r="11" fill="rgba(56,189,248,0.2)" stroke="#d4af37" strokeWidth="2" />
                <path d="M113 61 L113 83 M102 72 L124 72" stroke="#d4af37" strokeWidth="1" opacity="0.6" />
                {/* Left Eye */}
                <ellipse cx="87" cy="72" rx="5" ry="4" fill="#0f172a" />
                <circle cx="86" cy="71" r="1.5" fill="#ffffff" />
                {/* Star constellation speckles on hood */}
                <circle cx="70" cy="40" r="1.5" fill="#ffffff" />
                <circle cx="130" cy="42" r="1.5" fill="#ffffff" />
                <circle cx="80" cy="30" r="1.2" fill="#ffffff" />
              </g>
            ) : (avatarId === 'a_monk' || avatarId === 'a_zen' || avatarId === 'a_chibi_zen') ? (
              /* 5. ZEN MONK & CHIBI MONK: Serene Ascetic Head & Meditation Closed Eyes */
              <g>
                {/* Smooth Shaved Head with warm calm gradient */}
                <path d="M64 76 C64 42 78 30 100 30 C122 30 136 42 136 76 C136 106 122 116 100 116 C78 116 64 106 64 76 Z" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="2" />
                {/* Closed Eyes of Deep Mindfulness */}
                <path d="M80 74 Q87 80 94 74" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M106 74 Q113 80 120 74" stroke="#44403c" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                {/* Serene Smile */}
                <path d="M94 92 Q100 96 106 92" stroke="#44403c" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Mala Beads on Collar */}
                <circle cx="80" cy="118" r="4" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                <circle cx="90" cy="122" r="4" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                <circle cx="100" cy="124" r="5" fill="#d97706" stroke="#78350f" strokeWidth="1" />
                <circle cx="110" cy="122" r="4" fill="#78350f" stroke="#451a03" strokeWidth="1" />
                <circle cx="120" cy="118" r="4" fill="#78350f" stroke="#451a03" strokeWidth="1" />
              </g>
            ) : avatarId === 'a_neko_cyber' ? (
              /* CYBER-CAT: Robotic Feline Helmet with Holographic Ears */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                {/* Cyber Cat Ears */}
                <polygon points="66,42 54,12 80,28" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <polygon points="68,38 60,18 76,28" fill="#38bdf8" opacity="0.6" />
                <polygon points="134,42 146,12 120,28" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                <polygon points="132,38 140,18 124,28" fill="#38bdf8" opacity="0.6" />
                {/* Scanner Visor */}
                <path d="M72 68 L128 68 L122 84 L78 84 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="76" y1="76" x2="124" y2="76" stroke="#e0f2fe" strokeWidth="2" />
                <path d="M96 94 Q100 98 104 94" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>
            ) : avatarId === 'a_ninja' ? (
              /* 6. SHINOBI / NINJA: Tactical Hood & Half Mask */
              <g>
                <path d="M60 76 C60 40 76 26 100 26 C124 26 140 40 140 76 C140 108 122 118 100 118 C78 118 60 108 60 76 Z" fill="#09090b" stroke="#27272a" strokeWidth="2.5" />
                {/* Shinobi Face Plate / Mask */}
                <path d="M68 76 L132 76 L124 108 L76 108 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
                {/* Intense Stealth Eyes */}
                <path d="M78 68 L94 72 L92 76 L78 72 Z" fill="#ffffff" />
                <circle cx="88" cy="72" r="2.5" fill="#dc2626" />
                <path d="M122 68 L106 72 L108 76 L122 72 Z" fill="#ffffff" />
                <circle cx="112" cy="72" r="2.5" fill="#dc2626" />
                <path d="M60 52 C80 48 120 48 140 52" stroke="#dc2626" strokeWidth="3" fill="none" />
              </g>
            ) : avatarId === 'a_bot' ? (
              /* 7. OMEGA DROID: Titanium Chassis & Horizontal Optical Sensor Bar */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="url(#titaniumHead)" stroke="#64748b" strokeWidth="2.5" />
                {/* Antenna Ear Nods */}
                <rect x="54" y="65" width="8" height="22" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                <rect x="138" y="65" width="8" height="22" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                {/* Sleek Horizontal Visor Band */}
                <rect x="68" y="66" width="64" height="14" rx="7" fill="#020617" stroke="#38bdf8" strokeWidth="1.5" />
                <motion.rect
                  animate={{ x: [0, 42, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  x="72"
                  y="70"
                  width="16"
                  height="6"
                  rx="3"
                  fill="#38bdf8"
                />
              </g>
            ) : avatarId === 'a_sophia' ? (
              /* 8. SOPHIA: Serene Goddess with Golden Forehead Circlet & Soft Gaze */
              <g>
                {/* Flowing Hair Backing */}
                <path d="M54 75 C52 35 74 20 100 20 C126 20 148 35 146 75 C146 125 138 140 134 145 C130 115 136 100 136 75 Z" fill="#334155" />
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#fafaf9" stroke="#e7e5e4" strokeWidth="2" />
                {/* Golden Circlet with Pearl */}
                <path d="M66 50 C80 44 120 44 134 50" stroke="#d4af37" strokeWidth="2.5" fill="none" />
                <circle cx="100" cy="46" r="3.5" fill="#fef08a" stroke="#d4af37" strokeWidth="1" />
                {/* Calm Luminous Eyes */}
                <ellipse cx="87" cy="72" rx="6" ry="4.5" fill="#ffffff" />
                <circle cx="87" cy="72" r="2.5" fill="#d97706" />
                <ellipse cx="113" cy="72" rx="6" ry="4.5" fill="#ffffff" />
                <circle cx="113" cy="72" r="2.5" fill="#d97706" />
                <path d="M95 91 Q100 94 105 91" stroke="#a8a29e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>
            ) : avatarId === 'a_nature_spirit' ? (
              /* 9. ESPÍRITU DEL BOSQUE: Laurel Leaf Wreath & Emerald Forest Gaze */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
                {/* Emerald Laurel Leaves Crown */}
                <path d="M58 48 C70 38 88 36 98 42" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M102 42 C112 36 130 38 142 48" stroke="#059669" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <ellipse cx="76" cy="40" rx="4" ry="7" transform="rotate(-30 76 40)" fill="#10b981" />
                <ellipse cx="90" cy="38" rx="4" ry="7" transform="rotate(-15 90 38)" fill="#059669" />
                <ellipse cx="110" cy="38" rx="4" ry="7" transform="rotate(15 110 38)" fill="#059669" />
                <ellipse cx="124" cy="40" rx="4" ry="7" transform="rotate(30 124 40)" fill="#10b981" />
                {/* Luminous Calm Forest Eyes */}
                <ellipse cx="87" cy="72" rx="5.5" ry="4.5" fill="#ffffff" />
                <circle cx="87" cy="72" r="2.5" fill="#047857" />
                <ellipse cx="113" cy="72" rx="5.5" ry="4.5" fill="#ffffff" />
                <circle cx="113" cy="72" r="2.5" fill="#047857" />
                <path d="M95 91 Q100 94 105 91" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>
            ) : avatarId === 'a_architect' ? (
              /* 10. ARQUITECTO: Neoclassical Geometry & Drafting Spectacle */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
                {/* Architect Crisp Coiffure */}
                <path d="M62 60 C64 35 78 24 100 24 C122 24 136 35 138 60 C130 45 116 42 100 42 C84 42 70 45 62 60 Z" fill="#334155" />
                {/* Thin Golden Architect Wire Frame Glasses */}
                <rect x="76" y="66" width="20" height="14" rx="3" fill="rgba(255,255,255,0.3)" stroke="#b45309" strokeWidth="1.5" />
                <rect x="104" y="66" width="20" height="14" rx="3" fill="rgba(255,255,255,0.3)" stroke="#b45309" strokeWidth="1.5" />
                <line x1="96" y1="73" x2="104" y2="73" stroke="#b45309" strokeWidth="1.5" />
                {/* Focused Analytical Eyes */}
                <circle cx="86" cy="73" r="2.5" fill="#1e293b" />
                <circle cx="114" cy="73" r="2.5" fill="#1e293b" />
                <path d="M96 92 Q100 94 104 92" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>
            ) : avatarId === 'a_cyberdoc' ? (
              /* 11. NEURO-ARQUITECTO: Titanium & Sapphire Optic Scanner */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="url(#titaniumHead)" stroke="#475569" strokeWidth="2" />
                {/* Sleek Minimalist Neuro-Visor */}
                <path d="M66 67 L134 67 L126 77 L74 77 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
                <line x1="72" y1="72" x2="128" y2="72" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 4" />
                <circle cx="100" cy="72" r="3" fill="#ffffff" />
              </g>
            ) : avatarId === 'a_vento' ? (
              /* 12. VENTO: Origami Wind Dragon Horns & Celestial Whiskers */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#f0fdfa" stroke="#0d9488" strokeWidth="2" />
                {/* Celestial Origami Horns */}
                <path d="M78 30 L64 6 L76 18 L86 28 Z" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1.5" />
                <path d="M122 30 L136 6 L124 18 L114 28 Z" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1.5" />
                {/* Wind Whisker Runes */}
                <path d="M66 78 Q74 84 80 80" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M134 78 Q126 84 120 80" stroke="#0d9488" strokeWidth="2" strokeLinecap="round" fill="none" />
                {/* Sky-Blue Eyes */}
                <ellipse cx="87" cy="72" rx="5.5" ry="4.5" fill="#ffffff" />
                <circle cx="87" cy="72" r="2.5" fill="#0284c7" />
                <ellipse cx="113" cy="72" rx="5.5" ry="4.5" fill="#ffffff" />
                <circle cx="113" cy="72" r="2.5" fill="#0284c7" />
                <path d="M96 92 Q100 95 104 92" stroke="#0f766e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>
            ) : avatarId === 'a_crono' ? (
              /* 13. CRONO: Chronological Clock Ring & Amber Hourglass Visor */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#1c1917" stroke="#d97706" strokeWidth="2" />
                {/* Clock Arc Halo */}
                <circle cx="100" cy="73" r="46" stroke="#b45309" strokeWidth="2" strokeDasharray="6 8" fill="none" opacity="0.6" />
                {/* Amber Visor with Chrono Dial */}
                <rect x="70" y="65" width="60" height="18" rx="9" fill="#292524" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="87" cy="74" r="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                <circle cx="113" cy="74" r="5" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
                <line x1="87" y1="74" x2="87" y2="71" stroke="#b45309" strokeWidth="1.5" />
                <line x1="113" y1="74" x2="115" y2="74" stroke="#b45309" strokeWidth="1.5" />
              </g>
            ) : avatarId === 'a_icaro' ? (
              /* 14. ICARO: Rising Solar Feather Crest & Fire Eyes */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                {/* Fiery Solar Plume Crest */}
                <path d="M100 26 L100 2 C94 12 88 18 84 26 Z" fill="#f59e0b" stroke="#ef4444" strokeWidth="1" />
                <path d="M100 26 L100 2 C106 12 112 18 116 26 Z" fill="#f59e0b" stroke="#ef4444" strokeWidth="1" />
                <path d="M100 24 L100 8 L96 16 Z" fill="#fee2e2" />
                {/* Sun Golden Mask */}
                <path d="M72 68 L100 82 L128 68 L100 62 Z" fill="#7f1d1d" stroke="#f59e0b" strokeWidth="1.5" />
                {/* Fire Amber Eyes */}
                <circle cx="88" cy="72" r="3.5" fill="#fef08a" stroke="#dc2626" strokeWidth="1" />
                <circle cx="112" cy="72" r="3.5" fill="#fef08a" stroke="#dc2626" strokeWidth="1" />
              </g>
            ) : avatarId === 'a_atlas' ? (
              /* 15. ATLAS: Carved Granite Titan & Glowing Turquoise Runes */
              <g>
                {/* Carved Granite Head with Angular Jaw */}
                <path d="M60 74 C60 40 76 26 100 26 C124 26 140 40 140 74 L136 112 L100 122 L64 112 Z" fill="#27272a" stroke="#52525b" strokeWidth="2.5" />
                {/* Stone Crown Plate */}
                <path d="M66 48 L100 40 L134 48 L126 56 L100 50 L74 56 Z" fill="#3f3f46" stroke="#71717a" strokeWidth="1" />
                {/* Glowing Turquoise Runic Eyes */}
                <rect x="80" y="70" width="14" height="6" rx="3" fill="#22d3ee" stroke="#0891b2" strokeWidth="1" />
                <rect x="106" y="70" width="14" height="6" rx="3" fill="#22d3ee" stroke="#0891b2" strokeWidth="1" />
                {/* Temple Runes */}
                <line x1="68" y1="65" x2="68" y2="85" stroke="#22d3ee" strokeWidth="1.5" />
                <line x1="132" y1="65" x2="132" y2="85" stroke="#22d3ee" strokeWidth="1.5" />
              </g>
            ) : avatarId === 'a_crown' ? (
              /* 16. CROWN: Royal Imperial Sovereign with Velvet & Ruby Diadem */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#fafaf9" stroke="#d4af37" strokeWidth="2" />
                {/* Imperial Golden Crown */}
                <path d="M68 34 L72 10 L84 22 L100 6 L116 22 L128 10 L132 34 Z" fill="#eab308" stroke="#a16207" strokeWidth="1.5" />
                {/* Crown Velvet Cap */}
                <path d="M76 34 Q100 20 124 34 Z" fill="#881337" />
                {/* Central Ruby Gem */}
                <polygon points="100,18 104,24 100,30 96,24" fill="#f43f5e" stroke="#be123c" strokeWidth="1" />
                {/* Regard Regal Eyes */}
                <ellipse cx="87" cy="72" rx="5.5" ry="4" fill="#ffffff" />
                <circle cx="87" cy="72" r="2.5" fill="#854d0e" />
                <ellipse cx="113" cy="72" rx="5.5" ry="4" fill="#ffffff" />
                <circle cx="113" cy="72" r="2.5" fill="#854d0e" />
                <path d="M95 91 Q100 94 105 91" stroke="#a16207" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>
            ) : avatarId === 'a_hacker' ? (
              /* 17. HACKER: Cyber Dark Hood & Matrix Glitch HUD */
              <g>
                <path d="M58 78 C58 38 76 24 100 24 C124 24 142 38 142 78 C142 114 124 120 100 120 C76 120 58 114 58 78 Z" fill="#09090b" stroke="#22c55e" strokeWidth="2" />
                {/* Matrix HUD Visor */}
                <rect x="68" y="66" width="64" height="16" rx="4" fill="#052e16" stroke="#4ade80" strokeWidth="1.5" />
                <text x="74" y="78" fill="#4ade80" fontSize="9" fontFamily="monospace" fontWeight="bold">0101::RUN</text>
              </g>
            ) : avatarId === 'a_brain' ? (
              /* 18. BRAIN: Translucent Neural Dome with Constellation Synapses */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#2e1065" stroke="#a855f7" strokeWidth="2" />
                {/* Neural Synapse Constellation Nodes */}
                <circle cx="82" cy="45" r="3" fill="#c084fc" />
                <circle cx="100" cy="38" r="3.5" fill="#e879f9" />
                <circle cx="118" cy="45" r="3" fill="#c084fc" />
                <line x1="82" y1="45" x2="100" y2="38" stroke="#a855f7" strokeWidth="1.5" />
                <line x1="100" y1="38" x2="118" y2="45" stroke="#a855f7" strokeWidth="1.5" />
                {/* Cosmic Luminous Eyes */}
                <ellipse cx="87" cy="72" rx="6" ry="5" fill="#f5d0fe" />
                <circle cx="87" cy="72" r="3" fill="#6b21a8" />
                <ellipse cx="113" cy="72" rx="6" ry="5" fill="#f5d0fe" />
                <circle cx="113" cy="72" r="3" fill="#6b21a8" />
              </g>
            ) : avatarId === 'a_flame' ? (
              /* 19. FLAME: Living Fire Crest & Ember Eyes */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#7c2d12" stroke="#ea580c" strokeWidth="2" />
                {/* Rising Flame Crest */}
                <path d="M100 28 Q88 10 94 2 Q102 12 100 28 Z" fill="#fb923c" />
                <path d="M100 28 Q112 10 106 2 Q98 12 100 28 Z" fill="#f97316" />
                <path d="M100 24 Q100 12 100 6 Z" stroke="#fef08a" strokeWidth="2" />
                {/* Ember Glowing Eyes */}
                <ellipse cx="87" cy="72" rx="6" ry="4" fill="#fef08a" />
                <circle cx="87" cy="72" r="2.5" fill="#9a3412" />
                <ellipse cx="113" cy="72" rx="6" ry="4" fill="#fef08a" />
                <circle cx="113" cy="72" r="2.5" fill="#9a3412" />
              </g>
            ) : avatarId === 'a_void' ? (
              /* 20. VOID: Deep Cosmic Silhouette & Singularity Ring */
              <g>
                <path d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z" fill="#030712" stroke="#6366f1" strokeWidth="2" />
                {/* Singularity Ring */}
                <ellipse cx="100" cy="73" rx="36" ry="8" stroke="#818cf8" strokeWidth="1.5" fill="none" transform="rotate(-15 100 73)" />
                {/* Violet Core Star */}
                <circle cx="100" cy="73" r="4" fill="#c7d2fe" />
              </g>
            ) : (
              /* DEFAULT / MINIMALIST SCHOLAR (a_base, etc.) */
              <g>
                {/* Head (Stylized Smooth Geometric Oval with 3D Shader) */}
                <path
                  d="M62 76 C62 42 78 28 100 28 C122 28 138 42 138 76 C138 108 122 118 100 118 C78 118 62 108 62 76 Z"
                  fill="url(#headGrad)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="2.5"
                />

                {/* Sleek Hair Cut Fade */}
                <path
                  d="M62 65 C62 38 78 26 100 26 C122 26 138 38 138 65 C132 50 116 46 100 46 C84 46 68 50 62 65 Z"
                  fill="#1e293b"
                />

                {/* Visor / Eye Region */}
                <path
                  d="M70 68 C70 62 82 58 100 58 C118 58 130 62 130 68 C130 84 118 90 100 90 C82 90 70 84 70 68 Z"
                  fill="url(#visorGrad)"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                />

                {/* Expressive Eyes */}
                {!isBlinking ? (
                  <g>
                    {/* Left Eye */}
                    <ellipse
                      cx="87"
                      cy="72"
                      rx="6"
                      ry={expression === 'fierce' ? "4" : "6"}
                      fill="#ffffff"
                    />
                    <circle cx="88" cy="71" r="2.5" fill={accessoryId === 'acc_holo_visor' ? '#38bdf8' : '#0f172a'} />

                    {/* Right Eye */}
                    <ellipse
                      cx="113"
                      cy="72"
                      rx="6"
                      ry={expression === 'fierce' ? "4" : "6"}
                      fill="#ffffff"
                    />
                    <circle cx="114" cy="71" r="2.5" fill={accessoryId === 'acc_holo_visor' ? '#38bdf8' : '#0f172a'} />
                  </g>
                ) : (
                  /* Blinking line state */
                  <g stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="82" y1="73" x2="92" y2="73" />
                    <line x1="108" y1="73" x2="118" y2="73" />
                  </g>
                )}

                {/* Volumetric Specular Glint on Visor */}
                <path
                  d="M74 65 C85 62 105 62 116 64"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              </g>
            )}

            {/* ----------------- ACCESSORIES OVERLAY ----------------- */}

            {/* Classic Fine Wireframe Glasses */}
            {accessoryId === 'acc_glasses_classic' && (
              <g stroke="#d4af37" strokeWidth="1.8" fill="none">
                <circle cx="87" cy="72" r="9" fill="rgba(255,255,255,0.2)" />
                <circle cx="113" cy="72" r="9" fill="rgba(255,255,255,0.2)" />
                <line x1="96" y1="72" x2="104" y2="72" />
                <path d="M78 72 L64 68" />
                <path d="M122 72 L136 68" />
              </g>
            )}

            {/* Vintage Precision Monocle */}
            {accessoryId === 'acc_monocle' && (
              <g stroke="#d4af37" strokeWidth="2" fill="none">
                <circle cx="113" cy="72" r="10" fill="rgba(255,255,255,0.25)" />
                <circle cx="113" cy="72" r="12" strokeDasharray="3 2" />
                <path d="M123 76 C128 88 132 104 135 120" stroke="#d4af37" strokeWidth="1" />
              </g>
            )}

            {/* Cyber Headphones */}
            {accessoryId === 'acc_cyber_headphones' && (
              <g>
                <path d="M58 70 C58 35 142 35 142 70" stroke="#64748b" strokeWidth="5" fill="none" />
                <rect x="54" y="60" width="10" height="24" rx="4" fill="#334155" stroke="#ffffff" strokeWidth="1" />
                <rect x="136" y="60" width="10" height="24" rx="4" fill="#334155" stroke="#ffffff" strokeWidth="1" />
              </g>
            )}
          </svg>
        </motion.div>
      </div>

      {/* Interactive Micro-hint on hover */}
      {interactive && (
        <span className="text-[10px] font-mono text-zinc-500 tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <MessageCircle size={10} /> Toca para interactuar
        </span>
      )}
    </div>
  );
};

export const FocuslyAvatar3D = memo(FocuslyAvatar3DComponent);
export default FocuslyAvatar3D;

