import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import focusImg from '../../assets/focus.png';
import silenceImg from '../../assets/silence.png';
import driveImg from '../../assets/drive.png';
import strengthImg from '../../assets/strength.png';
import { 
  Play, Check, Lock, Gift, Sparkles, Trophy, 
  ArrowRight, CheckCircle2, ChevronRight, Award
} from 'lucide-react';

export function MasterySystemShowcase({ onFinish }) {
  const [selectedPillar, setSelectedPillar] = useState('focus');
  const [activeNode, setActiveNode] = useState(1);
  const [quizAnswered, setQuizAnswered] = useState(null);
  const [chestOpened, setChestOpened] = useState(false);

  const PILLARS = {
    focus: {
      name: 'FOCUS',
      title: 'Concentración Absoluta',
      subtitle: 'Entrena tu atención sostenida eliminando micro-interrupciones y alcanzando estados de hiperfoco.',
      image: focusImg,
      stats: '12 Clases • 4 Quizzes • Insignia Láser',
    },
    silence: {
      name: 'SILENCIO',
      title: 'Desintoxicación Digital',
      subtitle: 'Silencia el bombardeo de notificaciones y reaprende a estar en calma sin necesidad de estímulos continuos.',
      image: silenceImg,
      stats: '10 Clases • 3 Desafíos • Insignia Zen',
    },
    drive: {
      name: 'IMPULSO',
      title: 'Ejecución y Rendimiento',
      subtitle: 'Transforma la procrastinación en acción rápida con la regla de los 5 segundos y micro-metas progresivas.',
      image: driveImg,
      stats: '14 Clases • 5 Retos • Insignia Imparable',
    },
    strength: {
      name: 'DISCIPLINA',
      title: 'Carácter y Hábitos',
      subtitle: 'Construye sistemas que funcionan incluso en tus días de baja motivación o fatiga.',
      image: strengthImg,
      stats: '15 Clases • Certificación • Insignia Titán',
    }
  };

  const currentPillar = PILLARS[selectedPillar];

  return (
    <section id="sistema-maestrias" className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10 space-y-20">
      
      {/* Apple-style Section Header */}
      <div className="max-w-4xl space-y-6">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
          Pedagogía Progresiva
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
          Sistema de Maestrías. <br />
          <span className="text-zinc-500">Aprende haciendo paso a paso.</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 font-medium leading-relaxed max-w-2xl pt-2">
          Sin teoría aburrida. Avanza a través de senderos dinámicos con lecciones condensadas de 2 minutos, quizzes interactivos con retroalimentación inmediata y recompensas reales.
        </p>
      </div>

      {/* PART 1: THE INTERACTIVE DUOLINGO-STYLE 3D NODE TRAIL (BOX-FREE) */}
      <div className="space-y-12">
        
        {/* Module Sub-bar */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
              Módulo Activo
            </span>
            <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
              Neurociencia del Foco y Dopamina
            </h4>
          </div>
          <div className="text-xs uppercase tracking-widest font-black text-zinc-400">
            Nivel: <span className="text-white">Intermedio</span> • XP: <span className="text-white">450 / 800</span>
          </div>
        </div>

        {/* The 4 Interactive Floating Nodes */}
        <div className="py-8 flex flex-wrap items-center justify-between gap-8 max-w-4xl mx-auto relative">
          
          {/* Node 1 */}
          <div 
            onClick={() => setActiveNode(1)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black transition-all ${
              activeNode === 1 
                ? 'bg-white text-black ring-4 ring-white/20 scale-105' 
                : 'bg-black border border-white/20 text-white hover:border-white'
            }`}>
              <Check size={26} strokeWidth={3} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              1. Foco Inicial
            </span>
            <span className="text-[9px] text-zinc-500 uppercase font-mono">Completado</span>
          </div>

          {/* Node 2 */}
          <div 
            onClick={() => setActiveNode(2)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black transition-all ${
              activeNode === 2 
                ? 'bg-white text-black ring-4 ring-white/20 scale-105' 
                : 'bg-black border border-white/20 text-white hover:border-white'
            }`}>
              <Play size={24} className={activeNode === 2 ? 'fill-black' : 'fill-white'} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              2. Quiz Neuro
            </span>
            <span className="text-[9px] text-zinc-400 uppercase font-mono">En curso</span>
          </div>

          {/* Node 3: Chest */}
          <div 
            onClick={() => { setActiveNode(3); setChestOpened(true); }}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black transition-all ${
              activeNode === 3 
                ? 'bg-white text-black ring-4 ring-white/20 scale-105' 
                : 'bg-black border border-white/20 text-white hover:border-white'
            }`}>
              <Gift size={24} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-white">
              3. Cofre
            </span>
            <span className="text-[9px] text-zinc-500 uppercase font-mono">+100 Gemas</span>
          </div>

          {/* Node 4: Cert */}
          <div 
            onClick={() => setActiveNode(4)}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center font-black transition-all ${
              activeNode === 4 
                ? 'bg-white text-black ring-4 ring-white/20 scale-105' 
                : 'bg-black border border-white/10 text-zinc-600 hover:border-white/30'
            }`}>
              <Award size={24} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-wider text-zinc-400">
              4. Certificado
            </span>
            <span className="text-[9px] text-zinc-600 uppercase font-mono">Nivel 3</span>
          </div>

        </div>

        {/* Minimal Open Active Node Details (Hairline borders, NO nested boxes) */}
        <div className="pt-8 border-t border-white/10 max-w-3xl mx-auto">
          {activeNode === 1 && (
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 block">
                Lección 01 • Concepto Clave
              </span>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white">
                La Regla de los 3 Segundos de Foco
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                Cuando sientas la urgencia refleja de consultar el teléfono, haz una pausa de 3 segundos conscientes. Tu cerebro pasa del sistema límbico automático a la corteza prefrontal analítica.
              </p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-white font-bold flex items-center gap-1.5">
                  <CheckCircle2 size={15} /> Lección completada
                </span>
                <button
                  onClick={() => setActiveNode(2)}
                  className="text-xs font-black uppercase tracking-widest text-white hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
                >
                  Continuar al Quiz →
                </button>
              </div>
            </div>
          )}

          {activeNode === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                  Quiz Interactivo • Prueba Rápida
                </span>
                <span className="text-xs font-mono font-bold text-white">
                  +50 XP
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                ¿Qué neurotransmisor genera la urgencia al scroll infinito?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'a', text: 'Serotonina', correct: false },
                  { id: 'b', text: 'Dopamina', correct: true },
                  { id: 'c', text: 'Melatonina', correct: false },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setQuizAnswered(opt.id)}
                    className={`py-4 px-5 rounded-full border text-xs font-black uppercase tracking-wider text-center transition-all cursor-pointer ${
                      quizAnswered === opt.id
                        ? opt.correct 
                          ? 'bg-white text-black border-white' 
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700 line-through'
                        : 'border-white/20 text-white hover:border-white'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {quizAnswered && (
                <div className="pt-3 flex items-center justify-between border-t border-white/10 text-xs">
                  <span className="text-zinc-300">
                    {quizAnswered === 'b' 
                      ? '✓ ¡Exacto! La dopamina anticipatoria activa el deseo de novedades continuas.' 
                      : '✗ Es la dopamina. ¡Avanza para reclamar la recompensa!'}
                  </span>
                  <button
                    onClick={() => {
                      setActiveNode(3);
                      setChestOpened(true);
                    }}
                    className="ml-4 shrink-0 px-4 py-2 rounded-full bg-white text-black font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-zinc-200"
                  >
                    Abrir Cofre →
                  </button>
                </div>
              )}
            </div>
          )}

          {activeNode === 3 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center font-black">
                <Gift size={28} />
              </div>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white">
                Cofre de Iniciación Desbloqueado
              </h4>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Recompensa acreditada: <strong className="text-white">+100 Gemas</strong> e insignia "Mente Imparable".
              </p>
              <button
                onClick={onFinish}
                className="mt-2 inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                <span>Reclamar en la App</span>
                <ArrowRight size={13} />
              </button>
            </div>
          )}

          {activeNode === 4 && (
            <div className="space-y-4 py-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 block">
                Certificación Oficial Focusly
              </span>
              <h4 className="text-2xl font-black uppercase tracking-tight text-white">
                Master en Foco Profundo & Productividad Cognitiva
              </h4>
              <p className="text-sm text-zinc-300 max-w-xl">
                Al completar las 4 rutas pedagógicas recibirás una credencial digital verificable que acredita tus horas de estudio profundo.
              </p>
              <button
                onClick={onFinish}
                className="bg-white text-black font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full cursor-pointer hover:bg-zinc-200"
              >
                Ver Programa en la App
              </button>
            </div>
          )}
        </div>

      </div>

      {/* PART 2: THE 4 PILLARS OF MASTERY (CINEMATIC OPEN SHOWCASE) */}
      <div className="space-y-10 pt-12 border-t border-white/10">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
              Las 4 Disciplinas Fundamentales
            </span>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              Arquitectura del Autodominio
            </h3>
          </div>

          {/* Minimalist Text Links (Apple Tab Style, NO BOX) */}
          <div className="flex items-center gap-6 text-xs font-black uppercase tracking-widest">
            {Object.keys(PILLARS).map((key) => {
              const p = PILLARS[key];
              const isSelected = selectedPillar === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedPillar(key)}
                  className={`pb-1 transition-all cursor-pointer relative ${
                    isSelected 
                      ? 'text-white' 
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {p.name}
                  {isSelected && (
                    <motion.div 
                      layoutId="activePillarTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Photography Asset Display */}
        <motion.div 
          key={selectedPillar}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden group bg-black border border-white/15"
        >
          <img 
            src={currentPillar.image} 
            alt={currentPillar.title} 
            className="w-full h-full object-cover object-center grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-8 sm:bottom-12 left-6 sm:left-12 right-6 sm:right-12 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 block">
                {currentPillar.stats}
              </span>
              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
                {currentPillar.name} • {currentPillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-lg">
                {currentPillar.subtitle}
              </p>
            </div>

            <button
              onClick={onFinish}
              className="bg-white text-black hover:bg-zinc-200 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>Explorar en la App</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
