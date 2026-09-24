// =========================================================================
// FOCUSLY UNIVERSE: AVATAR CUSTOMIZATION, ENVIRONMENTS & PROGRESSION DATA
// =========================================================================

export const RARITIES = {
  common: {
    id: 'common',
    label: 'Común',
    labelEn: 'Common',
    hex: '#94a3b8',
    border: 'border-zinc-500/20',
    bg: 'bg-zinc-500/10',
    text: 'text-zinc-300',
    glow: 'rgba(148, 163, 184, 0.12)',
    badgeBg: 'bg-zinc-800 text-zinc-300'
  },
  rare: {
    id: 'rare',
    label: 'Raro',
    labelEn: 'Rare',
    hex: '#38bdf8',
    border: 'border-sky-500/30',
    bg: 'bg-sky-500/10',
    text: 'text-sky-300',
    glow: 'rgba(56, 189, 248, 0.18)',
    badgeBg: 'bg-sky-950/70 text-sky-200 border border-sky-500/25'
  },
  epic: {
    id: 'epic',
    label: 'Épico',
    labelEn: 'Epic',
    hex: '#a855f7',
    border: 'border-purple-500/30',
    bg: 'bg-purple-500/10',
    text: 'text-purple-300',
    glow: 'rgba(168, 85, 247, 0.20)',
    badgeBg: 'bg-purple-950/70 text-purple-200 border border-purple-500/25'
  },
  legendary: {
    id: 'legendary',
    label: 'Legendario',
    labelEn: 'Legendary',
    hex: '#eab308',
    border: 'border-amber-500/35',
    bg: 'bg-amber-500/10',
    text: 'text-amber-300',
    glow: 'rgba(234, 179, 8, 0.22)',
    badgeBg: 'bg-amber-950/70 text-amber-200 border border-amber-500/30'
  },
  mythic: {
    id: 'mythic',
    label: 'Mítico',
    labelEn: 'Mythic',
    hex: '#f43f5e',
    border: 'border-rose-500/35',
    bg: 'bg-rose-500/10',
    text: 'text-rose-200',
    glow: 'rgba(244, 63, 94, 0.22)',
    badgeBg: 'bg-rose-950/70 text-rose-200 border border-rose-500/30'
  }
};

// Available Hairstyle options for stylized 3D Avatar
export const HAIRSTYLES = [
  { id: 'hair_sleek', name: 'Sleek Fade', rarity: 'common', color: '#1e293b' },
  { id: 'hair_cyber', name: 'Cyber Spikes', rarity: 'rare', color: '#0284c7' },
  { id: 'hair_zen', name: 'Zen Topknot', rarity: 'rare', color: '#334155' },
  { id: 'hair_flow', name: 'Silky Wave', rarity: 'epic', color: '#64748b' },
  { id: 'hair_crown', name: 'Astral Horns', rarity: 'legendary', color: '#d4af37' },
  { id: 'hair_solar', name: 'Cresta Solar', rarity: 'mythic', color: '#f59e0b' }
];

