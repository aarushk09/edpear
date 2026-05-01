
export interface WellnessNudgeVariant {
  id: string;
  label: string;
  headline: string;
  body: string;
  note?: string;
}

export interface WellnessNudgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  variants?: WellnessNudgeVariant[];
  defaultVariantId?: string;
  disabled?: boolean;
  onVariantChange?: (variantId: string) => void;
}
