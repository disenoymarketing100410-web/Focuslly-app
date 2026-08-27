import React from 'react';

// Crisp, high-contrast embedded SVGs for all apps (guaranteed to render offline and across all themes)
export const APP_SVGS = {
  insta: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <defs>
        <radialGradient id="instaGrad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6" fill="url(#instaGrad)" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.6" fill="none" />
      <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
    </svg>
  ),
  fb: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#1877F2" />
      <path d="M15.5 13.5l.6-4h-3.8V6.9c0-1.1.5-2.2 2.3-2.2H16V1.3c-.6-.1-1.6-.2-2.7-.2-2.8 0-4.6 1.7-4.6 4.8v3.6H5.5v4h3.2V23h4.8v-9.5h2z" fill="#ffffff" />
    </svg>
  ),
  tt: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#010101" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
      {/* Cyan Shadow */}
      <path d="M16.5 7.8c-1.1-.7-1.8-1.9-1.9-3.3h-2.5v11.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2V10.7c-.3 0-.7-.1-1-.1-3 0-5.4 2.4-5.4 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4V9.6c1.3.9 2.8 1.4 4.4 1.4V8.5c-1 0-2-.3-2.7-.7z" fill="#00f2fe" transform="translate(-0.6, -0.6)" />
      {/* Red Shadow */}
      <path d="M16.5 7.8c-1.1-.7-1.8-1.9-1.9-3.3h-2.5v11.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2V10.7c-.3 0-.7-.1-1-.1-3 0-5.4 2.4-5.4 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4V9.6c1.3.9 2.8 1.4 4.4 1.4V8.5c-1 0-2-.3-2.7-.7z" fill="#fe2c55" transform="translate(0.6, 0.6)" />
      {/* White Base */}
      <path d="M16.5 7.8c-1.1-.7-1.8-1.9-1.9-3.3h-2.5v11.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .7.1 1 .2V10.7c-.3 0-.7-.1-1-.1-3 0-5.4 2.4-5.4 5.4s2.4 5.4 5.4 5.4 5.4-2.4 5.4-5.4V9.6c1.3.9 2.8 1.4 4.4 1.4V8.5c-1 0-2-.3-2.7-.7z" fill="#ffffff" />
    </svg>
  ),
  yt: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#FF0000" />
      <path d="M19.5 8.2c-.2-.7-.7-1.3-1.4-1.5-1.2-.3-6.1-.3-6.1-.3s-4.9 0-6.1.3c-.7.2-1.2.8-1.4 1.5-.3 1.2-.3 3.8-.3 3.8s0 2.6.3 3.8c.2.7.7 1.3 1.4 1.5 1.2.3 6.1.3 6.1.3s4.9 0 6.1-.3c.7-.2 1.2-.8 1.4-1.5.3-1.2.3-3.8.3-3.8s0-2.6-.3-3.8z" fill="#ffffff" />
      <polygon points="10.2,9.6 15,12 10.2,14.4" fill="#FF0000" />
    </svg>
  ),
  x: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#111111" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <path d="M15.7 5.5h2.1l-4.6 5.3 5.4 7.2h-4.3l-3.3-4.4-3.8 4.4H5.1l4.9-5.7L4.7 5.5H9l3 4 3.7-4zm-.7 11.2h1.2L8.7 6.7H7.4l7.6 10z" fill="#ffffff" />
    </svg>
  ),
  sc: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#FFFC00" />
      <path d="M12 4.5c-2.4 0-4 1.7-4 3.8 0 .5.2 1.5.3 1.8-.4.1-.9.4-1.1.8-.2.3-.2.7 0 1 .3.4.8.5 1.4.5-.1.4-.4 1.3-.9 1.6-.6.4-1.4.4-1.8.8-.2.2-.3.5-.2.8.2.5 1.1.7 1.8.8.4.1.7.3.7.6 0 .3-.4.6-.9 1-.5.3-.8.6-.8 1 0 .6.7 1 1.9 1 1 .1 2.3-.6 3.5-.6s2.5.7 3.5.6c1.2 0 1.9-.4 1.9-1 0-.4-.3-.7-.8-1-.5-.4-.9-.7-.9-1 0-.3.3-.5.7-.6.7-.1 1.6-.3 1.8-.8.1-.3 0-.6-.2-.8-.4-.4-1.2-.4-1.8-.8-.5-.3-.8-1.2-.9-1.6.6 0 1.1-.1 1.4-.5.2-.3.2-.7 0-1-.2-.4-.7-.7-1.1-.8.1-.3.3-1.3.3-1.8 0-2.1-1.6-3.8-4-3.8z" fill="#ffffff" stroke="#000000" strokeWidth="0.8" />
    </svg>
  ),
  pin: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#E60023" />
      <path d="M12 4.5c-4.1 0-7.5 3.4-7.5 7.5 0 3.2 2 5.9 4.8 7-.1-.6-.1-1.5.1-2.1l1.1-4.7s-.3-.6-.3-1.4c0-1.3.8-2.3 1.8-2.3.8 0 1.3.6 1.3 1.4 0 .8-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.2-1.9 3.2-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.2-4.6 4.4 0 .9.3 1.8.8 2.3.1.1.1.2.1.3l-.3 1.2c0 .2-.2.2-.3.1-1.3-.6-2.1-2.5-2.1-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.5 2.6 6.5 6.1 0 3.6-2.3 6.6-5.4 6.6-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2.9-.9 2-1.3 2.7 1 .3 2 .5 3.1.5 4.1 0 7.5-3.4 7.5-7.5s-3.4-7.5-7.5-7.5z" fill="#ffffff" />
    </svg>
  ),
  in: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#0A66C2" />
      <path d="M6.9 9.3h2.6v8.4H6.9V9.3zM8.2 5.3c.9 0 1.6.7 1.6 1.6s-.7 1.6-1.6 1.6-1.6-.7-1.6-1.6.7-1.6 1.6-1.6zM11.2 9.3h2.5v1.2h.1c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2v4.4h-2.6v-3.9c0-.9 0-2.1-1.3-2.1-1.3 0-1.5 1-1.5 2v4H11.2V9.3z" fill="#ffffff" />
    </svg>
  ),
  rd: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#FF4500" />
      <circle cx="12" cy="13.2" r="5" fill="#ffffff" />
      <path d="M15.5 8.7c-.5 0-.9.4-.9.9v1.6c-1-.4-2.2-.6-3.4-.6-1.2 0-2.4.2-3.4.6V9.6c0-.5-.4-.9-.9-.9s-.9.4-.9.9.4.9.9.9c0 .1 0 .2.1.3-1.1.7-1.8 1.8-1.8 3 0 2 2.3 3.6 5.2 3.6s5.2-1.6 5.2-3.6c0-1.2-.7-2.3-1.8-3 0-.1.1-.2.1-.3.5 0 .9-.4.9-.9 0-.5-.4-.9-.9-.9z" fill="#ffffff" />
      <circle cx="9.8" cy="13.5" r="1.1" fill="#FF4500" />
      <circle cx="14.2" cy="13.5" r="1.1" fill="#FF4500" />
      <path d="M10.2 15.5c.5.5 1.1.7 1.8.7s1.3-.2 1.8-.7" stroke="#FF4500" strokeWidth="0.9" strokeLinecap="round" />
    </svg>
  ),
  wa: (className = "w-full h-full") => (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <rect width="24" height="24" rx="6" fill="#25D366" />
      <path d="M12 4.5c-4.1 0-7.5 3.4-7.5 7.5 0 1.4.4 2.8 1.1 4L4.5 19.5l3.6-1.1c1.2.6 2.5 1 3.9 1 4.1 0 7.5-3.4 7.5-7.5s-3.4-7.4-7.5-7.4zm4.4 10.6c-.2.5-1.1 1-1.6 1.1-.5.1-1.1.1-1.8-.1-.4-.2-1-.4-1.7-.8-3-1.6-4.9-4.8-5.1-5-.1-.2-1.2-1.6-1.2-3.1 0-1.4.7-2.1 1-2.4.3-.3.6-.4.9-.4.2 0 .4 0 .6.1.2 0 .4.7.6 1.1.2.4.6 1.4.6 1.5 0 .2 0 .4-.1.6-.1.2-.2.3-.4.5-.2.2-.3.3-.5.5-.2.2-.4.4-.2.7.3.5.7 1.3 1.5 2 1 1 1.9 1.3 2.4 1.5.2.1.5 0 .7-.2.2-.2.9-1 1.1-1.4.2-.3.4-.3.7-.2.3.1 1.8.8 2.1 1 .3.2.5.3.6.4.1.2.1.8-.1 1.3z" fill="#ffffff" />
    </svg>
  )
};

