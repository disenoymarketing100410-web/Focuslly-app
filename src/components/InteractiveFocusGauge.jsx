import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const InteractiveFocusGauge = ({ onFinish }) => {
  const [level, setLevel] = useState(75); // 0 to 100

  // Derived metrics based on level
  const hoursRecovered = (level * 0.04).toFixed(1); // 0 to 4.0 hrs
  const focusScore = Math.round(level);
  
  const getModeInfo = (val) => {
    if (val < 35) {
      return {
        title: 'Modo Reactivo',
        tag: 'Distracción Constante',
        desc: 'Notificaciones invasivas y cambios continuos de contexto en redes.',
      };
    }
    if (val < 70) {
      return {
        title: 'Modo Controlado',
        tag: 'Blindaje Activo',
        desc: 'Redes bloqueadas en horarios clave. Sesiones de 25 minutos regulares.',
      };
    }
    return {
      title: 'Flujo Absoluto',
      tag: 'Cero Distracción',
      desc: 'Mente despejada, alta retención de estudio y racha diaria protegida.',
    };
  };

  const mode = getModeInfo(level);

  return (
    <section className="space-y-12 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
          Simulador Didáctico
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          Ajusta tu Intensidad de Foco
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-xl">
          Desplaza la barra para ver cómo se transforma tu rendimiento mental y cuántas horas libres recuperas.
        </p>
      </div>

      {/* Box-free Open Range Slider */}
      <div className="space-y-4 pt-2">
        <div className="flex justify-between items-baseline">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Nivel de Blindaje Seleccionado:
          </span>
          <span className="text-3xl font-mono font-black text-white">
            {level}%
          </span>
        </div>

        <input 
          type="range"
          min="0"
          max="100"
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white"
        />

        <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <span>0% (Consumo Pasivo)</span>
          <span>50% (Equilibrio)</span>
          <span>100% (Hiperfoco)</span>
        </div>
      </div>

      {/* 3 Open Columns with Hairline Separation (NO BOXES) */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10 py-8">
        
        {/* Column 1 */}
        <div className="py-4 md:py-0 md:pr-8 space-y-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">
            Estado Mental
          </span>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              {mode.tag}
            </span>
            <h4 className="text-2xl font-black uppercase tracking-tight text-white">
              {mode.title}
            </h4>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            {mode.desc}
          </p>
        </div>

        {/* Column 2 */}
        <div className="py-4 md:py-0 md:px-8 space-y-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">
            Tiempo Ganado
          </span>
          <div className="text-5xl sm:text-6xl font-mono font-black text-white tracking-tight">
            +{hoursRecovered}<span className="text-xl text-zinc-500 font-sans">h</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Horas productivas recuperadas cada día de tu rutina.
          </p>
        </div>

        {/* Column 3 */}
        <div className="py-4 md:py-0 md:pl-8 space-y-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 block">
            Claridad Cognitiva
          </span>
          <div className="text-5xl sm:text-6xl font-mono font-black text-white tracking-tight">
            {focusScore}<span className="text-xl text-zinc-500 font-sans">/100</span>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden mt-2">
            <div 
              className="bg-white h-full transition-all duration-300"
              style={{ width: `${level}%` }}
            />
          </div>
        </div>

      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <span className="text-xs text-zinc-500">
          Modo adaptable disponible instantáneamente en la aplicación.
        </span>
        <button 
          onClick={onFinish}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-zinc-300 transition-colors cursor-pointer group"
        >
          <span>Activar este nivel en Focusly</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