// Outfits
export const OUTFITS = [
  {
    id: 'outfit_base',
    name: 'Sudadera Minimalista',
    rarity: 'common',
    price: 0,
    desc: 'Tejido neutro de alta concentración. Tu uniforme de partida.',
    primaryColor: '#18181b',
    accentColor: '#ffffff',
    category: 'outfit'
  },
  {
    id: 'outfit_zen',
    name: 'Túnica Monje Zen',
    rarity: 'rare',
    price: 300,
    desc: 'Cero distracciones. Fluye entre sesiones de estudio profundo.',
    primaryColor: '#27272a',
    accentColor: '#38bdf8',
    category: 'outfit'
  },
  {
    id: 'outfit_tuxedo',
    name: 'Smoking Obsidian',
    rarity: 'rare',
    price: 450,
    desc: 'Elegancia ejecutiva en negro mate con detalles de platino.',
    primaryColor: '#09090b',
    accentColor: '#e2e8f0',
    category: 'outfit'
  },
  {
    id: 'outfit_kimono',
    name: 'Haori de Seda y Grafito',
    rarity: 'epic',
    price: 550,
    desc: 'Corte tradicional japonés con tejido de grafito y líneas de plata.',
    primaryColor: '#1e1b4b',
    accentColor: '#c084fc',
    category: 'outfit'
  },
  {
    id: 'outfit_tactical',
    name: 'Armadura Táctica Cyber',
    rarity: 'epic',
    price: 650,
    desc: 'Diseñada para resistir ráfagas de notificaciones y multitarea.',
    primaryColor: '#0f172a',
    accentColor: '#a855f7',
    category: 'outfit'
  },
  {
    id: 'outfit_alchemist',
    name: 'Túnica de Alquimista',
    rarity: 'legendary',
    price: 950,
    desc: 'Paño de lana carbón con broches de latón envejecido y cuero noble.',
    primaryColor: '#1c1917',
    accentColor: '#d97706',
    category: 'outfit'
  },
  {
    id: 'outfit_champion',
    name: 'Manto Dorado de Liga',
    rarity: 'legendary',
    price: 1200,
    desc: 'Forjado con los laureles de rachas ininterrumpidas de 30 días.',
    primaryColor: '#451a03',
    accentColor: '#fbbf24',
    category: 'outfit'
  },
  {
    id: 'outfit_celestial',
    name: 'Exo-traje Astral',
    rarity: 'mythic',
    price: 2000,
    desc: 'Materia cósmica pura que distorsiona el tiempo a tu favor.',
    primaryColor: '#2e0854',
    accentColor: '#f43f5e',
    category: 'outfit'
  }
];

// Accessories
export const ACCESSORIES = [
  {
    id: 'acc_none',
    name: 'Sin Accesorio',
    rarity: 'common',
    price: 0,
    desc: 'Enfoque austero y limpio.',
    category: 'accessory'
  },
  {
    id: 'acc_glasses_classic',
    name: 'Gafas de Montura Fina',
    rarity: 'common',
    price: 150,
    desc: 'Montura circular minimalista para mentes analíticas.',
    category: 'accessory'
  },
  {
    id: 'acc_holo_visor',
    name: 'Visor Holo-Focus',
    rarity: 'rare',
    price: 250,
    desc: 'Proyecta métricas de atención con cristal ahumado.',
    category: 'accessory'
  },
  {
    id: 'acc_cyber_headphones',
    name: 'Auriculares de Frecuencia 40Hz',
    rarity: 'rare',
    price: 350,
    desc: 'Aislamiento acústico binaural para ondas gamma.',
    category: 'accessory'
  },
  {
    id: 'acc_monocle',
    name: 'Monóculo de Precisión',
    rarity: 'rare',
    price: 400,
    desc: 'Engranaje de latón con lente pulida de alta concentración.',
    category: 'accessory'
  },
  {
    id: 'acc_focus_halo',
    name: 'Halo de Concentración',
    rarity: 'epic',
    price: 700,
    desc: 'Anillo dorado sutil que levita en estado de flujo.',
    category: 'accessory'
  },
  {
    id: 'acc_drone',
    name: 'Dron Guardián AI',
    rarity: 'legendary',
    price: 1100,
    desc: 'Compañero que patrulla tus minutos de trabajo bloqueando impulsos.',
    category: 'accessory'
  },
  {
    id: 'acc_wings',
    name: 'Alas Cósmicas de Victoria',
    rarity: 'mythic',
    price: 2200,
    desc: 'Extremidades energéticas que brillan con tu disciplina acumulada.',
    category: 'accessory'
  }
];

// Expressions
export const EXPRESSIONS = [
  { id: 'expr_focused', name: 'Enfoque Absoluto', mood: 'Mirada afilada y centrada' },
  { id: 'expr_confident', name: 'Seguridad Imbatible', mood: 'Sonrisa sutil de victoria' },
  { id: 'expr_zen', name: 'Serenidad Interior', mood: 'Paz mental sin ansiedad' },
  { id: 'expr_fierce', name: 'Determinación Feroz', mood: 'Listo para demoler el reto' },
  { id: 'expr_ecstatic', name: 'Éxtasis de Flujo', mood: 'Brillo deslumbrante de energía' }
];

