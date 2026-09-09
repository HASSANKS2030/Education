import React, { useState } from "react";
import { 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  UserCheck, 
  Shield, 
  Wifi, 
  WifiOff, 
  Eye, 
  Type, 
  Volume2, 
  FileCode2, 
  Bell, 
  Check, 
  Sun, 
  Moon,
  Baby,
  School
} from "lucide-react";
import { UserRole, AgeGroup, AccessibilitySettings } from "../types";

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  ageGroup: AgeGroup;
  onAgeGroupChange: (age: AgeGroup) => void;
  accessibility: AccessibilitySettings;
  onAccessibilityChange: (newSettings: AccessibilitySettings) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  onOpenAiTutor: () => void;
  onOpenArchitecture: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  unreadNotificationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  ageGroup,
  onAgeGroupChange,
  accessibility,
  onAccessibilityChange,
  isOffline,
  onToggleOffline,
  onOpenAiTutor,
  onOpenArchitecture,
  activeTab,
  onTabChange,
  unreadNotificationsCount,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showAccessMenu, setShowAccessMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string; desc: string }> = {
    eleve: { label: "Élève (Camille)", icon: GraduationCap, color: "bg-indigo-600 text-white", desc: "3ème B - Accès cours, devoirs et révisions" },
    enseignant: { label: "Enseignant (M. Dumas)", icon: UserCheck, color: "bg-emerald-600 text-white", desc: "Professeur principal - Création & correction" },
    parent: { label: "Parent (Mme Laurent)", icon: Shield, color: "bg-amber-600 text-white", desc: "Suivi des notes, devoirs et signatures" },
    admin: { label: "Direction & Admin", icon: School, color: "bg-purple-600 text-white", desc: "Supervision, LMS, RGPD & sécurité" },
  };

  const navTabs = [
    { id: "dashboard", label: "Tableau de bord" },
    { id: "courses", label: "Mes Cours & Leçons" },
    { id: "revision", label: "Révision Espacée (Leitner)" },
    { id: "homework", label: "Cahier de Textes & Devoirs" },
    { id: "exercises", label: "Quiz & Évaluations" },
    { id: "analytics", label: "Compétences & Bulletin" },
    { id: "collaboration", label: "Classe Virtuelle & Échanges" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      {/* Top Utility Bar */}
      <div className="border-b border-slate-100 bg-slate-50/80 px-4 py-1.5 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ENT Collège Numérique • Académie de Versailles
          </span>

          {/* Offline indicator */}
          <button 
            onClick={onToggleOffline}
            className={`px-2 py-0.5 rounded-full flex items-center gap-1 font-medium transition-colors ${
              isOffline 
                ? "bg-amber-100 text-amber-800 border border-amber-300" 
                : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
            }`}
            title="Cliquer pour simuler le mode hors-ligne PWA"
          >
            {isOffline ? <WifiOff size={12} /> : <Wifi size={12} />}
            {isOffline ? "Mode Hors-ligne Actif (Synchro locale)" : "En ligne (Synchro continue)"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          {/* Age Group Switcher */}
          <div className="flex items-center bg-slate-200/70 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => onAgeGroupChange("college_lycee")}
              className={`px-2 py-0.5 rounded-md font-medium transition-all ${
                ageGroup === "college_lycee" ? "bg-white text-indigo-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Collège / Lycée
            </button>
            <button
              onClick={() => onAgeGroupChange("primaire")}
              className={`px-2 py-0.5 rounded-md font-medium transition-all flex items-center gap-1 ${
                ageGroup === "primaire" ? "bg-amber-400 text-amber-950 shadow-xs font-semibold" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Baby size={12} />
              Primaire
            </button>
          </div>

          {/* Accessibility Controls Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAccessMenu(!showAccessMenu)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 font-medium text-slate-700"
              aria-label="Options d'accessibilité"
            >
              <Eye size={13} className="text-indigo-600" />
              <span>Accessibilité WCAG</span>
            </button>

            {showAccessMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="font-semibold text-slate-900 text-xs border-b pb-2 mb-2 flex justify-between items-center">
                  <span>Confort de lecture & Accessibilité</span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">RGAA / WCAG AAA</span>
                </div>
                
                {/* Dyslexia font toggle */}
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800 text-xs">Police adaptée Dyslexie</p>
                    <p className="text-[11px] text-slate-500">Espacement renforcé (OpenDys)</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={accessibility.dyslexicFont}
                    onChange={(e) => onAccessibilityChange({ ...accessibility, dyslexicFont: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>

                {/* High Contrast */}
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <div>
                    <p className="font-medium text-slate-800 text-xs">Contraste Élevé</p>
                    <p className="text-[11px] text-slate-500">Renforce la lisibilité des textes</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={accessibility.highContrast}
                    onChange={(e) => onAccessibilityChange({ ...accessibility, highContrast: e.target.checked })}
                    className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                  />
                </div>

                {/* Font Size */}
                <div className="py-2">
                  <p className="font-medium text-slate-800 text-xs mb-1">Taille du texte</p>
                  <div className="grid grid-cols-3 gap-1">
                    {(["normal", "large", "xlarge"] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => onAccessibilityChange({ ...accessibility, fontSize: size })}
                        className={`py-1 rounded text-xs text-center border font-medium ${
                          accessibility.fontSize === size 
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-semibold" 
                            : "border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {size === "normal" ? "A Standard" : size === "large" ? "A+ Grand" : "A++ Très grand"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Architecture & Specs Button */}
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-white hover:bg-slate-800 font-medium text-xs transition-colors"
          >
            <FileCode2 size={13} className="text-indigo-400" />
            <span>Spécifications & Architecture</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange("dashboard")}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <BookOpen size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                Cartable Numérique
              </h1>
              <span className="text-[10px] uppercase tracking-wider font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                Édition 2026
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Apprentissage personnalisé, devoirs & révision adaptative
            </p>
          </div>
        </div>

        {/* Right Actions: AI Tutor Button + Role Switcher */}
        <div className="flex items-center gap-3">
          {/* AI Pedagogical Tutor Quick Launcher */}
          <button
            onClick={onOpenAiTutor}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all hover:scale-[1.02]"
            id="btn-open-ai-tutor"
          >
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
            <span>Mon Tuteur Pédagogique IA</span>
          </button>

          {/* Notifications button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2 font-semibold text-slate-900">
                  <span>Notifications scolaires</span>
                  <span className="text-emerald-600 font-normal">Tout marquer comme lu</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2 rounded-lg bg-indigo-50/70 border border-indigo-100 text-slate-700">
                    <p className="font-medium text-indigo-950">Nouveau devoir de Mathématiques</p>
                    <p className="text-slate-600 text-[11px]">Exercice sur Pythagore à rendre avant le 11 sept.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-slate-700">
                    <p className="font-medium text-amber-950">Rappel Révision Espacée</p>
                    <p className="text-slate-600 text-[11px]">4 flashcards prêtes pour votre séance du jour.</p>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700">
                    <p className="font-medium text-slate-900">Note saisie en Français</p>
                    <p className="text-slate-600 text-[11px]">Commentaire de texte : 17/20 (Très bien).</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-2xs transition-all"
              id="role-selector-button"
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${roleLabels[currentRole].color}`}>
                {React.createElement(roleLabels[currentRole].icon, { size: 16 })}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Rôle actif</p>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {roleLabels[currentRole].label.split(" (")[0]}
                </p>
              </div>
              <span className="text-xs text-slate-400 px-1">▾</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in">
                <p className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Changer d'espace & de rôle :
                </p>
                <div className="space-y-1">
                  {(Object.keys(roleLabels) as UserRole[]).map((role) => {
                    const item = roleLabels[role];
                    const isSelected = currentRole === role;
                    return (
                      <button
                        key={role}
                        onClick={() => {
                          onRoleChange(role);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-lg flex items-center gap-3 transition-colors ${
                          isSelected ? "bg-indigo-50/80 border border-indigo-200" : "hover:bg-slate-50"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                          {React.createElement(item.icon, { size: 16 })}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-900 text-xs">{item.label}</span>
                            {isSelected && <Check size={14} className="text-indigo-600 font-bold" />}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight">{item.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <nav className="border-t border-slate-200/80 bg-slate-50/50 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-white text-indigo-700 shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
