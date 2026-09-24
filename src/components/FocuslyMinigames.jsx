import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Zap,
  Play,
  Check,
  RotateCcw,
  Trophy,
  Gem,
  Brain,
  LayoutGrid,
  Activity,
  Target,
  BookOpen,
  Sparkles,
  Timer,
  Heart,
  HelpCircle,
  Lightbulb,
  Flame,
  ShieldAlert,
  Shield,
  Star,
  Crown,
  ChevronRight,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide
} from 'lucide-react';

// ============================================================================
// DATA BANKS
// ============================================================================

export const EXTENDED_MILLIONAIRE_QS = [
  // FASE 1: BRONCE (Fundamentos & Hábitos)
  {
    tier: 1,
    category: 'Neurociencia',
    q: '¿Qué neurotransmisor es el principal responsable del circuito de búsqueda y recompensa en el cerebro?',
    options: ['Dopamina', 'Melatonina', 'Insulina', 'Glucagón'],
    answer: 0,
    hint: 'Se dispara cuando anticipas una recompensa o cuando recibes una notificación en el móvil.'
  },
  {
    tier: 1,
    category: 'Productividad',
    q: '¿Cuál es la duración clásica de un bloque de trabajo en la técnica Pomodoro?',
    options: ['15 minutos', '25 minutos', '45 minutos', '60 minutos'],
    answer: 1,
    hint: 'Fue inventada por Francesco Cirillo usando un reloj con forma de tomate.'
  },
  {
    tier: 1,
    category: 'Cultura General',
    q: '¿Cuál es el gas más abundante en la atmósfera terrestre?',
    options: ['Oxígeno', 'Dióxido de Carbono', 'Nitrógeno', 'Helio'],
    answer: 2,
    hint: 'Constituye aproximadamente el 78% del aire que respiramos.'
  },
  {
    tier: 1,
    category: 'Filosofía',
    q: '¿Qué emperador romano escribió sus reflexiones estoicas personales en "Meditaciones"?',
    options: ['Nerón', 'Marco Aurelio', 'Julio César', 'Trajano'],
    answer: 1,
    hint: 'Gobernó entre 161 y 180 d.C. y es considerado el último de los "Cinco Buenos Emperadores".'
  },
  {
    tier: 1,
    category: 'Ciencia',
    q: '¿Qué elemento de la tabla periódica está representado por el símbolo "Au"?',
    options: ['Plata', 'Oro', 'Argón', 'Uranio'],
    answer: 1,
    hint: 'Proviene del latín "aurum", que significa brillante aurora.'
  },

  // FASE 2: PLATA (Enfoque Profundo & Psicología)
  {
    tier: 2,
    category: 'Psicología',
    q: '¿Qué psicólogo húngaro acuñó el concepto del estado de "Flujo" (Flow)?',
    options: ['Carl Jung', 'Mihály Csíkszentmihályi', 'Sigmund Freud', 'Abraham Maslow'],
    answer: 1,
    hint: 'Su apellido es famoso por ser un trabalenguas para muchos y describe la inmersión total.'
  },
  {
    tier: 2,
    category: 'Filosofía',
    q: '¿Qué filósofo estoico nació esclavo y enseñó la dicotomía del control en su "Manual"?',
    options: ['Séneca', 'Zenón de Citio', 'Epicteto', 'Cleantes'],
    answer: 2,
    hint: 'Su lema central era: "No depende de las cosas que nos suceden, sino de cómo reaccionamos".'
  },
  {
    tier: 2,
    category: 'Astronomía',
    q: '¿Aproximadamente cuántos minutos tarda la luz del Sol en llegar a la Tierra?',
    options: ['3 minutos', '8 minutos y 20 segundos', '15 minutos', 'Instantáneo'],
    answer: 1,
    hint: 'La distancia media es de 150 millones de km y la luz viaja a 300,000 km/s.'
  },
  {
    tier: 2,
    category: 'Neurociencia',
    q: '¿Qué estructura cerebral tiene forma de caballito de mar y es vital para consolidar la memoria?',
    options: ['Hipotálamo', 'Amígdala', 'Hipocampo', 'Cerebelo'],
    answer: 2,
    hint: 'Su nombre en griego antiguo significa literalmente "monstruo marino con cola de caballo".'
  },
  {
    tier: 2,
    category: 'Historia',
    q: '¿En qué año el hombre pisó la Luna por primera vez en la misión Apolo 11?',
    options: ['1965', '1969', '1971', '1975'],
    answer: 1,
    hint: 'Neil Armstrong pronunció su famosa frase a finales de la década de los 60.'
  },

  // FASE 3: ORO (Maestría & Pensamiento Crítico)
  {
    tier: 3,
    category: 'Productividad',
    q: '¿Qué ley afirma que "el trabajo se expande hasta llenar el tiempo disponible para su realización"?',
    options: ['Ley de Moore', 'Ley de Parkinson', 'Principio de Pareto', 'Navaja de Ockham'],
    answer: 1,
    hint: 'Formulada por Cyril Northcote en 1955; explica por qué entregamos a última hora.'
  },
  {
    tier: 3,
    category: 'Filosofía',
    q: '¿Quién escribió en "Sobre la brevedad de la vida" que no tenemos poco tiempo, sino que perdemos mucho?',
    options: ['Séneca', 'Platón', 'Aristóteles', 'Cicerón'],
    answer: 0,
    hint: 'Fue tutor de Nerón y uno de los oradores y dramaturgos más ricos de Roma.'
  },
  {
    tier: 3,
    category: 'Psicología',
    q: '¿Qué fenómeno psicológico describe que recordamos mejor las tareas interrumpidas que las concluidas?',
    options: ['Efecto Zeigarnik', 'Efecto Halo', 'Efecto Dunning-Kruger', 'Efecto Mandela'],
    answer: 0,
    hint: 'Fue descubierto por una psicóloga soviética observando camareros en un restaurante de Viena.'
  },
  {
    tier: 3,
    category: 'Ciencia',
    q: '¿Qué físico postuló el principio de incertidumbre en la mecánica cuántica?',
    options: ['Niels Bohr', 'Werner Heisenberg', 'Max Planck', 'Erwin Schrödinger'],
    answer: 1,
    hint: 'Establece que no se puede conocer simultáneamente la posición y el momento exactos de una partícula.'
  },
  {
    tier: 3,
    category: 'Neurociencia',
    q: '¿Qué red neuronal cerebral se activa cuando dejamos de enfocarnos y divagamos en pensamientos espontáneos?',
    options: ['Red de Salencia', 'Red por Defecto (DMN)', 'Corteza Motora', 'Red Atencional Dorsal'],
    answer: 1,
    hint: 'En inglés se conoce como Default Mode Network (DMN).'
  }
];