// Titles
export const TITLES = [
  { id: 'title_iniciado', name: 'El Iniciado', rarity: 'common', desc: 'Dio el primer paso hacia el autodominio.' },
  { id: 'title_inquebrantable', name: 'El Inquebrantable', rarity: 'rare', desc: 'Ninguna notificación pudo romper su enfoque.' },
  { id: 'title_arquitecto', name: 'Arquitecto del Tiempo', rarity: 'epic', desc: 'Diseña sus días con precisión matemática.' },
  { id: 'title_maestro_flujo', name: 'Maestro del Flujo', rarity: 'legendary', desc: 'Capaz de entrar en Deep Work a voluntad.' },
  { id: 'title_leyenda', name: 'Leyenda de Focusly', rarity: 'mythic', desc: 'Lidera la cima con disciplina intachable.' }
];

// Environments (Entornos con Identidad Propia)
export const ENVIRONMENTS = [
  {
    id: 'env_focus',
    name: 'Santuario del Silencio',
    code: 'focus',
    rarity: 'common',
    price: 0,
    atmosphere: 'Tranquilo & Minimalista',
    desc: 'Piedras flotantes de obsidiana, suave niebla y luz cenital que calma el sistema nervioso.',
    primaryGrad: 'from-zinc-950 via-zinc-900 to-black',
    accentHex: '#94a3b8',
    particles: 'dust'
  },
  {
    id: 'env_productivity',
    name: 'Nexo de Productividad',
    code: 'productivity',
    rarity: 'rare',
    price: 350,
    atmosphere: 'Espacio de Organización & Ejecución',
    desc: 'Rejillas isométricas holográficas y corrientes de datos que impulsan la acción.',
    primaryGrad: 'from-slate-950 via-cyan-950/40 to-black',
    accentHex: '#38bdf8',
    particles: 'data'
  },
  {
    id: 'env_growth',
    name: 'Biosfera de Crecimiento',
    code: 'growth',
    rarity: 'epic',
    price: 650,
    atmosphere: 'Evolución & Neuroplasticidad',
    desc: 'Flora bioluminiscente que florece conforme acumulas horas de estudio consciente.',
    primaryGrad: 'from-emerald-950/50 via-zinc-950 to-black',
    accentHex: '#34d399',
    particles: 'spores'
  },
  {
    id: 'env_mastery',
    name: 'Observatorio de Maestría',
    code: 'mastery',
    rarity: 'legendary',
    price: 1200,
    atmosphere: 'Filosofía & Alta Cognición',
    desc: 'Anillos astrales concéntricos sobre una nebulosa dorada de sabiduría intemporal.',
    primaryGrad: 'from-purple-950/60 via-indigo-950/50 to-black',
    accentHex: '#fbbf24',
    particles: 'stars'
  },
  {
    id: 'env_competitive',
    name: 'Coliseo de Campeones',
    code: 'competitive',
    rarity: 'mythic',
    price: 2500,
    atmosphere: 'Arena de Ligas & Competición',
    desc: 'Columnas de energía neón y antorchas flotantes que encienden el espíritu competitivo.',
    primaryGrad: 'from-rose-950/70 via-black to-zinc-950',
    accentHex: '#f43f5e',
    particles: 'sparks'
  }
];

