import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, ArrowRight, ShieldCheck, Sparkles, 
  HelpCircle, Star, Shield, Lock, Clock, Award
} from 'lucide-react';

export function PricingROISection({ onFinish }) {
  const [billingCycle, setBillingCycle] = useState('annual'); // 'monthly' | 'annual' | 'lifetime'
  
  // Interactive ROI Calculator State
  const [lostHours, setLostHours] = useState(3.5); // hours/day
  const [hourlyValue, setHourlyValue] = useState(15); // USD/hour

  // Calculated values
  const monthlyLostHours = Math.round(lostHours * 30);
  const monthlyLostMoney = Math.round(monthlyLostHours * hourlyValue);
  const recoveredHoursMonthly = Math.round(monthlyLostHours * 0.65);
  const recoveredValueMonthly = Math.round(recoveredHoursMonthly * hourlyValue);

  return (
    <section id="planes-precios" className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 space-y-24">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
          Inversión de Alto Retorno
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
          Invierte en tu mente. <br />
          <span className="text-zinc-500">Recupera cientos de horas.</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 font-medium leading-relaxed max-w-2xl pt-2">
          Elige el nivel que mejor acompañe tus objetivos académicos y profesionales. Sin contratos forzosos. Cancela en cualquier momento con un solo clic.
        </p>
      </div>

      {/* 1. INTERACTIVE ROI CALCULATOR (OPEN & BOX-FREE) */}
      <div className="pt-8 space-y-12">
        <div className="space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 block">
            Simulador de Impacto Personal
          </span>
          <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            ¿Cuánto vale el tiempo que pierdes en redes?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium max-w-xl">
            Desplaza los selectores según tu uso real para estimar el valor cognitivo y económico que recuperas con Focusly cada mes:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Sliders Input Column (Clean Minimalist Sliders, NO BOX) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Slider 1: Daily Hours */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Horas diarias en el smartphone:
                </span>
                <span className="text-sm font-mono font-black text-white">
                  {lostHours} hrs / día
                </span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                step="0.5"
                value={lostHours}
                onChange={(e) => setLostHours(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
                <span>1h (Moderado)</span>
                <span>3.5h (Promedio)</span>
                <span>8h (Severo)</span>
              </div>
            </div>

            {/* Slider 2: Hourly Value */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                  Valor estimado de tu tiempo:
                </span>
                <span className="text-sm font-mono font-black text-white">
                  ${hourlyValue} USD / hora
                </span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="5"
                value={hourlyValue}
                onChange={(e) => setHourlyValue(Number(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer accent-white"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-500 uppercase">
                <span>$5/h (Estudiante)</span>
                <span>$20/h (Profesional)</span>
                <span>$50/h (Consultor)</span>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 leading-relaxed">
              * El 65% de recuperación se calcula a partir de los datos agregados de usuarios activos con bloqueo estricto durante 30 días continuos.
            </p>

          </div>

          {/* Results Column (Giant Clean Numbers, NO BOX) */}
          <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-16 space-y-8">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                Tiempo Recuperado Mensual
              </span>
              <div className="text-5xl sm:text-7xl font-mono font-black text-white tracking-tighter">
                +{recoveredHoursMonthly} Horas
              </div>
              <p className="text-xs text-zinc-400">
                Equivalente a leer 8 libros o completar 2 proyectos adicionales al mes.
              </p>
            </div>

            <div className="space-y-1 pt-4 border-t border-white/10">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                Valor Económico Recuperado
              </span>
              <div className="text-4xl sm:text-6xl font-mono font-black text-white tracking-tight">
                +${recoveredValueMonthly} USD
              </div>
              <p className="text-xs text-zinc-400">
                Frente a una inversión de apenas $2.99 USD/mes en Focusly Pro.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. PRICING SECTION - OPEN 3-COLUMN APPLE COMPARISON */}
      <div className="space-y-14 pt-8 border-t border-white/10">
        
        {/* Billing Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
              Planes de Suscripción
            </span>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Transparente y Directo
            </h3>
          </div>

          <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`pb-1 transition-colors cursor-pointer relative ${
                billingCycle === 'monthly' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Mensual
              {billingCycle === 'monthly' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>

            <button
              onClick={() => setBillingCycle('annual')}
              className={`pb-1 transition-colors cursor-pointer relative ${
                billingCycle === 'annual' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Anual (-45%)
              {billingCycle === 'annual' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>

            <button
              onClick={() => setBillingCycle('lifetime')}
              className={`pb-1 transition-colors cursor-pointer relative ${
                billingCycle === 'lifetime' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Vitalicio
              {billingCycle === 'lifetime' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
              )}
            </button>
          </div>
        </div>

        {/* 3 Columns Comparison (Clean Hairline Borders, NO HEAVY CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-y border-white/10">
          
          {/* TIER 1: STARTER */}
          <div className="py-10 md:py-8 md:pr-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Starter
                </span>
                <h4 className="text-2xl font-black uppercase tracking-tight text-white">
                  Gratuito
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Para iniciarse con la estética monocromática y temporizadores esenciales.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-mono font-black text-white">$0</div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Para siempre</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Temporizador Pomodoro clásico</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" />
                  <span>3 Clases iniciales de Maestrías</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Bloqueo manual de apps</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <span className="w-3 text-center">—</span>
                  <span>Sin Coach de Conducta IA</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-600">
                  <span className="w-3 text-center">—</span>
                  <span>Sin audio binaural 40Hz</span>
                </div>
              </div>
            </div>

            <button
              onClick={onFinish}
              className="w-full py-3.5 border border-white/20 text-white hover:border-white text-xs font-black uppercase tracking-widest rounded-full transition-all cursor-pointer"
            >
              Comenzar Gratis
            </button>
          </div>

          {/* TIER 2: FOCUSLY PRO (HIGHLIGHTED) */}
          <div className="py-10 md:py-8 md:px-8 flex flex-col justify-between space-y-8 relative">
            <div className="space-y-6">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">
                    Focusly Pro
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white text-black">
                    Recomendado
                  </span>
                </div>
                <h4 className="text-3xl font-black uppercase tracking-tight text-white">
                  Rendimiento Puro
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  El sistema integral contra la distracción para estudiantes de alto nivel y creadores.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-5xl font-mono font-black text-white">
                  ${billingCycle === 'lifetime' ? '69' : billingCycle === 'annual' ? '2.99' : '4.99'}
                </div>
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                  {billingCycle === 'lifetime' ? 'Pago único vitalicio' : 'USD al mes'}
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-white">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" strokeWidth={3} />
                  <span><strong>Todas las Maestrías y Quizzes</strong> (50+ módulos)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" strokeWidth={3} />
                  <span><strong>Bloqueo Nuclear Imposible de Evadir</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" strokeWidth={3} />
                  <span><strong>Coach de Conducta IA Ilimitado</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" strokeWidth={3} />
                  <span><strong>Audio Binaural Gamma 40Hz & Ruido Rosa</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" strokeWidth={3} />
                  <span>Sincronización multi-dispositivo inmediata</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" strokeWidth={3} />
                  <span>Garantía de satisfacción de 30 días</span>
                </div>
              </div>
            </div>

            <button
              onClick={onFinish}
              className="w-full py-4 bg-white text-black hover:bg-zinc-200 text-xs font-black uppercase tracking-widest rounded-full transition-all cursor-pointer shadow-xl flex items-center justify-center gap-2"
            >
              <span>Activar Focusly Pro</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* TIER 3: MASTERY CLUB */}
          <div className="py-10 md:py-8 md:pl-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  Mastery Club
                </span>
                <h4 className="text-2xl font-black uppercase tracking-tight text-white">
                  Élite & Vitalicio
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Para quienes quieren dominar su atención con acceso a futuras maestrías de por vida.
                </p>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-mono font-black text-white">$149</div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Licencia única definitiva</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Todo lo incluido en Focusly Pro de por vida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Acceso anticipado a nuevas maestrías</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Sesiones mensuales de mentoría grupales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-white shrink-0" />
                  <span>Insignia de Miembro Fundador Vitalicio</span>
                </div>
              </div>
            </div>

            <button
              onClick={onFinish}
              className="w-full py-3.5 border border-white/20 text-white hover:border-white text-xs font-black uppercase tracking-widest rounded-full transition-all cursor-pointer"
            >
              Unirse al Club
            </button>
          </div>

        </div>

      </div>

      {/* 3. GUARANTEE / APPLE ACCREDITATION STRIP */}
      <div className="py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck size={18} className="text-white" />
          <span>Garantía de 30 días con 100% de devolución si no recuperas tu tiempo.</span>
        </div>
        <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest font-mono text-zinc-500">
          <span>Cancela en 1 Clic</span>
          <span>•</span>
          <span>Cero Venta de Datos</span>
          <span>•</span>
          <span>Cifrado Local</span>
        </div>
      </div>

    </section>
  );
}
