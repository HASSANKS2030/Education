import { Course, Flashcard, Homework, Quiz, CompetencyDomain, TeacherAlert, MessageThread, UserProfile } from "../types";

export const initialProfiles: Record<string, UserProfile> = {
  eleve: {
    id: "stu-1",
    name: "Camille Laurent",
    email: "camille.laurent@college-victorhugo.fr",
    role: "eleve",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    schoolClass: "3ème B",
    schoolName: "Collège Victor Hugo",
  },
  enseignant: {
    id: "tea-1",
    name: "M. Alexandre Dumas",
    email: "alexandre.dumas@ac-versailles.fr",
    role: "enseignant",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    schoolClass: "Professeur Principal - 3ème B & Lycée",
    schoolName: "Collège Victor Hugo",
  },
  parent: {
    id: "par-1",
    name: "Mme Sophie Laurent (Parent de Camille)",
    email: "sophie.laurent@gmail.com",
    role: "parent",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    schoolClass: "Parent d'élève - 3ème B",
    schoolName: "Collège Victor Hugo",
  },
  admin: {
    id: "adm-1",
    name: "Direction - Hélène Mercier",
    email: "direction@college-victorhugo.fr",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    schoolClass: "Chef d'Établissement & DSI",
    schoolName: "Collège Victor Hugo",
  }
};

