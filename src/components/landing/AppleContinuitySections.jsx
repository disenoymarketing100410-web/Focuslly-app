import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FocuslyIcon 
} from '../FocuslyLogo';
import {
  Sparkles, CheckCircle2, Target, Calendar, CheckSquare,
  Shield, Clock, Flame, Crown, Zap, BarChart3, Lock,
  Brain, Gem, Trophy, ChevronRight, User, Smartphone,
  Activity, ArrowRight, Layers, Sliders, Check, Compass,
  SlidersHorizontal, Award, ShieldCheck, ArrowUpRight, TrendingUp
} from 'lucide-react';

const focuslySlogan = '/focusly-slogan.svg';

export function AppleContinuitySections({ onFinish, onSelectTab }) {
  // State for Section 1: Productivity Elements Switcher
  const [activeProdFeature, setActiveProdFeature] = useState('habitos');

  // State for Section 2: Productivity Experience (Plan → Focus → Act → Improve)
  const [activeStage, setActiveStage] = useState('plan');

  // State for Section 4: More Information Expanded Block
  const [selectedPillar, setSelectedPillar] = useState('focus');

  // Productivity Features Data
  const productivityFeatures = [
    { 
      id: 'habitos', 
      name: 'Hábitos', 
      icon: CheckCircle2,
      tag: 'Constancia Diaria',
      title: 'Hábitos anclados a tu rutina.',
      desc: 'Sistemas que eliminan la fatiga de decisión. Registra micro-hábitos con un solo tap y protege tu progreso.',
      preview: {
        metric: '98% Adherencia',
        sub: '14 días seguidos',
        items: ['Lectura profunda 25m', 'Cero redes antes de las 11:00 AM', 'Caminar 20 minutos']
      }
    },
    { 
      id: 'calendario', 
      name: 'Calendario', 
      icon: Calendar,
      tag: 'Time Boxing',
      title: 'Bloques de tiempo intencionales.',
      desc: 'Asigna momentos exactos para el trabajo profundo. Si una tarea no tiene hora asignada, se convierte en distracción.',
      preview: {
        metric: '4 Bloques Hoy',
        sub: '3.5h Deep Work programadas',
        items: ['09:00 - 10:30 Estudio Neurobiología', '11:00 - 12:30 Redacción de Tesis', '16:00 - 17:00 Organización']
      }
    },
    { 
      id: 'tareas', 
      name: 'Tareas', 
      icon: CheckSquare,
      tag: 'Prioridad 80/20',
      title: 'Solo lo que mueve la aguja.',
      desc: 'Matriz de impacto que separa lo urgente de lo verdaderamente importante, sin listas infinitas abrumadoras.',
      preview: {
        metric: '3 Prioridades',
        sub: '2 de 3 completadas hoy',
        items: ['Finalizar informe trimestral (Alta prioridad)', 'Revisión código módulo 4', 'Definir objetivos de la semana']
      }
    },
    { 
      id: 'desafios', 
      name: 'Desafíos', 
      icon: Target,
      tag: 'Retos de 7 Días',
      title: 'Desafíos estructurados con fin claro.',
      desc: 'Programas de choque diseñados para resetear tus receptores de dopamina y elevar tu tolerancia al esfuerzo mental.',
      preview: {
        metric: 'Dopamine Reset',
        sub: 'Día 5 de 7 en curso',
        items: ['Sin videos cortos (Reels/TikTok)', 'Sin azúcar añadida post-almuerzo', 'Desconexión digital 22:00']
      }
    },
    { 
      id: 'limites', 
      name: 'Límites', 
      icon: Shield,
      tag: 'Fricción Psicológica',
      title: 'Barreras que salvan tu atención.',
      desc: 'Bloqueador con pausa consciente de 20 segundos que interrumpe el bucle inconsciente de abrir redes por reflejo.',
      preview: {
        metric: '42 Intentos Frenados',
        sub: '1h 45m ahorradas hoy',
        items: ['Instagram (Bloqueado)', 'TikTok (0 min permitidos)', 'YouTube Shorts (Desactivado)']
      }
    },
    { 
      id: 'progreso', 
      name: 'Progreso Diario', 
      icon: BarChart3,
      tag: 'Métricas Reales',
      title: 'Claridad total sobre tu rendimiento.',
      desc: 'Visualiza las horas netas que le ganaste al scroll y comprende tus patrones biológicos de mayor concentración.',
      preview: {
        metric: '+3.8 Horas Libres',
        sub: 'Comparado con tu promedio previo',
        items: ['Pico de foco: 09:30 - 11:45 AM', 'Tasa de distracción: 4.2%', 'Puntaje cognitivo: 94/100']
      }
    },
    { 
      id: 'rachas', 
      name: 'Rachas', 
      icon: Flame,
      tag: 'Inercia Imparable',
      title: 'El poder del interés compuesto personal.',
      desc: 'Cada día consecutivo multiplica tus ganancias de XP y forja una identidad de disciplina inquebrantable.',
      preview: {
        metric: 'Racha de 14 Días',
        sub: 'Multiplicador ×1.5 activo',
        items: ['1 Congelador de racha disponible', 'Siguiente rango: Racha 21 Días', 'Top 5% de constancia global']
      }
    },
    { 
      id: 'objetivos', 
      name: 'Objetivos', 
      icon: Zap,
      tag: 'Visión a Largo Plazo',
      title: 'Metas grandes divididas en micro-pasos.',
      desc: 'Convierte aspiraciones abstractas en acciones concretas diarias con seguimiento porcentual automatizado.',
      preview: {
        metric: '76% Completado',
        sub: 'Aprobar examen con honores',
        items: ['14/18 capítulos dominados', '32 sesiones de pomodoro registradas', 'Meta estimada: 12 días']
      }
    }
  ];

  // Productivity Experience Cycle (Plan → Focus → Act → Improve)
  const experienceStages = [
    {
      id: 'plan',
      number: '01',
      title: 'Plan',
      subtitle: 'Diseña tu día antes de que el mundo lo decida por ti.',
      description: 'Define tus 3 bloques de foco primordiales la noche anterior o a primera hora de la mañana, eliminando la incertidumbre.',
      badge: 'Claridad Matutina',
      visual: {
        header: 'Morning Blueprint',
        task: 'Deep Work: Análisis de Casos',
        time: '09:00 - 10:45 AM',
        status: 'Programado y blindado'
      }
    },
    {
      id: 'focus',
      number: '02',
      title: 'Focus',
      subtitle: 'Entra en el santuario de concentración.',
      description: 'Activa el temporizador de foco con pantalla negra, audio binaural de 40Hz y bloqueo instantáneo de aplicaciones evasivas.',
      badge: 'Inmersión Absoluta',
      visual: {
        header: 'Sesión en Curso',
        task: 'Ondas Gamma 40Hz • Sonido Lluvia Suave',
        time: '45:00 Restantes',
        status: 'Bloqueador estricto activo'
      }
    },
    {
      id: 'act',
      number: '03',
      title: 'Act',
      subtitle: 'Ejecución con cero fricción mental.',
      description: 'Fluye sin saltar entre pestañas. Las tentaciones de revisar redes son neutralizadas con una pausa de reflexión de 20 segundos.',
      badge: 'Alto Rendimiento',
      visual: {
        header: 'Flujo Ininterrumpido',
        task: 'Redacción de Tesis y Bibliografía',
        time: '1/3 Bloques Completados',
        status: 'Cero interrupciones detectadas'
      }
    },
    {
      id: 'improve',
      number: '04',
      title: 'Improve',
      subtitle: 'Revisa métricas y consolida el hábito.',
      description: 'Observa tus horas recuperadas, suma XP a tu liga semanal, reclama gemas y desconéctate con la mente en total serenidad.',
      badge: 'Satisfacción y Recarga',
      visual: {
        header: 'Cierre de Jornada',
        task: '+3.5 Horas Ganadas a la Distracción',
        time: '+250 XP • Racha Protegida',
        status: 'Objetivos del día cumplidos'
      }
    }
  ];

  // More Information Pillars
  const moreInfoPillars = [
    {
      id: 'focus',
      title: 'Focus',
      subtitle: 'Recupera tu capacidad de concentrarte.',
      tag: 'Neurociencia Aplicada',
      description: 'Vivimos en una economía diseñada para fragmentar tu atención. Focusly actúa como un escudo cognitivo que restablece tu capacidad de inmersión profunda.',
      bullets: [
        'Temporizador sobrio con estética monocromática sin estímulos innecesarios.',
        'Audio generativo sintetizado en frecuencias alfa y gamma para facilitar el estado de flujo.',
        'Barrera psicológica con 20 segundos de fricción para romper hábitos automáticos de evasión.'
      ],
      stat: '45m',
      statLabel: 'Duración óptima de ciclo cognitivo'
    },
    {
      id: 'organize',
      title: 'Organize',
      subtitle: 'Organiza tus hábitos, tareas y tiempo.',
      tag: 'Estructura Intencional',
      description: 'La productividad no consiste en hacer más cosas apresuradas, sino en dedicar bloques deliberados a lo que de verdad importa.',
      bullets: [
        'Time-boxing visual para agendar tus tareas más exigentes en tu pico de energía mental.',
        'Gestión de hábitos diarios con seguimiento de racha y congeladores de protección.',
        'Listas de alta prioridad 80/20 que eliminan el agobio de las tareas triviales.'
      ],
      stat: '+28h',
      statLabel: 'Tiempo neto ganado al mes por usuario'
    },
    {
      id: 'grow',
      title: 'Grow',
      subtitle: 'Aprende, mejora y desarrolla nuevas habilidades.',
      tag: 'Mentoría & Didáctica',
      description: 'La disciplina se aprende. Focusly incluye rutas didácticas interactivas y mentores filosóficos inspirados en el estoicismo y la ciencia del aprendizaje.',
      bullets: [
        'Coaches conductuales (Marco Aurelio, Séneca, Richard Feynman) con reflexiones sobrias.',
        'Maestrías didácticas con módulos cortos y quizzes de autoevaluación.',
        'Desafíos guiados para superar la procrastinación, el perfeccionismo y el burnout.'
      ],
      stat: '8+',
      statLabel: 'Maestrías y senderos de desarrollo'
    },
    {
      id: 'connect',
      title: 'Connect',
      subtitle: 'Comparte progreso y experiencias con la comunidad.',
      tag: 'Comunidad Silenciosa',
      description: 'Una red pensada para inspirarte a avanzar, sin algoritmos tóxicos, sin feeds de recomendaciones y sin comparación vacía.',
      bullets: [
        'Ligas semanales de enfoque donde asciendes exclusivamente por horas dedicadas a estudiar.',
        'Espacios de estudio silenciosos para sentirte acompañado en tus jornadas de trabajo.',
        'Foro minimalista enfocado en libros, técnicas de productividad y victorias personales.'
      ],
      stat: '100%',
      statLabel: 'Libre de algoritmos y anuncios invasivos'
    }
  ];

  // How Focusly Works Steps
  const howItWorksSteps = [
    {
      step: '01',
      title: 'Choose your goal',
      desc: 'Define con exactitud qué quieres lograr: aprobar tus exámenes, avanzar un proyecto o recuperar tu tiempo libre.',
      detail: 'Elige tu enfoque principal y tu nivel actual de disciplina.'
    },
    {
      step: '02',
      title: 'Take the challenge',
      desc: 'Inicia un desafío guiado como "Dopamine Detox 7D" o "Mañanas Sin Pantalla" para romper la inercia del scroll.',
      detail: 'Misiones cortas con recompensas claras de XP y diamantes.'
    },
    {
      step: '03',
      title: 'Build your routine',
      desc: 'Estructura tus hábitos indispensables y protege tus bloques de estudio en el calendario con límites estrictos.',
      detail: 'La fricción de 20 segundos evitará que abras apps distractivas.'
    },
    {
      step: '04',
      title: 'Keep growing',
      desc: 'Suma puntos de experiencia, asciende de liga semanal, desbloquea temas exclusivos y celebra victorias reales.',
      detail: 'Transforma la disciplina en una segunda naturaleza permanente.'
    }
  ];

  // Focusly Pro Features
  const proFeatures = [
    {
      icon: Target,
      title: 'Advanced Focus',
      desc: 'Modos ultra-estrictos con anulación irrevocable de evasión, audios binaurales personalizados y bloqueo a nivel de sistema.'
    },
    {
      icon: Brain,
      title: 'Personalized Coaching',
      desc: 'Intervenciones inteligentes y personalizadas de tus coaches con IA adaptativa según tus momentos de mayor fatiga.'
    },
    {
      icon: Layers,
      title: 'Deep Learning',
      desc: 'Acceso completo a la biblioteca de maestrías cognitivas, técnicas de memorización y neurobiología de la atención.'
    },
    {
      icon: Award,
      title: 'Masteries',
      desc: 'Rutas de aprendizaje didácticas estilo Duolingo con exámenes de certificación interna y árboles de habilidad.'
    },
    {
      icon: BarChart3,
      title: 'Advanced Insights',
      desc: 'Informes detallados sobre tus picos de productividad, mapas de calor de atención y analítica predictiva de hábitos.'
    },
    {
      icon: Crown,
      title: 'Exclusive Rewards',
      desc: 'Avatares de titanio y obsidiana, temas monocromáticos puros y congeladores ilimitados de racha.'
    }
  ];

  return (
    <div className="space-y-32 sm:space-y-44 pt-16 pb-24 text-white">

      {/* ========================================================================= */}
      {/* 1. PRODUCTIVITY: "Productivity, reimagined." */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Apple Leading Headline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={12} className="text-white" />
            <span>Productividad sin fatiga mental</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase leading-[0.95] text-white">
            Productivity, <br />
            <span className="text-zinc-500">reimagined.</span>
          </h2>

          <div className="space-y-2 pt-2">
            <p className="text-lg sm:text-2xl text-white font-medium tracking-tight">
              Your time is your greatest resource.
            </p>
            <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-xl mx-auto leading-relaxed">
              Focusly helps you turn time into progress. No es solo un bloqueador de distracciones; es un sistema integral para tomar el mando de tus horas y cumplir tus metas.
            </p>
          </div>
        </div>

        {/* Clean Apple Interactive Element Switcher */}
        <div className="space-y-6">
          
          {/* 8 Pills Switcher (Responsive Horizontal Scrollable) */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {productivityFeatures.map((feat) => {
              const Icon = feat.icon;
              const isActive = activeProdFeature === feat.id;
              return (
                <button
                  key={feat.id}
                  onClick={() => setActiveProdFeature(feat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-white text-black border-white shadow-[0_4px_20px_rgba(255,255,255,0.25)]'
                      : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={14} />
                  <span>{feat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Feature Showcase Showcase Card (Apple Tech Mockup) */}
          {(() => {
            const current = productivityFeatures.find(f => f.id === activeProdFeature) || productivityFeatures[0];
            const Icon = current.icon;

            return (
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[36px] sm:rounded-[44px] bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/15 p-6 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Column: Editorial explanation */}
                    <div className="lg:col-span-6 space-y-5 text-left">
                      <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        <Icon size={13} className="text-white" />
                        <span>{current.tag}</span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                        {current.title}
                      </h3>

                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
                        {current.desc}
                      </p>

                      <div className="pt-2 flex items-center gap-4 text-xs font-semibold text-zinc-300">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={15} className="text-white" />
                          <span>Simple en la superficie</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={15} className="text-white" />
                          <span>Potente por dentro</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Live Applet Mockup Visual */}
                    <div className="lg:col-span-6">
                      <div className="rounded-3xl bg-black/80 border border-white/15 p-6 sm:p-7 shadow-2xl space-y-5 text-left">
                        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                          <div className="flex items-center gap-2">
                            <FocuslyIcon size={18} />
                            <span className="font-bold text-white tracking-wide">{current.name}</span>
                          </div>
                          <span className="font-mono text-zinc-400 text-[11px]">{current.preview.metric}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Estado actual</span>
                          <div className="text-xl font-black text-white">{current.preview.sub}</div>
                        </div>

                        <div className="space-y-2 pt-1">
                          {current.preview.items.map((item, idx) => (
                            <div 
                              key={idx}
                              className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-zinc-200"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                <span className="font-medium">{item}</span>
                              </div>
                              <Check size={13} className="text-zinc-400" />
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400">
                          <span>Sincronizado en tiempo real</span>
                          <button
                            onClick={onFinish}
                            className="text-white font-bold hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Interactuar</span>
                            <ArrowRight size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            );
          })()}

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 2. PRODUCTIVITY EXPERIENCE: Plan → Focus → Act → Improve */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Arquitectura de tu Día
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            Plan → Focus → Act → Improve
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Una secuencia diseñada con neurobiología para eliminar la fricción mental y transformar la intención en logros tangibles.
          </p>
        </div>

        {/* 4 Interactive Stage Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experienceStages.map((stage) => {
            const isSelected = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-6 ${
                  isSelected
                    ? 'bg-white/10 border-white text-white shadow-[0_10px_35px_rgba(255,255,255,0.12)]'
                    : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-zinc-500">{stage.number}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isSelected ? 'bg-white text-black border-white' : 'bg-white/5 text-zinc-400 border-white/10'
                    }`}>
                      {stage.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                    {stage.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-white' : 'text-zinc-500'}>
                    Ver interfaz
                  </span>
                  <ChevronRight size={14} className={isSelected ? 'text-white' : 'text-zinc-500'} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail of Selected Stage */}
        {(() => {
          const currentStage = experienceStages.find(s => s.id === activeStage) || experienceStages[0];
          return (
            <motion.div
              key={currentStage.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl bg-black/60 border border-white/15 p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 text-left">
                <div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    Etapa {currentStage.number} • Enfoque Sistemático
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                    {currentStage.title}: {currentStage.subtitle}
                  </h4>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold self-start sm:self-auto">
                  {currentStage.badge}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-left items-center">
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {currentStage.description}
                </p>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {currentStage.visual.header}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {currentStage.visual.task}
                  </div>
                  <div className="text-xs text-zinc-400 flex items-center justify-between pt-1">
                    <span>{currentStage.visual.time}</span>
                    <span className="text-white font-medium">{currentStage.visual.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}

      </section>

      {/* ========================================================================= */}
      {/* 3. SMART TIME MANAGEMENT: "Make time work for you." */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Control y Claridad Cognitiva
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-[0.95]">
            Make time <br />
            <span className="text-zinc-500">work for you.</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Comprende con absoluta nitidez cómo inviertes cada hora de tu día. Focusly te da el control soberano sobre tus dispositivos, sin sensación de vigilancia ni agobio.
          </p>
        </div>

        {/* Minimalist Tech Bento Grid (6 Dimensions of Time Control) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Screen Time Control */}
          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Tiempo de Pantalla</span>
              <Smartphone size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tight">-62%</div>
              <p className="text-xs text-zinc-400">De 5h 40m a 1h 45m de pantalla pasiva al día tras una semana.</p>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
              <div className="bg-white h-full w-[38%]" />
            </div>
          </div>

          {/* 2. Apps Auditing */}
          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Aplicaciones & Balance</span>
              <Layers size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tight">85 / 15</div>
              <p className="text-xs text-zinc-400">85% tiempo productivo vs 15% ocio consciente programado.</p>
            </div>
            <div className="flex gap-1.5 h-1.5">
              <div className="bg-white w-[85%] rounded-full" />
              <div className="bg-zinc-600 w-[15%] rounded-full" />
            </div>
          </div>

          {/* 3. Daily Limits */}
          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Límites Inteligentes</span>
              <Clock size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tight">Toque de Queda</div>
              <p className="text-xs text-zinc-400">Bloqueo automático de feeds a partir de las 22:00 para garantizar sueño reparador.</p>
            </div>
            <span className="inline-block text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
              Automático • Sin excepciones
            </span>
          </div>

          {/* 4. Friction Blocks */}
          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Fricción & Bloqueos</span>
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tight">20 Segundos</div>
              <p className="text-xs text-zinc-400">Pausa consciente que desactiva el 92% de los impulsos inconscientes de evasión.</p>
            </div>
            <span className="inline-block text-[11px] font-bold text-zinc-300 bg-white/5 px-2.5 py-0.5 rounded-full">
              Neurobiología de la corteza prefrontal
            </span>
          </div>

          {/* 5. Adaptive Recommendations */}
          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Recomendaciones</span>
              <Brain size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tight">Pico de 09:00</div>
              <p className="text-xs text-zinc-400">Detectamos tu mayor agudeza mental en la mañana y sugerimos blindar ese bloque.</p>
            </div>
            <span className="inline-block text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
              Sugerencia de Coach IA
            </span>
          </div>

          {/* 6. Measurable Progress */}
          <div className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Progreso Acumulado</span>
              <TrendingUp size={16} className="text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-black text-white tracking-tight">+28 Horas</div>
              <p className="text-xs text-zinc-400">Tiempo mensual rescatado para dedicar a proyectos personales y descanso real.</p>
            </div>
            <span className="inline-block text-[11px] font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
              Verificable en tu Dashboard
            </span>
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. MORE INFORMATION: "More about Focusly." (Editorial 4-Pillar Layout) */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Profundidad y Filosofía
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            More about Focusly.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            Cuatro pilares complementarios para una transformación duradera en tu concentración, organización y crecimiento.
          </p>
        </div>

        {/* 4 Big Minimalist Editorial Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreInfoPillars.map((pillar) => {
            const isChosen = selectedPillar === pillar.id;
            return (
              <div
                key={pillar.id}
                onClick={() => setSelectedPillar(pillar.id)}
                className={`p-8 sm:p-10 rounded-[36px] border transition-all cursor-pointer text-left space-y-6 flex flex-col justify-between ${
                  isChosen
                    ? 'bg-gradient-to-b from-white/[0.09] to-white/[0.03] border-white/25 shadow-2xl'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                      {pillar.tag}
                    </span>
                    <span className="text-2xl font-black text-white font-mono">{pillar.stat}</span>
                  </div>

                  <h3 className="text-3xl font-black text-white tracking-tight uppercase">
                    {pillar.title}
                  </h3>

                  <div className="text-sm font-semibold text-zinc-300">
                    {pillar.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    {pillar.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 size={14} className="text-white shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span>{pillar.statLabel}</span>
                  <span className="text-white font-bold inline-flex items-center gap-1">
                    Explorar <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 5. HOW FOCUSLY WORKS: 4 Smooth Sequential Steps */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
            Paso a Paso
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
            How Focusly works.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Un método simple de 4 etapas que no requiere horas de configuración.
          </p>
        </div>

        {/* 4 Steps Timeline (Clean Apple Minimalist) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4 text-left flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-2xl font-mono font-black text-zinc-500 block">
                  {item.step}
                </span>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-zinc-500 font-medium">
                {item.detail}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 6. FOCUSLY PRO: "Go beyond focus." (Technological Luxury Experience) */}
      {/* ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16">
        
        {/* Pro Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
            <Crown size={13} className="text-white" />
            <span>Membresía Exclusiva Focusly Pro</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-black tracking-tight text-white uppercase leading-[0.95]">
            Go beyond focus.
          </h2>

          <p className="text-base sm:text-xl text-zinc-300 font-medium tracking-tight">
            Unlock the full Focusly experience.
          </p>

          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-normal">
            Diseñado para estudiantes universitarios de alta exigencia, desarrolladores y profesionales que demandan el máximo rigor mental y cero concesiones.
          </p>
        </div>

        {/* FOCUSLY PRO VISUAL: Obsidian Metallic Pro Card Showcase */}
        <div className="relative max-w-3xl mx-auto rounded-[36px] sm:rounded-[48px] bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-black border border-white/20 p-8 sm:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_50px_rgba(255,255,255,0.05)] text-center backdrop-blur-2xl space-y-8">
          
          {/* Titanium Badge Card (Centerpiece) */}
          <div className="max-w-md mx-auto rounded-3xl bg-black border border-white/30 p-6 sm:p-8 shadow-[0_20px_60px_rgba(255,255,255,0.08)] space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FocuslyIcon size={24} />
                <span className="font-black text-white text-sm tracking-widest">FOCUSLY PRO</span>
              </div>
              <Crown size={18} className="text-white" />
            </div>

            <div className="space-y-1 pt-2">
              <div className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">Membresía Titular</div>
              <div className="text-lg font-bold text-white">Alto Rendimiento Cognitivo</div>
              <div className="text-xs text-zinc-400">Acceso ilimitado a todo el ecosistema de maestrías</div>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="font-mono text-zinc-500">Nº 2026-PRO-984</span>
              <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-bold text-[10px]">TIER BLACK</span>
            </div>
          </div>

          {/* Pro Value Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-2">
            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Sin Anuncios</span>
              <h5 className="font-bold text-white text-sm">Privacidad 100%</h5>
              <p className="text-[11px] text-zinc-400">Tus datos nunca se monetizan ni se comparten.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Coaches Ilimitados</span>
              <h5 className="font-bold text-white text-sm">IA Filosófica</h5>
              <p className="text-[11px] text-zinc-400">Consultas profundas con mentores estoicos.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Respaldo en Nube</span>
              <h5 className="font-bold text-white text-sm">Multi-Dispositivo</h5>
              <p className="text-[11px] text-zinc-400">Sincronización segura en laptop y teléfono.</p>
            </div>
          </div>

        </div>

        {/* FOCUSLY PRO FEATURES (6 Clean Minimal Cards) */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Capacidades Exclusivas
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Diseñado para ir más lejos.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3 text-left hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-tight">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOCUSLY PRO CTA: Refined Call to Action */}
        <div className="rounded-[36px] bg-white/[0.04] border border-white/15 p-8 sm:p-14 text-center max-w-3xl mx-auto space-y-6 shadow-2xl backdrop-blur-xl">
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Ready to go further?
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 max-w-md mx-auto font-medium">
              Unlock Focusly Pro and take your progress to the next level.
            </p>
          </div>

          {/* Action Buttons: Primary (Explore Focusly Pro) & Secondary (Stay with Free) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onFinish}
              className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 font-bold text-xs uppercase tracking-widest px-9 py-4.5 rounded-full shadow-[0_10px_35px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Focusly Pro</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={onFinish}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 border border-white/20 text-zinc-300 hover:text-white font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded-full transition-all cursor-pointer"
            >
              <span>Stay with Free</span>
            </button>
          </div>

          <p className="text-[11px] text-zinc-500 pt-2">
            Sin contratos forzados • Cancelación transparente en cualquier momento
          </p>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 7. FINAL TRANSITION & BRAND MANIFESTO */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-10 pt-8">
        
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-zinc-500 block">
            El Nuevo Estándar
          </span>

          <h3 className="text-3xl sm:text-6xl font-black tracking-tight text-white uppercase leading-tight">
            Focus. Organize. Grow.
          </h3>

          <div className="py-2 flex items-center justify-center">
            <img 
              src={focuslySlogan} 
              alt="More Action • Less Distraction" 
              className="h-6 sm:h-8 w-auto object-contain drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]" 
            />
          </div>
        </div>

        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
          Toma el control de tu tiempo hoy mismo. Menos ruido digital, más impacto en lo que verdaderamente quieres construir.
        </p>

      </section>

    </div>
  );
}
