import React from 'react';
import { FocuslyLogo, FocuslyIcon } from '../FocuslyLogo';
import { Globe, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export function AppleFooter({ 
  onFinish, 
  onSelectTab = () => {},
  lang = 'es',
  onToggleLang = () => {}
}) {
  const isEn = lang === 'en';

  const handleNav = (tabId) => {
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/15 bg-black text-zinc-400 text-xs sm:text-sm py-20 lg:py-28 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl 2xl:max-w-[1560px] mx-auto space-y-14 lg:space-y-20">
        
        {/* Fine Print / Disclaimers (Apple Style) */}
        <div className="space-y-3 text-xs sm:text-sm text-zinc-500 border-b border-white/10 pb-10 leading-relaxed max-w-6xl">
          <p>
            {isEn
              ? '1. Recovered time and economic value calculations are based on a weighted average of 45,000 active Focusly users during study or deep work sessions. Individual results vary based on discipline and baseline habits.'
              : '1. El cálculo de tiempo recuperado y valor económico mensual se basa en un promedio ponderado de 45,000 usuarios activos de Focusly durante periodos de estudio o trabajo intensivo. Los resultados individuales pueden variar según el nivel de disciplina y hábitos previos.'}
          </p>
          <p>
            {isEn
              ? '2. The 30-day 100% money-back guarantee applies to all Pro subscriptions and lifetime memberships purchased through the official channel. No questions, no penalties.'
              : '2. La garantía de 30 días con devolución del 100% aplica a todas las suscripciones Pro y planes vitalicios adquiridos a través del canal oficial. Sin preguntas ni penalizaciones.'}
          </p>
          <p>
            {isEn
              ? '3. Focusly operates under a strict zero data-selling policy: your blocker activity, session stats, and study notes remain strictly on-device and are never monetized or sold to third parties.'
              : '3. Focusly opera bajo una política estricta de cero venta de datos: tu actividad de bloqueo, estadísticas de uso y notas de estudio se procesan localmente y nunca se comercializan a terceros.'}
          </p>
        </div>

        {/* Directory Grid (Apple Style) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 text-xs sm:text-sm">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <h5 className="text-white font-black uppercase tracking-wider text-xs sm:text-sm">
              {isEn ? 'Explore Focusly' : 'Explorar Focusly'}
            </h5>
            <ul className="space-y-3">
              <li><button onClick={() => handleNav('productividad')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Live Focus Simulator' : 'Simulador de Foco en Vivo'}</button></li>
              <li><button onClick={() => handleNav('productividad')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? '3D Neuroscience Lab' : 'Laboratorio 3D de Neurociencia'}</button></li>
              <li><button onClick={() => handleNav('mas_info')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Before vs After Comparison' : 'Comparador Antes vs Después'}</button></li>
              <li><button onClick={() => handleNav('mas_info')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Monochrome Philosophy' : 'Filosofía Monocromática'}</button></li>
              <li><button onClick={() => handleNav('inicio')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Complete Ecosystem' : 'Ecosistema Integral'}</button></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h5 className="text-white font-black uppercase tracking-wider text-xs sm:text-sm">
              {isEn ? 'Masteries Catalog' : 'Catálogo de Maestrías'}
            </h5>
            <ul className="space-y-3">
              <li><button onClick={() => handleNav('mas_info')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Neuroscience of Focus' : 'Neurociencia del Foco'}</button></li>
              <li><button onClick={() => handleNav('mas_info')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Computing & Keyboard Shortcuts' : 'Computación y Atajos de Teclado'}</button></li>
              <li><button onClick={() => handleNav('mas_info')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Applied Artificial Intelligence' : 'Inteligencia Artificial Aplicada'}</button></li>
              <li><button onClick={() => handleNav('mas_info')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Finance for Beginners' : 'Finanzas para Jóvenes'}</button></li>
              <li><button onClick={() => handleNav('mas_info')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Study Techniques & Active Recall' : 'Técnicas de Estudio y Active Recall'}</button></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h5 className="text-white font-black uppercase tracking-wider text-xs sm:text-sm">
              {isEn ? 'Plans & Services' : 'Planes & Servicios'}
            </h5>
            <ul className="space-y-3">
              <li><button onClick={() => handleNav('focusly_pro')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Free Starter' : 'Starter Gratis'}</button></li>
              <li><button onClick={() => handleNav('focusly_pro')} className="hover:text-white transition-colors cursor-pointer text-left font-bold text-white">{isEn ? 'Focusly Pro (Save 45%)' : 'Focusly Pro (Ahorra 45%)'}</button></li>
              <li><button onClick={() => handleNav('focusly_pro')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Lifetime Mastery Club' : 'Mastery Club Vitalicio'}</button></li>
              <li><button onClick={() => handleNav('focusly_pro')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'ROI Calculator' : 'Calculadora de ROI'}</button></li>
              <li><button onClick={() => handleNav('focusly_pro')} className="hover:text-white transition-colors cursor-pointer text-left">{isEn ? 'Frequently Asked Questions' : 'Preguntas Frecuentes'}</button></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-4">
            <h5 className="text-white font-black uppercase tracking-wider text-xs sm:text-sm">
              {isEn ? 'About Focusly' : 'Acerca de Focusly'}
            </h5>
            <ul className="space-y-3">
              <li><span className="text-zinc-500">{isEn ? 'Version 2026 Black & White' : 'Versión 2026 Black & White'}</span></li>
              <li><span className="text-zinc-500">{isEn ? 'Built for Students & Builders' : 'Diseñado para Estudiantes & Creadores'}</span></li>
              <li><span className="text-zinc-500">{isEn ? 'Distraction-Free Manifesto' : 'Manifiesto Sin Distracciones'}</span></li>
              <li><span className="text-zinc-500">{isEn ? 'Locally Encrypted Privacy' : 'Seguridad Cifrada Local'}</span></li>
              <li>
                <button 
                  onClick={onFinish}
                  className="mt-3 inline-flex items-center gap-2 bg-white text-black font-black text-xs uppercase px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors cursor-pointer shadow-md"
                >
                  <span>{isEn ? 'Open the App' : 'Abrir la App'}</span>
                  <ArrowRight size={13} />
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Bar & Country / Language Switcher */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs sm:text-sm">
          
          <div className="flex items-center gap-4">
            <FocuslyLogo size="lg" />
            <span className="text-xs text-zinc-500 font-medium hidden sm:inline">
              {isEn ? 'More Action • Less Distraction' : 'Más Acción • Menos Distracción'}
            </span>
          </div>

          <button 
            type="button"
            onClick={() => onToggleLang(isEn ? 'es' : 'en')}
            className="flex items-center gap-2.5 text-zinc-400 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-full border border-white/10 hover:border-white/20 bg-white/5"
            title={isEn ? 'Cambiar a Español' : 'Switch to English'}
          >
            <Globe size={16} />
            <span className="font-semibold">{isEn ? 'United States / English' : 'Colombia / Español'}</span>
            <span className="text-[10px] uppercase font-bold text-zinc-500">
              ({isEn ? 'Switch to ES' : 'Cambiar a EN'})
            </span>
          </button>

          <div className="text-zinc-500 text-center md:text-right text-xs">
            {isEn 
              ? 'Copyright © 2026 Focusly Inc. All rights reserved.' 
              : 'Copyright © 2026 Focusly Inc. Todos los derechos reservados.'}
          </div>

        </div>

      </div>
    </footer>
  );
}
