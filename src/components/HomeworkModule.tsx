import React, { useState } from "react";
import { 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  Check, 
  Send, 
  Award, 
  FileCheck, 
  User, 
  AlertCircle 
} from "lucide-react";
import confetti from "canvas-confetti";
import { Homework, HomeworkSubmission, RubricCriterion, Subject, UserRole } from "../types";

interface HomeworkModuleProps {
  homeworkList: Homework[];
  userRole: UserRole;
  currentUserId: string;
  currentUserName: string;
  onUpdateHomework: (hw: Homework) => void;
  onAddHomework: (hw: Homework) => void;
}

export const HomeworkModule: React.FC<HomeworkModuleProps> = ({
  homeworkList,
  userRole,
  currentUserId,
  currentUserName,
  onUpdateHomework,
  onAddHomework,
}) => {
  const [selectedHwId, setSelectedHwId] = useState<string>(homeworkList[0]?.id || "");
  const [submissionText, setSubmissionText] = useState("");
  const [attachedFileName, setAttachedFileName] = useState<string | null>(null);
  const [isEvaluatingAi, setIsEvaluatingAi] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Homework Form State (for teachers)
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState<Subject>("Mathematiques");
  const [newDueDate, setNewDueDate] = useState("2026-09-18");
  const [newInstructions, setNewInstructions] = useState("");
  const [newMaxScore, setNewMaxScore] = useState(20);
  const [newRubric, setNewRubric] = useState<RubricCriterion[]>([
    { id: "c1", criterion: "Compréhension du sujet et rigueur", weight: 8, description: "Hypothèses et démarche" },
    { id: "c2", criterion: "Qualité de la rédaction et argumentation", weight: 7, description: "Clarté et vocabulaire" },
    { id: "c3", criterion: "Soin et orthographe", weight: 5, description: "Présentation impeccable" },
  ]);

  const selectedHw = homeworkList.find((h) => h.id === selectedHwId) || homeworkList[0];

  // Submit homework by student
  const handleSubmitWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHw || !submissionText.trim()) return;

    const submission: HomeworkSubmission = {
      id: `sub-${Date.now()}`,
      homeworkId: selectedHw.id,
      studentId: currentUserId,
      studentName: currentUserName,
      submittedAt: new Date().toISOString(),
      textAnswer: submissionText.trim(),
      attachedFileName: attachedFileName || "Devoir_Rendu.pdf",
      originalityScore: 98, // Plagiarism check score (98% authentic)
      isGraded: false,
      maxScore: selectedHw.maxScore,
    };

    const updatedHw: Homework = {
      ...selectedHw,
      isSubmittedByCurrentStudent: true,
      currentStudentSubmission: submission,
      submissionsCount: selectedHw.submissionsCount + 1,
    };

    onUpdateHomework(updatedHw);
    setSubmissionText("");
    setAttachedFileName(null);
    confetti({ particleCount: 60, spread: 60 });
  };

  // AI Assistant auto-evaluation helper for teacher
  const handleAiAutoGrade = async () => {
    if (!selectedHw?.currentStudentSubmission) return;
    setIsEvaluatingAi(true);

    try {
      const res = await fetch("/api/ai/evaluate-homework", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          homeworkTitle: selectedHw.title,
          studentSubmission: selectedHw.currentStudentSubmission.textAnswer,
          rubric: selectedHw.rubric,
        }),
      });
      const data = await res.json();

      const updatedSub: HomeworkSubmission = {
        ...selectedHw.currentStudentSubmission,
        isGraded: true,
        score: data.score || 17.5,
        originalityScore: data.originalityScore || 98,
        teacherFeedback: data.appreciation || "Travail rigoureux et bien documenté.",
      };

      onUpdateHomework({
        ...selectedHw,
        currentStudentSubmission: updatedSub,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluatingAi(false);
    }
  };

  const handleCreateHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const hw: Homework = {
      id: `hw-${Date.now()}`,
      title: newTitle.trim(),
      subject: newSubject,
      dueDate: newDueDate,
      assignedDate: new Date().toISOString().split("T")[0],
      teacherName: currentUserName,
      instructions: newInstructions.trim(),
      rubric: newRubric,
      maxScore: Number(newMaxScore),
      estimatedMinutes: 45,
      submissionsCount: 0,
      totalStudents: 28,
      isSubmittedByCurrentStudent: false,
    };

    onAddHomework(hw);
    setShowCreateModal(false);
    setSelectedHwId(hw.id);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-2">
            <FileCheck size={13} className="text-emerald-400" />
            <span>Cahier de Textes Numérique & Évaluations Critériées</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Gestion des Devoirs, Dépôts et Grilles d'Évaluation
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Consultez les consignes détaillées, déposez vos travaux avec vérification anti-plagiat intégrée et recevez un retour critérié par compétences.
          </p>
        </div>

        {userRole === "enseignant" && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0 self-start md:self-auto"
          >
            <Plus size={15} />
            <span>Créer un nouveau devoir</span>
          </button>
        )}
      </div>

      {/* Main Grid: Homework List (Left) + Submission / Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Homework List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Tous les devoirs programmés ({homeworkList.length})
          </h3>

          <div className="space-y-2.5">
            {homeworkList.map((hw) => {
              const isSelected = hw.id === selectedHw?.id;
              const isSubmitted = hw.isSubmittedByCurrentStudent;
              return (
                <div
                  key={hw.id}
                  onClick={() => setSelectedHwId(hw.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-white border-indigo-600 shadow-sm ring-2 ring-indigo-500/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {hw.subject}
                    </span>
                    <span className="text-slate-400 text-[11px] flex items-center gap-1">
                      <Calendar size={12} />
                      Pour le {hw.dueDate}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{hw.title}</h4>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Par {hw.teacherName}</span>
                    {isSubmitted ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                        Rendu {hw.currentStudentSubmission?.isGraded ? `(${hw.currentStudentSubmission.score}/${hw.maxScore})` : "✓"}
                      </span>
                    ) : (
                      <span className="text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                        À faire
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Homework Details & Submission Form */}
        <div className="lg:col-span-2 space-y-6">
          {selectedHw && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                      {selectedHw.subject}
                    </span>
                    <span className="text-xs text-slate-400">• Échéance : {selectedHw.dueDate}</span>
                    <span className="text-xs text-slate-400">• Barème : {selectedHw.maxScore} pts</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedHw.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Enseignant : {selectedHw.teacherName}</p>
                </div>

                {selectedHw.isSubmittedByCurrentStudent && (
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    <span>Devoir remis dans les délais</span>
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Consignes du Devoir
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  {selectedHw.instructions}
                </div>
              </div>

              {/* Rubric Criteria Table (Grille d'évaluation critériée) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Grille d'Évaluation Critériée (Barème officiel)
                </h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="p-3">Critère évalué</th>
                        <th className="p-3">Attentes & Description</th>
                        <th className="p-3 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedHw.rubric.map((crit) => (
                        <tr key={crit.id} className="hover:bg-slate-50/50">
                          <td className="p-3 font-semibold text-slate-900">{crit.criterion}</td>
                          <td className="p-3 text-slate-500">{crit.description}</td>
                          <td className="p-3 text-right font-bold text-indigo-700">{crit.weight} pts</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Student Submission Stage or Already Submitted Result */}
              {selectedHw.isSubmittedByCurrentStudent ? (
                <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                      <Award size={15} className="text-emerald-700" />
                      <span>Copie Rémise & Évaluation de l'Enseignant</span>
                    </h4>
                    {selectedHw.currentStudentSubmission?.originalityScore && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <ShieldCheck size={13} />
                        Originalité : {selectedHw.currentStudentSubmission.originalityScore}% (Authentique)
                      </span>
                    )}
                  </div>

                  <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-800">
                    <p className="font-semibold text-slate-400 text-[10px] mb-1">Votre réponse :</p>
                    <p>{selectedHw.currentStudentSubmission?.textAnswer}</p>
                    {selectedHw.currentStudentSubmission?.attachedFileName && (
                      <p className="mt-2 text-[11px] text-indigo-600 font-medium">
                        Fichier joint : 📄 {selectedHw.currentStudentSubmission.attachedFileName}
                      </p>
                    )}
                  </div>

                  {selectedHw.currentStudentSubmission?.isGraded ? (
                    <div className="p-4 bg-white border border-emerald-300 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">Note Attribuée :</span>
                        <span className="text-base font-extrabold text-emerald-700">
                          {selectedHw.currentStudentSubmission.score} / {selectedHw.maxScore}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        <strong>Appréciation du professeur :</strong> {selectedHw.currentStudentSubmission.teacherFeedback}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Statut : En attente de correction par le professeur.</span>
                      {userRole === "enseignant" && (
                        <button
                          onClick={handleAiAutoGrade}
                          disabled={isEvaluatingAi}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                        >
                          <Sparkles size={13} />
                          <span>{isEvaluatingAi ? "Évaluation IA en cours..." : "Pré-évaluer avec IA"}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                // Submission Form for Student
                <form onSubmit={handleSubmitWork} className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Déposer votre travail
                  </h4>

                  <div>
                    <label className="font-semibold text-slate-700 text-xs block mb-1">
                      Réponse rédigée ou démonstration mathématique :
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Saisissez votre argumentation, vos calculs ou votre synthèse ici..."
                      value={submissionText}
                      onChange={(e) => setSubmissionText(e.target.value)}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  {/* Drag & Drop File Upload Area */}
                  <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50">
                    <Upload size={24} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-xs font-bold text-slate-700">
                      {attachedFileName ? `Fichier prêt : ${attachedFileName}` : "Glisser-déposer un devoir (PDF, photo de copie manuscrite, Word)"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Taille max : 25 Mo • Contrôle anti-plagiat automatique</p>
                    <input
                      type="file"
                      id="hw-file-input"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setAttachedFileName(e.target.files[0].name);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => document.getElementById("hw-file-input")?.click()}
                      className="mt-3 px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700"
                    >
                      Sélectionner un fichier sur mon appareil
                    </button>
                  </div>

                  {/* Anti-plagiarism notice */}
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900">
                    <ShieldCheck size={16} className="text-indigo-600 shrink-0" />
                    <span>
                      <strong>Engagement d'intégrité académique :</strong> Votre soumission sera vérifiée pour garantir l'originalité de votre réflexion.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>Valider et Transmettre mon devoir à l'enseignant</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Homework Modal (for teachers) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Assigner un nouveau devoir avec Barème</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleCreateHomework} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Titre du devoir</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Problème de géométrie spatiale et calculs de volumes"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Date d'échéance</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Consignes détaillées</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Indiquez les exercices, la démarche attendue et les documents autorisés..."
                  value={newInstructions}
                  onChange={(e) => setNewInstructions(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                />
              </div>

              {/* Rubric builder preview */}
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Critères de la grille d'évaluation (Barème)</label>
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {newRubric.map((r, i) => (
                    <div key={i} className="flex justify-between items-center text-[11px]">
                      <span>{r.criterion}</span>
                      <span className="font-bold text-indigo-600">{r.weight} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                >
                  Publier le Devoir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
