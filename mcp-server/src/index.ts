#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EdPear root directory is 2 levels up from src/index.ts (mcp-server/src/)
// Or 1 level up if built to mcp-server/dist/index.js
const projectRoot = path.join(__dirname, "..", "..");
const componentsDir = path.join(projectRoot, "src", "components");

// Hardcode the registry for reliability (copied from src/lib/registry.ts)
const registryComponents = [
  { name: "quiz-card", title: "QuizCard", description: "Accessible quiz primitive for multiple-choice, true/false, and short-answer prompts." },
  { name: "lesson-progress", title: "LessonProgress", description: "Step-based lesson progress tracker with labeled states." },
  { name: "flash-card", title: "FlashCard", description: "Keyboard and swipe-friendly flip card for retrieval practice." },
  { name: "video-lesson", title: "VideoLesson", description: "Video wrapper with chapter markers and progress callbacks." },
  { name: "course-card", title: "CourseCard", description: "Edtech course summary card with progress and instructor metadata." },
  { name: "badge-award", title: "BadgeAward", description: "Achievement badge surface with unlocked and locked states." },
  { name: "timed-quiz", title: "TimedQuiz", description: "Quiz card variant with an integrated countdown timer." },
  { name: "rich-text-editor", title: "RichTextEditor", description: "Lightweight Tiptap-based editor for notes and responses." },
  { name: "code-playground", title: "CodePlayground", description: "CodeMirror-backed playground for coding practice." },
  { name: "streak-tracker", title: "StreakTracker", description: "Daily streak display for habit-building learning products." },
  { name: "score-display", title: "ScoreDisplay", description: "Animated score reveal with pass/fail and grade states." },
  { name: "discussion-thread", title: "DiscussionThread", description: "Nested discussion UI for learner conversations." },
  { name: "ai-feedback", title: "AIFeedback", description: "Constructive answer feedback grounded in a correct response." },
  { name: "ai-quiz-generator", title: "AIQuizGenerator", description: "Grounded quiz generation from a topic or passage." },
  { name: "ai-hint", title: "AIHint", description: "Socratic learner hints powered by OpenRouter." }
];

const listComponentsTool: Tool = {
  name: "list_components",
  description: "List all available EdPear learning components with their descriptions.",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

const getComponentCodeTool: Tool = {
  name: "get_component_code",
  description: "Get the raw source code, types, and dependencies for a specific EdPear component.",
  inputSchema: {
    type: "object",
    properties: {
      componentName: {
        type: "string",
        description: "The name of the component (e.g., 'quiz-card', 'course-card')",
      },
    },
    required: ["componentName"],
  },
};

const server = new Server(
  {
    name: "edpear-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Setup Request Handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [listComponentsTool, getComponentCodeTool],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (request.params.name === "list_components") {
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(registryComponents, null, 2),
          },
        ],
      };
    }

    if (request.params.name === "get_component_code") {
      const { componentName } = request.params.arguments as any;
      const component = registryComponents.find((c) => c.name === componentName);
      
      if (!component) {
        throw new Error(`Component '${componentName}' not found in EdPear registry.`);
      }

      const compDir = path.join(componentsDir, componentName);
      let filesRead: string[] = [];

      try {
        const files = await fs.readdir(compDir);
        for (const file of files) {
          if (file.endsWith(".tsx") || file.endsWith(".ts")) {
            const content = await fs.readFile(path.join(compDir, file), "utf-8");
            filesRead.push(`--- ${file} ---\n${content}`);
          }
        }
      } catch (e) {
        throw new Error(`Failed to read source files for component '${componentName}'. Path: ${compDir}`);
      }

      if (filesRead.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No typescript files found for component ${componentName}.`,
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `Source code for EdPear component '${componentName}':\n\n${filesRead.join("\n\n")}`,
          },
        ],
      };
    }

    throw new Error(`Unknown tool: ${request.params.name}`);
  } catch (error) {
    if (error instanceof Error) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: "Unknown error occurred" }],
      isError: true,
    };
  }
});

// Start Server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("EdPear MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running MCP server:", error);
  process.exit(1);
});
