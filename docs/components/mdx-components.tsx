import { ComponentSource } from "@/components/component-source";
import { ComponentTabs } from "@/components/component-tabs";
import { CSSVariablesTable } from "@/components/css-variables-table";
import { DataAttributesTable } from "@/components/data-attributes-table";
import { KeyboardShortcutsTable } from "@/components/keyboard-shortcuts-table";
import { PropsTable } from "@/components/props-table";
import { Table, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { Page } from "fumadocs-core/source";
import { createGenerator } from "fumadocs-typescript";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Heading } from "fumadocs-ui/components/heading";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

const generator = createGenerator();

const components: MDXComponents = {
  ...defaultComponents,
  Heading,
  pre: ({ title, ...props }) => (
    <CodeBlock title={title}>
      <Pre {...props} />
    </CodeBlock>
  ),
  Table,
  th: TableHead,
  td: TableCell,
  tr: TableRow,
  Steps,
  Step,
  Tabs,
  Tab,
  ComponentTabs,
  ComponentSource,
  CSSVariablesTable,
  DataAttributesTable,
  KeyboardShortcutsTable,
  PropsTable,
  AutoTypeTable: (props: {
    path: string;
    name: string;
  }) => {
    return <AutoTypeTable generator={generator} {...props} />;
  },
  cn: ({ className }: { className: string }) => (
    <span className={cn("font-mono text-xs", className)}>
      {`cn("${className}")`}
    </span>
  ),
};

export default components;

interface MdxProps {
  page: Page & {
    data: { body: React.ComponentType<{ components: MDXComponents }> };
  };
  components?: Partial<MDXComponents>;
}

export function Mdx({ page, components: extraComponents = {} }: MdxProps) {
  const Comp = page.data.body;
  const mdxComponents = { ...components, ...extraComponents } as MDXComponents;

  return <Comp components={mdxComponents} />;
}