export const initialCourses: Course[] = [
  {
    id: "crs-1",
    title: "Le Théorème de Pythagore et ses applications",
    subject: "Mathematiques",
    classLevel: "3ème",
    durationMinutes: 45,
    authorName: "M. Alexandre Dumas",
    tags: ["Géométrie", "Triangle rectangle", "Calculs de longueurs", "Démonstration"],
    summary: "Comprendre l'égalité de Pythagore, calculer la longueur d'un côté dans un triangle rectangle et vérifier si un triangle est rectangle via la réciproque.",
    contentMarkdown: `### 1. Énoncé fondamental du Théorème
Dans un **triangle rectangle**, le carré de la longueur de l'hypoténuse est égal à la somme des carrés des longueurs des deux autres côtés.

Si un triangle $ABC$ est rectangle en $A$, alors :
$$BC^2 = AB^2 + AC^2$$

> **Règle d'or** : L'hypoténuse est toujours le plus grand côté du triangle rectangle, situé directement en face de l'angle droit.

### 2. Calculer la longueur de l'hypoténuse
Soit un triangle rectangle en $A$ tel que $AB = 3\\text{ cm}$ et $AC = 4\\text{ cm}$.
1. On applique l'égalité : $BC^2 = 3^2 + 4^2 = 9 + 16 = 25$.
2. On prend la racine carrée : $BC = \\sqrt{25} = 5\\text{ cm}$.

### 3. La réciproque du théorème
Si dans un triangle $ABC$, on a $BC^2 = AB^2 + AC^2$, alors ce triangle est rectangle en $A$.
Cela permet de démontrer qu'une équerre ou une charpente est parfaitement d'équerre (méthode 3-4-5 des bâtisseurs).`,
    multimedia: {
      audioDuration: "04:15",
      diagramsCount: 3,
    },
    keyTakeaways: [
      "BC² = AB² + AC² ssi le triangle est rectangle en A.",
      "L'hypoténuse est le côté opposé à l'angle droit.",
      "La réciproque sert à prouver qu'un triangle est rectangle."
    ],
    isBookmarked: true,
    isOfflineAvailable: true,
    lastUpdated: "2026-09-02",
    currentVersion: "v2.1",
    versions: [
      { version: "v2.1", updatedAt: "2026-09-02", author: "M. Dumas", changesSummary: "Ajout de schémas interactifs et précisions sur la réciproque" },
      { version: "v2.0", updatedAt: "2026-08-28", author: "M. Dumas", changesSummary: "Restructuration complète du cours" },
      { version: "v1.0", updatedAt: "2026-05-10", author: "M. Dumas", changesSummary: "Création initiale" }
    ],
    annotations: [
      {
        id: "ann-1",
        userId: "stu-1",
        selectedText: "L'hypoténuse est toujours le plus grand côté",
        comment: "Ne pas oublier pour le contrôle de jeudi !",
        color: "yellow",
        createdAt: "2026-09-04"
      }
    ]
  },
  {
    id: "crs-2",
    title: "La Photosynthèse et les flux d'énergie cellulaire",
    subject: "SVT",
    classLevel: "3ème / Seconde",
    durationMinutes: 50,
    authorName: "Mme Clara Dupont",
    tags: ["Biologie", "Végétaux", "Chloroplastes", "Énergie"],
    summary: "Mécanismes de conversion de l'énergie lumineuse en matière organique par les végétaux chlorophylliens : équation bilan, rôle de la chlorophylle et facteurs limitants.",
    contentMarkdown: `### 1. Qu'est-ce que la photosynthèse ?
La photosynthèse est le processus biochimique par lequel les plantes vertes (autotrophes) synthétisent des matières organiques (glucides) à partir d'eau, de dioxyde de carbone ($CO_2$) et d'énergie lumineuse.

### 2. L'équation bilan globale
$$6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{Lumière} \\longrightarrow \\text{C}_6\\text{H}_{12}\\text{O}_6 (\\text{glucose}) + 6\\text{O}_2$$

### 3. Le siège de la réaction : Les chloroplastes
À l'intérieur des cellules végétales se trouvent des organites spécialisés appelés **chloroplastes**, contenant le pigment vert récepteur : la **chlorophylle**.`,
    multimedia: {
      audioDuration: "05:30",
      diagramsCount: 4,
    },
    keyTakeaways: [
      "Conversion d'énergie lumineuse en énergie chimique.",
      "Nécessite lumière, chlorophylle, eau et CO2.",
      "Libère du dioxygène (O2) indispensable à la respiration."
    ],
    isBookmarked: false,
    isOfflineAvailable: true,
    lastUpdated: "2026-09-01",
    currentVersion: "v1.4",
    versions: [
      { version: "v1.4", updatedAt: "2026-09-01", author: "Mme Dupont", changesSummary: "Mise à jour des protocoles d'expérimentation ExAO" }
    ],
    annotations: []
  },
  {
    id: "crs-3",
    title: "L'Argumentation et les Figures de Style",
    subject: "Francais",
    classLevel: "3ème / Brevet",
    durationMinutes: 40,
    authorName: "Mme Valérie Bernard",
    tags: ["Rhétorique", "Figures de style", "Brevet", "Expression écrite"],
    summary: "Distinguer convaincre et persuader, repérer les métaphores, hyperboles et anaphores pour enrichir ses rédactions et argumentations.",
    contentMarkdown: `### 1. Convaincre vs Persuader
- **Convaincre** : Faire appel à la raison de l'interlocuteur à travers des arguments logiques, des faits vérifiables et des déductions.
- **Persuader** : Toucher la sensibilité et les émotions de l'interlocuteur (pathos, empathie, indignation).

### 2. Les grandes figures d'analogie
- **La comparaison** : Rapproche deux éléments avec un outil de comparaison (*comme, semblable à, tel que*).
- **La métaphore** : Rapproche deux éléments sans outil de comparaison (*Ce professeur est un phare dans la nuit*).
- **La personnification** : Attribue des traits humains à un objet ou un animal.`,
    multimedia: {
      audioDuration: "03:45",
      diagramsCount: 2,
    },
    keyTakeaways: [
      "Argumenter = Thèse + Arguments + Exemples concrets.",
      "Figures d'insistance : anaphore, répétition, accumulation.",
      "Clarté des connecteurs logiques (en effet, toutefois, dès lors)."
    ],
    isBookmarked: true,
    isOfflineAvailable: false,
    lastUpdated: "2026-08-30",
    currentVersion: "v2.0",
    versions: [
      { version: "v2.0", updatedAt: "2026-08-30", author: "Mme Bernard", changesSummary: "Exemples littéraires supplémentaires" }
    ],
    annotations: []
  },
  {
    id: "crs-4",
    title: "La Première Guerre Mondiale : Expériences combattantes et Civils",
    subject: "Histoire-Geographie",
    classLevel: "3ème",
    durationMinutes: 55,
    authorName: "M. Julien Robert",
    tags: ["1914-1918", "Tranchées", "Guerre totale", "Mémoire"],
    summary: "Étude de la violence de masse sur les fronts et de la mobilisation totale des sociétés civiles entre 1914 et 1918.",
    contentMarkdown: `### 1. Une guerre d'une violence inédite (1914-1918)
La bataille de Verdun (1916) et la bataille de la Somme symbolisent l'enfer industriel des tranchées : artillerie massive, gaz asphyxiants et conditions extrêmes pour les « Poilus ».

### 2. La guerre totale
L'ensemble des ressources économiques, scientifiques et humaines est mobilisé :
- Les femmes travaillent dans les usines d'armement (« munitionnettes »).
- La censure et la propagande encadrent le moral de l'arrière.
- Les emprunts nationaux financent l'effort de guerre.`,
    multimedia: {
      audioDuration: "06:10",
      diagramsCount: 5,
    },
    keyTakeaways: [
      "Guerre industrielle et violence de masse (Verdun, 1916).",
      "Guerre totale mobilisant soldats et civils.",
      "Génocide des Arméniens en 1915 dans l'Empire ottoman."
    ],
    isBookmarked: false,
    isOfflineAvailable: true,
    lastUpdated: "2026-08-25",
    currentVersion: "v1.2",
    versions: [
      { version: "v1.2", updatedAt: "2026-08-25", author: "M. Robert", changesSummary: "Ajout de documents d'archives et lettres de poilus" }
    ],
    annotations: []
  }
];

