import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';

// --- UTILIDADES DE PARALLAX Y MOUSE DINÁMICO (OPTIMIZADO CON RAF Y THROTTLE DE 30FPS) ---
const useParallaxMouse = (isDesktop = false) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDesktop) return;

    let rafId = null;
    let latestPos = { x: 0, y: 0 };
    let lastUpdateTime = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      latestPos = {
        x: ((e.clientX / innerWidth) - 0.5) * 2,
        y: ((e.clientY / innerHeight) - 0.5) * 2
      };

      if (!rafId) {
        rafId = requestAnimationFrame((timestamp) => {
          if (timestamp - lastUpdateTime >= 33) {
            setMousePos(prev => {
              if (Math.abs(prev.x - latestPos.x) < 0.05 && Math.abs(prev.y - latestPos.y) < 0.05) {
                rafId = null;
                return prev;
              }
              lastUpdateTime = timestamp;
              rafId = null;
              return latestPos;
            });
          } else {
            rafId = null;
          }
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktop]);

  return mousePos;
};

// =========================================================================
// 1. EL VACÍO (bg_default) - DIMENSIÓN DEL VACÍO Y MONOLITO SAGRADO
// =========================================================================
export const VoidTheme = ({ isDesktop, mousePos }) => {
  const dustParticles = useMemo(() => Array.from({ length: isDesktop ? 35 : 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 5
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#030303]">
      {/* Dynamic Deep Dark Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(18,18,22,0.4)_0%,rgba(2,2,3,0.95)_100%)] z-1" />

      {/* Singularity Core Pulse */}
      <motion.div
        animate={{
          scale: [0.95, 1.12, 0.95],
          opacity: [0.12, 0.28, 0.12]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: isDesktop ? `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)` : 'none'
        }}
        className="absolute inset-0 m-auto w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,rgba(120,120,150,0.02)_50%,transparent_70%)] blur-[40px] z-1"
      />

      {/* 3D Sacred Geometry Gyroscope Rings */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-2 opacity-25"
        style={{
          transform: isDesktop ? `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px)` : 'none'
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-white/20 border-dashed relative flex items-center justify-center"
        >
          {/* Node Orbiting Vertices */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />

          {/* Inner Tilted Ring */}
          <motion.div
            animate={{ rotate: -360, rotateX: [0, 45, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="w-[75%] h-[75%] rounded-full border border-white/15 relative flex items-center justify-center"
          >
            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_6px_white]" />
            <div className="w-[50%] h-[50%] rounded-full border border-white/10 border-dotted" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Minimalist Coordinate Glyphs */}
      <div className="absolute inset-0 z-2 opacity-20 font-mono text-[9px] tracking-widest text-white/50 select-none">
        <motion.div 
          animate={{ y: [-5, 5, -5] }} 
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-[18%] left-[8%]"
        >
          [ 00:01:VOID ]
        </motion.div>
        <motion.div 
          animate={{ y: [5, -5, 5] }} 
          transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[22%] right-[10%]"
        >
          [ FOCUS_DEPTH // ∞ ]
        </motion.div>
        <div className="absolute top-[30%] right-[12%] text-xs font-light text-white/30">⬡</div>
        <div className="absolute bottom-[35%] left-[12%] text-xs font-light text-white/30">◈</div>
      </div>

      {/* Drifting Quantum Stardust */}
      {dustParticles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: `${p.y}vh`, x: `${p.x}vw`, opacity: 0 }}
          animate={{
            y: [`${p.y}vh`, `${(p.y + 15) % 100}vh`],
            opacity: [0.1, 0.7, 0.1],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          className="absolute rounded-full bg-white shadow-[0_0_4px_white] z-2"
          style={{ width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 2. MATRIZ CYBER (bg_grid) - HIGH-TECH CYBERPUNK SYNTHWAVE
// =========================================================================
export const CyberGridTheme = ({ isDesktop, mousePos }) => {
  const codeStreams = useMemo(() => Array.from({ length: isDesktop ? 24 : 12 }, (_, i) => ({
    id: i,
    left: (i * (100 / (isDesktop ? 24 : 12))) + (Math.random() * 2 - 1),
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 4,
    height: Math.random() * 80 + 60,
    color: i % 3 === 0 ? '#38bdf8' : i % 3 === 1 ? '#3b82f6' : '#22d3ee'
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#00050d]">
      {/* Ambient Horizon Atmosphere */}
      <div className="absolute top-[35%] left-0 right-0 h-[30vh] bg-gradient-to-b from-blue-600/15 via-cyan-500/5 to-transparent blur-[50px] z-1" />

      {/* Perspective Wireframe Ground Grid */}
      <div 
        className="absolute bottom-0 left-[-40%] right-[-40%] h-[55vh] z-2 overflow-hidden origin-top"
        style={{
          perspective: '500px',
          transform: isDesktop ? `rotateX(68deg) translateY(${mousePos.y * 10}px)` : 'rotateX(68deg)'
        }}
      >
        <motion.div
          animate={{ backgroundPositionY: ['0px', '48px'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          className="w-full h-full opacity-35 bg-[linear-gradient(rgba(56,189,248,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.35)_1px,transparent_1px)] bg-[size:32px_32px]"
        />
      </div>

      {/* Cyber Horizon Laser Scanner Line */}
      <motion.div
        animate={{ y: ['-5%', '105%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1.5px] bg-cyan-400/80 shadow-[0_0_16px_#38bdf8,0_0_30px_#38bdf8] z-5"
      />

      {/* Equalizer Frequency Bars along Horizon */}
      <div className="absolute top-[42%] left-0 right-0 flex items-end justify-center gap-1.5 h-14 z-2 opacity-30 px-6">
        {Array.from({ length: isDesktop ? 36 : 18 }).map((_, i) => (
          <motion.div
            key={`eq-${i}`}
            animate={{
              height: [`${Math.random() * 20 + 8}px`, `${Math.random() * 45 + 15}px`, `${Math.random() * 20 + 8}px`]
            }}
            transition={{
              duration: Math.random() * 0.8 + 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
            className="w-1 rounded-t-sm bg-gradient-to-t from-cyan-500 via-blue-500 to-white"
          />
        ))}
      </div>

      {/* Floating 3D Holographic Isometric Data Cubes */}
      <div className="absolute inset-0 z-3 pointer-events-none">
        <motion.div
          animate={{ 
            y: [-12, 12, -12], 
            rotateX: [0, 180, 360], 
            rotateY: [0, 360, 720] 
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{
            transform: isDesktop ? `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` : 'none'
          }}
          className="absolute top-[20%] left-[10%] w-14 h-14 border border-cyan-400/40 rounded-lg bg-cyan-500/5 shadow-[0_0_15px_rgba(56,189,248,0.2)] flex items-center justify-center backdrop-blur-[1px]"
        >
          <div className="w-6 h-6 border border-white/40 rounded rotate-45" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [10, -10, 10], 
            rotateX: [360, 180, 0], 
            rotateY: [720, 360, 0] 
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{
            transform: isDesktop ? `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` : 'none'
          }}
          className="absolute top-[35%] right-[8%] w-16 h-16 border border-blue-400/40 rounded-lg bg-blue-500/5 shadow-[0_0_20px_rgba(59,130,246,0.2)] flex items-center justify-center backdrop-blur-[1px]"
        >
          <div className="w-7 h-7 border border-cyan-300/40 rounded-full" />
        </motion.div>
      </div>

      {/* Cascading Digital Rain Streams */}
      {codeStreams.map((s) => (
        <motion.div
          key={s.id}
          initial={{ y: '-25vh', opacity: 0 }}
          animate={{
            y: '125vh',
            opacity: [0, 0.85, 0.85, 0]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "linear",
            delay: s.delay
          }}
          className="absolute w-[1.5px] z-3 pointer-events-none flex flex-col items-center"
          style={{
            left: `${s.left}%`,
            height: `${s.height}px`
          }}
        >
          {/* Glowing Head */}
          <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#ffffff] mb-1" />
          {/* Gradient Stream Tail */}
          <div 
            className="w-full flex-1"
            style={{
              background: `linear-gradient(to bottom, #ffffff, ${s.color}, transparent)`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// =========================================================================
// 3. JARDÍN ZEN (bg_zen) - SANTUARIO NATURAL CON PETALOS SAKURA Y AGUA
// =========================================================================
export const ZenTheme = ({ isDesktop, mousePos }) => {
  const petals = useMemo(() => Array.from({ length: isDesktop ? 28 : 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    duration: Math.random() * 10 + 9,
    delay: Math.random() * 7,
    size: Math.random() * 10 + 8,
    isLeaf: i % 2 === 0
  })), [isDesktop]);

  const fireflies = useMemo(() => Array.from({ length: isDesktop ? 22 : 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 90 + 5,
    top: Math.random() * 70 + 15,
    duration: Math.random() * 7 + 6,
    delay: Math.random() * 5
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#010c06]">
      {/* Peaceful Forest Ambient Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#01140a] via-[#010905] to-[#000000] z-0" />
      <motion.div
        animate={{ opacity: [0.15, 0.28, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.18)_0%,transparent_65%)] z-1"
      />

      {/* Floating Ethereal Fog Ribbons */}
      <motion.div
        animate={{ x: ['-20%', '20%', '-20%'], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[-20%] w-[140%] h-[35vh] bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent blur-[50px] z-1"
      />

      {/* Concentric Calm Water Ripples */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`zen-ripple-${i}`}
          className="absolute z-2"
          style={{
            left: `${18 + i * 22}%`,
            top: `${30 + (i % 2) * 35}%`
          }}
        >
          <motion.div
            animate={{
              scale: [0, 4.5],
              opacity: [0, 0.35, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.8
            }}
            className="w-12 h-12 rounded-full border border-emerald-400/35 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.15)]"
          >
            <div className="w-[50%] h-[50%] rounded-full border border-emerald-300/20" />
          </motion.div>
        </div>
      ))}

      {/* 3D Falling Cherry Blossom Petals & Bamboo Leaves */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            y: '-10vh',
            x: `${p.x}vw`,
            rotateZ: 0,
            rotateY: 0,
            opacity: 0
          }}
          animate={{
            y: '110vh',
            x: [`${p.x}vw`, `${p.x + (p.isLeaf ? 15 : -15)}vw`, `${p.x}vw`],
            rotateZ: [0, 360, 720],
            rotateY: [0, 180, 360],
            opacity: [0, 0.75, 0.75, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay
          }}
          className="absolute z-3 pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size * (p.isLeaf ? 0.45 : 0.75)}px`,
            borderRadius: p.isLeaf ? '14px 2px 14px 2px' : '50% 50% 50% 0',
            backgroundColor: p.isLeaf ? 'rgba(52, 211, 153, 0.25)' : 'rgba(251, 182, 206, 0.4)',
            border: p.isLeaf ? '1px solid rgba(110, 231, 183, 0.35)' : '1px solid rgba(253, 232, 240, 0.45)',
            boxShadow: p.isLeaf ? '0 0 8px rgba(16, 185, 129, 0.2)' : '0 0 10px rgba(244, 114, 182, 0.25)'
          }}
        />
      ))}

      {/* Glowing Bioluminescent Fireflies */}
      {fireflies.map((f) => (
        <motion.div
          key={f.id}
          animate={{
            y: ['0px', '-25px', '15px', '0px'],
            x: ['0px', '20px', '-18px', '0px'],
            scale: [0.7, 1.35, 0.7],
            opacity: [0.1, 0.95, 0.1]
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: f.delay
          }}
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            transform: isDesktop ? `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` : 'none'
          }}
          className="absolute w-2.5 h-2.5 rounded-full bg-emerald-300 shadow-[0_0_12px_#34d399,0_0_22px_#10b981] z-4"
        />
      ))}
    </div>
  );
};

// =========================================================================
// 4. ABISMO OCEÁNICO (bg_ocean) - FAUNA BIOLUMINISCENTE Y PROFUNDIDADES
// =========================================================================
export const OceanTheme = ({ isDesktop, mousePos }) => {
  const bubbles = useMemo(() => Array.from({ length: isDesktop ? 36 : 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 18 + 5,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 6
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#000814]">
      {/* Ocean Depth Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001026] via-[#000814] to-[#000206] z-0" />

      {/* Shimmering Sun Caustics Penetrating Surface */}
      <motion.div
        animate={{ rotate: [-3, 3, -3], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-[-20%] w-[140%] h-[60vh] bg-gradient-to-b from-cyan-400/20 via-cyan-500/5 to-transparent blur-[50px] transform -skew-x-12 z-1"
      />
      <motion.div
        animate={{ rotate: [3, -3, 3], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-0 left-[25%] w-[55%] h-[75vh] bg-gradient-to-b from-blue-400/15 to-transparent blur-[60px] transform rotate-12 z-1"
      />

      {/* Majestic Bioluminescent Jellyfish Floating Upwards */}
      <motion.div
        initial={{ y: '110vh', x: '18vw' }}
        animate={{
          y: '-25vh',
          x: ['18vw', '22vw', '18vw']
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
        style={{
          transform: isDesktop ? `translate(${mousePos.x * 20}px, 0)` : 'none'
        }}
        className="absolute w-20 h-32 z-2 flex flex-col items-center pointer-events-none"
      >
        {/* Jellyfish Bell with breathing contraction */}
        <motion.div
          animate={{
            scaleY: [1, 0.75, 1],
            scaleX: [0.9, 1.1, 0.9]
          }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-12 rounded-t-full bg-gradient-to-b from-cyan-300/40 via-cyan-400/20 to-transparent border border-cyan-300/50 shadow-[0_0_20px_rgba(34,211,238,0.4)] relative flex items-center justify-center"
        >
          <div className="w-8 h-6 rounded-t-full bg-cyan-200/30 blur-[2px]" />
        </motion.div>
        {/* Flowing Tentacles */}
        <div className="flex gap-2 -mt-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={`tentacle-${i}`}
              animate={{
                rotateZ: [i % 2 === 0 ? -12 : 12, i % 2 === 0 ? 12 : -12],
                scaleY: [0.9, 1.15, 0.9]
              }}
              transition={{ duration: 2.8 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1.5px] h-20 bg-gradient-to-b from-cyan-300/60 to-transparent shadow-[0_0_8px_#22d3ee]"
            />
          ))}
        </div>
      </motion.div>

      {/* Majestic Giant Manta Ray Silhouette */}
      <motion.div
        initial={{ x: '-30vw', y: '32vh', opacity: 0 }}
        animate={{
          x: '130vw',
          y: ['30vh', '38vh', '30vh'],
          opacity: [0, 0.3, 0.3, 0]
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "linear",
          delay: 4
        }}
        className="absolute w-32 h-14 bg-cyan-400/10 blur-[1px] z-2 flex items-center justify-center pointer-events-none"
        style={{ clipPath: 'polygon(0% 50%, 35% 0%, 50% 10%, 100% 50%, 50% 90%, 35% 100%)' }}
      >
        <motion.div
          animate={{ scaleY: [1, 0.45, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full bg-cyan-300/15"
        />
      </motion.div>

      {/* School of Bioluminescent Deep-Sea Fish */}
      {Array.from({ length: isDesktop ? 6 : 3 }).map((_, i) => (
        <motion.div
          key={`ocean-fish-${i}`}
          initial={{ x: '120vw', y: `${45 + i * 8}vh`, opacity: 0 }}
          animate={{
            x: '-30vw',
            y: [`${45 + i * 8}vh`, `${42 + i * 8}vh`, `${45 + i * 8}vh`],
            opacity: [0, 0.35, 0.35, 0]
          }}
          transition={{
            duration: 16 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3
          }}
          className="absolute w-7 h-3 bg-cyan-300/30 blur-[0.5px] shadow-[0_0_8px_cyan] z-2"
          style={{ clipPath: 'polygon(0% 50%, 70% 0%, 100% 50%, 70% 100%)' }}
        />
      ))}

      {/* Wobbling Deep-Sea Rising Bubbles */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '110vh', x: 0, opacity: 0 }}
          animate={{
            y: '-10vh',
            x: [0, Math.sin(b.id) * 35, 0],
            opacity: [0, 0.65, 0],
            scale: [0.8, 1.15, 0.8]
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "linear",
            delay: b.delay
          }}
          className="absolute rounded-full border border-cyan-300/50 bg-cyan-200/10 backdrop-blur-[0.5px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_0_8px_rgba(34,211,238,0.2)] z-3"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 5. NEBULOSA CÓSMICA (bg_nebula) - POLVO ESTELAR, PULSARES Y COMETAS
// =========================================================================
export const NebulaTheme = ({ isDesktop, mousePos }) => {
  const stars = useMemo(() => Array.from({ length: isDesktop ? 60 : 30 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 3
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#04010a]">
      {/* Dual Interstellar Swirling Gas Clouds */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25]
        }}
        transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
        style={{
          transform: isDesktop ? `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` : 'none'
        }}
        className="absolute -top-[30%] -left-[30%] w-[160%] h-[160%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25)_0%,rgba(236,72,153,0.08)_40%,transparent_65%)] mix-blend-screen z-1"
      />

      <motion.div
        animate={{
          rotate: -360,
          scale: [1.15, 1, 1.15],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        style={{
          transform: isDesktop ? `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` : 'none'
        }}
        className="absolute -bottom-[30%] -right-[30%] w-[160%] h-[160%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.22)_0%,rgba(139,92,246,0.08)_40%,transparent_65%)] mix-blend-screen z-1"
      />

      {/* Central Pulsar Core */}
      <div className="absolute inset-0 flex items-center justify-center z-2 pointer-events-none">
        <motion.div
          animate={{
            scale: [0.85, 1.25, 0.85],
            opacity: [0.25, 0.65, 0.25]
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-36 h-36 rounded-full bg-gradient-to-tr from-purple-500/20 via-cyan-400/25 to-white/30 blur-[25px]"
        />
      </div>

      {/* Geometric Constellation Map Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-20 z-2">
        <motion.path
          d="M 60,180 L 140,110 L 260,160 L 360,90 L 440,140"
          stroke="#c084fc"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          fill="none"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 120,450 L 200,530 L 340,480 L 390,580 L 510,510"
          stroke="#38bdf8"
          strokeWidth="0.8"
          strokeDasharray="4 2"
          fill="none"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </svg>

      {/* Hypersonic Shooting Stars / Comets */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`comet-${i}`}
          initial={{ x: '-15vw', y: `${15 + i * 25}vh`, opacity: 0 }}
          animate={{
            x: '115vw',
            y: `${30 + i * 25}vh`,
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 6 + 1.5
          }}
          className="absolute w-36 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-white blur-[0.5px] transform rotate-[18deg] shadow-[0_0_12px_#ffffff] z-4"
        />
      ))}

      {/* Twinkling Star Field */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          animate={{
            opacity: [0.15, 0.95, 0.15],
            scale: [0.8, 1.4, 0.8]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay
          }}
          className="absolute rounded-full bg-white shadow-[0_0_6px_white] z-2"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 6. FOSO INFERNAL (bg_inferno) - FORJA VOLCÁNICA Y LLAMAS VECTORIALES
// =========================================================================
export const InfernoTheme = ({ isDesktop, mousePos }) => {
  const embers = useMemo(() => Array.from({ length: isDesktop ? 45 : 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 4 + 2.5,
    delay: Math.random() * 3.5
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#120000]">
      {/* Volcanic Magma Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#260000] via-[#140000] to-[#040000] z-0" />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.35)_0%,rgba(249,115,22,0.1)_45%,transparent_70%)] z-1"
      />

      {/* 4-Tier SVG Turbulent Animated Flame Tongues */}
      <div className="absolute bottom-[-15px] left-[-20px] right-[-20px] h-[32vh] z-2 opacity-85">
        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full">
          {/* Layer 1: Dark Crimson Flame */}
          <motion.path
            d="M0,75 Q25,20 50,75 T100,75 T150,75 T200,75 T250,75 T300,75 T350,75 T400,75 L400,100 L0,100 Z"
            fill="rgba(153, 27, 27, 0.45)"
            animate={{
              d: [
                "M0,75 Q25,25 50,70 T100,80 T150,65 T200,78 T250,70 T300,82 T350,70 T400,75 L400,100 L0,100 Z",
                "M0,80 Q25,15 50,80 T100,70 T150,75 T200,68 T250,80 T300,65 T350,78 T400,80 L400,100 L0,100 Z",
                "M0,75 Q25,25 50,70 T100,80 T150,65 T200,78 T250,70 T300,82 T350,70 T400,75 L400,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Layer 2: Fiery Orange Flame */}
          <motion.path
            d="M0,85 Q30,40 60,85 T120,85 T180,85 T240,85 T300,85 T360,85 T400,85 L400,100 L0,100 Z"
            fill="rgba(234, 88, 12, 0.55)"
            animate={{
              d: [
                "M0,85 Q30,35 60,80 T120,88 T180,75 T240,90 T300,80 T360,88 T400,85 L400,100 L0,100 Z",
                "M0,88 Q30,45 60,90 T120,78 T180,88 T240,80 T300,90 T360,78 T400,88 L400,100 L0,100 Z",
                "M0,85 Q30,35 60,80 T120,88 T180,75 T240,90 T300,80 T360,88 T400,85 L400,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          />
          {/* Layer 3: Golden Amber Flame */}
          <motion.path
            d="M0,92 Q40,60 80,92 T160,92 T240,92 T320,92 T400,92 L400,100 L0,100 Z"
            fill="rgba(245, 158, 11, 0.65)"
            animate={{
              d: [
                "M0,92 Q40,55 80,90 T160,95 T240,88 T320,94 T400,90 L400,100 L0,100 Z",
                "M0,94 Q40,65 80,96 T160,88 T240,95 T320,88 T400,95 L400,100 L0,100 Z",
                "M0,92 Q40,55 80,90 T160,95 T240,88 T320,94 T400,90 L400,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          />
          {/* Layer 4: Bright Core Yellow Sparks */}
          <motion.path
            d="M0,96 Q50,75 100,96 T200,96 T300,96 T400,96 L400,100 L0,100 Z"
            fill="rgba(254, 240, 138, 0.8)"
            animate={{
              d: [
                "M0,96 Q50,70 100,94 T200,98 T300,92 T400,97 L400,100 L0,100 Z",
                "M0,97 Q50,78 100,98 T200,94 T300,98 T400,94 L400,100 L0,100 Z",
                "M0,96 Q50,70 100,94 T200,98 T300,92 T400,97 L400,100 L0,100 Z"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          />
        </svg>
      </div>

      {/* Swirling Rising Magma Embers and Fire Sparks */}
      {embers.map((e) => (
        <motion.div
          key={e.id}
          initial={{ y: '110vh', x: `${e.x}vw`, opacity: 0 }}
          animate={{
            y: '-15vh',
            x: `${e.x + (Math.random() * 30 - 15)}vw`,
            opacity: [0, 0.95, 0.95, 0],
            scale: [0.6, 1.4, 0.4]
          }}
          transition={{
            duration: e.duration,
            repeat: Infinity,
            ease: "easeIn",
            delay: e.delay
          }}
          className="absolute rounded-full bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 blur-[0.4px] shadow-[0_0_12px_#f97316,0_0_20px_#ef4444] z-3"
          style={{
            width: `${e.size}px`,
            height: `${e.size}px`,
            bottom: 0
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 7. LUZ DIURNA (bg_light) - MINIMALISMO ARQUITECTÓNICO Y PRISMA SOLAR
// =========================================================================
export const LightTheme = ({ isDesktop, mousePos }) => {
  const dustMotes = useMemo(() => Array.from({ length: isDesktop ? 25 : 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#f9fafb]">
      {/* Pristine Minimalist Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] via-[#f1f5f9] to-[#e2e8f0] z-0" />

      {/* Gentle Sunbeam Light Sheen */}
      <motion.div
        animate={{ y: [-15, 15, -15], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: isDesktop ? `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` : 'none'
        }}
        className="absolute top-[-25%] right-[-15%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.95)_0%,rgba(226,232,240,0.3)_60%,transparent_80%)] z-1"
      />

      {/* Prismatic Rainbow Light Specks */}
      <div className="absolute inset-0 z-2 pointer-events-none opacity-40">
        <motion.div
          animate={{
            x: ['-5vw', '5vw', '-5vw'],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[15%] w-32 h-32 rounded-full bg-gradient-to-tr from-rose-200/40 via-amber-200/30 to-sky-200/40 blur-[30px]"
        />
        <motion.div
          animate={{
            x: ['5vw', '-5vw', '5vw'],
            rotate: [45, 0, 45]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[25%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-br from-indigo-200/30 via-emerald-200/30 to-amber-200/30 blur-[40px]"
        />
      </div>

      {/* Floating Micro Light Dust Motes */}
      {dustMotes.map((m) => (
        <motion.div
          key={m.id}
          animate={{
            y: ['0px', '-30px', '0px'],
            x: ['0px', '15px', '0px'],
            opacity: [0.2, 0.7, 0.2]
          }}
          transition={{
            duration: m.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: m.delay
          }}
          className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.08)] z-2"
          style={{
            width: `${m.size}px`,
            height: `${m.size}px`,
            left: `${m.left}%`,
            top: `${m.top}%`
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 8. AURORA BOREAL (bg_aurora) - CORTINAS ONDULANTES Y CIELO ÁRTICO
// =========================================================================
export const AuroraTheme = ({ isDesktop, mousePos }) => {
  const snowFlurries = useMemo(() => Array.from({ length: isDesktop ? 35 : 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: Math.random() * 2.5 + 1,
    duration: Math.random() * 7 + 5,
    delay: Math.random() * 4
  })), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#020912]">
      {/* Arctic Night Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020d1a] via-[#010810] to-[#000307] z-0" />

      {/* Ethereal Waving Aurora Curtains (Layer 1: Emerald Green) */}
      <motion.div
        animate={{
          scaleX: [1, 1.25, 1],
          skewX: [-15, 15, -15],
          opacity: [0.4, 0.75, 0.4]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          transform: isDesktop ? `translate(${mousePos.x * 15}px, ${mousePos.y * 10}px)` : 'none'
        }}
        className="absolute top-0 left-[-25%] w-[150%] h-[55vh] bg-gradient-to-b from-emerald-400/25 via-teal-400/15 to-transparent blur-[45px] z-1"
      />

      {/* Ethereal Waving Aurora Curtains (Layer 2: Violet / Cyan) */}
      <motion.div
        animate={{
          scaleX: [1.2, 0.9, 1.2],
          skewX: [12, -12, 12],
          opacity: [0.3, 0.65, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        style={{
          transform: isDesktop ? `translate(${mousePos.x * -15}px, ${mousePos.y * -10}px)` : 'none'
        }}
        className="absolute top-0 right-[-20%] w-[140%] h-[50vh] bg-gradient-to-b from-purple-500/25 via-cyan-400/15 to-transparent blur-[50px] z-1"
      />

      {/* Mountain Ridge Horizon Silhouette at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[22vh] z-2 opacity-90 pointer-events-none">
        <svg viewBox="0 0 500 120" preserveAspectRatio="none" className="w-full h-full">
          <polygon points="0,120 0,65 60,35 120,70 190,25 260,60 340,18 410,55 500,30 500,120" fill="#01060c" />
          <polygon points="0,120 0,85 80,55 150,85 220,50 300,80 380,45 460,75 500,55 500,120" fill="#000205" />
        </svg>
      </div>

      {/* Arctic Snow Flurries */}
      {snowFlurries.map((s) => (
        <motion.div
          key={s.id}
          initial={{ y: '-10vh', x: 0, opacity: 0 }}
          animate={{
            y: '110vh',
            x: [0, Math.sin(s.id) * 25, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            ease: "linear",
            delay: s.delay
          }}
          className="absolute rounded-full bg-white shadow-[0_0_6px_white] z-3"
          style={{
            width: `${s.size}px`,
            height: `${s.size}px`,
            left: `${s.left}%`
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 9. HIPERESPACIO (bg_hyperdrive) - VELOCIDAD LUZ Y ANILLOS DE SALTO
// =========================================================================
export const HyperdriveTheme = ({ isDesktop, mousePos }) => {
  const warpStreaks = useMemo(() => Array.from({ length: isDesktop ? 48 : 24 }, (_, i) => {
    const angle = (i / (isDesktop ? 48 : 24)) * 360;
    const rad = (angle * Math.PI) / 180;
    return {
      id: i,
      angle,
      cos: Math.cos(rad),
      sin: Math.sin(rad),
      duration: Math.random() * 1.5 + 1.2,
      delay: Math.random() * 2
    };
  }), [isDesktop]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#01020a]">
      {/* Hyperspace Radial Core */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_0%,rgba(14,165,233,0.05)_40%,#01020a_80%)] z-0" />

      {/* Concentric Warp Tunnel Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center z-1 pointer-events-none">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`warp-ring-${i}`}
            animate={{
              scale: [0.1, 4],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeIn",
              delay: i * 0.75
            }}
            className="absolute w-36 h-36 rounded-full border-2 border-cyan-400/50 shadow-[0_0_20px_#22d3ee]"
          />
        ))}
      </div>

      {/* Warp Speed Relativistic Light Streaks radiating from Center */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-2 pointer-events-none"
        style={{
          transform: isDesktop ? `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` : 'none'
        }}
      >
        {warpStreaks.map((s) => (
          <motion.div
            key={s.id}
            animate={{
              scaleX: [0.2, 3.5],
              opacity: [0, 0.9, 0],
              x: [0, s.cos * 380],
              y: [0, s.sin * 380]
            }}
            transition={{
              duration: s.duration,
              repeat: Infinity,
              ease: "easeIn",
              delay: s.delay
            }}
            className="absolute w-24 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300 to-white shadow-[0_0_8px_#ffffff] origin-left"
            style={{
              transform: `rotate(${s.angle}deg)`
            }}
          />
        ))}
      </div>

      {/* Spatial HUD Reticle Center */}
      <div className="absolute inset-0 flex items-center justify-center z-3 pointer-events-none opacity-40">
        <div className="w-20 h-20 rounded-full border border-cyan-400/40 border-dashed flex items-center justify-center">
          <div className="w-10 h-10 border border-white/60 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// COMPONENTE PRINCIPAL GLOBAL THEME EFFECTS CON DETECCIÓN PC/MÓVIL
// =========================================================================
const GlobalThemeEffectsComponent = ({ themeId, isDesktop = false, isLight = false }) => {
  const mousePos = useParallaxMouse(isDesktop);

  // Si está en modo claro o el fondo es bg_light
  if (isLight || themeId === 'bg_light') {
    return <LightTheme isDesktop={isDesktop} mousePos={mousePos} />;
  }

  switch (themeId) {
    case 'bg_grid':
      return <CyberGridTheme isDesktop={isDesktop} mousePos={mousePos} />;
    case 'bg_zen':
      return <ZenTheme isDesktop={isDesktop} mousePos={mousePos} />;
    case 'bg_ocean':
      return <OceanTheme isDesktop={isDesktop} mousePos={mousePos} />;
    case 'bg_nebula':
      return <NebulaTheme isDesktop={isDesktop} mousePos={mousePos} />;
    case 'bg_inferno':
      return <InfernoTheme isDesktop={isDesktop} mousePos={mousePos} />;
    case 'bg_aurora':
      return <AuroraTheme isDesktop={isDesktop} mousePos={mousePos} />;
    case 'bg_hyperdrive':
      return <HyperdriveTheme isDesktop={isDesktop} mousePos={mousePos} />;
    case 'bg_default':
    default:
      return <VoidTheme isDesktop={isDesktop} mousePos={mousePos} />;
  }
};

export const GlobalThemeEffects = React.memo(GlobalThemeEffectsComponent);
export default GlobalThemeEffects;
