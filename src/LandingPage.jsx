import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocuslyLogo, FocuslyIcon } from './components/FocuslyLogo';
import { AppleNav } from './components/landing/AppleNav';
import { AppleExperience } from './components/landing/AppleExperience';
import { ProductivityPage } from './components/landing/ProductivityPage';
import { FocuslyProPage } from './components/landing/FocuslyProPage';
import { MoreInfoPage } from './components/landing/MoreInfoPage';
import { AppleStorySection } from './components/landing/AppleStorySection';
import { LiveInteractiveSandbox } from './components/landing/LiveInteractiveSandbox';
import { MasterySystemShowcase } from './components/landing/MasterySystemShowcase';
import { PricingROISection } from './components/landing/PricingROISection';
import { AppleFooter } from './components/landing/AppleFooter';
import { Didactic3DFocusLab } from './components/Didactic3DFocusLab';
import { AppleCompareSlider } from './components/AppleCompareSlider';
import { InteractiveFocusGauge } from './components/InteractiveFocusGauge';
import { SeoManager } from './components/SeoManager';

const focuslySlogan = '/focusly-slogan.svg';

import {
  ArrowRight, Sparkles, Play, CheckCircle2,
  Smartphone, Trophy, Target, TrendingUp, Shield, Flame, Crown,
  Zap, Search, ChevronDown, Check, Volume2, ShieldCheck, Lock, Unlock,
  Layers, Compass, Laptop, Brain, Gem, Gift, RefreshCw, Star
} from 'lucide-react';

