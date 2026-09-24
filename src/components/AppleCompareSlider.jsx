import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle, CheckCircle2, ShieldAlert, ShieldCheck, ArrowLeftRight } from 'lucide-react';

export const AppleCompareSlider = ({ onFinish }) => {
  // Slider position from 0% (all left: Antes) to 100% (all right: Después)
  // Default at 50%
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    updatePosition(e.clientX);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <section className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          Control Interactivo
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Desliza para Comparar
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-md mx-auto">
          Arrastra la barra para ver el contraste directo entre el consumo pasivo y tu mente con Focusly.
        </p>
      </div>

      {/* Main Interactive Slider Container */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[420px] sm:h-[380px] rounded-[36px] overflow-hidden border border-white/20 select-none cursor-ew-resize shadow-[0_30px_90px_rgba(0,0,0,0.9)] bg-black"
      >
        {/* RIGHT SIDE: CON FOCUSLY (Background layer) */}
        <div className="absolute inset-0 bg-zinc-950 p-6 sm:p-10 flex flex-col justify-between text-white">
          <div className="flex justify-end items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-[9px] font-black uppercase tracking-widest shadow-lg">
              <CheckCircle2 size={13} /> Con Focusly
            </span>
          </div>

          <div className="max-w-md ml-auto text-right space-y-3">
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Claridad y Logros
            </h3>
            <p className="text-xs text-zinc-300 font-medium leading-relaxed">
              Bloqueo estricto, maestrías paso a paso y concentración sostenida.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md ml-auto text-center">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/15">
              <span className="text-lg sm:text-2xl font-black text-white block">+4h</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase">Recuperadas</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/15">
              <span className="text-lg sm:text-2xl font-black text-white block">50 min</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase">Foco Profundo</span>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/15">
              <span className="text-lg sm:text-2xl font-black text-white block">100%</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 uppercase">Paz Mental</span>
            </div>
          </div>
        </div>

        {/* LEFT SIDE: ANTES / SIN FOCUSLY (Clipped layer) */}
        <div 
          className="absolute inset-0 bg-black p-6 sm:p-10 flex flex-col justify-between text-white border-r border-white/40"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <div className="flex justify-start items-start">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/25 text-zinc-300 text-[9px] font-black uppercase tracking-widest">
              <AlertCircle size={13} className="text-zinc-400" /> Sin Focusly
            </span>
          </div>

          <div className="max-w-md space-y-3">
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Ruido y Distracción
            </h3>
            <p className="text-xs text-zinc-400 font-medium leading-relaxed">
              Scroll infinito, dopamina artificial y horas perdidas sin darte cuenta.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-md text-center">
            <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-lg sm:text-2xl font-black text-white block">4.8h</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-zinc-500 uppercase">Perdidas / Día</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-lg sm:text-2xl font-black text-white block">47 seg</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-zinc-500 uppercase">Atención</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900 border border-white/10">
              <span className="text-lg sm:text-2xl font-black text-white block">Alta</span>
              <span className="text-[8px] sm:text-[9px] font-bold text-zinc-500 uppercase">Ansiedad</span>
            </div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER LINE & HANDLE */}
        <div 
          className="absolute top-0 bottom-0 z-30 w-1 bg-white flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          {/* Circular Apple Handle */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.8)] border-2 border-black flex items-center justify-center gap-1">
            <ArrowLeftRight size={18} strokeWidth={2.5} />
          </div>
        </div>

        {/* Floating Hint Tag */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-20">
          <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-zinc-300 shadow-md">
            ↔ Arrastra para ver la diferencia
          </span>
        </div>
      </div>
    </section>
  );
};
