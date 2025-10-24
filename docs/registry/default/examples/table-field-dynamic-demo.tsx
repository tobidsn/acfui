"use client";
import { useState } from "react";
import TableField, {
  type TableFieldColumn,
} from "@/registry/default/ui/table-field";

export default function TableFieldDynamicDemo() {
  const [value, setValue] = useState('[{"name": "John Doe"}]');

  const columns: TableFieldColumn[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "description", label: "Description", type: "textarea" },
  ];

  return (
    <TableField
      name="dynamic-demo"
      label="Dynamic Demo"
      value={value}
      columns={columns}
      setValue={setValue}
      caption="Add rows dynamically with text and textarea columns."
    />
  );
}
