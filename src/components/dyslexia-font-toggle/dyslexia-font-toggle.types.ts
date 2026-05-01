
export interface DyslexiaFontVariant {
  id: string;
  label: string;
  headline: string;
  body: string;
  note?: string;
}

export interface DyslexiaFontToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  title?: string;
  subtitle?: string;
  variants?: DyslexiaFontVariant[];
  defaultVariantId?: string;
  disabled?: boolean;
  onVariantChange?: (variantId: string) => void;
}
