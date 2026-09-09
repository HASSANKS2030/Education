import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  HelpCircle, 
  Award, 
  Sparkles, 
  RotateCcw, 
  ArrowRight, 
  Layers, 
  Zap 
} from "lucide-react";
import confetti from "canvas-confetti";
import { Quiz, QuizQuestion } from "../types";

interface ExercisesModuleProps {
  quizzes: Quiz[];
  onOpenAiTutor: () => void;
}

export const ExercisesModule: React.FC<ExercisesModuleProps> = ({
  quizzes,
  onOpenAiTutor,
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz>(quizzes[0]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, any>>({});
  const [fillBlankInput, setFillBlankInput] = useState("");
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedQuiz.timeLimitSeconds);
  const [timerActive, setTimerActive] = useState(false);

  // AI Quiz Generator State
  const [aiTopic, setAiTopic] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (timerActive && timeLeft > 0 && !isQuizSubmitted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, isQuizSubmitted]);

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setFillBlankInput("");
    setIsQuizSubmitted(false);
    setTimeLeft(quiz.timeLimitSeconds);
    setTimerActive(true);
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optionIdx,
    });
  };

  const handleSubmitFillBlank = (qIdx: number) => {
    if (isQuizSubmitted || !fillBlankInput.trim()) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: fillBlankInput.trim().toLowerCase(),
    });
  };

  const handleSubmitQuiz = () => {
    setTimerActive(false);
    setIsQuizSubmitted(true);

    // Calculate score
    let correctCount = 0;
    selectedQuiz.questions.forEach((q, idx) => {
      if (q.type === "qcm" && selectedAnswers[idx] === q.correctOptionIndex) {
        correctCount++;
      } else if (q.type === "fill_blanks" && selectedAnswers[idx]?.toLowerCase() === q.correctAnswerText?.toLowerCase()) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / selectedQuiz.questions.length) * 100);
    if (scorePct >= selectedQuiz.passingScore) {
      confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
    }
  };

  const handleGenerateAiQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setIsGeneratingAi(true);
    try {
      const res = await fetch("/api/ai/quiz-gen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic.trim(),
          subject: selectedQuiz.subject,
          difficulty: "moyen",
        }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        const newQuiz: Quiz = {
          id: `qz-ai-${Date.now()}`,
          title: `Quiz IA : ${aiTopic}`,
          subject: selectedQuiz.subject,
          timeLimitSeconds: 180,
          passingScore: 70,
          questions: data.questions.map((q: any, i: number) => ({
            id: `q-ai-${i}`,
            type: "qcm",
            question: q.question,
            options: q.options,
            correctOptionIndex: q.correctIndex,
            explanation: q.explanation,
            competencyRef: "D1 - Mobiliser ses connaissances",
          })),
        };
        handleStartQuiz(newQuiz);
        setAiTopic("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Score computation
  const correctCount = selectedQuiz.questions.reduce((acc, q, idx) => {
    if (q.type === "qcm" && selectedAnswers[idx] === q.correctOptionIndex) return acc + 1;
    if (q.type === "fill_blanks" && selectedAnswers[idx]?.toLowerCase() === q.correctAnswerText?.toLowerCase()) return acc + 1;
    return acc;
  }, 0);

  const scorePct = Math.round((correctCount / selectedQuiz.questions.length) * 100);
  const currentQ = selectedQuiz.questions[currentQuestionIndex];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-2">
            <Zap size={13} className="text-amber-400" />
            <span>Évaluations Formatives & Tests Chronométrés</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Moteur de Quiz Interactifs & Auto-Correction
          </h2>
          <p className="text-xs text-indigo-100/90 max-w-2xl mt-1">
            Testez vos connaissances en temps limité avec correction instantanée, explications pédagogiques détaillées et rattachement aux compétences du socle commun.
          </p>
        </div>

        {/* AI Quiz Generator form */}
        <form onSubmit={handleGenerateAiQuiz} className="flex items-center gap-2 shrink-0 bg-white/10 p-1.5 rounded-xl border border-white/20">
          <input
            type="text"
            placeholder="Créer un quiz sur un sujet..."
            value={aiTopic}
            onChange={(e) => setAiTopic(e.target.value)}
            className="px-3 py-1.5 bg-white/10 text-white placeholder:text-indigo-200 text-xs rounded-lg border-0 focus:outline-hidden focus:bg-white/20 w-44"
          />
          <button
            type="submit"
            disabled={isGeneratingAi}
            className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
          >
            <Sparkles size={13} />
            <span>{isGeneratingAi ? "Création..." : "Générer"}</span>
          </button>
        </form>
      </div>

      {/* Quiz Selection Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() => handleStartQuiz(quiz)}
            className={`px-3.5 py-2 rounded-xl font-bold transition-all border shrink-0 ${
              selectedQuiz.id === quiz.id
                ? "bg-white border-indigo-600 text-indigo-700 shadow-xs ring-2 ring-indigo-500/20"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {quiz.title} ({quiz.questions.length} questions)
          </button>
        ))}
      </div>

      {/* Main Quiz Arena */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-3xl mx-auto space-y-6">
        {/* Arena Top Status Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
          <div>
            <h3 className="font-bold text-slate-900">{selectedQuiz.title}</h3>
            <span className="text-slate-400 text-[11px]">
              Question {currentQuestionIndex + 1} sur {selectedQuiz.questions.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer countdown badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs ${
              timeLeft < 30 ? "bg-rose-100 text-rose-800 animate-pulse" : "bg-indigo-50 text-indigo-800"
            }`}>
              <Clock size={14} />
              <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
            </div>

            <button
              onClick={() => handleStartQuiz(selectedQuiz)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Recommencer"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Current Question Display */}
        {currentQ && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-600 block mb-1">
                {currentQ.competencyRef || "Socle de compétences"}
              </span>
              <p className="text-sm font-bold text-slate-900 leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Answer choices (QCM or Fill-in-the-blanks) */}
            {currentQ.type === "qcm" && currentQ.options && (
              <div className="space-y-2.5">
                {currentQ.options.map((option, oIdx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                  const isCorrect = isQuizSubmitted && oIdx === currentQ.correctOptionIndex;
                  const isWrongSelected = isQuizSubmitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={oIdx}
                      disabled={isQuizSubmitted}
                      onClick={() => handleSelectOption(currentQuestionIndex, oIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                        isCorrect
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold"
                          : isWrongSelected
                          ? "bg-rose-50 border-rose-500 text-rose-950 font-bold"
                          : isSelected
                          ? "bg-indigo-50 border-indigo-600 text-indigo-900"
                          : "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-50"
                      }`}
                    >
                      <span>{option}</span>
                      {isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                      {isWrongSelected && <XCircle size={16} className="text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.type === "fill_blanks" && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    disabled={isQuizSubmitted}
                    placeholder="Saisissez le mot manquant..."
                    value={fillBlankInput}
                    onChange={(e) => setFillBlankInput(e.target.value)}
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                  />
                  {!isQuizSubmitted && (
                    <button
                      type="button"
                      onClick={() => handleSubmitFillBlank(currentQuestionIndex)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Valider le mot
                    </button>
                  )}
                </div>
                {selectedAnswers[currentQuestionIndex] && (
                  <p className="text-xs text-slate-600">
                    Votre saisie : <strong className="text-slate-900">{selectedAnswers[currentQuestionIndex]}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Explanation box (shown after submit) */}
            {isQuizSubmitted && (
              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 space-y-1 animate-in fade-in">
                <p className="font-bold flex items-center gap-1.5 text-indigo-900">
                  <HelpCircle size={14} />
                  <span>Explication Pédagogique :</span>
                </p>
                <p className="text-slate-700 leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination & Submission Controls */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={currentQuestionIndex === 0}
            onClick={() => {
              setCurrentQuestionIndex(currentQuestionIndex - 1);
              setFillBlankInput("");
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold disabled:opacity-30"
          >
            ← Précédente
          </button>

          {/* Quick jump dots */}
          <div className="flex items-center gap-1.5">
            {selectedQuiz.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentQuestionIndex(idx);
                  setFillBlankInput("");
                }}
                className={`w-6 h-6 rounded-md text-xs font-bold transition-all ${
                  currentQuestionIndex === idx
                    ? "bg-indigo-600 text-white shadow-xs"
                    : selectedAnswers[idx] !== undefined
                    ? "bg-slate-200 text-slate-800"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentQuestionIndex < selectedQuiz.questions.length - 1 ? (
            <button
              onClick={() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setFillBlankInput("");
              }}
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold"
            >
              Suivante →
            </button>
          ) : !isQuizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs"
            >
              Terminer & Obtenir ma note
            </button>
          ) : (
            <button
              onClick={() => handleStartQuiz(selectedQuiz)}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
            >
              Refaire le quiz
            </button>
          )}
        </div>

        {/* Final Score Banner */}
        {isQuizSubmitted && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-center space-y-2 animate-in fade-in">
            <div className="inline-flex p-2 bg-emerald-100 text-emerald-800 rounded-full">
              <Award size={24} />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              Résultat : {correctCount} / {selectedQuiz.questions.length} correctes ({scorePct}%)
            </h4>
            <p className="text-xs text-slate-600">
              {scorePct >= selectedQuiz.passingScore
                ? "Excellent ! Compétences validées avec succès sur ce chapitre."
                : "Notions à retravailler. Relisez la fiche de synthèse ou révisez vos flashcards associées."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
