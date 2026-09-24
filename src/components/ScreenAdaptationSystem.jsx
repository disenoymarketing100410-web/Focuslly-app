import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

const ScreenAdaptationContext = createContext(null);

/**
 * Sistema de Adaptación Automática de Pantalla
 * Detecta y ajusta la interfaz automáticamente al tamaño exacto de la pantalla
 * sin requerir botones ni interacción manual del usuario.
 */
export const ScreenAdaptationProvider = ({ children }) => {
  // Dimensiones del viewport en tiempo real
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === 'undefined') return { width: 1440, height: 900, dpr: 1 };
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      dpr: window.devicePixelRatio || 1
    };
  });

  // Limpiar cualquier modo manual residual para garantizar adaptación 100% automática a la pantalla
  useEffect(() => {
    try {
      localStorage.removeItem('focusly_device_mode');
      localStorage.removeItem('focusly_screen_adaptation_v2');
    } catch {}
  }, []);

  // Listener reactivo de redimensionamiento de ventana y orientación
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      setDimensions({ width, height, dpr });

      // Actualizar variables CSS dinámicas para CSS fluido
      const vh = height * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--real-width', `${width}px`);
      document.documentElement.style.setProperty('--real-height', `${height}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Detección automática del tipo de dispositivo según dimensiones reales
  const isDesktop = useMemo(() => {
    const { width } = dimensions;
    // A partir de 768px (tablets landscape, laptops, PCs), la app llena toda la pantalla en modo desktop
    return width >= 768;
  }, [dimensions]);

  // Escala natural 100% (sin encoger artificialmente la interfaz al agrandar la ventana)
  const scale = 1.0;

  const density = useMemo(() => {
    if (dimensions.height < 800 || dimensions.width < 1360) return 'compact';
    return 'comfortable';
  }, [dimensions]);

  // Sincronizar escala con el documento
  useEffect(() => {
    document.documentElement.style.setProperty('--app-scale', `${scale}`);
    document.documentElement.style.setProperty('--app-density', density);
  }, [scale, density]);

  const value = {
    dimensions,
    isDesktop,
    scale,
    scalePercent: Math.round(scale * 100),
    density
  };

  return (
    <ScreenAdaptationContext.Provider value={value}>
      {children}
    </ScreenAdaptationContext.Provider>
  );
};

export const useScreenAdaptation = () => {
  const context = useContext(ScreenAdaptationContext);
  if (!context) {
    return {
      dimensions: { width: 1440, height: 900, dpr: 1 },
      isDesktop: true,
      scale: 1.0,
      scalePercent: 100,
      density: 'comfortable'
    };
  }
  return context;
};
