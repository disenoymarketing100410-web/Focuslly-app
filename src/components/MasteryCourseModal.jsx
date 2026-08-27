// src/components/MasteryCourseModal.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Play, 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  HelpCircle, 
  Flame, 
  Clock, 
  Zap, 
  Gem,
  Laptop,
  Brain,
  ShieldCheck,
  Video,
  FileText,
  RotateCcw,
  Target,
  Layers
} from 'lucide-react';

export const MasteryCourseModal = ({ 
  mastery, 
  completedClasses = [], 
  onCompleteClass, 
  onClose, 
  isLight = false 
}) => {
  const [selectedClassIndex, setSelectedClassIndex] = useState(0);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState('all'); // 'all' | 1 | 2 | 3
  const [activeLessonTab, setActiveLessonTab] = useState('video'); // 'video' | 'lecture' | 'exam'
  
  // Exam state per class
  const [examAnswers, setExamAnswers] = useState({}); // { [qIdx]: selectedOptionIdx }
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(null);

  if (!mastery) return null;

  const filteredClasses = selectedLevelFilter === 'all' 
    ? mastery.classes 
    : mastery.classes.filter(c => c.level === selectedLevelFilter);

  const currentClass = mastery.classes[selectedClassIndex] || mastery.classes[0];
  const isCurrentClassDone = completedClasses.includes(currentClass.id);
  const totalClasses = mastery.classes.length;
  const completedCount = mastery.classes.filter(c => completedClasses.includes(c.id)).length;
  const progressPct = Math.round((completedCount / totalClasses) * 100);
  const isMasteryFinished = completedCount === totalClasses;

  const currentExam = currentClass.exam || (currentClass.quiz ? [currentClass.quiz] : []);

  const handleSelectClass = (idx) => {
    setSelectedClassIndex(idx);
    setExamAnswers({});
    setExamSubmitted(false);
    setExamScore(null);
    setActiveLessonTab('video');
  };

  const handleSelectAnswer = (qIdx, optIdx) => {
    if (examSubmitted) return;
    setExamAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleGradeExam = () => {
    if (currentExam.length === 0) return;
    let correctCount = 0;
    currentExam.forEach((q, idx) => {
      if (examAnswers[idx] === q.answer) {
        correctCount += 1;
      }
    });

    const isPassed = correctCount === currentExam.length;
    setExamSubmitted(true);
    setExamScore({ correctCount, total: currentExam.length, isPassed });

    if (isPassed && !isCurrentClassDone) {
      onCompleteClass?.(currentClass, mastery);
    }
  };

  const handleNextClass = () => {
    if (selectedClassIndex < totalClasses - 1) {
      handleSelectClass(selectedClassIndex + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className={`w-full max-w-6xl h-[94vh] max-h-[920px] rounded-[32px] border shadow-2xl flex flex-col overflow-hidden relative ${
          isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0c0c0c] border-white/15 text-white'
        }`}
      >
        {/* TOP HEADER */}
        <div className={`p-4 sm:p-6 border-b flex items-center justify-between gap-4 ${
          isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/[0.03] border-white/10'
        }`}>
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
              isLight ? 'bg-blue-50 border-blue-200 text-blue-600' : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
            }`}>
              {mastery.icon === 'Laptop' ? <Laptop size={24} /> : mastery.icon === 'Brain' ? <Brain size={24} /> : mastery.icon === 'Gem' ? <Gem size={24} /> : <BookOpen size={24} />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border tracking-widest ${
                  isLight ? 'bg-zinc-200/70 border-zinc-300 text-zinc-700' : 'bg-white/10 border-white/20 text-white/80'
                }`}>
                  {mastery.category}
                </span>
                <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                  +{mastery.xpPerClass} XP • +{mastery.diamondsPerClass} 💎 por clase
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-black uppercase tracking-tight truncate mt-0.5">
                {mastery.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Progress Badge */}
            <div className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl border ${
              isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-white'
            }`}>
              <div className="text-right">
                <span className="text-xs font-black block">{completedCount}/{totalClasses} Clases</span>
                <span className="text-[9px] font-bold text-emerald-500">{progressPct}% Completado</span>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 flex items-center justify-center text-xs font-black text-emerald-500">
                {progressPct}%
              </div>
            </div>

            <button
              onClick={onClose}
              className={`p-2.5 rounded-full border transition-all ${
                isLight ? 'border-zinc-200 hover:bg-zinc-200 text-zinc-600' : 'border-white/10 hover:bg-white/10 text-white/60 hover:text-white'
              }`}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* BODY LAYOUT: SIDEBAR WITH LEVEL FILTERS + MAIN LESSON WORKSPACE */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* SIDEBAR: CLASS LIST & LEVEL SELECTOR */}
          <div className={`w-full md:w-84 border-r flex flex-col shrink-0 overflow-y-auto custom-scroll p-4 space-y-3 ${
            isLight ? 'bg-zinc-50/70 border-zinc-200' : 'bg-black/50 border-white/10'
          }`}>
            
            {/* LEVEL TABS IN SIDEBAR */}
            <div>
              <span className={`text-[9px] font-black uppercase tracking-widest block mb-2 px-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>
                Niveles del Curso
              </span>
              <div className={`grid grid-cols-4 gap-1 p-1 rounded-xl border text-center ${
                isLight ? 'bg-zinc-200/60 border-zinc-300' : 'bg-white/5 border-white/10'
              }`}>
                {[
                  { id: 'all', label: 'Todos' },
                  { id: 1, label: 'Nivel 1' },
                  { id: 2, label: 'Nivel 2' },
                  { id: 3, label: 'Nivel 3' }
                ].map(lvl => (
                  <button
                    key={`lvl-filter-${lvl.id}`}
                    onClick={() => setSelectedLevelFilter(lvl.id)}
                    className={`py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
                      selectedLevelFilter === lvl.id
                        ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-sm')
                        : (isLight ? 'text-zinc-600 hover:text-zinc-900' : 'text-white/50 hover:text-white')
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* CLASS LIST */}
            <div className="space-y-2 pt-1">
              {filteredClasses.map((cls, clsIdx) => {
                const originalIndex = mastery.classes.findIndex(c => c.id === cls.id);
                const isDone = completedClasses.includes(cls.id);
                const isSelected = selectedClassIndex === originalIndex;

                return (
                  <div
                    key={`modal-cls-${cls.id || clsIdx}`}
                    onClick={() => handleSelectClass(originalIndex)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 relative ${
                      isSelected
                        ? (isLight ? 'bg-zinc-900 text-white border-zinc-900 shadow-md' : 'bg-white text-black border-white shadow-lg')
                        : isDone
                        ? (isLight ? 'bg-emerald-50/80 border-emerald-200 text-zinc-900 hover:border-emerald-300' : 'bg-emerald-500/10 border-emerald-500/30 text-white hover:bg-emerald-500/20')
                        : (isLight ? 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10')
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                      isSelected
                        ? (isLight ? 'bg-white/20 text-white' : 'bg-black/20 text-black')
                        : isDone
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : (isLight ? 'bg-zinc-100 text-zinc-600' : 'bg-white/10 text-white/60')
                    }`}>
                      {isDone ? <Check size={14} strokeWidth={3} /> : originalIndex + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[8px] font-black uppercase px-1.5 py-0.2 rounded border ${
                          isSelected
                            ? (isLight ? 'border-white/30 bg-white/10 text-white' : 'border-black/30 bg-black/10 text-black')
                            : (isLight ? 'border-zinc-200 bg-zinc-100 text-zinc-600' : 'border-white/10 bg-white/5 text-white/60')
                        }`}>
                          NIVEL {cls.level || 1}
                        </span>
                      </div>
                      <h5 className="text-xs font-black uppercase leading-snug line-clamp-2">
                        {cls.title.replace(/^Clase \d+:\s*/, '')}
                      </h5>
                      <div className="flex items-center justify-between gap-2 mt-1.5">
                        <span className={`text-[10px] flex items-center gap-1 font-bold ${
                          isSelected 
                            ? (isLight ? 'text-zinc-300' : 'text-zinc-700')
                            : (isLight ? 'text-zinc-500' : 'text-white/50')
                        }`}>
                          <Clock size={10} /> {cls.duration}
                        </span>
                        {isDone && (
                          <span className={`text-[9px] font-black uppercase ${
                            isSelected ? (isLight ? 'text-white' : 'text-black') : 'text-emerald-500'
                          }`}>
                            Completada
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MASTER BADGE REWARD BOX IN SIDEBAR */}
            {mastery.badgeReward && (
              <div className={`mt-4 p-4 rounded-2xl border text-center relative overflow-hidden ${
                isMasteryFinished
                  ? (isLight ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm' : 'bg-amber-500/15 border-amber-500/40 text-amber-200')
                  : (isLight ? 'bg-zinc-100/70 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/10 text-white/50')
              }`}>
                <Award size={28} className={`mx-auto mb-1.5 ${isMasteryFinished ? 'text-amber-500 animate-bounce' : 'opacity-40'}`} />
                <h6 className="text-xs font-black uppercase tracking-tight">Medalla: {mastery.badgeReward.title}</h6>
                <p className="text-[10px] mt-0.5">
                  {isMasteryFinished ? '¡Completaste todos los niveles!' : 'Supera todos los exámenes para obtener la medalla'}
                </p>
                <div className="mt-2.5 flex items-center justify-center gap-2">
                  <span className="text-[9px] font-black uppercase bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded border border-amber-500/30">
                    +{mastery.badgeReward.xpReward} XP
                  </span>
                  <span className="text-[9px] font-black uppercase bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 flex items-center gap-0.5">
                    <Gem size={8} /> +{mastery.badgeReward.diamondReward}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* MAIN LESSON WORKSPACE */}
          <div className="flex-1 flex flex-col overflow-y-auto custom-scroll p-4 sm:p-8 space-y-6">
            
            {/* LESSON BANNER & LEVEL INFO */}
            <div className={`p-6 rounded-[28px] border relative overflow-hidden ${
              isLight ? 'bg-gradient-to-r from-blue-50 to-indigo-50/50 border-blue-200 text-zinc-900' : 'bg-gradient-to-r from-blue-950/40 to-indigo-950/30 border-blue-500/30 text-white'
            }`}>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                    isLight ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-black border-blue-400'
                  }`}>
                    {currentClass.levelName || `Nivel ${currentClass.level || 1}`}
                  </span>
                  <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                    <Clock size={12} /> {currentClass.duration}
                  </span>
                </div>

                {isCurrentClassDone && (
                  <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-emerald-500 text-white flex items-center gap-1 shadow-sm">
                    <Check size={12} strokeWidth={3} /> Completada
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-3">
                {currentClass.title}
              </h2>
              <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-white/70'}`}>
                {currentClass.summary}
              </p>
            </div>

            {/* LESSON INTERACTIVE NAVIGATION TABS: VIDEO, LECTURE, EXAM */}
            <div className={`flex gap-2 p-1.5 rounded-2xl border ${
              isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-black border-white/10'
            }`}>
              <button
                onClick={() => setActiveLessonTab('video')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeLessonTab === 'video'
                    ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                    : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                }`}
              >
                <Video size={15} />
                <span>1. Vídeo Didáctico</span>
              </button>

              <button
                onClick={() => setActiveLessonTab('lecture')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  activeLessonTab === 'lecture'
                    ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                    : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                }`}
              >
                <FileText size={15} />
                <span>2. Lectura & Reto</span>
              </button>

              <button
                onClick={() => setActiveLessonTab('exam')}
                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 relative ${
                  activeLessonTab === 'exam'
                    ? (isLight ? 'bg-white text-zinc-900 shadow-sm' : 'bg-white text-black shadow-md')
                    : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/40 hover:text-white')
                }`}
              >
                <HelpCircle size={15} />
                <span>3. Examen del Nivel</span>
                {isCurrentClassDone && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-2" />
                )}
              </button>
            </div>

            {/* TAB 1: INTERACTIVE VIDEO & KEY MOMENTS */}
            {activeLessonTab === 'video' && (
              <div className="space-y-6">
                {/* VIDEO PLAYER CONTAINER */}
                <div className={`rounded-[28px] border overflow-hidden shadow-xl ${
                  isLight ? 'bg-black border-zinc-200' : 'bg-black border-white/10'
                }`}>
                  <div className="aspect-video w-full relative bg-zinc-950 flex items-center justify-center">
                    {currentClass.video?.embedUrl ? (
                      <iframe
                        src={currentClass.video.embedUrl}
                        title={currentClass.video.title || currentClass.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <div className="text-center p-8 space-y-3">
                        <div className="w-16 h-16 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto shadow-lg">
                          <Play size={24} fill="currentColor" />
                        </div>
                        <h4 className="text-base font-black uppercase text-white">{currentClass.title}</h4>
                        <p className="text-xs text-white/50 max-w-md mx-auto">Video didáctico interactivo optimizado para este módulo</p>
                      </div>
                    )}
                  </div>

                  {/* Video title bar */}
                  <div className={`p-4 px-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isLight ? 'bg-zinc-900 text-white border-zinc-800' : 'bg-[#111] text-white border-white/10'
                  }`}>
                    <div>
                      <span className="text-[9px] font-black uppercase text-blue-400 tracking-widest block">LECCIÓN EN VÍDEO</span>
                      <h4 className="text-sm font-black uppercase">{currentClass.video?.title || currentClass.title}</h4>
                    </div>
                    <button
                      onClick={() => setActiveLessonTab('lecture')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                    >
                      <span>Ir a la Lectura</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* KEY MOMENTS / TIMESTAMPS DIDÁCTICOS */}
                {currentClass.video?.keyMoments && currentClass.video.keyMoments.length > 0 && (
                  <div className={`p-6 rounded-[28px] border space-y-4 ${
                    isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#121212] border-white/10 text-white'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Zap size={18} className="text-amber-500" />
                      <h4 className="text-sm font-black uppercase tracking-tight">Puntos Clave Explicados en el Vídeo</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {currentClass.video.keyMoments.map((km, idx) => (
                        <div
                          key={`km-${idx}-${km.time}`}
                          className={`p-4 rounded-2xl border transition-all ${
                            isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                          }`}
                        >
                          <span className="text-[10px] font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded inline-block mb-1.5">
                            ⏱ {km.time}
                          </span>
                          <h5 className="text-xs font-black uppercase leading-tight">{km.title}</h5>
                          <p className={`text-[11px] mt-1 leading-relaxed ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                            {km.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: LECTURE & PRACTICAL TASK */}
            {activeLessonTab === 'lecture' && (
              <div className="space-y-6">
                <div className={`p-6 sm:p-8 rounded-[28px] border prose max-w-none text-sm leading-relaxed ${
                  isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-[#121212] border-white/10 text-white/90'
                }`}>
                  {currentClass.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h4 key={pIdx} className={`text-base font-black uppercase tracking-tight mt-4 mb-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                          {paragraph.replace('### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('- ') || paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                      return (
                        <div key={pIdx} className="my-2 pl-2 space-y-1 font-medium">
                          {paragraph.split('\n').map((line, lIdx) => (
                            <p key={lIdx} className="text-xs sm:text-sm leading-relaxed">
                              {line}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-xs sm:text-sm leading-relaxed my-2">
                        {paragraph}
                      </p>
                    );
                  })}

                  {/* Practical Task Card */}
                  {currentClass.practicalTask && (
                    <div className={`mt-6 p-5 rounded-2xl border flex items-start gap-4 ${
                      isLight ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    }`}>
                      <div className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black shrink-0 shadow-sm">
                        ⚡
                      </div>
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-tight">Reto Práctico Inmediato (2 minutos)</h5>
                        <p className="text-xs font-semibold mt-0.5 leading-relaxed">{currentClass.practicalTask}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveLessonTab('exam')}
                    className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center gap-2"
                  >
                    <span>Realizar Examen de Certificación</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: MULTI-QUESTION EXAM & CERTIFICATION */}
            {activeLessonTab === 'exam' && (
              <div className={`p-6 sm:p-8 rounded-[28px] border space-y-6 ${
                isLight ? 'bg-zinc-50 border-zinc-200 text-zinc-900' : 'bg-[#141414] border-white/10 text-white'
              }`}>
                
                {/* Header of exam */}
                <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <HelpCircle size={18} className="text-blue-500" />
                      <h4 className="text-sm font-black uppercase tracking-widest">
                        Examen de Validación: {currentClass.title}
                      </h4>
                    </div>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-zinc-500' : 'text-white/50'}`}>
                      Responde correctamente a las preguntas para validar tu aprendizaje y reclamar recompensas
                    </p>
                  </div>

                  <span className="text-[10px] font-black uppercase bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20">
                    +{mastery.xpPerClass} XP • +{mastery.diamondsPerClass} 💎
                  </span>
                </div>

                {/* QUESTIONS LIST */}
                <div className="space-y-6">
                  {currentExam.map((q, qIdx) => {
                    const selectedOpt = examAnswers[qIdx];
                    const isCorrect = selectedOpt === q.answer;

                    return (
                      <div
                        key={`exam-q-${qIdx}-${q.id || ''}`}
                        className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                          isLight ? 'bg-white border-zinc-200' : 'bg-black/40 border-white/10'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                            isLight ? 'bg-zinc-100 text-zinc-700' : 'bg-white/10 text-white'
                          }`}>
                            {qIdx + 1}
                          </span>
                          <p className="text-sm font-bold leading-snug pt-0.5">
                            {q.question}
                          </p>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          {q.options.map((opt, optIdx) => {
                            const isThisSelected = selectedOpt === optIdx;
                            const isThisCorrect = optIdx === q.answer;

                            let optClass = isLight 
                              ? 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800' 
                              : 'bg-white/5 hover:bg-white/10 border-white/10 text-white';

                            if (examSubmitted) {
                              if (isThisCorrect) {
                                optClass = 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30';
                              } else if (isThisSelected && !isThisCorrect) {
                                optClass = 'bg-red-600 text-white border-red-500';
                              } else {
                                optClass = isLight ? 'bg-zinc-100 text-zinc-400 border-zinc-200' : 'bg-white/5 text-white/30 border-white/5';
                              }
                            } else if (isThisSelected) {
                              optClass = isLight ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-white text-black border-white';
                            }

                            return (
                              <button
                                key={`exam-opt-${qIdx}-${optIdx}`}
                                onClick={() => handleSelectAnswer(qIdx, optIdx)}
                                disabled={examSubmitted}
                                className={`p-4 rounded-xl border text-left text-xs font-bold transition-all duration-200 flex items-center justify-between gap-3 ${optClass}`}
                              >
                                <span>{opt}</span>
                                {examSubmitted && isThisCorrect && <Check size={16} strokeWidth={3} className="shrink-0" />}
                              </button>
                            );
                          })}
                        </div>

                        {/* Question explanation after submit */}
                        {examSubmitted && q.explanation && (
                          <div className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                            isCorrect 
                              ? (isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200')
                              : (isLight ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-500/10 border-amber-500/20 text-amber-200')
                          }`}>
                            <strong>Explicación: </strong> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* SUBMIT BUTTON OR RETRY */}
                <div className="pt-2">
                  {!examSubmitted ? (
                    <button
                      onClick={handleGradeExam}
                      disabled={Object.keys(examAnswers).length < currentExam.length}
                      className={`w-full py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-md flex items-center justify-center gap-2 ${
                        Object.keys(examAnswers).length === currentExam.length
                          ? (isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90')
                          : 'opacity-40 cursor-not-allowed bg-zinc-500 text-white'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      <span>Calificar Examen de la Clase</span>
                    </button>
                  ) : (
                    <div className="space-y-4">
                      {examScore?.isPassed ? (
                        <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-md">
                              ✓
                            </div>
                            <div>
                              <h5 className="text-sm font-black uppercase">¡Examen Aprobado con Excelencia!</h5>
                              <p className="text-xs opacity-90">
                                Has obtenido +{mastery.xpPerClass} XP y +{mastery.diamondsPerClass} Diamantes.
                              </p>
                            </div>
                          </div>

                          {selectedClassIndex < totalClasses - 1 && (
                            <button
                              onClick={handleNextClass}
                              className={`px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md ${
                                isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                              }`}
                            >
                              <span>Avanzar a la Siguiente Clase</span>
                              <ArrowRight size={14} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                          isLight ? 'bg-red-50 border-red-200 text-red-950' : 'bg-red-500/15 border-red-500/30 text-red-200'
                        }`}>
                          <div>
                            <h5 className="text-sm font-black uppercase">Respuestas Incorrectas Detectadas</h5>
                            <p className="text-xs opacity-80">
                              Revisa los conceptos en la lectura o vídeo y reintenta el examen para certificar la clase.
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setExamSubmitted(false);
                              setExamAnswers({});
                              setExamScore(null);
                            }}
                            className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md"
                          >
                            <RotateCcw size={14} />
                            <span>Reintentar Examen</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* BOTTOM LESSON CONTROLS */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => selectedClassIndex > 0 && handleSelectClass(selectedClassIndex - 1)}
                disabled={selectedClassIndex === 0}
                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                  selectedClassIndex === 0
                    ? 'opacity-30 cursor-not-allowed border-transparent'
                    : isLight ? 'border-zinc-200 hover:bg-zinc-100 text-zinc-700' : 'border-white/10 hover:bg-white/10 text-white'
                }`}
              >
                ← Anterior
              </button>

              <div className="flex items-center gap-3">
                {!isCurrentClassDone && (
                  <button
                    onClick={() => onCompleteClass?.(currentClass, mastery)}
                    className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 ${
                      isLight ? 'bg-zinc-900 text-white hover:bg-zinc-800' : 'bg-white text-black hover:bg-white/90'
                    }`}
                  >
                    <Check size={14} />
                    <span>Validar Clase</span>
                  </button>
                )}

                {selectedClassIndex < totalClasses - 1 && (
                  <button
                    onClick={handleNextClass}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all flex items-center gap-1.5 ${
                      isLight ? 'border-zinc-200 hover:bg-zinc-100 text-zinc-800' : 'border-white/10 hover:bg-white/10 text-white'
                    }`}
                  >
                    <span>Siguiente</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </motion.div>
    </motion.div>
  );
};
