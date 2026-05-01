
export interface BilingualParagraphVariant {
  id: string;
  label: string;
  headline: string;
  body: string;
  note?: string;
}

export interface BilingualTextToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  variants?: BilingualParagraphVariant[];
  defaultVariantId?: string;
  disabled?: boolean;
  onVariantChange?: (variantId: string) => void;
}
