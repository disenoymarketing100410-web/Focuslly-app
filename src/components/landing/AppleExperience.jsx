import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FocuslyIcon } from '../FocuslyLogo';
import { 
  ArrowRight, Sparkles, CheckCircle2, Shield, Flame, 
  Trophy, Target, Zap, Clock, Brain, Gem, Check, 
  Smartphone, Calendar, SlidersHorizontal, ChevronRight
} from 'lucide-react';

const focuslySlogan = '/focusly-slogan.svg';

export function AppleExperience({ 
  onFinish = () => {}, 
  onSelectTab = () => {},
  lang = 'es'
}) {
  // Interactive preview tab for the Hero Mockup
  const [activePreview, setActivePreview] = useState('focus');
  const isEn = lang === 'en';

  return (
    <div className="min-h-screen bg-black text-white space-y-32 sm:space-y-44 lg:space-y-52 pb-36 pt-6">

      {/* ========================================================================= */}
      {/* 1. HERO — FOCUSLY: MORE ACTION, LESS DISTRACTION */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-20 text-center space-y-10 lg:space-y-14">
        
        {/* Subtle pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] backdrop-blur-xl shadow-[0_2px_15px_rgba(255,255,255,0.05)]"
        >
          <Sparkles size={16} className="text-white" />
          <span>{isEn ? 'The Focus Ecosystem' : 'El Ecosistema de Enfoque'}</span>
        </motion.div>

        {/* Hero Title & Slogan */}
        <div className="space-y-6 lg:space-y-8 max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] 2xl:text-[11.5rem] font-black uppercase tracking-tighter text-white leading-none"
            style={{ fontSize: 'clamp(3.8rem, 9.5vw, 11rem)' }}
          >
            Focusly
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex items-center justify-center pt-2"
          >
            <img
              src={focuslySlogan}
              alt={isEn ? 'More Action, Less Distraction' : 'Más Acción, Menos Distracción'}
              className="h-9 sm:h-12 md:h-16 lg:h-20 2xl:h-24 w-auto object-contain drop-shadow-[0_4px_30px_rgba(255,255,255,0.3)]"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-zinc-300 max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed font-normal pt-2"
          >
            {isEn
              ? 'Focusly is an app designed to help you take control of your time, reduce distractions, and build better habits.'
              : 'Focusly es una aplicación diseñada para ayudarte a tomar el control de tu tiempo, reducir distracciones y construir mejores hábitos.'}
          </motion.p>
        </div>

        {/* Quick Concept Formula */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto text-xs sm:text-sm lg:text-base font-mono font-medium text-zinc-400 pt-2"
        >
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white">
            {isEn ? 'Time Control' : 'Control de tiempo'}
          </span>
          <span className="text-zinc-600 font-bold">+</span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white">
            {isEn ? 'Focus' : 'Enfoque'}
          </span>
          <span className="text-zinc-600 font-bold">+</span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white">
            {isEn ? 'Habits' : 'Hábitos'}
          </span>
          <span className="text-zinc-600 font-bold">+</span>
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/15 text-white">
            {isEn ? 'Personal Growth' : 'Crecimiento personal'}
          </span>
        </motion.div>

        {/* Hero CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <button
            onClick={() => onSelectTab('productividad')}
            className="bg-white text-black hover:bg-zinc-200 text-base sm:text-lg lg:text-xl font-bold tracking-tight px-10 py-4 sm:px-12 sm:py-5 lg:px-14 lg:py-6 rounded-full shadow-[0_15px_45px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
          >
            <span>{isEn ? 'Explore Focusly' : 'Explorar Focusly'}</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* HERO INTERFACE MOCKUP (Minimalist Live Showcase) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="pt-12 sm:pt-16 max-w-6xl xl:max-w-7xl 2xl:max-w-[1500px] mx-auto text-left"
        >
          <div className="rounded-[2.5rem] lg:rounded-[3rem] border border-white/20 bg-zinc-950/90 p-8 sm:p-12 lg:p-14 2xl:p-16 backdrop-blur-3xl shadow-[0_40px_140px_rgba(0,0,0,0.95),0_0_80px_rgba(255,255,255,0.04)]">
            
            {/* App Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-white/15">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white text-black flex items-center justify-center font-black shadow-lg">
                  <FocuslyIcon size={28} />
                </div>
                <div>
                  <h3 className="text-lg lg:text-2xl font-bold text-white tracking-tight">Focusly Workspace</h3>
                  <p className="text-xs lg:text-sm text-zinc-400">
                    {isEn ? 'Personal Self-Improvement Hub' : 'Centro de Superación Personal'}
                  </p>
                </div>
              </div>

              {/* Mockup switcher tabs */}
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
                {[
                  { id: 'focus', label: isEn ? 'Focus Session' : 'Sesión de Foco' },
                  { id: 'habits', label: isEn ? "Today's Habits" : 'Hábitos del Día' },
                  { id: 'progress', label: isEn ? 'Streak & XP' : 'Racha & XP' }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActivePreview(t.id)}
                    className={`px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl text-xs lg:text-sm font-bold transition-all cursor-pointer ${
                      activePreview === t.id
                        ? 'bg-white text-black shadow-md'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Card Display based on switcher */}
            <div className="pt-8 lg:pt-10">
              {activePreview === 'focus' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5 lg:space-y-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                        {isEn ? 'Active Block' : 'Bloque Activo'}
                      </span>
                      <h4 className="text-xl lg:text-2xl font-bold text-white">
                        {isEn ? 'Deep Work: Main Priority' : 'Deep Work: Tarea Principal'}
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-baseline gap-3">
                        <span className="text-5xl lg:text-6xl font-black font-mono text-white">25:00</span>
                        <span className="text-sm lg:text-base text-zinc-400">
                          {isEn ? 'minutes' : 'minutos'}
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-white h-full rounded-full w-[70%]" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5 lg:space-y-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                        {isEn ? 'Active Shield' : 'Escudo Activo'}
                      </span>
                      <h4 className="text-xl lg:text-2xl font-bold text-white">
                        {isEn ? 'Social Media Friction' : 'Fricción de Redes Sociales'}
                      </h4>
                      <p className="text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed">
                        {isEn
                          ? 'Instagram, TikTok, and YouTube quarantined until work block completes.'
                          : 'Instagram, TikTok y YouTube en cuarentena hasta completar el bloque de trabajo.'}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-semibold">
                      <Shield size={16} /> {isEn ? '100% Active Blocker' : 'Bloqueo 100% activo'}
                    </span>
                  </div>

                  <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-5 lg:space-y-6 flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                        {isEn ? 'Reward' : 'Recompensa'}
                      </span>
                      <h4 className="text-xl lg:text-2xl font-bold text-white">
                        {isEn ? '+150 XP Upon Completion' : '+150 XP al Finalizar'}
                      </h4>
                      <p className="text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed">
                        {isEn
                          ? 'Earn experience to sustain your daily concentration streak.'
                          : 'Suma experiencia para mantener la racha de concentración de hoy.'}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-amber-300 font-semibold font-mono">
                      <Flame size={16} className="text-amber-400" /> {isEn ? 'Protected Streak' : 'Racha protegida'}
                    </span>
                  </div>
                </div>
              )}

              {activePreview === 'habits' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                  {[
                    { 
                      title: isEn ? 'Daily Reading (30m)' : 'Lectura diaria (30m)', 
                      status: isEn ? 'Completed' : 'Completado', 
                      done: true 
                    },
                    { 
                      title: isEn ? 'No Phone in Bed' : 'Sin teléfono en la cama', 
                      status: isEn ? 'Completed' : 'Completado', 
                      done: true 
                    },
                    { 
                      title: isEn ? 'Morning Planning' : 'Planificación matutina', 
                      status: isEn ? 'Completed' : 'Completado', 
                      done: true 
                    },
                    { 
                      title: isEn ? 'Wrap Up Tasks' : 'Cierre de pendientes', 
                      status: isEn ? 'Pending Today' : 'Pendiente hoy', 
                      done: false 
                    }
                  ].map((h, idx) => (
                    <div key={idx} className="p-6 sm:p-7 lg:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className={`w-8 h-8 lg:w-9 lg:h-9 rounded-xl flex items-center justify-center ${h.done ? 'bg-white text-black' : 'border border-white/20 text-zinc-500'}`}>
                        {h.done ? <Check size={18} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-zinc-600" />}
                      </div>
                      <h4 className="text-sm sm:text-base lg:text-lg font-bold text-white">{h.title}</h4>
                      <span className={`text-xs sm:text-sm font-medium block ${h.done ? 'text-zinc-400' : 'text-zinc-500'}`}>{h.status}</span>
                    </div>
                  ))}
                </div>
              )}

              {activePreview === 'progress' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
                  <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                      {isEn ? 'Current Streak' : 'Racha Actual'}
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono flex items-center gap-3">
                      <Flame size={28} className="text-white" /> {isEn ? '14 Days' : '14 Días'}
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-zinc-400">
                      {isEn ? 'Unbroken consistency this week.' : 'Consistencia ininterrumpida esta semana.'}
                    </p>
                  </div>
                  <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                      {isEn ? 'User Level' : 'Nivel de Usuario'}
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono flex items-center gap-3">
                      <Trophy size={28} className="text-white" /> {isEn ? 'Level 12' : 'Nivel 12'}
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-zinc-400">
                      {isEn ? '3,450 XP accumulated.' : '3,450 XP acumulados.'}
                    </p>
                  </div>
                  <div className="p-7 sm:p-9 lg:p-10 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                      {isEn ? 'Recovered Time' : 'Tiempo Recuperado'}
                    </span>
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono flex items-center gap-3">
                      <Clock size={28} className="text-white" /> +2h 15m
                    </div>
                    <p className="text-xs sm:text-sm lg:text-base text-zinc-400">
                      {isEn ? 'Saved from social media today.' : 'Ahorradas de redes sociales hoy.'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ¿QUÉ PROBLEMA RESUELVE? */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-14 lg:space-y-20">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? 'The Modern Challenge' : 'El Desafío Moderno'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'Your time is being distracted.' : 'Tu tiempo está siendo secuestrado.'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-300 leading-relaxed font-normal">
            {isEn
              ? "It's not a lack of willpower: today's digital environment is engineered to fragment your attention every few minutes."
              : 'No es falta de voluntad personal: el entorno digital actual está diseñado para fragmentar tu atención cada pocos minutos.'}
          </p>
        </div>

        {/* 5 Friction Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {(isEn
            ? [
                {
                  title: 'Constant distractions',
                  desc: 'Notifications and popups breaking your deep focus state over and over.'
                },
                {
                  title: 'Social media loops',
                  desc: 'Infinite scrolling and short video feeds burning hours without adding real value.'
                },
                {
                  title: 'Lack of organization',
                  desc: 'Starting the day without clear priorities triggers stress and procrastination.'
                },
                {
                  title: 'Struggling with habits',
                  desc: 'Starting routines on Monday and abandoning them by Thursday without a tracking system.'
                },
                {
                  title: 'Lost control of time',
                  desc: 'The daily feeling that the day slipped away without meaningful progress on what matters.'
                }
              ]
            : [
                {
                  title: 'Distracciones constantes',
                  desc: 'Notificaciones e interrupciones que rompen el estado de concentración una y otra vez.'
                },
                {
                  title: 'Redes sociales',
                  desc: 'Scroll automático y videos cortos que consumen horas sin aportar valor real.'
                },
                {
                  title: 'Falta de organización',
                  desc: 'Comenzar el día sin una lista clara de prioridades genera estrés y procrastinación.'
                },
                {
                  title: 'Dificultad con hábitos',
                  desc: 'Es fácil iniciar una rutina el lunes y abandonarla el jueves sin un sistema de seguimiento.'
                },
                {
                  title: 'Poco control del tiempo',
                  desc: 'La sensación cotidiana de que el día se termina sin haber avanzado en lo que de verdad importa.'
                }
              ]
          ).map((item, idx) => (
            <div
              key={idx}
              className="p-7 sm:p-8 lg:p-9 rounded-[2rem] bg-zinc-950 border border-white/10 space-y-4 flex flex-col justify-between"
            >
              <span className="font-mono text-xs sm:text-sm font-bold text-zinc-500">0{idx + 1}</span>
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white tracking-tight leading-snug">{item.title}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-zinc-400 leading-relaxed font-normal pt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. LA SOLUCIÓN */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-14 lg:space-y-20">
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? 'The Solution' : 'La Solución'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'Meet Focusly.' : 'Conoce Focusly.'}
          </h2>
          <p className="text-xl sm:text-3xl lg:text-4xl text-zinc-200 leading-relaxed font-medium">
            {isEn
              ? 'Focusly turns self-improvement into an interactive experience.'
              : 'Focusly transforma la superación personal en una experiencia interactiva.'}
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl mx-auto">
            {isEn
              ? 'A unified system where focus, organization, and learning live together on one screen.'
              : 'Un sistema unificado donde el enfoque, la organización y el aprendizaje conviven en una misma pantalla.'}
          </p>
        </div>

        {/* 3 Main Pillars (Focus • Organize • Grow) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {/* Pillar 1: Focus */}
          <div className="p-8 sm:p-12 lg:p-14 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/15 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Shield size={32} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                  {isEn ? 'Pillar 01' : 'Pilar 01'}
                </span>
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-1">
                  {isEn ? 'Focus' : 'Enfoque'}
                </h3>
                <p className="text-base lg:text-lg font-semibold text-zinc-200 mt-2">
                  {isEn ? 'Control your distractions.' : 'Controla tus distracciones.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Guided focus sessions, distracting app blockers, and friction barriers to stop mindless scrolling.'
                  : 'Sesiones guiadas de concentración, bloqueo de aplicaciones distractoras y barreras de fricción para detener el scroll involuntario.'}
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>{isEn ? 'Timers & Blocker' : 'Temporizadores & Bloqueador'}</span>
            </div>
          </div>

          {/* Pillar 2: Organize */}
          <div className="p-8 sm:p-12 lg:p-14 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/15 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Calendar size={32} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                  {isEn ? 'Pillar 02' : 'Pilar 02'}
                </span>
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-1">
                  {isEn ? 'Organize' : 'Organiza'}
                </h3>
                <p className="text-base lg:text-lg font-semibold text-zinc-200 mt-2">
                  {isEn ? 'Organize your time and habits.' : 'Organiza tu tiempo y tus hábitos.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'A visual calendar and daily habit manager to structure your days and turn broad ambitions into clear steps.'
                  : 'Un calendario visual y un gestor de hábitos diarios para estructurar tus jornadas y convertir objetivos amplios en pasos claros.'}
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>{isEn ? 'Habit Manager & Calendar' : 'Gestor de Hábitos & Calendario'}</span>
            </div>
          </div>

          {/* Pillar 3: Grow */}
          <div className="p-8 sm:p-12 lg:p-14 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/15 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Brain size={32} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 block">
                  {isEn ? 'Pillar 03' : 'Pilar 03'}
                </span>
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mt-1">
                  {isEn ? 'Grow' : 'Crece'}
                </h3>
                <p className="text-base lg:text-lg font-semibold text-zinc-200 mt-2">
                  {isEn ? 'Build new skills and elevate yourself.' : 'Construye nuevas habilidades y mejora.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Master proven study and concentration techniques, guided by interactive courses, coaches, and gamified practice.'
                  : 'Aprende técnicas comprobadas de estudio y concentración, guiado por contenido didáctico, maestrías y retroalimentación interactiva.'}
              </p>
            </div>
            <div className="pt-6 border-t border-white/10 text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>{isEn ? 'Coaches, Learning & Paths' : 'Coaches, Aprendizaje & Rutas'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. EXPERIENCIA */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-14 lg:space-y-20">
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? 'How It Works' : 'Cómo Funciona'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase leading-tight">
            {isEn ? (
              <>
                Challenge yourself →<br />
                Take control →<br />
                <span className="text-zinc-400">Make progress</span>
              </>
            ) : (
              <>
                Ponte a prueba →<br />
                Toma el control →<br />
                <span className="text-zinc-400">Avanza cada día</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 leading-relaxed font-normal">
            {isEn
              ? 'How the daily Focusly loop turns effort into a rewarding, crystal-clear dynamic.'
              : 'Así es como la experiencia diaria en Focusly convierte el esfuerzo en una dinámica clara, gratificante y constante.'}
          </p>
        </div>

        {/* 3 Sequential Real Interface Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Step 1: Challenge yourself */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-zinc-500">
                  {isEn ? 'Step 1' : 'Paso 1'}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  {isEn ? 'Challenge' : 'Desafío'}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {isEn ? 'Challenge yourself' : 'Ponte a prueba'}
              </h3>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
                {isEn
                  ? 'Pick a 7-day challenge: cut social media to 30 min daily or complete 3 deep study sprints.'
                  : 'Eliges un reto de 7 días: reducir redes sociales a 30m al día o completar 3 bloques de estudio.'}
              </p>
            </div>
            
            {/* Real mini UI representation */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-bold text-white">
                  {isEn ? 'Digital Detox Sprint' : 'Sprint Detox Digital'}
                </span>
                <span className="font-mono text-zinc-400">
                  {isEn ? 'Day 4 of 7' : 'Día 4 de 7'}
                </span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full w-[57%]" />
              </div>
              <span className="text-xs text-zinc-500 block">
                {isEn ? 'Goal: 1 block of 50 min today' : 'Objetivo: 1 bloque de 50 min hoy'}
              </span>
            </div>
          </div>

          {/* Step 2: Take control */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-zinc-500">
                  {isEn ? 'Step 2' : 'Paso 2'}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  {isEn ? 'Focus' : 'Enfoque'}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {isEn ? 'Take control' : 'Toma el control'}
              </h3>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
                {isEn
                  ? 'Start your protected session. Distractions pause and your attention stays locked on one objective.'
                  : 'Inicias tu sesión protegida. Las distracciones quedan en pausa y tu atención se mantiene en una sola tarea.'}
              </p>
            </div>
            
            {/* Real mini UI representation */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-center">
              <span className="text-3xl lg:text-4xl font-black font-mono text-white tracking-wider block">45:00</span>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center gap-1.5 pt-1">
                <Shield size={14} /> {isEn ? 'Active Blocker' : 'Bloqueo Activo'}
              </span>
            </div>
          </div>

          {/* Step 3: Make progress */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-zinc-500">
                  {isEn ? 'Step 3' : 'Paso 3'}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  {isEn ? 'Progress' : 'Progreso'}
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {isEn ? 'Make progress' : 'Avanza cada día'}
              </h3>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
                {isEn
                  ? 'Earn XP, level up, and see your effort reflected in your daily streak and performance stats.'
                  : 'Ganas experiencia, subes de nivel y ves reflejado tu esfuerzo en tu racha diaria y tus estadísticas.'}
              </p>
            </div>
            
            {/* Real mini UI representation */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <div className="flex justify-between items-center text-xs sm:text-sm">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Flame size={15} className="text-white" /> +200 XP
                </span>
                <span className="font-mono text-zinc-400">
                  {isEn ? 'Streak: 15 Days' : 'Racha: 15 Días'}
                </span>
              </div>
              <span className="text-xs text-zinc-400 block">
                {isEn ? '"Deep Focus" badge unlocked' : 'Insignia "Enfoque Profundo" desbloqueada'}
              </span>
            </div>
          </div>

        </div>

        {/* Transition Bridge to "Productividad" */}
        <div className="pt-10 text-center space-y-5">
          <p className="text-sm sm:text-base text-zinc-400">
            {isEn ? 'Ready to explore all tools in detail?' : '¿Listo para conocer todas las herramientas en detalle?'}
          </p>
          <button
            onClick={() => onSelectTab('productividad')}
            className="bg-white text-black hover:bg-zinc-200 text-sm sm:text-base font-bold uppercase tracking-wider px-10 py-5 lg:px-12 lg:py-6 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-3"
          >
            <span>{isEn ? 'Discover what you can do' : 'Descubre todo lo que puedes hacer'}</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </section>

    </div>
  );
}
