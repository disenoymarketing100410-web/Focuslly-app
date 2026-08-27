// src/data/badges.js

export const BADGE_TIERS = {
  bronce: {
    id: 'bronce',
    name: 'Bronce',
    color: '#CD7F32',
    bg: 'from-amber-700/20 to-amber-900/30',
    border: 'border-amber-600/40',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_15px_rgba(205,127,50,0.3)]',
    badgeClass: 'bg-amber-600/20 text-amber-300 border-amber-500/30'
  },
  plata: {
    id: 'plata',
    name: 'Plata',
    color: '#E5E7EB',
    bg: 'from-slate-400/20 to-slate-600/30',
    border: 'border-slate-300/40',
    text: 'text-slate-200',
    glow: 'shadow-[0_0_15px_rgba(229,231,235,0.3)]',
    badgeClass: 'bg-slate-300/20 text-slate-100 border-slate-300/30'
  },
  oro: {
    id: 'oro',
    name: 'Oro',
    color: '#EAB308',
    bg: 'from-yellow-500/20 to-amber-600/30',
    border: 'border-yellow-400/50',
    text: 'text-yellow-400',
    glow: 'shadow-[0_0_20px_rgba(234,179,8,0.4)]',
    badgeClass: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/40'
  },
  diamante: {
    id: 'diamante',
    name: 'Diamante',
    color: '#06B6D4',
    bg: 'from-cyan-500/20 to-blue-600/30',
    border: 'border-cyan-400/50',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_25px_rgba(6,182,212,0.45)]',
    badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
  },
  mitico: {
    id: 'mitico',
    name: 'Mítico',
    color: '#A855F7',
    bg: 'from-purple-600/25 to-fuchsia-700/35',
    border: 'border-purple-400/60',
    text: 'text-purple-300',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.5)]',
    badgeClass: 'bg-purple-500/25 text-purple-200 border-purple-400/40'
  }
};

export const BADGE_CATEGORIES = [
  { id: 'all', name: 'Todas', icon: 'Sparkles' },
  { id: 'maestrias', name: 'Maestrías & Cursos', icon: 'BookOpen' },
  { id: 'desafios', name: 'Desafíos & Retos', icon: 'Target' },
  { id: 'apps', name: 'Detox Apps', icon: 'Shield' },
  { id: 'rachas', name: 'Rachas', icon: 'Flame' },
  { id: 'niveles', name: 'Niveles & XP', icon: 'Crown' },
  { id: 'habitos', name: 'Organización', icon: 'Calendar' }
];

