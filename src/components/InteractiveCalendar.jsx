import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Circle, 
  AlertCircle, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Brain, 
  Sparkles, 
  X, 
  CalendarDays, 
  ListTodo,
  ArrowRight
} from 'lucide-react';

export const DEFAULT_CATEGORIES = [
  { id: 'estudio', name: 'Estudio', color: '#6366F1', bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200', bgDark: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30', icon: '📚' },
  { id: 'trabajo', name: 'Trabajo', color: '#3B82F6', bgLight: 'bg-blue-50 text-blue-700 border-blue-200', bgDark: 'bg-blue-500/20 text-blue-300 border-blue-500/30', icon: '💼' },
  { id: 'proyectos', name: 'Proyectos', color: '#A855F7', bgLight: 'bg-purple-50 text-purple-700 border-purple-200', bgDark: 'bg-purple-500/20 text-purple-300 border-purple-500/30', icon: '⚡' },
  { id: 'fitness', name: 'Fitness', color: '#10B981', bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200', bgDark: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', icon: '🏃' },
  { id: 'personal', name: 'Personal', color: '#F59E0B', bgLight: 'bg-amber-50 text-amber-700 border-amber-200', bgDark: 'bg-amber-500/20 text-amber-300 border-amber-500/30', icon: '🎯' },
  { id: 'salud', name: 'Salud & Mente', color: '#EC4899', bgLight: 'bg-pink-50 text-pink-700 border-pink-200', bgDark: 'bg-pink-500/20 text-pink-300 border-pink-500/30', icon: '🧠' },
  { id: 'creatividad', name: 'Creatividad', color: '#06B6D4', bgLight: 'bg-cyan-50 text-cyan-700 border-cyan-200', bgDark: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', icon: '🎨' }
];

export const IMPORTANCE_CONFIG = {
  urgente: { label: 'Urgente', color: '#EF4444', badge: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-500', icon: '🚨' },
  alta: { label: 'Alta', color: '#F97316', badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30', dot: 'bg-orange-500', icon: '🔥' },
  media: { label: 'Media', color: '#EAB308', badge: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-500', icon: '⚡' },
  baja: { label: 'Baja', color: '#10B981', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-500', icon: '🌱' }
};

const DAYS_NAMES_SHORT = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MONTHS_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export const InteractiveCalendar = ({
  tasks = [],
  setTasks,
  onOpenAICalendar,
  isLight = false,
  onModalOpenChange
}) => {
  // Principal: Vista por día con selector para ver mes
  const [viewMode, setViewMode] = useState('dia'); // 'dia' | 'mes' | 'lista'
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(() => new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('todos');
  
  // Custom categories state with localStorage persistence
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('focusly_calendar_categories');
      return saved ? JSON.parse(saved) : DEFAULT_CATEGORIES;
    } catch {
      return DEFAULT_CATEGORIES;
    }
  });

  // Modals
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Notify parent if modals are open to hide floating nav
  useEffect(() => {
    onModalOpenChange?.(Boolean(isTaskModalOpen || isCategoryModalOpen));
  }, [isTaskModalOpen, isCategoryModalOpen, onModalOpenChange]);

  useEffect(() => {
    return () => {
      onModalOpenChange?.(false);
    };
  }, [onModalOpenChange]);

  // Drag & drop state for Month view
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('focusly_calendar_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const calendarTasks = useMemo(() => {
    return tasks.filter(t => !t.isHabit);
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return calendarTasks.filter(task => {
      const matchesSearch = !searchQuery || 
        task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategoryFilter === 'todos' || 
        task.category?.toLowerCase() === selectedCategoryFilter.toLowerCase() ||
        task.type?.toLowerCase() === selectedCategoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [calendarTasks, searchQuery, selectedCategoryFilter]);

  // Current date helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Helper date parsing (avoid timezone UTC offset shifts)
  const getParsedDate = (dateStr) => {
    if (!dateStr) return new Date();
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    }
    return new Date(dateStr);
  };

  // Move selected date day by day
  const handleStepDay = (direction) => {
    const d = getParsedDate(selectedDateStr);
    d.setDate(d.getDate() + direction);
    const newStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    setSelectedDateStr(newStr);
    setCurrentDate(d);
  };

  const handleSelectDay = (dateStr) => {
    setSelectedDateStr(dateStr);
    const d = getParsedDate(dateStr);
    setCurrentDate(d);
  };

  const handleGoToday = () => {
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setCurrentDate(today);
    setSelectedDateStr(todayStr);
  };

  // Month navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Days horizontal strip for Day View (7 days centered around selected day)
  const dayStrip = useMemo(() => {
    const base = getParsedDate(selectedDateStr);
    const strip = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      const dayOfWeekIndex = d.getDay() === 0 ? 6 : d.getDay() - 1; // Mon = 0
      const isToday = new Date().toISOString().split('T')[0] === dateStr;
      const count = filteredTasks.filter(t => t.date === dateStr).length;
      strip.push({
        dateStr,
        dayNumber: d.getDate(),
        dayName: DAYS_NAMES_SHORT[dayOfWeekIndex],
        isToday,
        isSelected: selectedDateStr === dateStr,
        taskCount: count
      });
    }
    return strip;
  }, [selectedDateStr, filteredTasks]);

  // Month Grid calculation
  const monthGridDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const totalDays = lastDay.getDate();
    const days = [];

    // Prev month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = prevMonthLastDay - i;
      const prevDate = new Date(year, month - 1, d);
      const dateStr = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = new Date().toISOString().split('T')[0] === dateStr;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: true,
        isToday
      });
    }

    // Next month padding
    const remaining = (7 - (days.length % 7)) % 7;
    for (let d = 1; d <= remaining; d++) {
      const nextDate = new Date(year, month + 1, d);
      const dateStr = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        dayNumber: d,
        dateStr,
        isCurrentMonth: false
      });
    }

    return days;
  }, [year, month]);

  // Task actions
  const handleToggleComplete = (taskId, e) => {
    e?.stopPropagation();
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const nextState = !t.isCompleted;
        if (nextState) {
          showToast(`¡Completada: "${t.title}"! 🎉`);
        }
        return { ...t, isCompleted: nextState };
      }
      return t;
    }));
  };

  const handleDeleteTask = (taskId, e) => {
    e?.stopPropagation();
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Tarea eliminada');
  };

  const handleOpenCreateForDate = (dateStr, defaultHour = '09:00') => {
    setSelectedDateStr(dateStr);
    const endHourNum = Math.min(23, parseInt(defaultHour.split(':')[0], 10) + 1);
    const endHourStr = `${String(endHourNum).padStart(2, '0')}:00`;

    setEditingTask({
      id: `task_${Date.now()}`,
      title: '',
      description: '',
      date: dateStr,
      startTime: defaultHour,
      endTime: endHourStr,
      importance: 'media',
      category: categories[0]?.name || 'Estudio',
      type: 'tarea',
      isCompleted: false,
      isDeadline: false
    });
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task, e) => {
    e?.stopPropagation();
    setEditingTask({ ...task });
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = (savedTask) => {
    if (!savedTask.title.trim()) return;
    
    setTasks(prev => {
      const exists = prev.some(t => t.id === savedTask.id);
      if (exists) {
        return prev.map(t => t.id === savedTask.id ? savedTask : t);
      }
      return [...prev, savedTask];
    });

    setIsTaskModalOpen(false);
    setEditingTask(null);
    showToast('Tarea guardada 📅');
  };

  // Drag & Drop for Month View
  const handleDragStart = (taskId, e) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (dateStr, e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverDate !== dateStr) setDragOverDate(dateStr);
  };

  const handleDrop = (targetDateStr, e) => {
    e.preventDefault();
    setDragOverDate(null);
    const taskId = draggedTaskId || e.dataTransfer.getData('text/plain');
    if (!taskId) return;

    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, date: targetDateStr } : t));
    setDraggedTaskId(null);
    showToast(`Movido al ${targetDateStr} ✨`);
  };

  const getCategoryInfo = (categoryName) => {
    const found = categories.find(c => c.name.toLowerCase() === categoryName?.toLowerCase() || c.id === categoryName?.toLowerCase());
    return found || {
      name: categoryName || 'General',
      color: '#818CF8',
      bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      bgDark: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      icon: '📌'
    };
  };

  // Current day tasks for Day View
  const selectedDayTasks = useMemo(() => {
    return filteredTasks
      .filter(t => t.date === selectedDateStr)
      .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));
  }, [filteredTasks, selectedDateStr]);

  const selectedDateObject = getParsedDate(selectedDateStr);
  const formattedDayTitle = selectedDateObject.toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const isSelectedDateToday = selectedDateStr === todayStr;

  return (
    <div className="w-full flex flex-col gap-3.5 sm:gap-4 max-w-full overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key="cal-toast-notification"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[110] px-4 py-2 rounded-full shadow-2xl backdrop-blur-xl border flex items-center gap-2 text-xs font-black tracking-wide ${
              isLight 
                ? 'bg-neutral-900/95 text-white border-white/20' 
                : 'bg-white/95 text-neutral-950 border-black/10'
            }`}
          >
            <Sparkles size={14} className="text-yellow-400 shrink-0" />
            <span className="truncate max-w-[240px] sm:max-w-xs">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant Banner: 100% contained */}
      <div 
        onClick={onOpenAICalendar}
        className={`w-full overflow-hidden rounded-[22px] sm:rounded-[26px] p-3.5 sm:p-4 border cursor-pointer group transition-all duration-200 active:scale-[0.99] ${
          isLight
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400/40 shadow-sm'
            : 'bg-gradient-to-r from-indigo-950/90 via-purple-950/80 to-neutral-900/95 text-white border-indigo-500/30 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <Brain size={18} className="text-white drop-shadow" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-white/20 text-white truncate">
                  IA Planner
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-yellow-300 flex items-center gap-1 shrink-0">
                  <Sparkles size={9} /> Auto-Agendado
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight truncate">
                Asistente de Calendario Focusly
              </h3>
              <p className="text-[10px] text-white/70 truncate hidden sm:block">
                Escribe en lenguaje natural y creamos tus bloques de tareas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl shrink-0 transition-colors">
            <span>Abrir</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>

      {/* Main View Container Card */}
      <div className={`w-full rounded-[24px] sm:rounded-[28px] p-3.5 sm:p-5 border transition-all ${
        isLight 
          ? 'bg-white border-neutral-200/90 shadow-sm' 
          : 'bg-neutral-900/80 backdrop-blur-xl border-white/10 shadow-xl'
      }`}>
        
        {/* Top Control Bar: Two clean full-width rows on mobile, perfectly aligned on desktop */}
        <div className="flex flex-col gap-2.5 pb-3 sm:pb-4 border-b border-neutral-200/80 dark:border-white/10">
          
          {/* Row 1: View Selector Tabs (Día, Mes, Todas) */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 w-full">
            <button
              onClick={() => setViewMode('dia')}
              className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all truncate ${
                viewMode === 'dia'
                  ? isLight ? 'bg-neutral-950 text-white shadow-sm' : 'bg-white text-black shadow-md'
                  : isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/60 hover:text-white'
              }`}
            >
              <Clock size={12} className="shrink-0" />
              <span className="truncate">Por Día</span>
            </button>

            <button
              onClick={() => setViewMode('mes')}
              className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all truncate ${
                viewMode === 'mes'
                  ? isLight ? 'bg-neutral-950 text-white shadow-sm' : 'bg-white text-black shadow-md'
                  : isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/60 hover:text-white'
              }`}
            >
              <CalendarDays size={12} className="shrink-0" />
              <span className="truncate">Ver Mes</span>
            </button>

            <button
              onClick={() => setViewMode('lista')}
              className={`flex items-center justify-center gap-1 py-2 px-1 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all truncate ${
                viewMode === 'lista'
                  ? isLight ? 'bg-neutral-950 text-white shadow-sm' : 'bg-white text-black shadow-md'
                  : isLight ? 'text-neutral-600 hover:text-neutral-950' : 'text-white/60 hover:text-white'
              }`}
            >
              <ListTodo size={12} className="shrink-0" />
              <span className="truncate">Todas</span>
            </button>
          </div>

          {/* Row 2: Secondary Quick Actions */}
          <div className="flex items-center justify-between gap-2 w-full">
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className={`flex-1 sm:flex-initial py-2 px-3 rounded-xl border text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 truncate ${
                isLight 
                  ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-200 text-neutral-700' 
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
              }`}
              title="Administrar Categorías"
            >
              <Tag size={13} className="shrink-0 text-indigo-400" />
              <span className="truncate">Categorías ({categories.length})</span>
            </button>

            <button
              onClick={() => handleOpenCreateForDate(selectedDateStr)}
              className={`flex-1 sm:flex-initial py-2 px-3.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 truncate ${
                isLight
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20'
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/30'
              }`}
            >
              <Plus size={14} className="shrink-0" />
              <span className="truncate">Nueva Tarea</span>
            </button>
          </div>
        </div>

        {/* --- VIEW 1: VISTA POR DÍA (Principal, 100% contenida) --- */}
        {viewMode === 'dia' && (
          <div className="pt-3.5 sm:pt-4 flex flex-col gap-3.5 w-full">
            
            {/* Day Header with Navigation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-neutral-100/70 dark:bg-white/[0.03] p-2.5 sm:p-3 rounded-2xl border border-neutral-200/70 dark:border-white/5 w-full">
              
              {/* Stepper + Date */}
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="flex items-center gap-0.5 bg-white dark:bg-white/10 p-0.5 rounded-xl border border-neutral-200/80 dark:border-white/10 shadow-sm shrink-0">
                  <button 
                    onClick={() => handleStepDay(-1)} 
                    className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-white transition-colors"
                    title="Día anterior"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button 
                    onClick={handleGoToday}
                    className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-colors ${
                      isSelectedDateToday 
                        ? 'bg-indigo-600 text-white shadow-sm' 
                        : 'text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10'
                    }`}
                  >
                    Hoy
                  </button>
                  <button 
                    onClick={() => handleStepDay(1)} 
                    className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-white transition-colors"
                    title="Día siguiente"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                <div className="min-w-0 flex-1 pl-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 block truncate">
                    {isSelectedDateToday ? '• Día de Hoy' : 'Día Seleccionado'}
                  </span>
                  <h4 className={`text-xs sm:text-sm font-black capitalize tracking-tight truncate ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                    {formattedDayTitle}
                  </h4>
                </div>
              </div>

              {/* Task count badge */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                <span className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full border truncate ${
                  selectedDayTasks.length > 0
                    ? isLight ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
                    : 'bg-neutral-200/50 dark:bg-white/5 text-neutral-400 border-transparent'
                }`}>
                  {selectedDayTasks.length} {selectedDayTasks.length === 1 ? 'tarea' : 'tareas'}
                </span>
                
                <button
                  onClick={() => handleOpenCreateForDate(selectedDateStr)}
                  className="p-1 rounded-xl bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all shrink-0"
                  title="Agregar tarea hoy"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Horizontal 7-Day Quick Strip: Perfectly proportioned */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 w-full">
              {dayStrip.map(day => (
                <button
                  key={day.dateStr}
                  onClick={() => handleSelectDay(day.dateStr)}
                  className={`py-1.5 px-0.5 sm:py-2 sm:px-1 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[54px] sm:min-h-[62px] overflow-hidden ${
                    day.isSelected
                      ? isLight 
                        ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]' 
                        : 'bg-white text-black border-white shadow-lg scale-[1.02]'
                      : day.isToday
                        ? isLight ? 'bg-indigo-50 border-indigo-300 text-indigo-700' : 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300'
                        : isLight ? 'bg-neutral-50/90 hover:bg-neutral-100 border-neutral-200 text-neutral-700' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
                  }`}
                >
                  <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider truncate w-full ${
                    day.isSelected ? (isLight ? 'text-white/70' : 'text-black/70') : 'text-neutral-400'
                  }`}>
                    {day.dayName}
                  </span>
                  <span className="text-xs sm:text-sm font-black tracking-tight my-0.5">
                    {day.dayNumber}
                  </span>
                  <div className="flex items-center justify-center gap-0.5 h-1.5 w-full">
                    {day.taskCount > 0 ? (
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        day.isSelected ? (isLight ? 'bg-indigo-400' : 'bg-indigo-600') : 'bg-indigo-500'
                      }`} />
                    ) : (
                      <span className="w-1 h-1 rounded-full opacity-20 bg-current shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Timeline / Tasks for Selected Day */}
            <div className="space-y-2.5 pt-1 w-full">
              {selectedDayTasks.length === 0 ? (
                <div className={`p-6 sm:p-10 rounded-2xl border text-center flex flex-col items-center justify-center w-full ${
                  isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-white/[0.02] border-white/5'
                }`}>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-2.5">
                    <CalendarIcon size={20} />
                  </div>
                  <h5 className={`text-xs sm:text-sm font-black uppercase tracking-wide ${isLight ? 'text-neutral-800' : 'text-white'}`}>
                    Día Libre o Sin Tareas
                  </h5>
                  <p className="text-[11px] text-neutral-400 max-w-xs mt-0.5">
                    No tienes actividades para el {formattedDayTitle}.
                  </p>
                  <button 
                    onClick={() => handleOpenCreateForDate(selectedDateStr)}
                    className="mt-3.5 px-4 py-2 rounded-full text-[11px] font-black bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Plus size={13} /> Agendar Tarea para Este Día
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2 w-full">
                  {selectedDayTasks.map(task => {
                    const catInfo = getCategoryInfo(task.category);
                    const importanceConf = IMPORTANCE_CONFIG[task.importance] || IMPORTANCE_CONFIG.media;

                    return (
                      <div
                        key={task.id}
                        onClick={() => handleOpenEditTask(task)}
                        className={`p-3 sm:p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 sm:gap-3 group w-full overflow-hidden ${
                          task.isCompleted
                            ? 'opacity-50 bg-neutral-100 dark:bg-white/5 border-transparent'
                            : isLight
                              ? 'bg-white border-neutral-200/90 shadow-sm hover:shadow-md'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 shadow-md'
                        }`}
                        style={{ borderLeftColor: catInfo.color, borderLeftWidth: 4 }}
                      >
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <button
                            onClick={(e) => handleToggleComplete(task.id, e)}
                            className="mt-0.5 text-neutral-400 hover:text-emerald-500 transition-colors shrink-0"
                            title={task.isCompleted ? 'Marcar incompleta' : 'Marcar completada'}
                          >
                            {task.isCompleted ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1 mb-1">
                              <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full truncate ${
                                isLight ? catInfo.bgLight : catInfo.bgDark
                              }`}>
                                {catInfo.icon} {catInfo.name}
                              </span>
                              <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${importanceConf.badge}`}>
                                {importanceConf.label}
                              </span>
                              {task.isDeadline && (
                                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full">
                                  ⏰ Plazo
                                </span>
                              )}
                            </div>

                            <h5 className={`text-xs sm:text-sm font-bold break-words line-clamp-2 leading-snug ${
                              task.isCompleted ? 'line-through text-neutral-400' : isLight ? 'text-neutral-900' : 'text-white'
                            }`}>
                              {task.title}
                            </h5>

                            {task.description && (
                              <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate mt-0.5">{task.description}</p>
                            )}
                          </div>
                        </div>

                        {/* Right: Time & Delete */}
                        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                          <div className="text-right">
                            <span className="text-[11px] sm:text-xs font-bold text-neutral-700 dark:text-neutral-300 flex items-center justify-end gap-1">
                              <Clock size={10} className="text-indigo-400" />
                              {task.startTime || '09:00'}
                            </span>
                            {task.endTime && (
                              <span className="text-[9px] sm:text-[10px] text-neutral-400 block">{task.endTime}</span>
                            )}
                          </div>

                          <button
                            onClick={(e) => handleDeleteTask(task.id, e)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
                            title="Eliminar tarea"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW 2: VISTA MES COMPLETO (Adaptada a la pantalla con panel de detalle interactivo) --- */}
        {viewMode === 'mes' && (
          <div className="pt-3.5 sm:pt-4 flex flex-col gap-3 w-full">
            
            {/* Month Header with Navigation */}
            <div className="flex items-center justify-between gap-2 bg-neutral-100/70 dark:bg-white/[0.03] p-2 sm:p-2.5 rounded-2xl border border-neutral-200/70 dark:border-white/5 w-full">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 bg-white dark:bg-white/10 p-0.5 rounded-xl border border-neutral-200/80 dark:border-white/10 shadow-sm shrink-0">
                  <button 
                    onClick={handlePrevMonth} 
                    className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-white"
                    title="Mes anterior"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <button 
                    onClick={handleGoToday}
                    className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-neutral-700 dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10 rounded-lg"
                  >
                    Hoy
                  </button>
                  <button 
                    onClick={handleNextMonth} 
                    className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-700 dark:text-white"
                    title="Mes siguiente"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                <h3 className={`text-xs sm:text-sm font-black capitalize truncate ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                  {MONTHS_NAMES[month]} <span className="text-indigo-500">{year}</span>
                </h3>
              </div>

              <div className="text-[10px] font-bold text-neutral-400 truncate hidden xs:block">
                Toca un día para ver o agendar
              </div>
            </div>

            {/* Day name headers */}
            <div className="grid grid-cols-7 gap-1 text-center w-full">
              {DAYS_NAMES_SHORT.map((name, i) => (
                <div 
                  key={name} 
                  className={`text-[8px] sm:text-[10px] font-black uppercase tracking-wider py-0.5 truncate ${
                    i >= 5 ? 'text-indigo-400' : isLight ? 'text-neutral-400' : 'text-white/40'
                  }`}
                >
                  {name}
                </div>
              ))}
            </div>

            {/* 7-Col Responsive Grid Fitted to Screen without overflowing */}
            <div className="grid grid-cols-7 gap-1 sm:gap-1.5 w-full">
              {monthGridDays.map((dayItem, index) => {
                const dayTasks = filteredTasks.filter(t => t.date === dayItem.dateStr);
                const isSelected = selectedDateStr === dayItem.dateStr;
                const isDropTarget = dragOverDate === dayItem.dateStr;

                return (
                  <div
                    key={`${dayItem.dateStr}_${index}`}
                    onClick={() => setSelectedDateStr(dayItem.dateStr)}
                    onDoubleClick={() => handleOpenCreateForDate(dayItem.dateStr)}
                    onDragOver={(e) => handleDragOver(dayItem.dateStr, e)}
                    onDrop={(e) => handleDrop(dayItem.dateStr, e)}
                    className={`min-h-[50px] sm:min-h-[70px] p-1 rounded-xl border flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden ${
                      isDropTarget
                        ? 'border-2 border-indigo-500 bg-indigo-500/20 scale-[1.02] shadow-lg z-10'
                        : isSelected
                          ? isLight
                            ? 'bg-indigo-50 border-indigo-400 shadow-sm'
                            : 'bg-indigo-950/60 border-indigo-500/70 shadow-inner'
                          : dayItem.isCurrentMonth
                            ? isLight
                              ? 'bg-neutral-50/90 hover:bg-neutral-100/90 border-neutral-200/80'
                              : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/5'
                            : isLight
                              ? 'bg-neutral-100/40 border-neutral-200/40 opacity-30'
                              : 'bg-transparent border-white/[0.02] opacity-25'
                    }`}
                  >
                    {/* Day number header */}
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-[10px] sm:text-[11px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center truncate ${
                        dayItem.isToday
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : isSelected
                            ? isLight ? 'text-indigo-600 font-extrabold' : 'text-indigo-400 font-extrabold'
                            : dayItem.isCurrentMonth
                              ? isLight ? 'text-neutral-800' : 'text-white/80'
                              : 'text-neutral-400'
                      }`}>
                        {dayItem.dayNumber}
                      </span>

                      {dayTasks.length > 0 && (
                        <span className="text-[8px] sm:text-[9px] font-black text-indigo-400 truncate">
                          {dayTasks.length}
                        </span>
                      )}
                    </div>

                    {/* Task chips on desktop / mini dots on mobile */}
                    <div className="flex-1 flex flex-col gap-0.5 my-0.5 overflow-hidden w-full">
                      {/* Desktop compact task chips */}
                      <div className="hidden sm:flex flex-col gap-0.5 w-full">
                        {dayTasks.slice(0, 2).map(task => {
                          const catInfo = getCategoryInfo(task.category);
                          return (
                            <div
                              key={task.id}
                              draggable
                              onDragStart={(e) => handleDragStart(task.id, e)}
                              onClick={(e) => handleOpenEditTask(task, e)}
                              className={`px-1 py-0.5 rounded text-[8px] font-bold truncate flex items-center gap-1 border transition-all ${
                                task.isCompleted
                                  ? 'opacity-40 line-through bg-neutral-200/50 dark:bg-white/5 border-transparent'
                                  : isLight
                                    ? 'bg-white border-neutral-200 text-neutral-800'
                                    : 'bg-white/10 border-white/10 text-white'
                              }`}
                              style={{ borderLeftColor: catInfo.color, borderLeftWidth: 2 }}
                              title={task.title}
                            >
                              <span className="truncate">{task.title}</span>
                            </div>
                          );
                        })}
                        {dayTasks.length > 2 && (
                          <div className="text-[7px] font-black text-indigo-400 leading-none truncate">
                            +{dayTasks.length - 2}
                          </div>
                        )}
                      </div>

                      {/* Mobile indicator dots */}
                      <div className="flex sm:hidden items-center justify-center gap-0.5 overflow-hidden h-2 w-full">
                        {dayTasks.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className={`w-1 h-1 rounded-full shrink-0 ${
                              t.isCompleted ? 'bg-neutral-400' : (IMPORTANCE_CONFIG[t.importance]?.dot || 'bg-indigo-500')
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Footer indicator dots on desktop */}
                    <div className="hidden sm:flex items-center gap-0.5 overflow-hidden h-1 w-full">
                      {dayTasks.map((t, idx) => (
                        <span
                          key={idx}
                          className={`w-1 h-1 rounded-full shrink-0 ${
                            t.isCompleted ? 'bg-neutral-400' : (IMPORTANCE_CONFIG[t.importance]?.dot || 'bg-indigo-500')
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Selected Day Panel inside Month View */}
            <div className="p-3 rounded-2xl bg-neutral-100/80 dark:bg-white/5 border border-neutral-200/80 dark:border-white/10 flex flex-col gap-2.5 w-full mt-1">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 block">
                    Tareas del día
                  </span>
                  <h4 className="text-xs font-black capitalize truncate text-neutral-900 dark:text-white">
                    {formattedDayTitle} ({selectedDayTasks.length})
                  </h4>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenCreateForDate(selectedDateStr)}
                    className="p-1.5 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
                    title="Añadir tarea a este día"
                  >
                    <Plus size={13} />
                  </button>
                  <button
                    onClick={() => setViewMode('dia')}
                    className="px-2.5 py-1.5 rounded-xl bg-neutral-200 dark:bg-white/10 text-neutral-800 dark:text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 hover:bg-neutral-300 dark:hover:bg-white/20 transition-colors truncate"
                  >
                    <span>Ver Por Día</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
              </div>

              {/* Tasks mini list for selected day in month view */}
              {selectedDayTasks.length > 0 ? (
                <div className="space-y-1.5 max-h-36 overflow-y-auto custom-scroll pr-1">
                  {selectedDayTasks.map(task => {
                    const catInfo = getCategoryInfo(task.category);
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleOpenEditTask(task)}
                        className={`p-2 rounded-xl border flex items-center justify-between gap-2 text-xs transition-all cursor-pointer ${
                          task.isCompleted
                            ? 'opacity-40 line-through bg-neutral-200/50 dark:bg-white/5 border-transparent'
                            : isLight
                              ? 'bg-white border-neutral-200 text-neutral-900'
                              : 'bg-white/5 border-white/10 text-white'
                        }`}
                        style={{ borderLeftColor: catInfo.color, borderLeftWidth: 3 }}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <button onClick={(e) => handleToggleComplete(task.id, e)} className="shrink-0 text-neutral-400 hover:text-emerald-500">
                            {task.isCompleted ? <CheckCircle2 size={15} className="text-emerald-500" /> : <Circle size={15} />}
                          </button>
                          <span className="truncate font-bold text-[11px]">{task.title}</span>
                        </div>
                        <span className="text-[10px] text-neutral-400 shrink-0">{task.startTime || '09:00'}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[11px] text-neutral-400 py-1">No hay tareas programadas para este día.</p>
              )}
            </div>
          </div>
        )}

        {/* --- VIEW 3: VISTA LISTA / TODAS LAS TAREAS --- */}
        {viewMode === 'lista' && (
          <div className="pt-3.5 sm:pt-4 flex flex-col gap-3 w-full">
            
            {/* Search and Category Filter Toolbar */}
            <div className="flex flex-col gap-2 w-full">
              <div className={`relative flex items-center rounded-xl border px-3 py-1.5 w-full ${
                isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-900' : 'bg-white/5 border-white/10 text-white'
              }`}>
                <Search size={13} className="text-neutral-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar en tareas..."
                  className="w-full bg-transparent text-xs font-bold outline-none placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-neutral-400 hover:text-neutral-600 shrink-0">
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Category Filter Chips with Horizontal Scroll */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full custom-scroll">
                <button
                  onClick={() => setSelectedCategoryFilter('todos')}
                  className={`px-2.5 py-1 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                    selectedCategoryFilter === 'todos'
                      ? isLight ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-black border-white'
                      : isLight ? 'bg-neutral-100 text-neutral-600 border-neutral-200' : 'bg-white/5 text-white/50 border-white/10'
                  }`}
                >
                  Todas ({calendarTasks.length})
                </button>

                {categories.map(cat => {
                  const isSelected = selectedCategoryFilter.toLowerCase() === cat.name.toLowerCase();
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryFilter(isSelected ? 'todos' : cat.name)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider whitespace-nowrap transition-all border shrink-0 ${
                        isSelected
                          ? isLight ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-black border-white'
                          : isLight ? 'bg-neutral-100 text-neutral-700 border-neutral-200' : 'bg-white/5 text-white/70 border-white/10'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tasks list */}
            {filteredTasks.length === 0 ? (
              <div className={`p-6 rounded-2xl border text-center w-full ${
                isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-400' : 'bg-white/5 border-white/10 text-white/40'
              }`}>
                <p className="text-xs font-bold uppercase tracking-wider">No se encontraron tareas</p>
              </div>
            ) : (
              <div className="space-y-2 pt-1 w-full">
                {[...filteredTasks]
                  .sort((a, b) => (a.date || '').localeCompare(b.date || '') || (a.startTime || '').localeCompare(b.startTime || ''))
                  .map(task => {
                    const catInfo = getCategoryInfo(task.category);
                    const importanceConf = IMPORTANCE_CONFIG[task.importance] || IMPORTANCE_CONFIG.media;
                    const isToday = task.date === todayStr;

                    return (
                      <div
                        key={task.id}
                        onClick={() => handleOpenEditTask(task)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 w-full overflow-hidden ${
                          task.isCompleted
                            ? 'opacity-40 bg-neutral-100 dark:bg-white/5 border-transparent'
                            : isLight
                              ? 'bg-white border-neutral-200 shadow-sm hover:shadow-md'
                              : 'bg-white/5 border-white/10 hover:bg-white/10'
                        }`}
                        style={{ borderLeftColor: catInfo.color, borderLeftWidth: 4 }}
                      >
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <button
                            onClick={(e) => handleToggleComplete(task.id, e)}
                            className="mt-0.5 text-neutral-400 hover:text-emerald-500 transition-colors shrink-0"
                          >
                            {task.isCompleted ? <CheckCircle2 size={17} className="text-emerald-500" /> : <Circle size={17} />}
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1 mb-1">
                              <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full truncate ${
                                isLight ? catInfo.bgLight : catInfo.bgDark
                              }`}>
                                {catInfo.icon} {catInfo.name}
                              </span>
                              <span className={`text-[7px] sm:text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${importanceConf.badge}`}>
                                {importanceConf.label}
                              </span>
                              {task.isDeadline && (
                                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded-full">
                                  ⏰ Plazo
                                </span>
                              )}
                              {isToday && (
                                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-full">
                                  Hoy
                                </span>
                              )}
                            </div>

                            <h5 className={`text-xs sm:text-sm font-bold break-words line-clamp-2 ${
                              task.isCompleted ? 'line-through text-neutral-400' : isLight ? 'text-neutral-900' : 'text-white'
                            }`}>
                              {task.title}
                            </h5>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-white/5">
                          <div className="text-left sm:text-right">
                            <span className="text-[11px] sm:text-xs font-bold text-neutral-800 dark:text-white flex items-center sm:justify-end gap-1">
                              <CalendarIcon size={10} className="text-indigo-400" />
                              {task.date}
                            </span>
                            <span className="text-[9px] sm:text-[10px] text-neutral-400 block">
                              {task.startTime || '09:00'} {task.endTime ? `- ${task.endTime}` : ''}
                            </span>
                          </div>

                          <button
                            onClick={(e) => handleDeleteTask(task.id, e)}
                            className="p-1.5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 rounded-lg transition-colors shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- MODAL 1: CREATE / EDIT TASK --- */}
      <AnimatePresence>
        {isTaskModalOpen && editingTask && (
          <motion.div
            key="cal-task-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          >
            <motion.div
              key="cal-task-modal-card"
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className={`w-full max-w-md sm:max-w-lg rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 border shadow-2xl overflow-y-auto max-h-[90vh] custom-scroll my-auto ${
                isLight ? 'bg-white border-neutral-200 text-neutral-900' : 'bg-neutral-900 border-white/15 text-white'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <CalendarIcon size={16} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight truncate">
                      {tasks.some(t => t.id === editingTask.id) ? 'Editar Tarea' : 'Nueva Tarea'}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setIsTaskModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-white/10 text-neutral-400"
                >
                  <X size={17} />
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 pt-3.5">
                {/* Title */}
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                    Título de la Tarea / Evento *
                  </label>
                  <input
                    type="text"
                    value={editingTask.title}
                    onChange={e => setEditingTask({ ...editingTask, title: e.target.value })}
                    placeholder="Ej. Examen de Matemáticas, Entregar proyecto..."
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold outline-none ${
                      isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-indigo-500' : 'bg-white/5 border-white/10 text-white focus:border-indigo-400'
                    }`}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                    Descripción / Notas
                  </label>
                  <textarea
                    rows={2}
                    value={editingTask.description || ''}
                    onChange={e => setEditingTask({ ...editingTask, description: e.target.value })}
                    placeholder="Detalles importantes..."
                    className={`w-full px-3 py-2 rounded-xl border text-xs font-bold outline-none resize-none ${
                      isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-indigo-500' : 'bg-white/5 border-white/10 text-white focus:border-indigo-400'
                    }`}
                  />
                </div>

                {/* Date & Presets */}
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                    Fecha *
                  </label>
                  <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
                    <input
                      type="date"
                      value={editingTask.date}
                      onChange={e => setEditingTask({ ...editingTask, date: e.target.value })}
                      className={`w-full sm:flex-1 px-3 py-2 rounded-xl border text-xs font-bold outline-none ${
                        isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-900' : 'bg-white/5 border-white/10 text-white'
                      }`}
                    />
                    <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
                      {[
                        { label: 'Hoy', getVal: () => new Date().toISOString().split('T')[0] },
                        { label: 'Mañana', getVal: () => {
                          const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0];
                        }},
                        { label: 'En 3 días', getVal: () => {
                          const d = new Date(); d.setDate(d.getDate() + 3); return d.toISOString().split('T')[0];
                        }}
                      ].map(preset => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setEditingTask({ ...editingTask, date: preset.getVal() })}
                          className={`flex-1 sm:flex-initial px-2 py-1 rounded-lg text-[9px] sm:text-[10px] font-bold border transition-colors whitespace-nowrap text-center ${
                            editingTask.date === preset.getVal()
                              ? 'bg-indigo-500 text-white border-indigo-500'
                              : isLight ? 'bg-neutral-100 border-neutral-200' : 'bg-white/5 border-white/10'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Start & End Time */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                      Hora Inicio
                    </label>
                    <input
                      type="time"
                      value={editingTask.startTime || '09:00'}
                      onChange={e => setEditingTask({ ...editingTask, startTime: e.target.value })}
                      className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-bold outline-none ${
                        isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-900' : 'bg-white/5 border-white/10 text-white'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                      Hora Fin
                    </label>
                    <input
                      type="time"
                      value={editingTask.endTime || '10:00'}
                      onChange={e => setEditingTask({ ...editingTask, endTime: e.target.value })}
                      className={`w-full px-2.5 py-1.5 rounded-xl border text-xs font-bold outline-none ${
                        isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-900' : 'bg-white/5 border-white/10 text-white'
                      }`}
                    />
                  </div>
                </div>

                {/* Importance Selector */}
                <div>
                  <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
                    Importancia / Prioridad
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {Object.entries(IMPORTANCE_CONFIG).map(([key, conf]) => {
                      const isSelected = editingTask.importance === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setEditingTask({ ...editingTask, importance: key })}
                          className={`py-1.5 px-0.5 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-wider border flex flex-col items-center gap-0.5 transition-all truncate ${
                            isSelected
                              ? `${conf.badge} border-2 shadow-sm scale-102`
                              : isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-600' : 'bg-white/5 border-white/10 text-white/50'
                          }`}
                        >
                          <span>{conf.icon}</span>
                          <span className="truncate">{conf.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Category Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-neutral-400">
                      Categoría
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsCategoryModalOpen(true)}
                      className="text-[9px] sm:text-[10px] font-bold text-indigo-400 hover:underline"
                    >
                      + Nueva Categoría
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                    {categories.map(cat => {
                      const isSelected = (editingTask.category || '').toLowerCase() === cat.name.toLowerCase();
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setEditingTask({ ...editingTask, category: cat.name })}
                          className={`p-1.5 sm:p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all truncate ${
                            isSelected
                              ? isLight ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-black border-white shadow-sm'
                              : isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-700' : 'bg-white/5 border-white/10 text-white/70'
                          }`}
                        >
                          <span className="shrink-0">{cat.icon}</span>
                          <span className="truncate text-[10px] sm:text-[11px]">{cat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Strict Deadline Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    <AlertCircle size={14} className="text-red-400 shrink-0" />
                    <p className="text-[11px] sm:text-xs font-bold text-red-400 truncate">Fecha Límite Estricta</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={editingTask.isDeadline || false}
                    onChange={e => setEditingTask({ ...editingTask, isDeadline: e.target.checked })}
                    className="w-4 h-4 accent-red-500 cursor-pointer shrink-0"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-neutral-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-neutral-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveTask(editingTask)}
                  disabled={!editingTask.title.trim()}
                  className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all truncate ${
                    editingTask.title.trim()
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-95'
                      : 'opacity-40 bg-neutral-500 text-white cursor-not-allowed'
                  }`}
                >
                  Guardar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MODAL 2: CUSTOM CATEGORY MANAGER --- */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <CategoryManagerModal
            key="cal-category-modal-wrapper"
            categories={categories}
            setCategories={setCategories}
            onClose={() => setIsCategoryModalOpen(false)}
            isLight={isLight}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- SUB-COMPONENT: CATEGORY MANAGER MODAL ---
const CategoryManagerModal = ({ categories, setCategories, onClose, isLight }) => {
  const [newCatName, setNewCatName] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('📌');
  const [newCatColor, setNewCatColor] = useState('#6366F1');

  const ICON_PRESETS = ['📚', '💼', '⚡', '🏃', '🎯', '🧠', '🎨', '🚀', '💻', '🎵', '🍎', '⏰', '🧪', '⚽', '🌿', '📖'];
  const COLOR_PRESETS = ['#6366F1', '#3B82F6', '#A855F7', '#10B981', '#F59E0B', '#EC4899', '#06B6D4', '#EF4444', '#84CC16'];

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const newId = `cat_${Date.now()}`;
    const newCategory = {
      id: newId,
      name: newCatName.trim(),
      color: newCatColor,
      icon: newCatIcon,
      bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      bgDark: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    };

    setCategories(prev => [...prev, newCategory]);
    setNewCatName('');
  };

  const handleDeleteCategory = (catId) => {
    if (categories.length <= 1) return;
    setCategories(prev => prev.filter(c => c.id !== catId));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[130] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 15 }}
        className={`w-full max-w-md rounded-[24px] sm:rounded-[28px] p-4 sm:p-6 border shadow-2xl ${
          isLight ? 'bg-white border-neutral-200 text-neutral-900' : 'bg-neutral-900 border-white/15 text-white'
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-white/10">
          <div className="flex items-center gap-2 min-w-0">
            <Tag size={16} className="text-indigo-400 shrink-0" />
            <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight truncate">Categorías Personalizadas</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 shrink-0">
            <X size={16} />
          </button>
        </div>

        {/* Existing Categories */}
        <div className="space-y-1.5 max-h-40 overflow-y-auto pt-3 custom-scroll">
          {categories.map(cat => (
            <div
              key={cat.id}
              className={`p-2 rounded-xl border flex items-center justify-between gap-2 ${
                isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm shrink-0">{cat.icon}</span>
                <span className="text-xs font-bold truncate">{cat.name}</span>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
              </div>
              {categories.length > 1 && (
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1 text-neutral-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Create New Category Form */}
        <div className="pt-3 mt-3 border-t border-neutral-200 dark:border-white/10 space-y-2.5">
          <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-400">Crear Nueva Categoría</h4>
          
          <input
            type="text"
            value={newCatName}
            onChange={e => setNewCatName(e.target.value)}
            placeholder="Nombre..."
            className={`w-full px-3 py-1.5 rounded-xl border text-xs font-bold outline-none ${
              isLight ? 'bg-neutral-50 border-neutral-200 text-neutral-900' : 'bg-white/5 border-white/10 text-white'
            }`}
          />

          {/* Emoji selector */}
          <div>
            <div className="flex flex-wrap gap-1">
              {ICON_PRESETS.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setNewCatIcon(icon)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all ${
                    newCatIcon === icon ? 'bg-indigo-500 text-white scale-110 shadow-sm' : 'hover:bg-white/10'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div>
            <div className="flex items-center gap-1.5">
              {COLOR_PRESETS.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setNewCatColor(color)}
                  className={`w-4 h-4 rounded-full transition-transform ${
                    newCatColor === color ? 'scale-125 ring-2 ring-white shadow-sm' : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={handleAddCategory}
            disabled={!newCatName.trim()}
            className={`w-full py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all mt-1 ${
              newCatName.trim()
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                : 'opacity-40 bg-neutral-500 text-white cursor-not-allowed'
            }`}
          >
            Añadir Categoría
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