export const EXTENDED_STOIC_QUOTES = [
  {
    level: 1,
    author: 'Epicteto',
    phrase: 'No nos afecta lo que sucede sino lo que pensamos',
    distractors: ['ayer', 'siempre'],
    lesson: 'El sufrimiento proviene de nuestro juicio sobre los hechos, no de los hechos en sí.'
  },
  {
    level: 2,
    author: 'Marco Aurelio',
    phrase: 'La felicidad de tu vida depende de la calidad de tus pensamientos',
    distractors: ['éxito', 'dinero'],
    lesson: 'Cultiva una mente ordenada y virtuosa; ese es tu único refugio inexpugnable.'
  },
  {
    level: 3,
    author: 'Séneca',
    phrase: 'No es que tengamos poco tiempo sino que perdemos mucho',
    distractors: ['oro', 'sueño', 'mañana'],
    lesson: 'La vida es suficientemente larga si sabemos en qué invertir cada instante presente.'
  },
  {
    level: 4,
    author: 'Viktor Frankl',
    phrase: 'Al hombre se le puede arrebatar todo salvo la última de las libertades',
    distractors: ['fuerza', 'riqueza', 'gloria'],
    lesson: 'Entre el estímulo y la respuesta siempre existe nuestro poder soberano de elegir.'
  },
  {
    level: 5,
    author: 'Marco Aurelio',
    phrase: 'El obstáculo en el camino se convierte en el camino mismo',
    distractors: ['dolor', 'destino', 'miedo'],
    lesson: 'Toda adversidad es combustible para entrenar la paciencia, el ingenio y el coraje estoico.'
  }
];

// ============================================================================
// MODAL SHELL WRAPPER (Garantiza aspecto impecable en móvil y escritorio)
// ============================================================================

