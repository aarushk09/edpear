export type SyllabusLesson = {
  id: string;
  title: string;
  completed?: boolean;
  /** When true, lesson cannot be opened until prerequisites met */
  locked?: boolean;
};

export type SyllabusModule = {
  id: string;
  title: string;
  lessons: SyllabusLesson[];
  /** Initial expanded state for the module row */
  defaultExpanded?: boolean;
};

export type SyllabusNavigatorProps = {
  modules: SyllabusModule[];
  activeLessonId?: string;
  onLessonSelect?: (lessonId: string) => void;
  /** Enable drag handles to reorder top-level modules (course builder mode) */
  reorderEnabled?: boolean;
  onModulesReorder?: (orderedModuleIds: string[]) => void;
  className?: string;
};
