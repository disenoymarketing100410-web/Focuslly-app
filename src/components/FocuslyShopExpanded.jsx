import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Gem, Sparkles, Check, Crown, Shield, Shirt, Layers, Tag, Eye, Lock, ArrowRight, Zap, Award, Flame
} from 'lucide-react';
import { 
  RARITIES, OUTFITS, ACCESSORIES, TITLES, ENVIRONMENTS, sanitizeInventory, CHARACTER_PERSONAS 
} from '../data/focuslyCustomization';
import { FocuslyAvatar3D } from './FocuslyAvatar3D';

export const FocuslyShopExpanded = ({
  userDiamonds = 0,
  setUserDiamonds = null,
  inventory = {},
  setInventory = null,
  shopItemsList = [],
  onOpenShopItem = null,
  isLight = false,
  className = '',
  lang = 'es'
}) => {
  const [activeCategory, setActiveCategory] = useState('avatars'); // 'avatars' | 'outfits' | 'accessories' | 'environments' | 'titles'
  const [previewOutfit, setPreviewOutfit] = useState(inventory?.equippedOutfit || 'outfit_base');
  const [previewAccessory, setPreviewAccessory] = useState(inventory?.equippedAccessory || 'acc_none');
  const [previewAvatar, setPreviewAvatar] = useState(inventory?.equippedAvatar || 'a_base');
  const [purchaseSuccessItem, setPurchaseSuccessItem] = useState(null);

  // Equipped States
  const equippedAvatar = inventory?.equippedAvatar || 'a_base';
  const equippedOutfit = inventory?.equippedOutfit || 'outfit_base';
  const equippedAccessory = inventory?.equippedAccessory || 'acc_none';
  const equippedBg = inventory?.equippedBg || 'bg_default';
  const equippedTitle = inventory?.equippedTitle || 'title_iniciado';

  // Available Personas & Collectible Characters
  const allAvatars = useMemo(() => {
    const list = Object.values(CHARACTER_PERSONAS);
    const existingIds = new Set(list.map(a => a.id));
    (shopItemsList || []).filter(item => item.category === 'avatar').forEach(item => {
      if (!existingIds.has(item.id)) {
        list.push({
          ...item,
          archetype: item.archetype || 'Guardián del Enfoque',
          desc: item.desc || 'Avatar de concentración.',
          lore: item.lore || item.desc || 'Entrena la mente para sesiones ininterrumpidas de alta concentración.',
          perk: item.perk || '+5% Foco Continuo',
          statVoluntad: '85%',
          statFoco: 'Equilibrado'
        });
      }
    });
    return list;
  }, [shopItemsList]);

  const baseAvatars = allAvatars;
  const backgrounds = (shopItemsList || []).filter(item => item.category === 'background');

  const handleBuyOrEquip = (item, type) => {
    if (!item) return;

    // 1. OUTFITS
    if (type === 'outfit') {
      const owned = (inventory.unlockedOutfits || ['outfit_base']).includes(item.id) || (inventory.ownedItems || []).includes(item.id);
      if (owned) {
        setInventory?.(prev => sanitizeInventory({ ...prev, equippedOutfit: item.id }));
        setPreviewOutfit(item.id);
      } else if (userDiamonds >= (item.price || 0)) {
        setUserDiamonds?.(prev => Math.max(0, prev - (item.price || 0)));
        setInventory?.(prev => {
          const next = { ...prev };
          next.unlockedOutfits = Array.from(new Set([...(next.unlockedOutfits || ['outfit_base']), item.id]));
          next.outfits = next.unlockedOutfits;
          next.equippedOutfit = item.id;
          next.ownedItems = Array.from(new Set([...(next.ownedItems || []), item.id]));
          return sanitizeInventory(next);
        });
        setPreviewOutfit(item.id);
        setPurchaseSuccessItem(item);
      }
    }

    // 2. ACCESSORIES
    if (type === 'accessory') {
      const owned = (inventory.unlockedAccessories || ['acc_none']).includes(item.id) || (inventory.ownedItems || []).includes(item.id);
      if (owned) {
        setInventory?.(prev => sanitizeInventory({ ...prev, equippedAccessory: item.id }));
        setPreviewAccessory(item.id);
      } else if (userDiamonds >= (item.price || 0)) {
        setUserDiamonds?.(prev => Math.max(0, prev - (item.price || 0)));
        setInventory?.(prev => {
          const next = { ...prev };
          next.unlockedAccessories = Array.from(new Set([...(next.unlockedAccessories || ['acc_none']), item.id]));
          next.accessories = next.unlockedAccessories;
          next.equippedAccessory = item.id;
          next.ownedItems = Array.from(new Set([...(next.ownedItems || []), item.id]));
          return sanitizeInventory(next);
        });
        setPreviewAccessory(item.id);
        setPurchaseSuccessItem(item);
      }
    }

    // 3. TITLES
    if (type === 'title') {
      const owned = (inventory.unlockedTitles || ['title_iniciado']).includes(item.id) || (inventory.ownedItems || []).includes(item.id);
      if (owned) {
        setInventory?.(prev => sanitizeInventory({ ...prev, equippedTitle: item.id }));
      } else if (userDiamonds >= (item.price || 0)) {
        if ((item.price || 0) > 0) {
          setUserDiamonds?.(prev => Math.max(0, prev - (item.price || 0)));
        }
        setInventory?.(prev => {
          const next = { ...prev };
          next.unlockedTitles = Array.from(new Set([...(next.unlockedTitles || ['title_iniciado']), item.id]));
          next.titles = next.unlockedTitles;
          next.equippedTitle = item.id;
          next.ownedItems = Array.from(new Set([...(next.ownedItems || []), item.id]));
          return sanitizeInventory(next);
        });
        setPurchaseSuccessItem(item);
      }
    }

    // 4. ENVIRONMENTS
    if (type === 'environment' || type === 'background') {
      const owned = (inventory.backgrounds || ['bg_default']).includes(item.id) || (inventory.ownedItems || []).includes(item.id) || item.price === 0;
      if (owned) {
        setInventory?.(prev => sanitizeInventory({ ...prev, equippedBg: item.id }));
      } else if (userDiamonds >= (item.price || 0)) {
        setUserDiamonds?.(prev => Math.max(0, prev - (item.price || 0)));
        setInventory?.(prev => {
          const next = { ...prev };
          next.backgrounds = Array.from(new Set([...(next.backgrounds || []), item.id]));
          next.equippedBg = item.id;
          next.ownedItems = Array.from(new Set([...(next.ownedItems || []), item.id]));
          return sanitizeInventory(next);
        });
        setPurchaseSuccessItem(item);
      }
    }

    // 5. AVATARS & COLLECTIBLE CHARACTERS
    if (type === 'avatar') {
      const owned = (inventory.avatars || ['a_base']).includes(item.id) || (inventory.ownedItems || []).includes(item.id) || item.price === 0;
      if (owned) {
        setInventory?.(prev => sanitizeInventory({ ...prev, equippedAvatar: item.id }));
        setPreviewAvatar(item.id);
      } else if (userDiamonds >= (item.price || 0)) {
        setUserDiamonds?.(prev => Math.max(0, prev - (item.price || 0)));
        setInventory?.(prev => {
          const next = { ...prev };
          next.avatars = Array.from(new Set([...(next.avatars || ['a_base']), item.id]));
          next.equippedAvatar = item.id;
          next.ownedItems = Array.from(new Set([...(next.ownedItems || []), item.id]));
          return sanitizeInventory(next);
        });
        setPreviewAvatar(item.id);
        setPurchaseSuccessItem(item);
      } else if (onOpenShopItem) {
        onOpenShopItem(item);
      }
    }
  };

  const categories = [
    { id: 'avatars', label: lang === 'en' ? 'Characters & Archetypes' : 'Personajes & Arquetipos', icon: Crown, count: baseAvatars.length },
    { id: 'outfits', label: lang === 'en' ? 'Outfits & Apparel' : 'Trajes & Ropa', icon: Shirt, count: OUTFITS.length },
    { id: 'accessories', label: lang === 'en' ? 'Holo Accessories' : 'Accesorios Holo', icon: Sparkles, count: ACCESSORIES.length },
    { id: 'environments', label: lang === 'en' ? 'Environments' : 'Entornos', icon: Layers, count: ENVIRONMENTS.length },
    { id: 'titles', label: lang === 'en' ? 'Legendary Titles' : 'Títulos Legendarios', icon: Tag, count: TITLES.length }
  ];

  return (
    <div className={`space-y-8 ${className}`}>
      
      {/* Top Shop Stage: Diamonds Balance + Live 3D Avatar Previewer (Hero Stage) */}
      <div className={`p-6 sm:p-8 2xl:p-12 rounded-[36px] 2xl:rounded-[44px] border relative overflow-hidden backdrop-blur-xl shadow-2xl ${
        isLight ? 'bg-white border-zinc-200/80 text-zinc-900 shadow-zinc-900/5' : 'bg-zinc-950/90 border-white/10 text-white'
      }`}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 2xl:gap-12">
          
          {/* Info & Balance */}
          <div className="space-y-4 max-w-xl 2xl:max-w-2xl text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] 2xl:text-xs font-bold uppercase tracking-wider ${
              isLight ? 'bg-zinc-100 text-zinc-700 border border-zinc-200' : 'bg-zinc-900 text-zinc-300 border border-zinc-700/60'
            }`}>
              <ShoppingBag size={14} className="text-amber-500" />
              <span>{lang === 'en' ? 'Focus & Style Marketplace' : 'Mercado de Enfoque & Estilo'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl 2xl:text-5xl font-black uppercase tracking-tight">
              {lang === 'en' ? 'Reward Vault' : 'Bóveda de Recompensas'}
            </h2>
            <p className={`text-xs sm:text-sm 2xl:text-base leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {lang === 'en'
                ? 'Customize your identity across the Focusly universe. Acquire regal outfits, refined accessories, and exclusive avatars with diamonds earned during sessions.'
                : 'Personaliza tu identidad en el universo de Focusly. Adquiere trajes de gala, accesorios refinados y avatares exclusivos con los diamantes ganados en tus sesiones.'}
            </p>

            {/* Current Balance Pill */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-base 2xl:text-lg shadow-sm border ${
                isLight 
                  ? 'bg-sky-50/80 border-sky-200/80 text-sky-900' 
                  : 'bg-zinc-900/90 border-zinc-700/70 text-zinc-100'
              }`}>
                <Gem size={20} className="text-sky-500 fill-sky-500/20" />
                <span>{userDiamonds.toLocaleString()} {lang === 'en' ? 'Diamonds' : 'Diamantes'}</span>
              </div>

              {/* Reset fitting preview if changed */}
              {(previewOutfit !== equippedOutfit || previewAccessory !== equippedAccessory || previewAvatar !== equippedAvatar) && (
                <button
                  onClick={() => {
                    setPreviewOutfit(equippedOutfit);
                    setPreviewAccessory(equippedAccessory);
                    setPreviewAvatar(equippedAvatar);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                    isLight ? 'border-zinc-300 text-zinc-700 hover:bg-zinc-100' : 'border-white/20 text-zinc-300 hover:bg-white/10'
                  }`}
                >
                  {lang === 'en' ? 'Reset Preview' : 'Restablecer Vista'}
                </button>
              )}
            </div>
          </div>

          {/* Interactive Live 3D Character Fitting Room (PROTAGONISTA DEL SHOP) */}
          <div className={`p-6 2xl:p-8 rounded-[32px] 2xl:rounded-[38px] border flex flex-col items-center justify-center relative min-w-[280px] sm:min-w-[340px] 2xl:min-w-[420px] shadow-lg transition-all ${
            isLight ? 'bg-zinc-50/80 border-zinc-200' : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <div className="w-full flex items-center justify-between mb-3 px-2">
              <span className={`text-[10px] 2xl:text-xs font-bold uppercase tracking-wider ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
                {lang === 'en' ? 'Fitting Studio' : 'Estudio de Personalización'}
              </span>
              <span className="text-[10px] 2xl:text-xs font-mono uppercase text-zinc-400">
                {lang === 'en' ? '360° Interactive' : '360° Interactivo'}
              </span>
            </div>

            <div className="my-2 flex items-center justify-center min-h-[220px] 2xl:min-h-[280px]">
              <FocuslyAvatar3D
                avatarId={previewAvatar}
                outfitId={previewOutfit}
                accessoryId={previewAccessory}
                size="hero"
                interactive={true}
                showPedestal={true}
                className="scale-105 2xl:scale-115"
              />
            </div>

            <span className="text-[10px] 2xl:text-xs text-zinc-400 font-medium mt-3 text-center">
              {lang === 'en' ? 'Click avatar to interact' : 'Haz clic en el avatar para interactuar'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const IconComp = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? (isLight ? 'bg-zinc-900 text-white shadow-sm' : 'bg-white text-black shadow-lg shadow-white/10')
                  : (isLight ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/70' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white')
              }`}
            >
              <IconComp size={16} />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                isActive
                  ? (isLight ? 'bg-white/20 text-white' : 'bg-black/20 text-black')
                  : 'bg-white/10 text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* GRID BY CATEGORY */}

      {/* 1. OUTFITS */}
      {activeCategory === 'outfits' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {OUTFITS.map(outfit => {
            const rarity = RARITIES[outfit.rarity];
            const isEquipped = equippedOutfit === outfit.id;
            const isOwned = (inventory.unlockedOutfits || ['outfit_base']).includes(outfit.id);

            return (
              <motion.div
                key={outfit.id}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setPreviewOutfit(outfit.id)}
                className={`p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${rarity.border} ${
                  isLight ? 'bg-white shadow-sm' : 'bg-zinc-950/70 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${rarity.badgeBg}`}>
                      {lang === 'en' && rarity.labelEn ? rarity.labelEn : rarity.label}
                    </span>
                    {isEquipped && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Check size={12} /> {lang === 'en' ? 'Equipped' : 'Equipado'}
                      </span>
                    )}
                  </div>

                  {/* Visual Preview Swatch */}
                  <div className="w-full h-32 rounded-2xl flex items-center justify-center my-3 border border-white/10 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${outfit.primaryColor} 0%, #000 100%)` }}>
                    <div className="w-16 h-16 rounded-xl border-2 shadow-xl flex items-center justify-center" style={{ borderColor: outfit.accentColor, backgroundColor: outfit.primaryColor }}>
                      <Shirt size={28} style={{ color: outfit.accentColor }} />
                    </div>
                  </div>

                  <h4 className="text-lg font-black uppercase tracking-tight mt-2">{outfit.name}</h4>
                  <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{outfit.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400 text-sm">
                    {outfit.price === 0 ? (
                      <span className="text-emerald-500 font-bold text-xs uppercase">{lang === 'en' ? 'Free' : 'Gratis'}</span>
                    ) : (
                      <>
                        <Gem size={15} />
                        <span>{outfit.price}</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyOrEquip(outfit, 'outfit');
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isEquipped
                        ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30 cursor-default'
                        : isOwned
                        ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200')
                        : userDiamonds >= outfit.price
                        ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm' : 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-sm')
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {isEquipped ? (lang === 'en' ? 'Equipped' : 'Equipado') : isOwned ? (lang === 'en' ? 'Equip' : 'Equipar') : (lang === 'en' ? 'Buy' : 'Comprar')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 2. ACCESSORIES */}
      {activeCategory === 'accessories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {ACCESSORIES.map(acc => {
            const rarity = RARITIES[acc.rarity];
            const isEquipped = equippedAccessory === acc.id;
            const isOwned = (inventory.unlockedAccessories || ['acc_none']).includes(acc.id);

            return (
              <motion.div
                key={acc.id}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => setPreviewAccessory(acc.id)}
                className={`p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between cursor-pointer ${rarity.border} ${
                  isLight ? 'bg-white shadow-sm' : 'bg-zinc-950/70 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${rarity.badgeBg}`}>
                      {lang === 'en' && rarity.labelEn ? rarity.labelEn : rarity.label}
                    </span>
                    {isEquipped && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Check size={12} /> {lang === 'en' ? 'Equipped' : 'Equipado'}
                      </span>
                    )}
                  </div>

                  <div className="w-full h-32 rounded-2xl flex items-center justify-center my-3 bg-white/5 border border-white/10">
                    <Sparkles size={36} className={rarity.text} />
                  </div>

                  <h4 className="text-lg font-black uppercase tracking-tight mt-2">{acc.name}</h4>
                  <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{acc.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400 text-sm">
                    {acc.price === 0 ? (
                      <span className="text-emerald-500 font-bold text-xs uppercase">{lang === 'en' ? 'Free' : 'Gratis'}</span>
                    ) : (
                      <>
                        <Gem size={15} />
                        <span>{acc.price}</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyOrEquip(acc, 'accessory');
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isEquipped
                        ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30 cursor-default'
                        : isOwned
                        ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200')
                        : userDiamonds >= acc.price
                        ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm' : 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-sm')
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {isEquipped ? (lang === 'en' ? 'Equipped' : 'Equipado') : isOwned ? (lang === 'en' ? 'Equip' : 'Equipar') : (lang === 'en' ? 'Buy' : 'Comprar')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 3. ENVIRONMENTS */}
      {activeCategory === 'environments' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {ENVIRONMENTS.map(env => {
            const rarity = RARITIES[env.rarity];
            const isEquipped = equippedBg === env.id;
            const isOwned = (inventory.backgrounds || ['bg_default']).includes(env.id) || env.price === 0;

            return (
              <motion.div
                key={env.id}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${rarity.border} ${
                  isLight ? 'bg-white shadow-sm' : 'bg-zinc-950/70 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${rarity.badgeBg}`}>
                      {lang === 'en' && rarity.labelEn ? rarity.labelEn : rarity.label}
                    </span>
                    {isEquipped && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Check size={12} /> {lang === 'en' ? 'Active' : 'Activo'}
                      </span>
                    )}
                  </div>

                  <div className="w-full h-32 rounded-2xl flex flex-col items-center justify-center my-3 border border-white/10 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${env.accentHex}20 0%, #000 100%)` }}>
                    <Layers size={32} style={{ color: env.accentHex }} />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mt-2">{env.atmosphere}</span>
                  </div>

                  <h4 className="text-lg font-black uppercase tracking-tight mt-2">{env.name}</h4>
                  <p className={`text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{env.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400 text-sm">
                    {env.price === 0 ? (
                      <span className="text-emerald-500 font-bold text-xs uppercase">{lang === 'en' ? 'Free' : 'Gratis'}</span>
                    ) : (
                      <>
                        <Gem size={15} />
                        <span>{env.price}</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenShopItem) {
                        onOpenShopItem(env);
                      }
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      isEquipped
                        ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30 cursor-default'
                        : isOwned
                        ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200')
                        : (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm' : 'bg-white text-zinc-950 hover:bg-zinc-100 shadow-sm')
                    }`}
                  >
                    {isEquipped ? (lang === 'en' ? 'Active' : 'Activo') : isOwned ? (lang === 'en' ? 'Activate' : 'Activar') : (lang === 'en' ? 'View Details' : 'Ver Detalles')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 4. TITLES */}
      {activeCategory === 'titles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {TITLES.map(title => {
            const rarity = RARITIES[title.rarity];
            const isEquipped = equippedTitle === title.id;
            const isOwned = (inventory.unlockedTitles || ['title_iniciado']).includes(title.id);

            return (
              <motion.div
                key={title.id}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`p-6 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${rarity.border} ${
                  isLight ? 'bg-white shadow-sm' : 'bg-zinc-950/70 shadow-xl'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${rarity.badgeBg}`}>
                      {lang === 'en' && rarity.labelEn ? rarity.labelEn : rarity.label}
                    </span>
                    {isEquipped && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                        <Check size={12} /> {lang === 'en' ? 'Equipped' : 'Equipado'}
                      </span>
                    )}
                  </div>

                  <div className="py-6 flex items-center justify-center">
                    <span className="text-xl font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                      <Crown size={20} />
                      {title.name}
                    </span>
                  </div>

                  <p className={`text-xs mt-1 text-center ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{title.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center">
                  <button
                    onClick={() => handleBuyOrEquip(title, 'title')}
                    className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isEquipped
                        ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30 cursor-default'
                        : isOwned
                        ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200')
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {isEquipped ? (lang === 'en' ? 'Equipped' : 'Equipado') : isOwned ? (lang === 'en' ? 'Equip Title' : 'Equipar Título') : (lang === 'en' ? 'Unlock' : 'Desbloquear')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* 5. BASE AVATARS & COLLECTIBLE CHARACTERS (Auténtica Colección de Personajes) */}
      {activeCategory === 'avatars' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {baseAvatars.map(avatar => {
            const isOwned = (inventory.avatars || ['a_base']).includes(avatar.id) || (inventory.ownedItems || []).includes(avatar.id) || avatar.price === 0;
            const isEquipped = equippedAvatar === avatar.id;
            const isPreviewed = previewAvatar === avatar.id;
            const rarity = RARITIES[avatar.rarity || 'common'];
            const archetypeLabel = avatar.bodyArchetype === 'chibi' 
              ? (lang === 'en' ? 'Chibi Silhouette' : 'Silueta Chibi')
              : avatar.bodyArchetype === 'robust' 
              ? (lang === 'en' ? 'Titan Silhouette' : 'Silueta Titán')
              : avatar.bodyArchetype === 'astral_entity' 
              ? (lang === 'en' ? 'Astral Silhouette' : 'Silueta Astral')
              : (lang === 'en' ? 'Humanoid Silhouette' : 'Silueta Humanoide');

            return (
              <motion.div
                key={avatar.id}
                whileHover={{ y: -4, scale: 1.015 }}
                onClick={() => {
                  setPreviewAvatar(avatar.id);
                }}
                className={`p-6 rounded-[28px] border transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isPreviewed 
                    ? (isLight ? 'ring-2 ring-blue-500 shadow-xl' : 'ring-2 ring-blue-400/80 shadow-2xl shadow-blue-500/10') 
                    : ''
                } ${rarity.border} ${
                  isLight ? 'bg-white shadow-sm' : 'bg-zinc-950/80 shadow-xl'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${rarity.badgeBg}`}>
                      {lang === 'en' && rarity.labelEn ? rarity.labelEn : rarity.label}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                        isLight ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/10 text-zinc-400'
                      }`}>
                        {archetypeLabel}
                      </span>
                      {isEquipped && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <Check size={12} /> {lang === 'en' ? 'Active' : 'Activo'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Character 3D Center Stage */}
                  <div className={`w-full py-5 rounded-2xl flex items-center justify-center my-2 border transition-transform group-hover:scale-105 ${
                    isLight ? 'bg-zinc-50 border-zinc-200/70' : 'bg-white/[0.03] border-white/5'
                  }`}>
                    <FocuslyAvatar3D
                      avatarId={avatar.id}
                      outfitId={equippedOutfit}
                      accessoryId={equippedAccessory}
                      size="md"
                      showPedestal={true}
                      interactive={true}
                    />
                  </div>

                  {/* Character Lore & Archetype */}
                  <div className="mt-3 space-y-1.5">
                    <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 dark:text-blue-400">
                      {avatar.archetype || (lang === 'en' ? 'Focus Guardian' : 'Guardián del Enfoque')}
                    </div>
                    <h4 className="text-base sm:text-lg font-black uppercase tracking-tight truncate">
                      {avatar.name}
                    </h4>

                    {avatar.perk && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                        <Zap size={12} className="shrink-0" />
                        <span className="truncate">{avatar.perk}</span>
                      </div>
                    )}

                    <p className={`text-xs leading-relaxed line-clamp-2 mt-1.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      {avatar.lore || avatar.desc}
                    </p>
                  </div>
                </div>

                {/* Footer Price & Action */}
                <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-bold text-sky-600 dark:text-sky-400 text-sm">
                    {avatar.price === 0 ? (
                      <span className="text-emerald-500 font-bold text-xs uppercase">{lang === 'en' ? 'Starter' : 'Inicial'}</span>
                    ) : (
                      <>
                        <Gem size={15} />
                        <span>{avatar.price}</span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyOrEquip(avatar, 'avatar');
                    }}
                    className={`px-4.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isEquipped
                        ? 'bg-zinc-500/20 text-zinc-400 border border-zinc-500/30 cursor-default'
                        : isOwned
                        ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-zinc-200')
                        : userDiamonds >= avatar.price
                        ? (isLight ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm shadow-blue-500/20')
                        : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {isEquipped ? (lang === 'en' ? 'Equipped' : 'Equipado') : isOwned ? (lang === 'en' ? 'Equip' : 'Equipar') : (lang === 'en' ? 'Unlock' : 'Desbloquear')}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Success Modal / Toast */}
      <AnimatePresence>
        {purchaseSuccessItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-sm w-full p-6 rounded-3xl bg-zinc-900 border border-zinc-700/80 text-white text-center space-y-4 shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">
                {lang === 'en' ? 'Item Unlocked!' : '¡Elemento Desbloqueado!'}
              </h3>
              <p className="text-xs text-zinc-300">
                {lang === 'en' ? 'You obtained and equipped ' : 'Has obtenido y equipado '}
                <strong className="text-white">{purchaseSuccessItem.name}</strong>
                {lang === 'en' ? ' for your avatar.' : ' para tu avatar.'}
              </p>
              <button
                onClick={() => setPurchaseSuccessItem(null)}
                className="w-full py-3 rounded-xl bg-white text-zinc-950 font-bold uppercase text-xs tracking-wider hover:bg-zinc-100 transition-colors cursor-pointer shadow-sm"
              >
                {lang === 'en' ? 'Awesome!' : '¡Excelente!'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
