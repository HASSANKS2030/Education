import React, { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  Download, 
  History, 
  Plus, 
  Sparkles, 
  Check, 
  FileText, 
  Layers, 
  Tag, 
  Clock, 
  ArrowLeft,
  Highlighter,
  MessageSquare
} from "lucide-react";
import { Course, CourseAnnotation, Subject, UserRole } from "../types";

interface CoursesModuleProps {
  courses: Course[];
  selectedCourseId: string | null;
  onSelectCourse: (id: string | null) => void;
  onOpenAiTutorWithContext: (course: Course) => void;
  userRole: UserRole;
}

export const CoursesModule: React.FC<CoursesModuleProps> = ({
  courses,
  selectedCourseId,
  onSelectCourse,
  onOpenAiTutorWithContext,
  userRole,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [onlyOffline, setOnlyOffline] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  
  // Reading state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showAnnotationsDrawer, setShowAnnotationsDrawer] = useState(false);
  const [newAnnotationText, setNewAnnotationText] = useState("");
  const [highlightColor, setHighlightColor] = useState("bg-yellow-200");

  const activeCourse = courses.find((c) => c.id === selectedCourseId) || null;

  const subjects: Subject[] = [
    "Mathematiques",
    "Francais",
    "Histoire-Geographie",
    "SVT",
    "Physique-Chimie",
    "Anglais",
    "Technologie"
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === "all" || course.subject === selectedSubject;
    const matchesOffline = !onlyOffline || course.isOfflineAvailable;
    const matchesBookmarked = !onlyBookmarked || course.isBookmarked;

    return matchesSearch && matchesSubject && matchesOffline && matchesBookmarked;
  });

  // Text-to-speech for accessibility
  const handleToggleSpeech = (text: string) => {
    if (!("speechSynthesis" in window)) {
      alert("La synthèse vocale n'est pas prise en charge par votre navigateur.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[$#*]/g, ""));
      utterance.lang = "fr-FR";
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleAddAnnotation = () => {
    if (!newAnnotationText.trim() || !activeCourse) return;
    const newAnn: CourseAnnotation = {
      id: `ann-${Date.now()}`,
      userId: "stu-1",
      selectedText: "Passage sélectionné du cours",
      comment: newAnnotationText.trim(),
      color: highlightColor,
      createdAt: new Date().toLocaleDateString('fr-FR')
    };
    activeCourse.annotations.push(newAnn);
    setNewAnnotationText("");
  };

  const handleExportPDF = (course: Course) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${course.title} - Cartable Numérique</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; }
            h1 { color: #312e81; font-size: 24px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
            .badge { display: inline-block; padding: 4px 8px; background: #e0e7ff; color: #3730a3; border-radius: 4px; font-size: 12px; font-weight: bold; }
            .summary { background: #f8fafc; border-left: 4px solid #6366f1; padding: 12px; margin: 16px 0; font-style: italic; }
            .key-points { background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <span class="badge">${course.subject} • ${course.classLevel}</span>
          <h1>${course.title}</h1>
          <p><strong>Auteur :</strong> ${course.authorName} | <strong>Version :</strong> ${course.currentVersion}</p>
          <div class="summary">${course.summary}</div>
          <div>${course.contentMarkdown.replace(/###/g, "<h3>").replace(/\n/g, "<br>")}</div>
          <div class="key-points">
            <h3>Points clés à retenir :</h3>
            <ul>${course.keyTakeaways.map(k => `<li>${k}</li>`).join('')}</ul>
          </div>
          <script>window.print();</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-6">
      {!activeCourse ? (
        // Course Catalog View
        <>
          {/* Top Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Bibliothèque de Cours & Leçons Multimédias
                </h2>
                <p className="text-xs text-slate-500">
                  Fiches synthétiques, annotations, schémas et écoute audio
                </p>
              </div>

              <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher une notion, un mot-clé..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Subject Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <button
                onClick={() => setSelectedSubject("all")}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedSubject === "all" ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Toutes les matières
              </button>
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedSubject === sub ? "bg-indigo-600 text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {/* Sub-Filters: Offline + Bookmarked */}
            <div className="flex items-center gap-4 text-xs pt-2 border-t border-slate-100 text-slate-600">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyOffline}
                  onChange={(e) => setOnlyOffline(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span>Disponibles hors-ligne uniquement</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyBookmarked}
                  onChange={(e) => setOnlyBookmarked(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded"
                />
                <span>Mes signets & favoris</span>
              </label>
            </div>
          </div>

          {/* Courses Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700">
                      {course.subject}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {course.durationMinutes} min
                      </span>
                      {course.isBookmarked && (
                        <Bookmark size={14} className="text-amber-500 fill-amber-500" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-2 line-clamp-3">
                    {course.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {course.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">
                    Par {course.authorName} • {course.currentVersion}
                  </span>
                  <button
                    onClick={() => onSelectCourse(course.id)}
                    className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Ouvrir le cours →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Course Full Reader View
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Reader Top Bar */}
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
            <button
              onClick={() => onSelectCourse(null)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Retour à la liste des cours</span>
            </button>

            {/* Action tools */}
            <div className="flex items-center gap-2">
              {/* Text-To-Speech Reader */}
              <button
                onClick={() => handleToggleSpeech(activeCourse.contentMarkdown)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isPlayingAudio ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
                title="Lire le cours à haute voix (Synthèse vocale)"
              >
                {isPlayingAudio ? <VolumeX size={14} className="text-amber-700 animate-pulse" /> : <Volume2 size={14} />}
                <span>{isPlayingAudio ? "Arrêter la lecture" : "Écouter le cours"}</span>
              </button>

              {/* Version History Modal Trigger */}
              <button
                onClick={() => setShowVersionHistory(!showVersionHistory)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <History size={14} />
                <span>Versions ({activeCourse.currentVersion})</span>
              </button>

              {/* Annotations Drawer Trigger */}
              <button
                onClick={() => setShowAnnotationsDrawer(!showAnnotationsDrawer)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Highlighter size={14} className="text-amber-500" />
                <span>Annotations ({activeCourse.annotations.length})</span>
              </button>

              {/* PDF & SCORM Export */}
              <button
                onClick={() => handleExportPDF(activeCourse)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5"
                title="Télécharger la fiche imprimable / PDF"
              >
                <Download size={14} />
                <span>Imprimer / PDF</span>
              </button>

              {/* AI Tutor on this course */}
              <button
                onClick={() => onOpenAiTutorWithContext(activeCourse)}
                className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles size={13} className="text-amber-300" />
                <span>Questionner l'IA sur ce cours</span>
              </button>
            </div>
          </div>

          {/* Reader Body */}
          <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
            {/* Header Information */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-100 text-indigo-800 uppercase tracking-wider">
                  {activeCourse.subject}
                </span>
                <span className="text-xs text-slate-400 font-medium">Niveau {activeCourse.classLevel}</span>
                <span className="text-xs text-slate-400">• Durée estimée : {activeCourse.durationMinutes} min</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeCourse.title}
              </h1>
              <p className="text-slate-600 text-sm mt-3 bg-slate-50 p-4 rounded-xl border border-slate-200/80 italic">
                {activeCourse.summary}
              </p>
            </div>

            {/* Course Content */}
            <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4">
              {activeCourse.contentMarkdown.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={index} className="text-base font-bold text-slate-900 pt-4 border-b border-slate-100 pb-1">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("> ")) {
                  return (
                    <blockquote key={index} className="p-3 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg text-amber-950 font-medium text-xs">
                      {paragraph.replace("> ", "")}
                    </blockquote>
                  );
                }
                return (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Key Takeaways Card */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                <Check size={16} className="text-emerald-700" />
                <span>Points Clés du Cours à Mémoriser pour le Brevet / Contrôles</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-900">
                {activeCourse.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Personal Annotations Section inside reader */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Highlighter size={14} className="text-indigo-600" />
                  <span>Mes Notes Personnelles & Signets sur ce cours</span>
                </h4>
                <span className="text-[11px] text-slate-500">{activeCourse.annotations.length} note(s)</span>
              </div>

              {activeCourse.annotations.length > 0 ? (
                <div className="space-y-2">
                  {activeCourse.annotations.map((ann) => (
                    <div key={ann.id} className="p-3 rounded-lg bg-white border border-amber-200 text-xs shadow-2xs">
                      <p className="font-semibold text-slate-800">{ann.comment}</p>
                      <p className="text-[10px] text-slate-400 mt-1">Ajouté le {ann.createdAt} • Référence : "{ann.selectedText}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">Aucune note pour le moment.</p>
              )}

              {/* Add Note Input */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Écrire une note ou un pense-bête..."
                  value={newAnnotationText}
                  onChange={(e) => setNewAnnotationText(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  onClick={handleAddAnnotation}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>

          {/* Version History Modal */}
          {showVersionHistory && (
            <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="font-bold text-slate-900 text-sm">Historique des versions du cours</h3>
                  <button onClick={() => setShowVersionHistory(false)} className="text-slate-400 hover:text-slate-600 text-sm">✕</button>
                </div>
                <div className="space-y-3 text-xs">
                  {activeCourse.versions.map((ver, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>{ver.version}</span>
                        <span className="text-slate-400">{ver.updatedAt}</span>
                      </div>
                      <p className="text-slate-600 mt-1">{ver.changesSummary}</p>
                      <p className="text-[10px] text-indigo-600 font-medium mt-1">Auteur : {ver.author}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
