// src/data/progressionSystem.js
// SISTEMA INTEGRADO DE PROGRESIÓN A LARGO PLAZO (1 - 2+ AÑOS), BALANCE DE XP Y ECONOMÍA

/**
 * 1. MATRIZ DE DIFICULTADES Y RECOMPENSAS BALANCEADAS
 * Garantiza que las tareas difíciles otorguen un valor sustancialmente mayor,
 * pero dentro de un límite que no destruye la economía ni permite exploits.
 */
export const DIFFICULTY_TIERS = {
  facil: {
    id: 'facil',
    name: 'Fácil',
    label: 'Iniciación',
    minMinutes: 5,
    maxMinutes: 15,
    xpReward: 20,
    diamondReward: 4,
    multiplier: 1.0,
    color: '#10b981',
    desc: 'Acción rápida de baja fricción cognitiva.'
  },
  normal: {
    id: 'normal',
    name: 'Normal',
    label: 'Enfoque Diario',
    minMinutes: 15,
    maxMinutes: 30,
    xpReward: 50,
    diamondReward: 10,
    multiplier: 1.5,
    color: '#3b82f6',
    desc: 'Esfuerzo constante y deliberado.'
  },
  dificil: {
    id: 'dificil',
    name: 'Difícil',
    label: 'Desafío Mental',
    minMinutes: 30,
    maxMinutes: 60,
    xpReward: 120,
    diamondReward: 25,
    multiplier: 2.5,
    color: '#8b5cf6',
    desc: 'Sesión profunda con alta demanda de atención.'
  },
  experto: {
    id: 'experto',
    name: 'Experto',
    label: 'Deep Work Élite',
    minMinutes: 60,
    maxMinutes: 120,
    xpReward: 300,
    diamondReward: 60,
    multiplier: 4.0,
    color: '#f59e0b',
    desc: 'Inmersión prolongada sin ninguna interrupción.'
  },
  master: {
    id: 'master',
    name: 'Master',
    label: 'Hito de Maestría',
    minMinutes: 120,
    maxMinutes: 240,
    xpReward: 600,
    diamondReward: 120,
    multiplier: 6.0,
    color: '#ef4444',
    desc: 'Culminación de proyectos, exámenes o unidades completas.'
  }
};

/**
 * 2. CURVA DE NIVELES A LARGO PLAZO (1 - 50 + PRESTIGIO I - V)
 * Curva polinomial suave al inicio y exponencial moderada en fases avanzadas.
 * Un usuario de semanas llega a Nivel 5-10.
 * Un usuario de meses llega a Nivel 15-25.
 * Un usuario de 1 año alcanza Nivel 35-45.
 * Un usuario de 2+ años alcanza Nivel 50 y escala los rangos de Prestigio.
 */
export const calculateXPForLevel = (level) => {
  if (level <= 1) return 0;
  // Curva balanceada: base escalada que premia la constancia acumulada
  return Math.round(150 * Math.pow(level - 1, 1.85) + (level - 1) * 100);
};

export const getLevelFromXP = (totalXP) => {
  const safeXP = Math.max(0, Number(totalXP) || 0);
  let level = 1;
  while (calculateXPForLevel(level + 1) <= safeXP && level < 50) {
    level++;
  }
  
  const currentLevelXP = calculateXPForLevel(level);
  const nextLevelXP = level >= 50 ? currentLevelXP + 10000 : calculateXPForLevel(level + 1);
  const xpInCurrentLevel = safeXP - currentLevelXP;
  const xpNeededForNext = nextLevelXP - currentLevelXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForNext) * 100)));

  // Prestigio después de nivel 50
  const prestigeLevel = safeXP >= calculateXPForLevel(50) 
    ? Math.min(5, Math.floor((safeXP - calculateXPForLevel(50)) / 25000) + 1)
    : 0;

  return {
    level,
    prestigeLevel,
    currentLevelXP,
    nextLevelXP,
    xpInCurrentLevel,
    xpNeededForNext,
    progressPercent,
    isMaxLevel: level >= 50 && prestigeLevel >= 5
  };
};

/**
 * Hitos y recompensas específicas por nivel
 */
export const LEVEL_MILESTONES = {
  3: { title: 'Iniciado del Enfoque', diamondBonus: 30, badge: 'level_3' },
  5: { title: 'Practicante Disciplinado', diamondBonus: 50, badge: 'level_5', unlockFrame: 'frame_bronze' },
  10: { title: 'Forjador de Hábitos', diamondBonus: 120, badge: 'level_10', unlockAccessory: 'acc_headband_steel' },
  15: { title: 'Arquitecto del Tiempo', diamondBonus: 200, badge: 'level_15', unlockFrame: 'frame_silver' },
  20: { title: 'Mente Inquebrantable', diamondBonus: 300, badge: 'level_20', unlockTitle: 'title_iron_will' },
  25: { title: 'Guardián del Silencio', diamondBonus: 400, badge: 'level_25', unlockFrame: 'frame_gold' },
  30: { title: 'Maestro del Estado de Flujo', diamondBonus: 500, badge: 'level_30', unlockAccessory: 'acc_halo_energy' },
  40: { title: 'Soberano de la Quietud', diamondBonus: 800, badge: 'level_40', unlockFrame: 'frame_obsidian' },
  50: { title: 'Leyenda Viviente (Prestigio I)', diamondBonus: 1500, badge: 'level_50', unlockAura: 'aura_celestial', canPrestige: true }
};

