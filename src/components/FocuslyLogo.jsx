import React from 'react';

export function FocuslyIcon({ size = 40, className = '' }) {
  const hasWidth = className.includes('w-');
  const hasHeight = className.includes('h-');

  return (
    <img 
      src="/focusly-logo-icon.png" 
      alt="Focusly" 
      width={size} 
      height={size} 
      className={`shrink-0 object-contain select-none ${className}`}
      style={{
        width: hasWidth ? undefined : size,
        height: hasHeight ? undefined : size,
      }}
      loading="eager"
      decoding="async"
    />
  );
}

export function FocuslyLogo({ 
  size = 'md', 
  isLight = false, 
  showBadge = true, 
  badgeText = 'PRO',
  className = '',
  onClick
}) {
  // Preset dimensions for pixel-perfect alignment
  const iconSize = size === 'sm' ? 32 : size === 'lg' ? 50 : size === 'xl' ? 64 : 40;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl sm:text-3xl' : size === 'xl' ? 'text-4xl' : 'text-xl sm:text-2xl';

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Original F Logo Icon */}
      <div className="relative group-hover:scale-105 transition-transform duration-300 shrink-0">
        <FocuslyIcon size={iconSize} className="drop-shadow-[0_4px_16px_rgba(255,255,255,0.18)]" />
      </div>

      {/* Wordmark and Badge */}
      <div className="flex items-center gap-2">
        <span 
          className={`font-black tracking-[0.14em] uppercase leading-none transition-colors duration-300 ${textSize} ${
            isLight ? 'text-zinc-950' : 'text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]'
          }`}
        >
          FOCUSLY
        </span>

        {showBadge && (
          <span 
            className={`text-[8px] font-black tracking-[0.25em] uppercase px-2 py-0.5 rounded-full border shadow-sm ${
              isLight 
                ? 'bg-zinc-900/10 text-zinc-800 border-zinc-900/20' 
                : 'bg-white/15 text-white border-white/25'
            }`}
          >
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