export const BADGES = [
  // --- DESAFÍOS & RETOS ---
  {
    id: 'badge_first_step',
    title: 'Primer Paso',
    subtitle: 'El inicio del cambio',
    desc: 'Completa tu primer desafío o reto en Focusly con éxito.',
    category: 'desafios',
    tier: 'bronce',
    icon: 'Target',
    xpReward: 50,
    diamondReward: 15,
    maxProgress: 1,
    check: (stats) => ({
      current: Math.min(1, stats.completedCount || 0),
      max: 1,
      unlocked: (stats.completedCount || 0) >= 1
    })
  },
  {
    id: 'badge_triad',
    title: 'Tríada de Enfoque',
    subtitle: 'Consistencia probada',
    desc: 'Completa con éxito 3 desafíos o retos.',
    category: 'desafios',
    tier: 'plata',
    icon: 'Zap',
    xpReward: 150,
    diamondReward: 40,
    maxProgress: 3,
    check: (stats) => ({
      current: Math.min(3, stats.completedCount || 0),
      max: 3,
      unlocked: (stats.completedCount || 0) >= 3
    })
  },
  {
    id: 'badge_warrior_5',
    title: 'Guerrero Digital',
    subtitle: '5 retos conquistados',
    desc: 'Supera 5 desafíos para forjar una disciplina inquebrantable.',
    category: 'desafios',
    tier: 'oro',
    icon: 'Shield',
    xpReward: 300,
    diamondReward: 80,
    maxProgress: 5,
    check: (stats) => ({
      current: Math.min(5, stats.completedCount || 0),
      max: 5,
      unlocked: (stats.completedCount || 0) >= 5
    })
  },
  {
    id: 'badge_titan_10',
    title: 'Titán del Autocontrol',
    subtitle: '10 retos completados',
    desc: 'Has dominado 10 retos de desintoxicación digital y productividad.',
    category: 'desafios',
    tier: 'diamante',
    icon: 'Trophy',
    xpReward: 600,
    diamondReward: 150,
    maxProgress: 10,
    check: (stats) => ({
      current: Math.min(10, stats.completedCount || 0),
      max: 10,
      unlocked: (stats.completedCount || 0) >= 10
    })
  },
  {
    id: 'badge_master_20',
    title: 'Maestro Supremo',
    subtitle: '20 retos completados',
    desc: 'El pináculo del dominio propio: 20 desafíos superados.',
    category: 'desafios',
    tier: 'mitico',
    icon: 'Crown',
    xpReward: 1200,
    diamondReward: 300,
    maxProgress: 20,
    check: (stats) => ({
      current: Math.min(20, stats.completedCount || 0),
      max: 20,
      unlocked: (stats.completedCount || 0) >= 20
    })
  },

  // --- DETOX POR APLICACIONES ---
  {
    id: 'badge_anti_tiktok',
    title: 'Cero Dopamina Barata',
    subtitle: 'Detox de TikTok',
    desc: 'Completa al menos 1 desafío de desintoxicación enfocado en TikTok.',
    category: 'apps',
    tier: 'oro',
    icon: 'Sparkles',
    xpReward: 120,
    diamondReward: 35,
    maxProgress: 1,
    check: (stats) => {
      const hasCompleted = (stats.activityLog || []).some(log => 
        (log.subtitle && log.subtitle.toLowerCase().includes('tiktok')) ||
        (log.title && log.title.toLowerCase().includes('tiktok')) ||
        (log.appId === 'tt')
      ) || (stats.completedAppIds || []).includes('tt') || (stats.completedCount >= 1 && (stats.selectedApps || []).includes('tt'));
      return {
        current: hasCompleted ? 1 : 0,
        max: 1,
        unlocked: Boolean(hasCompleted)
      };
    }
  },
  {
    id: 'badge_anti_insta',
    title: 'Filtro Real',
    subtitle: 'Detox de Instagram',
    desc: 'Completa un desafío de purga o límite estricto en Instagram.',
    category: 'apps',
    tier: 'oro',
    icon: 'Heart',
    xpReward: 120,
    diamondReward: 35,
    maxProgress: 1,
    check: (stats) => {
      const hasCompleted = (stats.activityLog || []).some(log => 
        (log.subtitle && log.subtitle.toLowerCase().includes('instagram')) ||
        (log.subtitle && log.subtitle.toLowerCase().includes('scroll')) ||
        (log.appId === 'insta')
      ) || (stats.completedAppIds || []).includes('insta') || (stats.completedCount >= 1 && (stats.selectedApps || []).includes('insta'));
      return {
        current: hasCompleted ? 1 : 0,
        max: 1,
        unlocked: Boolean(hasCompleted)
      };
    }
  },
  {
    id: 'badge_anti_yt',
    title: 'Formatos Profundos',
    subtitle: 'Detox de YouTube Shorts',
    desc: 'Supera un reto de YouTube evitando el scroll de videos cortos.',
    category: 'apps',
    tier: 'oro',
    icon: 'Play',
    xpReward: 120,
    diamondReward: 35,
    maxProgress: 1,
    check: (stats) => {
      const hasCompleted = (stats.activityLog || []).some(log => 
        (log.subtitle && log.subtitle.toLowerCase().includes('youtube')) ||
        (log.subtitle && log.subtitle.toLowerCase().includes('shorts')) ||
        (log.appId === 'yt')
      ) || (stats.completedAppIds || []).includes('yt') || (stats.completedCount >= 1 && (stats.selectedApps || []).includes('yt'));
      return {
        current: hasCompleted ? 1 : 0,
        max: 1,
        unlocked: Boolean(hasCompleted)
      };
    }
  },
  {
    id: 'badge_study_master',
    title: 'Erudito Feynman',
    subtitle: 'Métodos de Estudio',
    desc: 'Completa un desafío de técnicas de estudio y repaso activo.',
    category: 'apps',
    tier: 'diamante',
    icon: 'BookOpen',
    xpReward: 200,
    diamondReward: 60,
    maxProgress: 1,
    check: (stats) => {
      const hasCompleted = (stats.activityLog || []).some(log => 
        (log.subtitle && log.subtitle.toLowerCase().includes('feynman')) ||
        (log.subtitle && log.subtitle.toLowerCase().includes('pomodoro')) ||
        (log.subtitle && log.subtitle.toLowerCase().includes('estudio')) ||
        (log.appId === 'study')
      ) || (stats.completedCount >= 2);
      return {
        current: hasCompleted ? 1 : 0,
        max: 1,
        unlocked: Boolean(hasCompleted)
      };
    }
  },

  // --- RACHAS Y CONSTANCIA ---
  {
    id: 'badge_streak_3',
    title: 'Llama Encendida',
    subtitle: '3 días de racha',
    desc: 'Inicia sesión y mantén tu foco durante 3 días consecutivos.',
    category: 'rachas',
    tier: 'bronce',
    icon: 'Flame',
    xpReward: 60,
    diamondReward: 20,
    maxProgress: 3,
    check: (stats) => ({
      current: Math.min(3, stats.loginStreak || 1),
      max: 3,
      unlocked: (stats.loginStreak || 1) >= 3
    })
  },
  {
    id: 'badge_streak_7',
    title: 'Hábito de Hierro',
    subtitle: '7 días de racha',
    desc: 'Mantén una racha de 7 días continuos sin romper la disciplina.',
    category: 'rachas',
    tier: 'plata',
    icon: 'Flame',
    xpReward: 180,
    diamondReward: 50,
    maxProgress: 7,
    check: (stats) => ({
      current: Math.min(7, stats.loginStreak || 1),
      max: 7,
      unlocked: (stats.loginStreak || 1) >= 7
    })
  },
  {
    id: 'badge_streak_14',
    title: 'Voluntad Inquebrantable',
    subtitle: '14 días de racha',
    desc: 'Dos semanas completas de dedicación diaria sin excusas.',
    category: 'rachas',
    tier: 'oro',
    icon: 'Shield',
    xpReward: 400,
    diamondReward: 120,
    maxProgress: 14,
    check: (stats) => ({
      current: Math.min(14, stats.loginStreak || 1),
      max: 14,
      unlocked: (stats.loginStreak || 1) >= 14
    })
  },
  {
    id: 'badge_streak_30',
    title: 'Modo Monje Total',
    subtitle: '30 días de racha',
    desc: '30 días de transformación mental. Eres inmune al ruido exterior.',
    category: 'rachas',
    tier: 'mitico',
    icon: 'Medal',
    xpReward: 1000,
    diamondReward: 300,
    maxProgress: 30,
    check: (stats) => ({
      current: Math.min(30, stats.loginStreak || 1),
      max: 30,
      unlocked: (stats.loginStreak || 1) >= 30
    })
  },

  // --- NIVELES & XP ---
  {
    id: 'badge_xp_500',
    title: 'Iniciado del Enfoque',
    subtitle: 'Alcanza 500 XP',
    desc: 'Gana tus primeros 500 puntos de experiencia en Focusly.',
    category: 'niveles',
    tier: 'bronce',
    icon: 'Award',
    xpReward: 50,
    diamondReward: 15,
    maxProgress: 500,
    check: (stats) => ({
      current: Math.min(500, stats.userXP || 0),
      max: 500,
      unlocked: (stats.userXP || 0) >= 500
    })
  },
  {
    id: 'badge_xp_2000',
    title: 'Centinela Mental',
    subtitle: 'Alcanza 2,000 XP',
    desc: 'Acumula 2,000 puntos de experiencia demostrando gran esfuerzo.',
    category: 'niveles',
    tier: 'plata',
    icon: 'Brain',
    xpReward: 200,
    diamondReward: 60,
    maxProgress: 2000,
    check: (stats) => ({
      current: Math.min(2000, stats.userXP || 0),
      max: 2000,
      unlocked: (stats.userXP || 0) >= 2000
    })
  },
  {
    id: 'badge_xp_5000',
    title: 'Mente Iluminada',
    subtitle: 'Alcanza 5,000 XP',
    desc: 'Alcanza 5,000 XP y asciende a las ligas de honor de Focusly.',
    category: 'niveles',
    tier: 'oro',
    icon: 'Crown',
    xpReward: 500,
    diamondReward: 150,
    maxProgress: 5000,
    check: (stats) => ({
      current: Math.min(5000, stats.userXP || 0),
      max: 5000,
      unlocked: (stats.userXP || 0) >= 5000
    })
  },
  {
    id: 'badge_xp_10000',
    title: 'Leyenda Focusly',
    subtitle: 'Alcanza 10,000 XP',
    desc: '10,000 XP acumulados. Has trascendido los límites del enfoque.',
    category: 'niveles',
    tier: 'mitico',
    icon: 'Crown',
    xpReward: 1200,
    diamondReward: 400,
    maxProgress: 10000,
    check: (stats) => ({
      current: Math.min(10000, stats.userXP || 0),
      max: 10000,
      unlocked: (stats.userXP || 0) >= 10000
    })
  },

  // --- ORGANIZACIÓN & HÁBITOS ---
  {
    id: 'badge_first_habit',
    title: 'Semilla de Disciplina',
    subtitle: 'Planifica tus días',
    desc: 'Crea o mantén tareas y hábitos en tu calendario interactivo.',
    category: 'habitos',
    tier: 'bronce',
    icon: 'Calendar',
    xpReward: 60,
    diamondReward: 20,
    maxProgress: 1,
    check: (stats) => {
      const taskCount = (stats.calendarTasks || []).length;
      return {
        current: Math.min(1, taskCount),
        max: 1,
        unlocked: taskCount >= 1
      };
    }
  },
  {
    id: 'badge_habit_master',
    title: 'Arquitecto del Tiempo',
    subtitle: '5 tareas completadas',
    desc: 'Completa 5 tareas o exámenes en tu calendario interactivo.',
    category: 'habitos',
    tier: 'oro',
    icon: 'CheckCircle2',
    xpReward: 250,
    diamondReward: 70,
    maxProgress: 5,
    check: (stats) => {
      const completedTasks = (stats.calendarTasks || []).filter(t => t.isCompleted).length;
      return {
        current: Math.min(5, completedTasks),
        max: 5,
        unlocked: completedTasks >= 5
      };
    }
  },

  // --- MAESTRÍAS Y CURSOS DE PRODUCTIVIDAD (CRECE) ---
  {
    id: 'badge_mastery_first_class',
    title: 'Estudiante de Élite',
    subtitle: 'Primera clase de Maestría',
    desc: 'Completa tu primera lección en la sección de Maestrías de Crece.',
    category: 'maestrias',
    tier: 'bronce',
    icon: 'BookOpen',
    xpReward: 80,
    diamondReward: 25,
    maxProgress: 1,
    check: (stats) => {
      const completedClasses = (stats.completedMasteryClasses || []).length;
      return {
        current: Math.min(1, completedClasses),
        max: 1,
        unlocked: completedClasses >= 1
      };
    }
  },
  {
    id: 'badge_mastery_computer',
    title: 'Maestro de la Computación',
    subtitle: 'Productividad digital & Atajos',
    desc: 'Completa todas las clases del curso de Productividad Digital y Computación.',
    category: 'maestrias',
    tier: 'oro',
    icon: 'Zap',
    xpReward: 500,
    diamondReward: 120,
    maxProgress: 6,
    check: (stats) => {
      const compClasses = (stats.completedMasteryClasses || []).filter(c => c.startsWith('c') && ['c1_touch_typing', 'c2_file_architecture', 'c3_markdown_note_taking', 'c4_ai_prompting_study', 'c5_automation_tools', 'c6_terminal_basics'].includes(c)).length;
      return {
        current: Math.min(6, compClasses),
        max: 6,
        unlocked: compClasses >= 6
      };
    }
  },
  {
    id: 'badge_mastery_focus',
    title: 'Neuro-Estratega del Enfoque',
    subtitle: 'Dominio de la Dopamina',
    desc: 'Completa el curso completo de Neurociencia del Enfoque y Dopamina.',
    category: 'maestrias',
    tier: 'mitico',
    icon: 'Brain',
    xpReward: 600,
    diamondReward: 150,
    maxProgress: 4,
    check: (stats) => {
      const focusClasses = (stats.completedMasteryClasses || []).filter(c => ['c1_dopamine_circuit', 'c2_flow_state_triggers', 'c3_circadian_focus', 'c4_deep_work_ritual'].includes(c)).length;
      return {
        current: Math.min(4, focusClasses),
        max: 4,
        unlocked: focusClasses >= 4
      };
    }
  },
  {
    id: 'badge_mastery_learning',
    title: 'Polímata del Aprendizaje',
    subtitle: 'Active Recall & Métodos Top',
    desc: 'Completa todas las clases de Aprendizaje Ultra-Rápido y Memoria.',
    category: 'maestrias',
    tier: 'diamante',
    icon: 'Award',
    xpReward: 550,
    diamondReward: 130,
    maxProgress: 3,
    check: (stats) => {
      const learnClasses = (stats.completedMasteryClasses || []).filter(c => ['c1_active_recall_spaced', 'c2_anki_spaced_repetition', 'c3_feynman_technique'].includes(c)).length;
      return {
        current: Math.min(3, learnClasses),
        max: 3,
        unlocked: learnClasses >= 3
      };
    }
  },
  {
    id: 'badge_mastery_finance',
    title: 'Estratega Financiero Juvenil',
    subtitle: 'Finanzas & Regla 72h',
    desc: 'Completa el curso de Finanzas Personales y Disciplina Económica.',
    category: 'maestrias',
    tier: 'oro',
    icon: 'Gem',
    xpReward: 500,
    diamondReward: 120,
    maxProgress: 2,
    check: (stats) => {
      const finClasses = (stats.completedMasteryClasses || []).filter(c => ['c1_impulse_spending', 'c2_compound_interest'].includes(c)).length;
      return {
        current: Math.min(2, finClasses),
        max: 2,
        unlocked: finClasses >= 2
      };
    }
  }
];

export const getBadgeStats = (badge, userStats) => {
  if (!badge || !badge.check) {
    return { current: 0, max: 1, unlocked: false };
  }
  return badge.check(userStats);
};

export const checkAllBadges = (userStats, currentUnlockedIds = []) => {
  const newlyUnlocked = [];
  const allUnlocked = [...currentUnlockedIds];

  BADGES.forEach(badge => {
    const { unlocked } = getBadgeStats(badge, userStats);
    if (unlocked && !allUnlocked.includes(badge.id)) {
      newlyUnlocked.push(badge);
      allUnlocked.push(badge.id);
    }
  });

  return {
    newlyUnlocked,
    allUnlocked
  };
};