export const initialFlashcards: Flashcard[] = [
  {
    id: "fc-1",
    courseId: "crs-1",
    subject: "Mathematiques",
    question: "Quelle est la formule du théorème de Pythagore dans un triangle rectangle en A ?",
    answer: "BC² = AB² + AC² (le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés).",
    mnemonicTip: "L'hypoténuse BC est toujours isolée du côté du signe égal !",
    box: 4,
    nextReviewDate: "2026-09-12",
    totalReviews: 6,
    lastScore: "easy"
  },
  {
    id: "fc-2",
    courseId: "crs-1",
    subject: "Mathematiques",
    question: "Si les côtés mesurent 6 cm et 8 cm, quelle est la longueur de l'hypoténuse ?",
    answer: "10 cm (6² + 8² = 36 + 64 = 100, et √100 = 10).",
    mnemonicTip: "C'est le triangle remarquable 3-4-5 multiplié par 2 !",
    box: 3,
    nextReviewDate: "2026-09-10",
    totalReviews: 4,
    lastScore: "good"
  },
  {
    id: "fc-3",
    courseId: "crs-2",
    subject: "SVT",
    question: "Quels sont les deux réactifs principaux consommés par la photosynthèse ?",
    answer: "Le dioxyde de carbone (CO₂) et l'eau (H₂O), en présence d'énergie lumineuse.",
    mnemonicTip: "Pense à ce dont une plante a besoin : de l'eau et de l'air au soleil !",
    box: 2,
    nextReviewDate: "2026-09-09",
    totalReviews: 3,
    lastScore: "hard"
  },
  {
    id: "fc-4",
    courseId: "crs-3",
    subject: "Francais",
    question: "Quelle est la différence fondamentale entre une métaphore et une comparaison ?",
    answer: "La comparaison comporte un mot-outil de comparaison (comme, tel que), tandis que la métaphore n'en a pas.",
    mnemonicTip: "Comparaison = Outil visible. Métaphore = Fusion poétique directe.",
    box: 1,
    nextReviewDate: "2026-09-09",
    totalReviews: 1,
    lastScore: "again"
  },
  {
    id: "fc-5",
    courseId: "crs-4",
    subject: "Histoire-Geographie",
    question: "En quelle année s'est déroulée la bataille de Verdun ?",
    answer: "En 1916 (février à décembre 1916).",
    mnemonicTip: "Verdun = 1916, un an avant l'entrée en guerre des États-Unis (1917).",
    box: 5,
    nextReviewDate: "2026-09-25",
    totalReviews: 8,
    lastScore: "easy"
  }
];

