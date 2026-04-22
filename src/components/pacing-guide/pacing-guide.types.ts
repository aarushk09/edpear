export interface PacingItem {
  id: string;
  title: string;
  expectedDate: Date | string | number;
  actualDate?: Date | string | number; // If undefined, not yet completed
}

export interface PacingGuideProps extends React.HTMLAttributes<HTMLDivElement> {
  items: PacingItem[];
  title?: string;
}