// Visual Progression Road (Camino de Trofeos / Trophy Path)
export const PROGRESSION_ROAD = [
  {
    level: 1,
    xpRequired: 0,
    title: 'Génesis del Hábito',
    reward: { type: 'title', id: 'title_iniciado', name: 'Título: El Iniciado' },
    icon: 'Sprout',
    unlocked: true
  },
  {
    level: 2,
    xpRequired: 200,
    title: 'Primer Aliento',
    reward: { type: 'diamonds', amount: 50, name: '50 Diamantes' },
    icon: 'Gem'
  },
  {
    level: 3,
    xpRequired: 500,
    title: 'Visión Limpia',
    reward: { type: 'accessory', id: 'acc_holo_visor', name: 'Visor Holo-Focus' },
    icon: 'Zap'
  },
  {
    level: 5,
    xpRequired: 1000,
    title: 'Entorno Desbloqueado',
    reward: { type: 'environment', id: 'env_productivity', name: 'Nexo de Productividad' },
    icon: 'Layers'
  },
  {
    level: 7,
    xpRequired: 2000,
    title: 'Monje de Tarea Única',
    reward: { type: 'outfit', id: 'outfit_zen', name: 'Túnica Monje Zen' },
    icon: 'Shield'
  },
  {
    level: 10,
    xpRequired: 4000,
    title: 'Inquebrantable',
    reward: { type: 'title', id: 'title_inquebrantable', name: 'Título: El Inquebrantable' },
    icon: 'Award'
  },
  {
    level: 12,
    xpRequired: 6500,
    title: 'Biosfera Abierta',
    reward: { type: 'environment', id: 'env_growth', name: 'Biosfera de Crecimiento' },
    icon: 'Sprout'
  },
  {
    level: 15,
    xpRequired: 10000,
    title: 'Armadura Táctica',
    reward: { type: 'outfit', id: 'outfit_tactical', name: 'Armadura Táctica Cyber' },
    icon: 'Shield'
  },
  {
    level: 18,
    xpRequired: 15000,
    title: 'Observatorio Astral',
    reward: { type: 'environment', id: 'env_mastery', name: 'Observatorio de Maestría' },
    icon: 'Sparkles'
  },
  {
    level: 20,
    xpRequired: 22000,
    title: 'Manto Dorado',
    reward: { type: 'outfit', id: 'outfit_champion', name: 'Manto Dorado de Liga' },
    icon: 'Crown'
  },
  {
    level: 25,
    xpRequired: 35000,
    title: 'Leyenda del Tiempo',
    reward: { type: 'title', id: 'title_leyenda', name: 'Título: Leyenda de Focusly' },
    icon: 'Trophy'
  }
];

// Helper to determine Environment Evolution Tier
export const getEnvironmentTier = (userXP = 0) => {
  const level = Math.max(1, Math.floor(userXP / 1000) + 1);
  if (level < 5) return { tier: 'beginner', label: 'Principiante', elementsCount: 1, glowIntensity: 0.3 };
  if (level < 10) return { tier: 'novice', label: 'Iniciado', elementsCount: 2, glowIntensity: 0.5 };
  if (level < 20) return { tier: 'professional', label: 'Profesional', elementsCount: 3, glowIntensity: 0.75 };
  return { tier: 'legend', label: 'Leyenda', elementsCount: 4, glowIntensity: 1.0 };
};

