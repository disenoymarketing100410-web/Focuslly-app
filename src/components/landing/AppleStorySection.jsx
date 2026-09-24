import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function AppleStorySection({ onFinish }) {
  const PILLARS = [
    {
      number: '01',
      tag: 'Neurobiología Aplicada',
      title: 'La Fricción que Salva tu Mente',
      lead: 'Las redes sociales gastaron millones en eliminar toda fricción. Nosotros reintroducimos la pausa que te devuelve la consciencia.',
      description: 'Cuando intentas abrir Instagram o TikTok de forma refleja, Focusly intercepta la acción. En lugar de prohibir agresivamente, activa una micro-respiración guiada de 5 segundos. Ese breve instante permite que tu corteza prefrontal tome el mando sobre el impulso automático.',
      metric: '84%',
      metricLabel: 'de los impulsos de apertura compulsiva se disipan tras 5 segundos de pausa consciente.',
    },
    {
      number: '02',
      tag: 'Diseño Cognitivo',
      title: 'El Poder del Blanco y Negro',
      lead: 'Tu smartphone fue diseñado como una máquina tragamonedas. Quitar el color desactiva el truco.',
      description: 'Las notificaciones rojas y los feeds ultra saturados desencadenan dopamina inmediata antes de que leas una sola palabra. La interfaz monocromática de Focusly convierte tu pantalla en una herramienta sobria de alta precisión, devolviendo la calma a tu sistema nervioso.',
      metric: '-62%',
      metricLabel: 'de reducción en el tiempo de pantalla pasivo al adoptar una estética monocromática.',
    },
    {
      number: '03',
      tag: 'Aprendizaje Significativo',
      title: 'El Único Juego Donde Ganas Fuera de la Pantalla',
      lead: 'Otras aplicaciones te premian por gastar horas dentro de ellas. Focusly te recompensa por progresar en la vida real.',
      description: 'Convierte tu disciplina en un sistema de maestría. Cada bloque de concentración de 25 o 50 minutos acumula experiencia real, desbloquea insignias de prestigio y te impulsa en rutas pedagógicas de computación, neurociencia y técnicas de estudio.',
      metric: '4.2h',
      metricLabel: 'horas promedio recuperadas al día por cada estudiante y creador activo.',
    },
  ];

  return (
    <section id="filosofia" className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
      
      {/* Editorial Headline */}
      <div className="max-w-4xl space-y-6 mb-20">
        <span className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-500 block">
          Filosofía & Fundamentos
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
          Diseñado para desafiar <br />
          <span className="text-zinc-500">la economía de la atención.</span>
        </h2>
        <p className="text-base sm:text-lg text-zinc-400 font-medium leading-relaxed max-w-2xl pt-2">
          No estás falto de fuerza de voluntad. Estás compitiendo contra algoritmos diseñados para capturar cada segundo de tu mirada. Focusly es el contrapeso: sobrio, silencioso y neurobiológicamente implacable.
        </p>
      </div>

      {/* 3 Box-Free Open Editorial Chapters */}
      <div className="space-y-20 divide-y divide-white/10">
        {PILLARS.map((p, idx) => (
          <div key={idx} className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-baseline">
            
            {/* Left: Number and Tag */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-6xl sm:text-7xl font-mono font-black text-white/20 block select-none">
                {p.number}
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 block">
                {p.tag}
              </span>
            </div>

            {/* Center: Title, Lead and Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-snug">
                {p.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-200 font-semibold leading-relaxed">
                {p.lead}
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                {p.description}
              </p>
            </div>

            {/* Right: Giant Minimalist Metric */}
            <div className="lg:col-span-3 space-y-2 lg:pl-6 border-l border-white/10 lg:border-white/10">
              <div className="text-5xl sm:text-6xl font-mono font-black text-white tracking-tight">
                {p.metric}
              </div>
              <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                {p.metricLabel}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Minimalist Bottom Trigger */}
      <div className="pt-16 mt-16 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="text-xs text-zinc-400">
          Arquitectura monocromática verificada. Cero estímulos distractores.
        </div>
        <button
          onClick={onFinish}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white hover:text-zinc-300 transition-colors group cursor-pointer"
        >
          <span>Experimentar Focusly en la App</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
}