export const initialHomework: Homework[] = [
  {
    id: "hw-1",
    title: "Démontrer et calculer avec le théorème de Pythagore",
    subject: "Mathematiques",
    dueDate: "2026-09-11",
    assignedDate: "2026-09-05",
    teacherName: "M. Alexandre Dumas",
    instructions: "Résoudre les exercices 24 et 26 page 112 du manuel. Rédiger soigneusement les démonstrations : hypothèses, théorème cité, calcul littéral puis numérique avec unité.",
    maxScore: 20,
    estimatedMinutes: 35,
    submissionsCount: 22,
    totalStudents: 28,
    isSubmittedByCurrentStudent: true,
    currentStudentSubmission: {
      id: "sub-1",
      homeworkId: "hw-1",
      studentId: "stu-1",
      studentName: "Camille Laurent",
      submittedAt: "2026-09-07T14:30:00Z",
      textAnswer: "Dans le triangle ABC rectangle en B, d'après le théorème de Pythagore : AC² = AB² + BC². On a AB = 4,5 cm et BC = 6 cm. AC² = 20,25 + 36 = 56,25. Donc AC = √56,25 = 7,5 cm.",
      attachedFileName: "Exercice_Pythagore_Camille.pdf",
      originalityScore: 99,
      isGraded: true,
      score: 18.5,
      maxScore: 20,
      teacherFeedback: "Démonstration exemplaire et très bien rédigée. Excellente rigueur sur les unités.",
      rubricEvaluation: [
        { id: "r1", criterion: "Identification du triangle rectangle et de l'hypoténuse", weight: 5, studentScore: 5, description: "Hypothèses bien posées" },
        { id: "r2", criterion: "Écriture littérale de l'égalité de Pythagore", weight: 5, studentScore: 5, description: "Formule correcte" },
        { id: "r3", criterion: "Précision des calculs et racine carrée", weight: 6, studentScore: 5.5, description: "Calcul parfait" },
        { id: "r4", criterion: "Phrase de conclusion et unités", weight: 4, studentScore: 3, description: "Clarté et soin" }
      ]
    },
    rubric: [
      { id: "r1", criterion: "Identification du triangle rectangle et de l'hypoténuse", weight: 5, description: "Hypothèses bien posées" },
      { id: "r2", criterion: "Écriture littérale de l'égalité de Pythagore", weight: 5, description: "Formule correcte" },
      { id: "r3", criterion: "Précision des calculs et racine carrée", weight: 6, description: "Calcul parfait" },
      { id: "r4", criterion: "Phrase de conclusion et unités", weight: 4, description: "Clarté et soin" }
    ]
  },
  {
    id: "hw-2",
    title: "Schéma bilan de la photosynthèse et synthèse",
    subject: "SVT",
    dueDate: "2026-09-14",
    assignedDate: "2026-09-08",
    teacherName: "Mme Clara Dupont",
    instructions: "Réaliser un schéma fonctionnel montrant les entrées (eau, sels minéraux, CO2, lumière) et les sorties (O2, matière organique) au niveau d'une feuille verte. Rédiger un texte explicatif de 10 lignes.",
    maxScore: 20,
    estimatedMinutes: 45,
    submissionsCount: 14,
    totalStudents: 28,
    isSubmittedByCurrentStudent: false,
    rubric: [
      { id: "r21", criterion: "Exactitude scientifique des flux de matière", weight: 8, description: "CO2, H2O, O2, Glucose" },
      { id: "r22", criterion: "Qualité du schéma légendé et titre", weight: 6, description: "Flèches, légende, propreté" },
      { id: "r23", criterion: "Vocabulaire disciplinaire dans le texte", weight: 6, description: "Chloroplaste, stomate, autotrophie" }
    ]
  },
  {
    id: "hw-3",
    title: "Commentaire argumenté : convaincre ou persuader ?",
    subject: "Francais",
    dueDate: "2026-09-18",
    assignedDate: "2026-09-09",
    teacherName: "Mme Valérie Bernard",
    instructions: "À partir du discours de Victor Hugo sur la paix, montrez comment l'auteur combine des arguments rationnels et des figures d'insistance pour toucher son auditoire.",
    maxScore: 20,
    estimatedMinutes: 60,
    submissionsCount: 5,
    totalStudents: 28,
    isSubmittedByCurrentStudent: false,
    rubric: [
      { id: "r31", criterion: "Identification des figures de style", weight: 6, description: "Anaphores, métaphores, antithèses" },
      { id: "r32", criterion: "Structure de l'argumentation", weight: 8, description: "Thèse, arguments organisés" },
      { id: "r33", criterion: "Syntaxe, orthographe et clarté", weight: 6, description: "Qualité d'écriture" }
    ]
  }
];

