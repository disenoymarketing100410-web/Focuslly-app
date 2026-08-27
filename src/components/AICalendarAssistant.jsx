import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Send, 
  X, 
  Calendar, 
  Clock, 
  Check, 
  AlertCircle, 
  Tag, 
  ChevronRight,
  Flame,
  Zap,
  ArrowRight
} from 'lucide-react';
import { DEFAULT_CATEGORIES, IMPORTANCE_CONFIG } from './InteractiveCalendar';

export const AICalendarAssistant = ({ onClose, calendarTasks, setCalendarTasks, isLight = false }) => {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'ai', 
      text: '¡Hola! Soy tu Asistente IA de Organización y Productividad. 🤖✨\n\nPuedo crear, programar y organizar tus tareas en el calendario con solo pedírmelo en lenguaje natural.',
      suggestions: [
        '📅 Bloque de estudio para examen de matemáticas mañana a las 4pm urgente',
        '⚡ Entregar proyecto de diseño el viernes a las 10:00',
        '🏃 Sesión de ejercicio en el gym lunes y miércoles a las 7am',
        '🧠 Desconexión digital y lectura 45 min hoy a las 8pm'
      ]
    }
  ]);

  // Natural Language Task Parser & Planner
  const parseTaskFromPrompt = (userPrompt) => {
    const text = userPrompt.trim();
    const textLower = text.toLowerCase();
    const today = new Date();

    // 1. Detect Category
    let category = 'Estudio';
    if (textLower.includes('trabajo') || textLower.includes('reunión') || textLower.includes('reunion') || textLower.includes('cliente') || textLower.includes('jefe') || textLower.includes('empresa') || textLower.includes('informe')) {
      category = 'Trabajo';
    } else if (textLower.includes('proyecto') || textLower.includes('entrega') || textLower.includes('presentación') || textLower.includes('presentacion') || textLower.includes('exposición') || textLower.includes('codigo') || textLower.includes('código') || textLower.includes('app') || textLower.includes('diseño')) {
      category = 'Proyectos';
    } else if (textLower.includes('gym') || textLower.includes('ejercicio') || textLower.includes('entrenar') || textLower.includes('correr') || textLower.includes('fitness') || textLower.includes('cardio') || textLower.includes('yoga')) {
      category = 'Fitness';
    } else if (textLower.includes('meditar') || textLower.includes('descanso') || textLower.includes('desconexión') || textLower.includes('desconexion') || textLower.includes('salud') || textLower.includes('psicolog') || textLower.includes('respiración')) {
      category = 'Salud & Mente';
    } else if (textLower.includes('dibujar') || textLower.includes('pintar') || textLower.includes('música') || textLower.includes('musica') || textLower.includes('escribir') || textLower.includes('creativ')) {
      category = 'Creatividad';
    } else if (textLower.includes('comprar') || textLower.includes('casa') || textLower.includes('personal') || textLower.includes('familia') || textLower.includes('amigos') || textLower.includes('llamada')) {
      category = 'Personal';
    } else if (textLower.includes('examen') || textLower.includes('parcial') || textLower.includes('estudiar') || textLower.includes('leer') || textLower.includes('repasar') || textLower.includes('quimica') || textLower.includes('matematica') || textLower.includes('historia') || textLower.includes('fisica') || textLower.includes('tarea') || textLower.includes('universidad') || textLower.includes('colegio')) {
      category = 'Estudio';
    }

    // 2. Detect Importance
    let importance = 'media';
    if (textLower.includes('urgente') || textLower.includes('crítico') || textLower.includes('critico') || textLower.includes('inmediato') || textLower.includes('ya mismo') || textLower.includes('asap')) {
      importance = 'urgente';
    } else if (textLower.includes('alta') || textLower.includes('muy importante') || textLower.includes('examen') || textLower.includes('parcial') || textLower.includes('prioridad')) {
      importance = 'alta';
    } else if (textLower.includes('baja') || textLower.includes('secundari') || textLower.includes('opcional') || textLower.includes('cuando pueda') || textLower.includes('sin prisa')) {
      importance = 'baja';
    }

    // 3. Detect Deadline flag
    const isDeadline = textLower.includes('vence') || textLower.includes('límite') || textLower.includes('limite') || textLower.includes('plazo') || textLower.includes('fecha límite');

    // 4. Detect Date
    let dateStr = '';
    const formatRegex = /\b(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\b/;
    const formatMatch = textLower.match(formatRegex);

    if (formatMatch) {
      const day = parseInt(formatMatch[1], 10);
      const month = parseInt(formatMatch[2], 10);
      let yearVal = formatMatch[3] ? parseInt(formatMatch[3], 10) : today.getFullYear();
      if (yearVal < 100) yearVal += 2000;
      dateStr = `${yearVal}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } else if (textLower.includes('hoy')) {
      dateStr = today.toISOString().split('T')[0];
    } else if (textLower.includes('pasado mañana') || textLower.includes('pasado manana')) {
      const d = new Date();
      d.setDate(d.getDate() + 2);
      dateStr = d.toISOString().split('T')[0];
    } else if (textLower.includes('mañana') || textLower.includes('manana')) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      dateStr = d.toISOString().split('T')[0];
    } else {
      const weekdays = {
        lunes: 1, martes: 2, 'miércoles': 3, miercoles: 3,
        jueves: 4, viernes: 5, 'sábado': 6, sabado: 6, domingo: 0
      };
      let foundDayOffset = -1;
      for (const [dayName, dayNum] of Object.entries(weekdays)) {
        if (textLower.includes(dayName)) {
          const currentDayNum = today.getDay();
          let daysToAdd = dayNum - currentDayNum;
          if (daysToAdd <= 0) daysToAdd += 7;
          foundDayOffset = daysToAdd;
          break;
        }
      }

      if (foundDayOffset !== -1) {
        const d = new Date();
        d.setDate(d.getDate() + foundDayOffset);
        dateStr = d.toISOString().split('T')[0];
      } else {
        const months = {
          enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
          julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
        };
        for (const [monthName, idx] of Object.entries(months)) {
          const regex = new RegExp(`(\\d{1,2})\\s+de\\s+${monthName}`);
          const match = textLower.match(regex);
          if (match) {
            const dayNumber = parseInt(match[1], 10);
            const d = new Date(today.getFullYear(), idx, dayNumber);
            if (d < today && (today.getTime() - d.getTime()) > 1000 * 60 * 60 * 24 * 30) {
              d.setFullYear(today.getFullYear() + 1);
            }
            dateStr = d.toISOString().split('T')[0];
            break;
          }
        }
      }
    }

    if (!dateStr) {
      dateStr = today.toISOString().split('T')[0];
    }

    // 5. Detect Time (StartTime & EndTime)
    let startTime = '09:00';
    let endTime = '10:00';

    // Regex for time like 4pm, 4:30pm, 16:00, a las 10, de 10 a 12
    const timeMatch = textLower.match(/(?:a las?|de|desde)?\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm|hrs|h|horas)?/i);
    const rangeMatch = textLower.match(/de\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*a\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);

    if (rangeMatch) {
      let h1 = parseInt(rangeMatch[1], 10);
      const m1 = rangeMatch[2] ? rangeMatch[2] : '00';
      const p1 = rangeMatch[3]?.toLowerCase();

      let h2 = parseInt(rangeMatch[4], 10);
      const m2 = rangeMatch[5] ? rangeMatch[5] : '00';
      const p2 = rangeMatch[6]?.toLowerCase();

      if (p1 === 'pm' && h1 < 12) h1 += 12;
      if (p2 === 'pm' && h2 < 12) h2 += 12;

      startTime = `${String(h1).padStart(2, '0')}:${m1}`;
      endTime = `${String(h2).padStart(2, '0')}:${m2}`;
    } else {
      const singleMatch = textLower.match(/(?:a las?|a las)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i);
      if (singleMatch) {
        let h = parseInt(singleMatch[1], 10);
        const m = singleMatch[2] || '00';
        const p = singleMatch[3]?.toLowerCase();
        if (p === 'pm' && h < 12) h += 12;
        if (p === 'am' && h === 12) h = 0;
        startTime = `${String(h).padStart(2, '0')}:${m}`;
        const endHour = (h + 1) % 24;
        endTime = `${String(endHour).padStart(2, '0')}:${m}`;
      } else if (textLower.includes('por la mañana') || textLower.includes('en la mañana')) {
        startTime = '09:00';
        endTime = '10:30';
      } else if (textLower.includes('por la tarde') || textLower.includes('en la tarde')) {
        startTime = '16:00';
        endTime = '17:30';
      } else if (textLower.includes('por la noche') || textLower.includes('en la noche')) {
        startTime = '20:00';
        endTime = '21:00';
      }
    }

    // 6. Clean Title
    let title = text
      .replace(/^(agéndame|agenda|crear|añadir|pon|programa|recuérdame|recuerdame|tengo que|tengo un|tengo una|bloque de|sesión de)\s+/i, '')
      .replace(/\s+(mañana|hoy|pasado mañana|este viernes|el lunes|el martes|el miércoles|el jueves|el sábado|el domingo|a las.*|de \d+ a \d+.*|urgente|alta prioridad|por la tarde|por la mañana)\b.*/i, '')
      .trim();

    if (!title || title.length < 3) {
      title = text.slice(0, 40);
    }

    title = title.charAt(0).toUpperCase() + title.slice(1);

    // Activity type
    let type = 'tarea';
    if (textLower.includes('examen') || textLower.includes('parcial') || textLower.includes('test')) type = 'examen';
    else if (textLower.includes('proyecto') || textLower.includes('entrega')) type = 'proyecto';

    return {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title,
      description: `Creado inteligentemente por el Asistente IA a partir de: "${text}"`,
      date: dateStr,
      startTime,
      endTime,
      importance,
      category,
      type,
      isCompleted: false,
      isDeadline
    };
  };

  const handleSend = (customPrompt) => {
    const promptText = customPrompt || input;
    if (!promptText.trim() || isProcessing) return;

    const userMsg = { id: Date.now(), sender: 'user', text: promptText };
    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTask = parseTaskFromPrompt(promptText);

      // Add to calendar tasks state
      setCalendarTasks(prev => [...prev, generatedTask]);

      const catInfo = DEFAULT_CATEGORIES.find(c => c.name === generatedTask.category) || DEFAULT_CATEGORIES[0];
      const importanceLabel = IMPORTANCE_CONFIG[generatedTask.importance]?.label || 'Media';

      const responseText = `¡Listo! He analizado tu solicitud y he agendado la siguiente tarea en tu calendario con éxito:`;

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: responseText,
        createdTask: generatedTask,
        catInfo,
        importanceLabel
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 700);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: '100%' }} 
      transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
      className="fixed inset-0 z-[140] bg-black/95 backdrop-blur-2xl flex flex-col"
    >
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-10 pb-3 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center border border-indigo-400/40 shadow-[0_0_20px_rgba(99,102,241,0.5)] shrink-0">
            <Brain size={18} className="text-white sm:w-[22px] sm:h-[22px]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-tight text-white truncate">Focusly IA Planner</h2>
              <span className="text-[8px] sm:text-[9px] font-black text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> Activo
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] font-bold text-white/50 uppercase tracking-widest mt-0.5 truncate">Agendamiento Inteligente</p>
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white shrink-0 ml-2"
        >
          <X size={18} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 flex flex-col gap-3.5 custom-scroll max-w-3xl mx-auto w-full">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex flex-col gap-1.5 max-w-[95%] sm:max-w-[85%] ${
              msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
            }`}
          >
            <div className={`p-3.5 sm:p-5 rounded-[22px] sm:rounded-[26px] shadow-lg w-full ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-xs font-bold text-xs leading-relaxed' 
                : 'bg-white/10 border border-white/15 text-white rounded-tl-xs'
            }`}>
              <p className="text-xs font-medium leading-relaxed whitespace-pre-line break-words">{msg.text}</p>

              {/* Render Created Task Card within AI message */}
              {msg.createdTask && (
                <div className="mt-3 p-3 sm:p-4 rounded-2xl bg-black/40 border border-white/15 space-y-2 w-full">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 truncate">
                      {msg.catInfo?.icon} {msg.createdTask.category}
                    </span>
                    <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      IMPORTANCE_CONFIG[msg.createdTask.importance]?.badge
                    }`}>
                      {msg.importanceLabel}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-black text-white break-words">{msg.createdTask.title}</h4>

                  <div className="flex flex-wrap items-center gap-2.5 text-[10px] sm:text-[11px] font-bold text-white/70 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-indigo-400" /> {msg.createdTask.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-purple-400" /> {msg.createdTask.startTime} - {msg.createdTask.endTime}
                    </span>
                  </div>

                  <div className="pt-1.5 flex items-center justify-between text-[9px] sm:text-[10px] text-emerald-400 font-bold border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Check size={12} /> Añadido a tu calendario
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions Chips */}
            {msg.suggestions && (
              <div className="flex flex-col gap-1.5 mt-1.5 w-full">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-indigo-400">Prueba pidiéndome:</span>
                <div className="flex flex-col sm:flex-row flex-wrap gap-1.5 w-full">
                  {msg.suggestions.map((sug, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(sug)}
                      className="text-left text-[10px] sm:text-[11px] font-bold text-white/80 hover:text-white bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/40 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl transition-all active:scale-95 break-words"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="self-start bg-white/10 border border-white/15 p-3 sm:p-4 rounded-2xl flex items-center gap-2.5 text-xs font-bold text-indigo-300 max-w-full">
            <Sparkles size={15} className="animate-spin text-yellow-400 shrink-0" />
            <span className="truncate">Planificando y organizando tu tarea...</span>
          </div>
        )}
      </div>

      {/* Input Box Footer */}
      <div className="p-3 sm:p-5 bg-black/80 border-t border-white/10 pb-6 sm:pb-8 shrink-0">
        <div className="max-w-3xl mx-auto flex gap-2 sm:gap-3">
          <input 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            onKeyDown={e => e.key === 'Enter' && handleSend()} 
            placeholder="Ej: Tengo examen el jueves a las 9am con alta prioridad..." 
            className="flex-1 bg-white/5 border border-white/15 rounded-xl sm:rounded-2xl px-3.5 sm:px-5 py-2.5 sm:py-3.5 text-xs font-bold text-white placeholder:text-white/30 outline-none focus:border-indigo-500 transition-colors" 
          />
          <button 
            onClick={() => handleSend()} 
            disabled={!input.trim() || isProcessing}
            className={`px-4 sm:px-5 rounded-xl sm:rounded-2xl text-white flex items-center justify-center shrink-0 transition-all ${
              input.trim() && !isProcessing
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] active:scale-95'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
