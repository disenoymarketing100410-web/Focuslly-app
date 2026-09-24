import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Shield, Sparkles, Zap, ArrowRight, CheckCircle2, 
  Clock, Flame, Trophy, Lock, Unlock, Play, RotateCcw, AlertTriangle,
  Layers, Smartphone, Check, HelpCircle
} from 'lucide-react';

export function ProductivityPillars3Col({ onFinish, onSelectTab }) {
  // 1. Profile Persona switcher
  const [profile, setProfile] = useState('estudiante');

  // Pillar 1: Coach Simulation State
  const [isSimulatingImpulse, setIsSimulatingImpulse] = useState(false);
  const [frictionCountdown, setFrictionCountdown] = useState(5);
  const [coachOutcome, setCoachOutcome] = useState(null); // 'defused' | 'proceeded' | null

  // Pillar 2: Shield Simulation State
  const [selectedApp, setSelectedApp] = useState('Instagram');
  const [frictionDelay, setFrictionDelay] = useState(15); // seconds
  const [isShieldActive, setIsShieldActive] = useState(true);
  const [showShieldMock, setShowShieldMock] = useState(false);

  // Pillar 3: Gamification State
  const [xp, setXp] = useState(1450);
  const [gems, setGems] = useState(42);
  const [streak, setStreak] = useState(14);
  const [xpAnimation, setXpAnimation] = useState(false);

  // Persona configuration
  const PROFILES = {
    estudiante: {
      tag: 'Modo Estudiante',
      focusTarget: 'Exámenes & Active Recall',
      recoveredGoal: '4.5h / día',
      p1Benefit: 'Frena el scroll durante jornadas de estudio pesado.',
      p2Benefit: 'Bloqueo riguroso de redes en horario de biblioteca.',
      p3Benefit: 'Sube de nivel estudiando y rinde parciales con calma.',
    },
    profesional: {
      tag: 'Modo Deep Work',
      focusTarget: 'Programación & Análisis',
      recoveredGoal: '3.8h / día',
      p1Benefit: 'Elimina el tab-switching compulsivo entre código y noticias.',
      p2Benefit: 'Silencia la urgencia de responder chats no prioritarios.',
      p3Benefit: 'Racha de bloques de 50 minutos de flujo ininterrumpido.',
    },
    creador: {
      tag: 'Modo Creador',
      focusTarget: 'Escritura & Producción',
      recoveredGoal: '4.2h / día',
      p1Benefit: 'Evita la evasión digital ante el síndrome de la hoja en blanco.',
      p2Benefit: 'Aísla la mente del consumo pasivo de contenido ajeno.',
      p3Benefit: 'Monetiza tu claridad mental con proyectos terminados.',
    },
  };

  // Friction Countdown Effect for Pillar 1
  useEffect(() => {
    let timer;
    if (isSimulatingImpulse && frictionCountdown > 0) {
      timer = setInterval(() => {
        setFrictionCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSimulatingImpulse, frictionCountdown]);

  const handleStartImpulseSimulation = () => {
    setIsSimulatingImpulse(true);
    setFrictionCountdown(5);
    setCoachOutcome(null);
  };

  const handleDefuseImpulse = () => {
    setCoachOutcome('defused');
    setIsSimulatingImpulse(false);
    // Reward XP
    setXp((prev) => prev + 25);
    setXpAnimation(true);
    setTimeout(() => setXpAnimation(false), 1200);
  };

  const handleProceedImpulse = () => {
    setCoachOutcome('proceeded');
    setIsSimulatingImpulse(false);
  };

  const handleCompleteSession = () => {
    setXp((prev) => prev + 150);
    setGems((prev) => prev + 1);
    setStreak((prev) => prev + 1);
    setXpAnimation(true);
    setTimeout(() => setXpAnimation(false), 1500);
  };

  const currentProfileData = PROFILES[profile];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* SECTION HEADER WITH PERSONA SWITCHER */}
      <div className="space-y-6 mb-12 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
              Ecosistema Integral • 3 Pilares Pro
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Los Tres Pilares de tu <br />
              <span className="text-zinc-500">Alto Rendimiento</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
              Cada pilar está diseñado con rigor neurobiológico. Prueba las herramientas interactivas de cada columna para entender cómo funcionan en tiempo real.
            </p>
          </div>

          {/* Profile Switcher Pills */}
          <div className="flex items-center justify-center md:justify-end gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
            {Object.keys(PROFILES).map((key) => {
              const isSelected = profile === key;
              return (
                <button
                  key={key}
                  onClick={() => setProfile(key)}
                  className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black shadow-lg scale-[1.02]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {PROFILES[key].tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Persona Active Target Banner */}
        <div className="flex flex-wrap items-center gap-4 py-2 px-4 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="font-bold text-white uppercase">{currentProfileData.tag}:</span>
            <span>Objetivo Central: <strong className="text-zinc-200">{currentProfileData.focusTarget}</strong></span>
          </div>
          <div className="hidden sm:block w-[1px] h-3 bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-white" />
            <span>Meta de Tiempo Recuperado: <strong className="text-white font-mono">{currentProfileData.recoveredGoal}</strong></span>
          </div>
        </div>
      </div>

      {/* 3 PRO COLUMNS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        
        {/* =================================================================== */}
        {/* COLUMNA 1: COACH DE CONDUCTA IA (NEURO-INTERVENCIÓN) */}
        {/* =================================================================== */}
        <div className="bg-zinc-950/80 border border-white/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-white/30 transition-all">
          <div className="space-y-4">
            {/* Pillar Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[9px] font-black uppercase tracking-widest">
                <Brain size={12} />
                <span>Pilar 01 • Neurociencia</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">
                Coach IA
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                Coach de Conducta
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {currentProfileData.p1Benefit} Intercepta el reflejo de abrir apps tóxicas activando 5 segundos de consciencia prefrontal.
              </p>
            </div>

            {/* Metric Box */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-2xl font-mono font-black text-white">84%</span>
                <span className="text-[10px] text-zinc-400 block font-medium">Impulsos cancelados</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-zinc-300">0 Notifs</span>
                <span className="text-[9px] text-zinc-500 uppercase block">Cero spam</span>
              </div>
            </div>

            {/* Interactive Simulation Gadget */}
            <div className="p-4 rounded-2xl bg-black border border-white/15 space-y-3">
              <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block">
                Simulador de Impulso Compulsivo
              </span>

              {!isSimulatingImpulse && !coachOutcome && (
                <div className="space-y-2">
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    Pulsa para simular que abres Instagram de manera automática:
                  </p>
                  <button
                    onClick={handleStartImpulseSimulation}
                    className="w-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 font-black text-[10px] uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Smartphone size={13} />
                    <span>Simular Abrir Instagram</span>
                  </button>
                </div>
              )}

              {isSimulatingImpulse && (
                <div className="space-y-3 py-1">
                  <div className="flex items-center justify-between text-[11px] text-white font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      <span>Fricción Guiada Activa</span>
                    </span>
                    <span className="font-mono text-base">{frictionCountdown}s</span>
                  </div>

                  <p className="text-[10px] text-zinc-300 italic bg-white/5 p-2 rounded-lg border border-white/10">
                    “Inhala hondo. ¿Esta acción te ayuda con tu meta o es solo aburrimiento?”
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={handleDefuseImpulse}
                      className="bg-white text-black font-black text-[9px] uppercase tracking-wider py-2 px-2 rounded-lg cursor-pointer hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1"
                    >
                      <Check size={12} />
                      <span>Volver al Foco</span>
                    </button>
                    <button
                      onClick={handleProceedImpulse}
                      className="bg-transparent hover:bg-white/10 border border-white/20 text-zinc-400 font-bold text-[9px] uppercase tracking-wider py-2 px-2 rounded-lg cursor-pointer transition-colors"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              )}

              {coachOutcome && (
                <div className="space-y-2 py-1">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    {coachOutcome === 'defused' ? (
                      <span className="text-white flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-white" />
                        <span>¡Impulso desactivado con éxito! (+25 XP)</span>
                      </span>
                    ) : (
                      <span className="text-zinc-400 flex items-center gap-1.5">
                        <AlertTriangle size={14} />
                        <span>Continuaste con consciencia plena.</span>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleStartImpulseSimulation}
                    className="text-[9px] font-bold text-zinc-400 hover:text-white uppercase tracking-wider cursor-pointer underline block"
                  >
                    Probar otra vez
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => onSelectTab && onSelectTab('productividad')}
              className="w-full bg-transparent hover:bg-white/10 border border-white/20 text-white font-black text-[11px] uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explorar en Productividad</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* COLUMNA 2: BLINDAJE DE APLICACIONES (FRICCIÓN ACTIVA) */}
        {/* =================================================================== */}
        <div className="bg-zinc-950/80 border border-white/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-white/30 transition-all">
          <div className="space-y-4">
            {/* Pillar Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[9px] font-black uppercase tracking-widest">
                <Shield size={12} />
                <span>Pilar 02 • Blindaje</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">
                Anti-Dopamina
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                Bloqueador Firme
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {currentProfileData.p2Benefit} No confíes solo en tu voluntad. Ponle un cerrojo elegante a las fugas de tiempo.
              </p>
            </div>

            {/* Metric Box */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-2xl font-mono font-black text-white">-62%</span>
                <span className="text-[10px] text-zinc-400 block font-medium">Uso de redes pasivas</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-zinc-300">Estricto</span>
                <span className="text-[9px] text-zinc-500 uppercase block">Sin bypass fácil</span>
              </div>
            </div>

            {/* Interactive Shield Simulator */}
            <div className="p-4 rounded-2xl bg-black border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block">
                  Configurador de Blindaje
                </span>
                <button
                  onClick={() => setIsShieldActive(!isShieldActive)}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-black cursor-pointer transition-colors ${
                    isShieldActive ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {isShieldActive ? 'ESCUDO ON' : 'ESCUDO OFF'}
                </button>
              </div>

              {/* App selector pills */}
              <div className="grid grid-cols-4 gap-1">
                {['Instagram', 'TikTok', 'YouTube', 'X'].map((app) => (
                  <button
                    key={app}
                    onClick={() => setSelectedApp(app)}
                    className={`py-1.5 px-1 rounded-lg text-[9px] font-bold uppercase transition-all cursor-pointer text-center ${
                      selectedApp === app
                        ? 'bg-white text-black font-black'
                        : 'bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>

              {/* Friction Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Demora de Fricción:</span>
                  <span className="font-mono text-white font-bold">{frictionDelay} segundos</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="5"
                  value={frictionDelay}
                  onChange={(e) => setFrictionDelay(Number(e.target.value))}
                  className="w-full accent-white h-1 bg-white/20 rounded cursor-pointer"
                />
              </div>

              {/* Shield Trigger Preview Button */}
              <button
                onClick={() => setShowShieldMock(!showShieldMock)}
                className="w-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 font-black text-[10px] uppercase tracking-wider py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {showShieldMock ? <Unlock size={12} /> : <Lock size={12} />}
                <span>{showShieldMock ? 'Ocultar Pantalla de Bloqueo' : `Ver Bloqueo de ${selectedApp}`}</span>
              </button>

              {/* Mock Screen if open */}
              {showShieldMock && (
                <div className="p-3 rounded-xl bg-zinc-900 border border-white/20 space-y-2 text-center animate-fadeIn">
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 mx-auto flex items-center justify-center">
                    <Lock size={14} className="text-white" />
                  </div>
                  <h5 className="text-[11px] font-black uppercase text-white">
                    {selectedApp} Bloqueado
                  </h5>
                  <p className="text-[9px] text-zinc-400">
                    Requiere pausa de {frictionDelay}s para abrir. Respira y mantén tu enfoque.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => onSelectTab && onSelectTab('mas_info')}
              className="w-full bg-transparent hover:bg-white/10 border border-white/20 text-white font-black text-[11px] uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ver Ciencia del Bloqueo</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* COLUMNA 3: GAMIFICACIÓN INVERSA (XP, GEMAS Y RACHA) */}
        {/* =================================================================== */}
        <div className="bg-zinc-950/80 border border-white/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group hover:border-white/30 transition-all">
          <div className="space-y-4">
            {/* Pillar Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[9px] font-black uppercase tracking-widest">
                <Sparkles size={12} />
                <span>Pilar 03 • Progresión</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase">
                Recompensa Real
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                Gamificación Inversa
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                {currentProfileData.p3Benefit} Otras apps te premian por quedarte dentro de la pantalla. Focusly te premia por avanzar en la vida real.
              </p>
            </div>

            {/* Metric Box */}
            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-2xl font-mono font-black text-white">+4.2h</span>
                <span className="text-[10px] text-zinc-400 block font-medium">Horas diarias devueltas</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-zinc-300">Vitalicio</span>
                <span className="text-[9px] text-zinc-500 uppercase block">Logros permanentes</span>
              </div>
            </div>

            {/* Interactive Gamification Dashboard */}
            <div className="p-4 rounded-2xl bg-black border border-white/15 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block">
                  Panel de Rango & XP en Vivo
                </span>
                <span className="text-[9px] font-mono font-black text-white bg-white/10 px-2 py-0.5 rounded">
                  RANGO: MONJE NIVEL 3
                </span>
              </div>

              {/* XP Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-400">Progreso a Nivel 4:</span>
                  <span className="font-mono text-white font-bold">{xp} / 2,000 XP</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${Math.min(100, (xp / 2000) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Badges and Streak Row */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Flame size={16} className="text-white fill-white" />
                  <div>
                    <span className="text-[11px] font-mono font-black text-white">{streak} Días</span>
                    <span className="text-[8px] text-zinc-500 uppercase block">Racha invicta</span>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <Trophy size={16} className="text-white" />
                  <div>
                    <span className="text-[11px] font-mono font-black text-white">{gems} Gemas</span>
                    <span className="text-[8px] text-zinc-500 uppercase block">Insignias 3D</span>
                  </div>
                </div>
              </div>

              {/* Action Button: Simulate Pomodoro */}
              <button
                onClick={handleCompleteSession}
                className={`w-full font-black text-[10px] uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  xpAnimation 
                    ? 'bg-white text-black scale-95' 
                    : 'bg-white/10 hover:bg-white text-white hover:text-black border border-white/20'
                }`}
              >
                <Play size={12} className="fill-current" />
                <span>{xpAnimation ? '¡+150 XP y +1 Gema Sumados!' : 'Completar Sesión Pomodoro (25m)'}</span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => onSelectTab && onSelectTab('focusly_pro')}
              className="w-full bg-transparent hover:bg-white/10 border border-white/20 text-white font-black text-[11px] uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Ver Planes & Rango Pro</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>

      {/* VERIFIED OUTCOMES BOTTOM BAR */}
      <div className="mt-12 p-6 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase tracking-wider text-white">
              Garantía de Satisfacción de 30 Días
            </h4>
            <p className="text-xs text-zinc-400">
              Si en 30 días no recuperas al menos 2 horas de concentración al día, te reembolsamos sin preguntas.
            </p>
          </div>
        </div>

        <button
          onClick={onFinish}
          className="w-full md:w-auto bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-full shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
        >
          <span>Comenzar Ahora Mismo</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </section>
  );
}
