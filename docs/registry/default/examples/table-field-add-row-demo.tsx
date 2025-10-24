"use client";
import { useState } from "react";
import TableField, {
  type TableFieldColumn,
} from "@/registry/default/ui/table-field";

export default function TableFieldAddRowDemo() {
  const [value, setValue] = useState(
    '[{"name": "John Doe", "email": "john@example.com"}]',
  );

  const columns: TableFieldColumn[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email", type: "text" },
  ];

  return (
    <TableField
      name="add-row-demo"
      label="Add Row Demo"
      value={value}
      columns={columns}
      setValue={setValue}
      caption="Add a new row to the bottom. Columns are fixed."
    />
  );
}
