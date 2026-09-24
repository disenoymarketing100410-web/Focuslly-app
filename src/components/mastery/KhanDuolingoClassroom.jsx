// src/components/mastery/KhanDuolingoClassroom.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Play, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Gem, 
  Lock, 
  Trophy, 
  Heart, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Lightbulb, 
  FileText, 
  Edit3, 
  Save, 
  Copy, 
  GraduationCap, 
  CheckCheck,
  RotateCcw
} from 'lucide-react';

export const KhanDuolingoClassroom = ({
  lesson,
  mastery,
  soundEnabled = true,
  isLight = false,
  onComplete,
  onBackToCourse,
  playSound
}) => {
  // Tabs: 'video' | 'article' | 'practice' | 'notes'
  const [activeTab, setActiveTab] = useState('video');
  
  // Quiz state
  const questions = useMemo(() => {
    return lesson.exam || (lesson.quiz ? [lesson.quiz] : []);
  }, [lesson]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkStatus, setCheckStatus] = useState(null); // 'correct' | 'wrong' | null
  const [hearts, setHearts] = useState(5);
  const [revealedHintLevel, setRevealedHintLevel] = useState(0); // 0 = none, 1 = concept, 2 = solution guidance
  const [isClassFinished, setIsClassFinished] = useState(false);

  // Scratchpad Notes with localStorage persistence
  const notesKey = `focusly_scratchpad_${mastery.id}_${lesson.id}`;
  const [notesContent, setNotesContent] = useState(() => {
    try {
      return localStorage.getItem(notesKey) || '';
    } catch {
      return '';
    }
  });
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  const saveNotes = (content) => {
    setNotesContent(content);
    try {
      localStorage.setItem(notesKey, content);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 2000);
    } catch {}
  };

  const handleInsertTemplate = () => {
    const template = `## Apuntes de ${lesson.title}\n\n### 1. Idea Principal\n- \n\n### 2. Atajos o Fórmulas Clave\n- \n\n### 3. Cómo lo aplicaré hoy\n- `;
    const updated = notesContent ? `${notesContent}\n\n${template}` : template;
    saveNotes(updated);
    playSound?.('select', soundEnabled);
  };

  const currentQuestion = questions[currentQuestionIndex] || null;

  useEffect(() => {
    setSelectedOption(null);
    setCheckStatus(null);
    setRevealedHintLevel(0);
  }, [currentQuestionIndex]);

  const handleCheckAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    const isAnswerCorrect = selectedOption === currentQuestion.answer;
    if (isAnswerCorrect) {
      playSound?.('correct', soundEnabled);
      setCheckStatus('correct');
    } else {
      playSound?.('wrong', soundEnabled);
      setCheckStatus('wrong');
      setHearts(prev => Math.max(1, prev - 1));
    }
  };

  const handleNextQuestion = () => {
    playSound?.('click', soundEnabled);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      playSound?.('victory', soundEnabled);
      setIsClassFinished(true);
      onComplete?.();
    }
  };

  // Khan Academy Smart Progressive Hints
  const getHintsForQuestion = () => {
    if (!currentQuestion) return { hint1: '', hint2: '' };
    
    // Hint 1: Core Theoretical Principle
    const hint1 = `💡 Pista 1 (Concepto): Recuerda los fundamentos explicados en el vídeo y artículo de "${lesson.title}". Revisa con atención las palabras clave de la pregunta.`;
    
    // Hint 2: Deductive Direction
    const hint2 = currentQuestion.explanation 
      ? `🔍 Pista 2 (Deducción guiada): ${currentQuestion.explanation.split('.')[0]}. Piensa cuál de las opciones encaja directamente con este principio.`
      : `🔍 Pista 2 (Deducción guiada): Descarta las respuestas que contradicen la metodología estándar y enfócate en la regla principal.`;

    return { hint1, hint2 };
  };

  const { hint1, hint2 } = getHintsForQuestion();

  // VICTORY SCREEN
  if (isClassFinished) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 relative text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 14 }}
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-purple-600 via-blue-600 to-indigo-600 shadow-2xl flex items-center justify-center text-white mb-6"
        >
          <GraduationCap size={54} strokeWidth={2.2} />
        </motion.div>

        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 font-black text-[10px] uppercase tracking-widest border border-purple-500/30 flex items-center gap-1">
            <Trophy size={13} className="text-amber-400" />
            NIVEL DE DOMINIO ALCANZADO
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
          ¡Habilidad Dominada!
        </h2>

        <p className={`text-xs sm:text-sm max-w-md mt-2 leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
          Completaste la clase, la lectura y la práctica interactiva de <strong>{lesson.title}</strong> con éxito total.
        </p>

        {/* Khan Mastery Point Card */}
        <div className="grid grid-cols-3 gap-3 my-6 w-full max-w-md">
          <div className={`p-4 rounded-2xl border text-center ${
            isLight ? 'bg-purple-50 border-purple-200 text-purple-950' : 'bg-purple-500/10 border-purple-500/20 text-purple-300'
          }`}>
            <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">Dominio</span>
            <span className="text-xl font-black block mt-0.5">100 Pts</span>
            <span className="text-[9px] font-bold opacity-60">100% Dominado</span>
          </div>

          <div className={`p-4 rounded-2xl border text-center ${
            isLight ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
          }`}>
            <Zap size={18} className="mx-auto mb-0.5 fill-amber-400" />
            <span className="text-xl font-black block">+{mastery.xpPerClass}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-75">XP Ganado</span>
          </div>

          <div className={`p-4 rounded-2xl border text-center ${
            isLight ? 'bg-cyan-50 border-cyan-200 text-cyan-950' : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
          }`}>
            <Gem size={18} className="mx-auto mb-0.5 fill-cyan-400" />
            <span className="text-xl font-black block">+{mastery.diamondsPerClass}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-75">Gemas</span>
          </div>
        </div>

        <button
          onClick={onBackToCourse}
          className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest shadow-xl cursor-pointer flex items-center gap-2 transition-all active:scale-98"
        >
          <span>Continuar en el Plan de Estudios</span>
          <ChevronRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      
      {/* 1. KHAN ACADEMY TOP CLASSROOM BAR */}
      <div className={`px-5 py-3 border-b flex items-center justify-between gap-4 shrink-0 ${
        isLight ? 'bg-white border-zinc-200' : 'bg-[#11131a] border-white/10'
      }`}>
        {/* Breadcrumbs */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-bold opacity-60 truncate">
            <span>{mastery.title.split(' ')[0]}</span>
            <span>›</span>
            <span>{lesson.levelName || `Nivel ${lesson.level || 1}`}</span>
            <span>›</span>
            <span className="text-blue-400">{lesson.title}</span>
          </div>
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-tight truncate mt-0.5">
            {lesson.title}
          </h3>
        </div>

        {/* Duolingo Hearts & Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Hearts Capsule (Duolingo) */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black ${
            isLight ? 'bg-rose-50 border-rose-200 text-rose-600' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            <Heart size={14} className="fill-rose-500 text-rose-500 animate-pulse" />
            <span>{hearts}</span>
          </div>

          <button
            onClick={onBackToCourse}
            className={`px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
            }`}
          >
            Salir
          </button>
        </div>
      </div>

      {/* 2. KHAN ACADEMY CLASSROOM SUB-TABS */}
      <div className={`px-4 sm:px-6 py-2.5 border-b flex items-center justify-between gap-2 overflow-x-auto no-scrollbar shrink-0 ${
        isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-[#0e1017] border-white/10'
      }`}>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              playSound?.('click', soundEnabled);
              setActiveTab('video');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'video'
                ? 'bg-blue-600 text-white shadow-sm'
                : (isLight ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:bg-white/5')
            }`}
          >
            <Play size={13} className={activeTab === 'video' ? 'fill-current' : ''} />
            <span>Vídeo de Clase</span>
          </button>

          <button
            onClick={() => {
              playSound?.('click', soundEnabled);
              setActiveTab('article');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'article'
                ? 'bg-blue-600 text-white shadow-sm'
                : (isLight ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:bg-white/5')
            }`}
          >
            <FileText size={13} />
            <span>Artículo & Resumen</span>
          </button>

          <button
            onClick={() => {
              playSound?.('click', soundEnabled);
              setActiveTab('practice');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'practice'
                ? 'bg-amber-500 text-black shadow-sm font-black'
                : (isLight ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:bg-white/5')
            }`}
          >
            <Zap size={13} />
            <span>Práctica con Pistas</span>
            {questions.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 font-mono">
                {questions.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              playSound?.('click', soundEnabled);
              setActiveTab('notes');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
              activeTab === 'notes'
                ? 'bg-purple-600 text-white shadow-sm'
                : (isLight ? 'text-zinc-600 hover:bg-zinc-200' : 'text-zinc-400 hover:bg-white/5')
            }`}
          >
            <Edit3 size={13} />
            <span>Mis Apuntes</span>
          </button>
        </div>

        {/* Quick jump to next tab */}
        {activeTab !== 'practice' && (
          <button
            onClick={() => {
              playSound?.('click', soundEnabled);
              setActiveTab(activeTab === 'video' ? 'article' : 'practice');
            }}
            className="text-[11px] font-black uppercase tracking-wider text-blue-400 hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>{activeTab === 'video' ? 'Ir al Artículo' : 'Hacer Práctica'}</span>
            <ChevronRight size={14} />
          </button>
        )}
      </div>

      {/* 3. TAB CONTENTS */}
      <div className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-7">
        
        {/* TAB 1: VIDEO DIDÁCTICO & MOMENTOS CLAVE */}
        {activeTab === 'video' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 relative">
              {lesson.video?.embedUrl ? (
                <iframe
                  src={lesson.video.embedUrl}
                  title={lesson.video.title || lesson.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-zinc-950 text-white">
                  <Play size={44} className="text-blue-500 mb-2 opacity-80" />
                  <p className="text-xs font-bold opacity-60">Clase interactiva de {lesson.title}</p>
                </div>
              )}
            </div>

            {/* Video Meta & Khan Key Moments */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">
                    Clase Magistral
                  </span>
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                    {lesson.video?.title || lesson.title}
                  </h2>
                </div>

                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold shrink-0 ${
                  isLight ? 'bg-zinc-100 border-zinc-200' : 'bg-white/5 border-white/10'
                }`}>
                  ⏱ {lesson.video?.duration || lesson.duration}
                </div>
              </div>

              {/* Key Moments */}
              {lesson.video?.keyMoments && lesson.video.keyMoments.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block">
                    Momentos Clave de la Clase:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {lesson.video.keyMoments.map((km, idx) => (
                      <div
                        key={`km-${idx}`}
                        className={`p-3 rounded-2xl border transition-all ${
                          isLight ? 'bg-zinc-50 border-zinc-200' : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <span className="text-[10px] font-mono font-black text-amber-400">⏱ {km.time}</span>
                        <h4 className="text-xs font-black uppercase tracking-tight truncate mt-0.5">{km.title}</h4>
                        <p className={`text-[11px] mt-1 line-clamp-2 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                          {km.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Khan Academy Summary Box */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                isLight ? 'bg-blue-50/70 border-blue-200 text-blue-950' : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
              }`}>
                <Lightbulb size={20} className="shrink-0 mt-0.5 text-blue-500" />
                <div className="text-xs space-y-1">
                  <span className="font-black uppercase tracking-wider block">Síntesis de Aprendizaje</span>
                  <p className="leading-relaxed opacity-90">
                    {lesson.summary}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTÍCULO & LECTURA DIDÁCTICA */}
        {activeTab === 'article' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400 block mb-0.5">
                Lectura Didáctica Estructurada
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Principios & Metodología
              </h2>
            </div>

            <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 leading-relaxed ${
              isLight ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-white/5 border-white/10 text-white/90'
            }`}>
              {lesson.content.split('\n\n').map((paragraph, pIdx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={pIdx} className="text-base font-black uppercase tracking-tight pt-3 text-blue-400">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={pIdx} className="text-xs sm:text-sm leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}

              {/* Practical Challenge */}
              {lesson.practicalTask && (
                <div className="mt-6 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-black font-black flex items-center justify-center shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="text-[9px] font-black uppercase tracking-widest block opacity-75">
                      Reto Práctico del Mundo Real
                    </span>
                    <p className="text-xs sm:text-sm text-white/90">{lesson.practicalTask}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Khan Action Button */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={() => {
                  const toAppend = `## Conceptos de ${lesson.title}\n\n${lesson.summary}`;
                  saveNotes(notesContent ? `${notesContent}\n\n${toAppend}` : toAppend);
                  playSound?.('select', soundEnabled);
                }}
                className={`px-4 py-2.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                  isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700' : 'bg-white/5 hover:bg-white/10 text-white'
                }`}
              >
                <Copy size={14} />
                <span>Copiar a Mis Apuntes</span>
              </button>

              <button
                onClick={() => {
                  playSound?.('click', soundEnabled);
                  setActiveTab('practice');
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <span>Hacer Práctica</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PRÁCTICA INTERACTIVA CON PISTAS (KHAN ACADEMY + DUOLINGO) */}
        {activeTab === 'practice' && currentQuestion && (
          <div className="max-w-2xl mx-auto space-y-6 py-2">
            
            {/* Header of Question */}
            <div className="flex items-center justify-between gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                Pregunta {currentQuestionIndex + 1} de {questions.length}
              </span>

              {/* Khan Academy Progressive Hints Button */}
              <button
                onClick={() => {
                  playSound?.('click', soundEnabled);
                  setRevealedHintLevel(prev => Math.min(2, prev + 1));
                }}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  revealedHintLevel > 0
                    ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                    : (isLight ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200' : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/20')
                }`}
              >
                <Lightbulb size={13} />
                <span>
                  {revealedHintLevel === 0 && '¿Atascado? Obtén una pista'}
                  {revealedHintLevel === 1 && 'Ver Pista 2'}
                  {revealedHintLevel === 2 && 'Pistas reveladas'}
                </span>
              </button>
            </div>

            {/* Question Text */}
            <h3 className="text-base sm:text-xl font-black uppercase tracking-tight leading-snug">
              {currentQuestion.question}
            </h3>

            {/* Khan Progressive Hints Container */}
            <AnimatePresence>
              {revealedHintLevel > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="space-y-2"
                >
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    isLight ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                  }`}>
                    {hint1}
                  </div>

                  {revealedHintLevel >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                        isLight ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                      }`}
                    >
                      {hint2}
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Answer Options */}
            <div className="space-y-2.5 pt-1">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isThisAnswer = optIdx === currentQuestion.answer;

                let styles = isLight
                  ? 'bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white';

                if (checkStatus === 'correct' && isThisAnswer) {
                  styles = 'bg-blue-600 border-blue-500 text-white shadow-lg';
                } else if (checkStatus === 'wrong' && isSelected) {
                  styles = 'bg-rose-500 border-rose-400 text-white';
                } else if (checkStatus === 'wrong' && isThisAnswer) {
                  styles = 'bg-blue-600/80 border-blue-500 text-white';
                } else if (isSelected && !checkStatus) {
                  styles = isLight
                    ? 'bg-blue-50 border-blue-500 text-blue-900 shadow-sm'
                    : 'bg-blue-500/20 border-blue-400 text-white shadow-sm';
                }

                return (
                  <button
                    key={`opt-${optIdx}`}
                    disabled={checkStatus !== null}
                    onClick={() => {
                      playSound?.('select', soundEnabled);
                      setSelectedOption(optIdx);
                    }}
                    className={`w-full p-4 rounded-2xl border font-bold text-xs sm:text-sm text-left transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${styles}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-white/10'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{optionText}</span>
                    </div>

                    {checkStatus === 'correct' && isThisAnswer && (
                      <CheckCircle2 size={18} className="text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Verification Card */}
            <div className="pt-4">
              {!checkStatus ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                    selectedOption !== null
                      ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg active:scale-98'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  COMPROBAR RESPUESTA
                </button>
              ) : (
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  checkStatus === 'correct'
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-rose-500/20 border-rose-500 text-rose-300'
                }`}>
                  <div className="min-w-0">
                    <span className="font-black text-xs uppercase tracking-wider block">
                      {checkStatus === 'correct' ? '¡Excelente Trabajo!' : 'Solución Sugerida:'}
                    </span>
                    <p className="text-xs text-white/80 mt-0.5">
                      {currentQuestion.explanation || 'Respuesta verificada correctamente.'}
                    </p>
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-white text-zinc-950 font-black text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-md hover:bg-zinc-100"
                  >
                    CONTINUAR →
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 4: MIS APUNTES (SCRATCHPAD CON PERSISTENCIA) */}
        {activeTab === 'notes' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 block mb-0.5">
                  Cuaderno de Estudio
                </span>
                <h2 className="text-lg sm:text-xl font-black uppercase tracking-tight">
                  Mis Apuntes Personales
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleInsertTemplate}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                    isLight ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700' : 'bg-white/5 hover:bg-white/10 text-white'
                  }`}
                >
                  <FileText size={13} />
                  <span>Insertar Plantilla</span>
                </button>

                {noteSavedFeedback && (
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1 animate-fade-in">
                    <CheckCheck size={14} /> Guardado
                  </span>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-3xl border ${
              isLight ? 'bg-white border-zinc-200' : 'bg-white/5 border-white/10'
            }`}>
              <textarea
                value={notesContent}
                onChange={(e) => saveNotes(e.target.value)}
                placeholder="Escribe aquí tus reflexiones, atajos, dudas o cómo aplicarás esta lección en tu vida..."
                rows={14}
                className="w-full bg-transparent outline-none text-xs sm:text-sm font-sans leading-relaxed resize-none placeholder:opacity-40"
              />
            </div>
            
            <p className="text-[11px] opacity-60 text-right">
              Tus notas se guardan automáticamente en tu navegador para esta lección.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
