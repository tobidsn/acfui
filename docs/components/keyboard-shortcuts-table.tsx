import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface KeyboardShortcutsTableProps {
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

export function KeyboardShortcutsTable({
  shortcuts,
}: KeyboardShortcutsTableProps) {
  return (
    <div className="mdx">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shortcuts.map((shortcut, index) => (
            <TableRow key={`${shortcut.keys.join(" + ")}-${index}`}>
              <TableCell className="flex items-center gap-2">
                {shortcut.keys.map((key) => (
                  <kbd key={key} className="inline-flex h-6 items-center rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-foreground/70">
                    {key}
                  </kbd>
                ))}
              </TableCell>
              <TableCell>
                <span>{shortcut.description}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
