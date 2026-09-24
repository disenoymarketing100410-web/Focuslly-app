import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Shield, ShieldCheck, Zap, Activity, Sparkles, ArrowRight,
  RotateCw, AlertTriangle, CheckCircle2, Lock, Flame, Info, Sliders,
  Eye, RefreshCw, Layers, Smartphone
} from 'lucide-react';

export const Didactic3DFocusLab = ({ onFinish }) => {
  // 3 Didactic Stages:
  // 0 = 'distraction' (Sobrecarga Dopamínica)
  // 1 = 'shield' (Blindaje Focusly Activo)
  // 2 = 'flow' (Estado de Flujo Profundo)
  const [activeStage, setActiveStage] = useState(0);
  const [frictionLevel, setFrictionLevel] = useState(85); // 0 to 100
  const [autoRotate, setAutoRotate] = useState(true);
  
  // Interactive 3D drag / mouse tilt
  const [rotation, setRotation] = useState({ x: 15, y: -25 });
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Mouse move for 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;
      setRotation(prev => ({
        x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.4)),
        y: prev.y + deltaX * 0.4
      }));
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    setAutoRotate(false);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Touch handlers for mobile 3D interaction
  const handleTouchMove = (e) => {
    if (!e.touches[0]) return;
    const touch = e.touches[0];
    if (isDraggingRef.current) {
      const deltaX = touch.clientX - lastMousePos.current.x;
      const deltaY = touch.clientY - lastMousePos.current.y;
      setRotation(prev => ({
        x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.4)),
        y: prev.y + deltaX * 0.4
      }));
      lastMousePos.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchStart = (e) => {
    if (!e.touches[0]) return;
    isDraggingRef.current = true;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    setAutoRotate(false);
  };

  // Auto rotation loop when not dragging
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x,
        y: (prev.y + (activeStage === 0 ? 0.8 : activeStage === 1 ? 0.4 : 0.2)) % 360
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [autoRotate, activeStage]);

  const STAGES_DATA = [
    {
      id: 'distraction',
      badge: 'FASE 01',
      title: 'Sobrecarga Dopamínica',
      subtitle: 'El bucle de distracción que fragmenta tu atención.',
      stats: [
        { label: 'Ondas Cerebrales', value: 'Beta Caótica (30Hz)', status: 'Alerta falsa', color: 'text-zinc-400' },
        { label: 'Dopamina Basal', value: '-72% Depleción', status: 'Fatiga mental', color: 'text-zinc-400' },
        { label: 'Retención de Estudio', value: '18% Promedio', status: 'Fragmentada', color: 'text-zinc-400' },
        { label: 'Fricción de Acceso', value: '0 Segundos', status: 'Impulsiva', color: 'text-zinc-400' },
      ],
      didacticLesson: 'El scroll infinito satura tus receptores y reduce tu concentración a menos de 1 minuto.',
      ctaText: 'Probar Bloqueo',
      ctaNext: 1,
    },
    {
      id: 'shield',
      badge: 'FASE 02',
      title: 'Blindaje y Aislamiento',
      subtitle: 'La regla de 20 segundos de fricción deliberada.',
      stats: [
        { label: 'Ondas Cerebrales', value: 'Beta Regulada (16Hz)', status: 'Atención activa', color: 'text-white' },
        { label: 'Dopamina Basal', value: '+45% Estabilizada', status: 'Equilibrio', color: 'text-white' },
        { label: 'Retención de Estudio', value: '68% Creciente', status: 'Asimilación', color: 'text-white' },
        { label: 'Fricción de Acceso', value: '25 Segundos', status: 'Blindaje estricto', color: 'text-white' },
      ],
      didacticLesson: 'Focusly interpone una barrera técnica que neutraliza el impulso de abrir redes sociales.',
      ctaText: 'Activar Flujo',
      ctaNext: 2,
    },
    {
      id: 'flow',
      badge: 'FASE 03',
      title: 'Flujo Profundo (Deep Work)',
      subtitle: 'Concentración ininterrumpida de alto rendimiento.',
      stats: [
        { label: 'Ondas Cerebrales', value: 'Alfa Pura (10Hz)', status: 'Flujo armónico', color: 'text-white' },
        { label: 'Dopamina Basal', value: '+95% Sostenida', status: 'Motivación real', color: 'text-white' },
        { label: 'Retención de Estudio', value: '96% Máxima', status: 'Super-aprendizaje', color: 'text-white' },
        { label: 'Fricción de Acceso', value: 'Totalmente Aislado', status: 'Cero ruido', color: 'text-white' },
      ],
      didacticLesson: 'El tiempo psicológico se dilata y asimilas conceptos complejos 4 veces más rápido.',
      ctaText: 'Entrar a Focusly',
      ctaNext: 'app',
    },
  ];

  const currentStage = STAGES_DATA[activeStage];

  return (
    <section id="laboratorio-3d" className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-white space-y-12">
      
      {/* SECTION HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-xl">
          <Brain size={13} className="text-white" />
          <span>Neurociencia Didáctica Interactiva 3D</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
          ¿Cómo Transforma Focusly <br className="hidden sm:inline" />
          <span className="text-zinc-400">la Estructura de tu Atención?</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
          Interactúa con el modelo 3D neuro-espacial. Arrastra con el cursor o el dedo para girar el prisma y selecciona las fases para entender la ciencia del foco.
        </p>
      </div>

      {/* 3-STAGE SELECTOR TABS (Apple Dark Minimalist) */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-zinc-950/90 rounded-2xl border border-white/15 max-w-xl mx-auto shadow-2xl">
        {STAGES_DATA.map((st, idx) => (
          <button
            key={st.id}
            onClick={() => {
              setActiveStage(idx);
              setAutoRotate(true);
            }}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
              activeStage === idx
                ? 'bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.25)] scale-[1.02]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${activeStage === idx ? 'bg-black animate-pulse' : 'bg-zinc-600'}`} />
            <span>Fase 0{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* MAIN 3D LABORATORY GRID (OPEN & BOX-FREE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8 border-y border-white/10 relative">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.01] rounded-full blur-3xl pointer-events-none" />

        {/* LEFT COLUMN: INTERACTIVE 3D PRISM / GYROSCOPE STAGE */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
          
          {/* Top 3D Control Bar */}
          <div className="w-full flex justify-between items-center mb-4 px-2 text-[9px] font-mono text-zinc-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              Giroscopio 3D: Rotación Reactiva
            </span>
            <button 
              onClick={() => {
                setRotation({ x: 15, y: -25 });
                setAutoRotate(true);
              }}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors p-1"
              title="Centrar rotación"
            >
              <RefreshCw size={11} /> Reset Vista
            </button>
          </div>

          {/* 3D VIEWPORT CONTAINER */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            className="w-full aspect-square max-w-[420px] rounded-[36px] bg-black/90 border border-white/20 relative flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden shadow-[inset_0_0_80px_rgba(0,0,0,0.9),0_20px_50px_rgba(0,0,0,0.8)]"
            style={{ perspective: '1200px' }}
          >
            {/* Coordinate Grid Floor */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.2) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Central Optical Lens Flare */}
            <div className="absolute w-40 h-40 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            {/* THE 3D ROTATING RIG */}
            <div
              className="relative w-64 h-64 transition-transform duration-75 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              }}
            >
              {/* RING 1: EXTERNAL ROTATING SATELLITE ORBIT (Z-AXIS) */}
              <div
                className="absolute inset-0 rounded-full border-2 border-dashed transition-all duration-700 pointer-events-none"
                style={{
                  transform: 'rotateX(75deg)',
                  borderColor: activeStage === 0 ? 'rgba(255, 255, 255, 0.25)' : activeStage === 1 ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.8)',
                  boxShadow: activeStage === 2 ? '0 0 35px rgba(255,255,255,0.3)' : 'none'
                }}
              />

              {/* RING 2: GYROSCOPIC INCLINED RING (Y-AXIS) */}
              <div
                className="absolute inset-4 rounded-full border border-white/30 transition-all duration-700 pointer-events-none"
                style={{
                  transform: 'rotateY(60deg) rotateX(30deg)',
                  borderWidth: activeStage === 1 ? '2px' : '1px'
                }}
              >
                {/* Tick notches */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
              </div>

              {/* RING 3: POLAR MERIDIAN RING */}
              <div
                className="absolute inset-8 rounded-full border border-white/20 transition-all duration-700 pointer-events-none"
                style={{
                  transform: 'rotateX(30deg) rotateY(-45deg)'
                }}
              />

              {/* 3D FLOATING DISTRACTION PARTICLES OR FOCUS PARTICLES */}
              {activeStage === 0 && (
                <>
                  {/* Chaotic distraction satellites */}
                  {[
                    { x: -80, y: -70, z: 60, label: 'TikTok', icon: '📱' },
                    { x: 90, y: -50, z: -40, label: 'Insta', icon: '🔔' },
                    { x: -70, y: 80, z: -50, label: 'YouTube', icon: '▶' },
                    { x: 80, y: 70, z: 70, label: 'Dopamina', icon: '⚡' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl bg-zinc-900/90 border border-white/30 text-white text-[9px] font-black flex items-center gap-1 shadow-[0_0_20px_rgba(255,255,255,0.2)] animate-pulse"
                      style={{
                        transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px)`
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </>
              )}

              {/* STAGE 1: 3D SHIELD FORCEFIELD (HEXAGONAL CAGE) */}
              {activeStage === 1 && (
                <div
                  className="absolute inset-6 rounded-3xl border-2 border-white/60 bg-white/[0.06] backdrop-blur-sm transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.25)] flex items-center justify-center pointer-events-none"
                  style={{
                    transform: 'translateZ(20px) rotateZ(45deg)'
                  }}
                >
                  <div className="text-[10px] font-black uppercase text-white tracking-widest px-3 py-1 bg-black/80 rounded-full border border-white/40 -rotate-45">
                    ESCUDO 25s
                  </div>
                </div>
              )}

              {/* 3D CORE: THE NEURAL DIAMOND / MONOCULAR CRYSTAL */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl transition-all duration-700 flex items-center justify-center"
                style={{
                  transform: 'translateZ(0px) rotateX(45deg) rotateY(45deg)',
                  backgroundColor: activeStage === 2 ? '#ffffff' : activeStage === 1 ? '#27272a' : '#18181b',
                  boxShadow: activeStage === 2 
                    ? '0 0 60px rgba(255,255,255,0.8), inset 0 0 20px rgba(0,0,0,0.2)' 
                    : activeStage === 1
                    ? '0 0 30px rgba(255,255,255,0.2), inset 0 0 10px rgba(255,255,255,0.1)'
                    : '0 0 15px rgba(255,255,255,0.05)',
                  border: activeStage === 2 ? '3px solid #ffffff' : '2px solid rgba(255,255,255,0.3)'
                }}
              >
                <div className="-rotate-45 -rotate-y-45 text-center">
                  {activeStage === 0 && (
                    <AlertTriangle size={26} className="text-zinc-400 mx-auto animate-bounce" />
                  )}
                  {activeStage === 1 && (
                    <ShieldCheck size={28} className="text-white mx-auto" />
                  )}
                  {activeStage === 2 && (
                    <Sparkles size={30} className="text-black mx-auto fill-black animate-spin" />
                  )}
                </div>
              </div>

              {/* STAGE 2: SACRED CONCENTRIC EXPANSION WAVES */}
              {activeStage === 2 && (
                <>
                  <div 
                    className="absolute -inset-10 rounded-full border border-white/40 animate-ping pointer-events-none"
                    style={{ animationDuration: '3s' }}
                  />
                  <div 
                    className="absolute -inset-20 rounded-full border border-white/20 animate-pulse pointer-events-none"
                    style={{ animationDuration: '2s' }}
                  />
                </>
              )}

            </div>

            {/* Hint Overlay */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-widest text-zinc-400 pointer-events-none flex items-center gap-1.5">
              <RotateCw size={10} className="animate-spin text-white" />
              <span>Arrastra para rotar en 3D</span>
            </div>
          </div>

          {/* Friction Slider (Live Interactive Parameter) */}
          <div className="w-full max-w-[420px] mt-4 p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
              <span className="text-zinc-400 flex items-center gap-1">
                <Sliders size={12} /> Fricción de Desbloqueo
              </span>
              <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded border border-white/20">
                {frictionLevel} Segundos
              </span>
            </div>
            <input 
              type="range"
              min="5"
              max="120"
              value={frictionLevel}
              onChange={(e) => setFrictionLevel(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <p className="text-[9px] text-zinc-400 font-medium">
              A mayor fricción voluntaria, menor probabilidad de abrir redes impulsivamente.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: DIDACTIC LESSON & REAL-TIME TELEMETRY METRICS */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          
          <div className="space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-[9px] font-black uppercase tracking-widest">
              {currentStage.badge}
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              {currentStage.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed">
              {currentStage.subtitle}
            </p>
          </div>

          {/* Minimal Didactic Insight */}
          <div className="py-2 flex items-start gap-3 border-l-2 border-white/40 pl-4">
            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
              {currentStage.didacticLesson}
            </p>
          </div>

          {/* Real-time Telemetry Metrics Grid (Open Minimalist Display) */}
          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-white/10">
            {currentStage.stats.map((st, idx) => (
              <div key={idx} className="space-y-1">
                <span className="text-[9px] font-black uppercase tracking-wider text-zinc-500 block">
                  {st.label}
                </span>
                <span className="text-lg font-mono font-black text-white block tracking-tight">
                  {st.value}
                </span>
                <span className="text-[10px] text-zinc-400 block font-medium">
                  {st.status}
                </span>
              </div>
            ))}
          </div>

          {/* Stage Transition Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {currentStage.ctaNext === 'app' ? (
              <button
                onClick={onFinish}
                className="w-full bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-widest py-4 px-8 rounded-2xl shadow-[0_10px_35px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
              >
                <span>Entrar a la App y Probar</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveStage(currentStage.ctaNext);
                  setAutoRotate(true);
                }}
                className="w-full bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-widest py-4 px-8 rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
              >
                <span>{currentStage.ctaText}</span>
                <ArrowRight size={15} />
              </button>
            )}

            <button
              onClick={() => setActiveStage((activeStage + 1) % 3)}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl border border-white/25 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <RotateCw size={13} /> Siguiente Fase
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Didactic3DFocusLab;
