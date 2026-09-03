import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Megaphone, 
  Trophy, 
  ShoppingBag, 
  User, 
  Flame, 
  Zap, 
  Gem, 
  Check, 
  X, 
  Plus, 
  Trash2, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  Play, 
  ChevronRight, 
  RefreshCw, 
  Sun, 
  Moon, 
  Shield, 
  Crown, 
  Medal, 
  BookOpen, 
  LayoutGrid, 
  Brain, 
  Target, 
  MessageSquare, 
  Heart, 
  LogOut, 
  ExternalLink,
  Search,
  CheckCircle2,
  Filter,
  Award,
  Smartphone
} from 'lucide-react';
import { InteractiveCalendar } from './InteractiveCalendar';
import { AppIcon } from './AppIcon';
import { BADGES, checkAllBadges, BADGE_TIERS } from '../data/badges';
import { BadgesView } from './BadgesView';
import { BadgeUnlockModal } from './BadgeUnlockModal';
import { BadgeDetailModal } from './BadgeDetailModal';
import { MASTERIES_DATA } from '../data/masteries';
import { MasteryCourseModal } from './MasteryCourseModal';

const COACHES_DATA = [
  { id: 'sophia', name: 'Sophia', type: 'Perfeccionista Ansioso/a', icon: '🌙', desc: 'Presión académica e Instagram', color: 'from-purple-700 to-indigo-900', borderColor: 'border-purple-500/50', tips: ['Recuerda: 1 like no define tu valor.', 'La perfección es enemiga del progreso.', 'Date permiso de equivocarte.', 'No compares tu interior con el exterior de otros.'] },
  { id: 'icaro', name: 'Ícaro', type: 'Procrastinador Impulsivo', icon: '🔥', desc: 'Adicción a TikTok y dopamina instantánea', color: 'from-orange-700 to-red-900', borderColor: 'border-orange-500/50', tips: ['5-4-3-2-1 ¡arráncate ya!', 'Cada video corto que rechazas es una victoria.', 'Tu cerebro puede reaprender el aburrimiento.', 'La acción imperfecta supera la inacción perfecta.'] },
  { id: 'atlas', name: 'Atlas', type: 'Competitivo Distraído', icon: '📚', desc: 'YouTube y videojuegos sobre el estudio', color: 'from-blue-700 to-cyan-900', borderColor: 'border-blue-500/50', tips: ['Trata el estudio como subes de nivel en un juego.', 'Cada hora de estudio = XP para tu futuro real.', 'Los mejores jugadores también leen y se forman.', 'Analiza tu tiempo de pantalla como analizas estadísticas.'] },
  { id: 'vento', name: 'Vento', type: 'Socialmente Dependiente', icon: '💬', desc: 'FOMO y rachas de Snapchat/WhatsApp', color: 'from-teal-700 to-emerald-900', borderColor: 'border-teal-500/50', tips: ['No es necesario responder en segundos.', 'Las rachas de Snap no miden el valor de una amistad.', 'El FOMO es una mentira que vende la app.', 'Pon límites digitales claros con tus amigos.'] }
];

