export interface ChemicalElement {
  symbol: string;
  name: string;
  atomicNumber: number;
  color?: string; // e.g. 'bg-red-500'
}

export interface FormulaPart {
  id: string;
  element: ChemicalElement;
  count: number; // subscript, 1 means no subscript displayed
}

export interface ChemistryFormulaBuilderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  availableElements: ChemicalElement[];
  targetFormula?: string; // e.g. "H2O", "CO2"
  onChange?: (formula: string, isValid: boolean) => void;
  title?: string;
}
