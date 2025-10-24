"use client";
import { useState } from "react";
import TableField, {
  type TableFieldColumn,
} from "@/registry/default/ui/table-field";

export default function TableFieldAddColumnDemo() {
  const [value, setValue] = useState(
    '[{"name": "John Doe", "email": "john@example.com"}, {"name": "Jane Smith", "email": "jane@example.com"}]',
  );

  const columns: TableFieldColumn[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
    { name: "phone", label: "Phone", type: "text" },
  ];

  return (
    <TableField
      name="add-column-demo"
      label="Add Column Demo"
      value={value}
      columns={columns}
      setValue={setValue}
      caption="Columns are predefined. Add rows with the new phone column."
    />
  );
}
