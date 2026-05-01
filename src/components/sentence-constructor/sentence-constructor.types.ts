
export interface SentenceTile {
  id: string;
  title: string;
  detail: string;
  tag?: string;
}

export interface SentenceConstructorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  tiles?: SentenceTile[];
  primaryActionLabel?: string;
  disabled?: boolean;
  onSaveTiles?: (items: SentenceTile[]) => void;
}
