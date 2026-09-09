import React, { useState } from "react";
import { 
  Award, 
  TrendingUp, 
  Calendar, 
  Printer, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  BarChart3, 
  Clock, 
  Sparkles,
  School
} from "lucide-react";
import { CompetencyDomain, UserProfile } from "../types";

interface AnalyticsModuleProps {
  competencies: CompetencyDomain[];
  user: UserProfile;
}

export const AnalyticsModule: React.FC<AnalyticsModuleProps> = ({
  competencies,
  user,
}) => {
  const [activeTab, setActiveTab] = useState<"competencies" | "heatmap" | "bulletin">("competencies");

  // Generate simulated 12-week activity heatmap
  const weeks = 12;
  const daysPerWeek = 7;
  const heatmapData = Array.from({ length: weeks * daysPerWeek }, (_, i) => {
    // Generate realistic learning intensity: 0 to 4
    const rand = Math.random();
    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (rand > 0.8) level = 4;
    else if (rand > 0.55) level = 3;
    else if (rand > 0.35) level = 2;
    else if (rand > 0.15) level = 1;
    return { dayIndex: i, level };
  });

  const levelLabels = {
    1: { label: "Maîtrise insuffisante", color: "bg-rose-100 text-rose-800 border-rose-200" },
    2: { label: "Maîtrise fragile", color: "bg-amber-100 text-amber-800 border-amber-200" },
    3: { label: "Maîtrise satisfaisante", color: "bg-blue-100 text-blue-800 border-blue-200" },
    4: { label: "Très bonne maîtrise", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  };

  const handlePrintBulletin = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold mb-2">
            <Award size={13} className="text-amber-400" />
            <span>Socle Commun de Connaissances, de Compétences et de Culture</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Suivi des Compétences & Cartographie des Progrès
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Évaluation continue basée sur les 5 grands domaines du socle officiel de l'Éducation Nationale (Cycles 3 & 4) et synthèse du carnet de compétences.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-white/10 p-1 rounded-xl border border-white/15 text-xs">
          <button
            onClick={() => setActiveTab("competencies")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "competencies" ? "bg-white text-indigo-950 shadow-xs" : "text-indigo-100 hover:text-white"
            }`}
          >
            Matrice du Socle
          </button>
          <button
            onClick={() => setActiveTab("heatmap")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "heatmap" ? "bg-white text-indigo-950 shadow-xs" : "text-indigo-100 hover:text-white"
            }`}
          >
            Carte Thermique (Heatmap)
          </button>
          <button
            onClick={() => setActiveTab("bulletin")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "bulletin" ? "bg-white text-indigo-950 shadow-xs" : "text-indigo-100 hover:text-white"
            }`}
          >
            Bulletin Officiel
          </button>
        </div>
      </div>

      {activeTab === "competencies" && (
        <div className="space-y-6">
          {/* Competency Level Distribution Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">Très bonne maîtrise (Niv 4)</p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {competencies.filter(c => c.masteryLevel === 4).length} domaines
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">Maîtrise satisfaisante (Niv 3)</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {competencies.filter(c => c.masteryLevel === 3).length} domaines
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">Maîtrise fragile (Niv 2)</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">
                {competencies.filter(c => c.masteryLevel === 2).length} domaines
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-medium">Total Évaluations formatives</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {competencies.reduce((a, b) => a + b.evaluatedCount, 0)} items
              </p>
            </div>
          </div>

          {/* Detailed Competencies List */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Grille Officielle des Domaines de Compétences
            </h3>

            <div className="space-y-3">
              {competencies.map((comp) => {
                const levelInfo = levelLabels[comp.masteryLevel];
                return (
                  <div key={comp.id} className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                          {comp.code} • {comp.domainGroup}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 mt-0.5">
                          {comp.name}
                        </h4>
                      </div>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto ${levelInfo.color}`}>
                        {levelInfo.label}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            comp.masteryLevel === 4 ? "bg-emerald-500" : comp.masteryLevel === 3 ? "bg-blue-500" : "bg-amber-500"
                          }`}
                          style={{ width: `${(comp.masteryLevel / 4) * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 shrink-0">
                        {comp.evaluatedCount} évaluations • Dernière le {comp.lastEvaluated}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "heatmap" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Carte Thermique de l'Activité d'Apprentissage (90 derniers jours)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualisation de la régularité du travail personnel, des sessions de révision espacée et des devoirs déposés.
            </p>
          </div>

          {/* Activity Heatmap Grid */}
          <div className="overflow-x-auto p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5">
              {heatmapData.map((item, idx) => {
                const colorClasses = [
                  "bg-slate-200", // level 0
                  "bg-emerald-200", // level 1
                  "bg-emerald-400", // level 2
                  "bg-emerald-600", // level 3
                  "bg-emerald-800", // level 4
                ];
                return (
                  <div
                    key={idx}
                    className={`w-3.5 h-3.5 rounded-xs ${colorClasses[item.level]} hover:ring-2 hover:ring-indigo-500 transition-all cursor-pointer`}
                    title={`Jour ${idx + 1} : Niveau d'activité ${item.level}/4`}
                  />
                );
              })}
            </div>

            {/* Heatmap Legend */}
            <div className="flex items-center justify-end gap-2 text-[10px] text-slate-500 mt-4">
              <span>Moins actif</span>
              <div className="flex gap-1">
                <span className="w-3 h-3 rounded-xs bg-slate-200" />
                <span className="w-3 h-3 rounded-xs bg-emerald-200" />
                <span className="w-3 h-3 rounded-xs bg-emerald-400" />
                <span className="w-3 h-3 rounded-xs bg-emerald-600" />
                <span className="w-3 h-3 rounded-xs bg-emerald-800" />
              </div>
              <span>Très actif</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "bulletin" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-md max-w-4xl mx-auto space-y-6 print:shadow-none print:border-none print:p-0">
          {/* Official Bulletin Header */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold">
                <School size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-tight">
                  Collège Victor Hugo • Éducation Nationale
                </h3>
                <p className="text-xs text-slate-500">
                  Bulletin Périodique Trimestre 1 • Année Scolaire 2026-2027
                </p>
              </div>
            </div>

            <button
              onClick={handlePrintBulletin}
              className="print:hidden px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer size={14} />
              <span>Imprimer le Bulletin</span>
            </button>
          </div>

          {/* Student details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl text-xs">
            <div>
              <p className="text-slate-400 font-medium">Nom & Prénom</p>
              <p className="font-bold text-slate-900 mt-0.5">{user.name}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Classe</p>
              <p className="font-bold text-slate-900 mt-0.5">{user.schoolClass}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Professeur Principal</p>
              <p className="font-bold text-slate-900 mt-0.5">M. Alexandre Dumas</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Moyenne Générale</p>
              <p className="font-extrabold text-emerald-700 text-sm mt-0.5">17.2 / 20</p>
            </div>
          </div>

          {/* Subjects and grades table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Matière</th>
                  <th className="p-3">Moyenne Élève</th>
                  <th className="p-3">Moyenne Classe</th>
                  <th className="p-3">Appréciations de l'équipe pédagogique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Mathématiques</td>
                  <td className="p-3 font-bold text-indigo-700">18.5 / 20</td>
                  <td className="p-3 text-slate-500">13.2</td>
                  <td className="p-3 text-slate-600">Excellente rigueur dans les démonstrations. Participation très constructive.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Français</td>
                  <td className="p-3 font-bold text-indigo-700">17.0 / 20</td>
                  <td className="p-3 text-slate-500">12.8</td>
                  <td className="p-3 text-slate-600">Expression écrite soignée, très bonne maîtrise des figures de style et des nuances.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">SVT</td>
                  <td className="p-3 font-bold text-indigo-700">16.5 / 20</td>
                  <td className="p-3 text-slate-500">14.1</td>
                  <td className="p-3 text-slate-600">Démarche scientifique rigoureuse. Les schémas bilans sont particulièrement clairs.</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">Histoire-Géographie</td>
                  <td className="p-3 font-bold text-indigo-700">17.0 / 20</td>
                  <td className="p-3 text-slate-500">13.5</td>
                  <td className="p-3 text-slate-600">Très bonne analyse des documents d'archives et esprit critique affûté.</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Council appreciation */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1 text-xs">
            <h4 className="font-bold text-emerald-950 uppercase tracking-wide">
              Avis du Conseil de Classe : FÉLICITATIONS
            </h4>
            <p className="text-emerald-900">
              Un trimestre exemplaire tant par les résultats obtenus que par l'engagement dans les révisions et la bienveillance au sein de la classe. Poursuivez dans cette voie !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
