export type UserRole = "eleve" | "enseignant" | "parent" | "admin";

export type AgeGroup = "college_lycee" | "primaire";

export type Subject = 
  | "Mathematiques"
  | "Francais"
  | "Histoire-Geographie"
  | "SVT"
  | "Physique-Chimie"
  | "Anglais"
  | "Technologie";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  schoolClass: string;
  schoolName: string;
}

export interface CourseAnnotation {
  id: string;
  userId: string;
  selectedText: string;
  comment: string;
  color: string;
  createdAt: string;
}

export interface CourseVersion {
  version: string;
  updatedAt: string;
  author: string;
  changesSummary: string;
}

export interface Course {
  id: string;
  title: string;
  subject: Subject;
  classLevel: string;
  durationMinutes: number;
  authorName: string;
  tags: string[];
  summary: string;
  contentMarkdown: string;
  multimedia: {
    audioUrl?: string;
    audioDuration?: string;
    videoPlaceholder?: string;
    diagramsCount?: number;
  };
  keyTakeaways: string[];
  isBookmarked?: boolean;
  isOfflineAvailable?: boolean;
  lastUpdated: string;
  currentVersion: string;
  versions: CourseVersion[];
  annotations: CourseAnnotation[];
}

export interface Flashcard {
  id: string;
  courseId: string;
  subject: Subject;
  question: string;
  answer: string;
  mnemonicTip?: string;
  box: 1 | 2 | 3 | 4 | 5; // Leitner box
  nextReviewDate: string;
  lastScore?: "again" | "hard" | "good" | "easy";
  totalReviews: number;
}

export interface RubricCriterion {
  id: string;
  criterion: string;
  weight: number; // e.g. 5 points
  description: string;
  studentScore?: number;
  teacherComment?: string;
}

export interface HomeworkSubmission {
  id: string;
  homeworkId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  textAnswer: string;
  attachedFileName?: string;
  originalityScore?: number; // Plagiarism check % (e.g. 98% authentic)
  isGraded: boolean;
  score?: number;
  maxScore: number;
  teacherFeedback?: string;
  rubricEvaluation?: RubricCriterion[];
}

export interface Homework {
  id: string;
  title: string;
  subject: Subject;
  dueDate: string;
  assignedDate: string;
  teacherName: string;
  instructions: string;
  rubric: RubricCriterion[];
  maxScore: number;
  estimatedMinutes: number;
  submissionsCount: number;
  totalStudents: number;
  isSubmittedByCurrentStudent?: boolean;
  currentStudentSubmission?: HomeworkSubmission;
}

export type QuizQuestionType = "qcm" | "fill_blanks" | "association" | "open";

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options?: string[];
  correctOptionIndex?: number;
  correctAnswerText?: string;
  explanation: string;
  competencyRef?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: Subject;
  timeLimitSeconds: number; // e.g. 300 for 5 minutes
  questions: QuizQuestion[];
  passingScore: number;
}

export interface CompetencyDomain {
  id: string;
  code: string; // e.g. "D1.1"
  name: string;
  domainGroup: string; // "Les langages pour penser et communiquer", "Les méthodes et outils pour apprendre", etc.
  masteryLevel: 1 | 2 | 3 | 4; // 1: Maîtrise insuffisante, 2: fragile, 3: satisfaisante, 4: très bonne
  evaluatedCount: number;
  lastEvaluated: string;
}

export interface ActivityHeatmapDay {
  date: string;
  count: number; // Number of activities completed
  level: 0 | 1 | 2 | 3 | 4;
}

export interface TeacherAlert {
  id: string;
  studentName: string;
  studentClass: string;
  type: "inactivity" | "score_drop" | "missed_homework" | "mastery_risk";
  severity: "low" | "medium" | "high";
  message: string;
  date: string;
  resolved: boolean;
}

export interface MessageThread {
  id: string;
  title: string;
  participants: string[];
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  isClassAnnouncement?: boolean;
}

export interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
  isSelf: boolean;
}

export interface AccessibilitySettings {
  dyslexicFont: boolean;
  highContrast: boolean;
  fontSize: "normal" | "large" | "xlarge";
  soundEffects: boolean;
}
