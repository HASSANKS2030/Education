import React, { useState } from "react";
import { 
  Server, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Database, 
  GitBranch, 
  CheckCircle2, 
  Download, 
  FileText,
  Lock,
  Globe
} from "lucide-react";

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<"stack" | "apis" | "sync" | "rgpd" | "cicd">("stack");

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200 flex flex-col h-[750px] max-h-[92vh] animate-in zoom-in-95">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300">
              <Server size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm">Dossier d'Architecture Technique & Stratégie Produit</h3>
              <p className="text-[11px] text-slate-300">
                Spécifications industrielles prêtes pour la production • Normes Éducation Nationale (GAR, EduConnect, RGPD)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("stack")}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === "stack" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Layers size={13} />
            <span>1. Stack & PWA Multiplateforme</span>
          </button>

          <button
            onClick={() => setActiveTab("apis")}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === "apis" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Cpu size={13} />
            <span>2. Spécifications REST / LTI 1.3</span>
          </button>

          <button
            onClick={() => setActiveTab("sync")}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === "sync" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Database size={13} />
            <span>3. Synchronisation & Hors-ligne</span>
          </button>

          <button
            onClick={() => setActiveTab("rgpd")}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === "rgpd" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <ShieldCheck size={13} />
            <span>4. RGPD, Données Mineurs & GAR</span>
          </button>

          <button
            onClick={() => setActiveTab("cicd")}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeTab === "cicd" ? "bg-indigo-600 text-white shadow-2xs" : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <GitBranch size={13} />
            <span>5. Scalabilité & Roadmap CI/CD</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed">
          {activeTab === "stack" && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">1. Choix Technologiques & PWA Multiplateforme</h4>
              <p>
                L'application est conçue pour fonctionner de manière fluide sur un parc hétérogène (tablettes iPad/Android d'établissement, ordinateurs portables régionaux, smartphones élèves et parents) :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <p className="font-bold text-slate-900">Frontend : React 19 + TypeScript + Tailwind CSS</p>
                  <p className="text-slate-500">
                    Composants modulaires, zéro latence, rendu optimisé, respect strict des contrastes WCAG AAA pour élèves à besoins éducatifs particuliers (dyslexie, malvoyance).
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <p className="font-bold text-slate-900">PWA & Service Worker (Cache First / Stale-While-Revalidate)</p>
                  <p className="text-slate-500">
                    Mise en cache automatique des cours, fiches mémo et exercices. Permet une utilisation en classe même en cas de coupure du Wi-Fi scolaire.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <p className="font-bold text-slate-900">Stockage Local : IndexedDB via Dexie.js</p>
                  <p className="text-slate-500">
                    File d'attente locale (Outbox Pattern) pour les réponses aux devoirs et les flashcards révisées avant synchronisation serveur.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <p className="font-bold text-slate-900">Backend : Node.js / Express avec proxy d'IA sécurisé</p>
                  <p className="text-slate-500">
                    Aucune clé d'API exposée au navigateur. Modèle Gemini 3.8 Flash pour les fonctions de tuteur socratique et d'autocorrection formative.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "apis" && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">2. Architecture API & Interopérabilité Scolaire</h4>
              <p>
                Pour s'insérer sans friction dans l'écosystème de l'Éducation Nationale (Pronote, ÉcoleDirecte, ENT régionaux, Moodle) :
              </p>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200">
                  <span className="text-emerald-400 font-bold">GET</span> /api/v1/courses?subject=Maths&class=3eme
                  <p className="text-slate-400 font-sans text-xs mt-1">Fournit la liste des cours avec métadonnées SCORM et dates de révision.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200">
                  <span className="text-blue-400 font-bold">POST</span> /api/v1/homework/:id/submit
                  <p className="text-slate-400 font-sans text-xs mt-1">Dépôt du devoir chiffré avec signature d'intégrité et scan anti-plagiat.</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200">
                  <span className="text-amber-400 font-bold">POST</span> /api/v1/leitner/review-log
                  <p className="text-slate-400 font-sans text-xs mt-1">Enregistre la répétition espacée, calcule le prochain intervalle (SM-2).</p>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 text-slate-200">
                  <span className="text-purple-400 font-bold">LTI 1.3 / OneRoster v1.2</span> Endpoint SSO & Sync
                  <p className="text-slate-400 font-sans text-xs mt-1">Échange sécurisé des résultats d'évaluation vers les livrets scolaires officiels (LSU).</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sync" && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">3. Protocole Hors-Ligne & Résolution de Conflits</h4>
              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200 space-y-2">
                <p className="font-bold text-indigo-950">Stratégie Outbox & CRDT (Conflict-Free Replicated Data Types)</p>
                <p className="text-slate-700">
                  Lorsqu'un élève révise dans les transports ou en zone blanche :
                </p>
                <ul className="list-disc pl-4 space-y-1 text-slate-700">
                  <li>Les événements d'apprentissage (flashcards tournées, brouillon de devoir) sont enregistrés dans l'IndexedDB locale avec horodatage UTC signé (LWW - Last-Write-Wins).</li>
                  <li>Dès que l'API <code>navigator.onLine</code> détecte le rétablissement de la connexion, le Service Worker déclenche l'événement <code>sync</code> en arrière-plan.</li>
                  <li>Le serveur consolide les scores sans écraser les retours éventuels de l'enseignant.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "rgpd" && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">4. Conformité RGPD, Protection des Mineurs & Normes GAR</h4>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <p className="font-bold text-slate-900">Protection des données des mineurs de moins de 15 ans (Art. 8 RGPD)</p>
                  <p className="text-slate-600">
                    Consentement parental explicite recueilli numériquement dans l'Espace Parent. Aucune donnée n'est exploitée à des fins commerciales ni partagée avec des tiers publicitaires.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <p className="font-bold text-slate-900">Droit à l'oubli et purge automatique</p>
                  <p className="text-slate-600">
                    Les copies d'élèves et historiques de messagerie sont automatiquement purgés 1 an après l'obtention du diplôme ou le changement d'établissement.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                  <p className="font-bold text-slate-900">Authentification sécurisée EduConnect & SAML 2.0</p>
                  <p className="text-slate-600">
                    Intégration native avec le Gestionnaire d'Accès aux Ressources (GAR) du Ministère de l'Éducation Nationale.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cicd" && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900">5. Scalabilité, Surveillance & Pipeline CI/CD</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p><strong>Conteneurisation Docker & Orchestration Kubernetes :</strong> Auto-scaling horizontal (HPA) capable d'absorber les pics de 08h00 et 17h00 (début et fin de classe).</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p><strong>Tests Automatisés :</strong> Validation e2e Playwright sur scénarios révision/devoir et audit d'accessibilité RGAA/Axe automatisé sur chaque commit.</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                  <p><strong>Observabilité :</strong> Métriques Prometheus & Grafana avec traçage OpenTelemetry sur les requêtes d'autocorrection et de synchronisation.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Cartable Numérique v2.4.0 • Dossier de Conception Produit</span>
          <button
            onClick={() => alert("Spécifications exportées en format PDF / OpenAPI JSON.")}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors"
          >
            <Download size={13} />
            <span>Télécharger le dossier technique complet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
