export interface RegistryComponent {
  name: string;
  title: string;
  description: string;
  ai: boolean;
}

export const registryComponents: RegistryComponent[] = [
  {
    name: "quiz-card",
    title: "QuizCard",
    description: "Accessible quiz primitive for multiple-choice, true/false, and short-answer prompts.",
    ai: false,
  },
  {
    name: "lesson-progress",
    title: "LessonProgress",
    description: "Step-based lesson progress tracker with labeled states.",
    ai: false,
  },
  {
    name: "flash-card",
    title: "FlashCard",
    description: "Keyboard and swipe-friendly flip card for retrieval practice.",
    ai: false,
  },
  {
    name: "video-lesson",
    title: "VideoLesson",
    description: "Video wrapper with chapter markers and progress callbacks.",
    ai: false,
  },
  {
    name: "course-card",
    title: "CourseCard",
    description: "Edtech course summary card with progress and instructor metadata.",
    ai: false,
  },
  {
    name: "badge-award",
    title: "BadgeAward",
    description: "Achievement badge surface with unlocked and locked states.",
    ai: false,
  },
  {
    name: "timed-quiz",
    title: "TimedQuiz",
    description: "Quiz card variant with an integrated countdown timer.",
    ai: false,
  },
  {
    name: "rich-text-editor",
    title: "RichTextEditor",
    description: "Lightweight Tiptap-based editor for notes and responses.",
    ai: false,
  },
  {
    name: "code-playground",
    title: "CodePlayground",
    description: "CodeMirror-backed playground for coding practice.",
    ai: false,
  },
  {
    name: "streak-tracker",
    title: "StreakTracker",
    description: "Daily streak display for habit-building learning products.",
    ai: false,
  },
  {
    name: "score-display",
    title: "ScoreDisplay",
    description: "Animated score reveal with pass/fail and grade states.",
    ai: false,
  },
  {
    name: "discussion-thread",
    title: "DiscussionThread",
    description: "Nested discussion UI for learner conversations.",
    ai: false,
  },
  {
    name: "ai-feedback",
    title: "AIFeedback",
    description: "Constructive answer feedback grounded in a correct response.",
    ai: true,
  },
  {
    name: "ai-quiz-generator",
    title: "AIQuizGenerator",
    description: "Grounded quiz generation from a topic or passage.",
    ai: true,
  },
  {
    name: "ai-hint",
    title: "AIHint",
    description: "Socratic learner hints powered by OpenRouter.",
    ai: true,
  },
  {
    name: "skill-radar",
    title: "SkillRadar",
    description: "Radar chart visualizing mastery across skill dimensions.",
    ai: false,
  },
  {
    name: "learning-style-quiz",
    title: "LearningStyleQuiz",
    description: "Onboarding diagnostic that profiles a learner.",
    ai: false,
  },
  {
    name: "adaptive-difficulty-meter",
    title: "AdaptiveDifficultyMeter",
    description: "Real-time difficulty gauge.",
    ai: false,
  },
  {
    name: "knowledge-gap-alert",
    title: "KnowledgeGapAlert",
    description: "Inline callout that surfaces prerequisite gaps.",
    ai: false,
  },
  {
    name: "recommendation-carousel",
    title: "RecommendationCarousel",
    description: "Horizontally scrolling card rail for up next content.",
    ai: false,
  },
  {
    name: "study-scheduler",
    title: "StudyScheduler",
    description: "Drag-and-drop weekly planner.",
    ai: false,
  },
  {
    name: "deadline-countdown",
    title: "DeadlineCountdown",
    description: "Urgency-driving visual timer.",
    ai: false,
  },
  {
    name: "goal-setter",
    title: "GoalSetter",
    description: "Micro-commitment widget.",
    ai: false,
  },
  {
    name: "attendance-tracker",
    title: "AttendanceTracker",
    description: "Instructor-side grid for marking presence.",
    ai: false,
  },
  {
    name: "pacing-guide",
    title: "PacingGuide",
    description: "Side-by-side view of expected vs actual progress.",
    ai: false,
  },
  {
    name: "leaderboard-widget",
    title: "LeaderboardWidget",
    description: "Scoped ranked leaderboard.",
    ai: false,
  },
  {
    name: "xp-progress-bar",
    title: "XPProgressBar",
    description: "Experience-point bar with level-up animation.",
    ai: false,
  },
  {
    name: "challenge-card",
    title: "ChallengeCard",
    description: "Time-boxed bonus challenge.",
    ai: false,
  },
  {
    name: "spin-to-review",
    title: "SpinToReview",
    description: "Randomized question picker wheel.",
    ai: false,
  },
  {
    name: "virtual-currency",
    title: "VirtualCurrency",
    description: "Coin/token balance display.",
    ai: false,
  },
  {
    name: "poll-widget",
    title: "PollWidget",
    description: "Live poll with bar chart result reveal.",
    ai: false,
  },
  {
    name: "raise-hand-queue",
    title: "RaiseHandQueue",
    description: "Live class queue for virtual hands.",
    ai: false,
  },
  {
    name: "breakout-room-card",
    title: "BreakoutRoomCard",
    description: "Displays assigned breakout group info.",
    ai: false,
  },
  {
    name: "lecture-caption-overlay",
    title: "LectureCaptionOverlay",
    description: "Live or synced captions over video.",
    ai: false,
  },
  {
    name: "whiteboard-embed",
    title: "WhiteboardEmbed",
    description: "Collaborative whiteboard frame.",
    ai: false,
  },
  {
    name: "chemistry-formula-builder",
    title: "ChemistryFormulaBuilder",
    description: "Drag-and-drop element assembler.",
    ai: false,
  },
  {
    name: "interactive-timeline",
    title: "InteractiveTimeline",
    description: "Zoomable horizontal timeline.",
    ai: false,
  },
  {
    name: "geo-map-quiz",
    title: "GeoMapQuiz",
    description: "Click-to-label map component.",
    ai: false,
  },
  {
    name: "circuit-simulator",
    title: "CircuitSimulator",
    description: "Lightweight drag-and-drop logic gate builder.",
    ai: false,
  },
  {
    name: "data-table-lab",
    title: "DataTableLab",
    description: "Spreadsheet-like table.",
    ai: false,
  },
  {
    name: "rubric-builder",
    title: "RubricBuilder",
    description: "Interactive grading matrix.",
    ai: false,
  },
  {
    name: "cohort-comparison-chart",
    title: "CohortComparisonChart",
    description: "Benchmarking visualization.",
    ai: false,
  },
  {
    name: "attendance-heat-map",
    title: "AttendanceHeatMap",
    description: "GitHub-style contribution graph.",
    ai: false,
  },
  {
    name: "grading-queue-card",
    title: "GradingQueueCard",
    description: "To Review workflow item.",
    ai: false,
  },
  {
    name: "plagiarism-score-indicator",
    title: "PlagiarismScoreIndicator",
    description: "Warning gauge for academic integrity.",
    ai: false,
  },
  {
    name: "reading-level-toggle",
    title: "ReadingLevelToggle",
    description: "Adjusts vocabulary density/complexity.",
    ai: false,
  },
  {
    name: "translation-overlay",
    title: "TranslationOverlay",
    description: "Inline translation helper.",
    ai: false,
  }
];

export function getRegistryComponent(name: string): RegistryComponent | undefined {
  return registryComponents.find((component) => component.name === name);
}
