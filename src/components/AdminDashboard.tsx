import React, { useState } from "react";
import { 
  School, 
  ShieldAlert, 
  Server, 
  Users, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  Lock, 
  Database,
  FileCheck
} from "lucide-react";
import { UserProfile } from "../types";

interface AdminDashboardProps {
  user: UserProfile;
  onOpenArchitecture: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onOpenArchitecture,
}) => {
  const [syncStatus, setSyncStatus] = useState<string>("Synchronisé il y a 3 minutes");
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [showPurgeSuccess, setShowPurgeSuccess] = useState<boolean>(false);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus("Synchronisé à l'instant via GAR/EduConnect");
    }, 900);
  };

  const handleSimulatePurge = () => {
    setShowPurgeSuccess(true);
    setTimeout(() => setShowPurgeSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-indigo-200 mb-2">
              Console d'Administration & DSI Établissement
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Collège Victor Hugo
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Supervision de la flotte numérique, gestion des accès et conformité RGPD
            </p>
          </div>

          <button
            onClick={onOpenArchitecture}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 self-start md:self-auto"
          >
            <Server size={15} />
            <span>Spécifications & Architecture API</span>
          </button>
        </div>

        {/* Global School Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-xs">
          <div>
            <p className="text-slate-400">Comptes Élèves actifs</p>
            <p className="text-xl font-bold mt-0.5">482 élèves</p>
          </div>
          <div>
            <p className="text-slate-400">Comptes Enseignants</p>
            <p className="text-xl font-bold mt-0.5">38 professeurs</p>
          </div>
          <div>
            <p className="text-slate-400">Disponibilité Système</p>
            <p className="text-xl font-bold mt-0.5 text-emerald-400">99.98% Uptime</p>
          </div>
          <div>
            <p className="text-slate-400">Synchro GAR / EduConnect</p>
            <p className="text-xl font-bold mt-0.5 text-indigo-300">Actif (LTI 1.3)</p>
          </div>
        </div>
      </div>

      {showPurgeSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} />
          <span>Audit RGPD exécuté avec succès : aucun compte inactif non anonymisé détecté. Registre des traitements mis à jour.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LMS Interoperability & SSO Connectors */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server size={18} className="text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Interopérabilité & Connecteurs Éducatifs
              </h3>
            </div>
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md flex items-center gap-1"
            >
              <RefreshCw size={12} className={isSyncing ? "animate-spin" : ""} />
              <span>Synchroniser</span>
            </button>
          </div>

          <p className="text-xs text-slate-500">{syncStatus}</p>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">EduConnect & FranceConnect (SSO)</p>
                <p className="text-slate-500 text-[11px]">Authentification unique inter-degrés SAML 2.0 / OIDC</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                Connecté ✓
              </span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">GAR (Gestionnaire d'Accès aux Ressources)</p>
                <p className="text-slate-500 text-[11px]">Attribution automatique des manuels et cours numériques</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                Certifié MENJ ✓
              </span>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Norme LTI 1.3 & OneRoster v1.2</p>
                <p className="text-slate-500 text-[11px]">Échanges de devoirs, notes et compétences avec Pronote / Moodle</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                Actif ✓
              </span>
            </div>
          </div>
        </div>

        {/* Security & GDPR / RGPD Compliance Panel */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Conformité RGPD, Sécurité & Données Mineurs
            </h3>
          </div>

          <p className="text-xs text-slate-500">
            Garanties légales CNIL et protection des données personnelles scolaires (Art. 8 RGPD - consentement mineurs &lt; 15 ans).
          </p>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Durée de conservation des données (Délégation DPO)</span>
                <span className="text-indigo-600">1 an post-scolarité</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Suppression automatique et purge sécurisée des devoirs et historiques à chaque rentrée scolaire.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Chiffrement des données</span>
                <span className="text-emerald-600">AES-256 (At-rest) & TLS 1.3</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Hébergement certifié SecNumCloud et ISO 27001 au sein de l'Union Européenne.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleSimulatePurge}
                className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors"
              >
                Lancer l'audit de conformité RGPD
              </button>
              <button
                onClick={() => alert("Journal des accès et événements d'audit téléchargé (JSON signé).")}
                className="px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-semibold text-xs flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Exporter le registre CNIL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
