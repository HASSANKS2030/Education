import React, { useState } from "react";
import { 
  ShieldCheck, 
  Calendar, 
  Award, 
  CheckCircle2, 
  FileSignature, 
  MessageSquare, 
  Clock, 
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { UserProfile, Homework } from "../types";

interface ParentDashboardProps {
  user: UserProfile;
  homework: Homework[];
  onNavigate: (tab: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  user,
  homework,
  onNavigate,
}) => {
  const [liaisonSigned, setLiaisonSigned] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Parent Welcome Header */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-amber-200 mb-2">
              Espace Famille & Coéducation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Bonjour, {user.name}
            </h2>
            <p className="text-amber-100/90 text-sm mt-1">
              Suivi scolaire de votre enfant : <strong>Camille Laurent</strong> (Classe de 3ème B)
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-xl p-3 md:w-64 shrink-0 text-xs">
            <p className="text-amber-200 font-semibold mb-1">Assiduité & Ponctualité</p>
            <p className="text-lg font-bold">100% Présence</p>
            <p className="text-amber-100 text-[11px] mt-0.5">0 absence non justifiée • 0 retard</p>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <p className="text-amber-200">Moyenne trimestrielle</p>
            <p className="text-xl font-bold mt-0.5">17.2 / 20</p>
          </div>
          <div>
            <p className="text-amber-200">Travail personnel</p>
            <p className="text-xl font-bold mt-0.5 text-emerald-300">Régulier & Sérieux</p>
          </div>
          <div>
            <p className="text-amber-200">Devoirs rendus</p>
            <p className="text-xl font-bold mt-0.5">100% dans les délais</p>
          </div>
          <div>
            <p className="text-amber-200">Prochaine réunion parents</p>
            <p className="text-xl font-bold mt-0.5">Jeudi 1er Oct.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Electronic Liaison Book & Grades */}
        <div className="lg:col-span-2 space-y-6">
          {/* Carnet de correspondance électronique */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileSignature size={18} className="text-amber-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Carnet de Correspondance Électronique
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Signature numérique sécurisée</span>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900 uppercase">
                    Information de la Direction & Professeur Principal
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 mt-2">
                    Sortie pédagogique au Musée d'Histoire Contemporaine
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Chers parents, la classe de 3ème B participera à une visite guidée sur la Première Guerre Mondiale le mardi 22 septembre de 09h00 à 16h30. Pique-nique à prévoir. Merci d'émarger ce billet avant vendredi.
                  </p>
                  <p className="text-[10px] text-slate-400 mt-2">M. Alexandre Dumas • 08 sept. 2026</p>
                </div>
              </div>

              <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between">
                <span className="text-xs text-slate-600">
                  Statut : {liaisonSigned ? <strong className="text-emerald-700">Signé numériquement le 09/09/2026 à 09:12</strong> : <span className="text-amber-800 font-bold">En attente de visa parental</span>}
                </span>

                {!liaisonSigned ? (
                  <button
                    onClick={() => setLiaisonSigned(true)}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <FileSignature size={14} />
                    <span>Viser et Signer le carnet</span>
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded-full">
                    <CheckCircle2 size={14} />
                    Visa validé ✓
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Devoirs & Cahier de textes suivi par le parent */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock size={16} className="text-indigo-600" />
              <span>Suivi des Devoirs de Camille</span>
            </h3>

            <div className="space-y-2.5">
              {homework.map((hw) => (
                <div key={hw.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-indigo-700">{hw.subject}</span>
                    <p className="font-bold text-slate-900">{hw.title}</p>
                    <p className="text-slate-400 text-[11px]">Échéance : {hw.dueDate}</p>
                  </div>
                  <div>
                    {hw.isSubmittedByCurrentStudent ? (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        Rendu ({hw.currentStudentSubmission?.score}/20)
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                        À faire avant le {hw.dueDate}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Official Report Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Bulletin Scolaire Officiel</h3>
            <p className="text-xs text-slate-500 mb-4">
              Consultez le relevé trimestriel officiel avec les appréciations de l'équipe pédagogique et le socle de compétences.
            </p>
            <button
              onClick={() => onNavigate("analytics")}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <Award size={15} />
              <span>Accéder au Bulletin Officiel</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Messagerie Éducative</h3>
            <p className="text-xs text-slate-500 mb-4">
              Un doute ou une question ? Échangez directement avec le professeur principal ou l'administration.
            </p>
            <button
              onClick={() => onNavigate("collaboration")}
              className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={15} />
              <span>Écrire à l'équipe pédagogique</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