export const MinigameModalShell = ({
  game,
  onClose,
  level,
  totalLevels,
  currentXP,
  currentDiamonds,
  isLight,
  children
}) => {
  const Icon = game?.icon || Zap;

  return (
    <div className="fixed inset-0 z-[650] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        className={`w-full max-w-2xl h-[92vh] sm:h-auto sm:max-h-[88vh] rounded-[28px] sm:rounded-[36px] border shadow-2xl flex flex-col overflow-hidden relative ${
          isLight
            ? 'bg-zinc-50 border-zinc-200 text-zinc-900'
            : 'bg-zinc-950 border-zinc-800 text-zinc-100'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`px-5 sm:px-7 py-4 border-b flex items-center justify-between gap-3 shrink-0 ${
            isLight
              ? 'bg-white border-zinc-200/80'
              : 'bg-zinc-900/80 border-zinc-800/80'
          }`}
        >
          {/* Game Title & Category */}
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border ${
                isLight
                  ? 'bg-zinc-100 border-zinc-200 text-zinc-900'
                  : 'bg-zinc-800 border-zinc-700 text-white'
              }`}
            >
              <Icon size={20} className="text-amber-500" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-black uppercase tracking-tight truncate">
                {game?.title || 'Minijuego'}
              </h2>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs text-zinc-400 font-semibold">
                <span className="uppercase tracking-wider">
                  {game?.subtitle || 'Entrenamiento Mental'}
                </span>
                {totalLevels && (
                  <>
                    <span>•</span>
                    <span className="font-bold text-amber-500">
                      Nivel {level} de {totalLevels}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Rewards & Close */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${
                isLight
                  ? 'bg-zinc-100 border-zinc-200 text-zinc-700'
                  : 'bg-zinc-800/80 border-zinc-700 text-zinc-300'
              }`}
            >
              <span className="text-amber-500">+{currentXP || game?.rewardXP || 40} XP</span>
              <span className="text-zinc-400">|</span>
              <span className="flex items-center gap-1 text-sky-500">
                <Gem size={13} /> +{currentDiamonds || game?.rewardDia || 15}
              </span>
            </div>

            <button
              onClick={onClose}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                isLight
                  ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600 border-zinc-200'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
              }`}
              title="Cerrar juego"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Level Steps Indicator (if multi-level) */}
        {totalLevels && totalLevels > 1 && (
          <div
            className={`px-6 py-2 border-b flex items-center justify-center gap-2 shrink-0 ${
              isLight ? 'bg-zinc-100/60 border-zinc-200/50' : 'bg-zinc-900/40 border-zinc-800/50'
            }`}
          >
            {Array.from({ length: totalLevels }).map((_, i) => {
              const step = i + 1;
              const isPast = step < level;
              const isCurrent = step === level;
              return (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isPast
                      ? 'w-6 bg-emerald-500'
                      : isCurrent
                      ? 'w-10 bg-amber-500 shadow-sm'
                      : 'w-4 bg-zinc-300 dark:bg-zinc-700'
                  }`}
                  title={`Nivel ${step}`}
                />
              );
            })}
          </div>
        )}

        {/* Dynamic Game Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================================
// 1. REFLEJOS ZEN (5 NIVELES + TRAMPAS DE IMPULSO)
// ============================================================================

export const MinigameReflex = ({ game, onClose, addXP, addDiamonds, isLight }) => {
  const [gameState, setGameState] = useState('idle'); // idle, waiting, decoy, ready, won_level, lost, won_all
  const [level, setLevel] = useState(1);
  const [reactionTime, setReactionTime] = useState(null);
  const [lossReason, setLossReason] = useState('');
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);

  const TOTAL_LEVELS = 5;

  const getTargetTime = (lvl) => {
    switch (lvl) {
      case 1: return 450;
      case 2: return 380;
      case 3: return 320;
      case 4: return 270;
      case 5: return 230;
      default: return 300;
    }
  };

  const startGame = (next = false) => {
    const nextLvl = next ? level + 1 : 1;
    if (!next) setLevel(1);
    else setLevel(nextLvl);

    setGameState('waiting');
    setReactionTime(null);
    setLossReason('');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Levels 3, 4, and 5 can have a decoy flash first to test cognitive inhibition
    const willDecoy = nextLvl >= 3 && Math.random() > 0.4;
    const initialDelay = Math.random() * 2200 + 1400;

    if (willDecoy) {
      timeoutRef.current = setTimeout(() => {
        setGameState('decoy');
        // Decoy lasts 600ms then goes back to waiting, then turns ready
        timeoutRef.current = setTimeout(() => {
          setGameState('waiting');
          timeoutRef.current = setTimeout(() => {
            setGameState('ready');
            startTimeRef.current = Date.now();
          }, Math.random() * 1400 + 800);
        }, 600);
      }, initialDelay);
    } else {
      timeoutRef.current = setTimeout(() => {
        setGameState('ready');
        startTimeRef.current = Date.now();
      }, initialDelay);
    }
  };

  const handleTap = () => {
    if (gameState === 'waiting') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setLossReason('¡Te precipitaste antes de la señal! Respira hondo y controla el impulso.');
      setGameState('lost');
    } else if (gameState === 'decoy') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setLossReason('¡Caíste en la trampa! Solo debes tocar cuando la pantalla se ponga VERDE.');
      setGameState('lost');
    } else if (gameState === 'ready') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      const target = getTargetTime(level);

      if (time <= target) {
        if (level < TOTAL_LEVELS) {
          setGameState('won_level');
        } else {
          setGameState('won_all');
          addXP(game?.rewardXP || 50);
          addDiamonds(game?.rewardDia || 20);
        }
      } else {
        setLossReason(`Tiempo de reacción: ${time}ms. El objetivo era < ${target}ms. Necesitas más velocidad.`);
        setGameState('lost');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <MinigameModalShell
      game={game}
      onClose={onClose}
      level={level}
      totalLevels={TOTAL_LEVELS}
      isLight={isLight}
    >
      <div className="w-full max-w-md flex flex-col items-center justify-center text-center">
        {gameState === 'idle' && (
          <div className="space-y-6">
            <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-500">
              <Zap size={44} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Velocidad Neuronal & Enfoque</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Supera 5 niveles de reflejos de milisegundos. En niveles avanzados habrá <strong>señales trampa rojas</strong> para evaluar tu control de impulsos.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500">
              Objetivo Nivel 1: <span className="text-amber-500 font-bold">&lt; {getTargetTime(1)} ms</span>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Comenzar Nivel 1
            </button>
          </div>
        )}

        {(gameState === 'waiting' || gameState === 'decoy' || gameState === 'ready') && (
          <div className="w-full space-y-4">
            <div className="flex justify-between items-center px-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <span>Nivel {level}</span>
              <span>Límite: &lt; {getTargetTime(level)}ms</span>
            </div>

            <div
              onClick={handleTap}
              className={`w-full aspect-[4/3] rounded-3xl flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-100 select-none shadow-lg border-2 ${
                gameState === 'ready'
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-500/20'
                  : gameState === 'decoy'
                  ? 'bg-rose-600 border-rose-400 text-white shadow-rose-500/20 animate-pulse'
                  : 'bg-zinc-800 border-zinc-700 text-zinc-300'
              }`}
            >
              {gameState === 'ready' ? (
                <div className="space-y-2 text-center">
                  <Zap size={48} className="mx-auto animate-bounce" />
                  <span className="text-3xl sm:text-4xl font-black uppercase tracking-tight block">
                    ¡TOCA AHORA!
                  </span>
                  <span className="text-xs font-bold opacity-90 block">¡Velocidad máxima!</span>
                </div>
              ) : gameState === 'decoy' ? (
                <div className="space-y-2 text-center">
                  <ShieldAlert size={48} className="mx-auto" />
                  <span className="text-2xl sm:text-3xl font-black uppercase tracking-tight block">
                    ¡TRAMPA! NO TOQUES
                  </span>
                  <span className="text-xs font-bold opacity-80 block">Espera a que sea VERDE</span>
                </div>
              ) : (
                <div className="space-y-2 text-center">
                  <Timer size={44} className="mx-auto opacity-40 animate-pulse" />
                  <span className="text-2xl font-black uppercase tracking-tight block">
                    ESPERA EL VERDE...
                  </span>
                  <span className="text-xs text-zinc-400 block font-medium">Mantén el dedo listo sin presionar</span>
                </div>
              )}
            </div>
          </div>
        )}

        {gameState === 'won_level' && (
          <div className="space-y-5">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
              <Check size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">¡Nivel {level} Superado!</h3>
              <p className="text-sm text-zinc-400 mt-2">
                Tu tiempo de reacción:{' '}
                <strong className="text-emerald-500 font-black text-lg">{reactionTime} ms</strong>{' '}
                (Objetivo: &lt; {getTargetTime(level)} ms)
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-500">
              Próximo objetivo Nivel {level + 1}: <strong className="text-amber-500">&lt; {getTargetTime(level + 1)} ms</strong>.
            </div>
            <button
              onClick={() => startGame(true)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Avanzar al Nivel {level + 1}
            </button>
          </div>
        )}

        {gameState === 'won_all' && (
          <div className="space-y-5">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Trophy size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">¡Maestría Neuronal Absoluta!</h3>
              <p className="text-sm text-zinc-400 mt-2">
                Completaste los 5 niveles con tiempo de reacción récord de{' '}
                <strong className="text-amber-500 font-bold">{reactionTime} ms</strong>. Tu cerebro está en óptimo estado de vigilia.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Reclamar Recompensa & Salir
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="space-y-5">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <X size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Fallo de Enfoque</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
                {lossReason || 'No lograste el objetivo de tiempo o tocaste antes de tiempo.'}
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Reintentar desde Nivel 1
            </button>
          </div>
        )}
      </div>
    </MinigameModalShell>
  );
};

// ============================================================================
// 2. MEMORIZA (5 NIVELES: DE 6 HASTA 20 CARTAS + COMBO)
// ============================================================================

export const MinigameMemory = ({ game, onClose, addXP, addDiamonds, isLight }) => {
  const ICONS_BANK = [
    Zap, Flame, Target, Star, Heart, Brain, Crown, Shield,
    Sparkles, Gem, Activity, BookOpen
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [errors, setErrors] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('idle');
  const [combo, setCombo] = useState(0);

  const TOTAL_LEVELS = 5;

  const getPairsCount = (lvl) => {
    switch (lvl) {
      case 1: return 3;  // 6 cartas (3x2)
      case 2: return 4;  // 8 cartas (4x2)
      case 3: return 6;  // 12 cartas (4x3)
      case 4: return 8;  // 16 cartas (4x4)
      case 5: return 10; // 20 cartas (5x4)
      default: return 4;
    }
  };

  const getMaxErrors = (lvl) => {
    switch (lvl) {
      case 1: return 4;
      case 2: return 5;
      case 3: return 6;
      case 4: return 7;
      case 5: return 8;
      default: return 5;
    }
  };

  const startGame = (next = false) => {
    const currentLvl = next ? level + 1 : 1;
    if (!next) setLevel(1);
    else setLevel(currentLvl);

    const pairs = getPairsCount(currentLvl);
    const selectedIcons = ICONS_BANK.slice(0, pairs);
    let deck = [...selectedIcons, ...selectedIcons].map((icon, i) => ({
      id: i,
      icon,
      uid: Math.random()
    }));
    deck.sort((a, b) => a.uid - b.uid);

    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setErrors(0);
    setCombo(0);
    setGameState('playing');
  };

  const handleCardClick = (idx) => {
    if (gameState !== 'playing' || flipped.length >= 2 || flipped.includes(idx) || matched.includes(idx)) {
      return;
    }

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);
        setCombo(c => c + 1);

        if (newMatched.length === cards.length) {
          if (level < TOTAL_LEVELS) {
            setGameState('won_level');
          } else {
            setGameState('won_all');
            addXP(game?.rewardXP || 60);
            addDiamonds(game?.rewardDia || 25);
          }
        }
      } else {
        setCombo(0);
        setTimeout(() => {
          setFlipped([]);
          setErrors(e => {
            const nextE = e + 1;
            if (nextE >= getMaxErrors(level)) {
              setGameState('lost');
            }
            return nextE;
          });
        }, 800);
      }
    }
  };

  const maxE = getMaxErrors(level);
  const livesLeft = Math.max(0, maxE - errors);

  return (
    <MinigameModalShell
      game={game}
      onClose={onClose}
      level={level}
      totalLevels={TOTAL_LEVELS}
      isLight={isLight}
    >
      <div className="w-full max-w-lg flex flex-col items-center justify-center">
        {gameState === 'idle' && (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center mx-auto text-sky-500">
              <LayoutGrid size={44} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Matriz de Memoria Espacial</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Entrena tu retención visual a través de 5 niveles progresivos: desde 6 cartas hasta 20 cartas en el nivel maestro.
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Iniciar Nivel 1 (6 Cartas)
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="w-full space-y-4">
            {/* Stats Bar */}
            <div className="flex justify-between items-center px-1 text-xs font-bold text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="uppercase tracking-wider">Vidas:</span>
                <span className="text-rose-500 tracking-widest text-sm">
                  {'♥'.repeat(livesLeft)}{'♡'.repeat(errors)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {combo > 1 && (
                  <span className="text-amber-500 flex items-center gap-0.5 animate-pulse font-bold">
                    <Flame size={13} /> {combo}x Combo
                  </span>
                )}
                <span className="text-sky-500 font-bold">
                  Pares: {matched.length / 2}/{getPairsCount(level)}
                </span>
              </div>
            </div>

            {/* Grid of Cards */}
            <div
              className={`grid gap-2.5 sm:gap-3 w-full max-w-md mx-auto ${
                cards.length <= 6
                  ? 'grid-cols-3'
                  : cards.length <= 12
                  ? 'grid-cols-4'
                  : 'grid-cols-4 sm:grid-cols-5'
              }`}
            >
              {cards.map((card, idx) => {
                const isRevealed = flipped.includes(idx) || matched.includes(idx);
                const isMatch = matched.includes(idx);
                const CardIcon = card.icon;

                return (
                  <button
                    key={idx}
                    onClick={() => handleCardClick(idx)}
                    disabled={isRevealed}
                    className={`aspect-square rounded-2xl flex items-center justify-center transition-all duration-300 border cursor-pointer ${
                      isMatch
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                        : isRevealed
                        ? 'bg-sky-600 border-sky-400 text-white shadow-md rotate-y-180'
                        : isLight
                        ? 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-400 shadow-sm'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-600'
                    }`}
                  >
                    {isRevealed ? (
                      <CardIcon size={cards.length > 12 ? 22 : 28} />
                    ) : (
                      <span className="text-xs font-mono font-bold">?</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'won_level' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
              <Check size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">¡Matriz Nivel {level} Superada!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Errores cometidos: <strong className="text-zinc-200">{errors}</strong>. La cuadrícula ahora se expande a {getPairsCount(level + 1) * 2} cartas.
              </p>
            </div>
            <button
              onClick={() => startGame(true)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Siguiente Nivel ({getPairsCount(level + 1) * 2} Cartas)
            </button>
          </div>
        )}

        {gameState === 'won_all' && (
          <div className="space-y-5 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Trophy size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">¡Memoria Fotográfica Total!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Has completado la matriz de 20 cartas. Eres resistente a las sobrecargas cognitivas y distracciones visuales.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Reclamar Recompensa & Salir
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <X size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Límite de Errores</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Agotaste tus vidas en este nivel. Calma tu mente y vuelve a intentar.
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Reiniciar desde Nivel 1
            </button>
          </div>
        )}
      </div>
    </MinigameModalShell>
  );
};

// ============================================================================
// 3. MENTE MAESTRA (10 PREGUNTAS EN 3 FASES + COMODINES 50:50 Y PISTA)
// ============================================================================

export const MinigameMillionaire = ({ game, onClose, addXP, addDiamonds, isLight }) => {
  const TOTAL_QS = 8;
  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [gameState, setGameState] = useState('idle');
  const [selectedAns, setSelectedAns] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  // Lifelines
  const [used5050, setUsed5050] = useState(false);
  const [usedHint, setUsedHint] = useState(false);
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [activeHintText, setActiveHintText] = useState('');

  const startGame = () => {
    // Select balanced questions across tiers
    const tier1 = EXTENDED_MILLIONAIRE_QS.filter(q => q.tier === 1).sort(() => Math.random() - 0.5).slice(0, 3);
    const tier2 = EXTENDED_MILLIONAIRE_QS.filter(q => q.tier === 2).sort(() => Math.random() - 0.5).slice(0, 3);
    const tier3 = EXTENDED_MILLIONAIRE_QS.filter(q => q.tier === 3).sort(() => Math.random() - 0.5).slice(0, 2);
    
    setQuestions([...tier1, ...tier2, ...tier3]);
    setCurrentQIndex(0);
    setGameState('playing');
    setSelectedAns(null);
    setShowResult(false);
    setUsed5050(false);
    setUsedHint(false);
    setEliminatedOptions([]);
    setActiveHintText('');
  };

  const handleUse5050 = () => {
    if (used5050 || gameState !== 'playing') return;
    const currentQ = questions[currentQIndex];
    const incorrectIndices = [0, 1, 2, 3].filter(idx => idx !== currentQ.answer);
    // Shuffle and pick 2 to eliminate
    incorrectIndices.sort(() => Math.random() - 0.5);
    setEliminatedOptions(incorrectIndices.slice(0, 2));
    setUsed5050(true);
  };

  const handleUseHint = () => {
    if (usedHint || gameState !== 'playing') return;
    setActiveHintText(questions[currentQIndex]?.hint || 'Analiza las raíces etimológicas de los términos.');
    setUsedHint(true);
  };

  const handleAnswer = (idx) => {
    if (gameState !== 'playing' || selectedAns !== null) return;
    setSelectedAns(idx);
    setShowResult(true);

    const correct = idx === questions[currentQIndex].answer;

    setTimeout(() => {
      if (correct) {
        if (currentQIndex + 1 === TOTAL_QS) {
          setGameState('won');
          addXP(game?.rewardXP || 80);
          addDiamonds(game?.rewardDia || 30);
        } else {
          setCurrentQIndex(p => p + 1);
          setSelectedAns(null);
          setShowResult(false);
          setEliminatedOptions([]);
          setActiveHintText('');
        }
      } else {
        setGameState('lost');
      }
    }, 1200);
  };

  const currentQ = questions[currentQIndex];

  return (
    <MinigameModalShell
      game={game}
      onClose={onClose}
      level={currentQIndex + 1}
      totalLevels={TOTAL_QS}
      isLight={isLight}
    >
      <div className="w-full max-w-lg flex flex-col items-center justify-center">
        {gameState === 'idle' && (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mx-auto text-purple-500">
              <Brain size={44} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Cultura, Ciencia & Filosofía</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Supera 8 preguntas de alta exigencia cultural e intelectual. Cuentas con 2 comodines estratégicos: <strong>50:50</strong> y la <strong>Pista del Sabio</strong>.
              </p>
            </div>
            <button
              onClick={startGame}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Comenzar Prueba (8 Preguntas)
            </button>
          </div>
        )}

        {gameState === 'playing' && currentQ && (
          <div className="w-full space-y-4">
            {/* Lifelines Bar */}
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                {currentQ.category} • Nivel {currentQ.tier === 1 ? 'Bronce' : currentQ.tier === 2 ? 'Plata' : 'Oro'}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleUse5050}
                  disabled={used5050 || showResult}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 cursor-pointer transition-all ${
                    used5050
                      ? 'opacity-30 border-transparent bg-zinc-500/10 text-zinc-500 cursor-not-allowed'
                      : isLight
                      ? 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100'
                      : 'bg-purple-950/40 border-purple-700/50 text-purple-300 hover:bg-purple-900/50'
                  }`}
                  title="Elimina 2 opciones erróneas"
                >
                  <Sparkles size={11} /> 50:50
                </button>

                <button
                  onClick={handleUseHint}
                  disabled={usedHint || showResult}
                  className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1 cursor-pointer transition-all ${
                    usedHint
                      ? 'opacity-30 border-transparent bg-zinc-500/10 text-zinc-500 cursor-not-allowed'
                      : isLight
                      ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                      : 'bg-amber-950/40 border-amber-700/50 text-amber-300 hover:bg-amber-900/50'
                  }`}
                  title="Pista del sabio"
                >
                  <Lightbulb size={11} /> Pista
                </button>
              </div>
            </div>

            {/* Hint Box (if triggered) */}
            <AnimatePresence>
              {activeHintText && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-medium flex items-start gap-2"
                >
                  <Lightbulb size={16} className="shrink-0 mt-0.5 text-amber-500" />
                  <span>{activeHintText}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question Card */}
            <div
              className={`p-6 rounded-3xl border text-center shadow-sm min-h-[120px] flex items-center justify-center ${
                isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-zinc-900 border-zinc-800 text-white'
              }`}
            >
              <h3 className="text-base sm:text-lg font-bold leading-snug">{currentQ.q}</h3>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 w-full">
              {currentQ.options.map((opt, idx) => {
                const isEliminated = eliminatedOptions.includes(idx);
                const isSelected = selectedAns === idx;
                const isCorrect = idx === currentQ.answer;

                let optStyle = isLight
                  ? 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-800'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-200';

                if (showResult) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-600 border-emerald-500 text-white shadow-md';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-600 border-rose-500 text-white shadow-md';
                  } else {
                    optStyle = 'opacity-30 border-transparent bg-zinc-500/10 text-zinc-500';
                  }
                } else if (isSelected) {
                  optStyle = 'bg-purple-600 border-purple-400 text-white';
                }

                if (isEliminated) {
                  return (
                    <div
                      key={idx}
                      className="w-full p-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 text-xs italic font-medium opacity-40 text-left"
                    >
                      [Opción descartada por 50:50]
                    </div>
                  );
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showResult}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer flex items-center gap-3 ${optStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center text-[10px] font-black shrink-0">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'won' && (
          <div className="space-y-5 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Trophy size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">¡Erudito Absoluto!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
                Resolviste las 8 preguntas correctamente sin margen de error. Demostraste un intelecto amplio y una mente inmune a la distracción.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Reclamar Recompensa & Salir
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <X size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Error Fatal</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
                Fallaste en la pregunta {currentQIndex + 1}. Un solo desliz rompe la racha de concentración. Repasa y reintenta.
              </p>
            </div>
            <button
              onClick={startGame}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Reiniciar Prueba
            </button>
          </div>
        )}
      </div>
    </MinigameModalShell>
  );
};

// ============================================================================
// 4. GENIO MATEMÁTICO (5 NIVELES: ARITMÉTICA, ÁLGEBRA VISUAL Y SERIES CON TIMER)
// ============================================================================

export const MinigameMath = ({ game, onClose, addXP, addDiamonds, isLight }) => {
  const [gameState, setGameState] = useState('idle');
  const [level, setLevel] = useState(1);
  const [problem, setProblem] = useState({ q: '', a: 0, options: [], label: '' });
  const [timeLeft, setTimeLeft] = useState(12);

  const TOTAL_LEVELS = 5;

  const generateProblem = (lvl) => {
    let q, a, label;

    if (lvl === 1) {
      // Sumas y restas rápidas
      const n1 = Math.floor(Math.random() * 25) + 10;
      const n2 = Math.floor(Math.random() * 20) + 5;
      const isAdd = Math.random() > 0.5;
      q = isAdd ? `${n1} + ${n2}` : `${n1} - ${n2}`;
      a = isAdd ? n1 + n2 : n1 - n2;
      label = 'Aritmética Básica Veloz';
    } else if (lvl === 2) {
      // Multiplicaciones y divisiones exactas
      const n1 = Math.floor(Math.random() * 11) + 4;
      const n2 = Math.floor(Math.random() * 9) + 3;
      q = `${n1} × ${n2}`;
      a = n1 * n2;
      label = 'Tablas de Multiplicar';
    } else if (lvl === 3) {
      // Operaciones combinadas (A * B) ± C
      const n1 = Math.floor(Math.random() * 8) + 3;
      const n2 = Math.floor(Math.random() * 7) + 2;
      const n3 = Math.floor(Math.random() * 15) + 5;
      const isAdd = Math.random() > 0.5;
      q = `(${n1} × ${n2}) ${isAdd ? '+' : '-'} ${n3}`;
      a = isAdd ? (n1 * n2) + n3 : (n1 * n2) - n3;
      label = 'Operaciones Combinadas';
    } else if (lvl === 4) {
      // Ecuación lineal simple: X + n1 = n2 o n1 * X = n2
      const X = Math.floor(Math.random() * 12) + 3;
      const n1 = Math.floor(Math.random() * 20) + 5;
      const res = X + n1;
      q = `X + ${n1} = ${res}  →  ¿X?`;
      a = X;
      label = 'Álgebra con Incógnita';
    } else {
      // Nivel 5: Secuencia aritmética lógica o porcentajes
      const start = Math.floor(Math.random() * 10) + 2;
      const step = Math.floor(Math.random() * 5) + 3;
      const s1 = start;
      const s2 = start + step;
      const s3 = start + step * 2;
      const s4 = start + step * 3;
      q = `${s1}, ${s2}, ${s3}, ${s4}, ... ?`;
      a = start + step * 4;
      label = 'Patrón de Secuencia Aritmética';
    }

    // Generate 4 plausible distinct options
    const distractorDeltas = [-10, -3, -1, 1, 2, 4, 10].sort(() => Math.random() - 0.5);
    const optionsSet = new Set([a]);
    for (let delta of distractorDeltas) {
      if (optionsSet.size >= 4) break;
      const opt = a + delta;
      if (opt > 0 && opt !== a) optionsSet.add(opt);
    }
    while (optionsSet.size < 4) {
      optionsSet.add(a + Math.floor(Math.random() * 20) - 10);
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
    setProblem({ q, a, options, label });
    setTimeLeft(12);
  };

  const startGame = (next = false) => {
    const nextLvl = next ? level + 1 : 1;
    if (!next) setLevel(1);
    else setLevel(nextLvl);
    generateProblem(nextLvl);
    setGameState('playing');
  };

  const handleAnswer = (val) => {
    if (val === problem.a) {
      if (level < TOTAL_LEVELS) {
        setGameState('won_level');
      } else {
        setGameState('won_all');
        addXP(game?.rewardXP || 60);
        addDiamonds(game?.rewardDia || 20);
      }
    } else {
      setGameState('lost');
    }
  };

  // Round timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameState('lost');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, level]);

  return (
    <MinigameModalShell
      game={game}
      onClose={onClose}
      level={level}
      totalLevels={TOTAL_LEVELS}
      isLight={isLight}
    >
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        {gameState === 'idle' && (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
              <Activity size={44} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Agilidad Numérica & Ecuaciones</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Resuelve 5 niveles con tiempo límite de 12 segundos por ronda: sumas, multiplicaciones, operaciones combinadas, incógnitas y secuencias lógicas.
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Comenzar Nivel 1 (12s por ronda)
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="w-full space-y-5">
            {/* Header info */}
            <div className="flex justify-between items-center px-1 text-xs font-bold text-zinc-400">
              <span className="text-amber-500 uppercase tracking-wider">{problem.label}</span>
              <span className={`font-mono font-bold text-sm ${timeLeft <= 4 ? 'text-rose-500 animate-pulse' : 'text-zinc-400'}`}>
                ⏱ {timeLeft}s
              </span>
            </div>

            {/* Problem display */}
            <div
              className={`p-8 rounded-3xl border text-center shadow-sm flex flex-col items-center justify-center min-h-[140px] ${
                isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-zinc-900 border-zinc-800 text-white'
              }`}
            >
              <span className="text-3xl sm:text-4xl font-black tracking-tight">{problem.q}</span>
            </div>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {problem.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className={`py-5 rounded-2xl text-2xl font-black transition-all cursor-pointer border shadow-sm ${
                    isLight
                      ? 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-800 active:scale-95'
                      : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white active:scale-95'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'won_level' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
              <Check size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">¡Nivel {level} Resuelto!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Respuesta correcta con {timeLeft}s restantes. Prepárate para el siguiente reto numérico.
              </p>
            </div>
            <button
              onClick={() => startGame(true)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Avanzar a Nivel {level + 1}
            </button>
          </div>
        )}

        {gameState === 'won_all' && (
          <div className="space-y-5 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Trophy size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">¡Genio Aritmético Total!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Has dominado el cálculo mental bajo presión de tiempo en los 5 niveles.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Reclamar Recompensa & Salir
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <X size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Cálculo Incorrecto o Tiempo Agotado</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                La respuesta correcta era <strong className="text-zinc-200">{problem.a}</strong>. Entrena tu agilidad mental y reintenta.
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Reiniciar desde Nivel 1
            </button>
          </div>
        )}
      </div>
    </MinigameModalShell>
  );
};

// ============================================================================
// 5. SECUENCIA LÓGICA (5 NIVELES: ASCENDENTE, NEGATIVOS, DESCENDENTE Y MEMORIA CHIMP TEST)
// ============================================================================

export const MinigameSequence = ({ game, onClose, addXP, addDiamonds, isLight }) => {
  const [gameState, setGameState] = useState('idle');
  const [level, setLevel] = useState(1);
  const [numbers, setNumbers] = useState([]);
  const [expectedIndex, setExpectedIndex] = useState(0);
  const [isMemoryHidden, setIsMemoryHidden] = useState(false);
  const [modeLabel, setModeLabel] = useState('');

  const TOTAL_LEVELS = 5;

  const startGame = (next = false) => {
    const currentLvl = next ? level + 1 : 1;
    if (!next) setLevel(1);
    else setLevel(currentLvl);

    setIsMemoryHidden(false);

    let label;

    if (currentLvl === 1) {
      const count = 5;
      label = 'Orden Ascendente (Menor a Mayor)';
      let nums = Array.from({ length: count }, () => Math.floor(Math.random() * 50) + 1);
      // Ensure unique
      nums = Array.from(new Set(nums));
      while (nums.length < count) nums.push(Math.floor(Math.random() * 50) + 1);
      setNumbers(nums.map((n, i) => ({ val: n, id: i, clicked: false })).sort(() => Math.random() - 0.5));
    } else if (currentLvl === 2) {
      const count = 6;
      label = 'Números Mixtos con Negativos (-20 a 50)';
      let nums = Array.from({ length: count }, () => Math.floor(Math.random() * 70) - 20);
      nums = Array.from(new Set(nums));
      while (nums.length < count) nums.push(Math.floor(Math.random() * 70) - 20);
      setNumbers(nums.map((n, i) => ({ val: n, id: i, clicked: false })).sort(() => Math.random() - 0.5));
    } else if (currentLvl === 3) {
      const count = 6;
      label = 'Orden Descendente (Mayor a Menor)';
      let nums = Array.from({ length: count }, () => Math.floor(Math.random() * 99) + 1);
      nums = Array.from(new Set(nums));
      while (nums.length < count) nums.push(Math.floor(Math.random() * 99) + 1);
      setNumbers(nums.map((n, i) => ({ val: n, id: i, clicked: false })).sort(() => Math.random() - 0.5));
    } else if (currentLvl === 4) {
      const count = 8;
      label = 'Matriz de 8 Elementos (Ascendente Rápido)';
      let nums = Array.from({ length: count }, () => Math.floor(Math.random() * 150) + 1);
      nums = Array.from(new Set(nums));
      while (nums.length < count) nums.push(Math.floor(Math.random() * 150) + 1);
      setNumbers(nums.map((n, i) => ({ val: n, id: i, clicked: false })).sort(() => Math.random() - 0.5));
    } else {
      // Level 5: Chimp Memory Test (numbers hide upon first click or after 2.5s)
      label = 'Test Chimpancé: Memoria Espacial Flash (Memoriza y toca 1, 2, 3...)';
      let nums = [1, 2, 3, 4, 5, 6];
      setNumbers(nums.map((n, i) => ({ val: n, id: i, clicked: false })).sort(() => Math.random() - 0.5));

      // Hide numbers after 2.5 seconds!
      setTimeout(() => {
        setIsMemoryHidden(true);
      }, 2500);
    }

    setModeLabel(label);
    setExpectedIndex(0);
    setGameState('playing');
  };

  const handleNumClick = (id, val) => {
    // If level 3, sort descending, else sort ascending
    const isDesc = level === 3;
    const sortedVals = [...numbers].map(n => n.val).sort((a, b) => isDesc ? b - a : a - b);

    if (val === sortedVals[expectedIndex]) {
      // If level 5 and not hidden yet, hide now immediately on first tap
      if (level === 5 && !isMemoryHidden) {
        setIsMemoryHidden(true);
      }

      setNumbers(prev => prev.map(n => n.id === id ? { ...n, clicked: true } : n));
      
      if (expectedIndex + 1 === numbers.length) {
        if (level < TOTAL_LEVELS) {
          setGameState('won_level');
        } else {
          setGameState('won_all');
          addXP(game?.rewardXP || 60);
          addDiamonds(game?.rewardDia || 20);
        }
      } else {
        setExpectedIndex(e => e + 1);
      }
    } else {
      setGameState('lost');
    }
  };

  return (
    <MinigameModalShell
      game={game}
      onClose={onClose}
      level={level}
      totalLevels={TOTAL_LEVELS}
      isLight={isLight}
    >
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        {gameState === 'idle' && (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-500">
              <ArrowUpNarrowWide size={44} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Secuencia & Flexibilidad Mental</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Entrena tu memoria de trabajo en 5 niveles: orden ascendente, números negativos, inversión descendente y el legendario <strong>Test Chimpancé</strong> de memoria espacial oculta.
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Comenzar Nivel 1
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="w-full space-y-4">
            <div className="text-center space-y-1">
              <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                {modeLabel}
              </div>
              <div className="text-[11px] text-zinc-400">
                Progreso: {expectedIndex}/{numbers.length} completados
              </div>
            </div>

            <div
              className={`grid gap-3 w-full max-w-xs mx-auto ${
                numbers.length <= 6 ? 'grid-cols-3' : 'grid-cols-4'
              }`}
            >
              {numbers.map((n) => {
                const showVal = !isMemoryHidden || n.clicked;

                return (
                  <button
                    key={n.id}
                    onClick={() => !n.clicked && handleNumClick(n.id, n.val)}
                    disabled={n.clicked}
                    className={`aspect-square rounded-2xl text-xl sm:text-2xl font-black transition-all duration-200 flex items-center justify-center border cursor-pointer ${
                      n.clicked
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 opacity-40 scale-95'
                        : isLight
                        ? 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-900 shadow-sm active:scale-95'
                        : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white shadow-sm active:scale-95'
                    }`}
                  >
                    {n.clicked ? '✓' : showVal ? n.val : '•'}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'won_level' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
              <Check size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">¡Nivel {level} Superado!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Secuencia completada en el orden exacto. La siguiente fase aumentará la complejidad cognitiva.
              </p>
            </div>
            <button
              onClick={() => startGame(true)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Avanzar a Nivel {level + 1}
            </button>
          </div>
        )}

        {gameState === 'won_all' && (
          <div className="space-y-5 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Trophy size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">¡Memoria de Trabajo Suprema!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Has dominado los 5 niveles, incluyendo la memoria espacial oculta del Test Chimpancé.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Reclamar Recompensa & Salir
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <X size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Orden Incorrecto</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Tocaste un número fuera de la secuencia esperada. Respira y vuelve a intentarlo.
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Reiniciar desde Nivel 1
            </button>
          </div>
        )}
      </div>
    </MinigameModalShell>
  );
};

// ============================================================================
// 6. DESTRUCTOR DE DISTRACCIONES (3 ONDAS CON COMBOS Y BOMBAS)
// ============================================================================

export const MinigameWhack = ({ game, onClose, addXP, addDiamonds, isLight }) => {
  const [moles, setMoles] = useState([]);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [timeLeft, setTimeLeft] = useState(25);
  const [combo, setCombo] = useState(0);
  const [gameState, setGameState] = useState('idle'); // idle, playing, won_wave, won_all, lost

  const TOTAL_WAVES = 3;

  const getTargetScore = (w) => {
    switch (w) {
      case 1: return 15; // Onda 1
      case 2: return 32; // Onda 2
      case 3: return 50; // Onda 3
      default: return 20;
    }
  };

  const startWave = (next = false) => {
    const nextWave = next ? wave + 1 : 1;
    if (!next) {
      setWave(1);
      setScore(0);
    } else {
      setWave(nextWave);
    }
    setTimeLeft(25);
    setCombo(0);
    setMoles([]);
    setGameState('playing');
  };

  const rewardXP = game?.rewardXP || 70;
  const rewardDia = game?.rewardDia || 25;

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          const target = getTargetScore(wave);
          if (score >= target) {
            if (wave < TOTAL_WAVES) {
              setGameState('won_wave');
            } else {
              setGameState('won_all');
              addXP(rewardXP);
              addDiamonds(rewardDia);
            }
          } else {
            setGameState('lost');
          }
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, score, wave, addXP, addDiamonds, rewardXP, rewardDia]);

  // Spawn loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnRate = wave === 1 ? 750 : wave === 2 ? 600 : 450;

    const interval = setInterval(() => {
      const rand = Math.random();
      // Wave 1: work vs distraction
      // Wave 2 & 3: work, distraction, or golden multiplier / bomb
      let type = 'distraction';
      if (rand < 0.25) {
        type = 'work'; // Don't hit!
      } else if (rand > 0.85 && wave >= 2) {
        type = 'golden'; // Hit for +3 and combo
      } else if (rand > 0.70 && wave >= 2) {
        type = 'bomb'; // Danger: -5 pts!
      }

      const id = Date.now() + Math.random();
      const x = Math.random() * 74 + 13;
      const y = Math.random() * 74 + 13;

      setMoles(prev => [...prev, { id, type, x, y }]);

      const lifetime = type === 'work' ? 1800 : type === 'golden' ? 1000 : 1300;
      setTimeout(() => {
        setMoles(prev => prev.filter(m => m.id !== id));
      }, lifetime);
    }, spawnRate);

    return () => clearInterval(interval);
  }, [gameState, wave]);

  const handleHit = (mole) => {
    if (mole.type === 'work') {
      // Mistake: clicked study/work icon
      setScore(s => Math.max(0, s - 3));
      setCombo(0);
    } else if (mole.type === 'bomb') {
      // Danger bomb
      setScore(s => Math.max(0, s - 5));
      setCombo(0);
    } else if (mole.type === 'golden') {
      // Golden focus surge
      setScore(s => s + 3);
      setCombo(c => c + 1);
    } else {
      // Normal distraction destroyed
      setScore(s => s + 1);
      setCombo(c => c + 1);
    }

    setMoles(prev => prev.filter(m => m.id !== mole.id));
  };

  return (
    <MinigameModalShell
      game={game}
      onClose={onClose}
      level={wave}
      totalLevels={TOTAL_WAVES}
      isLight={isLight}
    >
      <div className="w-full max-w-md flex flex-col items-center justify-center">
        {gameState === 'idle' && (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center mx-auto text-rose-500">
              <Target size={44} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Caza de Distracciones</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Destruye los iconos de distracciones digitales (rojos) antes de que escapen. ¡NO toques los libros de estudio (azules) ni las bombas de dopamina!
              </p>
            </div>
            <button
              onClick={() => startWave(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Comenzar Oleada 1 (Meta: 15 Pts)
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="w-full space-y-3">
            {/* Stats */}
            <div className="flex justify-between items-center px-1 text-xs font-bold text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="text-amber-500 font-bold">Oleada {wave}/3</span>
                <span className="font-mono">Meta: {getTargetScore(wave)} pts</span>
              </div>
              <div className="flex items-center gap-3">
                {combo > 2 && (
                  <span className="text-amber-500 flex items-center gap-0.5 animate-pulse">
                    <Flame size={13} /> {combo}x Combo
                  </span>
                )}
                <span className="font-mono font-bold text-sm">⏱ {timeLeft}s</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-black">
                  {score} pts
                </span>
              </div>
            </div>

            {/* Whack Arena */}
            <div
              className={`w-full aspect-square rounded-3xl border relative overflow-hidden select-none shadow-inner ${
                isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-zinc-900/90 border-zinc-800'
              }`}
            >
              <AnimatePresence>
                {moles.map(mole => {
                  const isWork = mole.type === 'work';
                  const isGolden = mole.type === 'golden';
                  const isBomb = mole.type === 'bomb';

                  return (
                    <motion.button
                      key={mole.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileTap={{ scale: 0.82 }}
                      onClick={() => handleHit(mole)}
                      className={`absolute w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg border-2 cursor-pointer ${
                        isWork
                          ? 'bg-sky-500 border-sky-300 text-white'
                          : isGolden
                          ? 'bg-amber-400 border-yellow-200 text-black animate-pulse shadow-amber-500/40'
                          : isBomb
                          ? 'bg-zinc-950 border-rose-500 text-rose-500'
                          : 'bg-rose-500 border-rose-300 text-white'
                      }`}
                      style={{
                        left: `${mole.x}%`,
                        top: `${mole.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {isWork ? (
                        <BookOpen size={20} />
                      ) : isGolden ? (
                        <Sparkles size={22} />
                      ) : isBomb ? (
                        <ShieldAlert size={22} />
                      ) : (
                        <Zap size={22} />
                      )}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-3 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1 text-rose-500"><Zap size={11} /> Distracción (+1)</span>
              <span className="flex items-center gap-1 text-sky-500"><BookOpen size={11} /> Estudio (-3)</span>
              {wave >= 2 && <span className="flex items-center gap-1 text-amber-500"><Sparkles size={11} /> Dorado (+3)</span>}
            </div>
          </div>
        )}

        {gameState === 'won_wave' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
              <Check size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">¡Oleada {wave} Superada!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Puntuación acumulada: <strong className="text-emerald-500">{score} puntos</strong>. La siguiente oleada traerá distracciones más rápidas.
              </p>
            </div>
            <button
              onClick={() => startWave(true)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Iniciar Oleada {wave + 1} (Meta: {getTargetScore(wave + 1)} pts)
            </button>
          </div>
        )}

        {gameState === 'won_all' && (
          <div className="space-y-5 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Trophy size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">¡Destructor Implacable!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Superaste las 3 oleadas con una puntuación de <strong className="text-amber-500">{score} puntos</strong>. La procrastinación no tiene poder sobre ti.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Reclamar Recompensa & Salir
            </button>
          </div>
        )}

        {gameState === 'lost' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 flex items-center justify-center mx-auto">
              <X size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Tiempo Agotado</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2">
                Lograste {score} puntos, pero la meta de la oleada {wave} era {getTargetScore(wave)} puntos.
              </p>
            </div>
            <button
              onClick={() => startWave(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> Reintentar desde Oleada 1
            </button>
          </div>
        )}
      </div>
    </MinigameModalShell>
  );
};

// ============================================================================
// 7. SABIDURÍA ESTOICA (5 NIVELES CON PALABRAS DISTRACTORAS Y LECCIÓN PRÁCTICA)
// ============================================================================

export const MinigameStoic = ({ game, onClose, addXP, addDiamonds, isLight }) => {
  const [level, setLevel] = useState(1);
  const [availableWords, setAvailableWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [gameState, setGameState] = useState('idle'); // idle, playing, won_level, won_all, error

  const TOTAL_LEVELS = EXTENDED_STOIC_QUOTES.length; // 5 levels

  const currentQuote = EXTENDED_STOIC_QUOTES[level - 1] || EXTENDED_STOIC_QUOTES[0];

  const loadLevel = (lvl) => {
    const q = EXTENDED_STOIC_QUOTES[lvl - 1];
    const phraseWords = q.phrase.split(' ').map((w, i) => ({ id: `p-${i}`, text: w, isDistractor: false }));
    const distractorWords = (q.distractors || []).map((w, i) => ({ id: `d-${i}`, text: w, isDistractor: true }));
    
    const combined = [...phraseWords, ...distractorWords].sort(() => Math.random() - 0.5);
    setAvailableWords(combined);
    setSelectedWords([]);
    setGameState('playing');
  };

  const startGame = (next = false) => {
    const nextLvl = next ? level + 1 : 1;
    if (!next) setLevel(1);
    else setLevel(nextLvl);
    loadLevel(nextLvl);
  };

  const handleSelectWord = (word) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
  };

  const handleDeselectWord = (word) => {
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
    setAvailableWords(prev => [...prev, word]);
  };

  const checkAnswer = () => {
    const builtPhrase = selectedWords.map(w => w.text).join(' ');
    if (builtPhrase.trim().toLowerCase() === currentQuote.phrase.trim().toLowerCase()) {
      if (level < TOTAL_LEVELS) {
        setGameState('won_level');
      } else {
        setGameState('won_all');
        addXP(game?.rewardXP || 60);
        addDiamonds(game?.rewardDia || 20);
      }
    } else {
      setGameState('error');
      setTimeout(() => {
        setGameState('playing');
      }, 1500);
    }
  };

  return (
    <MinigameModalShell
      game={game}
      onClose={onClose}
      level={level}
      totalLevels={TOTAL_LEVELS}
      isLight={isLight}
    >
      <div className="w-full max-w-lg flex flex-col items-center justify-center">
        {gameState === 'idle' && (
          <div className="space-y-6 text-center">
            <div className="w-24 h-24 rounded-3xl bg-zinc-500/10 border border-zinc-500/30 flex items-center justify-center mx-auto text-zinc-400">
              <BookOpen size={44} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">Orden Estoico & Filosofía</h3>
              <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Ordena las palabras de 5 pensamientos clásicos de Epicteto, Marco Aurelio, Séneca y Viktor Frankl. ¡Atención! En niveles avanzados habrá <strong>palabras trampa</strong> que debes ignorar.
              </p>
            </div>
            <button
              onClick={() => startGame(false)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Comenzar Nivel 1
            </button>
          </div>
        )}

        {gameState === 'playing' || gameState === 'error' ? (
          <div className="w-full space-y-5">
            {/* Author Badge */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                {currentQuote.author}
              </span>
              <p className="text-[11px] text-zinc-400">
                Selecciona las palabras en el orden correcto para reconstruir la máxima estoica.
              </p>
            </div>

            {/* Built Phrase Area */}
            <div
              className={`w-full min-h-[110px] p-4 rounded-3xl border flex flex-wrap items-center justify-center gap-2 transition-all ${
                gameState === 'error'
                  ? 'border-rose-500/80 bg-rose-500/10'
                  : isLight
                  ? 'bg-white border-zinc-200'
                  : 'bg-zinc-900 border-zinc-800'
              }`}
            >
              {selectedWords.length === 0 ? (
                <span className="text-xs text-zinc-400 italic">
                  Toca las palabras de abajo para agregarlas aquí...
                </span>
              ) : (
                selectedWords.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleDeselectWord(w)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {w.text}
                  </button>
                ))
              )}
            </div>

            {/* Error notice */}
            {gameState === 'error' && (
              <div className="text-center text-xs text-rose-500 font-bold animate-pulse">
                El orden no es correcto o incluiste una palabra distractor. Revisa atentamente.
              </div>
            )}

            {/* Available Words Pool */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80">
              {availableWords.map((w) => (
                <button
                  key={w.id}
                  onClick={() => handleSelectWord(w)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                    isLight
                      ? 'bg-white hover:bg-zinc-200 border-zinc-200 text-zinc-800'
                      : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-200'
                  }`}
                >
                  {w.text}
                </button>
              ))}
            </div>

            {/* Action Verify */}
            <button
              onClick={checkAnswer}
              disabled={selectedWords.length === 0}
              className={`w-full py-4 rounded-2xl font-bold uppercase tracking-wider text-sm shadow-md transition-all cursor-pointer ${
                selectedWords.length > 0
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              Comprobar Frase
            </button>
          </div>
        ) : null}

        {gameState === 'won_level' && (
          <div className="space-y-5 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
              <Check size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight">¡Pensamiento Revelado!</h3>
              <blockquote className="text-sm italic font-serif text-zinc-300 my-3 px-4">
                "{currentQuote.phrase}" — <strong className="text-amber-500">{currentQuote.author}</strong>
              </blockquote>
              <div className="p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-400 max-w-sm mx-auto">
                <span className="text-amber-500 font-bold block mb-1">Principio Práctico:</span>
                {currentQuote.lesson}
              </div>
            </div>
            <button
              onClick={() => startGame(true)}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Avanzar a Nivel {level + 1}
            </button>
          </div>
        )}

        {gameState === 'won_all' && (
          <div className="space-y-5 text-center">
            <div className="w-24 h-24 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto">
              <Trophy size={48} />
            </div>
            <div>
              <h3 className="text-3xl font-black uppercase tracking-tight">¡Sabiduría Integrada!</h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-sm mx-auto">
                Has completado las 5 frases estoicas. Tu mente comprende la diferencia entre lo que puedes controlar y lo que debes aceptar.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-bold uppercase tracking-wider text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              Reclamar Recompensa & Salir
            </button>
          </div>
        )}
      </div>
    </MinigameModalShell>
  );
};