// --- INTERACTIVE PHONE MOCKUP (APPLE 3D TILT WITH REAL OS SIMULATION) ---
export const InteractivePhoneMockup = ({ onFinish, lang = 'es' }) => {
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState('pomodoro');
  const [seconds, setSeconds] = useState(1500); // 25:00
  const [isRunning, setIsRunning] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 14,
      y: (x / (rect.width / 2)) * 14,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };
  
  useEffect(() => {
    let interval = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const [blockedState, setBlockedState] = useState({
    instagram: true,
    tiktok: true,
    youtube: false,
    twitter: true
  });

  const toggleAppBlock = (app) => {
    setBlockedState(prev => ({ ...prev, [app]: !prev[app] }));
  };

  const [aiQuery, setAiQuery] = useState('habito');
  const aiResponses = isEn ? {
    habito: "💡 'Apply the 50/10 rule: 50 minutes of deep focus and 10 minutes of active screen-free rest.'",
    distraccion: "🛡️ 'The urge to check notifications lasts only 90 seconds. Take 3 deep breaths and stay in flow.'",
    examen: "📚 'For exams, create summary concept maps and complete 3 Pomodoro sprints before dinner.'"
  } : {
    habito: "💡 'Aplica la regla 50/10: 50 minutos de concentración pura y 10 minutos de descanso activo sin pantallas.'",
    distraccion: "🛡️ 'El impulso de abrir redes dura solo 90 segundos. Respira profundo 3 veces y mantén el foco.'",
    examen: "📚 'Para tus exámenes, usa mapas conceptuales y completa 3 bloques de Pomodoro antes de cenar.'"
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-4 group"
      style={{ perspective: '1200px' }}
    >
      <motion.div 
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: [-6, 6, -6]
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 300, damping: 25 },
          rotateY: { type: "spring", stiffness: 300, damping: 25 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative w-full max-w-[325px] aspect-[9/18.5] bg-black rounded-[52px] p-3 border-[4px] border-white/25 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(255,255,255,0.1)] overflow-hidden transition-shadow group-hover:shadow-[0_40px_100px_rgba(255,255,255,0.15)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Dynamic Island Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-between px-3 border border-white/20 shadow-md">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/20" />
        </div>

        {/* Screen Container */}
        <div className="w-full h-full bg-black rounded-[42px] overflow-hidden flex flex-col pt-10 px-4 pb-4 text-white relative border border-white/15">
        
          {/* Header App Bar inside Phone */}
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <FocuslyIcon size={22} className="drop-shadow-sm" />
              <div>
                <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest block leading-none">Focusly Live</span>
                <h4 className="text-xs font-black uppercase tracking-tight">{isEn ? 'Focus Pro' : 'Estudio Pro'}</h4>
              </div>
            </div>
            <div className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/25 text-white text-[8px] font-black uppercase flex items-center gap-1">
              <Flame size={10} className="fill-white" /> {isEn ? 'Streak: 14d' : 'Racha: 14d'}
            </div>
          </div>

          {/* Tab Selector Buttons inside Phone */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-900 rounded-xl border border-white/10 mb-3 text-[8px] font-black uppercase text-center">
            <button 
              onClick={() => setActiveTab('pomodoro')} 
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'pomodoro' ? 'bg-white text-black shadow-md font-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Timer
            </button>
            <button 
              onClick={() => setActiveTab('blocker')} 
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'blocker' ? 'bg-white text-black shadow-md font-black' : 'text-zinc-400 hover:text-white'}`}
            >
              {isEn ? 'Block' : 'Bloqueo'}
            </button>
            <button 
              onClick={() => setActiveTab('ai')} 
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'ai' ? 'bg-white text-black shadow-md font-black' : 'text-zinc-400 hover:text-white'}`}
            >
              Coach
            </button>
            <button 
              onClick={() => setActiveTab('ranks')} 
              className={`py-1.5 rounded-lg transition-all cursor-pointer ${activeTab === 'ranks' ? 'bg-white text-black shadow-md font-black' : 'text-zinc-400 hover:text-white'}`}
            >
              {isEn ? 'Rank' : 'Nivel'}
            </button>
          </div>

          {/* TAB 1: POMODORO TIMER SIMULATOR */}
          {activeTab === 'pomodoro' && (
            <div className="flex-1 flex flex-col justify-between bg-zinc-950 border border-white/15 rounded-2xl p-4">
              <div className="text-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 block mb-1">
                  {isEn ? 'Deep Focus Session' : 'Sesión de Concentración'}
                </span>
                <div className="text-4xl font-black tracking-wider text-white font-mono my-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                  {formatTime(seconds)}
                </div>
                <span className="text-[8px] text-zinc-400 uppercase font-bold">
                  {isEn ? (isRunning ? 'Status: Active Focus' : 'Status: Paused') : (isRunning ? 'Estado: Enfoque Activo' : 'Estado: Pausado')}
                </span>
              </div>

              {/* Sound Wave Animation Visualizer (GPU Compositor Accelerated) */}
              <div className="flex items-center justify-center gap-1 h-6 my-1">
                {[0.4, 0.9, 0.6, 1.0, 0.5, 0.8, 0.6, 0.95, 0.4, 0.75].map((scale, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: isRunning ? [0.25, scale, 0.25] : 0.15 }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.07, ease: "easeInOut" }}
                    className="w-1 h-6 bg-white rounded-full origin-bottom transform-gpu"
                  />
                ))}
              </div>

              <div className="flex justify-center gap-2 my-1">
                <button 
                  onClick={() => setIsRunning(!isRunning)} 
                  className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${isRunning ? 'bg-white text-black font-black' : 'bg-white text-black font-black hover:bg-zinc-200'}`}
                >
                  {isEn ? (isRunning ? 'Pause' : 'Start') : (isRunning ? 'Pausar' : 'Iniciar')}
                </button>
                <button 
                  onClick={() => { setIsRunning(false); setSeconds(1500); }} 
                  className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer border border-white/10"
                >
                  Reset
                </button>
              </div>

              <div className="bg-black border border-white/10 rounded-xl p-2 text-[8px] flex justify-between items-center">
                <span className="text-zinc-400 font-bold">{isEn ? 'Reward:' : 'Recompensa:'}</span>
                <span className="text-white font-black flex items-center gap-1"><Zap size={10} className="fill-white" /> +150 XP</span>
              </div>
            </div>
          )}

          {/* TAB 2: BLOCKER SIMULATOR */}
          {activeTab === 'blocker' && (
            <div className="flex-1 flex flex-col justify-between space-y-2 overflow-y-auto pr-1">
              <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest block">
                {isEn ? 'Application Limits' : 'Límites de Aplicaciones'}
              </span>
              {[
                { id: 'instagram', name: 'Instagram', sub: isEn ? 'Limit: 15m/day' : 'Límite: 15m/día' },
                { id: 'tiktok', name: 'TikTok', sub: isEn ? 'Limit: Fully Blocked' : 'Límite: Bloqueado total' },
                { id: 'youtube', name: 'YouTube', sub: isEn ? 'Limit: 30m/day' : 'Límite: 30m/día' },
                { id: 'twitter', name: 'X / Twitter', sub: isEn ? 'Limit: 10m/day' : 'Límite: 10m/día' },
              ].map((app) => {
                const isBlocked = blockedState[app.id];
                return (
                  <div key={app.id} className="bg-zinc-900 border border-white/10 rounded-xl p-2 flex justify-between items-center">
                    <div>
                      <h6 className="text-[9px] font-black uppercase text-white">{app.name}</h6>
                      <span className="text-[7px] text-zinc-400 font-medium block">{app.sub}</span>
                    </div>
                    <button 
                      onClick={() => toggleAppBlock(app.id)}
                      className={`w-10 h-5.5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${isBlocked ? 'bg-white' : 'bg-zinc-700'}`}
                    >
                      <motion.div 
                        layout
                        className={`w-4.5 h-4.5 rounded-full ${isBlocked ? 'bg-black ml-auto' : 'bg-white mr-auto'}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 3: AI COACH SIMULATOR */}
          {activeTab === 'ai' && (
            <div className="flex-1 flex flex-col justify-between space-y-2">
              <span className="text-[8px] font-black uppercase text-white tracking-widest block">
                {isEn ? 'AI Behavioral Coach' : 'Asistente Conductual IA'}
              </span>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {[
                  { id: 'habito', label: isEn ? 'Habit' : 'Hábito' },
                  { id: 'distraccion', label: isEn ? 'Distraction' : 'Distracción' },
                  { id: 'examen', label: isEn ? 'Exam' : 'Examen' },
                ].map(q => (
                  <button
                    key={q.id}
                    onClick={() => setAiQuery(q.id)}
                    className={`px-2.5 py-1 rounded-lg text-[8px] font-black uppercase tracking-wider shrink-0 transition-all cursor-pointer ${aiQuery === q.id ? 'bg-white text-black' : 'bg-white/10 text-white/70'}`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              <div className="bg-zinc-950 border border-white/15 rounded-xl p-3 flex-1 flex flex-col justify-center">
                <p className="text-[9px] text-zinc-200 font-medium leading-relaxed italic">
                  {aiResponses[aiQuery]}
                </p>
              </div>

              <button 
                onClick={onFinish}
                className="w-full py-2 bg-white text-black font-black text-[8px] uppercase tracking-widest rounded-xl cursor-pointer hover:bg-zinc-200 transition-colors"
              >
                {isEn ? 'Open App →' : 'Abrir App →'}
              </button>
            </div>
          )}

          {/* TAB 4: RANKS SIMULATOR */}
          {activeTab === 'ranks' && (
            <div className="flex-1 flex flex-col justify-between space-y-2 text-center p-1">
              <div className="w-14 h-14 rounded-2xl bg-white text-black mx-auto flex items-center justify-center shadow-lg">
                <Crown size={28} />
              </div>
              <div>
                <span className="text-[8px] font-black uppercase text-zinc-400 tracking-widest block">
                  {isEn ? 'Elite Rank' : 'Rango Élite'}
                </span>
                <h5 className="text-xs font-black uppercase text-white">
                  {isEn ? 'Focus Commander' : 'Comandante de Foco'}
                </h5>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[7px] font-black text-zinc-400">
                  <span>{isEn ? 'Current XP: 4,850' : 'XP Actual: 4,850'}</span>
                  <span>{isEn ? 'Target: 5,000' : 'Meta: 5,000'}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                  <div className="w-[92%] h-full bg-white rounded-full" />
                </div>
              </div>
              <button 
                onClick={onFinish}
                className="w-full py-2 bg-white text-black font-black text-[8px] uppercase tracking-widest rounded-xl cursor-pointer hover:bg-zinc-200 shadow-md"
              >
                {isEn ? 'View App Rewards' : 'Ver Recompensas en App'}
              </button>
            </div>
          )}

          {/* Home Indicator Bar */}
          <div className="w-24 h-1 bg-white/30 rounded-full mx-auto mt-2 shrink-0" />
        </div>
      </motion.div>
    </div>
  );
};

// --- FAQ INTERACTIVO MONOCROMÁTICO CON BUSCADOR ---
export const InteractiveFAQ = ({ lang = 'es' }) => {
  const isEn = lang === 'en';
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = isEn ? [
    {
      q: 'Why does Focusly use a minimalist black-and-white design?',
      a: 'Excessive visual stimulation in social media apps retains your attention with saturated colors and urgent red badges. Our high-end monochrome design eliminates cognitive noise so you can direct 100% of your attention to what matters.'
    },
    {
      q: 'How do the Duolingo-style Mastery tracks work?',
      a: 'Interactive paths with concise lessons, key concepts, quick interactive quizzes, and milestone chests to master deep work, neuroscience of focus, active recall, and personal productivity.'
    },
    {
      q: 'How does the 30-day money-back guarantee work?',
      a: 'If within the first 30 days you feel Focusly has not helped you reclaim at least 2 hours of daily concentration, we issue a 100% refund with zero questions asked.'
    },
    {
      q: 'Can I synchronize my account across multiple devices?',
      a: 'Yes. You can use Focusly seamlessly across desktop, tablet, and mobile browsers while keeping your streaks, XP, level progression, and app limits synchronized in real time.'
    },
    {
      q: 'What happens when I click "Open App"?',
      a: 'You enter the full application environment immediately, where you can complete onboarding and start your first focus sprint right away.'
    }
  ] : [
    {
      q: '¿Por qué Focusly adopta un diseño minimalista en blanco y negro?',
      a: 'La estimulación visual excesiva de las redes sociales busca retener tu atención con colores saturados y alertas rojas. Nuestro diseño monocromático de alta gama reduce el ruido cognitivo para que te concentres exclusivamente en lo que importa.'
    },
    {
      q: '¿Cómo funciona la sección de Maestrías estilo Duolingo?',
      a: 'Cuenta con rutas interactivas con vídeos didácticos, conceptos clave resumidos, quizzes dinámicos y cofres de recompensas para dominar computación, neurociencia, active recall y productividad personal.'
    },
    {
      q: '¿Cómo funciona la garantía de satisfacción de 30 días?',
      a: 'Si durante los primeros 30 días consideras que Focusly Pro no te ha ayudado a recuperar al menos 2 horas de concentración diaria, te reembolsamos el 100% de tu dinero sin preguntas.'
    },
    {
      q: '¿Puedo sincronizar mi cuenta en varios dispositivos?',
      a: 'Sí. Puedes utilizar Focusly en tu navegador web de escritorio, tablet y smartphone manteniendo tus rachas, XP y configuraciones de bloqueo sincronizadas al instante.'
    },
    {
      q: '¿Qué sucede al hacer clic en "Abrir App"?',
      a: 'Accederás directamente al entorno de la aplicación, donde podrás realizar el onboarding interactivo y comenzar tu primera sesión de concentración.'
    }
  ];

  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(searchTerm.toLowerCase()) || f.a.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div id="faq" className="space-y-8 max-w-3xl mx-auto pt-8">
      <div className="text-center space-y-3">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {isEn ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          {isEn ? 'Common Inquiries' : 'Dudas Habituales'}
        </h2>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={17} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isEn ? "SEARCH FREQUENTLY ASKED QUESTIONS..." : "BUSCAR EN PREGUNTAS FRECUENTES..."}
          className="w-full bg-black border border-white/20 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold text-white placeholder-zinc-500 outline-none focus:border-white transition-all shadow-inner"
        />
      </div>

      <div className="divide-y divide-white/10 border-y border-white/10">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4">
              <button 
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                className="w-full py-2 text-left flex justify-between items-center gap-4 font-black uppercase text-xs tracking-tight text-white hover:text-zinc-300 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-white' : 'text-zinc-500'}`} />
              </button>
              {isOpen && (
                <div className="pb-3 text-xs text-zinc-400 font-medium leading-relaxed pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// =========================================================================
// MAIN LANDING PAGE COMPONENT (TABBED ARCHITECTURE, APPLE MINIMALIST MONOCHROME)
// =========================================================================
export default function LandingPage({ 
  onFinish = () => {}, 
  lang: propLang, 
  setLang: propSetLang 
}) {
  const [currentTab, setCurrentTab] = useState('inicio');
  const [internalLang, setInternalLang] = useState(() => {
    return propLang || localStorage.getItem('focusly_lang') || 'es';
  });

  const lang = propLang || internalLang;

  const handleToggleLang = (newLang) => {
    setInternalLang(newLang);
    try {
      localStorage.setItem('focusly_lang', newLang);
    } catch (e) {
      console.warn('Could not save language to localStorage', e);
    }
    if (propSetLang) {
      propSetLang(newLang);
    }
  };

  const handleSelectTab = (tabId) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden font-['Inter',sans-serif]">
      {/* Reactive SEO and Social Sharing Head Manager */}
      <SeoManager currentTab={currentTab} lang={lang} isApp={false} />
      
      {/* 1. APPLE NAVIGATION BAR WITH TAB SELECTOR & LANGUAGE SWITCHER */}
      <AppleNav 
        onFinish={onFinish} 
        activeTab={currentTab} 
        onSelectTab={handleSelectTab}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* TAB CONTENT WITH ANIMATION */}
      <main className="pt-16 lg:pt-20">
        <AnimatePresence mode="wait">
          
          {/* ================================================================= */}
          {/* TAB 1: INICIO */}
          {/* ================================================================= */}
          {currentTab === 'inicio' && (
            <motion.div
              key={`inicio-${lang}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <AppleExperience 
                onFinish={onFinish} 
                onSelectTab={handleSelectTab}
                lang={lang}
              />
            </motion.div>
          )}

          {/* ================================================================= */}
          {/* TAB 2: PRODUCTIVIDAD */}
          {/* ================================================================= */}
          {currentTab === 'productividad' && (
            <motion.div
              key={`productividad-${lang}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ProductivityPage 
                onFinish={onFinish} 
                onSelectTab={handleSelectTab}
                lang={lang}
              />
            </motion.div>
          )}

          {/* ================================================================= */}
          {/* TAB 3: MÁS INFORMACIÓN */}
          {/* ================================================================= */}
          {currentTab === 'mas_info' && (
            <motion.div
              key={`mas_info-${lang}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <MoreInfoPage 
                onFinish={onFinish} 
                onSelectTab={handleSelectTab}
                lang={lang}
              />
            </motion.div>
          )}

          {/* ================================================================= */}
          {/* TAB 4: PLANES / FOCUSLY PRO */}
          {/* ================================================================= */}
          {currentTab === 'focusly_pro' && (
            <motion.div
              key={`focusly_pro-${lang}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <FocuslyProPage 
                onFinish={onFinish} 
                onSelectTab={handleSelectTab}
                lang={lang}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* 14. FOOTER ESTILO APPLE CON NAVEGACIÓN ENTRE PESTAÑAS Y SELECTOR DE IDIOMA */}
      <AppleFooter 
        onFinish={onFinish} 
        onSelectTab={handleSelectTab}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

    </div>
  );
}
