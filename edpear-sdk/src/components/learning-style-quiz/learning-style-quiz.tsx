import { CheckCircle2, ChevronRight, Eye, Headset, Hand } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { LearningStyle, LearningStyleQuestion, LearningStyleQuizProps, LearningStyleResult } from "./learning-style-quiz.types.js";

const DEFAULT_QUESTIONS: LearningStyleQuestion[] = [
  {
    id: "q1",
    question: "When learning how to use a new software, what do you prefer to do?",
    options: [
      { id: "o1", label: "Read the manual or look at diagrams.", styleWeight: { visual: 3, auditory: 0, kinesthetic: 0 } },
      { id: "o2", label: "Have someone explain it to me.", styleWeight: { visual: 0, auditory: 3, kinesthetic: 0 } },
      { id: "o3", label: "Jump right in and try clicking around.", styleWeight: { visual: 0, auditory: 0, kinesthetic: 3 } },
    ],
  },
  {
    id: "q2",
    question: "In a group discussion, you typically...",
    options: [
      { id: "o1", label: "Take detailed notes and draw mind maps.", styleWeight: { visual: 3, auditory: 0, kinesthetic: 0 } },
      { id: "o2", label: "Listen carefully and debate verbally.", styleWeight: { visual: 0, auditory: 3, kinesthetic: 0 } },
      { id: "o3", label: "Pace around or fidget while listening.", styleWeight: { visual: 0, auditory: 0, kinesthetic: 3 } },
    ],
  },
  {
    id: "q3",
    question: "When trying to recall a phone number, you usually...",
    options: [
      { id: "o1", label: "Visualize the numbers written down.", styleWeight: { visual: 3, auditory: 0, kinesthetic: 0 } },
      { id: "o2", label: "Say it out loud rhythmically.", styleWeight: { visual: 0, auditory: 3, kinesthetic: 0 } },
      { id: "o3", label: "Remember the pattern your fingers made typing it.", styleWeight: { visual: 0, auditory: 0, kinesthetic: 3 } },
    ],
  },
];

export const LearningStyleQuiz = forwardRef<HTMLDivElement, LearningStyleQuizProps>((props, ref) => {
  const {
    questions = DEFAULT_QUESTIONS,
    onComplete,
    title = "Discover Your Learning Style",
    description = "Answer a few quick questions to personalize your learning journey.",
    className,
    ...rest
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState<LearningStyleResult | null>(null);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelectOption = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    if (isLastQuestion) {
      calculateResult(newAnswers);
    } else {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 300);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    const scores: Record<LearningStyle, number> = { visual: 0, auditory: 0, kinesthetic: 0 };

    questions.forEach((q) => {
      const selectedOptionId = finalAnswers[q.id];
      const selectedOption = q.options.find((o) => o.id === selectedOptionId);
      if (selectedOption) {
        scores.visual += selectedOption.styleWeight.visual;
        scores.auditory += selectedOption.styleWeight.auditory;
        scores.kinesthetic += selectedOption.styleWeight.kinesthetic;
      }
    });

    const dominantStyle = (Object.keys(scores) as LearningStyle[]).reduce((a, b) => (scores[a] > scores[b] ? a : b));

    const finalResult = { dominantStyle, scores };
    setResult(finalResult);
    setIsCompleted(true);
    onComplete?.(finalResult);
  };

  if (isCompleted && result) {
    const styleIcons: Record<LearningStyle, React.ReactNode> = {
      visual: <Eye className="h-10 w-10 text-blue-500" />,
      auditory: <Headset className="h-10 w-10 text-emerald-500" />,
      kinesthetic: <Hand className="h-10 w-10 text-amber-500" />,
    };

    const styleLabels: Record<LearningStyle, string> = {
      visual: "Visual Learner",
      auditory: "Auditory Learner",
      kinesthetic: "Kinesthetic Learner",
    };

    const maxScore = questions.length * 3; // Assuming max weight per question is 3
    
    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center text-center rounded-xl border bg-card p-8 text-card-foreground shadow-sm", className)}
        data-slot="learning-style-quiz-result"
        {...rest}
      >
        <div className="mb-4 rounded-full bg-muted p-4">
          {styleIcons[result.dominantStyle]}
        </div>
        <h3 className="text-2xl font-bold mb-2">You are a {styleLabels[result.dominantStyle]}</h3>
        <p className="text-muted-foreground mb-6">
          Your personalized learning path has been optimized for your dominant style.
        </p>

        <div className="w-full space-y-4 max-w-sm">
          {(Object.keys(result.scores) as LearningStyle[]).map((style) => (
            <div key={style} className="space-y-1">
              <div className="flex justify-between text-sm font-medium">
                <span className="capitalize">{style}</span>
                <span>{Math.round((result.scores[style] / maxScore) * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    style === "visual" ? "bg-blue-500" : style === "auditory" ? "bg-emerald-500" : "bg-amber-500"
                  )}
                  style={{ width: `${(result.scores[style] / maxScore) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("rounded-xl border bg-card p-6 text-card-foreground shadow-sm", className)}
      data-slot="learning-style-quiz"
      {...rest}
    >
      <div className="mb-6 space-y-1.5">
        <h3 className="text-xl font-semibold leading-none tracking-tight">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(((currentIndex) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300" key={currentQuestion?.id}>
        <h4 className="text-lg font-medium">{currentQuestion?.question}</h4>
        <div className="grid gap-3">
          {currentQuestion?.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.id)}
                className={cn(
                  "flex items-center justify-between rounded-lg border p-4 text-left text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
                  isSelected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
                )}
              >
                <span>{option.label}</span>
                {isSelected ? (
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-muted-foreground opacity-50" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});

LearningStyleQuiz.displayName = "LearningStyleQuiz";
