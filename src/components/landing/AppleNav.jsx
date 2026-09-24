import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FocuslyLogo, FocuslyIcon } from '../FocuslyLogo';
import { 
  ArrowRight, Sparkles, Menu, X, Shield, Brain, 
  Crown, Play, ChevronRight, Zap, Globe
} from 'lucide-react';

export function AppleNav({ 
  onFinish, 
  activeTab = 'inicio', 
  onSelectTab = () => {},
  lang = 'es',
  onToggleLang = () => {}
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isEn = lang === 'en';

  const TABS = [
    { id: 'inicio', label: isEn ? 'Home' : 'Inicio', badge: null },
    { id: 'productividad', label: isEn ? 'Productivity' : 'Productividad', badge: null },
    { id: 'mas_info', label: isEn ? 'Overview' : 'Más información', badge: null },
    { id: 'focusly_pro', label: isEn ? 'Plans' : 'Planes', badge: 'PRO' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Primary Global Nav */}
      <div className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-2xl border-b border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.9)]' 
          : 'bg-black/60 backdrop-blur-xl border-b border-white/10'
      }`}>
        <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto px-4 sm:px-8 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleTabClick('inicio')}
              className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <FocuslyIcon size={34} className="drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)]" />
              <span className="text-sm lg:text-base font-black tracking-[0.18em] uppercase text-white">FOCUSLY</span>
            </button>
          </div>

          {/* Desktop Navigation Tabs (Apple Style Minimalist Pills) */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 p-1 lg:p-1.5 rounded-full bg-white/5 border border-white/10">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`px-4 py-2 lg:px-6 lg:py-2.5 rounded-full text-xs lg:text-sm font-bold tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black shadow-[0_2px_14px_rgba(255,255,255,0.25)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9px] lg:text-[10px] font-black px-1.5 py-0.5 rounded-full uppercase ${
                      isActive ? 'bg-black text-white' : 'bg-white/15 text-zinc-300'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            {/* Language Switcher Button */}
            <button
              onClick={() => onToggleLang(isEn ? 'es' : 'en')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 lg:px-3.5 lg:py-2 rounded-full border border-white/15 hover:border-white/30 text-xs font-bold text-zinc-200 hover:text-white transition-all cursor-pointer bg-white/5 hover:bg-white/10 active:scale-95"
              title={isEn ? 'Cambiar a Español' : 'Switch to English'}
            >
              <Globe size={14} className="text-sky-400" />
              <span className="uppercase text-[11px] font-black tracking-wider">{isEn ? 'ES' : 'EN'}</span>
            </button>

            <button 
              onClick={onFinish}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-zinc-300 hover:text-white px-4 py-2 lg:px-5 lg:py-2.5 rounded-full border border-white/15 hover:border-white/30 transition-all cursor-pointer"
            >
              {isEn ? 'Sign In' : 'Iniciar Sesión'}
            </button>

            <button 
              onClick={onFinish}
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 text-xs lg:text-sm font-bold tracking-tight px-4 sm:px-5 py-2 lg:px-6 lg:py-2.5 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isEn ? 'Start Focusing' : 'Comenzar Ahora'}</span>
              <ArrowRight size={14} strokeWidth={2.5} />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-400 hover:text-white cursor-pointer"
              aria-label={isEn ? 'Open menu' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6 space-y-4"
          >
            <div className="flex flex-col space-y-2 text-sm font-medium text-zinc-300">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1 block">
                {isEn ? 'Available Sections' : 'Secciones Disponibles'}
              </span>
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button 
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)} 
                    className={`text-left py-2.5 px-3 rounded-xl border flex items-center justify-between text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-white text-black border-white' 
                        : 'border-white/10 text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-black text-white' : 'bg-white/15 text-zinc-300'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  onToggleLang(isEn ? 'es' : 'en');
                  setMobileMenuOpen(false);
                }}
                className="w-full border border-white/20 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Globe size={14} className="text-sky-400" />
                <span>{isEn ? 'Idioma: Español (Cambiar)' : 'Language: English (Switch)'}</span>
              </button>

              <button 
                onClick={onFinish}
                className="w-full bg-white text-black py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{isEn ? 'Start Focusing' : 'Comenzar Ahora'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
