// src/components/mastery/KhanSyllabusView.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  ChevronDown, 
  ChevronRight, 
  ArrowRight,
  Trophy,
  Sparkles,
  Lock
} from 'lucide-react';

export const KhanSyllabusView = ({
  activeMastery,
  units,
  completedClasses = [],
  nextTargetClassId,
  isLight = false,
  onLaunchLesson,
  onLaunchUnitChallenge
}) => {
  // Find current unit index
  const activeUnitIndex = units.findIndex(u => 
    u.classes.some(c => c.id === nextTargetClassId)
  );
  const currentUnitIdx = activeUnitIndex >= 0 ? activeUnitIndex : 0;

  // By default, keep active unit expanded
  const [expandedUnits, setExpandedUnits] = useState(() => {
    const targetUnit = units[currentUnitIdx] || units[0];
    return targetUnit ? [targetUnit.level] : [1];
  });

  const toggleUnitExpand = (level) => {
    setExpandedUnits(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  // Progress metrics
  const totalClasses = activeMastery.classes.length;
  const completedClassesCount = activeMastery.classes.filter(c => completedClasses.includes(c.id)).length;
  const maxMasteryPoints = totalClasses * 100;
  
  let currentMasteryPoints = 0;
  activeMastery.classes.forEach(c => {
    if (completedClasses.includes(c.id)) {
      currentMasteryPoints += 100;
    } else if (c.id === nextTargetClassId) {
      currentMasteryPoints += 50;
    }
  });

  const progressPercent = totalClasses > 0 
    ? Math.round((completedClassesCount / totalClasses) * 100) 
    : 0;

  return (
    <div className="w-full max-w-3xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-8">
      
      {/* ========================================================= */}
      {/* 1. ENCABEZADO ULTRA LIMPIO (SIN ESTADÍSTICAS AMONTONADAS) */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight">
              {activeMastery.title}
            </h1>
            {activeMastery.description && (
              <p className={`text-xs sm:text-sm mt-1 line-clamp-1 ${
                isLight ? 'text-zinc-500' : 'text-zinc-400'
              }`}>
                {activeMastery.description}
              </p>
            )}
          </div>

          {/* Puntos de dominio discretos */}
          <div className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono font-bold shrink-0 flex items-center gap-1.5 ${
            isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/10 text-zinc-400'
          }`}>
            <Trophy size={13} className="text-amber-400" />
            <span>{currentMasteryPoints} / {maxMasteryPoints} pts</span>
          </div>
        </div>

        {/* Indicador de avance principal */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>
              {progressPercent}% completado
            </span>
            <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>
              Unidad {Math.min(currentUnitIdx + 1, units.length)} de {units.length}
            </span>
          </div>

          {/* Barra de progreso minimalista */}
          <div className={`h-2.5 w-full rounded-full overflow-hidden p-0.5 border ${
            isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/40 border-white/10'
          }`}>
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.max(4, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. CAMINO DE APRENDIZAJE VISUAL (PROTAGONISTA)            */}
      {/* ========================================================= */}
      <div className="space-y-4">
        {units.map((unit, uIdx) => {
          const isExpanded = expandedUnits.includes(unit.level);
          const completedInUnit = unit.classes.filter(c => completedClasses.includes(c.id)).length;
          const isUnitCompleted = completedInUnit === unit.classes.length && unit.classes.length > 0;
          const isUnitActive = !isUnitCompleted && (
            unit.classes.some(c => c.id === nextTargetClassId) || 
            (uIdx === 0 && completedInUnit === 0 && !units.some(u => u.classes.some(c => c.id === nextTargetClassId)))
          );

          return (
            <div 
              key={`unit-${unit.level}`}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isUnitActive
                  ? (isLight ? 'bg-white border-blue-500/40 shadow-sm' : 'bg-[#11131a] border-blue-500/30 shadow-md shadow-blue-500/5')
                  : (isLight ? 'bg-white border-zinc-200' : 'bg-[#0f1016] border-white/10')
              }`}
            >
              {/* ENCABEZADO DE LA UNIDAD */}
              <button
                type="button"
                onClick={() => toggleUnitExpand(unit.level)}
                className={`w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                  isLight ? 'hover:bg-zinc-50' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Badge U1, U2... o Check si completada */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 border ${
                    isUnitCompleted
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : isUnitActive
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : (isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-500' : 'bg-white/5 border-white/10 text-zinc-400')
                  }`}>
                    {isUnitCompleted ? <Check size={16} /> : `U${unit.level}`}
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-black uppercase tracking-tight truncate">
                      {unit.levelName}
                    </h2>
                  </div>
                </div>

                {/* Estado minimalista + flecha */}
                <div className="flex items-center gap-3 shrink-0">
                  {isUnitCompleted ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check size={14} />
                      <span className="hidden sm:inline">Completado</span>
                    </span>
                  ) : isUnitActive ? (
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                      <span>En progreso</span>
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-zinc-500">
                      Próximo
                    </span>
                  )}

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isLight ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                </div>
              </button>

              {/* LISTA LIMPIA DE CLASES (EXPANDIBLE) */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`border-t divide-y ${
                      isLight ? 'border-zinc-100 divide-zinc-100' : 'border-white/5 divide-white/5'
                    }`}
                  >
                    {unit.classes.map((cls, cIdx) => {
                      const isCompleted = completedClasses.includes(cls.id);
                      const isNext = cls.id === nextTargetClassId || (!completedClasses.length && uIdx === 0 && cIdx === 0);
                      const originalIdx = activeMastery.classes.findIndex(c => c.id === cls.id);
                      const isLocked = !isCompleted && !isNext && originalIdx > 0 && !completedClasses.includes(activeMastery.classes[originalIdx - 1]?.id);

                      const formattedIndex = String(cIdx + 1).padStart(2, '0');

                      return (
                        <div
                          key={cls.id}
                          className={`p-3.5 sm:p-4 flex items-center justify-between gap-4 transition-colors ${
                            isNext 
                              ? (isLight ? 'bg-blue-50/40' : 'bg-blue-600/[0.04]') 
                              : (isLight ? 'hover:bg-zinc-50/70' : 'hover:bg-white/[0.01]')
                          }`}
                        >
                          {/* Número y Título de la clase */}
                          <div className="min-w-0 pr-2">
                            <span className="text-xs sm:text-sm font-bold tracking-tight truncate block">
                              <span className={`font-mono text-xs mr-2 ${
                                isCompleted ? 'text-emerald-400' : isNext ? 'text-blue-400' : 'opacity-40'
                              }`}>
                                {formattedIndex}
                              </span>
                              <span className={isLocked ? 'opacity-40' : 'opacity-90'}>
                                {cls.title}
                              </span>
                            </span>
                          </div>

                          {/* Estado / Acción Directa */}
                          <div className="shrink-0 flex items-center gap-2">
                            {isCompleted ? (
                              <button
                                onClick={() => onLaunchLesson(cls)}
                                className={`text-xs font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                                  isLight 
                                    ? 'bg-zinc-50 hover:bg-zinc-100 text-emerald-700 border-zinc-200' 
                                    : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                                }`}
                              >
                                <Check size={13} />
                                <span>Completada</span>
                              </button>
                            ) : isNext ? (
                              <button
                                onClick={() => onLaunchLesson(cls)}
                                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                              >
                                <span>Continuar</span>
                                <ArrowRight size={13} />
                              </button>
                            ) : (
                              <button
                                disabled={isLocked}
                                onClick={() => onLaunchLesson(cls)}
                                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                                  isLocked 
                                    ? 'text-zinc-500 cursor-not-allowed flex items-center gap-1' 
                                    : 'text-zinc-400 hover:text-white cursor-pointer'
                                }`}
                              >
                                {isLocked && <Lock size={12} />}
                                <span>Próxima</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {/* DESAFÍO DE UNIDAD (BLOQUE DESTACADO MINIMALISTA) */}
                    <div className="p-3.5 sm:p-4">
                      <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                        isLight 
                          ? 'bg-amber-50/80 border-amber-200' 
                          : 'bg-amber-500/[0.04] border-amber-500/20'
                      }`}>
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1">
                            <Trophy size={12} />
                            <span>Desafío de Unidad</span>
                          </div>
                          <p className={`text-xs font-bold mt-0.5 ${
                            isLight ? 'text-zinc-700' : 'text-zinc-300'
                          }`}>
                            Pon a prueba lo aprendido
                          </p>
                        </div>

                        <button
                          onClick={() => onLaunchUnitChallenge(unit)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider transition-transform active:scale-95 shrink-0 flex items-center gap-1 cursor-pointer shadow-sm"
                        >
                          <span>Comenzar</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </div>
  );
};
