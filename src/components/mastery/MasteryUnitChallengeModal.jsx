// src/components/mastery/MasteryUnitChallengeModal.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Trophy, 
  Zap, 
  Gem, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Check, 
  Sparkles,
  GraduationCap
} from 'lucide-react';

export const MasteryUnitChallengeModal = ({
  unit,
  activeMastery,
  soundEnabled = true,
  isLight = false,
  onClose,
  onSuccess,
  playSound
}) => {
  // Extract up to 3 questions from across the unit classes
  const unitQuestions = useMemo(() => {
    const pool = [];
    unit.classes.forEach(c => {
      if (c.exam && c.exam.length > 0) {
        pool.push(...c.exam);
      } else if (c.quiz) {
        pool.push(c.quiz);
      }
    });
    // Shuffle and pick 3
    return pool.slice(0, 3);
  }, [unit]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackStatus, setFeedbackStatus] = useState(null); // 'correct' | 'wrong'
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = unitQuestions[currentIndex];

  const handleVerify = () => {
    if (selectedOption === null || !currentQ) return;
    const isCorrect = selectedOption === currentQ.answer;
    if (isCorrect) {
      playSound?.('correct', soundEnabled);
      setFeedbackStatus('correct');
      setScore(prev => prev + 1);
    } else {
      playSound?.('wrong', soundEnabled);
      setFeedbackStatus('wrong');
    }
  };

  const handleNext = () => {
    playSound?.('click', soundEnabled);
    if (currentIndex < unitQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setFeedbackStatus(null);
    } else {
      playSound?.('victory', soundEnabled);
      setIsFinished(true);
      if (score >= 1) {
        onSuccess?.(unit);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[700] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.95, y: 14 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 14 }}
        className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 sm:p-7 relative overflow-hidden ${
          isLight ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#12141d] border-white/10 text-white'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/10 opacity-70 hover:opacity-100 cursor-pointer"
        >
          <X size={16} />
        </button>

        {!isFinished ? (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                  <Trophy size={11} />
                  Desafío de Dominio
                </span>
                <span className="text-[10px] font-bold opacity-60">
                  Unidad {unit.level} • Pregunta {currentIndex + 1} de {unitQuestions.length}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black uppercase tracking-tight">
                {unit.levelName}
              </h3>
            </div>

            {currentQ ? (
              <div className="space-y-4">
                <p className="text-sm sm:text-base font-bold leading-snug">
                  {currentQ.question}
                </p>

                <div className="space-y-2">
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx;
                    const isCorrect = oIdx === currentQ.answer;

                    let btnStyles = isLight
                      ? 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-800'
                      : 'bg-white/5 hover:bg-white/10 border-white/10 text-white';

                    if (feedbackStatus === 'correct' && isCorrect) {
                      btnStyles = 'bg-blue-600 border-blue-500 text-white';
                    } else if (feedbackStatus === 'wrong' && isSelected) {
                      btnStyles = 'bg-rose-500 border-rose-400 text-white';
                    } else if (feedbackStatus === 'wrong' && isCorrect) {
                      btnStyles = 'bg-blue-600/80 border-blue-500 text-white';
                    } else if (isSelected && !feedbackStatus) {
                      btnStyles = 'bg-blue-600/20 border-blue-400 text-white';
                    }

                    return (
                      <button
                        key={`uo-${oIdx}`}
                        disabled={feedbackStatus !== null}
                        onClick={() => {
                          playSound?.('select', soundEnabled);
                          setSelectedOption(oIdx);
                        }}
                        className={`w-full p-3.5 rounded-2xl border text-xs sm:text-sm font-bold text-left transition-all flex items-center justify-between cursor-pointer ${btnStyles}`}
                      >
                        <span>{opt}</span>
                        {feedbackStatus === 'correct' && isCorrect && <CheckCircle2 size={16} />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2">
                  {!feedbackStatus ? (
                    <button
                      disabled={selectedOption === null}
                      onClick={handleVerify}
                      className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all ${
                        selectedOption !== null
                          ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-lg'
                          : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      }`}
                    >
                      COMPROBAR
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="w-full py-3.5 rounded-2xl bg-white text-zinc-950 font-black text-xs uppercase tracking-wider cursor-pointer shadow-lg"
                    >
                      SIGUIENTE PREGUNTA →
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-xs opacity-70">No hay preguntas disponibles para esta unidad.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <Trophy size={32} />
            </div>

            <div>
              <h3 className="text-xl font-black uppercase">¡Desafío Finalizado!</h3>
              <p className="text-xs opacity-75 mt-1">
                Acertaste {score} de {unitQuestions.length} preguntas en el examen de la unidad.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-6">
              <div className="text-center">
                <span className="text-[10px] font-black uppercase opacity-60 block">Puntuación</span>
                <span className="text-lg font-black text-blue-400">{score * 50} Pts</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-black uppercase opacity-60 block">Bonus XP</span>
                <span className="text-lg font-black text-amber-400">+{score * 25} XP</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider cursor-pointer"
            >
              Volver al Plan de Estudios
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
