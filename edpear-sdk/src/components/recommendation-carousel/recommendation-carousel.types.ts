export type RecommendationType = "course" | "lesson" | "quiz" | "article" | "video";

export interface RecommendationItem {
  id: string;
  title: string;
  type: RecommendationType;
  thumbnailUrl?: string;
  matchScore?: number; // 0 to 100
  duration?: string;
  description?: string;
}

export interface RecommendationCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: RecommendationItem[];
  title?: string;
  onItemClick?: (item: RecommendationItem) => void;
}
