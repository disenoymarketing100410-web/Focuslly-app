import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FocuslyIcon } from '../FocuslyLogo';
import {
  Crown, Sparkles, Check, ArrowRight, Shield, Zap,
  Brain, BarChart3, Gem, Lock, Trophy, Award, Clock
} from 'lucide-react';

const focuslySlogan = '/focusly-slogan.svg';

export function FocuslyProPage({ 
  onFinish = () => {}, 
  onSelectTab = () => {},
  lang = 'es'
}) {
  const isEn = lang === 'en';

  // Simple billing toggle for transparent estimation
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual'

  const FREE_FEATURES = isEn ? [
    { title: 'Core Focusly experience', desc: 'Access to the core interface and essential focus timer tools.' },
    { title: 'Guided Challenges', desc: 'Participate in guided 7-day challenges like the Dopamine Reset.' },
    { title: 'Habit tracking', desc: 'Build and track daily habits with streak validation.' },
    { title: 'Essential organization', desc: 'Interactive calendar and priority daily task management.' },
    { title: 'Progress system', desc: 'XP accrual, streak maintenance, and weekly leagues participation.' }
  ] : [
    { title: 'Experiencia esencial Focusly', desc: 'Acceso a la interfaz principal y herramientas esenciales de concentración.' },
    { title: 'Desafíos guiados', desc: 'Participa en desafíos guiados de 7 días como el Dopamine Reset.' },
    { title: 'Registro de hábitos', desc: 'Crea y registra tus hábitos diarios con control de cumplimiento.' },
    { title: 'Organización básica', desc: 'Calendario interactivo y gestión de tareas prioritarias del día.' },
    { title: 'Sistema de progreso', desc: 'Acumulación de XP, mantenimiento de rachas y participación en ligas.' }
  ];

  const PRO_FEATURES = isEn ? [
    {
      title: 'Advanced coaching',
      desc: 'Personalized recommendations and bio-synchronized prompts based on your peak energy hours.',
      status: 'included'
    },
    {
      title: 'Learning content',
      desc: 'Full library of micro-lessons on neuroscience, memory retrieval, and the Feynman technique.',
      status: 'included'
    },
    {
      title: 'Masteries',
      desc: 'Interactive node-based mastery paths to conquer active recall and conceptual synthesis.',
      status: 'future'
    },
    {
      title: 'Advanced insights',
      desc: 'Deep analytics on your peak clarity hours and distraction patterns.',
      status: 'future'
    },
    {
      title: 'Exclusive rewards',
      desc: 'Distinctive merit badges, OLED ultra-contrast themes, and advanced personalization.',
      status: 'included'
    }
  ] : [
    {
      title: 'Coaching avanzado',
      desc: 'Recomendaciones personalizadas y asistencia bio-sincronizada según tus horas pico de energía.',
      status: 'included'
    },
    {
      title: 'Contenido formativo',
      desc: 'Biblioteca completa de micro-lecciones sobre neurociencia, memoria y técnica Feynman.',
      status: 'included'
    },
    {
      title: 'Maestrías',
      desc: 'Rutas didácticas interactivas por nodos para dominar active recall y síntesis conceptual.',
      status: 'future'
    },
    {
      title: 'Analítica avanzada',
      desc: 'Análisis detallado de tus horas de máxima lucidez y patrones de desconexión.',
      status: 'future'
    },
    {
      title: 'Recompensas exclusivas',
      desc: 'Emblemas de mérito únicos, temas de alto contraste OLED y personalización avanzada.',
      status: 'included'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white space-y-32 sm:space-y-44 lg:space-y-52 pb-36 pt-8">

      {/* ========================================================================= */}
      {/* 1. HERO — CHOOSE YOUR WAY TO FOCUS */}
      {/* ========================================================================= */}
      <section className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 lg:pt-20 text-center space-y-10 lg:space-y-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/15 text-zinc-300 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] backdrop-blur-xl shadow-[0_2px_15px_rgba(255,255,255,0.05)]"
        >
          <Crown size={16} className="text-white" />
          <span>{isEn ? 'Membership & Plans' : 'Membresías y Planes'}</span>
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
                Choose your way<br />
                <span className="text-zinc-400">to focus.</span>
              </>
            ) : (
              <>
                Elige tu forma<br />
                <span className="text-zinc-400">de enfocarte.</span>
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
              ? 'Start with the essentials or unlock the full Focusly experience.'
              : 'Comienza con lo esencial o desbloquea la experiencia Focusly completa.'}
          </motion.p>
        </div>

        {/* Transparent Period Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="inline-flex items-center p-1.5 rounded-full bg-white/5 border border-white/15 shadow-sm"
        >
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              billingCycle === 'annual'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isEn ? 'Annual (Save 25%)' : 'Anual (Ahorro 25%)'}
          </button>
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-white text-black shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {isEn ? 'Monthly' : 'Mensual'}
          </button>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. COMPARACIÓN DIRECTA: FREE VS PRO */}
      {/* ========================================================================= */}
      <section className="max-w-6xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          
          {/* TARJETA 1: FREE */}
          <div className="p-10 sm:p-12 lg:p-14 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/15 space-y-10 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-500 block">
                  {isEn ? 'Essential' : 'Esencial'}
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">FREE</h3>
                <p className="text-base sm:text-lg lg:text-xl text-zinc-300 font-medium">
                  {isEn ? 'To start building your focus.' : 'Para comenzar a construir tu enfoque.'}
                </p>
              </div>

              <div className="pt-2 pb-6 border-b border-white/10 space-y-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-5xl lg:text-6xl font-black text-white font-mono">$0</span>
                  <span className="text-sm text-zinc-500 font-medium">
                    {isEn ? 'Forever free' : 'Para siempre'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {isEn
                    ? 'All core tools to organize your days at zero cost.'
                    : 'Todas las herramientas nucleares para organizar tus jornadas sin costo.'}
                </p>
              </div>

              {/* Clean checklist of actual defined features */}
              <div className="space-y-5 text-sm">
                <span className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider block">
                  {isEn ? 'Includes:' : 'Incluye:'}
                </span>
                {FREE_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-bold text-white block text-base">{feat.title}</span>
                      <span className="text-zinc-400 text-xs sm:text-sm leading-relaxed block mt-0.5">{feat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 border-t border-white/10">
              <button
                onClick={onFinish}
                className="w-full bg-white/10 hover:bg-white/15 text-white text-sm sm:text-base font-bold uppercase tracking-wider py-5 rounded-full transition-all cursor-pointer border border-white/15 text-center"
              >
                {isEn ? 'Start with Focusly (Free)' : 'Comenzar con Focusly (Gratis)'}
              </button>
            </div>
          </div>

          {/* TARJETA 2: PRO */}
          <div className="p-10 sm:p-12 lg:p-14 rounded-[2.5rem] lg:rounded-[3rem] bg-zinc-950 border border-white/40 shadow-[0_25px_80px_rgba(255,255,255,0.08)] space-y-10 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top metallic badge */}
            <div className="absolute top-6 right-8">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black bg-white px-4 py-1.5 rounded-full shadow-md">
                {isEn ? 'Full Experience' : 'Experiencia Completa'}
              </span>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-400 block">
                  {isEn ? 'Advanced' : 'Avanzado'}
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <span>PRO</span>
                  <Crown size={28} className="text-white" />
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-zinc-200 font-medium">
                  {isEn ? 'To take your deep work further.' : 'Para llevar tu experiencia más lejos.'}
                </p>
              </div>

              <div className="pt-2 pb-6 border-b border-white/10 space-y-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-5xl lg:text-6xl font-black text-white font-mono">
                    {billingCycle === 'annual' ? '$4.99' : '$6.99'}
                  </span>
                  <span className="text-sm text-zinc-400 font-medium">
                    {isEn ? '/ month' : '/ mes'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  {billingCycle === 'annual' 
                    ? (isEn ? 'Billed annually ($59.88/yr)' : 'Facturado anualmente ($59.88/año)') 
                    : (isEn ? 'Billed monthly' : 'Facturado mensualmente')}
                </p>
              </div>

              {/* Clean checklist of Pro features */}
              <div className="space-y-5 text-sm">
                <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider block">
                  {isEn ? 'Everything in Free, plus:' : 'Todo lo de Free, más:'}
                </span>
                {PRO_FEATURES.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-white block text-base">{feat.title}</span>
                        {feat.status === 'future' && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-zinc-400">
                            {isEn ? 'Coming Soon' : 'Próximamente'}
                          </span>
                        )}
                      </div>
                      <span className="text-zinc-400 text-xs sm:text-sm leading-relaxed block mt-0.5">{feat.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 border-t border-white/10">
              <button
                onClick={onFinish}
                className="w-full bg-white hover:bg-zinc-200 text-black text-sm sm:text-base font-black uppercase tracking-wider py-5 rounded-full transition-all cursor-pointer shadow-[0_15px_40px_rgba(255,255,255,0.25)] text-center hover:scale-[1.02] active:scale-[0.98]"
              >
                {isEn ? 'Explore Focusly Pro' : 'Explorar Focusly Pro'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. RESUMEN DE DIFERENCIAS CLAVE */}
      {/* ========================================================================= */}
      <section className="max-w-5xl 2xl:max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
            {isEn ? 'Differences at a glance' : 'Diferencias en un vistazo'}
          </h3>
          <p className="text-sm sm:text-base text-zinc-400">
            {isEn ? 'Understand the core distinction in under 5 seconds.' : 'Comprende la distinción esencial en menos de 5 segundos.'}
          </p>
        </div>

        <div className="p-8 sm:p-10 lg:p-14 rounded-[2.5rem] bg-zinc-950 border border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-mono font-bold text-zinc-500 uppercase">Focusly Free</span>
            <p className="text-base sm:text-lg font-semibold text-white">
              {isEn ? 'Essential habit-building and distraction control' : 'Construcción básica de hábitos y control'}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {isEn
                ? 'Designed for students or anyone seeking a distraction-free tool to organize their daily routine at no cost.'
                : 'Diseñado para estudiantes o personas que buscan una herramienta sobria para evitar distracciones y organizar su tiempo diario sin costo.'}
            </p>
          </div>
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase flex items-center gap-2">
              <Crown size={16} /> Focusly Pro
            </span>
            <p className="text-base sm:text-lg font-semibold text-white">
              {isEn ? 'Deep coaching, masterclasses, and focus analytics' : 'Acompañamiento profundo y aprendizaje'}
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              {isEn
                ? 'Designed for those seeking a qualitative cognitive leap: adaptive coaching, neuroscience masterclasses, and deep focus analytics.'
                : 'Diseñado para quienes buscan un salto cognitivo cualitativo: coaching adaptativo, masterclasses de neurociencia y métricas analíticas de concentración.'}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CTA ELEGANTE Y CONFIABLE */}
      {/* ========================================================================= */}
      <section className="max-w-5xl 2xl:max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 text-center space-y-10 border-t border-white/15">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center">
          <FocuslyIcon size={38} />
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-black tracking-tight text-white uppercase">
            {isEn ? 'Ready to take control?' : '¿Listo para tomar el control?'}
          </h2>
          <p className="text-base sm:text-xl lg:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'Start today with the free version or experience the full system.'
              : 'Comienza hoy mismo con la versión gratuita o prueba la experiencia completa.'}
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
          <button
            onClick={onFinish}
            className="bg-white/5 hover:bg-white/10 text-white text-base sm:text-lg lg:text-xl font-bold tracking-tight px-10 py-5 lg:px-14 lg:py-6 rounded-full border border-white/15 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{isEn ? 'Explore Focusly Pro' : 'Explorar Focusly Pro'}</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-zinc-500 font-medium">
          {isEn
            ? 'No commitment required • Cancel anytime in a single click'
            : 'Sin permanencia obligatoria • Cancela cuando quieras en un solo clic'}
        </p>
      </section>

    </div>
  );
}
