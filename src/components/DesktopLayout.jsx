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
  Smartphone,
  Globe
} from 'lucide-react';
import { InteractiveCalendar } from './InteractiveCalendar';
import { AppIcon } from './AppIcon';
import { FocuslyIcon } from './FocuslyLogo';
import { BADGES, checkAllBadges, BADGE_TIERS } from '../data/badges';
import { BadgesView } from './BadgesView';
import { BadgeUnlockModal } from './BadgeUnlockModal';
import { BadgeDetailModal } from './BadgeDetailModal';
import { MASTERIES_DATA } from '../data/masteries';
import { MasteryCourseModal } from './MasteryCourseModal';
import { MasteriesSectionView } from './mastery/MasteriesSectionView';
import { FocuslyAvatar3D } from './FocuslyAvatar3D';
import { FocuslyEnvironment } from './FocuslyEnvironment';
import { FocuslyProgressionRoad } from './FocuslyProgressionRoad';
import { FocuslyShopExpanded } from './FocuslyShopExpanded';
import { FocuslyCelebrationModal } from './FocuslyCelebrationModal';
import { TITLES, ENVIRONMENTS, OUTFITS, ACCESSORIES } from '../data/focuslyCustomization';
import { useScreenAdaptation } from './ScreenAdaptationSystem';
import { TRANSLATIONS, t as translate } from '../data/translations';

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
  { id: 'mg_1', type: 'reflex', title: 'Reflejos Zen', subtitle: '5 Niveles de Velocidad', desc: 'Prueba de velocidad neuronal con trampas rojas de inhibición de impulsos. Supera los 5 niveles.', icon: Zap, color: 'from-yellow-500 to-orange-600', rewardXP: 50, rewardDia: 20 },
  { id: 'mg_2', type: 'memory', title: 'Memoriza', subtitle: '5 Niveles de Matriz', desc: 'Encuentra las parejas en cuadrículas progresivas desde 6 hasta 20 cartas con racha de combo.', icon: LayoutGrid, color: 'from-blue-500 to-cyan-600', rewardXP: 60, rewardDia: 25 },
  { id: 'mg_3', type: 'millionaire', title: 'Mente Maestra', subtitle: 'Trivia de 8 Preguntas', desc: 'Preguntas de ciencia, neurociencia y filosofía con comodines estratégicos 50:50 y Pista del Sabio.', icon: Brain, color: 'from-purple-500 to-indigo-600', rewardXP: 80, rewardDia: 30 },
  { id: 'mg_4', type: 'math', title: 'Genio Matemático', subtitle: '5 Niveles Contrarreloj', desc: 'Aritmética, operaciones combinadas, álgebra visual y secuencias lógicas con 12s por ronda.', icon: Zap, color: 'from-green-500 to-emerald-600', rewardXP: 60, rewardDia: 20 },
  { id: 'mg_5', type: 'sequence', title: 'Secuencia Lógica', subtitle: '5 Niveles Cognitivos', desc: 'Orden ascendente, números negativos, descenso inverso y el Test Chimpancé de memoria espacial.', icon: LayoutGrid, color: 'from-indigo-500 to-purple-600', rewardXP: 60, rewardDia: 20 },
  { id: 'mg_6', type: 'whack', title: 'Destructor', subtitle: '3 Oleadas de Enfoque', desc: 'Destruye distracciones digitales, evita libros de estudio y no toques las bombas de dopamina.', icon: Target, color: 'from-red-500 to-pink-600', rewardXP: 70, rewardDia: 25 },
  { id: 'mg_7', type: 'stoic', title: 'Sabiduría Estoica', subtitle: '5 Máximas Filosóficas', desc: 'Ordena citas de Epicteto, Marco Aurelio, Séneca y Viktor Frankl descartando palabras distractoras.', icon: BookOpen, color: 'from-slate-500 to-gray-700', rewardXP: 60, rewardDia: 20 }
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
  const [celebrationData, setCelebrationData] = useState(null);
  const [organizeSubTab, setOrganizeSubTab] = useState('habitos'); // 'habitos' | 'calendario' | 'bloqueador'
  const [forumTab, setForumTab] = useState('comunidad'); // 'comunidad' | 'directos'
  const [forumFilter, setForumFilter] = useState('todos');
  const [shopFilter, setShopFilter] = useState('all');
  const [inventoryTab, setInventoryTab] = useState('avatar');
  const [profileSubView, setProfileSubView] = useState('inventario'); // 'inventario' | 'insignias'
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedMasteryCourse, setSelectedMasteryCourse] = useState(null);
  const [selectedMasteryInitialClass, setSelectedMasteryInitialClass] = useState(null);
  const [selectedMasteryInitialChallenge, setSelectedMasteryInitialChallenge] = useState(null);
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

  // Sistema de Adaptación Inteligente a cualquier tamaño de pantalla
  const { scale, scalePercent, density, dimensions } = useScreenAdaptation();
  const isCompactScreen = density === 'compact' || dimensions.height < 840 || dimensions.width < 1360;

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
    setCelebrationData({
      title: '¡Clase de Maestría Superada!',
      subtitle: cls.title,
      xpGained: xpEarned,
      diamondsGained: diaEarned
    });
    setTimeout(() => setFocusRewardToast(null), 4000);
  };

  const handleChallengeCelebration = () => {
    const xpToAdd = activeChallenge?.xp || 200;
    const diaToAdd = activeChallenge?.diamonds || 50;
    setCelebrationData({
      title: lang === 'en' ? 'Challenge Day Conquered!' : '¡Día de Desafío Conquistado!',
      subtitle: activeChallenge?.title 
        ? (lang === 'en' ? `Confirmed progress on "${activeChallenge.title}".` : `Progreso confirmado en "${activeChallenge.title}".`)
        : (lang === 'en' ? 'Your consistency is elevating your attention span.' : 'Tu constancia está elevando tu capacidad de atención.'),
      xpGained: xpToAdd,
      diamondsGained: diaToAdd
    });
    if (onCompleteChallenge) {
      onCompleteChallenge();
    }
  };

  const handleClaimFocusTime = () => {
    const xpToAdd = 150;
    const diaToAdd = 40;
    setUserXP?.(prev => prev + xpToAdd);
    setUserDiamonds?.(prev => prev + diaToAdd);
    setCelebrationData({
      title: lang === 'en' ? 'Screen-Free Time Claimed!' : '¡Tiempo Libre de Redes Reclamado!',
      subtitle: lang === 'en' ? 'You blocked distractions and protected 60 minutes of conscious life.' : 'Has bloqueado distracciones y protegido 60 minutos de vida consciente.',
      xpGained: xpToAdd,
      diamondsGained: diaToAdd
    });
  };

  // New post modal state in forum
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTag, setNewPostTag] = useState('Estudio');

  const t = (path, fallback) => translate(lang, path, fallback);
  Object.assign(t, uiText?.[lang] || TRANSLATIONS[lang] || TRANSLATIONS['es']);

  const recommendations = [
    { 
      id: 'rec_1', 
      title: t('recommendations.deepFocus', 'Bloque de Enfoque Profundo (45 min)'), 
      desc: t('recommendations.deepFocusDesc', 'Desactiva notificaciones de redes seleccionadas para entrar en flujo.'), 
      icon: '🧠', 
      color: 'from-blue-900/40 to-black', 
      border: 'border-blue-500/30' 
    },
    { 
      id: 'rec_2', 
      title: t('recommendations.activeBreak', 'Pausa Activa sin Pantalla (10 min)'), 
      desc: t('recommendations.activeBreakDesc', 'Camina e hidrátate antes del siguiente bloque de estudio.'), 
      icon: '🌿', 
      color: 'from-zinc-900 to-black', 
      border: 'border-white/10' 
    },
    { 
      id: 'rec_3', 
      title: t('recommendations.feynman', 'Repaso con Técnica Feynman'), 
      desc: t('recommendations.feynmanDesc', 'Explica lo aprendido en voz alta sin mirar tus notas para consolidar.'), 
      icon: '📚', 
      color: 'from-purple-900/40 to-black', 
      border: 'border-purple-500/30' 
    }
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

  // EXACTLY the 5 Original Main Navigation Sections of Focusly:
  // FORO | RANKINGS | HOME | SHOP | PERFIL (Home is the Center)
  const navItems = [
    { id: 'forum', icon: Megaphone, label: t('nav.forum', 'Foro') },
    { id: 'rankings', icon: Trophy, label: t('nav.rankings', 'Rankings') },
    { id: 'home', icon: Home, label: t('nav.home', 'Inicio') },
    { id: 'shop', icon: ShoppingBag, label: t('nav.shop', 'Tienda') },
    { id: 'profile', icon: User, label: t('nav.profile', 'Perfil') }
  ];

  const handleNavClick = (itemId) => {
    setActiveTab(itemId);
  };

  const equippedAvatarItem = (shopItemsList || []).find(i => i.id === inventory?.equippedAvatar);

  return (
    <div 
      className={`w-full min-h-screen flex flex-col relative overflow-x-clip ${isLight ? 'bg-[#fafafa] text-zinc-900' : `${currentBgTheme.css} text-white`} selection:bg-white selection:text-black font-sans transition-all duration-300`}
    >
      {/* Background Animated Themes */}
      {GlobalThemeEffects && (
        <GlobalThemeEffects themeId={inventory?.equippedBg || 'bg_default'} isDesktop={true} isLight={isLight} />
      )}

      {/* Subtle Grain Overlay (Zero Network Latency Data-URI) */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* TOP BAR / DESKTOP HEADER */}
      <header className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${isLight ? 'bg-white/85 border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : 'bg-black/90 border-white/10 shadow-2xl'}`}>
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-14 h-20 2xl:h-24 flex items-center justify-between gap-3 lg:gap-6">
          
          {/* Focusly Logo & Brand */}
          <div className="flex items-center gap-3.5 cursor-pointer group select-none shrink-0" onClick={() => setActiveTab('home')}>
            <div className="transition-transform duration-300 group-hover:scale-105 shrink-0">
              <FocuslyIcon size={38} className="2xl:w-[42px] 2xl:h-[42px] drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]" />
            </div>
            <span className={`text-xl sm:text-2xl 2xl:text-3xl font-black tracking-tight uppercase leading-none hidden sm:inline ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              FOCUSLY
            </span>
          </div>

          {/* MAIN 5 NAV TABS: FORO | RANKINGS | HOME | SHOP | PERFIL */}
          <nav className={`flex items-center gap-1 sm:gap-1.5 2xl:gap-2.5 p-1 sm:p-1.5 2xl:p-2 rounded-2xl border backdrop-blur-md shadow-inner ${isLight ? 'bg-zinc-100/90 border-zinc-200/80' : 'bg-white/[0.04] border-white/10'}`}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isCenterHome = item.id === 'home';
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 lg:px-6 2xl:px-8 py-2 sm:py-2.5 2xl:py-3.5 rounded-xl text-[11px] sm:text-xs lg:text-sm 2xl:text-base font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80 scale-105' : 'bg-white text-black shadow-lg shadow-white/10 scale-105')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/50 hover:text-white hover:bg-white/10')
                  } ${isCenterHome && !isActive ? (isLight ? 'text-zinc-800 font-extrabold' : 'text-zinc-300 font-extrabold') : ''}`}
                >
                  <Icon size={16} className="2xl:w-5 2xl:h-5" strokeWidth={isActive ? 2.5 : 1.8} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* USER STATS & CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Streak */}
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl border transition-all ${isLight ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' : 'bg-white/5 border-white/10 text-white'}`} title={lang === 'en' ? 'Daily Streak' : 'Racha de Días'}>
              <Flame size={15} className="text-orange-500 fill-orange-500" />
              <span className="text-xs font-black">{loginStreak || 1}d</span>
            </div>

            {/* Diamonds */}
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl border transition-all ${isLight ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' : 'bg-white/5 border-white/10 text-white'}`} title={lang === 'en' ? 'Diamonds' : 'Diamantes'}>
              <Gem size={15} className="text-sky-500 fill-sky-500/20" />
              <span className="text-xs font-black">{userDiamonds || 0}</span>
            </div>

            {/* Level & XP */}
            <div className={`hidden md:flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2 rounded-xl border ${isLight ? 'bg-white border-zinc-200 text-zinc-800 shadow-sm' : 'bg-white/5 border-white/10 text-white'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${isLight ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
                {currentLevel}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black uppercase tracking-wider">{lang === 'en' ? 'LEVEL' : 'NIVEL'} {currentLevel}</span>
                <div className={`w-16 lg:w-20 h-1.5 rounded-full overflow-hidden mt-0.5 ${isLight ? 'bg-zinc-200' : 'bg-white/20'}`}>
                  <div className={`h-full rounded-full transition-all ${isLight ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-white'}`} style={{ width: `${levelProgress}%` }} />
                </div>
              </div>
            </div>

            {/* Language Switcher */}
            {setLang && (
              <button
                onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                className={`flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl border transition-all hover:scale-105 cursor-pointer text-xs font-black uppercase tracking-wider ${
                  isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                }`}
                title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}
              >
                <Globe size={15} className="text-sky-400" />
                <span className="font-black">{lang === 'en' ? 'ES' : 'EN'}</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleMode}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all hover:scale-105 ${isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'}`}
              title={isLight ? (lang === 'en' ? 'Dark Mode' : 'Modo Oscuro') : (lang === 'en' ? 'Light Mode' : 'Modo Claro')}
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Device Mode Toggle */}
            {toggleDeviceMode && (
              <button
                onClick={toggleDeviceMode}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all hover:scale-105 ${isLight ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-700 shadow-sm' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'}`}
                title={lang === 'en' ? 'Mobile Mode' : 'Modo Móvil'}
              >
                <Smartphone size={16} />
              </button>
            )}
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

      {/* MAIN BODY CONTAINER - ADAPTA AUTOMÁTICAMENTE A CUALQUIER RESOLUCIÓN */}
      <main 
        className={`flex-1 max-w-[1720px] w-full mx-auto relative z-10 transition-all duration-300 ${
          isCompactScreen 
            ? 'p-4 sm:p-5 lg:p-6 2xl:p-10 pb-20 2xl:pb-28' 
            : 'p-4 sm:p-6 lg:p-8 2xl:p-14 pb-24 2xl:pb-36'
        }`}
      >
        
        {/* ======================================================== */}
        {/* 1. INICIO (HOME HUB) & PRIMARY ACTION REALMS */}
        {/* ======================================================== */}
        {(activeTab === 'home' || activeTab === 'desafiate' || activeTab === 'organizate' || activeTab === 'crece') && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* 1. HERO COMPOSITION (PROTAGONISTA PRINCIPAL): LIVING AVATAR & ENVIRONMENT (LEFT) + ACTIVE MISSION & FOCUS RECLAIM (RIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 2xl:gap-8 items-stretch">
              
              {/* HERO LEFT (5 COLS / 4 COLS ON 2XL): LIVING AVATAR & CUSTOM ENVIRONMENT */}
              <div className={`lg:col-span-5 2xl:col-span-4 rounded-[28px] lg:rounded-[36px] 2xl:rounded-[44px] border p-1 overflow-hidden relative shadow-2xl flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[450px] 2xl:min-h-[580px] ${
                isLight ? 'bg-white border-zinc-200/80 text-zinc-900 shadow-zinc-900/5' : 'bg-zinc-950 border-white/10 text-white'
              }`}>
                <FocuslyEnvironment
                  environmentId={inventory?.equippedBg || 'env_focus'}
                  userXP={userXP}
                  isLight={isLight}
                  className="rounded-[24px] lg:rounded-[32px] 2xl:rounded-[40px] p-5 sm:p-6 2xl:p-8 flex flex-col justify-between h-full"
                >
                  {/* Top Header of Realm: Title + Realm Tier */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] 2xl:text-xs font-black uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                        <Crown size={14} />
                        {TITLES.find(t => t.id === inventory?.equippedTitle)?.name || 'Guardián del Enfoque'}
                      </span>
                    </div>
                    <span className={`text-[10px] sm:text-[11px] 2xl:text-xs font-mono font-bold uppercase px-2.5 sm:px-3 py-1 rounded-full border ${
                      isLight ? 'bg-white/80 border-zinc-200 text-zinc-700' : 'bg-black/60 border-white/15 text-zinc-300'
                    }`}>
                      Nivel {currentLevel}
                    </span>
                  </div>

                  {/* 3D Interactive Living Avatar */}
                  <div className="my-auto py-3 sm:py-5 flex flex-col items-center justify-center z-10">
                    <FocuslyAvatar3D
                      avatarId={inventory?.equippedAvatar || 'a_base'}
                      outfitId={inventory?.equippedOutfit || 'outfit_base'}
                      accessoryId={inventory?.equippedAccessory || 'acc_none'}
                      size="hero"
                      showPedestal={true}
                      interactive={true}
                      className="scale-95 sm:scale-100 lg:scale-105 2xl:scale-115 transition-transform"
                    />
                  </div>

                  {/* Bottom Footer: User Greeting & Shop Customizer CTA */}
                  <div className="pt-4 2xl:pt-6 border-t border-white/10 flex items-center justify-between z-10">
                    <div>
                      <div className="text-sm 2xl:text-base font-black uppercase tracking-tight">{username || (lang === 'en' ? 'Focus Student' : 'Estudiante de Enfoque')}</div>
                      <div className={`text-xs 2xl:text-sm font-medium ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        🔥 {loginStreak || 1} {lang === 'en' ? 'days active streak' : 'días de racha activa'}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('shop');
                      }}
                      className={`px-4.5 2xl:px-6 py-2.5 2xl:py-3 rounded-xl 2xl:rounded-2xl text-xs 2xl:text-sm font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                        isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                    >
                      <Sparkles size={16} />
                      <span>{lang === 'en' ? 'Customize' : 'Personalizar'}</span>
                    </button>
                  </div>
                </FocuslyEnvironment>
              </div>

              {/* HERO RIGHT (7 COLS / 8 COLS ON 2XL): PROTAGONIST MISSION & RECLAIM SAVED SCREEN TIME */}
              <div className="lg:col-span-7 2xl:col-span-8 flex flex-col justify-between gap-6">
                
                {/* Active Mission Protagonist Card */}
                {activeChallenge ? (
                  <div className={`p-8 2xl:p-10 rounded-[36px] 2xl:rounded-[44px] border relative overflow-hidden backdrop-blur-xl flex-1 flex flex-col justify-between shadow-2xl transition-all ${
                    isLight ? 'bg-white border-zinc-200/80 text-zinc-900 shadow-zinc-900/5' : 'bg-zinc-950/90 border-white/10 text-white'
                  }`}>
                    {/* Glow decorativo */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="space-y-1">
                          <span className={`px-3.5 py-1 rounded-full text-[10px] 2xl:text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${
                            isLight ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'bg-sky-950/40 text-sky-300 border border-sky-500/30'
                          }`}>
                            <Zap size={14} className="text-amber-500" />
                            {lang === 'en' ? "Today's Featured Quest" : 'Misión Protagonista de Hoy'}
                          </span>
                          <h3 className="text-3xl 2xl:text-4xl font-black uppercase tracking-tight mt-3">
                            {activeChallenge.title}
                          </h3>
                          <p className={`text-xs 2xl:text-sm font-medium mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                            {activeChallenge.subtitle}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className={`text-4xl 2xl:text-5xl font-black ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>
                            {Math.max(1, Math.round((activeChallenge.currentDay / activeChallenge.duration) * 100))}%
                          </span>
                          <span className={`text-[10px] 2xl:text-xs font-black uppercase tracking-wider block ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            {lang === 'en' ? 'Total Progress' : 'Progreso Total'}
                          </span>
                        </div>
                      </div>

                      {/* Days Counter & Visual Curved Bar */}
                      <div className="flex items-baseline gap-2 my-6">
                        <span className="text-6xl 2xl:text-7xl font-black tracking-tight">{activeChallenge.currentDay}</span>
                        <span className={`text-xl 2xl:text-2xl font-bold uppercase tracking-wider ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          / {activeChallenge.duration} {lang === 'en' ? 'Days Conquered' : 'Días Superados'}
                        </span>
                      </div>

                      <div className={`h-4 2xl:h-5 rounded-full overflow-hidden border mb-6 p-0.5 ${
                        isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/60 border-white/10'
                      }`}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.max(5, (activeChallenge.currentDay / activeChallenge.duration) * 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 shadow-sm"
                        />
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap sm:flex-nowrap gap-3 pt-4 border-t border-white/10">
                      <button
                        onClick={onOpenActiveChallenge}
                        className={`flex-1 py-4 2xl:py-5 px-6 2xl:px-8 rounded-2xl font-black uppercase text-xs 2xl:text-sm tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                          isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
                        }`}
                      >
                        <Play size={18} fill="currentColor" />
                        <span>{lang === 'en' ? 'Continue Daily Quest' : 'Continuar Misión Diaria'}</span>
                      </button>

                      <button
                        onClick={handleChallengeCelebration}
                        className={`py-4 2xl:py-5 px-6 2xl:px-8 rounded-2xl border font-black uppercase text-xs 2xl:text-sm tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                          isLight ? 'border-zinc-200 hover:bg-zinc-100 text-zinc-800' : 'border-white/20 hover:bg-white/10 text-white'
                        }`}
                      >
                        <CheckCircle2 size={18} className="text-emerald-400" />
                        <span>{lang === 'en' ? 'Complete Today' : 'Completar Hoy'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className={`p-8 2xl:p-10 rounded-[36px] 2xl:rounded-[44px] border relative overflow-hidden backdrop-blur-xl flex-1 flex flex-col items-center justify-center text-center space-y-4 ${
                    isLight ? 'bg-white border-zinc-200/80 shadow-md text-zinc-900' : 'bg-zinc-950/80 border-white/10 shadow-2xl text-white'
                  }`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                      isLight ? 'bg-zinc-100 text-zinc-700 border-zinc-200' : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                    }`}>
                      <Target size={32} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-2xl font-black uppercase tracking-tight">{lang === 'en' ? 'No Active Quest' : 'Sin Misión Activa'}</h3>
                      <p className={`text-xs max-w-sm ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {lang === 'en' ? 'Choose your next detox challenge and gain focus experience.' : 'Elige tu próximo reto de desintoxicación y gana experiencia de enfoque.'}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setHomeTab('desafiate');
                      }}
                      className={`px-8 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg cursor-pointer ${
                        isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200'
                      }`}
                    >
                      {lang === 'en' ? 'Explore Challenges' : 'Explorar Desafíos'}
                    </button>
                  </div>
                )}

                {/* FOCUS TIME RECLAIM STATION - ULTRA CLEAN & PROFESSIONAL */}
                <div className={`p-6 2xl:p-7 rounded-[28px] 2xl:rounded-[32px] border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${
                  isLight 
                    ? 'bg-white border-zinc-200 text-zinc-900 shadow-sm' 
                    : 'bg-[#121318] border-white/10 text-white shadow-xl shadow-black/20'
                }`}>
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className={`w-12 h-12 2xl:w-14 2xl:h-14 rounded-2xl border flex items-center justify-center shrink-0 ${
                      isLight ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                    }`}>
                      <Shield size={24} className="2xl:w-7 2xl:h-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 justify-center sm:justify-start">
                        <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-blue-500' : 'bg-blue-400'} animate-pulse`} />
                        <span className={`text-[11px] 2xl:text-xs font-black uppercase tracking-widest ${
                          isLight ? 'text-blue-600' : 'text-blue-400'
                        }`}>
                          {lang === 'en' ? 'Anti-Distraction Shield' : 'Escudo Anti-Distracciones'}
                        </span>
                      </div>
                      <div className="text-sm 2xl:text-base font-bold mt-0.5">
                        {lang === 'en' ? 'You protected ~60 min of focus today' : 'Has protegido ~60 min de atención hoy'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleClaimFocusTime}
                    className={`px-6 py-3.5 rounded-xl 2xl:rounded-2xl font-black uppercase text-xs 2xl:text-sm tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-md active:scale-98 ${
                      isLight
                        ? 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-zinc-900/10'
                        : 'bg-white hover:bg-zinc-100 text-zinc-950 shadow-white/10'
                    }`}
                  >
                    <Zap size={15} className="fill-amber-400 text-amber-400" />
                    <span>{lang === 'en' ? 'Claim +150 XP and +40 💎' : 'Reclamar +150 XP y +40 💎'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. SUB-MENU TABS DE HOME: DESAFÍATE | ORGANÍZATE | CRECE */}
            <div className="flex justify-center pt-2">
              <div className={`inline-flex items-center gap-2 p-1.5 2xl:p-2.5 rounded-full border backdrop-blur-md shadow-sm ${
                isLight ? 'bg-zinc-100 border-zinc-200/80' : 'bg-black/80 border-white/10'
              }`}>
                <button
                  onClick={() => setHomeTab('desafiate')}
                  className={`px-7 lg:px-9 2xl:px-12 py-3 2xl:py-4 rounded-full text-xs lg:text-sm 2xl:text-base font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                    homeTab === 'desafiate'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-md border border-zinc-200/80 scale-105' : 'bg-white text-black shadow-lg shadow-white/10 scale-105')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/50 hover:text-white hover:bg-white/5')
                  }`}
                >
                  <Target size={18} className="2xl:w-5 2xl:h-5 text-sky-500" />
                  <span>{t.challenge || 'Desafíate'}</span>
                </button>
                <button
                  onClick={() => setHomeTab('organizate')}
                  className={`px-7 lg:px-9 2xl:px-12 py-3 2xl:py-4 rounded-full text-xs lg:text-sm 2xl:text-base font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                    homeTab === 'organizate'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-md border border-zinc-200/80 scale-105' : 'bg-white text-black shadow-lg shadow-white/10 scale-105')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/50 hover:text-white hover:bg-white/5')
                  }`}
                >
                  <Clock size={18} className="2xl:w-5 2xl:h-5 text-purple-400" />
                  <span>{t.organize || 'Organízate'}</span>
                </button>
                <button
                  onClick={() => setHomeTab('crece')}
                  className={`px-7 lg:px-9 2xl:px-12 py-3 2xl:py-4 rounded-full text-xs lg:text-sm 2xl:text-base font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                    homeTab === 'crece'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-md border border-zinc-200/80 scale-105' : 'bg-white text-black shadow-lg shadow-white/10 scale-105')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/50 hover:text-white hover:bg-white/5')
                  }`}
                >
                  <Brain size={18} className="2xl:w-5 2xl:h-5 text-emerald-400" />
                  <span>{t.grow || 'Crece'}</span>
                </button>
              </div>
            </div>

            {/* ----------------- SUBTAB: DESAFÍATE ----------------- */}
            {homeTab === 'desafiate' && (
              <div className="space-y-10">
                {/* Camino de Trofeos Focusly */}
                <FocuslyProgressionRoad
                  userXP={userXP}
                  userDiamonds={userDiamonds}
                  isLight={isLight}
                />
              <div className="space-y-8">
                
                {/* TOP GRID: ACTIVE CHALLENGE + AI RECOMMENDATIONS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Active Challenge Card */}
                  <div className="lg:col-span-2">
                    {activeChallenge ? (
                      <div className={`p-8 rounded-[32px] border relative overflow-hidden backdrop-blur-md transition-all ${isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 shadow-2xl text-white'}`}>
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${isLight ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white/10 text-white border-white/20'}`}>
                              {lang === 'en' ? 'ACTIVE CHALLENGE' : 'DESAFÍO ACTIVO'}
                            </span>
                            <h3 className="text-3xl font-black uppercase tracking-tighter mt-3">{activeChallenge.title}</h3>
                            <p className={`text-xs font-medium mt-1 ${isLight ? 'text-zinc-500' : 'text-white/60'}`}>{activeChallenge.subtitle}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-4xl font-black tracking-tight">{Math.max(1, Math.round((activeChallenge.currentDay / activeChallenge.duration) * 100))}%</span>
                            <span className={`text-[10px] font-black uppercase tracking-wider block ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                              {lang === 'en' ? 'Completed' : 'Completado'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-2 mb-6">
                          <span className="text-6xl font-black tracking-tighter">{activeChallenge.currentDay}</span>
                          <span className={`text-xl font-bold ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>/ {activeChallenge.duration} {lang === 'en' ? 'DAYS' : 'DÍAS'}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className={`h-4 rounded-full overflow-hidden border mb-6 ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black/60 border-white/10'}`}>
                          <div className={`h-full rounded-full transition-all duration-1000 ${isLight ? 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' : 'bg-gradient-to-r from-sky-400 to-indigo-400 shadow-sm'}`} style={{ width: `${Math.max(3, (activeChallenge.currentDay / activeChallenge.duration) * 100)}%` }} />
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={onOpenActiveChallenge}
                            className={`flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${
                              isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                            }`}
                          >
                            <Play size={16} fill="currentColor" />
                            <span>{lang === 'en' ? 'Continue Daily Quest' : 'Continuar Desafío Diario'}</span>
                          </button>
                          <button
                            onClick={onCompleteChallenge}
                            className={`px-6 py-4 rounded-2xl border font-black uppercase text-xs tracking-widest transition-all cursor-pointer ${
                              isLight ? 'border-zinc-200 hover:bg-zinc-50 text-zinc-800' : 'border-white/20 hover:bg-white/10 text-white'
                            }`}
                          >
                            {lang === 'en' ? 'Claim Completion' : 'Reclamar Fin'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className={`p-10 rounded-[32px] border flex flex-col items-center justify-center text-center h-full min-h-[280px] backdrop-blur-md transition-all ${isLight ? 'bg-white border-zinc-200 shadow-sm text-zinc-900' : 'bg-[#0c0c0c] border-white/10 shadow-xl text-white'}`}>
                        <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 ${isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'}`}>
                          <Clock size={28} className={isLight ? 'text-zinc-400' : 'text-white/40'} />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">
                          {lang === 'en' ? 'No Active Challenge' : 'Sin Desafío Activo'}
                        </h3>
                        <p className={`text-xs max-w-md mt-1 mb-6 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                          {lang === 'en' ? 'Select a digital detox challenge to forge your focus willpower today.' : 'Selecciona un desafío de desintoxicación para empezar a forjar tu voluntad hoy mismo.'}
                        </p>
                        <button
                          onClick={onOpenAllChallenges}
                          className={`px-8 py-3.5 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-sm cursor-pointer ${
                            isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                          }`}
                        >
                          {lang === 'en' ? 'Explore Challenges' : 'Explorar Desafíos'}
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
                      className={`mt-4 w-full py-3 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isLight ? 'border-zinc-200 text-zinc-800 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      <Sparkles size={14} className={isLight ? 'text-indigo-600' : ''} />
                      <span>{lang === 'en' ? 'Optimize with AI' : 'Optimizar con IA'}</span>
                    </button>
                  </div>
                </div>

                {/* FEATURED CHALLENGES GRID */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        {lang === 'en' ? 'Recommended Challenges' : 'Desafíos Recomendados'}
                      </h3>
                      <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                        {lang === 'en' ? 'Proven digital detox methodologies' : 'Metodologías comprobadas de desintoxicación digital'}
                      </p>
                    </div>
                    <button
                      onClick={onOpenAllChallenges}
                      className={`px-5 py-2.5 rounded-full border font-black text-xs uppercase tracking-widest transition-all cursor-pointer ${
                        isLight ? 'border-zinc-200 text-zinc-800 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {lang === 'en' ? 'View All' : 'Ver Todos'}
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
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${isLight ? 'bg-sky-50 text-sky-800 border border-sky-200' : 'bg-white/10 text-white'}`}>
                            <Gem size={12} className={isLight ? 'text-sky-600' : 'text-sky-400'} />
                            <span>+{challenge.diamonds}</span>
                          </div>
                        </div>
                        <h4 className="text-lg font-black uppercase tracking-tight">{challenge.title}</h4>
                        <p className={`text-xs uppercase font-bold tracking-wider mt-1 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>{challenge.duration} {lang === 'en' ? 'DAYS' : 'DÍAS'} • {challenge.subtitle}</p>
                        <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-black uppercase tracking-widest transition-colors ${
                          isLight ? 'border-zinc-100 text-zinc-700 group-hover:text-zinc-900' : 'border-white/10 text-white/70 group-hover:text-white'
                        }`}>
                          <span>{lang === 'en' ? 'Start' : 'Comenzar'}</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CENTRO DE PRUEBAS / MINIJUEGOS */}
                <div className={`pt-4 border-t ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
                  <div className="mb-6">
                    <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                      {lang === 'en' ? 'Dopamine Testing Lab' : 'Centro de Pruebas de Dopamina'}
                    </h3>
                    <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                      {lang === 'en' ? 'Cognitive training minigames to replace passive scrolling' : 'Minijuegos de entrenamiento cognitivo para reemplazar el scroll pasivo'}
                    </p>
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
                              <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 border ${isLight ? 'bg-sky-50 text-sky-800 border-sky-200' : 'bg-white/10 text-white'}`}><Gem size={8} className={isLight ? 'text-sky-600' : ''} /> +{game.rewardDia}</span>
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
              </div>
            )}

            {/* ----------------- SUBTAB: ORGANÍZATE ----------------- */}
            {homeTab === 'organizate' && (
              <div className="space-y-6">
                
                {/* SUB-SELECTOR: HÁBITOS / CALENDARIO / BLOQUEADOR */}
                <div className={`flex gap-2 border-b pb-4 ${isLight ? 'border-zinc-200' : 'border-white/10'}`}>
                  <button
                    onClick={() => setOrganizeSubTab('habitos')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      organizeSubTab === 'habitos'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    {lang === 'en' ? 'Daily Habits' : 'Hábitos Diarios'}
                  </button>
                  <button
                    onClick={() => setOrganizeSubTab('calendario')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      organizeSubTab === 'calendario'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    {lang === 'en' ? 'Interactive Calendar' : 'Calendario Interactivo'}
                  </button>
                  <button
                    onClick={() => setOrganizeSubTab('bloqueador')}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      organizeSubTab === 'bloqueador'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    {lang === 'en' ? 'Limits & Blocker' : 'Límites y Bloqueador'}
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
                        <h3 className="text-2xl font-black uppercase tracking-tight">
                          {lang === 'en' ? 'Habit Manager' : 'Gestor de Hábitos'}
                        </h3>
                        <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                          {lang === 'en' ? 'Build consistency day by day' : 'Construye consistencia día a día'}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={onOpenAIHabit}
                          className={`px-5 py-3 rounded-xl border font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                            isLight ? 'border-zinc-200 text-zinc-800 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                          }`}
                        >
                          <Sparkles size={14} className={isLight ? 'text-indigo-600' : ''} />
                          <span>{lang === 'en' ? 'AI Assistant' : 'Asistente IA'}</span>
                        </button>
                        <button
                          onClick={onOpenCreateHabit}
                          className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
                            isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                          }`}
                        >
                          <Plus size={16} />
                          <span>{lang === 'en' ? 'Create Habit' : 'Crear Hábito'}</span>
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
                          <h4 className="text-base font-black uppercase">
                            {lang === 'en' ? 'No habits created yet' : 'No tienes hábitos creados'}
                          </h4>
                          <p className={`text-xs mt-1 mb-6 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                            {lang === 'en' ? 'Generate a plan with AI or add your first daily habits.' : 'Genera un plan con IA o añade tus primeros hábitos diarios.'}
                          </p>
                          <button
                            onClick={onOpenCreateHabit}
                            className={`px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-sm cursor-pointer ${
                              isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                            }`}
                          >
                            {lang === 'en' ? 'Create First Habit' : 'Crear Primer Hábito'}
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
                                  className={`w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                                    isCompletedToday 
                                      ? (isLight ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-black border-white shadow-lg')
                                      : (isLight ? 'border-zinc-300 text-zinc-300 hover:border-zinc-500 hover:text-zinc-600 bg-zinc-50' : 'border-white/20 text-white/30 hover:border-white/50 hover:text-white')
                                  }`}
                                >
                                  <Check size={20} strokeWidth={3} />
                                </button>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[8px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                                      isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                                    }`}>{habit.category || (lang === 'en' ? 'General' : 'General')}</span>
                                    <span className={`text-[8px] font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>🔥 {habit.streak || 0} {lang === 'en' ? 'DAYS' : 'DÍAS'}</span>
                                  </div>
                                  <h4 className={`text-base font-black uppercase tracking-tight truncate ${
                                    isCompletedToday ? (isLight ? 'line-through text-zinc-400' : 'line-through text-white/40') : (isLight ? 'text-zinc-900' : 'text-white')
                                  }`}>{habit.title}</h4>
                                  {habit.desc && <p className={`text-[11px] truncate ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>{habit.desc}</p>}
                                </div>
                              </div>
                              <button
                                onClick={handleDelete}
                                className={`p-2 rounded-full transition-colors cursor-pointer ${isLight ? 'hover:bg-red-50 text-zinc-400 hover:text-red-600' : 'hover:bg-red-500/20 text-white/30 hover:text-red-400'}`}
                                title={lang === 'en' ? 'Delete Habit' : 'Eliminar Hábito'}
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
                        <h3 className="text-2xl font-black uppercase tracking-tight">
                          {lang === 'en' ? 'Weekly Planner' : 'Planificador Semanal'}
                        </h3>
                        <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                          {lang === 'en' ? 'Organize your study sessions and active breaks' : 'Organiza tus sesiones de estudio y descansos activos'}
                        </p>
                      </div>
                      <button
                        onClick={onOpenAICalendar}
                        className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                          isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                        }`}
                      >
                        <Sparkles size={16} />
                        <span>{lang === 'en' ? 'Organize with AI' : 'Organizar con IA'}</span>
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
                        <h3 className="text-2xl font-black uppercase tracking-tight">
                          {lang === 'en' ? 'Daily Usage Limits' : 'Límites de Uso Diario'}
                        </h3>
                        <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                          {lang === 'en' ? 'Strict screen time limits per application' : 'Control estricto de tiempo por aplicación'}
                        </p>
                      </div>
                      <button
                        onClick={claimFocusRewards}
                        className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-sm transition-all cursor-pointer ${
                          isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                        }`}
                      >
                        {lang === 'en' ? 'Claim Rewards' : 'Reclamar Recompensas'}
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
                                  className={`flex-1 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                                    isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100' : 'border-white/20 text-white hover:bg-white/10'
                                  }`}
                                >
                                  {lang === 'en' ? '⚡ Emergency 5m' : '⚡ Urgencia 5m'}
                                </button>
                              )}
                              <button
                                onClick={() => setBlockedAppsConfig(p => ({ ...p, [appId]: { ...config, usedToday: 0 } }))}
                                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                                  isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100' : 'border-white/20 text-white/50 hover:text-white hover:bg-white/10'
                                }`}
                                title={lang === 'en' ? 'Reset usage' : 'Reiniciar uso'}
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
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                        isLight 
                          ? 'border-zinc-200 bg-zinc-50 text-zinc-800 hover:bg-zinc-100' 
                          : 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <ArrowLeft size={16} />
                      <span>{lang === 'en' ? 'Back' : 'Volver'}</span>
                    </button>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight">
                        {lang === 'en' ? 'Growth Academy' : 'Academia de Crecimiento'}
                      </h3>
                      <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                        {lang === 'en'
                          ? 'Digital skill courses, neuroscience of focus, and AI coaches'
                          : 'Cursos de habilidades digitales, neurociencia del enfoque y coaches IA'}
                      </p>
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
                      <span>{lang === 'en' ? 'Masteries & Courses' : 'Maestrías & Cursos'}</span>
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
                      <span>{lang === 'en' ? 'AI Coaches' : 'Coaches IA'}</span>
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
                      <span>{lang === 'en' ? 'Videos & Wisdom' : 'Videos & Sabiduría'}</span>
                    </button>
                  </div>
                </div>

                {/* TAB 1: MAESTRÍAS Y CURSOS COMPLETOS (REDISEÑO MINIMALISTA FOCUSLY) */}
                {creceTab === 'maestrias' && (
                  <MasteriesSectionView
                    completedClasses={completedMasteryClasses}
                    isLight={isLight}
                    lang={lang}
                    onLaunchClass={(cls, mastery) => {
                      setSelectedMasteryInitialClass(cls);
                      setSelectedMasteryInitialChallenge(null);
                      setSelectedMasteryCourse(mastery);
                    }}
                    onLaunchChallenge={(unit, mastery) => {
                      setSelectedMasteryInitialClass(null);
                      setSelectedMasteryInitialChallenge(unit);
                      setSelectedMasteryCourse(mastery);
                    }}
                    onOpenFullCourse={(mastery) => {
                      setSelectedMasteryInitialClass(null);
                      setSelectedMasteryInitialChallenge(null);
                      setSelectedMasteryCourse(mastery);
                    }}
                    onConnectHabit={(habitTitle) => {
                      if (onOpenCreateHabit) {
                        onOpenCreateHabit();
                      } else {
                        setActiveTab('organizate');
                      }
                    }}
                    onStartFocusSession={() => {
                      setActiveTab('home');
                    }}
                  />
                )}

                {/* TAB 2: COACHES DE ENFOQUE */}
                {creceTab === 'coaches' && (
                  <div>
                    <div className="mb-6">
                      <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        {lang === 'en' ? 'AI Focus Coaches' : 'Coaches de Enfoque con IA'}
                      </h3>
                      <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                        {lang === 'en' ? 'Choose a personalized mentor for your distraction pattern' : 'Elige un mentor personalizado según tu patrón de distracción'}
                      </p>
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
                            <span className={`text-[9px] font-black uppercase tracking-widest block mb-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                              {lang === 'en' ? 'AI COACH' : 'COACH IA'}
                            </span>
                            <h4 className="text-xl font-black uppercase tracking-tight">{coach.name}</h4>
                            <p className={`text-xs font-semibold mt-1 ${isLight ? 'text-zinc-700' : 'text-white/70'}`}>{coach.type}</p>
                            <p className={`text-[11px] leading-relaxed mt-2 ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>{coach.desc}</p>
                          </div>
                          <button className={`mt-6 w-full py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all shadow-sm cursor-pointer ${
                            isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                          }`}>
                            {lang === 'en' ? `Talk to ${coach.name}` : `Hablar con ${coach.name}`}
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
                      <h3 className={`text-2xl font-black uppercase tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        {lang === 'en' ? 'Wisdom Bites & Videos' : 'Píldoras de Sabiduría & Videos'}
                      </h3>
                      <p className={`text-xs uppercase tracking-wider mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                        {lang === 'en' ? 'Direct insights on neuroscience, dopamine, and study techniques' : 'Consejos directos sobre neurociencia, dopamina y técnicas de estudio'}
                      </p>
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
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      forumTab === 'comunidad'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    {lang === 'en' ? 'Community' : 'Comunidad'}
                  </button>
                  <button
                    onClick={() => setForumTab('directos')}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      forumTab === 'directos'
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                        : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                    }`}
                  >
                    {lang === 'en' ? 'Live Study Rooms' : 'Directos (Chats)'}
                  </button>
                </div>
              </div>

              {forumTab === 'comunidad' && (
                <button
                  onClick={() => setShowCreatePost(true)}
                  className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 cursor-pointer ${
                    isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  <Plus size={16} />
                  <span>{lang === 'en' ? 'Create Post' : 'Publicar'}</span>
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
                  <h4 className={`text-xs font-black uppercase tracking-widest mb-4 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                    {lang === 'en' ? 'Categories' : 'Categorías'}
                  </h4>
                  {['todos', 'Estudio', 'Hábitos', 'Desahogo', 'Logros'].map(cat => {
                    const catLabel = cat === 'todos' 
                      ? (lang === 'en' ? 'All Posts' : 'Todas las publicaciones')
                      : (cat === 'Estudio' ? (lang === 'en' ? 'Study' : 'Estudio')
                        : (cat === 'Hábitos' ? (lang === 'en' ? 'Habits' : 'Hábitos')
                        : (cat === 'Desahogo' ? (lang === 'en' ? 'Vent / Support' : 'Desahogo')
                        : (lang === 'en' ? 'Achievements' : 'Logros'))));
                    return (
                      <button
                        key={cat}
                        onClick={() => setForumFilter(cat)}
                        className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          forumFilter === cat
                            ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black shadow-md')
                            : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100' : 'text-white/50 hover:text-white hover:bg-white/5')
                        }`}
                      >
                        {catLabel}
                      </button>
                    );
                  })}
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
            { id: 'all', name: lang === 'en' ? 'All Leagues' : 'Todas las Ligas', icon: '🏆', minXP: 0 },
            { id: 'bronce', name: lang === 'en' ? 'Bronze League' : 'Liga Bronce', icon: '🥉', tierKey: 'bronce', minXP: '0 - 1,999 XP' },
            { id: 'plata', name: lang === 'en' ? 'Silver League' : 'Liga Plata', icon: '🥈', tierKey: 'plata', minXP: '2,000 - 4,999 XP' },
            { id: 'oro', name: lang === 'en' ? 'Gold League' : 'Liga Oro', icon: '🥇', tierKey: 'oro', minXP: '5,000 - 8,999 XP' },
            { id: 'diamante', name: lang === 'en' ? 'Diamond League' : 'Liga Diamante', icon: '💎', tierKey: 'diamante', minXP: '9,000 - 13,999 XP' },
            { id: 'mitico', name: lang === 'en' ? 'Mythic League' : 'Liga Mítica', icon: '👑', tierKey: 'mitico', minXP: '14,000+ XP' }
          ];

          const userCurrentTierObj = BADGE_TIERS[userLeagueKey] || BADGE_TIERS.bronce;

          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              {/* Header & User League Banner */}
              <div className="text-center max-w-2xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest shadow-sm bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-purple-500/10 border-yellow-500/30 text-yellow-500">
                  <Trophy size={14} />
                  <span>{lang === 'en' ? 'Competitive Focus Season' : 'Temporada Competitiva de Enfoque'}</span>
                </div>
                <h3 className={`text-4xl font-black uppercase tracking-tighter ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {lang === 'en' ? 'Leagues & Global Leaderboard' : 'Ligas & Clasificación Global'}
                </h3>
                <p className={`text-xs uppercase tracking-wider ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                  {lang === 'en' 
                    ? 'Climb from Bronze to Mythic by earning XP with study and focus sessions' 
                    : 'Asciende de Bronce a Mítico sumando XP con tus sesiones de estudio y desintoxicación'}
                </p>
              </div>

              {/* USER STATS LEAGUE CARD */}
              <div className={`p-6 2xl:p-8 rounded-[32px] 2xl:rounded-[40px] border max-w-5xl 2xl:max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg ${
                isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/15 text-white'
              }`}>
                <div className="flex items-center gap-5 z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border shadow-md relative ${
                    userLeagueKey === 'mitico' ? 'bg-purple-500/20 border-purple-500/50' :
                    userLeagueKey === 'diamante' ? 'bg-sky-500/20 border-sky-500/50' :
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
                        {lang === 'en' ? 'LEAGUE' : 'LIGA'} {userCurrentTierObj.name.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-black uppercase text-emerald-500">
                        {lang === 'en' ? '● ACTIVE' : '● ACTIVA'}
                      </span>
                    </div>
                    <h4 className="text-xl font-black uppercase tracking-tight mt-1">{username || (lang === 'en' ? 'Your Profile' : 'Tu Perfil')}</h4>
                    <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                      {lang === 'en' ? 'You have' : 'Tienes'} <strong className="text-amber-500 font-black">{userXP} XP</strong> {lang === 'en' ? 'accumulated • Streak of' : 'acumulados • Racha de'} <strong>{loginStreak || 1} {lang === 'en' ? 'days' : 'días'}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 z-10">
                  <div className={`text-center px-5 py-3 rounded-2xl border ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className={`text-[9px] font-black uppercase tracking-widest block ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                      {lang === 'en' ? 'Level' : 'Nivel'}
                    </span>
                    <span className="text-lg font-black">{currentLevel}</span>
                  </div>
                  <div className={`text-center px-5 py-3 rounded-2xl border ${
                    isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                  }`}>
                    <span className={`text-[9px] font-black uppercase tracking-widest block ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                      {lang === 'en' ? 'Rank' : 'Posición'}
                    </span>
                    <span className="text-lg font-black text-amber-500">
                      #{sortedRankings.find(u => u.isMe)?.rank || 5}
                    </span>
                  </div>
                </div>
              </div>

              {/* LEAGUE SELECTOR TABS (Bronce, Plata, Oro, Diamante, Mítico) */}
              <div className="flex justify-center flex-wrap gap-2 max-w-5xl 2xl:max-w-6xl mx-auto">
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
                <div className="grid grid-cols-3 gap-4 2xl:gap-6 max-w-3xl 2xl:max-w-4xl mx-auto items-end pt-4">
                  
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
                    <span className="text-[9px] font-bold uppercase px-2.5 py-0.5 rounded-full border bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30">
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
              <div className={`max-w-5xl 2xl:max-w-6xl mx-auto rounded-[28px] 2xl:rounded-[36px] border overflow-hidden shadow-sm ${
                isLight ? 'border-zinc-200 bg-white text-zinc-900' : 'border-white/10 bg-[#0c0c0c] text-white'
              }`}>
                <div className={`p-4 border-b flex justify-between items-center text-[10px] font-black uppercase tracking-widest px-6 ${
                  isLight ? 'border-zinc-200 text-zinc-400 bg-zinc-50' : 'border-white/10 text-white/40'
                }`}>
                  <span>{lang === 'en' ? 'Rank, User & League' : 'Rango, Usuario & Liga'}</span>
                  <span>{lang === 'en' ? 'Focus Points (XP)' : 'Puntos de Enfoque (XP)'}</span>
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
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <FocuslyShopExpanded
              userDiamonds={userDiamonds}
              setUserDiamonds={setUserDiamonds}
              inventory={inventory}
              setInventory={setInventory}
              shopItemsList={shopItemsList}
              onOpenShopItem={onOpenShopItem}
              isLight={isLight}
              lang={lang}
            />
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* 5. PERFIL (PROFILE) VIEW */}
        {/* ======================================================== */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* USER HERO PROFILE CARD */}
            <div className={`p-8 2xl:p-12 rounded-[36px] 2xl:rounded-[44px] border flex flex-col md:flex-row items-center md:items-start justify-between gap-8 shadow-sm ${
              isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/10 text-white'
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col items-center">
                  <div className="my-1">
                    <FocuslyAvatar3D
                      avatarId={inventory?.equippedAvatar || 'a_base'}
                      outfitId={inventory?.equippedOutfit || 'outfit_base'}
                      accessoryId={inventory?.equippedAccessory || 'acc_none'}
                      size="lg"
                      showPedestal={true}
                      interactive={true}
                      className="scale-105 2xl:scale-115"
                    />
                  </div>
                  <span className="text-[10px] 2xl:text-xs font-black uppercase text-amber-500 mt-3 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 shadow-sm">
                    {TITLES.find(t => t.id === inventory?.equippedTitle)?.name || 'Guardián del Enfoque'}
                  </span>
                </div>
                <div className="text-center md:text-left space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h3 className="text-2xl 2xl:text-3xl font-black uppercase tracking-tight">{username || (lang === 'en' ? 'Focus Student' : 'Estudiante')}</h3>
                    <span className={`text-[10px] 2xl:text-xs font-black uppercase px-3 py-0.5 rounded-full border ${
                      isLight ? 'border-zinc-200 bg-zinc-50 text-zinc-700' : 'border-white/20 bg-white/10 text-white'
                    }`}>{lang === 'en' ? 'LEVEL' : 'NIVEL'} {currentLevel}</span>
                  </div>
                  <p className={`text-xs 2xl:text-sm uppercase font-bold tracking-wider ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>{userEmail || (lang === 'en' ? 'Anonymous Account' : 'Cuenta Anónima')}</p>
                  
                  {/* XP Bar */}
                  <div className="pt-3 flex items-center gap-3">
                    <div className={`w-48 2xl:w-64 h-2.5 rounded-full overflow-hidden border ${isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'}`}>
                      <div className={`h-full rounded-full transition-all ${isLight ? 'bg-zinc-900' : 'bg-white'}`} style={{ width: `${levelProgress}%` }} />
                    </div>
                    <span className="text-xs 2xl:text-sm font-black">{currentLevelXP} / 1000 XP</span>
                  </div>
                </div>
              </div>

              {/* Profile stats badges */}
              <div className="flex flex-wrap items-center justify-center gap-3 2xl:gap-4">
                <div className={`p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl border text-center min-w-[105px] 2xl:min-w-[130px] shadow-sm ${
                  isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                }`}>
                  <span className="text-2xl 2xl:text-3xl font-black">{loginStreak || 1}</span>
                  <span className={`text-[9px] 2xl:text-[10px] font-black uppercase tracking-wider block mt-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                    {lang === 'en' ? 'Day Streak' : 'Días Racha'}
                  </span>
                </div>
                <div className={`p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl border text-center min-w-[105px] 2xl:min-w-[130px] shadow-sm ${
                  isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                }`}>
                  <span className="text-2xl 2xl:text-3xl font-black">{completedCount || 0}</span>
                  <span className={`text-[9px] 2xl:text-[10px] font-black uppercase tracking-wider block mt-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                    {lang === 'en' ? 'Completed' : 'Retos Listos'}
                  </span>
                </div>
                <div className={`p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl border text-center min-w-[105px] 2xl:min-w-[130px] shadow-sm ${
                  isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                }`}>
                  <span className={`text-2xl 2xl:text-3xl font-black ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>{userDiamonds || 0}</span>
                  <span className={`text-[9px] 2xl:text-[10px] font-black uppercase tracking-wider block mt-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                    {lang === 'en' ? 'Diamonds' : 'Diamantes'}
                  </span>
                </div>
                <div 
                  onClick={() => setProfileSubView('insignias')}
                  className={`p-4 2xl:p-6 rounded-2xl 2xl:rounded-3xl border text-center min-w-[105px] 2xl:min-w-[130px] cursor-pointer hover:scale-105 transition-all shadow-sm ${
                    profileSubView === 'insignias'
                      ? (isLight ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm' : 'border-amber-400/50 bg-amber-500/15 text-amber-300')
                      : (isLight ? 'border-zinc-200 bg-zinc-50 hover:border-zinc-300' : 'border-white/10 bg-white/5 hover:border-white/20')
                  }`}
                  title={lang === 'en' ? 'View Badges' : 'Ver Insignias'}
                >
                  <span className="text-2xl 2xl:text-3xl font-black text-amber-500 flex items-center justify-center gap-1">
                    <Award size={20} />
                    {BADGES.filter(b => (inventory?.unlockedBadges || []).includes(b.id) || (b.check && b.check({ userXP, completedCount, loginStreak, activityLog, selectedApps, calendarTasks }).unlocked)).length}
                  </span>
                  <span className={`text-[9px] 2xl:text-[10px] font-black uppercase tracking-wider block mt-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                    {lang === 'en' ? 'Badges' : 'Insignias'}
                  </span>
                </div>
              </div>
            </div>

            {/* PROFILE SUB-VIEW TOGGLE: OBJETOS VS INSIGNIAS VS CAMINO DE TROFEOS */}
            <div className="flex justify-center">
              <div className={`inline-flex items-center gap-2 p-1.5 rounded-full border backdrop-blur-md shadow-sm ${
                isLight ? 'bg-zinc-100 border-zinc-200/80' : 'bg-black/80 border-white/10'
              }`}>
                <button
                  onClick={() => setProfileSubView('inventario')}
                  className={`px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    profileSubView === 'inventario'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  {lang === 'en' ? 'Items & Inventory' : 'Objetos & Inventario'}
                </button>
                <button
                  onClick={() => setProfileSubView('insignias')}
                  className={`px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    profileSubView === 'insignias'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  <Award size={14} className="text-amber-500" />
                  <span>{lang === 'en' ? 'Badges & Quests' : 'Insignias & Retos'}</span>
                </button>
                <button
                  onClick={() => setProfileSubView('progression')}
                  className={`px-7 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    profileSubView === 'progression'
                      ? (isLight ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200/80' : 'bg-white text-black shadow-lg shadow-white/10')
                      : (isLight ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/40' : 'text-white/40 hover:text-white hover:bg-white/5')
                  }`}
                >
                  <Sparkles size={14} className="text-amber-500" />
                  <span>{lang === 'en' ? 'Trophy Road' : 'Camino de Trofeos'}</span>
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
                  lang={lang}
                  onNavigateCrece={() => setActiveTab('crece')}
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
                  <h4 className="text-lg font-black uppercase tracking-tight">
                    {lang === 'en' ? 'Item Inventory' : 'Inventario de Objetos'}
                  </h4>
                  <div className={`flex flex-wrap gap-1.5 p-1 rounded-xl border ${
                    isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'
                  }`}>
                    <button
                      onClick={() => setInventoryTab('avatar')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'avatar'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      {lang === 'en' ? 'Avatars' : 'Avatares'}
                    </button>
                    <button
                      onClick={() => setInventoryTab('outfit')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'outfit'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      {lang === 'en' ? 'Outfits' : 'Trajes'}
                    </button>
                    <button
                      onClick={() => setInventoryTab('accessory')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'accessory'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      {lang === 'en' ? 'Accessories' : 'Accesorios'}
                    </button>
                    <button
                      onClick={() => setInventoryTab('background')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'background'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      {lang === 'en' ? 'Backgrounds' : 'Fondos'}
                    </button>
                    <button
                      onClick={() => setInventoryTab('title')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                        inventoryTab === 'title'
                          ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black')
                          : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40')
                      }`}
                    >
                      {lang === 'en' ? 'Titles' : 'Títulos'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {(shopItemsList || [])
                    .filter(item => (item.type || item.category) === inventoryTab)
                    .map((item, itemIdx) => {
                      const itemType = item.type || item.category;
                      const isEquipped = 
                        (itemType === 'avatar' && inventory?.equippedAvatar === item.id) ||
                        (itemType === 'outfit' && inventory?.equippedOutfit === item.id) ||
                        (itemType === 'accessory' && inventory?.equippedAccessory === item.id) ||
                        ((itemType === 'background' || itemType === 'environment') && inventory?.equippedBg === item.id) ||
                        (itemType === 'title' && inventory?.equippedTitle === item.id);

                      const isOwned = item.price === 0 || 
                        (itemType === 'avatar' && (inventory?.avatars || ['a_base']).includes(item.id)) ||
                        (itemType === 'outfit' && ((inventory?.unlockedOutfits || []).includes(item.id) || (inventory?.outfits || []).includes(item.id))) ||
                        (itemType === 'accessory' && ((inventory?.unlockedAccessories || []).includes(item.id) || (inventory?.accessories || []).includes(item.id))) ||
                        (itemType === 'title' && ((inventory?.unlockedTitles || []).includes(item.id) || (inventory?.titles || []).includes(item.id))) ||
                        ((itemType === 'background' || itemType === 'environment') && (inventory?.backgrounds || []).includes(item.id)) ||
                        (inventory?.ownedItems || []).includes(item.id);

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
                              ) : itemType === 'background' && AvatarDisplay ? (
                                <div className="w-full h-full rounded-xl overflow-hidden relative">
                                  <AvatarDisplay id={item.id} className="w-full h-full object-cover" />
                                </div>
                              ) : itemType === 'background' && backgroundsData?.[item.id]?.css ? (
                                <div className={`w-full h-full rounded-xl ${backgroundsData[item.id].css} flex items-center justify-center border border-white/20`}>
                                  <Sparkles size={16} className="text-white/60" />
                                </div>
                              ) : (
                                <span className="text-3xl">{item.icon || (itemType === 'outfit' ? '🥋' : itemType === 'accessory' ? '✨' : itemType === 'title' ? '🏷️' : '🛡️')}</span>
                              )}
                            </div>
                            <h5 className="text-xs font-black uppercase mt-1 line-clamp-1">{item.name}</h5>
                          </div>
                          <div onClick={(e) => e.stopPropagation()} className="mt-2">
                            {isEquipped ? (
                              <span className={`text-[10px] font-black uppercase text-center block py-2 ${isLight ? 'text-zinc-600' : 'text-white/60'}`}>
                                {lang === 'en' ? '✓ Equipped' : '✓ Equipado'}
                              </span>
                            ) : isOwned ? (
                              <button
                                onClick={() => {
                                  if (itemType === 'avatar') setInventory(p => ({ ...p, equippedAvatar: item.id }));
                                  if (itemType === 'outfit') setInventory(p => ({ ...p, equippedOutfit: item.id }));
                                  if (itemType === 'accessory') setInventory(p => ({ ...p, equippedAccessory: item.id }));
                                  if (itemType === 'background' || itemType === 'environment') setInventory(p => ({ ...p, equippedBg: item.id }));
                                  if (itemType === 'title') setInventory(p => ({ ...p, equippedTitle: item.id }));
                                }}
                                className={`w-full py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                                  isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                                }`}
                              >
                                {lang === 'en' ? 'Equip' : 'Equipar'}
                              </button>
                            ) : (
                              <button
                                onClick={() => onOpenInventoryItem?.(item)}
                                className={`w-full py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-center block border transition-all cursor-pointer ${
                                  isLight ? 'border-zinc-300 text-zinc-600 hover:bg-zinc-100' : 'border-white/10 text-white/50 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                {lang === 'en' ? 'Unlock' : 'Desbloquear'}
                              </button>
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
                <h4 className="text-lg font-black uppercase tracking-tight">
                  {lang === 'en' ? 'Settings' : 'Configuración'}
                </h4>

                <div className="space-y-4">
                  {/* Language */}
                  <div className={`flex justify-between items-center p-4 rounded-2xl border ${
                    isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                  }`}>
                    <div>
                      <h5 className="text-xs font-black uppercase">
                        {lang === 'en' ? 'Language' : 'Idioma'}
                      </h5>
                      <span className={`text-[10px] ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>{lang === 'es' ? 'Español' : 'English'}</span>
                    </div>
                    <button
                      onClick={() => setLang?.(lang === 'es' ? 'en' : 'es')}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-black uppercase ${
                        isLight ? 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100 shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {lang === 'es' ? 'Switch to EN' : 'Cambiar a ES'}
                    </button>
                  </div>

                  {/* Theme */}
                  <div className={`flex justify-between items-center p-4 rounded-2xl border ${
                    isLight ? 'border-zinc-200 bg-zinc-50' : 'border-white/10 bg-white/5'
                  }`}>
                    <div>
                      <h5 className="text-xs font-black uppercase">
                        {lang === 'en' ? 'Visual Theme' : 'Tema Visual'}
                      </h5>
                      <span className={`text-[10px] ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                        {isLight 
                          ? (lang === 'en' ? 'Light Mode' : 'Modo Claro') 
                          : (lang === 'en' ? 'Dark Mode' : 'Modo Oscuro')}
                      </span>
                    </div>
                    <button
                      onClick={toggleMode}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-black uppercase ${
                        isLight ? 'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-100 shadow-sm' : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      {isLight 
                        ? (lang === 'en' ? 'Switch to Dark' : 'Activar Oscuro') 
                        : (lang === 'en' ? 'Switch to Light' : 'Activar Claro')}
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
                      {lang === 'en' ? 'Save Progress / Create Account' : 'Guardar Progreso / Crear Cuenta'}
                    </button>
                  ) : (
                    <button
                      onClick={onSignOut}
                      className="w-full py-3.5 rounded-2xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut size={16} />
                      <span>{lang === 'en' ? 'Sign Out' : 'Cerrar Sesión'}</span>
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
                        {lang === 'en' ? 'Privacy' : 'Privacidad'}
                      </button>
                    )}
                    {onOpenTerms && (
                      <button
                        onClick={onOpenTerms}
                        className={`flex-1 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider transition-all text-center ${
                          isLight ? 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 bg-white' : 'border-white/10 text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {lang === 'en' ? 'Terms' : 'Términos'}
                      </button>
                    )}
                  </div>

                  <button
                    onClick={onOpenLanding}
                    className={`w-full py-3 rounded-2xl border font-black uppercase text-[11px] tracking-widest transition-all ${
                      isLight ? 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 bg-white shadow-sm' : 'border-white/10 text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {lang === 'en' ? 'View Landing Page' : 'Ver Página Informativa'}
                  </button>
                </div>
              </div>

            </div>
            )}

            {/* SUB-VIEW 3: CAMINO DE TROFEOS & PROGRESIÓN */}
            {profileSubView === 'progression' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <FocuslyProgressionRoad
                  userXP={userXP}
                  userDiamonds={userDiamonds}
                  isLight={isLight}
                  lang={lang}
                />
              </motion.div>
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
                  <div className="w-full h-full flex items-center justify-center text-white/40">
                    {lang === 'en' ? 'Video unavailable' : 'Video no disponible'}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className={`text-xs font-black uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                  {lang === 'en' ? 'Key Insights' : 'Ideas Clave'}
                </h4>
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
                className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-sm cursor-pointer ${
                  isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                }`}
              >
                {lang === 'en' ? 'Close & Apply Insight' : 'Cerrar y Aplicar Consejo'}
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
                <h3 className="text-xl font-black uppercase tracking-tight">
                  {lang === 'en' ? 'New Post' : 'Nueva Publicación'}
                </h3>
                <button onClick={() => setShowCreatePost(false)} className={`p-2 rounded-full cursor-pointer ${isLight ? 'hover:bg-zinc-100 text-zinc-500' : 'hover:bg-white/10 text-white'}`}>
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                    {lang === 'en' ? 'Category' : 'Categoría'}
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {['Estudio', 'Hábitos', 'Desahogo', 'Logros'].map(tag => {
                      const tagLabel = tag === 'Estudio' 
                        ? (lang === 'en' ? 'Study' : 'Estudio') 
                        : (tag === 'Hábitos' ? (lang === 'en' ? 'Habits' : 'Hábitos')
                          : (tag === 'Desahogo' ? (lang === 'en' ? 'Vent / Support' : 'Desahogo')
                            : (lang === 'en' ? 'Achievements' : 'Logros')));
                      return (
                        <button
                          key={tag}
                          onClick={() => setNewPostTag(tag)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                            newPostTag === tag
                              ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black')
                              : (isLight ? 'border border-zinc-200 text-zinc-600 hover:bg-zinc-50' : 'border border-white/10 text-white/50')
                          }`}
                        >
                          {tagLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                    {lang === 'en' ? 'Content' : 'Contenido'}
                  </label>
                  <textarea
                    rows={4}
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    placeholder={lang === 'en' ? 'Share your experience, an achievement, or advice with the community...' : 'Comparte tu experiencia, un logro o un consejo con la comunidad...'}
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
                  className={`flex-1 py-3.5 rounded-xl border font-black uppercase text-xs tracking-widest cursor-pointer ${
                    isLight ? 'border-zinc-200 text-zinc-700 hover:bg-zinc-50' : 'border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {lang === 'en' ? 'Cancel' : 'Cancelar'}
                </button>
                <button
                  disabled={!newPostContent.trim()}
                  onClick={() => {
                    if (newPostContent.trim()) {
                      setForumPosts(p => [
                        {
                          id: `p_${Date.now()}`,
                          user: username || (lang === 'en' ? 'You' : 'Tú'),
                          tag: newPostTag,
                          content: newPostContent.trim(),
                          likes: 0,
                          comments: [],
                          time: lang === 'en' ? 'Just now' : 'Justo ahora'
                        },
                        ...(p || [])
                      ]);
                      setNewPostContent('');
                      setShowCreatePost(false);
                    }
                  }}
                  className={`flex-1 py-3.5 rounded-xl font-black uppercase text-xs tracking-widest disabled:opacity-30 disabled:cursor-not-allowed shadow-sm cursor-pointer ${
                    isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                  }`}
                >
                  {lang === 'en' ? 'Publish' : 'Publicar'}
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
            onClose={() => {
              setSelectedMasteryCourse(null);
              setSelectedMasteryInitialClass(null);
              setSelectedMasteryInitialChallenge(null);
            }}
            initialClass={selectedMasteryInitialClass}
            initialUnitChallenge={selectedMasteryInitialChallenge}
            isLight={isLight}
          />
        )}
      </AnimatePresence>

      {/* FOCUSLY CELEBRATION REWARD MODAL */}
      <FocuslyCelebrationModal
        isOpen={!!celebrationData}
        onClose={() => setCelebrationData(null)}
        title={celebrationData?.title}
        subtitle={celebrationData?.subtitle}
        xpGained={celebrationData?.xpGained}
        diamondsGained={celebrationData?.diamondsGained}
        unlockedItem={celebrationData?.unlockedItem}
        badge={celebrationData?.badge}
        isLight={isLight}
      />

    </div>
  );
};