const DEFAULT_VIDEOS = [
  {
    id: 'v_dopamina',
    title: 'Desintoxicación de Dopamina',
    duration: '5:42',
    category: 'Mentalidad',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    points: [
      'Elimina todo estímulo ultra-procesado en las primeras 2 horas del día.',
      'Sustituye el scroll rápido por aburrimiento controlado para reiniciar receptores.',
      'Escribe tus metas en papel para activar el sistema de recompensa real.'
    ],
    youtubeId: 'p1zI1x37e2M',
    desc: 'Cómo hackear tu química cerebral para recuperar la atención y eliminar la procrastinación inducida por TikTok e Instagram.',
    activityText: 'Desactiva las notificaciones de Instagram y TikTok por las próximas 4 horas.'
  },
  {
    id: 'v_fomo',
    title: 'Venciendo el FOMO (Miedo a perderse algo)',
    duration: '4:15',
    category: 'Redes Sociales',
    thumbnail: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=600&auto=format&fit=crop',
    points: [
      'Entiende que la vida en redes es un filtro irreal de la realidad.',
      'Tus verdaderos amigos no te juzgarán por no responder en 5 minutos.',
      'Prioriza tu paz mental por encima de las rachas de Snapchat.'
    ],
    youtubeId: 'oTeq2ykLiBc',
    desc: 'Aprende a superar la ansiedad que te genera no estar conectado 24/7 y recupera el control de tu tiempo.',
    activityText: 'Deja un mensaje en tu grupo de WhatsApp diciendo que estarás desconectado estudiando por 2 horas.'
  },
  {
    id: 'v_pomodoro_teens',
    title: 'Pomodoro Adaptado para Adolescentes',
    duration: '6:30',
    category: 'Métodos de Estudio',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop',
    points: [
      'Empieza con bloques cortos de 20 minutos si tu atención está dañada.',
      'Durante los 5 min de descanso, estira o bebe agua, ¡CERO PANTALLAS!',
      'Usa el método gradualmente hasta alcanzar bloques de 45 minutos.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'La técnica Pomodoro es brutal, pero las notificaciones la destruyen. Aprende a adaptarla a tu ritmo actual.',
    activityText: 'Completa 1 ciclo de Pomodoro (20 min) con el celular en "No Molestar".'
  },
  {
    id: 'v_sleep_phone',
    title: 'Por qué no dormir con el celular',
    duration: '3:45',
    category: 'Sueño',
    thumbnail: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=600&auto=format&fit=crop',
    points: [
      'La luz azul engaña a tu cerebro haciéndole creer que es de día.',
      'El contenido corto antes de dormir dispara tu cortisol y arruina tu descanso.',
      'Un cerebro sin descanso no puede consolidar la memoria para los exámenes.'
    ],
    youtubeId: '5MgBikgcWYY',
    desc: 'El peor hábito para un estudiante es hacer scroll antes de dormir. Destruye tu memoria y tu energía.',
    activityText: 'Deja cargando tu celular fuera de tu habitación esta noche.'
  },
  {
    id: 'v_feynman',
    title: 'Técnica Feynman para Exámenes',
    duration: '5:20',
    category: 'Métodos de Estudio',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=600&auto=format&fit=crop',
    points: [
      'Elige el concepto que quieres aprender.',
      'Explícalo en voz alta como si se lo enseñaras a un niño de 10 años.',
      'Identifica dónde te trabas y vuelve a los apuntes.'
    ],
    youtubeId: '1-g73ty9v04',
    desc: 'La forma más rápida de dominar cualquier tema para la escuela secundaria o universidad.',
    activityText: 'Toma el tema más difícil que debes estudiar hoy y explícalo en voz alta por 5 minutos.'
  }
];

const DEFAULT_MINIGAMES = [
  { id: 'mg_1', type: 'reflex', title: 'Reflejos Zen', subtitle: '3 Niveles de Atención', desc: 'Prueba de velocidad neuronal. Supera 3 niveles seguidos para ganar la recompensa completa.', icon: Zap, color: 'from-yellow-500 to-orange-600', rewardXP: 30, rewardDia: 10 },
  { id: 'mg_2', type: 'memory', title: 'Memoriza', subtitle: 'Progresión Visual', desc: 'Encuentra las parejas ocultas. La dificultad aumenta tras cada victoria.', icon: LayoutGrid, color: 'from-blue-500 to-cyan-600', rewardXP: 45, rewardDia: 15 },
  { id: 'mg_3', type: 'millionaire', title: 'Mente Maestra', subtitle: 'Prueba de 5 Preguntas', desc: 'Demuestra tu cultura general. Responde 5 preguntas seguidas sin margen de error.', icon: Brain, color: 'from-purple-500 to-indigo-600', rewardXP: 60, rewardDia: 20 },
  { id: 'mg_4', type: 'math', title: 'Genio Matemático', subtitle: 'Agilidad Numérica', desc: 'Resuelve operaciones matemáticas. Fomenta la rapidez mental.', icon: Zap, color: 'from-green-500 to-emerald-600', rewardXP: 40, rewardDia: 10 },
  { id: 'mg_5', type: 'sequence', title: 'Secuencia Lógica', subtitle: 'Orden y Enfoque', desc: 'Toca los números en orden ascendente. Entrena tu memoria de trabajo.', icon: LayoutGrid, color: 'from-indigo-500 to-purple-600', rewardXP: 35, rewardDia: 10 },
  { id: 'mg_6', type: 'whack', title: 'Destructor', subtitle: 'Caza de Distracciones', desc: 'Destruye los iconos de distracciones antes de que desaparezcan.', icon: Target, color: 'from-red-500 to-pink-600', rewardXP: 50, rewardDia: 15 },
  { id: 'mg_7', type: 'stoic', title: 'Sabiduría Estoica', subtitle: 'Ordena la frase', desc: 'Ordena las palabras para formar famosas frases de pensadores estoicos.', icon: BookOpen, color: 'from-slate-500 to-gray-700', rewardXP: 40, rewardDia: 15 }
];

export const DesktopLayout = ({
  username,
  userXP,
  setUserXP,
  userDiamonds,
  setUserDiamonds,
  userGender,
  selectedApps,
  setSelectedApps,
  inventory,
  setInventory,
  loginStreak,
  completedCount,
  activityLog,
  userEmail,
  isAnonymous,
  supabaseUserId,
  lang = 'es',
  setLang,
  isLight,
  toggleMode,
  toggleDeviceMode,
  onOpenLanding,
  onSignOut,
  onLinkAccount,
  onOpenPrivacy,
  onOpenTerms,
  
  // Navigation
  activeTab = 'home',
  setActiveTab,
  
  // Features
  activeChallenge,
  onSelectChallenge,
  onOpenActiveChallenge,
  onOpenAllChallenges,
  onCompleteChallenge,
  calendarTasks,
  setCalendarTasks,
  blockedAppsConfig,
  setBlockedAppsConfig,
  
  // Modals
  onOpenAICalendar,
  onOpenAIHabit,
  onOpenCreateHabit,
  onOpenStats,
  onPlayMinigame,
  setCoachChatOpen,
  setSelectedCoach,
  
  // Community
  forumPosts,
  setForumPosts,
  onSelectChatPerson,
  activeChatsHistory,
  setActiveChatsHistory,
  
  // Data
  appsList = [],
  shopItemsList = [],
  appChallengesBank = [],
  backgroundsData = {},
  uiText = {},
  AvatarDisplay,
  GlobalThemeEffects,
  onOpenShopItem,
  onOpenInventoryItem
}) => {
  // Navigation sub-states (identical to mobile app)
  const [homeTab, setHomeTab] = useState('desafiate'); // 'desafiate' | 'organizate' | 'crece'
  const [organizeSubTab, setOrganizeSubTab] = useState('habitos'); // 'habitos' | 'calendario' | 'bloqueador'
  const [forumTab, setForumTab] = useState('comunidad'); // 'comunidad' | 'directos'
  const [forumFilter, setForumFilter] = useState('todos');
  const [shopFilter, setShopFilter] = useState('all');
  const [inventoryTab, setInventoryTab] = useState('avatar');
  const [profileSubView, setProfileSubView] = useState('inventario'); // 'inventario' | 'insignias'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedMasteryCourse, setSelectedMasteryCourse] = useState(null);
  const [completedMasteryClasses, setCompletedMasteryClasses] = useState(() => {
    try {
      const saved = localStorage.getItem('focusly_completed_mastery_classes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedLeagueFilter, setSelectedLeagueFilter] = useState('all'); // 'all' | 'bronce' | 'plata' | 'oro' | 'diamante' | 'mitico'
  const [creceTab, setCreceTab] = useState('maestrias'); // 'maestrias' | 'coaches' | 'videos'
  const [focusRewardToast, setFocusRewardToast] = useState(null);
  const [emergencyTimers, setEmergencyTimers] = useState({});

  const handleCompleteMasteryClass = (cls, mastery) => {
    if (!cls || completedMasteryClasses.includes(cls.id)) return;
    const next = [...completedMasteryClasses, cls.id];
    setCompletedMasteryClasses(next);
    try {
      localStorage.setItem('focusly_completed_mastery_classes', JSON.stringify(next));
    } catch {}

    const xpEarned = mastery?.xpPerClass || 50;
    const diaEarned = mastery?.diamondsPerClass || 15;
    setUserXP?.(prev => prev + xpEarned);
    setUserDiamonds?.(prev => prev + diaEarned);

    // Check if entire mastery course is completed
    const allMasteryDone = mastery.classes.every(c => next.includes(c.id));
    if (allMasteryDone && mastery.badgeReward) {
      setUserXP?.(prev => prev + mastery.badgeReward.xpReward);
      setUserDiamonds?.(prev => prev + mastery.badgeReward.diamondReward);
      setInventory?.(prev => ({
        ...prev,
        unlockedBadges: Array.from(new Set([...(prev.unlockedBadges || []), mastery.badgeReward.id]))
      }));
    }

    setFocusRewardToast({
      title: '¡Clase Completada!',
      desc: `+${xpEarned} XP • +${diaEarned} Diamantes ganados`
    });
    setTimeout(() => setFocusRewardToast(null), 4000);
  };

  // New post modal state in forum
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('Estudio');

  const t = uiText?.[lang] || uiText?.['es'] || {
    home: 'Inicio',
    forum: 'Comunidad',
    rankings: 'Rankings',
    shop: 'Tienda',
    profile: 'Perfil',
    challenge: 'Desafíate',
    organize: 'Organízate',
    grow: 'Crece',
    aiRec: 'Recomendaciones IA'
  };

  const recommendations = [
    { id: 'rec_1', title: 'Bloque de Enfoque Profundo (45 min)', desc: 'Desactiva notificaciones de redes seleccionadas para entrar en flujo.', icon: '🧠', color: 'from-blue-900/40 to-black', border: 'border-blue-500/30' },
    { id: 'rec_2', title: 'Pausa Activa sin Pantalla (10 min)', desc: 'Camina e hidrátate antes del siguiente bloque de estudio.', icon: '🌿', color: 'from-emerald-900/40 to-black', border: 'border-emerald-500/30' },
    { id: 'rec_3', title: 'Repaso con Técnica Feynman', desc: 'Explica lo aprendido en voz alta sin mirar tus notas para consolidar.', icon: '📚', color: 'from-purple-900/40 to-black', border: 'border-purple-500/30' }
  ];

  // User Level & XP
  const currentLevel = Math.max(1, Math.floor(userXP / 1000) + 1);
  const currentLevelXP = userXP % 1000;
  const levelProgress = Math.min(100, Math.round((currentLevelXP / 1000) * 100));

  // Emergency countdown timer
  useEffect(() => {
    const activeIds = Object.keys(emergencyTimers).filter(id => emergencyTimers[id] > 0);
    if (activeIds.length === 0) return;
    const interval = setInterval(() => {
      setEmergencyTimers(prev => {
        const copy = { ...prev };
        for (const id of activeIds) {
          if (copy[id] > 1) { copy[id] -= 1; } else { delete copy[id]; }
        }
        return copy;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [emergencyTimers]);

  // Focus Rewards claiming
  const claimFocusRewards = () => {
    let totalSavedTime = 0;
    const todayStr = new Date().toISOString().split('T')[0];
    const newConfig = { ...blockedAppsConfig };
    (selectedApps || []).forEach(appId => {
      const bd = newConfig[appId] || { limit: 15, usedToday: 0 };
      const limit = bd.limit || 15;
      const usedToday = bd.usedToday || 0;
      if (bd.lastClaimedDate !== todayStr && usedToday < limit) {
        totalSavedTime += (limit - usedToday);
        newConfig[appId] = { ...bd, lastClaimedDate: todayStr };
      }
    });
    if (totalSavedTime === 0) return;
    const xpReward = totalSavedTime * 5;
    const diamondReward = totalSavedTime * 1;
    setUserXP(prev => prev + xpReward);
    setUserDiamonds(prev => prev + diamondReward);
    setBlockedAppsConfig(newConfig);
    setFocusRewardToast({ xp: xpReward, diamonds: diamondReward, minutes: totalSavedTime });
    setTimeout(() => setFocusRewardToast(null), 4000);
  };

  // Filtered Challenges
  const appFeatured = (appChallengesBank || [])
    .filter(challenge => (selectedApps || []).includes(challenge.appId) && (!challenge.gender || challenge.gender === 'any' || challenge.gender === userGender))
    .slice(0, 6)
    .map(challenge => {
      const appRef = (appsList || []).find(a => a.id === challenge.appId) || { name: 'App', icon: '', color: '#3b82f6' };
      return { ...challenge, type: 'app', icon: appRef.icon, color: appRef.color, currentDay: 0 };
    });

  const featuredChallenges = [
    { id: 'cult_1', type: 'culture', title: 'OPERACIÓN WWII', subtitle: 'Historia vs Scrolling', xp: 600, diamonds: 200, icon: BookOpen, color: 'from-blue-600 to-indigo-900', duration: 21, currentDay: 0, desc: 'Aprende historia mientras reduces el uso de redes sociales.' },
    ...appFeatured
  ];

  // Equipped Theme
  const currentBgTheme = backgroundsData[inventory?.equippedBg] || backgroundsData['bg_default'] || { css: 'bg-[#000]' };

  // Main 5 Navigation Items (Identical to Mobile)
  const navItems = [
    { id: 'home', icon: Home, label: t.home || 'Inicio' },
    { id: 'forum', icon: Megaphone, label: t.forum || 'Comunidad' },
    { id: 'rankings', icon: Trophy, label: t.rankings || 'Rankings' },
    { id: 'shop', icon: ShoppingBag, label: t.shop || 'Tienda' },
    { id: 'profile', icon: User, label: t.profile || 'Perfil' }
  ];

  const equippedAvatarItem = (shopItemsList || []).find(i => i.id === inventory?.equippedAvatar);

  return (
    <div className={`w-full min-h-screen flex flex-col relative overflow-hidden ${isLight ? 'bg-[#fafafa] text-zinc-900' : `${currentBgTheme.css} text-white`} selection:bg-white selection:text-black font-sans`}>
      {/* Background Animated Themes */}
      {GlobalThemeEffects && !isLight && inventory?.equippedBg && (
        <GlobalThemeEffects themeId={inventory.equippedBg} />
      )}

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

      {/* TOP BAR / DESKTOP HEADER */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-2xl transition-all duration-300 ${isLight ? 'bg-white/85 border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : 'bg-black/90 border-white/10 shadow-2xl'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          
          {/* Focusly Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer group select-none" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img src="/focusly-logo-icon.png" alt="Focusly" className="w-full h-full object-contain" />
            </div>
            <span className={`text-2xl font-black tracking-tight uppercase leading-none ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              FOCUSLY
            </span>
          </div>

          {/* MAIN 5 NAV TABS */}
          <nav className={`flex items-center gap-1.5 p-1.5 rounded-2xl border backdrop-blur-md shadow-inner ${isLight ? 'bg-zinc-100/90 border-zinc-200/80' : 'bg-white/[0.04] border-white/10'}`}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    isActive 
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/50 hover:text-white hover:bg-white/10')
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* USER STATS & CONTROLS */}
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${isLight ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' : 'bg-white/5 border-white/10 text-white'}`} title="Racha de Días">
              <Flame size={16} className="text-orange-500 fill-orange-500" />
              <span className="text-xs font-black">{loginStreak || 1}d</span>
            </div>

            {/* Diamonds */}
            <div className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all ${isLight ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' : 'bg-white/5 border-white/10 text-white'}`} title="Diamantes">
              <Gem size={16} className="text-cyan-500 fill-cyan-500" />
              <span className="text-xs font-black">{userDiamonds || 0}</span>
            </div>

            {/* Level & XP */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${isLight ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' : 'bg-white/5 border-white/10 text-white'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${isLight ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
                {currentLevel}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-wider">NIVEL {currentLevel}</span>
                <div className={`w-20 h-1.5 rounded-full overflow-hidden mt-0.5 ${isLight ? 'bg-zinc-200' : 'bg-white/20'}`}>
                  <div className={`h-full rounded-full transition-all ${isLight ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-white'}`} style={{ width: `${levelProgress}%` }} />
                </div>
              </div>
            </div>

            {/* Switch to Mobile Mode */}
            {toggleDeviceMode && (
              <button
                onClick={toggleDeviceMode}
                className={`p-2.5 rounded-xl border transition-all hover:scale-105 flex items-center gap-1.5 ${
                  isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                }`}
                title="Cambiar a vista móvil"
              >
                <Smartphone size={16} />
                <span className="hidden xl:inline text-[10px] font-bold uppercase tracking-wider">Móvil</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleMode}
              className={`p-2.5 rounded-xl border transition-all hover:scale-105 ${isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'}`}
              title={isLight ? 'Modo Oscuro' : 'Modo Claro'}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* REWARD ALERT TOAST */}
      <AnimatePresence>
        {focusRewardToast && (
          <motion.div
            key="desktop-focus-reward-toast"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] border px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 ${
              isLight ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-900/10' : 'bg-white text-black border-white'
            }`}
          >
            <div className="w-10 h-10 bg-amber-400 text-zinc-950 rounded-full flex items-center justify-center font-black">🏆</div>
            <div>
              <h4 className="text-xs font-black uppercase tracking-tight">¡Recompensa Reclamada!</h4>
              <p className={`text-[11px] font-semibold ${isLight ? 'text-zinc-600' : 'text-black/70'}`}>+{focusRewardToast.xp} XP y +{focusRewardToast.diamonds} 💎 por {focusRewardToast.minutes}m ahorrados</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BODY CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 pb-28 relative z-10">
        
        {/* ======================================================== */}
        {/* 1. INICIO (HOME) VIEW */}
        {/* ======================================================== */}
        {activeTab === 'home' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* SUB-MENU TABS (DESAFÍATE / ORGANÍZATE / CRECE) */}
            <div className="flex justify-center">
              <div className={`inline-flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-md shadow-sm ${isLight ? 'bg-zinc-100 border-zinc-200/80' : 'bg-black/80 border-white/10'}`}>
                <button
                  onClick={() => setHomeTab('desafiate')}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                    homeTab === 'desafiate'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  {t.challenge || 'Desafíate'}
                </button>
                <button
                  onClick={() => setHomeTab('organizate')}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                    homeTab === 'organizate'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  {t.organize || 'Organízate'}
                </button>
                <button
                  onClick={() => setHomeTab('crece')}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                    homeTab === 'crece'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  {t.grow || 'Crece (Mentores)'}
                </button>
              </div>
            </div>

            {/* ----------------- SUBTAB: DESAFÍATE ----------------- */}
            {homeTab === 'desafiate' && (
              <div className="space-y-8">
                
                {/* TOP GRID: ACTIVE CHALLENGE + AI RECOMMENDATIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Active Challenge Card */}
                  <div className="lg:col-span-2">
                    {activeChallenge ? (
                      <div className={`p-8 rounded-[32px] border relative overflow-hidden backdrop-blur-md transition-all ${isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 shadow-2xl text-white'}`}>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white/10 text-white border-white/20'}`}>DESAFÍO ACTIVO</span>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mt-3">{activeChallenge.title}</h3>
                            <p className={`text-xs font-medium mt-1 ${isLight ? 'text-zinc-500' : 'text-white/60'}`}>{activeChallenge.subtitle}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-4xl font-black tracking-tight">{Math.max(1, Math.round((activeChallenge.currentDay / activeChallenge.duration) * 100))}%</span>
                            <span className={`text-[10px] font-black uppercase tracking-wider block ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Completado</span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-6xl font-black tracking-tighter">{activeChallenge.currentDay}</span>
                          <span className={`text-xl font-bold ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>/ {activeChallenge.duration} DÍAS</span>
                        </div>

                        {/* Progress Bar */}
                        <div className={`h-4 rounded-full overflow-hidden border mb-6 ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/60 border-white/10'}`}>
                          <div className={`h-full rounded-full transition-all duration-1000 ${isLight ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' : 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]'}`} style={{ width: `${Math.max(3, (activeChallenge.currentDay / activeChallenge.duration) * 100)}%` }} />
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={onOpenActiveChallenge}
                            className={`flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 ${
                              isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                            }`}
                          >
                            <Play size={16} fill="currentColor" />
                            <span>Continuar Desafío Diario</span>
                          </button>
                          <button
                            onClick={onCompleteChallenge}
                            className={`px-6 py-4 rounded-2xl border font-black uppercase text-xs tracking-widest transition-all ${
                              isLight ? 'border-zinc-200 hover:bg-zinc-50 text-zinc-800' : 'border-white/20 hover:bg-white/10 text-white'
                            }`}
                          >
                            Reclamar Fin
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`p-10 rounded-[32px] border flex flex-col items-center justify-center text-center h-full min-h-[280px] backdrop-blur-md transition-all ${isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 shadow-xl text-white'}`}>
                        <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 ${isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'}`}>
                          <Clock size={28} className={isLight ? 'text-zinc-400' : 'text-white/40'} />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">Sin Desafío Activo</h3>
                        <p className={`text-xs max-w-md mt-1 mb-6 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Selecciona un desafío de desintoxicación para empezar a forjar tu voluntad hoy mismo.</p>
                        <button
                          onClick={onOpenAllChallenges}
                          className={`px-8 py-3.5 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-sm ${
                            isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                          }`}
                        >
                          Explorar Desafíos
                        </button>
                      </div>
                    )}
                  </div>

                  {/* AI Recommendations Panel */}
                  <div className={`p-6 rounded-[32px] border backdrop-blur-md flex flex-col justify-between transition-all ${isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 shadow-xl text-white'}`}>
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles size={16} className={isLight ? 'text-indigo-600' : 'text-white'} />
                        <h4 className={`text-xs font-black uppercase tracking-widest ${isLight ? 'text-zinc-500' : 'text-white/60'}`}>{t.aiRec || 'Recomendaciones IA'}</h4>
                      </div>
                      <div className="space-y-3">
                        {recommendations.map((rec, rIdx) => (
                          <div key={`rec-${rec.id || rIdx}-${rIdx}`} className={`p-4 rounded-2xl border flex items-start gap-3 transition-colors ${isLight ? 'border-zinc-200/80 bg-zinc-50/70' : 'border-white/10 bg-white/5'}`}>
                            <span className="text-2xl">{rec.icon}</span>
                            <div>
                              <h5 className={`text-xs font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>{rec.title}</h5>
                              <p className={`text-[11px] leading-relaxed mt-0.5 ${isLight ? 'text-zinc-600' : 'text-white/60'}`}>{rec.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={onOpenAICalendar}
                      className={`mt-4 w-full py-3 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                        isLight ? 'border-zinc-200 text-zinc-800 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      <Sparkles size={14} className={isLight ? 'text-indigo-600' : ''} />
                      <span>Optimizar con IA</span>
                    </button>
                  </div>
                </div>

                {/* FEATURED CHALLENGES GRID */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>Desafíos Recomendados</h3>
                      <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Metodologías comprobadas de desintoxicación digital</p>
                    </div>
                    <button
                      onClick={onOpenAllChallenges}
                      className={`px-5 py-2.5 rounded-full border font-black text-xs uppercase tracking-widest transition-all ${
                        isLight ? 'border-zinc-200 text-zinc-800 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      Ver Todos
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredChallenges.map((challenge, cIdx) => (
                      <div
                        key={`desktop-ch-${challenge.id}-${cIdx}`}
                        onClick={() => onSelectChallenge?.(challenge)}
                        className={`p-6 rounded-[28px] border cursor-pointer group transition-all duration-300 hover:scale-[1.02] ${
                          isLight ? 'bg-white hover:border-zinc-300 border-zinc-200 shadow-sm hover:shadow-md text-zinc-900' : 'bg-[#0c0c0c] hover:border-white/30 border-white/10 shadow-xl text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center p-2 ${isLight ? 'bg-zinc-50 border-zinc-200/80' : 'bg-white/10 border-white/20'}`}>
                            {challenge.type === 'app' ? (
                              <AppIcon id={challenge.appId} fallbackSrc={challenge.icon} className="w-8 h-8 object-contain" alt="app" />
                            ) : (
                              <BookOpen size={20} className={isLight ? 'text-zinc-800' : 'text-white'} />
                            )}
                          </div>
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${isLight ? 'bg-cyan-50 text-cyan-800 border border-cyan-200' : 'bg-white/10 text-white'}`}>
                            <Gem size={12} className={isLight ? 'text-cyan-600' : 'text-cyan-400'} />
                            <span>+{challenge.diamonds}</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-black uppercase tracking-tight">{challenge.title}</h4>
                        <p className={`text-xs uppercase font-bold tracking-wider mt-1 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>{challenge.duration} DÍAS • {challenge.subtitle}</p>
                        <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-black uppercase tracking-widest transition-colors ${
                          isLight ? 'border-zinc-100 text-zinc-700 group-hover:text-zinc-900' : 'border-white/10 text-white/70 group-hover:text-white'
                        }`}>
                          <span>Comenzar</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CENTRO DE PRUEBAS / MINIJUEGOS */}
                <div className={`pt-4 border-t ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>Centro de Pruebas de Dopamina</h3>
                    <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Minijuegos de entrenamiento cognitivo para reemplazar el scroll pasivo</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {DEFAULT_MINIGAMES.map(game => {
                      const GameIcon = game.icon;
                      return (
                        <div
                          key={game.id}
                          onClick={() => onPlayMinigame?.(game)}
                          className={`p-6 rounded-[28px] border cursor-pointer group transition-all duration-300 hover:scale-[1.03] ${
                            isLight ? 'bg-white hover:border-zinc-300 border-zinc-200 shadow-sm hover:shadow-md text-zinc-900' : 'bg-[#0c0c0c] hover:border-white/30 border-white/10 shadow-xl text-white'
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 transition-colors ${
                            isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white' : 'bg-white/10 border-white/20 group-hover:bg-white group-hover:text-black'
                          }`}>
                            <GameIcon size={26} />
                          </div>
                          <h4 className="text-base font-black uppercase tracking-tight">{game.title}</h4>
                          <p className={`text-[11px] font-medium line-clamp-2 mt-1 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>{game.desc}</p>
                          <div className={`mt-6 flex items-center justify-between pt-4 border-t ${isLight ? 'border-zinc-100' : 'border-white/10'}`}>
                            <div className="flex gap-2">
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${isLight ? 'bg-zinc-50 text-zinc-700 border-zinc-200' : 'bg-white/10 text-white'}`}>+{game.rewardXP} XP</span>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1 border ${isLight ? 'bg-cyan-50 text-cyan-800 border-cyan-200' : 'bg-white/10 text-white'}`}><Gem size={8} className={isLight ? 'text-cyan-600' : ''} /> +{game.rewardDia}</span>
                            </div>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${isLight ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
                              <Play size={12} fill="currentColor" />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* ----------------- SUBTAB: ORGANÍZATE ----------------- */}
            {homeTab === 'organizate' && (
              <div className="space-y-6">
                
                {/* SUB-SELECTOR: HÁBITOS / CALENDARIO / BLOQUEADOR */}
                <div className={`flex gap-2 border-b pb-4 ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
                  <button
                    onClick={() => setOrganizeSubTab('habitos')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      organizeSubTab === 'habitos'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    Hábitos Diarios
                  </button>
                  <button
                    onClick={() => setOrganizeSubTab('calendario')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      organizeSubTab === 'calendario'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    Calendario Interactivo
                  </button>
                  <button
                    onClick={() => setOrganizeSubTab('bloqueador')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      organizeSubTab === 'bloqueador'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    Límites y Bloqueador
                  </button>
                </div>

                {/* --- ORGANÍZATE: HÁBITOS --- */}
                {organizeSubTab === 'habitos' && (
                  <div className="space-y-6">
                    
                    {/* Header + Action Buttons */}
                    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border p-6 rounded-[28px] ${
                      isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
                    }`}>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">Gestor de Hábitos</h3>
                        <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Construye consistencia día a día</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={onOpenAIHabit}
                          className={`px-5 py-3 rounded-xl border font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all ${
                            isLight ? 'border-zinc-200 text-zinc-800 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                          }`}
                        >
                          <Sparkles size={14} className={isLight ? 'text-indigo-600' : ''} />
                          <span>Asistente IA</span>
                        </button>
                        <button
                          onClick={onOpenCreateHabit}
                          className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm ${
                            isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                          }`}
                        >
                          <Plus size={16} />
                          <span>Crear Hábito</span>
                        </button>
                      </div>
                    </div>

                    {/* Habits List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {calendarTasks.filter(t => t.isHabit).length === 0 ? (
                        <div className={`col-span-2 p-12 text-center border rounded-[28px] ${
                          isLight ? 'bg-white border-zinc-200 text-zinc-900 shadow-sm' : 'bg-[#0c0c0c] border-white/10 text-white'
                        }`}>
                          <Target size={40} className={`mx-auto mb-3 ${isLight ? 'text-zinc-300' : 'text-white/20'}`} />
                          <h4 className="text-base font-black uppercase">No tienes hábitos creados</h4>
                          <p className={`text-xs mt-1 mb-6 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Genera un plan con IA o añade tus primeros hábitos diarios.</p>
                          <button
                            onClick={onOpenCreateHabit}
                            className={`px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-sm ${
                              isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                            }`}
                          >
                            Crear Primer Hábito
                          </button>
                        </div>
                      ) : (
                        calendarTasks.filter(t => t.isHabit).map(habit => {
                          const todayStr = new Date().toISOString().split('T')[0];
                          const isCompletedToday = habit.completedDates?.includes(todayStr);

                          const handleToggle = () => {
                            let updatedDates = [...(habit.completedDates || [])];
                            let newStreak = habit.streak || 0;
                            if (isCompletedToday) {
                              updatedDates = updatedDates.filter(d => d !== todayStr);
                              newStreak = Math.max(0, newStreak - 1);
                            } else {
                              updatedDates.push(todayStr);
                              newStreak += 1;
                              setUserXP(p => p + (habit.xpReward || 25));
                              setUserDiamonds(p => p + 2);
                            }
                            setCalendarTasks(prev => prev.map(t => t.id === habit.id ? { ...t, completedDates: updatedDates, streak: newStreak } : t));
                          };

                          const handleDelete = () => {
                            setCalendarTasks(prev => prev.filter(t => t.id !== habit.id));
                          };

                          return (
                            <div
                              key={habit.id}
                              className={`p-5 rounded-[24px] border flex items-center justify-between gap-4 transition-all ${
                                isLight ? 'bg-white border-zinc-200 shadow-sm hover:border-zinc-300 text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
                              }`}
                            >
                              <div className="flex items-center gap-4 min-w-0">
                                <button
                                  onClick={handleToggle}
                                  className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                    isCompletedToday 
                                      ? (isLight ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm' : 'bg-white text-black border-white shadow-lg')
                                      : (isLight ? 'border-zinc-300 text-zinc-300 hover:border-zinc-500 hover:text-zinc-600 bg-zinc-50' : 'border-white/20 text-white/30 hover:border-white/50 hover:text-white')
                                  }`}
                                >
                                  <Check size={20} strokeWidth={3} />
                                </button>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                                      isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                                    }`}>{habit.category || 'General'}</span>
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>🔥 {habit.streak || 0} DÍAS</span>
                                  </div>
                                  <h4 className={`text-base font-black uppercase tracking-tight truncate ${
                                    isCompletedToday ? (isLight ? 'line-through text-zinc-400' : 'line-through text-white/40') : (isLight ? 'text-zinc-900' : 'text-white')
                                  }`}>{habit.title}</h4>
                                  {habit.desc && <p className={`text-[11px] truncate ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>{habit.desc}</p>}
                                </div>
                              </div>
                              <button
                                onClick={handleDelete}
                                className={`p-2 rounded-full transition-colors ${isLight ? 'hover:bg-red-50 text-zinc-400 hover:text-red-600' : 'hover:bg-red-500/20 text-white/30 hover:text-red-400'}`}
                                title="Eliminar Hábito"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {/* --- ORGANÍZATE: CALENDARIO --- */}
                {organizeSubTab === 'calendario' && (
                  <div className="space-y-6">
                    <div className={`flex justify-between items-center border p-6 rounded-[28px] ${
                      isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
                    }`}>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">Planificador Semanal</h3>
                        <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Organiza tus sesiones de estudio y descansos activos</p>
                      </div>
                      <button
                        onClick={onOpenAICalendar}
                        className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm transition-all ${
                          isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                        }`}
                      >
                        <Sparkles size={16} />
                        <span>Organizar con IA</span>
                      </button>
                    </div>

                    <div className={`border rounded-[32px] p-6 shadow-sm ${
                      isLight ? 'bg-white border-zinc-200' : 'bg-[#0c0c0c] border-white/10'
                    }`}>
                      <InteractiveCalendar
                        tasks={calendarTasks}
                        setTasks={setCalendarTasks}
                        isLight={isLight}
                        lang={lang}
                      />
                    </div>
                  </div>
                )}

                {/* --- ORGANÍZATE: BLOQUEADOR --- */}
                {organizeSubTab === 'bloqueador' && (
                  <div className="space-y-6">
                    <div className={`flex justify-between items-center border p-6 rounded-[28px] ${
                      isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
                    }`}>
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">Límites de Uso Diario</h3>
                        <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Control estricto de tiempo por aplicación</p>
                      </div>
                      <button
                        onClick={claimFocusRewards}
                        className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm transition-all ${
                          isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                        }`}
                      >
                        Reclamar Recompensas
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {(selectedApps || []).map(appId => {
                        const app = (appsList || []).find(a => a.id === appId) || { name: appId, icon: '' };
                        const config = blockedAppsConfig[appId] || { limit: 15, usedToday: 0 };
                        const isEmergency = emergencyTimers[appId] > 0;

                        return (
                          <div key={appId} className={`p-6 rounded-[28px] border space-y-4 ${
                            isLight ? 'border-zinc-200 bg-white shadow-sm text-zinc-900' : 'border-white/10 bg-[#0c0c0c] text-white'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl border p-2 flex items-center justify-center ${
                                  isLight ? 'bg-zinc-50 border-zinc-200/80' : 'bg-white/10 border-white/20'
                                }`}>
                                  <AppIcon id={app.id || appId} fallbackSrc={app.icon} className="w-8 h-8 object-contain" alt={app.name} />
                                </div>
                                <div>
                                  <h4 className="text-base font-black uppercase">{app.name}</h4>
                                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>{config.usedToday || 0} / {config.limit || 15} MIN</span>
                                </div>
                              </div>
                            </div>

                            {/* Progress bar */}
                            <div className={`h-2 rounded-full overflow-hidden border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'}`}>
                              <div className={`h-full rounded-full ${isLight ? 'bg-zinc-900' : 'bg-white'}`} style={{ width: `${Math.min(100, ((config.usedToday || 0) / (config.limit || 15)) * 100)}%` }} />
                            </div>

                            <div className="flex gap-2">
                              {isEmergency ? (
                                <div className={`flex-1 py-2.5 rounded-xl text-center text-xs font-black uppercase tracking-wider ${
                                  isLight ? 'bg-zinc-900 text-white' : 'bg-white text-black'
                                }`}>
                                  ⚡ {Math.floor(emergencyTimers[appId] / 60)}:{(emergencyTimers[appId] % 60).toString().padStart(2, '0')}
                                </div>
                              ) : (
                                <button
                                  onClick={() => setEmergencyTimers(p => ({ ...p, [appId]: 300 }))}
                                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all ${
                                    isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100' : 'border-white/20 text-white hover:bg-white/10'
                                  }`}
                                >
                                  ⚡ Urgencia 5m
                                </button>
                              )}
                              <button
                                onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { ...config, usedToday: 0 } }))}
                                className={`p-2.5 rounded-xl border transition-colors ${
                                  isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100' : 'border-white/20 text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                                title="Reiniciar uso"
                              >
                                <RefreshCw size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ----------------- SUBTAB: CRECE & MAESTRÍAS ----------------- */}
            {homeTab === 'crece' && (
              <div className="space-y-8">
                
                {/* HEADER / NAVIGATION BAR */}
                <div className={`p-6 rounded-[28px] border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setHomeTab?.('desafiate')}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
                        isLight 
                          ? 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100' 
                          : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <ArrowLeft size={16} />
                      <span>Volver</span>
                    </button>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">Academia de Crecimiento</h3>
                      <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Cursos de habilidades digitales, neurociencia del enfoque y coaches IA</p>
                    </div>
                  </div>

                  {/* Subtabs selector */}
                  <div className={`flex gap-1.5 p-1.5 rounded-2xl border ${
                    isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'
                  }`}>
                    <button
                      onClick={() => setCreceTab('maestrias')}
                      className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                        creceTab === 'maestrias'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                      }`}
                    >
                      <BookOpen size={14} />
                      <span>Maestrías & Cursos</span>
                    </button>
                    <button
                      onClick={() => setCreceTab('coaches')}
                      className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                        creceTab === 'coaches'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                      }`}
                    >
                      <Brain size={14} />
                      <span>Coaches IA</span>
                    </button>
                    <button
                      onClick={() => setCreceTab('videos')}
                      className={`px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
                        creceTab === 'videos'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                      }`}
                    >
                      <Play size={14} />
                      <span>Videos & Sabiduría</span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: MAESTRÍAS Y CURSOS COMPLETOS */}
                {creceTab === 'maestrias' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          Maestrías de Productividad & Habilidades para Jóvenes
                        </h3>
                        <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                          Cursos completos estructurados con clases prácticas, atajos de teclado, IA y certificación con insignias
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-2xl border text-xs font-bold ${
                        isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-white'
                      }`}>
                        <span>Completadas: </span>
                        <strong className="text-emerald-500 font-black">
                          {completedMasteryClasses.length} clases
                        </strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {MASTERIES_DATA.map(mastery => {
                        const totalCls = mastery.classes.length;
                        const doneCount = mastery.classes.filter(c => completedMasteryClasses.includes(c.id)).length;
                        const pct = Math.round((doneCount / totalCls) * 100);
                        const isFinished = doneCount === totalCls;

                        return (
                          <div
                            key={mastery.id}
                            onClick={() => setSelectedMasteryCourse(mastery)}
                            className={`p-7 rounded-[32px] border cursor-pointer group transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                              isLight 
                                ? 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-lg shadow-sm text-zinc-900' 
                                : 'border-white/10 bg-[#0c0c0c] hover:border-white/30 text-white shadow-xl'
                            }`}
                          >
                            {/* Decorative background glow */}
                            <div className={`absolute -right-16 -top-16 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20 bg-gradient-to-br ${mastery.color}`} />

                            <div>
                              <div className="flex items-start justify-between gap-4 mb-4">
                                <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-md ${
                                  isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-800' : 'bg-white/10 border-white/20 text-white'
                                }`}>
                                  {mastery.icon === 'Laptop' ? '💻' : mastery.icon === 'Brain' ? '🧠' : mastery.icon === 'BookOpen' ? '📖' : '💎'}
                                </div>
                                <div className="text-right">
                                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border inline-block ${
                                    isLight ? 'border-zinc-200 bg-zinc-100 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                                  }`}>
                                    {mastery.category}
                                  </span>
                                  <div className="flex items-center gap-1 justify-end mt-2">
                                    <span className="text-[10px] font-black text-amber-500 uppercase">+{mastery.xpPerClass} XP/clase</span>
                                  </div>
                                </div>
                              </div>

                              <h4 className="text-xl font-black uppercase tracking-tight group-hover:text-blue-500 transition-colors">
                                {mastery.title}
                              </h4>
                              <p className={`text-xs font-semibold mt-1 leading-snug ${isLight ? 'text-zinc-600' : 'text-white/70'}`}>
                                {mastery.subtitle}
                              </p>
                              <p className={`text-[11px] leading-relaxed mt-3 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                                {mastery.description}
                              </p>
                            </div>

                            {/* Progress bar and Action footer */}
                            <div className="mt-8 pt-5 border-t border-white/10 space-y-4">
                              <div>
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider mb-1.5">
                                  <span className={isLight ? 'text-zinc-500' : 'text-white/40'}>Progreso del Curso</span>
                                  <span className={isFinished ? 'text-emerald-500' : isLight ? 'text-zinc-700' : 'text-white'}>
                                    {doneCount}/{totalCls} Clases ({pct}%)
                                  </span>
                                </div>
                                <div className={`h-2 rounded-full overflow-hidden border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'}`}>
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${isFinished ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                                    style={{ width: `${pct}%` }} 
                                  />
                                </div>
                              </div>

                              {/* Badge reward teaser */}
                              {mastery.badgeReward && (
                                <div className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                                  isFinished
                                    ? (isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200')
                                    : (isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-white/70')
                                }`}>
                                  <div className="flex items-center gap-2 min-w-0">
                                    <Award size={16} className={isFinished ? 'text-emerald-500 shrink-0' : 'text-amber-500 shrink-0'} />
                                    <span className="truncate font-bold text-[11px]">Medalla: {mastery.badgeReward.title}</span>
                                  </div>
                                  <span className="text-[10px] font-black uppercase bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                                    +{mastery.badgeReward.xpReward} XP
                                  </span>
                                </div>
                              )}

                              <button className={`w-full py-3.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 ${
                                isFinished
                                  ? (isLight ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-500 text-black hover:bg-emerald-400')
                                  : (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90')
                              }`}>
                                <Play size={14} fill="currentColor" />
                                <span>{isFinished ? 'Repasar Clases del Curso' : 'Iniciar / Continuar Curso'}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 2: COACHES DE ENFOQUE */}
                {creceTab === 'coaches' && (
                  <div>
                    <div className="mb-6">
                      <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>Coaches de Enfoque con IA</h3>
                      <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Elige un mentor personalizado según tu patrón de distracción</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {COACHES_DATA.map(coach => (
                        <div
                          key={coach.id}
                          onClick={() => {
                            setSelectedCoach?.(coach);
                            setCoachChatOpen?.(true);
                          }}
                          className={`p-6 rounded-[28px] border cursor-pointer group transition-all duration-300 flex flex-col justify-between ${
                            isLight ? 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md shadow-sm text-zinc-900' : 'border-white/10 bg-[#0c0c0c] hover:border-white/40 text-white'
                          }`}
                        >
                          <div>
                            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform ${
                              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/10 border-white/20'
                            }`}>
                              {coach.icon}
                            </div>
                            <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>COACH IA</span>
                            <h4 className="text-xl font-black uppercase tracking-tight">{coach.name}</h4>
                            <p className={`text-xs font-semibold mt-1 ${isLight ? 'text-zinc-700' : 'text-white/70'}`}>{coach.type}</p>
                            <p className={`text-[11px] leading-relaxed mt-2 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>{coach.desc}</p>
                          </div>
                          <button className={`mt-6 w-full py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-sm ${
                            isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                          }`}>
                            Hablar con {coach.name}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: VIDEOS Y SABIDURÍA */}
                {creceTab === 'videos' && (
                  <div>
                    <div className="mb-6">
                      <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>Píldoras de Sabiduría & Videos</h3>
                      <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Consejos directos sobre neurociencia, dopamina y técnicas de estudio</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {DEFAULT_VIDEOS.map(video => (
                        <div
                          key={video.id}
                          onClick={() => setSelectedVideo(video)}
                          className={`rounded-[28px] border overflow-hidden cursor-pointer group transition-all duration-300 ${
                            isLight ? 'border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-md shadow-sm text-zinc-900' : 'border-white/10 bg-[#0c0c0c] hover:border-white/30 text-white'
                          }`}
                        >
                          <div className="aspect-video relative overflow-hidden bg-black">
                            <img src={video.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" alt={video.title} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                                <Play size={18} fill="currentColor" />
                              </div>
                            </div>
                            <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-[10px] font-bold text-white tracking-wider">{video.duration}</span>
                          </div>
                          <div className="p-6">
                            <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border inline-block mb-2 ${
                              isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                            }`}>{video.category}</span>
                            <h4 className="text-base font-black uppercase tracking-tight line-clamp-2">{video.title}</h4>
                            <p className={`text-xs mt-1 line-clamp-2 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>{video.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 2. COMUNIDAD (FORUM) VIEW */}
        {/* ======================================================== */}
        {activeTab === 'forum' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Header + Subtabs + New Post */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border p-6 rounded-[28px] ${
              isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`flex gap-2 p-1 rounded-2xl border ${
                  isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'
                }`}>
                  <button
                    onClick={() => setForumTab('comunidad')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      forumTab === 'comunidad'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    Comunidad
                  </button>
                  <button
                    onClick={() => setForumTab('directos')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                      forumTab === 'directos'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    Directos (Chats)
                  </button>
                </div>
              </div>

              {forumTab === 'comunidad' && (
                <button
                  onClick={() => setShowCreatePost(true)}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 ${
                    isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  <Plus size={16} />
                  <span>Publicar</span>
                </button>
              )}
            </div>

            {/* --- COMUNIDAD FEED --- */}
            {forumTab === 'comunidad' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Categories sidebar */}
                <div className={`p-6 rounded-[28px] border h-max space-y-2 ${
                  isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
                }`}>
                  <h4 className={`text-xs font-black uppercase tracking-widest mb-4 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Categorías</h4>
                  {['todos', 'Estudio', 'Hábitos', 'Desahogo', 'Logros'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setForumFilter(cat)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        forumFilter === cat
                          ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black shadow-md')
                          : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/50 hover:text-white hover:bg-white/5')
                      }`}
                    >
                      {cat === 'todos' ? 'Todas las publicaciones' : cat}
                    </button>
                  ))}
                </div>

                {/* Posts Feed */}
                <div className="lg:col-span-3 space-y-4">
                  {(forumPosts || [])
                    .filter(p => forumFilter === 'todos' || p.tag === forumFilter)
                    .map(post => (
                      <div key={post.id} className={`p-6 rounded-[28px] border space-y-4 ${
                        isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-black text-sm ${
                              isLight ? 'border-zinc-200 bg-zinc-100 text-zinc-900' : 'border-white/20 bg-white/10 text-white'
                            }`}>
                              {post.user ? post.user[0].toUpperCase() : 'U'}
                            </div>
                            <div>
                              <h4 className="text-sm font-black uppercase tracking-tight">{post.user}</h4>
                              <span className={`text-[10px] ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>{post.time || 'Reciente'}</span>
                            </div>
                          </div>
                          <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border ${
                            isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                          }`}>{post.tag}</span>
                        </div>

                        <p className={`text-sm font-medium leading-relaxed ${isLight ? 'text-zinc-800' : 'text-white/80'}`}>{post.content}</p>

                        <div className={`flex items-center gap-6 pt-4 border-t text-xs font-bold ${
                          isLight ? 'border-zinc-100 text-zinc-600' : 'border-white/10 text-white/60'
                        }`}>
                          <button
                            onClick={() => {
                              setForumPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes: (p.likes || 0) + (p.liked ? -1 : 1), liked: !p.liked } : p));
                            }}
                            className={`flex items-center gap-2 transition-colors ${post.liked ? 'text-red-500' : isLight ? 'hover:text-zinc-900' : 'hover:text-white'}`}
                          >
                            <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
                            <span>{post.likes || 0}</span>
                          </button>
                          <div className="flex items-center gap-2">
                            <MessageSquare size={16} />
                            <span>{post.comments ? post.comments.length : 0} comentarios</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* --- DIRECTOS / CHATS --- */}
            {forumTab === 'directos' && (
              <div className={`p-8 rounded-[28px] border space-y-6 ${
                isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
              }`}>
                <div className="mb-4">
                  <h4 className="text-xl font-black uppercase tracking-tight">Compañeros de Enfoque</h4>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Chatea de forma privada para mantener la rendición de cuentas</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Lucas (Top 1)', 'Martina (Nivel 6)', 'Alex (30d Racha)', 'Camila (Feynman)', 'Daniel (0 TikTok)'].map((person, idx) => (
                    <div
                      key={`peer-${idx}-${person}`}
                      onClick={() => onSelectChatPerson?.({ id: `p_${idx}`, name: person })}
                      className={`p-5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                        isLight
                          ? 'border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 shadow-sm'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                          isLight ? 'bg-zinc-900 text-white' : 'bg-white text-black'
                        }`}>
                          {person[0]}
                        </div>
                        <div>
                          <h5 className="text-xs font-black uppercase">{person}</h5>
                          <span className="text-[10px] text-emerald-500 font-bold">● En línea</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className={isLight ? 'text-zinc-400' : 'text-white/40'} />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 3. RANKINGS & LEAGUES (LIGAS) VIEW */}
        {/* ======================================================== */}
        {activeTab === 'rankings' && (() => {
          const userLeagueKey = userXP >= 14000 ? 'mitico' : userXP >= 9000 ? 'diamante' : userXP >= 5000 ? 'oro' : userXP >= 2000 ? 'plata' : 'bronce';
          
          // Ranking database with assigned leagues
          const ALL_RANKING_USERS = [
            { rank: 1, name: 'Valeria R.', xp: 14200, level: 10, streak: 34, tier: 'mitico', avatar: 'a_crown', subtitle: 'Campeona de la Temporada' },
            { rank: 2, name: 'Ignacio M.', xp: 9850, level: 9, streak: 26, tier: 'diamante', avatar: 'a_prism', subtitle: 'Maestro de la Disciplina' },
            { rank: 3, name: 'Matías G.', xp: 7980, level: 8, streak: 21, tier: 'diamante', avatar: 'a_flame', subtitle: 'Especialista en Feynman' },
            { rank: 4, name: 'Sofía D.', xp: 5800, level: 6, streak: 18, tier: 'oro', avatar: 'a_cyber', subtitle: 'Focus Runner' },
            { rank: 5, name: username || 'Tú (Usuario Actual)', xp: userXP, level: currentLevel, streak: loginStreak || 1, tier: userLeagueKey, isMe: true, avatar: inventory?.equippedAvatar || 'a_base', subtitle: 'Tu posición actual' },
            { rank: 6, name: 'Lucas T.', xp: 4200, level: 5, streak: 12, tier: 'oro', avatar: 'a_zen', subtitle: 'Anti-Dopamina' },
            { rank: 7, name: 'Paula B.', xp: 3400, level: 4, streak: 9, tier: 'plata', avatar: 'a_shadow', subtitle: 'Lectora Constante' },
            { rank: 8, name: 'Martín K.', xp: 2800, level: 4, streak: 7, tier: 'plata', avatar: 'a_cyber', subtitle: 'Explorador Focus' },
            { rank: 9, name: 'Camila S.', xp: 1950, level: 3, streak: 5, tier: 'bronce', avatar: 'a_base', subtitle: 'Iniciando Hábito' },
            { rank: 10, name: 'Diego V.', xp: 1200, level: 2, streak: 3, tier: 'bronce', avatar: 'a_base', subtitle: 'Primeros Pasos' },
            { rank: 11, name: 'Valentina N.', xp: 850, level: 2, streak: 2, tier: 'bronce', avatar: 'a_base', subtitle: 'Enfoque Inicial' }
          ];

          // Sort by XP dynamically (with user included)
          const sortedRankings = [...ALL_RANKING_USERS].sort((a, b) => b.xp - a.xp).map((u, idx) => ({
            ...u,
            rank: idx + 1
          }));

          const filteredRankings = selectedLeagueFilter === 'all'
            ? sortedRankings
            : sortedRankings.filter(u => u.tier === selectedLeagueFilter);

          const LEAGUE_CATEGORIES = [
            { id: 'all', name: 'Todas las Ligas', icon: '🏆', minXP: 0 },
            { id: 'bronce', name: 'Liga Bronce', icon: '🥉', tierKey: 'bronce', minXP: '0 - 1,999 XP' },
            { id: 'plata', name: 'Liga Plata', icon: '🥈', tierKey: 'plata', minXP: '2,000 - 4,999 XP' },
            { id: 'oro', name: 'Liga Oro', icon: '🥇', tierKey: 'oro', minXP: '5,000 - 8,999 XP' },
            { id: 'diamante', name: 'Liga Diamante', icon: '💎', tierKey: 'diamante', minXP: '9,000 - 13,999 XP' },
            { id: 'mitico', name: 'Liga Mítica', icon: '👑', tierKey: 'mitico', minXP: '14,000+ XP' }
          ];

          const userCurrentTierObj = BADGE_TIERS[userLeagueKey] || BADGE_TIERS.bronce;

          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              {/* Header & User League Banner */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest shadow-sm bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-purple-500/10 border-yellow-500/30 text-yellow-500">
                  <Trophy size={14} />
                  <span>Temporada Competitiva de Enfoque</span>
                </div>
                <h3 className={`text-4xl font-black uppercase tracking-tighter ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  Ligas & Clasificación Global
                </h3>
                <p className={`text-xs uppercase tracking-wider ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                  Asciende de Bronce a Mítico sumando XP con tus sesiones de estudio y desintoxicación
                </p>
              </div>

              {/* USER STATS LEAGUE CARD */}
              <div className={`p-6 rounded-[32px] border max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg ${
                isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/15 text-white'
              }`}>
                <div className="flex items-center gap-5 z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border shadow-md relative ${
                    userLeagueKey === 'mitico' ? 'bg-purple-500/20 border-purple-500/50' :
                    userLeagueKey === 'diamante' ? 'bg-cyan-500/20 border-cyan-500/50' :
                    userLeagueKey === 'oro' ? 'bg-yellow-500/20 border-yellow-500/50' :
                    userLeagueKey === 'plata' ? 'bg-slate-300/20 border-slate-300/50' :
                    'bg-amber-700/20 border-amber-600/50'
                  }`}>
                    {userLeagueKey === 'mitico' ? '👑' :
                     userLeagueKey === 'diamante' ? '💎' :
                     userLeagueKey === 'oro' ? '🥇' :
                     userLeagueKey === 'plata' ? '🥈' : '🥉'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${userCurrentTierObj.badgeClass}`}>
                        LIGA {userCurrentTierObj.name.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-black uppercase text-emerald-500">● ACTIVA</span>
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight mt-1">{username || 'Tu Perfil'}</h4>
                    <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                      Tienes <strong className="text-amber-500 font-black">{userXP} XP</strong> acumulados • Racha de <strong>{loginStreak || 1} días</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 z-10">
                  <div className={`text-center px-5 py-3 rounded-2xl border ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className={`text-[9px] font-black uppercase tracking-widest block ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Nivel</span>
                    <span className="text-lg font-black">{currentLevel}</span>
                  </div>
                  <div className={`text-center px-5 py-3 rounded-2xl border ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className={`text-[9px] font-black uppercase tracking-widest block ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Posición</span>
                    <span className="text-lg font-black text-amber-500">
                      #{sortedRankings.find(u => u.isMe)?.rank || 5}
                    </span>
                  </div>
                </div>
              </div>

              {/* LEAGUE SELECTOR TABS (Bronce, Plata, Oro, Diamante, Mítico) */}
              <div className="flex justify-center flex-wrap gap-2 max-w-4xl mx-auto">
                {LEAGUE_CATEGORIES.map(cat => {
                  const isSelected = selectedLeagueFilter === cat.id;
                  const tierData = cat.tierKey ? BADGE_TIERS[cat.tierKey] : null;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedLeagueFilter(cat.id)}
                      className={`px-4 py-2.5 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm ${
                        isSelected
                          ? (isLight ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' : 'bg-white text-black border-white shadow-md')
                          : (isLight ? 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300' : 'bg-[#0c0c0c] border-white/10 text-white/60 hover:border-white/30')
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      {cat.minXP && typeof cat.minXP === 'string' && (
                        <span className={`text-[9px] font-medium opacity-60 hidden sm:inline`}>({cat.minXP})</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* PODIUM TOP 3 WITH TIER BADGES */}
              {selectedLeagueFilter === 'all' && (
                <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto items-end pt-4">
                  
                  {/* TOP 2 */}
                  <div className={`p-6 rounded-[28px] border flex flex-col items-center text-center space-y-3 relative ${
                    isLight ? 'border-zinc-200 bg-white shadow-sm text-zinc-900' : 'border-white/10 bg-[#0c0c0c] text-white'
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-slate-300 text-black flex items-center justify-center font-black text-sm shadow-sm">2</div>
                    <div className="w-20 h-20 relative flex items-center justify-center">
                      {AvatarDisplay ? (
                        <AvatarDisplay avatarId="a_prism" className="w-full h-full object-contain" />
                      ) : (
                        <span>⚡</span>
                      )}
                    </div>
                    <h4 className="text-sm font-black uppercase">Ignacio M.</h4>
                    <span className={`text-xs font-black ${isLight ? 'text-zinc-600' : 'text-white/60'}`}>9,850 XP</span>
                    <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      💎 DIAMANTE
                    </span>
                  </div>

                  {/* TOP 1 */}
                  <div className={`p-8 rounded-[32px] border flex flex-col items-center text-center space-y-3 -translate-y-4 shadow-xl relative ${
                    isLight ? 'border-yellow-500/50 bg-white text-zinc-900 ring-2 ring-yellow-500/20' : 'border-yellow-500/60 bg-[#141414] text-white ring-2 ring-yellow-500/30'
                  }`}>
                    <Crown size={32} className="text-amber-500 animate-bounce" />
                    <div className="w-24 h-24 relative flex items-center justify-center">
                      {AvatarDisplay ? (
                        <AvatarDisplay avatarId="a_crown" className="w-full h-full object-contain" />
                      ) : (
                        <span>👑</span>
                      )}
                    </div>
                    <h4 className="text-base font-black uppercase">Valeria R.</h4>
                    <span className={`text-sm font-black text-amber-500`}>14,200 XP</span>
                    <span className="text-[10px] font-black uppercase px-3 py-0.5 rounded-full border bg-purple-500/25 text-purple-300 border-purple-400/40">
                      👑 MÍTICA • TOP 1
                    </span>
                  </div>

                  {/* TOP 3 */}
                  <div className={`p-6 rounded-[28px] border flex flex-col items-center text-center space-y-3 relative ${
                    isLight ? 'border-zinc-200 bg-white shadow-sm text-zinc-900' : 'border-white/10 bg-[#0c0c0c] text-white'
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-sm shadow-sm">3</div>
                    <div className="w-20 h-20 relative flex items-center justify-center">
                      {AvatarDisplay ? (
                        <AvatarDisplay avatarId="a_flame" className="w-full h-full object-contain" />
                      ) : (
                        <span>🔥</span>
                      )}
                    </div>
                    <h4 className="text-sm font-black uppercase">Matías G.</h4>
                    <span className={`text-xs font-black ${isLight ? 'text-zinc-600' : 'text-white/60'}`}>7,980 XP</span>
                    <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                      🥇 ORO
                    </span>
                  </div>

                </div>
              )}

              {/* LEADERBOARD TABLE WITH LEAGUE TIERS */}
              <div className={`max-w-4xl mx-auto rounded-[28px] border overflow-hidden shadow-sm ${
                isLight ? 'border-zinc-200 bg-white text-zinc-900' : 'border-white/10 bg-[#0c0c0c] text-white'
              }`}>
                <div className={`p-4 border-b flex justify-between items-center text-[10px] font-black uppercase tracking-widest px-6 ${
                  isLight ? 'border-zinc-200 text-zinc-400 bg-zinc-50' : 'border-white/10 text-white/40'
                }`}>
                  <span>Rango, Usuario & Liga</span>
                  <span>Puntos de Enfoque (XP)</span>
                </div>
                <div className={`divide-y ${isLight ? 'divide-zinc-100' : 'divide-white/5'}`}>
                  {filteredRankings.map((row, rIdx) => {
                    const rowTier = BADGE_TIERS[row.tier] || BADGE_TIERS.bronce;

                    return (
                      <div
                        key={`rank-row-${row.rank}-${row.name}-${rIdx}`}
                        className={`p-4 px-6 flex items-center justify-between transition-colors ${
                          row.isMe
                            ? (isLight ? 'bg-zinc-900 text-white font-black' : 'bg-white text-black font-black')
                            : (isLight ? 'hover:bg-zinc-50' : 'hover:bg-white/5')
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`text-sm font-black w-7 ${
                            row.isMe ? (isLight ? 'text-white' : 'text-black') : (isLight ? 'text-zinc-400' : 'text-white/40')
                          }`}>
                            #{row.rank}
                          </span>
                          
                          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center overflow-hidden border p-0.5 relative shadow-sm ${
                            row.isMe
                              ? (isLight ? 'bg-white border-white/20' : 'bg-black border-white/20')
                              : (isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/10 border-white/20')
                          }`}>
                            {AvatarDisplay ? (
                              <AvatarDisplay avatarId={row.avatar || 'a_base'} className="w-full h-full object-contain" />
                            ) : (
                              <span className={`text-xs font-black ${row.isMe ? (isLight ? 'text-zinc-900' : 'text-white') : (isLight ? 'text-zinc-800' : 'text-white')}`}>
                                {row.name[0]}
                              </span>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className="text-xs font-black uppercase">{row.name}</h5>
                              
                              {/* League Badge Pill */}
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                                row.isMe 
                                  ? (isLight ? 'bg-white/20 text-white border-white/40' : 'bg-black/20 text-black border-black/40')
                                  : rowTier.badgeClass
                              }`}>
                                {rowTier.name}
                              </span>

                              {row.isMe && (
                                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                                  isLight ? 'bg-amber-400 text-black' : 'bg-amber-500 text-black'
                                }`}>
                                  TÚ
                                </span>
                              )}
                            </div>
                            <span className={`text-[9px] font-bold uppercase block mt-0.5 ${
                              row.isMe ? (isLight ? 'text-white/80' : 'text-black/70') : (isLight ? 'text-zinc-500' : 'text-white/40')
                            }`}>
                              🔥 {row.streak}D RACHA • NIVEL {row.level} • {row.subtitle || 'Estudiante'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-black">{row.xp} XP</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </motion.div>
          );
        })()}

        {/* ======================================================== */}
        {/* 4. TIENDA (SHOP) VIEW */}
        {/* ======================================================== */}
        {activeTab === 'shop' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Header + Diamond Balance */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border p-6 rounded-[28px] ${
              isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
            }`}>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight">Tienda de Enfoque</h3>
                <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>Canjea tus diamantes por avatares, fondos y títulos</p>
              </div>
              <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-sm shadow-sm ${
                isLight ? 'bg-zinc-900 text-white' : 'bg-white text-black'
              }`}>
                <Gem size={20} className="fill-cyan-400 text-cyan-400" />
                <span>{userDiamonds || 0} Diamantes Disponibles</span>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['all', 'avatar', 'background', 'title', 'effect'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setShopFilter(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
                    shopFilter === cat
                      ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black shadow-md')
                      : (isLight ? 'border border-zinc-200 text-zinc-600 hover:text-zinc-900 bg-white hover:bg-zinc-50' : 'border border-white/10 text-white/50 hover:text-white bg-[#0c0c0c]')
                  }`}
                >
                  {cat === 'all' ? 'Todos los Artículos' : cat === 'avatar' ? 'Avatares' : cat === 'background' ? 'Fondos' : cat === 'title' ? 'Títulos' : 'Efectos'}
                </button>
              ))}
            </div>

            {/* Shop Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(shopItemsList || [])
                .filter(item => shopFilter === 'all' || item.type === shopFilter || (shopFilter === 'avatar' && (item.type === 'avatar' || item.category === 'avatar')) || (shopFilter === 'background' && (item.type === 'background' || item.category === 'background')) || (shopFilter === 'title' && (item.type === 'title' || item.category === 'title')) || (shopFilter === 'effect' && (item.type === 'effect' || item.category === 'effect')))
                .map((item, itemIdx) => {
                  const isEquipped = inventory?.equippedAvatar === item.id || inventory?.equippedBg === item.id || inventory?.equippedTitle === item.id;
                  const isOwned = (inventory?.ownedItems || []).includes(item.id);
                  const canAfford = userDiamonds >= item.price;
                  const itemType = item.type || item.category;

                  return (
                    <div
                      key={`shop-item-${item.id || itemIdx}-${itemIdx}`}
                      onClick={() => onOpenShopItem?.(item)}
                      className={`p-6 rounded-[28px] border flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                        isLight ? 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm hover:shadow-md text-zinc-900' : 'bg-[#0c0c0c] border-white/10 hover:border-white/30 text-white'
                      }`}
                    >
                      <div>
                        <div className={`w-full aspect-square rounded-2xl border flex items-center justify-center text-4xl mb-4 relative overflow-hidden p-2 ${
                          isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                        }`}>
                          {itemType === 'avatar' && AvatarDisplay ? (
                            <AvatarDisplay avatarId={item.id} className="w-full h-full object-contain" />
                          ) : itemType === 'background' && backgroundsData?.[item.id]?.css ? (
                            <div className={`w-full h-full rounded-xl ${backgroundsData[item.id].css} flex items-center justify-center border border-white/20`}>
                              <Sparkles size={24} className="text-white/60" />
                            </div>
                          ) : item.icon ? (
                            <span className="text-5xl">{item.icon}</span>
                          ) : (
                            <Shield size={48} className={isLight ? 'text-zinc-300' : 'text-white/40'} />
                          )}
                          <span className={`absolute top-2 right-2 text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                            isLight ? 'bg-white text-zinc-700 border-zinc-200' : 'bg-white/10 text-white border-white/20'
                          }`}>{item.rarity || 'Común'}</span>
                        </div>
                        <h4 className="text-base font-black uppercase tracking-tight">{item.name}</h4>
                        <p className={`text-xs line-clamp-2 mt-1 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>{item.desc}</p>
                      </div>

                      <div className={`mt-6 pt-4 border-t ${isLight ? 'border-zinc-100' : 'border-white/10'}`} onClick={(e) => e.stopPropagation()}>
                        {isEquipped ? (
                          <div className={`w-full py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest border ${
                            isLight ? 'bg-zinc-50 text-zinc-700 border-zinc-200' : 'bg-white/10 text-white border-white/20'
                          }`}>
                            Equipado
                          </div>
                        ) : isOwned ? (
                          <button
                            onClick={() => {
                              if (itemType === 'avatar') setInventory(p => ({ ...p, equippedAvatar: item.id }));
                              if (itemType === 'background') setInventory(p => ({ ...p, equippedBg: item.id }));
                              if (itemType === 'title') setInventory(p => ({ ...p, equippedTitle: item.id }));
                            }}
                            className={`w-full py-3 rounded-xl border text-xs font-black uppercase tracking-widest transition-all ${
                              isLight ? 'border-zinc-200 text-zinc-800 hover:bg-zinc-50 bg-white' : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            Equipar
                          </button>
                        ) : (
                          <button
                            disabled={!canAfford}
                            onClick={() => {
                              if (canAfford) {
                                setUserDiamonds(p => p - item.price);
                                setInventory(p => ({ ...p, ownedItems: [...(p.ownedItems || []), item.id] }));
                              }
                            }}
                            className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm ${
                              canAfford
                                ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90')
                                : (isLight ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200' : 'bg-white/10 text-white/30 cursor-not-allowed')
                            }`}
                          >
                            <Gem size={14} className="text-cyan-400" />
                            <span>Comprar {item.price} 💎</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 5. PERFIL (PROFILE) VIEW */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* USER HERO PROFILE CARD */}
            <div className={`p-8 rounded-[32px] border flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-sm ${
              isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className={`w-24 h-24 rounded-3xl border-2 flex items-center justify-center text-4xl shadow-sm overflow-hidden p-2 ${
                  isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white bg-white/10'
                }`}>
                  {AvatarDisplay && inventory?.equippedAvatar ? (
                    <AvatarDisplay avatarId={inventory.equippedAvatar} className="w-full h-full object-contain" />
                  ) : (
                    <span>{equippedAvatarItem?.icon || '👤'}</span>
                  )}
                </div>
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight">{username || 'Estudiante'}</h3>
                    <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                    }`}>NIVEL {currentLevel}</span>
                  </div>
                  <p className={`text-xs uppercase font-bold tracking-wider mt-1 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>{userEmail || 'Cuenta Anónima'}</p>
                  
                  {/* XP Bar */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className={`w-48 h-2 rounded-full overflow-hidden border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'}`}>
                      <div className={`h-full rounded-full transition-all ${isLight ? 'bg-zinc-900' : 'bg-white'}`} style={{ width: `${levelProgress}%` }} />
                    </div>
                    <span className="text-xs font-black">{currentLevelXP} / 1000 XP</span>
                  </div>
                </div>
              </div>

              {/* Profile stats badges */}
              <div className="flex gap-4">
                <div className={`p-4 rounded-2xl border text-center min-w-[100px] ${
                  isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                }`}>
                  <span className="text-2xl font-black">{loginStreak || 1}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wider block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Días Racha</span>
                </div>
                <div className={`p-4 rounded-2xl border text-center min-w-[100px] ${
                  isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                }`}>
                  <span className="text-2xl font-black">{completedCount || 0}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wider block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Retos Listos</span>
                </div>
                <div className={`p-4 rounded-2xl border text-center min-w-[100px] ${
                  isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                }`}>
                  <span className="text-2xl font-black">{userDiamonds || 0}</span>
                  <span className={`text-[9px] font-black uppercase tracking-wider block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Diamantes</span>
                </div>
                <div 
                  onClick={() => setProfileSubView('insignias')}
                  className={`p-4 rounded-2xl border text-center min-w-[100px] cursor-pointer hover:scale-105 transition-all ${
                    profileSubView === 'insignias'
                      ? (isLight ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm' : 'border-amber-400/50 bg-amber-500/15 text-amber-300')
                      : (isLight ? 'border-zinc-200 bg-zinc-50 hover:border-zinc-300' : 'border-white/10 bg-white/5 hover:border-white/20')
                  }`}
                  title="Ver Insignias"
                >
                  <span className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                    <Award size={18} />
                    {BADGES.filter(b => (inventory?.unlockedBadges || []).includes(b.id) || (b.check && b.check({ userXP, completedCount, loginStreak, activityLog, selectedApps, calendarTasks }).unlocked)).length}
                  </span>
                  <span className={`text-[9px] font-black uppercase tracking-wider block mt-0.5 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Insignias</span>
                </div>
              </div>
            </div>

            {/* PROFILE SUB-VIEW TOGGLE: OBJETOS VS INSIGNIAS */}
            <div className="flex justify-center">
              <div className={`inline-flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-md shadow-sm ${
                isLight ? 'bg-zinc-100 border-zinc-200/80' : 'bg-black/80 border-white/10'
              }`}>
                <button
                  onClick={() => setProfileSubView('inventario')}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
                    profileSubView === 'inventario'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  Objetos & Inventario
                </button>
                <button
                  onClick={() => setProfileSubView('insignias')}
                  className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 flex items-center gap-2 ${
                    profileSubView === 'insignias'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  <Award size={14} className="text-amber-500" />
                  <span>Insignias & Retos</span>
                </button>
              </div>
            </div>

            {/* SUB-VIEW 1: INSIGNIAS VIEW */}
            {profileSubView === 'insignias' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <BadgesView
                  userStats={{
                    userXP,
                    completedCount,
                    loginStreak,
                    activityLog,
                    selectedApps,
                    calendarTasks
                  }}
                  unlockedBadgeIds={inventory?.unlockedBadges || []}
                  isLight={isLight}
                />
              </motion.div>
            )}

            {/* SUB-VIEW 2: INVENTORY & SETTINGS SECTION */}
            {profileSubView === 'inventario' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Inventory Management */}
              <div className={`lg:col-span-2 p-6 rounded-[28px] border space-y-6 ${
                isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
              }`}>
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-black uppercase tracking-tight">Inventario de Objetos</h4>
                  <div className={`flex gap-2 p-1 rounded-xl border ${
                    isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'
                  }`}>
                    <button
                      onClick={() => setInventoryTab('avatar')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'avatar'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      Avatares
                    </button>
                    <button
                      onClick={() => setInventoryTab('background')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'background'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      Fondos
                    </button>
                    <button
                      onClick={() => setInventoryTab('title')}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'title'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      Títulos
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(shopItemsList || [])
                    .filter(item => (item.type || item.category) === inventoryTab)
                    .map((item, itemIdx) => {
                      const isEquipped = inventory?.equippedAvatar === item.id || inventory?.equippedBg === item.id || inventory?.equippedTitle === item.id;
                      const isOwned = item.price === 0 || (inventory?.ownedItems || []).includes(item.id);
                      const itemType = item.type || item.category;

                      return (
                        <div
                          key={`inv-item-${item.id || itemIdx}-${itemIdx}`}
                          onClick={() => onOpenInventoryItem?.(item)}
                          className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                            isEquipped 
                              ? (isLight ? 'border-zinc-900 bg-zinc-50 text-zinc-900 shadow-sm' : 'border-white bg-white/10 text-white shadow-md')
                              : (isLight ? 'border-zinc-200 bg-white hover:border-zinc-300 shadow-sm text-zinc-900' : 'border-white/10 bg-white/5 hover:border-white/30 text-white')
                          }`}
                        >
                          <div className="text-center py-2 flex flex-col items-center">
                            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-2 overflow-hidden">
                              {itemType === 'avatar' && AvatarDisplay ? (
                                <AvatarDisplay avatarId={item.id} className="w-full h-full object-contain" />
                              ) : itemType === 'background' && backgroundsData?.[item.id]?.css ? (
                                <div className={`w-full h-full rounded-xl ${backgroundsData[item.id].css} flex items-center justify-center border border-white/20`}>
                                  <Sparkles size={16} className="text-white/60" />
                                </div>
                              ) : (
                                <span className="text-3xl">{item.icon || '🛡️'}</span>
                              )}
                            </div>
                            <h5 className="text-xs font-black uppercase mt-1 line-clamp-1">{item.name}</h5>
                          </div>
                          <div onClick={(e) => e.stopPropagation()} className="mt-2">
                            {isEquipped ? (
                              <span className={`text-[10px] font-black uppercase text-center block py-2 ${isLight ? 'text-zinc-600' : 'text-white/60'}`}>Equipado</span>
                            ) : isOwned ? (
                              <button
                                onClick={() => {
                                  if (itemType === 'avatar') setInventory(p => ({ ...p, equippedAvatar: item.id }));
                                  if (itemType === 'background') setInventory(p => ({ ...p, equippedBg: item.id }));
                                  if (itemType === 'title') setInventory(p => ({ ...p, equippedTitle: item.id }));
                                }}
                                className={`w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-sm ${
                                  isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                                }`}
                              >
                                Equipar
                              </button>
                            ) : (
                              <span className={`text-[10px] font-black uppercase text-center block py-2 ${isLight ? 'text-zinc-300' : 'text-white/30'}`}>Bloqueado</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Settings & Account Controls */}
              <div className={`p-6 rounded-[28px] border space-y-6 ${
                isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
              }`}>
                <h4 className="text-lg font-black uppercase tracking-tight">Configuración</h4>

                <div className="space-y-4">
                  {/* Language */}
                  <div className={`flex justify-between items-center p-4 rounded-2xl border ${
                    isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                  }`}>
                    <div>
                      <h5 className="text-xs font-black uppercase">Idioma</h5>
                      <span className={`text-[10px] ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>{lang === 'es' ? 'Español' : 'English'}</span>
                    </div>
                    <button
                      onClick={() => setLang?.(lang === 'es' ? 'en' : 'es')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-black uppercase ${
                        isLight ? 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100 shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {lang === 'es' ? 'Cambiar a EN' : 'Cambiar a ES'}
                    </button>
                  </div>

                  {/* Theme */}
                  <div className={`flex justify-between items-center p-4 rounded-2xl border ${
                    isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                  }`}>
                    <div>
                      <h5 className="text-xs font-black uppercase">Tema Visual</h5>
                      <span className={`text-[10px] ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>{isLight ? 'Modo Claro' : 'Modo Oscuro'}</span>
                    </div>
                    <button
                      onClick={toggleMode}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-black uppercase ${
                        isLight ? 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100 shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {isLight ? 'Activar Oscuro' : 'Activar Claro'}
                    </button>
                  </div>

                  {/* Account Link or Sign Out */}
                  {isAnonymous ? (
                    <button
                      onClick={() => onLinkAccount?.(false)}
                      className={`w-full py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-sm ${
                        isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                      }`}
                    >
                      Guardar Progreso / Crear Cuenta
                    </button>
                  ) : (
                    <button
                      onClick={onSignOut}
                      className="w-full py-3.5 rounded-2xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut size={16} />
                      <span>Cerrar Sesión</span>
                    </button>
                  )}

                  {/* Legal and Privacy Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-white/5">
                    {onOpenPrivacy && (
                      <button
                        onClick={onOpenPrivacy}
                        className={`flex-1 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                          isLight ? 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 bg-white' : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Privacidad
                      </button>
                    )}
                    {onOpenTerms && (
                      <button
                        onClick={onOpenTerms}
                        className={`flex-1 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                          isLight ? 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 bg-white' : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        Términos
                      </button>
                    )}
                  </div>

                  <button
                    onClick={onOpenLanding}
                    className={`w-full py-3 rounded-2xl border font-black uppercase text-[11px] tracking-widest transition-all ${
                      isLight ? 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/10 text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Ver Página Informativa
                  </button>
                </div>
              </div>

            </div>
            )}

          </motion.div>
        )}

      </main>

      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div key="desktop-video-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-md flex items-center justify-center p-6">
            <div className={`w-full max-w-2xl border rounded-[32px] overflow-hidden p-6 space-y-6 shadow-2xl ${
              isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/15 text-white'
            }`}>
              <div className="flex justify-between items-center">
                <div>
                  <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border inline-block mb-1 ${
                    isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                  }`}>{selectedVideo.category}</span>
                  <h3 className="text-xl font-black uppercase tracking-tight">{selectedVideo.title}</h3>
                </div>
                <button onClick={() => setSelectedVideo(null)} className={`p-2.5 rounded-full transition-colors ${
                  isLight ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200' : 'bg-white/10 text-white hover:bg-white/20'
                }`}>
                  <X size={18} />
                </button>
              </div>

              <div className={`aspect-video w-full rounded-2xl overflow-hidden bg-black border shadow-inner ${
                isLight ? 'border-zinc-200' : 'border-white/10'
              }`}>
                {selectedVideo.youtubeId ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                    title={selectedVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/40">Video no disponible</div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className={`text-xs font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Ideas Clave</h4>
                <ul className="space-y-2">
                  {(selectedVideo.points || []).map((point, idx) => (
                    <li key={`vid-pt-${idx}`} className={`text-xs flex items-start gap-2.5 ${isLight ? 'text-zinc-700' : 'text-white/80'}`}>
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-black shrink-0 ${
                        isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-800' : 'bg-white/10 border-white/20 text-white'
                      }`}>{idx + 1}</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelectedVideo(null)}
                className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-sm ${
                  isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                Cerrar y Aplicar Consejo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CREATE POST MODAL (FORUM) */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div key="desktop-create-post-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
            <div className={`w-full max-w-lg border rounded-[32px] p-6 space-y-6 shadow-2xl ${
              isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/20 text-white'
            }`}>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight">Nueva Publicación</h3>
                <button onClick={() => setShowCreatePost(false)} className={`p-2 rounded-full ${isLight ? 'hover:bg-zinc-100 text-zinc-500' : 'hover:bg-white/10 text-white'}`}>
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Categoría</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Estudio', 'Hábitos', 'Desahogo', 'Logros'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setNewPostTag(tag)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                          newPostTag === tag
                            ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black')
                            : (isLight ? 'border border-zinc-200 text-zinc-600 hover:bg-zinc-50' : 'border border-white/10 text-white/50')
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Contenido</label>
                  <textarea
                    rows={4}
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    placeholder="Comparte tu experiencia, un logro o un consejo con la comunidad..."
                    className={`w-full p-4 rounded-2xl border text-sm font-medium focus:outline-none transition-colors resize-none ${
                      isLight
                        ? 'bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400'
                        : 'bg-black border-white/15 text-white placeholder:text-white/30 focus:border-white'
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCreatePost(false)}
                  className={`flex-1 py-3.5 rounded-xl border font-black uppercase text-xs tracking-widest ${
                    isLight ? 'border-zinc-200 text-zinc-700 hover:bg-zinc-50' : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  Cancelar
                </button>
                <button
                  disabled={!newPostContent.trim()}
                  onClick={() => {
                    if (newPostContent.trim()) {
                      setForumPosts(p => [
                        {
                          id: `p_${Date.now()}`,
                          user: username || 'Tú',
                          tag: newPostTag,
                          content: newPostContent.trim(),
                          likes: 0,
                          comments: [],
                          time: 'Justo ahora'
                        },
                        ...(p || [])
                      ]);
                      setNewPostContent('');
                      setShowCreatePost(false);
                    }
                  }}
                  className={`flex-1 py-3.5 rounded-xl font-black uppercase text-xs tracking-widest disabled:opacity-30 disabled:cursor-not-allowed shadow-sm ${
                    isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  Publicar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MASTERY COURSE MODAL */}
      <AnimatePresence>
        {selectedMasteryCourse && (
          <MasteryCourseModal
            key="desktop-modal-mastery"
            mastery={selectedMasteryCourse}
            completedClasses={completedMasteryClasses}
            onCompleteClass={handleCompleteMasteryClass}
            onClose={() => setSelectedMasteryCourse(null)}
            isLight={isLight}
          />
        )}
      </AnimatePresence>

    </div>
  );
};
