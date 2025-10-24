"use client";

import { useState } from "react";
import TableField, {
  type TableFieldColumn,
} from "@/registry/default/ui/table-field";

export default function TableFieldDemo() {
  const [value, setValue] = useState('[{"name": "John Doe"}]');

  const columns: TableFieldColumn[] = [
    { name: "name", label: "Name", type: "text" },
  ];

  return (
    <TableField
      name="demo-table"
      label="Demo Table"
      value={value}
      columns={columns}
      setValue={setValue}
      caption="Add rows to the table dynamically."
    />
  );
}
