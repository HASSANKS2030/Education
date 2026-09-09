/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  mockUsers, 
  mockCourses, 
  mockHomework, 
  mockFlashcards, 
  mockQuizzes, 
  mockCompetencies, 
  mockTeacherAlerts 
} from "./data/mockData";
import { 
  UserRole, 
  UserProfile, 
  Course, 
  Homework, 
  Flashcard, 
  Quiz, 
  CompetencyDomain, 
  TeacherAlert,
  AccessibilitySettings
} from "./types";
import { Navbar } from "./components/Navbar";
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { CoursesModule } from "./components/CoursesModule";
import { RevisionModule } from "./components/RevisionModule";
import { HomeworkModule } from "./components/HomeworkModule";
import { ExercisesModule } from "./components/ExercisesModule";
import { AnalyticsModule } from "./components/AnalyticsModule";
import { CommunicationModule } from "./components/CommunicationModule";
import { AiTutorModal } from "./components/AiTutorModal";
import { ArchitectureModal } from "./components/ArchitectureModal";

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [currentRole, setCurrentRole] = useState<UserRole>("eleve");
  
  // Data State
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [homework, setHomework] = useState<Homework[]>(mockHomework);
  const [flashcards, setFlashcards] = useState<Flashcard[]>(mockFlashcards);
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [competencies, setCompetencies] = useState<CompetencyDomain[]>(mockCompetencies);
  const [teacherAlerts, setTeacherAlerts] = useState<TeacherAlert[]>(mockTeacherAlerts);

  // Selected Course for reader view
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Network & Sync State
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Accessibility State
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    dyslexiaFont: false,
    highContrast: false,
    fontSize: "normal",
    screenReaderOptimized: false,
  });

  // Modal States
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);
  const [aiTutorContextCourse, setAiTutorContextCourse] = useState<Course | null>(null);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState<boolean>(false);

  const currentUser: UserProfile = mockUsers[currentRole];

  // Sync simulation when reconnecting
  const handleToggleOffline = () => {
    if (isOffline) {
      setIsOffline(false);
      setIsSyncing(true);
      setTimeout(() => setIsSyncing(false), 1200);
    } else {
      setIsOffline(true);
    }
  };

  const handleUpdateFlashcard = (updated: Flashcard) => {
    setFlashcards((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const handleAddFlashcard = (card: Flashcard) => {
    setFlashcards((prev) => [card, ...prev]);
  };

  const handleUpdateHomework = (updated: Homework) => {
    setHomework((prev) => prev.map((h) => (h.id === updated.id ? updated : h)));
  };

  const handleAddHomework = (hw: Homework) => {
    setHomework((prev) => [hw, ...prev]);
  };

  const handleOpenAiTutorWithContext = (course: Course) => {
    setAiTutorContextCourse(course);
    setIsAiTutorOpen(true);
  };

  const handleOpenAiTutorGeneral = () => {
    setAiTutorContextCourse(null);
    setIsAiTutorOpen(true);
  };

  const handleOpenCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setActiveTab("courses");
  };

  return (
    <div className={`min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white ${
      accessibility.highContrast ? "contrast-125 saturate-150" : ""
    } ${
      accessibility.dyslexiaFont ? "font-serif tracking-wide" : ""
    } ${
      accessibility.fontSize === "large" ? "text-lg" : accessibility.fontSize === "xl" ? "text-xl" : "text-sm"
    }`}>
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab !== "courses") setSelectedCourseId(null);
          setActiveTab(tab);
        }}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        isSyncing={isSyncing}
        accessibility={accessibility}
        onUpdateAccessibility={setAccessibility}
        user={currentUser}
        onOpenAiTutor={handleOpenAiTutorGeneral}
        onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Offline Banner alert if active */}
        {isOffline && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between animate-in fade-in">
            <span className="font-semibold">
              Mode Hors-Ligne Activé : Les cours en cache restent consultables. Les révisions et devoirs seront synchronisés automatiquement à la reconnexion.
            </span>
            <button
              onClick={handleToggleOffline}
              className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-bold text-[11px]"
            >
              Reconnexion
            </button>
          </div>
        )}

        {/* Dynamic Route/Tab Display */}
        {activeTab === "dashboard" && (
          <>
            {currentRole === "eleve" && (
              <StudentDashboard
                user={currentUser}
                courses={courses}
                homework={homework}
                flashcards={flashcards}
                onNavigate={setActiveTab}
                onOpenCourse={handleOpenCourse}
                onOpenAiTutor={handleOpenAiTutorGeneral}
              />
            )}
            {currentRole === "enseignant" && (
              <TeacherDashboard
                user={currentUser}
                courses={courses}
                homework={homework}
                alerts={teacherAlerts}
                onNavigate={setActiveTab}
                onOpenCreateHomework={() => setActiveTab("homework")}
                onOpenCreateCourse={() => {
                  setSelectedCourseId(null);
                  setActiveTab("courses");
                }}
              />
            )}
            {currentRole === "parent" && (
              <ParentDashboard
                user={currentUser}
                homework={homework}
                onNavigate={setActiveTab}
              />
            )}
            {currentRole === "admin" && (
              <AdminDashboard
                user={currentUser}
                onOpenArchitecture={() => setIsArchitectureModalOpen(true)}
              />
            )}
          </>
        )}

        {activeTab === "courses" && (
          <CoursesModule
            courses={courses}
            selectedCourseId={selectedCourseId}
            onSelectCourse={setSelectedCourseId}
            onOpenAiTutorWithContext={handleOpenAiTutorWithContext}
            userRole={currentRole}
          />
        )}

        {activeTab === "revision" && (
          <RevisionModule
            flashcards={flashcards}
            onUpdateFlashcard={handleUpdateFlashcard}
            onAddFlashcard={handleAddFlashcard}
            onOpenAiTutor={handleOpenAiTutorGeneral}
          />
        )}

        {activeTab === "homework" && (
          <HomeworkModule
            homeworkList={homework}
            userRole={currentRole}
            currentUserId={currentUser.id}
            currentUserName={currentUser.name}
            onUpdateHomework={handleUpdateHomework}
            onAddHomework={handleAddHomework}
          />
        )}

        {activeTab === "exercises" && (
          <ExercisesModule
            quizzes={quizzes}
            onOpenAiTutor={handleOpenAiTutorGeneral}
          />
        )}

        {activeTab === "analytics" && (
          <AnalyticsModule
            competencies={competencies}
            user={mockUsers.eleve}
          />
        )}

        {activeTab === "collaboration" && (
          <CommunicationModule
            user={currentUser}
            userRole={currentRole}
          />
        )}
      </main>

      {/* Persistent AI Socratic Tutor Modal */}
      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        contextCourse={aiTutorContextCourse}
      />

      {/* Architecture and Engineering Strategy Modal */}
      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />
    </div>
  );
}