/**
 * 3. LIGAS Y RANKINGS CONECTADOS (PROGRESIÓN REAL A LARGO PLAZO)
 * Ajustadas para evitar que se completen en pocos días.
 */
export const PROGRESSION_LEAGUES = [
  {
    id: 'iron',
    name: 'LIGA HIERRO',
    tier: 1,
    minXP: 0,
    maxXP: 1500,
    reqLabel: '0 - 1,500 XP',
    hex: '#9ca3af',
    subtext: 'Iniciación en el dominio de la atención',
    weeklyRewardDiamonds: 30,
    iconName: 'Shield'
  },
  {
    id: 'bronze',
    name: 'LIGA BRONCE',
    tier: 2,
    minXP: 1500,
    maxXP: 5000,
    reqLabel: '1,500 - 5,000 XP',
    hex: '#b45309',
    subtext: 'Construcción de hábitos primarios',
    weeklyRewardDiamonds: 60,
    iconName: 'Medal'
  },
  {
    id: 'silver',
    name: 'LIGA PLATA',
    tier: 3,
    minXP: 5000,
    maxXP: 15000,
    reqLabel: '5,000 - 15,000 XP',
    hex: '#94a3b8',
    subtext: 'Regularidad y control de impulsos probado',
    weeklyRewardDiamonds: 100,
    iconName: 'Award'
  },
  {
    id: 'gold',
    name: 'LIGA ORO',
    tier: 4,
    minXP: 15000,
    maxXP: 35000,
    reqLabel: '15,000 - 35,000 XP',
    hex: '#eab308',
    subtext: 'Meses de disciplina sólida demostrada',
    weeklyRewardDiamonds: 160,
    iconName: 'Trophy'
  },
  {
    id: 'platinum',
    name: 'LIGA PLATINO',
    tier: 5,
    minXP: 35000,
    maxXP: 75000,
    reqLabel: '35,000 - 75,000 XP',
    hex: '#06b6d4',
    subtext: 'Dominio de múltiples maestrías y retos',
    weeklyRewardDiamonds: 250,
    iconName: 'Sparkles'
  },
  {
    id: 'diamond',
    name: 'LIGA DIAMANTE',
    tier: 6,
    minXP: 75000,
    maxXP: 150000,
    reqLabel: '75,000 - 150,000 XP',
    hex: '#38bdf8',
    subtext: 'El 5% de usuarios más constantes de Focusly',
    weeklyRewardDiamonds: 400,
    iconName: 'Gem'
  },
  {
    id: 'titan',
    name: 'LIGA TITÁN / LEYENDA',
    tier: 7,
    minXP: 150000,
    maxXP: Infinity,
    reqLabel: '150,000+ XP',
    hex: '#a855f7',
    subtext: 'Rango de honor para veteranos de más de 1-2 años',
    weeklyRewardDiamonds: 600,
    iconName: 'Crown'
  }
];

export const getLeagueForXP = (xp) => {
  const safeXP = Math.max(0, Number(xp) || 0);
  return PROGRESSION_LEAGUES.find(l => safeXP >= l.minXP && safeXP < l.maxXP) || PROGRESSION_LEAGUES[PROGRESSION_LEAGUES.length - 1];
};

/**
 * 4. SISTEMA ANTI-EXPLOIT & DIMINISHING RETURNS
 * Limita el farm abusivo por clics repetidos o tareas falsas instantáneas.
 */
class AntiExploitTracker {
  constructor() {
    this.history = [];
    this.DAILY_XP_CAP = 3500; // Máximo XP razonable que un humano puede generar en un día de deep work intenso
    this.DAILY_DIAMOND_CAP = 450;
  }

  canClaimReward(type, amount, isDiamond = false) {
    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;
    this.history = this.history.filter(entry => entry.timestamp > oneDayAgo);

    const currentTotal = this.history
      .filter(entry => entry.isDiamond === isDiamond)
      .reduce((sum, entry) => sum + entry.amount, 0);

    const cap = isDiamond ? this.DAILY_DIAMOND_CAP : this.DAILY_XP_CAP;
    if (currentTotal + amount > cap) {
      // Rendimiento decreciente: otorgar el remanente con factor de amortiguación
      const allowed = Math.max(0, cap - currentTotal);
      return Math.round(allowed * 0.4);
    }

    this.history.push({ timestamp: now, type, amount, isDiamond });
    return amount;
  }
}

export const antiExploitEngine = new AntiExploitTracker();