// =========================================================================
// CHARACTER PERSONAS & ARCHETYPES (Identidad, Silueta, Lore y Atributos)
// =========================================================================
export const CHARACTER_PERSONAS = {
  a_base: {
    id: 'a_base',
    name: 'El Aprendiz',
    category: 'avatar',
    archetype: 'Núcleo de Inicio',
    price: 0,
    rarity: 'common',
    desc: 'Tu silueta inicial en la senda del autodominio. Listo para ser forjado.',
    lore: 'Todo gran maestro de la disciplina comenzó con una hoja en blanco y la voluntad de sentarse a trabajar.',
    perk: '+5% Claridad Mental',
    statVoluntad: '70%',
    statFoco: 'Creciente'
  },
  a_samurai: {
    id: 'a_samurai',
    name: 'Ronin del Bushido',
    category: 'avatar',
    archetype: 'El Estratega Marcial',
    price: 600,
    rarity: 'rare',
    desc: 'Casco Kabuto forjado con crestas de oro y máscara Menpo. Corta distracciones de un solo tajo.',
    lore: 'Sigue el código de honor de la concentración inquebrantable. Para él, una notificación es un ataque que se desvía con compostura.',
    perk: 'Corte Quirúrgico a la Distracción (+15% XP en rachas)',
    statVoluntad: '93%',
    statFoco: 'Afilado'
  },
  a_alchemist: {
    id: 'a_alchemist',
    name: 'El Alquimista',
    category: 'avatar',
    archetype: 'El Sabio Transmutador',
    price: 750,
    rarity: 'epic',
    desc: 'Capucha de erudito, anteojos de latón y runas que transmutan minutos dispersos en oro cognitivo.',
    lore: 'No lucha contra el tiempo: transmuta el caos del entorno en el elixir del Deep Work más puro.',
    perk: 'Transmutación del Tiempo (+20% eficacia Pomodoro)',
    statVoluntad: '91%',
    statFoco: 'Metódico'
  },
  a_astronomer: {
    id: 'a_astronomer',
    name: 'Cartógrafo Astral',
    category: 'avatar',
    archetype: 'El Navegante Cósmico',
    price: 850,
    rarity: 'epic',
    desc: 'Manto medianoche estrellado y monóculo astrolabio para cartografiar objetivos lejanos.',
    lore: 'Calcula las órbitas de sus proyectos con meses de antelación. Jamás pierde el norte en tormentas de urgencias ajenas.',
    perk: 'Visión Macro (+15% Retención en Bloques Largos)',
    statVoluntad: '90%',
    statFoco: 'Estelar'
  },
  a_monk: {
    id: 'a_monk',
    name: 'Monje Zen',
    category: 'avatar',
    archetype: 'El Silencio Interior',
    price: 700,
    rarity: 'epic',
    desc: 'Cabeza serena, ojos cerrados de respiración diafragmática y cuentas sagradas de atención plena.',
    lore: 'Inmóvil en medio del frenesí digital. Encuentra la calma en la respiración y la profundidad en una sola tarea.',
    perk: 'Respiración de Foco Inmersivo (-50% fatiga mental)',
    statVoluntad: '95%',
    statFoco: 'Serenidad'
  },
  a_nature_spirit: {
    id: 'a_nature_spirit',
    name: 'Exploradora del Bosque',
    category: 'avatar',
    archetype: 'La Naturalista',
    price: 700,
    rarity: 'rare',
    desc: 'Corona viva de hojas de laurel esmeralda y mirada conectada a los ciclos biológicos de energía.',
    lore: 'Alinea sus sesiones de estudio con el ritmo circadiano de la naturaleza. Florece donde otros se marchitan por estrés.',
    perk: 'Energía Regenerativa (+10 diamantes por bloque)',
    statVoluntad: '88%',
    statFoco: 'Orgánico'
  },
  a_architect: {
    id: 'a_architect',
    name: 'El Arquitecto',
    category: 'avatar',
    archetype: 'El Estratega del Tiempo',
    price: 850,
    rarity: 'epic',
    desc: 'Peinado pulcro, montura dorada geométrica y precisión milimétrica en cada jornada.',
    lore: 'No improvisa su vida: la dibuja en planos de alta densidad. Cada hora tiene su cimiento y su viga de soporte.',
    perk: 'Estructura Perfecta (+20% bonus de planificación)',
    statVoluntad: '94%',
    statFoco: 'Matemático'
  },
  a_cyberdoc: {
    id: 'a_cyberdoc',
    name: 'Neuro-Arquitecto',
    category: 'avatar',
    archetype: 'El Bio-Hacker Mental',
    price: 950,
    rarity: 'legendary',
    desc: 'Visor de titanio y escáner sináptico azul cian para monitorizar estados de flujo cerebral.',
    lore: 'Optimiza la dopamina, la adenosina y las ondas alfa con rigor científico para alcanzar hiperfoco a demanda.',
    perk: 'Sincronización Neuro-Gamma (+25% XP en Flow)',
    statVoluntad: '96%',
    statFoco: 'Cuántico'
  },
  a_valkyrie: {
    id: 'a_valkyrie',
    name: 'Valquiria del Alba',
    category: 'avatar',
    archetype: 'La Guerrera Celestial',
    price: 1100,
    rarity: 'legendary',
    desc: 'Tiara alada de platino, armadura luminosa y custodia incansable sobre tus metas más sagradas.',
    lore: 'Custodia el amanecer de los estudiantes que madrugan por sus sueños. No tolera la autocomplacencia ni la cobardía.',
    perk: 'Vigilia Heroica (+30% bonus de constancia matutina)',
    statVoluntad: '98%',
    statFoco: 'Inquebrantable'
  },
  a_vento: {
    id: 'a_vento',
    name: 'Vento - Dragón del Viento',
    category: 'avatar',
    archetype: 'Mentor de la Adaptabilidad',
    price: 800,
    rarity: 'rare',
    desc: 'Astas de origami celeste y marcas aerodinámicas. Fluye esquivando la resistencia mental.',
    lore: 'El viento nunca choca contra las montañas: las rodea y las talla. Te enseña a sortear la fricción sin esfuerzo.',
    perk: 'Fluidez sin Fricción (-30% esfuerzo de inicio)',
    statVoluntad: '92%',
    statFoco: 'Ligero'
  },
  a_crono: {
    id: 'a_crono',
    name: 'Crono - Vigilante del Tiempo',
    category: 'avatar',
    archetype: 'El Señor de los Minutos',
    price: 1000,
    rarity: 'epic',
    desc: 'Halo orbital con engranajes dorados y visor de arena cósmica. Domina el paso de las horas.',
    lore: 'Para Crono, el tiempo no vuela ni se arrastra: obedece la voluntad del artesano que sabe ordenarlo.',
    perk: 'Dilatación Perceptiva (+20% tiempo de flow)',
    statVoluntad: '96%',
    statFoco: 'Cronológico'
  },
  a_sophia: {
    id: 'a_sophia',
    name: 'Sophia - Diosa del Silencio',
    category: 'avatar',
    archetype: 'La Paz Absoluta',
    price: 1200,
    rarity: 'epic',
    desc: 'Diadema de perla áurea y semblante luminoso que apaga el ruido de mil notificaciones.',
    lore: 'En su presencia, el ruido del mundo moderno se disipa como el vapor. Solo queda tu mente y tu tarea presente.',
    perk: 'Silencio Cósmico (Bloqueo absoluto de distracciones)',
    statVoluntad: '99%',
    statFoco: 'Puro'
  },
  a_icaro: {
    id: 'a_icaro',
    name: 'Ícaro - Fénix Renaciente',
    category: 'avatar',
    archetype: 'El Fénix de la Resiliencia',
    price: 1500,
    rarity: 'legendary',
    desc: 'Cresta ígnea de plumas solares y mirada ardiente. Renace con más fuerza tras cada recaída.',
    lore: 'Quien nunca tropieza nunca aprende a levantarse. Si perdiste una racha, Ícaro te enciende una hoguera aún mayor.',
    perk: 'Renacer Inmortal (Protector de Racha automático)',
    statVoluntad: '95%',
    statFoco: 'Fuego Vivo'
  },
  a_atlas: {
    id: 'a_atlas',
    name: 'Atlas - Titán de la Voluntad',
    category: 'avatar',
    archetype: 'La Disciplina Suprema',
    price: 2000,
    rarity: 'mythic',
    desc: 'Facciones de roca rúnica y runas turquesa en las sienes. Soporta el inmenso peso de los hábitos.',
    lore: 'Soporta las rutinas más duras del año sin emitir una sola queja. La disciplina no es emoción: es gravedad pura.',
    perk: 'Pilar Titánico (+35% bonus en rachas de 30+ días)',
    statVoluntad: '100%',
    statFoco: 'Titánico'
  },
  a_crown: {
    id: 'a_crown',
    name: 'Soberano de la Disciplina',
    category: 'avatar',
    archetype: 'La Realeza del Autodominio',
    price: 1800,
    rarity: 'mythic',
    desc: 'Corona imperial de oro puro cincelado y rubí regio. Señor absoluto de su propia atención.',
    lore: 'El rey auténtico no gobierna a otros: gobierna sus impulsos primarios, sus deseos y sus horarios.',
    perk: 'Soberanía Mental (+25% diamantes en toda la app)',
    statVoluntad: '99%',
    statFoco: 'Real'
  },
  a_ninja: {
    id: 'a_ninja',
    name: 'Shinobi de las Sombras',
    category: 'avatar',
    archetype: 'El Enfoque Oculto',
    price: 500,
    rarity: 'rare',
    desc: 'Capucha táctica y máscara ninja con cinta carmesí. Trabaja en completo sigilo y silencio.',
    lore: 'No anuncia sus proyectos ni publica sus horas de estudio. Ejecuta en las sombras y deja que los resultados hablen.',
    perk: 'Sigilo de Trabajo (+15% velocidad de sesión)',
    statVoluntad: '92%',
    statFoco: 'Invisible'
  },
  a_bot: {
    id: 'a_bot',
    name: 'Unidad Omega',
    category: 'avatar',
    archetype: 'La Precisión Algorítmica',
    price: 450,
    rarity: 'rare',
    desc: 'Chasis de titanio pulido con visor horizontal óptico ciber. Cero dudas, cero procrastinación.',
    lore: 'Procesa tareas como un procesador de alto rendimiento: de una en una, sin fugas de memoria ni dispersión.',
    perk: 'Cero Latencia (+10% precisión en tareas)',
    statVoluntad: '94%',
    statFoco: 'Binario'
  },
  a_hacker: {
    id: 'a_hacker',
    name: 'Ciber-Breaker',
    category: 'avatar',
    archetype: 'El Rompedor de Bucles',
    price: 600,
    rarity: 'rare',
    desc: 'Capucha oscura y visor de matriz digital verde glitch. Hackea el bucle de dopamina nocivo.',
    lore: 'Conoce los trucos de los algoritmos de redes sociales y los desactiva antes de que toquen su mente.',
    perk: 'Anti-Dopamina Trap (+15% foco en navegación web)',
    statVoluntad: '90%',
    statFoco: 'Cibernético'
  },
  a_brain: {
    id: 'a_brain',
    name: 'Consciencia Cósmica',
    category: 'avatar',
    archetype: 'La Mente Despierta',
    price: 550,
    rarity: 'rare',
    desc: 'Lóbulos de sinapsis luminosa y constelación neuronal violeta. Conexión con ideas sublimes.',
    lore: 'Donde otros ven tareas aisladas, percibe el mapa interconectado del conocimiento humano universal.',
    perk: 'Asociación Sináptica (+20% retención de lectura)',
    statVoluntad: '89%',
    statFoco: 'Cósmico'
  },
  a_flame: {
    id: 'a_flame',
    name: 'Guerrero de Fuego',
    category: 'avatar',
    archetype: 'El Fervor y la Pasión',
    price: 400,
    rarity: 'common',
    desc: 'Cresta de fuego vivo místico que arde con cada minuto de concentración ininterrumpida.',
    lore: 'Su combustible es el propósito. Cada vez que siente pereza, aviva la llama recordando por qué empezó.',
    perk: 'Chispa de Voluntad (+10% energía en tareas difíciles)',
    statVoluntad: '86%',
    statFoco: 'Ardiente'
  },
  a_void: {
    id: 'a_void',
    name: 'Nómada del Vacío',
    category: 'avatar',
    archetype: 'El Vacío Fértil',
    bodyArchetype: 'astral_entity',
    price: 900,
    rarity: 'epic',
    desc: 'Vórtice de singularidad cósmica donde desaparece cualquier estímulo irrelevante.',
    lore: 'Para crear algo nuevo, primero debes vaciar la mente de todo lo superfluo. El silencio es el taller del genio.',
    perk: 'Aniquilación de Estímulos (+20% resistencia a interrupciones)',
    statVoluntad: '95%',
    statFoco: 'Trascendente'
  },
  a_chibi_zen: {
    id: 'a_chibi_zen',
    name: 'Mini-Monk Zen',
    category: 'avatar',
    archetype: 'El Monje Chibi',
    bodyArchetype: 'chibi',
    price: 450,
    rarity: 'rare',
    desc: 'Silueta compacta, cabeza serena y cuentas de oración de sándalo flotantes.',
    lore: 'Pequeño en estatura, gigante en calma mental. Demuestra que la serenidad no requiere armaduras pesadas.',
    perk: 'Calma Pura (+15% reducción de estrés mental)',
    statVoluntad: '91%',
    statFoco: 'Pacífico'
  },
  a_neko_cyber: {
    id: 'a_neko_cyber',
    name: 'Guardián Cyber-Cat',
    category: 'avatar',
    archetype: 'Mascota Robótica Centinela',
    bodyArchetype: 'chibi',
    price: 650,
    rarity: 'epic',
    desc: 'Compañero meca felino con orejas de radar holográfico y cola de fibra de carbono.',
    lore: 'Patrulla tu escritorio y maúlla con ondas binaurales cuando detecta que abres una red social distractora.',
    perk: 'Radar Centinela (+10% velocidad de recuperación de racha)',
    statVoluntad: '89%',
    statFoco: 'Alerta'
  }
};

