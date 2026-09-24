import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FocuslyIcon } from '../FocuslyLogo';
import {
  Brain, Sparkles, CheckCircle2, Shield, Calendar,
  Trophy, Flame, Users, Zap, Target, BookOpen,
  ArrowRight, Award, Gem, Lock, Clock, MessageSquare,
  Check, ChevronRight, Compass, HeartHandshake, Eye,
  Layers, RefreshCw, UserCheck, ShieldCheck, ChevronDown, HelpCircle
} from 'lucide-react';

const focuslySlogan = '/focusly-slogan.svg';

export function MoreInfoPage({ 
  onFinish = () => {}, 
  onSelectTab = () => {},
  lang = 'es'
}) {
  const isEn = lang === 'en';

  // Interactive active step in the behavioral loop
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const FAQ_ITEMS = isEn ? [
    {
      q: 'What is Focusly and how does it improve productivity?',
      a: 'Focusly is an all-in-one personal discipline and digital detox ecosystem. It unites gamified Pomodoro focus sprints, app limiters, 30-day mastery tracks, and daily habit streaks backed by behavioral psychology to help you enter deep work effortlessly.'
    },
    {
      q: 'How does app blocking and focus mode work?',
      a: 'You can define custom daily usage limits for social networks and high-distraction apps. When engaging focus mode, reflection prompts and soundscapes shield your flow while calculating net XP for each completed sprint.'
    },
    {
      q: 'Is Focusly free or is a paid subscription required?',
      a: 'Focusly provides a robust free tier featuring the core Pomodoro timer, daily habit streaks, and introductory mastery challenges. Focusly Pro unlocks deep cognitive analytics, stoic AI behavioral mentorship, custom avatar gear, and competitive leagues.'
    },
    {
      q: 'Does Focusly work across mobile devices and desktop computers?',
      a: 'Yes, Focusly is crafted as a lightweight, ultra-responsive Progressive Web App (PWA) with full screen adaptation. It functions seamlessly on desktop monitors, laptops, iPhones, iPads, and Android smartphones.'
    },
    {
      q: 'How do the 30-day mastery tracks sustain self-discipline?',
      a: 'Instead of relying on sheer willpower, mastery tracks deconstruct deep work and habit building into micro-sprints. Each day challenges you with actionable milestones, visible milestone badges, and streak multipliers that turn resistance into routine.'
    },
    {
      q: 'Are my habits and focus sessions private and secure?',
      a: 'Strictly private. Your focus statistics, habit checklists, and session logs remain protected with encrypted cloud synchronization and local storage privacy. Focusly never sells user data or injects third-party trackers.'
    }
  ] : [
    {
      q: '¿Qué es Focusly y cómo mejora mi productividad?',
      a: 'Focusly es un ecosistema integral de disciplina personal y desintoxicación digital. Une temporizadores Pomodoro gamificados, limitadores de apps, rutas de maestría de 30 días y seguimiento de hábitos respaldados por la psicología conductual para entrar en estado de flujo sin fricción.'
    },
    {
      q: '¿Cómo funciona el bloqueo de aplicaciones y el modo enfoque?',
      a: 'Puedes definir límites diarios personalizados para redes sociales y apps adictivas. Al activar el modo enfoque, pausas reflexivas y ondas sonoras protegen tu concentración mientras acumulas puntos de experiencia (XP) por cada bloque completado.'
    },
    {
      q: '¿Focusly es gratuito o requiere suscripción de pago?',
      a: 'Focusly ofrece una versión gratuita muy completa con temporizador Pomodoro, registro de hábitos y retos básicos. Además, Focusly Pro desbloquea analíticas de rendimiento profundo, tutoría stoica con IA, personalización exclusiva y ligas competitivas.'
    },
    {
      q: '¿Funciona en dispositivos móviles y ordenadores de escritorio?',
      a: 'Sí, Focusly está desarrollado como una aplicación web progresiva (PWA) de alto rendimiento con motor de adaptación de pantalla. Funciona con total fluidez tanto en monitores de ordenador como en teléfonos iOS y Android.'
    },
    {
      q: '¿Cómo ayudan los retos de maestría de 30 días a mantener la disciplina?',
      a: 'En lugar de depender de fuerza de voluntad abstracta, las maestrías dividen los grandes objetivos en micro-bloques diarios medibles. Cada día superado otorga insignias visuales y multiplica tu racha, transformando la resistencia mental en un hábito automático.'
    },
    {
      q: '¿Mis hábitos y registros de concentración se mantienen privados y seguros?',
      a: 'Absolutamente privados. Tus estadísticas de enfoque, rutinas de hábitos y notas personales están protegidas con sincronización segura y almacenamiento local. Focusly no comercializa datos de usuarios ni incluye rastreadores de publicidad.'
    }
  ];

  const CYCLE_STEPS = isEn ? [
    {
      id: 'challenge',
      title: 'Challenge',
      desc: 'Set a deliberate challenge.',
      detail: 'Choose a concrete, time-bound goal: 7 days free of social media doomscrolling or 3 deep study blocks.',
      badge: '01'
    },
    {
      id: 'action',
      title: 'Action',
      desc: 'Turn it into focused action.',
      detail: 'Start the focus timer, engage the reflection shield, and work on a single priority for the entire block.',
      badge: '02'
    },
    {
      id: 'progress',
      title: 'Progress',
      desc: 'Earn experience and track progress.',
      detail: 'The system computes your net focus hours, awarding experience points (XP) and updating your performance metrics.',
      badge: '03'
    },
    {
      id: 'reward',
      title: 'Reward',
      desc: 'Receive real rewards.',
      detail: 'Protect your consecutive streak, advance in your weekly league, and unlock diamonds to redeem badges.',
      badge: '04'
    },
    {
      id: 'growth',
      title: 'Growth',
      desc: 'Build enduring habits.',
      detail: 'Mental friction drops each day, turning deliberate effort into effortless, automatic self-discipline.',
      badge: '05'
    }
  ] : [
    {
      id: 'challenge',
      title: 'Reto',
      desc: 'Te propones un reto.',
      detail: 'Eliges una meta concreta y delimitada en el tiempo: 7 días sin scroll en redes o 3 bloques de estudio profundo.',
      badge: '01'
    },
    {
      id: 'action',
      title: 'Acción',
      desc: 'Lo conviertes en una acción.',
      detail: 'Abres el temporizador, activas el escudo de fricción y trabajas en una sola tarea durante el bloque establecido.',
      badge: '02'
    },
    {
      id: 'progress',
      title: 'Progreso',
      desc: 'Obtienes experiencia y visualizas tu progreso.',
      detail: 'El sistema calcula tus horas netas de concentración, sumando puntos de experiencia (XP) y actualizando tus métricas.',
      badge: '03'
    },
    {
      id: 'reward',
      title: 'Recompensa',
      desc: 'Recibes recompensas.',
      detail: 'Proteges tu racha diaria, subes en tu liga semanal y desbloqueas gemas para canjear por emblemas.',
      badge: '04'
    },
    {
      id: 'growth',
      title: 'Crecimiento',
      desc: 'Desarrollas mejores hábitos.',
      detail: 'La fricción mental disminuye día a día, transformando el esfuerzo voluntario en una disciplina natural y automática.',
      badge: '05'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white space-y-32 sm:space-y-44 lg:space-y-52 pb-36 pt-8">

      {/* ========================================================================= */}
      {/* 1. HERO / EL CONCEPTO */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-20 text-center space-y-10 lg:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] backdrop-blur-xl shadow-[0_2px_15px_rgba(255,255,255,0.05)]"
        >
          <Brain size={16} className="text-white" />
          <span>{isEn ? 'Design Philosophy' : 'Filosofía de Diseño'}</span>
        </motion.div>

        <div className="space-y-6 lg:space-y-8 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl 2xl:text-9xl font-black uppercase tracking-tight text-white leading-none"
            style={{ fontSize: 'clamp(3.2rem, 8vw, 8.5rem)' }}
          >
            {isEn ? (
              <>
                Focusly was built<br />
                <span className="text-zinc-400">around one idea.</span>
              </>
            ) : (
              <>
                Focusly nació<br />
                <span className="text-zinc-400">alrededor de una idea.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold tracking-tight max-w-4xl mx-auto leading-snug"
          >
            {isEn
              ? '"Taking control of your time should feel rewarding."'
              : '"Tomar el control de tu tiempo debería sentirse gratificante."'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-4xl mx-auto leading-relaxed font-normal pt-2"
          >
            {isEn
              ? 'Most productivity tools feel cold, rigid, and tedious. Focusly unites three pillars to transform personal development into an engaging, consistent experience:'
              : 'La mayoría de las herramientas de productividad se sienten frías, rígidas y aburridas. Focusly combina tres disciplinas para convertir el desarrollo personal en una experiencia constante y atractiva:'}
          </motion.p>
        </div>

        {/* 3 Core Ingredients Trio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-5xl 2xl:max-w-[1280px] mx-auto pt-6 text-left"
        >
          <div className="p-8 lg:p-10 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-3">
            <span className="text-xs sm:text-sm font-mono font-bold text-zinc-500">01</span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              {isEn ? 'Productivity' : 'Productividad'}
            </h3>
            <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
              {isEn
                ? 'Practical tools to master time, calendar blocks, and daily habits with absolute clarity.'
                : 'Herramientas prácticas para gestionar el tiempo, el calendario y los hábitos diarios con claridad absoluta.'}
            </p>
          </div>
          <div className="p-8 lg:p-10 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-3">
            <span className="text-xs sm:text-sm font-mono font-bold text-zinc-500">02</span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              {isEn ? 'Personal Growth' : 'Crecimiento Personal'}
            </h3>
            <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
              {isEn
                ? 'Cognitive strategies grounded in neuroscience, active recall, and timeless philosophy to cultivate mental calm.'
                : 'Estrategias cognitivas fundamentadas en neurociencia, active recall y filosofía para cultivar serenidad mental.'}
            </p>
          </div>
          <div className="p-8 lg:p-10 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-3">
            <span className="text-xs sm:text-sm font-mono font-bold text-zinc-500">03</span>
            <h3 className="text-xl lg:text-2xl font-bold text-white">
              {isEn ? 'Gamification' : 'Gamificación'}
            </h3>
            <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
              {isEn
                ? 'Immediate feedback that rewards genuine effort and transforms discipline into an engaging dynamic.'
                : 'Retroalimentación inmediata que recompensa el esfuerzo real y transforma la disciplina en una dinámica estimulante.'}
            </p>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CÓMO FUNCIONA EL SISTEMA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? 'Behavioral Architecture' : 'Arquitectura del Comportamiento'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'The Focusly Loop.' : 'El Ciclo Focusly.'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-normal">
            {isEn
              ? 'How Focusly structures human behavior so that every single focus session reinforces your desire to keep improving.'
              : 'Así es como Focusly estructura el comportamiento humano para que cada sesión de trabajo refuerce el deseo de seguir mejorando.'}
          </p>
        </div>

        {/* The Cycle in a Clean Visual Flow */}
        <div className="rounded-[2.5rem] lg:rounded-[3rem] border border-white/15 bg-zinc-950 p-8 sm:p-12 lg:p-16 space-y-10 lg:space-y-12">
          
          {/* Cycle step pills selector */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 lg:gap-4">
            {CYCLE_STEPS.map((step, idx) => {
              const isActive = activeCycleIndex === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveCycleIndex(idx)}
                  className={`p-4 sm:p-5 lg:p-6 rounded-2xl lg:rounded-3xl border text-left transition-all cursor-pointer space-y-1.5 ${
                    isActive
                      ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-zinc-400 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm font-mono font-bold">
                    <span>{step.badge}</span>
                    {isActive && <ChevronRight size={15} className="text-black" />}
                  </div>
                  <h4 className={`text-base lg:text-lg font-bold tracking-tight ${isActive ? 'text-black' : 'text-white'}`}>
                    {step.title}
                  </h4>
                  <p className={`text-xs lg:text-sm leading-snug line-clamp-1 ${isActive ? 'text-zinc-700' : 'text-zinc-500'}`}>
                    {step.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep Dive Card */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <span className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/10 flex items-center justify-center font-mono text-sm lg:text-base font-bold text-white">
                  {CYCLE_STEPS[activeCycleIndex].badge}
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                  {CYCLE_STEPS[activeCycleIndex].title}
                </h3>
              </div>
              <span className="text-xs sm:text-sm text-zinc-400 font-mono">
                {isEn
                  ? `Step ${activeCycleIndex + 1} of 5`
                  : `Paso ${activeCycleIndex + 1} de 5`}
              </span>
            </div>

            <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-zinc-200">
              {CYCLE_STEPS[activeCycleIndex].desc}
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed font-normal">
              {CYCLE_STEPS[activeCycleIndex].detail}
            </p>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-zinc-400 font-mono">
              <span className="flex items-center gap-2">
                <RefreshCw size={15} className="text-white" /> 
                {isEn ? 'Continuous reinforcement loop' : 'Ciclo de refuerzo continuo'}
              </span>
              <button
                onClick={() => setActiveCycleIndex((prev) => (prev + 1) % CYCLE_STEPS.length)}
                className="text-white hover:text-zinc-300 font-bold underline cursor-pointer"
              >
                {isEn ? 'Next step →' : 'Siguiente paso →'}
              </button>
            </div>
          </div>

          {/* Bottom Loop Indication */}
          <div className="pt-2 text-center text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest flex items-center justify-center gap-2 sm:gap-3">
            <span>{isEn ? 'Challenge' : 'Reto'}</span>
            <span>→</span>
            <span>{isEn ? 'Action' : 'Acción'}</span>
            <span>→</span>
            <span>{isEn ? 'Progress' : 'Progreso'}</span>
            <span>→</span>
            <span>{isEn ? 'Reward' : 'Recompensa'}</span>
            <span>→</span>
            <span>{isEn ? 'Growth' : 'Crecimiento'}</span>
            <span>→</span>
            <span className="text-white font-bold">{isEn ? 'Repeat' : 'Repetir'}</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PERSONALIZACIÓN */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? 'Adaptability' : 'Adaptabilidad'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'Your journey should feel like yours.' : 'Tu camino debe sentirse tuyo.'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-normal">
            {isEn
              ? 'No two people share the exact same routine or biological rhythm. Focusly never enforces a rigid mold; it adapts to your life.'
              : 'No existen dos personas con la misma rutina o ritmo biológico. Focusly no impone un molde rígido, sino que se amolda a tu estilo de vida.'}
          </p>
        </div>

        {/* 5 Personalization Vectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {(isEn ? [
            {
              title: 'Different goals',
              desc: 'From exam sprints and degree qualifications to launching an ambition or slashing screen time.',
              icon: Target
            },
            {
              title: 'Different habits',
              desc: 'Your mornings, afternoons, and rest blocks are distinct. Configure prompts that honor your rhythm.',
              icon: Calendar
            },
            {
              title: 'Different levels',
              desc: 'Whether building stamina with 15-minute sprints or locked into 90-minute Deep Work blocks.',
              icon: Trophy
            },
            {
              title: 'Different needs',
              desc: 'Ultra-strict Monk Mode for decisive crunch days or gentle mode for recuperation and balance.',
              icon: ShieldCheck
            },
            {
              title: 'Learning styles',
              desc: 'Bite-sized micro-reads, concise visual summaries, or guided interactive coaching.',
              icon: Brain
            }
          ] : [
            {
              title: 'Diferentes objetivos',
              desc: 'Desde preparar oposiciones o exámenes de grado hasta lanzar un proyecto o reducir el tiempo en pantalla.',
              icon: Target
            },
            {
              title: 'Diferentes hábitos',
              desc: 'Tus mañanas, tardes y descansos son únicos. Configura recordatorios que respeten tus franjas horarias.',
              icon: Calendar
            },
            {
              title: 'Diferentes niveles',
              desc: 'Tanto si estás empezando con bloques de 15 minutos como si ya dominas sesiones de 90 minutos de Deep Work.',
              icon: Trophy
            },
            {
              title: 'Diferentes necesidades',
              desc: 'Modo ultra estricto para días decisivos o modo suave para semanas de recuperación y balance.',
              icon: ShieldCheck
            },
            {
              title: 'Estilos de aprendizaje',
              desc: 'Lecturas conceptuales breves, resúmenes visuales o interacción guiada con coaches según tu preferencia.',
              icon: Brain
            }
          ]).map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-7 sm:p-8 lg:p-9 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-5 flex flex-col justify-between"
              >
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                  <Icon size={22} />
                </div>
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-white tracking-tight leading-snug">{item.title}</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed font-normal pt-2">{item.desc}</p>
                </div>
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest pt-3 border-t border-white/10">
                  {isEn ? 'Adaptable' : 'Adaptable'}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GAMIFICACIÓN CON PROPÓSITO */}
      {/* ========================================================================= */}
      <section className="max-w-6xl 2xl:max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10 lg:space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? 'Psychology' : 'Psicología'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'Gamification with a purpose.' : 'Gamificación con propósito.'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-normal">
            {isEn
              ? 'We never use game mechanics to distract you, but to make the invisible labor of your self-discipline visible.'
              : 'No usamos elementos de juego para distraerte, sino para hacer visible el esfuerzo invisible de tu disciplina.'}
          </p>
        </div>

        {/* Editorial comparison card: Distracción vs Propósito */}
        <div className="p-10 sm:p-12 lg:p-16 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/15 space-y-8">
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-300 leading-relaxed font-normal">
            {isEn
              ? 'Social media platforms and video games exploit dopamine through erratic slot-machine rewards that fragment your focus. Focusly inverts this exact neurobiology:'
              : 'Las redes sociales y los videojuegos aprovechan la dopamina mediante recompensas aleatorias que fragmentan tu mente. Focusly invierte esta misma neurobiología:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 pt-2">
            <div className="p-7 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <span className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-wider block">
                {isEn ? 'The Traditional Flaw' : 'El Problema Tradicional'}
              </span>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {isEn
                  ? 'Studying or deep work seems to yield zero instant returns: the payoff arrives months later, fueling chronic procrastination.'
                  : 'Estudiar o concentrarse parece no dar resultados inmediatos: la recompensa llega meses después, lo que facilita la procrastinación.'}
              </p>
            </div>
            <div className="p-7 sm:p-8 rounded-2xl bg-white/[0.05] border border-white/20 space-y-3">
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider block">
                {isEn ? 'The Focusly Solution' : 'La Respuesta de Focusly'}
              </span>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                {isEn
                  ? 'XP, streaks, achievements, and leagues deliver unmistakable real-time signals right as you complete each session, bridging the gratification gap.'
                  : 'XP, rachas, insignias y ligas otorgan una señal clara de progreso en tiempo real al finalizar cada bloque, cerrando la brecha de gratificación.'}
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-zinc-400 border-t border-white/10">
            <span className="flex items-center gap-2">
              <Check size={16} className="text-white" /> 
              {isEn ? 'XP for authentic effort' : 'XP por esfuerzo real'}
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-white" /> 
              {isEn ? 'Streaks as a consistency shield' : 'Rachas como escudo de constancia'}
            </span>
            <span className="flex items-center gap-2">
              <Check size={16} className="text-white" /> 
              {isEn ? 'Zero cheap addiction tricks' : 'Cero trucos de adicción vacía'}
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. VISIÓN DE FOCUSLY */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16">
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? 'Long-Term Vision' : 'Visión a Largo Plazo'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'More than an app.' : 'Más que una app.'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-normal">
            {isEn
              ? 'A continuous companion across the four stages of your personal evolution:'
              : 'Un sistema continuo que te acompaña en las cuatro etapas de tu evolución personal:'}
          </p>
        </div>

        {/* 4 Stages Progression Horizon: Focus -> Organize -> Grow -> Master */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {(isEn ? [
            {
              stage: '01',
              title: 'Focus',
              headline: 'Stop the noise.',
              desc: 'Reclaim dominion over sudden interruptions and rebuild the stamina to sustain 30 to 50 minutes of undivided concentration.'
            },
            {
              stage: '02',
              title: 'Organize',
              headline: 'Structure your hours.',
              desc: 'Plan every day with deliberate time-blocking and solidify daily habits without guesswork or guilt.'
            },
            {
              stage: '03',
              title: 'Grow',
              headline: 'Expand your mind.',
              desc: 'Master elite learning methods, manage cognitive energy, and cultivate self-mastery principles.'
            },
            {
              stage: '04',
              title: 'Master',
              headline: 'Own your ambitions.',
              desc: 'Make deep work your default state through continuous mastery tracks and unshakeable focus.'
            }
          ] : [
            {
              stage: '01',
              title: 'Enfócate',
              headline: 'Detén el ruido.',
              desc: 'Recupera el control sobre las interrupciones inmediatas y vuelve a ser capaz de concentrarte durante 30 a 50 minutos seguidos.'
            },
            {
              stage: '02',
              title: 'Organiza',
              headline: 'Estructura tus horas.',
              desc: 'Planifica cada jornada con time-blocking deliberado y consolida tus hábitos diarios sin improvisación ni culpa.'
            },
            {
              stage: '03',
              title: 'Crece',
              headline: 'Expande tu mente.',
              desc: 'Aprende métodos de estudio de alto rendimiento, gestiona tu energía vital y profundiza en principios de autocontrol.'
            },
            {
              stage: '04',
              title: 'Domina',
              headline: 'Domina tus metas.',
              desc: 'Convierte el trabajo profundo en tu estado predeterminado a través de rutas de maestría continua y enfoque imperturbable.'
            }
          ]).map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-9 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-zinc-500">{item.stage}</span>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight uppercase">{item.title}</h3>
                <p className="text-sm sm:text-base font-semibold text-zinc-300">{item.headline}</p>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed font-normal pt-4 border-t border-white/10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PREGUNTAS FRECUENTES (FAQ & ASISTENCIA) */}
      {/* ========================================================================= */}
      <section id="faq" className="max-w-5xl 2xl:max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500 flex items-center justify-center gap-2">
            <HelpCircle size={16} className="text-white" />
            {isEn ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'Everything you need to know.' : 'Todo lo que necesitas saber.'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-normal">
            {isEn
              ? 'Clear, transparent answers about how Focusly protects your attention, habits, and digital discipline.'
              : 'Respuestas claras y transparentes sobre cómo Focusly cuida tu atención, tus hábitos y tu disciplina digital.'}
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-zinc-950 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-white text-black' : 'text-white'}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed border-t border-white/5"
                  >
                    {item.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CIERRE DE MÁS INFORMACIÓN */}
      {/* ========================================================================= */}
      <section className="max-w-5xl 2xl:max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 text-center space-y-10 border-t border-white/15">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center">
          <FocuslyIcon size={38} />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? (
              <>
                Your progress starts<br />
                <span className="text-zinc-400">with one decision.</span>
              </>
            ) : (
              <>
                Tu progreso comienza<br />
                <span className="text-zinc-400">con una decisión.</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? 'Reclaiming your attention does not require superhuman willpower—only a system engineered on your side.'
              : 'Recuperar la atención no requiere fuerza sobrehumana, solo un sistema diseñado a tu favor.'}
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={onFinish}
            className="bg-white text-black hover:bg-zinc-200 text-base sm:text-lg lg:text-xl font-bold tracking-tight px-10 py-5 lg:px-14 lg:py-6 rounded-full shadow-[0_15px_45px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
          >
            <span>{isEn ? 'Start with Focusly' : 'Comenzar con Focusly'}</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </section>

    </div>
  );
}
