import { Download, Plus, Table2, Trash2 } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { cn } from "../../lib/cn.js";
import type { DataRow, DataTableLabProps } from "./data-table-lab.types.js";

export const DataTableLab = forwardRef<HTMLDivElement, DataTableLabProps>((props, ref) => {
  const {
    columns,
    initialData = [],
    onChange,
    title = "Data Table Lab",
    readOnly = false,
    className,
    ...rest
  } = props;

  const [data, setData] = useState<DataRow[]>(initialData);

  useEffect(() => {
    onChange?.(data);
  }, [data, onChange]);

  const addRow = () => {
    const newRow: DataRow = { id: Math.random().toString(36).substr(2, 9) };
    columns.forEach(col => {
      newRow[col.id] = col.type === "number" ? 0 : col.type === "boolean" ? false : "";
    });
    setData([...data, newRow]);
  };

  const removeRow = (id: string) => {
    setData(data.filter(row => row.id !== id));
  };

  const updateCell = (id: string, columnId: string, value: string | number | boolean) => {
    setData(data.map(row => 
      row.id === id ? { ...row, [columnId]: value } : row
    ));
  };

  const exportCSV = () => {
    const header = columns.map(c => c.label).join(",");
    const rows = data.map(row => columns.map(c => {
      const val = row[c.id];
      // Escape quotes if string
      if (typeof val === 'string') return `"${val.replace(/"/g, '""')}"`;
      return val;
    }).join(","));
    
    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "lab_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={ref}
      className={cn("flex flex-col rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden", className)}
      data-slot="data-table-lab"
      {...rest}
    >
      <div className="flex items-center justify-between border-b bg-muted/20 p-4">
        <div className="flex items-center gap-2 text-primary">
          <Table2 className="h-5 w-5" />
          <h3 className="font-semibold tracking-tight text-foreground">{title}</h3>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={exportCSV} 
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-background border rounded-md hover:bg-accent transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              {columns.map(col => (
                <th key={col.id} className="px-4 py-3 font-medium border-b" style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
              {!readOnly && <th className="px-4 py-3 font-medium border-b w-12 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                {columns.map(col => (
                  <td key={col.id} className="px-2 py-2">
                    {col.type === "boolean" ? (
                      <input
                        type="checkbox"
                        checked={!!row[col.id]}
                        onChange={(e) => updateCell(row.id, col.id, e.target.checked)}
                        disabled={readOnly}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary ml-2"
                      />
                    ) : (
                      <input
                        type={col.type === "number" ? "number" : "text"}
                        value={(row[col.id] as string | number) ?? ""}
                        onChange={(e) => {
                          const val = col.type === "number" ? Number(e.target.value) : e.target.value;
                          updateCell(row.id, col.id, val);
                        }}
                        disabled={readOnly}
                        className="w-full rounded-md border-0 bg-transparent px-2 py-1.5 text-sm ring-1 ring-inset ring-border placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary disabled:opacity-50"
                      />
                    )}
                  </td>
                ))}
                {!readOnly && (
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => removeRow(row.id)}
                      className="text-muted-foreground hover:text-rose-500 transition-colors p-1 rounded hover:bg-rose-50 dark:hover:bg-rose-500/10"
                      title="Delete row"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
            
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + (readOnly ? 0 : 1)} className="px-4 py-8 text-center text-muted-foreground">
                  No data entries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {!readOnly && (
        <div className="border-t bg-muted/10 p-3">
          <button
            onClick={addRow}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-primary/30 bg-primary/5 py-2 text-sm font-medium text-primary hover:bg-primary/10 hover:border-primary/50 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Row
          </button>
        </div>
      )}
    </div>
  );
});

DataTableLab.displayName = "DataTableLab";
