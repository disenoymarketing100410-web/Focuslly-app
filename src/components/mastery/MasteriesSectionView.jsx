// src/components/mastery/MasteriesSectionView.jsx
import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Lock, 
  Play, 
  ArrowRight, 
  Trophy, 
  ChevronDown, 
  ChevronRight,
  Laptop,
  Brain,
  Zap,
  BookOpen,
  Sparkles,
  Award,
  Star,
  Compass,
  CheckCircle2,
  Flame,
  Layers
} from 'lucide-react';
import { MASTERIES_DATA } from '../../data/masteries';

export const MasteriesSectionView = ({
  completedClasses = [],
  isLight = false,
  onLaunchClass,
  onLaunchChallenge,
  onOpenFullCourse,
  onConnectHabit,
  onStartFocusSession,
  lang = 'es'
}) => {
  const pathSectionRef = useRef(null);
  const [connectedToast, setConnectedToast] = useState(null);

  // Find which course has the latest active progress or default to the first
  const initialCourseId = useMemo(() => {
    const inProgress = MASTERIES_DATA.find(m => {
      const done = m.classes.filter(c => completedClasses.includes(c.id)).length;
      return done > 0 && done < m.classes.length;
    });
    return inProgress ? inProgress.id : MASTERIES_DATA[0].id;
  }, [completedClasses]);

  const [activeCourseId, setActiveCourseId] = useState(initialCourseId);

  const activeMastery = useMemo(() => {
    return MASTERIES_DATA.find(m => m.id === activeCourseId) || MASTERIES_DATA[0];
  }, [activeCourseId]);

  // Group classes of active mastery into units (levels)
  const units = useMemo(() => {
    const unitMap = new Map();
    activeMastery.classes.forEach(cls => {
      const lvl = cls.level || 1;
      if (!unitMap.has(lvl)) {
        unitMap.set(lvl, {
          level: lvl,
          levelName: cls.levelName || `Unidad ${lvl}`,
          classes: []
        });
      }
      unitMap.get(lvl).classes.push(cls);
    });
    return Array.from(unitMap.values()).sort((a, b) => a.level - b.level);
  }, [activeMastery]);

  // Determine next target class in active mastery
  const nextTargetClassId = useMemo(() => {
    const firstUnfinished = activeMastery.classes.find(c => !completedClasses.includes(c.id));
    return firstUnfinished ? firstUnfinished.id : null;
  }, [activeMastery, completedClasses]);

  // Determine which class object is next
  const nextTargetClass = useMemo(() => {
    if (!nextTargetClassId) return null;
    return activeMastery.classes.find(c => c.id === nextTargetClassId);
  }, [activeMastery, nextTargetClassId]);

  // Determine current active unit level
  const activeUnitLevel = useMemo(() => {
    if (!nextTargetClassId) return units[0]?.level || 1;
    const currentUnit = units.find(u => u.classes.some(c => c.id === nextTargetClassId));
    return currentUnit ? currentUnit.level : units[0]?.level || 1;
  }, [units, nextTargetClassId]);

  const [selectedUnitLevel, setSelectedUnitLevel] = useState(activeUnitLevel);

  // Switch mastery and update selected unit
  const handleSelectMastery = (courseId) => {
    setActiveCourseId(courseId);
    const targetMastery = MASTERIES_DATA.find(m => m.id === courseId) || MASTERIES_DATA[0];
    const firstUnfinished = targetMastery.classes.find(c => !completedClasses.includes(c.id));
    const targetLvl = firstUnfinished ? firstUnfinished.level : 1;
    setSelectedUnitLevel(targetLvl);

    // Smooth scroll down to the Duolingo path view
    setTimeout(() => {
      if (pathSectionRef.current) {
        pathSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Metrics for active mastery
  const totalActiveClasses = activeMastery.classes.length;
  const doneActiveClasses = activeMastery.classes.filter(c => completedClasses.includes(c.id)).length;
  const activePct = totalActiveClasses > 0 ? Math.round((doneActiveClasses / totalActiveClasses) * 100) : 0;
  const maxMasteryPts = totalActiveClasses * 100;
  const currentMasteryPts = doneActiveClasses * 100;

  // Currently viewed unit
  const currentViewedUnit = useMemo(() => {
    return units.find(u => u.level === selectedUnitLevel) || units[0];
  }, [units, selectedUnitLevel]);

  // Icon helper
  const renderMasteryIcon = (iconName, size = 20) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop size={size} />;
      case 'Brain':
        return <Brain size={size} />;
      case 'Zap':
        return <Zap size={size} />;
      case 'BookOpen':
        return <BookOpen size={size} />;
      default:
        return <Sparkles size={size} />;
    }
  };

  // Calculate zigzag offsets for Duolingo nodes
  const getNodeOffset = (index) => {
    const pattern = [0, 45, -45, 30, -30];
    return pattern[index % pattern.length];
  };

  return (
    <div className="space-y-10 w-full">
      
      {/* ========================================================= */}
      {/* 1. ENCABEZADO LIMPIO                                       */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-5 border-white/5">
        <div>
          <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {lang === 'en' ? 'Productivity & Skill Masteries' : 'Maestrías de Productividad & Habilidades'}
          </h2>
          <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {lang === 'en'
              ? 'Select a mastery to explore and advance along its interactive learning path.'
              : 'Selecciona una maestría para ver y avanzar en su ruta interactiva de aprendizaje.'}
          </p>
        </div>

        <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold shrink-0 self-start sm:self-auto flex items-center gap-2 ${
          isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-zinc-300'
        }`}>
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <span>{completedClasses.length} {lang === 'en' ? 'classes completed' : 'clases completadas'}</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. PRIMERO: TODAS LAS MAESTRÍAS DISPONIBLES               */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-zinc-800' : 'text-zinc-200'
            }`}>
              <Layers size={16} className="text-blue-500" />
              <span>{lang === 'en' ? 'Available Masteries' : 'Maestrías Disponibles'}</span>
            </h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              {lang === 'en' ? 'Click on any mastery to view its learning road below' : 'Haz clic en cualquiera para cargar su camino de aprendizaje a continuación'}
            </p>
          </div>

          <span className="text-[11px] text-zinc-500 font-mono">
            {MASTERIES_DATA.length} {lang === 'en' ? 'paths' : 'rutas'}
          </span>
        </div>

        {/* Tarjetas compactas y visuales (sin sobrecarga de texto) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {MASTERIES_DATA.map(mastery => {
            const isCurrent = mastery.id === activeMastery.id;
            const totalCls = mastery.classes.length;
            const doneCount = mastery.classes.filter(c => completedClasses.includes(c.id)).length;
            const pct = Math.round((doneCount / totalCls) * 100);

            return (
              <div
                key={mastery.id}
                onClick={() => handleSelectMastery(mastery.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden group ${
                  isCurrent
                    ? (isLight 
                        ? 'bg-blue-50/60 border-blue-500 shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20' 
                        : 'bg-blue-950/25 border-blue-500/60 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/30')
                    : (isLight 
                        ? 'bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-sm' 
                        : 'bg-[#0e1018] border-white/5 hover:border-white/20 hover:bg-[#111320]')
                }`}
              >
                {/* Indicador de maestría activa */}
                {isCurrent && (
                  <div className="absolute top-2.5 right-3 flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-blue-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <span>{lang === 'en' ? 'Active' : 'Activa'}</span>
                  </div>
                )}

                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                    isCurrent
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                      : (isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/10 text-zinc-400')
                  }`}>
                    {renderMasteryIcon(mastery.icon, 20)}
                  </div>

                  <div className="min-w-0 flex-1 pr-12">
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight truncate group-hover:text-blue-400 transition-colors">
                      {mastery.title}
                    </h4>
                    <p className={`text-[11px] truncate mt-0.5 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                      {mastery.subtitle || mastery.category}
                    </p>
                  </div>
                </div>

                {/* Barra de progreso y botón de acción */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <div className={`h-1.5 flex-1 max-w-[100px] rounded-full overflow-hidden ${
                      isLight ? 'bg-zinc-200' : 'bg-white/10'
                    }`}>
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all"
                        style={{ width: `${Math.max(pct > 0 ? 6 : 0, pct)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold shrink-0">
                      {pct}%
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`text-[11px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors ${
                      isCurrent 
                        ? 'text-blue-400' 
                        : (isLight ? 'text-zinc-600 group-hover:text-blue-600' : 'text-zinc-400 group-hover:text-white')
                    }`}
                  >
                    <span>{isCurrent ? 'Viendo abajo' : 'Ver camino'}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. DESPUÉS: EN LA QUE VOY (ESTILO DUOLINGO)                */}
      {/* ========================================================= */}
      <div 
        ref={pathSectionRef}
        className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all shadow-2xl scroll-mt-6 ${
          isLight 
            ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-200/50' 
            : 'bg-[#0b0d14] border-blue-500/25 text-white shadow-blue-500/5'
        }`}
      >
        {/* Glow de fondo tecnológico Focusly */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15 bg-blue-600" />

        <div className="space-y-7 relative z-10">
          
          {/* Encabezado de la Maestría Activa */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 border-white/5">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-md ${
                isLight 
                  ? 'bg-blue-50 border-blue-200 text-blue-600' 
                  : 'bg-blue-600/15 border-blue-500/40 text-blue-400 shadow-blue-500/10'
              }`}>
                {renderMasteryIcon(activeMastery.icon, 28)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 flex items-center gap-1">
                    <Compass size={12} />
                    <span>Camino de Aprendizaje en Curso</span>
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-0.5">
                  {activeMastery.title}
                </h3>
                <p className={`text-xs mt-0.5 max-w-xl ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {activeMastery.subtitle || activeMastery.description}
                </p>
              </div>
            </div>

            {/* Puntos y botón acción directa */}
            <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 ${
                isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/10 text-zinc-400'
              }`}>
                <Trophy size={13} className="text-amber-400" />
                <span>{currentMasteryPts} / {maxMasteryPts} pts</span>
              </div>

              {nextTargetClass && (
                <button
                  onClick={() => onLaunchClass(nextTargetClass, activeMastery)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-600/20 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
                >
                  <Play size={12} className="fill-white" />
                  <span>Continuar</span>
                </button>
              )}
            </div>
          </div>

          {/* Barra de progreso global del curso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-blue-400 font-black">
                {activePct}% completado
              </span>
              <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>
                Unidad {selectedUnitLevel} de {units.length} • {doneActiveClasses}/{totalActiveClasses} clases
              </span>
            </div>

            <div className={`h-2.5 w-full rounded-full overflow-hidden p-0.5 border ${
              isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/60 border-white/10'
            }`}>
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${Math.max(3, activePct)}%` }}
              />
            </div>
          </div>

          {/* ECOSISTEMA FOCUSLY CONECTADO (Hábitos, Deep Work y Recompensas Integradas) */}
          <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
            isLight ? 'bg-zinc-50/80 border-zinc-200 text-zinc-900' : 'bg-gradient-to-r from-blue-950/30 via-indigo-950/20 to-purple-950/30 border-blue-500/20 text-white'
          }`}>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-tight">Ecosistema Conectado Focusly</h4>
                  <p className="text-[10px] text-zinc-400">Esta maestría sincroniza tus hábitos diarios, calendario y sesiones de Deep Work</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
                100% Integrado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1. Hábito Diario */}
              <button
                type="button"
                onClick={() => {
                  if (onConnectHabit) onConnectHabit(activeMastery.title);
                  setConnectedToast(`¡Hábito "Práctica diaria: ${activeMastery.title}" sincronizado con tus rutinas!`);
                  setTimeout(() => setConnectedToast(null), 3500);
                }}
                className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col justify-between gap-2 ${
                  isLight ? 'bg-white border-zinc-200 hover:border-blue-400 text-zinc-800' : 'bg-white/5 border-white/10 hover:border-blue-500/40 text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    Hábito Diario
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono">+40 XP/día</span>
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight truncate">
                    15 min {activeMastery.title}
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                    Ancla una práctica diaria en tu lista de hábitos
                  </p>
                </div>
                <div className="text-[10px] font-bold text-blue-400 flex items-center gap-1 mt-0.5">
                  <span>Añadir a Hábitos</span>
                  <ArrowRight size={11} />
                </div>
              </button>

              {/* 2. Sesión de Deep Work */}
              <button
                type="button"
                onClick={() => {
                  if (onStartFocusSession) onStartFocusSession(activeMastery.title);
                  setConnectedToast(`Iniciando sesión de Deep Work para ${activeMastery.title}`);
                  setTimeout(() => setConnectedToast(null), 3500);
                }}
                className={`p-3 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col justify-between gap-2 ${
                  isLight ? 'bg-white border-zinc-200 hover:border-blue-400 text-zinc-800' : 'bg-white/5 border-white/10 hover:border-blue-500/40 text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-amber-400 flex items-center gap-1">
                    <Flame size={11} />
                    Modo Enfoque
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono">25-50 min</span>
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight truncate">
                    Sesión de Estudio
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                    Cronómetro Pomodoro con sonido binaural
                  </p>
                </div>
                <div className="text-[10px] font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                  <span>Iniciar Temporizador</span>
                  <ArrowRight size={11} />
                </div>
              </button>

              {/* 3. Recompensas de Rango */}
              <div className={`p-3 rounded-xl border text-left flex flex-col justify-between gap-2 ${
                isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-zinc-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 flex items-center gap-1">
                    <Award size={11} />
                    Insignia & Título
                  </span>
                  <span className="text-[9px] text-zinc-500 font-mono">{activePct}%</span>
                </div>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight truncate">
                    {activeMastery.title.split(' ')[0]} Master
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                    Desbloquea títulos de avatar y gemas al graduarte
                  </p>
                </div>
                <div className="text-[10px] font-bold text-purple-400 flex items-center gap-1 mt-0.5">
                  <span>Recompensa de Graduación</span>
                </div>
              </div>
            </div>

            {connectedToast && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 py-1.5 px-3 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2"
              >
                <Check size={14} />
                <span>{connectedToast}</span>
              </motion.div>
            )}
          </div>

          {/* Selector de Unidades estilo Hito (U1, U2, U3) */}
          <div className="space-y-3">
            <div className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
              Unidades del Sendero
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {units.map((unit, uIdx) => {
                const isSelected = unit.level === selectedUnitLevel;
                const completedInUnit = unit.classes.filter(c => completedClasses.includes(c.id)).length;
                const isUnitCompleted = completedInUnit === unit.classes.length && unit.classes.length > 0;
                const isUnitActive = !isUnitCompleted && (
                  unit.classes.some(c => c.id === nextTargetClassId) || 
                  (uIdx === 0 && completedInUnit === 0)
                );

                return (
                  <button
                    key={`unit-pill-${unit.level}`}
                    type="button"
                    onClick={() => setSelectedUnitLevel(unit.level)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-blue-600/15 border-blue-500 text-white shadow-md shadow-blue-500/10 ring-1 ring-blue-500/30'
                        : (isLight ? 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700' : 'bg-white/5 hover:bg-white/10 border-white/5 text-zinc-300')
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 border ${
                        isUnitCompleted
                          ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                          : isUnitActive
                          ? 'bg-blue-600 text-white border-blue-500'
                          : (isLight ? 'bg-zinc-200 border-zinc-300 text-zinc-600' : 'bg-white/5 border-white/10 text-zinc-400')
                      }`}>
                        {isUnitCompleted ? <Check size={14} /> : `U${unit.level}`}
                      </div>

                      <div className="min-w-0">
                        <span className="text-xs font-black uppercase tracking-tight truncate block">
                          {unit.levelName}
                        </span>
                        <span className="text-[10px] text-zinc-400 block font-medium">
                          {completedInUnit}/{unit.classes.length} hechas
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isUnitCompleted ? (
                        <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                          <Check size={12} />
                          <span>Completada</span>
                        </span>
                      ) : isUnitActive ? (
                        <span className="text-[10px] font-bold text-blue-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          <span>En curso</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-zinc-500 flex items-center gap-1">
                          <Lock size={10} />
                          <span>Próxima</span>
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. RUTA ESTILO DUOLINGO (NODOS 3D / STEPPING STONES)       */}
          {/* ========================================================= */}
          {currentViewedUnit && (
            <div className={`rounded-2xl border p-6 sm:p-8 relative ${
              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#090b12] border-white/5'
            }`}>
              
              {/* Encabezado de la unidad seleccionada */}
              <div className="text-center max-w-md mx-auto mb-8">
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                  Unidad {currentViewedUnit.level} • {currentViewedUnit.levelName}
                </span>
                <h4 className="text-sm sm:text-base font-black uppercase tracking-tight mt-2">
                  Camino de Lecciones Interactivas
                </h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Avanza por cada nodo para dominar el tema y desbloquear el desafío final.
                </p>
              </div>

              {/* Contenedor del Sendero Duolingo con línea conectora central */}
              <div className="relative py-4 max-w-lg mx-auto flex flex-col items-center">
                
                {/* Línea conectora de fondo */}
                <div 
                  className={`absolute top-8 bottom-16 w-1 rounded-full pointer-events-none ${
                    isLight ? 'bg-zinc-200' : 'bg-white/10'
                  }`}
                />

                {/* Nodos de Clases */}
                <div className="space-y-6 w-full flex flex-col items-center relative z-10">
                  {currentViewedUnit.classes.map((cls, cIdx) => {
                    const isCompleted = completedClasses.includes(cls.id);
                    const isNext = cls.id === nextTargetClassId || (!completedClasses.length && currentViewedUnit.level === 1 && cIdx === 0);
                    const originalIdx = activeMastery.classes.findIndex(c => c.id === cls.id);
                    const isLocked = !isCompleted && !isNext && originalIdx > 0 && !completedClasses.includes(activeMastery.classes[originalIdx - 1]?.id);

                    const xOffset = getNodeOffset(cIdx);
                    const formattedNum = String(cIdx + 1).padStart(2, '0');

                    return (
                      <div 
                        key={cls.id}
                        className="relative flex flex-col items-center my-2"
                        style={{ transform: `translateX(${xOffset}px)` }}
                      >
                        {/* Tooltip flotante animado para el nodo en progreso actual */}
                        {isNext && (
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute -top-8 px-3 py-1 bg-white text-zinc-950 text-[10px] font-black uppercase tracking-wider rounded-xl shadow-xl whitespace-nowrap z-20 border border-zinc-200 flex items-center gap-1"
                          >
                            <Sparkles size={12} className="text-amber-500 fill-amber-500" />
                            <span>¡CONTINUAR!</span>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white" />
                          </motion.div>
                        )}

                        {/* Halo pulsante circular del nodo actual */}
                        {isNext && (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.15, 0.6] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -inset-2 rounded-full border-2 border-blue-400 pointer-events-none"
                          />
                        )}

                        {/* Botón Circular 3D Estilo Duolingo */}
                        <motion.button
                          whileHover={{ scale: isLocked ? 1 : 1.08, y: isLocked ? 0 : -2 }}
                          whileTap={{ scale: isLocked ? 1 : 0.94, y: isLocked ? 0 : 2 }}
                          disabled={isLocked}
                          onClick={() => onLaunchClass(cls, activeMastery)}
                          className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full flex flex-col items-center justify-center relative select-none transition-all border-b-4 active:border-b-0 cursor-pointer shadow-lg ${
                            isCompleted
                              ? 'bg-blue-600 hover:bg-blue-500 border-blue-800 text-white shadow-blue-500/20'
                              : isNext
                              ? 'bg-blue-500 hover:bg-blue-400 border-blue-700 text-white shadow-xl shadow-blue-500/40 ring-4 ring-blue-500/20'
                              : isLocked
                              ? (isLight 
                                  ? 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed' 
                                  : 'bg-zinc-900 border-zinc-950 text-zinc-600 cursor-not-allowed')
                              : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-800 text-white'
                          }`}
                        >
                          {isCompleted ? (
                            <Check size={24} strokeWidth={3.5} />
                          ) : isNext ? (
                            <Play size={22} className="fill-white translate-x-0.5" />
                          ) : isLocked ? (
                            <Lock size={18} />
                          ) : (
                            <Star size={20} className="fill-white" />
                          )}

                          <span className="text-[9px] font-black uppercase mt-0.5 tracking-tight">
                            {isCompleted ? 'Listo' : isNext ? 'Iniciar' : isLocked ? formattedNum : formattedNum}
                          </span>
                        </motion.button>

                        {/* Título de la clase bajo el nodo */}
                        <div className="mt-2 text-center max-w-[140px]">
                          <span className={`text-[11px] font-bold tracking-tight block truncate ${
                            isCompleted 
                              ? 'text-blue-400 font-black' 
                              : isNext 
                              ? 'text-white font-black' 
                              : isLight ? 'text-zinc-600' : 'text-zinc-400'
                          }`}>
                            <span className="font-mono mr-1 text-[10px] opacity-60">{formattedNum}.</span>
                            {cls.title.replace(/^Clase \d+:\s*/, '')}
                          </span>
                          <span className={`text-[10px] font-medium block ${
                            isCompleted ? 'text-emerald-400' : isNext ? 'text-blue-400' : 'text-zinc-500'
                          }`}>
                            {isCompleted ? '✓ Completada' : isNext ? '▶ Por hacer' : isLocked ? 'Bloqueada' : 'Disponible'}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* COFRE / DESAFÍO DE UNIDAD (HITO FINAL DEL CAMINO DUOLINGO) */}
                  <div className="pt-6 flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className={`p-4 sm:p-5 rounded-3xl border text-center max-w-sm flex flex-col items-center gap-2.5 shadow-xl ${
                        isLight 
                          ? 'bg-amber-50/90 border-amber-200 text-zinc-900' 
                          : 'bg-gradient-to-b from-amber-500/10 to-amber-600/5 border-amber-500/30 text-white'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-black">
                        <Trophy size={24} />
                      </div>

                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                          Desafío de la Unidad {currentViewedUnit.level}
                        </span>
                        <h5 className="text-xs sm:text-sm font-black uppercase tracking-tight mt-0.5">
                          Examen Práctico de Dominio
                        </h5>
                        <p className="text-[11px] text-zinc-400 mt-0.5">
                          Demuestra lo aprendido y gana puntos de maestría.
                        </p>
                      </div>

                      <button
                        onClick={() => onLaunchChallenge(currentViewedUnit, activeMastery)}
                        className="w-full mt-1 py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Trophy size={13} />
                        <span>Comenzar Desafío</span>
                        <ArrowRight size={13} />
                      </button>
                    </motion.div>
                  </div>
                </div>

              </div>

              {/* Botón inferior para abrir el visor curricular completo */}
              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-zinc-500">
                  ¿Prefieres ver la vista en lista o pantalla completa?
                </span>

                <button
                  onClick={() => onOpenFullCourse(activeMastery)}
                  className={`text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isLight ? 'text-zinc-600 hover:text-blue-600' : 'text-zinc-400 hover:text-blue-400'
                  }`}
                >
                  <span>Abrir vista expandida</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  );
};
