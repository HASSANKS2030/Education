import React, { useState } from "react";
import { 
  Users, 
  BookOpen, 
  FileCheck2, 
  AlertTriangle, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Search, 
  Award,
  Clock
} from "lucide-react";
import { Course, Homework, TeacherAlert, UserProfile } from "../types";

interface TeacherDashboardProps {
  user: UserProfile;
  courses: Course[];
  homework: Homework[];
  alerts: TeacherAlert[];
  onNavigate: (tab: string) => void;
  onOpenCreateHomework: () => void;
  onOpenCreateCourse: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  courses,
  homework,
  alerts,
  onNavigate,
  onOpenCreateHomework,
  onOpenCreateCourse,
}) => {
  const [activeAlertFilter, setActiveAlertFilter] = useState<string>("all");
  const [localAlerts, setLocalAlerts] = useState<TeacherAlert[]>(alerts);

  const resolveAlert = (id: string) => {
    setLocalAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  const pendingSubmissionsCount = homework.reduce((acc, hw) => acc + (hw.submissionsCount - (hw.isSubmittedByCurrentStudent ? 1 : 0)), 0);

  return (
    <div className="space-y-6">
      {/* Teacher Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 mb-2">
              Espace Pédagogique & Enseignement
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Bonjour, {user.name}
            </h2>
            <p className="text-emerald-100/90 text-sm mt-1">
              Classe de 3ème B • Collège Victor Hugo • Année 2026-2027
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onOpenCreateCourse}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Nouveau Cours</span>
            </button>
            <button
              onClick={onOpenCreateHomework}
              className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus size={15} />
              <span>Assigner un Devoir</span>
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <p className="text-emerald-200">Élèves suivis</p>
            <p className="text-xl font-bold mt-0.5">28 élèves</p>
          </div>
          <div>
            <p className="text-emerald-200">Devoirs à corriger</p>
            <p className="text-xl font-bold mt-0.5 text-amber-300">14 copies</p>
          </div>
          <div>
            <p className="text-emerald-200">Alertes Pédagogiques</p>
            <p className="text-xl font-bold mt-0.5 text-rose-300">{localAlerts.filter(a => !a.resolved).length} actives</p>
          </div>
          <div>
            <p className="text-emerald-200">Maîtrise Cycle 4</p>
            <p className="text-xl font-bold mt-0.5 text-emerald-300">84.5% moyenne</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Proactive Teacher Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  Alertes Pédagogiques & Détection Précoce
                </h3>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setActiveAlertFilter("all")}
                  className={`px-2.5 py-1 rounded-md font-medium ${activeAlertFilter === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setActiveAlertFilter("unresolved")}
                  className={`px-2.5 py-1 rounded-md font-medium ${activeAlertFilter === "unresolved" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  À traiter
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {localAlerts
                .filter(a => activeAlertFilter === "all" || !a.resolved)
                .map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      alert.resolved
                        ? "bg-slate-50/70 border-slate-200 opacity-60"
                        : alert.severity === "high"
                        ? "bg-rose-50/60 border-rose-200"
                        : "bg-amber-50/60 border-amber-200"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">{alert.studentName}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-slate-700 font-semibold border border-slate-200">
                          {alert.studentClass}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          alert.severity === "high" ? "bg-rose-600 text-white" : "bg-amber-600 text-white"
                        }`}>
                          {alert.severity === "high" ? "Urgent" : "Attention"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1">{alert.message}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">Signalé le {alert.date}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {!alert.resolved ? (
                        <>
                          <button
                            onClick={() => onNavigate("collaboration")}
                            className="px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold"
                          >
                            Contacter
                          </button>
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                          >
                            <CheckCircle size={13} />
                            <span>Marquer traité</span>
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle size={14} />
                          Traité
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Devoirs assignés et copies à corriger */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCheck2 size={18} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Devoirs en cours & Copies reçues
                </h3>
              </div>
              <button
                onClick={() => onNavigate("homework")}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                Gérer les devoirs →
              </button>
            </div>

            <div className="space-y-3">
              {homework.map((hw) => (
                <div key={hw.id} className="p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-indigo-700">{hw.subject}</span>
                      <span className="text-slate-400">• Pour le {hw.dueDate}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 mt-1">{hw.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Barème : {hw.maxScore} points • {hw.rubric.length} critères d'évaluation</p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right text-xs">
                      <p className="font-bold text-slate-900">{hw.submissionsCount} / {hw.totalStudents} rendus</p>
                      <div className="w-24 bg-slate-100 rounded-full h-1.5 mt-1 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full" 
                          style={{ width: `${(hw.submissionsCount / hw.totalStudents) * 100}%` }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate("homework")}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                    >
                      Corriger
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Quick Tools & Pedagogical Resources */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Outils Pédagogiques de l'Enseignant
            </h3>
            <div className="space-y-2">
              <button
                onClick={onOpenCreateHomework}
                className="w-full p-3 text-left rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">Créer un devoir avec grille d'évaluation</p>
                  <p className="text-[11px] text-slate-500">Barème, compétences et contrôle plagiat</p>
                </div>
                <Plus size={16} className="text-emerald-600 shrink-0" />
              </button>

              <button
                onClick={() => onNavigate("exercises")}
                className="w-full p-3 text-left rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">Générateur de Quiz automatique</p>
                  <p className="text-[11px] text-slate-500">QCM chrono, questions ouvertes et autocorrection</p>
                </div>
                <Sparkles size={16} className="text-indigo-600 shrink-0" />
              </button>

              <button
                onClick={() => onNavigate("collaboration")}
                className="w-full p-3 text-left rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/50 transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">Lancer la Classe Virtuelle</p>
                  <p className="text-[11px] text-slate-500">Session de direct avec tableau blanc et levée de main</p>
                </div>
                <ArrowRight size={16} className="text-purple-600 shrink-0" />
              </button>

              <button
                onClick={() => onNavigate("analytics")}
                className="w-full p-3 text-left rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900">Cartographie des Compétences</p>
                  <p className="text-[11px] text-slate-500">Socle commun 3ème et bulletins officiels</p>
                </div>
                <Award size={16} className="text-blue-600 shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
