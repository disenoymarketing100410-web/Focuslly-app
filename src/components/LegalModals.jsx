import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, FileText, CheckCircle2, AlertTriangle, Eye, Database } from 'lucide-react';

export const PrivacyPolicyModal = ({ isOpen, onClose, isLight }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`w-full max-w-2xl max-h-[85vh] rounded-[32px] border overflow-hidden flex flex-col shadow-2xl ${
            isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0e0e0e] border-white/15 text-white'
          }`}
        >
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${
            isLight ? 'border-zinc-100 bg-zinc-50/80' : 'border-white/10 bg-white/5'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Política de Privacidad</h3>
                <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>Protección de datos y seguridad en Focusly</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full border transition-colors ${
                isLight ? 'border-zinc-200 hover:bg-zinc-100' : 'border-white/10 hover:bg-white/10'
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed custom-scroll">
            <section className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-500">
                <Database size={15} />
                <span>1. Información que recopilamos</span>
              </div>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                Focusly está diseñado bajo el principio de minimización de datos. Únicamente almacenamos los datos estrictamente necesarios para el funcionamiento de tus rutinas:
              </p>
              <ul className={`list-disc pl-5 space-y-1 text-xs ${isLight ? 'text-zinc-600' : 'text-white/70'}`}>
                <li><strong>Identidad y Cuenta:</strong> Correo electrónico y nombre de usuario (en cuentas registradas).</li>
                <li><strong>Progreso y Gamificación:</strong> Puntos de experiencia (XP), diamantes acumulados, racha de días, avatares e insignias desbloqueadas.</li>
                <li><strong>Organización Personal:</strong> Tareas del calendario, listas de hábitos y configuración de aplicaciones bloqueadas.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-500">
                <Lock size={15} />
                <span>2. Seguridad y Cifrado</span>
              </div>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                La base de datos utiliza <strong>Row Level Security (RLS)</strong> en Supabase, lo que garantiza que solo tú con tu sesión autenticada tienes permiso de lectura y modificación sobre tus propios datos y progreso. Las contraseñas se almacenan mediante funciones criptográficas seguras (hashing con Bcrypt) y nunca son visibles en texto plano.
              </p>
            </section>

            <section className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-500">
                <AlertTriangle size={15} />
                <span>3. Cuentas Anónimas / Temporales</span>
              </div>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                Si utilizas la app sin registrar correo electrónico, tu sesión se mantiene localmente en tu navegador mediante tokens de invitado. Para evitar pérdida de datos si borras las cookies o caché, recomendamos vincular tu cuenta desde la sección de Perfil.
              </p>
            </section>

            <section className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-purple-500">
                <Eye size={15} />
                <span>4. No Venta de Datos Personales</span>
              </div>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                No vendemos ni compartimos tu información personal, hábitos ni rutinas con terceros, anunciantes o redes publicitarias.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className={`p-4 border-t flex justify-end ${
            isLight ? 'border-zinc-100 bg-zinc-50' : 'border-white/10 bg-white/5'
          }`}>
            <button
              onClick={onClose}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest ${
                isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export const TermsModal = ({ isOpen, onClose, isLight }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`w-full max-w-2xl max-h-[85vh] rounded-[32px] border overflow-hidden flex flex-col shadow-2xl ${
            isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0e0e0e] border-white/15 text-white'
          }`}
        >
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${
            isLight ? 'border-zinc-100 bg-zinc-50/80' : 'border-white/10 bg-white/5'
          }`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
                <FileText size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Términos de Servicio</h3>
                <p className={`text-xs ${isLight ? 'text-zinc-500' : 'text-white/40'}`}>Condiciones de uso de la plataforma Focusly</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className={`p-2 rounded-full border transition-colors ${
                isLight ? 'border-zinc-200 hover:bg-zinc-100' : 'border-white/10 hover:bg-white/10'
              }`}
            >
              <X size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed custom-scroll">
            <section className="space-y-2">
              <h4 className="font-black text-xs uppercase tracking-wider text-purple-400">1. Aceptación del Servicio</h4>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                Al crear una cuenta o utilizar Focusly, aceptas estos términos diseñados para promover el bienestar digital, el enfoque productivo y el autocontrol frente a la distracción digital.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-black text-xs uppercase tracking-wider text-purple-400">2. Uso Apropiado</h4>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                Los usuarios se comprometen a interactuar de forma respetuosa en la comunidad y foros, evitando publicar contenido ofensivo, fraudulento o que atente contra la privacidad de otros miembros.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-black text-xs uppercase tracking-wider text-purple-400">3. Economía Virtual</h4>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                Los diamantes, puntos de experiencia (XP) y objetos virtuales obtenidos dentro de Focusly son exclusivamente elementos lúdicos de gamificación y no tienen valor monetario real ni son canjeables por dinero en efectivo.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="font-black text-xs uppercase tracking-wider text-purple-400">4. Modificaciones del Servicio</h4>
              <p className={isLight ? 'text-zinc-600' : 'text-white/70'}>
                Nos reservamos el derecho de actualizar funcionalidades, corregir vulnerabilidades de seguridad y optimizar la experiencia para mejorar la productividad de los usuarios.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className={`p-4 border-t flex justify-end ${
            isLight ? 'border-zinc-100 bg-zinc-50' : 'border-white/10 bg-white/5'
          }`}>
            <button
              onClick={onClose}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest ${
                isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
              }`}
            >
              Aceptar
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