export const APPS_DATA = [
  { id: 'insta', name: 'INSTAGRAM', brandColor: '#E4405F', color: '#E4405F', icon: 'https://cdn.simpleicons.org/instagram/E4405F' },
  { id: 'fb', name: 'FACEBOOK', brandColor: '#1877F2', color: '#1877F2', icon: 'https://cdn.simpleicons.org/facebook/1877F2' },
  { id: 'tt', name: 'TIKTOK', brandColor: '#FE2C55', color: '#FE2C55', icon: 'https://cdn.simpleicons.org/tiktok/ffffff' },
  { id: 'yt', name: 'YOUTUBE', brandColor: '#FF0000', color: '#FF0000', icon: 'https://cdn.simpleicons.org/youtube/FF0000' },
  { id: 'x', name: 'X', brandColor: '#ffffff', color: '#ffffff', icon: 'https://cdn.simpleicons.org/x/ffffff' },
  { id: 'sc', name: 'SNAPCHAT', brandColor: '#FFFC00', color: '#FFFC00', icon: 'https://cdn.simpleicons.org/snapchat/FFFC00' },
  { id: 'pin', name: 'PINTEREST', brandColor: '#E60023', color: '#E60023', icon: 'https://cdn.simpleicons.org/pinterest/E60023' },
  { id: 'in', name: 'LINKEDIN', brandColor: '#0A66C2', color: '#0A66C2', icon: 'https://cdn.simpleicons.org/linkedin/0A66C2' },
  { id: 'rd', name: 'REDDIT', brandColor: '#FF4500', color: '#FF4500', icon: 'https://cdn.simpleicons.org/reddit/FF4500' },
  { id: 'wa', name: 'WHATSAPP', brandColor: '#25D366', color: '#25D366', icon: 'https://cdn.simpleicons.org/whatsapp/25D366' }
];

export const AppIcon = ({ id, className = "w-full h-full", fallbackSrc = null, alt = "App Icon" }) => {
  const svgRenderer = APP_SVGS[id];
  if (svgRenderer) {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {svgRenderer(className)}
      </div>
    );
  }

  // Fallback to simple image if unknown id
  return (
    <img 
      src={fallbackSrc || `https://cdn.simpleicons.org/${id}`} 
      alt={alt} 
      className={`object-contain ${className}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.style.display = 'none';
      }}
    />
  );
};
