export const NAV_GROUPS = [
  {
    title: "Learning Elements",
    items: [
      { id: "course-card", label: "CourseCard" },
      { id: "lesson-progress", label: "LessonProgress" },
      { id: "quiz-card", label: "QuizCard" },
      { id: "timed-quiz", label: "TimedQuiz" },
      { id: "flash-card", label: "FlashCard" },
      { id: "video-lesson", label: "VideoLesson" },
      { id: "reading-annotator", label: "ReadingAnnotator" },
      { id: "knowledge-check", label: "KnowledgeCheck" },
      { id: "learning-path-map", label: "LearningPathMap" },
    ],
  },
  {
    title: "Adaptive & Personalization",
    items: [
      { id: "skill-radar", label: "SkillRadar" },
      { id: "learning-style-quiz", label: "LearningStyleQuiz" },
      { id: "adaptive-difficulty-meter", label: "AdaptiveDifficultyMeter" },
      { id: "knowledge-gap-alert", label: "KnowledgeGapAlert" },
      { id: "recommendation-carousel", label: "RecommendationCarousel" },
    ],
  },
  {
    title: "Scheduling & Accountability",
    items: [
      { id: "study-scheduler", label: "StudyScheduler" },
      { id: "deadline-countdown", label: "DeadlineCountdown" },
      { id: "goal-setter", label: "GoalSetter" },
      { id: "attendance-tracker", label: "AttendanceTracker" },
      { id: "pacing-guide", label: "PacingGuide" },
      { id: "session-timer", label: "SessionTimer" },
    ],
  },
  {
    title: "Engagement & Gamification",
    items: [
      { id: "leaderboard-widget", label: "LeaderboardWidget" },
      { id: "xp-progress-bar", label: "XPProgressBar" },
      { id: "challenge-card", label: "ChallengeCard" },
      { id: "spin-to-review", label: "SpinToReview" },
      { id: "virtual-currency", label: "VirtualCurrency" },
      { id: "badge-award", label: "BadgeAward" },
      { id: "streak-tracker", label: "StreakTracker" },
      { id: "score-display", label: "ScoreDisplay" },
      { id: "certificate-renderer", label: "CertificateRenderer" },
    ],
  },
  {
    title: "Live Learning",
    items: [
      { id: "poll-widget", label: "PollWidget" },
      { id: "raise-hand-queue", label: "RaiseHandQueue" },
      { id: "breakout-room-card", label: "BreakoutRoomCard" },
      { id: "lecture-caption-overlay", label: "LectureCaptionOverlay" },
      { id: "whiteboard-embed", label: "WhiteboardEmbed" },
    ],
  },
  {
    title: "STEM & Specialized",
    items: [
      { id: "chemistry-formula-builder", label: "ChemistryFormulaBuilder" },
      { id: "interactive-timeline", label: "InteractiveTimeline" },
      { id: "geo-map-quiz", label: "GeoMapQuiz" },
      { id: "circuit-simulator", label: "CircuitSimulator" },
      { id: "data-table-lab", label: "DataTableLab" },
    ],
  },
  {
    title: "Instructor Tooling",
    items: [
      { id: "rubric-builder", label: "RubricBuilder" },
      { id: "cohort-comparison-chart", label: "CohortComparisonChart" },
      { id: "attendance-heat-map", label: "AttendanceHeatMap" },
      { id: "grading-queue-card", label: "GradingQueueCard" },
      { id: "plagiarism-score-indicator", label: "PlagiarismScoreIndicator" },
      { id: "grade-book", label: "GradeBook" },
      { id: "assignment-dropzone", label: "AssignmentDropzone" },
      { id: "peer-review-panel", label: "PeerReviewPanel" },
      { id: "syllabus-navigator", label: "SyllabusNavigator" },
    ],
  },
  {
    title: "Accessibility",
    items: [
      { id: "reading-level-toggle", label: "ReadingLevelToggle" },
      { id: "translation-overlay", label: "TranslationOverlay" },
    ],
  },
  {
    title: "Authoring",
    items: [
      { id: "rich-text-editor", label: "RichTextEditor" },
      { id: "code-playground", label: "CodePlayground" },
      { id: "discussion-thread", label: "DiscussionThread" },
      { id: "question-bank", label: "QuestionBank" },
      { id: "diff-viewer", label: "DiffViewer" },
      { id: "math-renderer", label: "MathRenderer" },
    ],
  },
  {
    title: "OpenRouter",
    items: [
      { id: "ai-feedback", label: "AIFeedback" },
      { id: "ai-hint", label: "AIHint" },
      { id: "ai-quiz-generator", label: "AIQuizGenerator" },
      { id: "ai-tutor", label: "AITutor" },
    ],
  },
  {
    title: "Course shell",
    items: [
      { id: "live-class-banner", label: "LiveClassBanner" },
      { id: "student-profile-card", label: "StudentProfileCard" },
      { id: "enrollment-gate", label: "EnrollmentGate" },
      { id: "activity-feed", label: "ActivityFeed" },
      { id: "course-dashboard", label: "CourseDashboard" },
      { id: "onboarding-checklist", label: "OnboardingChecklist" },
      { id: "feedback-slider", label: "FeedbackSlider" },
    ],
  },
] as const;

export type ShowcaseSlug = (typeof NAV_GROUPS)[number]["items"][number]["id"];

export const ALL_SHOWCASE_SLUGS: ShowcaseSlug[] = NAV_GROUPS.flatMap((g) =>
  g.items.map((i) => i.id),
);

export const DEFAULT_SHOWCASE_SLUG: ShowcaseSlug = ALL_SHOWCASE_SLUGS[0];

const slugSet = new Set<string>(ALL_SHOWCASE_SLUGS);

export function isShowcaseSlug(s: string): s is ShowcaseSlug {
  return slugSet.has(s);
}

export function getComponentLabel(slug: ShowcaseSlug): string {
  for (const g of NAV_GROUPS) {
    const hit = g.items.find((i) => i.id === slug);
    if (hit) return hit.label;
  }
  return slug;
}

export function getNeighborSlugs(slug: ShowcaseSlug): {
  prev: ShowcaseSlug | null;
  next: ShowcaseSlug | null;
} {
  const i = ALL_SHOWCASE_SLUGS.indexOf(slug);
  if (i < 0) return { prev: null, next: null };
  return {
    prev: i > 0 ? ALL_SHOWCASE_SLUGS[i - 1]! : null,
    next: i < ALL_SHOWCASE_SLUGS.length - 1 ? ALL_SHOWCASE_SLUGS[i + 1]! : null,
  };
}
