import React from "react";
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  BrainCircuit, 
  ArrowRight, 
  Award, 
  Flame, 
  Bookmark, 
  FileText 
} from "lucide-react";
import { Course, Flashcard, Homework, UserProfile } from "../types";

interface StudentDashboardProps {
  user: UserProfile;
  courses: Course[];
  flashcards: Flashcard[];
  homework: Homework[];
  onNavigate: (tab: string) => void;
  onOpenCourse: (courseId: string) => void;
  onOpenAiTutor: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  courses,
  flashcards,
  homework,
  onNavigate,
  onOpenCourse,
  onOpenAiTutor,
}) => {
  // Flashcards due for review
  const dueFlashcards = flashcards.filter(f => f.box <= 3);
  const pendingHomework = homework.filter(h => !h.isSubmittedByCurrentStudent);
  const completedHomework = homework.filter(h => h.isSubmittedByCurrentStudent);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-xs mb-3">
              <Flame size={14} className="text-amber-400 fill-amber-400" />
              <span>Série de révision active : 6 jours consécutifs !</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Bonjour, {user.name} 👋
            </h2>
            <p className="text-indigo-100/90 text-sm max-w-xl mt-1.5">
              Prêt(e) pour votre journée en <strong>{user.schoolClass}</strong> ? Vous avez {dueFlashcards.length} cartes de révision espacée prêtes et {pendingHomework.length} devoir à finaliser.
            </p>
          </div>

          {/* Quick AI Tutor Help Card */}
          <div className="bg-white/10 border border-white/15 backdrop-blur-md rounded-xl p-4 md:w-72 shrink-0">
            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs mb-1.5">
              <Sparkles size={15} />
              <span>Besoin d'aide sur un cours ?</span>
            </div>
            <p className="text-xs text-indigo-100 mb-3">
              Posez une question, demandez une explication simplifiée ou un exemple concret.
            </p>
            <button
              onClick={onOpenAiTutor}
              className="w-full py-2 px-3 bg-white text-indigo-900 hover:bg-indigo-50 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>Consulter le Tuteur IA</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <p className="text-indigo-200 font-medium">Moyenne Générale</p>
            <p className="text-xl font-extrabold mt-0.5">17.2 <span className="text-xs font-normal text-indigo-200">/20</span></p>
          </div>
          <div>
            <p className="text-indigo-200 font-medium">Socle de Compétences</p>
            <p className="text-xl font-extrabold mt-0.5 text-emerald-300">88% <span className="text-xs font-normal text-indigo-200">Maîtrisé</span></p>
          </div>
          <div>
            <p className="text-indigo-200 font-medium">Cartes Mémorisées</p>
            <p className="text-xl font-extrabold mt-0.5">{flashcards.filter(f => f.box >= 4).length} <span className="text-xs font-normal text-indigo-200">/ {flashcards.length}</span></p>
          </div>
          <div>
            <p className="text-indigo-200 font-medium">Temps de Révision</p>
            <p className="text-xl font-extrabold mt-0.5">4h 20m <span className="text-xs font-normal text-indigo-200">cette semaine</span></p>
          </div>
        </div>
      </div>

      {/* Main Grid: Homework + Spaced Repetition + Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Homework to do & Active Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Devoirs à rendre (Cahier de textes) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Devoirs & Cahier de textes</h3>
                  <p className="text-xs text-slate-500">Travail à rendre et évaluations prévues</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate("homework")}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <span>Tout afficher</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="space-y-3">
              {homework.map((hw) => {
                const isLate = new Date(hw.dueDate) < new Date();
                const isSubmitted = hw.isSubmittedByCurrentStudent;
                return (
                  <div 
                    key={hw.id}
                    className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSubmitted 
                        ? "bg-slate-50 border-slate-200 opacity-90" 
                        : "bg-white border-indigo-100 hover:border-indigo-300 hover:shadow-xs"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                        isSubmitted ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"
                      }`}>
                        {isSubmitted ? <CheckCircle2 size={15} /> : <Clock size={15} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {hw.subject}
                          </span>
                          <span className="text-xs text-slate-400">• Pour le {new Date(hw.dueDate).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 mt-1">{hw.title}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{hw.instructions}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      {isSubmitted ? (
                        <div className="text-right">
                          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Note : {hw.currentStudentSubmission?.score} / {hw.maxScore}
                          </span>
                          <p className="text-[10px] text-slate-400">Rendu le 07 sept.</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => onNavigate("homework")}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
                        >
                          Rendre mon devoir
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reprendre un cours (Ressources récentes) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Mes Leçons & Chapitres Récents</h3>
                  <p className="text-xs text-slate-500">Supports multimédias et synthèses interactives</p>
                </div>
              </div>
              <button 
                onClick={() => onNavigate("courses")}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
              >
                <span>Bibliothèque complète</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.slice(0, 2).map((course) => (
                <div 
                  key={course.id}
                  onClick={() => onOpenCourse(course.id)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 hover:shadow-xs transition-all cursor-pointer bg-gradient-to-b from-white to-slate-50/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {course.subject}
                      </span>
                      <span>{course.durationMinutes} min</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">{course.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{course.summary}</p>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-medium">Disponible hors-ligne ✓</span>
                    <span className="text-indigo-600 font-semibold flex items-center gap-1">
                      Ouvrir <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Spaced Repetition + Today's Schedule */}
        <div className="space-y-6">
          {/* Spaced Repetition Leitner Widget */}
          <div className="bg-gradient-to-b from-indigo-50/70 to-white rounded-xl border border-indigo-100 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BrainCircuit size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Répétition Espacée</h3>
              </div>
              <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                Méthode Leitner
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Vous avez <strong className="text-indigo-900 font-bold">{dueFlashcards.length} cartes</strong> à réviser aujourd'hui pour optimiser votre rétention à long terme.
            </p>

            {/* Leitner Box Progress Mini-Bar */}
            <div className="space-y-2 mb-4 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between text-[11px] font-medium text-slate-700">
                <span>Boîte 1 (Quotidien)</span>
                <span className="font-bold text-rose-600">{flashcards.filter(f => f.box === 1).length}</span>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-slate-700">
                <span>Boîte 2 & 3 (Hebdo)</span>
                <span className="font-bold text-amber-600">{flashcards.filter(f => f.box === 2 || f.box === 3).length}</span>
              </div>
              <div className="flex justify-between text-[11px] font-medium text-slate-700">
                <span>Boîte 4 & 5 (Maîtrisé)</span>
                <span className="font-bold text-emerald-600">{flashcards.filter(f => f.box >= 4).length}</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate("revision")}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <BrainCircuit size={15} />
              <span>Démarrer ma session de révision</span>
            </button>
          </div>

          {/* Today's Schedule (Emploi du temps du jour) */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">Emploi du temps du jour</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Mercredi 9 Sept.</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50/50 border-l-3 border-indigo-600">
                <span className="text-xs font-bold text-slate-700 w-12 shrink-0">08:30</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">Mathématiques</p>
                  <p className="text-[11px] text-slate-500">M. Dumas • Salle 204</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50/50 border-l-3 border-emerald-600">
                <span className="text-xs font-bold text-slate-700 w-12 shrink-0">10:30</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">SVT</p>
                  <p className="text-[11px] text-slate-500">Mme Dupont • Labo SVT 1</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border-l-3 border-slate-400">
                <span className="text-xs font-bold text-slate-700 w-12 shrink-0">14:00</span>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-900">Français</p>
                  <p className="text-[11px] text-slate-500">Mme Bernard • Salle 108</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-purple-50/50 border-l-3 border-purple-600">
                <span className="text-xs font-bold text-slate-700 w-12 shrink-0">17:00</span>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-purple-900">Classe Virtuelle (Direct)</p>
                    <p className="text-[11px] text-slate-500">Aide aux devoirs & révisions</p>
                  </div>
                  <button 
                    onClick={() => onNavigate("collaboration")}
                    className="text-[10px] font-bold px-2 py-1 bg-purple-600 text-white rounded-md"
                  >
                    Rejoindre
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