// Default Inventory State
export const DEFAULT_INVENTORY = {
  avatars: ['a_base'],
  outfits: ['outfit_base'],
  unlockedOutfits: ['outfit_base'],
  accessories: ['acc_none'],
  unlockedAccessories: ['acc_none'],
  backgrounds: ['bg_default', 'bg_light', 'env_focus'],
  titles: ['title_iniciado'],
  unlockedTitles: ['title_iniciado'],
  skins: [],
  unlockedBadges: [],
  ownedItems: ['a_base', 'outfit_base', 'acc_none', 'bg_default', 'bg_light', 'env_focus', 'title_iniciado'],
  equippedAvatar: 'a_base',
  equippedOutfit: 'outfit_base',
  equippedAccessory: 'acc_none',
  equippedBg: 'bg_default',
  equippedTitle: 'title_iniciado',
  equippedSkins: { 'a_base': null }
};

// Sanitization & Migration of Inventory state
export const sanitizeInventory = (raw = {}) => {
  const safe = { ...DEFAULT_INVENTORY, ...(raw || {}) };

  // Ensure arrays
  safe.avatars = Array.isArray(safe.avatars) && safe.avatars.length > 0 ? [...new Set(safe.avatars)] : ['a_base'];
  
  const rawOutfits = Array.isArray(safe.outfits) ? safe.outfits : Array.isArray(safe.unlockedOutfits) ? safe.unlockedOutfits : ['outfit_base'];
  safe.outfits = [...new Set(['outfit_base', ...rawOutfits])];
  safe.unlockedOutfits = safe.outfits;

  const rawAccs = Array.isArray(safe.accessories) ? safe.accessories : Array.isArray(safe.unlockedAccessories) ? safe.unlockedAccessories : ['acc_none'];
  safe.accessories = [...new Set(['acc_none', ...rawAccs])];
  safe.unlockedAccessories = safe.accessories;

  safe.backgrounds = Array.isArray(safe.backgrounds) && safe.backgrounds.length > 0 
    ? [...new Set(['bg_default', 'bg_light', 'env_focus', ...safe.backgrounds])] 
    : ['bg_default', 'bg_light', 'env_focus'];

  const rawTitles = Array.isArray(safe.titles) ? safe.titles : Array.isArray(safe.unlockedTitles) ? safe.unlockedTitles : ['title_iniciado'];
  safe.titles = [...new Set(['title_iniciado', ...rawTitles])];
  safe.unlockedTitles = safe.titles;

  safe.skins = Array.isArray(safe.skins) ? safe.skins : [];
  safe.unlockedBadges = Array.isArray(safe.unlockedBadges) ? safe.unlockedBadges : [];

  // Consolidate ownedItems as unified source of truth
  safe.ownedItems = [
    ...new Set([
      ...safe.avatars,
      ...safe.outfits,
      ...safe.accessories,
      ...safe.backgrounds,
      ...safe.titles,
      ...(Array.isArray(safe.ownedItems) ? safe.ownedItems : [])
    ])
  ];

  // Active slots
  safe.equippedAvatar = safe.equippedAvatar || 'a_base';
  safe.equippedOutfit = safe.equippedOutfit || 'outfit_base';
  safe.equippedAccessory = safe.equippedAccessory || 'acc_none';
  safe.equippedBg = safe.equippedBg || 'bg_default';
  safe.equippedTitle = safe.equippedTitle || 'title_iniciado';
  safe.equippedSkins = (safe.equippedSkins && typeof safe.equippedSkins === 'object') ? safe.equippedSkins : { 'a_base': null };

  return safe;
};

// Local storage helpers
export const loadSavedInventory = () => {
  try {
    const raw = localStorage.getItem('focusly_inventory');
    if (raw) {
      return sanitizeInventory(JSON.parse(raw));
    }
  } catch (err) {
    console.warn('Error reading saved inventory:', err);
  }
  return DEFAULT_INVENTORY;
};

export const saveInventoryToStorage = (inv) => {
  try {
    const safe = sanitizeInventory(inv);
    localStorage.setItem('focusly_inventory', JSON.stringify(safe));
    return safe;
  } catch (err) {
    console.warn('Error saving inventory to localStorage:', err);
    return inv;
  }
};