export const initialQuizzes: Quiz[] = [
  {
    id: "qz-1",
    title: "Quiz Éclair : Maîtrise du Théorème de Pythagore",
    subject: "Mathematiques",
    timeLimitSeconds: 180,
    passingScore: 75,
    questions: [
      {
        id: "q1",
        type: "qcm",
        question: "Dans un triangle ABC rectangle en B, quelle est l'égalité de Pythagore exacte ?",
        options: [
          "AC² = AB² + BC²",
          "AB² = AC² + BC²",
          "BC² = AB² + AC²",
          "AC = AB + BC"
        ],
        correctOptionIndex: 0,
        explanation: "Puisque le triangle est rectangle en B, l'hypoténuse est le côté AC (opposé à B). L'égalité est donc AC² = AB² + BC².",
        competencyRef: "D4 - Modéliser et calculer"
      },
      {
        id: "q2",
        type: "qcm",
        question: "Si l'hypoténuse mesure 13 cm et un côté mesure 5 cm, quelle est la longueur du troisième côté ?",
        options: ["8 cm", "12 cm", "144 cm", "18 cm"],
        correctOptionIndex: 1,
        explanation: "13² - 5² = 169 - 25 = 144. Et √144 = 12 cm.",
        competencyRef: "D4 - Résoudre des problèmes"
      },
      {
        id: "q3",
        type: "fill_blanks",
        question: "Complétez : La ______ du théorème de Pythagore sert à prouver qu'un triangle est rectangle.",
        correctAnswerText: "réciproque",
        explanation: "La réciproque permet de démontrer qu'un triangle est rectangle lorsque la relation d'égalité des carrés est vérifiée.",
        competencyRef: "D1 - Utiliser le vocabulaire géométrique"
      }
    ]
  },
  {
    id: "qz-2",
    title: "Quiz Éclair : Photosynthèse & Végétaux",
    subject: "SVT",
    timeLimitSeconds: 240,
    passingScore: 70,
    questions: [
      {
        id: "qs1",
        type: "qcm",
        question: "Quel gaz est rejeté dans l'atmosphère lors de la photosynthèse ?",
        options: ["Le dioxyde de carbone (CO2)", "Le dioxygène (O2)", "L'azote (N2)", "Le méthane (CH4)"],
        correctOptionIndex: 1,
        explanation: "La photosynthèse consomme du CO2 et rejette du dioxygène (O2).",
        competencyRef: "D4 - Pratiquer des démarches scientifiques"
      },
      {
        id: "qs2",
        type: "qcm",
        question: "Dans quel organite cellulaire s'effectue la photosynthèse ?",
        options: ["La vacuole", "Le chloroplaste", "Le noyau", "La membrane plasmique"],
        correctOptionIndex: 1,
        explanation: "C'est dans les chloroplastes, riches en chlorophylle, que s'effectue la capture de l'énergie lumineuse.",
        competencyRef: "D4 - Comprendre le vivant"
      }
    ]
  }
];

