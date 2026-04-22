export interface TranslationOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  originalText: string;
  translatedText: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  defaultShow?: boolean;
}
