
export interface VocabFlashVariant {
  id: string;
  label: string;
  headline: string;
  body: string;
  note?: string;
}

export interface VocabFlashDeckProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  variants?: VocabFlashVariant[];
  defaultVariantId?: string;
  disabled?: boolean;
  onVariantChange?: (variantId: string) => void;
}
