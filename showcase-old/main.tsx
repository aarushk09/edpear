import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  AIFeedback,
  AIHint,
  AIQuizGenerator,
  BadgeAward,
  CodePlayground,
  CourseCard,
  DiscussionThread,
  FlashCard,
  LessonProgress,
  QuizCard,
  RichTextEditor,
  ScoreDisplay,
  StreakTracker,
  TimedQuiz,
  VideoLesson,
} from "../src/index";
import "./showcase.css";

const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY ?? "";

function App() {
  return (
    <main className="showcase-shell">
      <header className="showcase-hero">
        <div>
          <p className="showcase-code">edpear / browser showcase</p>
          <h1 className="showcase-title">Every EdPear component, rendered live.</h1>
          <p className="showcase-subtitle">
            This local showcase exercises every current component in a real browser surface, including
            the OpenRouter-backed AI helpers.
          </p>
        </div>
        <div className="showcase-pill-row">
          <span className="showcase-pill">15 components</span>
          <span className="showcase-pill">Tailwind tokens active</span>
          <span className="showcase-pill">{apiKey ? "OpenRouter key injected" : "No OpenRouter key"}</span>
        </div>
      </header>

      <section className="showcase-section">
        <div>
          <h2>Core Learning Primitives</h2>
          <p>Assessment, progression, lesson media, motivation, and learner-facing surfaces.</p>
        </div>
        <div className="showcase-grid">
          <div className="showcase-card">
            <CourseCard
              categoryTag="Math"
              ctaLabel="Resume module"
              description="Linear equations, worked examples, and quick checks."
              href="#course-card"
              instructor="Maya Chen"
              progress={68}
              status="Live cohort"
              title="Algebra I Foundations"
            />
          </div>

          <div className="showcase-card">
            <LessonProgress
              currentStep={2}
              steps={[
                { id: "watch", label: "Watch", description: "8 min explainer" },
                { id: "check", label: "Check", description: "Concept checkpoint" },
                { id: "apply", label: "Apply", description: "Independent practice" },
                { id: "reflect", label: "Reflect", description: "Exit ticket" },
              ]}
            />
          </div>

          <div className="showcase-card">
            <QuizCard
              choices={["Evaporation", "Condensation", "Freezing", "Melting"]}
              correctAnswer="Condensation"
              description="Choose the process that forms clouds from water vapor."
              question="What part of the water cycle turns vapor back into liquid droplets?"
              variant="multiple-choice"
            />
          </div>

          <div className="showcase-card">
            <TimedQuiz
              correctAnswer="4"
              description="Answer before the timer expires."
              duration={25}
              question="How many sides does a square have?"
              variant="short-answer"
            />
          </div>

          <div className="showcase-card">
            <FlashCard
              back="Photosynthesis mainly happens in the chloroplasts of plant cells."
              front="Where in a plant cell does photosynthesis happen?"
            />
          </div>

          <div className="showcase-card">
            <BadgeAward
              description="Completed a full week of lessons without missing a day."
              earnedAt="today"
              title="Consistency Champ"
            />
          </div>

          <div className="showcase-card">
            <StreakTracker
              days={[
                { label: "Mon", completed: true },
                { label: "Tue", completed: true },
                { label: "Wed", completed: true },
                { label: "Thu", completed: false },
                { label: "Fri", completed: true },
                { label: "Sat", completed: true },
                { label: "Sun", completed: true },
              ]}
              goal={10}
              streak={7}
            />
          </div>

          <div className="showcase-card">
            <ScoreDisplay maxScore={20} passingScore={14} score={17} />
          </div>

          <div className="showcase-card showcase-span-2">
            <VideoLesson
              chapters={[
                { id: "intro", label: "What is a fraction?", time: 0 },
                { id: "model", label: "Visual model", time: 75 },
                { id: "practice", label: "Practice prompt", time: 150 },
              ]}
              title="Fractions in Everyday Contexts"
              youtubeId="M7lc1UVf-VE"
            />
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div>
          <h2>Authoring And Collaboration</h2>
          <p>Inputs for note-taking, coding exercises, and peer conversation.</p>
        </div>
        <div className="showcase-grid">
          <div className="showcase-card showcase-span-2">
            <RichTextEditor defaultValue="<p><strong>Lab notes:</strong> We observed the reaction speed increase when the temperature rose.</p>" />
          </div>

          <div className="showcase-card showcase-span-2">
            <CodePlayground
              defaultValue={`function area(width, height) {\n  return width * height;\n}\n\nconsole.log(area(4, 3));`}
              language="javascript"
              onRun={(code) => `Submission received:\n\n${code}\n\nExpected output:\n12`}
            />
          </div>

          <div className="showcase-card showcase-span-2">
            <DiscussionThread
              comments={[
                {
                  id: "c1",
                  author: "Ava",
                  content: "I chose condensation because the vapor cools and forms droplets in the sky.",
                  role: "Student",
                  timestamp: "2 minutes ago",
                  upvotes: 4,
                  replies: [
                    {
                      id: "c1-r1",
                      author: "Noah",
                      content: "I agree, and the cloud model from the video made that part click for me.",
                      role: "Student",
                      timestamp: "1 minute ago",
                      upvotes: 2,
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="showcase-section">
        <div>
          <h2>OpenRouter AI Helpers</h2>
          <p>These components are rendered with your runtime key and can be exercised directly in the browser.</p>
        </div>
        <div className="showcase-grid">
          <div className="showcase-card">
            <AIFeedback
              apiKey={apiKey}
              correctAnswer="Plants primarily use carbon dioxide during photosynthesis."
              rubricFocus="Correct misconceptions gently and suggest one next study step."
              studentAnswer="Plants absorb oxygen to make sugar during photosynthesis."
            />
          </div>

          <div className="showcase-card">
            <AIHint
              apiKey={apiKey}
              prompt="Solve for x: 3x + 9 = 18"
              studentAttempt="I subtracted 3 first and got x = 5."
            />
          </div>

          <div className="showcase-card showcase-span-2">
            <AIQuizGenerator
              apiKey={apiKey}
              count={3}
              sourceText="The water cycle includes evaporation, condensation, precipitation, and collection. The sun drives evaporation by heating surface water. Condensation forms clouds when water vapor cools. Precipitation returns water to the ground as rain, snow, sleet, or hail."
              topic="The water cycle"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
