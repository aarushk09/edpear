export interface DataColumn {
  id: string;
  label: string;
  type?: "number" | "text" | "boolean";
  width?: number;
}

export type DataRow = Record<string, string | number | boolean> & { id: string };

export interface DataTableLabProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  columns: DataColumn[];
  initialData?: DataRow[];
  onChange?: (data: DataRow[]) => void;
  title?: string;
  readOnly?: boolean;
}
