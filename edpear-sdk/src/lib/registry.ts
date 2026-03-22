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
];

export function getRegistryComponent(name: string): RegistryComponent | undefined {
  return registryComponents.find((component) => component.name === name);
}
