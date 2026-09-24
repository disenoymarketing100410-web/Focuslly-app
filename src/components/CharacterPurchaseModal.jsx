import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Gem, Sparkles, Check, Crown, Shield, Zap, Lock, 
  Palette, Brain, ArrowRight, Eye, Info, Layers, CheckCircle2
} from 'lucide-react';
import { CHARACTER_PERSONAS } from '../data/focuslyCustomization';

const RARITIES = {

  common: { id: 'common', name: 'Común', level: 1, hex: '#9ca3af', bg: 'bg-zinc-500/10', border: 'border-zinc-500/30', text: 'text-zinc-300' },
  rare: { id: 'rare', name: 'Raro', level: 2, hex: '#3b82f6', bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  epic: { id: 'epic', name: 'Épico', level: 3, hex: '#a855f7', bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  legendary: { id: 'legendary', name: 'Legendario', level: 4, hex: '#eab308', bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  mythic: { id: 'mythic', name: 'Mítico', level: 5, hex: '#22d3ee', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' }
};

// Arquetipos y bonificaciones de disciplina para cada personaje
const CHARACTER_ARCHETYPES = {
  a_vento: { archetype: 'Mentor IA Estoico', perk: '+25% XP en Sesiones Profundas', lore: 'Fluye con la serenidad del viento sobre los impulsos reactivos. Te guía con paciencia oriental.', statVoluntad: '98%', statFoco: 'Maestría' },
  a_crono: { archetype: 'Mentor IA Guardián', perk: 'Control Absoluto del Tiempo', lore: 'Guardián de arena y reloj. Transmuta cada bloque Pomodoro en oro de concentración.', statVoluntad: '96%', statFoco: 'Absoluto' },
  a_sophia: { archetype: 'Mentora IA Silenciosa', perk: 'Escudo Anti-Notificaciones', lore: 'Diosa de la calma profunda. Su presencia apaga el ruido de mil notificaciones dispersas.', statVoluntad: '99%', statFoco: 'Inquebrantable' },
  a_icaro: { archetype: 'Mentor IA Renaciente', perk: 'Resiliencia ante Recaídas', lore: 'Fénix de la atención. Si una distracción te desvía, te ayuda a volver al foco en segundos.', statVoluntad: '94%', statFoco: 'Ascendente' },
  a_atlas: { archetype: 'Mentor IA Supremo', perk: 'Soporte de Hábitos Pesados', lore: 'Soporta el inmenso peso de la constancia diaria sin vacilar ni un instante.', statVoluntad: '99%', statFoco: 'Titánico' },
  a_crown: { archetype: 'Soberanía Mental', perk: 'Resistencia Máxima al Dopamina Loop', lore: 'El rey indiscutible de su propia atención. Rechaza las recompensas vacías y efímeras.', statVoluntad: '99%', statFoco: 'Real' },
  a_void: { archetype: 'Silencio Cósmico', perk: 'Absorción Total de Ruido', lore: 'Un vórtice que engulle cualquier pensamiento intrusivo o impulso de abrir redes sociales.', statVoluntad: '97%', statFoco: 'Trascendente' },
  a_eye: { archetype: 'Visión Panóptica', perk: 'Detección Rápida de Fugas de Atención', lore: 'Lo observa todo desde arriba. Mantiene tus prioridades claras como el cristal.', statVoluntad: '95%', statFoco: 'Preciso' },
  a_monk: { archetype: 'Zen & Quietud', perk: 'Respiración de Foco Inmersivo', lore: 'Paz mental y quietud absoluta. Apaga el ruido de mil estímulos simultáneos.', statVoluntad: '92%', statFoco: 'Zen' },
  a_samurai: { archetype: 'Bushido de Foco', perk: 'Corte Quirúrgico a la Distracción', lore: 'Un solo tajo afilado para cortar la tentación de procrastinar de raíz.', statVoluntad: '93%', statFoco: 'Afilado' },
  a_phoenix: { archetype: 'Renacer Inmortal', perk: 'Energía Post-Cansancio', lore: 'Renace de las cenizas del agotamiento vespertino con voluntad renovada.', statVoluntad: '95%', statFoco: 'Fuego Vivo' },
  a_brain: { archetype: 'Consciencia Expandida', perk: 'Sinapsis de Alta Densidad', lore: 'Mente cósmica conectada a tus objetivos vitales más profundos.', statVoluntad: '94%', statFoco: 'Cósmico' },
  a_hourglass: { archetype: 'Dominio Cronológico', perk: 'Dilatación Perceptiva del Tiempo', lore: 'Domina cada segundo de tus bloques de trabajo como si fueras su creador.', statVoluntad: '91%', statFoco: 'Constante' }
};

export const CharacterPurchaseModal = ({
  item,
  userDiamonds = 0,
  onClose,
  onAction,
  inventory = { avatars: ['a_base'], equippedAvatar: 'a_base', skins: [], equippedSkins: {} },
  isShopMode = true,
  isLight = false,
  allSkins = [],
  AvatarDisplay
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'skins' | 'fitting'
  const [previewSkinId, setPreviewSkinId] = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const rarity = RARITIES[item?.rarity] || RARITIES.common;
  const isOwned = (inventory?.avatars || ['a_base']).includes(item?.id);
  const isEquipped = inventory?.equippedAvatar === item?.id;
  
  const activeSkinId = previewSkinId || inventory?.equippedSkins?.[item?.id] || null;
  const activeSkinData = activeSkinId && allSkins ? allSkins.find(s => s.id === activeSkinId) : null;
  const availableSkins = (allSkins || []).filter(s => s.baseId === item?.id);

  const meta = CHARACTER_PERSONAS[item?.id] || CHARACTER_ARCHETYPES[item?.id] || {
    archetype: item?.id?.startsWith('a_') && rarity.level >= 4 ? 'Arquetipo Superior' : 'Foco & Disciplina',
    perk: `+${rarity.level * 5}% Resistencia a Distracciones`,
    lore: item?.desc || 'Una manifestación de tu voluntad pura en el universo de Focusly.',
    statVoluntad: `${Math.min(99, 65 + rarity.level * 7)}%`,
    statFoco: rarity.name
  };

  const itemPrice = item?.price || 0;
  const canAfford = userDiamonds >= itemPrice;
  const remainingDiamonds = userDiamonds - itemPrice;
  const missingDiamonds = Math.max(0, itemPrice - userDiamonds);

  const handlePurchase = () => {
    if (!canAfford || isProcessing) return;
    setIsProcessing(true);

    // Call purchase action
    if (onAction) {
      onAction('buy', item, { keepOpen: true });
    }
    
    // Show celebration screen
    setShowCelebration(true);
    setIsProcessing(false);
  };

  const handleEquipDirect = () => {
    if (onAction) {
      onAction('equip', item);
    }
    onClose();
  };

  const handleSkinPurchaseOrEquip = (skin) => {
    const skinOwned = (inventory?.skins || []).includes(skin.id);
    if (skinOwned) {
      if (onAction) onAction('equip_skin', { baseId: item.id, skinId: skin.id });
      setPreviewSkinId(skin.id);
    } else if (userDiamonds >= skin.price) {
      if (onAction) onAction('buy_skin', skin);
      setPreviewSkinId(skin.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-start sm:items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg my-auto rounded-[36px] border shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isLight 
            ? 'bg-white/95 border-zinc-200 text-zinc-900 shadow-zinc-900/10' 
            : 'bg-zinc-950/95 border-white/10 text-white shadow-black/80'
        }`}
        style={{
          boxShadow: `0 25px 60px -15px ${rarity.hex}25`
        }}
      >
        {/* Ambient Top Glow matching Character Rarity */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-3xl pointer-events-none opacity-25"
          style={{ backgroundColor: rarity.hex }}
        />

        {/* Header Bar */}
        <div className="relative z-10 px-6 pt-6 pb-3 flex items-center justify-between border-b border-white/5">
          {/* Diamonds Balance Pill */}
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${
            isLight 
              ? 'bg-sky-50 text-sky-900 border-sky-200' 
              : 'bg-sky-950/40 text-sky-300 border-sky-500/30'
          }`}>
            <Gem size={13} className="text-sky-400 fill-sky-400/20" />
            <span>{userDiamonds.toLocaleString()}</span>
          </div>

          {/* Rarity & Archetype Badge */}
          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm flex items-center gap-1.5"
              style={{
                color: rarity.hex,
                borderColor: `${rarity.hex}40`,
                backgroundColor: `${rarity.hex}15`
              }}
            >
              <Crown size={11} />
              {rarity.name} • {meta.archetype}
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isLight 
                ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700' 
                : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Hero Stage / Character Podium Display */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-4 pb-2 px-6">
          {/* Radial Aura Behind Character */}
          <div 
            className="absolute w-56 h-56 rounded-full blur-2xl pointer-events-none opacity-20"
            style={{ backgroundColor: rarity.hex }}
          />

          {/* Character Container */}
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center my-2">
            {AvatarDisplay ? (
              <AvatarDisplay
                id={item?.id}
                src={item?.img}
                className="w-full h-full drop-shadow-2xl scale-110"
                freeStanding={true}
                skinFilters={activeSkinData}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center">
                <Sparkles size={48} style={{ color: rarity.hex }} />
              </div>
            )}
          </div>

          {/* Podium Floor Shadow & Reflection */}
          <div className="w-36 h-3 rounded-full bg-black/40 blur-md -mt-2 mb-3" />

          {/* Character Name & Identity */}
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-center leading-none">
            {activeSkinData ? activeSkinData.name : item?.name}
          </h2>
          <p className={`text-xs font-medium text-center mt-1.5 max-w-sm px-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            {meta.lore}
          </p>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1.5 mt-4 p-1 rounded-full bg-black/20 dark:bg-white/5 border border-white/5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black shadow-md')
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Atributos & Foco
            </button>
            {availableSkins.length > 0 && (
              <button
                onClick={() => setActiveTab('skins')}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'skins'
                    ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black shadow-md')
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Palette size={12} />
                Aspectos ({availableSkins.length})
              </button>
            )}
          </div>
        </div>

        {/* Tab 1: Overview & Attributes */}
        {activeTab === 'overview' && (
          <div className="px-6 py-3 space-y-3">
            {/* Discipline Attribute Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/5'
              }`}>
                <Shield size={16} className="text-sky-400 mb-1" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Voluntad</span>
                <span className="text-sm font-black">{meta.statVoluntad}</span>
              </div>

              <div className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/5'
              }`}>
                <Zap size={16} className="text-amber-400 mb-1" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Enfoque</span>
                <span className="text-sm font-black">{meta.statFoco}</span>
              </div>

              <div className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center ${
                isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/5'
              }`}>
                <Brain size={16} className="text-purple-400 mb-1" />
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Rango</span>
                <span className="text-sm font-black">Nivel {rarity.level}</span>
              </div>
            </div>

            {/* Special Discipline Bonus Banner */}
            <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
              isLight ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900' : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
            }`}>
              <Sparkles size={20} className="text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-black uppercase tracking-wider block text-[10px]">Efecto Especial de Concentración</span>
                <span className="font-medium opacity-90">{meta.perk}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Skins & Color Variants */}
        {activeTab === 'skins' && (
          <div className="px-6 py-3 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Aspectos Desbloqueables</span>
              {previewSkinId && (
                <button
                  onClick={() => setPreviewSkinId(null)}
                  className="text-xs font-bold text-sky-400 hover:underline cursor-pointer"
                >
                  Restablecer Original
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-48 overflow-y-auto pr-1">
              {/* Original Skin Card */}
              <div
                onClick={() => setPreviewSkinId(null)}
                className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                  previewSkinId === null
                    ? (isLight ? 'border-sky-500 bg-sky-50' : 'border-sky-400 bg-sky-950/40')
                    : (isLight ? 'border-zinc-200 hover:bg-zinc-50' : 'border-white/5 hover:bg-white/5')
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Sparkles size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold truncate">Original</div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">Incluido</span>
                </div>
                {previewSkinId === null && <Check size={14} className="text-sky-400" />}
              </div>

              {/* Available Skins */}
              {availableSkins.map(skin => {
                const sOwned = (inventory?.skins || []).includes(skin.id);
                const isSelected = previewSkinId === skin.id;

                return (
                  <div
                    key={skin.id}
                    onClick={() => setPreviewSkinId(skin.id)}
                    className={`p-3 rounded-2xl border flex items-center gap-2.5 cursor-pointer transition-all ${
                      isSelected
                        ? (isLight ? 'border-sky-500 bg-sky-50' : 'border-sky-400 bg-sky-950/40')
                        : (isLight ? 'border-zinc-200 hover:bg-zinc-50' : 'border-white/5 hover:bg-white/5')
                    }`}
                  >
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{
                        backgroundColor: `${RARITIES[skin.rarity]?.hex || '#fff'}20`,
                        border: `1px solid ${RARITIES[skin.rarity]?.hex || '#fff'}40`
                      }}
                    >
                      <Palette size={16} style={{ color: RARITIES[skin.rarity]?.hex || '#fff' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate">{skin.name}</div>
                      {sOwned ? (
                        <span className="text-[10px] text-emerald-400 font-bold uppercase">Adquirido</span>
                      ) : (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-sky-400">
                          <Gem size={10} />
                          <span>{skin.price}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action for selected skin */}
            <div className="pt-2">
              {previewSkinId === null ? (
                <button
                  onClick={() => {
                    if (onAction) onAction('equip_skin', { baseId: item.id, skinId: null });
                  }}
                  disabled={!isOwned || inventory?.equippedSkins?.[item.id] == null}
                  className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    !isOwned || inventory?.equippedSkins?.[item.id] == null
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                  }`}
                >
                  Usar Aspecto Original
                </button>
              ) : (() => {
                const s = allSkins.find(x => x.id === previewSkinId);
                if (!s) return null;
                const sOwned = (inventory?.skins || []).includes(s.id);
                const sEquipped = inventory?.equippedSkins?.[item.id] === s.id;

                if (sOwned) {
                  return (
                    <button
                      onClick={() => handleSkinPurchaseOrEquip(s)}
                      disabled={sEquipped}
                      className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        sEquipped 
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20'
                      }`}
                    >
                      {sEquipped ? '✓ Aspecto Equipado' : `Equipar ${s.name}`}
                    </button>
                  );
                } else {
                  const canAffordSkin = userDiamonds >= s.price;
                  return (
                    <button
                      onClick={() => handleSkinPurchaseOrEquip(s)}
                      disabled={!isOwned || !canAffordSkin}
                      className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                        !isOwned
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : canAffordSkin
                          ? 'bg-gradient-to-r from-sky-500 to-indigo-500 hover:opacity-95 text-white cursor-pointer shadow-md'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      {!isOwned ? (
                        'Desbloquea primero el personaje base'
                      ) : canAffordSkin ? (
                        <>
                          <Gem size={13} /> Desbloquear {s.name} • {s.price} Diamantes
                        </>
                      ) : (
                        `Faltan ${s.price - userDiamonds} 💎 para este aspecto`
                      )}
                    </button>
                  );
                }
              })()}
            </div>
          </div>
        )}

        {/* Financial Transparency Box (Calculadora de Compra Intuitiva) */}
        {!isOwned && (
          <div className="px-6 py-2">
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.02] border-white/5'
            }`}>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Tu saldo actual:</span>
                <span className="font-bold flex items-center gap-1.5 text-sky-400">
                  <Gem size={12} />
                  {userDiamonds.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-400">
                <span>Inversión requerida:</span>
                <span className="font-bold text-zinc-200">
                  {itemPrice === 0 ? 'Gratis' : `- ${itemPrice.toLocaleString()}`}
                </span>
              </div>

              <div className="h-px bg-white/10 my-1" />

              {canAfford ? (
                <div className="flex justify-between items-center font-bold">
                  <span className="text-zinc-300">Saldo restante tras compra:</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                    <Gem size={12} />
                    {remainingDiamonds.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div className="flex justify-between items-center font-bold text-rose-400">
                  <span>Te faltan para desbloquear:</span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Gem size={12} />
                    {missingDiamonds.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="p-6 pt-3 border-t border-white/5 mt-2">
          {isOwned ? (
            // Owned States: Equip or Already Active
            isEquipped ? (
              <div className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border ${
                isLight 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
              }`}>
                <CheckCircle2 size={16} />
                <span>Personaje Activo en tu Perfil</span>
              </div>
            ) : (
              <button
                onClick={handleEquipDirect}
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.99] text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
              >
                <Check size={16} />
                <span>Equipar como Personaje Principal</span>
              </button>
            )
          ) : (
            // Not Owned: Buy or Earn Diamonds
            canAfford ? (
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 hover:opacity-95 active:scale-[0.99] text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2.5"
              >
                <Gem size={16} className="fill-white/20" />
                <span>Desbloquear Personaje • {itemPrice === 0 ? 'Gratis' : `${itemPrice} Diamantes`}</span>
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  disabled
                  className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-not-allowed border ${
                    isLight 
                      ? 'bg-zinc-100 border-zinc-200 text-zinc-400' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                  }`}
                >
                  <Lock size={15} />
                  <span>Diamantes Insuficientes (Faltan {missingDiamonds})</span>
                </button>
                <p className="text-[10px] text-center text-zinc-400 font-medium">
                  Gana diamantes completando bloques de Pomodoro o en los Minijuegos diarios.
                </p>
              </div>
            )
          )}
        </div>

        {/* Celebration Overlay After Purchase */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 bg-black/90 backdrop-blur-2xl p-6 flex flex-col items-center justify-center text-center text-white"
            >
              {/* Confetti & Sparkles Halo */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(52,211,153,0.5)]"
              >
                <Sparkles size={36} className="text-emerald-400" />
              </motion.div>

              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400 mb-1">
                ¡Desbloqueo Exitoso!
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                {item?.name}
              </h3>
              <p className="text-xs text-zinc-300 max-w-xs mb-8 leading-relaxed">
                Has incorporado la energía de <strong className="text-white">{item?.name}</strong> a tu disciplina diaria.
              </p>

              <div className="w-full max-w-xs space-y-3">
                <button
                  onClick={handleEquipDirect}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <Check size={16} />
                  <span>Equipar Ahora Mismo</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Guardar en Colección
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
