
export interface BloomsTaggedObjective {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface BloomsTaxonomyTaggerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  objectives?: BloomsTaggedObjective[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveObjectives?: (items: BloomsTaggedObjective[]) => void;
}
