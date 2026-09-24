import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FocuslyIcon } from '../FocuslyLogo';
import {
  Sparkles, CheckCircle2, Target, Calendar, CheckSquare,
  Shield, Clock, Flame, Zap, BarChart3, Lock,
  Brain, ArrowRight, Layers, Check, Trophy, Gem,
  Award, SlidersHorizontal, Users, MessageSquare, BookOpen
} from 'lucide-react';

const focuslySlogan = '/focusly-slogan.svg';

export function ProductivityPage({ 
  onFinish = () => {}, 
  onSelectTab = () => {},
  lang = 'es'
}) {
  const isEn = lang === 'en';

  return (
    <div className="min-h-screen bg-black text-white space-y-32 sm:space-y-44 lg:space-y-52 pb-36 pt-8">

      {/* ========================================================================= */}
      {/* 1. HERO — EVERYTHING YOU NEED TO TAKE CONTROL */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-20 text-center space-y-10 lg:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] backdrop-blur-xl shadow-[0_2px_15px_rgba(255,255,255,0.05)]"
        >
          <SlidersHorizontal size={16} className="text-white" />
          <span>{isEn ? 'Toolkit & Features' : 'Herramientas & Funcionalidades'}</span>
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
                Everything you need<br />
                <span className="text-zinc-400">to take control.</span>
              </>
            ) : (
              <>
                Todo lo que necesitas<br />
                <span className="text-zinc-400">para tomar el control.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-zinc-300 max-w-4xl 2xl:max-w-5xl mx-auto leading-relaxed font-normal"
          >
            {isEn
              ? 'One place to focus, organize your time, and keep progressing.'
              : 'Un solo lugar para enfocarte, organizar tu tiempo y seguir progresando.'}
          </motion.p>
        </div>

        {/* Quick jump anchors for categories */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          {(isEn
            ? [
                { id: 'organiza', label: 'Organize' },
                { id: 'enfocate', label: 'Focus' },
                { id: 'crece', label: 'Grow' },
                { id: 'progresa', label: 'Progress' },
                { id: 'conecta', label: 'Connect' }
              ]
            : [
                { id: 'organiza', label: 'Organiza' },
                { id: 'enfocate', label: 'Enfócate' },
                { id: 'crece', label: 'Crece' },
                { id: 'progresa', label: 'Progresa' },
                { id: 'conecta', label: 'Conecta' }
              ]
          ).map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="px-5 py-2.5 lg:px-6 lg:py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs sm:text-sm font-bold text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
            >
              {cat.label}
            </a>
          ))}
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ORGANIZA */}
      {/* ========================================================================= */}
      <section id="organiza" className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16 scroll-mt-28">
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? '01 • Structure your time' : '01 • Estructura tu tiempo'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black uppercase tracking-tight text-white">
            {isEn ? 'Organize' : 'Organiza'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {isEn
              ? 'Tools designed to give clarity to your day before it begins.'
              : 'Herramientas diseñadas para dar claridad a tu día antes de que comience.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Habit Manager */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <CheckSquare size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Habit Manager' : 'Gestor de Hábitos'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Build and track daily habits.' : 'Crea y sigue hábitos diarios.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Log your essential routines each morning and evening. View your weekly completion rate with a single tap and zero friction.'
                  : 'Registra tus rutinas clave cada mañana y noche. Visualiza tu tasa de cumplimiento semanal con un solo toque y sin fricción.'}
              </p>
            </div>
            
            {/* Real feature snapshot card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between font-mono text-zinc-400">
                <span>{isEn ? 'Reading 30 min' : 'Lectura 30 min'}</span>
                <span className="text-white font-bold">{isEn ? '✓ Done' : '✓ Hecho'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-zinc-400">
                <span>{isEn ? 'No screens before sleep' : 'Sin redes antes de dormir'}</span>
                <span className="text-white font-bold">{isEn ? '✓ Done' : '✓ Hecho'}</span>
              </div>
            </div>
          </div>

          {/* Interactive Calendar */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Calendar size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Interactive Calendar' : 'Calendario Interactivo'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Organize tasks and schedules with intelligent guidance.' : 'Organiza tareas y actividades con ayuda de un asistente inteligente.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Visual time-blocking to schedule protected blocks for study or deep work. Adjust durations and sync critical priorities.'
                  : 'Time-blocking visual para agendar bloques protegidos de estudio o trabajo. Ajusta duraciones y sincroniza tus entregas prioritarias.'}
              </p>
            </div>

            {/* Real feature snapshot card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">09:00 - 11:30</span>
                <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded text-zinc-300">Deep Work</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400">
                {isEn ? 'Protected block of pure concentration' : 'Bloque protegido de concentración pura'}
              </p>
            </div>
          </div>

          {/* Goals & Planning */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Target size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Goals & Planning' : 'Metas & Planificación'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Turn ambitious goals into actionable steps.' : 'Convierte tus objetivos en acciones concretas.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Break down quarterly milestones into daily achievable sprints. Track real progress without drowning in endless to-do lists.'
                  : 'Descompone grandes metas trimestrales en hitos alcanzables diarios. Mide el avance real sin perderte en listas interminables.'}
              </p>
            </div>

            {/* Real feature snapshot card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">
                  {isEn ? 'Pass Final Exam' : 'Aprobar Examen Final'}
                </span>
                <span className="font-mono text-white font-bold">78%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-white h-full rounded-full w-[78%]" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ENFÓCATE */}
      {/* ========================================================================= */}
      <section id="enfocate" className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16 scroll-mt-28">
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? '02 • Protect your attention' : '02 • Protege tu atención'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black uppercase tracking-tight text-white">
            {isEn ? 'Focus' : 'Enfócate'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {isEn
              ? 'Active systems to eradicate digital distractions and step into deep flow.'
              : 'Sistemas activos para erradicar las distracciones digitales y entrar en flujo.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

          {/* Challenges */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Flame size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Challenges' : 'Desafíos'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Challenges to strengthen your discipline and self-control.' : 'Desafíos para mejorar tu disciplina y autocontrol.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Structured 7 to 21-day sprints (Dopamine Reset, Zero Morning Social Media, 5 Days of Deep Work) with verifiable daily targets.'
                  : 'Sprints estructurados de 7 a 21 días (Dopamine Reset, Cero Redes Matutinas, 5 Días de Deep Work) con metas diarias verificables.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm flex items-center justify-between">
              <span className="text-zinc-300 font-medium">
                {isEn ? 'Active Sprint' : 'Sprint Activo'}
              </span>
              <span className="text-white font-mono font-bold">
                {isEn ? 'Day 5 / 7' : 'Día 5 / 7'}
              </span>
            </div>
          </div>

          {/* Limits & Blocker */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Shield size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Limits & Blocker' : 'Límites & Bloqueador'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Set boundaries and control the apps that distract you most.' : 'Establece límites y controla las aplicaciones que más te distraen.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Define screen time caps on Instagram, TikTok, or YouTube. Activate reflection friction before opening any time-wasting app.'
                  : 'Define tiempos máximos en Instagram, TikTok o YouTube. Activa el escudo de fricción que te ayuda a reflexionar antes de abrir cualquier app.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm flex items-center justify-between">
              <span className="text-zinc-300 font-medium">
                {isEn ? 'Social media limit today' : 'Límite redes hoy'}
              </span>
              <span className="text-white font-mono font-bold">
                {isEn ? '22 / 45 min' : '22 / 45 min'}
              </span>
            </div>
          </div>

          {/* Focus Tools */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Clock size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Focus Tools' : 'Herramientas de Enfoque'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Tools engineered to help you sustain locked-in attention.' : 'Herramientas diseñadas para ayudarte a mantener la atención.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Deep work timers (Pomodoro or open sprint blocks), binaural focus frequencies, and session logs.'
                  : 'Temporizadores de trabajo profundo (técnica Pomodoro o bloques libres), frecuencias binaurales de concentración y registro de sesiones.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm flex items-center justify-between">
              <span className="text-zinc-300 font-medium">
                {isEn ? 'Monk Mode' : 'Modo Monje'}
              </span>
              <span className="text-white font-mono font-bold">
                {isEn ? 'Available' : 'Disponible'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CRECE */}
      {/* ========================================================================= */}
      <section id="crece" className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16 scroll-mt-28">
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? '03 • Unlock your potential' : '03 • Desarrolla tu potencial'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black uppercase tracking-tight text-white">
            {isEn ? 'Grow' : 'Crece'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {isEn
              ? 'Actionable knowledge and structured methods to elevate your long-term mental performance.'
              : 'Conocimiento y métodos didácticos para elevar tu rendimiento mental a largo plazo.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

          {/* Coaches */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Brain size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Coaches</h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Personalized guidance calibrated to user needs.' : 'Experiencias personalizadas según las necesidades del usuario.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Guided coaching that suggests schedule adjustments, restorative breaks, and balance based on your fatigue level and goals.'
                  : 'Acompañamiento guiado que te sugiere ajustes de horario, descanso y balance según tu nivel diario de fatiga y tus metas.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm flex items-center justify-between">
              <span className="text-zinc-300">
                {isEn ? 'Philosophical Coaches' : 'Coaches Filosóficos'}
              </span>
              <span className="text-white font-bold">
                {isEn ? 'Seneca & Feynman' : 'Séneca & Feynman'}
              </span>
            </div>
          </div>

          {/* Learn */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <BookOpen size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Learn' : 'Aprende'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Curated content on productivity, concentration, and personal growth.' : 'Contenido para aprender sobre productividad, concentración y desarrollo personal.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Interactive 3-minute micro-lessons grounded in neuroscience, working memory, atomic habits, and conceptual synthesis.'
                  : 'Micro-lecciones interactivas de 3 minutos basadas en neurociencia, memoria de trabajo, hábitos atómicos y síntesis conceptual.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm flex items-center justify-between">
              <span className="text-zinc-300">
                {isEn ? 'Micro-lessons' : 'Micro-lecciones'}
              </span>
              <span className="text-white font-bold">
                {isEn ? '18 active modules' : '18 módulos activos'}
              </span>
            </div>
          </div>

          {/* Masteries */}
          <div className="p-8 sm:p-10 lg:p-12 rounded-[2.5rem] bg-zinc-950 border border-white/15 space-y-7 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Layers size={26} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  {isEn ? 'Masteries' : 'Maestrías'}
                </h3>
                <p className="text-sm lg:text-base font-semibold text-zinc-300 mt-1">
                  {isEn ? 'Skill trees to build and refine new capabilities.' : 'Rutas para desarrollar nuevas habilidades.'}
                </p>
              </div>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Leveled learning paths (Active Recall, Energy Management, Advanced Deep Work) to master practical techniques step by step.'
                  : 'Rutas de aprendizaje por niveles (Active Recall, Gestión de Energía, Deep Work Avanzado) para dominar técnicas prácticas paso a paso.'}
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm flex items-center justify-between">
              <span className="text-zinc-300">
                {isEn ? 'Mastery Paths' : 'Rutas de Dominio'}
              </span>
              <span className="text-white font-bold">
                {isEn ? 'Node-based progress' : 'Progreso por nodos'}
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROGRESA */}
      {/* ========================================================================= */}
      <section id="progresa" className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16 scroll-mt-28">
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? '04 • Track and celebrate your momentum' : '04 • Mide y celebra tu avance'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black uppercase tracking-tight text-white">
            {isEn ? 'Progress' : 'Progresa'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {isEn
              ? 'A transparent progression engine that turns daily consistency into tangible achievements.'
              : 'Un sistema de progresión transparente que hace tangible tu constancia diaria.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          
          {/* XP */}
          <div className="p-7 sm:p-8 lg:p-9 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Zap size={22} />
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-white">XP</h4>
              <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mt-2 leading-relaxed">
                {isEn
                  ? 'Earn experience by finishing study sessions, habits, and discipline challenges.'
                  : 'Gana experiencia completando actividades de estudio, hábitos y desafíos.'}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 border-t border-white/10 pt-3 block">
              {isEn ? '+50 to +250 XP per block' : '+50 a +250 XP por bloque'}
            </span>
          </div>

          {/* Streaks */}
          <div className="p-7 sm:p-8 lg:p-9 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Flame size={22} />
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-white">
                {isEn ? 'Streaks' : 'Rachas'}
              </h4>
              <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mt-2 leading-relaxed">
                {isEn
                  ? 'Maintain steady momentum by protecting your consecutive daily streaks.'
                  : 'Mantén tu progreso constante protegiendo tu racha de días consecutivos.'}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 border-t border-white/10 pt-3 block">
              {isEn ? 'Relapse protection' : 'Protección anti-recaída'}
            </span>
          </div>

          {/* Rankings */}
          <div className="p-7 sm:p-8 lg:p-9 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Trophy size={22} />
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-white">
                {isEn ? 'Rankings' : 'Clasificaciones'}
              </h4>
              <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mt-2 leading-relaxed">
                {isEn
                  ? 'Compete and climb weekly leagues alongside other committed users.'
                  : 'Compite y progresa dentro de las ligas semanales junto a otros usuarios.'}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 border-t border-white/10 pt-3 block">
              {isEn ? 'Bronze to Diamond leagues' : 'Ligas Bronce a Diamante'}
            </span>
          </div>

          {/* Badges & Achievements */}
          <div className="p-7 sm:p-8 lg:p-9 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Award size={22} />
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-white">
                {isEn ? 'Badges & Achievements' : 'Insignias & Logros'}
              </h4>
              <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mt-2 leading-relaxed">
                {isEn
                  ? 'Unlock milestone trophies for cumulative focus hours and unbroken consistency.'
                  : 'Desbloquea logros por hitos especiales de horas de foco y regularidad.'}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 border-t border-white/10 pt-3 block">
              {isEn ? 'Verifiable collection' : 'Colección verificable'}
            </span>
          </div>

          {/* Diamonds */}
          <div className="p-7 sm:p-8 lg:p-9 rounded-[2rem] bg-zinc-950 border border-white/15 space-y-4 flex flex-col justify-between">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Gem size={22} />
            </div>
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-white">
                {isEn ? 'Diamonds' : 'Diamantes'}
              </h4>
              <p className="text-xs sm:text-sm lg:text-base text-zinc-400 mt-2 leading-relaxed">
                {isEn
                  ? 'Collect rewards in Focusly to redeem inside the customization shop.'
                  : 'Obtén recompensas dentro de Focusly para canjear en la tienda de personalización.'}
              </p>
            </div>
            <span className="text-xs font-mono text-zinc-500 border-t border-white/10 pt-3 block">
              {isEn ? 'Effort-backed currency' : 'Moneda de esfuerzo'}
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CONECTA */}
      {/* ========================================================================= */}
      <section id="conecta" className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12 lg:space-y-16 scroll-mt-28">
        <div className="space-y-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
            {isEn ? '05 • Fellowship without noise' : '05 • Compañerismo sin ruido'}
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black uppercase tracking-tight text-white">
            {isEn ? 'Connect' : 'Conecta'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl leading-relaxed">
            {isEn
              ? 'Community spaces built for mutual accountability, completely free from toxic algorithms.'
              : 'Espacios comunitarios diseñados para apoyarse mutuamente, libres de algoritmos tóxicos.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

          {/* Community */}
          <div className="p-10 sm:p-12 lg:p-14 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/15 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <Users size={28} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {isEn ? 'Community' : 'Comunidad'}
              </h3>
              <p className="text-base lg:text-lg font-semibold text-zinc-200">
                {isEn ? 'Share breakthroughs and momentum.' : 'Comparte experiencias y progreso.'}
              </p>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Post genuine victories against scrolling, celebrate demanding weeks, and draw motivation from other active members.'
                  : 'Publica victorias reales contra el scroll, celebra el fin de una semana exigente y encuentra inspiración en las rutinas de otros miembros activos.'}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-sm text-zinc-400 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-white" /> {isEn ? '100% focused on growth' : '100% enfocado en crecimiento'}
            </div>
          </div>

          {/* Chats */}
          <div className="p-10 sm:p-12 lg:p-14 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/15 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                {isEn ? 'Chats' : 'Salas de Chat'}
              </h3>
              <p className="text-base lg:text-lg font-semibold text-zinc-200">
                {isEn ? 'Connect with peers in quiet focus.' : 'Conversa con otros usuarios de forma enfocada.'}
              </p>
              <p className="text-sm lg:text-base text-zinc-400 leading-relaxed font-normal">
                {isEn
                  ? 'Themed silent study rooms and accountability partner channels. Zero spam, zero invasive pings.'
                  : 'Salas temáticas de estudio silencioso y canales con compañeros de responsabilidad. Sin distracciones, sin notificaciones invasivas.'}
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 text-sm text-zinc-400 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-white" /> {isEn ? 'Quiet study rooms & respectful exchange' : 'Salas de estudio e intercambio respetuoso'}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CIERRE DE PRODUCTIVIDAD */}
      {/* ========================================================================= */}
      <section className="max-w-5xl 2xl:max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 text-center space-y-10 border-t border-white/15">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center">
          <FocuslyIcon size={38} />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? (
              <>
                All your progress.<br />
                <span className="text-zinc-400">One place.</span>
              </>
            ) : (
              <>
                Todo tu progreso.<br />
                <span className="text-zinc-400">En un solo lugar.</span>
              </>
            )}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            {isEn
              ? 'Focusly is not an isolated app blocker: it is an all-in-one ecosystem to build deep focus, discipline, and lasting habits.'
              : 'Focusly no es un bloqueador de apps aislado: es un ecosistema completo para construir enfoque, disciplina y hábitos consistentes.'}
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={onFinish}
            className="bg-white text-black hover:bg-zinc-200 text-base sm:text-lg lg:text-xl font-bold tracking-tight px-10 py-5 lg:px-14 lg:py-6 rounded-full shadow-[0_15px_45px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
          >
            <span>{isEn ? 'Explore Focusly' : 'Explorar Focusly'}</span>
            <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </section>

    </div>
  );
}
