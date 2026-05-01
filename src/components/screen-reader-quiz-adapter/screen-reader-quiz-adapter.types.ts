
export interface ScreenReaderQuizVariant {
  id: string;
  label: string;
  headline: string;
  body: string;
  note?: string;
}

export interface ScreenReaderQuizAdapterProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  variants?: ScreenReaderQuizVariant[];
  defaultVariantId?: string;
  disabled?: boolean;
  onVariantChange?: (variantId: string) => void;
}
