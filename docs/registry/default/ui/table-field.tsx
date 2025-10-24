"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TableFieldColumn {
  name: string;
  label: string;
  type?: "text" | "textarea";
  placeholder?: string;
  is_required?: boolean;
}

export interface TableFieldProps {
  name: string;
  label: string;
  value?: string;
  required?: boolean;
  caption?: string;
  columns?: TableFieldColumn[];
  min?: number;
  max?: number;
  setValue: (name: string, value: string) => void;
  errors?: Record<string, string>;
  itemIndex?: number;
  languages?: Array<{ code: string; name: string }>;
  selectedIndex?: number;
  setSelectedIndex?: (index: number) => void;
  data?: any;
}

interface TableRow {
  id: string;
  [key: string]: any;
}

export default function TableField({
  name,
  label,
  value = "[]",
  required = false,
  caption = "Add rows to the table",
  columns = [],
  min = 0,
  max = Infinity,
  setValue,
  errors,
  itemIndex,
  languages,
  selectedIndex,
  setSelectedIndex,
  data,
}: TableFieldProps) {
  // Parse the initial value or use an empty array with default values
  const [rows, setRows] = useState<TableRow[]>(() => {
    try {
      const initialValue =
        languages && selectedIndex !== undefined && languages[selectedIndex]
          ? data?.translations?.[languages[selectedIndex].code]?.[name] || "[]"
          : data?.[name] || "[]";

      let parsedValue = JSON.parse(initialValue);
      if (!Array.isArray(parsedValue)) {
        parsedValue = [];
      }
      // Ensure each row has all required fields
      return parsedValue.map((row: any) => {
        const newRow: TableRow = { id: crypto.randomUUID() };
        columns.forEach((column) => {
          newRow[column.name] = row[column.name] || "";
        });
        return newRow;
      });
    } catch (e) {
      return [];
    }
  });

  // Generate a unique ID for a new row with default values
  const createEmptyRow = (): TableRow => {
    const newRow: TableRow = { id: crypto.randomUUID() };
    columns.forEach((column) => {
      newRow[column.name] = "";
    });
    return newRow;
  };

  // Add initial rows if needed to meet minimum requirement
  useEffect(() => {
    if (rows.length < min) {
      const newRows = [...rows];
      for (let i = rows.length; i < min; i++) {
        newRows.push(createEmptyRow());
      }
      setRows(newRows);
    }
  }, [min]);

  // Update rows based on value from data for multilingual support
  useEffect(() => {
    if (
      languages &&
      data &&
      selectedIndex !== undefined &&
      languages[selectedIndex]
    ) {
      const langValue =
        data?.translations?.[languages[selectedIndex].code]?.[name] || "[]";
      try {
        let parsedValue = JSON.parse(langValue);
        if (!Array.isArray(parsedValue)) {
          parsedValue = [];
        }
        // Ensure each row has all required fields
        const updatedRows = parsedValue.map((row: any) => {
          const newRow: TableRow = { id: crypto.randomUUID() };
          columns.forEach((column) => {
            newRow[column.name] = row[column.name] || "";
          });
          return newRow;
        });
        setRows(updatedRows);
      } catch (e) {
        setRows([]);
      }
    }
  }, [data, languages, selectedIndex, name, columns]);

  // Update the parent component with the JSON string value whenever rows change
  useEffect(() => {
    // Only include non-empty rows in the output
    const rowsToSave = rows
      .filter((row) => columns.some((column) => row[column.name]?.trim()))
      .map((row) => {
        const { id, ...rowData } = row;
        return rowData;
      });
    setValue(name, JSON.stringify(rowsToSave));
  }, [rows, name, setValue, columns]);

  // Add a new row to the table
  const handleAddRow = () => {
    if (rows.length < max) {
      setRows([...rows, createEmptyRow()]);
    }
  };

  // Remove a row from the table
  const handleRemoveRow = (index: number) => {
    if (rows.length > min) {
      const newRows = [...rows];
      newRows.splice(index, 1);
      setRows(newRows);
    }
  };

  // Update a cell value
  const handleCellChange = (
    rowIndex: number,
    columnName: string,
    value: string,
  ) => {
    const newRows = [...rows];
    const currentRow = newRows[rowIndex];
    newRows[rowIndex] = {
      ...currentRow,
      [columnName]: value,
    } as TableRow;
    setRows(newRows);
  };

  const renderTable = (langCode: string | null = null) => {
    return (
      <div className="w-full space-y-4">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.name} className="font-medium">
                    {column.label}
                    {column.is_required && (
                      <span className="text-destructive ml-1">*</span>
                    )}
                  </TableHead>
                ))}
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.name}`}>
                      {column.type === "textarea" ? (
                        <Textarea
                          value={row[column.name] || ""}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex,
                              column.name,
                              e.target.value,
                            )
                          }
                          placeholder={column.placeholder || ""}
                          className={cn(
                            "min-h-[30px] resize-y",
                            errors?.[`${name}.${rowIndex}.${column.name}`] &&
                              "border-destructive",
                          )}
                        />
                      ) : (
                        <Input
                          value={row[column.name] || ""}
                          onChange={(e) =>
                            handleCellChange(
                              rowIndex,
                              column.name,
                              e.target.value,
                            )
                          }
                          placeholder={column.placeholder || ""}
                          className={cn(
                            errors?.[`${name}.${rowIndex}.${column.name}`] &&
                              "border-destructive",
                          )}
                        />
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveRow(rowIndex)}
                      disabled={rows.length <= min}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + 1}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No rows added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddRow}
            disabled={rows.length >= max}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" /> Add Row
          </Button>
          {max < Infinity && (
            <p className="text-xs text-muted-foreground">
              {rows.length} of {max} rows
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
      {languages ? (
        <div>
          {/* Language tabs would go here - simplified for now */}
          {renderTable()}
        </div>
      ) : (
        renderTable()
      )}
    </div>
  );
}
