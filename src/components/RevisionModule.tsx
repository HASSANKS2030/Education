import React, { useState } from "react";
import { 
  BrainCircuit, 
  RotateCw, 
  Check, 
  X, 
  Calendar, 
  Sparkles, 
  Award, 
  HelpCircle, 
  Plus, 
  Lightbulb, 
  CheckCircle2,
  Layers,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";
import { Flashcard, Subject } from "../types";

interface RevisionModuleProps {
  flashcards: Flashcard[];
  onUpdateFlashcard: (updated: Flashcard) => void;
  onAddFlashcard: (card: Flashcard) => void;
  onOpenAiTutor: () => void;
}

export const RevisionModule: React.FC<RevisionModuleProps> = ({
  flashcards,
  onUpdateFlashcard,
  onAddFlashcard,
  onOpenAiTutor,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedBoxFilter, setSelectedBoxFilter] = useState<number | "all">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // New Flashcard Form
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newMnemonic, setNewMnemonic] = useState("");
  const [newSubject, setNewSubject] = useState<Subject>("Mathematiques");

  const filteredCards = selectedBoxFilter === "all" 
    ? flashcards 
    : flashcards.filter(f => f.box === selectedBoxFilter);

  const currentCard = filteredCards[currentIndex] || null;

  // Handle Leitner feedback rating
  const handleRate = (rating: "again" | "hard" | "good" | "easy") => {
    if (!currentCard) return;

    let newBox = currentCard.box;
    if (rating === "again") newBox = 1;
    else if (rating === "hard") newBox = Math.max(1, currentCard.box - 1) as any;
    else if (rating === "good") newBox = Math.min(5, currentCard.box + 1) as any;
    else if (rating === "easy") newBox = 5;

    const updated: Flashcard = {
      ...currentCard,
      box: newBox,
      lastScore: rating,
      totalReviews: currentCard.totalReviews + 1,
    };

    onUpdateFlashcard(updated);

    // Next card or complete
    if (currentIndex < filteredCards.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(currentIndex + 1);
    } else {
      setSessionCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;

    const card: Flashcard = {
      id: `fc-${Date.now()}`,
      courseId: "custom",
      subject: newSubject,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
      mnemonicTip: newMnemonic.trim() || undefined,
      box: 1,
      nextReviewDate: new Date().toISOString().split("T")[0],
      totalReviews: 0,
    };

    onAddFlashcard(card);
    setNewQuestion("");
    setNewAnswer("");
    setNewMnemonic("");
    setShowAddModal(false);
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
  };

  // Box statistics
  const boxCounts = [1, 2, 3, 4, 5].map(b => flashcards.filter(f => f.box === b).length);

  return (
    <div className="space-y-6">
      {/* Top Banner: Cognitive Spaced Repetition Theory */}
      <div className="bg-gradient-to-r from-indigo-800 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-2">
            <BrainCircuit size={13} className="text-amber-400" />
            <span>Courbe de l'oubli d'Ebbinghaus & Algorithme SM-2</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Répétition Espacée : Ancrage Mémoriel Durable
          </h2>
          <p className="text-xs text-indigo-100/90 max-w-2xl mt-1">
            Chaque révision juste avant l'oubli renforce la trace synaptique. Plus une notion est maîtrisée, plus son intervalle de rappel s'allonge (jusqu'à 30 jours en boîte 5).
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-2 bg-white text-indigo-950 hover:bg-indigo-50 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0 self-start md:self-auto"
        >
          <Plus size={15} />
          <span>Créer une Flashcard</span>
        </button>
      </div>

      {/* Leitner Box Progress Strip */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers size={16} className="text-indigo-600" />
            <span>Les 5 Boîtes de Leitner (Niveaux de Maîtrise)</span>
          </h3>
          <div className="flex items-center gap-1 text-xs">
            <button
              onClick={() => { setSelectedBoxFilter("all"); setCurrentIndex(0); setIsFlipped(false); setSessionCompleted(false); }}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedBoxFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Toutes ({flashcards.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {[
            { box: 1, label: "Boîte 1", delay: "Quotidien", color: "border-rose-300 bg-rose-50/50 text-rose-900", badge: "bg-rose-100 text-rose-800" },
            { box: 2, label: "Boîte 2", delay: "Tous les 3j", color: "border-amber-300 bg-amber-50/50 text-amber-900", badge: "bg-amber-100 text-amber-800" },
            { box: 3, label: "Boîte 3", delay: "Chaque semaine", color: "border-blue-300 bg-blue-50/50 text-blue-900", badge: "bg-blue-100 text-blue-800" },
            { box: 4, label: "Boîte 4", delay: "Tous les 15j", color: "border-indigo-300 bg-indigo-50/50 text-indigo-900", badge: "bg-indigo-100 text-indigo-800" },
            { box: 5, label: "Boîte 5", delay: "Tous les 30j (Acquis)", color: "border-emerald-300 bg-emerald-50/50 text-emerald-900", badge: "bg-emerald-100 text-emerald-800" },
          ].map((item) => (
            <div 
              key={item.box}
              onClick={() => { setSelectedBoxFilter(item.box); setCurrentIndex(0); setIsFlipped(false); setSessionCompleted(false); }}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${item.color} ${
                selectedBoxFilter === item.box ? "ring-2 ring-indigo-600 shadow-xs" : "hover:opacity-90"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">{item.label}</span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${item.badge}`}>
                  {boxCounts[item.box - 1]}
                </span>
              </div>
              <p className="text-[11px] opacity-75 mt-1">{item.delay}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Flashcard Practice Stage */}
      <div className="max-w-2xl mx-auto">
        {!sessionCompleted && currentCard ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Carte <strong className="text-slate-900">{currentIndex + 1}</strong> sur {filteredCards.length}
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">
                {currentCard.subject} • Boîte {currentCard.box}
              </span>
            </div>

            {/* Interactive 3D Flip Card */}
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className={`min-h-[260px] p-8 rounded-3xl border transition-all duration-300 cursor-pointer shadow-md flex flex-col justify-between select-none ${
                isFlipped 
                  ? "bg-gradient-to-br from-indigo-50/90 to-white border-indigo-300 shadow-indigo-100" 
                  : "bg-white border-slate-200 hover:border-indigo-400 hover:shadow-lg"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4">
                  <span className="font-bold uppercase tracking-wider text-indigo-600">
                    {isFlipped ? "Réponse & Explication" : "Question de Révision"}
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCw size={12} />
                    {isFlipped ? "Cliquer pour masquer" : "Cliquer pour révéler la réponse"}
                  </span>
                </div>

                <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {isFlipped ? currentCard.answer : currentCard.question}
                </div>

                {isFlipped && currentCard.mnemonicTip && (
                  <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                    <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Astuce Mnémotechnique :</p>
                      <p>{currentCard.mnemonicTip}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Total révisions : {currentCard.totalReviews} fois</span>
                <span className="text-indigo-600 font-medium">Appuyez sur la carte ou l'espace pour retourner</span>
              </div>
            </div>

            {/* Leitner Rating Controls (Shown after flip) */}
            {isFlipped ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2 animate-in fade-in">
                <p className="text-center text-xs font-semibold text-slate-600 mb-2">
                  Comment avez-vous mémorisé cette notion ?
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleRate("again")}
                    className="py-2.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center"
                  >
                    <span>À revoir</span>
                    <span className="text-[10px] font-normal text-rose-600">Boîte 1 (Demain)</span>
                  </button>

                  <button
                    onClick={() => handleRate("hard")}
                    className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center"
                  >
                    <span>Difficile</span>
                    <span className="text-[10px] font-normal text-amber-700">Répéter sous 2j</span>
                  </button>

                  <button
                    onClick={() => handleRate("good")}
                    className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center"
                  >
                    <span>Bon</span>
                    <span className="text-[10px] font-normal text-blue-700">Boîte +1</span>
                  </button>

                  <button
                    onClick={() => handleRate("easy")}
                    className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center"
                  >
                    <span>Facile ✓</span>
                    <span className="text-[10px] font-normal text-emerald-700">Boîte 5 (30j)</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Afficher la réponse
              </button>
            )}
          </div>
        ) : (
          // Session Completed Screen
          <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-md space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Session de Révision Terminée ! 🎉
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Bravo ! Vos circuits neuronaux ont été stimulés selon l'espacement optimal. Les cartes maîtrisées ont été décalées dans le calendrier.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={restartSession}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Recommencer une séance
              </button>
              <button
                onClick={onOpenAiTutor}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-indigo-600" />
                <span>Tester avec le Tuteur IA</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Flashcard Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Nouvelle Flashcard de Révision</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Matière</label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value as Subject)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="Mathematiques">Mathématiques</option>
                  <option value="Francais">Français</option>
                  <option value="Histoire-Geographie">Histoire-Géographie</option>
                  <option value="SVT">SVT</option>
                  <option value="Physique-Chimie">Physique-Chimie</option>
                  <option value="Anglais">Anglais</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Question / Définition / Formule</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex : Quelle est la relation fondamentale de la trigonométrie ?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Réponse exacte</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ex : cos²(x) + sin²(x) = 1 pour tout angle x."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Astuce mnémotechnique (optionnelle)</label>
                <input
                  type="text"
                  placeholder="Ex : Pense à 'Cosinus au carré + Sinus au carré = 1'"
                  value={newMnemonic}
                  onChange={(e) => setNewMnemonic(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold"
                >
                  Enregistrer la Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
