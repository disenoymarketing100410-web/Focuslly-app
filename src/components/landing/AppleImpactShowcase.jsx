import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, TrendingUp, Sparkles, Clock, ArrowRight, 
  Smartphone, Award, Brain, Star, Quote, ChevronRight 
} from 'lucide-react';

export function AppleImpactShowcase({ onFinish }) {
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedCase, setSelectedCase] = useState(0);

  const CASES = [
    {
      id: 0,
      category: 'medicina',
      categoryLabel: 'Medicina & Salud',
      name: 'Mateo R.',
      role: 'Estudiante de 4º Año de Medicina • Universidad Central',
      headline: 'De 5 horas diarias perdidas en TikTok a promediar 9.4/10 en Anatomía Patológica.',
      quote: 'El diseño monocromático le quitó todo el atractivo a mi teléfono. Cuando abro el libro con audio de 40Hz, entro en un túnel de concentración que jamás había experimentado.',
      beforeTime: '5h 45m',
      afterTime: '1h 10m',
      timeSaved: '4h 35m al día',
      activeStreak: '48 días de racha',
      keyMetric: '9.4/10',
      keyMetricLabel: 'Promedio académico semestral',
      badge: 'MAESTRÍA ACTIVA EN ACTIVE RECALL'
    },
    {
      id: 1,
      category: 'software',
      categoryLabel: 'Ingeniería & Dev',
      name: 'Valeria G.',
      role: 'Senior Software Engineer • Trabajo Remoto',
      headline: 'Termino mi jornada a las 5:00 PM sin fatiga visual ni dispersión por Slack.',
      quote: 'El mayor problema en tech es la multitarea compulsiva. Con el bloqueo estricto y la gamificación, mi tiempo de Deep Work pasó de 1.5h a 6 horas limpias de código.',
      beforeTime: '6h 15m',
      afterTime: '1h 40m',
      timeSaved: '4h 35m al día',
      activeStreak: '72 días de racha',
      keyMetric: '+38%',
      keyMetricLabel: 'Pull Requests resueltos por sprint',
      badge: 'MAESTRÍA EN ATAJOS & FLUJO'
    },
    {
      id: 2,
      category: 'oposiciones',
      categoryLabel: 'Oposiciones & Leyes',
      name: 'Lucas S.',
      role: 'Opositor a Judicatura • 2º Año',
      headline: 'Aprobar no es cuestión de suerte: es acumular horas de temario sin distracciones.',
      quote: 'Focusly me devolvió el control de mis tardes. La calculadora de retorno de inversión me demostró que cada hora en redes me costaba un año de retraso profesional.',
      beforeTime: '4h 50m',
      afterTime: '55m',
      timeSaved: '3h 55m al día',
      activeStreak: '95 días de racha',
      keyMetric: '8.2h',
      keyMetricLabel: 'Horas diarias de estudio efectivo',
      badge: 'TOP 1% CLUB DE MAESTRÍA'
    }
  ];

  const filteredCases = activeFilter === 'todos' 
    ? CASES 
    : CASES.filter(c => c.category === activeFilter);

  const activeCaseData = CASES[selectedCase] || CASES[0];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/10">
      
      {/* SECTION HEADER */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
              Resultados Verificados • Comunidad Real
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              Transformaciones Reales en la Vida Diaria
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
              Métricas auditadas de estudiantes y profesionales que recuperaron su atención y superaron sus metas académicas.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'medicina', label: 'Medicina & STEM' },
              { id: 'software', label: 'Ingeniería / Dev' },
              { id: 'oposiciones', label: 'Oposiciones & Leyes' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setActiveFilter(f.id);
                  const found = CASES.find(c => f.id === 'todos' || c.category === f.id);
                  if (found) setSelectedCase(found.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-white text-black shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED CASE SPOTLIGHT CARD (APPLE BENTO FORMAT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left 8 Cols: Deep Case Breakdown */}
        <div className="lg:col-span-8 bg-zinc-950 border border-white/15 rounded-3xl p-7 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-2xl">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-black uppercase tracking-widest">
                <Sparkles size={11} />
                <span>{activeCaseData.categoryLabel}</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase">
                {activeCaseData.badge}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white leading-snug">
              “{activeCaseData.headline}”
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 italic font-medium leading-relaxed pl-4 border-l-2 border-white/40">
              {activeCaseData.quote}
            </p>

            {/* Before vs After Telemetry Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1">
                <span className="text-[9px] font-black uppercase text-zinc-500 tracking-wider block">
                  Antes de Focusly
                </span>
                <span className="text-2xl font-mono font-black text-zinc-400">
                  {activeCaseData.beforeTime}
                </span>
                <span className="text-[9px] text-zinc-500 block">Pantalla diaria pasiva</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/25 space-y-1">
                <span className="text-[9px] font-black uppercase text-white tracking-wider block">
                  Con Focusly Activo
                </span>
                <span className="text-2xl font-mono font-black text-white">
                  {activeCaseData.afterTime}
                </span>
                <span className="text-[9px] text-zinc-300 block">Uso esencial útil</span>
              </div>

              <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-1">
                <span className="text-[9px] font-black uppercase text-white tracking-wider block">
                  Tiempo Recuperado
                </span>
                <span className="text-2xl font-mono font-black text-white">
                  {activeCaseData.timeSaved}
                </span>
                <span className="text-[9px] text-zinc-400 block font-medium">Libres cada día</span>
              </div>
            </div>
          </div>

          {/* User Profile Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-black uppercase text-white">{activeCaseData.name}</h4>
              <p className="text-[11px] text-zinc-400">{activeCaseData.role}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-zinc-300 uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {activeCaseData.activeStreak}
              </span>
              <button
                onClick={onFinish}
                className="bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Probar Ahora</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Quick Selector of All 3 Cases */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          {CASES.map((item) => {
            const isSelected = activeCaseData.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item.id)}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex-1 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white/10 border-white/40 shadow-xl'
                    : 'bg-zinc-950/60 border-white/10 hover:border-white/20 hover:bg-white/5'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase font-bold text-zinc-400">
                      {item.categoryLabel}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    )}
                  </div>
                  <h5 className="text-base font-black uppercase text-white tracking-tight">
                    {item.name}
                  </h5>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.headline}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-3">
                  <span className="text-xs font-mono font-bold text-white">
                    {item.keyMetric}
                  </span>
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest">
                    {item.keyMetricLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>

    </section>
  );
}
