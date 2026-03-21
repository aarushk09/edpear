export const NAV_GROUPS = [
  {
    title: "Learning",
    items: [
      { id: "course-card", label: "CourseCard" },
      { id: "lesson-progress", label: "LessonProgress" },
      { id: "quiz-card", label: "QuizCard" },
      { id: "timed-quiz", label: "TimedQuiz" },
      { id: "flash-card", label: "FlashCard" },
      { id: "badge-award", label: "BadgeAward" },
      { id: "streak-tracker", label: "StreakTracker" },
      { id: "score-display", label: "ScoreDisplay" },
      { id: "video-lesson", label: "VideoLesson" },
      { id: "syllabus-navigator", label: "SyllabusNavigator" },
      { id: "assignment-dropzone", label: "AssignmentDropzone" },
      { id: "grade-book", label: "GradeBook" },
      { id: "reading-annotator", label: "ReadingAnnotator" },
      { id: "knowledge-check", label: "KnowledgeCheck" },
      { id: "certificate-renderer", label: "CertificateRenderer" },
      { id: "learning-path-map", label: "LearningPathMap" },
      { id: "peer-review-panel", label: "PeerReviewPanel" },
      { id: "session-timer", label: "SessionTimer" },
      { id: "onboarding-checklist", label: "OnboardingChecklist" },
      { id: "feedback-slider", label: "FeedbackSlider" },
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
