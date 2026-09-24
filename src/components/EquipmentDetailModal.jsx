import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Gem, Sparkles, Check, Crown, Shield, Zap, Lock, 
  Shirt, Layers, Tag, Eye, CheckCircle2, RefreshCw
} from 'lucide-react';
import { RARITIES } from '../data/focuslyCustomization';
import { FocuslyAvatar3D } from './FocuslyAvatar3D';

export const EquipmentDetailModal = ({
  item,
  userDiamonds = 0,
  onClose,
  onAction,
  inventory = {},
  isLight = false
}) => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(true);

  if (!item) return null;

  const itemType = item.category || item.type || 'outfit';
  const rarity = RARITIES[item.rarity] || RARITIES.common;
  const itemPrice = item.price || 0;

  // Determine ownership & equipped status
  const isOwned = itemPrice === 0 || 
    (itemType === 'outfit' && ((inventory.unlockedOutfits || []).includes(item.id) || (inventory.outfits || []).includes(item.id))) ||
    (itemType === 'accessory' && ((inventory.unlockedAccessories || []).includes(item.id) || (inventory.accessories || []).includes(item.id))) ||
    (itemType === 'title' && ((inventory.unlockedTitles || []).includes(item.id) || (inventory.titles || []).includes(item.id))) ||
    ((itemType === 'background' || itemType === 'environment') && (inventory.backgrounds || []).includes(item.id)) ||
    (inventory.ownedItems || []).includes(item.id);

  const isEquipped = 
    (itemType === 'outfit' && inventory.equippedOutfit === item.id) ||
    (itemType === 'accessory' && inventory.equippedAccessory === item.id) ||
    (itemType === 'title' && inventory.equippedTitle === item.id) ||
    ((itemType === 'background' || itemType === 'environment') && inventory.equippedBg === item.id);

  const canAfford = userDiamonds >= itemPrice;
  const remainingDiamonds = userDiamonds - itemPrice;
  const missingDiamonds = Math.max(0, itemPrice - userDiamonds);

  // Live 3D Fitting preview coordinates
  const previewAvatar = inventory.equippedAvatar || 'a_base';
  const previewOutfit = itemType === 'outfit' ? (isPreviewMode ? item.id : inventory.equippedOutfit || 'outfit_base') : (inventory.equippedOutfit || 'outfit_base');
  const previewAccessory = itemType === 'accessory' ? (isPreviewMode ? item.id : inventory.equippedAccessory || 'acc_none') : (inventory.equippedAccessory || 'acc_none');

  const handlePurchase = () => {
    if (!canAfford || isProcessing) return;
    setIsProcessing(true);
    if (onAction) {
      onAction('buy', item, { keepOpen: true });
    }
    setShowCelebration(true);
    setIsProcessing(false);
  };

  const handleEquipDirect = () => {
    if (onAction) {
      onAction('equip', item);
    }
    onClose();
  };

  const getTypeLabel = () => {
    switch (itemType) {
      case 'outfit': return { label: 'Traje & Vestimenta', icon: Shirt };
      case 'accessory': return { label: 'Accesorio Holo', icon: Sparkles };
      case 'background':
      case 'environment': return { label: 'Entorno de Concentración', icon: Layers };
      case 'title': return { label: 'Título de Maestría', icon: Tag };
      default: return { label: 'Objeto Coleccionable', icon: Crown };
    }
  };

  const typeMeta = getTypeLabel();
  const IconComp = typeMeta.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl overflow-y-auto"
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
            ? 'bg-white border-zinc-200 text-zinc-900 shadow-zinc-900/10' 
            : 'bg-zinc-950 border-white/10 text-white shadow-black/80'
        }`}
        style={{
          boxShadow: `0 25px 60px -15px ${rarity.hex}25`
        }}
      >
        {/* Ambient Top Glow */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-3xl pointer-events-none opacity-25"
          style={{ backgroundColor: rarity.hex }}
        />

        {/* Header Bar */}
        <div className="relative z-10 px-6 pt-6 pb-3 flex items-center justify-between border-b border-white/5">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${
            isLight 
              ? 'bg-sky-50 text-sky-900 border-sky-200' 
              : 'bg-sky-950/40 text-sky-300 border-sky-500/30'
          }`}>
            <Gem size={13} className="text-sky-400 fill-sky-400/20" />
            <span>{userDiamonds.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border shadow-sm flex items-center gap-1.5"
              style={{
                color: rarity.hex,
                borderColor: `${rarity.hex}40`,
                backgroundColor: `${rarity.hex}15`
              }}
            >
              <IconComp size={11} />
              {rarity.label || rarity.name} • {typeMeta.label}
            </span>
          </div>

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

        {/* 3D Character Fitting Room Stage */}
        <div className="relative z-10 flex flex-col items-center justify-center pt-4 pb-2 px-6">
          <div 
            className="absolute w-56 h-56 rounded-full blur-2xl pointer-events-none opacity-20"
            style={{ backgroundColor: rarity.hex }}
          />

          {/* Interactive Fitting Room */}
          {itemType === 'outfit' || itemType === 'accessory' ? (
            <div className="relative w-48 h-48 flex items-center justify-center my-2">
              <FocuslyAvatar3D
                avatarId={previewAvatar}
                outfitId={previewOutfit}
                accessoryId={previewAccessory}
                size="md"
                interactive={true}
                showPedestal={true}
                className="scale-110"
              />
            </div>
          ) : (itemType === 'background' || itemType === 'environment') ? (
            <div className="relative w-full h-36 rounded-2xl my-3 overflow-hidden border border-white/10 flex flex-col items-center justify-center text-center p-4" style={{ background: `linear-gradient(135deg, ${item.accentHex || '#38bdf8'}30 0%, #000 100%)` }}>
              <Layers size={36} style={{ color: item.accentHex || '#38bdf8' }} className="mb-2" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">{item.atmosphere || 'Entorno Inmersivo'}</span>
            </div>
          ) : (
            <div className="relative w-full py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-3">
                <Crown size={32} className="text-amber-400" />
              </div>
              <span className="text-2xl font-black uppercase tracking-wider text-amber-400">{item.name}</span>
            </div>
          )}

          {/* Title and description */}
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-center leading-none mt-2">
            {item.name}
          </h2>
          <p className={`text-xs font-medium text-center mt-2 max-w-sm px-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            {item.desc}
          </p>

          {/* Fitting Room Toggle for Outfits & Accessories */}
          {(itemType === 'outfit' || itemType === 'accessory') && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isPreviewMode 
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' 
                    : 'bg-white/5 text-zinc-400 border-white/10'
                }`}
              >
                <Eye size={12} />
                <span>{isPreviewMode ? 'Vista Previa Activa' : 'Ver Avatar Original'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Financial Transparency Box */}
        {!isOwned && (
          <div className="px-6 py-2">
            <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
              isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.02] border-white/5'
            }`}>
              <div className="flex justify-between items-center text-zinc-400">
                <span>Tu saldo de diamantes:</span>
                <span className="font-bold flex items-center gap-1.5 text-sky-400">
                  <Gem size={12} />
                  {userDiamonds.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-zinc-400">
                <span>Precio del objeto:</span>
                <span className="font-bold text-zinc-200">
                  {itemPrice === 0 ? 'Gratis' : `- ${itemPrice.toLocaleString()}`}
                </span>
              </div>

              <div className="h-px bg-white/10 my-1" />

              {canAfford ? (
                <div className="flex justify-between items-center font-bold">
                  <span className="text-zinc-300">Saldo tras la compra:</span>
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
            isEquipped ? (
              <div className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border ${
                isLight 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                  : 'bg-emerald-950/30 border-emerald-500/30 text-emerald-400'
              }`}>
                <CheckCircle2 size={16} />
                <span>Equipado en tu Personaje</span>
              </div>
            ) : (
              <button
                onClick={handleEquipDirect}
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-[0.99] text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
              >
                <Check size={16} />
                <span>Equipar Ahora en este Espacio</span>
              </button>
            )
          ) : (
            canAfford ? (
              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-blue-600 hover:opacity-95 active:scale-[0.99] text-white font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2.5"
              >
                <Gem size={16} className="fill-white/20" />
                <span>Desbloquear Objeto • {itemPrice === 0 ? 'Gratis' : `${itemPrice} Diamantes`}</span>
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
                  Gana diamantes completando sesiones de Pomodoro y retos diarios.
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
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 15 }}
                className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(52,211,153,0.5)]"
              >
                <Sparkles size={36} className="text-emerald-400" />
              </motion.div>

              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400 mb-1">
                ¡Elemento Desbloqueado!
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                {item?.name}
              </h3>
              <p className="text-xs text-zinc-300 max-w-xs mb-8 leading-relaxed">
                Este objeto ha sido añadido a tu inventario de forma permanente.
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
                  Guardar en Mi Colección
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