export const initialCompetencies: CompetencyDomain[] = [
  {
    id: "c1",
    code: "D1.1",
    name: "Comprendre, s'exprimer en utilisant la langue française à l'écrit et à l'oral",
    domainGroup: "Domaine 1 : Les langages pour penser et communiquer",
    masteryLevel: 4,
    evaluatedCount: 14,
    lastEvaluated: "2026-09-07"
  },
  {
    id: "c2",
    code: "D1.3",
    name: "Comprendre, s'exprimer en utilisant les langages mathématiques, scientifiques et informatiques",
    domainGroup: "Domaine 1 : Les langages pour penser et communiquer",
    masteryLevel: 3,
    evaluatedCount: 18,
    lastEvaluated: "2026-09-08"
  },
  {
    id: "c3",
    code: "D2.1",
    name: "Organisation et travail personnel, recherche d'informations et révision autonome",
    domainGroup: "Domaine 2 : Les méthodes et outils pour apprendre",
    masteryLevel: 4,
    evaluatedCount: 22,
    lastEvaluated: "2026-09-08"
  },
  {
    id: "c4",
    code: "D3.2",
    name: "Règles collectives, responsabilité et esprit critique face aux informations",
    domainGroup: "Domaine 3 : La formation de la personne et du citoyen",
    masteryLevel: 3,
    evaluatedCount: 9,
    lastEvaluated: "2026-09-01"
  },
  {
    id: "c5",
    code: "D4.1",
    name: "Démarches scientifiques, modélisation des phénomènes naturels et techniques",
    domainGroup: "Domaine 4 : Les systèmes naturels et les systèmes techniques",
    masteryLevel: 3,
    evaluatedCount: 15,
    lastEvaluated: "2026-09-06"
  }
];

export const initialTeacherAlerts: TeacherAlert[] = [
  {
    id: "alt-1",
    studentName: "Lucas Martin",
    studentClass: "3ème B",
    type: "missed_homework",
    severity: "high",
    message: "2 devoirs non remis consécutivement en Mathématiques et SVT. Risque de retard.",
    date: "2026-09-08",
    resolved: false
  },
  {
    id: "alt-2",
    studentName: "Emma Bernard",
    studentClass: "3ème B",
    type: "inactivity",
    severity: "medium",
    message: "Aucune session de révision espacée enregistrée depuis 6 jours. Flashcards en attente.",
    date: "2026-09-07",
    resolved: false
  },
  {
    id: "alt-3",
    studentName: "Thomas Petit",
    studentClass: "3ème B",
    type: "score_drop",
    severity: "medium",
    message: "Baisse de résultat sur les 2 derniers quiz rapides (moyenne 9.5/20 vs 14.5/20 le mois précédent).",
    date: "2026-09-06",
    resolved: true
  }
];

export const initialThreads: MessageThread[] = [
  {
    id: "thr-1",
    title: "Annonces officielles - Classe de 3ème B",
    participants: ["M. Dumas (Prof Principal)", "Tous les élèves 3ème B"],
    unreadCount: 1,
    lastMessage: "Rappel : la session de classe virtuelle d'aide aux devoirs aura lieu jeudi à 17h.",
    lastMessageTime: "Hier, 18:20",
    isClassAnnouncement: true
  },
  {
    id: "thr-2",
    title: "Question sur le Théorème de Pythagore",
    participants: ["Camille Laurent", "M. Dumas"],
    unreadCount: 0,
    lastMessage: "Merci Monsieur, j'ai bien compris la distinction entre le théorème direct et sa réciproque.",
    lastMessageTime: "Il y a 2 jours",
    isClassAnnouncement: false
  },
  {
    id: "thr-3",
    title: "Forum d'entraide entre élèves - SVT & Chimie",
    participants: ["Groupe classe 3ème B"],
    unreadCount: 3,
    lastMessage: "Est-ce que quelqu'un a noté la formule de la respiration cellulaire ?",
    lastMessageTime: "Il y a 4 heures",
    isClassAnnouncement: false
  }
];

export const mockUsers = initialProfiles;
export const mockCourses = initialCourses;
export const mockHomework = initialHomework;
export const mockFlashcards = initialFlashcards;
export const mockQuizzes = initialQuizzes;
export const mockCompetencies = initialCompetencies;
export const mockTeacherAlerts = initialTeacherAlerts;
export const mockThreads = initialThreads;

